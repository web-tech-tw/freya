import{r,d as V,e as N,f as B,o as s,c as l,a as t,g as x,h as g,w as M,i as D,v as J,j as p,t as v}from"./index-33b903d2.js";import{u as b}from"./freya-c10c5a55.js";import{_ as R,a as h}from"./LoadingCircleIcon-4bd53df5.js";const T={class:"flex flex-wrap w-full justify-center bg-lime-600 py-20"},U={key:0,class:"max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},$={class:"mt-2 text-gray-600"},H={key:1,class:"max-w-md md:w-1/2 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},Q={class:"w-full mt-2 text-gray-600 flex rounded bg-white shadow-md"},q={class:"flex justify-end mt-4"},A={key:1},E={key:2,class:"max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},F={class:"text-gray-800 text-3xl font-semibold"},I={class:"mt-2 text-gray-600"},L=["value"],O={class:"flex justify-end mt-4"},P={key:1},S={key:3,class:"max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},z={class:"mt-2 text-gray-600"},G={key:4,class:"max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},Z={__name:"RoomCreateView",setup(K){const o=r(1),i=r(""),a=r(!1),u=r(""),f=r(""),d=r(""),w=V(()=>`${u.value}`),m=N({label:"",members:"",description:"",backgroundImage:""}),k=()=>{o.value+=1},y=()=>{location.reload()},_=async()=>{if(!i.value){d.value="請輸入社群加入網址。";return}a.value=!0;try{const e=await b().post("rooms",{json:{url:i.value}}).json();Object.assign(m,e.room),u.value=e.code,f.value=e.hash,o.value+=1}catch(n){d.value=n.message}a.value=!1},j=async()=>{a.value=!0;try{await b().patch("rooms",{json:{url:i.value,code:u.value,hash:f.value}}),o.value+=1}catch(n){d.value=n.message}a.value=!1};return(n,e)=>{const C=B("router-link");return s(),l("div",null,[t("div",T,[o.value===1?(s(),l("div",U,[e[5]||(e[5]=t("h2",{class:"text-gray-800 text-3xl font-semibold"}," 建立社群資訊 ",-1)),e[6]||(e[6]=t("p",{class:"mt-2 text-gray-600"}," 嗨！歡迎您採用 Freya 芙蕾雅，煩請您填寫以下資料，以建立您的社群資訊。 ",-1)),t("p",$,[e[3]||(e[3]=x(" 建立社群即同意我們的 ")),g(C,{to:"/terms",class:"text-sky-600 hover:text-sky-500"},{default:M(()=>e[2]||(e[2]=[x(" 服務條款 ")])),_:1}),e[4]||(e[4]=x(" 。 "))]),t("div",{class:"flex justify-end mt-4"},[t("button",{class:"flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full",onClick:k}," 我同意，下一步 ")])])):o.value===2?(s(),l("div",H,[e[7]||(e[7]=t("h2",{class:"text-gray-800 text-3xl font-semibold"}," 建立社群資訊 ",-1)),e[8]||(e[8]=t("p",{class:"mt-2 text-gray-600"}," 請輸入您的社群邀請網址： ",-1)),t("div",Q,[D(t("input",{"onUpdate:modelValue":e[0]||(e[0]=c=>i.value=c),placeholder:"https://line.me/ti/g2/J7bTfoHgmfgc42C9baJNs2gwH00kAMd9QfJDsQ",class:"w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none",type:"text"},null,512),[[J,i.value]])]),t("div",q,[t("button",{class:"flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full",onClick:_},[a.value?(s(),p(h,{key:0,class:"h-6 w-6 animate-spin"})):(s(),l("span",A,"下一步"))])])])):o.value===3?(s(),l("div",E,[t("h2",F,v(m.label),1),e[9]||(e[9]=t("p",{class:"mt-2 text-gray-600"}," 這是您的社群嗎？請複製以下訊息，並貼到您的社群簡介欄位中。 ",-1)),t("p",I,[t("textarea",{value:w.value,readonly:""},null,8,L)]),t("div",O,[t("button",{class:"flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full",onClick:j},[a.value?(s(),p(h,{key:0,class:"h-6 w-6 animate-spin"})):(s(),l("span",P,"驗證所有權"))])])])):o.value===4?(s(),l("div",S,[e[10]||(e[10]=t("h2",{class:"text-gray-800 text-3xl font-semibold"}," 歡迎！ ",-1)),t("p",z,v(m.label),1),t("div",{class:"flex justify-end mt-4"},[t("button",{class:"flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded-full",onClick:y}," 查看社群 ")])])):(s(),l("div",G,[e[11]||(e[11]=t("h2",{class:"text-gray-800 text-3xl font-semibold"}," 錯誤 ",-1)),e[12]||(e[12]=t("p",{class:"mt-2 text-gray-600"}," 未預期的錯誤發生，請重新整理頁面。 ",-1)),t("div",{class:"flex justify-end mt-4"},[t("button",{class:"flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full",onClick:y}," 重新整理 ")])]))]),g(R,{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=c=>d.value=c)},null,8,["modelValue"])])}}};export{Z as default};