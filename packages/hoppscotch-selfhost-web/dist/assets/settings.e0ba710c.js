import{o as a,d,e as t,f as T,u as ge,g as L,p as fe,h as ve,F as ye,i as xe,A as X,j as H,a as c,w as E,k as N,v as q,l as e,m as J,n as P,q as F,t as o,s as ee,x as D,y as ke,r as te,z as B,c as V,I as se,B as Ee,H as Y,C as Ce,D as G,E as k,G as $e,J as oe,K as ne,L as M,M as Ae,N as ce,O as be,P as Z,Q as Le,R as Ne,S as Ie,U as Se,V as Oe,W as Me,X as W,Y as x,Z as R,$ as we,a0 as Re,a1 as Te,a2 as De,a3 as Be,a4 as He,a5 as Pe,a6 as Fe,a7 as Ve}from"./index.d0a044cd.js";import{I as Q}from"./check-circle.c3e1d2f3.js";import{I as Xe}from"./rotate-ccw.abb2a2e2.js";const Ye=()=>/Chrome/i.test(navigator.userAgent)&&/Google/i.test(navigator.vendor),Ge=()=>/Firefox/i.test(navigator.userAgent),ze={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},Ue=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6"},null,-1),Ke=[Ue];function je(I,s){return a(),d("svg",ze,Ke)}const Ze={name:"lucide-languages",render:je},We={class:"inline-flex"},Qe={class:"select-wrapper"},qe={class:"flex flex-col space-y-2"},Je={class:"sticky z-10 top-0 flex-shrink-0 overflow-x-auto"},et=["placeholder"],tt=["onKeyup"],st={key:0,class:"flex flex-col items-center justify-center p-4 text-secondaryLight"},ot={class:"my-2 text-center"},nt=T({__name:"ChangeLanguage",setup(I){const s=ge(),u=s.t,_=L(()=>fe(X,xe(({code:l})=>l===s.locale.value),ve(()=>ye))),m=l=>{Ee(l)},p=H(null),r=H(""),n=L(()=>X.filter(l=>Object.values(l).some(g=>g.toLowerCase().includes(r.value.toLowerCase()))));return(l,g)=>{const A=D,f=Y,$=Ce,v=ke,C=te("tippy"),S=B("tippy");return a(),d("span",We,[c(C,{interactive:"",trigger:"click",theme:"popover","on-shown":()=>p.value.focus()},{content:E(({hide:w})=>[t("div",qe,[t("div",Je,[N(t("input",{"onUpdate:modelValue":g[0]||(g[0]=h=>r.value=h),type:"search",autocomplete:"off",class:"flex w-full p-4 py-2 input !bg-primaryContrast",placeholder:`${e(u)("action.search")}`},null,8,et),[[q,r.value]])]),t("div",{ref_key:"tippyActions",ref:p,class:"flex flex-col focus:outline-none",tabindex:"0",onKeyup:J(h=>w(),["escape"])},[(a(!0),d(P,null,F(e(n),h=>(a(),V($,{key:`locale-${h.code}`,class:"flex flex-1",onClick:()=>{m(h.code),w()}},{default:E(()=>[c(f,{label:h.name,"active-info-icon":e(_).code===h.code,"info-icon":e(_).code===h.code?e(se):null},null,8,["label","active-info-icon","info-icon"])]),_:2},1032,["onClick"]))),128)),e(n).length!==0||e(X).length===0?ee("",!0):(a(),d("div",st,[c(v,{class:"pb-2 opacity-75 svg-icons"}),t("span",ot,o(e(u)("state.nothing_found"))+' "'+o(r.value)+'" ',1)]))],40,tt)])]),default:E(()=>[t("span",Qe,[N(c(A,{title:e(u)("settings.choose_language"),class:"pr-8",icon:e(Ze),outline:"",label:e(_).name},null,8,["title","icon","label"]),[[S,{theme:"tooltip"}]])])]),_:1},8,["on-shown"])])}}}),ct={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},it=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 7V4h16v3M9 20h6M12 4v16"},null,-1),at=[it];function lt(I,s){return a(),d("svg",ct,at)}const rt={name:"lucide-type",render:lt},_t={class:"inline-flex"},dt={class:"select-wrapper"},pt=["onKeyup"],ut=T({__name:"FontSizePicker",setup(I){const s=G(),u=$e,_=k("FONT_SIZE"),m=n=>s(`settings.font_size_${n}`),p=n=>{M("FONT_SIZE",n)},r=H(null);return(n,l)=>{const g=D,A=Y,f=te("tippy"),$=B("tippy");return a(),d("span",_t,[c(f,{interactive:"",trigger:"click",theme:"popover","on-shown":()=>r.value.focus()},{content:E(({hide:v})=>[t("div",{ref_key:"tippyActions",ref:r,class:"flex flex-col focus:outline-none",tabindex:"0",onKeyup:J(C=>v(),["escape"])},[(a(!0),d(P,null,F(e(u),(C,S)=>(a(),V(A,{key:`size-${S}`,label:`${m(C)}`,icon:C===e(_)?e(oe):e(ne),active:C===e(_),onClick:()=>{p(C),v()}},null,8,["label","icon","active","onClick"]))),128))],40,pt)]),default:E(()=>[t("span",dt,[N(c(g,{title:e(s)("settings.change_font_size"),class:"pr-8",icon:e(rt),outline:"",label:`${m(e(u).find(v=>v===e(_)))}`},null,8,["title","icon","label"]),[[$,{theme:"tooltip"}]])])]),_:1},8,["on-shown"])])}}}),mt={class:"flex"},ht=T({__name:"AccentModePicker",setup(I){const s=Ae,u=k("THEME_COLOR"),_=m=>{document.documentElement.setAttribute("data-accent",m),M("THEME_COLOR",m)};return(m,p)=>{const r=D,n=B("tippy");return a(),d("div",mt,[(a(!0),d(P,null,F(e(s),(l,g)=>N((a(),V(r,{key:`color-${g}`,title:`${l.charAt(0).toUpperCase()}${l.slice(1)}`,class:ce([[{"bg-primaryLight":l===e(u)}],"rounded"]),icon:l===e(u)?e(oe):e(ne),color:l,onClick:A=>_(l)},null,8,["title","class","icon","color","onClick"])),[[n,{theme:"tooltip"}]])),128))])}}}),gt={class:"flex"},ft=T({__name:"ColorModePicker",setup(I){const s=G(),u=be,_=k("BG_COLOR"),m=n=>{M("BG_COLOR",n)},p=n=>{switch(n){case"system":return Z;case"light":return Ie;case"dark":return Ne;case"black":return Le;default:return Z}},r=n=>{switch(n){case"system":return"settings.system_mode";case"light":return"settings.light_mode";case"dark":return"settings.dark_mode";case"black":return"settings.black_mode";default:return"settings.system_mode"}};return(n,l)=>{const g=D,A=B("tippy");return a(),d("div",gt,[(a(!0),d(P,null,F(e(u),(f,$)=>N((a(),V(g,{key:`color-${$}`,title:e(s)(r(f)),class:ce([{"bg-primaryLight !text-accent hover:text-accent":f===e(_)},"rounded"]),icon:p(f),onClick:v=>m(f)},null,8,["title","class","icon","onClick"])),[[A,{theme:"tooltip"}]])),128))])}}}),vt={class:"container space-y-8 divide-y divide-dividerLight"},yt={class:"md:grid md:gap-4 md:grid-cols-3"},xt={class:"p-8 md:col-span-1"},kt={class:"heading"},Et={class:"my-1 text-secondaryLight"},Ct={class:"p-8 space-y-8 md:col-span-2"},$t={class:"font-semibold text-secondaryDark"},At={class:"my-1 text-secondaryLight"},bt={key:0},Lt={class:"mt-4"},Nt={class:"font-semibold text-secondaryDark"},It={class:"my-1 text-secondaryLight"},St={class:"mt-4"},Ot={class:"font-semibold text-secondaryDark"},Mt={class:"mt-4"},wt={class:"font-semibold text-secondaryDark"},Rt={class:"mt-4"},Tt={class:"font-semibold text-secondaryDark"},Dt={class:"my-1 text-secondaryLight"},Bt={class:"py-4 space-y-4"},Ht={class:"flex items-center"},Pt={class:"flex items-center"},Ft={class:"flex items-center"},Vt={class:"flex items-center"},Xt={class:"md:grid md:gap-4 md:grid-cols-3"},Yt={class:"p-8 md:col-span-1"},Gt={class:"heading"},zt={class:"my-1 text-secondaryLight"},Ut={class:"p-8 space-y-8 md:col-span-2"},Kt={class:"font-semibold text-secondaryDark"},jt={class:"my-1 text-secondaryLight"},Zt={key:0},Wt={key:1},Qt={class:"flex flex-col py-4 space-y-2"},qt={class:"py-4 space-y-4"},Jt={class:"flex items-center"},es={class:"font-semibold text-secondaryDark"},ts={class:"my-1 text-secondaryLight"},ss={class:"py-4 space-y-4"},os={class:"flex items-center"},ns={class:"flex items-center py-4 space-x-2"},cs={class:"relative flex flex-col flex-1"},is=["disabled"],as={for:"url"},ds=T({__name:"settings",setup(I){const s=G(),u=Fe(),_=De();Se({title:L(()=>s("navigation.settings"))});const m=k("THEME_COLOR"),p=k("PROXY_ENABLED"),r=k("PROXY_URL"),n=k("EXTENSIONS_ENABLED"),l=k("TELEMETRY_ENABLED"),g=k("EXPAND_NAVIGATION"),A=k("SIDEBAR_ON_LEFT"),f=k("ZEN_MODE"),$=Oe(Ve,null),v=L(()=>{var y,i;return $.value==="available"&&(i=(y=window.__POSTWOMAN_EXTENSION_HOOK__)==null?void 0:y.getVersion())!=null?i:null}),C=L(()=>Ye()&&$.value==="available"),S=L(()=>Ge()&&$.value==="available"),w=Me(Xe,1e3),h=H(!1),ie=L(()=>({url:r.value}));W(f,y=>{M("EXPAND_NAVIGATION",!y)}),W(ie,({url:y})=>{M("PROXY_URL",y)},{deep:!0});const z=y=>{y==="extension"?(n.value=!n.value,n.value&&(p.value=!1)):(p.value=!p.value,p.value&&(n.value=!1))},ae=()=>{l.value?h.value=!0:R("TELEMETRY_ENABLED")},le=()=>{M("PROXY_URL","https://proxy.hoppscotch.io/"),w.value=se,u.success(`${s("state.cleared")}`)},U=y=>{switch(y){case"system":return"settings.system_mode";case"light":return"settings.light_mode";case"dark":return"settings.dark_mode";case"black":return"settings.black_mode";default:return"settings.system_mode"}};return(y,i)=>{const re=ft,_e=ht,de=ut,pe=nt,K=Be,O=He,j=Y,ue=D,me=Pe,he=B("tippy");return a(),d("div",null,[t("div",vt,[t("div",yt,[t("div",xt,[t("h3",kt,o(e(s)("settings.theme")),1),t("p",Et,o(e(s)("settings.theme_description")),1)]),t("div",Ct,[t("section",null,[t("h4",$t,o(e(s)("settings.background")),1),t("div",At,[x(o(e(s)(U(e(_).preference)))+" ",1),e(_).preference==="system"?(a(),d("span",bt," ("+o(e(s)(U(e(_).value)))+") ",1)):ee("",!0)]),t("div",Lt,[c(re)])]),t("section",null,[t("h4",Nt,o(e(s)("settings.accent_color")),1),t("div",It,o(e(m).charAt(0).toUpperCase()+e(m).slice(1)),1),t("div",St,[c(_e)])]),t("section",null,[t("h4",Ot,o(e(s)("settings.font_size")),1),t("div",Mt,[c(de)])]),t("section",null,[t("h4",wt,o(e(s)("settings.language")),1),t("div",Rt,[c(pe)])]),t("section",null,[t("h4",Tt,o(e(s)("settings.experiments")),1),t("div",Dt,[x(o(e(s)("settings.experiments_notice"))+" ",1),c(K,{class:"link",to:"https://github.com/hoppscotch/hoppscotch/issues/new/choose",blank:"",label:e(s)("app.contact_us")},null,8,["label"]),x(". ")]),t("div",Bt,[t("div",Ht,[c(O,{on:e(l),onChange:ae},{default:E(()=>[x(o(e(s)("settings.telemetry")),1)]),_:1},8,["on"])]),t("div",Pt,[c(O,{on:e(g),onChange:i[0]||(i[0]=b=>e(R)("EXPAND_NAVIGATION"))},{default:E(()=>[x(o(e(s)("settings.expand_navigation")),1)]),_:1},8,["on"])]),t("div",Ft,[c(O,{on:e(A),onChange:i[1]||(i[1]=b=>e(R)("SIDEBAR_ON_LEFT"))},{default:E(()=>[x(o(e(s)("settings.sidebar_on_left")),1)]),_:1},8,["on"])]),t("div",Vt,[c(O,{on:e(f),onChange:i[2]||(i[2]=b=>e(R)("ZEN_MODE"))},{default:E(()=>[x(o(e(s)("layout.zen_mode")),1)]),_:1},8,["on"])])])])])]),t("div",Xt,[t("div",Yt,[t("h3",Gt,o(e(s)("settings.interceptor")),1),t("p",zt,o(e(s)("settings.interceptor_description")),1)]),t("div",Ut,[t("section",null,[t("h4",Kt,o(e(s)("settings.extensions")),1),t("div",jt,[e(v)!=null?(a(),d("span",Zt,o(`${e(s)("settings.extension_version")}: v${e(v).major}.${e(v).minor}`),1)):(a(),d("span",Wt,o(e(s)("settings.extension_version"))+": "+o(e(s)("settings.extension_ver_not_reported")),1))]),t("div",Qt,[t("span",null,[c(j,{to:"https://chrome.google.com/webstore/detail/hoppscotch-browser-extens/amknoiejhlmhancpahfcfcfhllgkpbld",blank:"",icon:e(we),label:"Chrome","info-icon":e(C)?e(Q):null,"active-info-icon":e(C),outline:""},null,8,["icon","info-icon","active-info-icon"])]),t("span",null,[c(j,{to:"https://addons.mozilla.org/en-US/firefox/addon/hoppscotch",blank:"",icon:e(Re),label:"Firefox","info-icon":e(S)?e(Q):null,"active-info-icon":e(S),outline:""},null,8,["icon","info-icon","active-info-icon"])])]),t("div",qt,[t("div",Jt,[c(O,{on:e(n),onChange:i[3]||(i[3]=b=>z("extension"))},{default:E(()=>[x(o(e(s)("settings.extensions_use_toggle")),1)]),_:1},8,["on"])])])]),t("section",null,[t("h4",es,o(e(s)("settings.proxy")),1),t("div",ts,[x(o(`${e(s)("settings.official_proxy_hosting")} ${e(s)("settings.read_the")}`)+" ",1),c(K,{class:"link",to:"https://docs.hoppscotch.io/support/privacy",blank:"",label:e(s)("app.proxy_privacy_policy")},null,8,["label"]),x(". ")]),t("div",ss,[t("div",os,[c(O,{on:e(p),onChange:i[4]||(i[4]=b=>z("proxy"))},{default:E(()=>[x(o(e(s)("settings.proxy_use_toggle")),1)]),_:1},8,["on"])])]),t("div",ns,[t("div",cs,[N(t("input",{id:"url","onUpdate:modelValue":i[5]||(i[5]=b=>Te(r)?r.value=b:null),class:"input floating-input",placeholder:" ",type:"url",autocomplete:"off",disabled:!e(p)},null,8,is),[[q,e(r)]]),t("label",as,o(e(s)("settings.proxy_url")),1)]),N(c(ue,{title:e(s)("settings.reset_default"),icon:e(w),outline:"",class:"rounded",onClick:le},null,8,["title","icon"]),[[he,{theme:"tooltip"}]])])])])])]),c(me,{show:h.value,title:`${e(s)("confirm.remove_telemetry")} ${e(s)("settings.telemetry_helps_us")}`,onHideModal:i[6]||(i[6]=b=>h.value=!1),onResolve:i[7]||(i[7]=()=>{e(R)("TELEMETRY_ENABLED"),h.value=!1})},null,8,["show","title"])])}}});export{ds as default};
//# sourceMappingURL=settings.e0ba710c.js.map