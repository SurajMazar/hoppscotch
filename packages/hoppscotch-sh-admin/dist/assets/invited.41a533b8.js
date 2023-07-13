import{d as b,u,b as k,e as g,o,c as n,f as t,g as i,a as _,h as D,F as w,i as I,j as C,t as d,k as E}from"./index.2e7559f1.js";import{I as N}from"./graphql.3ddfc347.js";import{f as r}from"./index.a5da96cc.js";const U={class:"flex flex-col"},B={class:"flex"},O=t("h3",{class:"text-lg font-bold text-accentContrast py-6"},"Invited Users",-1),V={class:"flex flex-col"},j={class:"py-2 overflow-x-auto"},A={key:0,class:"flex justify-center"},F={key:1},M=t("p",{class:"text-xl"},"No invited users found..",-1),T=[M],$={key:2,class:"w-full text-left"},q=t("thead",null,[t("tr",{class:"text-secondary border-b border-dividerDark text-sm text-left"},[t("th",{class:"px-3 pb-3"},"Admin ID"),t("th",{class:"px-3 pb-3"},"Admin Email"),t("th",{class:"px-3 pb-3"},"Invitee Email"),t("th",{class:"px-3 pb-3"},"Invited On")])],-1),z={class:"divide-y divide-divider"},L={key:0,class:"text-secondaryDark py-4"},Q=t("div",{class:"py-6 px-3"},"No invited users found..",-1),R=[Q],S={class:"py-2 px-3 max-w-30"},G={class:"truncate"},H={class:"py-2 px-3"},J={class:"flex items-center"},K={class:"py-2 px-3"},P={class:"py-2 px-3"},W={class:"flex items-center"},X={class:"flex flex-col"},Y={class:"text-gray-400 text-xs"},ot=b({__name:"invited",setup(Z){const p=u(),x=e=>r(new Date(e),"dd-MM-yyyy"),h=e=>r(new Date(e),"hh:mm a"),{fetching:v,error:m,data:c}=k({query:N}),a=g(()=>{var e;return(e=c==null?void 0:c.value)==null?void 0:e.admin.invitedUsers});return(e,l)=>{const f=C;return o(),n("div",U,[t("div",B,[t("button",{class:"p-2 rounded-3xl bg-divider",onClick:l[0]||(l[0]=s=>i(p).push("/users"))},[_(f,{class:"text-xl"})])]),O,t("div",V,[t("div",j,[t("div",null,[i(v)?(o(),n("div",A,[_(i(D))])):i(m)||i(a)===void 0?(o(),n("div",F,T)):(o(),n("table",$,[q,t("tbody",z,[i(a).length===0?(o(),n("tr",L,R)):(o(!0),n(w,{key:1},I(i(a),(s,y)=>(o(),n("tr",{key:y,class:"text-secondaryDark hover:bg-zinc-800 hover:cursor-pointer rounded-xl"},[t("td",S,[t("div",null,[t("span",G,d(s==null?void 0:s.adminUid),1)])]),t("td",H,[t("span",J,d(s==null?void 0:s.adminEmail),1)]),t("td",K,[t("span",null,d(s==null?void 0:s.inviteeEmail),1)]),t("td",P,[t("div",W,[t("div",X,[E(d(x(s==null?void 0:s.invitedOn))+" ",1),t("div",Y,d(h(s==null?void 0:s.invitedOn)),1)])])])]))),128))])]))])])])])}}});export{ot as default};
