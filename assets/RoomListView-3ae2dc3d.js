import{u as d}from"./freya-c10c5a55.js";import{e as m,k as u,f,o,c as l,a as e,F as x,l as _,t as n,h as p,w,g as v}from"./index-f816968d.js";const b={class:"my-9"},h={class:"container mb-2 flex mx-auto w-full items-center justify-center"},g={class:"flex flex-col p-4 w-full md:w-2/3 lg:w-1/2"},y={class:"rounded-md flex flex-1 items-center p-4 border-2 mt-3 border-lime-400"},k={class:"flex-1 pl-1 mr-16"},V={class:"font-medium"},j={class:"font-normal inline"},F={__name:"RoomListView",setup(B){const r=m([]);return u(async()=>{const t=await d().get("rooms").json();r.push(...t)}),(a,t)=>{const i=f("router-link");return o(),l("div",b,[t[1]||(t[1]=e("div",{class:"my-3 text-xl text-center"}," 社群列表 ",-1)),e("div",h,[e("ul",g,[(o(!0),l(x,null,_(r,(s,c)=>(o(),l("li",{key:c,class:"border-gray-400 flex flex-row mb-2"},[e("div",y,[e("div",k,[e("div",V,n(s.label),1),e("div",j,n(s.description),1)]),p(i,{to:`/rooms/${s.code}`,class:"w-1/4 text-wrap text-center flex flex-col text-white text-bold rounded-md bg-lime-500 hover:bg-lime-700 justify-center items-center mr-10 p-2"},{default:w(()=>t[0]||(t[0]=[v(" 查看 ")])),_:2},1032,["to"])])]))),128))])])])}}};export{F as default};