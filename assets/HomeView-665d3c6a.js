import{u as d,w as x,a as c,v as p,o as n,c as o,b as e,d as i,e as u,t as b,r as g,f,g as y,F as v}from"./index-0fc84ed6.js";const h={class:"flex items-center space-x-2"},w={class:"font-bold"},k={__name:"ToastModal",props:{modelValue:{type:String},modelModifiers:{}},emits:["update:modelValue"],setup(m){let l;const s=d(m,"modelValue"),a=()=>{l&&clearTimeout(l),s.value=""};return x(s,()=>{s.value&&(l=setTimeout(a,3e3))}),(t,r)=>c((n(),o("button",{type:"button",class:"fixed right-2 lg:right-24 top-24 z-50 rounded-md px-4 py-2 text-white transition bg-amber-500 hover:bg-amber-600 animate-fade",onClick:a},[e("div",h,[e("span",null,[i(u(g),{class:"h-5 w-5"})]),e("span",w,b(s.value),1)])],512)),[[p,s.value]])}},V={__name:"HomeView",setup(m){const l=f(""),s=()=>{l.value="一生懸命開發中 !!ouo!!"};return(a,t)=>(n(),o(v,null,[e("div",null,[e("div",{class:"mt-10 mx-auto py-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"},[e("div",{class:"sm:text-center lg:text-left"},[t[1]||(t[1]=e("h1",{class:"text-4xl tracking-tight font-extrabold text-gray-900"},[e("span",{class:"block xl:inline"},"Freya"),e("span",{class:"block text-lime-600 xl:inline"},"芙蕾雅")],-1)),t[2]||(t[2]=e("p",{class:"mt-3 text-base text-gray-500"}," 為 LINE OpenChat 社群打擊機器人、廣告、垃圾訊息的專業平台 ",-1)),e("div",{class:"mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"},[e("div",{class:"rounded-md shadow"},[e("button",{class:"w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 md:py-4 md:text-lg md:px-10",onClick:s}," 我的社群不想要廣告，我要 Freya！ ")]),e("div",{class:"mt-3 sm:mt-0 sm:ml-3"},[e("button",{class:"w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-lime-700 bg-lime-100 hover:bg-lime-200 md:py-4 md:text-lg md:px-10",onClick:s}," 我只是來查詢驗證碼的，進入社群管理中心 ")])])])]),t[3]||(t[3]=y('<div class="mt-10 mx-auto py-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"><div class="sm:text-center lg:text-right"><h1 class="text-4xl tracking-tight font-extrabold text-gray-900"><span class="block xl:inline">需要</span><span class="block text-lime-600 xl:inline">獨立安裝版</span><span class="block xl:inline">嗎？</span></h1><p class="mt-3 text-base text-gray-500"> 為了一些不可抗拒的原因，您需要自己架設 Freya 嗎？<br> 我們提供了一個簡易版的系統，讓您可以快速部署您的社群專屬驗證系統。 </p><p class="mt-3 text-base text-gray-500"> Freyja 是 Freya 的概念驗證版本，可以提供簡易的驗證功能。 </p><div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-end"><div class="rounded-md shadow"><a href="https://github.com/web-tech-tw/freyja" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 md:py-4 md:text-lg md:px-10"> 取得 Freyja (Freya 簡易版) </a></div></div></div></div>',1))]),i(k,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=r=>l.value=r)},null,8,["modelValue"])],64))}};export{V as default};
