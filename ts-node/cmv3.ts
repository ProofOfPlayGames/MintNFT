import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext, CreateCandyGuardInput, FindCandyGuardByAddressInput, UpdateCandyGuardInput, WrapCandyGuardInput, UpdateCandyMachineInput } from "@metaplex-foundation/js";
import secret from './guideSecret.json';

import qitems from '../cache.json';

const QUICKNODE_RPC = 'https://mainnet.helius-rpc.com/?api-key=a77c3d02-e773-47b8-9f94-5f9f099a0b1a'; // 👈 Replace with your QuickNode Solana Devnet HTTP Endpoint
const SESSION_HASH = 'QNDEMO'+Math.ceil(Math.random() * 1e9); // Random unique identifier for your session
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, { commitment: 'finalized' , httpHeaders: {"x-session-hash": SESSION_HASH}});

const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
const COLLECTION_NFT_MINT = '7ZRf6DdMfaGSWcGJQcmnr6ipqq3exX7LMX8moUhdVqnk'; 
const CANDY_MACHINE_ID = 'FrZ1x2igyr6L7rCenJnuxSjHeSLhJ2QNX8jgXSKjrQL9'; //'5Teyq87wdKRbhEVC9RZcz4hGENGGU4dvsSW6UrND37Ci'; //'BD6MucCQqJQcg5Wnmsz1ZRdETfdGxWmE9RxXHHsoyWMw';

const NFT_METADATA = "https://arweave.net/NFsWmCGbwohrsYIdN06T9uNA8ObKr5EWjxXIa0QeMJA";

const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(WALLET));


async function wrapCandyGuardAndCandyMachine(){
    const wrap: WrapCandyGuardInput = {
        candyMachine: new PublicKey("3bhen1DPUSZ18dG8K7mugug7SZ211MxEeSDhXXeebj7z"),
        candyGuard: new PublicKey("4GNiQTfuggsMRbrgFTZrcRpTMkP34aKLYeCsGCqUg7CC")
    };
        await METAPLEX.candyMachines().wrapCandyGuard(wrap);
}


async function createCollectionNft() {
    const { nft: collectionNft } = await METAPLEX.nfts().create({
        name: "POP Games - Controllers",
        uri: NFT_METADATA,
        sellerFeeBasisPoints: 500,
        isCollection: true,
        updateAuthority: WALLET,
      });

      console.log(`✅ - Minted Collection NFT: ${collectionNft.address.toString()}`);
      console.log(`     https://explorer.solana.com/address/${collectionNft.address.toString()}?cluster=devnet`);
}


async function updateCandyGuard(){
const dcs: UpdateCandyGuardInput<DefaultCandyGuardSettings> = {
    candyGuard: new PublicKey("4GNiQTfuggsMRbrgFTZrcRpTMkP34aKLYeCsGCqUg7CC"),
    guards: undefined
}
    await METAPLEX.candyMachines().updateCandyGuard(dcs);
}


async function updateMachine(){
    const dqcs: UpdateCandyMachineInput<DefaultCandyGuardSettings> = {
        candyMachine: new PublicKey("3bhen1DPUSZ18dG8K7mugug7SZ211MxEeSDhXXeebj7z"),
        // ??????????
    }
    await METAPLEX.candyMachines().update(dqcs);
}


async function findCandyGuardAddress(){
    const cgi: FindCandyGuardByAddressInput = {
        address: new PublicKey("3bhen1DPUSZ18dG8K7mugug7SZ211MxEeSDhXXeebj7z")
    };
    const { address } = await METAPLEX.candyMachines().findCandyGuardByAddress(cgi);
    console.log(address);
}


async function createCandyGuard(){
    const candyGuardInput: CreateCandyGuardInput<DefaultCandyGuardSettings> = 
    {
        guards: {
            startDate: { date: toDateTime("2023-10-17T16:00:00Z") },
            mintLimit: {
                id: 1,
                limit: 5,
            },
            solPayment: {
                amount: sol(0),
                destination: METAPLEX.identity().publicKey,
            },
            tokenBurn: {
                mint: new PublicKey("2euuptKpeWxbde6x46joDMDJCmnydu9ovjUAMgofQm9y"),
                amount: {
                    basisPoints: 5*1000000000,
                    currency: {
                        symbol: "POPT",
                        decimals: 9,
                        namespace: "spl-token"
                    }
                }
            }
        }
    }

    const { candyGuardAddress } = await METAPLEX.candyMachines().createCandyGuard(candyGuardInput);
    console.log(`✅ - Created Candy Guard: ${candyGuardAddress}`);
}


async function generateCandyMachine() {
    const candyMachineSettings: CreateCandyMachineInput<DefaultCandyGuardSettings> =
        {
            itemsAvailable: toBigNumber(1000), // Collection Size: 3
            sellerFeeBasisPoints: 500, // 10% Royalties on Collection
            symbol: "POPC",
            
            maxEditionSupply: toBigNumber(0), // 0 reproductions of each NFT allowed
            isMutable: true,
            creators: [
                { address: WALLET.publicKey, share: 100 },
            ],
            collection: {
                address: new PublicKey(COLLECTION_NFT_MINT), // Can replace with your own NFT or upload a new one
                updateAuthority: WALLET,
            },
        };
    const { candyMachine } = await METAPLEX.candyMachines().create(candyMachineSettings);
    console.log(`✅ - Created Candy Machine: ${candyMachine.address.toString()}`);
    console.log(`     https://explorer.solana.com/address/${candyMachine.address.toString()}?cluster=mainnet-beta`);
}


async function updateCandyMachine() {
    const candyMachine = await METAPLEX
        .candyMachines()
        .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });

    const { response } = await METAPLEX.candyMachines().update({
        candyMachine,
        
        // candyGuard: new PublicKey("4GNiQTfuggsMRbrgFTZrcRpTMkP34aKLYeCsGCqUg7CC"),
        // groups: [
            // {
                // label: "first",
                guards: {
                    // startDate: { date: toDateTime("2023-10-17T16:00:00Z") },
                    mintLimit: {
                        id: 1,
                        limit: 3,
                    },
                    // solPayment: {
                    //     amount: sol(0.36),
                    //     destination: METAPLEX.identity().publicKey,
                    // },
                    // gatekeeper: {
                    //     network: new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"),
                    //     expireOnUse: true,
                    //   },
                    solPayment: {
                        amount: {
                            basisPoints: 360000000,
                            currency: {
                                symbol: "SOL",
                                decimals: 9
                            }
                        },
                        destination: METAPLEX.identity().publicKey,
                    },
                    botTax: {
                        lamports: {
                            basisPoints: 10000,
                            currency: {
                                symbol: "SOL",
                                decimals: 9
                            }
                        },
                        lastInstruction: false
                    },
                    tokenPayment: {
                        mint: new PublicKey("2euuptKpeWxbde6x46joDMDJCmnydu9ovjUAMgofQm9y"),
                        amount: {
                            basisPoints: 9000000000000000,
                            currency: {
                                symbol: "POPT",
                                decimals: 9,
                                namespace: "spl-token"
                            }
                        },
                        destinationAta: new PublicKey("2asREzNWNQUUViigYiaji1fNEM1aQ1UJ2XuLpZENni4n")
                    },
                    tokenBurn: {
                        mint: new PublicKey("2euuptKpeWxbde6x46joDMDJCmnydu9ovjUAMgofQm9y"),
                        amount: {
                            basisPoints: 9000000000000000,
                            currency: {
                                symbol: "POPT",
                                decimals: 9,
                                namespace: "spl-token"
                            }
                        }
                    }
                // }
        }
    // ],
    // guards: {
    //     startDate: { date: toDateTime("2023-10-17T16:00:00Z") },
    //                 // mintLimit: {
    //                 //     id: 1,
    //                 //     limit: 5,
    //                 // },
    //                 // solPayment: {
    //                 //     amount: sol(0.36),
    //                 //     destination: METAPLEX.identity().publicKey,
    //                 // },
    //                 // gatekeeper: {
    //                 //     network: new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"),
    //                 //     expireOnUse: true,
    //                 //   },
    //                 solPayment: {
    //                     amount: {
    //                         basisPoints: 360000000,
    //                         currency: {
    //                             symbol: "SOL",
    //                             decimals: 9
    //                         }
    //                     },
    //                     destination: METAPLEX.identity().publicKey,
    //                 },
    //                 tokenBurn: {
                    //     mint: new PublicKey("2euuptKpeWxbde6x46joDMDJCmnydu9ovjUAMgofQm9y"),
                    //     amount: {
                    //         basisPoints: 9000000000000000,
                    //         currency: {
                    //             symbol: "POPT",
                    //             decimals: 9,
                    //             namespace: "spl-token"
                    //         }
                    //     },
                    //     // destinationAta: new PublicKey("2asREzNWNQUUViigYiaji1fNEM1aQ1UJ2XuLpZENni4n")
                    // },
                    // tokenBurn: {
                    //     mint: new PublicKey("2euuptKpeWxbde6x46joDMDJCmnydu9ovjUAMgofQm9y"),
                    //     amount: {
                    //         basisPoints: 1000000000,
                    //         currency: {
                    //             symbol: "POPT",
                    //             decimals: 9,
                    //             namespace: "spl-token"
                    //         }
                    //     }
                    // }
                
    // }
    })
    
    console.log(`✅ - Updated Candy Machine: ${CANDY_MACHINE_ID}`);
    console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=mainnet-beta`);
}

async function addItems(start: number) {
    const candyMachine = await METAPLEX
        .candyMachines()
        .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) }); 
    const items = [];
    for (let i = start; i < start+10; i++ ) { // Add 3 NFTs (the size of our collection)
        console.log(qitems["items"][i].name);
        items.push({
            name: qitems["items"][i].name,
            uri: qitems["items"][i].metadata_link
        })
    }
    try {
    const { response } = await METAPLEX.candyMachines().insertItems({
        candyMachine,
        items: items,
      },{commitment:'finalized'});
      console.log(`✅ - Items added to Candy Machine: ${CANDY_MACHINE_ID}`);
    console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=mainnet-beta`);
} catch (e) {
    console.log("\n\n\n"+e);
     console.log("\nFAILED: " + start + "\n\n\n");
}
if (start < 995) {
    // addItems(start+10);
}
}

async function mintNft() {
    const candyMachine = await METAPLEX
        .candyMachines()
        .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) }); 
    let { nft, response } = await METAPLEX.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: WALLET.publicKey,
        // group: "first",
        },{commitment:'finalized'})

    console.log(`✅ - Minted NFT: ${nft.address.toString()}`);
    console.log(`     https://explorer.solana.com/address/${nft.address.toString()}?cluster=mainnet-beta`);
    console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=mainnet-beta`);
}

// wrapCandyGuardAndCandyMachine();
// updateCandyGuard();
// findCandyGuardAddress();
// createCandyGuard();
// updateMachine();
// generateCandyMachine();
updateCandyMachine();
// addItems(890);
// mintNft();

// console.log(items["items"][1].name);

// for (let i = 180; i < 200; i+=10){
//     addItems(i);
// }

// createCollectionNft();





