const AX={
 simple:{t:"Simple, même pour un débutant.",p:"Tout se fait depuis un seul écran. À gauche, vous préparez. À droite, vous voyez ce que l’assemblée voit. La touche Espace envoie la suite.",
  l:["Une aide intégrée qui répond à vos questions","Un manuel illustré, en français","Des réglages faits une fois pour toutes"],img:"img/app.webp",a:"RégieLive : la préparation à gauche, l’écran de la salle à droite"},
 tout:{t:"Tout le culte, dans un seul logiciel.",p:"Plus besoin de jongler entre PowerPoint, un lecteur vidéo et une Bible en ligne.",
  l:["Les cantiques, retrouvés par leur numéro","La Bible : tapez la référence, le verset s’affiche","Les vidéos, les photos et les présentations","Il peut même proposer tout seul le verset que le prédicateur annonce"],img:"img/s7-direct.webp",a:"La Bible dans RégieLive"},
 sur:{t:"Sans surprise, le jour J.",p:"RégieLive fonctionne sans Internet : une coupure de réseau ne change rien. Chaque version est testée avant d’être proposée.",
  l:["Tout reste sur l’ordinateur de l’église","L’écran ne se met pas en veille pendant le culte","Un culte préparé = un dossier, facile à sauvegarder"],img:"img/s13-bench.webp",a:"Le test de l’ordinateur dans RégieLive"}};
const $=id=>document.getElementById(id),mon=$("eg"),tabs=[...document.querySelectorAll(".ax")];
const reduit=matchMedia("(prefers-reduced-motion: reduce)").matches;let auto=!reduit,timer=null;const DUREE=7000;
function montre(k){const x=AX[k];$("dt").textContent=x.t;$("dp").textContent=x.p;$("dl").innerHTML=x.l.map(s=>"<li>"+s+"</li>").join("");$("dm").href="fonctions.html#"+({simple:"simple",tout:"chants",sur:"fiable"})[k];
 tabs.forEach(t=>{const on=t.dataset.k===k;t.classList.toggle("on",on);t.setAttribute("aria-selected",String(on));t.classList.remove("anim");});
 jouerScene(k);
 if(auto){const t=tabs.find(t=>t.dataset.k===k);void t.offsetWidth;t.style.setProperty("--d",DUREE+"ms");t.classList.add("anim");clearTimeout(timer);timer=setTimeout(()=>{const i=(tabs.indexOf(t)+1)%tabs.length;montre(tabs[i].dataset.k);},DUREE);}}
function stopAuto(){auto=false;clearTimeout(timer);tabs.forEach(t=>t.classList.remove("anim"));}
tabs.forEach(t=>{t.addEventListener("click",()=>{stopAuto();mon.classList.remove("pvw");montre(t.dataset.k);});
 t.addEventListener("mouseenter",()=>{if(!t.classList.contains("on"))mon.classList.add("pvw");});t.addEventListener("mouseleave",()=>mon.classList.remove("pvw"));});
document.querySelector(".axes").addEventListener("keydown",e=>{if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;const i=tabs.findIndex(t=>t.classList.contains("on"));const n=tabs[(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length];stopAuto();montre(n.dataset.k);n.focus();});

/* ===== Animations des trois onglets : une petite scène qui tourne en boucle tant que l'onglet est affiché ===== */
const stage=document.getElementById("stage");let st=[];
function stT(f,ms){st.push(setTimeout(f,reduit?0:ms));}
function stStop(){st.forEach(clearTimeout);st=[];}
const WIFI='<svg viewBox="0 0 24 24"><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5h.01"/></svg>';
const SCENES={
 /* Simple : je prépare à gauche, une touche, c'est à l'écran à droite */
 simple(){
  const tours=[["Chant 42","Espace","À toi la gloire, ô Ressuscité !","Chant 42"],["Jean 3.16","Entrée","Car Dieu a tant aimé le monde…","Jean 3.16"]];let n=0;
  stage.className="stage";
  const tour=()=>{const [nom,touche,texte,ref]=tours[n++%tours.length];
   stage.innerHTML='<div class="st-col"><span class="etiq">Je prépare</span><div class="st-it" id="si">'+nom+'</div><span class="st-key" id="sk">'+touche+'</span></div><div class="st-ecran" id="se"><p>Bienvenue</p></div>';
   const si=document.getElementById("si"),sk=document.getElementById("sk"),se=document.getElementById("se");
   stT(()=>{si.classList.add("pret");se.classList.add("pvw");},700);
   stT(()=>sk.classList.add("appui"),1700);
   stT(()=>{sk.classList.remove("appui");si.classList.remove("pret");si.classList.add("parti");se.classList.remove("pvw");se.innerHTML='<div class="entre"><p>'+texte+'</p><small>'+ref+'</small></div>';},1850);
   if(!reduit)stT(tour,4200);};
  tour();
 },
 /* Tout au même endroit : chant, verset, vidéo, annonce, sur le même écran */
 tout(){
  stage.className="stage st-plein";
  stage.innerHTML='<div class="st-ecran" id="se"></div><div class="st-types" id="sty"><span>Chant</span><span>Verset</span><span>Vidéo</span><span>Annonce</span></div>';
  const se=document.getElementById("se"),ty=[...document.querySelectorAll("#sty span")];
  const vues=['<div class="entre"><p>À toi la gloire, ô Ressuscité !</p><small>Chant 42</small></div>',
   '<div class="entre"><p>L’Éternel est mon berger : je ne manquerai de rien.</p><small>Psaume 23.1</small></div>',
   '<div class="st-video"><i></i><b></b></div>',
   '<div class="entre st-annonce">Repas fraternel<br><small>après le culte, tout le monde est invité</small></div>'];
  let i=0;const suite=()=>{const k=i++%vues.length;se.innerHTML=vues[k];se.style.padding=k===2?"0":"";ty.forEach((t,j)=>t.classList.toggle("on",j===k));if(!reduit)stT(suite,1900);};
  suite();
 },
 /* Sans surprise : Internet se coupe, l'écran continue */
 sur(){
  stage.className="stage st-plein";
  stage.innerHTML='<div class="st-ecran" id="se"><span class="st-wifi" id="sw">'+WIFI+'<span id="swt">Internet</span></span><div><p>La charité est patiente, elle est pleine de bonté.</p><small>1 Corinthiens 13.4</small></div><span class="st-ok" id="sok">Tout continue normalement</span></div>';
  const sw=document.getElementById("sw"),swt=document.getElementById("swt"),ok=document.getElementById("sok");
  const tour=()=>{sw.classList.remove("coupe");swt.textContent="Internet";ok.classList.remove("vu");
   stT(()=>{sw.classList.add("coupe");swt.textContent="Internet coupé";},1200);
   stT(()=>ok.classList.add("vu"),2000);
   if(!reduit)stT(tour,5200);};
  tour();
 }
};
function jouerScene(k){stStop();if(stage&&SCENES[k])SCENES[k]();}

montre("simple");
/* mini-démo : le visiteur prépare un contenu puis l'envoie à l'écran (chant : Espace ; verset : Entrée, comme dans RégieLive) ; sinon elle se joue seule */
const DATA={"42":["042 - À toi la gloire","À toi la gloire, ô Ressuscité ! À toi la victoire pour l’éternité !","Chant 42"],
 "jn316":["Jean 3.16","Car Dieu a tant aimé le monde qu’il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu’il ait la vie éternelle.","Jean 3.16 · Louis Segond"],
 "ps23":["Psaume 23.1","L’Éternel est mon berger : je ne manquerai de rien.","Psaume 23.1 · Louis Segond"],
 "1co13":["1 Corinthiens 13.4","La charité est patiente, elle est pleine de bonté ; la charité n’est point envieuse ;","1 Corinthiens 13.4 · Louis Segond"]};
const q=$("q"),go=$("go"),eg=$("eg"),toile=$("toile"),etat=$("etat");let pret=null,joue=true,tj=[];
const TOUCHE=k=>k==="42"?"Espace":"Entrée";
function cle(v){v=String(v).toLowerCase().replace(/\s|\./g,"");if(/^0*42$/.test(v))return "42";return DATA[v]?v:null;}
function prepare(v){const k=cle(v);pret=k;const c=$("cp");
 if(k){$("cpT").textContent=DATA[k][0];$("cpX").textContent=DATA[k][1];c.classList.add("pret");go.disabled=false;eg.classList.add("pvw");$("kc").textContent=TOUCHE(k);etat.textContent="Prêt : appuyez sur "+TOUCHE(k);}
 else{$("cpT").textContent=v?"Rien trouvé pour « "+v+" »":"Tapez un numéro de chant ou un verset";$("cpX").textContent=v?"Essayez 42, jn316 ou ps23.":"Par exemple 42, ou jn316 pour Jean 3.16.";c.classList.remove("pret");go.disabled=true;eg.classList.remove("pvw");etat.textContent="L’écran de l’église";}}
function envoie(){if(!pret)return;const d=DATA[pret];go.classList.add("appui");setTimeout(()=>go.classList.remove("appui"),140);
 toile.classList.add("sort");setTimeout(()=>{$("tx").textContent=d[1];$("tr").textContent=d[2];toile.classList.remove("sort");toile.classList.remove("entre");void toile.offsetWidth;toile.classList.add("entre");},reduit?0:280);
 eg.classList.remove("pvw");etat.textContent="À l’écran : "+d[0];$("cp").classList.remove("pret");go.disabled=true;pret=null;}
function main(){if(joue){joue=false;tj.forEach(clearTimeout);}}
q.addEventListener("input",()=>{main();prepare(q.value);});
const bonne=e=>pret&&((TOUCHE(pret)==="Espace"&&e.key===" ")||(TOUCHE(pret)==="Entrée"&&e.key==="Enter"));
q.addEventListener("keydown",e=>{if(bonne(e)){e.preventDefault();envoie();}});
document.addEventListener("keydown",e=>{if(bonne(e)&&e.target!==q&&!/^(BUTTON|A|INPUT|TEXTAREA)$/.test(e.target.tagName)){e.preventDefault();main();envoie();}});
go.addEventListener("click",()=>{main();envoie();});
document.querySelectorAll(".puces button").forEach(b=>b.addEventListener("click",()=>{main();q.value=b.dataset.q;prepare(b.dataset.q);q.focus();}));
/* démo automatique : tape « jn316 », Entrée, puis « 42 », Espace… tant que personne n'y touche */
function tape(txt,t0){[...txt].forEach((ch,i)=>tj.push(setTimeout(()=>{if(!joue)return;q.value=txt.slice(0,i+1);prepare(q.value);},t0+i*160)));return t0+txt.length*160;}
function boucle(){if(!joue)return;let t=900;
 for(const w of ["jn316","42","ps23"]){t=tape(w,t)+900;tj.push(setTimeout(()=>{if(joue){envoie();q.value="";}},t));t+=2600;}
 tj.push(setTimeout(boucle,t));}
if(!reduit)boucle();else prepare("");
/* --- imprévus : A (chant ajouté en direct), B (glisser la vidéo de la clé) --- */
const FIC=$("fic");const imp={A:[],B:[]};const vu={A:false,B:false};
function efface(k){imp[k].forEach(clearTimeout);imp[k]=[];}
function jouerA(){efface("A");const prog=document.querySelector("#impA .prog"),tp=$("aTape");
 prog.querySelectorAll(".nouveau").forEach(n=>n.remove());prog.querySelectorAll(".it").forEach(i=>i.classList.remove("ecran"));$("aCur").classList.add("ecran");tp.textContent="";
 const mot="245";let t=reduit?0:600;
 [...mot].forEach((c,i)=>imp.A.push(setTimeout(()=>tp.textContent=mot.slice(0,i+1),t+i*(reduit?0:220))));t+=reduit?0:mot.length*220+500;
 imp.A.push(setTimeout(()=>{const n=document.createElement("div");n.className="it nouveau";n.textContent="Chant 245";$("aCur").after(n);tp.textContent="";},t));
 imp.A.push(setTimeout(()=>{prog.querySelectorAll(".it").forEach(i=>i.classList.remove("ecran"));const n=prog.querySelector(".nouveau");n.classList.add("ecran");n.style.boxShadow="none";},t+(reduit?0:1300)));}
function remettreB(){efface("B");const f=FIC,u=$("usb"),d=$("depot");u.classList.remove("retiree");if(f.parentElement!==u)u.appendChild(f);f.style.transform="";f.classList.remove("drag");d.textContent="Glissez ici";d.className="depot";}
function poseB(){const f=FIC,d=$("depot"),u=$("usb");f.style.transform="";d.className="it";d.innerHTML="annonce.mp4<span class=\"copie\">Copiée dans le dossier du culte</span>";if(u.contains(f))f.remove();
 imp.B.push(setTimeout(()=>u.classList.add("retiree"),reduit?0:1100));}
function jouerB(){remettreB();if(reduit){poseB();return;}const f=FIC,d=$("depot");
 imp.B.push(setTimeout(()=>{const a=f.getBoundingClientRect(),b=d.getBoundingClientRect();f.style.transform="translate("+(b.left-a.left)+"px,"+(b.top-a.top)+"px)";d.classList.add("vise");},700));
 imp.B.push(setTimeout(poseB,1500));}
/* vrai glisser-déposer, à la souris comme au doigt */
(function(){const f=FIC,d=$("depot");let x0,y0,on=false;
 f.addEventListener("pointerdown",e=>{efface("B");on=true;x0=e.clientX;y0=e.clientY;f.classList.add("drag");f.setPointerCapture(e.pointerId);});
 f.addEventListener("pointermove",e=>{if(!on)return;f.style.transform="translate("+(e.clientX-x0)+"px,"+(e.clientY-y0)+"px)";const r=d.getBoundingClientRect();d.classList.toggle("vise",e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top-20&&e.clientY<r.bottom+20);});
 f.addEventListener("pointerup",()=>{if(!on)return;on=false;f.classList.remove("drag");if(d.classList.contains("vise"))poseB();else{f.style.transform="";d.classList.remove("vise");}});
 f.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();efface("B");poseB();}});})();
document.querySelectorAll(".rejouer").forEach(b=>b.addEventListener("click",()=>joueUne(b.dataset.r)));

/* --- C : Autopilot écoute, propose, l'opérateur affiche --- */
imp.C=[];vu.C=false;
function afficheC(){const b=$("cAff");b.classList.add("appui");setTimeout(()=>b.classList.remove("appui"),140);$("cEcran").textContent="Car Dieu a tant aimé le monde qu’il a donné son Fils unique…";$("prop").classList.remove("vu");}
function jouerC(){efface("C");const t=$("cTxt"),phrase="Ouvrons dans Jean, chapitre 3, verset 16…";$("cEcran").textContent="Prédication";$("prop").classList.remove("vu");t.textContent="";
 if(reduit){t.textContent=phrase;$("prop").classList.add("vu");return;}
 const mots=phrase.split(" ");mots.forEach((m,i)=>imp.C.push(setTimeout(()=>t.textContent=mots.slice(0,i+1).join(" "),400+i*260)));
 const t1=400+mots.length*260+500;imp.C.push(setTimeout(()=>$("prop").classList.add("vu"),t1));imp.C.push(setTimeout(afficheC,t1+1600));}
$("cAff").addEventListener("click",()=>{efface("C");afficheC();});

/* lecture : sur un écran large, les trois cartes se jouent l'une après l'autre (la carte qui joue s'allume en rouge) ;
   sur téléphone, chacune se joue quand on arrive dessus */
const JOUE={A:[jouerA,3600],B:[jouerB,3000],C:[jouerC,5200]},cartes={A:$("impA"),B:$("impB"),C:$("impC")};let chaine=[];
function allume(k){Object.entries(cartes).forEach(([x,el])=>el.classList.toggle("joue",x===k));}
function joueUne(k){chaine.forEach(clearTimeout);chaine=[];allume(k);JOUE[k][0]();chaine.push(setTimeout(()=>allume(null),reduit?1500:JOUE[k][1]));}
function joueTout(){chaine.forEach(clearTimeout);chaine=[];let t=0;
 ["A","B","C"].forEach(k=>{chaine.push(setTimeout(()=>{allume(k);JOUE[k][0]();},t));t+=reduit?0:JOUE[k][1];});
 chaine.push(setTimeout(()=>allume(null),reduit?1500:t));}
const large=matchMedia("(min-width:761px)").matches;let dejaVu=false;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 if(large){if(dejaVu)return;dejaVu=true;joueTout();}
 else{const k=e.target.id.slice(3);if(vu[k])return;vu[k]=true;joueUne(k);}}),{threshold:large?.35:.5});
if(large)io.observe(document.querySelector(".imprevu"));else Object.values(cartes).forEach(c=>io.observe(c));



