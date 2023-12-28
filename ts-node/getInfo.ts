import { FindNftByMintInput, FindNftByTokenInput, FindNftsByOwnerInput, Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import secret from './guideSecret.json';
import {getAssociatedTokenAddress, getAccount, createMintToInstruction, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID} from "@solana/spl-token";

(async () => {

    // const QUICKNODE_RPC = 'https://mainnet.helius-rpc.com/?api-key=a77c3d02-e773-47b8-9f94-5f9f099a0b1a'; // 👈 Replace with your QuickNode Solana Devnet HTTP Endpoint
    // const SESSION_HASH = 'QNDEMO'+Math.ceil(Math.random() * 1e9); // Random unique identifier for your session
    // const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, { commitment: 'finalized' , httpHeaders: {"x-session-hash": SESSION_HASH}});    

  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
  
  console.log("a2");
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(WALLET));
console.log("a1");
//   const owner = new PublicKey("2R4bHmSBHkHAskerTHE6GE1Fxbn31kaD5gHqpsPySVd7");

// const fbo: FindNftsByOwnerInput = {
//     owner: new PublicKey("ERd6QhQRfaYLtq3zhhtfSVxqJAQQGH8HCLykpCVLADGP")
// };
  
//   const fnbi: FindNftByMintInput = {
//       mintAddress: new PublicKey("FUsZ4Ve6BUd31F8YPxw5n3kCVcYZvCuUoEZZDjDsg74t")
//   };
  console.log("a3");
//   const allNFTs = await metaplex.nfts().findAllByOwner({ owner: new PublicKey("4wRmv4Bbw19xBrJG4nMpbrDukicDU1PDuXewfxZZ3EkU") }); // findAllByOwner(owner).findByToken(fnbi);
//   const allNFTs = await metaplex.nfts().findByMint(fnbi);
//   const allNFTs = await metaplex.nfts().findAllByMintList({
//       mints: [new PublicKey("J2tNTcBtHrdffYzKo86QRj6PdamQikSMq6sSyKCUqATo")]
//   });

let x = getAccount(connection, new PublicKey("ERd6QhQRfaYLtq3zhhtfSVxqJAQQGH8HCLykpCVLADGP"));
x.then((val) => {
    console.log(val)
}); 

  console.log("a4");
//   console.log(allNFTs);
})();