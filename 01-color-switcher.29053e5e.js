const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let o=document.querySelector("body"),r=null;e.addEventListener("click",(function(){r=setInterval((()=>{o.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0})),t.addEventListener("click",(()=>{clearInterval(r),e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.29053e5e.js.map