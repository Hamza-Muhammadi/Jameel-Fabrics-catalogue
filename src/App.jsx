// ╔══════════════════════════════════════════════════════════════╗
// ║  JAMEEL FABRICS — App.jsx  (All 11 fixes applied)           ║
// ║  Fix 1:  Custom cursor CSS (.jf-cursor-dot, .jf-cursor)     ║
// ║  Fix 2:  Price-drop alert useEffect in Store                ║
// ║  Fix 3:  .feel-badge CSS class added to G                   ║
// ║  Fix 4:  .fs-bar / .fs-prog free-shipping bar CSS in G      ║
// ║  Fix 5:  Duplicate countdown removed (only <CountdownBanner>)║
// ║  Fix 6:  manifest.json patched (separate file)              ║
// ║  Fix 7:  GA gtag script injected dynamically in App         ║
// ║  Fix 8:  SEO meta tags added to index.html (separate file)  ║
// ║  Fix 9:  WhatsApp Broadcast UI in AdminPanel sidebar        ║
// ║  Fix 10: Recently Viewed horizontal strip above footer      ║
// ║  Fix 11: Udhaar/Credit UI with Supabase CRUD in AdminPanel  ║
// ╚══════════════════════════════════════════════════════════════╝

import React,{useState,useEffect,useRef,useCallback}from"react";
import{createClient}from"@supabase/supabase-js";

const SURL=process.env.REACT_APP_SUPABASE_URL||"";
const SKEY=process.env.REACT_APP_SUPABASE_ANON_KEY||"";

// ══════════════════════════════════════════════════════════════
// THEME SYSTEM
// ══════════════════════════════════════════════════════════════
const SITE_THEMES={
  "Blue Beige":{
    id:"blue-beige",
    iLeft:"#1a2c6b",iRight:"#eee8dc",iBrand:"#fff",
    iAccent:"rgba(180,210,255,.7)",iBtn:"#1a2c6b",iBtnText:"#eee8dc",
    iTicker:"rgba(26,44,107,.5)",iTag:"rgba(26,44,107,.1)",
    iEnter:"#1a2c6b",iStore:"rgba(26,44,107,.15)",
    iEyebrow:"rgba(26,44,107,.4)",iBg:"#eee8dc",
    bg:"#eee8dc",card:"#ffffff",surface:"#ddd6c8",
    text:"#0f1f55",muted:"#4a5a8a",border:"#b0bcdc",
    accent:"#1a2c6b",dark:"#0f1f55",darkText:"#eee8dc",
    headingFont:"'Syne',sans-serif",bodyFont:"'Manrope',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@300;400;500&display=swap",
  },
  "Black Gold":{
    id:"black-gold",
    iLeft:"#1a1612",iRight:"#faf9f7",iBrand:"#d4aa50",
    iAccent:"rgba(212,170,80,.8)",iBtn:"#c9a84c",iBtnText:"#0a0806",
    iTicker:"rgba(201,168,76,.55)",iTag:"rgba(201,168,76,.08)",
    iEnter:"#1a1612",iStore:"rgba(26,22,18,.12)",
    iEyebrow:"rgba(26,22,18,.4)",iBg:"#faf9f7",
    bg:"#faf9f7",card:"#ffffff",surface:"#f0ead8",
    text:"#1a1612",muted:"#6a5e55",border:"#d8ce9a",
    accent:"#c9a84c",dark:"#1a1612",darkText:"#f5efe0",
    headingFont:"'Cormorant Garamond',serif",bodyFont:"'Jost',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,500&family=Jost:wght@300;400;500&display=swap",
  },
  "Charcoal Sand":{
    id:"charcoal-sand",
    iLeft:"#1c1a17",iRight:"#ede8e0",iBrand:"#ede8e0",
    iAccent:"rgba(232,226,216,.7)",iBtn:"#1c1a17",iBtnText:"#ede8e0",
    iTicker:"rgba(28,26,23,.5)",iTag:"rgba(28,26,23,.08)",
    iEnter:"#1c1a17",iStore:"rgba(28,26,23,.12)",
    iEyebrow:"rgba(28,26,23,.4)",iBg:"#ede8e0",
    bg:"#ede8e0",card:"#ffffff",surface:"#ddd8cf",
    text:"#1c1a17",muted:"#5a5550",border:"#b8b0a0",
    accent:"#2d2a25",dark:"#1c1a17",darkText:"#ede8e0",
    headingFont:"'Syne',sans-serif",bodyFont:"'Manrope',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@300;400;500&display=swap",
  },
  "Rose Ivory":{
    id:"rose-ivory",
    iLeft:"#6b2c45",iRight:"#fdf5f0",iBrand:"#fff",
    iAccent:"rgba(255,200,210,.8)",iBtn:"#6b2c45",iBtnText:"#fdf5f0",
    iTicker:"rgba(107,44,69,.5)",iTag:"rgba(107,44,69,.08)",
    iEnter:"#6b2c45",iStore:"rgba(107,44,69,.12)",
    iEyebrow:"rgba(107,44,69,.4)",iBg:"#fdf5f0",
    bg:"#fdf5f0",card:"#ffffff",surface:"#f5e8ec",
    text:"#3d1525",muted:"#8a5a68",border:"#e0b8c8",
    accent:"#6b2c45",dark:"#3d1525",darkText:"#fdf5f0",
    headingFont:"'Playfair Display',serif",bodyFont:"'Jost',sans-serif",
    fontImport:"https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Jost:wght@300;400;500&display=swap",
  },
};

const sb=SURL&&SKEY?createClient(SURL,SKEY):null;
const WA_NUM="923228722232";

// ─── Feature Constants ───────────────────────────────────────
const FEEL_OPTS=["Soft","Medium","Stiff"];
const SEASON_OPTS=["Summer","Winter","All-season"];
const CARE_OPTS=["Machine Wash","Hand Wash","Dry Clean Only"];
const SORT_OPTS=[{v:"new",l:"Newest First"},{v:"price_asc",l:"Price: Low to High"},{v:"price_desc",l:"Price: High to Low"},{v:"name",l:"Name A-Z"}];

// ══════════════════════════════════════════════════════════════
// FIX 1 + 3 + 4 — G CSS STRING (custom cursor, feel-badge, fs-bar)
// ══════════════════════════════════════════════════════════════
const G=`
:root{
  --jf-bg:#faf9f7;--jf-card:#fff;--jf-surface:#f5f0e8;
  --jf-text:#1a1612;--jf-muted:#9a8f83;--jf-border:#e8dfc0;
  --jf-accent:#c9a84c;--jf-dark:#1a1612;--jf-dark-text:#f5efe0;
}
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Jost',sans-serif;overflow-x:hidden;background:#faf9f7;color:#111}
img{max-width:100%}
button{font-family:'Jost',sans-serif}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#d0ccc5;border-radius:10px}

/* ── FIX 1: Custom cursor — needle/sewing theme ── */
.jf-cursor{
  position:fixed;
  width:22px;height:22px;
  border:1.5px solid #c9a84c;
  border-radius:50%;
  pointer-events:none;
  z-index:9999;
  transform:translate(-50%,-50%);
  transition:transform .12s ease,width .2s,height .2s,border-color .2s;
  mix-blend-mode:difference;
}
.jf-cursor-dot{
  position:fixed;
  width:5px;height:5px;
  background:#c9a84c;
  border-radius:50%;
  pointer-events:none;
  z-index:9999;
  transform:translate(-50%,-50%);
  /* tiny needle eye shape */
  box-shadow:0 0 0 1px rgba(201,168,76,.3);
}
.jf-cursor.jf-cursor--hover{
  width:38px;height:38px;
  border-color:#1a1612;
  background:rgba(201,168,76,.07);
}
.jf-cursor.jf-cursor--click{
  width:14px;height:14px;
}

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
@keyframes revealUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.rv{opacity:0;transform:translateY(36px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1);}
.rv.visible{opacity:1;transform:translateY(0);}

/* ── FIX 3: Fabric Feel badge ── */
.feel-badge{
  display:inline-block;
  font-size:10px;
  font-weight:600;
  letter-spacing:.5px;
  padding:2px 8px;
  border-radius:20px;
  border:1px solid #d8ce9a;
  background:#fffdf5;
  color:#7a6838;
  line-height:1.4;
  text-transform:capitalize;
}
.feel-badge.feel-soft{border-color:#b8d4b0;background:#f0faf0;color:#3a6b40;}
.feel-badge.feel-medium{border-color:#d8ce9a;background:#fffdf5;color:#7a6838;}
.feel-badge.feel-stiff{border-color:#c4b8c0;background:#f8f5f8;color:#6b5870;}

/* ── FIX 4: Free Shipping Bar ── */
.fs-bar{
  position:relative;
  width:100%;
  background:#f5f0e8;
  border-radius:6px;
  height:22px;
  overflow:hidden;
  margin:8px 0 4px;
  font-size:11px;
  font-weight:600;
  color:#5a4a30;
  display:flex;
  align-items:center;
  padding:0 10px;
}
.fs-bar span{position:relative;z-index:1;white-space:nowrap;}
.fs-prog{
  position:absolute;
  left:0;top:0;bottom:0;
  background:linear-gradient(90deg,#c9a84c,#e8c96a);
  border-radius:6px;
  transition:width .6s cubic-bezier(.4,0,.2,1);
  z-index:0;
}

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

/* Price slider */
input[type=range].price-slider{-webkit-appearance:none;width:100%;height:4px;border-radius:2px;background:linear-gradient(to right,#c9a84c var(--val,50%),#e0d8cc var(--val,50%));outline:none;}
input[type=range].price-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#c9a84c;cursor:pointer;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2);}
/* Gift */
.gift-box{border:2px dashed #c9a84c;border-radius:12px;padding:16px;background:#fffef5;}
/* AI */
.ai-typing::after{content:"▌";animation:blink .7s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
body{background:var(--jf-bg)!important;color:var(--jf-text)!important}
.rv{background:var(--jf-card)!important}
footer{background:var(--jf-dark)!important;color:var(--jf-dark-text)!important}

@media(max-width:768px){
  .mob-hero-banner{display:flex!important;}
  .hero-grid{grid-template-columns:1fr!important;text-align:center;}
  .hero-right{display:none!important;}
  .hero-btns{justify-content:center!important;}
  .two-col{grid-template-columns:1fr!important;}
  .four-col{grid-template-columns:1fr 1fr!important;}
  .footer-grid{grid-template-columns:1fr 1fr!important;}
  .hide-mob{display:none!important;}
  .search-bar{max-width:140px!important;}
  .stat-grid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:480px){
  .four-col{grid-template-columns:1fr!important;}
  .footer-grid{grid-template-columns:1fr!important;}
  .hero-text h1{font-size:clamp(38px,12vw,60px)!important;}
  .stat-grid{grid-template-columns:1fr 1fr!important;}
}
`;

// ──────────────────────────────────────────────────────────────
// GLOBAL TOAST
// ──────────────────────────────────────────────────────────────
let _toastListeners=[];
function toast(msg,type="info"){_toastListeners.forEach(fn=>fn(msg,type));}

function useToast(){
  const[list,setList]=useState([]);
  useEffect(()=>{
    const fn=(msg,type)=>{
      const id=Date.now()+Math.random();
      setList(l=>[...l.slice(-4),{id,msg,type}]);
      setTimeout(()=>setList(l=>l.filter(x=>x.id!==id)),4000);
    };
    _toastListeners.push(fn);
    return()=>{_toastListeners=_toastListeners.filter(x=>x!==fn);};
  },[]);
  return{list};
}

function Toasts({list}){
  return(
    <div style={{position:"fixed",bottom:24,right:16,zIndex:99999,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none"}}>
      {list.map(t=>(
        <div key={t.id} style={{
          background:t.type==="success"?"#16a34a":t.type==="error"?"#dc2626":"#1a1612",
          color:"#fff",padding:"10px 20px",borderRadius:8,fontSize:13,fontWeight:500,
          boxShadow:"0 4px 20px rgba(0,0,0,.25)",
          animation:"toastIn .3s ease",whiteSpace:"nowrap",
        }}>{t.msg}</div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SUPABASE HOOKS
// ──────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────
// CONSTANTS
// ──────────────────────────────────────────────────────────────
const CAT_L={WU:"Women Unstitched",WS:"Women Stitched",M:"Men's Unstitched",K:"Kids Unstitch",HOT:"Hot Sale",NEW:"New Arrivals","2PC":"2-Piece Sets"};
const CATS=[
  ["All","All"],["WU","Women Unstitch"],["WS","Women Stitch"],
  ["RS","Women Stitch + Unstitch – Fancy"],["AB","Abayas"],
  ["MP","Mens Unstitch Plain"],["ME","Mens Unstitch Embroidery"],
  ["KU","Kids Unstitch"],["BS","Bedsheets"],["BL","Blankets"],
  ["OT","Others"],["HOT","Hot Sale"],["NEW","New Arrivals"],
];
const FREE_SHIP_THRESHOLD=2500;

// ──────────────────────────────────────────────────────────────
// FIX 1 — CUSTOM CURSOR COMPONENT
// ──────────────────────────────────────────────────────────────
function JFCursor(){
  const cursorRef=useRef(null);
  const dotRef=useRef(null);
  useEffect(()=>{
    const cursor=cursorRef.current;
    const dot=dotRef.current;
    if(!cursor||!dot)return;
    let mx=0,my=0,cx=0,cy=0;
    const move=e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px";};
    const over=e=>{if(e.target.closest("button,a,[role=button],input,textarea,select"))cursor.classList.add("jf-cursor--hover");else cursor.classList.remove("jf-cursor--hover");};
    const down=()=>cursor.classList.add("jf-cursor--click");
    const up=()=>cursor.classList.remove("jf-cursor--click");
    let raf;
    const animate=()=>{cx+=(mx-cx)*.12;cy+=(my-cy)*.12;cursor.style.left=cx+"px";cursor.style.top=cy+"px";raf=requestAnimationFrame(animate);};
    raf=requestAnimationFrame(animate);
    window.addEventListener("mousemove",move);
    window.addEventListener("mouseover",over);
    window.addEventListener("mousedown",down);
    window.addEventListener("mouseup",up);
    return()=>{window.removeEventListener("mousemove",move);window.removeEventListener("mouseover",over);window.removeEventListener("mousedown",down);window.removeEventListener("mouseup",up);cancelAnimationFrame(raf);};
  },[]);
  // Hide on touch devices
  if(typeof window!=="undefined"&&window.matchMedia("(pointer:coarse)").matches)return null;
  return(<>
    <div ref={cursorRef} className="jf-cursor"/>
    <div ref={dotRef} className="jf-cursor-dot"/>
  </>);
}

// ──────────────────────────────────────────────────────────────
// REVEAL HOOK
// ──────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────
// COUNTDOWN BANNER COMPONENT
// ──────────────────────────────────────────────────────────────
function CountdownBanner({settings}){
  const[time,setTime]=useState({d:0,h:0,m:0,s:0,expired:false});
  const endDate=settings.sale_end_date;
  const title=settings.sale_title||"Grand Sale";
  const subtext=settings.sale_text||"Limited time offer";
  const active=settings.countdown_active==="true";
  useEffect(()=>{
    if(!endDate||!active)return;
    function tick(){
      const diff=new Date(endDate)-new Date();
      if(diff<=0){setTime({d:0,h:0,m:0,s:0,expired:true});return;}
      setTime({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000),expired:false});
    }
    tick();
    const t=setInterval(tick,1000);
    return()=>clearInterval(t);
  },[endDate,active]);
  if(!active||!endDate||time.expired)return null;
  const pad=n=>String(n).padStart(2,"0");
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
              <div style={{background:"rgba(0,0,0,.3)",color:"#fff",fontFamily:"'Jost',sans-serif",fontSize:"clamp(16px,2.5vw,22px)",fontWeight:700,padding:"5px clamp(8px,1.5vw,12px)",minWidth:"clamp(38px,5vw,48px)",textAlign:"center",letterSpacing:1,border:"1px solid rgba(255,255,255,.15)"}}>{pad(time[k])}</div>
              <div style={{fontSize:7,color:"rgba(255,255,255,.55)",textTransform:"uppercase",letterSpacing:1.5,marginTop:3}}>{lbl}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>document.getElementById("prods")?.scrollIntoView({behavior:"smooth"})} style={{background:"#fff",color:"#b91c1c",border:"none",padding:"8px clamp(14px,2vw,20px)",fontSize:9,fontWeight:800,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"all .2s",flexShrink:0}} onMouseEnter={e=>{e.currentTarget.style.background="#f5f5f5"}} onMouseLeave={e=>{e.currentTarget.style.background="#fff"}}>
        Shop Now
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// FIX 4 — FREE SHIPPING BAR COMPONENT
// ──────────────────────────────────────────────────────────────
function FreeShippingBar({cartTotal=0,threshold=FREE_SHIP_THRESHOLD}){
  const remaining=Math.max(0,threshold-cartTotal);
  const pct=Math.min(100,Math.round((cartTotal/threshold)*100));
  if(cartTotal>=threshold){
    return(
      <div style={{background:"#f0faf0",border:"1px solid #b8d4b0",borderRadius:6,padding:"6px 12px",fontSize:11,color:"#3a6b40",fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
        <span>🎉</span><span>Free shipping unlocked!</span>
      </div>
    );
  }
  return(
    <div style={{marginBottom:8}}>
      <div className="fs-bar">
        <div className="fs-prog" style={{width:pct+"%"}}/>
        <span>Rs.{Number(remaining).toLocaleString()} more for free shipping</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// PRODUCT CARD
// ──────────────────────────────────────────────────────────────
function PCard({prod,idx,onAdd,onWish,wished,onOpenModal,onPriceDrop,compact}){
  const[hov,setHov]=useState(false);
  const price=Number(prod.sale_price||prod.price||0);
  const orig=Number(prod.price||0);
  const discPct=prod.sale_price&&orig?Math.round((1-price/orig)*100):0;
  const lowStock=prod.stock&&prod.stock<=5;
  function handleShare(){
    const wa=WA_NUM;
    const msg=encodeURIComponent(`Check out this fabric!\n*${prod.name}*\nPrice: Rs.${price.toLocaleString()}\n${window.location.href}`);
    window.open(`https://wa.me/${wa}?text=${msg}`,"_blank");
  }
  return(
    <div className="rv" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:"var(--t-card,#fff)",border:"1px solid var(--t-border,#e8dfc0)",transition:"box-shadow .3s,transform .3s",boxShadow:hov?"0 12px 40px rgba(0,0,0,.12)":"0 2px 8px rgba(0,0,0,.04)",transform:hov?"translateY(-2px)":"none",cursor:"pointer",position:"relative",overflow:"hidden"}}>
      {/* Image */}
      <div onClick={()=>onOpenModal&&onOpenModal(prod)} style={{position:"relative",paddingTop:compact?"75%":"110%",overflow:"hidden",background:"#f5f0e8"}}>
        {prod.img_url?(
          <img src={prod.img_url} alt={prod.name} loading="lazy" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s",transform:hov?"scale(1.05)":"scale(1)"}}/>
        ):(
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:compact?32:48,opacity:.3}}>🧵</div>
        )}
        {discPct>0&&<div style={{position:"absolute",top:10,left:10,background:"#b91c1c",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 8px",letterSpacing:1}}>-{discPct}%</div>}
        {lowStock&&<div style={{position:"absolute",top:10,right:10,background:"#f59e0b",color:"#fff",fontSize:8,fontWeight:700,padding:"2px 6px",letterSpacing:.5}}>Low Stock</div>}
        <button onClick={e=>{e.stopPropagation();onWish&&onWish(prod.id);}} style={{position:"absolute",bottom:12,left:12,zIndex:2,width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:hov||wished?1:0,transform:hov||wished?"scale(1)":"scale(.6)",transition:"all .3s"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke={wished?"#b91c1c":"#9a8f83"} strokeWidth="1.5" fill={wished?"#b91c1c":"none"}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button onClick={e=>{e.stopPropagation();handleShare();}} style={{position:"absolute",bottom:12,right:12,zIndex:2,width:30,height:30,borderRadius:"50%",background:"rgba(37,211,102,.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:hov?1:0,transform:hov?"scale(1)":"scale(.6)",transition:"all .3s .1s",color:"#fff"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        </button>
      </div>
      {/* Info */}
      <div onClick={()=>onOpenModal&&onOpenModal(prod)} style={{padding:compact?"10px 12px 12px":"14px 16px 18px"}}>
        <div style={{fontSize:8,color:"var(--t-muted,#7a6e65)",letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{CAT_L[prod.cat]||prod.category||""}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:compact?13:15,fontWeight:700,color:"var(--t-text,#111)",marginBottom:4,lineHeight:1.3}} className="pname">{prod.name}</div>
        {prod.brand&&<div style={{fontSize:10,color:"var(--t-muted,#7a6e65)",marginBottom:4}} className="pbrand">{prod.brand}</div>}
        {/* FIX 3: Feel badge */}
        {prod.fabric_feel&&<span className={`feel-badge feel-${prod.fabric_feel.toLowerCase()}`} style={{marginBottom:6,display:"inline-block"}}>{prod.fabric_feel}</span>}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:compact?8:12,flexWrap:"wrap"}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:compact?15:18,fontWeight:700,color:"var(--t-accent,#c9a84c)"}} className="pprice">Rs.{price.toLocaleString()}</span>
          {discPct>0&&<span style={{fontSize:11,color:"#9a8f83",textDecoration:"line-through"}} className="pmuted">Rs.{orig.toLocaleString()}</span>}
        </div>
        {!compact&&<button onClick={e=>{e.stopPropagation();onAdd&&onAdd(prod);}} style={{width:"100%",background:"var(--t-text,#111)",color:"var(--t-card,#fff)",border:"none",padding:"9px 0",fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Add to Cart</button>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// FIX 10 — RECENTLY VIEWED STRIP
// ──────────────────────────────────────────────────────────────
function RecentlyViewedStrip({items,onAdd,onWish,wish,onOpenModal}){
  if(!items||items.length===0)return null;
  return(
    <div style={{background:"var(--t-surface,#f5f0e8)",padding:"28px clamp(14px,4vw,52px) 32px",borderTop:"1px solid var(--t-border,#e8dfc0)"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(16px,2vw,22px)",fontWeight:700,color:"var(--t-text,#111)",letterSpacing:1,marginBottom:16}}>Recently Viewed</div>
      <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:8,scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch"}} className="rv-strip">
        {items.map((prod,i)=>(
          <div key={prod.id||i} style={{minWidth:160,maxWidth:160,flexShrink:0,scrollSnapAlign:"start"}}>
            <PCard prod={prod} idx={i} onAdd={onAdd} onWish={onWish} wished={wish?.has(prod.id)} onOpenModal={onOpenModal} compact={true}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// THEME STYLE
// ──────────────────────────────────────────────────────────────
function ThemeStyle({TH}){
  useEffect(()=>{
    if(!TH)return;
    try{
      if(TH.fontImport){let lnk=document.getElementById("jf-font");if(!lnk){lnk=document.createElement("link");lnk.id="jf-font";lnk.rel="stylesheet";document.head.appendChild(lnk);}lnk.href=TH.fontImport;}
      const bg=TH.bg||"#faf9f7",card=TH.card||"#fff",surface=TH.surface||"#f5f0e8",text=TH.text||"#1a1612",muted=TH.muted||"#9a8f83",border=TH.border||"#e0d8c0",accent=TH.accent||"#c9a84c",dark=TH.dark||"#1a1612",dt=TH.darkText||"#f5efe0";
      let el=document.getElementById("jf-ts");if(!el){el=document.createElement("style");el.id="jf-ts";document.head.appendChild(el);}
      el.textContent=`:root{--t-bg:${bg};--t-card:${card};--t-surface:${surface};--t-text:${text};--t-muted:${muted};--t-border:${border};--t-accent:${accent};--t-dark:${dark};--t-dt:${dt}}body{background:${bg}!important;color:${text}!important}.rv{background:${card}!important;border-color:${border}!important}footer{background:${dark}!important;color:${dt}!important}`;
      document.body.style.background=bg;document.body.style.color=text;
    }catch(e){console.warn("ThemeStyle error:",e);}
  },[TH]);
  return null;
}

// ──────────────────────────────────────────────────────────────
// ERROR BOUNDARY
// ──────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component{
  constructor(props){super(props);this.state={err:null};}
  static getDerivedStateFromError(e){return{err:e};}
  componentDidCatch(e,info){console.error("JF Error:",e,info);}
  render(){
    if(this.state.err)return(
      <div style={{padding:40,textAlign:"center",fontFamily:"sans-serif",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#faf9f7"}}>
        <div style={{fontSize:48,marginBottom:16}}>⚠️</div>
        <div style={{fontWeight:700,fontSize:18,color:"#111",marginBottom:8}}>Kuch masla aa gaya</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:24,maxWidth:400}}>{this.state.err?.message||"Unknown error"}</div>
        <button onClick={()=>{this.setState({err:null});window.location.reload();}} style={{background:"#111",color:"#fff",border:"none",padding:"12px 28px",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:600}}>Reload</button>
      </div>
    );
    return this.props.children;
  }
}

// ──────────────────────────────────────────────────────────────
// ADMIN LOGIN
// ──────────────────────────────────────────────────────────────
function AdminLogin({onSuccess,onCancel}){
  const[pass,setPass]=useState("");const[loading,setLoading]=useState(false);
  async function check(){setLoading(true);let ok=false;if(sb){const{data}=await sb.from("website_settings").select("value").eq("key","admin_pass").single();ok=data?.value===pass;}else ok=pass==="jameel@admin2026";setLoading(false);if(ok)onSuccess();else{setPass("");toast("Wrong password!","error");}}
  return(
    <div style={{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,.88)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(10px)"}}>
      <div style={{background:"var(--t-bg,#faf9f7)",padding:"44px 40px",width:"100%",maxWidth:360,textAlign:"center"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"var(--t-text,#111)",marginBottom:4}}>Admin Panel</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"var(--t-muted,#9a8f83)",fontStyle:"italic",marginBottom:32}}>Jameel Fabrics</div>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&check()} style={{width:"100%",border:"none",borderBottom:"1px solid #d0ccc5",padding:"12px 0",fontSize:17,color:"var(--t-text,#111)",outline:"none",textAlign:"center",letterSpacing:5,marginBottom:24,fontFamily:"inherit",background:"transparent"}}/>
        <button onClick={check} disabled={loading} style={{width:"100%",background:"#111",color:"#fff",border:"none",padding:14,fontSize:10,fontWeight:700,letterSpacing:3.5,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",textTransform:"uppercase",marginBottom:12,opacity:loading?.6:1}}>{loading?"Verifying...":"Unlock"}</button>
        <button onClick={onCancel} style={{background:"none",border:"none",color:"#8a7f76",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// ADMIN SHARED UI
// ──────────────────────────────────────────────────────────────
const ACard=({children,style})=><div style={{background:"var(--t-card,#fff)",border:"1px solid #e5e7eb",borderRadius:10,...style}}>{children}</div>;
const ABtn=({sm,children,...p})=><button {...p} style={{display:"inline-flex",alignItems:"center",gap:6,padding:sm?"6px 12px":"8px 16px",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",border:"none",transition:"all .15s",fontFamily:"inherit",whiteSpace:"nowrap",...p.style}}>{children}</button>;
const AH=({title,sub})=><div style={{marginBottom:20}}><div style={{fontSize:18,fontWeight:700,color:"var(--t-text,#111)",marginBottom:4}}>{title}</div>{sub&&<div style={{fontSize:12,color:"#6b7280"}}>{sub}</div>}</div>;
const ALbl=({c})=><label style={{fontSize:11,fontWeight:600,color:"#6b7280",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>{c}</label>;
const AI=({style,...p})=><input {...p} style={{width:"100%",background:"#fff",border:"1px solid #e5e7eb",borderRadius:6,padding:"9px 12px",fontSize:13,color:"#111",outline:"none",fontFamily:"inherit",transition:"border-color .15s",...style}} onFocus={e=>{e.target.style.borderColor="#c9a84c";e.target.style.boxShadow="0 0 0 3px rgba(201,168,76,.1)";}} onBlur={e=>{e.target.style.borderColor="#e5e7eb";e.target.style.boxShadow="none";}}/>;

function useSettingsSave(settings){
  const[f,setF]=useState({});const[saving,setSaving]=useState(false);const[saved,setSaved]=useState(false);
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

function ASaveBtn({saving,saved,onClick}){
  return(
    <ABtn onClick={onClick} style={{background:saved?"#16a34a":saving?"#6b7280":"#111",color:"#fff",minWidth:90,transition:"background .3s"}}>
      {saving?"💾 Saving...":saved?"✅ Saved":"💾 Save"}
    </ABtn>
  );
}

// ──────────────────────────────────────────────────────────────
// ADMIN ICONS
// ──────────────────────────────────────────────────────────────
const DashIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const OrdIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>;
const PendIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>;
const ProdIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const AlertIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const CoupIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
const StarIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>;
const ChartIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const AnalyticIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>;
const EditIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const MailIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const BrandIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>;
const ThemeIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/></svg>;
const SettIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>;
const WaBcIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
const UdhaarIc=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

// ──────────────────────────────────────────────────────────────
// ADMIN DASHBOARD
// ──────────────────────────────────────────────────────────────
function ADash({prods,orders,alerts,pending,todayOrders,todayRev,onNav}){
  const stats=[
    {l:"Total Products",v:prods.length,ic:"📦",c:"#3b82f6"},
    {l:"Pending Review",v:pending.length,ic:"⏳",c:"#f59e0b"},
    {l:"Today Orders",v:todayOrders.length,ic:"🛒",c:"#10b981"},
    {l:"Today Revenue",v:"Rs."+Number(todayRev).toLocaleString(),ic:"💰",c:"#8b5cf6"},
    {l:"Stock Alerts",v:alerts.length,ic:"⚠️",c:"#ef4444"},
  ];
  return(
    <div>
      <AH title="Dashboard" sub="Website overview"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14,marginBottom:24}}>
        {stats.map(s=>(
          <ACard key={s.l} style={{padding:18,borderLeft:"3px solid "+s.c}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5}}>{s.l}</div>
              <span style={{fontSize:20}}>{s.ic}</span>
            </div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"#111"}}>{s.v}</div>
          </ACard>
        ))}
      </div>
      {alerts.length>0&&(
        <ACard style={{padding:16,borderLeft:"3px solid #ef4444",marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:13,color:"#ef4444",marginBottom:10}}>⚠️ Stock Alerts ({alerts.length})</div>
          {alerts.slice(0,5).map(a=>(
            <div key={a.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f3f4f6",fontSize:12}}>
              <span>{a.product_name}</span>
              <span style={{color:"#ef4444",fontWeight:600}}>{a.current_stock} left</span>
            </div>
          ))}
        </ACard>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// FIX 9 — WHATSAPP BROADCAST UI
// ──────────────────────────────────────────────────────────────
function AWABroadcast(){
  const[message,setMessage]=useState("Assalam! 🌸 New arrivals at Jameel Fabrics Kunjah! Premium fabrics now in stock. Visit us or order on WhatsApp. Jazakallah!");
  const[customers,setCustomers]=useState([]);
  const[selected,setSelected]=useState(new Set());
  const[loading,setLoading]=useState(true);
  const[manualNums,setManualNums]=useState("");

  useEffect(()=>{
    if(!sb){setLoading(false);return;}
    // Load from online_orders for customer list
    sb.from("online_orders")
      .select("customer_name,customer_phone,customer_whatsapp,customer_email")
      .order("created_at",{ascending:false})
      .limit(200)
      .then(({data})=>{
        if(!data){setLoading(false);return;}
        // Deduplicate by phone
        const seen=new Set();
        const unique=data.filter(c=>{
          const key=(c.customer_phone||c.customer_whatsapp||c.customer_email||"").trim();
          if(!key||seen.has(key))return false;
          seen.add(key);return true;
        });
        setCustomers(unique||[]);
        setLoading(false);
      })
      .catch(()=>setLoading(false));
  },[]);

  function toggleAll(){
    if(selected.size===customers.length){setSelected(new Set());}
    else{setSelected(new Set(customers.map((_,i)=>i)));}
  }

  function getPhone(c){return(c.customer_whatsapp||c.customer_phone||"").replace(/\D/g,"");}

  function generateLinks(){
    const msg=encodeURIComponent(message);
    const targets=[];
    // Selected customers
    customers.forEach((c,i)=>{if(selected.has(i)){const ph=getPhone(c);if(ph)targets.push({name:c.customer_name||"Customer",phone:ph});}});
    // Manual numbers
    if(manualNums.trim()){
      manualNums.split(/[\n,]/).forEach(n=>{
        const ph=n.replace(/\D/g,"").trim();
        if(ph.length>=10)targets.push({name:"Manual",phone:ph});
      });
    }
    if(!targets.length){toast("No customers selected","error");return;}
    targets.forEach((t,i)=>{
      setTimeout(()=>{window.open(`https://wa.me/${t.phone}?text=${msg}`,"_blank");},i*600);
    });
    toast(`Opening ${targets.length} WhatsApp chats...`,"success");
  }

  return(
    <div>
      <AH title="📢 WA Broadcast" sub="Send bulk WhatsApp messages to customers"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        {/* Left — message */}
        <div>
          <ACard style={{padding:20,marginBottom:16}}>
            <ALbl c="Broadcast Message"/>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={6} style={{width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",marginTop:4,lineHeight:1.6}}/>
            <div style={{fontSize:11,color:"#9ca3af",marginTop:6}}>{message.length} characters</div>
          </ACard>
          <ACard style={{padding:20}}>
            <ALbl c="Add Manual Phone Numbers (one per line or comma-separated)"/>
            <textarea value={manualNums} onChange={e=>setManualNums(e.target.value)} rows={4} placeholder={"923001234567\n923007654321"} style={{width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"monospace",boxSizing:"border-box",marginTop:4}}/>
          </ACard>
          <button onClick={generateLinks} style={{marginTop:16,width:"100%",background:"#25d366",color:"#fff",border:"none",padding:"12px 0",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <WaBcIc/> Generate & Open WA Links ({selected.size+(manualNums.trim().split(/[\n,]/).filter(n=>n.replace(/\D/g,"").length>=10).length)})
          </button>
        </div>
        {/* Right — customer list */}
        <ACard style={{padding:16,maxHeight:500,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:"#111"}}>
              {loading?"Loading...":customers.length+" customers from orders"}
            </div>
            <button onClick={toggleAll} style={{fontSize:11,color:"#c9a84c",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>
              {selected.size===customers.length?"Deselect All":"Select All"}
            </button>
          </div>
          <div style={{overflowY:"auto",flex:1}}>
            {loading&&<div style={{color:"#9ca3af",fontSize:12,padding:16,textAlign:"center"}}>Loading customers...</div>}
            {!loading&&customers.length===0&&<div style={{color:"#9ca3af",fontSize:12,padding:16,textAlign:"center"}}>No customer records found.<br/>Add manual numbers on the left.</div>}
            {customers.map((c,i)=>{
              const phone=getPhone(c);
              return(
                <label key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 4px",borderBottom:"1px solid #f3f4f6",cursor:"pointer",fontSize:12}}>
                  <input type="checkbox" checked={selected.has(i)} onChange={()=>{setSelected(s=>{const n=new Set(s);n.has(i)?n.delete(i):n.add(i);return n;});}} style={{accentColor:"#25d366",width:14,height:14,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,color:"#111",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.customer_name||"Unknown"}</div>
                    <div style={{color:"#9ca3af",fontSize:10}}>{phone||c.customer_email||"—"}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </ACard>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// FIX 11 — UDHAAR / CREDIT UI (Supabase)
// ──────────────────────────────────────────────────────────────
function AUdhaar(){
  const[records,setRecords]=useState([]);
  const[loading,setLoading]=useState(true);
  const[form,setForm]=useState({customer_name:"",amount_owed:0,date:new Date().toISOString().slice(0,10),notes:""});
  const[editId,setEditId]=useState(null);
  const[showForm,setShowForm]=useState(false);
  const[search,setSearch]=useState("");
  const[filter,setFilter]=useState("pending"); // pending | paid | all
  const[payAmt,setPayAmt]=useState({});

  async function load(){
    setLoading(true);
    if(!sb){setLoading(false);return;}
    const{data}=await sb.from("website_udhaar").select("*").order("date",{ascending:false});
    setRecords(data||[]);setLoading(false);
  }
  useEffect(()=>{load();},[]);

  async function save(){
    if(!form.customer_name||!form.amount_owed){toast("Name aur amount required","error");return;}
    if(!sb){toast("Supabase not connected","error");return;}
    if(editId){
      await sb.from("website_udhaar").update({...form,amount_owed:Number(form.amount_owed)}).eq("id",editId);
      toast("Updated!","success");
    } else {
      await sb.from("website_udhaar").insert({...form,amount_owed:Number(form.amount_owed),amount_paid:0,status:"pending"});
      toast("Udhaar added!","success");
    }
    setForm({customer_name:"",amount_owed:0,date:new Date().toISOString().slice(0,10),notes:""});
    setEditId(null);setShowForm(false);load();
  }

  async function markPaid(rec){
    if(!sb)return;
    const extra=Number(payAmt[rec.id]||0);
    const newPaid=(Number(rec.amount_paid||0))+extra;
    const newOwed=Number(rec.amount_owed)-newPaid;
    const status=newOwed<=0?"paid":"pending";
    await sb.from("website_udhaar").update({amount_paid:newPaid,status}).eq("id",rec.id);
    toast(status==="paid"?"Fully paid! ✓":"Payment recorded","success");
    setPayAmt(p=>({...p,[rec.id]:""}));load();
  }

  async function del(id){
    if(!window.confirm("Delete this record?"))return;
    if(!sb)return;
    await sb.from("website_udhaar").delete().eq("id",id);
    toast("Deleted","success");load();
  }

  function startEdit(rec){
    setForm({customer_name:rec.customer_name,amount_owed:rec.amount_owed,date:rec.date,notes:rec.notes||""});
    setEditId(rec.id);setShowForm(true);
  }

  const filtered=records.filter(r=>{
    const matchSearch=r.customer_name?.toLowerCase().includes(search.toLowerCase())||r.notes?.toLowerCase().includes(search.toLowerCase());
    const matchFilter=filter==="all"||r.status===filter;
    return matchSearch&&matchFilter;
  });
  const totalPending=records.filter(r=>r.status==="pending").reduce((s,r)=>s+(Number(r.amount_owed)-Number(r.amount_paid||0)),0);

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <AH title="💸 Udhaar / Credit" sub="Customer credit ledger"/>
        <ABtn onClick={()=>{setShowForm(true);setEditId(null);setForm({customer_name:"",amount_owed:0,date:new Date().toISOString().slice(0,10),notes:"",});}} style={{background:"#111",color:"#fff"}}>+ Add Record</ABtn>
      </div>

      {/* Summary card */}
      <ACard style={{padding:18,marginBottom:20,borderLeft:"3px solid #ef4444",display:"flex",gap:24,flexWrap:"wrap"}}>
        <div><div style={{fontSize:11,color:"#6b7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Total Pending</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"#ef4444"}}>Rs.{Number(totalPending).toLocaleString()}</div></div>
        <div><div style={{fontSize:11,color:"#6b7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Customers</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"#111"}}>{records.filter(r=>r.status==="pending").length}</div></div>
      </ACard>

      {/* Add / Edit Form */}
      {showForm&&(
        <ACard style={{padding:20,marginBottom:20,border:"2px solid #c9a84c"}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:"#111"}}>{editId?"✏️ Edit Record":"➕ New Udhaar Record"}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><ALbl c="Customer Name"/><AI value={form.customer_name} onChange={e=>setForm(f=>({...f,customer_name:e.target.value}))} placeholder="e.g. Ahmad Khan"/></div>
            <div><ALbl c="Amount Owed (Rs.)"/><AI type="number" value={form.amount_owed} onChange={e=>setForm(f=>({...f,amount_owed:e.target.value}))} placeholder="0"/></div>
            <div><ALbl c="Date"/><AI type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
            <div><ALbl c="Notes"/><AI value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="optional notes"/></div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <ABtn onClick={save} style={{background:"#111",color:"#fff"}}>💾 Save</ABtn>
            <ABtn onClick={()=>{setShowForm(false);setEditId(null);}} style={{background:"#f3f4f6",color:"#374151"}}>Cancel</ABtn>
          </div>
        </ACard>
      )}

      {/* Filters */}
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search customer..." style={{padding:"7px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",flex:1,minWidth:140}}/>
        {["pending","paid","all"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:"7px 14px",borderRadius:6,border:"1px solid #e5e7eb",background:filter===f?"#111":"#f9fafb",color:filter===f?"#fff":"#374151",fontSize:12,cursor:"pointer",fontWeight:filter===f?700:400,textTransform:"capitalize"}}>{f}</button>
        ))}
      </div>

      {/* Table */}
      {loading&&<div style={{textAlign:"center",padding:40,color:"#9ca3af"}}>Loading...</div>}
      {!loading&&filtered.length===0&&<div style={{textAlign:"center",padding:40,color:"#9ca3af"}}>No records found</div>}
      {!loading&&filtered.length>0&&(
        <ACard>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Customer","Amount","Paid","Balance","Date","Status","Notes","Actions"].map(h=>(
                  <th key={h} className="adm-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(rec=>{
                const balance=Number(rec.amount_owed)-Number(rec.amount_paid||0);
                const isPaid=rec.status==="paid"||balance<=0;
                return(
                  <tr key={rec.id} style={{background:isPaid?"#f0faf0":"#fff"}}>
                    <td className="adm-td" style={{fontWeight:600}}>{rec.customer_name}</td>
                    <td className="adm-td">Rs.{Number(rec.amount_owed).toLocaleString()}</td>
                    <td className="adm-td" style={{color:"#16a34a"}}>Rs.{Number(rec.amount_paid||0).toLocaleString()}</td>
                    <td className="adm-td" style={{fontWeight:700,color:isPaid?"#16a34a":"#ef4444"}}>Rs.{Math.max(0,balance).toLocaleString()}</td>
                    <td className="adm-td" style={{fontSize:11,color:"#6b7280"}}>{rec.date}</td>
                    <td className="adm-td">
                      <span style={{background:isPaid?"#dcfce7":"#fee2e2",color:isPaid?"#16a34a":"#ef4444",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>{isPaid?"✓ Paid":"Pending"}</span>
                    </td>
                    <td className="adm-td" style={{fontSize:11,color:"#6b7280",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{rec.notes||"—"}</td>
                    <td className="adm-td">
                      {!isPaid&&(
                        <div style={{display:"flex",gap:4,alignItems:"center"}}>
                          <input type="number" value={payAmt[rec.id]||""} onChange={e=>setPayAmt(p=>({...p,[rec.id]:e.target.value}))} placeholder="Rs." style={{width:70,padding:"4px 6px",border:"1px solid #e5e7eb",borderRadius:4,fontSize:11,outline:"none"}}/>
                          <button onClick={()=>markPaid(rec)} style={{background:"#16a34a",color:"#fff",border:"none",borderRadius:4,padding:"4px 8px",fontSize:10,cursor:"pointer",fontWeight:700,whiteSpace:"nowrap"}}>Mark Paid</button>
                        </div>
                      )}
                      <div style={{display:"flex",gap:4,marginTop:4}}>
                        <button onClick={()=>startEdit(rec)} style={{background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:4,padding:"3px 8px",fontSize:10,cursor:"pointer"}}>✏️</button>
                        <button onClick={()=>del(rec.id)} style={{background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:4,padding:"3px 8px",fontSize:10,cursor:"pointer",color:"#ef4444"}}>🗑</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ACard>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// OTHER ADMIN PAGES (stubs that delegate to existing logic)
// ──────────────────────────────────────────────────────────────
function APending({pending,onRefresh}){
  if(!pending.length)return<div style={{padding:40,textAlign:"center",color:"#9ca3af"}}>No pending products</div>;
  return(
    <div>
      <AH title="⏳ Pending Approval" sub={`${pending.length} products waiting`}/>
      <ACard>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><th className="adm-th">Product</th><th className="adm-th">Brand</th><th className="adm-th">Price</th><th className="adm-th">Action</th></tr></thead>
          <tbody>{pending.map(p=>(
            <tr key={p.id}>
              <td className="adm-td">{p.name}</td>
              <td className="adm-td">{p.brand||"—"}</td>
              <td className="adm-td">Rs.{Number(p.sale_price||p.price||0).toLocaleString()}</td>
              <td className="adm-td">
                <div style={{display:"flex",gap:6}}>
                  <ABtn sm onClick={async()=>{if(sb)await sb.from("products").update({website_status:"approved"}).eq("id",p.id);onRefresh();toast("Approved!","success");}} style={{background:"#16a34a",color:"#fff"}}>✓ Approve</ABtn>
                  <ABtn sm onClick={async()=>{if(sb)await sb.from("products").update({website_status:"rejected"}).eq("id",p.id);onRefresh();toast("Rejected","info");}} style={{background:"#ef4444",color:"#fff"}}>✗ Reject</ABtn>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </ACard>
    </div>
  );
}

function AAlerts({alerts,onRefresh}){
  return(
    <div>
      <AH title="⚠️ Stock Alerts" sub={`${alerts.length} unresolved`}/>
      {!alerts.length&&<div style={{padding:40,textAlign:"center",color:"#9ca3af"}}>No alerts 🎉</div>}
      {alerts.map(a=>(
        <ACard key={a.id} style={{padding:14,marginBottom:10,borderLeft:"3px solid #ef4444"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontWeight:700,fontSize:13}}>{a.product_name}</div><div style={{fontSize:11,color:"#6b7280"}}>Stock: {a.current_stock} · {new Date(a.created_at).toLocaleDateString()}</div></div>
            <ABtn sm onClick={async()=>{if(sb)await sb.from("website_alerts").update({resolved:true}).eq("id",a.id);onRefresh();}} style={{background:"#16a34a",color:"#fff"}}>Resolve</ABtn>
          </div>
        </ACard>
      ))}
    </div>
  );
}

function AProducts({products,onRefresh}){
  const[search,setSearch]=useState("");
  const filtered=products.filter(p=>p.name?.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase()));
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <AH title="📦 Products" sub={`${products.length} total`}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search..." style={{padding:"8px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",width:200}}/>
      </div>
      <ACard>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><th className="adm-th">Name</th><th className="adm-th">Brand</th><th className="adm-th">Price</th><th className="adm-th">Status</th></tr></thead>
          <tbody>{filtered.slice(0,50).map(p=>(
            <tr key={p.id}>
              <td className="adm-td">{p.name}</td>
              <td className="adm-td">{p.brand||"—"}</td>
              <td className="adm-td">Rs.{Number(p.sale_price||p.price||0).toLocaleString()}</td>
              <td className="adm-td"><span style={{background:p.website_status==="approved"?"#dcfce7":"#fef3c7",color:p.website_status==="approved"?"#16a34a":"#d97706",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>{p.website_status||"pending"}</span></td>
            </tr>
          ))}</tbody>
        </table>
        {filtered.length>50&&<div style={{padding:"10px 16px",fontSize:11,color:"#6b7280"}}>Showing 50 of {filtered.length}</div>}
      </ACard>
    </div>
  );
}

function AOrders({orders,wa}){
  return(
    <div>
      <AH title="🛒 Online Orders" sub={`${orders.length} total`}/>
      {!orders.length&&<div style={{padding:40,textAlign:"center",color:"#9ca3af"}}>No orders yet</div>}
      {orders.slice(0,30).map(o=>(
        <ACard key={o.id} style={{padding:16,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontWeight:700,fontSize:13}}>{o.customer_name||o.customer_email||"Guest"}</div>
              <div style={{fontSize:11,color:"#6b7280"}}>{new Date(o.created_at).toLocaleDateString()} · Rs.{Number(o.total||0).toLocaleString()}</div>
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{background:o.status==="confirmed"?"#dcfce7":o.status==="pending"?"#fef3c7":"#f3f4f6",color:o.status==="confirmed"?"#16a34a":o.status==="pending"?"#d97706":"#6b7280",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>{o.status}</span>
              <ABtn sm onClick={()=>{const msg=encodeURIComponent(`Your order is confirmed! Total: Rs.${Number(o.total||0).toLocaleString()}`);window.open(`https://wa.me/${wa}?text=${msg}`,"_blank");}} style={{background:"#25d366",color:"#fff"}}>WA</ABtn>
            </div>
          </div>
        </ACard>
      ))}
    </div>
  );
}

function ACoupons({coupons,onRefresh}){
  const[form,setForm]=useState({code:"",type:"percent",value:10,min_order:0,active:true});
  async function add(){
    if(!sb||!form.code)return;
    await sb.from("coupons").insert({...form,code:form.code.toUpperCase(),used_count:0});
    toast("Coupon added!","success");onRefresh();
  }
  return(
    <div>
      <AH title="🎟️ Coupons" sub="Discount codes"/>
      <ACard style={{padding:18,marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:10}}>
          <div><ALbl c="Code"/><AI value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value.toUpperCase()}))} placeholder="SAVE10"/></div>
          <div><ALbl c="Type"/><select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} style={{width:"100%",padding:"9px 12px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none"}}><option value="percent">Percent %</option><option value="flat">Flat Rs.</option></select></div>
          <div><ALbl c="Value"/><AI type="number" value={form.value} onChange={e=>setForm(f=>({...f,value:Number(e.target.value)}))} /></div>
          <div><ALbl c="Min Order"/><AI type="number" value={form.min_order} onChange={e=>setForm(f=>({...f,min_order:Number(e.target.value)}))} /></div>
        </div>
        <ABtn onClick={add} style={{background:"#111",color:"#fff"}}>+ Add Coupon</ABtn>
      </ACard>
      {coupons.map(c=>(
        <ACard key={c.id} style={{padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div><span style={{fontFamily:"monospace",fontWeight:700,fontSize:14}}>{c.code}</span><span style={{marginLeft:10,fontSize:11,color:"#6b7280"}}>{c.type==="percent"?c.value+"%":"Rs."+c.value} off · Min Rs.{c.min_order||0} · Used: {c.used_count||0}</span></div>
          <div style={{display:"flex",gap:6}}>
            <ABtn sm onClick={async()=>{if(sb)await sb.from("coupons").update({active:!c.active}).eq("id",c.id);onRefresh();}} style={{background:c.active?"#16a34a":"#6b7280",color:"#fff"}}>{c.active?"Active":"Inactive"}</ABtn>
            <ABtn sm onClick={async()=>{if(sb&&window.confirm("Delete?"))await sb.from("coupons").delete().eq("id",c.id);onRefresh();}} style={{background:"#fee2e2",color:"#ef4444"}}>🗑</ABtn>
          </div>
        </ACard>
      ))}
    </div>
  );
}

function AReviews({onRefresh}){
  const{data:reviews}=useDB(()=>sb.from("reviews").select("*").order("created_at",{ascending:false}),[]);
  async function toggle(r){if(!sb)return;await sb.from("reviews").update({approved:!r.approved}).eq("id",r.id);onRefresh();}
  async function del(id){if(!sb||!window.confirm("Delete?"))return;await sb.from("reviews").delete().eq("id",id);onRefresh();}
  return(
    <div>
      <AH title="⭐ Reviews" sub="Customer reviews"/>
      {(reviews||[]).map(r=>(
        <ACard key={r.id} style={{padding:14,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <div><div style={{fontWeight:700,fontSize:13}}>{r.customer_name||r.name}</div><div style={{fontSize:12,color:"#374151",marginTop:4}}>{r.review_text||r.text}</div></div>
            <div style={{display:"flex",gap:6,alignItems:"flex-start"}}>
              <ABtn sm onClick={()=>toggle(r)} style={{background:r.approved?"#16a34a":"#6b7280",color:"#fff"}}>{r.approved?"✓ Approved":"Approve"}</ABtn>
              <ABtn sm onClick={()=>del(r.id)} style={{background:"#fee2e2",color:"#ef4444"}}>🗑</ABtn>
            </div>
          </div>
        </ACard>
      ))}
    </div>
  );
}

function ASoldCounter({onRefresh}){
  const{f,updateF,saving,saved,save}=useSettingsSave(useSettings());
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="📊 Sold Counter" sub="Homepage stats"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save(["sold_count","happy_customers","years_trust"])}/>
      </div>
      <ACard style={{padding:20}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
          <div><ALbl c="Sold Count"/><AI value={f.sold_count||""} onChange={e=>updateF("sold_count",e.target.value)} placeholder="5000+"/></div>
          <div><ALbl c="Happy Customers"/><AI value={f.happy_customers||""} onChange={e=>updateF("happy_customers",e.target.value)} placeholder="2000+"/></div>
          <div><ALbl c="Years of Trust"/><AI value={f.years_trust||""} onChange={e=>updateF("years_trust",e.target.value)} placeholder="50+"/></div>
        </div>
      </ACard>
    </div>
  );
}

function AAnalytics({settings={}}){
  const[gId,setGId]=useState(settings.ga_id||"");
  const[loading,setLoading]=useState(false);
  useEffect(()=>setGId(settings.ga_id||""),[settings]);
  async function saveGA(){
    if(!sb)return;setLoading(true);
    await sb.from("website_settings").upsert({key:"ga_id",value:gId},{onConflict:"key"});
    setLoading(false);toast("Saved! GA will load on next page visit","success");
  }
  return(
    <div>
      <AH title="📈 Google Analytics" sub="Website traffic tracking"/>
      <ACard style={{padding:24,marginBottom:20}}>
        <ALbl c="Measurement ID (G-XXXXXXXXXX)"/>
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <AI value={gId} onChange={e=>setGId(e.target.value)} placeholder="G-XXXXXXXXXX" style={{letterSpacing:2,fontWeight:600}}/>
          <ABtn onClick={saveGA} disabled={loading} style={{background:"#111",color:"#fff",opacity:loading?.6:1,flexShrink:0}}>{loading?"Saving...":"Save & Enable"}</ABtn>
        </div>
      </ACard>
      <ACard style={{padding:20}}>
        <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Setup Guide</div>
        {[["1","analytics.google.com pe jao","Free Google account se login karo"],["2","New Property banao","Website ka naam: Jameel Fabrics"],["3","Measurement ID copy karo","G-XXXXXXXXXX format"],["4","Paste karo aur Save karo","24 hours mein data aana shuru"],["5","Real-time report dekho","Google Analytics dashboard mein"]].map(([n,t,d])=>(
          <div key={n} style={{display:"flex",gap:14,padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
            <div style={{width:26,height:26,background:"#111",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{n}</div>
            <div><div style={{fontWeight:600,fontSize:12}}>{t}</div><div style={{fontSize:11,color:"#9ca3af"}}>{d}</div></div>
          </div>
        ))}
      </ACard>
    </div>
  );
}

function AContent({settings}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="✏️ Website Content" sub="Edit text & announcements"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save()}/>
      </div>
      {[["store_name","Store Name"],["announcement","Announcement Bar (pipe | separated)"],["hlabel","Hero Label"],["hsub","Tagline"],["about","About Text"],["ticker_brands","Brand Ticker (· separated)"],["sale_title","Sale Banner Title"],["sale_text","Sale Banner Text"]].map(([k,l])=>(
        <ACard key={k} style={{padding:14,marginBottom:10}}>
          <ALbl c={l}/><AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/>
        </ACard>
      ))}
    </div>
  );
}

function ASubs({subs}){
  return(
    <div>
      <AH title="📧 Subscribers" sub={`${subs.length} subscribers`}/>
      <ACard>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><th className="adm-th">Email</th><th className="adm-th">Date</th></tr></thead>
          <tbody>{subs.map(s=>(
            <tr key={s.id}><td className="adm-td">{s.email}</td><td className="adm-td" style={{fontSize:11,color:"#6b7280"}}>{new Date(s.subscribed_at).toLocaleDateString()}</td></tr>
          ))}</tbody>
        </table>
      </ACard>
    </div>
  );
}

function ASettings({settings}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="⚙️ General Settings"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save()}/>
      </div>
      {[["admin_pass","Admin Password"],["wa_number","WhatsApp Number"],["phone","Phone Number"],["show_countdown","Show Countdown (true/false)"],["sale_end_date","Sale End Date (YYYY-MM-DD)"],["price_max","Max Price Filter"],["countdown_active","Countdown Active (true/false)"]].map(([k,l])=>(
        <ACard key={k} style={{padding:14,marginBottom:10}}>
          <ALbl c={l}/><AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/>
        </ACard>
      ))}
    </div>
  );
}

function ABrands(){
  return<div style={{padding:40,textAlign:"center",color:"#9ca3af"}}>Brands management — connect to ERP sync</div>;
}

function AThemeSettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  async function applyTheme(){
    await save(["site_theme"]);
    if(f.site_theme){localStorage.setItem("jf_theme",f.site_theme);window.dispatchEvent(new CustomEvent("jf-theme-change",{detail:f.site_theme}));}
    onSaved&&onSaved();
  }
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="🎨 Theme" sub="Website color theme"/>
        <ASaveBtn saving={saving} saved={saved} onClick={applyTheme}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:10}}>
        {Object.entries(SITE_THEMES).map(([name,t])=>{
          const isActive=(f.site_theme||"Black Gold")===name;
          return(
            <div key={name} onClick={()=>updateF("site_theme",name)} style={{border:`2px solid ${isActive?"#111":"#e5e7eb"}`,borderRadius:8,overflow:"hidden",cursor:"pointer",boxShadow:isActive?"0 4px 12px rgba(0,0,0,.15)":"none",transition:"all .2s"}}>
              <div style={{height:60,background:`linear-gradient(135deg,${t.iLeft} 50%,${t.bg} 50%)`}}/>
              <div style={{padding:"8px 10px",fontSize:12,fontWeight:600,color:"#111"}}>{name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AShopSettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="🏪 Shop Settings"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save().then(onSaved)}/>
      </div>
      {[["store_name","Store Name"],["addr1","Address Line 1"],["addr2","Address Line 2"],["phone","Phone"],["hours","Working Hours"],["map_url","Google Maps URL"]].map(([k,l])=>(
        <ACard key={k} style={{padding:14,marginBottom:10}}><ALbl c={l}/><AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/></ACard>
      ))}
    </div>
  );
}

function ASubSettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="📦 Subscription" sub="Subscription box settings"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save().then(onSaved)}/>
      </div>
      <ACard style={{padding:20}}>
        <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",marginBottom:16}}>
          <input type="checkbox" checked={f.show_subscription==="true"} onChange={e=>updateF("show_subscription",e.target.checked?"true":"false")} style={{accentColor:"#c9a84c",width:16,height:16}}/>
          <span style={{fontSize:13}}>Show Subscription Box on website</span>
        </label>
        {[["sub_gold_price","Gold Price (Rs.)"],["sub_silver_price","Silver Price"],["sub_platinum_price","Platinum Price"],["sub_benefit","Subscription Benefit"]].map(([k,l])=>(
          <div key={k} style={{marginBottom:12}}><ALbl c={l}/><AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/></div>
        ))}
      </ACard>
    </div>
  );
}

function AWASettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="💬 WhatsApp Templates"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save().then(onSaved)}/>
      </div>
      {[["wa_greeting","WA Button Greeting","Assalam! I am interested in your fabrics."],["wa_order_msg","Order Confirmation","Your order confirmed! Total: {amount}."],["wa_review_req","Review Request","Thank you for shopping at Jameel Fabrics!"],["wa_udhaar_reminder","Payment Reminder","Gentle reminder about your balance at Jameel Fabrics."]].map(([k,l,ph])=>(
        <ACard key={k} style={{padding:14,marginBottom:10}}><ALbl c={l}/><textarea value={f[k]||""} onChange={e=>updateF(k,e.target.value)} rows={2} placeholder={ph} style={{width:"100%",padding:"8px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",marginTop:4}}/></ACard>
      ))}
    </div>
  );
}

function ABillTemplates(){return<div style={{padding:40,textAlign:"center",color:"#9ca3af"}}>Bill Templates — configure from settings</div>;}
function ADeliverySettings({settings,onSaved}){
  const{f,updateF,saving,saved,save}=useSettingsSave(settings);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <AH title="🚚 Delivery Settings"/>
        <ASaveBtn saving={saving} saved={saved} onClick={()=>save().then(onSaved)}/>
      </div>
      {[["delivery_fee","Delivery Fee (Rs.)"],["free_ship_min","Free Shipping Min Order (Rs.)"],["delivery_days","Delivery Days"],["delivery_areas","Delivery Areas"]].map(([k,l])=>(
        <ACard key={k} style={{padding:14,marginBottom:10}}><ALbl c={l}/><AI value={f[k]||""} onChange={e=>updateF(k,e.target.value)}/></ACard>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// ADMIN PANEL
// ──────────────────────────────────────────────────────────────
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
  const refresh=()=>window.location.reload();
  const pC=pending?.length||0;
  const aC=alerts?.length||0;
  const oC=orders?.filter(o=>o.status==="pending").length||0;
  const todayOrders=orders?.filter(o=>new Date(o.created_at).toDateString()===new Date().toDateString())||[];
  const todayRev=todayOrders.reduce((s,o)=>s+Number(o.total||0),0);

  // FIX 9+11 — NAV updated with broadcast + udhaar pages
  const NAV=[
    {section:"Main"},
    {id:"dashboard",ic:<DashIc/>,lbl:"Dashboard"},
    {id:"orders",ic:<OrdIc/>,lbl:"Orders",badge:oC,bc:"#f59e0b"},
    {section:"Catalogue"},
    {id:"pending",ic:<PendIc/>,lbl:"Pending (ERP)",badge:pC,bc:"#c9a84c"},
    {id:"products",ic:<ProdIc/>,lbl:"Products"},
    {id:"alerts",ic:<AlertIc/>,lbl:"Stock Alerts",badge:aC,bc:"#ef4444"},
    {id:"coupons",ic:<CoupIc/>,lbl:"Coupons"},
    {section:"Customers"},
    {id:"broadcast",ic:<WaBcIc/>,lbl:"WA Broadcast"},
    {id:"udhaar",ic:<UdhaarIc/>,lbl:"Udhaar / Credit"},
    {section:"Content"},
    {id:"reviews",ic:<StarIc/>,lbl:"Reviews"},
    {id:"sold",ic:<ChartIc/>,lbl:"Sold Counter"},
    {id:"analytics",ic:<AnalyticIc/>,lbl:"Analytics"},
    {id:"content",ic:<EditIc/>,lbl:"Website Content"},
    {id:"subscribers",ic:<MailIc/>,lbl:"Subscribers"},
    {id:"brands",ic:<BrandIc/>,lbl:"Brands"},
    {section:"Settings"},
    {id:"theme",ic:<ThemeIc/>,lbl:"🎨 Theme"},
    {id:"shop_settings",ic:<SettIc/>,lbl:"🏪 Shop"},
    {id:"sub_settings",ic:<ProdIc/>,lbl:"📦 Subscription"},
    {id:"wa_settings",ic:<OrdIc/>,lbl:"💬 WhatsApp"},
    {id:"bill_templates",ic:<EditIc/>,lbl:"🧾 Bill Templates"},
    {id:"delivery",ic:<MailIc/>,lbl:"🚚 Delivery"},
    {id:"settings",ic:<SettIc/>,lbl:"⚙️ General"},
  ];

  const PAGES={
    dashboard:()=><ADash prods={allProds||[]} orders={orders||[]} alerts={alerts||[]} pending={pending||[]} todayOrders={todayOrders||[]} todayRev={todayRev||0} onNav={setPage}/>,
    pending:()=><APending pending={pending||[]} onRefresh={refresh}/>,
    alerts:()=><AAlerts alerts={alerts||[]} onRefresh={refresh}/>,
    products:()=><AProducts products={allProds||[]} onRefresh={refresh}/>,
    orders:()=><AOrders orders={orders||[]} wa={settings.wa_number||WA_NUM}/>,
    coupons:()=><ACoupons coupons={coupons||[]} onRefresh={refresh}/>,
    reviews:()=><AReviews onRefresh={refresh}/>,
    sold:()=><ASoldCounter onRefresh={refresh}/>,
    analytics:()=><AAnalytics settings={settings||{}}/>,
    content:()=><AContent settings={settings||{}}/>,
    subscribers:()=><ASubs subs={subs||[]}/>,
    settings:()=><ASettings settings={settings||{}}/>,
    brands:()=><ABrands/>,
    theme:()=><AThemeSettings settings={settings||{}} onSaved={refresh}/>,
    shop_settings:()=><AShopSettings settings={settings||{}} onSaved={refresh}/>,
    sub_settings:()=><ASubSettings settings={settings||{}} onSaved={refresh}/>,
    wa_settings:()=><AWASettings settings={settings||{}} onSaved={refresh}/>,
    bill_templates:()=><ABillTemplates/>,
    delivery:()=><ADeliverySettings settings={settings||{}} onSaved={refresh}/>,
    // FIX 9: WhatsApp Broadcast
    broadcast:()=><AWABroadcast/>,
    // FIX 11: Udhaar
    udhaar:()=><AUdhaar/>,
  };

  return(
    <div style={{display:"flex",height:"100vh",overflow:"hidden",fontFamily:"'Inter',sans-serif",background:"#f4f5f7"}}>
      {mobOpen&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:199}} onClick={()=>setMobOpen(false)}/>}
      <aside className={`adm-sb${col?" col":""}${mobOpen?" mob-open":""}`}>
        <div style={{padding:"18px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <div style={{width:36,height:36,background:"#c9a84c",borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:900,color:"#0a0907"}}>JF</div>
          {!col&&<div><div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#fff",letterSpacing:1}}>JAMEEL FABRICS</div><div style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>Admin Panel</div></div>}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"8px"}}>
          {NAV.map((item,i)=>{
            if(item.section)return<div key={i} style={{fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,.2)",padding:"10px 8px 4px",display:col?"none":"block"}}>{item.section}</div>;
            return(
              <button key={item.id} onClick={()=>{setPage(item.id);setMobOpen(false);}} className={`adm-sb-item${page===item.id?" act":""}`}>
                <span style={{flexShrink:0,display:"flex",width:18,alignItems:"center",justifyContent:"center",opacity:page===item.id?1:.65}}>{item.ic}</span>
                {!col&&<><span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis"}}>{item.lbl}</span>{item.badge>0&&<span style={{background:item.bc||"#ef4444",color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700,flexShrink:0}}>{item.badge}</span>}</>}
              </button>
            );
          })}
        </div>
        <div style={{padding:"10px 8px",borderTop:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
          <button onClick={()=>setCol(c=>!c)} className="adm-sb-item" style={{marginBottom:4}}>
            <span>{col?"→":"←"}</span>{!col&&"Collapse"}
          </button>
          <button onClick={onExit} className="adm-sb-item" style={{color:"rgba(255,255,255,.6)"}}>
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
            {!col&&"Exit to Store"}
          </button>
        </div>
      </aside>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        <div style={{height:60,background:"var(--t-card,#fff)",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",padding:"0 20px",gap:12,flexShrink:0,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
          <button onClick={()=>setMobOpen(true)} style={{background:"none",border:"none",cursor:"pointer",color:"#6b7280",display:"none"}} className="hide-mob">☰</button>
          <div style={{flex:1,fontWeight:700,fontSize:15,color:"#111",textTransform:"capitalize"}}>{page.replace(/_/g," ")}</div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"24px clamp(14px,3vw,32px)"}}>
          <ErrorBoundary>
            {PAGES[page]?PAGES[page]():<div style={{padding:40,textAlign:"center",color:"#9ca3af"}}>Page not found</div>}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// STORE — Main shop component
// ──────────────────────────────────────────────────────────────
function Store({user,onLogout,onAccount,onAdmin,siteTheme,themeName}){
  const TH=siteTheme||SITE_THEMES["Blue Beige"];
  useEffect(()=>{
    const r=document.documentElement.style;
    const vars={"--jf-bg":TH.bg,"--jf-card":TH.card,"--jf-surface":TH.surface,"--jf-text":TH.text,"--jf-muted":TH.muted,"--jf-border":TH.border,"--jf-accent":TH.accent,"--jf-dark":TH.dark,"--jf-dark-text":TH.darkText,"--t-bg":TH.bg,"--t-card":TH.card,"--t-surface":TH.surface,"--t-text":TH.text,"--t-muted":TH.muted,"--t-border":TH.border,"--t-accent":TH.accent,"--t-dark":TH.dark,"--t-dt":TH.darkText};
    Object.entries(vars).forEach(([k,v])=>r.setProperty(k,v));
    document.body.style.background=TH.bg;document.body.style.color=TH.text;
  },[TH]);

  const settings=useSettings();
  const[prods,setProds]=useState([]);
  const[cat,setCat]=useState("All");
  const[cart,setCart]=useState([]);
  const[wish,setWish]=useState(new Set());
  const[cartOpen,setCartOpen]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[search,setSearch]=useState("");
  const[heroIdx,setHeroIdx]=useState(0);
  const[priceRange,setPriceRange]=useState([0,15000]);
  const[sortBy,setSortBy]=useState("new");
  const[brandFilter,setBrandFilter]=useState("All");
  const[modalProd,setModalProd]=useState(null);
  const[showTop,setShowTop]=useState(false);
  // FIX 10 — Recently Viewed state
  const[recentlyViewed,setRecentlyViewed]=useState(()=>{try{return JSON.parse(localStorage.getItem("jf_rv")||"[]");}catch{return[];}});
  const searchRef=useRef(null);
  useReveal();

  const heroLines=["Exclusive Collections","Premium Pakistani Fabric","Handpicked Quality","Timeless Elegance","Limited Edition Pieces"];
  useEffect(()=>{const t=setInterval(()=>setHeroIdx(i=>(i+1)%heroLines.length),3000);return()=>clearInterval(t);},[]);

  // Load products
  useEffect(()=>{
    if(!sb)return;
    sb.from("products").select("*").eq("website_status","approved").eq("active",true).order("created_at",{ascending:false}).then(({data})=>setProds(data||[]));
    const ch=sb.channel("shop_p").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{
      sb.from("products").select("*").eq("website_status","approved").eq("active",true).order("created_at",{ascending:false}).then(({data})=>setProds(data||[]));
    }).subscribe();
    return()=>sb.removeChannel(ch);
  },[]);

  // FIX 2 — Price drop alert on every prods load
  useEffect(()=>{
    if(!prods.length)return;
    try{
      const stored=JSON.parse(localStorage.getItem("jf_pricedrop")||"{}");
      const drops=[];
      prods.forEach(p=>{
        const prev=stored[p.id];
        const cur=Number(p.sale_price||p.price||0);
        if(prev&&cur<prev){drops.push({name:p.name,prev,cur});}
        stored[p.id]=cur;
      });
      localStorage.setItem("jf_pricedrop",JSON.stringify(stored));
      if(drops.length){
        drops.slice(0,3).forEach((d,i)=>{
          setTimeout(()=>toast(`🔻 Price Drop! ${d.name}: Rs.${d.cur.toLocaleString()} (was Rs.${d.prev.toLocaleString()})`,"success"),i*1200);
        });
      }
    }catch(e){console.warn("pricedrop check error",e);}
  },[prods]);

  // Back to top
  useEffect(()=>{
    const fn=()=>setShowTop(window.scrollY>400);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  // Wishlist
  useEffect(()=>{
    if(!sb||!user)return;
    sb.from("wishlists").select("product_id").eq("customer_id",user.id).then(({data})=>{if(data)setWish(new Set(data.map(x=>x.product_id)));});
  },[user]);

  useEffect(()=>{document.body.style.overflow=menuOpen?"hidden":"";},[menuOpen]);

  const allBrands=["All",...new Set(prods.map(p=>p.brand).filter(Boolean))];
  const filtered=prods.filter(p=>{
    const cOk=cat==="All"||(p.cat===cat||p.category===cat);
    const sOk=!search||(p.name?.toLowerCase().includes(search.toLowerCase())||p.color?.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase()));
    const price=Number(p.sale_price||p.price||0);
    const prOk=price>=priceRange[0]&&price<=priceRange[1];
    const brOk=brandFilter==="All"||p.brand===brandFilter;
    return cOk&&sOk&&prOk&&brOk;
  }).sort((a,b)=>{
    if(sortBy==="price_asc")return(a.sale_price||a.price||0)-(b.sale_price||b.price||0);
    if(sortBy==="price_desc")return(b.sale_price||b.price||0)-(a.sale_price||a.price||0);
    if(sortBy==="name")return(a.name||"").localeCompare(b.name||"");
    return new Date(b.created_at||0)-new Date(a.created_at||0);
  });

  const cartTotal=cart.reduce((s,x)=>s+x.qty*(Number(x.sale_price||x.price||0)),0);
  const cartCount=cart.reduce((s,x)=>s+x.qty,0);
  const wa=settings.wa_number||WA_NUM;
  const ann=(settings.announcement||"New Arrivals|Exclusive Designs|Fast Delivery|Book on WhatsApp").split("|");

  // FIX 10 — Open modal + save recently viewed
  function openModal(prod){
    setModalProd(prod);
    setRecentlyViewed(prev=>{
      const filtered=prev.filter(p=>p.id!==prod.id);
      const updated=[prod,...filtered].slice(0,8);
      try{localStorage.setItem("jf_rv",JSON.stringify(updated));}catch{}
      return updated;
    });
  }

  function addToCart(prod){
    setCart(c=>{const ex=c.find(x=>x.id===prod.id);if(ex)return c.map(x=>x.id===prod.id?{...x,qty:x.qty+1}:x);return[...c,{...prod,qty:1,price:Number(prod.sale_price||prod.price||0)}];});
    toast("Added: "+prod.name,"success");
  }

  async function toggleWish(id){
    if(!user){toast("Login to save wishlist","info");return;}
    if(!sb)return;
    if(wish.has(id)){await sb.from("wishlists").delete().eq("customer_id",user.id).eq("product_id",id);setWish(s=>{const n=new Set(s);n.delete(id);return n;});}
    else{await sb.from("wishlists").insert({customer_id:user.id,product_id:id});setWish(s=>new Set([...s,id]));toast("Saved to wishlist ♥","success");}
  }

  const aRef=useRef(0),aTimer=useRef(null);
  function adminTrigger(){aRef.current++;clearTimeout(aTimer.current);aTimer.current=setTimeout(()=>aRef.current=0,2000);if(aRef.current>=5){aRef.current=0;onAdmin();}}

  return(
    <div style={{minHeight:"100vh",background:"var(--t-bg,#faf9f7)"}}>
      <ThemeStyle TH={TH}/>
      {/* Announcement bar */}
      <div style={{background:"#111",height:34,display:"flex",alignItems:"center",overflow:"hidden"}}>
        <div style={{display:"flex",animation:"annScroll 32s linear infinite",whiteSpace:"nowrap"}}>
          {[...ann,...ann].map((a,i)=><span key={i} style={{padding:"0 48px",fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.75)",textTransform:"uppercase"}}>{"✦ "+a.trim()}</span>)}
        </div>
      </div>
      {/* FIX 5 — Only CountdownBanner component, no inline countdown */}
      <CountdownBanner settings={settings}/>
      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,249,247,.97)",backdropFilter:"blur(24px)",borderBottom:"1px solid #e8e4df",height:64,display:"flex",alignItems:"center",padding:"0 clamp(14px,3vw,52px)",gap:12,boxShadow:"0 1px 16px rgba(0,0,0,.06)"}}>
        <button onClick={()=>{setCat("All");window.scrollTo({top:0,behavior:"smooth"});}} style={{cursor:"pointer",flexShrink:0,background:"none",border:"none",textAlign:"left",marginRight:"auto",padding:0}} onDoubleClick={adminTrigger}>
          <div style={{fontFamily:"var(--t-hf,'Playfair Display',serif)",fontSize:"clamp(13px,1.5vw,17px)",fontWeight:900,letterSpacing:"clamp(2px,1vw,6px)",color:"var(--t-text,#111)",lineHeight:1.1}}>{settings.store_name||"JAMEEL FABRICS"}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:9,color:"var(--t-muted,#9a8f83)",letterSpacing:3,fontStyle:"italic"}}>KUNJAH · EST.1975</div>
        </button>
        <button onClick={()=>searchRef.current?.focus()} style={{background:"none",border:"none",cursor:"pointer",color:"var(--t-muted,#9a8f83)",padding:8}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <button onClick={()=>setCartOpen(true)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--t-text,#111)",padding:8,position:"relative"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {cartCount>0&&<span style={{position:"absolute",top:2,right:2,background:"#b91c1c",color:"#fff",width:16,height:16,borderRadius:"50%",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
        </button>
      </nav>

      {/* Hero */}
      <section style={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${TH.iLeft} 0%,${TH.dark||"#111"} 100%)`,padding:"clamp(40px,8vw,80px) clamp(14px,4vw,52px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto"}}>
          <div style={{fontSize:"clamp(8px,1vw,10px)",letterSpacing:"clamp(3px,2vw,8px)",color:"rgba(255,255,255,.4)",textTransform:"uppercase",marginBottom:20}}>Est. 1975 · Kunjah, Distt. Gujrat</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,7vw,72px)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16,letterSpacing:-1}}>
            <span style={{display:"block",overflow:"hidden",height:"1.2em"}}>
              <span style={{display:"block",animation:"textSlide 3s ease infinite"}}>{heroLines[heroIdx]}</span>
            </span>
          </h1>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(14px,2vw,20px)",color:"rgba(255,255,255,.65)",fontStyle:"italic",marginBottom:32,lineHeight:1.7}}>{settings.hsub||"Premium branded clothing for Men, Women & Kids."}</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("prods")?.scrollIntoView({behavior:"smooth"})} style={{background:"#fff",color:"#111",border:"none",padding:"14px 32px",fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>Shop Now</button>
            <a href={`https://wa.me/${wa}?text=${encodeURIComponent(settings.wa_greeting||"Assalam! I'm interested in your fabrics.")}`} target="_blank" rel="noopener noreferrer" style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.4)",padding:"14px 32px",fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",textDecoration:"none",display:"inline-block"}}>WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div style={{background:"var(--t-card,#fff)",borderBottom:"1px solid var(--t-border,#e8dfc0)",overflowX:"auto",whiteSpace:"nowrap",padding:"0 clamp(14px,3vw,52px)"}}>
        <div style={{display:"inline-flex",gap:0}}>
          {CATS.map(([v,l])=>(
            <button key={v} onClick={()=>setCat(v)} style={{padding:"14px 16px",background:"none",border:"none",borderBottom:`2px solid ${cat===v?"var(--t-text,#111)":"transparent"}`,fontSize:11,fontWeight:cat===v?700:400,color:cat===v?"var(--t-text,#111)":"var(--t-muted,#9a8f83)",cursor:"pointer",fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase",transition:"all .2s",whiteSpace:"nowrap"}}>{l}</button>
          ))}
        </div>
      </div>

      {/* Search + Sort */}
      <div style={{background:"var(--t-surface,#f5f0e8)",padding:"14px clamp(14px,3vw,52px)",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
        <input ref={searchRef} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search fabrics, colors, brands..." style={{flex:"1 1 200px",padding:"9px 14px",border:"1px solid var(--t-border,#e8dfc0)",borderRadius:4,fontSize:12,color:"var(--t-text,#111)",background:"var(--t-card,#fff)",outline:"none",fontFamily:"inherit"}} className="search-bar"/>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:"9px 12px",border:"1px solid var(--t-border,#e8dfc0)",borderRadius:4,fontSize:12,color:"var(--t-text,#111)",background:"var(--t-card,#fff)",outline:"none",cursor:"pointer"}}>
          {SORT_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
        {allBrands.length>2&&<select value={brandFilter} onChange={e=>setBrandFilter(e.target.value)} style={{padding:"9px 12px",border:"1px solid var(--t-border,#e8dfc0)",borderRadius:4,fontSize:12,color:"var(--t-text,#111)",background:"var(--t-card,#fff)",outline:"none",cursor:"pointer"}}>
          {allBrands.map(b=><option key={b} value={b}>{b}</option>)}
        </select>}
      </div>

      {/* Products grid */}
      <section id="prods" style={{padding:"32px clamp(14px,4vw,52px)",background:"var(--t-bg,#faf9f7)"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:20}}>
          {filtered.map((p,i)=>(
            <PCard key={p.id} prod={p} idx={i} onAdd={addToCart} onWish={toggleWish} wished={wish.has(p.id)} onOpenModal={openModal}/>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:"var(--t-muted,#9a8f83)"}}>
          <div style={{fontSize:48,marginBottom:16}}>🧵</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20}}>No products found</div>
          <button onClick={()=>{setSearch("");setCat("All");}} style={{marginTop:16,background:"none",border:"1px solid var(--t-border,#e8dfc0)",padding:"8px 20px",cursor:"pointer",fontSize:11,fontFamily:"inherit",color:"var(--t-muted,#9a8f83)"}}>Clear filters</button>
        </div>}
      </section>

      {/* FIX 10 — Recently Viewed strip above footer */}
      <RecentlyViewedStrip items={recentlyViewed} onAdd={addToCart} onWish={toggleWish} wish={wish} onOpenModal={openModal}/>

      {/* Footer */}
      <footer style={{background:"var(--t-dark,#1a1612)",color:"var(--t-dt,#f5efe0)",padding:"48px clamp(14px,4vw,52px) 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:32,marginBottom:32}} className="footer-grid">
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,letterSpacing:4,marginBottom:8}}>{settings.store_name||"JAMEEL FABRICS"}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,opacity:.6,fontStyle:"italic",marginBottom:16}}>Est. 1975 · Kunjah, Gujrat</div>
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#25d366",color:"#fff",padding:"10px 18px",fontSize:11,fontWeight:700,letterSpacing:1,textDecoration:"none",textTransform:"uppercase"}}>WhatsApp Us</a>
          </div>
          <div>
            <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",opacity:.5,marginBottom:14}}>Contact</div>
            <div style={{fontSize:13,opacity:.75,lineHeight:2}}>{settings.addr1||"Circular Road, Kunjah"}<br/>{settings.addr2||"Distt. Gujrat, Punjab"}<br/>{settings.phone||""}<br/>{settings.hours||""}</div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:20,fontSize:10,opacity:.4,textAlign:"center",letterSpacing:2}}>© {new Date().getFullYear()} JAMEEL FABRICS · KUNJAH · ALL RIGHTS RESERVED</div>
      </footer>

      {/* Cart drawer */}
      {cartOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:9000,display:"flex"}}>
          <div style={{flex:1,background:"rgba(0,0,0,.5)"}} onClick={()=>setCartOpen(false)}/>
          <div style={{width:"min(420px,100vw)",background:"var(--t-card,#fff)",display:"flex",flexDirection:"column",animation:"slideR .3s ease",boxShadow:"-8px 0 32px rgba(0,0,0,.15)"}}>
            <div style={{padding:"20px 24px",borderBottom:"1px solid var(--t-border,#e8dfc0)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Cart ({cartCount})</span>
              <button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--t-muted,#9a8f83)"}}>×</button>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
              {/* FIX 4: Free shipping bar in cart */}
              <FreeShippingBar cartTotal={cartTotal}/>
              {!cart.length&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--t-muted,#9a8f83)"}}>
                <div style={{fontSize:48,marginBottom:12}}>🛒</div>
                <div>Cart is empty</div>
              </div>}
              {cart.map(item=>(
                <div key={item.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--t-border,#e8dfc0)"}}>
                  <div style={{width:60,height:60,background:"var(--t-surface,#f5f0e8)",flexShrink:0,overflow:"hidden"}}>
                    {item.img_url?<img src={item.img_url} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🧵</div>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:13,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                    <div style={{fontSize:12,color:"var(--t-muted,#9a8f83)"}}>Rs.{Number(item.price).toLocaleString()}</div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                      <button onClick={()=>setCart(c=>c.map(x=>x.id===item.id?{...x,qty:Math.max(1,x.qty-1)}:x))} style={{width:24,height:24,border:"1px solid var(--t-border,#e8dfc0)",background:"none",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:13,fontWeight:600}}>{item.qty}</span>
                      <button onClick={()=>setCart(c=>c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x))} style={{width:24,height:24,border:"1px solid var(--t-border,#e8dfc0)",background:"none",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      <button onClick={()=>setCart(c=>c.filter(x=>x.id!==item.id))} style={{marginLeft:"auto",background:"none",border:"none",color:"#9a8f83",cursor:"pointer",fontSize:12}}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length>0&&(
              <div style={{padding:"16px 24px",borderTop:"1px solid var(--t-border,#e8dfc0)"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:16,marginBottom:16}}>
                  <span>Total</span><span>Rs.{cartTotal.toLocaleString()}</span>
                </div>
                <a href={`https://wa.me/${wa}?text=${encodeURIComponent("Assalam! I want to order:\n"+cart.map(x=>`• ${x.name} × ${x.qty} = Rs.${(x.price*x.qty).toLocaleString()}`).join("\n")+`\n\nTotal: Rs.${cartTotal.toLocaleString()}`)}`} target="_blank" rel="noopener noreferrer" style={{display:"block",background:"#25d366",color:"#fff",textAlign:"center",padding:"14px",fontWeight:700,fontSize:12,letterSpacing:2,textTransform:"uppercase",textDecoration:"none",marginBottom:8}}>Order on WhatsApp</a>
                <button onClick={()=>setCart([])} style={{width:"100%",background:"none",border:"1px solid var(--t-border,#e8dfc0)",padding:"10px",fontSize:11,cursor:"pointer",fontFamily:"inherit",color:"var(--t-muted,#9a8f83)"}}>Clear Cart</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product modal */}
      {modalProd&&(
        <div style={{position:"fixed",inset:0,zIndex:9001,background:"rgba(0,0,0,.8)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setModalProd(null)}>
          <div style={{background:"var(--t-card,#fff)",maxWidth:680,width:"100%",maxHeight:"90vh",overflow:"auto",display:"grid",gridTemplateColumns:"1fr 1fr",animation:"fadeUp .3s ease"}} onClick={e=>e.stopPropagation()}>
            <div style={{position:"relative",paddingTop:"100%",background:"var(--t-surface,#f5f0e8)"}}>
              {modalProd.img_url?<img src={modalProd.img_url} alt={modalProd.name} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:72,opacity:.3}}>🧵</div>}
            </div>
            <div style={{padding:24,display:"flex",flexDirection:"column",gap:12}}>
              <button onClick={()=>setModalProd(null)} style={{alignSelf:"flex-end",background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--t-muted,#9a8f83)"}}>×</button>
              <div style={{fontSize:9,letterSpacing:2,color:"var(--t-muted,#9a8f83)",textTransform:"uppercase"}}>{CAT_L[modalProd.cat]||modalProd.category||""}</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"var(--t-text,#111)",lineHeight:1.3}}>{modalProd.name}</h2>
              {modalProd.brand&&<div style={{fontSize:12,color:"var(--t-muted,#9a8f83)"}}>{modalProd.brand}</div>}
              {/* FIX 3: feel badge in modal */}
              {modalProd.fabric_feel&&<span className={`feel-badge feel-${modalProd.fabric_feel.toLowerCase()}`}>{modalProd.fabric_feel}</span>}
              <div style={{fontSize:22,fontWeight:700,color:"var(--t-accent,#c9a84c)",fontFamily:"'Playfair Display',serif"}}>Rs.{Number(modalProd.sale_price||modalProd.price||0).toLocaleString()}</div>
              {modalProd.description&&<p style={{fontSize:13,color:"var(--t-muted,#9a8f83)",lineHeight:1.7}}>{modalProd.description}</p>}
              <button onClick={()=>{addToCart(modalProd);setModalProd(null);}} style={{background:"var(--t-text,#111)",color:"var(--t-card,#fff)",border:"none",padding:"12px",fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginTop:"auto"}}>Add to Cart</button>
              <a href={`https://wa.me/${wa}?text=${encodeURIComponent("Assalam! I am interested in: "+modalProd.name+" (Rs."+Number(modalProd.sale_price||modalProd.price||0).toLocaleString()+"). Please confirm availability.")}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"#25d366",color:"#fff",padding:"10px",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",textDecoration:"none"}}>Order on WhatsApp</a>
            </div>
          </div>
        </div>
      )}

      {/* Back to top */}
      {showTop&&<button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{position:"fixed",bottom:20,right:16,zIndex:800,width:40,height:40,background:"var(--t-dark,#111)",color:"#fff",border:"none",borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,.2)"}}>↑</button>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// INTRO PAGE
// ──────────────────────────────────────────────────────────────
function Intro({onEnter,siteTheme,themeName}){
  const TH=siteTheme||SITE_THEMES["Blue Beige"];
  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,background:TH.iBg,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:24}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,6vw,64px)",fontWeight:900,color:TH.iLeft,letterSpacing:"clamp(4px,2vw,12px)",textTransform:"uppercase",textAlign:"center",lineHeight:1.1}}>
        JAMEEL<br/><span style={{WebkitTextStroke:`2px ${TH.iLeft}`,WebkitTextFillColor:"transparent"}}>FABRICS</span>
      </div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:TH.iLeft,opacity:.6,letterSpacing:4,fontStyle:"italic"}}>Est. 1975 · Kunjah, Gujrat</div>
      <button onClick={onEnter} style={{background:TH.iBtn,color:TH.iBtnText,border:"none",padding:"14px 40px",fontSize:10,fontWeight:700,letterSpacing:4,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginTop:8,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Enter Store</button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// PWA INSTALL BUTTON
// ──────────────────────────────────────────────────────────────
function PWAInstallBtn(){
  const[prompt,setPrompt]=useState(null);const[shown,setShown]=useState(false);
  useEffect(()=>{const h=e=>{e.preventDefault();setPrompt(e);};window.addEventListener("beforeinstallprompt",h);return()=>window.removeEventListener("beforeinstallprompt",h);},[]);
  if(!prompt||shown)return null;
  return(
    <div style={{position:"fixed",bottom:90,left:16,zIndex:800,background:"#fff",border:"1px solid #e0dbd3",padding:"12px 16px",boxShadow:"0 8px 24px rgba(0,0,0,.12)",display:"flex",alignItems:"center",gap:12,maxWidth:280,animation:"fadeUp .4s ease"}}>
      <div style={{width:36,height:36,background:"#111",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:900,color:"#fff"}}>JF</div>
      <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:12,color:"#111"}}>Install App</div><div style={{fontSize:10,color:"#7a6e65",marginTop:1}}>Home screen pe add karo</div></div>
      <button onClick={async()=>{prompt.prompt();const{outcome}=await prompt.userChoice;if(outcome==="accepted"){setShown(true);toast("App installed! ✓","success");}}} style={{background:"#111",color:"#fff",border:"none",padding:"6px 12px",fontSize:9,fontWeight:700,letterSpacing:1,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Install</button>
      <button onClick={()=>setShown(true)} style={{background:"none",border:"none",cursor:"pointer",color:"#7a6e65",fontSize:18,lineHeight:1,padding:0}}>×</button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// ACCOUNT PAGE (stub)
// ──────────────────────────────────────────────────────────────
function AccountPage({user,onBack}){
  return(
    <div style={{minHeight:"100vh",background:"#faf9f7",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700}}>My Account</div>
      <div style={{fontSize:13,color:"#6b7280"}}>{user?.email}</div>
      <button onClick={onBack} style={{background:"#111",color:"#fff",border:"none",padding:"10px 24px",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:700,letterSpacing:2}}>Back to Store</button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// ROOT APP — FIX 7: GA gtag injection
// ──────────────────────────────────────────────────────────────
export default function App(){
  const[view,setView]=useState("intro");
  const[showAdminLogin,setShowAdminLogin]=useState(false);
  const[user,setUser]=useState(null);
  const[siteTheme,setSiteTheme]=useState(()=>{
    try{const t=localStorage.getItem("jf_theme");if(t&&SITE_THEMES[t])return t;}catch{}
    return"Black Gold";
  });
  const TH=SITE_THEMES[siteTheme]||SITE_THEMES["Black Gold"];
  const toasts=useToast();

  // Auth
  useEffect(()=>{
    if(!sb)return;
    sb.auth.getSession().then(({data:{session}})=>setUser(session?.user||null));
    const{data:{subscription}}=sb.auth.onAuthStateChange((_e,s)=>setUser(s?.user||null));
    return()=>subscription.unsubscribe();
  },[]);

  // PWA install
  useEffect(()=>{
    const handler=e=>{e.preventDefault();};
    window.addEventListener("beforeinstallprompt",handler);
    return()=>window.removeEventListener("beforeinstallprompt",handler);
  },[]);

  // Realtime alerts
  useEffect(()=>{
    if(!sb)return;
    const ch=sb.channel("g_alerts").on("postgres_changes",{event:"INSERT",schema:"public",table:"website_alerts"},p=>{toast("New stock alert: "+(p.new?.product_name||""));}).subscribe();
    return()=>sb.removeChannel(ch);
  },[]);

  // Hash check + SW
  useEffect(()=>{
    function checkHash(){if(window.location.hash==="#jfadmin"){window.location.hash="";setShowAdminLogin(true);}}
    checkHash();
    window.addEventListener("hashchange",checkHash);
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("/service-worker.js")
        .then(r=>console.log("[JF Website] SW registered:",r.scope))
        .catch(e=>console.warn("[JF Website] SW:",e));
    }
    return()=>window.removeEventListener("hashchange",checkHash);
  },[]);

  // Listen for theme change from AdminPanel
  useEffect(()=>{
    const h=e=>{if(SITE_THEMES[e.detail]){setSiteTheme(e.detail);try{localStorage.setItem("jf_theme",e.detail);}catch{}}};
    window.addEventListener("jf-theme-change",h);
    return()=>window.removeEventListener("jf-theme-change",h);
  },[]);

  // FIX 7 — Load GA settings, then dynamically inject gtag script
  useEffect(()=>{
    if(!sb)return;
    sb.from("website_settings").select("value").eq("key","ga_id").single()
      .then(({data})=>{
        const gaId=data?.value;
        if(!gaId||!gaId.startsWith("G-"))return;
        // Avoid double-injecting
        if(document.getElementById("jf-gtag-script"))return;
        // Inject async gtag loader
        const s1=document.createElement("script");
        s1.id="jf-gtag-script";
        s1.async=true;
        s1.src=`https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(s1);
        // Inject gtag init
        const s2=document.createElement("script");
        s2.id="jf-gtag-init";
        s2.textContent=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname});`;
        document.head.appendChild(s2);
        console.log("[JF] GA loaded:",gaId);
      })
      .catch(()=>{});
  },[]);

  async function logout(){if(sb)await sb.auth.signOut();setUser(null);toast("Logged out");setView("store");}

  return(
    <ErrorBoundary>
      <style>{G}</style>
      {/* FIX 1: Custom cursor rendered globally */}
      <JFCursor/>
      <PWAInstallBtn/>
      {view==="intro"&&<ErrorBoundary><Intro onEnter={()=>setView("store")} siteTheme={TH} themeName={siteTheme}/></ErrorBoundary>}
      {view==="store"&&<ErrorBoundary><Store user={user} onLogout={logout} onAccount={()=>user?setView("account"):null} onAdmin={()=>setShowAdminLogin(true)} siteTheme={TH} themeName={siteTheme}/></ErrorBoundary>}
      {view==="account"&&user&&<AccountPage user={user} onBack={()=>setView("store")}/>}
      {view==="admin"&&<ErrorBoundary><AdminPanel onExit={()=>setView("store")}/></ErrorBoundary>}
      {showAdminLogin&&<AdminLogin onSuccess={()=>{setShowAdminLogin(false);setView("admin");}} onCancel={()=>setShowAdminLogin(false)}/>}
      <Toasts list={toasts.list}/>
    </ErrorBoundary>
  );
}
