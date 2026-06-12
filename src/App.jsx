import React,{useState,useEffect,useRef,useCallback,useMemo}from"react";
import{createClient}from"@supabase/supabase-js";
const SURL=process.env.REACT_APP_SUPABASE_URL||"";
const SKEY=process.env.REACT_APP_SUPABASE_ANON_KEY||"";

// ══════════════════════════════════════════════════════════
// 7 THEME SYSTEM
// ══════════════════════════════════════════════════════════
const SITE_THEMES = {
  "Blue Beige": {
    id:"blue-beige",
    iLeft:"#1a2c6b", iRight:"#eee8dc", iBrand:"#fff",
    iAccent:"rgba(180,210,255,.7)", iBtn:"#1a2c6b", iBtnText:"#eee8dc",
    iTicker:"rgba(26,44,107,.5)", iTag:"rgba(26,44,107,.1)",
    iEnter:"#1a2c6b", iStore:"rgba(26,44,107,.15)",
    iEyebrow:"rgba(26,44,107,.4)", iBg:"#eee8dc",
    bg:"#eee8dc", card:"#ffffff", surface:"#ddd6c8",
    text:"#0f1f55", muted:"#4a5a8a", border:"#b0bcdc",
    accent:"#1a2c6b", dark:"#0f1f55", darkText:"#eee8dc",
    headingFont:"'Syne',sans-serif", bodyFont:"'Manrope',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@300;400;500&display=swap",
  },
  "Black Gold": {
    id:"black-gold",
    iLeft:"#1a1612", iRight:"#faf9f7", iBrand:"#d4aa50",
    iAccent:"rgba(212,170,80,.8)", iBtn:"#c9a84c", iBtnText:"#0a0806",
    iTicker:"rgba(201,168,76,.55)", iTag:"rgba(201,168,76,.08)",
    iEnter:"#1a1612", iStore:"rgba(26,22,18,.12)",
    iEyebrow:"rgba(26,22,18,.4)", iBg:"#faf9f7",
    bg:"#faf9f7", card:"#ffffff", surface:"#f0ead8",
    text:"#1a1612", muted:"#6a5e55", border:"#d8ce9a",
    accent:"#c9a84c", dark:"#1a1612", darkText:"#f5efe0",
    headingFont:"'Cormorant Garamond',serif", bodyFont:"'Jost',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,500&family=Jost:wght@300;400;500&display=swap",
  },
  "Charcoal Sand": {
    id:"charcoal-sand",
    iLeft:"#1c1a17", iRight:"#ede8e0", iBrand:"#ede8e0",
    iAccent:"rgba(232,226,216,.7)", iBtn:"#1c1a17", iBtnText:"#ede8e0",
    iTicker:"rgba(28,26,23,.5)", iTag:"rgba(28,26,23,.08)",
    iEnter:"#1c1a17", iStore:"rgba(28,26,23,.12)",
    iEyebrow:"rgba(28,26,23,.4)", iBg:"#ede8e0",
    bg:"#ede8e0", card:"#ffffff", surface:"#ddd8cf",
    text:"#1c1a17", muted:"#5a5550", border:"#b8b0a0",
    accent:"#2d2a25", dark:"#1c1a17", darkText:"#ede8e0",
    headingFont:"'Syne',sans-serif", bodyFont:"'Manrope',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@300;400;500&display=swap",
  },
  "Blue Gold": {
    id:"blue-gold",
    iLeft:"#1a3060", iRight:"#eef3fc", iBrand:"#e8b84b",
    iAccent:"rgba(232,184,75,.8)", iBtn:"#d4a830", iBtnText:"#0a1530",
    iTicker:"rgba(26,48,96,.5)", iTag:"rgba(26,48,96,.08)",
    iEnter:"#1a3060", iStore:"rgba(26,48,96,.12)",
    iEyebrow:"rgba(26,48,96,.4)", iBg:"#eef3fc",
    bg:"#eef3fc", card:"#ffffff", surface:"#dde6f8",
    text:"#0d2050", muted:"#4a5a8a", border:"#a0b8e0",
    accent:"#c9a830", dark:"#1a3060", darkText:"#eef3fc",
    headingFont:"'Playfair Display',serif", bodyFont:"'Lato',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap",
  },
  "Rose Gold": {
    id:"rose-gold",
    iLeft:"#2d1515", iRight:"#fdf6f0", iBrand:"#f5c5b0",
    iAccent:"rgba(245,197,176,.75)", iBtn:"#c06848", iBtnText:"#fff",
    iTicker:"rgba(192,104,72,.5)", iTag:"rgba(192,104,72,.08)",
    iEnter:"#2d1515", iStore:"rgba(45,21,21,.12)",
    iEyebrow:"rgba(45,21,21,.4)", iBg:"#fdf6f0",
    bg:"#fdf6f0", card:"#ffffff", surface:"#f0e0d8",
    text:"#2d1515", muted:"#7a4a40", border:"#e0b0a0",
    accent:"#c06848", dark:"#2d1515", darkText:"#fdf6f0",
    headingFont:"'Fraunces',serif", bodyFont:"'Libre Baskerville',serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300;1,9..144,500&family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap",
  },
  "Forest Green": {
    id:"forest-green",
    iLeft:"#0d2b1e", iRight:"#edf7ee", iBrand:"#a0f0bc",
    iAccent:"rgba(160,240,188,.75)", iBtn:"#0d6b3a", iBtnText:"#ffffff",
    iTicker:"rgba(13,43,30,.5)", iTag:"rgba(13,43,30,.08)",
    iEnter:"#0d2b1e", iStore:"rgba(13,43,30,.12)",
    iEyebrow:"rgba(13,43,30,.4)", iBg:"#edf7ee",
    bg:"#edf7ee", card:"#ffffff", surface:"#d0ecd8",
    text:"#0d2b1e", muted:"#3a6050", border:"#80c898",
    accent:"#0d6b3a", dark:"#0d2b1e", darkText:"#edf7ee",
    headingFont:"'DM Serif Display',serif", bodyFont:"'DM Sans',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap",
  },
  "Midnight": {
    id:"midnight",
    iLeft:"#09101f", iRight:"#141d35", iBrand:"#e8924a",
    iAccent:"rgba(232,146,74,.8)", iBtn:"#e8924a", iBtnText:"#ffffff",
    iTicker:"rgba(232,146,74,.45)", iTag:"rgba(232,146,74,.08)",
    iEnter:"#e8924a", iStore:"rgba(9,16,31,.88)",
    iEyebrow:"rgba(232,146,74,.55)", iBg:"#09101f",
    bg:"#0b0f1e", card:"#131929", surface:"#1e2640",
    text:"#f2ede0", muted:"#8a94b8", border:"#2a3560",
    accent:"#e8924a", dark:"#09101f", darkText:"#f2ede0",
    headingFont:"'Cinzel',serif", bodyFont:"'Raleway',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap",
  },
  "Couture": {
    id:"couture",
    iLeft:"#1a1410", iRight:"#ece3d5", iBrand:"#fefcf7",
    iAccent:"rgba(172,108,52,.88)", iBtn:"#9a6030", iBtnText:"#fefcf7",
    iTicker:"rgba(172,108,52,.48)", iTag:"rgba(172,108,52,.09)",
    iEnter:"#9a6030", iStore:"rgba(26,20,16,.13)",
    iEyebrow:"rgba(26,20,16,.38)", iBg:"#ece3d5",
    bg:"#fefcf7", card:"#ffffff", surface:"#f4ece0",
    text:"#1a1410", muted:"#7c6e5e", border:"#e0d4c4",
    accent:"#9a6030", dark:"#1a1410", darkText:"#fefcf7",
    headingFont:"'Bodoni Moda',serif", bodyFont:"'Raleway',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,900;1,6..96,400;1,6..96,600&family=Raleway:wght@300;400;500;600&display=swap",
    customCSS:"button:not(.adm-btn):not(.adm-sb-item){border-radius:28px!important} .pprice{font-style:italic!important} .pname{letter-spacing:0.03em!important} .rv{border:0.5px solid var(--t-border)!important} .feel-badge{border-radius:100px!important}",
  },
};





const sb=SURL&&SKEY?createClient(SURL,SKEY):null;
const WA_NUM="923228722232";

// ── Global toast (usable anywhere) ───────────────────────────
let _toastListeners=[];
function toast(msg,type="info"){
  _toastListeners.forEach(fn=>fn(msg,type));
}

// ── useSettings: load all website_settings from Supabase ─────
function useSettings(){
  const[settings,setSettings]=useState({});
  useEffect(()=>{
    if(!sb)return;
    sb.from("website_settings").select("key,value")
      .then(({data})=>{
        if(!data)return;
        const obj={};
        data.forEach(({key,value})=>{obj[key]=value;});
        setSettings(obj);
      });
  },[]);
  return settings;
}

// ── useDB: generic Supabase query hook ───────────────────────
function useDB(queryFn,deps=[]){
  const[data,setData]=useState(null);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(null);
  useEffect(()=>{
    if(!sb){setLoading(false);return;}
    setLoading(true);
    queryFn()
      .then(({data:d,error:e})=>{
        if(e){setError(e);console.error("useDB error:",e);}
        else setData(d);
        setLoading(false);
      })
      .catch(e=>{setError(e);setLoading(false);});
  // eslint-disable-next-line
  },deps);
  return{data,loading,error};
}



const CAT_L={WU:"Women Unstitched",WS:"Women Stitched",M:"Men's Unstitched",K:"Kids Unstitch",HOT:"Hot Sale",NEW:"New Arrivals","2PC":"2-Piece Sets"};
const CAT_EMOJI={WU:"🧶",WS:"👗",RS:"🥻",AB:"🧕",MP:"👔",ME:"🪡",KU:"🧸",BS:"🛏️",BL:"🧣",OT:"🛍️",HOT:"🔥",NEW:"✨","2PC":"👘",M:"👔",K:"🧸"};
const CATS=[
  ["All","All"],
  ["WU","Women Unstitch"],
  ["WS","Women Stitch"],
  ["RS","Women Stitch + Unstitch – Fancy (Reshmi Suiting)"],
  ["AB","Abayas"],
  ["MP","Mens Unstitch Plain"],
  ["ME","Mens Unstitch Embroidery"],
  ["KU","Kids Unstitch"],
  ["BS","Bedsheets"],
  ["BL","Blankets"],
  ["OT","Others"],
  ["HOT","Hot Sale"],
  ["NEW","New Arrivals"],
];
// ── Brand limits per category ─────────────────────────────────
const CAT_BRAND_LIMITS={
  "MP":{min:10,max:16},   // Mens Plain
  "ME":{min:3, max:6},    // Mens Embroidery
  "WS":{min:1, max:15},   // Women Stitch
  "RS":{min:1, max:15},   // Reshmi Suiting
  "AB":{min:1, max:1},    // Abayas - no brand
  "KU":{min:1, max:1},    // Kids Unstitch - no brand
  "BS":{min:1, max:5},    // Bedsheets
  "BL":{min:1, max:5},    // Blankets
  "OT":{min:1, max:10},   // Others
  "WU":{min:1, max:20},   // Women Unstitch
};


// ── Feature Constants ────────────────────────────────────────
const FEEL_OPTS=["Soft","Medium","Stiff"];
const SEASON_OPTS=["Summer","Winter","All-season"];
const CARE_OPTS=["Machine Wash","Hand Wash","Dry Clean Only"];
const SORT_OPTS=[{v:"new",l:"Newest First"},{v:"price_asc",l:"Price: Low to High"},{v:"price_desc",l:"Price: High to Low"},{v:"name",l:"Name A-Z"}];


const G=`
:root{
  --jf-bg:#faf9f7;--jf-card:#fff;--jf-surface:#f5f0e8;
  --jf-text:#1a1612;--jf-muted:#9a8f83;--jf-border:#e8dfc0;
  --jf-accent:#c9a84c;--jf-dark:#1a1612;--jf-dark-text:#f5efe0;
}

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden}
body{font-family:'Jost',sans-serif;overflow-x:hidden;background:#faf9f7;color:#111}
img{max-width:100%}
button{font-family:'Jost',sans-serif}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#d0ccc5;border-radius:10px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideR{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes annScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes toastIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes floatBadge1{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes floatBadge2{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes textSlide{0%{opacity:0;transform:translateY(10px)}15%{opacity:1;transform:translateY(0)}85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-10px)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
@keyframes skeletonShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.skeleton{background:linear-gradient(90deg,#f0ede8 25%,#e8e4df 50%,#f0ede8 75%);background-size:200% 100%;animation:skeletonShimmer 1.4s ease infinite}
.show-mob{display:none}

@keyframes revealUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.rv{opacity:0;transform:translateY(36px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1);}
.rv.visible{opacity:1;transform:translateY(0);}
/* Admin Panel CSS */
.adm-sb{width:240px;flex-shrink:0;background:#0f0d0a;height:100vh;display:flex;flex-direction:column;overflow:hidden;transition:width .3s ease}
.adm-sb.col{width:64px}
.adm-sb-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:6px;cursor:pointer;transition:all .15s;color:rgba(255,255,255,.5);white-space:nowrap;overflow:hidden;position:relative;background:none;border:none;width:100%;text-align:left;font-family:'Inter',sans-serif;font-size:13px;font-weight:500}
.adm-sb-item:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.85)}
.adm-sb-item.act{background:rgba(201,168,76,.15);color:#c9a84c}
.adm-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}
.adm-th{padding:10px 16px;font-size:11px;font-weight:600;color:#6b7280;text-align:left;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;background:#f9fafb}
.adm-td{padding:12px 16px;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6}
.adm-inp{width:100%;background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:9px 12px;font-size:13px;color:#111;outline:none;font-family:inherit;transition:border-color .15s}
.adm-inp:focus{border-color:#c9a84c;box-shadow:0 0 0 3px rgba(201,168,76,.1)}
.adm-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;border:none;transition:all .15s;font-family:inherit;white-space:nowrap}
@media(max-width:768px){.adm-sb{position:fixed;z-index:200;transform:translateX(-100%);transition:transform .3s}.adm-sb.mob-open{transform:translateX(0)}}

/* Countdown */
@keyframes cdTick{0%{transform:scaleY(1)}50%{transform:scaleY(.85)}100%{transform:scaleY(1)}}
.cd-tick{animation:cdTick .15s ease}

@media(max-width:768px){
  .mob-hero-banner{display:flex!important;}
  .hero-grid{grid-template-columns:1fr!important;text-align:center;}
  .hero-right{display:none!important;}
  .hero-btns{justify-content:center!important;}
  .two-col{grid-template-columns:1fr!important;}
  .four-col{grid-template-columns:1fr 1fr!important;}
  .footer-grid{grid-template-columns:1fr 1fr!important;}
  .hide-mob{display:none!important;}
  .show-mob{display:flex!important;}
  .search-bar{max-width:140px!important;}
  .stat-grid{grid-template-columns:1fr 1fr!important;}
  .adm-sb{position:fixed;z-index:200;transform:translateX(-100%);transition:transform .3s}
  .adm-sb.mob-open{transform:translateX(0)}
}
@media(max-width:640px){
  body{overflow-x:hidden!important;}
  *{max-width:100vw;box-sizing:border-box;}
  section,div[style*="padding"]{padding-left:12px!important;padding-right:12px!important;}
  .mystery-grid{grid-template-columns:1fr!important;border-radius:12px!important;}
  .cat-bar-inner{justify-content:flex-start!important;padding:0 4px!important;}
  .hero-grid{padding:60px 16px 40px!important;}
  h1,h2,h3{word-break:break-word;}
  button,a{min-height:44px;display:inline-flex;align-items:center;justify-content:center;}
  input,select,textarea{font-size:16px!important;}
}
@media(max-width:480px){
  .four-col{grid-template-columns:1fr!important;}
  .footer-grid{grid-template-columns:1fr!important;}
  .hero-text h1{font-size:clamp(38px,12vw,60px)!important;}
  .stat-grid{grid-template-columns:1fr 1fr!important;}
  .prod-card-grid{grid-template-columns:1fr 1fr!important;}
}


/* Price slider */
input[type=range].price-slider{-webkit-appearance:none;width:100%;height:4px;border-radius:2px;background:linear-gradient(to right,#c9a84c var(--val,50%),#e0d8cc var(--val,50%));outline:none;}
input[type=range].price-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#c9a84c;cursor:pointer;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2);}
/* Gift option */
.gift-box{border:2px dashed #c9a84c;border-radius:12px;padding:16px;background:#fffef5;}
/* AI suggester */
.ai-typing::after{content:"▌";animation:blink .7s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.feel-badge{display:inline-block;font-size:10px;font-weight:600;letter-spacing:.5px;padding:2px 8px;border-radius:20px;border:1px solid #d8ce9a;background:#fffdf5;color:#7a6838;line-height:1.4;text-transform:capitalize;}
.fs-bar{position:relative;width:100%;background:#f5f0e8;height:28px;overflow:hidden;font-size:11px;font-weight:600;color:#5a4a30;display:flex;align-items:center;padding:0 14px;}
.fs-prog{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#c9a84c,#e8c96a);transition:width .6s cubic-bezier(.4,0,.2,1);z-index:0;}
@media(max-width:640px){.mystery-grid{grid-template-columns:1fr!important;border-radius:12px!important;}}
body{background:var(--jf-bg)!important;color:var(--jf-text)!important}
.rv{background:var(--jf-card)!important}
footer{background:var(--jf-dark)!important;color:var(--jf-dark-text)!important}
`;

function useReveal(){
  useEffect(()=>{
    function run(){
      const obs=new IntersectionObserver(entries=>{
        entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}});
      },{threshold:.08,rootMargin:"0px 0px -40px 0px"});
      document.querySelectorAll(".rv").forEach(el=>obs.observe(el));
      return()=>obs.disconnect();
    }
    const t=setTimeout(run,100);
    return()=>clearTimeout(t);
  });
}
const IgSvg=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const WaSvg=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
const TkSvg=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.19a8.19 8.19 0 0 0 4.79 1.53V6.27a4.85 4.85 0 0 1-1.02-.57z"/></svg>;
const FbSvg=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;

// ══════════════════════════════════════════════════════════════
// CUSTOM CURSOR (desktop only)
// ══════════════════════════════════════════════════════════════
function CustomCursor(){
  const dot=useRef(null);const cursor=useRef(null);
  useEffect(()=>{
    const move=e=>{
      if(dot.current){dot.current.style.left=e.clientX+"px";dot.current.style.top=e.clientY+"px";}
      if(cursor.current){
        setTimeout(()=>{if(cursor.current){cursor.current.style.left=e.clientX+"px";cursor.current.style.top=e.clientY+"px";}},80);
      }
    };
    window.addEventListener("mousemove",move);
    return()=>window.removeEventListener("mousemove",move);
  },[]);
  // Only show on desktop
  if(typeof window!=="undefined"&&window.matchMedia("(pointer:coarse)").matches)return null;
  return(<>
    <div ref={dot} className="jf-cursor-dot"/>
    <div ref={cursor} className="jf-cursor">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Needle shape */}
        <line x1="4" y1="28" x2="24" y2="8" stroke="#1a1612" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="24.5" cy="7.5" rx="3" ry="1.5" transform="rotate(-45 24.5 7.5)" fill="#c9a84c" stroke="#1a1612" strokeWidth="1"/>
        <circle cx="24.5" cy="7.5" r="1" fill="#1a1612"/>
        {/* Thread */}
        <path d="M4 28 Q2 30 3 31 Q4 32 6 30 Q8 28 7 26" stroke="#c9a84c" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  </>);
}

// ══════════════════════════════════════════════════════════════
// FREE SHIPPING BAR
// ══════════════════════════════════════════════════════════════
function FreeShippingBar({cartTotal,settings}){
  const min=Number(settings?.free_shipping_min||2000);
  const active=settings?.free_shipping_active!=="false";
  if(!active)return null;
  const remaining=Math.max(0,min-cartTotal);
  const pct=Math.min(100,Math.round((cartTotal/min)*100));
  return(
    <div className="fs-bar">
      <div className="fs-prog" style={{width:pct+"%"}}/>
      <span style={{position:"relative",zIndex:1}}>
        {remaining<=0
          ?<>✨ You've unlocked <strong>Free Shipping!</strong></>
          :<>Add <strong>Rs. {remaining.toLocaleString()}</strong> more for 🚚 <strong>Free Shipping</strong></>
        }
      </span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// EID COUNTDOWN
// ══════════════════════════════════════════════════════════════
function EidCountdown({settings}){
  const[time,setTime]=useState({d:0,h:0,m:0,s:0});
  const active=settings?.eid_show==="true";
  const eidDate=settings?.eid_date;
  useEffect(()=>{
    if(!active||!eidDate)return;
    const tick=()=>{
      const diff=new Date(eidDate)-new Date();
      if(diff<=0){setTime({d:0,h:0,m:0,s:0});return;}
      setTime({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)});
    };
    tick();const t=setInterval(tick,1000);return()=>clearInterval(t);
  },[active,eidDate]);
  if(!active||!eidDate)return null;
  return(
    <div style={{background:"linear-gradient(135deg,#1a1612,#2c2416)",color:"#fff",padding:"20px",textAlign:"center",margin:"24px 0",borderRadius:12,border:"1px solid #c9a84c44"}}>
      <div style={{fontSize:10,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:6}}>🌙 {settings?.eid_title||"Eid Collection"}</div>
      <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:12}}>{settings?.eid_subtitle||"Exclusive Eid Arrivals — Coming Soon"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:12}}>
        {[["Days",time.d],["Hours",time.h],["Min",time.m],["Sec",time.s]].map(([l,v])=>(
          <div key={l} style={{background:"rgba(201,168,76,.1)",border:"1px solid #c9a84c44",borderRadius:8,padding:"10px 14px",minWidth:56}}>
            <div style={{fontSize:24,fontWeight:700,color:"#c9a84c",fontFamily:"'Cormorant Garamond',serif"}}>{String(v).padStart(2,"0")}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.65)",letterSpacing:1,textTransform:"uppercase"}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// FABRIC FEEL INDICATOR
// ══════════════════════════════════════════════════════════════
function FabricFeel({feel,season,care}){
  if(!feel&&!season&&!care)return null;
  const feelColor={Soft:"#4caf7d",Medium:"#e0a052",Stiff:"#5296e0"};
  const seasonIcon={Summer:"☀️","All-season":"🌤️",Winter:"❄️"};
  const careIcon={"Machine Wash":"🫧","Hand Wash":"🤲","Dry Clean Only":"🧺"};
  return(
    <div style={{display:"flex",flexWrap:"wrap",gap:5,margin:"8px 0"}}>
      {feel&&<span className="feel-badge" style={{color:feelColor[feel]||"#9a8f83",borderColor:feelColor[feel]||"#9a8f83"}}>{feel==="Soft"?"🪶":feel==="Stiff"?"💎":"✋"} {feel}</span>}
      {season&&<span className="feel-badge" style={{color:"#6b5f52",borderColor:"#e0d8cc"}}>{seasonIcon[season]||"🌤️"} {season}</span>}
      {care&&<span className="feel-badge" style={{color:"#6b5f52",borderColor:"#e0d8cc"}}>{careIcon[care]||"🧺"} {care}</span>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PRICE RANGE SLIDER
// ══════════════════════════════════════════════════════════════
function PriceSlider({min,max,value,onChange}){
  return(
    <div style={{padding:"0 4px"}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#7a6e65",marginBottom:4}}>
        <span>Rs. {value[0].toLocaleString()}</span>
        <span>Rs. {value[1].toLocaleString()}</span>
      </div>
      <div style={{position:"relative",height:4,background:"#e0d8cc",borderRadius:2,margin:"8px 0 4px"}}>
        <div style={{position:"absolute",left:((value[0]-min)/(max-min)*100)+"%",right:(100-(value[1]-min)/(max-min)*100)+"%",height:"100%",background:"#c9a84c",borderRadius:2}}/>
        <input type="range" min={min} max={max} value={value[0]} onChange={e=>onChange([Math.min(+e.target.value,value[1]-500),value[1]])} className="price-slider" style={{position:"absolute",width:"100%",opacity:0,height:20,top:-8,cursor:"pointer"}}/>
        <input type="range" min={min} max={max} value={value[1]} onChange={e=>onChange([value[0],Math.max(+e.target.value,value[0]+500)])} className="price-slider" style={{position:"absolute",width:"100%",opacity:0,height:20,top:-8,cursor:"pointer"}}/>
        <div style={{position:"absolute",left:((value[0]-min)/(max-min)*100)+"%",top:-6,width:16,height:16,background:"#c9a84c",borderRadius:"50%",border:"2px solid #fff",boxShadow:"0 1px 4px rgba(0,0,0,.2)",transform:"translateX(-50%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",left:((value[1]-min)/(max-min)*100)+"%",top:-6,width:16,height:16,background:"#c9a84c",borderRadius:"50%",border:"2px solid #fff",boxShadow:"0 1px 4px rgba(0,0,0,.2)",transform:"translateX(-50%)",pointerEvents:"none"}}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// VOICE SEARCH
// ══════════════════════════════════════════════════════════════
function VoiceSearchBtn({onResult}){
  const[listening,setListening]=useState(false);
  const SR=typeof window!=="undefined"&&(window.SpeechRecognition||window.webkitSpeechRecognition);
  if(!SR)return null;
  function start(){
    const r=new SR();r.lang="ur-PK";r.interimResults=false;r.maxAlternatives=3;
    r.onresult=e=>{
      const t=e.results[0][0].transcript;
      setListening(false);onResult(t);
    };
    r.onerror=()=>setListening(false);
    r.onend=()=>setListening(false);
    r.start();setListening(true);
  }
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0}}>
      <button onClick={start} title="Bol ke dhundo" className={listening?"voice-active":""} style={{background:listening?"#ef4444":"#f5f0e8",border:"1px solid #e0d8cc",borderRadius:8,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"background .2s"}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={listening?"#fff":"#c9a84c"} strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      </button>
      <span style={{fontSize:7,color:listening?"#ef4444":"#9a8f83",letterSpacing:.5,whiteSpace:"nowrap"}}>{listening?"Listening...":"🎤 Bol ke"}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SMART STYLE FINDER (rule-based, no API needed)
// ══════════════════════════════════════════════════════════════
function AIOutfitSuggester({prods,onFilter}){
  const[open,setOpen]=useState(false);
  const[gender,setGender]=useState("Women");
  const[event,setEvent]=useState("");
  const[budget,setBudget]=useState("");
  const[results,setResults]=useState([]);
  const[searched,setSearched]=useState(false);

  const GENDER_CATS={Women:["WU","WS","RS","AB"],Men:["MP","ME"],Kids:["KU"]};
  const EVENT_FEEL={Mehndi:["Embroidered"],Eid:["Soft","Embroidered"],Nikah:["Embroidered"],"Wedding Guest":["Embroidered","Soft"],Office:["Medium","Soft"],Casual:["Soft","Medium"],Party:["Embroidered"],Winter:["Stiff","Medium"]};
  const BUDGETS=["Under Rs.2000","Rs.2000–5000","Rs.5000–10000","Rs.10000+"];
  const EVENTS=["Mehndi","Eid","Nikah","Office","Casual","Wedding Guest","Party","Winter"];

  function suggest(){
    const safe=(prods||[]).filter(p=>p&&p.name&&p.in_stock!==false);
    const cats=GENDER_CATS[gender]||[];
    const preferredFeel=EVENT_FEEL[event]||[];

    let filtered=safe.filter(p=>{
      const catOk=cats.includes(p.cat)||cats.includes(p.category);
      const price=Number(p.sale_price||p.price||0);
      const budgetOk=!budget||
        (budget.includes("Under")&&price<2000)||
        (budget.includes("2000–5000")&&price>=2000&&price<=5000)||
        (budget.includes("5000–10000")&&price>5000&&price<=10000)||
        (budget.includes("10000+")&&price>10000);
      return catOk&&budgetOk;
    });

    // Prefer products matching the occasion's fabric feel
    if(preferredFeel.length>0){
      const withFeel=filtered.filter(p=>preferredFeel.includes(p.feel));
      if(withFeel.length>=2)filtered=withFeel;
    }

    // Shuffle and pick up to 4
    const picks=filtered.sort(()=>Math.random()-.5).slice(0,4);
    setResults(picks);
    setSearched(true);
  }

  return(
    <>
      <button onClick={()=>setOpen(true)} style={{position:"fixed",bottom:140,right:16,zIndex:900,background:"linear-gradient(135deg,#1a1612,#2c2416)",color:"#c9a84c",border:"1px solid #c9a84c44",borderRadius:50,padding:"10px 16px",fontSize:12,fontWeight:600,cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,.3)",display:"flex",alignItems:"center",gap:6}}>
        ✨ Style Help
      </button>
      {open&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setOpen(false)}>
        <div style={{background:"#fff",borderRadius:"16px 16px 0 0",padding:24,width:"100%",maxWidth:500,maxHeight:"88vh",overflow:"auto"}} onClick={e=>e.stopPropagation()}>
          <div style={{fontWeight:700,fontSize:16,color:"#1a1612",marginBottom:6}}>✨ Style Finder</div>
          <div style={{fontSize:11,color:"#7a6e65",marginBottom:10}}>Apni zaroorat batao — hum matching products dhundhtein hain</div>
          <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:20,padding:"4px 12px",fontSize:10,color:"#15803d",fontWeight:600,marginBottom:14}}>
            🛡️ Real products — Admin ne personally select ki hain
          </div>

          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:"#9a8f83",textTransform:"uppercase",marginBottom:6}}>Kiske liye?</div>
            <div style={{display:"flex",gap:6}}>
              {["Women","Men","Kids"].map(g=>(
                <button key={g} onClick={()=>{setGender(g);setSearched(false);}} style={{flex:1,padding:"7px 4px",fontSize:11,fontWeight:600,border:`1.5px solid ${gender===g?"#c9a84c":"#e0d8cc"}`,background:gender===g?"rgba(201,168,76,.08)":"#fff",color:gender===g?"#c9a84c":"#7a6e65",borderRadius:6,cursor:"pointer"}}>{g}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:"#9a8f83",textTransform:"uppercase",marginBottom:6}}>Occasion (optional)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {EVENTS.map(e=>(
                <button key={e} onClick={()=>{setEvent(ev=>ev===e?"":e);setSearched(false);}} style={{padding:"5px 11px",fontSize:10,fontWeight:600,border:`1.5px solid ${event===e?"#c9a84c":"#e0d8cc"}`,background:event===e?"rgba(201,168,76,.08)":"#fff",color:event===e?"#c9a84c":"#7a6e65",borderRadius:20,cursor:"pointer"}}>{e}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:"#9a8f83",textTransform:"uppercase",marginBottom:6}}>Budget (optional)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {BUDGETS.map(b=>(
                <button key={b} onClick={()=>{setBudget(bv=>bv===b?"":b);setSearched(false);}} style={{padding:"5px 11px",fontSize:10,fontWeight:600,border:`1.5px solid ${budget===b?"#c9a84c":"#e0d8cc"}`,background:budget===b?"rgba(201,168,76,.08)":"#fff",color:budget===b?"#c9a84c":"#7a6e65",borderRadius:20,cursor:"pointer"}}>{b}</button>
              ))}
            </div>
          </div>

          <button onClick={suggest} style={{width:"100%",background:"#1a1612",color:"#c9a84c",border:"none",borderRadius:8,padding:"12px",fontSize:12,fontWeight:700,cursor:"pointer",letterSpacing:1,marginBottom:14}}>
            Find Matching Products →
          </button>

          {searched&&(
            results.length>0?(
              <>
                <div style={{fontSize:11,color:"#7a6e65",marginBottom:10}}>✓ {results.length} products mili hain tumhare liye:</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  {results.map(p=>{
                    const img=p.img1||p.photo_url||"";
                    const price=Number(p.sale_price||p.price||0);
                    return(
                      <div key={p.id} style={{border:"1px solid #e0d8cc",borderRadius:8,overflow:"hidden",background:"#fdfcf8"}}>
                        <div style={{aspectRatio:"3/4",background:"#f5f0e8",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                          {img?<img src={img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.outerHTML='<span style="font-size:36px">'+(CAT_EMOJI[p.cat]||"🛍️")+"</span>";}}/>
                          :<span style={{fontSize:36}}>{CAT_EMOJI[p.cat]||CAT_EMOJI[p.category]||"🛍️"}</span>}
                        </div>
                        <div style={{padding:"8px 10px"}}>
                          <div style={{fontSize:11,fontWeight:600,color:"#1a1612",lineHeight:1.3,marginBottom:3}}>{p.name}</div>
                          {p.feel&&<div style={{fontSize:9,color:"#7a6e65",marginBottom:3}}>{p.feel} · {p.season||""}</div>}
                          <div style={{fontSize:13,fontWeight:700,color:"#c9a84c",fontFamily:"'Cormorant Garamond',serif"}}>Rs.{price.toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={()=>{onFilter&&onFilter(GENDER_CATS[gender]?.[0]||"All");setOpen(false);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}} style={{width:"100%",background:"none",border:"1px solid #e0d8cc",borderRadius:8,padding:"10px",fontSize:12,cursor:"pointer",color:"#7a6e65",marginBottom:6}}>
                  Saari {gender} products dekhein →
                </button>
              </>
            ):(
              <div style={{textAlign:"center",padding:"20px 0",color:"#7a6e65",fontSize:13}}>
                Is filter mein koi product nahi mili.<br/>
                <button onClick={()=>{setBudget("");setEvent("");suggest();}} style={{marginTop:8,background:"none",border:"1px solid #c9a84c",color:"#c9a84c",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:11,fontWeight:600}}>Budget filter hata ke dhundho</button>
              </div>
            )
          )}

          <button onClick={()=>{setOpen(false);setResults([]);setSearched(false);setEvent("");setBudget("");}} style={{width:"100%",background:"none",border:"1px solid #e0d8cc",borderRadius:8,padding:"10px",fontSize:13,cursor:"pointer",color:"#7a6e65"}}>Close</button>
        </div>
      </div>}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// IMAGE ZOOM MODAL
// ══════════════════════════════════════════════════════════════
function ImageZoom({src,alt,onClose}){
  if(!src)return null;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out"}}>
      <img src={src} alt={alt||""} style={{maxWidth:"95vw",maxHeight:"95vh",objectFit:"contain",borderRadius:4}}/>
      <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:36,height:36,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>✕</button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// GIFT OPTION COMPONENT
// ══════════════════════════════════════════════════════════════
function GiftOption({value,onChange,prods=[],settings={}}){
  const base=Number(settings.gift_base_price||200);
  const opts=[
    {id:"box",l:settings.gift_box_label||"Gift Box",p:Number(settings.gift_box_price||200)},
    {id:"sheet",l:settings.gift_sheet_label||"Wrapping Sheet",p:Number(settings.gift_sheet_price||100)},
    {id:"card",l:settings.gift_card_label||"Greeting Card",p:Number(settings.gift_card_price||50)}
  ];
  const extra=opts.filter(o=>value?.extras?.includes(o.id)).reduce((a,o)=>a+o.p,0)+(value?.enabled?base:0);
  if(settings.gift_active==="false")return null;
  return(
    <div className="gift-box" style={{marginTop:12}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:value?.enabled?12:0}}>
        <input type="checkbox" id="gift-cb" checked={!!value?.enabled} onChange={e=>onChange({...value,enabled:e.target.checked})} style={{width:16,height:16,accentColor:"#c9a84c"}}/>
        <label htmlFor="gift-cb" style={{fontWeight:600,fontSize:13,color:"#1a1612",cursor:"pointer"}}>🎁 {settings.gift_title||"Send as Gift"} <span style={{color:"#c9a84c",fontWeight:700}}>+Rs. {base}</span></label>
      </div>
      {value?.enabled&&<>
        <div style={{fontSize:12,color:"#7a6e65",marginBottom:8}}>Recipient Details</div>
        <div style={{marginBottom:8}}>
            <label style={{fontSize:12,color:"#9a8f83",display:"block",marginBottom:4}}>🎁 Select Product (optional)</label>
            <select value={value?.product_id||""} onChange={e=>{const opt=e.target.options[e.target.selectedIndex];onChange({...value,product_id:e.target.value,product_name:opt.text});}} style={{width:"100%",padding:"8px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",background:"#fff"}}>
              <option value="">— Choose product to gift —</option>
              {(typeof prods!=="undefined"?prods:[]).map(p=><option key={p.id} value={p.id}>{p.name} — Rs.{Number(p.sale_price||p.price||0).toLocaleString()}</option>)}
            </select>
            {value?.product_name&&<div style={{fontSize:11,color:"#c9a84c",marginTop:3}}>✓ {value.product_name}</div>}
          </div>
          <input value={value?.to_name||""} onChange={e=>onChange({...value,to_name:e.target.value})} placeholder="Recipient Name" style={{width:"100%",padding:"8px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:12,outline:"none",marginBottom:6,boxSizing:"border-box"}}/>
        <input value={value?.to_address||""} onChange={e=>onChange({...value,to_address:e.target.value})} placeholder="Delivery Address" style={{width:"100%",padding:"8px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:12,outline:"none",marginBottom:6,boxSizing:"border-box"}}/>
        <input value={value?.to_phone||""} onChange={e=>onChange({...value,to_phone:e.target.value})} placeholder="Recipient Phone" style={{width:"100%",padding:"8px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:12,outline:"none",marginBottom:8,boxSizing:"border-box"}}/>
        <div style={{fontSize:12,color:"#7a6e65",marginBottom:6}}>Add-ons:</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
          {opts.map(o=>(
            <label key={o.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,cursor:"pointer",background:"#fff",border:"1px solid #e0d8cc",borderRadius:6,padding:"5px 10px"}}>
              <input type="checkbox" checked={value?.extras?.includes(o.id)||false} onChange={e=>{const ex=value?.extras||[];onChange({...value,extras:e.target.checked?[...ex,o.id]:ex.filter(x=>x!==o.id)});}} style={{accentColor:"#c9a84c"}}/>
              {o.l} <span style={{color:"#c9a84c"}}>+Rs.{o.p}</span>
            </label>
          ))}
        </div>
        <textarea value={value?.message||""} onChange={e=>onChange({...value,message:e.target.value})} placeholder="Gift card message (optional)..." rows={2} style={{width:"100%",padding:"8px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:12,outline:"none",resize:"none",boxSizing:"border-box",marginBottom:4}}/>
        <div style={{fontSize:11,color:"#c9a84c",fontWeight:600,textAlign:"right"}}>Gift extras total: Rs. {extra}</div>
      </>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SUBSCRIPTION BOX
// ══════════════════════════════════════════════════════════════
function SubscriptionBox({settings,user,onAuth}){
  const[open,setOpen]=useState(false);
  const[selectedTier,setSelectedTier]=useState("Gold");
  const[gender,setGender]=useState("Women");
  const[form,setForm]=useState({name:user?.user_metadata?.full_name||"",phone:"",address:"",notes:""});
  const[done,setDone]=useState(false);
  const[sub,setSub]=useState(false);
  const active=settings?.sub_active!=="false";
  if(!active)return null;

  const TIERS=[
    {
      id:"Silver",icon:"🥈",color:"#a0aec0",bg:"rgba(160,174,192,.08)",border:"rgba(160,174,192,.25)",
      price:Number(settings?.sub_silver_price||1500),
      items:settings?.sub_silver_items||"1-2 Fabrics",
      benefit:settings?.sub_silver_benefit||"Basic Selection · Standard Brands",
      badge:"Starter",
    },
    {
      id:"Gold",icon:"🥇",color:"#c9a84c",bg:"rgba(201,168,76,.1)",border:"rgba(201,168,76,.35)",
      price:Number(settings?.sub_gold_price||2500),
      items:settings?.sub_gold_items||"2-3 Fabrics",
      benefit:settings?.sub_gold_benefit||"Premium Selection · Top Brands",
      badge:"Popular ✦",popular:true,
    },
    {
      id:"Platinum",icon:"💠",color:"#7c6aff",bg:"rgba(124,106,255,.08)",border:"rgba(124,106,255,.25)",
      price:Number(settings?.sub_platinum_price||4000),
      items:settings?.sub_platinum_items||"3-4 Fabrics",
      benefit:settings?.sub_platinum_benefit||"Exclusive Selection · Designer Brands",
      badge:"Premium",
    },
    {
      id:"Diamond",icon:"💎",color:"#38bdf8",bg:"rgba(56,189,248,.08)",border:"rgba(56,189,248,.25)",
      price:Number(settings?.sub_diamond_price||6000),
      items:settings?.sub_diamond_items||"4-5 Fabrics",
      benefit:settings?.sub_diamond_benefit||"Ultra Luxury · Rare Limited Editions",
      badge:"✦ Elite",
    },
  ];

  const selected=TIERS.find(t=>t.id===selectedTier)||TIERS[1];
  const boxDate1=settings?.sub_date1||"12";
  const boxDate2=settings?.sub_date2||"28";

  async function subscribe(){
    if(!form.name||!form.phone)return toast("Name aur phone number required hai","error");
    if(sb){
      const{error}=await sb.from("subscriptions").insert({
        user_id:user?.id||null,
        name:form.name,phone:form.phone,
        address:form.address,tier:selectedTier,gender,
        notes:form.notes,status:"pending",
        created_at:new Date().toISOString()
      });
      if(error){toast("Subscription save mein masla hua, WhatsApp pe order karo","error");}
    }
    // Also send WhatsApp confirmation
    const msg=`📦 *Mystery Box Subscription*\n\nName: ${form.name}\nPhone: ${form.phone}\nTier: ${selectedTier}\nGender: ${gender}\nAddress: ${form.address||"Will provide later"}\nNotes: ${form.notes||"None"}\n\nPlease confirm my subscription! JazakAllah 🙏`;
    window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`,"_blank");
    setDone(true);
    toast("Subscription request sent! WhatsApp pe confirm karo","success");
  }

  return(
    <>
    {/* ── Mystery Box + Subscription Row ── */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,margin:"40px 0",maxWidth:1200,marginLeft:"auto",marginRight:"auto",padding:"0 clamp(16px,4vw,60px)"}}>
      {/* ── LEFT: Mystery Box ── */}
      <div style={{
        background:"linear-gradient(160deg,#1a1612 0%,#2c1f0a 100%)",
        borderRadius:"16px 0 0 16px",padding:"clamp(24px,4vw,40px)",
        position:"relative",overflow:"hidden",
        border:"1px solid rgba(201,168,76,.12)",borderRight:"none",
      }}>
        {/* Stars bg */}
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(201,168,76,.15) 1px,transparent 1px)",backgroundSize:"24px 24px",opacity:.4,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:12,right:12,background:"#c9a84c",color:"#000",fontSize:9,fontWeight:700,letterSpacing:2,padding:"3px 10px",textTransform:"uppercase",borderRadius:2}}>Mystery</div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:"clamp(2.5rem,5vw,4rem)",marginBottom:8}}>🎁</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,3vw,28px)",fontWeight:600,color:"#f5efe0",lineHeight:1.2,marginBottom:8}}>Mystery<br/>Fabric Box</div>
          <div style={{fontSize:11,color:"rgba(201,168,76,.7)",marginBottom:16,lineHeight:1.6}}>
            Curated surprise fabrics — handpicked by our experts. Delivered on the <strong style={{color:"#c9a84c"}}>{boxDate1}th & {boxDate2}th</strong> of every month.
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
            {["🧵 Handpicked premium fabrics","✨ Surprise every box","🚚 Free home delivery","💰 Save up to 30%"].map(b=>(
              <div key={b} style={{fontSize:11,color:"rgba(245,239,230,.5)",display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:13}}>{b.slice(0,2)}</span>
                <span>{b.slice(2)}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>{if(!user)return onAuth("login");setOpen(true);setSub(false);}} style={{background:"rgba(201,168,76,.12)",border:"1px solid rgba(201,168,76,.3)",color:"#c9a84c",padding:"10px 20px",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:4,transition:"all .2s",width:"100%"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,.2)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(201,168,76,.12)"}}>
            Get Mystery Box →
          </button>
        </div>
      </div>

      {/* ── RIGHT: Subscription Tiers ── */}
      <div style={{
        background:"linear-gradient(160deg,#fdfcf8 0%,#f5f0e8 100%)",
        borderRadius:"0 16px 16px 0",padding:"clamp(24px,4vw,40px)",
        border:"1px solid rgba(201,168,76,.12)",borderLeft:"1px solid rgba(201,168,76,.08)",
      }}>
        <div style={{fontSize:10,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:6}}>Monthly Fabric Box</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,3vw,26px)",fontWeight:600,color:"#1a1612",marginBottom:4}}>Choose Your Tier</div>
        <div style={{fontSize:11,color:"#9a8f83",marginBottom:16}}>1–4 curated fabrics per box · Dates: {boxDate1}th & {boxDate2}th</div>

        {/* Gender select */}
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {["Women","Men","Kids","Mix"].map(g=>(
            <button key={g} onClick={()=>setGender(g)} style={{
              flex:1,padding:"6px 4px",fontSize:10,fontWeight:700,letterSpacing:1,
              textTransform:"uppercase",border:`1px solid ${gender===g?"#1a1612":"#e0d8cc"}`,
              background:gender===g?"#1a1612":"transparent",
              color:gender===g?"#fff":"#9a8f83",cursor:"pointer",borderRadius:4,transition:"all .2s"
            }}>{g}</button>
          ))}
        </div>

        {/* Tier cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
          {TIERS.map(t=>(
            <div key={t.id} onClick={()=>setSelectedTier(t.id)} style={{
              padding:"10px 12px",borderRadius:8,border:`1px solid ${selectedTier===t.id?t.color:t.border}`,
              background:selectedTier===t.id?t.bg:"transparent",cursor:"pointer",
              transition:"all .2s",position:"relative",
            }}>
              {t.popular&&<div style={{position:"absolute",top:-7,left:"50%",transform:"translateX(-50%)",background:t.color,color:"#000",fontSize:7,fontWeight:700,padding:"2px 8px",borderRadius:10,letterSpacing:1,whiteSpace:"nowrap"}}>{t.badge}</div>}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                <span style={{fontSize:16}}>{t.icon}</span>
                <span style={{fontSize:9,fontWeight:700,color:t.color,letterSpacing:1}}>{t.items}</span>
              </div>
              <div style={{fontWeight:700,fontSize:12,color:"#1a1612",marginBottom:2}}>{t.id}</div>
              <div style={{fontSize:13,fontWeight:800,color:t.color}}>Rs. {t.price.toLocaleString()}</div>
              <div style={{fontSize:9,color:"#9a8f83",marginTop:3,lineHeight:1.4}}>{t.benefit}</div>
            </div>
          ))}
        </div>

        <button onClick={()=>{if(!user)return onAuth("login");setOpen(true);setSub(true);}} style={{
          width:"100%",background:"#1a1612",color:"#c9a84c",border:"none",
          padding:"12px",fontSize:11,fontWeight:700,letterSpacing:2,
          textTransform:"uppercase",cursor:"pointer",borderRadius:4,transition:"all .2s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background="#c9a84c";e.currentTarget.style.color="#1a1612";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#1a1612";e.currentTarget.style.color="#c9a84c";}}
        >
          Subscribe — {selectedTier} · Rs. {selected.price.toLocaleString()}
        </button>
      </div>
    </div>

    {/* ── Order Modal ── */}
    {open&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setOpen(false)}>
      <div style={{background:"#fff",borderRadius:12,padding:24,width:"100%",maxWidth:400,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        {done?(
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:48,marginBottom:12}}>{sub?"📦":"🎁"}</div>
            <div style={{fontWeight:700,fontSize:16,color:"#1a1612",marginBottom:6}}>Order Placed!</div>
            <div style={{fontSize:12,color:"#9a8f83",lineHeight:1.6}}>We'll contact you on WhatsApp for payment & delivery details.<br/>Next dispatch: {boxDate1}th or {boxDate2}th.</div>
            <button onClick={()=>{setOpen(false);setDone(false);}} style={{marginTop:16,background:"#1a1612",color:"#c9a84c",border:"none",padding:"10px 24px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:700}}>Close</button>
          </div>
        ):(
          <>
            <div style={{fontWeight:700,fontSize:15,color:"#1a1612",marginBottom:4}}>{sub?`📦 ${selectedTier} Box — Rs. ${selected.price.toLocaleString()}`:"🎁 Mystery Box"}</div>
            {sub&&<div style={{fontSize:11,color:"#9a8f83",marginBottom:12}}>{selected.items} · {gender} · Dates: {boxDate1}th & {boxDate2}th</div>}
            {[["name","Your Name"],["phone","WhatsApp Number"],["address","Delivery Address"]].map(([k,l])=>(
              <div key={k} style={{marginBottom:10}}>
                <label style={{fontSize:11,color:"#9a8f83",display:"block",marginBottom:3}}>{l} *</label>
                <input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:"#9a8f83",display:"block",marginBottom:3}}>Special Request (optional)</label>
              <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",resize:"none",boxSizing:"border-box"}}/>
            </div>
            <div style={{fontSize:11,color:"#9a8f83",background:"#fdfcf8",border:"1px solid #e0d8cc",borderRadius:6,padding:"8px 12px",marginBottom:14,lineHeight:1.6}}>
              💳 Payment via EasyPaisa/JazzCash after WhatsApp confirmation
            </div>
            <button onClick={subscribe} style={{width:"100%",background:"#1a1612",color:"#c9a84c",border:"none",padding:"12px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>
              Confirm Order
            </button>
            <button onClick={()=>setOpen(false)} style={{width:"100%",background:"none",border:"1px solid #e0d8cc",padding:"10px",borderRadius:6,fontSize:12,cursor:"pointer",marginTop:8,color:"#9a8f83"}}>Cancel</button>
          </>
        )}
      </div>
    </div>}
    </>
  );
}


function Intro({onEnter,siteTheme,themeName}){
  const TH=siteTheme||SITE_THEMES["Blue Beige"];
  const[tickerText,setTickerText]=useState("Gul Ahmed · Bonanza · Sapphire · Khaadi · Sana Safinaz · Alkaram · Nishat · Orient");
  useEffect(()=>{
    if(sb)sb.from("website_settings").select("value").eq("key","ticker_brands").single().then(({data})=>{if(data?.value)setTickerText(data.value);});
  },[]);
  const brands=tickerText.split("·").map(b=>b.trim()).filter(Boolean);
  const ticker=[...brands,...brands];

  // Inject exact CSS from user's design, adapted to current theme
  const css=`
    .jf-intro *{margin:0;padding:0;box-sizing:border-box}
    .jf-intro{position:fixed;inset:0;z-index:9999;font-family:'Manrope',sans-serif;overflow:hidden;background:${TH.iBg}}
    .jf-left{position:absolute;inset:0;background:${TH.iLeft};clip-path:polygon(0 0,58% 0,45% 100%,0 100%);display:flex;flex-direction:column;justify-content:center;padding:4rem 3.5rem;overflow:hidden}
    .jf-left::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.02) 40px,rgba(255,255,255,0.02) 41px)}
    .jf-left-inner{position:relative;z-index:1;max-width:360px}
    .jf-tag{font-size:0.6rem;letter-spacing:4px;text-transform:uppercase;color:${TH.iAccent};margin-bottom:2rem;display:flex;align-items:center;gap:0.8rem;animation:jfSlideR 0.9s ease both}
    .jf-tag::before{content:'';width:30px;height:1px;background:${TH.iAccent};opacity:0.5}
    .jf-brand{font-family:'Syne',sans-serif;font-size:clamp(3rem,7vw,6.5rem);font-weight:800;line-height:0.88;color:${TH.iBrand};margin-bottom:0.5rem;animation:jfSlideR 0.9s 0.1s ease both}
    .jf-brand .jf-accent{color:transparent;-webkit-text-stroke:2px ${TH.iAccent}}
    .jf-sub{font-size:0.82rem;font-weight:300;color:${TH.iBrand}44;line-height:1.8;margin:1.5rem 0 2.5rem;max-width:260px;animation:jfSlideR 0.9s 0.2s ease both}
    .jf-stats{display:flex;gap:1.5rem;margin-bottom:2.5rem;animation:jfSlideR 0.9s 0.3s ease both}
    .jf-sitem{border-left:2px solid ${TH.iAccent};padding-left:0.8rem;opacity:0.8}
    .jf-snum{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:${TH.iBrand}}
    .jf-slabel{font-size:0.55rem;letter-spacing:2px;text-transform:uppercase;color:${TH.iBrand}40}
    .jf-loc{font-size:0.55rem;letter-spacing:2px;text-transform:uppercase;color:${TH.iBrand}28;display:flex;align-items:center;gap:0.5rem;animation:jfSlideR 0.9s 0.4s ease both}
    .jf-right{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-end;padding:4rem 4rem 4rem 50%;text-align:center}
    .jf-right-inner{width:100%;max-width:360px}
    .jf-bg-text{position:absolute;font-family:'Syne',sans-serif;font-size:20vw;font-weight:800;color:${TH.iEnter};opacity:0.04;top:50%;left:42%;transform:translateY(-50%);white-space:nowrap;pointer-events:none;letter-spacing:-5px;line-height:1;user-select:none}
    .jf-eyebrow{font-size:0.6rem;letter-spacing:4px;text-transform:uppercase;color:${TH.iEyebrow};margin-bottom:2rem;animation:jfSlideL 0.9s 0.2s ease both}
    .jf-enter{font-family:'Syne',sans-serif;font-size:clamp(2.2rem,5vw,4.5rem);font-weight:800;color:${TH.iEnter};line-height:1;margin-bottom:0.3em;animation:jfSlideL 0.9s 0.3s ease both;letter-spacing:-2px}
    .jf-store{font-family:'Syne',sans-serif;font-size:clamp(2.2rem,5vw,4.5rem);font-weight:800;color:${TH.iStore};line-height:1;margin-bottom:2.5rem;animation:jfSlideL 0.9s 0.4s ease both;letter-spacing:-2px}
    .jf-btn{display:block;background:${TH.iBtn};color:${TH.iBtnText};border:${TH.iBtn==="transparent"?"1px solid "+TH.iBrand+"44":"none"};padding:1.1rem 3rem;font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;cursor:pointer;position:relative;transition:transform 0.2s,background 0.2s,box-shadow 0.2s;animation:jfSlideL 0.9s 0.5s ease both;width:100%}
    .jf-btn::after{content:'→';position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);font-size:1.2rem;transition:transform 0.2s;display:block}
    .jf-btn:hover{transform:scale(1.02);box-shadow:0 8px 32px rgba(0,0,0,.15)}
    .jf-btn:hover::after{transform:translateY(-50%) translateX(6px)}
    .jf-divider{width:80%;height:1px;background:${TH.iEnter};opacity:0.1;margin:1.5rem auto;animation:jfSlideL 0.9s 0.6s ease both}
    .jf-ticker-wrap{animation:jfSlideL 0.9s 0.7s ease both;border:1px solid ${TH.iTag};background:${TH.iTag};padding:0.7rem 0;overflow:hidden;width:100%}
    .jf-ticker-label{font-size:0.45rem;letter-spacing:3px;text-transform:uppercase;color:${TH.iEyebrow};text-align:center;margin-bottom:0.5rem}
    .jf-ticker-track{display:flex;gap:1.5rem;animation:jfTickScroll 12s linear infinite;white-space:nowrap;width:max-content}
    .jf-ticker-brand{font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${TH.iTicker}}
    .jf-ticker-sep{color:${TH.iTag};font-size:0.5rem}
    .jf-tags{position:absolute;bottom:2rem;right:0;width:55%;display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;padding:0 2rem;z-index:1;animation:jfSlideL 0.9s 0.8s ease both}
    .jf-rtag{font-size:0.5rem;letter-spacing:2px;text-transform:uppercase;color:${TH.iEyebrow};border:1px solid ${TH.iTag};padding:0.25rem 0.7rem}
    @keyframes jfSlideR{from{opacity:0;transform:translateX(-25px)}to{opacity:1;transform:translateX(0)}}
    @keyframes jfSlideL{from{opacity:0;transform:translateX(25px)}to{opacity:1;transform:translateX(0)}}
    @keyframes jfTickScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .jf-mob-header{display:none!important}
    @media(max-width:767px){
      .jf-left{display:none!important}
      .jf-right{padding:0!important;align-items:stretch!important;justify-content:flex-start!important;overflow-y:auto!important;background:${TH.iBg}!important;flex-direction:column!important}
      .jf-right-inner{max-width:100%!important;width:100%!important;text-align:center!important;padding:1.5rem 1.5rem 3rem!important;margin:0!important}
      .jf-bg-text{display:none!important}
      .jf-tags{display:none!important}
      .jf-mob-header{display:flex!important;flex-direction:column!important;align-items:center!important;width:100%!important;padding:2.5rem 1.5rem 2rem!important;margin:0!important;text-align:center!important;background:${TH.iLeft}!important}
      .jf-mob-brand{font-family:'Syne',sans-serif!important;font-size:clamp(2.4rem,12vw,3.2rem)!important;font-weight:800!important;line-height:0.9!important;color:${TH.iBrand}!important;letter-spacing:-1px!important;margin:0!important;padding:0!important}
      .jf-mob-accent{color:transparent!important;-webkit-text-stroke:2px ${TH.iAccent}!important}
      .jf-mob-meta{font-size:0.55rem!important;letter-spacing:3px!important;text-transform:uppercase!important;color:${TH.iAccent}!important;margin:0.6rem 0 0!important;padding:0!important}
      .jf-mob-stats{display:flex!important;justify-content:center!important;gap:1.2rem!important;margin:0.8rem 0 0!important;padding:0.8rem 0!important;border-top:1px solid ${TH.iAccent}40!important;border-bottom:1px solid ${TH.iAccent}40!important;width:100%!important}
      .jf-mob-sitem{text-align:center!important;margin:0!important;padding:0!important}
      .jf-mob-snum{font-family:'Syne',sans-serif!important;font-size:1.1rem!important;font-weight:800!important;color:${TH.iBrand}!important;margin:0!important;padding:0!important}
      .jf-mob-slabel{font-size:0.5rem!important;letter-spacing:2px!important;text-transform:uppercase!important;color:${TH.iBrand}60!important;margin:2px 0 0!important;padding:0!important}
      .jf-eyebrow{margin:1.5rem 0 0.8rem!important;padding:0!important}
      .jf-enter{font-size:clamp(1.8rem,9vw,2.8rem)!important;letter-spacing:-1px!important;margin:0!important;padding:0!important}
      .jf-store{font-size:clamp(1.8rem,9vw,2.8rem)!important;letter-spacing:-1px!important;margin:0 0 1.5rem!important;padding:0!important}
      .jf-btn{padding:.9rem 2rem!important;margin:0!important}
      .jf-divider{margin:1rem auto!important}
    }
  `;

  return(
    <div className="jf-intro">
      <style>{css}</style>

      {/* LEFT */}
      <div className="jf-left">
        <div className="jf-left-inner">
          <div className="jf-tag">Est. 1975 · Kunjah, Distt. Gujrat</div>
          <h1 className="jf-brand">JAMEEL<br/><span className="jf-accent">FABRICS</span></h1>
          <p className="jf-sub">Premium branded clothing for Men, Women & Kids. Trusted by families since 1975.</p>
          <div className="jf-stats">
            <div className="jf-sitem"><div className="jf-snum">50+</div><div className="jf-slabel">Yrs Trust</div></div>
            <div className="jf-sitem"><div className="jf-snum">500+</div><div className="jf-slabel">Products</div></div>
            <div className="jf-sitem"><div className="jf-snum">PK</div><div className="jf-slabel">Delivery</div></div>
          </div>
          <div className="jf-loc">📍 Kunjah, District Gujrat, Punjab</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="jf-right">
        <div className="jf-bg-text">JF</div>
        {/* Mobile-only brand header (left panel is hidden on mobile) */}
        <div className="jf-mob-header">
          <div className="jf-mob-brand">JAMEEL<br/><span className="jf-mob-accent">FABRICS</span></div>
          <div className="jf-mob-meta">Est. 1975 · Kunjah, Punjab</div>
          <div className="jf-mob-stats">
            <div className="jf-mob-sitem"><div className="jf-mob-snum">50+</div><div className="jf-mob-slabel">Yrs Trust</div></div>
            <div className="jf-mob-sitem"><div className="jf-mob-snum">500+</div><div className="jf-mob-slabel">Products</div></div>
            <div className="jf-mob-sitem"><div className="jf-mob-snum">PK</div><div className="jf-mob-slabel">Delivery</div></div>
          </div>
        </div>
        <div className="jf-right-inner">
          <div className="jf-eyebrow">Shop the full collection</div>
          <div className="jf-enter">Enter</div>
          <div className="jf-store">The Store</div>
          <button className="jf-btn" onClick={onEnter}>Shop Now</button>
          <div className="jf-divider"/>
          <div className="jf-ticker-wrap">
            <div className="jf-ticker-label">Brands we carry</div>
            <div className="jf-ticker-track">
              {ticker.map((b,i)=>(
                <span key={i} style={{display:"inline-flex",alignItems:"center",gap:"1.5rem"}}>
                  <span className="jf-ticker-brand">{b}</span>
                  <span className="jf-ticker-sep">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TAGS */}
      <div className="jf-tags">
        {["100% Authentic","50+ Brands","WhatsApp Orders","Nationwide Delivery"].map(t=>(
          <span key={t} className="jf-rtag">{t}</span>
        ))}
      </div>
    </div>
  );
}


function AuthModal({mode,onClose,onSuccess}){
  const[tab,setTab]=useState(mode||"login");
  const[email,setEmail]=useState("");const[pass,setPass]=useState("");
  const[name,setName]=useState("");const[phone,setPhone]=useState("");
  const[loading,setLoading]=useState(false);
  const I={width:"100%",border:"none",borderBottom:"1px solid #d0ccc5",padding:"11px 0",fontSize:14,outline:"none",fontFamily:"inherit",background:"transparent",transition:"border-color .2s",color:"#111"};
  const L={fontSize:9,fontWeight:700,letterSpacing:2.5,color:"#7a6e65",textTransform:"uppercase",marginBottom:5,display:"block"};
  async function login(){if(!sb){toast("Database not connected","error");return;}if(!email||!pass){toast("Email aur password daalo","error");return;}setLoading(true);const{error}=await sb.auth.signInWithPassword({email,password:pass});setLoading(false);if(error)toast("Login failed: "+error.message,"error");else{toast("Welcome! ✓","success");onSuccess();}}
  async function register(){if(!sb){toast("Database not connected","error");return;}if(!email||!pass||!name){toast("Sab fields fill karo","error");return;}if(pass.length<6){toast("Password min 6 chars","error");return;}setLoading(true);const{error}=await sb.auth.signUp({email,password:pass,options:{data:{full_name:name,phone}}});setLoading(false);if(error)toast("Register failed: "+error.message,"error");else{toast("Account created! ✓","success");onSuccess();}}
  return(<div style={{position:"fixed",inset:0,zIndex:9998,background:"rgba(0,0,0,.6)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{background:"#faf9f7",width:"100%",maxWidth:420,padding:"40px 36px",boxShadow:"0 30px 80px rgba(0,0,0,.25)"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#111",textAlign:"center",marginBottom:4}}>Welcome</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"#7a6e65",fontStyle:"italic",textAlign:"center",marginBottom:28}}>Jameel Fabrics Kunjah</div>
      <div style={{display:"flex",marginBottom:28,borderBottom:"1px solid #e8e4df"}}>
        {["login","register"].map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:600,letterSpacing:1,color:tab===t?"#111":"#9a8f83",borderBottom:tab===t?"2px solid #111":"2px solid transparent",transition:"all .2s",textTransform:"uppercase"}}>{t==="login"?"Sign In":"Register"}</button>)}
      </div>
      <div style={{display:"grid",gap:22}}>
        {tab==="register"&&<div><label style={L}>Full Name *</label><input style={I} value={name} onChange={e=>setName(e.target.value)} placeholder="Hamza Muhammadi" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#d0ccc5"}/></div>}
        <div><label style={L}>Email *</label><input style={I} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#d0ccc5"}/></div>
        <div><label style={L}>Password *</label><input style={I} type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#d0ccc5"} onKeyDown={e=>e.key==="Enter"&&(tab==="login"?login():register())}/></div>
        {tab==="register"&&<div><label style={L}>Phone</label><input style={I} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="0300-1234567" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#d0ccc5"}/></div>}
      </div>
      <button onClick={tab==="login"?login:register} disabled={loading} style={{width:"100%",marginTop:28,padding:14,background:"#111",color:"#fff",border:"none",fontFamily:"inherit",fontSize:9,fontWeight:700,letterSpacing:4,textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",opacity:loading?.6:1}}>{loading?"Please wait...":(tab==="login"?"Sign In":"Create Account")}</button>
      <button onClick={onClose} style={{width:"100%",marginTop:12,padding:10,background:"none",border:"none",color:"#7a6e65",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
    </div>
  </div>);
}

function LastSecondAddon({cart,setCart,settings}){
  const[addons,setAddons]=useState([]);
  useEffect(()=>{
    if(!sb)return;
    sb.from("products").select("id,name,price,img1,category").eq("in_stock",true).limit(50)
      .then(({data})=>{
        if(!data)return;
        const cartIds=new Set(cart.map(c=>c.id));
        const filtered=data.filter(p=>!cartIds.has(p.id));
        const shuffled=filtered.sort(()=>Math.random()-.5).slice(0,4);
        setAddons(shuffled);
      });
  },[cart.length]);
  if(!addons.length)return null;
  return(<div style={{marginBottom:12,padding:"10px 0",borderTop:"1px solid #e8e4df"}}>
    <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:"#c9a84c",textTransform:"uppercase",marginBottom:8}}>⚡ Customers Also Bought</div>
    <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
      {addons.map(p=>(
        <div key={p.id} style={{flexShrink:0,width:90,textAlign:"center"}}>
          <div style={{width:90,height:80,background:"#f0ede8",overflow:"hidden",borderRadius:4,marginBottom:4}}>
            {p.img1?<img src={p.img1} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{CAT_EMOJI[p.cat]||CAT_EMOJI[p.category]||"🛍️"}</div>}
          </div>
          <div style={{fontSize:9,fontWeight:600,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
          <div style={{fontSize:10,color:"#c9a84c",fontWeight:700,marginBottom:4}}>Rs.{Number(p.price||0).toLocaleString()}</div>
          <button onClick={()=>setCart(c=>[...c,{...p,qty:1,price:Number(p.price)}])} style={{width:"100%",padding:"4px 0",fontSize:9,fontWeight:700,background:"#111",color:"#fff",border:"none",borderRadius:3,cursor:"pointer",letterSpacing:.5}}>+ Add</button>
        </div>
      ))}
    </div>
  </div>);
}

function CartPanel({cart,setCart,wa,onClose,user,settings,gift,setGift}){
  const[code,setCode]=useState("");const[coupon,setCoupon]=useState(null);const[cL,setCL]=useState(false);
  const[custName,setCustName]=useState("");const[custCity,setCustCity]=useState("");const[custAddr,setCustAddr]=useState("");
  const sub=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const disc=coupon?(coupon.type==="percent"?Math.round(sub*coupon.value/100):coupon.value):0;
  const giftExtra=gift.enabled?(200+(['box','sheet','card'].filter(id=>gift.extras?.includes(id)).reduce((s,id)=>s+({box:200,sheet:100,card:50}[id]||0),0))):0;
  const total=Math.max(0,sub-disc)+giftExtra;
  async function applyC(){if(!code.trim()||!sb)return;setCL(true);const{data}=await sb.from("coupons").select("*").eq("code",code.toUpperCase()).eq("active",true).single();setCL(false);if(!data){toast("Invalid coupon","error");return;}if(data.expires_at&&new Date(data.expires_at)<new Date()){toast("Coupon expired!","error");return;}if(sub<(data.min_order||0)){toast("Min order Rs."+Number(data.min_order).toLocaleString()+" chahiye","error");return;}setCoupon(data);toast("Coupon applied! "+String.fromCodePoint(10003),"success");}
  async function checkout(){
    if(!cart.length)return;
    if(sb&&user){await sb.from("online_orders").insert({customer_id:user.id,customer_email:user.email,customer_name:user.user_metadata?.full_name||"",items:cart,total,coupon_code:coupon?.code||null,discount_amount:disc,gift_option:gift.enabled?gift:null,status:"pending"});if(coupon)await sb.from("coupons").update({used_count:(coupon.used_count||0)+1}).eq("id",coupon.id);}
    const sep="\u2501".repeat(20);
    // Build bill using template if available
    let msg="";
    try{
      const tplRes=settings?.bill_templates?JSON.parse(settings.bill_templates):null;
      const tpl=Array.isArray(tplRes)&&tplRes.length>0?tplRes[0]:null;
      if(tpl){
        // Use admin template
        const storeName=settings?.store_name||"JAMEEL FABRICS Kunjah";
        const addr=(settings?.addr1||"Circular Road, Kunjah")+", "+(settings?.addr2||"Distt. Gujrat");
        const ph=settings?.phone||settings?.wa_number||WA_NUM;
        const now=new Date();
        const dateStr=now.toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"});
        const billNum="JF-"+now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+String(now.getDate()).padStart(2,"0")+"-"+String(now.getHours()).padStart(2,"0")+String(now.getMinutes()).padStart(2,"0");
        const itemLines=cart.map((p,i)=>`${i+1}. *${p.name}*\n   Category: ${CAT_L[p.cat]||p.cat||""}\n   Qty: ${p.qty} × Rs.${Number(p.price).toLocaleString()} = *Rs.${(p.price*p.qty).toLocaleString()}*`).join("\n\n");
        const hdr=(tpl.header||"*{store}*\n{addr}")
          .replace("{store}",storeName).replace("{addr}",addr)
          .replace("{phone}",ph).replace("{date}",tpl.show_date?dateStr:"")
          .replace("{bill_num}",billNum);
        const ftr=(tpl.footer||"Jazakallah! Thank you for shopping 🙏");
        const sep="━━━━━━━━━━━━━━━━";
        const custLine=(custName||custCity||custAddr)?"\n\n"+sep+"\n👤 *CUSTOMER*\n"+sep+(custName?"\nNaam: "+custName:"")+(custCity?"\nShehar: "+custCity:"")+(custAddr?"\nPata: "+custAddr:""):"";
        msg=hdr+"\n\n"+sep+"\n📋 *ORDER BILL*\n"+sep+"\n🔖 Bill#: "+billNum+"\n📅 Date: "+dateStr+"\n"+sep+"\n\n"+itemLines+"\n\n"+sep;
        if(coupon)msg+="\n🎟️ Coupon: "+coupon.code+" (-Rs."+disc.toLocaleString()+")";
        msg+="\n💰 *TOTAL: Rs."+total.toLocaleString()+"*\n"+sep+custLine+"\n\n"+ftr;
      }
    }catch{}
    // Fallback to default message if no template
    if(!msg){
      msg="Assalamualaikum!\n\n*JAMEEL FABRICS Kunjah*\n\n"+"━━━━━━━━━━━━━━━━\n📋 ORDER DETAILS\n━━━━━━━━━━━━━━━━\n\n";
      msg+=cart.map(p=>{let l="• *"+p.name+"*";l+="\n   Category: "+(CAT_L[p.cat]||p.cat||"");if(p.color)l+="\n   Color: "+p.color;l+="\n   Rs."+Number(p.price).toLocaleString()+" × "+p.qty+" = *Rs."+(p.price*p.qty).toLocaleString()+"*";return l;}).join("\n\n");
      msg+="\n\n━━━━━━━━━━━━━━━━\n";
      if(coupon)msg+="🎟️ Coupon: "+coupon.code+" (-Rs."+disc.toLocaleString()+")\n";
      msg+="💰 *TOTAL: Rs."+total.toLocaleString()+"*\n━━━━━━━━━━━━━━━━";
      if(custName||custCity||custAddr){msg+="\n\n👤 *Delivery*";if(custName)msg+="\nNaam: "+custName;if(custCity)msg+="\nShehar: "+custCity;if(custAddr)msg+="\nPata: "+custAddr;}
      msg+="\n\nJazakAllah Khair! 🙏";
    }
    window.open("https://wa.me/"+(wa||WA_NUM)+"?text="+encodeURIComponent(msg),"_blank");
    setCart([]);onClose();
  }
  return(<>
    <div style={{position:"fixed",inset:0,zIndex:9990,background:"rgba(0,0,0,.45)",backdropFilter:"blur(4px)"}} onClick={onClose}/>
    <div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(420px,95vw)",background:"var(--t-card,#faf9f7)",zIndex:9991,display:"flex",flexDirection:"column",boxShadow:"-16px 0 48px rgba(0,0,0,.12)",animation:"slideR .3s ease"}}>
      <FreeShippingBar cartTotal={total} settings={{free_shipping_min:settings?.free_shipping_min,free_shipping_active:"true"}}/>
      <div style={{padding:"20px 24px",borderBottom:"1px solid #e8e4df",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700}}>Cart <span style={{color:"var(--t-muted,#7a6e65)",fontSize:14,fontWeight:400}}>({cart.reduce((s,x)=>s+x.qty,0)} items)</span></div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--t-muted,#7a6e65)"}}>X</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
        {!cart.length?(<div style={{textAlign:"center",padding:"56px 20px",color:"#8a7f76"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--t-muted,#7a6e65)",marginBottom:8}}>Cart is Empty</div><div style={{fontSize:13}}>Add beautiful pieces to your cart</div></div>):
        cart.map(item=>(
          <div key={item.id} style={{display:"flex",gap:14,marginBottom:18,paddingBottom:18,borderBottom:"1px solid #e8e4df"}}>
            <div style={{width:60,height:72,background:"#f0ede8",flexShrink:0,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>
              {(item.img1||item.photo_url)?<img src={item.img1||item.photo_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(item.icon||CAT_EMOJI[item.cat]||CAT_EMOJI[item.category]||"🛍️")}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{item.name}</div>
              <div style={{fontSize:11,color:"var(--t-muted,#7a6e65)",marginBottom:8}}>{item.color||""}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>setCart(c=>item.qty===1?c.filter(x=>x.id!==item.id):c.map(x=>x.id===item.id?{...x,qty:x.qty-1}:x))} style={{width:28,height:28,border:"1px solid #d0ccc5",borderRadius:"50%",background:"var(--t-card,#fff)",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>-</button>
                  <span style={{fontSize:13,fontWeight:600,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                  <button onClick={()=>setCart(c=>c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x))} style={{width:28,height:28,border:"1px solid #d0ccc5",borderRadius:"50%",background:"var(--t-card,#fff)",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700}}>Rs.{(item.price*item.qty).toLocaleString()}</span>
                  <button onClick={()=>setCart(c=>c.filter(x=>x.id!==item.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#c9a49a",fontSize:18}}>x</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length>0&&(
        <div style={{padding:"18px 24px",borderTop:"1px solid #e8e4df",flexShrink:0}}>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="Coupon code" style={{flex:1,border:"1px solid #d0ccc5",padding:"9px 14px",fontSize:13,outline:"none",fontFamily:"inherit",letterSpacing:1.5,fontWeight:600,background:"var(--t-card,#fff)"}}/>
            <button onClick={applyC} disabled={cL} style={{background:"#111",color:"#fff",border:"none",padding:"9px 18px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",opacity:cL?.6:1}}>{cL?"...":"Apply"}</button>
          </div>
          <div style={{marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"var(--t-muted,#7a6e65)",marginBottom:5}}><span>Subtotal</span><span>Rs.{sub.toLocaleString()}</span></div>
            {coupon&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#16a34a",marginBottom:5}}><span>Discount ({coupon.code})</span><span>-Rs.{disc.toLocaleString()}</span></div>}
            <div style={{display:"flex",justifyContent:"space-between",fontSize:17,fontWeight:700,marginTop:10,paddingTop:10,borderTop:"1px solid #e8e4df"}}><span>Total</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22}}>Rs.{total.toLocaleString()}</span></div>
            <div style={{fontSize:11,color:"#8a7f76",marginTop:5}}>Delivery charges separate (discuss on WhatsApp)</div>
          </div>
          {/* Delivery details — always visible */}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:"var(--t-muted,#7a6e65)",textTransform:"uppercase",marginBottom:6}}>Delivery Details</div>
            <div style={{display:"grid",gap:7}}>
              <input value={custName} onChange={e=>setCustName(e.target.value)} placeholder="Aapka Naam *" style={{border:"1px solid #d0ccc5",padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit",background:"var(--t-card,#fff)",borderRadius:4}}/>
              <input value={custCity} onChange={e=>setCustCity(e.target.value)} placeholder="Shehar (City) *" style={{border:"1px solid #d0ccc5",padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit",background:"var(--t-card,#fff)",borderRadius:4}}/>
              <input value={custAddr} onChange={e=>setCustAddr(e.target.value)} placeholder="Pata (Address) — optional" style={{border:"1px solid #d0ccc5",padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit",background:"var(--t-card,#fff)",borderRadius:4}}/>
              <div style={{fontSize:9,color:"#8a7f76",letterSpacing:.3}}>Yeh details WhatsApp order mein shamil hongi</div>
            </div>
          </div>
          {/* Advance payment note */}
          <div style={{background:"#fef9c3",border:"1px solid #fde68a",padding:"8px 12px",fontSize:10,color:"#92400e",marginBottom:12,lineHeight:1.6}}>
            💰 <strong>Advance Payment:</strong> Product price advance. Delivery (Pak Post) charges alag.
          </div>
          <GiftOption value={gift} onChange={setGift} prods={cart.map(i=>({id:i.id,name:i.name,sale_price:i.price}))} settings={settings}/>
          <LastSecondAddon cart={cart} setCart={setCart} settings={settings}/>
          <button onClick={checkout} style={{width:"100%",padding:15,background:"#111",color:"#fff",border:"none",fontFamily:"inherit",fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:12}} onMouseEnter={e=>e.currentTarget.style.background="#2a2520"} onMouseLeave={e=>e.currentTarget.style.background="#111"}>
            <WaSvg/> Order via WhatsApp
          </button>
        </div>
      )}
    </div>
  </>);
}

/* ═══ LOADING SKELETON ═══ */
function PCardSkeleton(){
  return(
    <div style={{background:"#fff",border:"1px solid #ede9e3",overflow:"hidden"}}>
      <div className="skeleton" style={{aspectRatio:"3/4",width:"100%"}}/>
      <div style={{padding:"14px 16px 18px"}}>
        <div className="skeleton" style={{height:8,width:"55%",marginBottom:10,borderRadius:2}}/>
        <div className="skeleton" style={{height:14,width:"90%",marginBottom:6,borderRadius:2}}/>
        <div className="skeleton" style={{height:14,width:"70%",marginBottom:12,borderRadius:2}}/>
        <div className="skeleton" style={{height:10,width:"45%",marginBottom:12,borderRadius:2}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div className="skeleton" style={{height:18,width:"38%",borderRadius:2}}/>
          <div className="skeleton" style={{width:40,height:40,borderRadius:0}}/>
        </div>
      </div>
    </div>
  );
}


function PCard({prod,onAdd,onWish,wished,idx,onOpenModal,onPriceDrop}){
  const[hov,setHov]=useState(false);const[added,setAdded]=useState(false);const[imgErr,setImgErr]=useState(false);
  const img=prod.img1||prod.photo_url||"";
  const catEmoji=prod.icon||(CAT_EMOJI[prod.cat]||CAT_EMOJI[prod.category]||"🛍️");
  const price=Number(prod.sale_price||prod.price||0);
  const old=prod.old_price?Number(prod.old_price):null;
  const lowStock=prod.display_stock_text&&(prod.display_stock_text.includes("2")||prod.display_stock_text.includes("3")||prod.display_stock_text.toLowerCase().includes("last")||prod.display_stock_text.toLowerCase().includes("sirf"));
  function handleAdd(e){e.stopPropagation();onAdd(prod);setAdded(true);setTimeout(()=>setAdded(false),1200);}
  function handleShare(e){e.stopPropagation();const txt="Yeh product dekho: *"+prod.name+"*\nRs."+price.toLocaleString()+"\n\nJameel Fabrics Kunjah\njameel-fabrics-catalogue.vercel.app";window.open("https://wa.me/?text="+encodeURIComponent(txt),"_blank");}
  return(
    <div className="rv" onClick={()=>onOpenModal&&onOpenModal(prod)} style={{background:"var(--t-card,#fff)",border:`1px solid ${hov?"var(--t-border,#b8b0a6)":"rgba(26,22,18,.07)"}`,cursor:"pointer",transition:"all .45s cubic-bezier(.16,1,.3,1)",position:"relative",overflow:"hidden",transform:hov?"translateY(-8px)":"none",boxShadow:hov?"0 20px 56px rgba(0,0,0,.1)":"0 1px 4px rgba(0,0,0,.04)"}}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#f5f2ee"}}>
        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .7s cubic-bezier(.16,1,.3,1)",transform:hov?"scale(1.1)":"scale(1)",overflow:"hidden"}}>
          {img&&!imgErr
            ?<img src={img} alt={prod.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={()=>setImgErr(true)}/>
            :<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,background:"linear-gradient(135deg,var(--t-surface,#f5f2ee) 0%,var(--t-card,#faf9f7) 100%)"}}>
               <span style={{fontSize:"clamp(44px,7vw,68px)",lineHeight:1}}>{catEmoji}</span>
               <span style={{fontSize:9,color:"var(--t-muted,#9a8f83)",letterSpacing:1.5,textTransform:"uppercase",fontWeight:600}}>{CAT_L[prod.cat]||prod.category||"Fabric"}</span>
             </div>
          }
        </div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(17,17,17,.72),transparent 55%)",opacity:hov?1:0,transition:"opacity .4s",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",paddingBottom:20,gap:8}}>
          <button onClick={e=>{e.stopPropagation();onOpenModal&&onOpenModal(prod);}} style={{background:"var(--t-card,#fff)",color:"var(--t-text,#111)",border:"none",padding:"9px 28px",fontSize:9,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",transform:hov?"translateY(0)":"translateY(16px)",transition:"transform .35s"}}>QUICK VIEW</button>
          <button onClick={handleAdd} style={{background:"transparent",color:"rgba(255,255,255,.85)",border:"1px solid rgba(255,255,255,.4)",padding:"6px 22px",fontSize:9,fontWeight:600,letterSpacing:1.5,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",transform:hov?"translateY(0)":"translateY(16px)",transition:"transform .35s .05s"}}>ADD TO CART</button>
        </div>
        {prod.badge&&<div style={{position:"absolute",top:12,left:12,background:prod.badge==="SALE"?"#b91c1c":"#111",color:"#fff",padding:"3px 10px",fontSize:7,fontWeight:800,letterSpacing:2,textTransform:"uppercase",zIndex:2}}>{prod.badge}</div>}
        <button onClick={e=>{e.stopPropagation();onWish(prod.id);}} style={{position:"absolute",top:12,right:12,zIndex:2,width:34,height:34,borderRadius:"50%",background:"rgba(250,249,247,.92)",border:"1px solid #d0ccc5",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:hov?1:0,transform:hov?"scale(1)":"scale(.6)",transition:"all .3s"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke={wished?"#b91c1c":"#9a8f83"} strokeWidth="1.5" fill={wished?"#b91c1c":"none"}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button onClick={handleShare} style={{position:"absolute",bottom:12,right:12,zIndex:2,width:30,height:30,borderRadius:"50%",background:"rgba(37,211,102,.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:hov?1:0,transform:hov?"scale(1)":"scale(.6)",transition:"all .3s .1s",color:"#fff"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        </button>
      </div>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{padding:"14px 16px 18px"}}>
        <div style={{fontSize:8,color:"var(--t-muted,#7a6e65)",letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{CAT_L[prod.cat]||prod.category||""}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"var(--t-text,#111)",marginBottom:4,lineHeight:1.3}} className="pname">{prod.name}</div>
        {prod.color&&<div style={{fontSize:11,color:"var(--t-muted,#7a6e65)",marginBottom:6}}>{prod.color}</div>}
        {prod.display_stock_text&&(
          <div style={{fontSize:10,marginBottom:7,fontWeight:lowStock?700:400,color:lowStock?"#b91c1c":"#b5aba2",fontStyle:lowStock?"normal":"italic",display:"flex",alignItems:"center",gap:4}}>
            {lowStock&&<span style={{animation:"pulse 1.2s ease infinite",display:"inline-block",width:6,height:6,borderRadius:"50%",background:"#b91c1c",flexShrink:0}}/>}
            {prod.display_stock_text}
            <FabricFeel feel={prod.feel} season={prod.season} care={prod.care}/>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:8}}>
          <div>
            {old&&<div style={{fontSize:11,color:"#c9a49a",textDecoration:"line-through",fontFamily:"'Cormorant Garamond',serif"}}>Rs.{old.toLocaleString()}</div>}
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:old?"#b91c1c":"var(--t-accent,#c9a84c)",lineHeight:1}} className="pprice">Rs.{price.toLocaleString()}</div>
          </div>
          <button onClick={handleAdd} style={{flexShrink:0,background:added?"#16a34a":"#111",color:"#fff",border:"none",width:40,height:40,cursor:"pointer",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .25s"}}>{added?"✓":"+"}</button>
        </div>
      </div>
    </div>
  );
}




/* ═══ PRODUCT MODAL ═══ */
function ProductModal({prod,onClose,onAdd,onWish,wished}){
  const[imgIdx,setImgIdx]=useState(0);
  const[selSize,setSelSize]=useState("");
  const[added,setAdded]=useState(false);
  const[alertEmail,setAlertEmail]=useState("");
  const[alertDone,setAlertDone]=useState(false);
  const[dropAlertOpen,setDropAlertOpen]=useState(false);
  const[dropWA,setDropWA]=useState("");
  const[dropDone,setDropDone]=useState(false);
  const[copied,setCopied]=useState(false);
  const[sizeGuide,setSizeGuide]=useState(false);
  const autoRef=useRef(null);
  const isOutOfStock=prod&&(prod.real_stock===0||(prod.real_stock===undefined&&prod.stock===0));

  async function subscribeAlert(){
    if(!alertEmail.trim())return;
    if(sb)await sb.from("stock_alerts").insert({product_id:prod.id,product_name:prod.name,email:alertEmail,created_at:new Date().toISOString()}).catch(()=>{});
    setAlertDone(true);
  }
  async function saveDropAlert(){
    if(!dropWA.trim())return;
    const num=dropWA.replace(/\D/g,"");
    if(sb)await sb.from("price_drop_alerts").insert({product_id:prod.id,product_name:prod.name,wa_number:num,price_at_alert:Number(prod.sale_price||prod.price||0),created_at:new Date().toISOString()}).catch(()=>{});
    const local=JSON.parse(localStorage.getItem("jf_pricedrop")||"{}");
    local[prod.id]={price:Number(prod.sale_price||prod.price||0),name:prod.name,wa:num};
    localStorage.setItem("jf_pricedrop",JSON.stringify(local));
    setDropDone(true);
  }
  function copyLink(){
    const url=window.location.origin+"?product="+prod.id;
    navigator.clipboard.writeText(url).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});
  }

  const images=[];
  for(let i=1;i<=5;i++){const v=prod["img"+i]||prod["photo_url"+(i===1?"":i)]||"";if(v)images.push(v);}
  const emojis=["👗","✨","🧵","💎","🌸"];
  const imgs=images.length>0?images:emojis.slice(0,Math.max(1,Object.values(prod).filter(v=>v&&String(v).startsWith("http")).length||1));

  useEffect(()=>{
    autoRef.current=setInterval(()=>setImgIdx(i=>(i+1)%imgs.length),2000);
    return()=>clearInterval(autoRef.current);
  },[imgs.length]);

  useEffect(()=>{
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow="";};
  },[]);

  const price=Number(prod.sale_price||prod.price||0);
  const old=prod.old_price?Number(prod.old_price):null;
  const save=old?Math.round((old-price)/old*100):0;
  const lowStock=prod.display_stock_text&&(prod.display_stock_text.toLowerCase().includes("last")||prod.display_stock_text.toLowerCase().includes("sirf")||prod.display_stock_text.includes("2")||prod.display_stock_text.includes("3"));
  const sizes=prod.sizes||[];

  function handleAdd(){onAdd(prod);setAdded(true);setTimeout(()=>setAdded(false),1200);}
  function shareWA(){const txt="Yeh product dekho: *"+prod.name+"*\nRs."+price.toLocaleString()+"\n\nJameel Fabrics Kunjah\njameel-fabrics-catalogue.vercel.app";window.open("https://wa.me/?text="+encodeURIComponent(txt),"_blank");}

  // Swipe support
  const touchStart=useRef(0);
  function onTS(e){touchStart.current=e.touches[0].clientX;}
  function onTE(e){const dx=touchStart.current-e.changedTouches[0].clientX;if(Math.abs(dx)>40){setImgIdx(i=>(i+(dx>0?1:-1)+imgs.length)%imgs.length);clearInterval(autoRef.current);}}

  const curImg=imgs[imgIdx];
  const isUrl=curImg&&(curImg.startsWith("http")||curImg.startsWith("/"));

  return(
    <div style={{position:"fixed",inset:0,zIndex:9995,background:"rgba(0,0,0,.75)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px",overflowY:"auto"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"#faf9f7",width:"100%",maxWidth:860,maxHeight:"92vh",overflowY:"auto",display:"grid",gridTemplateColumns:"1fr 1fr",position:"relative"}} className="two-col">
        {/* Close */}
        <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"#fff",border:"1px solid #e0dbd3",width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color="#111";}}>✕</button>

        {/* Left: Images */}
        <div style={{background:"#f0ede8",padding:"clamp(16px,3vw,24px)",display:"flex",flexDirection:"column",gap:10}}>
          {/* Main image */}
          <div onTouchStart={onTS} onTouchEnd={onTE} style={{aspectRatio:"3/4",background:"#e8e4df",display:"flex",alignItems:"center",justifyContent:"center",fontSize:100,position:"relative",overflow:"hidden",cursor:"pointer"}}>
            {isUrl?<img src={curImg} alt={prod.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"opacity .3s"}} onError={e=>e.target.style.display="none"}/>:<span style={{transition:"all .3s"}}>{curImg}</span>}
            {imgs.length>1&&(
              <>
                <button onClick={()=>{setImgIdx(i=>(i-1+imgs.length)%imgs.length);clearInterval(autoRef.current);}} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.85)",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
                <button onClick={()=>{setImgIdx(i=>(i+1)%imgs.length);clearInterval(autoRef.current);}} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.85)",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
              </>
            )}
            <div style={{position:"absolute",bottom:10,right:10,background:"rgba(0,0,0,.5)",color:"#fff",padding:"3px 8px",fontSize:9,borderRadius:20}}>{imgIdx+1}/{imgs.length}</div>
            <div style={{position:"absolute",bottom:10,left:10,background:"rgba(0,0,0,.4)",color:"#fff",padding:"3px 8px",fontSize:8,letterSpacing:1}}>Auto ●</div>
          </div>
          {/* Thumbnails */}
          {imgs.length>1&&(
            <div style={{display:"flex",gap:6,overflowX:"auto"}}>
              {imgs.map((img,i)=>(
                <div key={i} onClick={()=>{setImgIdx(i);clearInterval(autoRef.current);}} style={{flex:"0 0 58px",height:70,background:"#e0dbd3",border:"2px solid "+(i===imgIdx?"#111":"transparent"),cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,overflow:"hidden",transition:"border-color .2s"}}>
                  {img.startsWith("http")||img.startsWith("/")?<img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:img}
                </div>
              ))}
            </div>
          )}
          <div style={{fontSize:9,color:"#7a6e65",textAlign:"center",letterSpacing:1}}>← Swipe to change image</div>
          {/* Product Video */}
          {prod.video_url&&<div style={{marginTop:6}}>
            <div style={{fontSize:9,color:"#c9a84c",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>▶ Product Video</div>
            {prod.video_url.includes("youtube.com")||prod.video_url.includes("youtu.be")
              ?<iframe
                  src={prod.video_url.replace("watch?v=","embed/").replace("youtu.be/","www.youtube.com/embed/")}
                  style={{width:"100%",aspectRatio:"16/9",border:"none",borderRadius:4}}
                  allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                  allowFullScreen/>
              :<video src={prod.video_url} controls style={{width:"100%",borderRadius:4,maxHeight:160}} playsInline/>
            }
          </div>}
        </div>

        {/* Right: Info */}
        <div style={{padding:"clamp(16px,3vw,28px)",overflowY:"auto"}}>
          <div style={{fontSize:9,color:"#7a6e65",letterSpacing:2.5,textTransform:"uppercase",marginBottom:8}}>{CAT_L[prod.cat]||prod.category||""}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,2.5vw,24px)",fontWeight:700,color:"#111",marginBottom:6,lineHeight:1.2}}>{prod.name}</div>
          {prod.color&&<div style={{fontSize:12,color:"#7a6e65",marginBottom:14}}>{prod.color}</div>}

          {/* Price */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(24px,3vw,30px)",fontWeight:700,color:old?"#b91c1c":"#111"}}> Rs.{price.toLocaleString()}</div>
            {old&&<><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"#c9a49a",textDecoration:"line-through"}}>Rs.{old.toLocaleString()}</div><div style={{background:"#dcfce7",color:"#16a34a",padding:"3px 10px",fontSize:10,fontWeight:700,borderRadius:20}}>Save {save}%</div></>}
          </div>

          {/* Stock urgency */}
          {prod.display_stock_text&&(
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:lowStock?"#fee2e2":"#f5f2ee",color:lowStock?"#b91c1c":"#9a8f83",padding:"5px 12px",fontSize:11,fontWeight:lowStock?700:400,marginBottom:14,animation:lowStock?"pulse 1.2s ease infinite":"none"}}>
              {lowStock&&<span style={{width:6,height:6,borderRadius:"50%",background:"#b91c1c",display:"inline-block"}}/>}
              {prod.display_stock_text}
            </div>
          )}

          <div style={{height:1,background:"#e8e4df",margin:"12px 0"}}/>

          {/* Sizes */}
          {sizes.length>0&&(<>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:2,color:"#7a6e65",textTransform:"uppercase",marginBottom:8}}>Select Size</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
              {sizes.map(s=><button key={s} onClick={()=>setSelSize(s)} style={{border:"1px solid "+(selSize===s?"#111":"#d0ccc5"),padding:"6px 14px",fontSize:11,fontWeight:600,cursor:"pointer",background:selSize===s?"#111":"#fff",color:selSize===s?"#fff":"#111",transition:"all .2s",fontFamily:"inherit"}}>{s}</button>)}
            </div>
            <button onClick={()=>setSizeGuide(true)} style={{fontSize:10,color:"#c9a84c",cursor:"pointer",letterSpacing:1,marginBottom:14,background:"none",border:"none",textDecoration:"underline",padding:0,fontFamily:"inherit"}}>📏 Size Guide</button>
          </>)}
          {sizeGuide&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setSizeGuide(false)}>
            <div style={{background:"#fff",borderRadius:12,padding:24,width:"100%",maxWidth:480,maxHeight:"80vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{fontWeight:700,fontSize:15}}>📏 Size Guide</div>
                <button onClick={()=>setSizeGuide(false)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#7a6e65"}}>✕</button>
              </div>
              {prod.size_chart_img?(
                <img src={prod.size_chart_img} alt="Size Chart" style={{width:"100%",borderRadius:8}}/>
              ):(
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr style={{background:"#f5f0e8"}}>{["Size","Chest","Waist","Length","Sleeve"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",fontWeight:700,fontSize:10,letterSpacing:1,color:"#7a6e65",textTransform:"uppercase",borderBottom:"1px solid #e0d8cc"}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[["S","34\"","30\"","52\"","24\""],["M","36\"","32\"","53\"","24.5\""],["L","38\"","34\"","54\"","25\""],["XL","40\"","36\"","55\"","25.5\""],["XXL","42\"","38\"","56\"","26\""],["XXXL","44\"","40\"","57\"","26.5\""]].map(([sz,...vals])=>(
                      <tr key={sz} style={{borderBottom:"1px solid #f0ede8"}}>
                        <td style={{padding:"8px 12px",fontWeight:700}}>{sz}</td>
                        {vals.map((v,i)=><td key={i} style={{padding:"8px 12px",color:"#4a4035"}}>{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div style={{fontSize:10,color:"#9a8f83",marginTop:12,lineHeight:1.6}}>* Measurements are approximate. For stitched items, please add 1-2 inches for comfort.</div>
            </div>
          </div>}

          {/* Description */}
          {prod.note&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"#7a6e65",lineHeight:1.9,fontStyle:"italic",marginBottom:18}}>{prod.note}</div>}

          {/* Out of Stock Alert */}
          {isOutOfStock?(
            <div style={{marginBottom:14,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:14}}>
              <div style={{fontSize:12,fontWeight:700,color:"#b91c1c",marginBottom:10}}>⚠️ Out of Stock — Alert Me When Available</div>
              {alertDone?(
                <div style={{fontSize:12,color:"#16a34a",fontWeight:600}}>✓ We'll notify you when it's back!</div>
              ):(
                <div style={{display:"flex",gap:6}}>
                  <input value={alertEmail} onChange={e=>setAlertEmail(e.target.value)} placeholder="Your email address" style={{flex:1,padding:"8px 10px",border:"1px solid #fca5a5",borderRadius:6,fontSize:12,outline:"none"}}/>
                  <button onClick={subscribeAlert} style={{background:"#b91c1c",color:"#fff",border:"none",padding:"8px 14px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Alert Me</button>
                </div>
              )}
              <div style={{fontSize:10,color:"#7a6e65",marginTop:6}}>Also get notified if a discount becomes available.</div>
            </div>
          ):(
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <button onClick={handleAdd} style={{flex:1,background:added?"#16a34a":"#111",color:"#fff",border:"none",padding:14,fontSize:10,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"background .25s"}} onMouseEnter={e=>!added&&(e.currentTarget.style.background="#2a2520")} onMouseLeave={e=>!added&&(e.currentTarget.style.background="#111")}>{added?"✓ Added!":"Add to Cart"}</button>
              <button onClick={()=>onWish(prod.id)} style={{width:48,border:"1px solid "+(wished?"#b91c1c":"#d0ccc5"),background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" stroke={wished?"#b91c1c":"#9a8f83"} strokeWidth="1.5" fill={wished?"#b91c1c":"none"}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
          )}
          {/* WA Order */}
          <button onClick={()=>{onAdd(prod);onClose();}} style={{width:"100%",background:"#25D366",color:"#fff",border:"none",padding:13,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:14,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#1ea855"} onMouseLeave={e=>e.currentTarget.style.background="#25D366"}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Add to Cart & Order
          </button>
          {/* Price Drop Alert */}
          {!isOutOfStock&&(
            <div style={{marginBottom:14}}>
              {!dropDone?(
                <div>
                  <button onClick={()=>setDropAlertOpen(o=>!o)} style={{background:"none",border:"1px solid #e0d8cc",borderRadius:6,padding:"7px 14px",fontSize:11,cursor:"pointer",color:"#7a6e65",display:"flex",alignItems:"center",gap:6,fontFamily:"inherit"}}>
                    🔔 {dropAlertOpen?"Cancel":"Alert me if price drops"}
                  </button>
                  {dropAlertOpen&&(
                    <div style={{marginTop:8,display:"flex",gap:6}}>
                      <input value={dropWA} onChange={e=>setDropWA(e.target.value)} placeholder="WhatsApp number (03xxxxxxxxx)" style={{flex:1,padding:"8px 10px",border:"1px solid #d0ccc5",borderRadius:6,fontSize:12,outline:"none"}}/>
                      <button onClick={saveDropAlert} style={{background:"#111",color:"#fff",border:"none",padding:"8px 14px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Set Alert</button>
                    </div>
                  )}
                </div>
              ):(
                <div style={{fontSize:12,color:"#16a34a",fontWeight:600}}>✓ Price drop alert set! We'll contact you on WhatsApp.</div>
              )}
            </div>
          )}
          {/* Share */}
          <div style={{paddingTop:12,borderTop:"1px solid #e8e4df"}}>
            <div style={{fontSize:10,color:"#7a6e65",letterSpacing:1,marginBottom:8}}>Share this product:</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <button onClick={shareWA} style={{background:"#25D366",color:"#fff",border:"none",padding:"7px 14px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit",borderRadius:4,display:"flex",alignItems:"center",gap:5}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                WhatsApp
              </button>
              <button onClick={copyLink} style={{background:copied?"#16a34a":"#f5f0e8",color:copied?"#fff":"#4a4035",border:"1px solid #e0d8cc",padding:"7px 14px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit",borderRadius:4,transition:"all .2s"}}>
                {copied?"✓ Copied!":"🔗 Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



/* ═══ COUNTDOWN BANNER ═══ */
function CountdownBanner({settings}){
  const[time,setTime]=useState({d:0,h:0,m:0,s:0,expired:false});
  const endDate=settings.countdown_end||"";
  const title=settings.countdown_title||"🔥 Eid Special Sale";
  const subtext=settings.countdown_subtext||"Up to 30% Off — Limited Time!";
  const active=settings.countdown_active==="true";

  useEffect(()=>{
    if(!endDate||!active)return;
    function tick(){
      const diff=new Date(endDate)-new Date();
      if(diff<=0){setTime({d:0,h:0,m:0,s:0,expired:true});return;}
      setTime({
        d:Math.floor(diff/86400000),
        h:Math.floor((diff%86400000)/3600000),
        m:Math.floor((diff%3600000)/60000),
        s:Math.floor((diff%60000)/1000),
        expired:false
      });
    }
    tick();
    const t=setInterval(tick,1000);
    return()=>clearInterval(t);
  },[endDate,active]);

  if(!active||!endDate||time.expired)return null;
  const pad=n=>String(n).padStart(2,'0');

  return(
    <div style={{background:"linear-gradient(135deg,#b91c1c 0%,#dc2626 50%,#b91c1c 100%)",padding:"10px clamp(12px,3vw,24px)",display:"flex",alignItems:"center",justifyContent:"center",gap:"clamp(10px,2vw,24px)",flexWrap:"wrap",borderBottom:"1px solid rgba(0,0,0,.2)"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(12px,1.5vw,16px)",fontWeight:700,color:"#fff",letterSpacing:1}}>{title}</span>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(11px,1.3vw,14px)",color:"rgba(255,255,255,.75)",fontStyle:"italic"}}>— {subtext}</span>
      </div>
      <div style={{display:"flex",gap:"clamp(5px,1vw,8px)",alignItems:"center"}}>
        {[["d","Days"],["h","Hrs"],["m","Mins"],["s","Secs"]].map(([k,lbl],i)=>(
          <div key={k} style={{display:"flex",alignItems:"center",gap:"clamp(5px,1vw,8px)"}}>
            {i>0&&<span style={{color:"rgba(255,255,255,.5)",fontSize:20,fontWeight:300,marginBottom:14}}>:</span>}
            <div style={{textAlign:"center"}}>
              <div style={{background:"rgba(0,0,0,.3)",color:"#fff",fontFamily:"var(--t-bf,'Jost',sans-serif)",fontSize:"clamp(16px,2.5vw,22px)",fontWeight:700,padding:"5px clamp(8px,1.5vw,12px)",minWidth:"clamp(38px,5vw,48px)",textAlign:"center",letterSpacing:1,border:"1px solid rgba(255,255,255,.15)"}}>{pad(time[k])}</div>
              <div style={{fontSize:7,color:"rgba(255,255,255,.55)",textTransform:"uppercase",letterSpacing:1.5,marginTop:3}}>{lbl}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>document.getElementById("prods")?.scrollIntoView({behavior:"smooth"})} style={{background:"#fff",color:"#b91c1c",border:"none",padding:"8px clamp(14px,2vw,20px)",fontSize:9,fontWeight:800,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"var(--t-bf,'Jost',sans-serif)",transition:"all .2s",flexShrink:0}} onMouseEnter={e=>{e.currentTarget.style.background="#f5f5f5"}} onMouseLeave={e=>{e.currentTarget.style.background="#fff"}}>
        Shop Now
      </button>
    </div>
  );
}


/* ═══ REVIEWS SECTION ═══ */
/* ═══ PWA INSTALL ═══ */
function PWAInstallBtn(){
  const[prompt,setPrompt]=useState(null);
  const[shown,setShown]=useState(false);
  useEffect(()=>{
    const handler=e=>{e.preventDefault();setPrompt(e);};
    window.addEventListener("beforeinstallprompt",handler);
    return()=>window.removeEventListener("beforeinstallprompt",handler);
  },[]);
  if(!prompt||shown)return null;
  return(
    <div style={{position:"fixed",bottom:90,left:16,zIndex:800,background:"#fff",border:"1px solid #e0dbd3",padding:"12px 16px",boxShadow:"0 8px 24px rgba(0,0,0,.12)",display:"flex",alignItems:"center",gap:12,maxWidth:280,animation:"fadeUp .4s ease"}}>
      <div style={{width:36,height:36,background:"#111",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:900,color:"#fff"}}>JF</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:12,color:"#111"}}>Install App</div>
        <div style={{fontSize:10,color:"#7a6e65",marginTop:1}}>Home screen pe add karo</div>
      </div>
      <button onClick={async()=>{prompt.prompt();const{outcome}=await prompt.userChoice;if(outcome==="accepted"){setShown(true);toast("App installed! ✓","success");}}} style={{background:"#111",color:"#fff",border:"none",padding:"6px 12px",fontSize:9,fontWeight:700,letterSpacing:1,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Install</button>
      <button onClick={()=>setShown(true)} style={{background:"none",border:"none",cursor:"pointer",color:"#7a6e65",fontSize:18,lineHeight:1,padding:0}}>×</button>
    </div>
  );
}


function ReviewsSection({googleMapsUrl,googleRating}){
  const[reviews,setReviews]=useState([]);
  const[showForm,setShowForm]=useState(false);
  const[form,setForm]=useState({name:"",city:"",text:"",rating:5,photo:""});
  const[submitting,setSub]=useState(false);
  useEffect(()=>{
    if(!sb)return;
    sb.from("reviews").select("*").eq("approved",true).order("created_at",{ascending:false}).limit(20).then(({data})=>setReviews(data||[]));
  },[]);

  async function submit(){
    if(!form.name||!form.text)return alert("Please fill name and review.");
    setSub(true);
    const payload={name:form.name,city:form.city,text:form.text,rating:form.rating,photo:form.photo||null,approved:false};
    if(sb)await sb.from("reviews").insert(payload);
    setSub(false);setShowForm(false);
    setForm({name:"",city:"",text:"",rating:5,photo:""});
    alert("Thank you! Your review will appear after approval.");
  }

  const stars=(n)=>Array.from({length:5},(_,i)=><span key={i} style={{color:i<n?"#c9a84c":"#ddd",fontSize:14}}>★</span>);

  return(
    <section style={{padding:"60px 20px",background:"#fdfcf8",borderTop:"1px solid #f0ece0"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:11,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:8}}>Customer Reviews</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(26px,4vw,38px)",fontWeight:600,color:"#1a1612",margin:0}}>What Our Customers Say</h2>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20,marginBottom:36}}>
          {reviews.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",color:"#7a6e65",padding:"40px 0",fontSize:14}}>No reviews yet. Be the first!</div>}
          {reviews.map((r,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:12,padding:"20px 18px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #f0ece0"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                {r.photo
                  ?<img src={r.photo} alt="" style={{width:42,height:42,borderRadius:"50%",objectFit:"cover",border:"2px solid #c9a84c"}}/>
                  :<div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#c9a84c,#a07830)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:16}}>{r.name?r.name[0].toUpperCase():"?"}</div>
                }
                <div>
                  <div style={{fontWeight:600,fontSize:13,color:"#1a1612"}}>{r.name}</div>
                  {r.city&&<div style={{fontSize:11,color:"#7a6e65"}}>📍 {r.city}</div>}
                </div>
                <div style={{marginLeft:"auto"}}>{stars(r.rating||5)}</div>
              </div>
              <p style={{fontSize:13,color:"#4a4035",lineHeight:1.6,margin:0}}>"{r.text}"</p>
            </div>
          ))}
        </div>

        {googleMapsUrl&&(
          <div style={{textAlign:"center",marginBottom:24}}>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:10,background:"#fff",border:"1px solid #e0d8cc",borderRadius:10,padding:"10px 20px",textDecoration:"none",boxShadow:"0 2px 8px rgba(0,0,0,.07)"}}>
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#1a1612"}}>See Our Reviews on Google</div>
                {googleRating&&<div style={{display:"flex",alignItems:"center",gap:3,marginTop:1}}><span style={{color:"#f59e0b",fontSize:12}}>{"★".repeat(Math.round(Number(googleRating||5)))}</span><span style={{fontSize:11,color:"#6b7280"}}>{googleRating}/5</span></div>}
              </div>
            </a>
          </div>
        )}
        <div style={{textAlign:"center"}}>
          {!showForm
            ?<button onClick={()=>setShowForm(true)} style={{background:"#1a1612",color:"#fff",border:"none",padding:"12px 28px",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",letterSpacing:1}}>Write a Review</button>
            :<div style={{background:"#fff",border:"1px solid #e8dfc0",borderRadius:12,padding:"24px 20px",maxWidth:480,margin:"0 auto",textAlign:"left"}}>
              <div style={{fontWeight:600,fontSize:15,color:"#1a1612",marginBottom:16}}>Share Your Experience</div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,color:"#7a6e65",display:"block",marginBottom:4}}>Your Name *</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Hamza Muhammadi" style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,color:"#7a6e65",display:"block",marginBottom:4}}>City</label>
                <input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="e.g. Lahore" style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,color:"#7a6e65",display:"block",marginBottom:4}}>Rating</label>
                <div style={{display:"flex",gap:6}}>
                  {[1,2,3,4,5].map(n=>(
                    <button key={n} onClick={()=>setForm({...form,rating:n})} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:n<=form.rating?"#c9a84c":"#ddd",padding:"2px"}}>★</button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,color:"#7a6e65",display:"block",marginBottom:4}}>Your Review *</label>
                <textarea value={form.text} onChange={e=>setForm({...form,text:e.target.value})} placeholder="Share your experience with our products..." rows={3} style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:12,color:"#7a6e65",display:"block",marginBottom:4}}>📸 Add Photo (optional)</label>
                <input type="file" accept="image/*" capture="environment" onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setForm(p=>({...p,photo:ev.target.result}));r.readAsDataURL(f);}} style={{fontSize:12,width:"100%"}}/>
                {form.photo&&<img src={form.photo} alt="" style={{width:60,height:60,objectFit:"cover",borderRadius:6,marginTop:6,border:"1px solid #e0d8cc"}}/>}
              </div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={submit} disabled={submitting} style={{flex:1,background:"#1a1612",color:"#fff",border:"none",padding:"10px",borderRadius:6,fontSize:13,cursor:"pointer"}}>{submitting?"Submitting...":"Submit Review"}</button>
                <button onClick={()=>setShowForm(false)} style={{background:"none",border:"1px solid #e0d8cc",padding:"10px 16px",borderRadius:6,fontSize:13,cursor:"pointer",color:"#7a6e65"}}>Cancel</button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  );
}


function FeatureIcon({code}){
  const icons={
    "EX":<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    "PQ":<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    "WA":<svg width="22" height="22" viewBox="0 0 24 24" fill="#c9a84c"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9 9 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    "FD":<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    "EE":<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><polyline points="1,4 1,10 7,10"/><polyline points="23,20 23,14 17,14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>,
    "TS":<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  };
  return icons[code]||<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/></svg>;
}


function BrowsingBadge(){
  const[count,setCount]=useState(()=>Math.floor(Math.random()*100)+50);
  useEffect(()=>{
    const t=setInterval(()=>{
      setCount(c=>{
        const change=Math.random()>.5?1:-1;
        return Math.max(5,Math.min(28,c+change));
      });
    },4000);
    return()=>clearInterval(t);
  },[]);
  return(
    <div style={{position:"fixed",bottom:92,left:16,zIndex:699,background:"rgba(17,17,17,.88)",backdropFilter:"blur(8px)",color:"#fff",padding:"7px 12px",borderRadius:20,fontSize:11,display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 16px rgba(0,0,0,.25)",pointerEvents:"none"}}>
      <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"pulse 1.5s ease infinite",flexShrink:0}}/>
      <span style={{fontWeight:600}}>{count}</span>
      <span style={{color:"rgba(255,255,255,.6)",fontSize:10}}>people browsing now</span>
    </div>
  );
}



// ── Brand Section per Category ───────────────────────────────
function BrandBar({prods,cat,brandFilter,setBrandFilter}){
  if(cat==="All"||cat==="HOT"||cat==="NEW")return null;
  const catProds=prods.filter(p=>p.cat===cat||p.category===cat);
  const brands=["All",...new Set(catProds.map(p=>p.brand).filter(Boolean))];
  const limits=CAT_BRAND_LIMITS[cat]||{};
  if(brands.length<=2)return null;
  return(
    <div style={{padding:"10px clamp(16px,4vw,60px)",background:"#fff",borderBottom:"1px solid #f0ece0",overflowX:"auto"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:10,color:"#7a6e65",letterSpacing:2,textTransform:"uppercase",flexShrink:0}}>Brand:</span>
        {brands.map(b=>(
          <button key={b} onClick={()=>setBrandFilter(b)} style={{
            padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",
            border:`1px solid ${brandFilter===b?"#1a1612":"#e0d8cc"}`,
            background:brandFilter===b?"#1a1612":"transparent",
            color:brandFilter===b?"#fff":"#6b5f52",
            whiteSpace:"nowrap",transition:"all .15s"
          }}>{b==="All"?"All Brands":b}</button>
        ))}
        {limits.max&&<span style={{fontSize:10,color:"#c9a84c",marginLeft:"auto",flexShrink:0}}>{catProds.filter(p=>brandFilter==="All"||p.brand===brandFilter).length} products</span>}
      </div>
    </div>
  );
}



// ══════════════════════════════════════════════════════════════
// MYSTERY BOX + GIFT SENDER — Premium All Collection Section
// ══════════════════════════════════════════════════════════════
function MysteryGiftSection({settings,user,onAuth,products}){
  const[subOpen,setSubOpen]=useState(false);
  const[giftOpen,setGiftOpen]=useState(false);
  const[selectedTier,setSelectedTier]=useState("Gold");
  const[gender,setGender]=useState("Women");
  const[subDone,setSubDone]=useState(false);
  const[giftDone,setGiftDone]=useState(false);
  const[subForm,setSubForm]=useState({name:"",phone:"",address:"",notes:""});
  const[giftForm,setGiftForm]=useState({product_id:"",product_name:"",to_name:"",to_phone:"",to_address:"",message:"",extras:[]});

  const boxDate1=settings?.sub_date1||"12";
  const boxDate2=settings?.sub_date2||"28";

  const TIERS=[
    {id:"Silver",icon:"🥈",color:"#94a3b8",price:Number(settings?.sub_silver_price||1500),items:settings?.sub_silver_items||"1-2 Fabrics",benefit:settings?.sub_silver_benefit||"Starter Selection"},
    {id:"Gold",icon:"🥇",color:"#c9a84c",price:Number(settings?.sub_gold_price||2500),items:settings?.sub_gold_items||"2-3 Fabrics",benefit:settings?.sub_gold_benefit||"Premium Brands",popular:true},
    {id:"Platinum",icon:"💠",color:"#818cf8",price:Number(settings?.sub_platinum_price||4000),items:settings?.sub_platinum_items||"3-4 Fabrics",benefit:settings?.sub_platinum_benefit||"Exclusive Selection"},
    {id:"Diamond",icon:"💎",color:"#38bdf8",price:Number(settings?.sub_diamond_price||6000),items:settings?.sub_diamond_items||"4-5 Fabrics",benefit:settings?.sub_diamond_benefit||"Ultra Luxury"},
  ];
  const tier=TIERS.find(t=>t.id===selectedTier)||TIERS[1];

  const GIFT_EXTRAS=[{id:"box",l:"Gift Box",p:200},{id:"sheet",l:"Wrapping Sheet",p:100},{id:"card",l:"Greeting Card",p:50}];
  const giftExtra=GIFT_EXTRAS.filter(e=>giftForm.extras.includes(e.id)).reduce((s,e)=>s+e.p,0)+200;

  async function subscribeTier(){
    if(!subForm.name||!subForm.phone)return alert("Name and phone required");
    if(sb&&user)await sb.from("subscriptions").insert({user_id:user.id,name:subForm.name,phone:subForm.phone,address:subForm.address,tier:selectedTier,gender,notes:subForm.notes,status:"pending",created_at:new Date().toISOString()});
    setSubDone(true);
  }

  async function sendGift(){
    if(!giftForm.to_name||!giftForm.to_address)return alert("Recipient name and address required");
    if(sb)await sb.from("online_orders").insert({customer_id:user?.id||null,customer_name:user?.user_metadata?.full_name||"Gift Sender",items:[{name:giftForm.product_name||"Gift",qty:1,price:0}],gift_option:giftForm,total:giftExtra,status:"pending",created_at:new Date().toISOString()});
    setGiftDone(true);
  }

  return(
    <section id="mystery-section" style={{padding:"clamp(48px,6vw,80px) clamp(16px,4vw,60px)",background:"linear-gradient(180deg,#faf9f7 0%,#f5f0e8 100%)"}}>
      <div style={{textAlign:"center",marginBottom:"clamp(32px,5vw,56px)"}}>
        <div style={{fontSize:10,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",marginBottom:8}}>All Collection</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:600,color:"#1a1612",lineHeight:1.2}}>Mystery Box & Gift Sender</h2>
        <p style={{fontSize:13,color:"#9a8f83",marginTop:8,maxWidth:480,margin:"8px auto 0"}}>Surprise monthly fabrics or send a beautiful gift to someone special</p>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:0,maxWidth:860,margin:"0 auto",borderRadius:16,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,.08)",border:"1px solid rgba(201,168,76,.12)"}}>

        {/* ── TOP: Mystery Box ──────────────────────── */}
        <div style={{background:"linear-gradient(160deg,#1a1612 0%,#2c1f0a 100%)",padding:"clamp(28px,4vw,44px)",position:"relative",overflow:"hidden",borderBottom:"1px solid rgba(201,168,76,.15)"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(201,168,76,.12) 1px,transparent 1px)",backgroundSize:"22px 22px",opacity:.5,pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:14,right:14,background:"#c9a84c",color:"#000",fontSize:8,fontWeight:800,letterSpacing:2,padding:"3px 10px",textTransform:"uppercase"}}>Mystery</div>
          <div style={{position:"relative",zIndex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(24px,4vw,48px)",alignItems:"center"}} className="two-col">
            <div>
              <div style={{fontSize:"clamp(2.5rem,5vw,3.5rem)",marginBottom:10}}>🎁</div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,3vw,30px)",fontWeight:600,color:"#f5efe0",lineHeight:1.2,marginBottom:10}}>Monthly<br/>Fabric Box</h3>
              <p style={{fontSize:12,color:"rgba(201,168,76,.65)",lineHeight:1.7,marginBottom:20}}>Curated surprise fabrics — dispatched every <strong style={{color:"#c9a84c"}}>{boxDate1}th & {boxDate2}th</strong></p>
              <button onClick={()=>user?setSubOpen(true):onAuth("login")} style={{background:"#c9a84c",color:"#0a0907",border:"none",padding:"12px 28px",fontSize:11,fontWeight:800,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:4,transition:"all .2s"}}>
                Subscribe Now →
              </button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {TIERS.map(t=>(
                <div key={t.id} onClick={()=>setSelectedTier(t.id)} style={{padding:"12px",border:`1px solid ${selectedTier===t.id?t.color:"rgba(255,255,255,.08)"}`,background:selectedTier===t.id?"rgba(255,255,255,.06)":"transparent",cursor:"pointer",borderRadius:8,transition:"all .2s"}}>
                  {t.popular&&<div style={{fontSize:7,color:"#c9a84c",fontWeight:700,letterSpacing:1,marginBottom:2}}>POPULAR</div>}
                  <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}><span style={{fontSize:16}}>{t.icon}</span><span style={{fontWeight:700,fontSize:11,color:"#fff"}}>{t.id}</span></div>
                  <div style={{fontSize:13,fontWeight:800,color:t.color}}>Rs.{t.price.toLocaleString()}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.35)",marginTop:2}}>{t.items}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Gift Sender ──────────────────────── */}
        <div style={{background:"#fdfcf8",padding:"clamp(28px,4vw,44px)",position:"relative"}}>
          <div style={{position:"absolute",top:14,right:14,background:"#f5f0e8",color:"#c9a84c",fontSize:8,fontWeight:800,letterSpacing:2,padding:"3px 10px",textTransform:"uppercase",border:"1px solid rgba(201,168,76,.2)"}}>Gift</div>

          <div style={{fontSize:"clamp(2.5rem,5vw,3.5rem)",marginBottom:10}}>💝</div>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,3vw,30px)",fontWeight:600,color:"#1a1612",lineHeight:1.2,marginBottom:10}}>Gift a Suit<br/>to Someone Special</h3>
          <p style={{fontSize:12,color:"#9a8f83",lineHeight:1.7,marginBottom:20}}>Select a fabric, add gift extras, and we'll deliver it beautifully wrapped with your personal message.</p>

          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
            {[["🎁","Gift Box","+ Rs. 200",200],["🎀","Wrapping Sheet","+ Rs. 100",100],["💌","Greeting Card","+ Rs. 50",50]].map(([icon,name,price,val])=>(
              <label key={name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",border:`1px solid ${giftForm.extras.includes(name.toLowerCase().split(" ")[0])?"#c9a84c":"#e0d8cc"}`,borderRadius:6,cursor:"pointer",background:giftForm.extras.includes(name.toLowerCase().split(" ")[0])?"rgba(201,168,76,.04)":"transparent",transition:"all .15s"}}>
                <input type="checkbox" checked={giftForm.extras.includes(name.toLowerCase().split(" ")[0])} onChange={e=>{const k=name.toLowerCase().split(" ")[0];setGiftForm(f=>({...f,extras:e.target.checked?[...f.extras,k]:f.extras.filter(x=>x!==k)}));}} style={{accentColor:"#c9a84c",width:15,height:15}}/>
                <span style={{fontSize:16}}>{icon}</span>
                <span style={{flex:1,fontSize:12,fontWeight:500,color:"#1a1612"}}>{name}</span>
                <span style={{fontSize:11,color:"#c9a84c",fontWeight:700}}>{price}</span>
              </label>
            ))}
          </div>

          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,color:"#9a8f83",marginBottom:4}}>Gift Extra Total</div>
            <div style={{fontSize:20,fontWeight:800,color:"#c9a84c",fontFamily:"'Cormorant Garamond',serif"}}>Rs. {giftExtra.toLocaleString()}</div>
            <div style={{fontSize:10,color:"#b5aba2"}}>+ product price</div>
          </div>

          <div style={{display:"grid",gap:8}}>
            <button onClick={()=>user?setGiftOpen(true):onAuth("login")} style={{width:"100%",background:"#1a1612",color:"#c9a84c",border:"none",padding:"12px",fontSize:11,fontWeight:800,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:4,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#c9a84c";e.currentTarget.style.color="#000";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#1a1612";e.currentTarget.style.color="#c9a84c";}}>
              Send a Gift →
            </button>
            <button onClick={()=>{
              const budgets=[{min:0,label:"Under Rs.1,500",cat:"lawn"},{min:1500,label:"Rs.1,500–3,000",cat:"khaddar"},{min:3000,label:"Rs.3,000–5,000",cat:"lawn"},{min:5000,label:"Rs.5,000+",cat:"suiting"}];
              const msg=`🎁 *Gift a Suit from Jameel Fabrics!*\n\nKisi kho khoobsurat suit gift karo 💝\n\nHumary paas har budget mein options hain:\n\n🥈 Budget Gifts: Rs.1,000–1,500\n🥇 Standard Gifts: Rs.2,000–3,500\n💠 Premium Gifts: Rs.4,000–6,000\n💎 Luxury Gifts: Rs.7,000+\n\nSabhi options mein beautiful gift wrapping available hai!\n\n👉 Order karo: wa.me/${WA_NUM}\n\nJazakAllah Khair! 🙏`;
              window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`,"_blank");
            }} style={{width:"100%",background:"transparent",color:"#c9a84c",border:"1px solid rgba(201,168,76,.4)",padding:"10px",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",borderRadius:4}}>
              📲 Share Gift Catalogue
            </button>
          </div>
        </div>

      </div>

      {/* ── Subscribe Modal ──────────────────────────── */}
      {subOpen&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setSubOpen(false)}>
        <div style={{background:"#fff",borderRadius:12,padding:24,width:"100%",maxWidth:400,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
          {subDone?(<div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{fontSize:48,marginBottom:12}}>📦</div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:6}}>Subscribed!</div>
            <div style={{fontSize:12,color:"#9a8f83",lineHeight:1.6}}>We'll contact you on WhatsApp. Next dispatch: {boxDate1}th or {boxDate2}th.</div>
            <button onClick={()=>{setSubOpen(false);setSubDone(false);}} style={{marginTop:16,background:"#1a1612",color:"#c9a84c",border:"none",padding:"10px 24px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:700}}>Done</button>
          </div>):(
            <>
              <div style={{fontWeight:700,fontSize:15,color:"#1a1612",marginBottom:4}}>📦 {selectedTier} Box — Rs.{tier.price.toLocaleString()}</div>
              <div style={{fontSize:11,color:"#9a8f83",marginBottom:16}}>{tier.items} · {gender} · {boxDate1}th & {boxDate2}th</div>
              {[["name","Your Name"],["phone","WhatsApp Number"],["address","Delivery Address"]].map(([k,l])=>(
                <div key={k} style={{marginBottom:10}}>
                  <label style={{fontSize:11,color:"#9a8f83",display:"block",marginBottom:3}}>{l}</label>
                  <input value={subForm[k]} onChange={e=>setSubForm({...subForm,[k]:e.target.value})} style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                </div>
              ))}
              <button onClick={subscribeTier} style={{width:"100%",background:"#1a1612",color:"#c9a84c",border:"none",padding:"12px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>Confirm</button>
              <button onClick={()=>setSubOpen(false)} style={{width:"100%",background:"none",border:"1px solid #e0d8cc",padding:"10px",borderRadius:6,cursor:"pointer",marginTop:8,color:"#9a8f83",fontSize:12}}>Cancel</button>
            </>
          )}
        </div>
      </div>}

      {/* ── Gift Modal ───────────────────────────────── */}
      {giftOpen&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setGiftOpen(false)}>
        <div style={{background:"#fff",borderRadius:12,padding:24,width:"100%",maxWidth:420,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
          {giftDone?(<div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{fontSize:48,marginBottom:12}}>💝</div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:6}}>Gift Order Placed!</div>
            <div style={{fontSize:12,color:"#9a8f83"}}>We'll contact you on WhatsApp to confirm product & payment.</div>
            <button onClick={()=>{setGiftOpen(false);setGiftDone(false);}} style={{marginTop:16,background:"#1a1612",color:"#c9a84c",border:"none",padding:"10px 24px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:700}}>Done</button>
          </div>):(
            <>
              <div style={{fontWeight:700,fontSize:15,color:"#1a1612",marginBottom:16}}>💝 Send a Gift</div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:11,color:"#9a8f83",display:"block",marginBottom:3}}>Select Product</label>
                <select value={giftForm.product_id} onChange={e=>{const o=e.target.options[e.target.selectedIndex];setGiftForm({...giftForm,product_id:e.target.value,product_name:o.text});}} style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:12,outline:"none",background:"#fff"}}>
                  <option value="">— Choose product —</option>
                  {(products||[]).slice(0,50).map(p=><option key={p.id} value={p.id}>{p.name} — Rs.{Number(p.sale_price||p.price||0).toLocaleString()}</option>)}
                </select>
              </div>
              {[["to_name","Recipient Name *"],["to_phone","Recipient Phone"],["to_address","Recipient Address *"]].map(([k,l])=>(
                <div key={k} style={{marginBottom:10}}>
                  <label style={{fontSize:11,color:"#9a8f83",display:"block",marginBottom:3}}>{l}</label>
                  <input value={giftForm[k]||""} onChange={e=>setGiftForm({...giftForm,[k]:e.target.value})} style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                </div>
              ))}
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,color:"#9a8f83",display:"block",marginBottom:3}}>Gift Card Message</label>
                <textarea value={giftForm.message||""} onChange={e=>setGiftForm({...giftForm,message:e.target.value})} rows={2} placeholder="Write a personal message..." style={{width:"100%",padding:"9px 12px",border:"1px solid #e0d8cc",borderRadius:6,fontSize:12,outline:"none",resize:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{fontSize:12,color:"#c9a84c",fontWeight:700,marginBottom:12}}>Gift Total: Rs.{giftExtra.toLocaleString()} + product price</div>
              <button onClick={sendGift} style={{width:"100%",background:"#1a1612",color:"#c9a84c",border:"none",padding:"12px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>Place Gift Order</button>
              <button onClick={()=>setGiftOpen(false)} style={{width:"100%",background:"none",border:"1px solid #e0d8cc",padding:"10px",borderRadius:6,cursor:"pointer",marginTop:8,color:"#9a8f83",fontSize:12}}>Cancel</button>
            </>
          )}
        </div>
      </div>}

      {/* ── Mystery Box Policies ── */}
      <div style={{maxWidth:960,margin:"48px auto 0",padding:"32px 0",borderTop:"1px solid rgba(201,168,76,.15)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:10,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:6}}>Policies</div>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,2.5vw,26px)",fontWeight:600,color:"#1a1612",margin:0}}>Mystery Box & Gift Policies</h3>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {[
            {ic:"📦",t:"Box Contents",d:"Each mystery box contains carefully curated fabrics from top brands. Exact items are not disclosed to maintain the surprise element."},
            {ic:"🔄",t:"No Returns",d:"Mystery boxes are non-refundable and non-exchangeable due to their curated nature. Quality is guaranteed."},
            {ic:"🚚",t:"Delivery",d:"Boxes are dispatched on the 12th and 28th of every month. Delivery via Pak Post, TCS, or Leopard Courier."},
            {ic:"💰",t:"Payment",d:"Full advance payment required. Cash on delivery not available for mystery boxes. EasyPaisa/JazzCash/Bank transfer accepted."},
            {ic:"🎁",t:"Gift Policy",d:"Gifts are wrapped and dispatched within 2-3 business days. Gift message is included as-is. No returns on gifted items."},
            {ic:"⭐",t:"Quality Promise",d:"All fabrics are sourced from authentic brands. If a wrong item is sent, we will replace it at no cost."},
          ].map(p=>(
            <div key={p.t} style={{background:"#fdfcf8",border:"1px solid rgba(201,168,76,.12)",borderRadius:10,padding:18}}>
              <div style={{fontSize:22,marginBottom:8}}>{p.ic}</div>
              <div style={{fontWeight:700,fontSize:13,color:"#1a1612",marginBottom:6}}>{p.t}</div>
              <div style={{fontSize:12,color:"#9a8f83",lineHeight:1.6}}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ── Brand Grouped Product Grid ────────────────────────────────
function BrandGroupedGrid({filtered,cat,brandFilter,addToCart,toggleWish,wish,openModal,savePriceDrop}){
  if(cat==="All"||brandFilter!=="All"){
    return filtered.map((prod,i)=><PCard key={prod.id} prod={prod} idx={i} onAdd={addToCart} onWish={toggleWish} wished={wish.has(prod.id)} onOpenModal={openModal} onPriceDrop={savePriceDrop}/>);
  }
  const brands=[...new Set(filtered.map(p=>p.brand).filter(Boolean))];
  const noBrand=filtered.filter(p=>!p.brand);
  if(brands.length<2){
    return filtered.map((prod,i)=><PCard key={prod.id} prod={prod} idx={i} onAdd={addToCart} onWish={toggleWish} wished={wish.has(prod.id)} onOpenModal={openModal} onPriceDrop={savePriceDrop}/>);
  }
  return(
    <>
      {brands.map(brand=>(
        <React.Fragment key={brand}>
          <div className="jf-brand-header" style={{gridColumn:"1/-1",paddingBottom:8,borderBottom:"2px solid var(--t-border,#e8dfc0)",marginBottom:4,marginTop:8,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(15px,2vw,20px)",fontWeight:600,color:"var(--t-text,#1a1612)",letterSpacing:1}}>{brand}</span>
            <span style={{fontSize:9,color:"#c9a84c",letterSpacing:2,textTransform:"uppercase",background:"rgba(201,168,76,.08)",padding:"2px 8px",borderRadius:10}}>{filtered.filter(p=>p.brand===brand).length} items</span>
          </div>
          {filtered.filter(p=>p.brand===brand).map((prod,i)=>
            <PCard key={prod.id} prod={prod} idx={i} onAdd={addToCart} onWish={toggleWish} wished={wish.has(prod.id)} onOpenModal={openModal} onPriceDrop={savePriceDrop}/>
          )}
        </React.Fragment>
      ))}
      {noBrand.map((prod,i)=><PCard key={prod.id} prod={prod} idx={i} onAdd={addToCart} onWish={toggleWish} wished={wish.has(prod.id)} onOpenModal={openModal} onPriceDrop={savePriceDrop}/>)}
    </>
  );
}


function ThemeStyle({TH}){
  useEffect(()=>{
    if(!TH)return;
    try{
      // Load font
      if(TH.fontImport){
        let lnk=document.getElementById("jf-font");
        if(!lnk){lnk=document.createElement("link");lnk.id="jf-font";lnk.rel="stylesheet";document.head.appendChild(lnk);}
        lnk.href=TH.fontImport;
      }
      // Build safe CSS (no quotes inside template)
      const bg=TH.bg||"#faf9f7";
      const card=TH.card||"#fff";
      const surface=TH.surface||"#f5f0e8";
      const text=TH.text||"#1a1612";
      const muted=TH.muted||"#9a8f83";
      const border=TH.border||"#e0d8c0";
      const accent=TH.accent||"#c9a84c";
      const dark=TH.dark||"#1a1612";
      const dt=TH.darkText||"#f5efe0";
      const hf=(TH.headingFont||"'Playfair Display',serif").replace(/"/g,"");
      const bf=(TH.bodyFont||"'Jost',sans-serif").replace(/"/g,"");
      // Inject style
      let el=document.getElementById("jf-ts");
      if(!el){el=document.createElement("style");el.id="jf-ts";document.head.appendChild(el);}
      el.textContent=`
        :root{--t-bg:${bg};--t-card:${card};--t-surface:${surface};--t-text:${text};--t-muted:${muted};--t-border:${border};--t-accent:${accent};--t-dark:${dark};--t-dt:${dt};--t-hf:${hf};--t-bf:${bf}}
        body{background:${bg}!important;color:${text}!important;font-family:${bf}!important}
        *{transition:background-color .3s,color .3s,border-color .3s}
        .jf-nav-bar,.jf-cat-bar,.jf-filter-row,.jf-brand-bar{background:${card}!important;border-color:${border}!important}
        .jf-prods-section{background:${bg}!important}
        .rv{background:${card}!important;border-color:${border}!important}
        .rv .pname{color:${text}!important}
        .rv .pbrand{color:${muted}!important}
        .rv .pprice{color:${accent}!important}
        .rv .pmuted{color:${muted}!important}
        footer,.jf-footer{background:${dark}!important}
        footer *,.jf-footer *{color:${dt}!important}
        .jf-side-menu{background:${card}!important}
        .jf-section-alt{background:${surface}!important}
        input,textarea,select{background:${surface}!important;color:${text}!important;border-color:${border}!important}
        .jf-cat-active{color:${text}!important;border-bottom-color:${text}!important}
        .jf-tag-pill{background:${surface}!important;color:${muted}!important;border-color:${border}!important}
        .jf-hero-section{background:${bg}!important}
        section{background:${bg}}
        ${TH.customCSS||""}
      `;
      // Also set body directly
      document.body.style.background=bg;
      document.body.style.color=text;
    }catch(e){console.warn("ThemeStyle error:",e);}
  },[TH]);
  return null;
}


function NewsletterBar(){
  const[email,setEmail]=useState("");
  const[done,setDone]=useState(false);
  const[loading,setLoading]=useState(false);
  async function sub(){
    if(!email||!email.includes("@"))return toast("Valid email daalo","error");
    setLoading(true);
    if(sb){
      const{error}=await sb.from("newsletter_subscribers").upsert({email:email.toLowerCase(),subscribed_at:new Date().toISOString()},{onConflict:"email"});
      if(error){
        // fallback — try the subscriptions table if that's what exists
        await sb.from("subscriptions").insert({email:email.toLowerCase(),subscribed_at:new Date().toISOString(),type:"newsletter"}).catch(()=>{});
      }
    }
    setLoading(false);setDone(true);setEmail("");
    toast("Subscribed! Exclusive deals milenge 🎉","success");
  }
  if(done)return(
    <div style={{maxWidth:1200,margin:"0 auto 32px",textAlign:"center",padding:"20px",borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:28}}>
      <div style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>✅ Subscribed! Exclusive deals milenge 🎉</div>
    </div>
  );
  return(
    <div style={{maxWidth:1200,margin:"0 auto 32px",borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:28}}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:9,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:4}}>Newsletter</div>
        <div style={{fontSize:14,fontWeight:600,color:"rgba(255,255,255,.7)"}}>Exclusive deals aur new arrivals pehle paao</div>
      </div>
      <div style={{display:"flex",gap:0,maxWidth:400,margin:"0 auto"}}>
        <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sub()} placeholder="apna@email.com" type="email" style={{flex:1,padding:"10px 14px",border:"1px solid rgba(201,168,76,.3)",borderRight:"none",background:"rgba(255,255,255,.05)",color:"#fff",fontSize:12,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={sub} disabled={loading} style={{padding:"10px 20px",background:"#c9a84c",color:"#000",border:"none",fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:1,whiteSpace:"nowrap",opacity:loading?.6:1}}>{loading?"...":"Subscribe"}</button>
      </div>
    </div>
  );
}

function Store({user,onLogout,onAccount,onAdmin,siteTheme,themeName}){
  const TH=siteTheme||SITE_THEMES["Blue Beige"];
  // Apply ALL theme CSS variables on every render
  useEffect(()=>{
    const r=document.documentElement.style;
    // Set both old (--jf-) and new (--t-) vars for compatibility
    const vars={
      "--jf-bg":TH.bg,"--jf-card":TH.card,"--jf-surface":TH.surface,
      "--jf-text":TH.text,"--jf-muted":TH.muted,"--jf-border":TH.border,
      "--jf-accent":TH.accent,"--jf-dark":TH.dark,"--jf-dark-text":TH.darkText,
      "--t-bg":TH.bg,"--t-card":TH.card,"--t-surface":TH.surface,
      "--t-text":TH.text,"--t-muted":TH.muted,"--t-border":TH.border,
      "--t-accent":TH.accent,"--t-dark":TH.dark,"--t-dt":TH.darkText,
      "--t-hf":(TH.headingFont||"'Playfair Display',serif").replace(/"/g,""),
      "--t-bf":(TH.bodyFont||"'Jost',sans-serif").replace(/"/g,""),
    };
    Object.entries(vars).forEach(([k,v])=>r.setProperty(k,v));
    document.body.style.background=TH.bg;
    document.body.style.color=TH.text;
  },[TH]);
  const settings=useSettings();
  // V2 design: read localStorage immediately (no async wait), then sync with Supabase
  const[v2active,setV2active]=useState(()=>{try{return localStorage.getItem("jf_v2")==="true";}catch{return false;}});
  useEffect(()=>{if(settings.design_v2!==undefined)setV2active(settings.design_v2==="true");},[settings.design_v2]);
  useEffect(()=>{const fn=e=>setV2active(e.detail===true||e.detail==="true");window.addEventListener("jf-v2-change",fn);return()=>window.removeEventListener("jf-v2-change",fn);},[]);
  const[prods,setProds]=useState([]);
  const[cat,setCat]=useState("All");
  const[cart,setCart]=useState([]);
  const[wish,setWish]=useState(new Set());
  const[cartOpen,setCartOpen]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[expandedCat,setExpandedCat]=useState(null);
  const[brandsData,setBrandsData]=useState({});
  useEffect(()=>{
    if(!sb)return;
    sb.from("website_settings").select("value").eq("key","brands_by_cat").single()
      .then(({data})=>{if(data?.value)try{setBrandsData(JSON.parse(data.value));}catch{}});
  },[]);
  const[authModal,setAuthModal]=useState(null);
  const[search,setSearch]=useState("");
  const[heroIdx,setHeroIdx]=useState(0);
  const[priceRange,setPriceRange]=useState([0,15000]);
  const[sortBy,setSortBy]=useState("new");
  const[brandFilter,setBrandFilter]=useState("All");
  const[zoomImg,setZoomImg]=useState(null);
  const[gift,setGift]=useState({enabled:false});
  const[abandonTimer,setAbandonTimer]=useState(null);
  const[priceDrop,setPriceDrop]=useState({});
  const[vipUnlocked,setVipUnlocked]=useState(false);
  const[abandonPopup,setAbandonPopup]=useState(false);

  const[modalProd,setModalProd]=useState(null);
  const[recentlyViewed,setRecentlyViewed]=useState(()=>{try{return JSON.parse(localStorage.getItem("jf_rv")||"[]");}catch{return [];}});
  const[cdTime,setCdTime]=useState(null);
  const[showTop,setShowTop]=useState(false);

  const searchRef=useRef(null);
  const mobSearchRef=useRef(null);
  const[mobSearchOpen,setMobSearchOpen]=useState(false);
  useReveal();
  const heroLines=["Exclusive Collections","Premium Pakistani Fabric","Handpicked Quality","Timeless Elegance","Limited Edition Pieces"];
  useEffect(()=>{const t=setInterval(()=>setHeroIdx(i=>(i+1)%heroLines.length),3000);return()=>clearInterval(t);},[]);
  // Countdown timer
  useEffect(()=>{
    function tick(){
      const endStr=settings.sale_end_date;
      if(!endStr||settings.show_countdown!=="true"){setCdTime(null);return;}
      const diff=new Date(endStr)-Date.now();
      if(diff<=0){setCdTime(null);return;}
      const pad=n=>String(Math.floor(n)).padStart(2,"0");
      setCdTime({d:pad(diff/86400000),h:pad((diff%86400000)/3600000),m:pad((diff%3600000)/60000),s:pad((diff%60000)/1000)});
    }
    tick();
    const t=setInterval(tick,1000);
    return()=>clearInterval(t);
  },[settings]);
  useEffect(()=>{if(!sb)return;sb.from("products").select("*").eq("website_status","approved").eq("active",true).order("created_at",{ascending:false}).then(({data})=>setProds(data||[]));const ch=sb.channel("shop_p").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{sb.from("products").select("*").eq("website_status","approved").eq("active",true).order("created_at",{ascending:false}).then(({data})=>setProds(data||[]));}).subscribe();return()=>sb.removeChannel(ch);},[]);
  useEffect(()=>{if(!sb||!user)return;sb.from("wishlists").select("product_id").eq("customer_id",user.id).then(({data})=>{if(data)setWish(new Set(data.map(x=>x.product_id)));});},[user]);
  // VIP unlock check
  useEffect(()=>{
    if(!sb||!user)return;
    sb.from("vip_customers").select("vip_unlocked,total_purchase").eq("customer_id",user.id).single()
      .then(({data})=>{if(data?.vip_unlocked)setVipUnlocked(true);})
      .catch(()=>{
        sb.from("online_orders").select("total").eq("customer_id",user.id)
          .then(({data})=>{const sum=(data||[]).reduce((a,o)=>a+Number(o.total||0),0);if(sum>=10000)setVipUnlocked(true);});
      });
  },[user]);
  // Abandoned cart recovery
  useEffect(()=>{
    if(cart.length===0){clearTimeout(abandonTimer);return;}
    clearTimeout(abandonTimer);
    const t=setTimeout(()=>{if(cart.length>0)setAbandonPopup(true);},3600000);
    setAbandonTimer(t);
    return()=>clearTimeout(t);
  },[cart]);
  useEffect(()=>{document.body.style.overflow=menuOpen?"hidden":"";return()=>{document.body.style.overflow="";};},[menuOpen]);
  // Back to top
  useEffect(()=>{
    const fn=()=>setShowTop(window.scrollY>400);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const aRef=useRef(0),aTimer=useRef(null);
  function adminTrigger(){aRef.current++;clearTimeout(aTimer.current);aTimer.current=setTimeout(()=>aRef.current=0,2000);if(aRef.current>=5){aRef.current=0;onAdmin();}}
  const allBrands=["All",...new Set(prods.map(p=>p.brand).filter(Boolean))];
  const filtered=prods.filter(p=>{
    const cOk=cat==="All"||(p.cat===cat||p.category===cat);
    const sOk=!search||(p.name?.toLowerCase().includes(search.toLowerCase())||p.color?.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase())||p.category?.toLowerCase().includes(search.toLowerCase()));
    const price=Number(p.sale_price||p.price||0);
    const prOk=price>=priceRange[0]&&price<=priceRange[1];
    const brOk=brandFilter==="All"||p.brand===brandFilter;
    return cOk&&sOk&&prOk&&brOk;
  }).sort((a,b)=>{
    if(sortBy==="price_asc")return(a.sale_price||a.price||0)-(b.sale_price||b.price||0);
    if(sortBy==="price_desc")return(b.sale_price||b.price||0)-(a.sale_price||a.price||0);
    if(sortBy==="name")return(a.name||"").localeCompare(b.name||"");
    return new Date(b.created_at||0)-new Date(a.created_at||0); // newest
  });
  const maxPrice=Number(settings?.price_max||Math.max(15000,...(prods||[]).map(p=>Number(p.sale_price||p.price||0))));
  const cartCount=cart.reduce((s,x)=>s+x.qty,0);
  const wa=settings.wa_number||WA_NUM;
  const ann=(settings.announcement||"New Arrivals|Exclusive Designs|Fast Delivery|Book on WhatsApp").split("|");
  function openModal(prod){
    setModalProd(prod);
    // Save to recently viewed
    setRecentlyViewed(prev=>{
      const filtered=prev.filter(p=>p.id!==prod.id);
      const updated=[prod,...filtered].slice(0,6);
      try{localStorage.setItem("jf_rv",JSON.stringify(updated));}catch{}
      return updated;
    });
  }

  function addToCart(prod){
    setCart(c=>{const ex=c.find(x=>x.id===prod.id);if(ex)return c.map(x=>x.id===prod.id?{...x,qty:x.qty+1}:x);return[...c,{...prod,qty:1,price:Number(prod.sale_price||prod.price||0)}];});
    toast("Added: "+prod.name,"success");
    // Cart abandon reminder — 15 min
    if(abandonTimer)clearTimeout(abandonTimer);
    const t=setTimeout(()=>{
      const wa=settings?.wa_number||WA_NUM;
      const msg=encodeURIComponent("Assalam! You left items in your cart at Jameel Fabrics. Complete your order: "+window.location.href);
      // Show notification instead of redirecting
      if(Notification.permission==="granted"){new Notification("Don't forget your cart! 🛍️",{body:"Complete your Jameel Fabrics order",icon:"/logo192.png"});}
    },15*60*1000);
    setAbandonTimer(t);
  }
  function savePriceDrop(prod){
    const saved=JSON.parse(localStorage.getItem("jf_pricedrop")||"{}");
    saved[prod.id]={price:Number(prod.sale_price||prod.price||0),name:prod.name,wa:settings?.wa_number||WA_NUM};
    localStorage.setItem("jf_pricedrop",JSON.stringify(saved));
    toast("Open product to set WhatsApp alert 🔔","info");
  }
  async function toggleWish(id){if(!user){setAuthModal("login");toast("Login karke wishlist save karo");return;}const has=wish.has(id);if(has){setWish(w=>{const n=new Set(w);n.delete(id);return n;});if(sb)await sb.from("wishlists").delete().eq("customer_id",user.id).eq("product_id",id);}else{setWish(w=>new Set([...w,id]));if(sb)await sb.from("wishlists").insert({customer_id:user.id,product_id:id});}}

  return(<div style={{background:`${TH.bg}`,minHeight:"100vh",fontFamily:"var(--t-bf,'Jost',sans-serif)"}}>
    <ThemeStyle TH={TH}/>
    <ImageZoom src={zoomImg} onClose={()=>setZoomImg(null)}/>
    {settings.show_ai_suggester!=="false"&&<AIOutfitSuggester prods={prods} onFilter={setCat}/>}
    {/* Countdown Banner - above announcement */}
        {/* Announcement */}
    <div style={{background:"#111",height:34,display:"flex",alignItems:"center",overflow:"hidden"}}>
      <div style={{display:"flex",animation:"annScroll 32s linear infinite",whiteSpace:"nowrap"}}>
        {[...ann,...ann].map((a,i)=><span key={i} style={{padding:"0 48px",fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.75)",textTransform:"uppercase"}}>{"✦ "+a.trim()}</span>)}
      </div>
    </div>
    {/* Countdown banner */}
    <CountdownBanner settings={settings}/>
    {/* NAV */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${TH.card}f5`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${TH.border}`,height:64,display:"flex",alignItems:"center",padding:"0 clamp(14px,3vw,52px)",gap:12,boxShadow:"0 1px 16px rgba(0,0,0,.06)"}}>
      <button onClick={()=>{setCat("All");window.scrollTo({top:0,behavior:"smooth"});}} style={{cursor:"pointer",flexShrink:1,minWidth:0,background:"none",border:"none",textAlign:"left",marginRight:"auto",padding:0,overflow:"hidden"}}>
        <div style={{fontFamily:"'Jost',sans-serif",fontSize:"clamp(9px,2.6vw,14px)",fontWeight:700,letterSpacing:"clamp(.4px,.18vw,1.8px)",color:`${TH.text}`,lineHeight:1.15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{settings.store_name||"JAMEEL FABRICS"}</div>
        <div style={{fontSize:"5px",letterSpacing:".6px",color:`${TH.accent}`,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",lineHeight:1,fontWeight:500,whiteSpace:"nowrap",marginTop:"1px"}}>KUNJAH · PUNJAB</div>
      </button>
      <div className="search-bar hide-mob" style={{display:"flex",alignItems:"center",gap:8,background:"var(--t-surface)",border:"1px solid var(--t-border)",padding:"7px 14px",flex:1,maxWidth:200}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9a8f83" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input ref={searchRef} type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{background:"none",border:"none",outline:"none",fontSize:12,color:"var(--t-text)",width:"100%",fontFamily:"inherit"}}/>
        {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--t-muted)",fontSize:16,padding:0}}>x</button>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:2,flexShrink:0}}>
        {/* Mobile search icon */}
        <button className="show-mob" onClick={()=>{setMobSearchOpen(o=>!o);setTimeout(()=>mobSearchRef.current?.focus(),80);}} style={{background:"none",border:"none",cursor:"pointer",width:40,height:40,display:"none",alignItems:"center",justifyContent:"center",color:`${TH.muted}`,borderRadius:4,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background=TH.surface} onMouseLeave={e=>e.currentTarget.style.background="none"}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        {/* Account icon */}
        <button onClick={()=>user?onAccount():setAuthModal("login")} style={{background:"none",border:"none",cursor:"pointer",width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",color:`${TH.muted}`,borderRadius:4,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background=TH.surface} onMouseLeave={e=>e.currentTarget.style.background="none"}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        {/* Wishlist heart icon — always visible */}
        <button onClick={()=>user?onAccount():setAuthModal("login")} style={{background:"none",border:"none",cursor:"pointer",width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,transition:"background .2s",position:"relative",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.background=TH.surface} onMouseLeave={e=>e.currentTarget.style.background="none"}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wish.size>0?"#e53e3e":"none"} stroke={wish.size>0?"#e53e3e":`${TH.muted}`} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {wish.size>0&&<span style={{position:"absolute",top:4,right:4,background:"#e53e3e",color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:7,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>{wish.size}</span>}
        </button>
        {/* Cart — full text on desktop, icon+badge on mobile */}
        <button onClick={()=>setCartOpen(true)} style={{background:`${TH.dark}`,color:`${TH.darkText}`,border:"none",padding:"9px 14px",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"inherit",display:"flex",alignItems:"center",gap:7,cursor:"pointer",transition:"background .2s",whiteSpace:"nowrap",flexShrink:0,position:"relative"}} onMouseEnter={e=>e.currentTarget.style.background=TH.accent} onMouseLeave={e=>e.currentTarget.style.background=TH.dark}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span className="hide-mob">CART ({cartCount})</span>
          {cartCount>0&&<span className="show-mob" style={{background:"#e53e3e",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:8,fontWeight:700,alignItems:"center",justifyContent:"center",lineHeight:1}}>{cartCount}</span>}
        </button>
        {/* Hamburger */}
        <button onClick={()=>setMenuOpen(true)} style={{background:"none",border:"none",cursor:"pointer",width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:5,flexShrink:0,borderRadius:4,transition:"background .2s",marginLeft:2}} onMouseEnter={e=>e.currentTarget.style.background=TH.surface} onMouseLeave={e=>e.currentTarget.style.background="none"}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><rect y="0" width="18" height="2" rx="1" fill={TH.text}/><rect y="6" width="12" height="2" rx="1" fill={TH.text}/><rect y="12" width="18" height="2" rx="1" fill={TH.text}/></svg>
        </button>
      </div>
    </nav>
    {/* MOBILE SEARCH BAR */}
    {mobSearchOpen&&(
      <div style={{background:"var(--t-card)",borderBottom:`1px solid var(--t-border)`,padding:"10px clamp(14px,3vw,24px)",display:"flex",gap:8,alignItems:"center",position:"sticky",top:64,zIndex:99,boxShadow:"0 4px 12px rgba(0,0,0,.06)",animation:"fadeUp .2s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"var(--t-surface)",border:`1px solid var(--t-border)`,padding:"9px 14px",flex:1,borderRadius:4}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8f83" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input ref={mobSearchRef} type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Koi bhi product dhundho..." style={{background:"none",border:"none",outline:"none",fontSize:14,color:"var(--t-text)",width:"100%",fontFamily:"inherit"}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--t-muted)",fontSize:18,padding:0,lineHeight:1}}>×</button>}
        </div>
        <button onClick={()=>{setMobSearchOpen(false);if(!search)setSearch("");}} style={{background:"none",border:"none",cursor:"pointer",color:"var(--t-muted)",fontSize:13,fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0,padding:"0 4px"}}>Cancel</button>
      </div>
    )}
    {/* STICKY FREE SHIPPING PROGRESS BAR — shows when cart has items */}
    {(()=>{
      const min=Number(settings?.free_shipping_min||2000);
      const active=settings?.free_shipping_active!=="false";
      const cartSub=cart.reduce((s,x)=>s+x.price*x.qty,0);
      if(!active||cartSub===0)return null;
      const pct=Math.min(100,Math.round(cartSub/min*100));
      const remaining=Math.max(0,min-cartSub);
      const done=remaining<=0;
      return(
        <div style={{position:"sticky",top:mobSearchOpen?114:64,zIndex:98,background:done?"#16a34a":"linear-gradient(90deg,#b91c1c,#dc2626)",height:32,overflow:"hidden",cursor:"pointer"}} onClick={()=>setCartOpen(true)}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:pct+"%",background:done?"rgba(255,255,255,.2)":"rgba(255,255,255,.15)",transition:"width .5s ease",borderRight:done?"none":"2px solid rgba(255,255,255,.3)"}}/>
          <div style={{position:"relative",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,letterSpacing:.5,color:"#fff",padding:"0 12px",textAlign:"center",zIndex:1}}>
            {done
              ?<>🚚 Free Shipping Unlock! ✓</>
              :<>🚚 Rs.{remaining.toLocaleString()} aur dalo — Free Shipping paao! ({pct}%)</>
            }
          </div>
        </div>
      );
    })()}
    {/* SIDE MENU */}
    {menuOpen&&(<>
      <div style={{position:"fixed",inset:0,zIndex:998,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)"}} onClick={()=>setMenuOpen(false)}/>
      <div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(320px,88vw)",zIndex:999,background:"var(--t-bg)",display:"flex",flexDirection:"column",boxShadow:"-16px 0 48px rgba(0,0,0,.14)",animation:"slideR .3s cubic-bezier(.77,0,.18,1)"}}>
        <div style={{padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #e8e4df",flexShrink:0}}>
          <div><div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:15,fontWeight:700,color:"var(--t-text)"}}>JAMEEL FABRICS</div><div style={{fontSize:9,color:"var(--t-muted)",letterSpacing:2,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>Kunjah · Punjab</div></div>
          <button onClick={()=>setMenuOpen(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"var(--t-muted)"}}>x</button>
        </div>
        <div style={{flex:1,overflowY:"auto",overscrollBehavior:"contain"}}>
          <>
            {/* Navigate */}
            <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t-muted)",padding:"12px 16px 4px"}}>Navigate</div>
            <button onClick={()=>{setCat("All");setMenuOpen(false);window.scrollTo({top:0,behavior:"smooth"});}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left",borderRadius:6,transition:"background .15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
              <span style={{fontSize:13,color:"var(--t-text)",fontWeight:500}}>Home</span>
            </button>

            {/* Categories */}
            <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t-muted)",padding:"12px 16px 4px",marginTop:4}}>Categories</div>
            {[
              {code:"WU",label:"Women Unstitch",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>},
              {code:"WS",label:"Women Stitch",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>},
              {code:"RS",label:"Reshmi Suiting",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>},
              {code:"AB",label:"Abayas",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="2"/><path d="M12 7c-2 0-6 1-6 5v3h12v-3c0-4-4-5-6-5z"/><path d="M6 15v4h12v-4"/></svg>},
              {code:"MP",label:"Mens Plain",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>},
              {code:"ME",label:"Mens Embroidery",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3c-1 0-3 1-3 3s2 3 3 3 3-1 3-3-2-3-3-3z"/><path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2"/></svg>},
              {code:"KU",label:"Kids Unstitch",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M8 14l-2 7h12l-2-7"/></svg>},
              {code:"BS",label:"Bedsheets",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>},
              {code:"BL",label:"Blankets",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>},
              {code:"OT",label:"Others",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>},
            ].map(({code,label,icon})=>{
              const catBrands=brandsData[code]||[];
              const isExpanded=expandedCat===code;
              return(
                <div key={code}>
                  <button
                    onClick={()=>{
                      if(catBrands.length>0){
                        setExpandedCat(isExpanded?null:code);
                      }else{
                        setCat(code);setMenuOpen(false);
                        document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});
                      }
                    }}
                    style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",background:cat===code?"#f5f0e8":"none",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left",borderRadius:6,transition:"background .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>{e.currentTarget.style.background=cat===code?"#f5f0e8":"none";}}>
                    <span style={{color:"var(--t-accent)",flexShrink:0}}>{icon}</span>
                    <span style={{fontSize:13,color:"var(--t-text)",fontWeight:cat===code?600:400,flex:1}}>{label}</span>
                    {catBrands.length>0&&<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9a8f83" strokeWidth="1.5" style={{transition:"transform .2s",transform:isExpanded?"rotate(180deg)":"rotate(0deg)"}}><path d="M2 4l4 4 4-4"/></svg>}
                  </button>
                  {isExpanded&&catBrands.length>0&&(
                    <div style={{paddingLeft:44,paddingBottom:4}}>
                      <button onClick={()=>{setCat(code);setBrandFilter("All");setMenuOpen(false);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}} style={{display:"block",width:"100%",padding:"7px 12px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left",fontSize:12,color:"var(--t-muted)",borderRadius:4}} onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                        All Brands
                      </button>
                      {catBrands.map(b=>(
                        <button key={b} onClick={()=>{setCat(code);setBrandFilter(b);setMenuOpen(false);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}} style={{display:"block",width:"100%",padding:"7px 12px",background:brandFilter===b&&cat===code?"#f0ede8":"none",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left",fontSize:12,color:"var(--t-muted)",borderRadius:4,fontWeight:brandFilter===b&&cat===code?600:400}} onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>e.currentTarget.style.background=brandFilter===b&&cat===code?"#f0ede8":"none"}>
                          · {b}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Account */}
            <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t-muted)",padding:"12px 16px 4px",marginTop:4}}>Account</div>
            {user?(<>
              <button onClick={()=>{onAccount();setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span style={{fontSize:13,color:"var(--t-text)"}}>My Account</span>
              </button>
              <button onClick={()=>{onLogout();setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a8f83" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span style={{fontSize:13,color:"var(--t-muted)"}}>Logout</span>
              </button>
            </>):(
              <button onClick={()=>{setAuthModal("login");setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10,17 15,12 10,7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                <span style={{fontSize:13,color:"var(--t-text)"}}>Login / Register</span>
              </button>
            )}

            {/* Info */}
            <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t-muted)",padding:"12px 16px 4px",marginTop:4}}>Info</div>
            {[
              {label:"Visit Our Store",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,fn:()=>{setMenuOpen(false);document.getElementById("store-map")?.scrollIntoView({behavior:"smooth"});}},
              {label:"Mystery Box",icon:<span style={{fontSize:16}}>🎁</span>,fn:()=>{setMenuOpen(false);document.getElementById("mystery-section")?.scrollIntoView({behavior:"smooth"});}},
              {label:"Gift Sender",icon:<span style={{fontSize:16}}>💝</span>,fn:()=>{setMenuOpen(false);document.getElementById("mystery-section")?.scrollIntoView({behavior:"smooth"});}},
              {label:"Our Policies",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,fn:()=>{setMenuOpen(false);document.getElementById("policies")?.scrollIntoView({behavior:"smooth"});}},
              {label:"WhatsApp Us",icon:<svg width="18" height="18" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L0 24l6.291-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.74-.516-5.29-1.41l-.38-.225-3.738.894.952-3.62-.248-.394A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fill="#25D366"/></svg>,fn:()=>{const msg=settings?.wa_greeting||"Assalam! I am interested in your fabrics.";window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(msg),"_blank");setMenuOpen(false);}},
            ].map(({label,icon,fn})=>(
              <button key={label} onClick={fn} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <span style={{color:"var(--t-accent)",flexShrink:0}}>{icon}</span>
                <span style={{fontSize:13,color:"var(--t-text)"}}>{label}</span>
              </button>
            ))}
          </>
        </div>
      </div>    </>)}
    {/* EID COUNTDOWN */}
    <EidCountdown settings={settings}/>
    
      {/* HERO BANNER - Admin Uploaded */}
      {settings?.hero_banner_url&&settings?.hero_banner_show==="true"&&(
        <div style={{maxWidth:"100%",overflow:"hidden",position:"relative"}}>
          <img src={settings.hero_banner_url} alt={settings.hero_banner_caption||"Special Offer"} style={{width:"100%",maxHeight:"420px",objectFit:"cover",display:"block"}}/>
          {settings.hero_banner_caption&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(0,0,0,.5),transparent)",padding:"20px 30px",color:"#fff",fontSize:"clamp(16px,2.5vw,24px)",fontFamily:"'Cormorant Garamond',serif",fontWeight:600}}>{settings.hero_banner_caption}</div>}
        </div>
      )}
      {/* HERO — Full width, admin banner image or text */}
    <section className="jf-hero-section" style={{position:"relative",overflow:"hidden",minHeight:"clamp(420px,70vh,700px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      {/* Background: banner image or grid pattern */}
      {settings.hero_banner_url
        ?<>
          <img src={settings.hero_banner_url} alt="Banner" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}} onError={e=>e.target.style.display="none"}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,.72) 0%,rgba(0,0,0,.35) 60%,rgba(0,0,0,.1) 100%)"}}/>
        </>
        :<>
          <div style={{position:"absolute",inset:0,background:"var(--t-bg)"}}/>
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(var(--t-border,#e8e4df) 1px,transparent 1px),linear-gradient(90deg,var(--t-border,#e8e4df) 1px,transparent 1px)",backgroundSize:"52px 52px",opacity:.4,pointerEvents:"none"}}/>
        </>
      }
      {/* Content */}
      <div style={{position:"relative",zIndex:2,width:"100%",maxWidth:1300,padding:"clamp(48px,8vw,100px) clamp(20px,6vw,80px)",display:"flex",alignItems:"center",gap:"clamp(32px,5vw,72px)"}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,animation:"fadeUp .8s ease .1s both"}}>
          <div style={{width:28,height:1,background:"#c9a84c"}}/>
          <div style={{fontSize:9,letterSpacing:4,color:settings.hero_banner_url?"rgba(255,255,255,.8)":"var(--t-accent)",textTransform:"uppercase",fontWeight:600}}>{settings.hlabel||"Winter Collection 2026"}</div>
        </div>
        <h1 style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(38px,7vw,88px)",fontWeight:900,lineHeight:.9,color:settings.hero_banner_url?"#fff":"var(--t-text)",letterSpacing:"clamp(1px,.8vw,5px)",animation:"fadeUp .8s ease .2s both",marginBottom:12}}>
          {settings.store_name||"JAMEEL FABRICS"}
        </h1>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:"italic",color:settings.hero_banner_url?"rgba(255,255,255,.7)":"var(--t-muted)",fontSize:"clamp(18px,2.8vw,32px)",letterSpacing:"clamp(4px,1.5vw,14px)",marginBottom:14,animation:"fadeUp .8s ease .28s both"}}>
          Kunjah · Punjab
        </div>
        <div style={{height:"clamp(20px,2.2vw,28px)",overflow:"hidden",marginBottom:20,animation:"fadeUp .8s ease .35s both"}}>
          <div key={heroIdx} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(13px,1.5vw,18px)",color:settings.hero_banner_url?"rgba(255,255,255,.65)":"var(--t-muted)",fontStyle:"italic",letterSpacing:2,animation:"textSlide 3s ease both"}}>{heroLines[heroIdx]}</div>
        </div>
        <div style={{width:44,height:1,background:"#c9a84c",marginBottom:20,animation:"fadeUp .6s ease .5s both"}}/>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(13px,1.4vw,17px)",color:settings.hero_banner_url?"rgba(255,255,255,.7)":"var(--t-muted)",lineHeight:1.9,marginBottom:28,animation:"fadeUp .8s ease .55s both",maxWidth:520}}>{settings.about||"Premium branded fabrics for Men, Women & Kids — Est. 1975."}</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",animation:"fadeUp .8s ease .65s both"}}>
          <button onClick={()=>document.getElementById("prods")?.scrollIntoView({behavior:"smooth"})} style={{background:"#c9a84c",color:"#111",border:"none",padding:"13px 36px",fontSize:9,fontWeight:700,letterSpacing:4,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all .35s"}} onMouseEnter={e=>{e.currentTarget.style.background="#b8963e";}} onMouseLeave={e=>{e.currentTarget.style.background="#c9a84c";}}>View Collection</button>
          <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"transparent",color:settings.hero_banner_url?"#fff":"var(--t-text)",border:`1px solid ${settings.hero_banner_url?"rgba(255,255,255,.5)":"var(--t-border)"}`,padding:"13px 28px",fontSize:9,fontWeight:700,letterSpacing:4,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all .35s",display:"flex",alignItems:"center",gap:8}} onMouseEnter={e=>{e.currentTarget.style.background=settings.hero_banner_url?"rgba(255,255,255,.15)":"var(--t-surface)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
              <WaSvg/> WhatsApp
            </button>
          </a>
        </div>
        {/* Stats row */}
        <div style={{display:"flex",gap:clamp=>clamp,flexWrap:"wrap",marginTop:28,paddingTop:20,borderTop:`1px solid ${settings.hero_banner_url?"rgba(255,255,255,.15)":"var(--t-border)"}`,animation:"fadeUp .8s ease .75s both"}}>
          {[["500+","Customers"],["50+","Brands"],["Est. 1975","Trusted"],["PK","Delivery"]].map(([n,l])=>(
            <div key={l} style={{marginRight:24,marginBottom:8}}>
              <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(16px,2vw,22px)",fontWeight:700,color:settings.hero_banner_url?"#c9a84c":"var(--t-text)",lineHeight:1}}>{n}</div>
              <div style={{fontSize:8,color:settings.hero_banner_url?"rgba(255,255,255,.5)":"var(--t-muted)",letterSpacing:1.5,textTransform:"uppercase",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>{/* end left text col */}
      {/* Right: first featured product — desktop only */}
      {(()=>{
        const fp=(prods||[]).find(p=>p.featured&&p.active!==false&&(p.img1||p.photo_url));
        if(!fp)return null;
        const fpImg=fp.img1||fp.photo_url;
        const fpPrice=Number(fp.sale_price||fp.price||0);
        return(
          <div className="hide-mob" style={{flexShrink:0,width:"clamp(200px,22vw,280px)",cursor:"pointer"}} onClick={()=>openModal(fp)}>
            <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",borderRadius:4,boxShadow:"0 24px 64px rgba(0,0,0,.45)"}}>
              <img src={fpImg} alt={fp.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 55%)"}}/>
              {fp.badge&&<div style={{position:"absolute",top:10,left:10,background:fp.badge==="SALE"?"#b91c1c":"#111",color:"#fff",padding:"3px 9px",fontSize:8,fontWeight:800,letterSpacing:2}}>{fp.badge}</div>}
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"14px 16px"}}>
                <div style={{fontSize:9,color:"rgba(255,255,255,.6)",letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{CAT_L[fp.cat]||fp.category||""}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.3,marginBottom:6}}>{fp.name}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#c9a84c"}}>Rs.{fpPrice.toLocaleString()}</div>
              </div>
            </div>
            <div style={{marginTop:10,textAlign:"center",fontSize:9,color:settings.hero_banner_url?"rgba(255,255,255,.5)":"var(--t-muted)",letterSpacing:2,textTransform:"uppercase"}}>⭐ Featured Pick</div>
          </div>
        );
      })()}
      </div>{/* end flex row */}
      <div onClick={adminTrigger} onTouchEnd={adminTrigger} style={{position:"absolute",bottom:0,left:0,width:50,height:50,opacity:0,cursor:"default",zIndex:10}}/>
    </section>
    {/* CATEGORY BAR */}
    <div style={{background:"var(--t-card)",borderTop:"1px solid var(--t-border)",borderBottom:"1px solid var(--t-border)",position:"sticky",top:0,zIndex:99,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none"}}>
      <div className="cat-bar-inner" style={{display:"flex",justifyContent:"center",minWidth:"max-content",margin:"0 auto",padding:"0 clamp(8px,2vw,24px)"}}>
        {CATS.map(([c,lbl])=>(
          <button key={c} onClick={()=>{setCat(c);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}}
            style={{padding:"13px clamp(10px,2vw,22px)",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:cat===c?TH.accent:TH.muted,borderBottom:cat===c?`2px solid ${TH.accent}`:"2px solid transparent",transition:"all .2s",whiteSpace:"nowrap",flexShrink:0,position:"relative"}}>
            {lbl}
          </button>
        ))}
      </div>
    </div>
    {/* FEATURED PRODUCTS */}
    {(()=>{
      const featured=(prods||[]).filter(p=>p.featured&&p.active!==false);
      if(!featured.length)return null;
      return(
        <section style={{padding:"clamp(48px,6vw,72px) clamp(16px,4vw,60px)",background:"var(--t-card)",borderBottom:"1px solid var(--t-border)"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div className="rv" style={{fontSize:9,letterSpacing:5,color:"var(--t-accent)",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Hand-Picked for You</div>
            <div className="rv" style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,color:"var(--t-text)"}}>Featured Pieces</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20,maxWidth:1200,margin:"0 auto"}}>
            {featured.slice(0,4).map(p=>(
              <PCard key={p.id} prod={p} onAdd={addToCart} onWish={toggleWish} wished={wish.has(p.id)} onOpenModal={openModal} onPriceDrop={savePriceDrop}/>
            ))}
          </div>
          {featured.length>4&&(
            <div style={{textAlign:"center",marginTop:28}}>
              <button onClick={()=>document.getElementById("prods")?.scrollIntoView({behavior:"smooth"})} style={{background:"none",border:`1px solid ${TH.accent}`,color:TH.accent,padding:"11px 32px",fontSize:11,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>View All Collection →</button>
            </div>
          )}
        </section>
      );
    })()}
    {/* VIDEO */}
    {settings.video_show==="true"&&settings.video_url&&(
      <section style={{padding:"clamp(56px,7vw,88px) clamp(16px,4vw,60px)",borderBottom:"1px solid #e8e4df",background:"var(--t-card)"}}>
        <div className="rv" style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:9,letterSpacing:4,color:"var(--t-accent)",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>{settings.video_label||"Featured"}</div>
          <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,color:"var(--t-text)"}}>{settings.video_title||"Watch Our Collection"}</div>
        </div>
        <div className="rv" style={{maxWidth:920,margin:"0 auto",border:"1px solid var(--t-border)"}}>
          {(settings.video_url.includes("youtube")||settings.video_url.includes("youtu.be"))?
            <iframe src={"https://www.youtube.com/embed/"+(settings.video_url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)||[])[1]+"?rel=0"} style={{width:"100%",height:"clamp(210px,45vw,520px)",border:"none"}} allowFullScreen/>:
            <video src={settings.video_url} controls style={{width:"100%",maxHeight:520,display:"block",background:"#111"}} preload="metadata"/>
          }
        </div>
      </section>
    )}
    {/* PRODUCTS */}
    <section id="prods" className="jf-prods-section" style={{background:`${TH.bg}`,borderBottom:`1px solid ${TH.border}`}}>
      <div style={{textAlign:"center",padding:"clamp(48px,6vw,68px) clamp(16px,4vw,60px) 28px"}}>
        <div className="rv" style={{fontSize:9,letterSpacing:4,color:"var(--t-accent)",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Our Collection</div>
        <div className="rv" style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,color:"var(--t-text)",marginBottom:8}}>{cat==="All"?"All Collections":CAT_L[cat]||cat}</div>
        <div className="rv" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
          <div style={{width:40,height:1,background:"#c9a84c"}}/>
          <div style={{fontSize:9,color:"var(--t-muted)",letterSpacing:2}}>{filtered.length} pieces</div>
          <div style={{width:40,height:1,background:"#c9a84c"}}/>
        </div>
        {settings.sold_count&&<div className="rv" style={{fontSize:11,color:"var(--t-muted)",textAlign:"center",marginTop:8,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{settings.sold_count}+ pieces sold this month</div>}
      </div>
      {/* ── BRAND BAR ─────────────────────────────── */}
      <BrandBar prods={prods} cat={cat} brandFilter={brandFilter} setBrandFilter={setBrandFilter}/>
      {/* ── ADVANCED FILTERS ─────────────────────────── */}
      <div style={{padding:"12px clamp(16px,4vw,60px)",background:"var(--t-card)",borderBottom:"1px solid #f0ece0"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,alignItems:"center",marginBottom:10}}>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:"7px 12px",border:"1px solid #e0d8cc",borderRadius:8,fontSize:12,outline:"none",background:"var(--t-card)",color:"#4a4035",cursor:"pointer"}}>
            {SORT_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
          {allBrands.length>2&&<select value={brandFilter} onChange={e=>setBrandFilter(e.target.value)} style={{padding:"7px 12px",border:"1px solid #e0d8cc",borderRadius:8,fontSize:12,outline:"none",background:"var(--t-card)",color:"#4a4035",cursor:"pointer"}}>
            {allBrands.map(b=><option key={b} value={b}>{b==="All"?"All Brands":b}</option>)}
          </select>}
          <span style={{fontSize:11,color:"var(--t-muted)",marginLeft:"auto"}}>{filtered.length} products</span>
        </div>
        <div style={{maxWidth:320}}>
          <div style={{fontSize:11,color:"var(--t-muted)",marginBottom:4}}>Price Range</div>
          <PriceSlider min={0} max={maxPrice} value={priceRange} onChange={setPriceRange}/>
        </div>
      </div>

      {/* Brand grouping handled by BrandBar above */}
      {filtered.length===0?(
        <div style={{textAlign:"center",padding:64,color:"#8a7f76"}}><div style={{fontSize:40,marginBottom:12,opacity:.4}}>📦</div><div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:18,color:"var(--t-muted)"}}>No products found</div></div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:"clamp(12px,1.5vw,18px)",padding:"0 clamp(16px,4vw,60px) clamp(56px,7vw,80px)",maxWidth:1500,margin:"0 auto"}}>
          {prods.length===0&&!filtered.length
            ?[...Array(8)].map((_,i)=><PCardSkeleton key={i}/>)
            :<BrandGroupedGrid filtered={filtered} cat={cat} brandFilter={brandFilter} addToCart={addToCart} toggleWish={toggleWish} wish={wish} openModal={openModal} savePriceDrop={savePriceDrop}/>
          }
        </div>
      )}
    </section>
    
    {/* HIDDEN VIP COLLECTION */}
    {vipUnlocked&&settings.show_vip!=="false"&&<section style={{padding:"clamp(48px,6vw,80px) clamp(16px,4vw,60px)",background:"linear-gradient(135deg,#0a0806 0%,#1a1612 50%,#2c1f0a 100%)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(201,168,76,.08) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.3)",borderRadius:20,padding:"6px 16px",marginBottom:14}}>
            <span style={{fontSize:14}}>👑</span>
            <span style={{fontSize:10,fontWeight:800,letterSpacing:3,color:"#c9a84c",textTransform:"uppercase"}}>Exclusive VIP Access</span>
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:600,color:"#f5efe0",lineHeight:1.2,marginBottom:8}}>Hidden Luxury Collection</h2>
          <p style={{fontSize:13,color:"rgba(245,239,224,.5)",maxWidth:460,margin:"0 auto"}}>Unlocked for our most valued customers — premium suiting not available to the public</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,maxWidth:1100,margin:"0 auto"}}>
          {prods.filter(p=>p.vip_only||p.badge==="VIP").slice(0,8).map((p,i)=>(
            <div key={p.id||i} onClick={()=>setModalProd(p)} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(201,168,76,.2)",borderRadius:8,overflow:"hidden",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.border="1px solid rgba(201,168,76,.5)";e.currentTarget.style.background="rgba(255,255,255,.07)";}} onMouseLeave={e=>{e.currentTarget.style.border="1px solid rgba(201,168,76,.2)";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>
              <div style={{aspectRatio:"3/4",background:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:42,position:"relative"}}>
                {p.img1?<img src={p.img1} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:(p.icon||"💎")}
                <div style={{position:"absolute",top:8,left:8,background:"#c9a84c",color:"#000",fontSize:7,fontWeight:800,letterSpacing:1,padding:"2px 8px",textTransform:"uppercase"}}>VIP</div>
              </div>
              <div style={{padding:"12px 14px"}}>
                <div style={{fontWeight:600,fontSize:13,color:"#f5efe0",marginBottom:4,lineHeight:1.3}}>{p.name}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#c9a84c"}}>Rs.{Number(p.sale_price||p.price||0).toLocaleString()}</div>
              </div>
            </div>
          ))}
          {prods.filter(p=>p.vip_only||p.badge==="VIP").length===0&&(
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"48px 0",color:"rgba(245,239,224,.3)",fontSize:14}}>VIP collection coming soon — check back later</div>
          )}
        </div>
      </div>
    </section>}

    {/* ALL COLLECTION — Mystery Box + Gift Sender */}
    {settings.show_mystery!=="false"&&<MysteryGiftSection settings={settings} user={user} onAuth={setAuthModal} products={prods}/>}

    {/* VISIT OUR STORE */}
<section id="store-map" style={{padding:"clamp(56px,7vw,88px) clamp(16px,4vw,60px)",background:"var(--t-bg)",borderBottom:"1px solid #e8e4df"}}>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(32px,5vw,72px)",alignItems:"start",maxWidth:1200,margin:"0 auto"}}>
        <div className="rv">
          <div style={{fontSize:9,letterSpacing:4,color:"var(--t-accent)",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Find Us</div>
          <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,color:"var(--t-text)",marginBottom:20}}>Visit Our Store</div>
          <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:28}}>
            {[["📍","Address",(settings.addr1||"Circular Road, Kunjah")+", "+(settings.addr2||"Distt Gujrat, Punjab")],["📞","Phone",settings.phone||"03228722232"],["💬","WhatsApp",settings.wa_number?"0"+settings.wa_number.slice(-10):"03228722232"],["⏰","Hours",settings.hours||"Mon-Sat: 10am-8pm"]].map(([ic,lbl,val])=>(
              <div key={lbl} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,background:"var(--t-surface)",border:"1px solid var(--t-border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{ic}</div>
                <div><div style={{fontSize:9,letterSpacing:2,color:"var(--t-muted)",textTransform:"uppercase",fontWeight:700,marginBottom:2}}>{lbl}</div><div style={{fontSize:13,color:"var(--t-text)"}}>{val}</div></div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <a href={"https://wa.me/"+(wa||WA_NUM)} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
              <button style={{background:"#111",color:"#fff",border:"none",padding:"12px 28px",fontSize:9,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:8}} onMouseEnter={e=>e.currentTarget.style.background="#2a2520"} onMouseLeave={e=>e.currentTarget.style.background="#111"}><WaSvg/> WhatsApp</button>
            </a>
            <a href={settings?.map_url||"https://maps.google.com/?q=Kunjah+Gujrat+Punjab+Pakistan"} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
              <button style={{background:"transparent",color:"var(--t-text)",border:"1px solid #111",padding:"12px 24px",fontSize:9,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all .2s",display:"flex",alignItems:"center",gap:6}} onMouseEnter={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#111";}}>📍 Open in Maps</button>
            </a>
          </div>
        </div>
        <div className="rv" style={{border:"1px solid var(--t-border)",overflow:"hidden"}}>
          <iframe title="Jameel Fabrics Location" src="https://maps.google.com/maps?q=Kunjah,+Gujrat,+Punjab,+Pakistan&output=embed&z=14" style={{width:"100%",height:"clamp(260px,40vw,420px)",border:"none",display:"block"}} loading="lazy"/>
          <div style={{padding:"14px 16px",background:"var(--t-surface)",borderTop:"1px solid #e0dbd3",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:13,fontWeight:700,color:"var(--t-text)"}}>Circular Road, Kunjah</div>
            <a href="https://maps.google.com/?q=Kunjah+Gujrat+Punjab+Pakistan" target="_blank" rel="noopener noreferrer" style={{fontSize:10,color:"var(--t-accent)",textDecoration:"none",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Get Directions</a>
          </div>
        </div>
      </div>
    </section>

    {/* REVIEWS */}
    <section id="reviews" style={{padding:"clamp(48px,6vw,72px) clamp(16px,4vw,60px)",background:"var(--t-card)",borderBottom:"1px solid #e8e4df"}}>
      <div className="rv" style={{textAlign:"center",marginBottom:36}}>
        <div style={{fontSize:9,letterSpacing:4,color:"var(--t-accent)",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Happy Customers</div>
        <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,color:"var(--t-text)"}}>Customer Reviews</div>
      </div>
      {settings.show_reviews!=="false"&&<ReviewsSection googleMapsUrl={settings.google_maps_url} googleRating={settings.google_rating}/>}
    </section>

<RecentlyViewedStrip items={recentlyViewed} onOpenModal={openModal}/>

    {/* ══ FOOTER ══ */}
    <footer style={{background:"#0a0907",color:"#e0dbd3",padding:"clamp(52px,6vw,80px) clamp(16px,4vw,60px) 0"}}>

      {/* Our Story + Why Choose Us */}
      <div style={{maxWidth:1200,margin:"0 auto",paddingBottom:"clamp(40px,5vw,64px)",borderBottom:"1px solid rgba(255,255,255,.07)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"clamp(28px,4vw,52px)"}}>
        <div>
          <div style={{fontSize:8,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:8}}>Since 1975</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:600,color:"#fff",lineHeight:1.2,marginBottom:12}}>{settings?.story_title||"Our Story"}</div>
          <p style={{fontSize:12,color:"rgba(255,255,255,.45)",lineHeight:1.9,marginBottom:20}}>{settings?.story_text||"From elegant unstitched suits to fine embroidered fabric — every piece reflects our commitment to quality and trust."}</p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {[[settings?.story_stat1||"50+",settings?.story_label1||"Years of Trust"],[settings?.story_stat2||"10K+",settings?.story_label2||"Happy Customers"],[settings?.story_stat3||"500+",settings?.story_label3||"Products"]].map(([n,l],i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#c9a84c",lineHeight:1}}>{n}</div>
                <div style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:8,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:12}}>Why Choose Us</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[["🔄","Easy Exchange","Exchange within 3 days. No questions asked."],["✅","Quality Assured","Every piece personally inspected."],["📦","Careful Packaging","Packed with care, arrives perfect."],["💬","WhatsApp Support","Direct access to the owner — real human."],["🚚","Fast Delivery","Nationwide delivery in 3-5 working days."],["🔒","Privacy Guaranteed","Your info is never shared."]].map(([ic,t,d])=>(
              <div key={t} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:14,flexShrink:0,marginTop:1,opacity:.85}}>{ic}</span>
                <div><div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.75)",marginBottom:1}}>{t}</div><div style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.5}}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
        {/* Policies */}
        <div>
          <div style={{fontSize:8,letterSpacing:4,color:"#c9a84c",textTransform:"uppercase",marginBottom:12}}>Our Policies</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[["🔄","Exchange Policy","3 days exchange on all products"],["💰","Payment","Advance payment required. EasyPaisa / JazzCash / Bank"],["🚚","Delivery","Pak Post, TCS, Leopard — 3-5 days"],["📦","Mystery Box","Non-refundable — quality guaranteed"],["🎁","Gift Orders","Dispatched in 2-3 business days"],["📞","Contact","WhatsApp: "+(settings?.phone||"03228722232")]].map(([ic,t,d])=>(
              <div key={t} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{fontSize:12,flexShrink:0,opacity:.7}}>{ic}</span>
                <div><div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.6)"}}>{t}</div><div style={{fontSize:10,color:"rgba(255,255,255,.25)",lineHeight:1.5}}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer links row */}
      <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1fr 1fr",gap:"clamp(24px,3.5vw,52px)",padding:"clamp(36px,4vw,52px) 0 clamp(24px,3vw,40px)",maxWidth:1200,margin:"0 auto"}}>
        <div>
          <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:18,fontWeight:900,letterSpacing:4,color:"#fff",marginBottom:4}}>{settings.store_name||"JAMEEL FABRICS"}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:4,color:"rgba(255,255,255,.3)",marginBottom:16,fontStyle:"italic"}}>Kunjah · Est. Punjab</div>
          <p style={{fontSize:11,color:"rgba(255,255,255,.6)",lineHeight:2,marginBottom:20}}>Premium Pakistani fabrics. Exclusive designs, exceptional quality, trusted by families since 1975.</p>
          <div style={{display:"flex",gap:10}}>
            {[{url:settings.insta||"#",bg:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",ic:<IgSvg/>},{url:"https://wa.me/"+wa,bg:"#25D366",ic:<WaSvg/>},{url:settings.tiktok||"#",bg:"#010101",ic:<TkSvg/>,border:"1px solid rgba(255,255,255,.15)"},{url:settings.fb||"#",bg:"#1877F2",ic:<FbSvg/>}].map((s,i)=>(
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{width:36,height:36,borderRadius:4,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"transform .2s,opacity .2s",textDecoration:"none",color:"#fff",border:s.border||"none"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.opacity=".85";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.opacity="1";}}>{s.ic}</a>
            ))}
          </div>
        </div>
        {[{title:"Collections",items:["Men's Unstitched","Women Unstitched","Women Stitched","Kids Unstitch Wear","New Arrivals"]},{title:"Information",items:["About Us","Our Policies","Delivery Info","Exchange Policy","Contact Us"]},{title:"Contact",items:["📍 "+(settings.addr1||"Circular Road, Kunjah"),"📍 "+(settings.addr2||"Distt Gujrat, Punjab"),"📞 "+(settings.phone||"03228722232"),"⏰ "+(settings.hours||"Mon-Sat: 10am-8pm")]}].map(col=>(
          <div key={col.title}>
            <div style={{fontSize:8,letterSpacing:3,color:"rgba(255,255,255,.6)",textTransform:"uppercase",fontWeight:700,marginBottom:16}}>{col.title}</div>
            {col.items.map(l=><div key={l} style={{fontSize:11,color:"rgba(255,255,255,.28)",padding:"5px 0",cursor:"pointer",transition:"color .2s",lineHeight:1.6}} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.7)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.28)"}>{l}</div>)}
          </div>
        ))}
      </div>
      {/* Newsletter */}
      <NewsletterBar/>
      <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:20,paddingBottom:28,maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:9,color:"rgba(255,255,255,.18)",letterSpacing:1}}>© 2026 {settings.store_name||"JAMEEL FABRICS KUNJAH"}. All Rights Reserved.</div>
        <div style={{fontSize:9,color:"rgba(255,255,255,.18)",letterSpacing:1}}>Premium Pakistani Clothing · Est. 1975 · Kunjah, Gujrat</div>
      </div>
    </footer>
    {/* Browsing counter */}
      <ScrollUpBtn/>
    <BrowsingBadge/>
    <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:28,right:28,width:54,height:54,background:"#25D366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 28px rgba(37,211,102,.4)",cursor:"pointer",textDecoration:"none",zIndex:700,transition:"transform .3s,box-shadow .3s",color:"#fff"}} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.14)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";}}><WaSvg/></a>
    {/* Recently Viewed */}
    {recentlyViewed.length>0&&(
      <div style={{position:"fixed",bottom:90,left:16,zIndex:690,maxWidth:220,display:"none"}} className="hide-mob-no">
      </div>
    )}
    {/* PWA Install prompt */}
    <PWAInstallBtn/>
        {/* Product Modal */}
    {modalProd&&<ProductModal prod={modalProd} onClose={()=>setModalProd(null)} onAdd={addToCart} onWish={toggleWish} wished={wish.has(modalProd.id)}/>}
    {cartOpen&&<CartPanel cart={cart} setCart={setCart} wa={wa} onClose={()=>setCartOpen(false)} user={user} settings={settings} gift={gift} setGift={setGift}/>}
    {authModal&&<AuthModal mode={authModal} onClose={()=>setAuthModal(null)} onSuccess={()=>setAuthModal(null)}/>}

    {/* WEBSITE V2 OVERLAY — enabled via Admin → Theme Settings */}
    {v2active&&<WebsiteV2
      prods={prods} settings={settings} cart={cart} addToCart={addToCart}
      toggleWish={toggleWish} wish={wish} cat={cat} setCat={setCat}
      filtered={filtered} setCartOpen={setCartOpen} user={user}
      gift={gift} setGift={setGift} openModal={openModal}
      vipUnlocked={vipUnlocked} adminTrigger={adminTrigger}
      setAuthModal={setAuthModal} wa={wa} TH={TH}
    />}

    {/* ABANDONED CART POPUP */}
    {abandonPopup&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setAbandonPopup(false)}>
      <div style={{background:"#fff",borderRadius:16,padding:28,width:"100%",maxWidth:360,textAlign:"center"}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:40,marginBottom:12}}>🛍️</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#1a1612",marginBottom:8}}>Apni cart bhool gaye?</div>
        <p style={{fontSize:13,color:"#7a6e65",lineHeight:1.7,marginBottom:20}}>Aapki cart mein {cart.length} item(s) hain. Abhi order karo aur apna pasandida fabric paao!</p>
        <div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:8,padding:"10px 16px",marginBottom:20,fontSize:13,fontWeight:600,color:"#16a34a"}}>🎁 10% discount available on selected items</div>
        <button onClick={()=>{setAbandonPopup(false);setCartOpen(true);}} style={{width:"100%",background:"#111",color:"#fff",border:"none",padding:"13px",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:6,marginBottom:8}}>Complete My Order</button>
        <button onClick={()=>setAbandonPopup(false)} style={{width:"100%",background:"none",border:"1px solid #e0d8cc",padding:"10px",fontSize:12,cursor:"pointer",borderRadius:6,color:"#7a6e65"}}>Maybe Later</button>
      </div>
    </div>}

  </div>);
}

// FIX 10 — Recently Viewed Strip
function RecentlyViewedStrip({items,onOpenModal}){
  if(!items||items.length===0)return null;
  return(
    <div style={{padding:"24px clamp(16px,4vw,60px)",background:"var(--t-bg)",borderTop:"1px solid var(--t-border)"}}>
      <div style={{fontSize:9,letterSpacing:3,color:"var(--t-accent)",textTransform:"uppercase",fontWeight:700,marginBottom:12}}>Recently Viewed</div>
      <div style={{display:"flex",gap:10,overflowX:"auto",scrollSnapType:"x mandatory",paddingBottom:6}}>
        {items.map(prod=>{
          const img=prod.img1||prod.photo_url||"";
          const price=Number(prod.sale_price||prod.price||0);
          return(
            <div key={prod.id} onClick={()=>onOpenModal&&onOpenModal(prod)} style={{flex:"0 0 130px",cursor:"pointer",scrollSnapAlign:"start",border:"1px solid var(--t-border)",background:"var(--t-card)",overflow:"hidden",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              <div style={{aspectRatio:"3/4",background:"#f5f2ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,overflow:"hidden"}}>
                {img?<img src={img} alt={prod.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(prod.icon||"👗")}
              </div>
              <div style={{padding:"8px 10px"}}>
                <div style={{fontSize:11,fontWeight:600,color:"var(--t-text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{prod.name}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:700,color:"var(--t-accent)"}}>Rs.{price.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function AccountPage({user,onBack}){
  const[orders,setOrders]=useState([]);const[wl,setWl]=useState([]);
  const[tab,setTab]=useState("orders");
  useEffect(()=>{if(!sb||!user)return;sb.from("online_orders").select("*").eq("customer_id",user.id).order("created_at",{ascending:false}).then(({data})=>setOrders(data||[]));sb.from("wishlists").select("*,products(*)").eq("customer_id",user.id).then(({data})=>setWl(data||[]));},[user]);
  const C={background:"var(--t-card)",border:"1px solid var(--t-border)",padding:24,marginBottom:16};

  return(<div style={{background:"var(--t-bg)",minHeight:"100vh",fontFamily:"var(--t-bf,'Jost',sans-serif)"}}>
    <div style={{background:"var(--t-card)",borderBottom:"1px solid #e8e4df",padding:"16px clamp(16px,4vw,60px)",display:"flex",alignItems:"center",gap:16,position:"sticky",top:0,zIndex:100}}>
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:"var(--t-muted)",fontSize:13,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg> Back
      </button>
      <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:18,fontWeight:700}}>My Account</div>
    </div>
    {/* Tab nav */}
    <div style={{background:"var(--t-card)",borderBottom:"1px solid var(--t-border)",display:"flex",overflowX:"auto"}}>
      {[["orders","📦 Orders"],["wishlist","❤️ Wishlist"]].map(([k,l])=>(
        <button key={k} onClick={()=>setTab(k)} style={{padding:"12px 20px",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,color:tab===k?"#c9a84c":"#7a6e65",borderBottom:tab===k?"2px solid #c9a84c":"2px solid transparent",whiteSpace:"nowrap",transition:"all .2s"}}>{l}</button>
      ))}
    </div>
    <div style={{maxWidth:860,margin:"0 auto",padding:"28px clamp(16px,4vw,40px)"}}>
      <div style={C}><div style={{fontSize:15,fontWeight:600,marginBottom:12}}>Account Info</div><div style={{fontSize:14,color:"#6b6358",marginBottom:5}}><strong>Email:</strong> {user.email}</div><div style={{fontSize:14,color:"#6b6358"}}><strong>Name:</strong> {user.user_metadata?.full_name||"Not set"}</div></div>

      {/* ── ORDERS TAB ── */}
      {tab==="orders"&&<div style={C}>
        <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>My Orders ({orders.length})</div>
        {!orders.length?<div style={{textAlign:"center",padding:32,color:"#8a7f76"}}><div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:16}}>No orders yet</div></div>:
          orders.map(o=><div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:"1px solid #f0ede8",flexWrap:"wrap",gap:10}}>
            <div><div style={{fontWeight:600,fontSize:13}}>#{o.id.slice(-6).toUpperCase()}</div><div style={{fontSize:11,color:"#8a7f76",marginTop:2}}>{(o.items||[]).length} items · {new Date(o.created_at).toLocaleDateString()}</div></div>
            <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{fontWeight:700,fontFamily:"'Cormorant Garamond',serif",fontSize:18}}>Rs.{Number(o.total).toLocaleString()}</div><span style={{padding:"3px 10px",fontSize:11,fontWeight:600,background:o.status==="delivered"?"#dcfce7":o.status==="confirmed"?"#dbeafe":"#fef9c3",color:o.status==="delivered"?"#16a34a":o.status==="confirmed"?"#2563eb":"#ca8a04"}}>{o.status}</span></div>
          </div>)
        }
      </div>}


      {/* ── WISHLIST TAB ── */}
      {tab==="wishlist"&&
      <div style={C}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:15,fontWeight:600}}>Wishlist ({wl.length})</div>
          {wl.length>0&&<button onClick={()=>{const names=wl.map(w=>w.products?.name).filter(Boolean).join(", ");const txt="Meri Jameel Fabrics Wishlist:\n"+names+"\n\nJameel Fabrics Kunjah — "+window.location.origin;navigator.clipboard?.writeText(txt);window.open("https://wa.me/?text="+encodeURIComponent(txt),"_blank");}} style={{background:"#25D366",color:"#fff",border:"none",padding:"7px 14px",fontSize:11,fontWeight:700,cursor:"pointer",borderRadius:4,display:"flex",alignItems:"center",gap:6}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            Share Wishlist
          </button>}
        </div>
        {!wl.length?<div style={{textAlign:"center",padding:32,color:"#8a7f76"}}><div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:16}}>No saved items</div></div>:
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
            {wl.map(w=><div key={w.id} style={{border:"1px solid var(--t-border)",overflow:"hidden"}}>
              <div style={{aspectRatio:"3/4",background:"#f5f2ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{w.products?.icon||"👗"}</div>
              <div style={{padding:"10px 12px"}}><div style={{fontWeight:600,fontSize:13}}>{w.products?.name||""}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,marginTop:4}}>Rs.{Number(w.products?.sale_price||w.products?.price||0).toLocaleString()}</div></div>
            </div>)}
          </div>
        }
      </div>}

    </div>
  </div>);
}

// ── Shared Settings Save Hook ─────────────────────────────────
function useSettingsSave(settings){
  const[f,setF]=useState({});
  const[saving,setSaving]=useState(false);
  const[saved,setSaved]=useState(false);
  useEffect(()=>setF({...settings}),[settings]);
  function updateF(k,v){setF(p=>({...p,[k]:v}));}
  async function save(keys){
    if(!sb)return;setSaving(true);
    const toSave=keys?keys.map(k=>({k,v:f[k]})):Object.entries(f).map(([k,v])=>({k,v}));
    await Promise.all(toSave.map(({k,v})=>sb.from("website_settings").upsert({key:k,value:String(v||"")},{onConflict:"key"})));
    setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500);
  }
  return{f,setF,updateF,saving,saved,save};
}

// ── Save Button component ─────────────────────────────────────
function ASaveBtn({saving,saved,onClick}){
  return(
    <ABtn onClick={onClick} style={{background:saved?"#16a34a":saving?"#6b7280":"#111",color:"#fff",minWidth:90,transition:"background .3s"}}>
      {saving?"💾 Saving...":saved?"✅ Saved":"💾 Save"}
    </ABtn>
  );
}

// ── THEME SETTINGS ────────────────────────────────────────────
function AThemeSettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  async function applyTheme(){
    await save(["site_theme","design_v2"]);
    if(f.site_theme&&typeof localStorage!=="undefined"){
      localStorage.setItem("jf_theme",f.site_theme);
      localStorage.setItem("jf_v2",f.design_v2==="true"?"true":"false");
      window.dispatchEvent(new CustomEvent("jf-v2-change",{detail:f.design_v2==="true"}));
      window.dispatchEvent(new CustomEvent("jf-theme-change",{detail:f.site_theme}));
    }
    onSaved&&onSaved();
  }
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <AH title="🎨 Theme" sub="Website ka color theme badlo"/>
        <ASaveBtn saving={saving} saved={saved} onClick={applyTheme}/>
      </div>
      <ACard style={{padding:20}}>
        <div style={{fontSize:13,color:"#6b7280",marginBottom:14}}>Theme select karo — landing page aur website dono change ho jayenge</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:10}}>
          {Object.entries(SITE_THEMES).map(([name,t])=>{
            const isActive=(f.site_theme||"Black Gold")===name;
            return(
              <div key={name} onClick={()=>updateF("site_theme",name)} style={{border:`2px solid ${isActive?"#111":"#e5e7eb"}`,borderRadius:8,overflow:"hidden",cursor:"pointer",transition:"all .2s",boxShadow:isActive?"0 4px 12px rgba(0,0,0,.15)":"none"}}>
                <div style={{height:44,background:t.dark,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:t.accent}}/>
                  <span style={{fontSize:10,color:t.darkText,letterSpacing:1,fontWeight:700,textTransform:"uppercase",opacity:.8}}>{name}</span>
                </div>
                <div style={{height:28,background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:t.accent,opacity:.5}}/>
                  <span style={{fontSize:9,color:t.muted}}>{isActive?"✓ Active":"Click to select"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ACard>

      {/* V2 Design toggle */}
      <ACard style={{padding:"16px 20px",marginTop:10,border:"2px solid"+(f.design_v2==="true"?"#c9a84c":"transparent"),transition:"border-color .2s"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--t-text)",marginBottom:3}}>🔮 Premium V2 Design</div>
            <div style={{fontSize:11,color:"#6b7280",lineHeight:1.5}}>Naya editorial premium website layout. Dark hero, outline typography, magazine grid.<br/>Sare features available — cart, modals, reviews, VIP sab kuch.</div>
          </div>
          <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
            <div style={{position:"relative",width:44,height:24}} onClick={()=>updateF("design_v2",f.design_v2==="true"?"false":"true")}>
              <div style={{position:"absolute",inset:0,borderRadius:12,background:f.design_v2==="true"?"#c9a84c":"#d1d5db",transition:"background .2s"}}/>
              <div style={{position:"absolute",top:3,left:f.design_v2==="true"?23:3,width:18,height:18,background:"#fff",borderRadius:"50%",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
            </div>
            <span style={{fontSize:12,fontWeight:600,color:f.design_v2==="true"?"#b8963e":"#6b7280",minWidth:44}}>{f.design_v2==="true"?"V2 ON":"Classic"}</span>
          </label>
        </div>
        {f.design_v2==="true"&&<div style={{marginTop:12,padding:"9px 12px",background:"#fef9ec",border:"1px solid #f3e0a0",borderRadius:6,fontSize:11,color:"#92620a"}}>✅ V2 Design active — save karo aur website refresh karo to dekho.</div>}
      </ACard>
    </div>
  );
}

// ── SHOP SETTINGS ─────────────────────────────────────────────
function AShopSettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <AH title="🏪 Shop Settings" sub="Store info aur display"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save(["store_name","announcement","hlabel","hsub","about","addr1","addr2","phone","wa_number","hours","insta","fb","tiktok","sold_count","price_max","free_shipping_min","free_shipping_active"])}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <ACard style={{padding:18}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Store Info</div>
          {[["store_name","Store Name"],["announcement","Announcement Bar"],["addr1","Address Line 1"],["addr2","Address Line 2"],["phone","Phone"],["wa_number","WhatsApp Number"],["hours","Working Hours"]].map(([k,l])=>(
            <div key={k} style={{marginBottom:10}}><ALbl c={l}/><AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/></div>
          ))}
        </ACard>
        <ACard style={{padding:18}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Display</div>
          {[["hlabel","Hero Label"],["hsub","Hero Tagline"],["sold_count","Sold Count"],["price_max","Max Price Range"],["free_shipping_min","Free Shipping Min (Rs.)"]].map(([k,l])=>(
            <div key={k} style={{marginBottom:10}}><ALbl c={l}/><AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/></div>
          ))}
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,marginTop:4}}>
            <input type="checkbox" checked={f.free_shipping_active!=="false"} onChange={e=>updateF("free_shipping_active",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:16,height:16}}/>
            Enable Free Shipping Bar
          </label>
          <div style={{marginTop:12}}><ALbl c="Social — Instagram"/><AI value={f.insta||""} onChange={e=>updateF("insta",e.target.value)}/></div>
          <div style={{marginTop:10}}><ALbl c="Social — Facebook"/><AI value={f.fb||""} onChange={e=>updateF("fb",e.target.value)}/></div>
          <div style={{marginTop:10}}><ALbl c="Social — TikTok"/><AI value={f.tiktok||""} onChange={e=>updateF("tiktok",e.target.value)}/></div>
        </ACard>
      </div>
    </div>
  );
}

// ── SUBSCRIPTION SETTINGS ─────────────────────────────────────
function ASubSettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  const tiers=[["Silver","sub_silver_price","sub_silver_items","sub_silver_benefit","1500","1-2 Fabrics","Starter"],["Gold","sub_gold_price","sub_gold_items","sub_gold_benefit","2500","2-3 Fabrics","Premium"],["Platinum","sub_platinum_price","sub_platinum_items","sub_platinum_benefit","4000","3-4 Fabrics","Exclusive"],["Diamond","sub_diamond_price","sub_diamond_items","sub_diamond_benefit","6000","4-5 Fabrics","Ultra Luxury"]];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <AH title="📦 Subscription Box" sub="Mystery box tiers aur settings"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save()}/>
      </div>
      <ACard style={{padding:18,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Box Dispatch Dates</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div><ALbl c="Date 1 (day)"/><AI type="number" value={f.sub_date1||"12"} onChange={e=>updateF("sub_date1",e.target.value)}/></div>
          <div><ALbl c="Date 2 (day)"/><AI type="number" value={f.sub_date2||"28"} onChange={e=>updateF("sub_date2",e.target.value)}/></div>
        </div>
        <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,marginTop:10}}>
          <input type="checkbox" checked={f.sub_active!=="false"} onChange={e=>updateF("sub_active",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:16,height:16}}/>
          Show Subscription Box on website
        </label>
      </ACard>
      {tiers.map(([tier,pk,ik,bk,dp,di,db])=>(
        <ACard key={tier} style={{padding:16,marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>{tier==="Gold"?"🥇":tier==="Silver"?"🥈":tier==="Platinum"?"💠":"💎"} {tier}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div><ALbl c="Price (Rs.)"/><AI type="number" value={f[pk]||dp} onChange={e=>updateF(pk,e.target.value)}/></div>
            <div><ALbl c="Items"/><AI value={f[ik]||di} onChange={e=>updateF(ik,e.target.value)}/></div>
            <div><ALbl c="Benefit"/><AI value={f[bk]||db} onChange={e=>updateF(bk,e.target.value)}/></div>
          </div>
        </ACard>
      ))}
    </div>
  );
}

// ── WA SETTINGS ───────────────────────────────────────────────
function AWASettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  const templates=[["wa_greeting","WA Button Greeting","Assalam! I am interested in your fabrics."],["wa_order_msg","Order Confirmation","Your order confirmed! Total: {amount}. Delivery in 3-5 days."],["wa_review_req","Review Request","Thank you for shopping at Jameel Fabrics! Your feedback means a lot."],["wa_udhaar_reminder","Payment Reminder","Assalam! Gentle reminder about your balance at Jameel Fabrics."]];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <AH title="💬 WhatsApp Templates" sub="Customer ko jane wale messages"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save()}/>
      </div>
      {templates.map(([k,l,ph])=>(
        <ACard key={k} style={{padding:16,marginBottom:12}}>
          <ALbl c={l}/>
          <textarea value={f[k]||""} onChange={e=>updateF(k,e.target.value)} rows={3} placeholder={ph} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",marginTop:4}}/>
        </ACard>
      ))}
    </div>
  );
}

// ── BILL TEMPLATES CRUD ───────────────────────────────────────
// ══════════════════════════════════════════════════════════════
// ADMIN: SIZE CHART TEMPLATES
// ══════════════════════════════════════════════════════════════
const DEFAULT_CHARTS=[
  {id:"unstitched_lawn",name:"Unstitched Lawn",rows:[["Size","Shirt Length","Shirt Width","Dupatta","Shalwar"],["1 Meter","—","—","2.5m","—"],["2.5 Meters","42\"","22\"","2.5m","2.5m"],["3 Meters","44\"","24\"","2.5m","2.5m"]]},
  {id:"stitched_kameez",name:"Stitched Kameez",rows:[["Size","Chest","Length","Sleeve","Neck"],["XS","32\"","38\"","22\"","14\""],["S","34\"","40\"","23\"","14.5\""],["M","36\"","42\"","24\"","15\""],["L","38\"","44\"","25\"","15.5\""],["XL","40\"","46\"","26\"","16\""],["XXL","42\"","48\"","27\"","17\""]]},
  {id:"stitched_shalwar",name:"Stitched Shalwar",rows:[["Size","Waist","Hip","Length"],["XS","28\"","36\"","38\""],["S","30\"","38\"","39\""],["M","32\"","40\"","40\""],["L","34\"","42\"","41\""],["XL","36\"","44\"","42\""],["XXL","38\"","46\"","43\""]]},
  {id:"kids_shirt",name:"Kids Shirt",rows:[["Age","Chest","Length","Sleeve"],["2-3yr","22\"","18\"","12\""],["4-5yr","24\"","20\"","14\""],["6-7yr","26\"","22\"","15\""],["8-9yr","28\"","24\"","17\""],["10-11yr","30\"","26\"","18\""]]},
  {id:"suiting_2pcs",name:"Suiting 2-Piece",rows:[["Size","Kameez Length","Kameez Width","Trouser Length"],["S/M","44\"","22\"","40\""],["M/L","46\"","24\"","41\""],["L/XL","48\"","26\"","42\""],["XL/XXL","50\"","28\"","43\""]]},
];

function ASizeCharts(){
  const[charts,setCharts]=useState([]);
  const[edit,setEdit]=useState(null);
  const[form,setForm]=useState({id:"",name:"",rows:[]});
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    if(!sb){setCharts(DEFAULT_CHARTS);setLoading(false);return;}
    sb.from("website_settings").select("value").eq("key","size_charts").single()
      .then(({data})=>{
        if(data?.value){try{setCharts(JSON.parse(data.value));setLoading(false);return;}catch{}}
        setCharts(DEFAULT_CHARTS);setLoading(false);
      });
  },[]);

  async function saveAll(list){
    if(!sb)return;
    await sb.from("website_settings").upsert({key:"size_charts",value:JSON.stringify(list)},{onConflict:"key"});
  }

  async function save(){
    if(!form.name)return toast("Name required","error");
    const updated=edit==="new"
      ?[...charts,{...form,id:form.id||form.name.toLowerCase().replace(/\s+/g,"_")+Date.now()}]
      :charts.map(c=>c.id===edit?{...form}:c);
    setCharts(updated);await saveAll(updated);setEdit(null);toast("Chart saved!","success");
  }

  function addRow(){setForm(f=>({...f,rows:[...f.rows,f.rows[0]?.map(()=>"")||["",""]]}))}
  function updateCell(ri,ci,v){setForm(f=>{const r=f.rows.map(r=>[...r]);r[ri][ci]=v;return{...f,rows:r};});}
  function addCol(){setForm(f=>({...f,rows:f.rows.map(r=>[...r,""])}))}
  function removeRow(ri){setForm(f=>({...f,rows:f.rows.filter((_,i)=>i!==ri)}))}

  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
      <AH title="📏 Size Chart Templates" sub="10 stitched/unstitched categories ke liye size charts"/>
      <ABtn onClick={()=>{setEdit("new");setForm({id:"",name:"",rows:[["Size","Chest","Length"],["S","34\"","40\""],["M","36\"","42\""],["L","38\"","44\""]]}); }} style={{background:"#111",color:"#fff"}}>+ New Chart</ABtn>
    </div>
    {loading?<div style={{textAlign:"center",padding:32,color:"#9ca3af"}}>Loading...</div>:(
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {charts.map(c=>(
          <ACard key={c.id} style={{padding:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontWeight:700,fontSize:13}}>{c.name}</div>
              <div style={{display:"flex",gap:4}}>
                <ABtn sm onClick={()=>{setEdit(c.id);setForm({...c,rows:c.rows.map(r=>[...r])});}} style={{background:"#f3f4f6"}}>Edit</ABtn>
                <ABtn sm onClick={()=>{if(!window.confirm("Delete?"))return;const u=charts.filter(x=>x.id!==c.id);setCharts(u);saveAll(u);}} style={{background:"#fee2e2",color:"#dc2626"}}>Del</ABtn>
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                {c.rows.map((row,ri)=>(
                  <tr key={ri} style={{background:ri===0?"#f9fafb":"transparent"}}>
                    {row.map((cell,ci)=>(
                      <td key={ci} style={{padding:"4px 6px",border:"1px solid #e5e7eb",fontWeight:ri===0?700:400,color:ri===0?"#374151":"#6b7280"}}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
            <div style={{marginTop:6,fontSize:11,color:"#9ca3af"}}>{c.rows.length-1} sizes · {(c.rows[0]?.length||0)-1} measurements</div>
          </ACard>
        ))}
      </div>
    )}

    {edit&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setEdit(null)}>
      <div style={{background:"var(--t-card)",borderRadius:12,padding:24,width:"100%",maxWidth:640,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>{edit==="new"?"New Size Chart":"Edit Size Chart"}</div>
        <div style={{marginBottom:12}}><ALbl c="Chart Name"/><AI value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Stitched Kameez"/></div>
        <div style={{overflowX:"auto",marginBottom:12}}>
          <table style={{borderCollapse:"collapse",fontSize:12,minWidth:300}}>
            {form.rows.map((row,ri)=>(
              <tr key={ri} style={{background:ri===0?"#f0f9ff":"transparent"}}>
                {row.map((cell,ci)=>(
                  <td key={ci} style={{padding:3,border:"1px solid #e5e7eb"}}>
                    <input value={cell} onChange={e=>updateCell(ri,ci,e.target.value)} style={{width:70,padding:"4px 6px",border:"none",outline:"none",fontSize:12,background:"transparent",fontWeight:ri===0?700:400}}/>
                  </td>
                ))}
                <td style={{padding:3}}><button onClick={()=>removeRow(ri)} style={{fontSize:10,padding:"2px 6px",border:"1px solid #fecaca",borderRadius:4,cursor:"pointer",background:"#fee2e2",color:"#dc2626"}}>✕</button></td>
              </tr>
            ))}
          </table>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <ABtn sm onClick={addRow} style={{background:"#f3f4f6"}}>+ Row</ABtn>
          <ABtn sm onClick={addCol} style={{background:"#f3f4f6"}}>+ Column</ABtn>
        </div>
        <div style={{display:"flex",gap:8}}>
          <ABtn onClick={save} style={{background:"#111",color:"#fff"}}>Save Chart</ABtn>
          <ABtn onClick={()=>setEdit(null)} style={{background:"#f3f4f6"}}>Cancel</ABtn>
        </div>
      </div>
    </div>}
  </div>);
}

function ABillTemplates(){
  const[templates,setTemplates]=useState([]);
  const[edit,setEdit]=useState(null);
  const[form,setForm]=useState({name:"",header:"",footer:"",show_logo:true,show_address:true,show_date:true,accent:"#c9a84c"});
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    if(!sb)return;
    sb.from("website_settings").select("value").eq("key","bill_templates").single()
      .then(({data})=>{
        if(data?.value){try{setTemplates(JSON.parse(data.value));}catch{}}
        setLoading(false);
      });
  },[]);

  async function saveAll(list){
    if(!sb)return;
    await sb.from("website_settings").upsert({key:"bill_templates",value:JSON.stringify(list)},{onConflict:"key"});
  }

  function newTemplate(){setEdit("new");setForm({name:"Default",header:"*{store}*\n{addr}\nTel: {phone}",footer:"Thank you for shopping!\nJazakAllah Khair 🙏",show_logo:true,show_address:true,show_date:true,accent:"#c9a84c"});}

  async function save(){
    if(!form.name)return alert("Name required");
    let updated;
    if(edit==="new")updated=[...templates,{...form,id:Date.now()}];
    else updated=templates.map(t=>t.id===edit?{...form,id:t.id}:t);
    setTemplates(updated);await saveAll(updated);setEdit(null);toast("Template saved!","success");
  }

  async function del(id){
    if(!confirm("Delete this template?"))return;
    const updated=templates.filter(t=>t.id!==id);
    setTemplates(updated);await saveAll(updated);
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <AH title="🧾 Bill Templates" sub="WhatsApp bill ka format edit karo"/>
        <ABtn onClick={newTemplate} style={{background:"#111",color:"#fff"}}>+ New Template</ABtn>
      </div>

      {loading?<div style={{textAlign:"center",padding:32,color:"#9ca3af"}}>Loading...</div>:(
        templates.length===0?
          <ACard style={{padding:32,textAlign:"center",color:"#9ca3af"}}>
            <div style={{fontSize:32,marginBottom:8}}>🧾</div>
            <div>No templates yet — create one</div>
            <ABtn onClick={newTemplate} style={{background:"#111",color:"#fff",marginTop:12}}>+ Create Template</ABtn>
          </ACard>:
          <div style={{display:"grid",gap:12}}>
            {templates.map(t=>(
              <ACard key={t.id} style={{padding:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:"var(--t-text)"}}>{t.name}</div>
                    <div style={{fontSize:11,color:"#6b7280",marginTop:2,whiteSpace:"pre-line",maxHeight:40,overflow:"hidden"}}>{t.header?.slice(0,80)}...</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <ABtn onClick={()=>{setEdit(t.id);setForm({...t});}} style={{background:"#111",color:"#fff",padding:"5px 12px",fontSize:11}}>✏️ Edit</ABtn>
                    <ABtn onClick={()=>del(t.id)} style={{background:"#fee2e2",color:"#dc2626",padding:"5px 12px",fontSize:11}}>🗑️ Del</ABtn>
                  </div>
                </div>
              </ACard>
            ))}
          </div>
      )}

      {edit&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setEdit(null)}>
          <div style={{background:"var(--t-card)",borderRadius:12,padding:24,width:"100%",maxWidth:500,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>{edit==="new"?"New Template":"Edit Template"}</div>
            <div style={{marginBottom:10}}><ALbl c="Template Name"/><AI value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Default Bill"/></div>
            <div style={{marginBottom:10}}>
              <ALbl c="Header (use {store},{addr},{phone})"/>
              <textarea value={form.header||""} onChange={e=>setForm({...form,header:e.target.value})} rows={3} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"monospace",boxSizing:"border-box"}}/>
            </div>
            <div style={{marginBottom:10}}>
              <ALbl c="Footer"/>
              <textarea value={form.footer||""} onChange={e=>setForm({...form,footer:e.target.value})} rows={2} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"monospace",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[["show_logo","Show Logo"],["show_address","Show Address"],["show_date","Show Date"]].map(([k,l])=>(
                <label key={k} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:12}}>
                  <input type="checkbox" checked={!!form[k]} onChange={e=>setForm({...form,[k]:e.target.checked})} style={{accentColor:"#c9a84c"}}/>
                  {l}
                </label>
              ))}
              <div><ALbl c="Accent Color"/><input type="color" value={form.accent||"#c9a84c"} onChange={e=>setForm({...form,accent:e.target.value})} style={{width:"100%",height:32,border:"1px solid #e5e7eb",borderRadius:4,cursor:"pointer"}}/></div>
            </div>
            <div style={{background:"#f9fafb",borderRadius:6,padding:12,marginBottom:14,fontSize:11,color:"#6b7280",lineHeight:1.6}}>
              <strong>Variables:</strong> {"{store}"} = shop name · {"{addr}"} = address · {"{phone}"} = phone · {"{date}"} = date · {"{bill_num}"} = bill number · {"{items}"} = item list · {"{total}"} = total · {"{customer}"} = customer name
            </div>
            <div style={{display:"flex",gap:8}}>
              <ABtn onClick={save} style={{flex:1,background:"#111",color:"#fff"}}>Save Template</ABtn>
              <ABtn onClick={()=>setEdit(null)} style={{background:"#f3f4f6",color:"#374151"}}>Cancel</ABtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── DELIVERY SETTINGS ─────────────────────────────────────────
function ADeliverySettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <AH title="🚚 Delivery Settings" sub="Shipping aur delivery options"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save(["free_shipping_min","free_shipping_active","delivery_note","eid_show","eid_date","eid_title","eid_subtitle","birthday_discount","birthday_active"])}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <ACard style={{padding:18}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Free Shipping</div>
          <div style={{marginBottom:10}}><ALbl c="Minimum Amount (Rs.)"/><AI type="number" value={f.free_shipping_min||"2000"} onChange={e=>updateF("free_shipping_min",e.target.value)}/></div>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
            <input type="checkbox" checked={f.free_shipping_active!=="false"} onChange={e=>updateF("free_shipping_active",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:16,height:16}}/>
            Enable free shipping bar
          </label>
        </ACard>
        <ACard style={{padding:18}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Birthday Discount</div>
          <div style={{marginBottom:10}}><ALbl c="Discount %"/><AI type="number" value={f.birthday_discount||"10"} onChange={e=>updateF("birthday_discount",e.target.value)}/></div>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
            <input type="checkbox" checked={f.birthday_active!=="false"} onChange={e=>updateF("birthday_active",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:16,height:16}}/>
            Enable birthday discount
          </label>
        </ACard>
        <ACard style={{padding:18,gridColumn:"1/-1"}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>🌙 Eid Countdown</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><ALbl c="Eid Date"/><AI type="date" value={f.eid_date||""} onChange={e=>updateF("eid_date",e.target.value)}/></div>
            <div><ALbl c="Title"/><AI value={f.eid_title||"Eid Collection"} onChange={e=>updateF("eid_title",e.target.value)}/></div>
            <div style={{gridColumn:"1/-1"}}><ALbl c="Subtitle"/><AI value={f.eid_subtitle||""} onChange={e=>updateF("eid_subtitle",e.target.value)}/></div>
          </div>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,marginTop:8}}>
            <input type="checkbox" checked={f.eid_show==="true"} onChange={e=>updateF("eid_show",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:16,height:16}}/>
            Show Eid countdown
          </label>
        </ACard>
      </div>
    </div>
  );
}

// ── ThemeIc SVG ───────────────────────────────────────────────
const ThemeIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>;


// ── Error Boundary ────────────────────────────────────────────
// ── Brand Dropdown (uses saved brands per category) ──────────
function BrandDropdown({cat,value,onChange}){
  const[brands,setBrands]=useState({});
  useEffect(()=>{
    if(!sb)return;
    sb.from("website_settings").select("value").eq("key","brands_by_cat").single()
      .then(({data})=>{if(data?.value){try{setBrands(JSON.parse(data.value));}catch{}}});
  },[]);
  const list=brands[cat]||[];
  if(list.length===0)return<AI value={value} onChange={e=>onChange(e.target.value)} placeholder="Brand naam likho..."/>;
  return(
    <div style={{display:"flex",gap:6}}>
      <AS value={value} onChange={e=>onChange(e.target.value)} style={{flex:1}}>
        <option value="">— Brand Select karo —</option>
        {list.map(b=><option key={b} value={b}>{b}</option>)}
        <option value="Others">Others / Mix</option>
      </AS>
    </div>
  );
}


// ── Admin Brands Manager ──────────────────────────────────────
function ABrands(){
  const BRAND_CATS=[
    {k:"MP", l:"Mens Unstitch Plain",        max:16},
    {k:"ME", l:"Mens Unstitch Embroidery",   max:6},
    {k:"WU", l:"Women Unstitch",             max:20},
    {k:"WS", l:"Women Stitch",               max:15},
    {k:"RS", l:"Reshmi Suiting",             max:15},
    {k:"AB", l:"Abayas",                     max:1},
    {k:"KU", l:"Kids Unstitch",              max:1},
    {k:"BS", l:"Bedsheets",                  max:5},
    {k:"BL", l:"Blankets",                   max:5},
    {k:"OT", l:"Others",                     max:10},
  ];
  const[brands,setBrands]=useState({});
  const[saving,setSaving]=useState(false);
  const[saved,setSaved]=useState(false);
  const[newB,setNewB]=useState({});

  useEffect(()=>{
    if(!sb)return;
    sb.from("website_settings").select("value").eq("key","brands_by_cat").single()
      .then(({data})=>{if(data?.value){try{setBrands(JSON.parse(data.value));}catch{}}});
  },[]);

  async function save(){
    if(!sb)return;setSaving(true);
    await sb.from("website_settings").upsert({key:"brands_by_cat",value:JSON.stringify(brands)},{onConflict:"key"});
    setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2000);
  }

  function addBrand(cat){
    const val=(newB[cat]||"").trim();
    if(!val)return;
    const list=brands[cat]||[];
    const max=BRAND_CATS.find(c=>c.k===cat)?.max||20;
    if(list.length>=max)return alert(`Max ${max} brands for this category!`);
    if(list.includes(val))return alert("Already exists!");
    setBrands(b=>({...b,[cat]:[...list,val]}));
    setNewB(n=>({...n,[cat]:""}));
  }

  function removeBrand(cat,brand){
    setBrands(b=>({...b,[cat]:(b[cat]||[]).filter(x=>x!==brand)}));
  }

  function moveUp(cat,i){
    const list=[...(brands[cat]||[])];
    if(i===0)return;
    [list[i-1],list[i]]=[list[i],list[i-1]];
    setBrands(b=>({...b,[cat]:list}));
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12}}>
        <AH title="Brands by Category" sub="Har category ke brands manage karo"/>
        <ABtn onClick={save} style={{background:saved?"#16a34a":"#111",color:"#fff",transition:"background .3s"}}>
          {saving?"Saving...":saved?"✓ Saved":"Save All"}
        </ABtn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
        {BRAND_CATS.map(({k,l,max})=>{
          const list=brands[k]||[];
          return(
            <ACard key={k} style={{padding:18}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--t-text)"}}>{l}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{list.length}/{max} brands</div>
                </div>
                <div style={{width:36,height:36,borderRadius:"50%",background:list.length>=max?"#fee2e2":"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:list.length>=max?"#dc2626":"#16a34a"}}>
                  {list.length}
                </div>
              </div>
              <div style={{display:"flex",gap:6,marginBottom:10}}>
                <input
                  value={newB[k]||""}
                  onChange={e=>setNewB(n=>({...n,[k]:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&addBrand(k)}
                  placeholder="Brand naam likho..."
                  disabled={list.length>=max}
                  style={{flex:1,padding:"7px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",opacity:list.length>=max?0.5:1}}
                />
                <ABtn onClick={()=>addBrand(k)} style={{padding:"7px 14px",fontSize:12,opacity:list.length>=max?0.5:1}}>+ Add</ABtn>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {list.map((b,i)=>(
                  <div key={b} style={{display:"flex",alignItems:"center",gap:4,background:"#f4f5f7",borderRadius:20,padding:"4px 10px",fontSize:11}}>
                    <span style={{color:"#374151",fontWeight:500}}>{b}</span>
                    <button onClick={()=>moveUp(k,i)} title="Move up" style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:10,padding:"0 2px"}}>↑</button>
                    <button onClick={()=>removeBrand(k,b)} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:13,padding:"0 2px",lineHeight:1}}>×</button>
                  </div>
                ))}
                {list.length===0&&<div style={{fontSize:11,color:"#9ca3af",fontStyle:"italic"}}>Koi brand nahi — upar se add karo</div>}
              </div>
            </ACard>
          );
        })}
      </div>
    </div>
  );
}



// ── Toast notification system ─────────────────────────────────
function useToast(){
  const[list,setList]=useState([]);
  useEffect(()=>{
    function handler(msg,type){
      const id=Date.now();
      setList(l=>[...l,{id,msg,type}]);
      setTimeout(()=>setList(l=>l.filter(t=>t.id!==id)),3500);
    }
    _toastListeners.push(handler);
    return()=>{_toastListeners=_toastListeners.filter(f=>f!==handler);};
  },[]);
  return{list};
}
function Toasts({list}){
  if(!list||!list.length)return null;
  return(
    <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:9999,display:"flex",flexDirection:"column",gap:8,alignItems:"center",pointerEvents:"none"}}>
      {list.map(t=>(
        <div key={t.id} style={{
          background:t.type==="error"?"#dc2626":t.type==="success"?"#16a34a":"#1a1612",
          color:"#fff",padding:"10px 20px",borderRadius:8,fontSize:13,fontWeight:500,
          boxShadow:"0 4px 20px rgba(0,0,0,.25)",
          animation:"toastIn .3s ease",whiteSpace:"nowrap",
        }}>{t.msg}</div>
      ))}
    </div>
  );
}


class ErrorBoundary extends React.Component{
  constructor(props){super(props);this.state={err:null};}
  static getDerivedStateFromError(e){return{err:e};}
  componentDidCatch(e,info){console.error("AdminPanel error:",e,info);}
  render(){
    if(this.state.err)return(
      <div style={{padding:40,textAlign:"center",fontFamily:"sans-serif",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#faf9f7"}}>
        <div style={{fontSize:48,marginBottom:16}}>⚠️</div>
        <div style={{fontWeight:700,fontSize:18,color:"#111",marginBottom:8}}>Kuch masla aa gaya</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:8,maxWidth:400,textAlign:"center"}}>{this.state.err?.message||"Unknown error"}</div>
        <div style={{fontSize:10,color:"#ccc",marginBottom:24,maxWidth:500,textAlign:"center",wordBreak:"break-all"}}>{this.state.err?.stack?.slice(0,200)}</div>
        <button onClick={()=>{this.setState({err:null});try{localStorage.clear();}catch{}window.location.reload();}} style={{background:"#111",color:"#fff",border:"none",padding:"12px 28px",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:600}}>Clear & Reload</button>
      </div>
    );
    return this.props.children;
  }
}


function AdminLogin({onSuccess,onCancel}){
  const[pass,setPass]=useState("");const[loading,setLoading]=useState(false);
  async function check(){setLoading(true);let ok=false;if(sb){const{data}=await sb.from("website_settings").select("value").eq("key","admin_pass").single();ok=data?.value===pass;}else ok=pass==="jameel@admin2026";setLoading(false);if(ok)onSuccess();else{setPass("");toast("Wrong password!","error");}}
  return(<div style={{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,.88)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(10px)"}}>
    <div style={{background:"var(--t-bg)",padding:"44px 40px",width:"100%",maxWidth:360,textAlign:"center"}}>
      <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:24,fontWeight:700,color:"var(--t-text)",marginBottom:4}}>Admin Panel</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"var(--t-muted)",fontStyle:"italic",marginBottom:32}}>Jameel Fabrics</div>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&check()} style={{width:"100%",border:"none",borderBottom:"1px solid #d0ccc5",padding:"12px 0",fontSize:17,color:"var(--t-text)",outline:"none",textAlign:"center",letterSpacing:5,marginBottom:24,fontFamily:"inherit",background:"transparent"}} onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#d0ccc5"}/>
      <button onClick={check} disabled={loading} style={{width:"100%",background:"#111",color:"#fff",border:"none",padding:14,fontSize:10,fontWeight:700,letterSpacing:3.5,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",textTransform:"uppercase",marginBottom:12,opacity:loading?.6:1}} onMouseEnter={e=>!loading&&(e.currentTarget.style.background="#2a2520")} onMouseLeave={e=>e.currentTarget.style.background="#111"}>{loading?"Verifying...":"Unlock"}</button>
      <button onClick={onCancel} style={{background:"none",border:"none",color:"#8a7f76",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
    </div>
  </div>);
}

const ACard=({children,style})=><div style={{background:"var(--t-card)",border:"1px solid #e5e7eb",borderRadius:10,...style}}>{children}</div>;
const ABtn=({sm,children,...p})=><button {...p} style={{display:"inline-flex",alignItems:"center",gap:6,padding:sm?"5px 12px":"9px 18px",borderRadius:6,fontSize:sm?11:13,fontWeight:500,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .15s",...p.style}}>{children}</button>;
function AI({...p}){return<input {...p} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"var(--t-text)",outline:"none",fontFamily:"inherit",...p.style}} onFocus={e=>{e.target.style.borderColor="#111";p.onFocus&&p.onFocus(e);}} onBlur={e=>{e.target.style.borderColor="#e5e7eb";p.onBlur&&p.onBlur(e);}}/>;}
function AS({children,...p}){return<select {...p} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"var(--t-text)",outline:"none",fontFamily:"inherit",cursor:"pointer",...p.style}}>{children}</select>;}
const Bdg=({c,children})=><span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:c==="g"?"#dcfce7":c==="y"?"#fef9c3":c==="r"?"#fee2e2":c==="b"?"#dbeafe":"#f3f4f6",color:c==="g"?"#16a34a":c==="y"?"#ca8a04":c==="r"?"#dc2626":c==="b"?"#2563eb":"#6b7280"}}>{children}</span>;
const AH=({title,sub})=><div style={{marginBottom:22}}><div style={{fontSize:22,fontWeight:700,fontFamily:"var(--t-hf,'Playfair Display',serif)",marginBottom:4,color:"var(--t-text)"}}>{title}</div>{sub&&<div style={{fontSize:13,color:"#6b7280"}}>{sub}</div>}</div>;
const ALbl=({c})=><div style={{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5,marginBottom:5}}>{c}</div>;

function ADash({prods,orders,alerts,pending,todayOrders,todayRev,onNav}){
  const stats=[
    {l:"Today's Orders",v:todayOrders?.length||0,ic:<OrdIc/>,bg:"#fef3c7",ibc:"#92400e",change:"Today"},
    {l:"Revenue (Today)",v:"Rs."+(todayRev||0).toLocaleString(),ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,bg:"#dcfce7",ibc:"#16a34a",change:"Active"},
    {l:"Active Products",v:prods?.filter(p=>p.active).length||0,ic:<ProdIc/>,bg:"#dbeafe",ibc:"#2563eb",change:(pending?.length||0)+" pending"},
    {l:"Total Orders",v:orders?.length||0,ic:<ChartIc/>,bg:"#fee2e2",ibc:"#dc2626",change:"All time"},
  ];
  const barH=[45,70,55,88,60,95,38];
  const barD=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return(<div>
    {/* Header */}
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,gap:12,flexWrap:"wrap"}}>
      <div><div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:22,fontWeight:700,color:"#111827"}}>Good Morning 👋</div><div style={{fontSize:13,color:"#6b7280",marginTop:3}}>Here's what's happening with your store today</div></div>
      <button onClick={()=>onNav("products")} style={{background:"#0f0d0a",color:"#fff",border:"none",padding:"9px 18px",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}} onMouseEnter={e=>e.currentTarget.style.background="#2a2520"} onMouseLeave={e=>e.currentTarget.style.background="#0f0d0a"}>+ Add Product</button>
    </div>
    {/* Stats */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16,marginBottom:20}}>
      {stats.map(s=><div key={s.l} style={{background:"var(--t-card)",border:"1px solid #e5e7eb",borderRadius:12,padding:20,transition:"box-shadow .2s",cursor:"default"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 6px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5}}>{s.l}</div>
          <div style={{width:36,height:36,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",color:s.ibc}}>{s.ic}</div>
        </div>
        <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:26,fontWeight:700,color:"#111827",marginBottom:4}}>{s.v}</div>
        <div style={{fontSize:12,color:"#9ca3af"}}>{s.change}</div>
      </div>)}
    </div>
    {/* Chart + Alerts */}
    <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:16,marginBottom:16}} className="two-col">
      {/* Chart */}
      <div className="adm-card">
        <div style={{padding:"16px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{fontSize:15,fontWeight:600,color:"#111827"}}>Sales This Week</div><div style={{fontSize:12,color:"#6b7280",marginTop:2}}>Daily orders count</div></div>
          <span style={{background:"#dcfce7",color:"#16a34a",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>● Live</span>
        </div>
        <div style={{padding:20}}>
          <div style={{display:"flex",alignItems:"flex-end",gap:8,height:140,paddingTop:20}}>
            {barH.map((h,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6,height:"100%"}}>
                <div style={{width:"100%",background:i===6?"#f3f4f6":"linear-gradient(to top,#c9a84c,#e8d5a3)",borderRadius:"4px 4px 0 0",height:h+"%",border:i===6?"1px dashed #e5e7eb":"none",cursor:"pointer",transition:"filter .2s"}} onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.1)"} onMouseLeave={e=>e.currentTarget.style.filter="none"}/>
                <div style={{fontSize:9,color:"#9ca3af"}}>{barD[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick alerts */}
      <div className="adm-card">
        <div style={{padding:"16px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:15,fontWeight:600,color:"#111827"}}>Alerts</div>
          {alerts?.length||0>0&&<span style={{background:"#fee2e2",color:"#dc2626",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{alerts?.length||0} urgent</span>}
        </div>
        <div>
          {!alerts?.length?<div style={{padding:32,textAlign:"center",color:"#9ca3af",fontSize:13}}>All clear ✓</div>:
            alerts.slice(0,3).map(a=><div key={a.id} style={{padding:"14px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:a.alert_type==="sold"||a.type==="sold_out"?"#ef4444":"#f59e0b",marginTop:4,flexShrink:0}}/>
              <div><div style={{fontSize:13,fontWeight:600,color:"#111827"}}>{a.product_name}</div><div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{a.message}</div></div>
            </div>)
          }
          {(pending?.length||0>0)&&<div style={{padding:"14px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#c9a84c",marginTop:4,flexShrink:0}}/>
            <div><div style={{fontSize:13,fontWeight:600,color:"#111827"}}>{pending?.length||0} Products Pending</div><div style={{fontSize:11,color:"#6b7280",marginTop:2}}>ERP se aaye — approval chahiye</div></div>
          </div>}
        </div>
      </div>
    </div>
    {/* Recent orders table */}
    <div className="adm-card">
      <div style={{padding:"16px 20px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div><div style={{fontSize:15,fontWeight:600,color:"#111827"}}>Recent Orders</div><div style={{fontSize:12,color:"#6b7280",marginTop:2}}>Latest WhatsApp orders</div></div>
        <button onClick={()=>onNav("orders")} style={{background:"transparent",border:"1px solid #e5e7eb",padding:"6px 14px",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151"}} onMouseEnter={e=>e.currentTarget.style.background="#f4f5f7"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>View All</button>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["Order","Customer","Items","Total","Status","Time"].map(h=><th key={h} className="adm-th">{h}</th>)}</tr></thead>
          <tbody>
            {!orders?.length?<tr><td colSpan={6} style={{padding:40,textAlign:"center",color:"#9ca3af"}}>No orders yet</td></tr>:
              orders.slice(0,5).map(o=><tr key={o.id}>
                <td className="adm-td"><span style={{fontWeight:700,color:"var(--t-accent)",fontSize:12}}>#{o.id.slice(-6).toUpperCase()}</span></td>
                <td className="adm-td"><div style={{fontWeight:500,fontSize:13}}>{o.customer_name||"Customer"}</div><div style={{fontSize:11,color:"#6b7280"}}>{o.customer_email||""}</div></td>
                <td className="adm-td" style={{color:"#6b7280"}}>{(o.items||[]).length} items</td>
                <td className="adm-td"><span style={{fontWeight:700}}>Rs.{Number(o.total||0).toLocaleString()}</span></td>
                <td className="adm-td"><span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:o.status==="pending"?"#fef9c3":o.status==="confirmed"?"#dcfce7":"#dbeafe",color:o.status==="pending"?"#ca8a04":o.status==="confirmed"?"#16a34a":"#2563eb"}}>{o.status}</span></td>
                <td className="adm-td" style={{fontSize:12,color:"#9ca3af"}}>{new Date(o.created_at).toLocaleString()}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>);
}

function APending({pending,onRefresh}){
  async function approve(p){if(!sb)return;await sb.from("products").update({website_status:"approved",active:true}).eq("id",p.id);toast("Approved! Website pe live","success");onRefresh();}
  async function ignore(p){if(!sb)return;await sb.from("products").update({website_status:"ignored"}).eq("id",p.id);toast("Ignored");onRefresh();}
  return(<div><AH title="Pending Approval" sub="ERP se aaye products — approve ya ignore karo"/>
    {!pending.length?<ACard style={{padding:48,textAlign:"center",color:"#9ca3af"}}><div style={{fontSize:36,marginBottom:12}}>✓</div><div style={{fontWeight:600}}>No pending products</div></ACard>:
      pending.map(p=><ACard key={p.id} style={{padding:16,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:58,background:"#f5f2ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:"1px solid #e5e7eb",flexShrink:0,overflow:"hidden"}}>{(p.img1||p.photo_url)?<img src={p.img1||p.photo_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(p.icon||"👗")}</div>
          <div><div style={{fontWeight:700,fontSize:15,color:"var(--t-text)"}}>{p.name}</div><div style={{fontSize:12,color:"#9ca3af",marginTop:3}}>{CAT_L[p.cat]||p.category||""} - Rs.{Number(p.sale_price||p.price||0).toLocaleString()} - Stock: {p.real_stock||p.stock||0}</div><div style={{display:"flex",gap:6,marginTop:6}}><Bdg c="">ERP</Bdg><Bdg c="y">Pending</Bdg></div></div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <ABtn onClick={()=>approve(p)} style={{background:"#111",color:"#fff"}}>✓ Approve</ABtn>
          <ABtn onClick={()=>ignore(p)} style={{background:"transparent",color:"#6b7280",border:"1px solid #e5e7eb"}}>Ignore</ABtn>
        </div>
      </ACard>)
    }
  </div>);
}
function AAlerts({alerts,onRefresh}){
  async function minus(a){if(!sb)return;if(a.product_id){const{data:p}=await sb.from("products").select("real_stock,stock").eq("id",a.product_id).single();if(p)await sb.from("products").update({real_stock:Math.max(0,(p.real_stock||p.stock||0)-1)}).eq("id",a.product_id);}await sb.from("website_alerts").update({resolved:true}).eq("id",a.id);toast("-1 done","success");onRefresh();}
  async function remove(a){if(!sb)return;if(a.product_id)await sb.from("products").update({active:false,website_status:"removed"}).eq("id",a.product_id);await sb.from("website_alerts").update({resolved:true}).eq("id",a.id);toast("Removed","success");onRefresh();}
  async function resolve(a){if(!sb)return;await sb.from("website_alerts").update({resolved:true}).eq("id",a.id);toast("Resolved");onRefresh();}
  return(<div><AH title="Stock Alerts" sub="ERP pe sale hone ke baad updates"/>
    {!alerts.length?<ACard style={{padding:48,textAlign:"center",color:"#9ca3af"}}><div style={{fontSize:36,marginBottom:12}}>✓</div><div style={{fontWeight:600}}>No alerts</div></ACard>:
      alerts.map(a=><div key={a.id} style={{background:"var(--t-card)",border:"1px solid #e5e7eb",borderLeft:"3px solid "+(a.alert_type==="sold"||a.type==="sold_out"?"#ef4444":"#f59e0b"),borderRadius:8,padding:14,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,borderRadius:8,background:a.alert_type==="sold"||a.type==="sold_out"?"#fee2e2":"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{a.alert_type==="sold"||a.type==="sold_out"?"X":"!"}</div>
          <div><div style={{fontWeight:600,fontSize:13,color:"var(--t-text)"}}>{a.product_name}</div><div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{a.message}</div>{a.qty_remaining!=null&&<div style={{fontSize:11,color:"#ef4444",fontWeight:700,marginTop:2}}>Remaining: {a.qty_remaining}</div>}</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <ABtn sm onClick={()=>minus(a)} style={{background:"#fee2e2",color:"#dc2626"}}>-1 Stock</ABtn>
          <ABtn sm onClick={()=>remove(a)} style={{background:"#111",color:"#fff"}}>Remove</ABtn>
          <ABtn sm onClick={()=>resolve(a)} style={{background:"transparent",color:"#9ca3af",border:"1px solid #e5e7eb"}}>Ignore</ABtn>
        </div>
      </div>)
    }
  </div>);
}
function AProducts({products,onRefresh}){
  const[editP,setEditP]=useState(null);const[form,setForm]=useState({});
  const[prodTab,setProdTab]=useState("web"); // "web" | "erp"
  function open(p){setEditP(p);setForm({...p,sizes:(p.sizes||[]).join(",")});}
  async function save(){
    if(!sb||!form.name){toast("Name required","error");return;}
    const data={...form,sizes:form.sizes?form.sizes.split(",").map(s=>s.trim()).filter(Boolean):[],active:form.active!==false,website_status:form.website_status||"approved",sale_price:parseFloat(form.sale_price||form.price)||0,price:parseFloat(form.sale_price||form.price)||0};
    let err=null;
    if(editP?.id&&editP.id!=="new"){
      const res=await sb.from("products").update(data).eq("id",editP.id);
      err=res.error;
    }else{
      const res=await sb.from("products").insert({...data,website_status:"approved",active:true});
      err=res.error;
    }
    if(err){
      if(err.message?.includes("RLS")||err.message?.includes("policy")||err.code==="42501"||err.code==="42000"||err.message?.includes("violates")||err.message?.includes("permission")){
        toast("⚠️ RLS Error — Supabase SQL Editor mein yeh run karo: DROP POLICY IF EXISTS \"Anyone can manage products\" ON products; CREATE POLICY \"open_products\" ON products FOR ALL USING (true) WITH CHECK (true);","error");
        console.error("RLS Error:",err);
      }else{
        toast("Error: "+err.message,"error");
      }
      return;
    }
    toast("✅ Saved!","success");setEditP(null);onRefresh();
  }
  async function toggle(p){if(!sb)return;await sb.from("products").update({active:!p.active}).eq("id",p.id);onRefresh();}
  async function toggleFeatured(p){if(!sb)return;await sb.from("products").update({featured:!p.featured}).eq("id",p.id);toast(p.featured?"Removed from featured":"⭐ Marked featured!");onRefresh();}
  async function del(p){if(!sb||!window.confirm("Delete "+p.name+"?"))return;await sb.from("products").delete().eq("id",p.id);toast("Deleted");onRefresh();}
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12}}>
      <AH title="Products" sub={products.length+" total"}/>
      <ABtn onClick={()=>open({id:"new"})} style={{background:"#111",color:"#fff"}}>+ Add Product</ABtn>
    </div>
    {editP&&(
      <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"var(--t-card)",width:"100%",maxWidth:640,maxHeight:"90vh",overflowY:"auto",borderRadius:10,boxShadow:"0 25px 60px rgba(0,0,0,.25)"}}>
          <div style={{padding:"20px 24px",borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"var(--t-card)",zIndex:1}}>
            <div style={{fontSize:16,fontWeight:600,color:"var(--t-text)"}}>{editP.id==="new"?"Add Product":"Edit Product"}</div>
            <button onClick={()=>setEditP(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#9ca3af"}}>x</button>
          </div>
          <div style={{padding:24}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
              <div><ALbl c="Name *"/><AI value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Product name"/></div>
              <div><ALbl c="Category"/><AS value={form.cat||"WU"} onChange={e=>setForm({...form,cat:e.target.value})}><option value="WU">Women Unstitch</option><option value="WS">Women Stitch</option><option value="RS">Reshmi Suiting</option><option value="AB">Abayas</option><option value="MP">Mens Plain</option><option value="ME">Mens Embroidery</option><option value="KU">Kids Unstitch</option><option value="BS">Bedsheets</option><option value="BL">Blankets</option><option value="OT">Others</option><option value="HOT">Hot Sale</option><option value="NEW">New Arrivals</option><option value="2PC">2-Piece Sets</option></AS></div>
              <div><ALbl c="Price (Rs.) *"/><AI type="number" value={form.sale_price||form.price||""} onChange={e=>setForm({...form,sale_price:e.target.value,price:e.target.value})} placeholder="3500"/></div>
              <div><ALbl c="Old Price (Sale)"/><AI type="number" value={form.old_price||""} onChange={e=>setForm({...form,old_price:e.target.value})} placeholder="Leave empty"/></div>
              <div><ALbl c="Discount %"/><AI type="number" placeholder="e.g. 20 auto" onChange={e=>{const d=parseFloat(e.target.value);if(d&&(form.sale_price||form.price)){const o=parseFloat(form.sale_price||form.price);setForm({...form,old_price:o,sale_price:Math.round(o*(1-d/100)),price:Math.round(o*(1-d/100))});}}}/></div>
              <div><ALbl c="Real Stock (hidden)"/><AI type="number" value={form.real_stock||""} onChange={e=>setForm({...form,real_stock:e.target.value})} placeholder="10"/></div>
              <div style={{gridColumn:"1/-1"}}><ALbl c="Display Stock Text"/><AI value={form.display_stock_text||""} onChange={e=>setForm({...form,display_stock_text:e.target.value})} placeholder="e.g. Last 5 Pieces!"/></div>
              <div><ALbl c="Badge"/><AS value={form.badge||""} onChange={e=>setForm({...form,badge:e.target.value})}><option value="">None</option><option>NEW</option><option>SALE</option><option>HOT</option></AS></div>
              <div><ALbl c="Sizes (comma)"/><AI value={form.sizes||""} onChange={e=>setForm({...form,sizes:e.target.value})} placeholder="S,M,L,XL"/></div>
              <div><ALbl c="Brand Name"/>
                <BrandDropdown cat={form.cat||form.category||""} value={form.brand||""} onChange={v=>setForm({...form,brand:v})}/></div>
              <div><ALbl c="Fabric Feel"/><AS value={form.feel||""} onChange={e=>setForm({...form,feel:e.target.value})}><option value="">Not specified</option>{FEEL_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</AS></div>
              <div><ALbl c="Season"/><AS value={form.season||""} onChange={e=>setForm({...form,season:e.target.value})}><option value="">Not specified</option>{SEASON_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</AS></div>
              <div><ALbl c="Care Instructions"/><AS value={form.care||""} onChange={e=>setForm({...form,care:e.target.value})}><option value="">Not specified</option>{CARE_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</AS></div>
              <div style={{gridColumn:"1/-1"}}><ALbl c="Color / Description"/><AI value={form.color||""} onChange={e=>setForm({...form,color:e.target.value})}/></div>
            </div>
            <ALbl c="Product Images (5 slots)"/>
            <div style={{display:"grid",gap:8,marginTop:6}}>
              {[1,2,3,4,5].map(n=>(
                <div key={n} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:42,height:50,background:"#f5f2ee",border:"1px solid "+(form["img"+n]||form["photo_url"+(n===1?"":n)]?"#111":"#e5e7eb"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:n===1?16:12,flexShrink:0,overflow:"hidden"}}>
                    {(form["img"+n]||form["photo_url"+(n===1?"":n)])?<img src={form["img"+n]||form["photo_url"+(n===1?"":n)]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(n===1?"img":"+")}
                  </div>
                  <AI value={form["img"+n]||form["photo_url"+(n===1?"":n)]||""} onChange={e=>setForm({...form,["img"+n]:e.target.value,["photo_url"+(n===1?"":n)]:e.target.value})} placeholder={"Image "+n+(n===1?" (main — URL ya upload karo)":"")} style={{flex:1}}/>
                  <label style={{flexShrink:0,background:"var(--t-surface)",border:"1px solid #d0ccc5",padding:"8px 10px",cursor:"pointer",fontSize:11,fontWeight:600,color:"var(--t-muted)",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    Upload
                    <input type="file" accept="image/*" style={{display:"none"}} onChange={async(e)=>{
                      const file=e.target.files[0];
                      if(!file||!sb)return;
                      const ext=file.name.split('.').pop();
                      const path="products/"+Date.now()+"-"+n+"."+ext;
                      const{data,error}=await sb.storage.from("product-images").upload(path,file,{upsert:true});
                      if(error){toast("Upload failed: "+error.message,"error");return;}
                      const{data:{publicUrl}}=sb.storage.from("product-images").getPublicUrl(path);
                      setForm(f=>({...f,["img"+n]:publicUrl,["photo_url"+(n===1?"":n)]:publicUrl}));
                      toast("Image "+n+" uploaded!","success");
                    }}/>
                  </label>
                </div>
              ))}
            </div>
            <div style={{marginTop:14}}><ALbl c="Product Video URL (YouTube / MP4 link)"/><AI value={form.video_url||""} onChange={e=>setForm({...form,video_url:e.target.value})} placeholder="https://youtube.com/watch?v=... or .mp4 url"/></div>
            <div style={{marginTop:10}}><ALbl c="WA Note"/><textarea value={form.note||""} onChange={e=>setForm({...form,note:e.target.value})} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"var(--t-text)",outline:"none",fontFamily:"inherit",minHeight:60,resize:"vertical"}} placeholder="Note for WA order..."/></div>
            <div style={{display:"flex",gap:20,marginTop:14}}>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}><input type="checkbox" checked={form.active!==false} onChange={e=>setForm({...form,active:e.target.checked})} style={{accentColor:"#111"}}/>Show on website</label>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}><input type="checkbox" checked={form.featured||false} onChange={e=>setForm({...form,featured:e.target.checked})} style={{accentColor:"#111"}}/>Featured</label>
            </div>
          </div>
          <div style={{padding:"16px 24px",borderTop:"1px solid #e5e7eb",display:"flex",justifyContent:"flex-end",gap:8,position:"sticky",bottom:0,background:"var(--t-card)"}}>
            <ABtn onClick={()=>setEditP(null)} style={{background:"transparent",color:"#6b7280",border:"1px solid #e5e7eb"}}>Cancel</ABtn>
            <ABtn onClick={save} style={{background:saved?"#16a34a":"#111",color:"#fff",transition:"background .3s"}}>{saving?"Saving...":saved?"✓ Saved":"Save"}</ABtn>
          </div>
        </div>
      </div>
    )}
    <ACard><div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb"}}>{["Product","Category","Price","Stock Text","Status","Actions"].map(h=><th key={h} style={{padding:"10px 16px",fontSize:11,fontWeight:600,color:"#6b7280",textAlign:"left",textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
        <tbody>
          {products.map(p=><tr key={p.id} style={{borderBottom:"1px solid #f3f4f6"}}>
            <td style={{padding:"12px 16px"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:40,height:48,background:"#f5f2ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,border:"1px solid #e5e7eb",flexShrink:0,overflow:"hidden"}}>{(p.img1||p.photo_url)?<img src={p.img1||p.photo_url} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(p.icon||CAT_EMOJI[p.cat]||"🛍️")}</div><div><div style={{fontWeight:600,fontSize:13,color:"var(--t-text)"}}>{p.name}{p.featured&&<span style={{marginLeft:6,fontSize:10,background:"#fef3c7",color:"#d97706",padding:"1px 6px",borderRadius:4,border:"1px solid #fbbf24",fontWeight:700}}>⭐ Featured</span>}</div><div style={{fontSize:11,color:"#9ca3af"}}>{p.color||""}</div></div></div></td>
            <td style={{padding:"12px 16px",fontSize:12,color:"#6b7280"}}>{CAT_L[p.cat]||p.category||""}</td>
            <td style={{padding:"12px 16px"}}><div style={{fontWeight:600,color:p.old_price?"#b91c1c":"#111"}}>Rs.{Number(p.sale_price||p.price||0).toLocaleString()}</div>{p.old_price&&<div style={{fontSize:11,textDecoration:"line-through",color:"#9ca3af"}}>Rs.{Number(p.old_price).toLocaleString()}</div>}</td>
            <td style={{padding:"12px 16px",fontSize:12,color:"var(--t-muted)",fontStyle:"italic"}}>{p.display_stock_text||"In Stock"}</td>
            <td style={{padding:"12px 16px"}}><Bdg c={p.active?"g":""}>{p.active?"Active":"Hidden"}</Bdg></td>
            <td style={{padding:"12px 16px"}}><div style={{display:"flex",gap:4}}>
              <ABtn sm onClick={()=>open(p)} style={{background:"transparent",border:"1px solid #e5e7eb",color:"#374151"}}>Edit</ABtn>
              <ABtn sm onClick={()=>toggle(p)} style={{background:"transparent",border:"1px solid #e5e7eb",color:"#374151"}}>{p.active?"Hide":"Show"}</ABtn>
              <ABtn sm onClick={()=>toggleFeatured(p)} title="Toggle featured" style={{background:p.featured?"#fef3c7":"transparent",border:"1px solid "+(p.featured?"#fbbf24":"#e5e7eb"),color:p.featured?"#d97706":"#9ca3af"}}>{p.featured?"⭐":"☆"}</ABtn>
              <ABtn sm onClick={()=>del(p)} style={{background:"#fee2e2",color:"#dc2626"}}>Del</ABtn>
            </div></td>
          </tr>)}
          {!products.length&&<tr><td colSpan={6} style={{padding:44,textAlign:"center",color:"#9ca3af"}}>No products yet</td></tr>}
        </tbody>
      </table>
    </div></ACard>
  </div>);
}
function AOrders({orders,wa}){
  const[list,setList]=useState(orders||[]);
  useEffect(()=>setList(orders||[]),[orders]);
  async function upd(id,status){
    if(!sb)return;
    await sb.from("online_orders").update({status}).eq("id",id);
    setList(l=>l.map(o=>o.id===id?{...o,status}:o));
    toast("Status: "+status,"success");
  }
  async function del(id){
    if(!sb||!window.confirm("Delete this order?"))return;
    await sb.from("online_orders").delete().eq("id",id);
    setList(l=>l.filter(o=>o.id!==id));
    toast("Order deleted","success");
  }
  return(<div><AH title="Orders" sub="WhatsApp se aaye orders"/>
    <ACard><div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb"}}>{["Order","Customer","Items","Total","Status","Date","Actions"].map(h=><th key={h} style={{padding:"10px 14px",fontSize:11,fontWeight:600,color:"#6b7280",textAlign:"left",textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
        <tbody>
          {list.map(o=><tr key={o.id} style={{borderBottom:"1px solid #f3f4f6"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"var(--t-accent)",fontSize:12}}>#{o.id.slice(-6).toUpperCase()}</td>
            <td style={{padding:"12px 14px"}}><div style={{fontWeight:600,fontSize:13,color:"var(--t-text)"}}>{o.customer_name||"Customer"}</div><div style={{fontSize:11,color:"#9ca3af"}}>{o.customer_email||""}</div></td>
            <td style={{padding:"12px 14px",fontSize:12,color:"#6b7280"}}>{(o.items||[]).length}</td>
            <td style={{padding:"12px 14px",fontWeight:700,fontSize:13}}>Rs.{Number(o.total).toLocaleString()}</td>
            <td style={{padding:"12px 14px"}}><Bdg c={o.status==="pending"?"y":o.status==="confirmed"?"g":"b"}>{o.status}</Bdg></td>
            <td style={{padding:"12px 14px",fontSize:11,color:"#9ca3af"}}>{new Date(o.created_at).toLocaleString("en-PK",{timeZone:"Asia/Karachi",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}</td>
            <td style={{padding:"12px 14px"}}><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {o.status==="pending"&&<ABtn sm onClick={()=>upd(o.id,"confirmed")} style={{background:"#dcfce7",color:"#16a34a"}}>✓ Confirm</ABtn>}
              {o.status==="confirmed"&&<ABtn sm onClick={()=>upd(o.id,"delivered")} style={{background:"#dbeafe",color:"#2563eb"}}>Delivered</ABtn>}
              {o.status==="delivered"&&<ABtn sm onClick={()=>upd(o.id,"confirmed")} style={{background:"#f3f4f6",color:"#374151"}}>↩ Undo</ABtn>}
              <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer"><ABtn sm style={{background:"#25D366",color:"#fff"}}>WA</ABtn></a>
              <ABtn sm onClick={()=>del(o.id)} style={{background:"#fee2e2",color:"#dc2626"}}>Del</ABtn>
            </div></td>
          </tr>)}
          {!list.length&&<tr><td colSpan={7} style={{padding:44,textAlign:"center",color:"#9ca3af"}}>No orders yet</td></tr>}
        </tbody>
      </table>
    </div></ACard>
  </div>);
}
function ACoupons({coupons,onRefresh}){
  const[f,setF]=useState({code:"",type:"percent",value:"",min_order:"",expires_at:"",active:true});
  async function save(){if(!sb||!f.code||!f.value){toast("Code and value required","error");return;}await sb.from("coupons").insert({...f,code:f.code.toUpperCase(),value:parseFloat(f.value),min_order:parseFloat(f.min_order)||0,expires_at:f.expires_at||null});toast("Created!","success");setF({code:"",type:"percent",value:"",min_order:"",expires_at:"",active:true});onRefresh();}
  async function del(id){if(!sb||!window.confirm("Delete?"))return;await sb.from("coupons").delete().eq("id",id);onRefresh();}
  async function toggle(id,active){if(!sb)return;await sb.from("coupons").update({active:!active}).eq("id",id);onRefresh();}
  return(<div><AH title="Coupons" sub="Discount codes manage karo"/>
    <ACard style={{padding:20,marginBottom:20}}>
      <div style={{fontSize:15,fontWeight:600,marginBottom:14,color:"var(--t-text)"}}>Create Coupon</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{gridColumn:"1/-1"}}><ALbl c="Code *"/><AI value={f.code} onChange={e=>setF({...f,code:e.target.value.toUpperCase()})} placeholder="e.g. SAVE20" style={{fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}/></div>
        <div><ALbl c="Type"/><AS value={f.type} onChange={e=>setF({...f,type:e.target.value})}><option value="percent">Percentage (%)</option><option value="flat">Fixed (Rs.)</option></AS></div>
        <div><ALbl c="Value *"/><AI type="number" value={f.value} onChange={e=>setF({...f,value:e.target.value})} placeholder={f.type==="percent"?"20":"500"}/></div>
        <div><ALbl c="Min Order (Rs.)"/><AI type="number" value={f.min_order} onChange={e=>setF({...f,min_order:e.target.value})} placeholder="2000"/></div>
        <div><ALbl c="Expiry Date"/><AI type="date" value={f.expires_at} onChange={e=>setF({...f,expires_at:e.target.value})}/></div>
      </div>
      <ABtn onClick={save} style={{background:"#111",color:"#fff",marginTop:14}}>+ Create Coupon</ABtn>
    </ACard>
    {coupons.map(c=><ACard key={c.id} style={{padding:"16px 20px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
      <div><div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:20,fontWeight:700,letterSpacing:2,color:"var(--t-text)"}}>{c.code}</div><div style={{fontSize:12,color:"#9ca3af",marginTop:4}}>{c.type==="percent"?c.value+"%":"Rs."+c.value} off{c.min_order?" - Min Rs."+c.min_order:""}{c.expires_at?" - Expires "+new Date(c.expires_at).toLocaleDateString():""}</div><div style={{display:"flex",gap:6,marginTop:6}}><Bdg c={c.active?"g":""}>{c.active?"Active":"Inactive"}</Bdg><Bdg c="">{c.used_count||0} used</Bdg></div></div>
      <div style={{display:"flex",gap:6}}>
        <ABtn onClick={()=>toggle(c.id,c.active)} style={{background:c.active?"#fef9c3":"#dcfce7",color:c.active?"#92400e":"#16a34a"}}>{c.active?"Deactivate":"Activate"}</ABtn>
        <ABtn onClick={()=>del(c.id)} style={{background:"#fee2e2",color:"#dc2626"}}>Delete</ABtn>
      </div>
    </ACard>)}
  </div>);
}
function AContent({settings}){
  const[f,setF]=useState({});
  const[saving,setSaving]=useState(false);
  const[saved,setSaved]=useState(false);
  const[vidUploading,setVidUploading]=useState(false);
  const[debRef]=useState({});
  useEffect(()=>{
    if(settings&&Object.keys(settings).length>0){
      setF(prev=>({...settings,...prev})); // keep local unsaved changes on top
    }
  },[]);  // only on mount - don't override user edits

  // Auto-save individual field on change
  function updateF(key,val){
    setF(p=>({...p,[key]:val}));
    clearTimeout(debRef[key]);
    debRef[key]=setTimeout(async()=>{
      if(!sb)return;
      await sb.from("website_settings").upsert({key,value:String(val||"")},{onConflict:"key"});
    },1000);
  }

  async function saveAll(){
    if(!sb)return;setSaving(true);
    try{
      await Promise.all(Object.entries(f).map(([k,v])=>
        sb.from("website_settings").upsert({key:k,value:String(v||"")},{onConflict:"key"})
      ));
      setSaved(true);setTimeout(()=>setSaved(false),2500);
    }catch(e){alert("Error: "+e.message);}
    setSaving(false);
  }

  async function uploadVideo(file){
    if(!sb||!file)return;
    if(file.size>100*1024*1024)return alert("Max 100MB");
    setVidUploading(true);
    const ext=file.name.split(".").pop();
    const path="videos/"+Date.now()+"."+ext;
    const{data,error}=await sb.storage.from("videos").upload(path,file,{contentType:file.type,upsert:true});
    if(error){alert("Upload failed: "+error.message);setVidUploading(false);return;}
    const{data:{publicUrl}}=sb.storage.from("videos").getPublicUrl(path);
    updateF("video_url",publicUrl);updateF("video_show","true");
    setVidUploading(false);
  }

  async function uploadBanner(file){
    if(!file)return;
    if(!sb){alert("Supabase not connected");return;}
    // Try Supabase Storage first, fallback to base64
    try{
      const ext=file.name.split(".").pop();
      const path="banners/hero_"+Date.now()+"."+ext;
      const{data,error}=await sb.storage.from("images").upload(path,file,{contentType:file.type,upsert:true});
      if(!error){
        const{data:{publicUrl}}=sb.storage.from("images").getPublicUrl(path);
        updateF("hero_banner_url",publicUrl);
        updateF("hero_banner_show","true");
        return;
      }
    }catch{}
    // Fallback: base64 (small images only)
    if(file.size>500*1024){alert("Image too large (max 500KB). Supabase Storage bucket 'images' create karo.");return;}
    const r=new FileReader();
    r.onload=async ev=>{updateF("hero_banner_url",ev.target.result);updateF("hero_banner_show","true");};
    r.readAsDataURL(file);
  }

  // Sections config — visKey = the setting key for show/hide toggle
  const sections=[
    {t:"🏪 Store Info",fields:[["store_name","Store Name"],["addr1","Address Line 1"],["addr2","Address Line 2"],["map_url","Google Map Link (paste from Google Maps)"],["hours","Working Hours"],["phone","Phone Number"],["google_maps_url","Google Business Reviews URL"],["google_rating","Google Rating (e.g. 4.8)"]]},
    {t:"🔗 Social Links",fields:[["wa_number","WhatsApp Number"],["insta","Instagram URL"],["fb","Facebook URL"],["tiktok","TikTok URL"]]},
    {t:"📢 Announcement Bar",fields:[["announcement","Messages (pipe | se alag karo)",true]],visKey:"show_announcement",visDefault:"true"},
    {t:"🏠 Hero Section",fields:[["hlabel","Hero Label"],["hsub","Tagline"],["about","About Text",true]]},
    {t:"🏷️ Brand Ticker",fields:[["ticker_brands","Brands (· se alag karo)",true]],visKey:"show_brand_ticker",visDefault:"true"},
    {t:"📊 Stats",fields:[["sold_count","Sold Count Text"]]},
    {t:"🗺️ Countdown Timer",fields:[["sale_title","Sale Title"],["sale_text","Sale Subtitle"],["sale_end_date","End Date",false,true]],visKey:"show_countdown",visDefault:"true"},
    {t:"📖 Our Story",fields:[["our_story_title","Section Title"],["story_text","Story Text",true],["story_stat1","Stat 1 Number"],["story_label1","Stat 1 Label"],["story_stat2","Stat 2 Number"],["story_label2","Stat 2 Label"],["story_stat3","Stat 3 Number"],["story_label3","Stat 3 Label"]],visKey:"show_our_story",visDefault:"true"},
    {t:"✨ Why Choose Us",fields:[["why_us_title","Section Title"],["feat1_title","Feature 1 Title"],["feat1_desc","Feature 1 Desc"],["feat2_title","Feature 2 Title"],["feat2_desc","Feature 2 Desc"],["feat3_title","Feature 3 Title"],["feat3_desc","Feature 3 Desc"],["feat4_title","Feature 4 Title"],["feat4_desc","Feature 4 Desc"]],visKey:"show_why_us",visDefault:"true"},
    {t:"🌙 Eid Countdown",fields:[["eid_title","Banner Title (e.g. Eid Collection)"],["eid_subtitle","Subtitle Text"],["eid_date","Countdown Target Date",false,true]],visKey:"eid_show",visDefault:"false"},
  ];

  // Visibility-only sections (no text content to edit)
  const visSections=[
    {label:"🎁 Mystery Box Section",key:"show_mystery",def:"true"},
    {label:"🤖 AI Outfit Suggester",key:"show_ai_suggester",def:"true"},
    {label:"⭐ Reviews Section",key:"show_reviews",def:"true"},
    {label:"👑 VIP Collection",key:"show_vip",def:"true"},
    {label:"📦 Mystery Subscription Active",key:"sub_active",def:"true"},
  ];

  const AI2=({k,placeholder,rows=1})=>rows>1
    ?<textarea value={f[k]||""} onChange={e=>updateF(k,e.target.value)} rows={rows} placeholder={placeholder} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box"}}/>
    :<AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)} placeholder={placeholder}/>;

  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
      <AH title="📝 Website Content" sub="Changes auto-save"/>
      <ABtn onClick={saveAll} style={{background:saving?"#6b7280":saved?"#16a34a":"#111",color:"#fff",minWidth:100,transition:"background .3s"}}>
        {saving?"Saving...":saved?"✅ Saved":"💾 Save All"}
      </ABtn>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {sections.map(sec=>(
        <ACard key={sec.t} style={{padding:16,marginBottom:0}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:"var(--t-text)"}}>{sec.t}</div>
          {sec.fields.map(([k,l,isTextarea,isDate])=>(
            <div key={k} style={{marginBottom:10}}>
              <ALbl c={l}/>
              {isDate
                ?<AI type="date" value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/>
                :isTextarea
                  ?<textarea value={f[k]||""} onChange={e=>updateF(k,e.target.value)} rows={k==="story_text"||k==="about"?5:k==="ticker_brands"||k==="announcement"?4:3} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box"}}/>
                  :<AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/>
              }
            </div>
          ))}
          {sec.visKey&&(
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:12,marginTop:8,paddingTop:10,borderTop:"1px solid #f3f4f6"}}>
              <input type="checkbox" checked={f[sec.visKey]!=="false"&&(f[sec.visKey]||sec.visDefault||"true")!=="false"} onChange={e=>updateF(sec.visKey,e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:15,height:15,flexShrink:0}}/>
              <span style={{color:"#374151",fontWeight:500}}>Website pe dikhao</span>
            </label>
          )}
        </ACard>
      ))}

      {/* Visibility-only sections */}
      {visSections.map(vs=>(
        <ACard key={vs.key} style={{padding:16,marginBottom:0,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--t-text)"}}>{vs.label}</div>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:12,flexShrink:0}}>
            <input type="checkbox" checked={f[vs.key]!=="false"&&(f[vs.key]||vs.def||"true")!=="false"} onChange={e=>updateF(vs.key,e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:16,height:16}}/>
            <span style={{color:"#374151",fontWeight:500,whiteSpace:"nowrap"}}>{f[vs.key]==="false"?"Hidden":"Visible"}</span>
          </label>
        </ACard>
      ))}

      {/* Hero Banner Upload */}
      <ACard style={{padding:16}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:"var(--t-text)"}}>📸 Hero Banner / Post</div>
        <input type="file" accept="image/*" onChange={e=>uploadBanner(e.target.files[0])} style={{fontSize:11,marginBottom:8,display:"block",width:"100%"}}/>
        {f.hero_banner_url&&<img src={f.hero_banner_url} alt="" style={{width:"100%",maxHeight:100,objectFit:"cover",borderRadius:4,marginBottom:8}}/>}
        <ALbl c="Caption"/>
        <AI value={f.hero_banner_caption||""} onChange={e=>updateF("hero_banner_caption",e.target.value)} placeholder="e.g. Eid Sale — 30% Off"/>
        <label style={{display:"flex",alignItems:"center",gap:8,marginTop:8,paddingTop:8,borderTop:"1px solid #f3f4f6",cursor:"pointer",fontSize:12}}>
          <input type="checkbox" checked={f.hero_banner_show==="true"} onChange={e=>updateF("hero_banner_show",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c"}}/>
          <span style={{fontWeight:500}}>Website pe dikhao</span>
        </label>
      </ACard>

      {/* Video Upload */}
      <ACard style={{padding:16}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:"var(--t-text)"}}>🎥 Video Section</div>
        <ALbl c="Video Title"/><AI value={f.video_title||""} onChange={e=>updateF("video_title",e.target.value)} placeholder="e.g. Our Story"/>
        <div style={{marginTop:8}}><ALbl c="Upload Video (Mobile)"/></div>
        <input type="file" accept="video/*" capture="environment" onChange={e=>uploadVideo(e.target.files[0])} style={{fontSize:11,marginBottom:6,display:"block"}}/>
        {vidUploading&&<div style={{fontSize:11,color:"var(--t-accent)"}}>⏳ Uploading...</div>}
        {f.video_url&&!vidUploading&&<div style={{fontSize:11,color:"#16a34a",marginBottom:4}}>✅ Video ready</div>}
        <div style={{marginTop:4}}><ALbl c="Ya URL paste karo"/><AI value={f.video_url||""} onChange={e=>updateF("video_url",e.target.value)} placeholder="https://..."/></div>
        <label style={{display:"flex",alignItems:"center",gap:8,marginTop:8,paddingTop:8,borderTop:"1px solid #f3f4f6",cursor:"pointer",fontSize:12}}>
          <input type="checkbox" checked={f.video_show==="true"} onChange={e=>updateF("video_show",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:15,height:15}}/>
          <span style={{fontWeight:500}}>Website pe dikhao</span>
        </label>
      </ACard>
    </div>
  </div>);
}


// ══════════════════════════════════════════════════════════════
// ADMIN: TREND ALERT SYSTEM
// ══════════════════════════════════════════════════════════════
function ATrendAlerts({products}){
  const[slowProds,setSlowProds]=useState([]);
  const[subs,setSubs]=useState([]);
  const[sending,setSending]=useState(false);
  const[sent,setSent]=useState([]);
  const[discount,setDiscount]=useState(10);

  useEffect(()=>{
    if(!sb)return;
    // Mark products as slow-moving if stock > 20 and no recent order
    sb.from("subscriptions").select("email").then(({data})=>setSubs(data||[]));
  },[]);

  // Identify slow-moving products (high stock products without discount)
  const slowMoving=(products||[]).filter(p=>Number(p.stock||0)>15&&!p.is_trending);

  async function sendAlert(prod){
    if(!subs.length)return toast("No subscribers to alert","error");
    const dcPrice=Math.round(Number(prod.price||0)*(1-discount/100));
    const msg=`🛍️ *TREND ALERT — Jameel Fabrics*\n\n*${prod.name}* — Special ${discount}% OFF!\n\n💰 Was: Rs.${Number(prod.price||0).toLocaleString()}\n✅ Now: Rs.${dcPrice.toLocaleString()}\n\n📦 Stock available: ${prod.stock} pcs\n\n🛒 Order now via WhatsApp!\nwa.me/${WA_NUM}?text=Order: ${encodeURIComponent(prod.name)}`;
    setSending(true);
    // Save alert to DB
    await sb.from("website_alerts").insert({type:"trend_alert",product_id:prod.id,product_name:prod.name,discount_pct:discount,message:msg,sent_to:subs.length,created_at:new Date().toISOString()}).catch(()=>{});
    // Open WhatsApp broadcast link for first subscriber as demo
    window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(`*TREND ALERT BROADCAST*\n\nProduct: ${prod.name}\nDiscount: ${discount}%\nSubscribers: ${subs.length}\n\n${msg.slice(0,200)}...`)}`,"_blank");
    setSent(s=>[...s,prod.id]);
    setSending(false);
    toast(`Alert sent for ${prod.name} to ${subs.length} subscribers!`,"success");
  }

  return(<div>
    <AH title="📊 Trend Alert System" sub="Slow-moving products detect karo aur subscribers ko alert bhejo"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
      <ACard style={{padding:16}}><div style={{fontSize:28,fontWeight:800,color:"#c9a84c"}}>{slowMoving.length}</div><div style={{fontSize:12,color:"#6b7280"}}>Slow-Moving Products</div></ACard>
      <ACard style={{padding:16}}><div style={{fontSize:28,fontWeight:800,color:"#16a34a"}}>{subs.length}</div><div style={{fontSize:12,color:"#6b7280"}}>Subscribed Customers</div></ACard>
    </div>
    <div style={{marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
      <ALbl c="Discount %"/>
      <input type="number" value={discount} onChange={e=>setDiscount(Number(e.target.value))} min={5} max={50} style={{width:80,padding:"6px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none"}}/>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {slowMoving.length===0&&<div style={{textAlign:"center",padding:32,color:"#9ca3af"}}>No slow-moving products found</div>}
      {slowMoving.map(p=>(
        <ACard key={p.id} style={{padding:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontWeight:600,fontSize:13}}>{p.name}</div>
              <div style={{fontSize:12,color:"#6b7280"}}>Stock: {p.stock} pcs · Rs.{Number(p.price||0).toLocaleString()}</div>
            </div>
            {sent.includes(p.id)
              ?<span style={{fontSize:12,color:"#16a34a",fontWeight:600}}>✅ Alert Sent</span>
              :<ABtn onClick={()=>sendAlert(p)} disabled={sending} style={{background:"#c9a84c",color:"#0a0907",fontWeight:700,fontSize:12}}>📣 Send {discount}% Alert</ABtn>
            }
          </div>
        </ACard>
      ))}
    </div>
  </div>);
}

function ASubs(){
  const[tab,setTab]=useState("subscribers");
  const[newsletters,setNewsletters]=useState([]);
  const[subOrders,setSubOrders]=useState([]);
  const[loading,setLoading]=useState(false);

  useEffect(()=>{load();},[]);

  async function load(){
    if(!sb)return;
    setLoading(true);
    const[nlRes,boxRes]=await Promise.all([
      sb.from("subscribers").select("*").order("subscribed_at",{ascending:false}),
      sb.from("subscriptions").select("*").order("created_at",{ascending:false}),
    ]);
    setNewsletters(nlRes.data||[]);
    setSubOrders(boxRes.data||[]);
    setLoading(false);
  }

  async function delSub(id){
    if(!sb||!window.confirm("Delete subscriber?"))return;
    await sb.from("subscribers").delete().eq("id",id);
    setNewsletters(n=>n.filter(x=>x.id!==id));
    toast("Subscriber deleted","success");
  }

  async function delBox(id){
    if(!sb||!window.confirm("Delete box order?"))return;
    await sb.from("subscriptions").delete().eq("id",id);
    setSubOrders(n=>n.filter(x=>x.id!==id));
    toast("Deleted","success");
  }

  async function updBoxStatus(id,status){
    if(!sb)return;
    await sb.from("subscriptions").update({status}).eq("id",id);
    setSubOrders(n=>n.map(x=>x.id===id?{...x,status}:x));
    toast("Status updated","success");
  }

  function expSubs(){
    const csv="Email,Date\n"+newsletters.map(s=>s.email+","+new Date(s.subscribed_at||"").toLocaleDateString()).join("\n");
    const a=document.createElement("a");a.href="data:text/csv,"+encodeURIComponent(csv);a.download="subscribers.csv";a.click();
  }

  const tabs=[["subscribers","📧 Newsletter ("+newsletters.length+")"],["boxes","📦 Box Orders ("+subOrders.length+")"]];

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <AH title="Subscribers & Users"/>
        <ABtn onClick={expSubs} style={{background:"#111",color:"#fff",fontSize:10}}>⬇️ Export CSV</ABtn>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:16,borderBottom:"1px solid #e5e7eb",paddingBottom:10}}>
        {tabs.map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",fontSize:11,fontWeight:600,border:`1px solid ${tab===t?"#111":"#e5e7eb"}`,background:tab===t?"#111":"transparent",color:tab===t?"#fff":"#6b7280",borderRadius:4,cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      {loading&&<div style={{textAlign:"center",padding:32,color:"#9ca3af"}}>🔄 Loading...</div>}

      {tab==="subscribers"&&!loading&&<>
        {newsletters.length===0?<div style={{textAlign:"center",padding:40,color:"#9ca3af"}}>No subscribers yet</div>:(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {newsletters.map((s,i)=>(
              <div key={s.id||i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb"}}>
                <span style={{fontSize:13,color:"var(--t-text)"}}>{s.email}</span>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:11,color:"#9ca3af"}}>{s.subscribed_at?new Date(s.subscribed_at).toLocaleDateString():""}</span>
                  <ABtn sm onClick={()=>delSub(s.id)} style={{background:"#fee2e2",color:"#dc2626"}}>Del</ABtn>
                </div>
              </div>
            ))}
          </div>
        )}
      </>}

      {tab==="boxes"&&!loading&&<>
        {subOrders.length===0?<div style={{textAlign:"center",padding:40,color:"#9ca3af"}}>No box orders yet</div>:(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {subOrders.map((o,i)=>(
              <div key={o.id||i} style={{padding:"12px 14px",background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:13,color:"var(--t-text)"}}>{o.name}</div>
                    <div style={{fontSize:11,color:"#6b7280"}}>📞 {o.phone} · {o.address}</div>
                    <div style={{display:"flex",gap:8,marginTop:4}}>
                      <span style={{fontSize:10,background:"#fef3c7",color:"#92400e",padding:"2px 8px",borderRadius:10,fontWeight:600}}>{o.tier||"—"}</span>
                      <span style={{fontSize:10,background:"#ede9fe",color:"#4c1d95",padding:"2px 8px",borderRadius:10,fontWeight:600}}>{o.gender||"—"}</span>
                      <span style={{fontSize:10,background:o.status==="pending"?"#fee2e2":"#d1fae5",color:o.status==="pending"?"#991b1b":"#065f46",padding:"2px 8px",borderRadius:10,fontWeight:600}}>{o.status}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    {o.status==="pending"&&<ABtn sm onClick={()=>updBoxStatus(o.id,"packed")} style={{background:"#dbeafe",color:"#2563eb"}}>Pack</ABtn>}
                    {o.status==="packed"&&<ABtn sm onClick={()=>updBoxStatus(o.id,"dispatched")} style={{background:"#dcfce7",color:"#16a34a"}}>Dispatch</ABtn>}
                    <ABtn sm onClick={()=>delBox(o.id)} style={{background:"#fee2e2",color:"#dc2626"}}>Del</ABtn>
                    <div style={{fontSize:10,color:"#9ca3af"}}>{o.created_at?new Date(o.created_at).toLocaleDateString():""}</div>
                  </div>
                </div>
                {o.notes&&<div style={{fontSize:11,color:"#6b7280",marginTop:6,padding:"6px 10px",background:"var(--t-card)",borderRadius:4,border:"1px solid #e5e7eb"}}>"{o.notes}"</div>}
              </div>
            ))}
          </div>
        )}
      </>}
    </div>
  );
}


function ASettings({settings}){
  const[f,setF]=useState({});
  const[np,setNp]=useState("");const[cp,sCp]=useState("");
  const[saving,setSaving]=useState(false);
  const[saved,setSaved]=useState(false);
  const[debRef]=useState({});
  useEffect(()=>setF({...settings}),[settings]);

  function updateF(key,val){
    const nf={...f,[key]:val};setF(nf);
    clearTimeout(debRef[key]);
    debRef[key]=setTimeout(async()=>{
      if(sb)await sb.from("website_settings").upsert({key,value:String(val||"")},{onConflict:"key"});
    },800);
  }

  async function save(){
    if(!sb)return;setSaving(true);
    try{
      await Promise.all(Object.entries(f).map(([k,v])=>
        sb.from("website_settings").upsert({key:k,value:String(v||"")},{onConflict:"key"})
      ));
      setSaved(true);setTimeout(()=>setSaved(false),2500);
    }catch(e){alert("Save error: "+e.message);}
    setSaving(false);
  }

  async function changePwd(){
    if(!sb||!np)return;
    const{error}=await sb.auth.updateUser({password:np});
    if(error)alert(error.message);else{alert("Password changed!");setNp("");sCp("");}
  }

  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
      <AH title="⚙️ General Settings"/>
      <ABtn onClick={save} style={{background:saving?"#6b7280":saved?"#16a34a":"#111",color:"#fff",minWidth:90,transition:"background .3s"}}>
        {saving?"Saving...":saved?"✅ Saved":"💾 Save All"}
      </ABtn>
    </div>
    <div style={{fontSize:11,color:"#9ca3af",marginBottom:16,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:6,padding:"8px 12px"}}>
      ℹ️ Theme, Shop, WA, Subscription, Delivery settings left sidebar mein hain alag alag pages ke saath.
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
      <div>
        <ACard style={{padding:18,marginBottom:16}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:"var(--t-text)"}}>🔐 Change Password</div>
          <div style={{marginBottom:8}}><ALbl c="New Password"/><input type="password" value={np} onChange={e=>setNp(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/></div>
          <div style={{marginBottom:10}}><ALbl c="Confirm Password"/><input type="password" value={cp} onChange={e=>sCp(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/></div>
          <ABtn onClick={changePwd} style={{background:"#111",color:"#fff",width:"100%"}}>Change Password</ABtn>
        </ACard>
        <ACard style={{padding:18,marginBottom:16}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:"var(--t-text)"}}>📊 Supabase Status</div>
          <div style={{fontSize:12,color:sb?"#16a34a":"#dc2626",fontWeight:600}}>{sb?"✅ Connected":"❌ Not Connected"}</div>
          {sb&&<div style={{fontSize:11,color:"#9ca3af",marginTop:4}}>URL: {process.env.REACT_APP_SUPABASE_URL?.slice(0,30)}...</div>}
        </ACard>
      </div>
      <div>
        <ACard style={{padding:18,marginBottom:16}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:"var(--t-text)"}}>💾 Backup</div>
          <ABtn onClick={async()=>{if(!sb)return;const{data}=await sb.from("products").select("*");const a=document.createElement("a");a.href="data:application/json,"+encodeURIComponent(JSON.stringify(data,null,2));a.download="products_backup_"+Date.now()+".json";a.click();}} style={{background:"#111",color:"#fff",width:"100%",marginBottom:8}}>⬇️ Download Products Backup</ABtn>
          <ABtn onClick={async()=>{if(!sb)return;const{data}=await sb.from("online_orders").select("*");const a=document.createElement("a");a.href="data:application/json,"+encodeURIComponent(JSON.stringify(data,null,2));a.download="orders_backup_"+Date.now()+".json";a.click();}} style={{background:"#374151",color:"#fff",width:"100%",marginBottom:8}}>⬇️ Download Orders Backup</ABtn>
          <ABtn onClick={async()=>{
            if(!sb)return;
            const{data:orders}=await sb.from("online_orders").select("*").order("created_at",{ascending:false});
            if(!orders)return;
            const total=orders.reduce((s,o)=>s+Number(o.total||0),0);
            const confirmed=orders.filter(o=>o.status==="confirmed"||o.status==="delivered").length;
            const rows=orders.map(o=>`${o.id.slice(-6).toUpperCase()} | ${new Date(o.created_at).toLocaleDateString()} | ${o.customer_name||"Guest"} | Rs.${Number(o.total||0).toLocaleString()} | ${o.status}`).join("\n");
            const report=`JAMEEL FABRICS — SALES REPORT\nGenerated: ${new Date().toLocaleString()}\n${"=".repeat(60)}\n\nTotal Orders: ${orders.length}\nConfirmed/Delivered: ${confirmed}\nTotal Revenue: Rs.${total.toLocaleString()}\n\n${"=".repeat(60)}\nOrder ID | Date | Customer | Amount | Status\n${"-".repeat(60)}\n${rows}`;
            const a=document.createElement("a");a.href="data:text/plain,"+encodeURIComponent(report);a.download="sales_report_"+Date.now()+".txt";a.click();
          }} style={{background:"#16a34a",color:"#fff",width:"100%"}}>📊 Download Sales Report</ABtn>
        </ACard>
      </div>
    </div>
  </div>);
}


// ══════════════════════════════════════════════════════════════
// ADMIN: CUSTOMER MANAGEMENT
// ══════════════════════════════════════════════════════════════
function ACustomers(){
  const[customers,setCustomers]=useState([]);
  const[form,setForm]=useState({name:"",email:"",phone:"",address:""});
  const[billForm,setBillForm]=useState({customer_id:"",amount:"",note:""});
  const[loading,setLoading]=useState(false);
  const[tab,setTab]=useState("list");

  useEffect(()=>{load();},[]);

  async function load(){
    if(!sb)return;
    const{data:vip}=await sb.from("vip_customers").select("*").order("created_at",{ascending:false});
    setCustomers(vip||[]);
  }

  async function addCustomer(){
    if(!form.name||!form.email)return toast("Name aur email required","error");
    setLoading(true);
    await sb.from("vip_customers").insert({...form,total_purchase:0,vip_unlocked:false,created_at:new Date().toISOString()}).catch(()=>{});
    setLoading(false);toast("Customer added!","success");
    setForm({name:"",email:"",phone:"",address:""});load();
  }

  async function addBill(){
    if(!billForm.customer_id||!billForm.amount)return toast("Customer ID aur amount required","error");
    const amt=Number(billForm.amount);
    const{data:existing}=await sb.from("vip_customers").select("total_purchase").eq("id",billForm.customer_id).single();
    const newTotal=(existing?.total_purchase||0)+amt;
    await sb.from("vip_customers").update({total_purchase:newTotal,vip_unlocked:newTotal>=10000,last_purchase:new Date().toISOString(),last_note:billForm.note}).eq("id",billForm.customer_id);
    toast(`Bill added! Total: Rs.${newTotal.toLocaleString()}${newTotal>=10000?" — VIP UNLOCKED! 👑":""}`,newTotal>=10000?"success":"info");
    setBillForm({customer_id:"",amount:"",note:""});load();
  }

  async function toggleVip(c){
    await sb.from("vip_customers").update({vip_unlocked:!c.vip_unlocked}).eq("id",c.id);
    toast(c.vip_unlocked?"VIP removed":"VIP unlocked 👑","success");load();
  }

  async function delCustomer(id){
    if(!sb||!window.confirm("Delete this customer?"))return;
    await sb.from("vip_customers").delete().eq("id",id);
    setCustomers(list=>list.filter(c=>c.id!==id));
    toast("Customer deleted","success");
  }

  return(<div>
    <AH title="👥 Customer Management" sub="Customers manage karo, bills add karo, VIP unlock karo"/>
    <div style={{display:"flex",gap:8,marginBottom:20}}>
      {[["list","Customer List"],["add","Add Customer"],["bill","Add Bill"]].map(([k,l])=>(
        <button key={k} onClick={()=>setTab(k)} style={{padding:"8px 16px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",background:tab===k?"#111":"#fff",color:tab===k?"#fff":"#374151"}}>{l}</button>
      ))}
    </div>

    {tab==="list"&&<ACard style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr>{["Name","Email","Phone","Total Purchase","VIP","Actions"].map(h=><th key={h} className="adm-th">{h}</th>)}</tr></thead>
        <tbody>
          {customers.map(c=>(
            <tr key={c.id}>
              <td className="adm-td" style={{fontWeight:600}}>{c.name}</td>
              <td className="adm-td" style={{fontSize:12,color:"#6b7280"}}>{c.email}</td>
              <td className="adm-td">{c.phone||"—"}</td>
              <td className="adm-td"><span style={{fontWeight:700,color:"#c9a84c"}}>Rs.{Number(c.total_purchase||0).toLocaleString()}</span></td>
              <td className="adm-td"><span style={{padding:"2px 8px",borderRadius:12,fontSize:11,fontWeight:700,background:c.vip_unlocked?"#fef9c3":"#f3f4f6",color:c.vip_unlocked?"#ca8a04":"#6b7280"}}>{c.vip_unlocked?"👑 VIP":"Regular"}</span></td>
              <td className="adm-td"><div style={{display:"flex",gap:4}}>
                <button onClick={()=>toggleVip(c)} style={{fontSize:11,padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:4,cursor:"pointer",background:c.vip_unlocked?"#fef9c3":"#f9fafb",color:c.vip_unlocked?"#92400e":"#374151"}}>{c.vip_unlocked?"✓ VIP":"Grant VIP"}</button>
                <button onClick={()=>delCustomer(c.id)} style={{fontSize:11,padding:"4px 10px",border:"1px solid #fecaca",borderRadius:4,cursor:"pointer",background:"#fee2e2",color:"#dc2626"}}>Del</button>
              </div></td>
            </tr>
          ))}
          {!customers.length&&<tr><td colSpan={6} style={{textAlign:"center",padding:32,color:"#9ca3af",fontSize:13}}>No customers yet</td></tr>}
        </tbody>
      </table>
    </ACard>}

    {tab==="add"&&<ACard style={{padding:20}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div><ALbl c="Full Name *"/><AI value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Hamza Muhammadi"/></div>
        <div><ALbl c="Email *"/><AI value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="hamza@email.com"/></div>
        <div><ALbl c="Phone"/><AI value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="03001234567"/></div>
        <div><ALbl c="Address"/><AI value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Kunjah, Gujrat"/></div>
      </div>
      <ABtn onClick={addCustomer} style={{background:"#111",color:"#fff"}} disabled={loading}>{loading?"Adding...":"Add Customer"}</ABtn>
    </ACard>}

    {tab==="bill"&&<ACard style={{padding:20}}>
      <div style={{fontSize:13,color:"#6b7280",marginBottom:16}}>Customer ki purchase add karo — 10k+ pe automatically VIP unlock ho ga</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div><ALbl c="Customer"/>
          <select value={billForm.customer_id} onChange={e=>setBillForm({...billForm,customer_id:e.target.value})} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,outline:"none"}}>
            <option value="">— Select Customer —</option>
            {customers.map(c=><option key={c.id} value={c.id}>{c.name} (Rs.{Number(c.total_purchase||0).toLocaleString()})</option>)}
          </select>
        </div>
        <div><ALbl c="Purchase Amount (Rs.)"/><AI type="number" value={billForm.amount} onChange={e=>setBillForm({...billForm,amount:e.target.value})} placeholder="5000"/></div>
      </div>
      <div style={{marginBottom:12}}><ALbl c="Note (optional)"/><AI value={billForm.note} onChange={e=>setBillForm({...billForm,note:e.target.value})} placeholder="Order details..."/></div>
      <ABtn onClick={addBill} style={{background:"#16a34a",color:"#fff"}}>Add Bill & Update Total</ABtn>
    </ACard>}
  </div>);
}

function AReviews({onRefresh}){
  const{data:reviews}=useDB(()=>sb.from("reviews").select("*").order("created_at",{ascending:false}),[]);
  const[form,setForm]=useState({customer_name:"",review_text:"",rating:5,product_name:"",approved:true});
  const[loading,setLoading]=useState(false);
  async function add(){
    if(!sb||!form.customer_name||!form.review_text){toast("Name aur review required","error");return;}
    setLoading(true);
    await sb.from("reviews").insert({...form,source:"manual",created_at:new Date().toISOString()});
    setLoading(false);toast("Review added!","success");
    setForm({customer_name:"",review_text:"",rating:5,product_name:"",approved:true});
    onRefresh();
  }
  async function toggle(r){if(!sb)return;await sb.from("reviews").update({approved:!r.approved}).eq("id",r.id);onRefresh();}
  async function del(id){if(!sb||!window.confirm("Delete?"))return;await sb.from("reviews").delete().eq("id",id);onRefresh();}
  const stars=n=>"★".repeat(n)+"☆".repeat(5-n);
  return(<div>
    <AH title="Customer Reviews" sub="Website pe dikhne wale reviews manage karo"/>
    <ACard style={{padding:20,marginBottom:20}}>
      <div style={{fontSize:15,fontWeight:600,marginBottom:14,color:"var(--t-text)"}}>Add Review Manually</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div><ALbl c="Customer Name *"/><AI value={form.customer_name} onChange={e=>setForm({...form,customer_name:e.target.value})} placeholder="Hamza Muhammadi"/></div>
        <div><ALbl c="Product Name"/><AI value={form.product_name} onChange={e=>setForm({...form,product_name:e.target.value})} placeholder="Embroidered Dress"/></div>
        <div><ALbl c="Rating"/>
          <select value={form.rating} onChange={e=>setForm({...form,rating:parseInt(e.target.value)})} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,fontFamily:"inherit",outline:"none"}}>
            {[5,4,3,2,1].map(n=><option key={n} value={n}>{stars(n)} ({n}/5)</option>)}
          </select>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:18}}>
          <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13}}>
            <input type="checkbox" checked={form.approved} onChange={e=>setForm({...form,approved:e.target.checked})} style={{accentColor:"#111"}}/>
            Show on website
          </label>
        </div>
        <div style={{gridColumn:"1/-1"}}><ALbl c="Review Text *"/><textarea value={form.review_text} onChange={e=>setForm({...form,review_text:e.target.value})} placeholder="Bohat acha fabric tha, quality best hai!" style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"var(--t-text)",outline:"none",fontFamily:"inherit",minHeight:70,resize:"vertical"}}/></div>
      </div>
      <ABtn onClick={add} disabled={loading} style={{background:"#111",color:"#fff",marginTop:14,opacity:loading?.6:1}}>{loading?"Adding...":"+ Add Review"}</ABtn>
    </ACard>
    {!reviews?.length?<ACard style={{padding:48,textAlign:"center",color:"#9ca3af"}}><div style={{fontSize:36,marginBottom:12}}>⭐</div><div>No reviews yet</div></ACard>:
      reviews.map(r=><ACard key={r.id} style={{padding:"14px 18px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <div style={{fontWeight:600,fontSize:14,color:"var(--t-text)"}}>{r.customer_name}</div>
            <div style={{color:"#f59e0b",fontSize:13}}>{stars(r.rating||5)}</div>
            <Bdg c={r.source==="manual"?"":"b"}>{r.source==="manual"?"Manual":"Customer"}</Bdg>
            <Bdg c={r.approved?"g":""}>{r.approved?"Visible":"Hidden"}</Bdg>
          </div>
          {r.product_name&&<div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>{r.product_name}</div>}
          <div style={{fontSize:13,color:"#374151",fontStyle:"italic"}}>"{r.review_text}"</div>
        </div>
        <div style={{display:"flex",gap:6}}>
          <ABtn sm onClick={()=>toggle(r)} style={{background:r.approved?"#fef9c3":"#dcfce7",color:r.approved?"#92400e":"#16a34a"}}>{r.approved?"Hide":"Show"}</ABtn>
          <ABtn sm onClick={()=>del(r.id)} style={{background:"#fee2e2",color:"#dc2626"}}>Del</ABtn>
        </div>
      </ACard>)
    }
  </div>);
}

function ASoldCounter({onRefresh}){
  const settings=useSettings();
  const[f,setF]=useState({});
  useEffect(()=>setF({...settings}),[settings]);
  const realSold=parseInt(f.real_sold_count)||0;
  const displayNum=parseInt(f.sold_display_count)||realSold;
  async function save(){
    if(!sb)return;
    await Promise.all(Object.entries(f).map(([k,v])=>sb.from("website_settings").upsert({key:k,value:String(v)},{onConflict:"key"})));
    toast("Saved!","success");onRefresh();
  }
  return(<div>
    <AH title="Sold Counter" sub="Website pe 'X pieces sold' dikhao"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
      <ACard style={{padding:20}}>
        <div style={{fontSize:15,fontWeight:600,marginBottom:4,color:"var(--t-text)"}}>Current Numbers</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>Real orders se auto count + manual boost option</div>
        <div style={{display:"grid",gap:12}}>
          <div><ALbl c="Real Sold (auto from orders)"/>
            <div style={{border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:16,fontWeight:700,color:"#16a34a",background:"#f9fafb"}}>{realSold} pieces</div>
          </div>
          <div><ALbl c="Display Number (can add extra)"/>
            <AI type="number" value={f.sold_display_count||""} onChange={e=>setF({...f,sold_display_count:e.target.value})} placeholder={String(realSold+200)}/>
            <div style={{fontSize:10,color:"#9ca3af",marginTop:4}}>Yahan se manually boost kar sakte ho — e.g. +200 add karo starting count ke liye</div>
          </div>
          <div><ALbl c="Display Text"/>
            <AI value={f.sold_text||""} onChange={e=>setF({...f,sold_text:e.target.value})} placeholder="500+ pieces sold this month"/>
          </div>
          <div><ALbl c="Show on website"/>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,marginTop:4}}>
              <input type="checkbox" checked={f.sold_show==="true"||f.sold_show===true} onChange={e=>setF({...f,sold_show:String(e.target.checked)})} style={{accentColor:"#111"}}/>
              Show sold counter on homepage
            </label>
          </div>
        </div>
        <ABtn onClick={save} style={{background:"#111",color:"#fff",marginTop:14}}>Save</ABtn>
      </ACard>
      <ACard style={{padding:20}}>
        <div style={{fontSize:15,fontWeight:600,marginBottom:14,color:"var(--t-text)"}}>Preview</div>
        <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:20,textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:8}}>✅</div>
          <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:28,fontWeight:700,color:"var(--t-text)"}}>{displayNum}+</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:4}}>{f.sold_text||"pieces sold this month"}</div>
        </div>
        <div style={{fontSize:11,color:"#9ca3af",marginTop:12,lineHeight:1.8}}>
          Yeh homepage pe ek trust badge ke taur pe dikhega. Customers dekh ke trust karte hain.
        </div>
      </ACard>
    </div>
  </div>);
}


function AAnalytics({settings={}}){
  const[gId,setGId]=useState(settings.ga_id||"");
  const[gaLoading,setGaLoading]=useState(false);
  const[orders,setOrders]=useState([]);
  const[loading,setLoading]=useState(true);
  const[tab,setTab]=useState("sales");

  useEffect(()=>{setGId(settings.ga_id||"");},[settings]);
  useEffect(()=>{
    if(!sb){setLoading(false);return;}
    sb.from("online_orders").select("*").order("created_at",{ascending:false}).limit(500)
      .then(({data})=>{setOrders(data||[]);setLoading(false);});
  },[]);

  async function saveGA(){
    if(!sb)return;setGaLoading(true);
    await sb.from("website_settings").upsert({key:"ga_id",value:gId},{onConflict:"key"});
    setGaLoading(false);toast("Saved! Page reload karo","success");
  }

  // Compute analytics from orders
  const today=new Date();today.setHours(0,0,0,0);
  const thisWeek=new Date(today);thisWeek.setDate(today.getDate()-7);
  const thisMonth=new Date(today);thisMonth.setDate(1);

  const todayOrds=orders.filter(o=>new Date(o.created_at)>=today);
  const weekOrds=orders.filter(o=>new Date(o.created_at)>=thisWeek);
  const monthOrds=orders.filter(o=>new Date(o.created_at)>=thisMonth);

  const rev=arr=>arr.reduce((s,o)=>s+Number(o.total||0),0);
  const todayRev=rev(todayOrds);const weekRev=rev(weekOrds);const monthRev=rev(monthOrds);

  // Top products from order items
  const prodCount={};
  orders.forEach(o=>{
    try{const items=typeof o.items==="string"?JSON.parse(o.items):o.items||[];
      items.forEach(it=>{const k=it.name||it.product_name||"Unknown";prodCount[k]=(prodCount[k]||0)+(it.qty||it.quantity||1);});
    }catch{}
  });
  const topProds=Object.entries(prodCount).sort((a,b)=>b[1]-a[1]).slice(0,8);

  // Peak hours
  const hourCount=Array(24).fill(0);
  orders.forEach(o=>{hourCount[new Date(o.created_at).getHours()]++;});
  const maxHour=Math.max(...hourCount)||1;
  const peakHour=hourCount.indexOf(maxHour);

  // Last 7 days chart
  const days7=[];
  for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);days7.push({d,label:d.toLocaleDateString("en",{weekday:"short"}),rev:rev(orders.filter(o=>{const od=new Date(o.created_at);od.setHours(0,0,0,0);return od.getTime()===d.getTime();}))});}
  const maxDay=Math.max(...days7.map(x=>x.rev))||1;

  const statCards=[
    {l:"Today Orders",v:todayOrds.length,ic:"📦",sub:`Rs.${todayRev.toLocaleString()} revenue`},
    {l:"This Week",v:weekOrds.length,ic:"📅",sub:`Rs.${weekRev.toLocaleString()} revenue`},
    {l:"This Month",v:monthOrds.length,ic:"🗓️",sub:`Rs.${monthRev.toLocaleString()} revenue`},
    {l:"All Time",v:orders.length,ic:"💰",sub:`Rs.${rev(orders).toLocaleString()} total`},
  ];

  return(<div>
    <AH title="📊 Sales Analytics" sub="Real-time sales data, top products, aur peak hours"/>
    {loading?<div style={{textAlign:"center",padding:32,color:"#9ca3af"}}>Loading analytics...</div>:(<>
      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:20}}>
        {statCards.map(s=><ACard key={s.l} style={{padding:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5}}>{s.l}</div>
            <div style={{fontSize:20}}>{s.ic}</div>
          </div>
          <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:26,fontWeight:700,color:"var(--t-text)"}}>{s.v}</div>
          <div style={{fontSize:11,color:"#9ca3af",marginTop:4}}>{s.sub}</div>
        </ACard>)}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {[["sales","📈 Sales Chart"],["top","🏆 Top Products"],["peak","⏰ Peak Hours"],["ga","🔗 Google Analytics"]].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",fontSize:11,fontWeight:600,border:`1px solid ${tab===t?"#111":"#e5e7eb"}`,background:tab===t?"#111":"transparent",color:tab===t?"#fff":"#6b7280",borderRadius:4,cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      {/* Sales Chart */}
      {tab==="sales"&&<ACard style={{padding:20}}>
        <div style={{fontWeight:600,fontSize:14,marginBottom:16}}>Last 7 Days Revenue</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:8,height:140}}>
          {days7.map((d,i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{fontSize:9,color:"#6b7280",fontWeight:700}}>Rs.{(d.rev/1000).toFixed(1)}k</div>
              <div style={{width:"100%",background:d.rev>0?"#c9a84c":"#f3f4f6",borderRadius:"4px 4px 0 0",height:d.rev?(d.rev/maxDay*100)+"%":"4px",minHeight:4,transition:"height .4s"}}/>
              <div style={{fontSize:10,color:"#9ca3af",fontWeight:600}}>{d.label}</div>
            </div>
          ))}
        </div>
      </ACard>}

      {/* Top Products */}
      {tab==="top"&&<ACard style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 16px",borderBottom:"1px solid #f3f4f6",fontWeight:600,fontSize:14}}>🏆 Best-Selling Products</div>
        {topProds.length===0?<div style={{textAlign:"center",padding:32,color:"#9ca3af"}}>No order data yet</div>:topProds.map(([name,qty],i)=>(
          <div key={name} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:"1px solid #f9fafb"}}>
            <div style={{width:24,height:24,background:i===0?"#c9a84c":i===1?"#9ca3af":i===2?"#d97706":"#f3f4f6",color:i<3?"#fff":"#6b7280",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</div>
            <div style={{flex:1,fontWeight:500,fontSize:13}}>{name}</div>
            <div style={{fontSize:12,color:"#6b7280"}}>{qty} pcs sold</div>
            <div style={{width:80,height:6,background:"#f3f4f6",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",background:"#c9a84c",width:(qty/topProds[0][1]*100)+"%",borderRadius:3}}/>
            </div>
          </div>
        ))}
      </ACard>}

      {/* Peak Hours */}
      {tab==="peak"&&<ACard style={{padding:20}}>
        <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>⏰ Order Peak Hours</div>
        <div style={{fontSize:12,color:"#6b7280",marginBottom:16}}>Peak hour: {peakHour}:00–{peakHour+1}:00 ({hourCount[peakHour]} orders)</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:2,height:100,overflowX:"auto"}}>
          {hourCount.map((c,h)=>(
            <div key={h} style={{flex:"0 0 calc(100%/24 - 2px)",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              <div style={{width:"100%",background:h===peakHour?"#c9a84c":c>0?"#111":"#f3f4f6",borderRadius:"2px 2px 0 0",height:c?(c/maxHour*80)+"%":"3px",minHeight:3,transition:"height .3s"}}/>
              {h%3===0&&<div style={{fontSize:8,color:"#9ca3af"}}>{h}h</div>}
            </div>
          ))}
        </div>
      </ACard>}

      {/* Google Analytics */}
      {tab==="ga"&&<ACard style={{padding:24}}>
        <div style={{fontSize:15,fontWeight:600,marginBottom:14,color:"var(--t-text)"}}>Google Analytics Setup</div>
        <div style={{display:"grid",gap:12,maxWidth:500,marginBottom:20}}>
          <div><ALbl c="Measurement ID (G-XXXXXXXXXX)"/>
            <AI value={gId} onChange={e=>setGId(e.target.value)} placeholder="G-XXXXXXXXXX" style={{letterSpacing:2,fontWeight:600}}/></div>
          <ABtn onClick={saveGA} disabled={gaLoading} style={{background:"#111",color:"#fff",width:"fit-content",opacity:gaLoading?.6:1}}>{gaLoading?"Saving...":"Save & Enable"}</ABtn>
        </div>
        {[["1","analytics.google.com pe jao","Free account se login karo"],["2","New Property banao","Website: Jameel Fabrics"],["3","Measurement ID copy karo","G-XXXXXXXXXX format"],["4","Upar paste karo","Save — 24hrs mein data aana shuru"]]
          .map(([n,t,d])=><div key={n} style={{display:"flex",gap:14,padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
            <div style={{width:24,height:24,background:"#111",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{n}</div>
            <div><div style={{fontWeight:600,fontSize:13,color:"var(--t-text)"}}>{t}</div><div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{d}</div></div>
          </div>)}
      </ACard>}
    </>)}
  </div>);
}

/* ─ AReviews ─ */

// FIX 9 — WA Broadcast
function AWABroadcast(){
  const[customers,setCustomers]=useState([]);
  const[selected,setSelected]=useState(new Set());
  const[msg,setMsg]=useState("");
  const[manual,setManual]=useState("");
  const[sending,setSending]=useState(false);
  const[sent,setSent]=useState(0);
  useEffect(()=>{
    if(!sb)return;
    sb.from("online_orders").select("customer_name,customer_email,customer_phone").limit(200)
      .then(({data})=>{
        if(!data)return;
        const seen=new Set();const list=[];
        data.forEach(o=>{
          const key=o.customer_phone||o.customer_email||o.customer_name;
          if(key&&!seen.has(key)){seen.add(key);list.push(o);}
        });
        setCustomers(list);
      });
  },[]);
  function toggleAll(e){
    if(e.target.checked)setSelected(new Set(customers.map((_,i)=>i)));
    else setSelected(new Set());
  }
  function send(){
    if(!msg.trim())return alert("Message likhna zaroori hai");
    setSending(true);setSent(0);
    const phones=manual.split(/\n|,/).map(p=>p.trim().replace(/\D/g,"")).filter(p=>p.length>=10);
    const enc=encodeURIComponent(msg);
    let delay=0;
    phones.forEach(ph=>{
      setTimeout(()=>{window.open(`https://wa.me/${ph}?text=${enc}`,"_blank");setSent(s=>s+1);},delay);
      delay+=600;
    });
    if(!phones.length)toast("Manual numbers add karo","error");
    setTimeout(()=>setSending(false),delay+500);
  }
  return(
    <div>
      <AH title="📣 WA Broadcast" sub="Customers ko WhatsApp message bhejo"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}} className="two-col">
        <ACard style={{padding:18}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>Message</div>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={6} placeholder="Assalam! Jameel Fabrics mein naya stock aa gaya! Aaj hi order karo 🎉" style={{width:"100%",padding:"9px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",marginBottom:12}}/>
          <div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Phone Numbers (ek line mein ek)</div>
          <textarea value={manual} onChange={e=>setManual(e.target.value)} rows={5} placeholder="0300-1234567\n0321-9876543" style={{width:"100%",padding:"9px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",marginBottom:10}}/>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:12}}>⚠️ Browser popup blocker allow karo. Har message 600ms gap se khulega.</div>
          <button onClick={send} disabled={sending} style={{width:"100%",background:sending?"#6b7280":"#25D366",color:"#fff",border:"none",padding:12,borderRadius:6,fontSize:13,fontWeight:700,cursor:sending?"not-allowed":"pointer"}}>
            {sending?`Sending... (${sent} sent)`:"📤 Generate & Open WA Links"}
          </button>
        </ACard>
        <ACard style={{padding:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13}}>Past Customers ({customers.length})</div>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,cursor:"pointer"}}>
              <input type="checkbox" onChange={toggleAll} checked={selected.size===customers.length&&customers.length>0} style={{accentColor:"#c9a84c"}}/>Select All
            </label>
          </div>
          <div style={{maxHeight:340,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
            {customers.length===0&&<div style={{color:"#9ca3af",fontSize:12,padding:16,textAlign:"center"}}>No customers yet</div>}
            {customers.map((c,i)=>(
              <label key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:6,background:selected.has(i)?"#f0fdf4":"#f9fafb",border:`1px solid ${selected.has(i)?"#86efac":"#e5e7eb"}`,cursor:"pointer",fontSize:12}}>
                <input type="checkbox" checked={selected.has(i)} onChange={e=>{const s=new Set(selected);if(e.target.checked)s.add(i);else s.delete(i);setSelected(s);}} style={{accentColor:"#c9a84c"}}/>
                <span style={{fontWeight:500}}>{c.customer_name||"Customer"}</span>
                <span style={{color:"#6b7280",fontSize:11,marginLeft:"auto"}}>{c.customer_phone||c.customer_email||""}</span>
              </label>
            ))}
          </div>
        </ACard>
      </div>
    </div>
  );
}


// FIX 11 — Udhaar / Credit Manager
function AUdhaar(){
  const[records,setRecords]=useState([]);
  const[loading,setLoading]=useState(true);
  const[form,setForm]=useState({customer_name:"",amount_owed:"",amount_paid:"",date:"",notes:""});
  const[editId,setEditId]=useState(null);
  const[search,setSearch]=useState("");
  const[filter,setFilter]=useState("all");
  const[payInput,setPayInput]=useState({});

  useEffect(()=>loadData(),[]);
  async function loadData(){
    setLoading(true);
    if(!sb){setLoading(false);return;}
    const{data}=await sb.from("website_udhaar").select("*").order("created_at",{ascending:false});
    setRecords(data||[]);setLoading(false);
  }
  async function save(){
    if(!form.customer_name)return toast("Customer name required","error");
    const payload={...form,amount_owed:Number(form.amount_owed)||0,amount_paid:Number(form.amount_paid)||0};
    if(!payload.status)payload.status="pending";
    if(sb){
      if(editId)await sb.from("website_udhaar").update(payload).eq("id",editId);
      else await sb.from("website_udhaar").insert({...payload,created_at:new Date().toISOString()});
    }
    setForm({customer_name:"",amount_owed:"",amount_paid:"",date:"",notes:""});
    setEditId(null);loadData();toast("Saved!","success");
  }
  async function applyPayment(id){
    const amt=Number(payInput[id]||0);if(!amt)return;
    const rec=records.find(r=>r.id===id);if(!rec)return;
    const newPaid=Number(rec.amount_paid||0)+amt;
    const status=newPaid>=Number(rec.amount_owed)?"paid":"pending";
    if(sb)await sb.from("website_udhaar").update({amount_paid:newPaid,status}).eq("id",id);
    setPayInput(p=>({...p,[id]:""}));loadData();toast(`Rs.${amt.toLocaleString()} recorded`,"success");
  }
  async function markPaid(id){
    const rec=records.find(r=>r.id===id);
    if(sb)await sb.from("website_udhaar").update({status:"paid",amount_paid:Number(rec?.amount_owed||0)}).eq("id",id);
    loadData();toast("Marked as paid","success");
  }
  async function del(id){
    if(!window.confirm("Delete?"))return;
    if(sb)await sb.from("website_udhaar").delete().eq("id",id);
    loadData();
  }

  const filtered=records.filter(r=>{
    const matchS=!search||r.customer_name?.toLowerCase().includes(search.toLowerCase());
    const matchF=filter==="all"||(filter==="pending"&&r.status!=="paid")||(filter==="paid"&&r.status==="paid");
    return matchS&&matchF;
  });
  const totalPending=records.filter(r=>r.status!=="paid").reduce((s,r)=>s+Number(r.amount_owed||0)-Number(r.amount_paid||0),0);

  return(
    <div>
      <AH title="💰 Udhaar / Credit" sub="Customer ke pending balances track karo"/>
      <div style={{background:"linear-gradient(135deg,#fef3c7,#fffbeb)",border:"1px solid #fde68a",borderRadius:10,padding:"16px 20px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:12,color:"#92400e",fontWeight:600}}>Total Pending Balance</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:"#92400e"}}>Rs. {totalPending.toLocaleString()}</div>
        </div>
        <div style={{fontSize:11,color:"#92400e"}}>{records.filter(r=>r.status!=="paid").length} customers pending</div>
      </div>
      <ACard style={{padding:18,marginBottom:20}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>{editId?"Edit Record":"Add New Udhaar"}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{gridColumn:"1/-1"}}><ALbl c="Customer Name *"/><AI value={form.customer_name} onChange={e=>setForm({...form,customer_name:e.target.value})} placeholder="e.g. Hamza Muhammadi"/></div>
          <div><ALbl c="Amount Owed (Rs.)"/><AI type="number" value={form.amount_owed} onChange={e=>setForm({...form,amount_owed:e.target.value})}/></div>
          <div><ALbl c="Amount Paid (Rs.)"/><AI type="number" value={form.amount_paid} onChange={e=>setForm({...form,amount_paid:e.target.value})}/></div>
          <div><ALbl c="Date"/><AI type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
          <div><ALbl c="Notes"/><AI value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Optional note..."/></div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <ABtn onClick={save} style={{background:"#111",color:"#fff"}}>{editId?"Update":"Add Record"}</ABtn>
          {editId&&<ABtn onClick={()=>{setEditId(null);setForm({customer_name:"",amount_owed:"",amount_paid:"",date:"",notes:"",status:"pending"});}} style={{background:"#f3f4f6",color:"#374151"}}>Cancel</ABtn>}
        </div>
      </ACard>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customer..." style={{flex:1,minWidth:160,padding:"8px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none"}}/>
        {["all","pending","paid"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:"7px 14px",borderRadius:6,fontSize:12,fontWeight:600,border:`1px solid ${filter===f?"#111":"#e5e7eb"}`,background:filter===f?"#111":"transparent",color:filter===f?"#fff":"#6b7280",cursor:"pointer",textTransform:"capitalize"}}>{f}</button>
        ))}
      </div>
      {loading?<div style={{textAlign:"center",padding:32,color:"#9ca3af"}}>Loading...</div>:(
        <ACard><div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["Customer","Owed","Paid","Balance","Status","Quick Pay","Actions"].map(h=><th key={h} className="adm-th">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.length===0&&<tr><td colSpan={7} style={{padding:40,textAlign:"center",color:"#9ca3af"}}>No records</td></tr>}
              {filtered.map(r=>{
                const bal=Number(r.amount_owed||0)-Number(r.amount_paid||0);
                return(
                  <tr key={r.id} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td className="adm-td"><div style={{fontWeight:600}}>{r.customer_name}</div>{r.notes&&<div style={{fontSize:11,color:"#9ca3af"}}>{r.notes}</div>}</td>
                    <td className="adm-td" style={{fontWeight:600}}>Rs.{Number(r.amount_owed||0).toLocaleString()}</td>
                    <td className="adm-td" style={{color:"#16a34a"}}>Rs.{Number(r.amount_paid||0).toLocaleString()}</td>
                    <td className="adm-td"><span style={{fontWeight:700,color:bal>0?"#dc2626":"#16a34a"}}>Rs.{bal.toLocaleString()}</span></td>
                    <td className="adm-td"><span style={{padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:r.status==="paid"?"#dcfce7":"#fef9c3",color:r.status==="paid"?"#16a34a":"#ca8a04"}}>{r.status==="paid"?"Paid":"Pending"}</span></td>
                    <td className="adm-td"><div style={{display:"flex",gap:4}}>
                      <input type="number" value={payInput[r.id]||""} onChange={e=>setPayInput(p=>({...p,[r.id]:e.target.value}))} placeholder="Rs." style={{width:70,padding:"5px 8px",border:"1px solid #e5e7eb",borderRadius:4,fontSize:12,outline:"none"}}/>
                      <ABtn sm onClick={()=>applyPayment(r.id)} style={{background:"#dcfce7",color:"#16a34a"}}>✓</ABtn>
                    </div></td>
                    <td className="adm-td"><div style={{display:"flex",gap:4}}>
                      {r.status!=="paid"&&<ABtn sm onClick={()=>markPaid(r.id)} style={{background:"#111",color:"#fff"}}>Paid</ABtn>}
                      <ABtn sm onClick={()=>{setEditId(r.id);setForm({customer_name:r.customer_name,amount_owed:r.amount_owed,amount_paid:r.amount_paid,date:r.date||"",notes:r.notes||""});}} style={{background:"transparent",border:"1px solid #e5e7eb",color:"#374151"}}>✏️</ABtn>
                      <ABtn sm onClick={()=>del(r.id)} style={{background:"#fee2e2",color:"#dc2626"}}>🗑️</ABtn>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div></ACard>
      )}
    </div>
  );
}


function APriceDropAlerts(){
  const[tick,setTick]=useState(0);
  const{data:alerts,loading}=useDB(()=>sb.from("price_drop_alerts").select("*").order("created_at",{ascending:false}),[tick]);
  async function del(id){if(!sb||!window.confirm("Delete?"))return;await sb.from("price_drop_alerts").delete().eq("id",id);toast("Deleted");setTick(t=>t+1);}
  const wa=WA_NUM;
  return(<div>
    <AH title="🔔 Price Drop Alerts" sub="Customers jo price drop chahte hain"/>
    <ACard><div style={{overflowX:"auto"}}>
      {loading?<div style={{padding:32,textAlign:"center",color:"#9ca3af"}}>Loading...</div>:(
        alerts?.length?(
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb"}}>{["Product","Price at Alert","WA Number","Date","Action"].map(h=><th key={h} style={{padding:"10px 14px",fontSize:11,fontWeight:600,color:"#6b7280",textAlign:"left",textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>
              {alerts.map(a=>(
                <tr key={a.id} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"12px 14px",fontWeight:600,fontSize:13,color:"var(--t-text)"}}>{a.product_name}</td>
                  <td style={{padding:"12px 14px",color:"#b91c1c",fontWeight:700}}>Rs.{Number(a.price_at_alert||0).toLocaleString()}</td>
                  <td style={{padding:"12px 14px",fontSize:12}}><a href={"https://wa.me/92"+String(a.wa_number||"").replace(/^0/,"")+"?text="+encodeURIComponent("Assalam! "+a.product_name+" ka price drop hogaya. Jameel Fabrics pe dekhen!")} target="_blank" rel="noopener noreferrer" style={{color:"#16a34a",fontWeight:700}}>📱 {a.wa_number}</a></td>
                  <td style={{padding:"12px 14px",fontSize:11,color:"#9ca3af"}}>{new Date(a.created_at).toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"})}</td>
                  <td style={{padding:"12px 14px"}}><ABtn sm onClick={()=>del(a.id)} style={{background:"#fee2e2",color:"#dc2626"}}>Del</ABtn></td>
                </tr>
              ))}
            </tbody>
          </table>
        ):<div style={{padding:"44px",textAlign:"center",color:"#9ca3af"}}>No price drop alerts yet</div>
      )}
    </div></ACard>
  </div>);
}

function AGiftSettings({settings,onSaved}){
  const[f,setF]=useState({
    gift_base_price:settings.gift_base_price||"200",
    gift_box_price:settings.gift_box_price||"200",
    gift_box_label:settings.gift_box_label||"Gift Box",
    gift_sheet_price:settings.gift_sheet_price||"100",
    gift_sheet_label:settings.gift_sheet_label||"Wrapping Sheet",
    gift_card_price:settings.gift_card_price||"50",
    gift_card_label:settings.gift_card_label||"Greeting Card",
    gift_title:settings.gift_title||"Send as Gift",
    gift_active:settings.gift_active||"true",
  });
  const[saving,setSaving]=useState(false);const[saved,setSaved]=useState(false);
  async function saveAll(){
    setSaving(true);
    if(sb){for(const[k,v]of Object.entries(f)){await sb.from("website_settings").upsert({key:k,value:v},{onConflict:"key"});}}
    setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2200);
    toast("Gift settings saved!","success");
    onSaved&&onSaved();
  }
  const upd=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  return(<div>
    <AH title="🎁 Gift Option Settings" sub="Cart mein gift feature ke prices aur labels edit karo"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      <ACard style={{padding:20}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:"var(--t-text)"}}>💰 Pricing (Rs.)</div>
        <ALbl c="Base Gift Fee"/><AI type="number" value={f.gift_base_price} onChange={upd("gift_base_price")} placeholder="200"/>
        <div style={{marginTop:10}}><ALbl c="Gift Box Price"/><AI type="number" value={f.gift_box_price} onChange={upd("gift_box_price")} placeholder="200"/></div>
        <div style={{marginTop:10}}><ALbl c="Wrapping Sheet Price"/><AI type="number" value={f.gift_sheet_price} onChange={upd("gift_sheet_price")} placeholder="100"/></div>
        <div style={{marginTop:10}}><ALbl c="Greeting Card Price"/><AI type="number" value={f.gift_card_price} onChange={upd("gift_card_price")} placeholder="50"/></div>
      </ACard>
      <ACard style={{padding:20}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:"var(--t-text)"}}>🏷️ Labels</div>
        <ALbl c="Gift Section Title"/><AI value={f.gift_title} onChange={upd("gift_title")} placeholder="Send as Gift"/>
        <div style={{marginTop:10}}><ALbl c="Gift Box Label"/><AI value={f.gift_box_label} onChange={upd("gift_box_label")} placeholder="Gift Box"/></div>
        <div style={{marginTop:10}}><ALbl c="Wrapping Sheet Label"/><AI value={f.gift_sheet_label} onChange={upd("gift_sheet_label")} placeholder="Wrapping Sheet"/></div>
        <div style={{marginTop:10}}><ALbl c="Greeting Card Label"/><AI value={f.gift_card_label} onChange={upd("gift_card_label")} placeholder="Greeting Card"/></div>
        <label style={{display:"flex",alignItems:"center",gap:8,marginTop:14,cursor:"pointer",fontSize:13,paddingTop:12,borderTop:"1px solid #f3f4f6"}}>
          <input type="checkbox" checked={f.gift_active!=="false"} onChange={e=>setF(p=>({...p,gift_active:e.target.checked?"true":"false"}))} style={{accentColor:"#c9a84c",width:15,height:15}}/>
          <span style={{fontWeight:500}}>Gift Option Active</span>
        </label>
      </ACard>
    </div>
    <div style={{textAlign:"right"}}>
      <ABtn onClick={saveAll} style={{background:saving?"#6b7280":saved?"#16a34a":"#111",color:"#fff",minWidth:120,transition:"background .3s"}}>
        {saving?"Saving...":saved?"✅ Saved":"💾 Save"}
      </ABtn>
    </div>
  </div>);
}

function AdminPanel({onExit}){
  const[page,setPage]=useState("dashboard");
  const[col,setCol]=useState(false);
  const[mobOpen,setMobOpen]=useState(false);
  const settings=useSettings();
  const{data:allProds,loading:pLoad}=useDB(()=>sb.from("products").select("*").order("created_at",{ascending:false}),[]);
  const{data:pending}=useDB(()=>sb.from("products").select("*").eq("website_status","pending"),[]);
  const{data:orders}=useDB(()=>sb.from("online_orders").select("*").order("created_at",{ascending:false}),[]);
  const{data:alerts}=useDB(()=>sb.from("website_alerts").select("*").eq("resolved",false).order("created_at",{ascending:false}),[]);
  const{data:coupons}=useDB(()=>sb.from("coupons").select("*"),[]);
  const{data:subs}=useDB(()=>sb.from("subscribers").select("*").order("subscribed_at",{ascending:false}),[]);
  const{data:customers}=useDB(()=>sb.auth.admin?sb.from("profiles").select("*"):sb.from("online_orders").select("customer_email,customer_name").limit(50),[]);
  const refresh=()=>window.location.reload();
  const pC=pending?.length||0;
  const aC=alerts?.length||0;
  const oC=orders?.filter(o=>o.status==="pending").length||0;
  const todayOrders=orders?.filter(o=>new Date(o.created_at).toDateString()===new Date().toDateString())||[];
  const todayRev=todayOrders.reduce((s,o)=>s+Number(o.total||0),0);

  const NAV=[
    {section:"Main"},
    {id:"dashboard",ic:<DashIc/>,lbl:"Dashboard"},
    {id:"orders",ic:<OrdIc/>,lbl:"Orders",badge:oC,bc:"#f59e0b"},
    {section:"Catalogue"},
    {id:"pending",ic:<PendIc/>,lbl:"Pending (ERP)",badge:pC,bc:"#c9a84c"},
    {id:"products",ic:<ProdIc/>,lbl:"Products"},
    {id:"alerts",ic:<AlertIc/>,lbl:"Stock Alerts",badge:aC,bc:"#ef4444"},
    {id:"price_drop_alerts",ic:<AlertIc/>,lbl:"🔔 Price Drops"},
    {id:"coupons",ic:<CoupIc/>,lbl:"Coupons"},
    {section:"Content"},
    {id:"reviews",ic:<StarIc/>,lbl:"Reviews"},
    {id:"sold",ic:<ChartIc/>,lbl:"Sold Counter"},
    {id:"analytics",ic:<AnalyticIc/>,lbl:"Analytics"},
    {id:"content",ic:<EditIc/>,lbl:"Website Content"},
    {id:"gift_settings",ic:<StarIc/>,lbl:"🎁 Gift Option"},
    {id:"subscribers",ic:<MailIc/>,lbl:"Subscribers"},
    {section:"Customers"},
    {id:"customers",ic:<UserIc/>,lbl:"👥 Customers"},
    {id:"broadcast",ic:<WaBcIc/>,lbl:"WA Broadcast"},
    {id:"udhaar",ic:<UdhaarIc/>,lbl:"Udhaar / Credit"},
    {id:"brands",ic:<BrandIc/>,lbl:"Brands"},
    {section:"Settings"},
    {id:"theme",ic:<ThemeIc/>,lbl:"🎨 Theme"},
    {id:"shop_settings",ic:<SettIc/>,lbl:"🏪 Shop"},
    {id:"sub_settings",ic:<ProdIc/>,lbl:"📦 Subscription"},
    {id:"wa_settings",ic:<OrdIc/>,lbl:"💬 WhatsApp"},
    {id:"bill_templates",ic:<EditIc/>,lbl:"🧾 Bill Templates"},
    {id:"size_charts",ic:<EditIc/>,lbl:"📏 Size Charts"},
    {id:"delivery",ic:<MailIc/>,lbl:"🚚 Delivery"},
    {id:"settings",ic:<SettIc/>,lbl:"⚙️ General"},
  ];

  const TITLES={dashboard:"Dashboard",pending:"Pending Approval",alerts:"Stock Alerts",products:"Products",orders:"Orders",coupons:"Coupons",reviews:"Reviews",sold:"Sold Counter",analytics:"Analytics",content:"Website Content",subscribers:"Subscribers",settings:"Settings"};

  const PAGES={
    dashboard:()=><ADash prods={allProds||[]} orders={orders||[]} alerts={alerts||[]} pending={pending||[]} todayOrders={todayOrders||[]} todayRev={todayRev||0} onNav={setPage}/>,
    pending:()=><APending pending={pending||[]} onRefresh={refresh}/>,
    alerts:()=><AAlerts alerts={alerts||[]} onRefresh={refresh}/>,
    price_drop_alerts:()=><APriceDropAlerts/>,
    products:()=><AProducts products={allProds||[]} onRefresh={refresh}/>,
    orders:()=><AOrders orders={orders||[]} wa={settings.wa_number||WA_NUM}/>,
    coupons:()=><ACoupons coupons={coupons||[]} onRefresh={refresh}/>,
    reviews:()=><AReviews onRefresh={refresh}/>,
    sold:()=><ASoldCounter onRefresh={refresh}/>,
    analytics:()=><AAnalytics settings={settings||{}}/>,
    content:()=><AContent settings={settings||{}}/>,
    gift_settings:()=><AGiftSettings settings={settings||{}} onSaved={refresh}/>,
    subscribers:()=><ASubs/>,
    broadcast:()=><AWABroadcast/>,
    customers:()=><ACustomers/>,
    udhaar:()=><AUdhaar/>,
    settings:()=><ASettings settings={settings||{}}/>,
    brands:()=><ABrands/>,
    theme:()=><AThemeSettings settings={settings||{}} onSaved={refresh}/>,
    shop_settings:()=><AShopSettings settings={settings||{}} onSaved={refresh}/>,
    sub_settings:()=><ASubSettings settings={settings||{}} onSaved={refresh}/>,
    wa_settings:()=><AWASettings settings={settings||{}} onSaved={refresh}/>,
    bill_templates:()=><ABillTemplates/>,
    size_charts:()=><ASizeCharts/>,
    delivery:()=><ADeliverySettings settings={settings||{}} onSaved={refresh}/>,
  };

  return(
    <div style={{display:"flex",height:"100vh",overflow:"hidden",fontFamily:"'Inter',sans-serif",background:"#f4f5f7"}}>

      {/* Mobile overlay */}
      {mobOpen&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:199}} onClick={()=>setMobOpen(false)}/>}

      {/* Sidebar */}
      <aside className={`adm-sb${col?" col":""}${mobOpen?" mob-open":""}`}>
        {/* Logo */}
        <div style={{padding:"18px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <div style={{width:36,height:36,background:"#c9a84c",borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:13,fontWeight:900,color:"#0a0907"}}>JF</div>
          {!col&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}><div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:13,fontWeight:700,color:"#fff",letterSpacing:1}}>JAMEEL FABRICS</div><div style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>Admin Panel</div></div>}
        </div>

        {/* Nav items */}
        <div style={{flex:1,overflowY:"auto",padding:"8px 8px"}}>
          {NAV.map((item,i)=>{
            if(item.section) return(
              <div key={i} style={{fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,.2)",padding:"10px 8px 4px",whiteSpace:"nowrap",overflow:"hidden",display:col?"none":"block"}}>{item.section}</div>
            );
            return(
              <button key={item.id} onClick={()=>{setPage(item.id);setMobOpen(false);}} className={`adm-sb-item${page===item.id?" act":""}`}>
                <span style={{flexShrink:0,display:"flex",width:18,alignItems:"center",justifyContent:"center",opacity:page===item.id?1:.65}}>{item.ic}</span>
                {!col&&<><span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis"}}>{item.lbl}</span>{item.badge>0&&<span style={{background:item.bc||"#ef4444",color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700,flexShrink:0}}>{item.badge}</span>}</>}
              </button>
            );
          })}
        </div>

        {/* Bottom user area */}
        <div style={{padding:"10px 8px",borderTop:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
          <button onClick={onExit} className="adm-sb-item" style={{color:"rgba(255,255,255,.6)"}}>
            <span style={{flexShrink:0}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
            {!col&&"Exit to Store"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        {/* Topbar */}
        <div style={{height:60,background:"var(--t-card)",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",padding:"0 20px",gap:12,flexShrink:0,boxShadow:"0 1px 3px rgba(0,0,0,.08)"}}>
          <button onClick={()=>{if(window.innerWidth<=768){setMobOpen(m=>!m);setCol(false);}else{setCol(c=>!c);}}} style={{background:"none",border:"none",cursor:"pointer",padding:6,borderRadius:6,color:"#6b7280",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#f4f5f7"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div style={{fontSize:16,fontWeight:600,color:"#111827",flex:1}}>{TITLES[page]||page}</div>
          {/* Search */}
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#f4f5f7",border:"1px solid #e5e7eb",borderRadius:6,padding:"7px 12px",width:200}} className="hide-mob">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Search..." style={{background:"none",border:"none",outline:"none",fontSize:13,color:"var(--t-text)",width:"100%",fontFamily:"inherit"}}/>
          </div>
          {/* Alerts bell */}
          <button onClick={()=>setPage("alerts")} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",position:"relative",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#f4f5f7"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            {aC>0&&<span style={{position:"absolute",top:4,right:4,width:8,height:8,background:"#ef4444",borderRadius:"50%",border:"2px solid #fff"}}/>}
          </button>
          <button onClick={onExit} style={{background:"#0f0d0a",color:"#fff",border:"none",padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#2a2520"} onMouseLeave={e=>e.currentTarget.style.background="#0f0d0a"}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View Store
          </button>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"clamp(16px,2vw,24px)",background:"#f4f5f7"}}>
          {sb?(()=>{try{return PAGES[page]?.()||<div style={{padding:40,textAlign:"center",color:"#9ca3af"}}>Loading...</div>;}catch(e){return<div style={{padding:40,textAlign:"center"}}><div style={{fontSize:30}}>⚠️</div><div style={{color:"#ef4444",marginTop:8,fontSize:13}}>{e.message}</div></div>;}})():(
            <div style={{textAlign:"center",padding:60,color:"#9ca3af"}}>
              <div style={{fontSize:40,marginBottom:12}}>⚙️</div>
              <div style={{fontWeight:600,fontSize:16,color:"#374151"}}>Supabase Not Connected</div>
              <div style={{fontSize:13,marginTop:8}}>Add env vars in Vercel Settings</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* SVG Icons */
const UserIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const WaBcIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const UdhaarIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

const DashIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const OrdIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 12 2 2 4-4"/></svg>;
const PendIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg>;
const ProdIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const AlertIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const CoupIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const StarIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;
const ChartIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const AnalyticIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>;
const EditIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const MailIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const BrandIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
const SettIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;


// ── Scroll Up Button ──────────────────────────────────────────
function ScrollUpBtn(){
  const[show,setShow]=useState(false);
  useEffect(()=>{
    const handler=()=>setShow(window.scrollY>400);
    window.addEventListener("scroll",handler,{passive:true});
    return()=>window.removeEventListener("scroll",handler);
  },[]);
  if(!show)return null;
  return(
    <button
      onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
      style={{position:"fixed",bottom:28,left:16,zIndex:800,
        width:40,height:40,borderRadius:"50%",
        background:"#1a1612",color:"var(--t-accent)",border:"1px solid rgba(201,168,76,.3)",
        fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",
        justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,.25)",
        transition:"all .25s",
      }}
      onMouseEnter={e=>{e.currentTarget.style.background="#c9a84c";e.currentTarget.style.color="#000";}}
      onMouseLeave={e=>{e.currentTarget.style.background="#1a1612";e.currentTarget.style.color="#c9a84c";}}
      title="Back to top"
    >↑</button>
  );
}



// ── Professional Icons ────────────────────────────────────────
const DotsVert=()=><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>;
const DotsHoriz=()=><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>;
const ChevronDown=()=><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4"/></svg>;
const CloseIcon=()=><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l12 12M13 1L1 13"/></svg>;

// ═══════════════════════════════════════════════════════════════════════════
//  WEBSITE V2 — EDITORIAL PREMIUM DESIGN
//  Full-screen overlay at z-index 200; existing modals (9990+) float on top.
//  Activated by: Admin → Theme Settings → Enable Premium V2 Design
// ═══════════════════════════════════════════════════════════════════════════
function WebsiteV2({prods,settings,cart,addToCart,toggleWish,wish,cat,setCat,filtered,setCartOpen,user,openModal,vipUnlocked,adminTrigger,setAuthModal,wa}){
  const[scrolled,setScrolled]=useState(false);
  const[mMenu,setMMenu]=useState(false);
  const[srchOpen,setSrchOpen]=useState(false);
  const[srchQ,setSrchQ]=useState("");
  const[sortV2,setSortV2]=useState("new");
  const[hovCat,setHovCat]=useState(null);
  const[hovProd,setHovProd]=useState(null);
  const cRef=useRef(null);

  useEffect(()=>{
    const el=cRef.current;if(!el)return;
    const fn=()=>setScrolled(el.scrollTop>60);
    el.addEventListener("scroll",fn,{passive:true});
    return()=>el.removeEventListener("scroll",fn);
  },[]);

  function s2(id){
    const el=document.getElementById(id);
    const c=cRef.current;
    if(el&&c)c.scrollTo({top:Math.max(0,el.offsetTop-68),behavior:"smooth"});
  }

  const dp=useMemo(()=>{
    let l=[...(filtered||prods||[])];
    if(srchQ.trim()){const q=srchQ.toLowerCase();l=l.filter(p=>(p.name||"").toLowerCase().includes(q)||(p.brand||"").toLowerCase().includes(q)||(p.color||"").toLowerCase().includes(q));}
    if(sortV2==="price_asc")l.sort((a,b)=>Number(a.sale_price||a.price||0)-Number(b.sale_price||b.price||0));
    else if(sortV2==="price_desc")l.sort((a,b)=>Number(b.sale_price||b.price||0)-Number(a.sale_price||a.price||0));
    else if(sortV2==="name")l.sort((a,b)=>(a.name||"").localeCompare(b.name||""));
    return l;
  },[filtered,prods,srchQ,sortV2]);

  const cartCount=cart.reduce((s,x)=>s+x.qty,0);
  const featP=(prods||[]).find(p=>p.featured&&p.active!==false&&(p.img1||p.photo_url));
  const featProds=(prods||[]).filter(p=>p.featured&&p.active!==false);

  const catCards=[
    {c:"WU",l:"Women Unstitched",sub:"Lawn · Khaddar · Linen · Chiffon",bg:"#0e0a04",ac:"#d4a840"},
    {c:"WS",l:"Women Stitched",sub:"Ready-to-Wear · Kurtis",bg:"#08101a",ac:"#4ab0d4"},
    {c:"M",l:"Men's Collection",sub:"Khaddar · Suiting · Plain",bg:"#080e0a",ac:"#5ab84a"},
    {c:"K",l:"Kids Wear",sub:"Cute & Comfortable",bg:"#18080e",ac:"#d44ab8"},
    {c:"HOT",l:"Hot Sale 🔥",sub:"Best Deals Right Now",bg:"#160606",ac:"#ef4444"},
    {c:"NEW",l:"New Arrivals ✨",sub:"Fresh Stock · Just In",bg:"#08080e",ac:"#9b5cf6"},
  ];

  return(
    <div ref={cRef} className="jf-v2" style={{position:"fixed",inset:0,zIndex:200,overflowY:"auto",background:"#faf9f7",fontFamily:"'Jost',sans-serif",color:"#0c0a08"}}>
      <style>{`
        .jf-v2,.jf-v2 *{box-sizing:border-box}
        .jf-v2::-webkit-scrollbar{width:3px}
        .jf-v2::-webkit-scrollbar-thumb{background:#ccc;border-radius:4px}
        .v2pc{transition:all .4s cubic-bezier(.16,1,.3,1);cursor:pointer}
        .v2pc:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(0,0,0,.1)}
        .v2btn-g{background:#0c0a08;color:#faf9f7;border:none;padding:13px 34px;font-family:'Jost',sans-serif;font-size:9px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;cursor:pointer;transition:all .3s}
        .v2btn-g:hover{background:#c9a84c;color:#0c0a08}
        .v2btn-o{background:transparent;color:#0c0a08;border:1px solid #0c0a08;padding:11px 26px;font-family:'Jost',sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .3s}
        .v2btn-o:hover{background:#0c0a08;color:#faf9f7}
        @media(max-width:768px){
          .v2-hm{display:none!important}
          .v2-sm{display:flex!important}
          .v2-hg{grid-template-columns:1fr!important}
          .v2-fcg{grid-template-columns:1fr 1fr!important}
        }
        @media(min-width:769px){.v2-sm{display:none!important}}
        @keyframes v2slide{from{transform:translateY(18px);opacity:0}to{transform:none;opacity:1}}
        @keyframes v2ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>

      {/* ── TICKER ── */}
      {settings.show_announcement!=="false"&&(()=>{
        const items=(settings.announcement||"New Arrivals | Exclusive Designs | Fast Delivery | Book on WhatsApp").split("|").map(t=>t.trim());
        const rep=[...items,...items,...items,...items,...items,...items,...items,...items];
        return(
          <div style={{background:"#0c0a08",height:34,overflow:"hidden",display:"flex",alignItems:"center"}}>
            <div style={{display:"flex",animation:"v2ticker 32s linear infinite",whiteSpace:"nowrap"}}>
              {rep.map((t,i)=>(
                <span key={i} style={{padding:"0 32px",fontSize:9,letterSpacing:3,color:"rgba(201,168,76,.82)",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",fontWeight:600}}>✦ {t}</span>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── NAV ── */}
      <nav style={{position:"sticky",top:0,zIndex:90,background:scrolled?"rgba(250,249,247,.96)":"rgba(250,249,247,0)",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid #e8e2d8":"1px solid transparent",transition:"all .35s",boxShadow:scrolled?"0 2px 18px rgba(0,0,0,.06)":"none"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(14px,4vw,52px)",display:"flex",alignItems:"center",height:scrolled?64:76,transition:"height .35s",gap:12}}>
          <div onClick={()=>s2("v2top")} style={{cursor:"pointer",marginRight:"auto",userSelect:"none"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,letterSpacing:3.5,color:"#0c0a08",textTransform:"uppercase",lineHeight:1.1}}>{(settings.store_name||"Jameel Fabrics").toUpperCase()}</div>
            <div style={{fontSize:6.5,letterSpacing:4.5,color:"#c9a84c",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",fontWeight:600}}>Kunjah · Punjab</div>
          </div>
          <div className="v2-hm" style={{display:"flex",gap:0,alignItems:"center"}}>
            {[["All","All"],["WU","Women"],["WS","Stitched"],["M","Men's"],["K","Kids"],["HOT","🔥 Sale"],["NEW","New"]].map(([c,l])=>(
              <button key={c} onClick={()=>{setCat(c);s2("v2prods");}} style={{background:"none",border:"none",borderBottom:`2px solid ${cat===c?"#0c0a08":"transparent"}`,padding:"6px 11px",fontSize:9.5,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'Jost',sans-serif",color:cat===c?"#0c0a08":"#7a6e64",cursor:"pointer",transition:"all .2s"}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <button onClick={()=>setSrchOpen(o=>!o)} style={{width:34,height:34,border:"none",background:"rgba(0,0,0,.05)",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#3a3028",transition:"all .2s"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            {user&&<button onClick={()=>setAuthModal("account")} style={{width:34,height:34,border:"none",background:"rgba(0,0,0,.05)",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"all .2s"}}>👤</button>}
            <button onClick={()=>setCartOpen(true)} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 18px",background:"#0c0a08",color:"#faf9f7",border:"none",cursor:"pointer",fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",transition:"all .25s",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.background="#c9a84c"} onMouseLeave={e=>e.currentTarget.style.background="#0c0a08"}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartCount>0?`Cart (${cartCount})`:"Cart"}
            </button>
            <button className="v2-sm" onClick={()=>setMMenu(o=>!o)} style={{width:34,height:34,border:"none",background:"rgba(0,0,0,.05)",borderRadius:"50%",cursor:"pointer",alignItems:"center",justifyContent:"center",color:"#0c0a08",padding:0}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
            </button>
          </div>
        </div>
        {srchOpen&&(
          <div style={{background:"#faf9f7",borderTop:"1px solid #e8e2d8",padding:"12px clamp(14px,4vw,52px)"}}>
            <div style={{maxWidth:520,margin:"0 auto",display:"flex",gap:8,alignItems:"center",borderBottom:"2px solid #0c0a08",paddingBottom:6}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a8e84" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={srchQ} onChange={e=>setSrchQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){s2("v2prods");setSrchOpen(false);}}} placeholder="Search fabrics, brands, colors…" autoFocus style={{flex:1,border:"none",background:"transparent",fontFamily:"'Jost',sans-serif",fontSize:14,outline:"none",color:"#0c0a08",padding:"4px 0"}}/>
              {srchQ&&<button onClick={()=>setSrchQ("")} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"#9a8e84",lineHeight:1,padding:0}}>×</button>}
            </div>
          </div>
        )}
        {mMenu&&(
          <div style={{background:"#0c0a08",padding:"14px clamp(14px,4vw,52px) 22px"}}>
            {[["All","All Products"],["WU","Women Unstitched"],["WS","Women Stitched"],["M","Men's"],["K","Kids"],["HOT","🔥 Hot Sale"],["NEW","✨ New Arrivals"]].map(([c,l])=>(
              <button key={c} onClick={()=>{setCat(c);setMMenu(false);s2("v2prods");}} style={{display:"block",width:"100%",background:"none",border:"none",borderBottom:"1px solid rgba(255,255,255,.05)",padding:"12px 0",fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:cat===c?"#c9a84c":"rgba(255,255,255,.5)",fontFamily:"'Jost',sans-serif",textAlign:"left",cursor:"pointer"}}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="v2top" style={{background:"#0c0a08",minHeight:"calc(100vh - 34px)",position:"relative",display:"flex",alignItems:"center",overflow:"hidden"}}>
        {settings.hero_banner_url?(
          <>
            <img src={settings.hero_banner_url} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.5}} onError={e=>e.target.style.display="none"}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(12,10,8,.95) 0%,rgba(12,10,8,.55) 65%,rgba(12,10,8,.2) 100%)"}}/>
          </>
        ):(
          <>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#0c0a08 55%,#1c1208 100%)"}}/>
            <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(201,168,76,.065) 1px,transparent 0)",backgroundSize:"40px 40px"}}/>
            <div style={{position:"absolute",right:0,top:0,bottom:0,width:"42%",background:"linear-gradient(150deg,#140e04,#200e02)",clipPath:"polygon(14% 0,100% 0,100% 100%,0% 100%)",opacity:.65}}/>
          </>
        )}
        <div style={{position:"relative",zIndex:2,width:"100%",maxWidth:1400,margin:"0 auto",padding:"clamp(56px,10vh,120px) clamp(16px,5vw,52px) clamp(52px,8vh,96px)",display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",gap:"clamp(32px,5vw,72px)"}} className="v2-hg">
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:18,animation:"v2slide .8s ease .1s both"}}>
              <div style={{width:22,height:1,background:"#c9a84c"}}/>
              <span style={{fontSize:8.5,letterSpacing:5,color:"rgba(201,168,76,.78)",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",fontWeight:600}}>{settings.hlabel||"Premium Collection 2026"}</span>
            </div>
            <div style={{animation:"v2slide .9s ease .18s both"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(52px,10vw,118px)",fontWeight:900,lineHeight:.8,color:"transparent",WebkitTextStroke:"1.5px rgba(255,255,255,.78)",letterSpacing:"-0.02em",textTransform:"uppercase"}}>{(settings.store_name||"JAMEEL FABRICS").split(" ")[0]||"JAMEEL"}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(52px,10vw,118px)",fontWeight:900,lineHeight:.8,color:"#c9a84c",letterSpacing:"-0.02em",textTransform:"uppercase"}}>{(settings.store_name||"JAMEEL FABRICS").split(" ").slice(1).join(" ")||"FABRICS"}</div>
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"clamp(12px,1.4vw,17px)",color:"rgba(255,255,255,.32)",letterSpacing:"0.4em",marginTop:15,animation:"v2slide .8s ease .3s both"}}>Kunjah · Punjab · Pakistan</div>
            <div style={{width:30,height:1,background:"rgba(201,168,76,.5)",margin:"15px 0",animation:"v2slide .6s ease .38s both"}}/>
            <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:"clamp(12px,1.1vw,14px)",color:"rgba(255,255,255,.4)",lineHeight:2,maxWidth:420,marginBottom:26,animation:"v2slide .8s ease .44s both"}}>{settings.about||"Pakistan ke sab se best branded fabrics — Men, Women aur Kids ke liye. Authentic brands, best prices, nationwide delivery."}</p>
            <div style={{display:"flex",gap:9,flexWrap:"wrap",animation:"v2slide .8s ease .52s both"}}>
              <button className="v2btn-g" onClick={()=>s2("v2prods")}>Shop Collection</button>
              <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <button style={{display:"flex",alignItems:"center",gap:8,padding:"13px 26px",background:"transparent",color:"rgba(255,255,255,.62)",border:"1px solid rgba(255,255,255,.2)",fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:600,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#25d366";e.currentTarget.style.color="#25d366";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.2)";e.currentTarget.style.color="rgba(255,255,255,.62)";}}>
                  <WaSvg/> WhatsApp
                </button>
              </a>
            </div>
            <div style={{display:"flex",gap:24,marginTop:34,paddingTop:26,borderTop:"1px solid rgba(255,255,255,.07)",animation:"v2slide .8s ease .62s both"}}>
              {[["500+","Customers"],["50+","Brands"],["1975","Est."],["🚚","Delivery"]].map(([n,l])=>(
                <div key={l}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,2.2vw,23px)",fontWeight:700,color:"#c9a84c",lineHeight:1,fontStyle:"italic"}}>{n}</div>
                  <div style={{fontSize:7,color:"rgba(255,255,255,.28)",letterSpacing:2.5,textTransform:"uppercase",marginTop:3,fontFamily:"'Jost',sans-serif"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {featP&&(()=>{
            const img=featP.img1||featP.photo_url;
            const price=Number(featP.sale_price||featP.price||0);
            const old=featP.old_price?Number(featP.old_price):null;
            return(
              <div className="v2-hm" style={{width:"clamp(195px,20vw,260px)",flexShrink:0,cursor:"pointer",animation:"v2slide .9s ease .36s both"}} onClick={()=>openModal(featP)}>
                <div style={{aspectRatio:"3/4",overflow:"hidden",position:"relative",boxShadow:"0 30px 80px rgba(0,0,0,.62)"}}>
                  <img src={img} alt={featP.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .7s"}} onError={e=>e.target.style.display="none"} onMouseEnter={e=>e.target.style.transform="scale(1.06)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 52%)"}}/>
                  {featP.badge&&<div style={{position:"absolute",top:10,left:10,background:"#c9a84c",color:"#0c0a08",padding:"3px 8px",fontSize:7,fontWeight:800,letterSpacing:2}}>{featP.badge}</div>}
                  <div style={{position:"absolute",top:10,right:10,background:"rgba(201,168,76,.92)",width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>⭐</div>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px"}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.3,marginBottom:4}}>{featP.name}</div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      {old&&<span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:"rgba(255,255,255,.32)",textDecoration:"line-through"}}>Rs.{old.toLocaleString()}</span>}
                      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"#c9a84c",fontStyle:"italic"}}>Rs.{price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div style={{marginTop:6,textAlign:"center",fontSize:8,color:"rgba(255,255,255,.22)",letterSpacing:2,textTransform:"uppercase",fontFamily:"'Jost',sans-serif"}}>Featured — Tap to View</div>
              </div>
            );
          })()}
        </div>
        <div onClick={()=>s2("v2cats")} style={{position:"absolute",bottom:20,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",animation:"v2slide 1s ease 1.2s both"}}>
          <span style={{fontSize:7,letterSpacing:3,color:"rgba(255,255,255,.2)",textTransform:"uppercase",fontFamily:"'Jost',sans-serif"}}>Explore</span>
          <div style={{width:1,height:22,background:"linear-gradient(to bottom,rgba(255,255,255,.2),transparent)"}}/>
        </div>
        <div onClick={adminTrigger} onTouchEnd={adminTrigger} style={{position:"absolute",bottom:0,left:0,width:50,height:50,opacity:0,zIndex:10,cursor:"default"}}/>
      </section>

      {/* ── EID COUNTDOWN ── */}
      {settings.show_countdown==="true"&&<EidCountdown settings={settings}/>}

      {/* ── CATEGORY GRID ── */}
      <section id="v2cats" style={{padding:"clamp(50px,6.5vh,80px) clamp(16px,4vw,52px)",background:"#f5f2ed"}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"clamp(24px,3vh,38px)",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:8.5,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:7,fontFamily:"'Jost',sans-serif"}}>Collections</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(23px,3.5vw,44px)",fontWeight:700,color:"#0c0a08",lineHeight:.9,margin:0}}>Shop by <em>Category</em></h2>
            </div>
            <button className="v2btn-o" onClick={()=>{setCat("All");s2("v2prods");}}>View All →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}} className="v2-fcg">
            {catCards.map((ci,i)=>{
              const hv=hovCat===ci.c;
              const cnt=(prods||[]).filter(p=>p.cat===ci.c||p.category===ci.c).length;
              return(
                <div key={ci.c} onClick={()=>{setCat(ci.c);s2("v2prods");}} onMouseEnter={()=>setHovCat(ci.c)} onMouseLeave={()=>setHovCat(null)}
                  style={{position:"relative",height:i<2?"clamp(155px,19vh,234px)":"clamp(108px,12.5vh,150px)",background:ci.bg,cursor:"pointer",overflow:"hidden",transform:hv?"scale(1.025)":"scale(1)",transition:"transform .38s cubic-bezier(.16,1,.3,1)"}}>
                  <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,.022) 1px,transparent 0)",backgroundSize:"18px 18px"}}/>
                  <div style={{position:"absolute",top:10,left:12,width:6,height:6,borderRadius:"50%",background:ci.ac,boxShadow:`0 0 8px ${ci.ac}88`}}/>
                  <div style={{position:"absolute",top:9,right:11,fontSize:8,color:"rgba(255,255,255,.28)",background:"rgba(255,255,255,.05)",padding:"2px 6px",fontFamily:"'Jost',sans-serif"}}>{cnt} items</div>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 14px",background:"linear-gradient(to top,rgba(0,0,0,.6),transparent)"}}>
                    <div style={{fontSize:i<2?15:13,fontWeight:700,color:"#fff",fontFamily:"'Cormorant Garamond',serif",lineHeight:1.2}}>{ci.l}</div>
                    <div style={{fontSize:7.5,color:`${ci.ac}cc`,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'Jost',sans-serif",marginTop:2,opacity:hv?1:.52,transform:hv?"translateY(0)":"translateY(2px)",transition:"all .3s"}}>{ci.sub}</div>
                  </div>
                  <div style={{position:"absolute",bottom:12,right:13,color:ci.ac,fontSize:13,opacity:hv?1:0,transform:hv?"translateX(0)":"translateX(-5px)",transition:"all .28s"}}>→</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED STRIP ── */}
      {featProds.length>0&&(
        <section style={{background:"#0c0a08",padding:"clamp(46px,6vh,70px) 0"}}>
          <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(16px,4vw,52px)",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontSize:8.5,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:7,fontFamily:"'Jost',sans-serif"}}>Curated Picks</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(23px,3.5vw,44px)",fontWeight:700,color:"#fff",lineHeight:.9,margin:0}}>Featured <em style={{color:"#c9a84c"}}>Products</em></h2>
              </div>
              <button onClick={()=>s2("v2prods")} style={{background:"none",border:"1px solid rgba(255,255,255,.16)",padding:"9px 20px",fontSize:9,fontWeight:600,letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Jost',sans-serif",color:"rgba(255,255,255,.48)",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.55)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.16)"}>See All →</button>
            </div>
          </div>
          <div style={{display:"flex",gap:12,padding:"0 clamp(16px,4vw,52px)",overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",scrollSnapType:"x mandatory"}}>
            {featProds.map(p=>{
              const img=p.img1||p.photo_url;
              const price=Number(p.sale_price||p.price||0);
              const old=p.old_price?Number(p.old_price):null;
              return(
                <div key={p.id} style={{flexShrink:0,width:"clamp(175px,17vw,230px)",scrollSnapAlign:"start"}}>
                  <div onClick={()=>openModal(p)} style={{aspectRatio:"3/4",overflow:"hidden",position:"relative",background:"#1a1410",cursor:"pointer"}}>
                    {img?<img src={img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s"}} onError={e=>e.target.style.display="none"} onMouseEnter={e=>e.target.style.transform="scale(1.06)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>:
                      <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:44}}>{p.icon||"🛍️"}</div>}
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 52%)"}}/>
                    {p.badge&&<div style={{position:"absolute",top:8,left:8,background:"#c9a84c",color:"#0c0a08",padding:"2px 7px",fontSize:7,fontWeight:800,letterSpacing:2}}>{p.badge}</div>}
                    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 12px"}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,fontWeight:700,color:"#fff",lineHeight:1.3}}>{p.name}</div>
                      <div style={{display:"flex",gap:5,alignItems:"center",marginTop:3}}>
                        {old&&<span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:"rgba(255,255,255,.3)",textDecoration:"line-through"}}>Rs.{old.toLocaleString()}</span>}
                        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,color:"#c9a84c",fontStyle:"italic"}}>Rs.{price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={()=>addToCart(p)} style={{width:"100%",padding:"8px",background:"transparent",color:"rgba(255,255,255,.4)",border:"1px solid rgba(255,255,255,.09)",fontFamily:"'Jost',sans-serif",fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",marginTop:3,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#c9a84c";e.currentTarget.style.color="#0c0a08";e.currentTarget.style.borderColor="#c9a84c";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,.4)";e.currentTarget.style.borderColor="rgba(255,255,255,.09)";}}>+ Add to Cart</button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── AI SUGGESTER ── */}
      {settings.show_ai_suggester!=="false"&&<AIOutfitSuggester prods={prods} onFilter={c=>{setCat(c);s2("v2prods");}}/>}

      {/* ── PRODUCTS GRID ── */}
      <section id="v2prods" style={{background:"#fff",padding:"clamp(46px,6vh,70px) clamp(16px,4vw,52px)",borderTop:"1px solid #ece8e2"}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:8.5,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:5,fontFamily:"'Jost',sans-serif"}}>{cat==="All"?"Full Collection":CAT_L[cat]||cat}</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,3vw,36px)",fontWeight:700,color:"#0c0a08",lineHeight:.9,margin:0,display:"flex",alignItems:"center",gap:10}}>
                {cat==="All"?"All Products":CAT_L[cat]||cat}
                <span style={{fontFamily:"'Jost',sans-serif",fontSize:12,fontWeight:300,color:"#9a8e84",fontStyle:"normal"}}>{dp.length} items</span>
              </h2>
            </div>
            <select value={sortV2} onChange={e=>setSortV2(e.target.value)} style={{border:"1px solid #d8d0c4",background:"#fff",padding:"8px 12px",fontSize:11,fontFamily:"'Jost',sans-serif",color:"#0c0a08",cursor:"pointer",outline:"none"}}>
              <option value="new">Newest First</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="name">A–Z</option>
            </select>
          </div>
          <div style={{display:"flex",gap:5,marginBottom:20,overflowX:"auto",scrollbarWidth:"none",paddingBottom:3}}>
            {[["All","All"],["WU","Women Un."],["WS","Women St."],["M","Men's"],["K","Kids"],["HOT","🔥 Sale"],["NEW","New"],["2PC","2-Piece"]].map(([c,l])=>(
              <button key={c} onClick={()=>setCat(c)} style={{flexShrink:0,padding:"5px 12px",border:`1px solid ${cat===c?"#0c0a08":"#d8d0c4"}`,background:cat===c?"#0c0a08":"transparent",color:cat===c?"#faf9f7":"#5a5248",fontFamily:"'Jost',sans-serif",fontSize:8.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"all .2s"}}>{l}</button>
            ))}
          </div>
          {dp.length===0?(
            <div style={{textAlign:"center",padding:"52px 20px"}}>
              <div style={{fontSize:40,marginBottom:11}}>🔍</div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#0c0a08",marginBottom:11}}>No results found</h3>
              <p style={{fontSize:13,color:"#7a6e64",marginBottom:18,fontFamily:"'Jost',sans-serif"}}>Try a different category or search term</p>
              <button className="v2btn-g" onClick={()=>{setCat("All");setSrchQ("");}}>Clear Filters</button>
            </div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(clamp(148px,17vw,210px),1fr))",gap:15}}>
              {dp.map(p=>{
                const img=p.img1||p.photo_url;
                const price=Number(p.sale_price||p.price||0);
                const old=p.old_price?Number(p.old_price):null;
                const isW=wish.has(p.id);
                const hv=hovProd===p.id;
                return(
                  <div key={p.id} className="v2pc" onMouseEnter={()=>setHovProd(p.id)} onMouseLeave={()=>setHovProd(null)}
                    style={{background:"#fff",border:`1px solid ${hv?"#0c0a08":"#e8e2d8"}`,position:"relative"}}>
                    <div onClick={()=>openModal(p)} style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#f0ece4",cursor:"pointer"}}>
                      {img?<img src={img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transform:hv?"scale(1.05)":"scale(1)",transition:"transform .6s cubic-bezier(.16,1,.3,1)"}} onError={e=>e.target.style.display="none"}/>:
                        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5}}>
                          <span style={{fontSize:"clamp(38px,5.5vw,54px)"}}>{p.icon||"🛍️"}</span>
                          <span style={{fontSize:8,color:"#8a7e74",letterSpacing:2,textTransform:"uppercase",fontFamily:"'Jost',sans-serif"}}>{CAT_L[p.cat]||"Fabric"}</span>
                        </div>}
                      <div style={{position:"absolute",inset:0,background:"rgba(12,10,8,.42)",opacity:hv?1:0,transition:"opacity .38s",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
                        <button onClick={e=>{e.stopPropagation();openModal(p);}} style={{background:"#faf9f7",color:"#0c0a08",border:"none",padding:"8px 20px",fontSize:8.5,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"'Jost',sans-serif",textTransform:"uppercase",transform:hv?"translateY(0)":"translateY(8px)",transition:"transform .28s"}}>Quick View</button>
                        <button onClick={e=>{e.stopPropagation();addToCart(p);}} style={{background:"transparent",color:"rgba(255,255,255,.8)",border:"1px solid rgba(255,255,255,.35)",padding:"7px 18px",fontSize:8.5,fontWeight:600,letterSpacing:1.5,cursor:"pointer",fontFamily:"'Jost',sans-serif",textTransform:"uppercase",transform:hv?"translateY(0)":"translateY(8px)",transition:"transform .28s .04s"}}>Add to Cart</button>
                      </div>
                      {p.badge&&<div style={{position:"absolute",top:8,left:8,background:p.badge==="SALE"||p.badge==="HOT"?"#b91c1c":"#0c0a08",color:"#fff",padding:"2px 7px",fontSize:7,fontWeight:800,letterSpacing:2}}>{p.badge}</div>}
                      <button onClick={e=>{e.stopPropagation();toggleWish(p.id);}} style={{position:"absolute",top:8,right:8,width:28,height:28,borderRadius:"50%",background:"rgba(250,249,247,.92)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:hv||isW?1:0,transition:"opacity .3s",padding:0}}>
                        <svg width="12" height="12" viewBox="0 0 24 24" stroke={isW?"#b91c1c":"#7a6e64"} strokeWidth="1.5" fill={isW?"#b91c1c":"none"}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </button>
                    </div>
                    <div onClick={()=>openModal(p)} style={{padding:"11px 13px 14px",cursor:"pointer"}}>
                      <div style={{fontSize:8,color:"#8a7e74",letterSpacing:2,textTransform:"uppercase",marginBottom:3,fontFamily:"'Jost',sans-serif"}}>{CAT_L[p.cat]||p.category||""}</div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700,color:"#0c0a08",lineHeight:1.3,marginBottom:2}}>{p.name}</div>
                      {p.brand&&<div style={{fontSize:10,color:"#8a7e74",marginBottom:3,fontFamily:"'Jost',sans-serif"}}>{p.brand}</div>}
                      {p.display_stock_text&&<div style={{fontSize:10,color:"#b91c1c",marginBottom:3,fontFamily:"'Jost',sans-serif",fontWeight:600}}>{p.display_stock_text}</div>}
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:5}}>
                        <div>
                          {old&&<div style={{fontSize:11,color:"#b8a89a",textDecoration:"line-through",fontFamily:"'Cormorant Garamond',serif"}}>Rs.{old.toLocaleString()}</div>}
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:old?"#b91c1c":"#c9a84c",fontStyle:"italic"}}>Rs.{price.toLocaleString()}</div>
                        </div>
                        <button onClick={e=>{e.stopPropagation();addToCart(p);}} style={{width:32,height:32,background:"#0c0a08",color:"#faf9f7",border:"none",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,transition:"background .2s",padding:0}} onMouseEnter={e=>e.currentTarget.style.background="#c9a84c"} onMouseLeave={e=>e.currentTarget.style.background="#0c0a08"}>+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── MYSTERY GIFT ── */}
      {settings.show_mystery!=="false"&&<MysteryGiftSection settings={settings} user={user} onAuth={()=>setAuthModal("login")} products={prods}/>}

      {/* ── OUR STORY ── */}
      {settings.show_our_story!=="false"&&(
        <section style={{background:"#0c0a08",padding:"clamp(50px,6.5vh,80px) clamp(16px,4vw,52px)"}}>
          <div style={{maxWidth:1400,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(30px,5vw,64px)",alignItems:"center"}} className="v2-hg">
            <div>
              <div style={{fontSize:8.5,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:12,fontFamily:"'Jost',sans-serif"}}>Our Legacy</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,7vw,88px)",fontWeight:900,lineHeight:.82,marginBottom:14}}>
                <span style={{color:"transparent",WebkitTextStroke:"1.2px rgba(255,255,255,.55)"}}>Est.</span><br/>
                <em style={{color:"#c9a84c"}}>1975</em>
              </div>
              <div style={{width:26,height:1,background:"rgba(201,168,76,.45)",marginBottom:16}}/>
              <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:"clamp(12px,1.1vw,14px)",color:"rgba(255,255,255,.4)",lineHeight:2,maxWidth:360,marginBottom:24}}>{settings.story_text||"Kunjah ki mashoor dukan — Jameel Fabrics 1975 se Pakistan ke behtareen branded kapde provide kar rahi hai. Men, Women aur Kids ke liye authentic fabrics, best prices ke saath."}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
                {[[settings.story_stat1||"50+",settings.story_label1||"Brands"],[settings.story_stat2||"500+",settings.story_label2||"Customers"],[settings.story_stat3||"48yrs",settings.story_label3||"Legacy"]].map(([n,l])=>(
                  <div key={l} style={{borderLeft:"2px solid rgba(201,168,76,.28)",paddingLeft:12}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,2.2vw,25px)",fontWeight:700,color:"#c9a84c",lineHeight:1,fontStyle:"italic"}}>{n}</div>
                    <div style={{fontSize:7.5,color:"rgba(255,255,255,.26)",letterSpacing:2.5,textTransform:"uppercase",marginTop:3,fontFamily:"'Jost',sans-serif"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="v2-hm" style={{aspectRatio:"4/5",background:"linear-gradient(145deg,#160e04,#22160a)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(201,168,76,.052) 1px,transparent 0)",backgroundSize:"24px 24px"}}/>
              <div style={{position:"relative",zIndex:1,textAlign:"center",padding:24}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(52px,8.5vw,102px)",fontWeight:900,color:"transparent",WebkitTextStroke:"1px rgba(201,168,76,.26)",lineHeight:.85,marginBottom:12}}>JF</div>
                <div style={{fontSize:7.5,letterSpacing:5,color:"rgba(201,168,76,.32)",textTransform:"uppercase",fontFamily:"'Jost',sans-serif"}}>Jameel Fabrics</div>
                <div style={{fontSize:6.5,letterSpacing:4,color:"rgba(255,255,255,.16)",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",marginTop:4}}>Kunjah · Punjab</div>
              </div>
              <div style={{position:"absolute",bottom:-12,right:-12,width:"52%",height:"52%",border:"1px solid rgba(201,168,76,.1)",pointerEvents:"none"}}/>
              <div style={{position:"absolute",top:16,left:16,width:"28%",height:"28%",border:"1px solid rgba(201,168,76,.07)",pointerEvents:"none"}}/>
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ── */}
      {settings.show_why_us!=="false"&&(
        <section style={{background:"#f5f2ed",padding:"clamp(50px,6.5vh,78px) clamp(16px,4vw,52px)",borderTop:"1px solid #e4dec8"}}>
          <div style={{maxWidth:1400,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"clamp(26px,3vh,42px)"}}>
              <div style={{fontSize:8.5,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:8,fontFamily:"'Jost',sans-serif"}}>Why Choose Us</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(23px,3.5vw,44px)",fontWeight:700,color:"#0c0a08",lineHeight:.9,margin:0}}>The Jameel <em>Difference</em></h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:1,background:"#d8d0c4"}}>
              {[
                [settings.feat1_title||"Authentic Brands",settings.feat1_desc||"100% genuine fabric, directly sourced from top manufacturers.","◈"],
                [settings.feat2_title||"Best Prices",settings.feat2_desc||"Competitive rates on every collection — always the best deals.","◇"],
                [settings.feat3_title||"Nationwide Delivery",settings.feat3_desc||"Fast, reliable courier service across all of Pakistan.","◉"],
                [settings.feat4_title||"Trusted Since 1975",settings.feat4_desc||"Nearly 50 years of serving loyal customers in Kunjah and beyond.","◈"],
              ].map(([t,d,ic])=>(
                <div key={t} style={{padding:"clamp(20px,2.8vh,32px) 22px",background:"#f5f2ed",transition:"background .28s"}} onMouseEnter={e=>e.currentTarget.style.background="#ede8de"} onMouseLeave={e=>e.currentTarget.style.background="#f5f2ed"}>
                  <div style={{fontSize:20,color:"#c9a84c",marginBottom:10,fontFamily:"'Cormorant Garamond',serif"}}>{ic}</div>
                  <div style={{fontSize:14.5,fontWeight:700,color:"#0c0a08",marginBottom:7,fontFamily:"'Cormorant Garamond',serif"}}>{t}</div>
                  <div style={{fontSize:12,color:"#6a5e54",lineHeight:1.78,fontFamily:"'Jost',sans-serif",fontWeight:300}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEWS ── */}
      {settings.show_reviews!=="false"&&(
        <section style={{background:"#fff",padding:"clamp(50px,6.5vh,78px) clamp(16px,4vw,52px)",borderTop:"1px solid #ece8e2"}}>
          <div style={{maxWidth:1400,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"clamp(24px,3vh,40px)",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontSize:8.5,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:8,fontFamily:"'Jost',sans-serif"}}>Testimonials</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(23px,3.5vw,44px)",fontWeight:700,color:"#0c0a08",lineHeight:.9,margin:0}}>Customer <em>Reviews</em></h2>
              </div>
              {settings.google_maps_url&&(
                <a href={settings.google_maps_url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid #e0d8cc",padding:"8px 14px",textDecoration:"none",transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#0c0a08"} onMouseLeave={e=>e.currentTarget.style.borderColor="#e0d8cc"}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/></svg>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:"#0c0a08",fontFamily:"'Jost',sans-serif"}}>Google Reviews</div>
                    {settings.google_rating&&<div style={{fontSize:10,color:"#f59e0b"}}>{"★".repeat(Math.round(Number(settings.google_rating||5)))} {settings.google_rating}/5</div>}
                  </div>
                </a>
              )}
            </div>
            <ReviewsSection googleMapsUrl={settings.google_maps_url} googleRating={settings.google_rating}/>
          </div>
        </section>
      )}

      {/* ── VIP SECTION ── */}
      {vipUnlocked&&settings.show_vip!=="false"&&(
        <section style={{background:"linear-gradient(135deg,#0c0a08,#1c140a)",padding:"clamp(50px,6.5vh,78px) clamp(16px,4vw,52px)"}}>
          <div style={{maxWidth:1400,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:26}}>
              <div style={{fontSize:8.5,letterSpacing:5,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:8,fontFamily:"'Jost',sans-serif"}}>Exclusive Access</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(24px,4vw,50px)",fontWeight:700,color:"#fff",margin:0}}>👑 VIP <em style={{color:"#c9a84c"}}>Collection</em></h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(clamp(162px,17vw,218px),1fr))",gap:15}}>
              {(prods||[]).filter(p=>p.active!==false).slice(0,4).map(p=>(
                <div key={p.id} onClick={()=>openModal(p)} style={{cursor:"pointer",opacity:.88,transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=".88"}>
                  <PCard prod={p} onAdd={addToCart} onWish={toggleWish} wished={wish.has(p.id)} onOpenModal={openModal} onPriceDrop={()=>{}}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ── */}
      <NewsletterBar/>

      {/* ── FOOTER ── */}
      <footer style={{background:"#0c0a08",color:"rgba(255,255,255,.45)",padding:"clamp(42px,5.5vh,65px) clamp(16px,4vw,52px) 18px"}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"clamp(22px,4vw,50px)",marginBottom:34,alignItems:"start"}} className="v2-hg">
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:23,fontWeight:700,color:"#fff",letterSpacing:4,marginBottom:2,textTransform:"uppercase"}}>{settings.store_name||"Jameel Fabrics"}</div>
              <div style={{fontSize:6.5,letterSpacing:4.5,color:"#c9a84c",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",marginBottom:14}}>Est. 1975 · Kunjah · Punjab</div>
              <p style={{fontSize:11.5,lineHeight:1.88,color:"rgba(255,255,255,.28)",maxWidth:250,fontFamily:"'Jost',sans-serif",fontWeight:300,marginBottom:18}}>{settings.about||"Premium branded fabrics for Men, Women & Kids. Authentic brands, best prices."}</p>
              <div style={{display:"flex",gap:7}}>
                {wa&&<a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{width:30,height:30,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",color:"rgba(255,255,255,.42)",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#25d366";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.color="rgba(255,255,255,.42)";}}>
                  <WaSvg/>
                </a>}
                {settings.insta&&<a href={settings.insta} target="_blank" rel="noopener noreferrer" style={{width:30,height:30,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,textDecoration:"none",color:"rgba(255,255,255,.42)",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#e1306c";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.color="rgba(255,255,255,.42)";}}>IG</a>}
                {settings.fb&&<a href={settings.fb} target="_blank" rel="noopener noreferrer" style={{width:30,height:30,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,textDecoration:"none",color:"rgba(255,255,255,.42)",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#1877f2";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.color="rgba(255,255,255,.42)";}}>FB</a>}
              </div>
            </div>
            <div>
              <div style={{fontSize:8.5,letterSpacing:3,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:15,fontFamily:"'Jost',sans-serif"}}>Collections</div>
              {[["All Products","All"],["Women Unstitched","WU"],["Women Stitched","WS"],["Men's","M"],["Kids","K"],["Hot Sale","HOT"],["New Arrivals","NEW"]].map(([l,c])=>(
                <div key={l} onClick={()=>{setCat(c);s2("v2prods");}} style={{fontSize:12,color:"rgba(255,255,255,.28)",marginBottom:9,cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.75)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.28)"}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:8.5,letterSpacing:3,color:"#c9a84c",textTransform:"uppercase",fontWeight:700,marginBottom:15,fontFamily:"'Jost',sans-serif"}}>Contact Us</div>
              {settings.addr1&&<div style={{fontSize:12,color:"rgba(255,255,255,.28)",marginBottom:7,fontFamily:"'Jost',sans-serif"}}>{settings.addr1}</div>}
              {settings.addr2&&<div style={{fontSize:12,color:"rgba(255,255,255,.28)",marginBottom:7,fontFamily:"'Jost',sans-serif"}}>{settings.addr2}</div>}
              {settings.hours&&<div style={{fontSize:12,color:"rgba(255,255,255,.28)",marginBottom:7,fontFamily:"'Jost',sans-serif"}}>⏰ {settings.hours}</div>}
              {settings.phone&&<a href={"tel:"+settings.phone} style={{fontSize:12,color:"rgba(255,255,255,.28)",marginBottom:7,display:"block",fontFamily:"'Jost',sans-serif",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.75)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.28)"}>📞 {settings.phone}</a>}
              {settings.map_url&&<a href={settings.map_url} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#c9a84c",textDecoration:"none",display:"block",marginTop:5,fontFamily:"'Jost',sans-serif",transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".6"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>📍 Get Directions →</a>}
              {wa&&<a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,marginTop:13,background:"#25d366",color:"#fff",padding:"9px 16px",textDecoration:"none",fontSize:10,fontWeight:700,fontFamily:"'Jost',sans-serif",transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <WaSvg/> Order on WhatsApp
              </a>}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:14,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,.16)",fontFamily:"'Jost',sans-serif"}}>© {new Date().getFullYear()} {settings.store_name||"Jameel Fabrics"} · All rights reserved</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.1)",fontFamily:"'Jost',sans-serif"}}>Pakistan-wide Delivery · Authentic Brands · Est. 1975</div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WA ── */}
      {wa&&<a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:22,right:22,width:50,height:50,background:"#25D366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 5px 22px rgba(37,211,102,.38)",zIndex:250,textDecoration:"none",color:"#fff",transition:"transform .3s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><WaSvg/></a>}

      {/* ── BACK TO TOP ── */}
      <button onClick={()=>cRef.current?.scrollTo({top:0,behavior:"smooth"})} style={{position:"fixed",bottom:82,right:22,width:36,height:36,background:"rgba(12,10,8,.78)",border:"1px solid rgba(255,255,255,.12)",borderRadius:"50%",cursor:"pointer",color:"rgba(255,255,255,.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:250,backdropFilter:"blur(6px)",transition:"all .3s",padding:0}} onMouseEnter={e=>e.currentTarget.style.background="#c9a84c"} onMouseLeave={e=>e.currentTarget.style.background="rgba(12,10,8,.78)"}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    </div>
  );
}


export default function App(){
  const[view,setView]=useState("intro");
  const[showAdminLogin,setShowAdminLogin]=useState(false);
  const[user,setUser]=useState(null);
  const[siteTheme,setSiteTheme]=useState(()=>{
    try{
      const t=localStorage.getItem("jf_theme");
      if(t&&SITE_THEMES[t])return t;
      // If stored theme no longer exists, clear and use default
      localStorage.removeItem("jf_theme");
    }catch{}
    return "Black Gold";
  });
  const TH=SITE_THEMES[siteTheme]||SITE_THEMES["Black Gold"];
  function applyTheme(name){
    setSiteTheme(name);
    try{localStorage.setItem("jf_theme",name);}catch{}
  }
  // Theme change listener (for admin panel live preview)
  useEffect(()=>{
    const handler=e=>applyTheme(e.detail||"Black Gold");
    window.addEventListener("jf-theme-change",handler);
    return()=>window.removeEventListener("jf-theme-change",handler);
  },[]);
  const toasts=useToast();
  useEffect(()=>{if(!sb)return;sb.auth.getSession().then(({data:{session}})=>setUser(session?.user||null));const{data:{subscription}}=sb.auth.onAuthStateChange((_e,s)=>setUser(s?.user||null));return()=>subscription.unsubscribe();},[]);
  useEffect(()=>{
    const handler=e=>{e.preventDefault();};
    window.addEventListener("beforeinstallprompt",handler);
    return()=>window.removeEventListener("beforeinstallprompt",handler);
  },[]);
  useEffect(()=>{if(!sb)return;const ch=sb.channel("g_alerts").on("postgres_changes",{event:"INSERT",schema:"public",table:"website_alerts"},p=>{toast("New stock alert: "+(p.new?.product_name||""));}).subscribe();return()=>sb.removeChannel(ch);},[]);
  useEffect(()=>{
    function checkHash(){if(window.location.hash==="#jfadmin"){window.location.hash="";setShowAdminLogin(true);}}
    checkHash();
    window.addEventListener("hashchange",checkHash);
    // PWA Service Worker
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("/service-worker.js")
        .then(r=>console.log("[JF Website] SW registered:",r.scope))
        .catch(e=>console.warn("[JF Website] SW:",e));
    }
    return()=>window.removeEventListener("hashchange",checkHash);
  },[]);
  // FIX 7 — Google Analytics inject
  useEffect(()=>{
    if(!sb)return;
    sb.from("website_settings").select("value").eq("key","ga_id").single()
      .then(({data})=>{
        const gaId=data?.value;
        if(!gaId||!gaId.startsWith("G-"))return;
        if(document.getElementById("jf-gtag-script"))return;
        const s1=document.createElement("script");
        s1.id="jf-gtag-script";s1.async=true;
        s1.src=`https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(s1);
        const s2=document.createElement("script");s2.id="jf-gtag-init";
        s2.textContent=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname});`;
        document.head.appendChild(s2);
      }).catch(()=>{});
  },[]);
  async function logout(){if(sb)await sb.auth.signOut();setUser(null);toast("Logged out");setView("store");}
  return(<ErrorBoundary>
    <style>{G}</style>
    {view==="intro"&&<ErrorBoundary><Intro onEnter={()=>setView("store")} siteTheme={TH} themeName={siteTheme}/></ErrorBoundary>}
    {view==="store"&&<ErrorBoundary><Store user={user} onLogout={logout} onAccount={()=>user?setView("account"):null} onAdmin={()=>setShowAdminLogin(true)} siteTheme={TH} themeName={siteTheme}/></ErrorBoundary>}
    {view==="account"&&user&&<AccountPage user={user} onBack={()=>setView("store")}/>}
    {view==="admin"&&<ErrorBoundary><AdminPanel onExit={()=>setView("store")}/></ErrorBoundary>}
    {showAdminLogin&&<AdminLogin onSuccess={()=>{setShowAdminLogin(false);setView("admin");}} onCancel={()=>setShowAdminLogin(false)}/>}
    <Toasts list={toasts.list}/>
  </ErrorBoundary>);
}
