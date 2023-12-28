(self.webpackChunkkey_stroke_cm_v3_ui=self.webpackChunkkey_stroke_cm_v3_ui||[]).push([[608],{38608:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return v}});var t=r(74165),i=r(29439),o=r(15671),a=r(43144),s=r(60136),u=r(29388),c=r(97143),d=r.n(c),l=r(41181),p=r(41682),f=r.n(p),h=function(e,n,r,t){return new(r||(r=Promise))((function(i,o){function a(e){try{u(t.next(e))}catch(n){o(n)}}function s(e){try{u(t.throw(e))}catch(n){o(n)}}function u(e){var n;e.done?i(e.value):(n=e.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,s)}u((t=t.apply(e,n||[])).next())}))},v=function(e){(0,s.Z)(r,e);var n=(0,u.Z)(r);function r(e,t){var a,s;if((0,o.Z)(this,r),(a=n.call(this))._network=t,a._publicKey=null,a._popup=null,a._handlerAdded=!1,a._nextRequestId=1,a._autoApprove=!1,a._responsePromises=new Map,a.handleMessage=function(e){var n;if(a._injectedProvider&&e.source===window||e.origin===(null===(n=a._providerUrl)||void 0===n?void 0:n.origin)&&e.source===a._popup)if("connected"===e.data.method){var r=new l.PublicKey(e.data.params.publicKey);a._publicKey&&a._publicKey.equals(r)||(a._publicKey&&!a._publicKey.equals(r)&&a.handleDisconnect(),a._publicKey=r,a._autoApprove=!!e.data.params.autoApprove,a.emit("connect",a._publicKey))}else if("disconnected"===e.data.method)a.handleDisconnect();else if(e.data.result||e.data.error){var t=a._responsePromises.get(e.data.id);if(t){var o=(0,i.Z)(t,2),s=o[0],u=o[1];e.data.result?s(e.data.result):u(new Error(e.data.error))}}},a._beforeUnload=function(){a.disconnect()},function(e){return"object"===typeof e&&null!==e}(s=e)&&"postMessage"in s&&"function"===typeof s.postMessage)a._injectedProvider=e;else{if(!function(e){return"string"===typeof e}(e))throw new Error("provider parameter must be an injected provider or a URL string.");a._providerUrl=new URL(e),a._providerUrl.hash=new URLSearchParams({origin:window.location.origin,network:a._network}).toString()}return a}return(0,a.Z)(r,[{key:"handleConnect",value:function(){var e,n=this;return this._handlerAdded||(this._handlerAdded=!0,window.addEventListener("message",this.handleMessage),window.addEventListener("beforeunload",this._beforeUnload)),this._injectedProvider?new Promise((function(e){n.sendRequest("connect",{}),e()})):(window.name="parent",this._popup=window.open(null===(e=this._providerUrl)||void 0===e?void 0:e.toString(),"_blank","location,resizable,width=460,height=675"),new Promise((function(e){n.once("connect",e)})))}},{key:"handleDisconnect",value:function(){var e=this;this._handlerAdded&&(this._handlerAdded=!1,window.removeEventListener("message",this.handleMessage),window.removeEventListener("beforeunload",this._beforeUnload)),this._publicKey&&(this._publicKey=null,this.emit("disconnect")),this._responsePromises.forEach((function(n,r){var t=(0,i.Z)(n,2)[1];e._responsePromises.delete(r),t(new Error("Wallet disconnected"))}))}},{key:"sendRequest",value:function(e,n){return h(this,void 0,void 0,(0,t.Z)().mark((function r(){var i,o=this;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if("connect"===e||this.connected){r.next=2;break}throw new Error("Wallet not connected");case 2:return i=this._nextRequestId,++this._nextRequestId,r.abrupt("return",new Promise((function(r,t){var a,s,u,c;o._responsePromises.set(i,[r,t]),o._injectedProvider?o._injectedProvider.postMessage({jsonrpc:"2.0",id:i,method:e,params:Object.assign({network:o._network},n)}):(null===(a=o._popup)||void 0===a||a.postMessage({jsonrpc:"2.0",id:i,method:e,params:n},null!==(u=null===(s=o._providerUrl)||void 0===s?void 0:s.origin)&&void 0!==u?u:""),o.autoApprove||null===(c=o._popup)||void 0===c||c.focus())})));case 5:case"end":return r.stop()}}),r,this)})))}},{key:"publicKey",get:function(){return this._publicKey}},{key:"connected",get:function(){return null!==this._publicKey}},{key:"autoApprove",get:function(){return this._autoApprove}},{key:"connect",value:function(){return h(this,void 0,void 0,(0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this._popup&&this._popup.close(),e.next=3,this.handleConnect();case 3:case"end":return e.stop()}}),e,this)})))}},{key:"disconnect",value:function(){return h(this,void 0,void 0,(0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this._injectedProvider){e.next=3;break}return e.next=3,this.sendRequest("disconnect",{});case 3:this._popup&&this._popup.close(),this.handleDisconnect();case 5:case"end":return e.stop()}}),e,this)})))}},{key:"sign",value:function(e,n){return h(this,void 0,void 0,(0,t.Z)().mark((function r(){var i,o,a;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e instanceof Uint8Array){r.next=2;break}throw new Error("Data must be an instance of Uint8Array");case 2:return r.next=4,this.sendRequest("sign",{data:e,display:n});case 4:return i=r.sent,o=f().decode(i.signature),a=new l.PublicKey(i.publicKey),r.abrupt("return",{signature:o,publicKey:a});case 8:case"end":return r.stop()}}),r,this)})))}},{key:"signTransaction",value:function(e){return h(this,void 0,void 0,(0,t.Z)().mark((function n(){var r,i,o;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.sendRequest("signTransaction",{message:f().encode(e.serializeMessage())});case 2:return r=n.sent,i=f().decode(r.signature),o=new l.PublicKey(r.publicKey),e.addSignature(o,i),n.abrupt("return",e);case 7:case"end":return n.stop()}}),n,this)})))}},{key:"signAllTransactions",value:function(e){return h(this,void 0,void 0,(0,t.Z)().mark((function n(){var r,i,o;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.sendRequest("signAllTransactions",{messages:e.map((function(e){return f().encode(e.serializeMessage())}))});case 2:return r=n.sent,i=r.signatures.map((function(e){return f().decode(e)})),o=new l.PublicKey(r.publicKey),e=e.map((function(e,n){return e.addSignature(o,i[n]),e})),n.abrupt("return",e);case 7:case"end":return n.stop()}}),n,this)})))}},{key:"diffieHellman",value:function(e){return h(this,void 0,void 0,(0,t.Z)().mark((function n(){var r;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e instanceof Uint8Array){n.next=2;break}throw new Error("Data must be an instance of Uint8Array");case 2:return n.next=4,this.sendRequest("diffieHellman",{publicKey:e});case 4:return r=n.sent,n.abrupt("return",r);case 6:case"end":return n.stop()}}),n,this)})))}}]),r}(d())},63178:function(e,n,r){"use strict";var t=r(82543).Buffer;e.exports=function(e){if(e.length>=255)throw new TypeError("Alphabet too long");for(var n=new Uint8Array(256),r=0;r<n.length;r++)n[r]=255;for(var i=0;i<e.length;i++){var o=e.charAt(i),a=o.charCodeAt(0);if(255!==n[a])throw new TypeError(o+" is ambiguous");n[a]=i}var s=e.length,u=e.charAt(0),c=Math.log(s)/Math.log(256),d=Math.log(256)/Math.log(s);function l(e){if("string"!==typeof e)throw new TypeError("Expected String");if(0===e.length)return t.alloc(0);for(var r=0,i=0,o=0;e[r]===u;)i++,r++;for(var a=(e.length-r)*c+1>>>0,d=new Uint8Array(a);e[r];){var l=n[e.charCodeAt(r)];if(255===l)return;for(var p=0,f=a-1;(0!==l||p<o)&&-1!==f;f--,p++)l+=s*d[f]>>>0,d[f]=l%256>>>0,l=l/256>>>0;if(0!==l)throw new Error("Non-zero carry");o=p,r++}for(var h=a-o;h!==a&&0===d[h];)h++;var v=t.allocUnsafe(i+(a-h));v.fill(0,0,i);for(var w=i;h!==a;)v[w++]=d[h++];return v}return{encode:function(n){if((Array.isArray(n)||n instanceof Uint8Array)&&(n=t.from(n)),!t.isBuffer(n))throw new TypeError("Expected Buffer");if(0===n.length)return"";for(var r=0,i=0,o=0,a=n.length;o!==a&&0===n[o];)o++,r++;for(var c=(a-o)*d+1>>>0,l=new Uint8Array(c);o!==a;){for(var p=n[o],f=0,h=c-1;(0!==p||f<i)&&-1!==h;h--,f++)p+=256*l[h]>>>0,l[h]=p%s>>>0,p=p/s>>>0;if(0!==p)throw new Error("Non-zero carry");i=f,o++}for(var v=c-i;v!==c&&0===l[v];)v++;for(var w=u.repeat(r);v<c;++v)w+=e.charAt(l[v]);return w},decodeUnsafe:l,decode:function(e){var n=l(e);if(n)return n;throw new Error("Non-base"+s+" character")}}}},41682:function(e,n,r){var t=r(63178);e.exports=t("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")}}]);
//# sourceMappingURL=608.9b5da299.chunk.js.map