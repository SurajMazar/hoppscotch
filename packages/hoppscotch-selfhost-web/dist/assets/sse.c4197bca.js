import{_ as h}from"./utils.a018fd3f.js";import{d as A,W as P,_ as C}from"./regex.811ce196.js";import{f as I,D as N,ad as G,ae as m,bA as V,bB as B,V as O,j as M,X as U,ah as H,bC as b,aj as K,o as W,c as j,w as v,e as l,k as y,v as _,l as e,a1 as E,N as z,m as g,t as F,a as T,a6 as J,ar as X,bD as q,bE as Q,bF as Y,bG as Z,bH as ee,bI as se,bJ as te}from"./index.d0a044cd.js";import"./date.ff230613.js";import"./lens-actions.9bfefbd8.js";import"./json.f61ee1c3.js";import"./newOutline.bdbef8d7.js";const oe={class:"sticky top-0 z-10 flex flex-shrink-0 p-4 overflow-x-auto space-x-2 bg-primary"},ae={class:"inline-flex flex-1 space-x-2"},re={class:"flex flex-1"},ne=["placeholder","disabled"],le={for:"event-type",class:"px-4 py-2 font-semibold truncate border-t border-b bg-primaryLight border-divider text-secondaryLight"},ie=["disabled"],ve=I({__name:"sse",setup(ce){const t=N(),f=J(),{subscribeToStream:x}=G(),c=m(B,new V,q),r=O(c.value.connectionState$,"STOPPED"),o=m(Y,"",Q),d=m(ee,"",Z),u=m(te,[],se),i=M(!0);let p;const k=A(function(){p.postMessage({type:"sse",url:o.value})},1e3);U(o,s=>{s&&k()});const w=({data:s})=>{s.url===o.value&&(i.value=s.result)};H(()=>{p=new P,p.addEventListener("message",w),x(c.value.event$,s=>{switch(s==null?void 0:s.type){case"STARTING":u.value=[{payload:`${t("state.connecting_to",{name:o.value})}`,source:"info",color:"var(--accent-color)",ts:void 0}];break;case"STARTED":u.value=[{payload:`${t("state.connected_to",{name:o.value})}`,source:"info",color:"var(--accent-color)",ts:Date.now()}],f.success(`${t("state.connected")}`);break;case"MESSAGE_RECEIVED":b({payload:s.message,source:"server",ts:s.time});break;case"ERROR":b({payload:t("error.browser_support_sse").toString(),source:"info",color:"#ff5555",ts:s.time});break;case"STOPPED":b({payload:t("state.disconnected_from",{name:o.value}).toString(),source:"disconnected",color:"#ff5555",ts:s.time}),f.error(`${t("state.disconnected")}`);break}})});const S=()=>{if(r.value==="STOPPED")return c.value.start(o.value,d.value);c.value.stop()};K(()=>{p.terminate()});const D=()=>{u.value=[]};return(s,a)=>{const R=X,$=C,L=h;return W(),j(L,{"layout-id":"sse"},{primary:v(()=>[l("div",oe,[l("div",ae,[l("div",re,[y(l("input",{id:"server","onUpdate:modelValue":a[0]||(a[0]=n=>E(o)?o.value=n:null),type:"url",autocomplete:"off",class:z([{error:!i.value},"flex flex-1 w-full px-4 py-2 border rounded-l bg-primaryLight border-divider text-secondaryDark"]),placeholder:e(t)("sse.url"),disabled:e(r)==="STARTED"||e(r)==="STARTING",onKeyup:a[1]||(a[1]=g(n=>i.value?S():null,["enter"]))},null,42,ne),[[_,e(o)]]),l("label",le,F(e(t)("sse.event_type")),1),y(l("input",{id:"event-type","onUpdate:modelValue":a[2]||(a[2]=n=>E(d)?d.value=n:null),class:"flex flex-1 w-full px-4 py-2 border rounded-r bg-primaryLight border-divider text-secondaryDark",spellcheck:"false",disabled:e(r)==="STARTED"||e(r)==="STARTING",onKeyup:a[3]||(a[3]=g(n=>i.value?S():null,["enter"]))},null,40,ie),[[_,e(d)]])]),T(R,{id:"start",disabled:!i.value,name:"start",class:"w-32",label:e(r)==="STARTING"?e(t)("action.starting"):e(r)==="STOPPED"?e(t)("action.start"):e(t)("action.stop"),loading:e(r)==="STARTING",onClick:S},null,8,["disabled","label","loading"])])])]),secondary:v(()=>[T($,{title:e(t)("sse.log"),log:e(u),onDelete:a[4]||(a[4]=n=>D())},null,8,["title","log"])]),_:1})}}});export{ve as default};
//# sourceMappingURL=sse.c4197bca.js.map
