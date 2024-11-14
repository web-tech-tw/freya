import{x as D,r as u,f as k,e as j,y as S,q as A,o,c as l,a as e,n as I,i as c,h as g,t as m,l as f,j as N,v as M,k as p,z as C,A as z,B as L,C as O,D as R}from"./index-2b8b21f3.js";import{u as T,_ as b}from"./LoadingCircleIcon-e4ef7981.js";import{_ as U}from"./ToastModal-62deabae.js";const q={key:0,class:"absolute top-36 flex flex-col w-full"},E={key:1,class:"absolute top-36 flex flex-col w-full"},Q={class:"flex justify-center my-16"},F={key:2,class:"absolute top-36 flex flex-col w-full justify-start"},G={class:"w-full flex justify-center"},H={class:"max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mt-20 mb-8"},J={class:"flex justify-center md:justify-end -mt-16"},K=["alt","src"],P={class:"text-gray-800 text-3xl font-semibold"},W={class:"text-sm font-normal"},X={class:"w-full mb-4 text-gray-600 flex rounded bg-white shadow-md"},Y={key:0,class:"w-full flex justify-center"},Z={key:0,class:"max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mb-20"},ee={key:1,class:"max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mb-20"},se={class:"flex justify-center my-2"},te={class:"my-4 text-gray-600"},oe={class:"font-normal"},ae={key:0,class:"my-4 text-gray-600"},le={key:2,class:"max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mb-20"},ne={class:"flex justify-center my-2"},re={class:"my-4 text-gray-600"},de={class:"font-normal"},fe={__name:"RoomSubmissionView",setup(ie){const V=D(),h=T(),{roomCode:y}=V.params,n=u(!1),w=u(!1),r=u(!1),x=u(""),d=u(""),i=k({label:"",description:"",backgroundImage:""}),a=k({code:"",roomCode:"",createdAt:"",updatedAt:""}),_=j(()=>r.value&&a.roomCode===y),$=j(()=>{const{backgroundImage:t}=i;return{backgroundImage:`url(${t})`,filter:"brightness(0.3)",height:"100vh"}});S(d,t=>{t!==a.code&&(r.value=!1,a.code="",a.roomCode="")});const B=async()=>{if(!d.value){x.value="請輸入驗證碼";return}if(r.value){d.value="";return}a.code=d.value,n.value=!0,r.value=!0;try{const t=await h.get(`rooms/${y}/submissions/${a.code}`).json();Object.assign(a,t)}catch(t){console.error(t)}n.value=!1};return A(async()=>{n.value=!0;try{const t=await h.get(`rooms/${y}`).json();Object.assign(i,t)}catch(t){w.value=!0,console.error(t)}n.value=!1}),(t,s)=>(o(),l("div",null,[e("div",{style:I($.value)},null,4),w.value?(o(),l("div",q,s[2]||(s[2]=[e("div",{class:"text-center text-red-500"}," 發生錯誤 ",-1)]))):n.value?(o(),l("div",E,[e("div",Q,[c(b,{class:"h-8 w-8 animate-spin text-lime-600"})])])):(o(),l("div",F,[e("div",G,[e("div",H,[e("div",J,[e("img",{alt:i.label,src:i.backgroundImage,class:"w-20 h-20 object-cover rounded-full border-2 border-white-500"},null,8,K)]),e("h2",P,[g(m(i.label)+" ",1),e("span",W,m(f(y)),1)]),s[3]||(s[3]=e("p",{class:"mt-6 text-gray-600"}," 社群加入申請管理系統 ",-1)),s[4]||(s[4]=e("p",{class:"mt-6 text-gray-600"}," 請輸入對方提供的驗證碼： ",-1)),e("div",X,[N(e("input",{"onUpdate:modelValue":s[0]||(s[0]=v=>d.value=v),placeholder:"pmShBo2Bg",class:"w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500",type:"text"},null,512),[[M,d.value]]),e("button",{class:"m-2 rounded px-4 py-2 font-semibold",onClick:B},[n.value?(o(),p(b,{key:0,class:"h-6 w-6 animate-spin"})):r.value?(o(),p(f(z),{key:1,class:"h-6 w-6"})):(o(),p(f(L),{key:2,class:"h-6 w-6"}))])])])]),r.value?(o(),l("div",Y,[n.value?(o(),l("div",Z,[c(b,{class:"w-14 h-14 animate-spin"})])):_.value?(o(),l("div",ee,[e("div",se,[c(f(O),{class:"w-14 h-14 rounded-full bg-white border-2 border-white-500"})]),s[6]||(s[6]=e("h3",{class:"text-gray-800 text-xl font-semibold"}," 驗證碼有效 ",-1)),e("p",te,[s[5]||(s[5]=g(" 驗證碼： ")),e("span",oe,m(a.code),1)]),_.value?(o(),l("p",ae," 申請時間："+m(new Date(a.createdAt).toLocaleString()),1)):C("",!0)])):(o(),l("div",le,[e("div",ne,[c(f(R),{class:"w-14 h-14 rounded-full bg-white border-2 border-white-500"})]),s[8]||(s[8]=e("h3",{class:"text-gray-800 text-xl font-semibold"}," 驗證碼無效 ",-1)),e("p",re,[s[7]||(s[7]=g(" 驗證碼： ")),e("span",de,m(a.code),1)])]))])):C("",!0)])),c(U,{modelValue:x.value,"onUpdate:modelValue":s[1]||(s[1]=v=>x.value=v)},null,8,["modelValue"])]))}};export{fe as default};
