import{aT as Ce,aU as Z,aV as we,o as t,d as i,e as u,f as pe,D as ve,j as M,g as w,p as J,h as $e,aW as ie,aX as se,aY as re,aZ as Ie,a_ as Te,X as G,W as Le,a$ as Ae,b0 as Se,b1 as je,r as Re,z as me,c as O,b2 as le,l as o,b as Me,k as L,Y as ae,t as S,s as p,a as g,N as ee,w as X,b3 as Oe,n as K,q as Y,m as ce,b4 as Ee,I as Ne,b5 as de,x as ye,ac as We,aa as Be,H as Ve,b6 as De,_ as He,b7 as Pe,b8 as ze,am as Ke}from"./index.d0a044cd.js";import{u as Ye,c as Fe,I as Ue,j as Je,a as Xe,b as Qe}from"./utils.a018fd3f.js";import{u as qe,a as Ze,I as _e,b as Ge}from"./lens-actions.9bfefbd8.js";import{i as Q}from"./json.f61ee1c3.js";import{s as et,g as tt,p as ot}from"./newOutline.bdbef8d7.js";import{s as nt}from"./date.ff230613.js";var it=/\s/;function st(e){for(var n=e.length;n--&&it.test(e.charAt(n)););return n}var rt=/^\s+/;function lt(e){return e&&e.slice(0,st(e)+1).replace(rt,"")}var ue=0/0,at=/^[-+]0x[0-9a-f]+$/i,ct=/^0b[01]+$/i,dt=/^0o[0-7]+$/i,ut=parseInt;function fe(e){if(typeof e=="number")return e;if(Ce(e))return ue;if(Z(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=Z(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=lt(e);var d=ct.test(e);return d||dt.test(e)?ut(e.slice(2),d?2:8):at.test(e)?ue:+e}var ft=function(){return we.Date.now()};const q=ft;var pt="Expected a function",vt=Math.max,mt=Math.min;function po(e,n,d){var a,y,f,v,s,_,T=0,$=!1,c=!1,h=!0;if(typeof e!="function")throw new TypeError(pt);n=fe(n)||0,Z(d)&&($=!!d.leading,c="maxWait"in d,f=c?vt(fe(d.maxWait)||0,n):f,h="trailing"in d?!!d.trailing:h);function k(l){var I=a,R=y;return a=y=void 0,T=l,v=e.apply(R,I),v}function j(l){return T=l,s=setTimeout(A,n),$?k(l):v}function x(l){var I=l-_,R=l-T,H=n-I;return c?mt(H,f-R):H}function b(l){var I=l-_,R=l-T;return _===void 0||I>=n||I<0||c&&R>=f}function A(){var l=q();if(b(l))return D(l);s=setTimeout(A,x(l))}function D(l){return s=void 0,h&&a?k(l):(a=y=void 0,v)}function F(){s!==void 0&&clearTimeout(s),T=0,a=_=y=s=void 0}function U(){return s===void 0?v:D(q())}function E(){var l=q(),I=b(l);if(a=arguments,y=this,_=l,I){if(s===void 0)return j(_);if(c)return clearTimeout(s),s=setTimeout(A,n),k(_)}return s===void 0&&(s=setTimeout(A,n)),v}return E.cancel=F,E.flush=U,E}const yt={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},_t=u("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 7L7 17m10 0H7V7"},null,-1),ht=[_t];function gt(e,n){return t(),i("svg",yt,ht)}const kt={name:"lucide-arrow-down-left",render:gt},xt={key:0,class:"divide-y divide-dividerLight"},bt={class:"flex group"},Ct={class:"flex flex-1 divide-x divide-dividerLight"},wt={class:"inline-flex items-center p-2"},$t={key:0,class:"items-center hidden px-1 w-34 sm:inline-flex"},It=["title"],Tt={class:"truncate"},Lt={key:0,class:"!inline"},At={key:0,class:"overflow-hidden bg-primaryContrast"},St={class:"z-10 flex items-center justify-between pl-4 border-b border-dividerLight top-lowerSecondaryStickyFold"},jt={class:"font-semibold truncate text-secondaryLight"},Rt={class:"flex"},Mt={key:0,class:"sticky bottom-0 z-10 flex flex-shrink-0 px-2 overflow-auto overflow-x-auto border-t bg-primaryLight border-dividerLight flex-nowrap"},Ot={key:0,class:"outline-item"},Et={key:1,class:"outline-item"},Nt={key:2,class:"outline-item"},Wt={key:3,class:"outline-item"},Bt={key:0},Vt=["onKeyup"],Dt=["onKeyup"],Ht={key:1},Pt=pe({__name:"LogEntry",props:{entry:null},setup(e){const n=e,d=ve(),a=M(null),y=M(null),f=M(!0),v=w(()=>n.entry.payload),s=M(Q(n.entry.payload)?"json":"raw"),_=w(()=>J(v.value,se(ot),ie(C=>et(C,void 0,2)),$e(()=>v.value))),T=w(()=>J(_.value,se(Je),re(()=>null))),$=w(()=>s.value==="json"?_.value:v.value),c=w(()=>s.value==="json"?"application/ld+json":"text/plain"),{cursor:h}=Ye(y,$,Ie({extendedEditorConfig:{mode:c,readOnly:!0,lineWrapping:f},linter:null,completer:null,environmentHighlights:!1})),k=C=>{const m=Xe(_.value,C.start);m.line--,h.value=m},j=w(()=>J(T.value,Te,ie(C=>tt(C,Fe(_.value,h.value))),re(()=>null))),x=M(!0);G(x,()=>{s.value=Q(n.entry.payload)?"json":"raw"});const b=()=>{x.value=!x.value},{copyIcon:A,copyResponse:D}=qe(v),{downloadIcon:F,downloadResponse:U}=Ze("application/json",v),E=Le(Ae,1e3),l=C=>{Ee(C),E.value=Ne},I=Se(w(()=>{var C;return(C=n.entry.ts)!=null?C:0})),R={connected:"#10b981",connecting:"#10b981",error:"#ff5555",disconnected:"#ff5555"},H=w(()=>R[n.entry.event]),te={info:{icon:de,iconColor:"#10b981"},client:{icon:Ge,iconColor:"#eaaa45"},server:{icon:kt,iconColor:"#38d4ea"},disconnected:{icon:de,iconColor:"#ff5555"}},he=w(()=>te[n.entry.source].iconColor),ge=w(()=>je(te[n.entry.source].icon));return(C,m)=>{const B=ye,oe=We,ke=Be,P=Ve,xe=Re("tippy"),be=De,V=me("tippy");return e.entry?(t(),i("div",xt,[u("div",{style:le({color:o(H)}),class:"realtime-log"},[u("div",bt,[u("div",Ct,[u("div",wt,[(t(),O(Me(o(ge)),{style:le({color:o(he)}),onClick:m[0]||(m[0]=r=>l(e.entry.payload))},null,8,["style"]))]),e.entry.ts!==void 0?(t(),i("div",$t,[L((t(),i("span",{title:o(I),class:"mx-auto truncate ts-font text-secondaryLight hover:text-secondary hover:text-center"},[ae(S(o(nt)(e.entry.ts)),1)],8,It)),[[V,{theme:"tooltip"}]])])):p("",!0),u("div",{class:"inline-grid items-center flex-1 min-w-0 p-2",onClick:m[1]||(m[1]=r=>b())},[u("div",Tt,[e.entry.prefix!==void 0?(t(),i("span",Lt,S(e.entry.prefix),1)):p("",!0),ae(" "+S(e.entry.payload),1)])])]),L(g(B,{title:o(d)("action.copy"),icon:o(E),class:"hidden group-hover:inline-flex",onClick:m[2]||(m[2]=r=>l(e.entry.payload))},null,8,["title","icon"]),[[V,{theme:"tooltip"}]]),g(B,{icon:o(_e),class:ee(["transform",{"rotate-180":!x.value}]),onClick:m[3]||(m[3]=r=>b())},null,8,["icon","class"])])],4),x.value?p("",!0):(t(),i("div",At,[g(ke,{modelValue:s.value,"onUpdate:modelValue":m[4]||(m[4]=r=>s.value=r),styles:"bg-primaryLight","render-inactive-tabs":""},{default:X(()=>[o(Q)(e.entry.payload)?(t(),O(oe,{key:0,id:"json",label:"JSON"})):p("",!0),g(oe,{id:"raw",label:"Raw"})]),_:1},8,["modelValue"]),u("div",St,[u("label",jt,S(o(d)("response.body")),1),u("div",Rt,[L(g(B,{title:o(d)("state.linewrap"),class:ee({"!text-accent":f.value}),icon:o(Ue),onClick:m[5]||(m[5]=Oe(r=>f.value=!f.value,["prevent"]))},null,8,["title","class","icon"]),[[V,{theme:"tooltip"}]]),L(g(B,{title:o(d)("action.download_file"),icon:o(F),onClick:o(U)},null,8,["title","icon","onClick"]),[[V,{theme:"tooltip"}]]),L(g(B,{title:o(d)("action.copy"),icon:o(A),onClick:o(D)},null,8,["title","icon","onClick"]),[[V,{theme:"tooltip"}]])])]),u("div",{ref_key:"editor",ref:y},null,512),o(j)&&s.value==="json"?(t(),i("div",Mt,[(t(!0),i(K,null,Y(o(j),(r,ne)=>(t(),i("div",{key:`item-${ne}`,class:"flex items-center"},[g(xe,{interactive:"",trigger:"click",theme:"popover","on-shown":()=>a.value.focus()},{content:X(({hide:N})=>[r.kind==="ArrayMember"||r.kind==="ObjectMember"?(t(),i("div",Bt,[r.kind==="ArrayMember"?(t(),i("div",{key:0,ref_for:!0,ref_key:"tippyActions",ref:a,class:"flex flex-col focus:outline-none",tabindex:"0",onKeyup:ce(W=>N(),["escape"])},[(t(!0),i(K,null,Y(r.astParent.values,(W,z)=>(t(),O(P,{key:`ast-${z}`,label:`${z}`,onClick:()=>{k(W),N()}},null,8,["label","onClick"]))),128))],40,Vt)):p("",!0),r.kind==="ObjectMember"?(t(),i("div",{key:1,ref_for:!0,ref_key:"tippyActions",ref:a,class:"flex flex-col focus:outline-none",tabindex:"0",onKeyup:ce(W=>N(),["escape"])},[(t(!0),i(K,null,Y(r.astParent.members,(W,z)=>(t(),O(P,{key:`ast-${z}`,label:W.key.value,onClick:()=>{k(W),N()}},null,8,["label","onClick"]))),128))],40,Dt)):p("",!0)])):p("",!0),r.kind==="RootObject"?(t(),i("div",{key:1,ref_for:!0,ref_key:"tippyActions",ref:a,class:"flex flex-col focus:outline-none"},[g(P,{label:"{}",onClick:()=>{k(r.astValue),N()}},null,8,["onClick"])],512)):p("",!0),r.kind==="RootArray"?(t(),i("div",{key:2,ref_for:!0,ref_key:"tippyActions",ref:a,class:"flex flex-col focus:outline-none"},[g(P,{label:"[]",onClick:()=>{k(r.astValue),N()}},null,8,["onClick"])],512)):p("",!0)]),default:X(()=>[r.kind==="RootObject"?(t(),i("div",Ot,"{}")):p("",!0),r.kind==="RootArray"?(t(),i("div",Et,"[]")):p("",!0),r.kind==="ArrayMember"?(t(),i("div",Nt,S(r.index),1)):p("",!0),r.kind==="ObjectMember"?(t(),i("div",Wt,S(r.name),1)):p("",!0)]),_:2},1032,["on-shown"]),ne+1!==o(j).length?(t(),O(be,{key:0,class:"opacity-50 text-secondaryLight svg-icons"})):p("",!0)]))),128))])):p("",!0)]))])):(t(),i("div",Ht,S(o(d)("response.waiting_for_connection")),1))}}});const zt=He(Pt,[["__scopeId","data-v-9dd6753f"]]),Kt={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},Yt=u("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 19V5m-7 7l7-7l7 7"},null,-1),Ft=[Yt];function Ut(e,n){return t(),i("svg",Kt,Ft)}const Jt={name:"lucide-arrow-up",render:Ut},Xt={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},Qt=u("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 5v14m7-7l-7 7l-7-7"},null,-1),qt=[Qt];function Zt(e,n){return t(),i("svg",Xt,qt)}const Gt={name:"lucide-arrow-down",render:Zt},eo={class:"flex flex-col flex-1 overflow-auto whitespace-nowrap"},to={key:0,class:"sticky top-0 z-10 flex items-center justify-between flex-shrink-0 pl-4 overflow-x-auto border-b bg-primary border-dividerLight"},oo={for:"log",class:"font-semibold truncate text-secondaryLight"},no={class:"flex"},io={class:"border-b border-dividerLight"},so={class:"flex flex-col divide-y divide-dividerLight"},vo=pe({__name:"Log",props:{log:{type:Array,default:()=>[]},title:{type:String,default:""}},emits:["delete"],setup(e,{emit:n}){const d=e,a=ve(),y=M(),f=M(!0),v=Pe(y);G(v.isScrolling,$=>{$&&v.directions.top&&(f.value=!1)});const s=$=>{var c,h,k;$==="top"?(c=y.value)==null||c.scroll({behavior:"smooth",top:0}):$==="bottom"&&((k=y.value)==null||k.scroll({behavior:"smooth",top:(h=y.value)==null?void 0:h.scrollHeight}))};G(()=>d.log,ze(()=>{f.value&&s("bottom")},200),{flush:"post"});const _=()=>{f.value=!f.value},T=w(()=>f.value?"text-green-500":"text-red-500");return($,c)=>{const h=ye,k=zt,j=Qe,x=me("tippy");return t(),i("div",eo,[e.log.length!==0?(t(),i("div",to,[u("label",oo,S(e.title),1),u("div",no,[L(g(h,{title:o(a)("action.delete"),icon:o(Ke),onClick:c[0]||(c[0]=b=>n("delete"))},null,8,["title","icon"]),[[x,{theme:"tooltip"}]]),L(g(h,{id:"bottompage",title:o(a)("action.scroll_to_top"),icon:o(Jt),onClick:c[1]||(c[1]=b=>s("top"))},null,8,["title","icon"]),[[x,{theme:"tooltip"}]]),L(g(h,{id:"bottompage",title:o(a)("action.scroll_to_bottom"),icon:o(Gt),onClick:c[2]||(c[2]=b=>s("bottom"))},null,8,["title","icon"]),[[x,{theme:"tooltip"}]]),L(g(h,{id:"bottompage",title:`${o(a)("action.autoscroll")}: ${f.value?o(a)("action.turn_off"):o(a)("action.turn_on")}`,icon:o(_e),class:ee(o(T)),onClick:c[3]||(c[3]=b=>_())},null,8,["title","icon","class"]),[[x,{theme:"tooltip"}]])])])):p("",!0),e.log.length!==0?(t(),i("div",{key:1,ref_key:"logs",ref:y,class:"flex flex-col flex-1 overflow-y-auto"},[u("div",io,[u("div",so,[(t(!0),i(K,null,Y(e.log,(b,A)=>(t(),O(k,{key:`entry-${A}`,entry:b},null,8,["entry"]))),128))])])],512)):(t(),O(j,{key:2,class:"p-4"}))])}}});function mo(){return new Worker("/assets/regex.bf023230.js")}export{mo as W,vo as _,po as d};
//# sourceMappingURL=regex.811ce196.js.map
