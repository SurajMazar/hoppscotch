import{d as u,l as s,M as m,N as a,K as _,r as f,o as e,c,n as r,t as d,s as h,h as y,O as l}from"./index.2e7559f1.js";const g={class:"flex flex-col items-center justify-center min-h-screen"},k={key:2,class:"mt-4 text-secondaryLight"},v=u({__name:"enter",setup(x){const t=s(!1),n=s(null);return m(()=>{a.performAuthInit()}),_(async()=>{t.value=!0;try{await a.processMagicLink()}catch(o){n.value=o.message}finally{t.value=!1}}),(o,B)=>{const i=y,p=f("AppLogo");return e(),c("div",g,[t.value?(e(),r(i,{key:0})):(e(),r(p,{key:1,class:"w-16 h-16 rounded"})),n.value?(e(),c("pre",k,d(n.value),1)):h("",!0)])}}});typeof l=="function"&&l(v);export{v as default};
