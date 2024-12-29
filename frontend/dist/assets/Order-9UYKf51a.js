import{r as m,j as d,e as T}from"./index-BHP7NIO3.js";let L={data:""},R=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||L,q=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,V=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,b=(e,t)=>{let s="",i="",r="";for(let a in e){let n=e[a];a[0]=="@"?a[1]=="i"?s=a+" "+n+";":i+=a[1]=="f"?b(n,a):a+"{"+b(n,a[1]=="k"?"":t)+"}":typeof n=="object"?i+=b(n,t?t.replace(/([^,])+/g,o=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,o):o?o+" "+c:c)):a):n!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=b.p?b.p(a,n):a+":"+n+";")}return s+(t&&r?t+"{"+r+"}":r)+i},x={},U=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+U(e[s]);return t}return e},Y=(e,t,s,i,r)=>{let a=U(e),n=x[a]||(x[a]=(c=>{let p=0,h=11;for(;p<c.length;)h=101*h+c.charCodeAt(p++)>>>0;return"go"+h})(a));if(!x[n]){let c=a!==e?e:(p=>{let h,l,u=[{}];for(;h=q.exec(p.replace(V,""));)h[4]?u.shift():h[3]?(l=h[3].replace(z," ").trim(),u.unshift(u[0][l]=u[0][l]||{})):u[0][h[1]]=h[2].replace(z," ").trim();return u[0]})(e);x[n]=b(r?{["@keyframes "+n]:c}:c,s?"":"."+n)}let o=s&&x.g?x.g:null;return s&&(x.g=x[n]),((c,p,h,l)=>{l?p.data=p.data.replace(l,c):p.data.indexOf(c)===-1&&(p.data=h?c+p.data:p.data+c)})(x[n],t,i,o),n},Z=(e,t,s)=>e.reduce((i,r,a)=>{let n=t[a];if(n&&n.call){let o=n(s),c=o&&o.props&&o.props.className||/^go/.test(o)&&o;n=c?"."+c:o&&typeof o=="object"?o.props?"":b(o,""):o===!1?"":o}return i+r+(n??"")},"");function A(e){let t=this||{},s=e.call?e(t.p):e;return Y(s.unshift?s.raw?Z(s,[].slice.call(arguments,1),t.p):s.reduce((i,r)=>Object.assign(i,r&&r.call?r(t.p):r),{}):s,R(t.target),t.g,t.o,t.k)}let F,S,_;A.bind({g:1});let y=A.bind({k:1});function B(e,t,s,i){b.p=t,F=e,S=s,_=i}function v(e,t){let s=this||{};return function(){let i=arguments;function r(a,n){let o=Object.assign({},a),c=o.className||r.className;s.p=Object.assign({theme:S&&S()},o),s.o=/ *go\d+/.test(c),o.className=A.apply(s,i)+(c?" "+c:"");let p=e;return e[0]&&(p=o.as||e,delete o.as),_&&p[0]&&_(o),F(p,o)}return r}}var G=e=>typeof e=="function",k=(e,t)=>G(e)?e(t):e,J=(()=>{let e=0;return()=>(++e).toString()})(),H=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Q=20,$=new Map,W=1e3,M=e=>{if($.has(e))return;let t=setTimeout(()=>{$.delete(e),w({type:4,toastId:e})},W);$.set(e,t)},X=e=>{let t=$.get(e);t&&clearTimeout(t)},I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,Q)};case 1:return t.toast.id&&X(t.toast.id),{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:s}=t;return e.toasts.find(a=>a.id===s.id)?I(e,{type:1,toast:s}):I(e,{type:0,toast:s});case 3:let{toastId:i}=t;return i?M(i):e.toasts.forEach(a=>{M(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+r}))}}},D=[],O={toasts:[],pausedAt:void 0},w=e=>{O=I(O,e),D.forEach(t=>{t(O)})},K={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ee=(e={})=>{let[t,s]=m.useState(O);m.useEffect(()=>(D.push(s),()=>{let r=D.indexOf(s);r>-1&&D.splice(r,1)}),[t]);let i=t.toasts.map(r=>{var a,n;return{...e,...e[r.type],...r,duration:r.duration||((a=e[r.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||K[r.type],style:{...e.style,...(n=e[r.type])==null?void 0:n.style,...r.style}}});return{...t,toasts:i}},te=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||J()}),N=e=>(t,s)=>{let i=te(t,e,s);return w({type:2,toast:i}),i.id},f=(e,t)=>N("blank")(e,t);f.error=N("error");f.success=N("success");f.loading=N("loading");f.custom=N("custom");f.dismiss=e=>{w({type:3,toastId:e})};f.remove=e=>w({type:4,toastId:e});f.promise=(e,t,s)=>{let i=f.loading(t.loading,{...s,...s==null?void 0:s.loading});return e.then(r=>(f.success(k(t.success,r),{id:i,...s,...s==null?void 0:s.success}),r)).catch(r=>{f.error(k(t.error,r),{id:i,...s,...s==null?void 0:s.error})}),e};var se=(e,t)=>{w({type:1,toast:{id:e,height:t}})},ae=()=>{w({type:5,time:Date.now()})},re=e=>{let{toasts:t,pausedAt:s}=ee(e);m.useEffect(()=>{if(s)return;let a=Date.now(),n=t.map(o=>{if(o.duration===1/0)return;let c=(o.duration||0)+o.pauseDuration-(a-o.createdAt);if(c<0){o.visible&&f.dismiss(o.id);return}return setTimeout(()=>f.dismiss(o.id),c)});return()=>{n.forEach(o=>o&&clearTimeout(o))}},[t,s]);let i=m.useCallback(()=>{s&&w({type:6,time:Date.now()})},[s]),r=m.useCallback((a,n)=>{let{reverseOrder:o=!1,gutter:c=8,defaultPosition:p}=n||{},h=t.filter(g=>(g.position||p)===(a.position||p)&&g.height),l=h.findIndex(g=>g.id===a.id),u=h.filter((g,j)=>j<l&&g.visible).length;return h.filter(g=>g.visible).slice(...o?[u+1]:[0,u]).reduce((g,j)=>g+(j.height||0)+c,0)},[t]);return{toasts:t,handlers:{updateHeight:se,startPause:ae,endPause:i,calculateOffset:r}}},ie=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,oe=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ne=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,le=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ie} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${oe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ne} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,de=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ce=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${de} 1s linear infinite;
`,pe=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ue=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,me=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ue} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,he=v("div")`
  position: absolute;
`,ge=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,fe=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,xe=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${fe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ye=({toast:e})=>{let{icon:t,type:s,iconTheme:i}=e;return t!==void 0?typeof t=="string"?m.createElement(xe,null,t):t:s==="blank"?null:m.createElement(ge,null,m.createElement(ce,{...i}),s!=="loading"&&m.createElement(he,null,s==="error"?m.createElement(le,{...i}):m.createElement(me,{...i})))},be=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ve=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,je="0%{opacity:0;} 100%{opacity:1;}",we="0%{opacity:1;} 100%{opacity:0;}",Ne=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ee=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,$e=(e,t)=>{let s=e.includes("top")?1:-1,[i,r]=H()?[je,we]:[be(s),ve(s)];return{animation:t?`${y(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},De=m.memo(({toast:e,position:t,style:s,children:i})=>{let r=e.height?$e(e.position||t||"top-center",e.visible):{opacity:0},a=m.createElement(ye,{toast:e}),n=m.createElement(Ee,{...e.ariaProps},k(e.message,e));return m.createElement(Ne,{className:e.className,style:{...r,...s,...e.style}},typeof i=="function"?i({icon:a,message:n}):m.createElement(m.Fragment,null,a,n))});B(m.createElement);var Oe=({id:e,className:t,style:s,onHeightUpdate:i,children:r})=>{let a=m.useCallback(n=>{if(n){let o=()=>{let c=n.getBoundingClientRect().height;i(e,c)};o(),new MutationObserver(o).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return m.createElement("div",{ref:a,className:t,style:s},r)},ke=(e,t)=>{let s=e.includes("top"),i=s?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:H()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...i,...r}},Ae=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,E=16,Pe=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:i,children:r,containerStyle:a,containerClassName:n})=>{let{toasts:o,handlers:c}=re(s);return m.createElement("div",{style:{position:"fixed",zIndex:9999,top:E,left:E,right:E,bottom:E,pointerEvents:"none",...a},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},o.map(p=>{let h=p.position||t,l=c.calculateOffset(p,{reverseOrder:e,gutter:i,defaultPosition:t}),u=ke(h,l);return m.createElement(Oe,{id:p.id,key:p.id,onHeightUpdate:c.updateHeight,className:p.visible?Ae:"",style:u},p.type==="custom"?k(p.message,p):r?r(p):m.createElement(De,{toast:p,position:h}))}))},C=f;const Se=()=>{const[e,t]=m.useState([]),[s,i]=m.useState(null);m.useState({});const[r,a]=m.useState({}),[n,o]=m.useState("Pending");m.useEffect(()=>{(async()=>{try{const u=await T.get("http://localhost:5001/api/orders");if(Array.isArray(u.data)){const g=u.data.flatMap(j=>j.orders||[]);t(g),console.log(g)}else throw new Error("Invalid data format")}catch(u){i("Error fetching orders. Please try again later."),console.error("Error fetching orders:",u)}})()},[]);const c=(l,u)=>{a(g=>({...g,[l]:u}))},p=async l=>{const u=r[l];if(u===void 0){C.error("Please select a dispatch status.");return}try{const g=await T.put("http://localhost:5001/api/orders/update",{orderId:l,isDelivered:u});console.log("Order updated:",g.data),C.success("Order status updated to Dispatched!",{duration:5e3,position:"top-right",style:{background:"green",color:"white"}}),t(j=>j.map(P=>P._id===l?{...P,isDelivered:u,isUpdated:!0}:P))}catch(g){console.error("Error updating order:",g),C.error("Error updating order status. Please try again later.",{duration:5e3,position:"top-right",style:{background:"red",color:"white"}})}},h=e.filter(l=>n==="Pending"?!l.isDelivered:l.isDelivered);return d.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8",children:[d.jsxs("div",{className:"max-w-4xl mx-auto",children:[d.jsx("h1",{className:"text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center",children:"Orders Dashboard"}),s&&d.jsx("div",{className:"bg-red-50 border-l-4 border-red-500 p-4 mb-6",children:d.jsx("p",{className:"text-red-700",children:s})}),d.jsxs("div",{className:"flex justify-center space-x-4 mb-6",children:[d.jsx("button",{onClick:()=>o("Pending"),className:`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${n==="Pending"?"bg-blue-600 text-white":"bg-gray-200 text-gray-600"}`,children:"Pending Orders"}),d.jsx("button",{onClick:()=>o("Dispatched"),className:`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${n==="Dispatched"?"bg-blue-600 text-white":"bg-gray-200 text-gray-600"}`,children:"Dispatched Orders"})]}),h.length===0&&!s&&d.jsx("div",{className:"text-center py-12 bg-white rounded-lg shadow-lg",children:d.jsx("p",{className:"text-gray-500",children:n==="Pending"?"No pending orders.":"No dispatched orders."})}),d.jsx("div",{className:"space-y-6",children:h.map(l=>d.jsx("div",{className:`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500
                                        hover:shadow-xl hover:translate-y-[-2px] cursor-pointer
                                        ${l.isDelivered?"bg-green-50":""}`,children:d.jsxs("div",{className:"p-6 space-y-4",children:[d.jsxs("div",{className:"flex justify-between items-center",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:d.jsxs("span",{className:"bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm",children:["#",l._id.slice(-6)]})}),d.jsxs("div",{className:"flex items-center space-x-3",children:[d.jsx("label",{htmlFor:`dispatch-${l._id}`,className:"text-sm text-gray-600",children:"Status:"}),d.jsxs("select",{id:`dispatch-${l._id}`,onChange:u=>c(l._id,u.target.value==="yes"),defaultValue:l.isDelivered?"yes":"no",className:"form-select rounded-full border-2 border-gray-200 shadow-sm",disabled:l.isUpdated||l.isDelivered,children:[d.jsx("option",{value:"no",children:"🕒 Pending"}),d.jsx("option",{value:"yes",children:"✈️ Dispatched"})]})]})]}),l.isDelivered&&d.jsx("div",{className:"mt-4 text-center text-white bg-green-600 p-2 rounded-lg",children:d.jsx("span",{className:"text-sm font-semibold",children:"This order has been dispatched!"})}),d.jsx("div",{className:"flex justify-end",children:d.jsx("button",{onClick:()=>p(l._id),className:"bg-purple-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-purple-500 transition-colors duration-300",disabled:l.isUpdated||r[l._id]===void 0||l.isDelivered,children:"Update"})}),d.jsxs("div",{className:"border-t border-gray-100 pt-4",children:[d.jsx("h3",{className:"text-md font-medium text-gray-900 mb-2",children:"Shipping Address"}),l.shippingAddress?d.jsxs("div",{className:"text-sm text-gray-600",children:[d.jsxs("p",{children:[l.shippingAddress.firstName," ",l.shippingAddress.lastName]}),d.jsx("p",{children:l.shippingAddress.streetAddress}),d.jsxs("p",{children:[l.shippingAddress.city,", ",l.shippingAddress.country," ",l.shippingAddress.postcode]})]}):d.jsx("p",{className:"text-sm text-gray-500",children:"No shipping address available."})]}),d.jsxs("div",{className:"border-t border-gray-100 mt-4 pt-4",children:[d.jsx("h3",{className:"text-md font-medium text-gray-900 mb-2",children:"Order Items"}),l.orderItems&&l.orderItems.length>0?d.jsx("ul",{className:"divide-y divide-gray-100",children:l.orderItems.map(u=>d.jsxs("li",{className:"py-2 flex justify-between items-center px-2 rounded-lg",children:[d.jsx("span",{className:"text-sm text-gray-600",children:u.name}),d.jsxs("div",{className:"text-sm",children:[d.jsxs("span",{className:"text-gray-500",children:[u.quantity," × "]}),d.jsxs("span",{className:"font-medium text-purple-600",children:["₹",u.price]})]})]},u._id))}):d.jsx("p",{className:"text-sm text-gray-500",children:"No items found in this order."})]})]})},l._id))})]}),d.jsx(Pe,{})]})};export{Se as default};
