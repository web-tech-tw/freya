var k=Object.defineProperty;var q=(r,t,e)=>t in r?k(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var h=(r,t,e)=>(q(r,typeof t!="symbol"?t+"":t,e),e);class w extends Error{constructor(e,s,o){const n=e.status||e.status===0?e.status:"",i=e.statusText||"",a=`${n} ${i}`.trim(),u=a?`status code ${a}`:"an unknown error";super(`Request failed with ${u}: ${s.method} ${s.url}`);h(this,"response");h(this,"request");h(this,"options");this.name="HTTPError",this.response=e,this.request=s,this.options=o}}class T extends Error{constructor(e){super(`Request timed out: ${e.method} ${e.url}`);h(this,"request");this.name="TimeoutError",this.request=e}}const p=r=>r!==null&&typeof r=="object",l=(...r)=>{for(const t of r)if((!p(t)||Array.isArray(t))&&t!==void 0)throw new TypeError("The `options` argument must be an object");return b({},...r)},E=(r={},t={})=>{const e=new globalThis.Headers(r),s=t instanceof globalThis.Headers,o=new globalThis.Headers(t);for(const[n,i]of o.entries())s&&i==="undefined"||i===void 0?e.delete(n):e.set(n,i);return e};function d(r,t,e){return Object.hasOwn(t,e)&&t[e]===void 0?[]:b(r[e]??[],t[e]??[])}const g=(r={},t={})=>({beforeRequest:d(r,t,"beforeRequest"),beforeRetry:d(r,t,"beforeRetry"),afterResponse:d(r,t,"afterResponse"),beforeError:d(r,t,"beforeError")}),b=(...r)=>{let t={},e={},s={};for(const o of r)if(Array.isArray(o))Array.isArray(t)||(t=[]),t=[...t,...o];else if(p(o)){for(let[n,i]of Object.entries(o))p(i)&&n in t&&(i=b(t[n],i)),t={...t,[n]:i};p(o.hooks)&&(s=g(s,o.hooks),t.hooks=s),p(o.headers)&&(e=E(e,o.headers),t.headers=e)}return t},x=(()=>{let r=!1,t=!1;const e=typeof globalThis.ReadableStream=="function",s=typeof globalThis.Request=="function";if(e&&s)try{t=new globalThis.Request("https://empty.invalid",{body:new globalThis.ReadableStream,method:"POST",get duplex(){return r=!0,"half"}}).headers.has("Content-Type")}catch(o){if(o instanceof Error&&o.message==="unsupported BodyInit type")return!1;throw o}return r&&!t})(),C=typeof globalThis.AbortController=="function",I=typeof globalThis.ReadableStream=="function",O=typeof globalThis.FormData=="function",A=["get","post","put","patch","head","delete"],N={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},_=2147483647,S=Symbol("stop"),H={json:!0,parseJson:!0,stringifyJson:!0,searchParams:!0,prefixUrl:!0,retry:!0,timeout:!0,hooks:!0,throwHttpErrors:!0,onDownloadProgress:!0,fetch:!0},P={method:!0,headers:!0,body:!0,mode:!0,credentials:!0,cache:!0,redirect:!0,referrer:!0,referrerPolicy:!0,integrity:!0,keepalive:!0,signal:!0,window:!0,dispatcher:!0,duplex:!0,priority:!0},U=r=>A.includes(r)?r.toUpperCase():r,L=["get","put","head","delete","options","trace"],V=[408,413,429,500,502,503,504],j=[413,429,503],R={limit:2,methods:L,statusCodes:V,afterStatusCodes:j,maxRetryAfter:Number.POSITIVE_INFINITY,backoffLimit:Number.POSITIVE_INFINITY,delay:r=>.3*2**(r-1)*1e3},v=(r={})=>{if(typeof r=="number")return{...R,limit:r};if(r.methods&&!Array.isArray(r.methods))throw new Error("retry.methods must be an array");if(r.statusCodes&&!Array.isArray(r.statusCodes))throw new Error("retry.statusCodes must be an array");return{...R,...r}};async function M(r,t,e,s){return new Promise((o,n)=>{const i=setTimeout(()=>{e&&e.abort(),n(new T(r))},s.timeout);s.fetch(r,t).then(o).catch(n).then(()=>{clearTimeout(i)})})}async function $(r,{signal:t}){return new Promise((e,s)=>{t&&(t.throwIfAborted(),t.addEventListener("abort",o,{once:!0}));function o(){clearTimeout(n),s(t.reason)}const n=setTimeout(()=>{t==null||t.removeEventListener("abort",o),e()},r)})}const D=(r,t)=>{const e={};for(const s in t)!(s in P)&&!(s in H)&&!(s in r)&&(e[s]=t[s]);return e};class y{constructor(t,e={}){h(this,"request");h(this,"abortController");h(this,"_retryCount",0);h(this,"_input");h(this,"_options");var s,o;if(this._input=t,this._options={...e,headers:E(this._input.headers,e.headers),hooks:g({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},e.hooks),method:U(e.method??this._input.method),prefixUrl:String(e.prefixUrl||""),retry:v(e.retry),throwHttpErrors:e.throwHttpErrors!==!1,timeout:e.timeout??1e4,fetch:e.fetch??globalThis.fetch.bind(globalThis)},typeof this._input!="string"&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&typeof this._input=="string"){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(C){this.abortController=new globalThis.AbortController;const n=this._options.signal??this._input.signal;n==null||n.addEventListener("abort",()=>{this.abortController.abort(n.reason)}),this._options.signal=this.abortController.signal}if(x&&(this._options.duplex="half"),this._options.json!==void 0&&(this._options.body=((o=(s=this._options).stringifyJson)==null?void 0:o.call(s,this._options.json))??JSON.stringify(this._options.json),this._options.headers.set("content-type",this._options.headers.get("content-type")??"application/json")),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const i="?"+(typeof this._options.searchParams=="string"?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),a=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,i);(O&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)&&!(this._options.headers&&this._options.headers["content-type"])&&this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(a,{...this.request}),this._options)}}static create(t,e){const s=new y(t,e),o=async()=>{if(typeof s._options.timeout=="number"&&s._options.timeout>_)throw new RangeError(`The \`timeout\` option cannot be greater than ${_}`);await Promise.resolve();let a=await s._fetch();for(const u of s._options.hooks.afterResponse){const c=await u(s.request,s._options,s._decorateResponse(a.clone()));c instanceof globalThis.Response&&(a=c)}if(s._decorateResponse(a),!a.ok&&s._options.throwHttpErrors){let u=new w(a,s.request,s._options);for(const c of s._options.hooks.beforeError)u=await c(u);throw u}if(s._options.onDownloadProgress){if(typeof s._options.onDownloadProgress!="function")throw new TypeError("The `onDownloadProgress` option must be a function");if(!I)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return s._stream(a.clone(),s._options.onDownloadProgress)}return a},i=s._options.retry.methods.includes(s.request.method.toLowerCase())?s._retry(o):o();for(const[a,u]of Object.entries(N))i[a]=async()=>{s.request.headers.set("accept",s.request.headers.get("accept")||u);const f=(await i).clone();if(a==="json"){if(f.status===204||(await f.clone().arrayBuffer()).byteLength===0)return"";if(e.parseJson)return e.parseJson(await f.text())}return f[a]()};return i}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount>this._options.retry.limit||t instanceof T)throw t;if(t instanceof w){if(!this._options.retry.statusCodes.includes(t.response.status))throw t;const s=t.response.headers.get("Retry-After")??t.response.headers.get("RateLimit-Reset")??t.response.headers.get("X-RateLimit-Reset")??t.response.headers.get("X-Rate-Limit-Reset");if(s&&this._options.retry.afterStatusCodes.includes(t.response.status)){let o=Number(s)*1e3;Number.isNaN(o)?o=Date.parse(s)-Date.now():o>=Date.parse("2024-01-01")&&(o-=Date.now());const n=this._options.retry.maxRetryAfter??o;return o<n?o:n}if(t.response.status===413)throw t}const e=this._options.retry.delay(this._retryCount);return Math.min(this._options.retry.backoffLimit,e)}_decorateResponse(t){return this._options.parseJson&&(t.json=async()=>this._options.parseJson(await t.text())),t}async _retry(t){try{return await t()}catch(e){const s=Math.min(this._calculateRetryDelay(e),_);if(this._retryCount<1)throw e;await $(s,{signal:this._options.signal});for(const o of this._options.hooks.beforeRetry)if(await o({request:this.request,options:this._options,error:e,retryCount:this._retryCount})===S)return;return this._retry(t)}}async _fetch(){for(const s of this._options.hooks.beforeRequest){const o=await s(this.request,this._options);if(o instanceof Request){this.request=o;break}if(o instanceof Response)return o}const t=D(this.request,this._options),e=this.request;return this.request=e.clone(),this._options.timeout===!1?this._options.fetch(e,t):M(e,t,this.abortController,this._options)}_stream(t,e){const s=Number(t.headers.get("content-length"))||0;let o=0;return t.status===204?(e&&e({percent:1,totalBytes:s,transferredBytes:o},new Uint8Array),new globalThis.Response(null,{status:t.status,statusText:t.statusText,headers:t.headers})):new globalThis.Response(new globalThis.ReadableStream({async start(n){const i=t.body.getReader();e&&e({percent:0,transferredBytes:0,totalBytes:s},new Uint8Array);async function a(){const{done:u,value:c}=await i.read();if(u){n.close();return}if(e){o+=c.byteLength;const f=s===0?0:o/s;e({percent:f,transferredBytes:o,totalBytes:s},c)}n.enqueue(c),await a()}await a()}}),{status:t.status,statusText:t.statusText,headers:t.headers})}}/*! MIT License © Sindre Sorhus */const m=r=>{const t=(e,s)=>y.create(e,l(r,s));for(const e of A)t[e]=(s,o)=>y.create(s,l(r,o,{method:e}));return t.create=e=>m(l(e)),t.extend=e=>(typeof e=="function"&&(e=e(r??{})),m(l(r,e))),t.stop=S,t},B=m(),F=B,{VITE_FREYA_RECV_HOST:J,VITE_SARA_TOKEN_NAME:Y}={VITE_HOME_INTE_HOST:"https://web-tech.tw",VITE_SARA_INTE_HOST:"https://web-tech.tw/sara",VITE_SARA_TOKEN_NAME:"unified_token",VITE_FREYA_INTE_HOST:"https://web-tech.tw/freya",VITE_FREYA_RECV_HOST:"https://web-tech.tw/recv/freya",VITE_TURNSTILE_SITE_KEY:"0x4AAAAAAAz8kwCfcwYC8fgp",BASE_URL:"/freya/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},z=r=>{const t=localStorage.getItem(Y);t&&r.headers.set("authorization",`SARA ${t}`)},G=(r=!0)=>{const t=r?[z]:[];return F.create({prefixUrl:J,hooks:{beforeRequest:t}})};export{G as u};
