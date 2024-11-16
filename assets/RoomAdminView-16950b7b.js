import{z as I,d as C,h as m,j as R,i as E,x as j,o as r,c as o,a as e,f as v,n as $,l as O,t as x,e as _,m as N,v as H,p as T,F as U,y as D,g as B,q as M,H as P,B as z,I as F,J as L}from"./index-cb07efb3.js";import{k as Y,u as K,_ as q}from"./LoadingCircleIcon-c376bd32.js";import{_ as G}from"./ToastModal-d83e5f8e.js";const{VITE_SARA_RECV_HOST:J}={VITE_HOME_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_RECV_HOST:"https://web-tech.tw/recv/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_FREYA_INTE_HOST:"https://web-tech.tw/freya",VITE_FREYA_RECV_HOST:"https://web-tech.tw/recv/freya",VITE_TURNSTILE_SITE_KEY:"0x4AAAAAAAz8kwCfcwYC8fgp",BASE_URL:"/freya/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},Q=()=>Y.create({prefixUrl:J}),W=(f,n=20)=>`https://api.gravatar.com/avatar/${f}?d=identicon&s=${n}`,X=async(f,n,p=20)=>{const w=await f.get(`users/${n}`).json(),{nickname:h,avatar_hash:c}=w.profile,i=W(c,p);return{id:n,nickname:h,avatarUrl:i}},Z={key:0,class:"flex flex-wrap w-full justify-center bg-white py-20"},ee={key:1,class:"flex flex-wrap w-full justify-center bg-white py-20"},te={class:"flex justify-center my-16"},se={class:"max-w-md lg:w-1/3 py-4 px-8 bg-white shadow-lg rounded-lg my-20"},ae={class:"flex justify-center md:justify-end -mt-16"},re=["alt","src"],oe={class:"text-gray-800 text-3xl font-semibold"},le={class:"text-sm font-normal"},ne={class:"w-full mb-4 text-gray-600 flex rounded bg-white shadow-md"},ce=["disabled"],ie={class:"mt-4 mb-6"},de=["alt","src"],ue={class:"mx-4"},me={key:0,class:"text-gray-500"},_e={key:0,title:"主管理員"},fe={key:1,title:"共同管理員"},we={__name:"RoomAdminView",setup(f){const n=I(),p=K(),w=Q(),h=C(),{roomCode:c}=n.params,i=m(!1),k=m(!1),y=m(!1),d=m(""),u=m(""),l=R({code:"",label:"",backgroundImage:"",creator:{},administrators:[]}),S=E(()=>{const{backgroundImage:t}=l;return t?{backgroundImage:`url(${t})`}:{}}),V=E(()=>{const{backgroundImage:t}=l;return t?"backdrop-brightness-50":""}),A=async()=>{if(!u.value){d.value="請輸入電子郵件";return}y.value=!0;try{await p.post(`rooms/${c}/administrators`,{json:{email:u.value}}),d.value="已發送邀請函",u.value=""}catch(t){d.value="發送邀請函失敗",console.error(t)}y.value=!1};return j(async()=>{i.value=!0;try{const t=await p.get(`rooms/${c}`).json();Object.assign(l,t);const{creator:s,administrators:a}=t;l.administrators=await Promise.all(a.map(async g=>{const b=await X(w,g);return b.isSelf=g===h._id,b.isCreator=g===s,b}))}catch(t){k.value=!0,console.error(t)}i.value=!1}),(t,s)=>(r(),o("div",{style:B(S.value)},[k.value?(r(),o("div",Z,s[2]||(s[2]=[e("div",{class:"text-center text-red-500"}," 發生錯誤 ",-1)]))):i.value?(r(),o("div",ee,[e("div",te,[v(q,{class:"h-8 w-8 animate-spin text-lime-600"})])])):(r(),o("div",{key:2,class:$(["flex flex-wrap w-full justify-center py-20",V.value])},[e("div",se,[e("div",ae,[e("img",{alt:l.label,src:l.backgroundImage,class:"w-20 h-20 object-cover rounded-full border-2 border-white-500"},null,8,re)]),e("div",null,[e("h2",oe,[O(x(l.label)+" ",1),e("span",le,x(_(c)),1)])]),s[3]||(s[3]=e("p",{class:"mt-4 text-gray-600"}," 傳送管理員邀請函： ",-1)),e("div",ne,[N(e("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>u.value=a),placeholder:"freya@web-tech.tw",class:"w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500",type:"text"},null,512),[[H,u.value]]),e("button",{title:"複製",class:"m-2 rounded px-4 py-2 font-semibold",onClick:A,disabled:y.value},[y.value?(r(),T(_(M),{key:0,class:"h-6 w-6"})):(r(),T(_(P),{key:1,class:"h-6 w-6"}))],8,ce)]),s[4]||(s[4]=e("p",{class:"mt-6 text-gray-600"}," 現有管理員： ",-1)),e("ul",ie,[(r(!0),o(U,null,D(l.administrators,a=>(r(),o("li",{key:a.id,class:"rounded-md flex flex-1 items-center px-4 py-1-2 my-3 justify-between"},[e("img",{alt:a.nickname,src:a.avatarUrl,class:"h-8 w-8 rounded-full object-cover"},null,8,de),e("div",ue,[e("span",null,x(a.nickname),1),a.isSelf?(r(),o("span",me," (您) ")):z("",!0)]),a.isCreator?(r(),o("div",_e,[v(_(F),{class:"h-6 w-6"})])):(r(),o("div",fe,[v(_(L),{class:"h-6 w-6"})]))]))),128))])])],2)),v(G,{modelValue:d.value,"onUpdate:modelValue":s[1]||(s[1]=a=>d.value=a)},null,8,["modelValue"])],4))}};export{we as default};
