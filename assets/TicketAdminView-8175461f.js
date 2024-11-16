import{u as L,_ as v}from"./LoadingCircleIcon-69525aa4.js";import{_ as M}from"./ToastModal-8d28eee4.js";import{z as A,u as B,h as r,j as x,i as u,x as N,o as a,c as l,a as s,f as k,n as R,l as z,t as w,p as j,g as H}from"./index-8904b43b.js";const S={key:0,class:"flex flex-wrap w-full justify-center bg-white py-20"},O={key:1,class:"flex flex-wrap w-full justify-center bg-white py-20"},U={key:2,class:"flex flex-wrap w-full justify-center bg-white py-20"},q={class:"flex justify-center my-16"},E={class:"max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20"},F={class:"flex justify-center md:justify-end -mt-16"},G=["alt","src"],J={class:"text-gray-800 text-3xl font-semibold"},K={class:"text-sm font-normal"},P=["innerHTML"],Q={class:"flex justify-end mt-8"},W=["disabled"],X={key:1},Y=["disabled"],Z={key:1},oe={__name:"TicketAdminView",setup(ee){const C=A(),y=B(),d=L(),{invitationCode:m}=C.params,f=r(!1),b=r(!1),g=r(!1),i=r(!1),c=r(!1),n=r(""),o=x({label:"",description:"",backgroundImage:"",pageUrl:""}),h=x({email:"",roomCode:"",invitationCode:""}),_=u(()=>i.value||c.value),V=u(()=>{const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"},{description:e}=o;return e==null?void 0:e.replace(/[&<>"']/g,p=>t[p]).replaceAll(`
`,"<br />")}),$=u(()=>{const{backgroundImage:t}=o;return t?{backgroundImage:`url(${t})`}:{}}),T=u(()=>{const{backgroundImage:t}=o;return t?"backdrop-brightness-50":""}),D=async()=>{i.value=!0;try{await d.patch(`rooms/invitations/${m}`),n.value="接受成功",setTimeout(()=>{y.push(`/rooms/${h.roomCode}`)},1500)}catch(t){n.value="接受失敗",i.value=!1,console.error(t)}},I=async()=>{c.value=!0;try{await d.delete(`rooms/invitations/${m}`),n.value="拒絕成功",setTimeout(()=>{y.push("/")},1500)}catch(t){n.value="拒絕失敗",c.value=!1,console.error(t)}};return N(async()=>{var t;f.value=!0;try{const e=await d.get(`rooms/invitations/${m}`).json();Object.assign(o,e.room),Object.assign(h,e.invitation)}catch(e){g.value=((t=e.response)==null?void 0:t.status)===404,b.value=!0,console.error(e)}f.value=!1}),(t,e)=>(a(),l("div",{style:H($.value)},[g.value?(a(),l("div",S,e[1]||(e[1]=[s("div",{class:"text-center text-amber-700"}," 邀請已失效 ",-1)]))):b.value?(a(),l("div",O,e[2]||(e[2]=[s("div",{class:"text-center text-red-500"}," 發生錯誤 ",-1)]))):f.value?(a(),l("div",U,[s("div",q,[k(v,{class:"h-8 w-8 animate-spin text-lime-600"})])])):(a(),l("div",{key:3,class:R(["flex flex-wrap w-full justify-center py-20",T.value])},[s("div",E,[s("div",F,[s("img",{alt:o.label,src:o.backgroundImage,class:"w-20 h-20 object-cover rounded-full border-2 border-white-500"},null,8,G)]),s("h2",J,[z(w(o.label)+" ",1),s("span",K,w(t.roomCode),1)]),s("p",{class:"mt-6 text-gray-600",innerHTML:V.value},null,8,P),e[3]||(e[3]=s("div",{class:"checkbox my-3"},[s("div",{id:"captcha","data-theme":"light"})],-1)),s("div",Q,[s("button",{class:"flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full mr-3",disabled:_.value,onClick:D},[i.value?(a(),j(v,{key:0,class:"h-6 w-6 animate-spin"})):(a(),l("span",X," 接受 "))],8,W),s("button",{class:"flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full",disabled:_.value,onClick:I},[c.value?(a(),j(v,{key:0,class:"h-6 w-6 animate-spin"})):(a(),l("span",Z," 拒絕 "))],8,Y)])])],2)),k(M,{modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=p=>n.value=p)},null,8,["modelValue"])],4))}};export{oe as default};