document.addEventListener("click",(e=>{if(e.target instanceof HTMLButtonElement){const t=e.target,i=t.getAttribute("data-content-id"),s=document.getElementById(i);if(s.classList.contains("hidden")){const e=s.scrollHeight;s.classList.remove("hidden"),s.style.height=`${e}px`,t.classList.add("open"),s.ariaHidden=void 0}else s.classList.add("hidden"),t.classList.remove("open"),s.style.height="0px",s.ariaHidden=!0}}));