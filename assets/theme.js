/* Apparence : Auto (suit l'appareil), Clair, Sombre — choix mémorisé sur cet appareil */
(function(){const tb=[...document.querySelectorAll(".theme button")];
function theme(t){if(t==="auto")delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=t;tb.forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.t===t)));try{localStorage.setItem("rl-theme",t);}catch(_){}}
let t0="auto";try{t0=localStorage.getItem("rl-theme")||"auto";}catch(_){}
tb.forEach(x=>{x.setAttribute("aria-pressed",String(x.dataset.t===t0));x.addEventListener("click",()=>theme(x.dataset.t));});
document.addEventListener("click",e=>{document.querySelectorAll(".menu-m[open]").forEach(m=>{if(!m.contains(e.target))m.removeAttribute("open");});});})();
