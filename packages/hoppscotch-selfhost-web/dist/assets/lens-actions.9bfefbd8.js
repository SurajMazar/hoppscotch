import{o as u,d as p,e as h,D as v,W as w,a$ as y,bh as g,j as i,g as k,b4 as R,I as m,p as x,bi as l,bj as d,bk as I,a6 as f}from"./index.d0a044cd.js";const M={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},T=h("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 17L17 7M7 7h10v10"},null,-1),B=[T];function C(e,n){return u(),p("svg",M,B)}const U={name:"lucide-arrow-up-right",render:C},$={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},L=h("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m6 9l6 6l6-6"},null,-1),D=[L];function j(e,n){return u(),p("svg",$,D)}const E={name:"lucide-chevron-down",render:j};function P(e){const n=f(),t=v(),o=w(y,1e3);return{copyIcon:o,copyResponse:()=>{R(e.value),o.value=m,n.success(`${t("state.copied_to_clipboard")}`)}}}function H(e,n){const t=w(g,1e3),o=f(),s=v();return{downloadIcon:t,downloadResponse:()=>{const r=n.value,b=new Blob([r],{type:e}),a=document.createElement("a"),c=URL.createObjectURL(b);a.href=c,a.download=x(c,d("/"),I,d("#"),l,d("?"),l),document.body.appendChild(a),a.click(),t.value=m,o.success(`${s("state.download_started")}`),setTimeout(()=>{document.body.removeChild(a),URL.revokeObjectURL(c)},1e3)}}}function O(e,n){const t=i(null),o=i(e),s=i("");return{previewFrame:t,previewEnabled:o,togglePreview:()=>{if(o.value=!o.value,o.value){if(t.value.getAttribute("data-previewing-url")===s.value)return;const r=new DOMParser().parseFromString(n.value,"text/html");r.head.innerHTML=`<base href="${s.value}">`+r.head.innerHTML,t.value.srcdoc=r.documentElement.outerHTML,t.value.setAttribute("data-previewing-url",s.value)}}}}function F(e){return{responseBodyText:k(()=>e.type==="loading"||e.type==="network_fail"||e.type==="script_fail"||e.type==="fail"?"":typeof e.body=="string"?e.body:new TextDecoder("utf-8").decode(e.body).replace(/\0+$/,""))}}export{E as I,H as a,U as b,F as c,O as d,P as u};
//# sourceMappingURL=lens-actions.9bfefbd8.js.map