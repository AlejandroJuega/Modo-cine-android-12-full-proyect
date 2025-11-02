// --- VARIABLES GLOBALES ---
let currentMovie=null, playerInterval;

// --- CAMBIO DE PESTAÑAS ---
const tabs=document.querySelectorAll(".bottom-nav button");
const sections=document.querySelectorAll("section");
tabs.forEach(btn=>{
 btn.onclick=()=>{
  tabs.forEach(b=>b.classList.remove("active"));
  sections.forEach(s=>s.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(btn.dataset.tab).classList.add("active");
 };
});

// --- BUSCAR PELÍCULAS (TMDB) ---
const resultados=document.getElementById("resultados");
document.getElementById("searchBtn").onclick=()=>{
 const q=document.getElementById("searchInput").value.trim();
 if(q) buscar(q);
};
document.querySelectorAll(".cat").forEach(c=>{
 c.onclick=()=>buscarGenero(c.dataset.genre);
});

async function buscar(q){
 const url=`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(q)}&language=es-ES`;
 const r=await fetch(url);const d=await r.json();renderPeliculas(d.results);
}
async function buscarGenero(id){
 const url=`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${id}&language=es-ES`;
 const r=await fetch(url);const d=await r.json();renderPeliculas(d.results);
}

function renderPeliculas(list){
 resultados.innerHTML="";
 list.forEach(m=>{
  const img=m.poster_path?`https://image.tmdb.org/t/p/w500${m.poster_path}`:"";
  const c=document.createElement("div");
  c.className="card";
  c.innerHTML=`<img src="${img}"><div class="info"><h3>${m.title}</h3></div>`;
  c.onclick=()=>mostrarDetalle(m);
  resultados.appendChild(c);
 });
}

// --- DETALLE ---
function mostrarDetalle(m){
 currentMovie=m;
 document.getElementById("detalleFondo").style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${m.backdrop_path})`;
 document.getElementById("detalleTitulo").textContent=m.title;
 document.getElementById("detalleDescripcion").textContent=m.overview||"Sin descripción.";
 document.getElementById("detalle").classList.remove("hidden");
 document.getElementById("buscar").classList.add("hidden");
}
document.getElementById("verAhora").onclick=()=>abrirPlayer();

// --- PLAYER ---
const player=document.getElementById("player");
const modal=document.getElementById("playerModal");
const closeP=document.getElementById("closePlayer");
const timeLabel=document.getElementById("playerTime");

function abrirPlayer(){
 modal.classList.remove("hidden");
 player.src="https://www.w3schools.com/html/mov_bbb.mp4";
 player.play();
 actualizarTiempo();
 playerInterval=setInterval(actualizarTiempo,500);
}
closeP.onclick=()=>{
 modal.classList.add("hidden");
 player.pause();
 clearInterval(playerInterval);
};

function actualizarTiempo(){
 const c=player.currentTime,d=player.duration;
 if(isNaN(d))return;
 const fmt=t=>new Date(t*1000).toISOString().substr(11,8);
 timeLabel.textContent=`${fmt(c)} / ${fmt(d)}`;
}

// --- APPS ---
const appsList=document.getElementById("appsList");
const apps=[
 {name:"Netflix",desc:"Series y películas",stars:"⭐⭐⭐⭐⭐"},
 {name:"Spotify",desc:"Música y podcasts",stars:"⭐⭐⭐⭐"},
 {name:"YouTube",desc:"Videos online",stars:"⭐⭐⭐⭐⭐"}
];
apps.forEach(a=>{
 const c=document.createElement("div");
 c.className="card";
 c.innerHTML=`<div class="info"><h3>${a.name}</h3><p>${a.desc}</p><p>${a.stars}</p><button>Instalar</button></div>`;
 appsList.appendChild(c);
});

// --- CONFIGURACIÓN ---
document.getElementById("darkMode").onchange=e=>{
 document.body.style.background=e.target.checked?"#000":"linear-gradient(180deg,#0f1b2e,#0a58ca)";
};
document.getElementById("logout").onclick=()=>{
 localStorage.removeItem("modoCineUser");
 location.href="login.html";
};

// --- INSTALAR PWA ---
let deferredPrompt;
const installBtn=document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt",e=>{
 e.preventDefault();deferredPrompt=e;
 installBtn.style.display="block";
});
installBtn.onclick=async()=>{
 if(!deferredPrompt)return alert("Ya instalada ✅");
 deferredPrompt.prompt();
 const c=await deferredPrompt.userChoice;
 if(c.outcome==="accepted")alert("Instalando 🚀");
 deferredPrompt=null;
};
