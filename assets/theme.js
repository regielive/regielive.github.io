/* Apparence : Auto (suit l'appareil), Clair, Sombre — choix mémorisé sur cet appareil */
(function(){const tb=[...document.querySelectorAll(".theme button")];
function theme(t){if(t==="auto")delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=t;tb.forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.t===t)));try{localStorage.setItem("rl-theme",t);}catch(_){}}
let t0="auto";try{t0=localStorage.getItem("rl-theme")||"auto";}catch(_){}
tb.forEach(x=>{x.setAttribute("aria-pressed",String(x.dataset.t===t0));x.addEventListener("click",()=>theme(x.dataset.t));});
document.addEventListener("click",e=>{document.querySelectorAll(".menu-m[open]").forEach(m=>{if(!m.contains(e.target))m.removeAttribute("open");});});
/* bouton flottant « Remonter en haut », visible dès qu'on a quitté le haut de la page */
const h=document.createElement("button");h.type="button";h.className="haut";h.setAttribute("aria-label","Remonter en haut de la page");h.title="Remonter en haut";
h.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';document.body.appendChild(h);
const maj=()=>h.classList.toggle("vu",scrollY>500);addEventListener("scroll",maj,{passive:true});maj();
h.addEventListener("click",()=>{scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});const c=document.getElementById("contenu");if(c){c.setAttribute("tabindex","-1");c.focus({preventScroll:true});}});})();
