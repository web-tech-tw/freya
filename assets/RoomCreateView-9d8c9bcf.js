import{u as N,d as M,r as u,e as b,f as O,g as H,o,c as n,a as t,n as D,h as d,i as h,w as $,j as F,v as B,k as c,t as g,l as y,m as Y,p as z}from"./index-2b8b21f3.js";import{u as w,_}from"./LoadingCircleIcon-e4ef7981.js";import{_ as J}from"./ToastModal-62deabae.js";const L={class:"absolute top-36 flex w-full justify-center"},K={key:0,class:"w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},P={class:"mt-2 text-gray-600"},Q={key:1,class:"w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},q={class:"w-full my-8 text-gray-600 flex rounded bg-white shadow-md"},W={class:"flex justify-end mt-8"},G={key:1},X={key:2,class:"w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},Z={class:"flex justify-center md:justify-end -mt-16"},ee=["alt","src"],te={class:"text-gray-800 text-3xl font-semibold"},se={class:"w-full my-8 text-gray-600 flex rounded bg-white shadow-md"},le=["value"],oe={class:"flex justify-end mt-8"},ae={key:1},ne={key:3,class:"w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},re={class:"text-gray-800 text-3xl font-semibold"},ie={class:"font-normal"},ue={class:"mt-2"},de=["alt","src"],ce={class:"mt-2 text-gray-600"},ge={class:"mt-2 text-gray-600"},me={key:4,class:"w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"},ve={__name:"RoomCreateView",setup(fe){const{VITE_FREYA_INTE_HOST:k}={VITE_HOME_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_FREYA_INTE_HOST:"https://web-tech.tw/freya",VITE_FREYA_RECV_HOST:"https://web-tech.tw/recv/freya",VITE_TURNSTILE_SITE_KEY:"0x4AAAAAAAz8kwCfcwYC8fgp",BASE_URL:"/freya/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},E=N(),T=M(),i=u(!1),m=u(!1),r=u(1),f=u(""),x=u(""),a=u(""),v=b(()=>`煩請前往：
${k}/#/ti/g2/${f.value}
遵循流程取得加入代碼，並在此填入，感謝您
（⚠️請勿回覆加入代碼以外的答案）`),s=O({code:"",label:"",members:"",description:"",backgroundImage:"",pageUrl:""}),C=b(()=>{const{backgroundImage:l}=s;return{backgroundImage:`url(${l})`,filter:"brightness(0.3)",height:"100vh"}}),j=()=>{r.value+=1},I=()=>{location.reload()},V=()=>{const{code:l}=s;E.push(`/rooms/${l}`)},A=async()=>{if(!navigator.clipboard){a.value="您的瀏覽器不支援複製功能";return}try{await navigator.clipboard.writeText(v.value),a.value="已複製代碼",m.value=!0,setTimeout(()=>{m.value=!1},3e3)}catch(l){a.value="無法複製代碼",console.error(l)}},S=async()=>{if(!s.pageUrl){a.value="請輸入社群加入網址。";return}if(!s.pageUrl.startsWith("https://")){const{pageUrl:l}=s,e=l.match(/https?:\/\/\S+/);if(e.length!==1){a.value="請輸入正確的社群加入網址。";return}s.pageUrl=e[0]}i.value=!0;try{const e=await w().post("rooms",{json:{url:s.pageUrl}}).json();Object.assign(s,e.room),f.value=e.code,x.value=e.hash,r.value+=1}catch(l){a.value=l.message}i.value=!1},R=async()=>{i.value=!0;try{await w().patch("rooms",{json:{url:s.pageUrl,code:f.value,hash:x.value}}),r.value+=1}catch(l){a.value=l.message}i.value=!1};return(l,e)=>{const U=H("router-link");return o(),n("div",null,[t("div",{style:D(C.value)},null,4),t("div",L,[r.value===1?(o(),n("div",K,[e[5]||(e[5]=t("h2",{class:"text-gray-800 text-3xl font-semibold"}," 建立社群資訊 ",-1)),e[6]||(e[6]=t("p",{class:"mt-2 text-gray-600"}," 嗨！歡迎您採用 Freya 芙蕾雅，煩請您填寫以下資料，以建立您的社群資訊。 ",-1)),t("p",P,[e[3]||(e[3]=d(" 建立社群即同意我們的 ")),h(U,{to:"/terms",class:"text-sky-600 hover:text-sky-500"},{default:$(()=>e[2]||(e[2]=[d(" 服務條款 ")])),_:1}),e[4]||(e[4]=d(" 。 "))]),t("div",{class:"flex justify-end mt-8"},[t("button",{class:"flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full",onClick:j}," 我同意，下一步 ")])])):r.value===2?(o(),n("div",Q,[e[7]||(e[7]=t("h2",{class:"text-gray-800 text-3xl font-semibold"}," 建立社群資訊 ",-1)),e[8]||(e[8]=t("p",{class:"mt-2 text-gray-600"}," 請輸入您的社群邀請網址： ",-1)),t("div",q,[F(t("input",{"onUpdate:modelValue":e[0]||(e[0]=p=>s.pageUrl=p),placeholder:"https://line.me/ti/g2/J7bTfoHgmfgc42C9baJNs2gwH00kAMd9QfJDsQ",class:"w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500",type:"text"},null,512),[[B,s.pageUrl]])]),t("div",W,[t("button",{class:"flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full",onClick:S},[i.value?(o(),c(_,{key:0,class:"h-6 w-6 animate-spin"})):(o(),n("span",G,"下一步"))])])])):r.value===3?(o(),n("div",X,[t("div",Z,[t("img",{alt:s.label,src:s.backgroundImage,class:"w-20 h-20 object-cover rounded-full border-2 border-white-500"},null,8,ee)]),t("h2",te,g(s.label),1),e[9]||(e[9]=t("p",{class:"mt-2 text-gray-600"}," 這是您的社群嗎？ ",-1)),e[10]||(e[10]=t("p",{class:"mt-2 text-gray-600"}," 請複製以下訊息，並貼到您的社群簡介欄位中： ",-1)),t("div",se,[t("textarea",{value:v.value,class:"w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500 resize-none",readonly:""},null,8,le),t("button",{title:"複製",class:"m-2 rounded px-4 py-2 font-semibold",onClick:A},[m.value?(o(),c(y(Y),{key:0,class:"h-6 w-6"})):(o(),c(y(z),{key:1,class:"h-6 w-6"}))])]),e[11]||(e[11]=t("p",{class:"mt-2 text-gray-600"}," 這份訊息將用來引導申請人轉往使用 Freya 芙蕾雅系統加入您的社群。 ",-1)),e[12]||(e[12]=t("p",{class:"mt-2 text-gray-600"}," 同時用以驗證您對於該社群是否具有管理權限。 ",-1)),t("div",oe,[t("button",{class:"flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full",onClick:R},[i.value?(o(),c(_,{key:0,class:"h-6 w-6 animate-spin"})):(o(),n("span",ae,"驗證所有權"))])])])):r.value===4?(o(),n("div",ne,[t("h2",re,[e[13]||(e[13]=d(" 歡迎加入芙蕾雅！")),e[14]||(e[14]=t("br",null,null,-1)),t("span",ie,g(s.label),1)]),t("div",ue,[t("img",{alt:s.label,src:s.backgroundImage,class:"w-20 h-20 object-cover rounded-full border-2 border-white-500"},null,8,de)]),t("p",ce," 耶！感謝 "+g(y(T).nickname),1),t("p",ge," 恭喜您已經成功為 "+g(s.label)+" 設定 Freya 芙蕾雅， 擺脫垃圾夢魘啦！ ",1),t("div",{class:"flex justify-end mt-8"},[t("button",{class:"flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded-full",onClick:V}," 前往社群管理 ")])])):(o(),n("div",me,[e[15]||(e[15]=t("h2",{class:"text-gray-800 text-3xl font-semibold"}," 錯誤 ",-1)),e[16]||(e[16]=t("p",{class:"mt-2 text-gray-600"}," 未預期的錯誤發生，請重新整理頁面。 ",-1)),t("div",{class:"flex justify-end mt-8"},[t("button",{class:"flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full",onClick:I}," 重新整理 ")])]))]),h(J,{modelValue:a.value,"onUpdate:modelValue":e[1]||(e[1]=p=>a.value=p)},null,8,["modelValue"])])}}};export{ve as default};
