import{f as we,D as ke,j as Q,g as Y,p as K,hv as Se,dJ as Oe,hw as Ee,e3 as Pe,cL as Ae,h as De,aW as se,aX as le,dI as Ce,aY as ce,fe as je,aZ as xe,a_ as $e,b9 as fe,r as Re,z as pe,o as y,d as w,e as x,t as re,l as d,k as U,c as $,N as ne,b3 as ye,s as g,aH as he,a as q,v as Te,ba as Ie,n as oe,q as ie,w as de,m as _e,x as Ne,y as Be,b5 as Le,H as Je,b6 as Me,_ as He}from"./index.d0a044cd.js";import{u as Ye,c as Ke,I as Ue,a as ze,j as Ve}from"./utils.a018fd3f.js";import{r as We}from"./save.06de7724.js";import{p as ve,s as Qe,g as qe}from"./newOutline.bdbef8d7.js";import{c as Xe,u as Ze,a as Ge}from"./lens-actions.9bfefbd8.js";import"./date.ff230613.js";import"./check-circle.c3e1d2f3.js";import"./importers.4a81f634.js";import"./json.f61ee1c3.js";import"./events.9c2a11a1.js";import"./TaskOption.ecbd7dd2.js";import"./rotate-ccw.abb2a2e2.js";import"./json.c2861aa3.js";import"./helpers.fca9b3bf.js";import"./EnvInput.vue_vue_type_script_setup_true_lang.83445eb1.js";function D(e){return D=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(e)}function et(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function be(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function tt(e,t,r){return t&&be(e.prototype,t),r&&be(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function rt(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&ee(e,t)}function G(e){return G=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(r){return r.__proto__||Object.getPrototypeOf(r)},G(e)}function ee(e,t){return ee=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},ee(e,t)}function me(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Z(e,t,r){return me()?Z=Reflect.construct.bind():Z=function(o,i,a){var l=[null];l.push.apply(l,i);var s=Function.bind.apply(o,l),f=new s;return a&&ee(f,a.prototype),f},Z.apply(null,arguments)}function nt(e){return Function.toString.call(e).indexOf("[native code]")!==-1}function ue(e){var t=typeof Map=="function"?new Map:void 0;return ue=function(n){if(n===null||!nt(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(typeof t<"u"){if(t.has(n))return t.get(n);t.set(n,o)}function o(){return Z(n,arguments,G(this).constructor)}return o.prototype=Object.create(n.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),ee(o,n)},ue(e)}function ot(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function it(e,t){if(t&&(typeof t=="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ot(e)}function ut(e){var t=me();return function(){var n=G(e),o;if(t){var i=G(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return it(this,o)}}function ge(e){return at(e)||st(e)||Fe(e)||lt()}function at(e){if(Array.isArray(e))return ae(e)}function st(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Fe(e,t){if(!!e){if(typeof e=="string")return ae(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return ae(e,t)}}function ae(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function lt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ct(e,t){var r=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=Fe(e))||t&&e&&typeof e.length=="number"){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(s){throw s},f:o}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i=!0,a=!1,l;return{s:function(){r=r.call(e)},n:function(){var s=r.next();return i=s.done,s},e:function(s){a=!0,l=s},f:function(){try{!i&&r.return!=null&&r.return()}finally{if(a)throw l}}}}var S=Object.prototype.hasOwnProperty;function X(e,t){return e=e.slice(),e.push(t),e}function z(e,t){return t=t.slice(),t.unshift(e),t}var ft=function(e){rt(r,e);var t=ut(r);function r(n){var o;return et(this,r),o=t.call(this,'JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)'),o.avoidNew=!0,o.value=n,o.name="NewError",o}return tt(r)}(ue(Error));function h(e,t,r,n,o){if(!(this instanceof h))try{return new h(e,t,r,n,o)}catch(s){if(!s.avoidNew)throw s;return s.value}typeof e=="string"&&(o=n,n=r,r=t,t=e,e=null);var i=e&&D(e)==="object";if(e=e||{},this.json=e.json||r,this.path=e.path||t,this.resultType=e.resultType||"value",this.flatten=e.flatten||!1,this.wrap=S.call(e,"wrap")?e.wrap:!0,this.sandbox=e.sandbox||{},this.preventEval=e.preventEval||!1,this.parent=e.parent||null,this.parentProperty=e.parentProperty||null,this.callback=e.callback||n||null,this.otherTypeCallback=e.otherTypeCallback||o||function(){throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.")},e.autostart!==!1){var a={path:i?e.path:t};i?"json"in e&&(a.json=e.json):a.json=r;var l=this.evaluate(a);if(!l||D(l)!=="object")throw new ft(l);return l}}h.prototype.evaluate=function(e,t,r,n){var o=this,i=this.parent,a=this.parentProperty,l=this.flatten,s=this.wrap;if(this.currResultType=this.resultType,this.currPreventEval=this.preventEval,this.currSandbox=this.sandbox,r=r||this.callback,this.currOtherTypeCallback=n||this.otherTypeCallback,t=t||this.json,e=e||this.path,e&&D(e)==="object"&&!Array.isArray(e)){if(!e.path&&e.path!=="")throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');if(!S.call(e,"json"))throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');var f=e;t=f.json,l=S.call(e,"flatten")?e.flatten:l,this.currResultType=S.call(e,"resultType")?e.resultType:this.currResultType,this.currSandbox=S.call(e,"sandbox")?e.sandbox:this.currSandbox,s=S.call(e,"wrap")?e.wrap:s,this.currPreventEval=S.call(e,"preventEval")?e.preventEval:this.currPreventEval,r=S.call(e,"callback")?e.callback:r,this.currOtherTypeCallback=S.call(e,"otherTypeCallback")?e.otherTypeCallback:this.currOtherTypeCallback,i=S.call(e,"parent")?e.parent:i,a=S.call(e,"parentProperty")?e.parentProperty:a,e=e.path}if(i=i||null,a=a||null,Array.isArray(e)&&(e=h.toPathString(e)),!(!e&&e!==""||!t)){var u=h.toPathArray(e);u[0]==="$"&&u.length>1&&u.shift(),this._hasParentSelector=null;var c=this._trace(u,t,["$"],i,a,r).filter(function(_){return _&&!_.isParentSelector});return c.length?!s&&c.length===1&&!c[0].hasArrExpr?this._getPreferredOutput(c[0]):c.reduce(function(_,v){var b=o._getPreferredOutput(v);return l&&Array.isArray(b)?_=_.concat(b):_.push(b),_},[]):s?[]:void 0}};h.prototype._getPreferredOutput=function(e){var t=this.currResultType;switch(t){case"all":{var r=Array.isArray(e.path)?e.path:h.toPathArray(e.path);return e.pointer=h.toPointer(r),e.path=typeof e.path=="string"?e.path:h.toPathString(e.path),e}case"value":case"parent":case"parentProperty":return e[t];case"path":return h.toPathString(e[t]);case"pointer":return h.toPointer(e.path);default:throw new TypeError("Unknown result type")}};h.prototype._handleCallback=function(e,t,r){if(t){var n=this._getPreferredOutput(e);e.path=typeof e.path=="string"?e.path:h.toPathString(e.path),t(n,r,e)}};h.prototype._trace=function(e,t,r,n,o,i,a,l){var s=this,f;if(!e.length)return f={path:r,value:t,parent:n,parentProperty:o,hasArrExpr:a},this._handleCallback(f,i,"value"),f;var u=e[0],c=e.slice(1),_=[];function v(F){Array.isArray(F)?F.forEach(function(P){_.push(P)}):_.push(F)}if((typeof u!="string"||l)&&t&&S.call(t,u))v(this._trace(c,t[u],X(r,u),t,u,i,a));else if(u==="*")this._walk(u,c,t,r,n,o,i,function(F,P,N,A,E,B,p,j){v(s._trace(z(F,N),A,E,B,p,j,!0,!0))});else if(u==="..")v(this._trace(c,t,r,n,o,i,a)),this._walk(u,c,t,r,n,o,i,function(F,P,N,A,E,B,p,j){D(A[F])==="object"&&v(s._trace(z(P,N),A[F],X(E,F),A,F,j,!0))});else{if(u==="^")return this._hasParentSelector=!0,{path:r.slice(0,-1),expr:c,isParentSelector:!0};if(u==="~")return f={path:X(r,u),value:o,parent:n,parentProperty:null},this._handleCallback(f,i,"property"),f;if(u==="$")v(this._trace(c,t,r,null,null,i,a));else if(/^(\x2D?[0-9]*):(\x2D?[0-9]*):?([0-9]*)$/.test(u))v(this._slice(u,c,t,r,n,o,i));else if(u.indexOf("?(")===0){if(this.currPreventEval)throw new Error("Eval [?(expr)] prevented in JSONPath expression.");this._walk(u,c,t,r,n,o,i,function(F,P,N,A,E,B,p,j){s._eval(P.replace(/^\?\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\)$/,"$1"),A[F],F,E,B,p)&&v(s._trace(z(F,N),A,E,B,p,j,!0))})}else if(u[0]==="("){if(this.currPreventEval)throw new Error("Eval [(expr)] prevented in JSONPath expression.");v(this._trace(z(this._eval(u,t,r[r.length-1],r.slice(0,-1),n,o),c),t,r,n,o,i,a))}else if(u[0]==="@"){var b=!1,O=u.slice(1,-2);switch(O){case"scalar":(!t||!["object","function"].includes(D(t)))&&(b=!0);break;case"boolean":case"string":case"undefined":case"function":D(t)===O&&(b=!0);break;case"integer":Number.isFinite(t)&&!(t%1)&&(b=!0);break;case"number":Number.isFinite(t)&&(b=!0);break;case"nonFinite":typeof t=="number"&&!Number.isFinite(t)&&(b=!0);break;case"object":t&&D(t)===O&&(b=!0);break;case"array":Array.isArray(t)&&(b=!0);break;case"other":b=this.currOtherTypeCallback(t,r,n,o);break;case"null":t===null&&(b=!0);break;default:throw new TypeError("Unknown value type "+O)}if(b)return f={path:r,value:t,parent:n,parentProperty:o},this._handleCallback(f,i,"value"),f}else if(u[0]==="`"&&t&&S.call(t,u.slice(1))){var L=u.slice(1);v(this._trace(c,t[L],X(r,L),t,L,i,a,!0))}else if(u.includes(",")){var J=u.split(","),R=ct(J),T;try{for(R.s();!(T=R.n()).done;){var V=T.value;v(this._trace(z(V,c),t,r,n,o,i,!0))}}catch(F){R.e(F)}finally{R.f()}}else!l&&t&&S.call(t,u)&&v(this._trace(c,t[u],X(r,u),t,u,i,a,!0))}if(this._hasParentSelector)for(var C=0;C<_.length;C++){var m=_[C];if(m&&m.isParentSelector){var k=this._trace(m.expr,t,m.path,n,o,i,a);if(Array.isArray(k)){_[C]=k[0];for(var I=k.length,W=1;W<I;W++)C++,_.splice(C,0,k[W])}else _[C]=k}}return _};h.prototype._walk=function(e,t,r,n,o,i,a,l){if(Array.isArray(r))for(var s=r.length,f=0;f<s;f++)l(f,e,t,r,n,o,i,a);else r&&D(r)==="object"&&Object.keys(r).forEach(function(u){l(u,e,t,r,n,o,i,a)})};h.prototype._slice=function(e,t,r,n,o,i,a){if(!!Array.isArray(r)){var l=r.length,s=e.split(":"),f=s[2]&&Number.parseInt(s[2])||1,u=s[0]&&Number.parseInt(s[0])||0,c=s[1]&&Number.parseInt(s[1])||l;u=u<0?Math.max(0,u+l):Math.min(l,u),c=c<0?Math.max(0,c+l):Math.min(l,c);for(var _=[],v=u;v<c;v+=f){var b=this._trace(z(v,t),r,n,o,i,a,!0);b.forEach(function(O){_.push(O)})}return _}};h.prototype._eval=function(e,t,r,n,o,i){e.includes("@parentProperty")&&(this.currSandbox._$_parentProperty=i,e=e.replace(/@parentProperty/g,"_$_parentProperty")),e.includes("@parent")&&(this.currSandbox._$_parent=o,e=e.replace(/@parent/g,"_$_parent")),e.includes("@property")&&(this.currSandbox._$_property=r,e=e.replace(/@property/g,"_$_property")),e.includes("@path")&&(this.currSandbox._$_path=h.toPathString(n.concat([r])),e=e.replace(/@path/g,"_$_path")),e.includes("@root")&&(this.currSandbox._$_root=this.json,e=e.replace(/@root/g,"_$_root")),/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/.test(e)&&(this.currSandbox._$_v=t,e=e.replace(/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g,"_$_v$1"));try{return this.vm.runInNewContext(e,this.currSandbox)}catch(a){throw new Error("jsonPath: "+a.message+": "+e)}};h.cache={};h.toPathString=function(e){for(var t=e,r=t.length,n="$",o=1;o<r;o++)/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(t[o])||(n+=/^[\*0-9]+$/.test(t[o])?"["+t[o]+"]":"['"+t[o]+"']");return n};h.toPointer=function(e){for(var t=e,r=t.length,n="",o=1;o<r;o++)/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(t[o])||(n+="/"+t[o].toString().replace(/~/g,"~0").replace(/\//g,"~1"));return n};h.toPathArray=function(e){var t=h.cache;if(t[e])return t[e].concat();var r=[],n=e.replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g,";$&;").replace(/['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))['\]]/g,function(i,a){return"[#"+(r.push(a)-1)+"]"}).replace(/\[["']((?:(?!['\]])[\s\S])*)["']\]/g,function(i,a){return"['"+a.replace(/\./g,"%@%").replace(/~/g,"%%@@%%")+"']"}).replace(/~/g,";~;").replace(/["']?\.["']?(?!(?:(?!\[)[\s\S])*\])|\[["']?/g,";").replace(/%@%/g,".").replace(/%%@@%%/g,"~").replace(/(?:;)?(\^+)(?:;)?/g,function(i,a){return";"+a.split("").join(";")+";"}).replace(/;;;|;;/g,";..;").replace(/;$|'?\]|'$/g,""),o=n.split(";").map(function(i){var a=i.match(/#([0-9]+)/);return!a||!a[1]?i:r[a[1]]});return t[e]=o,t[e].concat()};var pt=function(t,r,n){for(var o=t.length,i=0;i<o;i++){var a=t[i];n(a)&&r.push(t.splice(i--,1)[0])}};h.prototype.vm={runInNewContext:function(t,r){var n=Object.keys(r),o=[];pt(n,o,function(f){return typeof r[f]=="function"});var i=n.map(function(f,u){return r[f]}),a=o.reduce(function(f,u){var c=r[u].toString();return/function/.test(c)||(c="function "+c),"var "+u+"="+c+";"+f},"");t=a+t,!/(["'])use strict\1/.test(t)&&!n.includes("arguments")&&(t="var arguments = undefined;"+t),t=t.replace(/;[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/,"");var l=t.lastIndexOf(";"),s=l>-1?t.slice(0,l+1)+" return "+t.slice(l+1):" return "+t;return Z(Function,ge(n).concat([s])).apply(void 0,ge(i))}};const yt={key:0,class:"flex flex-col flex-1"},ht={class:"sticky z-10 flex items-center justify-between flex-shrink-0 pl-4 overflow-x-auto border-b bg-primary border-dividerLight top-lowerSecondaryStickyFold"},dt={class:"font-semibold truncate text-secondaryLight"},_t={class:"flex items-center"},vt={key:0,class:"sticky z-10 flex flex-shrink-0 overflow-x-auto border-b bg-primary top-lowerTertiaryStickyFold border-dividerLight"},bt={class:"inline-flex items-center flex-1 bg-primaryLight border-divider text-secondaryDark"},gt={class:"inline-flex items-center flex-1 px-4"},mt=["placeholder"],Ft={key:1,class:"sticky bottom-0 z-10 flex flex-shrink-0 px-2 overflow-auto overflow-x-auto border-t bg-primaryLight border-dividerLight flex-nowrap"},wt={key:0,class:"outline-item"},kt={key:1,class:"outline-item"},St={key:2,class:"outline-item"},Ot={key:3,class:"outline-item"},Et={key:0},Pt=["onKeyup"],At=["onKeyup"],Dt=we({__name:"JSONLensRenderer",props:{response:null},setup(e){const t=e,r=ke(),{responseBodyText:n}=Xe(t.response),o=Q(!1),i=Q(""),a=Y(()=>K(n.value,Se(ve,()=>({type:"JSON_PARSE_FAILED"})))),l=Y(()=>i.value.length>0?K(a.value,Ee(m=>Pe(()=>h({path:i.value,json:m}),k=>({type:"JSON_PATH_QUERY_FAILED",error:k}))),Oe(JSON.stringify)):Ae(n.value)),s=Y(()=>K(l.value,Ce(()=>n.value),le(ve),se(m=>Qe(m,void 0,2)),De(()=>n.value))),f=Y(()=>K(s.value,le(Ve),ce(()=>null))),u=Y(()=>K(l.value,je(m=>{switch(m.type){case"JSON_PATH_QUERY_FAILED":return{type:"JSON_PATH_QUERY_ERROR",error:m.error.message};case"JSON_PARSE_FAILED":return{type:"JSON_PARSE_FAILED",error:r("error.json_parsing_failed").toString()}}},m=>m==="[]"?{type:"RESPONSE_EMPTY",error:r("error.no_results_found").toString()}:void 0))),{copyIcon:c,copyResponse:_}=Ze(s),{downloadIcon:v,downloadResponse:b}=Ge("application/json",s),O=Q(null),L=Q(null),J=Q(!0),{cursor:R}=Ye(L,s,xe({extendedEditorConfig:{mode:"application/ld+json",readOnly:!0,lineWrapping:J},linter:null,completer:null,environmentHighlights:!0})),T=m=>{const k=ze(s.value,m.start);k.line--,R.value=k},V=Y(()=>K(f.value,$e,se(m=>qe(m,Ke(s.value,R.value))),ce(()=>null))),C=()=>{i.value="",o.value=!o.value};return fe("response.file.download",()=>b()),fe("response.copy",()=>_()),(m,k)=>{const I=Ne,W=Be,F=Le,P=Je,N=Re("tippy"),A=Me,E=pe("tippy"),B=pe("focus");return e.response.type==="success"||e.response.type==="fail"?(y(),w("div",yt,[x("div",ht,[x("label",dt,re(d(r)("response.body")),1),x("div",_t,[e.response.body?U((y(),$(I,{key:0,title:d(r)("state.linewrap"),class:ne({"!text-accent":J.value}),icon:d(Ue),onClick:k[0]||(k[0]=ye(p=>J.value=!J.value,["prevent"]))},null,8,["title","class","icon"])),[[E,{theme:"tooltip"}]]):g("",!0),e.response.body?U((y(),$(I,{key:1,title:d(r)("action.filter"),icon:d(We),class:ne({"!text-accent":o.value}),onClick:ye(C,["prevent"])},null,8,["title","icon","class","onClick"])),[[E,{theme:"tooltip"}]]):g("",!0),e.response.body?U((y(),$(I,{key:2,title:`${d(r)("action.download_file")} <kbd>${d(he)()}</kbd><kbd>J</kbd>`,icon:d(v),onClick:d(b)},null,8,["title","icon","onClick"])),[[E,{theme:"tooltip",allowHTML:!0}]]):g("",!0),e.response.body?U((y(),$(I,{key:3,title:`${d(r)("action.copy")} <kbd>${d(he)()}</kbd><kbd>.</kbd>`,icon:d(c),onClick:d(_)},null,8,["title","icon","onClick"])),[[E,{theme:"tooltip",allowHTML:!0}]]):g("",!0)])]),o.value?(y(),w("div",vt,[x("div",bt,[x("span",gt,[q(W,{class:"w-4 h-4 text-secondaryLight"}),U(x("input",{"onUpdate:modelValue":k[1]||(k[1]=p=>i.value=p),class:"input !border-0 !px-2",placeholder:`${d(r)("response.filter_response_body")}`,type:"text"},null,8,mt),[[Te,i.value],[B]])]),d(u)?(y(),w("div",{key:0,class:ne(["flex items-center justify-center px-2 py-1 rounded text-tiny text-accentContrast",{"bg-red-500":d(u).type==="JSON_PARSE_FAILED"||d(u).type==="JSON_PATH_QUERY_ERROR","bg-amber-500":d(u).type==="RESPONSE_EMPTY"}])},[q(F,{class:"svg-icons mr-1.5"}),x("span",null,re(d(u).error),1)],2)):g("",!0),e.response.body?U((y(),$(I,{key:1,title:d(r)("app.wiki"),icon:d(Ie),to:"https://github.com/JSONPath-Plus/JSONPath",blank:""},null,8,["title","icon"])),[[E,{theme:"tooltip"}]]):g("",!0)])])):g("",!0),x("div",{ref_key:"jsonResponse",ref:L,class:"flex flex-col flex-1 h-auto h-full"},null,512),d(V)?(y(),w("div",Ft,[(y(!0),w(oe,null,ie(d(V),(p,j)=>(y(),w("div",{key:`item-${j}`,class:"flex items-center"},[q(N,{interactive:"",trigger:"click",theme:"popover","on-shown":()=>O.value[j].focus()},{content:de(({hide:M})=>[p.kind==="ArrayMember"||p.kind==="ObjectMember"?(y(),w("div",Et,[p.kind==="ArrayMember"?(y(),w("div",{key:0,ref_for:!0,ref_key:"tippyActions",ref:O,class:"flex flex-col focus:outline-none",tabindex:"0",onKeyup:_e(H=>M(),["escape"])},[(y(!0),w(oe,null,ie(p.astParent.values,(H,te)=>(y(),$(P,{key:`ast-${te}`,label:`${te}`,onClick:()=>{T(H),M()}},null,8,["label","onClick"]))),128))],40,Pt)):g("",!0),p.kind==="ObjectMember"?(y(),w("div",{key:1,ref_for:!0,ref_key:"tippyActions",ref:O,class:"flex flex-col focus:outline-none",tabindex:"0",onKeyup:_e(H=>M(),["escape"])},[(y(!0),w(oe,null,ie(p.astParent.members,(H,te)=>(y(),$(P,{key:`ast-${te}`,label:H.key.value,onClick:()=>{T(H),M()}},null,8,["label","onClick"]))),128))],40,At)):g("",!0)])):g("",!0),p.kind==="RootObject"?(y(),w("div",{key:1,ref_for:!0,ref_key:"tippyActions",ref:O,class:"flex flex-col"},[q(P,{label:"{}",onClick:()=>{T(p.astValue),M()}},null,8,["onClick"])],512)):g("",!0),p.kind==="RootArray"?(y(),w("div",{key:2,ref_for:!0,ref_key:"tippyActions",ref:O,class:"flex flex-col"},[q(P,{label:"[]",onClick:()=>{T(p.astValue),M()}},null,8,["onClick"])],512)):g("",!0)]),default:de(()=>[p.kind==="RootObject"?(y(),w("div",wt,"{}")):g("",!0),p.kind==="RootArray"?(y(),w("div",kt,"[]")):g("",!0),p.kind==="ArrayMember"?(y(),w("div",St,re(p.index),1)):g("",!0),p.kind==="ObjectMember"?(y(),w("div",Ot,re(p.name),1)):g("",!0)]),_:2},1032,["on-shown"]),j+1!==d(V).length?(y(),$(A,{key:0,class:"opacity-50 text-secondaryLight svg-icons"})):g("",!0)]))),128))])):g("",!0)])):g("",!0)}}});const Ut=He(Dt,[["__scopeId","data-v-6bd5a40c"]]);export{Ut as default};
//# sourceMappingURL=JSONLensRenderer.2cf76285.js.map