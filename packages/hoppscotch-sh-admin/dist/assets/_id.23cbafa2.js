import{d as P,l as u,J as V,E as L,K as q,u as J,D as U,o as t,c as a,a as d,f as n,g as _,s as c,t as p,n as w,z as K,h as G,j as Q,R as W,x as X,y as Y,I as Z}from"./index.2e7559f1.js";import{k as ee,R as se,M as oe,b as te}from"./graphql.3ddfc347.js";import{I as M}from"./trash.69394371.js";import{I as ne}from"./user-minus.c61c28a5.js";import{f as ae}from"./index.a5da96cc.js";const re={key:0,class:"flex justify-center"},le={key:1,class:"flex flex-col space-y-4"},ie={class:"rounded-md"},ue={class:"grid gap-6 mt-4"},de={key:0,class:"relative h-20 w-20"},ce=["src"],me={key:0,class:"absolute left-17 bottom-0 text-xs font-medium px-3 py-0.5 rounded-full bg-green-900 text-green-300"},ve={key:1,class:"bg-primaryDark w-17 p-3 rounded-2xl mb-3 relative"},fe={key:0,class:"absolute left-15 bottom-0 text-xs font-medium px-3 py-0.5 rounded-full bg-green-900 text-green-300"},_e={key:2},pe=n("label",{class:"text-secondaryDark",for:"username"},"UID",-1),ye={class:"w-full p-3 mt-2 bg-zinc-800 border-gray-600 rounded-md focus:border-emerald-600 focus:ring focus:ring-opacity-40 focus:ring-emerald-500"},ge=n("label",{class:"text-secondaryDark",for:"username"},"Name",-1),be={class:"w-full p-3 mt-2 bg-zinc-800 border-gray-600 rounded-md focus:border-emerald-600 focus:ring focus:ring-opacity-40 focus:ring-emerald-500"},ke={key:0},xe={key:1},Ue={key:3},he=n("label",{class:"text-secondaryDark",for:"username"},"Email",-1),Ae={class:"w-full p-3 mt-2 bg-zinc-800 border-gray-200 border-gray-600 rounded-md focus:border-emerald-600 focus:ring focus:ring-opacity-40 focus:ring-emerald-500"},De={key:4},we=n("label",{class:"text-secondaryDark",for:"username"},"Created On",-1),Me={class:"w-full p-3 mt-2 bg-zinc-800 border-gray-600 rounded-md focus:border-emerald-600 focus:ring focus:ring-opacity-40 focus:ring-emerald-500"},$e={class:"flex justify-start mt-8"},Re={key:0},Ce={key:1},ze=P({__name:"_id",setup(Ie){const r=K(),$=o=>ae(new Date(o),"d-MM-yyyy  hh:mm a"),s=u(),{client:R}=V(),y=u(!0),C=L();q(async()=>{var e,l;y.value=!0;const o=await R.query(ee,{uid:C.params.id.toString()}).toPromise();o.error&&r.error("Unable to load user info.."),s.value=(l=(e=o.data)==null?void 0:e.admin.userInfo)!=null?l:{},y.value=!1});const h=J(),I=U(se),m=u(!1),g=u(null),T=o=>{m.value=!0,g.value=o},H=async o=>{if(!o){m.value=!1,r.error("User deletion failed!!");return}const e={uid:o};await I.executeMutation(e).then(l=>{l.error?r.error("User deletion failed!!"):r.success("User deleted successfully!!")}),m.value=!1,g.value=null,h.push("/users")},B=U(oe),v=u(!1),b=u(null),N=o=>{v.value=!0,b.value=o},S=async o=>{if(!o){v.value=!1,r.error("User deletion failed!!");return}const e={uid:o};await B.executeMutation(e).then(l=>{l.error?r.error("Failed to make user an admin!!"):(s.value.isAdmin=!0,r.success("User is now an admin!!"))}),v.value=!1,b.value=null},z=U(te),f=u(!1),k=u(null),j=o=>{f.value=!0,k.value=o},E=async o=>{if(!o){f.value=!1,r.error("Failed to remove admin status!!");return}const e={uid:o};await z.executeMutation(e).then(l=>{l.error?r.error("Failed to remove admin status!!"):(s.value.isAdmin=!1,r.success("Admin status removed!!"))}),f.value=!1,k.value=null};return(o,e)=>{const l=G,F=Q,O=W,A=X,D=Y,x=Z;return y.value?(t(),a("div",re,[d(l)])):(t(),a("div",le,[n("div",null,[n("button",{class:"p-2 mb-2 rounded-3xl bg-divider",onClick:e[0]||(e[0]=i=>_(h).push("/users"))},[d(F,{class:"text-xl"})])]),n("div",ie,[n("div",ue,[s.value.photoURL?(t(),a("div",de,[n("img",{class:"object-cover rounded-3xl mb-3",src:s.value.photoURL},null,8,ce),s.value.isAdmin?(t(),a("span",me," Admin ")):c("",!0)])):(t(),a("div",ve,[d(O,{class:"text-4xl"}),s.value.isAdmin?(t(),a("span",fe," Admin ")):c("",!0)])),s.value.uid?(t(),a("div",_e,[pe,n("div",ye,p(s.value.uid),1)])):c("",!0),n("div",null,[ge,n("div",be,[s.value.displayName?(t(),a("span",ke,p(s.value.displayName),1)):(t(),a("span",xe," (Unnamed user) "))])]),s.value.email?(t(),a("div",Ue,[he,n("div",Ae,p(s.value.email),1)])):c("",!0),s.value.createdOn?(t(),a("div",De,[we,n("div",Me,p($(s.value.createdOn)),1)])):c("",!0)]),n("div",$e,[s.value.isAdmin?(t(),a("span",Ce,[d(A,{class:"mr-4",filled:"",outline:"",icon:_(ne),label:"Remove Admin Privilege",onClick:e[2]||(e[2]=i=>j(s.value.uid))},null,8,["icon"])])):(t(),a("span",Re,[d(A,{class:"mr-4",filled:"",outline:"",label:"Make Admin",onClick:e[1]||(e[1]=i=>N(s.value.uid))})])),s.value.isAdmin?c("",!0):(t(),w(D,{key:2,class:"mr-4 !bg-red-600 !text-gray-300 !hover:text-gray-100",filled:"",outline:"",label:"Delete",icon:_(M),onClick:e[3]||(e[3]=i=>T(s.value.uid))},null,8,["icon"])),s.value.isAdmin?(t(),w(D,{key:3,class:"mr-4 !bg-red-600 !text-gray-300 !hover:text-gray-100",filled:"",outline:"",icon:_(M),label:"Delete",onClick:e[4]||(e[4]=i=>_(r).error("Remove admin privilege to delete the user!!"))},null,8,["icon"])):c("",!0)])]),d(x,{show:m.value,title:"Confirm deletion of user?",onHideModal:e[5]||(e[5]=i=>m.value=!1),onResolve:e[6]||(e[6]=i=>H(g.value))},null,8,["show"]),d(x,{show:v.value,title:"Do you want to make this user into an admin?",onHideModal:e[7]||(e[7]=i=>v.value=!1),onResolve:e[8]||(e[8]=i=>S(b.value))},null,8,["show"]),d(x,{show:f.value,title:"Do you want to remove admin status from this user?",onHideModal:e[9]||(e[9]=i=>f.value=!1),onResolve:e[10]||(e[10]=i=>E(k.value))},null,8,["show"])]))}}});export{ze as default};
