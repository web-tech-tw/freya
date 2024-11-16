import{z as I,d as C,h as m,j as R,i as E,x as j,o as r,c as o,a as e,f as y,n as $,l as O,t as b,e as f,m as N,v as H,p as T,F as U,y as D,g as B,q as M,H as P,B as z,I as F,J as L}from"./index-ad47f1c0.js";import{k as Y,u as K,_ as q}from"./LoadingCircleIcon-49bd3284.js";import{_ as G}from"./ToastModal-c4c8045c.js";const{VITE_SARA_RECV_HOST:J}={VITE_HOME_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_RECV_HOST:"https://web-tech.tw/recv/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_FREYA_INTE_HOST:"https://web-tech.tw/freya",VITE_FREYA_RECV_HOST:"https://web-tech.tw/recv/freya",VITE_TURNSTILE_SITE_KEY:"0x4AAAAAAAz8kwCfcwYC8fgp",BASE_URL:"/freya/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},Q=()=>Y.create({prefixUrl:J}),W=(_,n=20)=>`https://api.gravatar.com/avatar/${_}?d=identicon&s=${n}`,X=async(_,n,p=20)=>{const v=await _.get(`users/${n}`).json(),{nickname:w,avatar_hash:c}=v.profile,i=W(c,p);return{id:n,nickname:w,avatarUrl:i}},Z={key:0,class:"flex flex-wrap w-full justify-center bg-white py-20"},ee={key:1,class:"flex flex-wrap w-full justify-center bg-white py-20"},te={class:"flex justify-center my-16"},se={class:"max-w-md lg:w-1/3 py-4 px-8 bg-white shadow-lg rounded-lg my-20"},ae={class:"flex justify-center md:justify-end -mt-16"},re=["alt","src"],oe={class:"text-gray-800 text-3xl font-semibold"},le={class:"text-sm font-normal"},ne={class:"w-full mb-4 text-gray-600 flex rounded bg-white shadow-md"},ce={class:"mt-4 mb-6"},ie=["alt","src"],ue={class:"mx-4"},de={key:0,class:"text-gray-500"},me={key:0,title:"主管理員"},fe={key:1,title:"共同管理員"},ve={__name:"RoomAdminView",setup(_){const n=I(),p=K(),v=Q(),w=C(),{roomCode:c}=n.params,i=m(!1),k=m(!1),h=m(!1),u=m(""),d=m(""),l=R({code:"",label:"",backgroundImage:"",creator:{},administrators:[]}),S=E(()=>{const{backgroundImage:t}=l;return t?{backgroundImage:`url(${t})`}:{}}),V=E(()=>{const{backgroundImage:t}=l;return t?"backdrop-brightness-50":""}),A=async()=>{if(!d.value){u.value="請輸入電子郵件";return}h.value=!0;try{await p.post(`rooms/${c}/administrators`,{json:{email:d.value}}),u.value="已發送邀請函",d.value=""}catch(t){u.value="發送邀請函失敗",console.error(t)}h.value=!1};return j(async()=>{i.value=!0;try{const t=await p.get(`rooms/${c}`).json();Object.assign(l,t);const{creator:s,administrators:a}=t;l.administrators=await Promise.all(a.map(async g=>{const x=await X(v,g);return x.isSelf=g===w._id,x.isCreator=g===s,x}))}catch(t){k.value=!0,console.error(t)}i.value=!1}),(t,s)=>(r(),o("div",{style:B(S.value)},[k.value?(r(),o("div",Z,s[2]||(s[2]=[e("div",{class:"text-center text-red-500"}," 發生錯誤 ",-1)]))):i.value?(r(),o("div",ee,[e("div",te,[y(q,{class:"h-8 w-8 animate-spin text-lime-600"})])])):(r(),o("div",{key:2,class:$(["flex flex-wrap w-full justify-center py-20",V.value])},[e("div",se,[e("div",ae,[e("img",{alt:l.label,src:l.backgroundImage,class:"w-20 h-20 object-cover rounded-full border-2 border-white-500"},null,8,re)]),e("div",null,[e("h2",oe,[O(b(l.label)+" ",1),e("span",le,b(f(c)),1)])]),s[3]||(s[3]=e("p",{class:"mt-4 text-gray-600"}," 傳送管理員邀請函： ",-1)),e("div",ne,[N(e("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>d.value=a),placeholder:"freya@web-tech.tw",class:"w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500",type:"text"},null,512),[[H,d.value]]),e("button",{title:"複製",class:"m-2 rounded px-4 py-2 font-semibold",onClick:A},[h.value?(r(),T(f(M),{key:0,class:"h-6 w-6"})):(r(),T(f(P),{key:1,class:"h-6 w-6"}))])]),s[4]||(s[4]=e("p",{class:"mt-6 text-gray-600"}," 現有管理員： ",-1)),e("ul",ce,[(r(!0),o(U,null,D(l.administrators,a=>(r(),o("li",{key:a.id,class:"rounded-md flex flex-1 items-center px-4 py-1-2 my-3 justify-between"},[e("img",{alt:a.nickname,src:a.avatarUrl,class:"h-8 w-8 rounded-full object-cover"},null,8,ie),e("div",ue,[e("span",null,b(a.nickname),1),a.isSelf?(r(),o("span",de," (您) ")):z("",!0)]),a.isCreator?(r(),o("div",me,[y(f(F),{class:"h-6 w-6"})])):(r(),o("div",fe,[y(f(L),{class:"h-6 w-6"})]))]))),128))])])],2)),y(G,{modelValue:u.value,"onUpdate:modelValue":s[1]||(s[1]=a=>u.value=a)},null,8,["modelValue"])],4))}};export{ve as default};