import{L as l,A as r,m as i,M as n,o as c,c as d,a,f as m,e as u,N as p,t as f}from"./index-72055197.js";const h={class:"flex items-center space-x-2"},_={class:"font-bold"},x={__name:"ToastModal",props:{modelValue:{type:String},modelModifiers:{}},emits:["update:modelValue"],setup(o){let t;const e=l(o,"modelValue"),s=()=>{t&&clearTimeout(t),e.value=""};return r(e,()=>{e.value&&(t=setTimeout(s,3e3))}),(v,b)=>i((c(),d("button",{type:"button",class:"fixed right-2 lg:right-24 top-24 z-50 rounded-md px-4 py-2 text-white transition bg-amber-500 hover:bg-amber-600 animate-fade",onClick:s},[a("div",h,[a("span",null,[m(u(p),{class:"h-5 w-5"})]),a("span",_,f(e.value),1)])],512)),[[n,e.value]])}};export{x as _};