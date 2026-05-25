import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Config ────────────────────────────────────────────────────
const SUPA_URL = process.env.REACT_APP_SUPABASE_URL || "";
const SUPA_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = SUPA_URL && SUPA_KEY ? createClient(SUPA_URL, SUPA_KEY) : null;
const WA = "923228722232";
const BRAND = "JAMEEL FABRICS";
const SUB = "KUNJAH";
const TAGLINE = "Exclusive. Elegant. Pakistani.";
const PHONE = "03228722232";
const ADDRESS = "Circular Road Kunjah, Distt Gujrat, Punjab";
const ADMIN_PASS_DEFAULT = "jameel@admin2026";
const CATS = ["All","Men's Unstitched","Women Unstitched","Women Stitched","Kids"];
const pkr = n=>`Rs. ${Number(n||0).toLocaleString()}`;
const gid = ()=>Date.now()+Math.floor(Math.random()*9999);
const LS = {
  get:(k,d)=>{try{const v=localStorage.getItem("jf3d_"+k);return v!==null?JSON.parse(v):d;}catch{return d;}},
  set:(k,v)=>{try{localStorage.setItem("jf3d_"+k,JSON.stringify(v));}catch{}}
};
const tryParse=(v,d)=>{try{return v?JSON.parse(v):d;}catch{return d;}};

// ── Category Icon Components ──────────────────────────────────
const CatIcon = ({type, size=24, color="#b8922a"}) => {
  const icons = {
    all: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    men: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M8 3h8l2 5H6L8 3z"/><path d="M6 8v13h12V8"/><path d="M10 8v13M14 8v13"/><path d="M8 3L6 8M16 3l2 5"/></svg>,
    womenU: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M8 2h8l2 4-3 2v11H9V8L6 6l2-4z"/><path d="M9 8v11M15 8v11"/><path d="M9 13h6"/></svg>,
    womenS: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M12 2c-2 0-3 1-3 3v1L5 9v11h14V9l-4-3V5c0-2-1-3-3-3z"/><path d="M9 9h6M9 13h6"/></svg>,
    kids: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="5" r="2.5"/><path d="M9 9h6l1 5-2 1v5h-2v-4h-2v4H8v-5l-2-1z"/><path d="M7 11l-2 3M17 11l2 3"/></svg>,
  };
  const map = {all:"all", "Men's Unstitched":"men", "Women Unstitched":"womenU", "Women Stitched":"womenS", "Kids":"kids"};
  return icons[map[type]||type]||icons.all;
};

// ── SVG Icons ─────────────────────────────────────────────────
const ICONS = {
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  heart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  heartFill: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  bag: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  user: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  menu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  wa: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  location: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17l.19-.08z"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  starEmpty: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  truck: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  tiktok: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.19a8.19 8.19 0 0 0 4.79 1.53V6.27a4.85 4.85 0 0 1-1.02-.57z"/></svg>,
  instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  // Category icons — fabric/clothing themed SVGs
  catAll: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  catMen: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 2h8l1 4-3 1v11H8V7L5 6z"/><path d="M10 7v11M14 7v11"/></svg>,
  catWomenU: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M7 2h10l2 5-4 1v10H9V8L5 7z"/><path d="M9 8v10M15 8v10"/></svg>,
  catWomenS: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 2c-2 0-4 2-4 4v1l-4 3v10h16V10l-4-3V6c0-2-2-4-4-4z"/></svg>,
  catKids: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="5" r="2"/><path d="M9 8h6l1 4-2 1v7h-2v-4h-2v4H8v-7l-2-1z"/></svg>,
};

// Default cat icons map (can be overridden by settings)
const DEFAULT_CAT_ICONS = {
  "All": "catAll",
  "Men's Unstitched": "catMen",
  "Women Unstitched": "catWomenU",
  "Women Stitched": "catWomenS",
  "Kids": "catKids",
};

// Available icon options for admin
const ICON_OPTIONS = [
  {key:"catAll", label:"Grid (All)"},
  {key:"catMen", label:"Kameez (Men)"},
  {key:"catWomenU", label:"Kurti (Women)"},
  {key:"catWomenS", label:"Dress (Stitched)"},
  {key:"catKids", label:"Kids"},
  {key:"star", label:"Star"},
  {key:"heart", label:"Heart"},
  {key:"location", label:"Location"},
];

// ── Global Styles ─────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --gold:#b8922a;
  --gold2:#d4a843;
  --gold3:#f0c866;
  --cream:#faf8f3;
  --cream2:#f2ede3;
  --cream3:#e8dfc8;
  --dark:#1a1208;
  --dark2:#2a1f0a;
  --text:#1a1208;
  --text2:#4a3a18;
  --muted:#8a7a5a;
  --border:#d4a84333;
  --white:#ffffff;
  --shadow:0 24px 80px rgba(180,140,40,0.12);
  --shadow2:0 8px 32px rgba(180,140,40,0.15);
}
html{scroll-behavior:smooth;}
body{background:var(--cream);color:var(--text);font-family:'Jost',sans-serif;overflow-x:hidden;}
::selection{background:var(--gold)22;color:var(--gold);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--cream);}
::-webkit-scrollbar-thumb{background:var(--gold)44;border-radius:4px;}
a{text-decoration:none;color:inherit;}
button{font-family:'Jost',sans-serif;cursor:pointer;}
input,textarea,select{font-family:'Jost',sans-serif;}

/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes float{0%,100%{transform:translateY(0) rotateX(0deg)}50%{transform:translateY(-14px) rotateX(2deg)}}
@keyframes shimmer{0%,100%{opacity:0.7}50%{opacity:1}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pulse3d{0%,100%{transform:scale3d(1,1,1)}50%{transform:scale3d(1.03,1.03,1.03)}}
@keyframes goldGlow{0%,100%{box-shadow:0 0 20px rgba(180,140,40,0.15)}50%{box-shadow:0 0 50px rgba(180,140,40,0.35)}}
@keyframes lineExpand{from{width:0}to{width:100%}}
@keyframes particleFloat{0%{transform:translateY(0px) translateX(0px) rotate(0deg);opacity:0}10%{opacity:0.8}90%{opacity:0.3}100%{transform:translateY(-100vh) translateX(30px) rotate(360deg);opacity:0}}
@keyframes cameraZoom{0%{transform:perspective(1000px) translateZ(0px) translateY(0px)}100%{transform:perspective(1000px) translateZ(400px) translateY(-80px)}}
@keyframes tilt3d{0%,100%{transform:perspective(800px) rotateX(0deg) rotateY(0deg)}25%{transform:perspective(800px) rotateX(2deg) rotateY(-3deg)}75%{transform:perspective(800px) rotateX(-2deg) rotateY(3deg)}}
@keyframes curtainReveal{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0% 0 0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
@keyframes spotlightSweep{0%,100%{transform:translateX(-30%) rotate(-15deg);opacity:0.3}50%{transform:translateX(30%) rotate(15deg);opacity:0.6}}
@keyframes flicker{0%,90%,100%{opacity:1}92%,96%{opacity:0.8}94%,98%{opacity:0.95}}

.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-left{opacity:0;transform:translateX(-40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal-left.visible{opacity:1;transform:translateX(0);}
.reveal-right{opacity:0;transform:translateX(40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal-right.visible{opacity:1;transform:translateX(0);}

/* 3D Card hover */
.card-3d{transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s ease;transform-style:preserve-3d;will-change:transform;}
.card-3d:hover{box-shadow:0 40px 100px rgba(180,140,40,0.18)!important;}

/* Mobile */
@media(max-width:768px){
  .hide-mob{display:none!important}
  .full-mob{width:100%!important}
  .col-mob{flex-direction:column!important}
  .grid-2-mob{grid-template-columns:1fr 1fr!important}
  .grid-1-mob{grid-template-columns:1fr!important}
  .p-mob{padding:14px!important}
}
`;

// ── Intersection Observer ─────────────────────────────────────
function useReveal(){
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");}});
    },{threshold:0.12});
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  });
}

// ── 3D Tilt Card ──────────────────────────────────────────────
function TiltCard({children,style,className=""}){
  const ref=useRef(null);
  const onMove=e=>{
    const el=ref.current;if(!el)return;
    const r=el.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    const cx=r.width/2,cy=r.height/2;
    const rx=(y-cy)/cy*-8,ry=(x-cx)/cx*8;
    el.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
  };
  const onLeave=()=>{if(ref.current)ref.current.style.transform="perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";};
  return <div ref={ref} className={`card-3d ${className}`} style={{transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1)",...style}} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

// ── THREE.JS 3D SHOWROOM ──────────────────────────────────────
function Showroom3D({onEnter,settings={}}){
  const [step,setStep]=useState(0);
  const timers=useRef([]);
  const T=(fn,ms)=>timers.current.push(setTimeout(fn,ms));

  useEffect(()=>{
    T(()=>setStep(1),300);
    T(()=>setStep(2),900);
    T(()=>setStep(3),1500);
    T(()=>setStep(4),2200);
    return()=>timers.current.forEach(clearTimeout);
  },[]);

  const b1  = settings.intro_brand1    || "JAMEEL";
  const b2  = settings.intro_brand2    || "FABRICS";
  const sub = settings.intro_sub       || "KUNJAH";
  const btn = settings.intro_enter_btn || "Enter the Store";
  const showSkip = settings.intro_skip !== false;
  const showJF   = settings.intro_show_jf !== false;

  return(
    <div style={{
      position:"fixed",inset:0,zIndex:99999,
      background:"linear-gradient(135deg,#0a0806 0%,#0f0d09 50%,#080604 100%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      overflow:"hidden",fontFamily:"'Jost',sans-serif",
    }}>
      <style>{`
        @keyframes jf_fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes jf_scale{from{opacity:0;transform:scale(.55) rotate(-12deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
        @keyframes jf_glow{0%,100%{text-shadow:0 0 18px rgba(212,168,67,.45)}50%{text-shadow:0 0 48px rgba(212,168,67,.95),0 0 90px rgba(212,168,67,.25)}}
        @keyframes jf_line{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes jf_dust{0%{opacity:0;transform:translateY(0) scale(1)}20%{opacity:.55}80%{opacity:.15}100%{opacity:0;transform:translateY(-70px) scale(.3)}}
        @keyframes jf_pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}50%{box-shadow:0 0 22px 4px rgba(201,168,76,.18)}}
      `}</style>

      {/* Gold dust particles */}
      {[...Array(18)].map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          borderRadius:"50%",
          background:"rgba(201,168,76,.6)",
          width:`${Math.random()*3+1}px`,
          height:`${Math.random()*3+1}px`,
          left:`${5+i*5.2}%`,
          bottom:`${8+Math.sin(i)*18}%`,
          animation:`jf_dust ${3+Math.sin(i*2)*1.5}s ease ${i*0.28}s infinite`,
          pointerEvents:"none",
        }}/>
      ))}

      {/* JF Monogram */}
      {step>=1&&showJF&&(
        <div style={{marginBottom:"clamp(14px,2.5vw,22px)",animation:"jf_scale .7s cubic-bezier(.16,1,.3,1) both"}}>
          <svg width="clamp(54px,7vw,74px)" height="clamp(54px,7vw,74px)" viewBox="0 0 74 74" fill="none">
            <circle cx="37" cy="37" r="34" stroke="#c9a84c" strokeWidth="1.4" opacity=".82"/>
            <circle cx="37" cy="37" r="27" stroke="#c9a84c" strokeWidth=".6" opacity=".32"/>
            <path d="M37 5 L39.5 11 L37 17 L34.5 11 Z" fill="#c9a84c" opacity=".82"/>
            <path d="M37 69 L39.5 63 L37 57 L34.5 63 Z" fill="#c9a84c" opacity=".82"/>
            <path d="M5 37 L11 34.5 L17 37 L11 39.5 Z" fill="#c9a84c" opacity=".82"/>
            <path d="M69 37 L63 34.5 L57 37 L63 39.5 Z" fill="#c9a84c" opacity=".82"/>
            <text x="15" y="50" fontFamily="Playfair Display,serif" fontSize="27" fontWeight="900" fill="#c9a84c" opacity=".96">JF</text>
          </svg>
        </div>
      )}

      {/* Sign Board */}
      {step>=2&&(
        <div style={{
          position:"relative",
          background:"linear-gradient(135deg,rgba(10,8,4,.97),rgba(22,16,6,.98))",
          border:"1.5px solid rgba(201,168,76,.65)",
          padding:"clamp(14px,2.5vw,24px) clamp(32px,6vw,70px)",
          textAlign:"center",
          animation:"jf_fadeUp .7s cubic-bezier(.16,1,.3,1) both",
          boxShadow:"0 0 50px rgba(201,168,76,.2),0 0 120px rgba(201,168,76,.07),inset 0 0 40px rgba(201,168,76,.03)",
        }}>
          {/* Corner marks */}
          {[["top","-1px","left","-1px","borderTop","borderLeft"],
            ["top","-1px","right","-1px","borderTop","borderRight"],
            ["bottom","-1px","left","-1px","borderBottom","borderLeft"],
            ["bottom","-1px","right","-1px","borderBottom","borderRight"],
          ].map(([tk,tv,lk,lv,b1k,b2k],i)=>(
            <div key={i} style={{position:"absolute",[tk]:tv,[lk]:lv,width:"12px",height:"12px",
              [b1k]:"2px solid rgba(201,168,76,.82)",[b2k]:"2px solid rgba(201,168,76,.82)"}}/>
          ))}

          {/* JAMEEL */}
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(22px,4.5vw,58px)",fontWeight:900,
            letterSpacing:"clamp(6px,1.2vw,13px)",color:"#fdfaf4",lineHeight:1,
            animation:"jf_glow 3s ease-in-out infinite",
          }}>{b1}</div>

          {/* FABRICS */}
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(22px,4.5vw,58px)",fontWeight:900,
            letterSpacing:"clamp(6px,1.2vw,13px)",color:"#fdfaf4",lineHeight:.95,
            marginBottom:"clamp(8px,1.2vw,14px)",
            animation:"jf_glow 3s ease-in-out .2s infinite",
          }}>{b2}</div>

          {/* Divider */}
          <div style={{display:"flex",alignItems:"center",gap:"10px",margin:"0 0 clamp(6px,1vw,10px)"}}>
            <div style={{flex:1,height:"1px",background:"linear-gradient(to right,transparent,rgba(201,168,76,.75),transparent)",
              animation:"jf_line .8s ease both"}}/>
            <div style={{width:"5px",height:"5px",background:"#c9a84c",transform:"rotate(45deg)",flexShrink:0}}/>
            <div style={{flex:1,height:"1px",background:"linear-gradient(to left,transparent,rgba(201,168,76,.75),transparent)",
              animation:"jf_line .8s ease both"}}/>
          </div>

          {/* KUNJAH */}
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(11px,1.6vw,18px)",
            letterSpacing:"clamp(10px,1.5vw,18px)",
            color:"rgba(201,168,76,.9)",fontStyle:"italic",
          }}>{sub}</div>
        </div>
      )}

      {/* Tagline */}
      {step>=3&&(
        <div style={{
          marginTop:"clamp(12px,1.8vw,18px)",
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(11px,1.2vw,14px)",
          letterSpacing:"4px",color:"rgba(201,168,76,.5)",
          fontStyle:"italic",
          animation:"jf_fadeUp .7s ease both",
        }}>
          {settings.intro_tagline||TAGLINE}
        </div>
      )}

      {/* Enter Button */}
      {step>=4&&(
        <button
          onClick={()=>onEnter&&onEnter()}
          style={{
            marginTop:"clamp(20px,3vw,32px)",
            padding:"13px clamp(40px,5vw,60px)",
            background:"transparent",
            border:"1px solid rgba(201,168,76,.65)",
            color:"rgba(201,168,76,.92)",
            fontFamily:"'Jost',sans-serif",
            fontSize:"11px",fontWeight:600,
            letterSpacing:"4px",textTransform:"uppercase",
            cursor:"pointer",
            animation:"jf_fadeUp .7s cubic-bezier(.16,1,.3,1) both, jf_pulse 2.5s ease-in-out 1s infinite",
            backdropFilter:"blur(6px)",
            transition:"all .3s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,.92)";e.currentTarget.style.color="#0a0806";e.currentTarget.style.letterSpacing="6px";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(201,168,76,.92)";e.currentTarget.style.letterSpacing="4px";}}>
          {btn}
        </button>
      )}

      {/* Skip */}
      {showSkip&&(
        <button
          onClick={()=>onEnter&&onEnter()}
          style={{
            position:"absolute",top:"clamp(22px,4vw,50px)",right:"20px",
            background:"rgba(201,168,76,.15)",
            border:"1px solid rgba(201,168,76,.55)",
            color:"rgba(255,250,210,.92)",
            fontFamily:"'Jost',sans-serif",
            fontSize:"10px",fontWeight:600,letterSpacing:"2px",
            padding:"7px 18px",cursor:"pointer",
            backdropFilter:"blur(4px)",
            transition:"all .2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,.32)";e.currentTarget.style.color="#fff";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(201,168,76,.15)";e.currentTarget.style.color="rgba(255,250,210,.92)";}}>
          SKIP ›
        </button>
      )}
    </div>
  );
}

// ── ANNOUNCEMENT BAR ──────────────────────────────────────────
function AnnouncementBar({texts=[]}){
  const all=[...texts,...texts];
  return(
    <div style={{background:"#1a1208",overflow:"hidden",height:"36px",display:"flex",alignItems:"center",position:"relative",zIndex:100}}>
      <div style={{display:"flex",animation:"marquee 30s linear infinite",whiteSpace:"nowrap"}}>
        {all.map((t,i)=><span key={i} style={{padding:"0 48px",fontSize:"11px",letterSpacing:"2px",color:"#d4a843",fontFamily:"'Jost',sans-serif",fontWeight:"300"}}>{t}</span>)}
      </div>
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────
function Navbar({cart,wishlist,page,setPage,cat,setCat,search,setSearch,customer,setShowLogin,setShowCart,settings,setShowSearch,showSearch,setShowTrack}){
  const [scrolled,setScrolled]=useState(false);
  const [mob,setMob]=useState(false);
  useEffect(()=>{
    const f=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f);
  },[]);
  const cartCount=cart.reduce((a,c)=>a+c.qty,0);
  return(
    <>
      <nav style={{position:"fixed",top:"36px",left:0,right:0,zIndex:500,background:scrolled?"rgba(250,248,243,0.97)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid #d4a84322":"none",transition:"all 0.4s ease",padding:"0 clamp(16px,4vw,48px)"}}>
        <div style={{height:"64px",display:"flex",alignItems:"center",gap:"20px",maxWidth:"1400px",margin:"0 auto"}}>
          {/* Logo */}
          <div onClick={()=>{setPage("home");setCat("All");}} style={{cursor:"pointer",flexShrink:0}}>
            {settings?.logoUrl
              ?<img src={settings.logoUrl} alt={BRAND} style={{height:"38px",objectFit:"contain"}}/>
              :<div style={{fontFamily:"'Playfair Display',serif"}}>
                <div style={{fontSize:"clamp(14px,2vw,18px)",fontWeight:"900",color:"#1a1208",letterSpacing:"3px"}}>{BRAND}</div>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"5px",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{SUB}</div>
              </div>
            }
          </div>

          {/* Center nav */}
          <div className="hide-mob" style={{flex:1,display:"flex",justifyContent:"center",gap:"2px"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>{setCat(c);setPage("shop");}} style={{background:"none",border:"none",color:cat===c?"#1a1208":"#8a7a5a",padding:"8px 16px",fontSize:"11px",fontWeight:"500",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",position:"relative",transition:"color 0.2s",fontFamily:"'Jost',sans-serif"}}>
                {c==="All"?"COLLECTION":c.toUpperCase()}
                {cat===c&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"24px",height:"1px",background:"#b8922a"}}/>}
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div style={{display:"flex",alignItems:"center",gap:"4px",flexShrink:0}}>
            <button onClick={()=>setShowSearch(s=>!s)} style={{background:"none",border:"none",color:"#8a7a5a",width:"38px",height:"38px",display:"flex",alignItems:"center",justifyContent:"center",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#1a1208"} onMouseLeave={e=>e.currentTarget.style.color="#8a7a5a"}>{ICONS.search}</button>
            <button onClick={()=>customer?setPage("wishlist"):setShowLogin(true)} style={{background:"none",border:"none",color:"#8a7a5a",width:"38px",height:"38px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#1a1208"} onMouseLeave={e=>e.currentTarget.style.color="#8a7a5a"}>
              {ICONS.heart}{wishlist.length>0&&<span style={{position:"absolute",top:"4px",right:"4px",background:"#b8922a",color:"#fff",borderRadius:"50%",width:"14px",height:"14px",fontSize:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800"}}>{wishlist.length}</span>}
            </button>
            <button onClick={()=>setShowCart(true)} style={{background:"none",border:"none",color:"#8a7a5a",width:"38px",height:"38px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#1a1208"} onMouseLeave={e=>e.currentTarget.style.color="#8a7a5a"}>
              {ICONS.bag}{cartCount>0&&<span style={{position:"absolute",top:"4px",right:"4px",background:"#b8922a",color:"#fff",borderRadius:"50%",width:"14px",height:"14px",fontSize:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800"}}>{cartCount}</span>}
            </button>
            <button onClick={()=>customer?setPage("account"):setShowLogin(true)} style={{background:"none",border:"1px solid #d4a84366",color:"#1a1208",padding:"7px 16px",fontSize:"10px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",marginLeft:"4px",transition:"all 0.2s",fontFamily:"'Jost',sans-serif"}} onMouseEnter={e=>{e.currentTarget.style.background="#1a1208";e.currentTarget.style.color="#d4a843";}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="#1a1208";}}>
              {customer?customer.name.split(" ")[0]:"Login"}
            </button>
            <button onClick={()=>setMob(m=>!m)} style={{display:"none",background:"none",border:"none",color:"#1a1208",fontSize:"22px",marginLeft:"4px"}} className="show-mob">☰</button>
          </div>
        </div>

        {/* Search */}
        {showSearch&&<div style={{background:"rgba(250,248,243,0.98)",borderTop:"1px solid #d4a84322",padding:"14px clamp(16px,4vw,48px)"}}>
          <div style={{maxWidth:"560px",margin:"0 auto",position:"relative"}}>
            <input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search fabrics, colors, brands..." style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #b8922a",padding:"10px 0",color:"#1a1208",fontSize:"14px",outline:"none",fontFamily:"'Cormorant Garamond',serif",letterSpacing:"1px"}}/>
            <span style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",color:"#b8922a",fontSize:"14px"}}>🔍</span>
          </div>
        </div>}

        {/* Mobile menu */}
        {mob&&<div style={{background:"rgba(250,248,243,0.98)",borderTop:"1px solid #d4a84322",padding:"8px 0"}}>
          {CATS.map(c=><button key={c} onClick={()=>{setCat(c);setPage("shop");setMob(false);}} style={{display:"block",width:"100%",background:"none",border:"none",color:cat===c?"#1a1208":"#8a7a5a",padding:"12px 24px",fontSize:"11px",fontWeight:"600",textAlign:"left",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",cursor:"pointer"}}>{c==="All"?"ALL COLLECTIONS":c.toUpperCase()}</button>)}
          <button onClick={()=>setShowTrack(true)} style={{display:"block",width:"100%",background:"none",border:"none",color:"#b8922a",padding:"12px 24px",fontSize:"11px",fontWeight:"600",textAlign:"left",letterSpacing:"2px",fontFamily:"'Jost',sans-serif",cursor:"pointer"}}>🚚 TRACK ORDER</button>
        </div>}
      </nav>
      <div style={{height:"100px"}}/>
    </>
  );
}

// ── HERO SECTION ──────────────────────────────────────────────
function Hero({settings,setCat,setPage}){
  const [idx,setIdx]=useState(0);
  const [vis,setVis]=useState(true);
  const texts=settings?.heroTexts||["Where Elegance Meets Heritage","Exclusive Pakistani Fabrics","Crafted with Love, Worn with Pride","Limited Pieces. Infinite Beauty."];
  useEffect(()=>{
    const t=setInterval(()=>{setVis(false);setTimeout(()=>{setIdx(i=>(i+1)%texts.length);setVis(true);},500);},3500);
    return()=>clearInterval(t);
  },[texts.length]);
  useReveal();
  const viewerCount=useRef(Math.floor(Math.random()*8)+4);
  useEffect(()=>{const t=setInterval(()=>{viewerCount.current=Math.max(2,Math.min(16,viewerCount.current+(Math.random()>0.5?1:-1)));},9000);return()=>clearInterval(t);},[]);

  return(
    <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",background:"var(--cream)",overflow:"hidden"}}>
      {/* Decorative background */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        <div style={{position:"absolute",top:0,right:0,width:"60%",height:"100%",background:"linear-gradient(135deg,transparent 40%,rgba(212,168,67,0.06) 100%)"}}/>
        <div style={{position:"absolute",bottom:"10%",left:"5%",width:"300px",height:"300px",border:"1px solid rgba(212,168,67,0.12)",borderRadius:"50%",animation:"rotate 40s linear infinite"}}/>
        <div style={{position:"absolute",top:"15%",right:"8%",width:"200px",height:"200px",border:"1px solid rgba(212,168,67,0.08)",borderRadius:"50%",animation:"rotate 30s linear infinite reverse"}}/>
        {/* Gold diagonal lines */}
        {[20,40,60,80].map(p=><div key={p} style={{position:"absolute",top:0,left:`${p}%`,width:"1px",height:"100%",background:`linear-gradient(to bottom,transparent,rgba(212,168,67,0.06),transparent)`,transform:"rotate(15deg) translateX(-50%)"}}/>)}
      </div>

      {/* Content */}
      <div style={{maxWidth:"1400px",margin:"0 auto",padding:"0 clamp(16px,5vw,80px)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(24px,5vw,80px)",alignItems:"center",width:"100%"}} className="grid-1-mob">
        <div>
          <div className="reveal" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(11px,1.2vw,13px)",letterSpacing:"6px",color:"#b8922a",marginBottom:"20px",fontStyle:"italic"}}>✦ PREMIUM PAKISTANI COLLECTION</div>
          <h1 className="reveal" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,5.5vw,72px)",fontWeight:"900",lineHeight:1.1,color:"#1a1208",marginBottom:"24px",minHeight:"3em",animationDelay:"0.1s"}}>
            <span style={{opacity:vis?1:0,transition:"opacity 0.5s ease",display:"block"}}>{texts[idx]}</span>
          </h1>
          <p className="reveal" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(17px,2vw,22px)",color:"#8a7a5a",lineHeight:1.8,marginBottom:"40px",fontStyle:"italic",animationDelay:"0.2s"}}>
            {settings?.heroSubtitle||"Each piece in our collection is handpicked for its quality and elegance — once sold, never repeated."}
          </p>
          <div className="reveal" style={{display:"flex",gap:"12px",flexWrap:"wrap",animationDelay:"0.3s"}}>
            <button onClick={()=>{setCat("All");setPage("shop");}} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"15px 40px",fontSize:"11px",fontWeight:"600",letterSpacing:"3px",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s",fontFamily:"'Jost',sans-serif"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>
              View Collection
            </button>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Assalam! I'd like to see your latest collection.")}`} target="_blank" rel="noreferrer" style={{background:"transparent",color:"#1a1208",border:"1px solid #1a120844",padding:"15px 36px",fontSize:"11px",fontWeight:"600",letterSpacing:"3px",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s",fontFamily:"'Jost',sans-serif",display:"inline-block"}} onMouseEnter={e=>{e.target.style.borderColor="#b8922a";e.target.style.color="#b8922a";}} onMouseLeave={e=>{e.target.style.borderColor="#1a120844";e.target.style.color="#1a1208";}}>
              WhatsApp Us
            </a>
          </div>
          {/* Live stat */}
          <div className="reveal" style={{marginTop:"32px",display:"flex",alignItems:"center",gap:"8px",animationDelay:"0.4s"}}>
            <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#22c55e",animation:"pulse3d 2s ease infinite"}}/>
            <span style={{fontSize:"12px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>{viewerCount.current} people browsing now</span>
          </div>
        </div>

        {/* Right — 3D floating image */}
        <div className="reveal-right" style={{position:"relative",height:"clamp(400px,60vh,700px)"}}>
          {/* Main product display */}
          <TiltCard style={{position:"absolute",inset:"5%",background:"var(--cream2)",border:"1px solid var(--border)",overflow:"hidden",boxShadow:"var(--shadow)"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(212,168,67,0.08) 0%,transparent 60%)"}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px"}}>
              <div style={{fontSize:"64px",animation:"float 4s ease-in-out infinite"}}>🧵</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"20px",color:"#8a7a5a",fontStyle:"italic"}}>New Arrivals</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"28px",fontWeight:"700",color:"#1a1208"}}>2026 Collection</div>
              <div style={{width:"40px",height:"1px",background:"#b8922a",margin:"4px 0"}}/>
              <div style={{fontSize:"12px",color:"#b8922a",letterSpacing:"3px",fontFamily:"'Jost',sans-serif"}}>EXCLUSIVE PIECES</div>
            </div>
          </TiltCard>
          {/* Floating badges */}
          <div style={{position:"absolute",top:"8%",right:"-2%",background:"#1a1208",color:"#d4a843",padding:"8px 16px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",fontFamily:"'Jost',sans-serif",animation:"float 3s ease-in-out 0.5s infinite",boxShadow:"0 8px 24px rgba(26,18,8,0.2)"}}>NEW ARRIVAL</div>
          <div style={{position:"absolute",bottom:"12%",left:"-2%",background:"#b8922a",color:"#fff",padding:"8px 16px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",fontFamily:"'Jost',sans-serif",animation:"float 3.5s ease-in-out 1s infinite",boxShadow:"0 8px 24px rgba(184,146,42,0.3)"}}>LIMITED EDITION</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{position:"absolute",bottom:"32px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px"}}>
        <div style={{width:"1px",height:"40px",background:"linear-gradient(to bottom,#b8922a,transparent)",animation:"shimmer 2s ease infinite"}}/>
        <span style={{fontSize:"9px",color:"#b8922a",letterSpacing:"3px",fontFamily:"'Jost',sans-serif"}}>SCROLL</span>
      </div>
    </section>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────
function ProdCard({p,onView,onAdd,wishlist,toggleWish,i=0}){
  const [hov,setHov]=useState(false);
  const [ref,setRef]=useState(null);
  const photos=[p.photo_url,p.photo_url2].filter(Boolean);
  const fb=`https://placehold.co/400x520/f2ede3/b8922a?text=${encodeURIComponent((p.name||"").slice(0,10))}`;
  const img=photos[0]||fb,img2=photos[1]||img;
  const wished=wishlist.includes(p.id);
  const hasDis=p.offerPrice&&p.offerPrice<p.salePrice;
  const sizes=tryParse(p.available_sizes,[]);

  // Reveal
  useEffect(()=>{
    if(!ref)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)ref.classList.add("visible");},{threshold:0.1});
    obs.observe(ref);return()=>obs.disconnect();
  },[ref]);

  return(
    <div ref={setRef} className="reveal" style={{animationDelay:`${i*0.07}s`}}>
      <TiltCard style={{background:"#fff",overflow:"hidden",cursor:"pointer"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
        {/* Image */}
        <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"var(--cream2)"}} onClick={()=>onView(p)}>
          <img src={hov&&img2!==img?img2:img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)",transform:hov?"scale(1.06)":"scale(1)"}} onError={e=>e.target.src=fb}/>

          {/* Overlay */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,18,8,0.5) 0%,transparent 50%)",opacity:hov?1:0,transition:"opacity 0.3s"}}/>

          {/* Badges */}
          <div style={{position:"absolute",top:"12px",left:"12px",display:"flex",flexDirection:"column",gap:"4px"}}>
            {p.is_new_arrival&&<span style={{background:"#1a1208",color:"#d4a843",padding:"3px 10px",fontSize:"9px",fontWeight:"700",letterSpacing:"1.5px",fontFamily:"'Jost',sans-serif"}}>NEW</span>}
            {hasDis&&<span style={{background:"#b91c1c",color:"#fff",padding:"3px 10px",fontSize:"9px",fontWeight:"700",fontFamily:"'Jost',sans-serif"}}>SALE</span>}
            {p.stock===1&&p.stock>0&&<span style={{background:"#b8922a",color:"#fff",padding:"3px 10px",fontSize:"9px",fontWeight:"700",fontFamily:"'Jost',sans-serif"}}>LAST 1</span>}
          </div>

          {p.stock<=0&&<div style={{position:"absolute",inset:0,background:"rgba(250,248,243,0.75)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{border:"2px solid #1a1208",color:"#1a1208",padding:"8px 24px",fontSize:"11px",fontWeight:"700",letterSpacing:"3px",fontFamily:"'Jost',sans-serif"}}>SOLD OUT</span></div>}

          {/* Wish */}
          <button onClick={e=>{e.stopPropagation();toggleWish(p.id);}} style={{position:"absolute",top:"12px",right:"12px",background:"rgba(255,255,255,0.9)",border:"none",width:"34px",height:"34px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",cursor:"pointer",transition:"all 0.2s",opacity:hov?1:0.7}}>
            {wished?"❤️":"🤍"}
          </button>

          {/* Quick add */}
          {hov&&p.stock>0&&<button onClick={e=>{e.stopPropagation();onAdd(p);}} style={{position:"absolute",bottom:"12px",left:"12px",right:"12px",background:"#1a1208",color:"#d4a843",border:"none",padding:"10px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"background 0.2s",animation:"fadeUp 0.2s ease both"}} onMouseEnter={e=>e.target.style.background="#d4a843"&&(e.target.style.color="#1a1208")} onMouseLeave={e=>e.target.style.background="#1a1208"}>
            ADD TO CART
          </button>}
        </div>

        {/* Info */}
        <div style={{padding:"16px 18px 18px"}}>
          <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"6px",fontFamily:"'Jost',sans-serif"}}>{p.website_category||p.category}</div>
          <div onClick={()=>onView(p)} style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"clamp(14px,1.5vw,16px)",color:"#1a1208",marginBottom:"4px",lineHeight:1.3}}>{p.website_title||p.name}</div>
          <div style={{fontSize:"11px",color:"#8a7a5a",marginBottom:"8px",fontFamily:"'Jost',sans-serif"}}>{p.color} · {p.fabric_type||p.fabric}</div>

          {/* Sizes */}
          {p.size_type==="stitched"&&sizes.length>0&&<div style={{display:"flex",gap:"4px",marginBottom:"8px",flexWrap:"wrap"}}>
            {sizes.map(s=><span key={s} style={{border:"1px solid #d4a84355",padding:"2px 7px",fontSize:"9px",color:"#8a7a5a",fontWeight:"600",fontFamily:"'Jost',sans-serif",letterSpacing:"0.5px"}}>{s}</span>)}
          </div>}
          {(p.size_type==="meter"||p.size_type==="gaz")&&p.stock>0&&<div style={{fontSize:"10px",color:"#b8922a",marginBottom:"8px",fontFamily:"'Jost',sans-serif"}}>{p.stock} {p.size_type} available</div>}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
            <div>
              {hasDis&&<div style={{fontSize:"11px",color:"#aaa",textDecoration:"line-through",fontFamily:"'Jost',sans-serif"}}>{pkr(p.salePrice)}</div>}
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",fontWeight:"700",color:"#1a1208"}}>{pkr(hasDis?p.offerPrice:p.salePrice)}</div>
            </div>
            <span style={{fontSize:"10px",color:"#b8922a",letterSpacing:"1px",fontFamily:"'Jost',sans-serif"}}>/{p.qtyType}</span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

// ── PRODUCT MODAL ─────────────────────────────────────────────
function ProdModal({p,onClose,wishlist,toggleWish,onAdd,reviews,onReview,settings}){
  const [ai,setAi]=useState(0);
  const [tab,setTab]=useState("details");
  const [rv,setRv]=useState({name:"",rating:5,comment:""});
  const photos=[p.photo_url,p.photo_url2,p.photo_url3,p.photo_url4,p.photo_url5].filter(Boolean);
  const fb=`https://placehold.co/600x750/f2ede3/b8922a?text=${encodeURIComponent((p.name||"").slice(0,10))}`;
  const imgs=photos.length?photos:[fb];
  const wished=wishlist.includes(p.id);
  const hasDis=p.offerPrice&&p.offerPrice<p.salePrice;
  const PR=reviews.filter(r=>r.product_id===p.id);
  const avg=PR.length?Math.round(PR.reduce((a,r)=>a+r.rating,0)/PR.length):5;
  const sizes=tryParse(p.available_sizes,[]);
  const waText=`Assalam o Alaikum! 👋\n\nI'm interested in:\n*${p.website_title||p.name}*\n💰 Price: ${pkr(hasDis?p.offerPrice:p.salePrice)}\n🎨 Color: ${p.color}\n🧵 Fabric: ${p.fabric_type||p.fabric}\n\nIs it still available?`;

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(26,18,8,0.7)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(8px)",animation:"fadeIn 0.3s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#faf8f3",width:"100%",maxWidth:"920px",maxHeight:"92vh",overflow:"auto",animation:"scaleIn 0.3s ease",display:"grid",gridTemplateColumns:"1fr 1fr"}} className="grid-1-mob">
        {/* Images */}
        <div style={{padding:"clamp(16px,3vw,28px)",borderRight:"1px solid #d4a84322"}}>
          <div style={{aspectRatio:"3/4",overflow:"hidden",marginBottom:"10px",position:"relative"}}>
            <img src={imgs[ai]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src=fb}/>
            {p.is_new_arrival&&<div style={{position:"absolute",top:"12px",left:"12px",background:"#1a1208",color:"#d4a843",padding:"4px 12px",fontSize:"9px",fontWeight:"700",letterSpacing:"1.5px",fontFamily:"'Jost',sans-serif"}}>NEW ARRIVAL</div>}
            {p.stock<=0&&<div style={{position:"absolute",inset:0,background:"rgba(250,248,243,0.75)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{border:"2px solid #1a1208",color:"#1a1208",padding:"8px 24px",fontSize:"11px",fontWeight:"700",letterSpacing:"3px",fontFamily:"'Jost',sans-serif"}}>SOLD OUT</span></div>}
          </div>
          {imgs.length>1&&<div style={{display:"flex",gap:"6px"}}>
            {imgs.map((im,i)=><div key={i} onClick={()=>setAi(i)} style={{width:"56px",height:"68px",overflow:"hidden",cursor:"pointer",border:`2px solid ${ai===i?"#b8922a":"transparent"}`,transition:"border 0.2s"}}>
              <img src={im} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src=fb}/>
            </div>)}
          </div>}
        </div>

        {/* Details */}
        <div style={{padding:"clamp(16px,3vw,28px)",display:"flex",flexDirection:"column",gap:"14px",overflow:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:"10px",color:"#b8922a",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"8px",fontFamily:"'Jost',sans-serif"}}>{p.website_category||p.category}</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,2.5vw,24px)",fontWeight:"700",color:"#1a1208",lineHeight:1.2}}>{p.website_title||p.name}</h2>
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              <button onClick={()=>toggleWish(p.id)} style={{background:"none",border:"1px solid #d4a84344",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"15px"}}>{wished?"❤️":"🤍"}</button>
              <button onClick={onClose} style={{background:"none",border:"1px solid #d4a84344",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#8a7a5a",fontSize:"16px"}}>✕</button>
            </div>
          </div>

          {/* Rating */}
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{display:"flex",gap:"1px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=avg?"#b8922a":"#d4a84333",fontSize:"14px"}}>★</span>)}</div>
            <span style={{fontSize:"12px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif"}}>({PR.length} reviews)</span>
          </div>

          {/* Price */}
          <div style={{background:"var(--cream2)",padding:"14px",borderLeft:"3px solid #b8922a"}}>
            {hasDis&&<div style={{fontSize:"12px",color:"#aaa",textDecoration:"line-through",fontFamily:"'Jost',sans-serif"}}>{pkr(p.salePrice)}</div>}
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(22px,3vw,28px)",fontWeight:"700",color:"#1a1208"}}>{pkr(hasDis?p.offerPrice:p.salePrice)}<span style={{fontSize:"13px",color:"#8a7a5a",marginLeft:"6px"}}>/ {p.qtyType}</span></div>
            <div style={{fontSize:"12px",color:p.stock>0?"#22c55e":"#dc2626",marginTop:"4px",fontFamily:"'Jost',sans-serif",fontWeight:"600"}}>{p.stock>0?`✓ Available${p.stock===1?" — Last piece!":""}` :"✕ Sold Out"}</div>
          </div>

          {/* Sizes */}
          {p.size_type==="stitched"&&sizes.length>0&&<div>
            <div style={{fontSize:"10px",color:"#8a7a5a",letterSpacing:"2px",marginBottom:"8px",fontFamily:"'Jost',sans-serif"}}>AVAILABLE SIZES</div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
              {sizes.map(s=><span key={s} style={{border:"1px solid #d4a84355",padding:"6px 14px",fontSize:"11px",color:"#1a1208",fontWeight:"600",fontFamily:"'Jost',sans-serif",letterSpacing:"0.5px"}}>{s}</span>)}
            </div>
          </div>}

          {/* Tabs */}
          <div style={{display:"flex",borderBottom:"1px solid #d4a84322"}}>
            {["details","specs","reviews"].map(t=><button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",borderBottom:`2px solid ${tab===t?"#b8922a":"transparent"}`,padding:"8px 16px",fontSize:"10px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",color:tab===t?"#1a1208":"#8a7a5a",transition:"all 0.2s",fontFamily:"'Jost',sans-serif",marginBottom:"-1px"}}>
              {t==="reviews"?`Reviews (${PR.length})`:t.charAt(0).toUpperCase()+t.slice(1)}
            </button>)}
          </div>

          {/* Tab content */}
          <div style={{fontSize:"13px",color:"#8a7a5a",lineHeight:1.8,fontFamily:"'Cormorant Garamond',serif",fontSize:"15px",flex:1,overflowY:"auto",maxHeight:"160px"}}>
            {tab==="details"&&<p>{p.website_description||p.description||"Premium exclusive fabric from Jameel Fabrics Kunjah. Each piece is unique — once sold, it's gone forever."}</p>}
            {tab==="specs"&&[["Brand",p.brand],["Color",p.color],["Fabric",p.fabric_type||p.fabric],["Category",p.category],["Washing",p.washing_instructions||"Dry clean recommended"],["Size Guide",p.size_guide||"Standard"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #d4a84311",fontSize:"13px",fontFamily:"'Jost',sans-serif"}}>
                <span style={{color:"#8a7a5a",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase"}}>{k}</span>
                <span style={{color:"#1a1208",fontWeight:"500"}}>{v||"—"}</span>
              </div>
            ))}
            {tab==="reviews"&&<div>
              {PR.map(r=><div key={r.id} style={{borderBottom:"1px solid #d4a84311",paddingBottom:"10px",marginBottom:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                  <span style={{fontFamily:"'Jost',sans-serif",fontSize:"13px",fontWeight:"600",color:"#1a1208"}}>{r.customer_name}</span>
                  <div style={{display:"flex",gap:"1px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=r.rating?"#b8922a":"#eee",fontSize:"11px"}}>★</span>)}</div>
                </div>
                <p style={{fontSize:"13px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif"}}>{r.comment}</p>
              </div>)}
              {!PR.length&&<p style={{color:"#aaa",textAlign:"center",padding:"16px",fontFamily:"'Jost',sans-serif"}}>No reviews yet — be the first!</p>}
              <div style={{marginTop:"12px",borderTop:"1px solid #d4a84322",paddingTop:"12px"}}>
                <div style={{fontSize:"10px",color:"#b8922a",letterSpacing:"2px",marginBottom:"8px",fontFamily:"'Jost',sans-serif"}}>WRITE A REVIEW</div>
                <input value={rv.name} onChange={e=>setRv(v=>({...v,name:e.target.value}))} placeholder="Your name" style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",fontSize:"13px",color:"#1a1208",outline:"none",marginBottom:"8px",fontFamily:"'Jost',sans-serif"}}/>
                <div style={{display:"flex",gap:"3px",marginBottom:"8px"}}>{[1,2,3,4,5].map(i=><span key={i} onClick={()=>setRv(v=>({...v,rating:i}))} style={{fontSize:"20px",cursor:"pointer",color:i<=rv.rating?"#b8922a":"#eee"}}>★</span>)}</div>
                <textarea value={rv.comment} onChange={e=>setRv(v=>({...v,comment:e.target.value}))} placeholder="Your experience..." style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",fontSize:"13px",color:"#1a1208",outline:"none",height:"50px",resize:"none",fontFamily:"'Jost',sans-serif"}}/>
                <button onClick={()=>{if(rv.name&&rv.comment){onReview({...rv,product_id:p.id,product_name:p.name,id:gid(),date:new Date().toLocaleDateString(),verified:false});setRv({name:"",rating:5,comment:""});}}} style={{marginTop:"8px",background:"#1a1208",color:"#d4a843",border:"none",padding:"8px 20px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>SUBMIT</button>
              </div>
            </div>}
          </div>

          {/* CTAs */}
          {p.stock>0?(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"auto"}}>
              <button onClick={()=>{onAdd(p);onClose();}} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"14px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>ADD TO CART</button>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" style={{background:"#25D366",color:"#fff",border:"none",padding:"14px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",textDecoration:"none"}}>📱 ENQUIRE</a>
            </div>
          ):(
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Assalam! "${p.name}" is sold out. Do you have something similar?`)}`} target="_blank" rel="noreferrer" style={{background:"#25D366",color:"#fff",border:"none",padding:"14px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",textAlign:"center",display:"block",textDecoration:"none",marginTop:"auto"}}>📱 ASK FOR SIMILAR</a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CART ──────────────────────────────────────────────────────
function Cart({cart,setCart,onClose,customer,setShowLogin,setShowCheckout,settings,coupon,setCoupon}){
  const sub=cart.reduce((a,c)=>a+c.price*c.qty,0);
  const total=coupon?Math.max(0,sub-coupon.discount):sub;
  const upd=(id,q)=>{if(q<1)setCart(c=>c.filter(x=>x.id!==id));else setCart(c=>c.map(x=>x.id===id?{...x,qty:q}:x));};
  const [code,setCode]=useState("");const[msg,setMsg]=useState("");
  const applyCode=()=>{
    const cps=settings?.coupons||[];
    const c=cps.find(x=>x.code.toUpperCase()===code.toUpperCase()&&x.active);
    if(!c){setMsg("❌ Invalid code");return;}
    const d=c.type==="percent"?Math.round(sub*c.discount/100):c.discount;
    setCoupon({code:c.code,discount:d,label:`${c.code} (${c.discount}${c.type==="percent"?"%":"Rs."} off)`});
    setMsg(`✅ ${c.discount}${c.type==="percent"?"%":"Rs."} off applied!`);
  };
  return(
    <div style={{position:"fixed",inset:0,zIndex:900}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(26,18,8,0.5)",backdropFilter:"blur(4px)"}}/>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:"min(420px,100vw)",background:"#faf8f3",borderLeft:"1px solid #d4a84322",display:"flex",flexDirection:"column",animation:"slideLeft 0.3s ease"}}>
        <div style={{padding:"20px 24px",borderBottom:"1px solid #d4a84322",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"700",color:"#1a1208"}}>Your Cart <span style={{color:"#b8922a",fontSize:"14px"}}>({cart.length})</span></div>
          <button onClick={onClose} style={{background:"none",border:"1px solid #d4a84344",width:"32px",height:"32px",color:"#8a7a5a",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          {cart.length===0&&<div style={{textAlign:"center",padding:"60px 0",color:"#8a7a5a"}}>
            <div style={{fontSize:"40px",marginBottom:"12px"}}>🛍</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",marginBottom:"6px",color:"#1a1208"}}>Your cart is empty</div>
            <div style={{fontSize:"13px",fontFamily:"'Jost',sans-serif"}}>Add some beautiful pieces</div>
          </div>}
          {cart.map(item=>{
            const fb=`https://placehold.co/80x100/f2ede3/b8922a?text=JF`;
            return(
              <div key={item.id} style={{display:"flex",gap:"12px",padding:"14px 0",borderBottom:"1px solid #d4a84311"}}>
                <img src={item.photo||fb} alt={item.name} style={{width:"68px",height:"84px",objectFit:"cover",flexShrink:0}} onError={e=>e.target.src=fb}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontWeight:"700",color:"#1a1208",marginBottom:"3px"}}>{item.name}</div>
                  <div style={{fontSize:"11px",color:"#8a7a5a",marginBottom:"8px",fontFamily:"'Jost',sans-serif"}}>{item.color}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",border:"1px solid #d4a84333",padding:"4px 10px"}}>
                      <button onClick={()=>upd(item.id,item.qty-1)} style={{background:"none",border:"none",color:"#b8922a",fontSize:"16px",cursor:"pointer",lineHeight:1}}>−</button>
                      <span style={{color:"#1a1208",fontSize:"13px",fontWeight:"700",fontFamily:"'Jost',sans-serif",minWidth:"16px",textAlign:"center"}}>{item.qty}</span>
                      <button onClick={()=>upd(item.id,item.qty+1)} style={{background:"none",border:"none",color:"#b8922a",fontSize:"16px",cursor:"pointer",lineHeight:1}}>+</button>
                    </div>
                    <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"16px",fontWeight:"700",color:"#1a1208"}}>{pkr(item.price*item.qty)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {cart.length>0&&<div style={{padding:"16px 24px",borderTop:"1px solid #d4a84322"}}>
          {/* Coupon */}
          {!coupon?<div style={{marginBottom:"12px"}}>
            <div style={{display:"flex",gap:"6px"}}>
              <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="COUPON CODE" style={{flex:1,background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"7px 0",fontSize:"11px",color:"#1a1208",outline:"none",letterSpacing:"2px",fontFamily:"'Jost',sans-serif"}}/>
              <button onClick={applyCode} style={{background:"none",border:"none",color:"#b8922a",fontSize:"11px",fontWeight:"700",cursor:"pointer",letterSpacing:"1px",fontFamily:"'Jost',sans-serif"}}>APPLY</button>
            </div>
            {msg&&<div style={{fontSize:"11px",marginTop:"4px",color:msg.startsWith("✅")?"#22c55e":"#dc2626",fontFamily:"'Jost',sans-serif"}}>{msg}</div>}
          </div>:<div style={{marginBottom:"10px",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"var(--cream2)"}}>
            <span style={{fontSize:"11px",color:"#22c55e",fontWeight:"700",fontFamily:"'Jost',sans-serif"}}>🎫 {coupon.label}</span>
            <button onClick={()=>setCoupon(null)} style={{background:"none",border:"none",color:"#dc2626",cursor:"pointer",fontSize:"16px"}}>✕</button>
          </div>}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px",fontSize:"12px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif"}}><span>Subtotal</span><span>{pkr(sub)}</span></div>
          {coupon&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px",fontSize:"12px",color:"#22c55e",fontFamily:"'Jost',sans-serif"}}><span>Discount</span><span>- Rs.{coupon.discount.toLocaleString()}</span></div>}
          <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderTop:"1px solid #d4a84322",marginTop:"4px"}}>
            <span style={{color:"#8a7a5a",fontFamily:"'Jost',sans-serif",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase"}}>Total</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",fontWeight:"700",color:"#1a1208"}}>{pkr(total)}</span>
          </div>
          <button onClick={()=>customer?setShowCheckout(true):setShowLogin(true)} style={{width:"100%",background:"#1a1208",color:"#d4a843",border:"none",padding:"14px",fontSize:"11px",fontWeight:"700",letterSpacing:"3px",cursor:"pointer",fontFamily:"'Jost',sans-serif",marginBottom:"8px",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>CHECKOUT VIA WHATSAPP</button>
          <button onClick={()=>setCart([])} style={{width:"100%",background:"none",border:"1px solid #d4a84333",padding:"10px",color:"#8a7a5a",fontSize:"11px",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>CLEAR CART</button>
        </div>}
      </div>
    </div>
  );
}

// ── CHECKOUT ──────────────────────────────────────────────────
function Checkout({cart,customer,onClose,settings,coupon}){
  const sub=cart.reduce((a,c)=>a+c.price*c.qty,0);
  const total=coupon?Math.max(0,sub-coupon.discount):sub;
  const msg=[`🛍️ *NEW ORDER — ${BRAND} ${SUB}*`,`━━━━━━━━━━━━━━━━━━━━`,`👤 *Customer*`,`Name: ${customer?.name}`,`Phone: ${customer?.phone}`,`City: ${customer?.city}`,`Address: ${customer?.address}`,`━━━━━━━━━━━━━━━━━━━━`,`📦 *Items*`,...cart.map((it,i)=>`${i+1}. ${it.name}\n   Qty: ${it.qty} | ${pkr(it.price*it.qty)}`),`━━━━━━━━━━━━━━━━━━━━`,coupon?`🎫 Coupon: ${coupon.code} (-Rs.${coupon.discount.toLocaleString()})`:"",`💰 *TOTAL: ${pkr(total)}*`,`💳 Cash on Delivery`,`━━━━━━━━━━━━━━━━━━━━`,`Date: ${new Date().toLocaleString()}`,`Please confirm. Thank you! 🙏`].filter(Boolean).join("\n");

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,18,8,0.8)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(10px)"}}>
      <div style={{background:"#faf8f3",width:"100%",maxWidth:"460px",animation:"scaleIn 0.3s ease",overflow:"hidden"}}>
        <div style={{padding:"20px 24px",borderBottom:"1px solid #d4a84322",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(135deg,#1a1208,#2a1f0a)"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"700",color:"#d4a843"}}>Order Summary</div>
          <button onClick={onClose} style={{background:"none",border:"1px solid #d4a84344",width:"32px",height:"32px",color:"#d4a843",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"20px 24px",maxHeight:"50vh",overflowY:"auto"}}>
          {cart.map(it=><div key={it.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #d4a84311",fontSize:"13px"}}>
            <div><div style={{color:"#1a1208",fontWeight:"600",fontFamily:"'Playfair Display',serif"}}>{it.name}</div><div style={{color:"#8a7a5a",fontSize:"11px",fontFamily:"'Jost',sans-serif"}}>{it.color} × {it.qty}</div></div>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:"700",color:"#1a1208",fontSize:"15px"}}>{pkr(it.price*it.qty)}</span>
          </div>)}
          {coupon&&<div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:"13px",color:"#22c55e",fontFamily:"'Jost',sans-serif",fontWeight:"600"}}><span>Coupon: {coupon.code}</span><span>- Rs.{coupon.discount.toLocaleString()}</span></div>}
          <div style={{display:"flex",justifyContent:"space-between",padding:"14px 0",borderTop:"1px solid #d4a84322",marginTop:"8px"}}><span style={{color:"#8a7a5a",fontFamily:"'Jost',sans-serif",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase"}}>Total</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",fontWeight:"700",color:"#1a1208"}}>{pkr(total)}</span></div>
        </div>
        <div style={{padding:"16px 24px",borderTop:"1px solid #d4a84322"}}>
          <a href={`https://wa.me/${settings?.whatsapp||WA}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer" onClick={async()=>{if(supabase)for(const it of cart)await supabase.from("online_orders").insert({id:gid(),product_id:it.id,product_name:it.name,product_price:it.price,customer_name:customer.name,phone:customer.phone,city:customer.city,address:customer.address,status:"Pending",date:new Date().toLocaleDateString()});}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",background:"#25D366",color:"#fff",padding:"14px",fontWeight:"700",fontSize:"12px",letterSpacing:"2px",textDecoration:"none",fontFamily:"'Jost',sans-serif",marginBottom:"8px"}}>
            📱 CONFIRM ON WHATSAPP
          </a>
          <p style={{fontSize:"11px",color:"#8a7a5a",textAlign:"center",fontFamily:"'Jost',sans-serif"}}>Order confirmed via WhatsApp · Payment on delivery</p>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────
function Login({onClose,onLogin}){
  const [fm,setFm]=useState({name:"",phone:"",city:"",address:""});
  const save=()=>{if(!fm.name||!fm.phone)return alert("Name and phone required!");LS.set("customer",fm);onLogin(fm);onClose();};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,18,8,0.8)",zIndex:1200,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(10px)"}}>
      <div style={{background:"#faf8f3",width:"100%",maxWidth:"380px",animation:"scaleIn 0.3s ease",overflow:"hidden"}}>
        <div style={{padding:"24px",borderBottom:"1px solid #d4a84322",textAlign:"center",background:"linear-gradient(135deg,#1a1208,#2a1f0a)"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:"700",color:"#d4a843",marginBottom:"4px"}}>Welcome</div>
          <p style={{fontSize:"12px",color:"#d4a84399",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>Enter your details to continue</p>
        </div>
        <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"16px"}}>
          {[["Full Name *","name","text"],["Phone Number *","phone","tel"],["City","city","text"],["Address","address","text"]].map(([l,k,t])=>(
            <div key={k}>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"6px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>{l}</div>
              <input type={t} value={fm[k]} onChange={e=>setFm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"8px 0",fontSize:"14px",color:"#1a1208",outline:"none",fontFamily:"'Cormorant Garamond',serif",transition:"border 0.2s"}} onFocus={e=>e.target.style.borderBottomColor="#b8922a"} onBlur={e=>e.target.style.borderBottomColor="#d4a84344"}/>
            </div>
          ))}
          <button onClick={save} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"14px",fontSize:"11px",fontWeight:"700",letterSpacing:"3px",cursor:"pointer",fontFamily:"'Jost',sans-serif",marginTop:"8px",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>CONTINUE →</button>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#8a7a5a",fontSize:"11px",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>Skip for now</button>
        </div>
      </div>
    </div>
  );
}

// ── TRACKING ─────────────────────────────────────────────────
function Tracking({onClose}){
  const [phone,setPhone]=useState("");
  const [orders,setOrders]=useState([]);
  const [searched,setSearched]=useState(false);
  const [loading,setLoading]=useState(false);
  const STEPS=["Pending","Confirmed","Processing","Shipped","Delivered"];
  const search=async()=>{if(!phone)return;setLoading(true);if(supabase){const{data}=await supabase.from("online_orders").select("*").eq("phone",phone);setOrders(data||[]);}setSearched(true);setLoading(false);};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,18,8,0.8)",zIndex:1300,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(10px)"}}>
      <div style={{background:"#faf8f3",width:"100%",maxWidth:"520px",maxHeight:"90vh",overflowY:"auto",animation:"scaleIn 0.3s ease"}}>
        <div style={{padding:"20px 24px",borderBottom:"1px solid #d4a84322",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(135deg,#1a1208,#2a1f0a)"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"700",color:"#d4a843"}}>🚚 Track Order</div>
          <button onClick={onClose} style={{background:"none",border:"1px solid #d4a84344",width:"32px",height:"32px",color:"#d4a843",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"24px"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number..." style={{flex:1,background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"10px 0",fontSize:"14px",color:"#1a1208",outline:"none",fontFamily:"'Cormorant Garamond',serif"}} onKeyDown={e=>e.key==="Enter"&&search()}/>
            <button onClick={search} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"10px 24px",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>{loading?"...":"SEARCH"}</button>
          </div>
          {searched&&!orders.length&&<div style={{textAlign:"center",padding:"40px",color:"#8a7a5a",fontFamily:"'Cormorant Garamond',serif",fontSize:"18px"}}>No orders found for this number</div>}
          {orders.map(o=>(
            <div key={o.id} style={{border:"1px solid #d4a84322",marginBottom:"12px",padding:"16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}>
                <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:"700",color:"#1a1208"}}>{o.product_name}</div><div style={{fontSize:"11px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",marginTop:"3px"}}>#{String(o.id).slice(-6)} · {o.date}</div></div>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"16px",fontWeight:"700",color:"#1a1208"}}>{pkr(o.product_price)}</span>
              </div>
              {/* Progress */}
              <div style={{display:"flex",justifyContent:"space-between",position:"relative"}}>
                <div style={{position:"absolute",top:"10px",left:"10%",right:"10%",height:"2px",background:"#d4a84322"}}/>
                <div style={{position:"absolute",top:"10px",left:"10%",height:"2px",background:"#b8922a",width:`${(STEPS.indexOf(o.status)/4)*80}%`,transition:"width 0.8s ease"}}/>
                {STEPS.map((s,i)=>(
                  <div key={s} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",zIndex:1}}>
                    <div style={{width:"20px",height:"20px",borderRadius:"50%",background:i<=STEPS.indexOf(o.status)?"#b8922a":"#d4a84322",border:`2px solid ${i<=STEPS.indexOf(o.status)?"#b8922a":"#d4a84322"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",color:i<=STEPS.indexOf(o.status)?"#fff":"#aaa",fontWeight:"700"}}>{i<=STEPS.indexOf(o.status)?"✓":i+1}</div>
                    <div style={{fontSize:"8px",color:i<=STEPS.indexOf(o.status)?"#b8922a":"#aaa",letterSpacing:"0.5px",fontFamily:"'Jost',sans-serif",textAlign:"center"}}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ABOUT SECTION ─────────────────────────────────────────────
function About({settings}){
  return(
    <section id="about" style={{padding:"clamp(60px,10vw,120px) clamp(16px,5vw,80px)",background:"#fff",borderTop:"1px solid #d4a84322"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(32px,6vw,80px)",alignItems:"center"}} className="grid-1-mob">
        <div>
          <div className="reveal" style={{fontSize:"10px",color:"#b8922a",letterSpacing:"5px",marginBottom:"14px",fontFamily:"'Jost',sans-serif"}}>OUR STORY</div>
          <h2 className="reveal" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:"700",color:"#1a1208",lineHeight:1.2,marginBottom:"24px",animationDelay:"0.1s"}}>
            About <span style={{fontStyle:"italic",color:"#b8922a"}}>{BRAND}</span>
          </h2>
          <div style={{width:"40px",height:"2px",background:"#b8922a",marginBottom:"24px"}} className="reveal"/>
          <div className="reveal" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,1.8vw,19px)",color:"#8a7a5a",lineHeight:2,whiteSpace:"pre-line",animationDelay:"0.2s"}}>
            {settings?.aboutText||`Welcome to Jameel Fabrics Kunjah — your trusted destination for premium Pakistani clothing.\n\nLocated in the heart of Kunjah, we serve customers from across the region with pride and dedication.`}
          </div>
          <div className="reveal" style={{marginTop:"28px",display:"flex",gap:"16px",flexWrap:"wrap",animationDelay:"0.3s"}}>
            {[["📍",ADDRESS],["📞",PHONE]].map(([ic,t])=>(
              <div key={t} style={{display:"flex",gap:"8px",alignItems:"flex-start"}}>
                <span style={{fontSize:"16px"}}>{ic}</span>
                <span style={{fontFamily:"'Jost',sans-serif",fontSize:"13px",color:"#8a7a5a",lineHeight:1.6}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal-right" style={{position:"relative",height:"clamp(300px,50vw,500px)"}}>
          <TiltCard style={{position:"absolute",inset:0,background:"var(--cream2)",border:"1px solid var(--border)",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"16px"}}>
              <div style={{fontSize:"clamp(40px,6vw,72px)",animation:"float 4s ease-in-out infinite"}}>🧵</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:"700",color:"#1a1208",textAlign:"center"}}>Premium Quality<br/><span style={{fontStyle:"italic",color:"#b8922a",fontSize:"0.85em"}}>Since Always</span></div>
              <div style={{display:"flex",gap:"24px",marginTop:"8px"}}>
                {[["100%","Exclusive"],["✓","Trusted"],["⚡","Fast"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:"700",color:"#b8922a"}}>{v}</div>
                    <div style={{fontSize:"10px",color:"#8a7a5a",letterSpacing:"1px",fontFamily:"'Jost',sans-serif"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

// ── POLICIES ──────────────────────────────────────────────────
function Policies({settings}){
  const sections=(settings?.policiesText||"").split("\n\n").filter(Boolean);
  return(
    <section id="policies" style={{padding:"clamp(60px,8vw,100px) clamp(16px,5vw,80px)",background:"var(--cream)"}}>
      <div style={{maxWidth:"1000px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(32px,5vw,60px)"}}>
          <div className="reveal" style={{fontSize:"10px",color:"#b8922a",letterSpacing:"5px",marginBottom:"14px",fontFamily:"'Jost',sans-serif"}}>TRANSPARENCY</div>
          <h2 className="reveal" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:"700",color:"#1a1208",animationDelay:"0.1s"}}>Our Policies</h2>
          <div className="reveal" style={{width:"40px",height:"1px",background:"#b8922a",margin:"16px auto",animationDelay:"0.2s"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"clamp(12px,2vw,24px)"}}>
          {sections.map((s,i)=>{const[title,...rest]=s.split("\n");return(
            <TiltCard key={i} className="reveal" style={{background:"#fff",border:"1px solid #d4a84322",padding:"clamp(16px,2vw,24px)",animationDelay:`${i*0.1}s`}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:"700",color:"#b8922a",marginBottom:"10px",letterSpacing:"0.5px"}}>{title}</h3>
              <p style={{fontSize:"13px",color:"#8a7a5a",lineHeight:1.9,fontFamily:"'Jost',sans-serif"}}>{rest.join("\n")}</p>
            </TiltCard>
          );})}
        </div>
      </div>
    </section>
  );
}

// ── LOCATION ──────────────────────────────────────────────────
function Location(){
  return(
    <section id="location" style={{padding:"clamp(60px,8vw,100px) clamp(16px,5vw,80px)",background:"#fff",borderTop:"1px solid #d4a84322"}}>
      <div style={{maxWidth:"1000px",margin:"0 auto",textAlign:"center"}}>
        <div className="reveal" style={{fontSize:"10px",color:"#b8922a",letterSpacing:"5px",marginBottom:"14px",fontFamily:"'Jost',sans-serif"}}>FIND US</div>
        <h2 className="reveal" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,44px)",fontWeight:"700",color:"#1a1208",marginBottom:"8px",animationDelay:"0.1s"}}>Visit Our Store</h2>
        <div className="reveal" style={{width:"40px",height:"1px",background:"#b8922a",margin:"16px auto 40px",animationDelay:"0.2s"}}/>
        <div className="reveal" style={{border:"1px solid #d4a84322",overflow:"hidden",marginBottom:"28px",animationDelay:"0.3s"}}>
          <iframe title="Location" src={settings?.googleMapsUrl||"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.5!2d73.97!3d32.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f23!2sKunjah%2C+Gujrat&output=embed"} width="100%" height="260" style={{border:"none",display:"block",filter:"sepia(0.2) saturate(0.8)"}} loading="lazy"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"16px"}}>
          {[["📍","Address",ADDRESS],["📞","Phone",PHONE],["⏰","Hours","Mon–Sat: 10am–8pm"],["📱","WhatsApp",PHONE]].map(([ic,l,v])=>(
            <TiltCard key={l} className="reveal" style={{background:"var(--cream2)",border:"1px solid #d4a84322",padding:"20px",textAlign:"center"}}>
              <div style={{fontSize:"24px",marginBottom:"8px"}}>{ic}</div>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"6px",fontFamily:"'Jost',sans-serif"}}>{l}</div>
              <div style={{fontSize:"13px",color:"#4a3a18",fontFamily:"'Jost',sans-serif",lineHeight:1.6}}>{v}</div>
            </TiltCard>
          ))}
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:"24px",background:"none",border:"1px solid #1a1208",color:"#1a1208",padding:"12px 32px",fontSize:"10px",fontWeight:"700",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}} onMouseLeave={e=>{e.target.style.background="none";e.target.style.color="#1a1208";}}>
          OPEN IN MAPS
        </a>
      </div>
    </section>
  );
}

// ── VIDEO SECTION ─────────────────────────────────────────────
function VideoSection({settings}){
  if(!settings?.showUploadedVideo||!settings?.uploadedVideoUrl) return null;
  const lines=(settings.uploadedVideoCaption||"").split("\n").filter(Boolean);
  return(
    <section style={{padding:"clamp(60px,8vw,100px) clamp(16px,5vw,80px)",background:"#1a1208"}}>
      <div style={{maxWidth:"900px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(24px,4vw,48px)"}}>
          <div className="reveal" style={{fontSize:"10px",color:"#d4a843",letterSpacing:"5px",marginBottom:"14px",fontFamily:"'Jost',sans-serif"}}>FEATURED</div>
          {settings.uploadedVideoTitle&&<h2 className="reveal" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,42px)",fontWeight:"700",color:"#faf8f3",animationDelay:"0.1s"}}>{settings.uploadedVideoTitle}</h2>}
          <div className="reveal" style={{width:"40px",height:"1px",background:"#d4a843",margin:"16px auto 0",animationDelay:"0.2s"}}/>
        </div>
        <div className="reveal" style={{position:"relative",border:"1px solid #d4a84333",overflow:"hidden",boxShadow:"0 32px 100px rgba(0,0,0,0.5)",animationDelay:"0.3s"}}>
          <video src={settings.uploadedVideoUrl} controls controlsList="nodownload" style={{width:"100%",display:"block",maxHeight:"560px",objectFit:"cover"}}/>
          {/* Gold corners */}
          {["tl","tr","bl","br"].map(c=><div key={c} style={{position:"absolute",...(c[0]==="t"?{top:0}:{bottom:0}),...(c[1]==="l"?{left:0}:{right:0}),width:"28px",height:"28px",borderTop:c[0]==="t"?"2px solid #d4a843":undefined,borderBottom:c[0]==="b"?"2px solid #d4a843":undefined,borderLeft:c[1]==="l"?"2px solid #d4a843":undefined,borderRight:c[1]==="r"?"2px solid #d4a843":undefined}}/>)}
        </div>
        {lines.length>0&&(
          <div className="reveal" style={{marginTop:"24px",border:"1px solid #d4a84333",overflow:"hidden",animationDelay:"0.4s"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"rgba(212,168,67,0.1)"}}>
                <th style={{padding:"12px 20px",textAlign:"left",fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:"700",color:"#d4a843",letterSpacing:"1px",borderBottom:"1px solid #d4a84322"}}>About This Collection</th>
              </tr></thead>
              <tbody>{lines.map((l,i)=><tr key={i} style={{background:i%2===0?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.04)"}}><td style={{padding:"11px 20px",fontSize:"13px",color:"#d4a84399",lineHeight:1.8,fontFamily:"'Jost',sans-serif",borderBottom:"1px solid #d4a84311"}}>{l}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer({settings,setShowTrack}){
  return(
    <footer style={{background:"#1a1208",padding:"clamp(48px,6vw,80px) clamp(16px,5vw,80px) 24px",borderTop:"2px solid #d4a84322"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"clamp(24px,4vw,48px)",marginBottom:"clamp(32px,5vw,60px)"}} className="footer-grid">
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:"900",color:"#d4a843",letterSpacing:"3px",marginBottom:"6px"}}>{BRAND}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12px",letterSpacing:"4px",color:"#d4a84388",marginBottom:"16px",fontStyle:"italic"}}>{SUB}</div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"15px",color:"#d4a84366",lineHeight:1.8,fontStyle:"italic",marginBottom:"20px"}}>{TAGLINE}</p>
            <div style={{display:"flex",gap:"10px"}}>
              {settings?.tiktokUrl&&<a href={settings.tiktokUrl} target="_blank" rel="noreferrer" style={{width:"36px",height:"36px",border:"1px solid #d4a84333",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#d4a84388"}} onMouseEnter={e=>{e.currentTarget.style.border="1px solid #d4a843";e.currentTarget.style.color="#d4a843";}} onMouseLeave={e=>{e.currentTarget.style.border="1px solid #d4a84333";e.currentTarget.style.color="#d4a84388";}}>{ICONS.tiktok}</a>}
              {settings?.instagramUrl&&<a href={settings.instagramUrl} target="_blank" rel="noreferrer" style={{width:"36px",height:"36px",border:"1px solid #d4a84333",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#d4a84388"}} onMouseEnter={e=>{e.currentTarget.style.border="1px solid #d4a843";e.currentTarget.style.color="#d4a843";}} onMouseLeave={e=>{e.currentTarget.style.border="1px solid #d4a84333";e.currentTarget.style.color="#d4a84388";}}>{ICONS.instagram}</a>}
              <a href={`https://wa.me/${settings?.whatsapp||WA}`} target="_blank" rel="noreferrer" style={{width:"36px",height:"36px",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>{ICONS.wa}</a>
            </div>
          </div>
          <div>
            <div style={{fontSize:"10px",color:"#d4a843",letterSpacing:"3px",marginBottom:"16px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Quick Links</div>
            {[["Home","#"],["Collection","#collection"],["About Us","#about"],["Policies","#policies"],["Visit Store","#location"]].map(([l,h])=><a key={l} href={h} style={{display:"block",fontSize:"13px",color:"#d4a84366",padding:"5px 0",fontFamily:"'Jost',sans-serif",transition:"color 0.2s",letterSpacing:"0.5px"}} onMouseEnter={e=>e.target.style.color="#d4a843"} onMouseLeave={e=>e.target.style.color="#d4a84366"}>{l}</a>)}
            <button onClick={()=>setShowTrack(true)} style={{display:"block",background:"none",border:"none",color:"#d4a84366",padding:"5px 0",fontFamily:"'Jost',sans-serif",fontSize:"13px",cursor:"pointer",letterSpacing:"0.5px",textAlign:"left",transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color="#d4a843"} onMouseLeave={e=>e.target.style.color="#d4a84366"}>Track Order</button>
          </div>
          <div>
            <div style={{fontSize:"10px",color:"#d4a843",letterSpacing:"3px",marginBottom:"16px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Contact</div>
            <div style={{fontSize:"13px",color:"#d4a84366",lineHeight:2.2,fontFamily:"'Jost',sans-serif"}}>
              <div>📍 {ADDRESS}</div>
              <div>📞 {PHONE}</div>
              {settings?.tiktok&&<div>🎵 TikTok: {settings.tiktok}</div>}
              {settings?.instagram&&<div>📸 Instagram: {settings.instagram}</div>}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid #d4a84311",paddingTop:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <p style={{fontSize:"11px",color:"#d4a84333",fontFamily:"'Jost',sans-serif"}}>© 2026 {BRAND} {SUB}. All Rights Reserved.</p>
          <p style={{fontSize:"11px",color:"#d4a84322",fontFamily:"'Jost',sans-serif"}}>Premium Pakistani Fabrics</p>
        </div>
      </div>
    </footer>
  );
}

// ── WHATSAPP FLOAT ────────────────────────────────────────────
function WAFloat({settings}){
  const [show,setShow]=useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),3000);},[]);
  return(
    <a href={`https://wa.me/${settings?.whatsapp||WA}?text=${encodeURIComponent("Assalam! I'd like to enquire about your collection.")}`} target="_blank" rel="noreferrer" style={{position:"fixed",bottom:"24px",right:"24px",width:"54px",height:"54px",background:"#25D366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(37,211,102,0.4)",zIndex:800,opacity:show?1:0,transform:show?"scale(1)":"scale(0)",transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",animation:show?"pulse3d 3s ease 4s infinite":"none",color:"#fff"}}>
      {ICONS.wa}
    </a>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────
function AdminPanel({products,setProducts,reviews,settings,setSettings,onClose}){
  const [tab,setTab]=useState("pending");
  const [editProd,setEditProd]=useState(null);
  const [uploading,setUploading]=useState(false);
  const [sEdit,setSEdit]=useState({...settings});
  const [pwForm,setPwForm]=useState({old:"",nw:"",cf:""});
  const [alerts,setAlerts]=useState([]);
  const [allProds,setAllProds]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    if(!supabase){setLoading(false);return;}
    supabase.from("website_alerts").select("*").order("created_at",{ascending:false}).then(({data})=>setAlerts(data||[]));
    supabase.from("products").select("*").order("created_at",{ascending:false}).then(({data})=>{
      if(data?.length)setAllProds(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,available_sizes:tryParse(r.available_sizes,[])})));
      setLoading(false);
    });
    const ch=supabase.channel("ap-sync")
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"website_alerts"},({new:n})=>setAlerts(a=>[n,...a]))
      .on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{supabase.from("products").select("*").order("created_at",{ascending:false}).then(({data})=>{if(data?.length)setAllProds(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,available_sizes:tryParse(r.available_sizes,[])})));});})
      .subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);

  const unread=alerts.filter(a=>!a.is_read);
  const pending=allProds.filter(p=>!p.website_status||p.website_status==="pending");
  const listed=allProds.filter(p=>p.website_status==="listed");
  const STATUS_C={pending:"#b8922a",listed:"#22c55e",sold_out:"#dc2626",hidden:"#6b7280",waiting_stock:"#f59e0b"};
  const STATUS_L={pending:"⏳ Pending",listed:"✅ Listed",sold_out:"❌ Sold Out",hidden:"🙈 Hidden",waiting_stock:"⏳ Waiting"};

  const updateStatus=async(id,status)=>{setAllProds(p=>p.map(x=>x.id===id?{...x,website_status:status}:x));setProducts(p=>p.map(x=>x.id===id?{...x,website_status:status}:x));if(supabase)await supabase.from("products").update({website_status:status}).eq("id",id);};
  const markRead=async(id,action)=>{setAlerts(a=>a.map(x=>x.id===id?{...x,is_read:true,action_taken:action}:x));if(supabase)await supabase.from("website_alerts").update({is_read:true,action_taken:action}).eq("id",id);};
  const handleAlert=async(al,action)=>{if(action==="sold_out")await updateStatus(al.product_id,"sold_out");if(action==="remove")await updateStatus(al.product_id,"hidden");if(action==="waiting")await updateStatus(al.product_id,"waiting_stock");await markRead(al.id,action);};
  const uploadImg=async(file,field)=>{if(!supabase||!file||!editProd)return;setUploading(true);const ext=file.name.split(".").pop();const path=`${editProd.id}/${field}-${Date.now()}.${ext}`;const{error}=await supabase.storage.from("product-images").upload(path,file,{upsert:true});if(!error){const{data:u}=supabase.storage.from("product-images").getPublicUrl(path);setEditProd(p=>({...p,[field]:u.publicUrl}));}setUploading(false);};
  const saveProd=async()=>{if(!editProd)return;setAllProds(p=>p.map(x=>x.id===editProd.id?editProd:x));setProducts(p=>p.map(x=>x.id===editProd.id?{...x,...editProd}:x));if(supabase)await supabase.from("products").upsert({id:editProd.id,name:editProd.name,brand:editProd.brand,color:editProd.color,fabric:editProd.fabric,category:editProd.category,rack:editProd.rack,stock:editProd.stock,sale_price:editProd.salePrice,cost_price:editProd.costPrice,offer_price:editProd.offerPrice,qty_type:editProd.qtyType,barcode:editProd.barcode,description:editProd.website_description,fabric_type:editProd.fabric_type,washing_instructions:editProd.washing_instructions,size_guide:editProd.size_guide,is_new_arrival:editProd.is_new_arrival,is_active:editProd.is_active,website_status:editProd.website_status||"pending",website_title:editProd.website_title,website_description:editProd.website_description,website_category:editProd.website_category,size_type:editProd.size_type,available_sizes:JSON.stringify(editProd.available_sizes||[]),photo_url:editProd.photo_url,photo_url2:editProd.photo_url2,photo_url3:editProd.photo_url3,photo_url4:editProd.photo_url4,photo_url5:editProd.photo_url5});setEditProd(null);alert("✅ Saved!");};
  const saveSettings=()=>{setSettings(sEdit);LS.set("shopSettings",sEdit);alert("✅ Saved!");};
  const changePw=()=>{const sv=LS.get("adminPass",ADMIN_PASS_DEFAULT);if(pwForm.old!==sv)return alert("Wrong current password!");if(!pwForm.nw||pwForm.nw.length<6)return alert("Min 6 chars!");if(pwForm.nw!==pwForm.cf)return alert("Passwords don't match!");LS.set("adminPass",pwForm.nw);setPwForm({old:"",nw:"",cf:""});alert("✅ Password changed!");};

  // ── BACKUP / RESTORE ──
  const doBackup=()=>{
    const data={v:2,ts:new Date().toISOString(),settings:sEdit,adminPass:LS.get("adminPass",ADMIN_PASS_DEFAULT)};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);
    a.download="jameel-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();
    alert("✅ Backup downloaded!");
  };
  const doRestore=(file)=>{
    if(!file)return;const reader=new FileReader();
    reader.onload=(e)=>{
      try{
        const d=JSON.parse(e.target.result);
        if(!d.v)throw new Error("Invalid");
        if(d.settings){setSettings(d.settings);setSEdit(d.settings);LS.set("shopSettings",d.settings);}
        if(d.adminPass)LS.set("adminPass",d.adminPass);
        alert("✅ Restored! Refresh the page.");
      }catch{alert("❌ Invalid backup file!");}
    };reader.readAsText(file);
  };

  const TABS=[{k:"pending",l:`Pending (${pending.length})`},{k:"alerts",l:`Alerts`,badge:unread.length},{k:"listed",l:`Listed (${listed.length})`},{k:"all",l:"All"},{k:"content",l:"Content"},{k:"settings",l:"Settings"},{k:"coupons",l:"Coupons"},{k:"orders",l:"Orders"},{k:"reviews",l:"Reviews"},{k:"backup",l:"💾 Backup"}];
  const WCATS=["Men's Unstitched","Women Unstitched","Women Stitched","Kids","Other"];

  const inp=(label,field,type="text",isS=false)=>{const obj=isS?sEdit:editProd;const setter=isS?v=>setSEdit(s=>({...s,[field]:v})):v=>setEditProd(p=>({...p,[field]:v}));return(
    <div key={field} style={{marginBottom:"12px"}}>
      <label style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",display:"block",marginBottom:"5px",textTransform:"uppercase",fontFamily:"'Jost',sans-serif"}}>{label}</label>
      {type==="textarea"?<textarea value={obj?.[field]||""} onChange={e=>setter(e.target.value)} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",resize:"vertical",height:"80px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>:<input type={type} value={obj?.[field]||""} onChange={e=>setter(type==="number"?+e.target.value:e.target.value)} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>}
    </div>
  );};

  const PCard=({p})=>(
    <div style={{background:"#fff",border:`1px solid ${STATUS_C[p.website_status||"pending"]}33`,overflow:"hidden"}}>
      {p.photo_url&&<img src={p.photo_url} alt={p.name} style={{width:"100%",height:"110px",objectFit:"cover"}}/>}
      {!p.photo_url&&<div style={{height:"50px",background:"var(--cream2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#d4a84366",fontSize:"24px"}}>📦</div>}
      <div style={{padding:"12px"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"13px",color:"#1a1208",marginBottom:"3px"}}>{p.name}</div>
        <div style={{fontSize:"10px",color:"#8a7a5a",marginBottom:"6px",fontFamily:"'Jost',sans-serif"}}>{p.category} · {p.color}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:"700",fontSize:"15px",color:"#1a1208"}}>{pkr(p.salePrice)}</span>
          <span style={{fontSize:"9px",padding:"2px 8px",background:STATUS_C[p.website_status||"pending"]+"22",color:STATUS_C[p.website_status||"pending"],fontWeight:"700",fontFamily:"'Jost',sans-serif"}}>{STATUS_L[p.website_status||"pending"]}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px"}}>
          <button onClick={()=>setEditProd({...p})} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"6px",fontSize:"9px",fontWeight:"700",letterSpacing:"1px",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>✏️ EDIT</button>
          {p.website_status!=="listed"&&<button onClick={()=>updateStatus(p.id,"listed")} style={{background:"#22c55e22",color:"#22c55e",border:"1px solid #22c55e44",padding:"6px",fontSize:"9px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>✅ LIST</button>}
          {p.website_status==="listed"&&<button onClick={()=>updateStatus(p.id,"hidden")} style={{background:"#6b728022",color:"#6b7280",border:"1px solid #6b728044",padding:"6px",fontSize:"9px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>🙈 HIDE</button>}
          {p.website_status!=="sold_out"&&<button onClick={()=>updateStatus(p.id,"sold_out")} style={{background:"#dc262622",color:"#dc2626",border:"1px solid #dc262644",padding:"6px",fontSize:"9px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>❌ SOLD</button>}
          <button onClick={()=>updateStatus(p.id,"hidden")} style={{background:"var(--cream2)",color:"#8a7a5a",border:"1px solid #d4a84322",padding:"6px",fontSize:"9px",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>🗑️ REMOVE</button>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{position:"fixed",inset:0,zIndex:5000,background:"var(--cream)",display:"flex",flexDirection:"column",fontFamily:"'Jost',sans-serif"}}>
      <style>{G}</style>
      <div style={{background:"#1a1208",padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0,gap:"8px",flexWrap:"wrap"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",fontWeight:"700",color:"#d4a843"}}>⚙️ Admin — {BRAND}{unread.length>0&&<span style={{marginLeft:"8px",background:"#dc2626",color:"#fff",borderRadius:"50%",padding:"2px 7px",fontSize:"11px",fontFamily:"'Jost',sans-serif"}}>{unread.length}</span>}</div>
        <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
          {TABS.map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{background:tab===t.k?"#d4a843":"transparent",color:tab===t.k?"#1a1208":"#d4a84388",border:`1px solid ${t.badge>0?"#dc2626":"#d4a84333"}`,borderRadius:"0",padding:"5px 10px",cursor:"pointer",fontWeight:"600",fontSize:"9px",letterSpacing:"1px",textTransform:"uppercase",position:"relative",transition:"all 0.2s"}}>
            {t.l}{t.badge>0&&<span style={{position:"absolute",top:"-4px",right:"-4px",background:"#dc2626",color:"#fff",borderRadius:"50%",width:"14px",height:"14px",fontSize:"8px",display:"flex",alignItems:"center",justifyContent:"center"}}>{t.badge}</span>}
          </button>)}
          <button onClick={onClose} style={{background:"#dc2626",color:"#fff",border:"none",padding:"5px 12px",cursor:"pointer",fontWeight:"700",fontSize:"9px",letterSpacing:"1px"}}>✕ CLOSE</button>
          <button onClick={()=>window.open(window.location.href,"_blank")} style={{background:"#d4a843",color:"#1a1208",border:"none",padding:"5px 12px",cursor:"pointer",fontWeight:"700",fontSize:"9px",letterSpacing:"1px",marginLeft:"4px"}}>👁 PREVIEW</button>
        </div>
      </div>

      <div style={{flex:1,overflow:"auto",padding:"20px"}}>
        {/* Pending */}
        {tab==="pending"&&<div>
          <div style={{marginBottom:"16px"}}><div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"4px"}}>⏳ Pending ({pending.length})</div><div style={{fontSize:"12px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif"}}>ERP se aaye products — decide karo website pe list karni hai ya nahi</div></div>
          {loading&&<div style={{textAlign:"center",padding:"40px",color:"#8a7a5a",fontFamily:"'Cormorant Garamond',serif",fontSize:"18px"}}>Loading...</div>}
          {!loading&&!pending.length&&<div style={{textAlign:"center",padding:"60px",color:"#8a7a5a"}}><div style={{fontSize:"36px",marginBottom:"12px"}}>✅</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:"#1a1208"}}>No pending products</div></div>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"12px"}}>{pending.map(p=><PCard key={p.id} p={p}/>)}</div>
        </div>}

        {/* Alerts */}
        {tab==="alerts"&&<div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>🔔 Alerts ({alerts.length})</div>
          {!alerts.length&&<div style={{textAlign:"center",padding:"60px",color:"#8a7a5a"}}><div style={{fontSize:"36px",marginBottom:"12px"}}>🔕</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:"#1a1208"}}>No alerts yet</div></div>}
          <div style={{display:"grid",gap:"10px"}}>{alerts.map(a=>(
            <div key={a.id} style={{background:"#fff",border:`1px solid ${a.type==="sold_out"?"#dc262633":a.type==="low_stock"?"#f59e0b33":"#d4a84333"}`,padding:"16px",opacity:a.is_read?0.6:1}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
                <div><div style={{fontWeight:"700",fontSize:"13px",color:"#1a1208",fontFamily:"'Playfair Display',serif"}}>{a.product_name}</div><div style={{fontSize:"12px",color:"#8a7a5a",marginTop:"3px",fontFamily:"'Jost',sans-serif"}}>{a.message}</div><div style={{fontSize:"10px",color:"#aaa",marginTop:"3px",fontFamily:"'Jost',sans-serif"}}>{new Date(a.created_at).toLocaleString()}</div></div>
                {a.is_read&&<span style={{fontSize:"10px",color:"#22c55e",fontWeight:"700",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>DONE ✓</span>}
              </div>
              {!a.is_read&&<div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                <button onClick={()=>handleAlert(a,"sold_out")} style={{background:"#dc262622",color:"#dc2626",border:"1px solid #dc262644",padding:"6px 14px",fontSize:"10px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>❌ SOLD OUT</button>
                <button onClick={()=>handleAlert(a,"remove")} style={{background:"#6b728022",color:"#6b7280",border:"1px solid #6b728044",padding:"6px 14px",fontSize:"10px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>🗑️ REMOVE</button>
                <button onClick={()=>handleAlert(a,"waiting")} style={{background:"#f59e0b22",color:"#f59e0b",border:"1px solid #f59e0b44",padding:"6px 14px",fontSize:"10px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>⏳ COMING</button>
                <button onClick={()=>markRead(a.id,"ignored")} style={{background:"none",color:"#aaa",border:"1px solid #eee",padding:"6px 14px",fontSize:"10px",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>IGNORE</button>
              </div>}
            </div>
          ))}</div>
        </div>}

        {/* Listed */}
        {tab==="listed"&&<div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>✅ Listed ({listed.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"12px"}}>{listed.map(p=><PCard key={p.id} p={p}/>)}{!listed.length&&<div style={{color:"#8a7a5a",textAlign:"center",padding:"40px",gridColumn:"1/-1",fontFamily:"'Cormorant Garamond',serif",fontSize:"18px"}}>No listed products</div>}</div>
        </div>}

        {/* All */}
        {tab==="all"&&!editProd&&<div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>📦 All ({allProds.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"12px"}}>{allProds.map(p=><PCard key={p.id} p={p}/>)}{!allProds.length&&<div style={{color:"#8a7a5a",textAlign:"center",padding:"40px",gridColumn:"1/-1",fontFamily:"'Cormorant Garamond',serif",fontSize:"18px"}}>ERP se products add karo</div>}</div>
        </div>}

        {/* Edit Product */}
        {(tab==="all"||tab==="pending"||tab==="listed")&&editProd&&(
          <div style={{maxWidth:"750px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"16px"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#b8922a"}}>✏️ Edit: {editProd.name}</div>
              <button onClick={()=>setEditProd(null)} style={{background:"none",border:"1px solid #d4a84344",padding:"6px 14px",color:"#8a7a5a",cursor:"pointer",fontSize:"11px",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>← BACK</button>
            </div>
            <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"24px"}}>
              {/* Status */}
              <div style={{marginBottom:"16px"}}>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"8px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Website Status</div>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  {Object.entries(STATUS_L).map(([k,l])=><button key={k} onClick={()=>setEditProd(p=>({...p,website_status:k}))} style={{background:editProd.website_status===k?STATUS_C[k]+"22":"transparent",color:editProd.website_status===k?STATUS_C[k]:"#8a7a5a",border:`1px solid ${editProd.website_status===k?STATUS_C[k]:"#d4a84333"}`,padding:"5px 12px",fontSize:"10px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"0.5px",transition:"all 0.2s"}}>{l}</button>)}
                </div>
              </div>
              {/* Category */}
              <div style={{marginBottom:"14px"}}>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"5px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Website Category</div>
                <select value={editProd.website_category||""} onChange={e=>setEditProd(p=>({...p,website_category:e.target.value}))} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}>
                  <option value="">Same as ERP ({editProd.category})</option>
                  {WCATS.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* Size info */}
              <div style={{marginBottom:"14px",background:"var(--cream2)",padding:"10px 12px",border:"1px solid #d4a84322"}}>
                <div style={{fontSize:"9px",color:"#b8922a",marginBottom:"3px",letterSpacing:"1px",fontFamily:"'Jost',sans-serif"}}>SIZE TYPE (FROM ERP)</div>
                <div style={{fontSize:"13px",color:"#1a1208",fontFamily:"'Jost',sans-serif",fontWeight:"600"}}>{editProd.size_type==="stitched"?`Stitched — ${(editProd.available_sizes||[]).join(", ")||"Not set"}`:editProd.size_type==="gaz"?"Gaz":editProd.size_type==="free"?"Free Size":"Meter"}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
                {inp("Website Title","website_title")}
                {inp("Brand","brand")}
                {inp("Color","color")}
                {inp("Fabric Type","fabric_type")}
                {inp("Sale Price","salePrice","number")}
                {inp("Offer Price","offerPrice","number")}
                {inp("Washing Instructions","washing_instructions")}
                {inp("Size Guide","size_guide")}
              </div>
              <div>{inp("Website Description (English)","website_description","textarea")}</div>
              <div style={{display:"flex",gap:"16px",margin:"10px 0",flexWrap:"wrap"}}>
                {[["New Arrival","is_new_arrival"],["Active","is_active"]].map(([l,k])=>(
                  <label key={k} style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:"#1a1208",fontFamily:"'Jost',sans-serif"}}>
                    <input type="checkbox" checked={!!editProd[k]} onChange={e=>setEditProd(p=>({...p,[k]:e.target.checked}))} style={{accentColor:"#b8922a",width:"14px",height:"14px"}}/>{l}
                  </label>
                ))}
              </div>
              {/* Images */}
              <div style={{marginTop:"12px"}}>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"10px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Product Images (up to 5)</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"8px"}}>
                  {["photo_url","photo_url2","photo_url3","photo_url4","photo_url5"].map((f,i)=>(
                    <div key={f}>
                      <div style={{fontSize:"9px",color:"#aaa",marginBottom:"4px",fontFamily:"'Jost',sans-serif"}}>Photo {i+1}</div>
                      {editProd[f]&&<img src={editProd[f]} alt="" style={{width:"100%",height:"70px",objectFit:"cover",marginBottom:"4px",border:"1px solid #d4a84322"}}/>}
                      <input type="file" accept="image/*" onChange={e=>e.target.files[0]&&uploadImg(e.target.files[0],f)} style={{width:"100%",fontSize:"8px",color:"#aaa",marginBottom:"3px"}}/>
                      <input value={editProd[f]||""} onChange={e=>setEditProd(p=>({...p,[f]:e.target.value}))} placeholder="Or URL" style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84322",padding:"3px 0",color:"#1a1208",fontSize:"9px",outline:"none"}}/>
                    </div>
                  ))}
                </div>
                {uploading&&<div style={{color:"#b8922a",fontSize:"11px",marginTop:"6px",fontFamily:"'Jost',sans-serif"}}>⏳ Uploading...</div>}
              </div>
              <div style={{display:"flex",gap:"10px",marginTop:"20px"}}>
                <button onClick={saveProd} style={{flex:1,background:"#1a1208",color:"#d4a843",border:"none",padding:"13px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>SAVE & UPDATE</button>
                <button onClick={()=>setEditProd(null)} style={{background:"none",border:"1px solid #d4a84344",padding:"13px 20px",color:"#8a7a5a",cursor:"pointer",fontFamily:"'Jost',sans-serif",fontSize:"10px"}}>CANCEL</button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {tab==="content"&&<div style={{maxWidth:"680px"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>✍️ Content</div>
          <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"24px"}}>
            <div style={{background:"#fff0f0",border:"1px solid #dc262622",padding:"12px",marginBottom:"14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                <div style={{fontSize:"11px",fontWeight:"700",color:"#dc2626",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>🔥 DISCOUNT BANNER</div>
                <label style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"11px",color:"#1a1208",fontFamily:"'Jost',sans-serif"}}>
                  <input type="checkbox" checked={!!sEdit.discountBannerActive} onChange={e=>setSEdit(s=>({...s,discountBannerActive:e.target.checked}))} style={{accentColor:"#dc2626"}}/>Show
                </label>
              </div>
              <input value={sEdit.discountBanner||""} onChange={e=>setSEdit(s=>({...s,discountBanner:e.target.value}))} placeholder="EID SALE — 20% OFF!" style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #dc262633",padding:"6px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
            </div>
            <div style={{marginBottom:"14px"}}>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"6px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Hero Rotating Texts (one per line)</div>
              <textarea value={(sEdit.heroTexts||[]).join("\n")} onChange={e=>setSEdit(s=>({...s,heroTexts:e.target.value.split("\n").filter(Boolean)}))} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",resize:"vertical",height:"90px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
            </div>
            {inp("Hero Subtitle","heroSubtitle",undefined,true)}
            {inp("About Us Text","aboutText","textarea",true)}
            {inp("Policies Text","policiesText","textarea",true)}
            <div style={{marginBottom:"14px"}}>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"6px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Announcement Bar (one per line)</div>
              <textarea value={sEdit.announcements?.join("\n")||""} onChange={e=>setSEdit(s=>({...s,announcements:e.target.value.split("\n").filter(Boolean)}))} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",resize:"vertical",height:"70px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
            </div>
            <label style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:"#1a1208",fontFamily:"'Jost',sans-serif",marginBottom:"8px"}}>
              <input type="checkbox" checked={!!sEdit.showUploadedVideo} onChange={e=>setSEdit(s=>({...s,showUploadedVideo:e.target.checked}))} style={{accentColor:"#b8922a"}}/>Show Video Section
            </label>
            {sEdit.showUploadedVideo&&<>
              <div style={{marginBottom:"8px"}}>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"1px",marginBottom:"5px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Video Upload (Max 30MB)</div>
                <input type="file" accept="video/*" onChange={async e=>{const f=e.target.files[0];if(!f)return;if(f.size>30*1024*1024){alert("Max 30MB!");return;}if(!supabase)return;alert("⏳ Uploading...");const ext=f.name.split(".").pop();const path=`videos/v-${Date.now()}.${ext}`;const{error}=await supabase.storage.from("product-images").upload(path,f,{upsert:true,contentType:f.type});if(error){alert("❌ "+error.message);return;}const{data:u}=supabase.storage.from("product-images").getPublicUrl(path);setSEdit(s=>({...s,uploadedVideoUrl:u.publicUrl}));alert("✅ Uploaded!");}} style={{fontSize:"11px",color:"#8a7a5a",marginBottom:"6px",display:"block"}}/>
                <input value={sEdit.uploadedVideoUrl||""} onChange={e=>setSEdit(s=>({...s,uploadedVideoUrl:e.target.value}))} placeholder="Or paste video URL" style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
                {sEdit.uploadedVideoUrl&&<video src={sEdit.uploadedVideoUrl} controls style={{width:"100%",maxHeight:"140px",marginTop:"8px"}}/>}
              </div>
              {inp("Video Title","uploadedVideoTitle",undefined,true)}
              {inp("Video Caption (one line per row in table)","uploadedVideoCaption","textarea",true)}
            </>}

            {/* Google Maps */}
            <div style={{marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #d4a84322"}}>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"6px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Google Maps Embed URL</div>
              <div style={{fontSize:"10px",color:"#8a7a5a",marginBottom:"8px",fontFamily:"'Jost',sans-serif",lineHeight:1.6}}>
                Google Maps kholo → apni shop search karo → Share → Embed a map → HTML copy karo → sirf src="..." ke andar wala URL yahan paste karo
              </div>
              <input value={sEdit.googleMapsUrl||""} onChange={e=>setSEdit(s=>({...s,googleMapsUrl:e.target.value}))} placeholder="https://www.google.com/maps/embed?pb=..." style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"12px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
              {sEdit.googleMapsUrl&&<div style={{marginTop:"8px",border:"1px solid #d4a84322",overflow:"hidden"}}>
                <iframe src={sEdit.googleMapsUrl} width="100%" height="160" style={{border:"none",display:"block",filter:"sepia(0.2)"}} title="preview"/>
              </div>}
            </div>

            <button onClick={saveSettings} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"13px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",marginTop:"16px",width:"100%",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>SAVE CONTENT</button>
          </div>

          {/* 3D Animation Settings */}
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"15px",color:"#1a1208",margin:"20px 0 12px"}}>3D Intro Animation Settings</div>
          <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"24px"}}>
            <div style={{fontSize:"10px",color:"#8a7a5a",marginBottom:"14px",fontFamily:"'Jost',sans-serif",lineHeight:1.7,background:"var(--cream2)",padding:"10px 12px",border:"1px solid #d4a84322"}}>
              Yeh settings 3D showroom intro pe apply hongi. Save karne ke baad page refresh karo — naya intro dikhega.
            </div>
            {[
              ["Intro Line 1 (small top text)","intro_line1"],
              ["Brand Name Line 1","intro_brand1"],
              ["Brand Name Line 2","intro_brand2"],
              ["Sub Location Text","intro_sub"],
              ["Tagline","intro_tagline"],
              ["Enter Button Text","intro_enter_btn"],
            ].map(([l,k])=>(
              <div key={k} style={{marginBottom:"12px"}}>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"4px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>{l}</div>
                <input value={sEdit[k]||""} onChange={e=>setSEdit(s=>({...s,[k]:e.target.value}))} placeholder={`Default: ${k==="intro_brand1"?"JAMEEL":k==="intro_brand2"?"FABRICS":k==="intro_sub"?"KUNJAH":k==="intro_tagline"?TAGLINE:k==="intro_enter_btn"?"Enter the Store":"✦ EST. KUNJAH, DISTT GUJRAT ✦"}`} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              <div>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"4px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Intro Duration (sec)</div>
                <input type="number" min="3" max="10" value={sEdit.intro_duration||5} onChange={e=>setSEdit(s=>({...s,intro_duration:+e.target.value}))} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
              </div>
              <div>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"4px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Skip Button</div>
                <label style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:"#1a1208",fontFamily:"'Jost',sans-serif",marginTop:"8px"}}>
                  <input type="checkbox" checked={sEdit.intro_skip!==false} onChange={e=>setSEdit(s=>({...s,intro_skip:e.target.checked}))} style={{accentColor:"#b8922a"}}/>Show Skip button
                </label>
              </div>
            </div>
            <button onClick={saveSettings} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"13px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",marginTop:"14px",width:"100%"}}>SAVE 3D SETTINGS</button>
          </div>
        </div>}

        {/* Settings */}
        {tab==="settings"&&<div style={{maxWidth:"580px"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>⚙️ Settings</div>
          <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"24px",marginBottom:"16px"}}>
            <div style={{marginBottom:"16px"}}>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"8px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Brand Logo</div>
              {/* Logo preview */}
              <div style={{background:"var(--cream2)",border:"1px solid #d4a84322",padding:"16px",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80px"}}>
                {sEdit.logoUrl
                  ?<img src={sEdit.logoUrl} alt="logo" style={{maxHeight:"60px",maxWidth:"200px",objectFit:"contain"}}/>
                  :<div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",fontWeight:"700",color:"#1a1208",letterSpacing:"2px"}}>{BRAND}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",color:"#b8922a",letterSpacing:"4px"}}>{SUB}</div>
                    <div style={{fontSize:"9px",color:"#aaa",marginTop:"4px",fontFamily:"'Jost',sans-serif"}}>No logo — text showing</div>
                  </div>
                }
              </div>
              <div style={{display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center",marginBottom:"6px"}}>
                <label style={{background:"#1a1208",color:"#d4a843",padding:"8px 14px",fontSize:"9px",fontWeight:"700",letterSpacing:"1px",cursor:"pointer",fontFamily:"'Jost',sans-serif",flexShrink:0}}>
                  UPLOAD LOGO
                  <input type="file" accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/webp" style={{display:"none"}} onChange={async e=>{
                    const f=e.target.files[0];if(!f)return;
                    if(!supabase){alert("Supabase not connected!");return;}
                    const ext=f.name.split(".").pop();
                    const path=`logo/brand-logo-${Date.now()}.${ext}`;
                    const{error}=await supabase.storage.from("product-images").upload(path,f,{upsert:true,contentType:f.type});
                    if(error){alert("Upload failed: "+error.message);return;}
                    const{data:u}=supabase.storage.from("product-images").getPublicUrl(path);
                    setSEdit(s=>({...s,logoUrl:u.publicUrl}));
                    alert("✅ Logo uploaded!");
                  }}/>
                </label>
                {sEdit.logoUrl&&<button onClick={()=>setSEdit(s=>({...s,logoUrl:""}))} style={{background:"none",border:"1px solid #dc262644",color:"#dc2626",padding:"8px 12px",fontSize:"9px",fontWeight:"700",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>REMOVE</button>}
              </div>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"1px",marginBottom:"5px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Or paste image URL</div>
              <input value={sEdit.logoUrl||""} onChange={e=>setSEdit(s=>({...s,logoUrl:e.target.value}))} placeholder="https://..." style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
              <div style={{fontSize:"10px",color:"#8a7a5a",marginTop:"6px",fontFamily:"'Jost',sans-serif"}}>Recommended: PNG with transparent background, min 200x80px</div>
            </div>
            {inp("WhatsApp Number","whatsapp",undefined,true)}
            {inp("TikTok ID","tiktok",undefined,true)}
            {inp("Instagram ID","instagram",undefined,true)}
            {inp("TikTok URL","tiktokUrl",undefined,true)}
            {inp("Instagram URL","instagramUrl",undefined,true)}
            {inp("Footer Text (optional)","footerText",undefined,true)}

            {/* Category Icons Editor */}
            <div style={{marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #d4a84322"}}>
              <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"10px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Category Bar Icons</div>
              {CATS.map(cat=>(
                <div key={cat} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px",padding:"8px",background:"var(--cream2)",border:"1px solid #d4a84322"}}>
                  <span style={{fontSize:"11px",color:"#1a1208",fontFamily:"'Jost',sans-serif",flex:1,fontWeight:"600"}}>{cat}</span>
                  <div style={{color:"#b8922a"}}>{ICONS[(sEdit.catIcons||{})[cat]||DEFAULT_CAT_ICONS[cat]]||ICONS.catAll}</div>
                  <select value={(sEdit.catIcons||{})[cat]||DEFAULT_CAT_ICONS[cat]} onChange={e=>setSEdit(s=>({...s,catIcons:{...(s.catIcons||{}), [cat]:e.target.value}}))} style={{background:"transparent",border:"1px solid #d4a84344",padding:"4px 8px",color:"#1a1208",fontSize:"11px",outline:"none",fontFamily:"'Jost',sans-serif"}}>
                    {ICON_OPTIONS.map(opt=><option key={opt.key} value={opt.key}>{opt.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button onClick={saveSettings} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"13px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",marginTop:"8px",width:"100%"}}>SAVE SETTINGS</button>
          </div>
          {/* Password */}
          <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"24px"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"15px",color:"#1a1208",marginBottom:"16px"}}>🔑 Change Password</div>
            {[["Current Password","old","password"],["New Password","nw","password"],["Confirm","cf","password"]].map(([l,k,t])=>(
              <div key={k} style={{marginBottom:"12px"}}>
                <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",marginBottom:"5px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>{l}</div>
                <input type={t} value={pwForm[k]} onChange={e=>setPwForm(p=>({...p,[k]:e.target.value}))} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"7px 0",color:"#1a1208",fontSize:"13px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
              </div>
            ))}
            <button onClick={changePw} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"13px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",marginTop:"8px",width:"100%"}}>CHANGE PASSWORD</button>
          </div>
        </div>}

        {/* Coupons */}
        {tab==="coupons"&&<div style={{maxWidth:"580px"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>🎫 Coupons</div>
          <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"24px"}}>
            {(sEdit.coupons||[]).map((c,i)=>(
              <div key={i} style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"10px",flexWrap:"wrap",paddingBottom:"10px",borderBottom:"1px solid #d4a84311"}}>
                <input value={c.code} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],code:e.target.value.toUpperCase()};setSEdit(s=>({...s,coupons:cp}));}} placeholder="CODE" style={{background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#b8922a",fontSize:"13px",fontWeight:"700",letterSpacing:"2px",width:"100px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
                <input type="number" value={c.discount} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],discount:+e.target.value};setSEdit(s=>({...s,coupons:cp}));}} style={{background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"13px",width:"60px",outline:"none",fontFamily:"'Jost',sans-serif"}}/>
                <select value={c.type} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],type:e.target.value};setSEdit(s=>({...s,coupons:cp}));}} style={{background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"6px 0",color:"#1a1208",fontSize:"12px",outline:"none",fontFamily:"'Jost',sans-serif"}}>
                  <option value="percent">% Off</option><option value="flat">Rs. Off</option>
                </select>
                <label style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"11px",color:"#1a1208",cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>
                  <input type="checkbox" checked={!!c.active} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],active:e.target.checked};setSEdit(s=>({...s,coupons:cp}));}} style={{accentColor:"#22c55e"}}/>Active
                </label>
                <button onClick={()=>{const cp=(sEdit.coupons||[]).filter((_,j)=>j!==i);setSEdit(s=>({...s,coupons:cp}));}} style={{background:"none",border:"none",color:"#dc2626",cursor:"pointer",fontSize:"16px",padding:"0 4px"}}>✕</button>
              </div>
            ))}
            <button onClick={()=>setSEdit(s=>({...s,coupons:[...(s.coupons||[]),{code:"",discount:10,type:"percent",active:true}]}))} style={{background:"none",border:"1px dashed #d4a84366",padding:"8px 16px",color:"#b8922a",cursor:"pointer",fontSize:"11px",fontFamily:"'Jost',sans-serif",letterSpacing:"1px",marginBottom:"12px"}}>+ ADD COUPON</button>
            <button onClick={saveSettings} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"13px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",width:"100%"}}>SAVE COUPONS</button>
          </div>
        </div>}

        {/* Orders */}
        {tab==="orders"&&<OrdersAdmin/>}

        {/* Reviews */}
        {tab==="reviews"&&<div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>⭐ Reviews ({reviews.length})</div>
          <div style={{display:"grid",gap:"8px"}}>{reviews.map(r=>(
            <div key={r.id} style={{background:"#fff",border:"1px solid #d4a84322",padding:"14px",display:"flex",justifyContent:"space-between"}}>
              <div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"13px",color:"#1a1208",marginBottom:"4px"}}>{r.customer_name} <span style={{fontSize:"11px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",fontWeight:"400"}}>on {r.product_name}</span></div><div style={{display:"flex",gap:"1px",marginBottom:"5px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=r.rating?"#b8922a":"#e5e5e5",fontSize:"12px"}}>★</span>)}</div><p style={{fontSize:"13px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif"}}>{r.comment}</p></div>
              <span style={{fontSize:"10px",color:"#aaa",fontFamily:"'Jost',sans-serif",flexShrink:0,marginLeft:"12px"}}>{r.date}</span>
            </div>
          ))}{!reviews.length&&<div style={{textAlign:"center",padding:"40px",color:"#8a7a5a",fontFamily:"'Cormorant Garamond',serif",fontSize:"18px"}}>No reviews yet</div>}</div>
        </div>}

        {tab==="backup"&&<div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"4px"}}>💾 Backup & Restore</div>
          <div style={{fontSize:"12px",color:"#8a7a5a",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",marginBottom:"20px"}}>Settings aur admin password ka backup lo ya restore karo.</div>

          {/* Download Backup */}
          <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"20px",marginBottom:"16px"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"13px",color:"#1a1208",marginBottom:"8px"}}>📥 Download Backup</div>
            <div style={{fontSize:"11px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",marginBottom:"14px",lineHeight:"1.7"}}>
              Sari settings, passwords JSON file mein save ho jaengi.<br/>
              Safe jagah rakh lo — kabhi bhi restore kar saktay ho.
            </div>
            <button onClick={doBackup} style={{background:"#1a1208",color:"#d4a843",border:"none",padding:"12px 28px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"all .3s"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>⬇️ DOWNLOAD BACKUP</button>
          </div>

          {/* Restore */}
          <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"20px",marginBottom:"16px"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"13px",color:"#1a1208",marginBottom:"8px"}}>📤 Restore from Backup</div>
            <div style={{fontSize:"11px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",marginBottom:"14px",lineHeight:"1.7"}}>
              Pehle se downloaded backup JSON file select karo.<br/>
              <strong style={{color:"#c0392b"}}>Warning:</strong> Existing settings replace ho jaengi.
            </div>
            <label style={{display:"inline-block",background:"transparent",color:"#1a1208",border:"1px solid #d4a84344",padding:"11px 22px",fontSize:"10px",fontWeight:"700",letterSpacing:"1.5px",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#b8922a";e.currentTarget.style.color="#b8922a";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#d4a84344";e.currentTarget.style.color="#1a1208";}}>
              📂 SELECT BACKUP FILE
              <input type="file" accept=".json" style={{display:"none"}} onChange={e=>doRestore(e.target.files[0])}/>
            </label>
          </div>

          {/* Reset to defaults */}
          <div style={{background:"#fff",border:"1px solid #dc262622",padding:"20px"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"13px",color:"#dc2626",marginBottom:"8px"}}>🔄 Reset to Defaults</div>
            <div style={{fontSize:"11px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",marginBottom:"14px"}}>Sari settings default pe wapas set ho jaengi. Products safe rahenge.</div>
            <button onClick={()=>{if(!window.confirm("Are you sure? All settings will be reset!"))return;LS.set("shopSettings",{});setSettings({});setSEdit({});alert("✅ Reset! Refresh the page.");}} style={{background:"transparent",color:"#dc2626",border:"1px solid #dc262644",padding:"11px 22px",fontSize:"10px",fontWeight:"700",letterSpacing:"1.5px",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"all .2s"}} onMouseEnter={e=>{e.target.style.background="#dc2626";e.target.style.color="#fff";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="#dc2626";}}>⚠️ RESET ALL SETTINGS</button>
          </div>
        </div>}
      </div>
    </div>
  );
}

// ── ORDERS ADMIN ──────────────────────────────────────────────
function OrdersAdmin(){
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);
  const STATUS=["Pending","Confirmed","Processing","Shipped","Delivered","Cancelled"];
  const STATUS_C={Pending:"#b8922a",Confirmed:"#3b82f6",Processing:"#f59e0b",Shipped:"#8b5cf6",Delivered:"#22c55e",Cancelled:"#dc2626"};
  useEffect(()=>{if(!supabase){setLoading(false);return;}supabase.from("online_orders").select("*").order("created_at",{ascending:false}).then(({data})=>{setOrders(data||[]);setLoading(false);});const ch=supabase.channel("orders-a").on("postgres_changes",{event:"*",schema:"public",table:"online_orders"},()=>{supabase.from("online_orders").select("*").order("created_at",{ascending:false}).then(({data})=>setOrders(data||[]));}).subscribe();return()=>supabase.removeChannel(ch);},[]);
  const upd=async(id,status)=>{setOrders(o=>o.map(x=>x.id===id?{...x,status}:x));if(supabase)await supabase.from("online_orders").update({status}).eq("id",id);};
  if(loading)return <div style={{textAlign:"center",padding:"40px",color:"#8a7a5a",fontFamily:"'Cormorant Garamond',serif",fontSize:"18px"}}>Loading orders...</div>;
  return(
    <div>
      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208",marginBottom:"16px"}}>📋 Orders ({orders.length})</div>
      <div style={{display:"grid",gap:"10px"}}>{orders.map(o=>(
        <div key={o.id} style={{background:"#fff",border:`1px solid ${STATUS_C[o.status]||"#d4a84322"}33`,padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",marginBottom:"10px"}}>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",color:"#1a1208",fontSize:"14px"}}>{o.product_name}</div><div style={{fontSize:"11px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",marginTop:"2px"}}>#{String(o.id).slice(-6)} · {o.date}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:"700",fontSize:"16px",color:"#1a1208"}}>{pkr(o.product_price)}</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",fontSize:"11px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",marginBottom:"10px"}}>
            <div>👤 {o.customer_name}</div><div>📞 {o.phone}</div><div>🏙️ {o.city}</div><div>📍 {o.address}</div>
          </div>
          <div style={{display:"flex",gap:"4px",flexWrap:"wrap",alignItems:"center"}}>
            {STATUS.map(s=><button key={s} onClick={()=>upd(o.id,s)} style={{background:o.status===s?STATUS_C[s]||"#b8922a":"transparent",color:o.status===s?"#fff":STATUS_C[s]||"#b8922a",border:`1px solid ${STATUS_C[s]||"#b8922a"}44`,padding:"3px 8px",cursor:"pointer",fontSize:"9px",fontWeight:"700",fontFamily:"'Jost',sans-serif",letterSpacing:"0.5px",transition:"all 0.2s"}}>{s}</button>)}
            <a href={`https://wa.me/92${(o.phone||"").replace(/^0/,"")}?text=${encodeURIComponent(`Assalam ${o.customer_name}! Your order "${o.product_name}" is now ${o.status}. — Jameel Fabrics Kunjah`)}`} target="_blank" rel="noreferrer" style={{marginLeft:"auto",background:"#25D366",color:"#fff",padding:"3px 10px",fontSize:"9px",fontWeight:"700",fontFamily:"'Jost',sans-serif",letterSpacing:"0.5px",textDecoration:"none"}}>📱 WA</a>
          </div>
        </div>
      ))}{!orders.length&&<div style={{textAlign:"center",padding:"40px",color:"#8a7a5a",fontFamily:"'Cormorant Garamond',serif",fontSize:"18px"}}>No orders yet</div>}</div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function App(){
  const [show3D,setShow3D]=useState(true);
  const [fading,setFading]=useState(false);
  const handleEnter=useCallback(()=>{
    setFading(true);
    setTimeout(()=>setShow3D(false),700);
  },[]);
  const [page,setPage]=useState("home");
  const [cat,setCat]=useState("All");
  const [search,setSearch]=useState("");
  const [products,setProducts]=useState([]);
  const [reviews,setReviews]=useState([]);
  const [cart,setCart]=useState(()=>LS.get("cart",[]));
  const [wishlist,setWishlist]=useState(()=>LS.get("wishlist",[]));
  const [customer,setCustomer]=useState(()=>LS.get("customer",null));
  const [settings,setSettings]=useState(()=>({
    announcements:["✦ New Arrivals — Limited Pieces ✦","✦ Exclusive Pakistani Fabrics ✦","✦ Each Design is Unique ✦"],
    heroTexts:["Where Elegance Meets Heritage","Exclusive Pakistani Fabrics","Crafted with Love, Worn with Pride"],
    heroSubtitle:"Each piece in our collection is unique — once sold, never repeated.",
    tiktok:"@jameelfabrics",instagram:"@jameelfabrics",whatsapp:WA,
    tiktokUrl:"",instagramUrl:"",
    logoUrl:"",
    faviconUrl:"",
    uploadedVideoUrl:"",uploadedVideoTitle:"",uploadedVideoCaption:"",showUploadedVideo:false,
    coupons:[{code:"WELCOME10",discount:10,type:"percent",active:true}],
    catIcons:{...DEFAULT_CAT_ICONS},
    discountBanner:"",discountBannerActive:false,
    aboutText:"Welcome to Jameel Fabrics Kunjah — your trusted destination for premium Pakistani clothing.\n\nLocated in the heart of Kunjah, we serve customers from across the region with pride and dedication.",
    policiesText:"RETURN POLICY\nWe accept exchanges within 3 days of purchase with original receipt. Sale items are non-returnable.\n\nDELIVERY POLICY\nWe deliver across Pakistan. Delivery time: 3-5 working days.\n\nPAYMENT POLICY\nWe accept Cash on Delivery (COD), JazzCash, and Easypaisa.\n\nPRIVACY POLICY\nYour personal information is safe with us.",
    heroBg:"",
    footerText:"",
    showReviews:true,
    showLocation:true,
    showAbout:true,
    primaryColor:"#b8922a",
    ...LS.get("shopSettings",{})
  }));
  const [selProd,setSelProd]=useState(null);
  const [showCart,setShowCart]=useState(false);
  const [showCheckout,setShowCheckout]=useState(false);
  const [showLogin,setShowLogin]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [adminInput,setAdminInput]=useState("");
  const [showAdminLogin,setShowAdminLogin]=useState(false);
  const [showSearch,setShowSearch]=useState(false);
  const [showTrack,setShowTrack]=useState(false);
  const [coupon,setCoupon]=useState(null);
  const [adminClicks,setAdminClicks]=useState(0);

  useEffect(()=>LS.set("cart",cart),[cart]);
  useEffect(()=>LS.set("wishlist",wishlist),[wishlist]);

  // Load products
  useEffect(()=>{
    if(!supabase)return;
    supabase.from("products").select("*").eq("website_status","listed").then(({data})=>{
      if(data?.length)setProducts(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,fabric_type:r.fabric_type||r.fabric,available_sizes:tryParse(r.available_sizes,[])})));
    });
    supabase.from("reviews").select("*").then(({data})=>{if(data?.length)setReviews(data);});
    const ch=supabase.channel("shop").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{supabase.from("products").select("*").eq("website_status","listed").then(({data})=>{if(data?.length)setProducts(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,fabric_type:r.fabric_type||r.fabric,available_sizes:tryParse(r.available_sizes,[])})));});}).subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);

  const addCart=useCallback(p=>{
    setCart(c=>{const ex=c.find(x=>x.id===p.id);const price=p.offerPrice&&p.offerPrice<p.salePrice?p.offerPrice:p.salePrice;if(ex)return c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x);return[...c,{id:p.id,name:p.website_title||p.name,color:p.color,price,qty:1,photo:p.photo_url}];});
  },[]);
  const toggleWish=useCallback(id=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]),[]);
  const openProd=useCallback(p=>{setSelProd(p);if(supabase)supabase.from("products").update({views:(p.views||0)+1}).eq("id",p.id);},[]);
  const addReview=async r=>{setReviews(prev=>[...prev,r]);if(supabase)await supabase.from("reviews").insert({id:r.id,product_id:r.product_id,product_name:r.product_name,customer_name:r.name,rating:r.rating,comment:r.comment,date:r.date,verified:false});};

  const filtered=products.filter(p=>(cat==="All"||(p.website_category||p.category)===cat)&&(!search||(p.name?.toLowerCase().includes(search.toLowerCase())||p.color?.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase()))));
  const wishProds=products.filter(p=>wishlist.includes(p.id));

  // Secret admin: 5 clicks bottom-left
  const handleSecretClick=()=>{setAdminClicks(n=>{if(n+1>=5){setShowAdminLogin(true);return 0;}return n+1;});};

  return(
    <>
      <style>{G}</style>
      <style>{`@media(min-width:769px){.show-mob{display:none!important}}`}</style>

      {/* 3D overlay — covers website like a curtain, fades out on enter */}
      {show3D&&(
        <div style={{position:"fixed",inset:0,zIndex:99999,
          opacity:fading?0:1,
          transition:"opacity 0.7s ease",
          pointerEvents:fading?"none":"auto"}}>
          <Showroom3D onEnter={handleEnter} settings={settings}/>
        </div>
      )}

      {/* Website — ALWAYS fully visible underneath */}
      <div>
        <AnnouncementBar texts={settings.announcements}/>

        {/* Discount Banner */}
        {settings.discountBannerActive&&settings.discountBanner&&(
          <div style={{background:"linear-gradient(135deg,#b91c1c,#dc2626)",padding:"10px",textAlign:"center",fontSize:"12px",fontWeight:"700",color:"#fff",letterSpacing:"2px",fontFamily:"'Jost',sans-serif",position:"relative",zIndex:99}}>🔥 {settings.discountBanner} 🔥</div>
        )}

        <Navbar cart={cart} wishlist={wishlist} page={page} setPage={setPage} cat={cat} setCat={setCat} search={search} setSearch={setSearch} customer={customer} setShowLogin={setShowLogin} setShowCart={setShowCart} settings={settings} setShowSearch={setShowSearch} showSearch={showSearch} setShowTrack={setShowTrack}/>

        {page==="home"&&<>
          <Hero settings={settings} setCat={setCat} setPage={setPage}/>

          {/* Category pills */}
          <div style={{background:"#fff",borderBottom:"1px solid #d4a84322",padding:"14px clamp(16px,4vw,48px)",overflowX:"auto"}}>
            <div style={{display:"flex",gap:"6px",justifyContent:"center",minWidth:"max-content",margin:"0 auto"}}>
              {CATS.map(c=>{
                const active = cat===c;
                return(
                  <button key={c} onClick={()=>{setCat(c);setPage("shop");}} style={{display:"flex",alignItems:"center",gap:"8px",padding:"10px 18px",border:`1px solid ${active?"#b8922a":"#d4a84322"}`,background:active?"#1a1208":"transparent",cursor:"pointer",transition:"all 0.25s",whiteSpace:"nowrap",transform:active?"translateY(-1px)":"none",boxShadow:active?"0 4px 16px rgba(26,18,8,0.15)":"none"}}>
                    <span style={{color:active?"#d4a843":"#b8922a",flexShrink:0}}>
                      <CatIcon type={c} size={18} color={active?"#d4a843":"#b8922a"}/>
                    </span>
                    <span style={{fontSize:"10px",fontWeight:"600",color:active?"#d4a843":"#8a7a5a",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"'Jost',sans-serif"}}>
                      {c==="All"?"All Collections":c}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collections by category */}
          {CATS.filter(c=>c!=="All").map(c=>{
            const cp=products.filter(p=>p.website_status==="listed"&&(p.website_category||p.category)===c).slice(0,4);
            if(!cp.length)return null;
            return(
              <section key={c} style={{padding:"clamp(48px,7vw,90px) clamp(16px,4vw,48px)",borderTop:"1px solid #d4a84322"}}>
                <div style={{maxWidth:"1400px",margin:"0 auto"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(24px,4vw,48px)"}}>
                    <div>
                      <div className="reveal" style={{fontSize:"9px",color:"#b8922a",letterSpacing:"4px",marginBottom:"8px",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>Collection</div>
                      <h2 className="reveal" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,38px)",fontWeight:"700",color:"#1a1208",animationDelay:"0.1s"}}>{c}</h2>
                    </div>
                    <button onClick={()=>{setCat(c);setPage("shop");}} style={{background:"none",border:"none",color:"#b8922a",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",textTransform:"uppercase",display:"flex",alignItems:"center",gap:"6px",padding:"8px 0",borderBottom:"1px solid #b8922a",transition:"gap 0.2s"}} onMouseEnter={e=>e.currentTarget.style.gap="10px"} onMouseLeave={e=>e.currentTarget.style.gap="6px"}>VIEW ALL →</button>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"clamp(14px,2vw,24px)"}}>
                    {cp.map((p,i)=><ProdCard key={p.id} p={p} onView={openProd} onAdd={addCart} wishlist={wishlist} toggleWish={toggleWish} i={i}/>)}
                  </div>
                </div>
              </section>
            );
          })}

          <VideoSection settings={settings}/>
          <About settings={settings}/>
          <Policies settings={settings}/>
          <Location/>

          {/* Features */}
          <section style={{padding:"clamp(48px,6vw,80px) clamp(16px,4vw,48px)",background:"#fff",borderTop:"1px solid #d4a84322"}}>
            <div style={{maxWidth:"1000px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"clamp(14px,2vw,24px)"}}>
              {[["✨","Exclusive","Every piece is unique"],["🧵","Premium Quality","Finest Pakistani fabrics"],["📱","Easy Booking","Book via WhatsApp"],["🔄","Exchange","3-day exchange policy"],["🚀","Fast Delivery","Pakistan-wide delivery"],["💯","Trusted","Kunjah's premium store"]].map(([ic,t,d])=>(
                <TiltCard key={t} className="reveal" style={{background:"var(--cream2)",border:"1px solid #d4a84322",padding:"clamp(16px,2vw,22px)",textAlign:"center"}}>
                  <div style={{fontSize:"28px",marginBottom:"10px"}}>{ic}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",color:"#1a1208",marginBottom:"6px",fontSize:"14px"}}>{t}</div>
                  <div style={{fontSize:"12px",color:"#8a7a5a",fontFamily:"'Jost',sans-serif",lineHeight:1.6}}>{d}</div>
                </TiltCard>
              ))}
            </div>
          </section>

          <Footer settings={settings} setShowTrack={setShowTrack}/>
        </>}

        {page==="shop"&&<>
          <section style={{padding:"clamp(32px,5vw,60px) clamp(16px,4vw,48px)",minHeight:"70vh"}}>
            <div style={{maxWidth:"1400px",margin:"0 auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"28px",flexWrap:"wrap",gap:"12px"}}>
                <div>
                  <div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"4px",marginBottom:"6px",fontFamily:"'Jost',sans-serif"}}>COLLECTION</div>
                  <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,42px)",fontWeight:"700",color:"#1a1208"}}>{cat==="All"?"All Collections":cat}</h1>
                  <p style={{color:"#8a7a5a",fontSize:"12px",marginTop:"4px",fontFamily:"'Jost',sans-serif",letterSpacing:"1px"}}>{filtered.length} pieces</p>
                </div>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{background:cat===c?"#1a1208":"transparent",color:cat===c?"#d4a843":"#8a7a5a",border:`1px solid ${cat===c?"#1a1208":"#d4a84333"}`,padding:"7px 16px",fontSize:"9px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",transition:"all 0.2s",fontFamily:"'Jost',sans-serif",textTransform:"uppercase"}}>{c==="All"?"ALL":c.toUpperCase()}</button>)}
                </div>
              </div>
              {filtered.length===0
                ?<div style={{textAlign:"center",padding:"80px",color:"#8a7a5a"}}><div style={{fontSize:"48px",marginBottom:"16px"}}>🔍</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#1a1208",marginBottom:"8px"}}>No products found</div><button onClick={()=>{setSearch("");setCat("All");}} style={{background:"none",border:"1px solid #b8922a",color:"#b8922a",padding:"8px 20px",fontSize:"10px",cursor:"pointer",fontFamily:"'Jost',sans-serif",letterSpacing:"2px"}}>CLEAR FILTERS</button></div>
                :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"clamp(14px,2vw,24px)"}}>
                  {filtered.map((p,i)=><ProdCard key={p.id} p={p} onView={openProd} onAdd={addCart} wishlist={wishlist} toggleWish={toggleWish} i={i}/>)}
                </div>
              }
            </div>
          </section>
          <Footer settings={settings} setShowTrack={setShowTrack}/>
        </>}

        {page==="wishlist"&&<>
          <section style={{padding:"clamp(32px,5vw,60px) clamp(16px,4vw,48px)",minHeight:"70vh"}}>
            <div style={{maxWidth:"1400px",margin:"0 auto"}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,42px)",fontWeight:"700",color:"#1a1208",marginBottom:"28px"}}>My Wishlist</h1>
              {wishProds.length===0
                ?<div style={{textAlign:"center",padding:"80px",color:"#8a7a5a"}}><div style={{fontSize:"48px",marginBottom:"16px"}}>🤍</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#1a1208"}}>Your wishlist is empty</div></div>
                :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"clamp(14px,2vw,24px)"}}>
                  {wishProds.map((p,i)=><ProdCard key={p.id} p={p} onView={openProd} onAdd={addCart} wishlist={wishlist} toggleWish={toggleWish} i={i}/>)}
                </div>
              }
            </div>
          </section>
          <Footer settings={settings} setShowTrack={setShowTrack}/>
        </>}

        {page==="account"&&customer&&<>
          <section style={{padding:"clamp(32px,5vw,60px) clamp(16px,4vw,48px)",minHeight:"70vh"}}>
            <div style={{maxWidth:"500px",margin:"0 auto"}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,36px)",fontWeight:"700",color:"#1a1208",marginBottom:"28px"}}>My Account</h1>
              <div style={{background:"#fff",border:"1px solid #d4a84322",padding:"24px"}}>
                {[["👤","Name",customer.name],["📞","Phone",customer.phone],["🏙️","City",customer.city],["📍","Address",customer.address]].map(([ic,l,v])=>(
                  <div key={l} style={{display:"flex",gap:"12px",padding:"12px 0",borderBottom:"1px solid #d4a84311"}}>
                    <span style={{fontSize:"18px"}}>{ic}</span>
                    <div><div style={{fontSize:"9px",color:"#b8922a",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px",fontFamily:"'Jost',sans-serif"}}>{l}</div><div style={{color:"#1a1208",fontSize:"14px",fontFamily:"'Cormorant Garamond',serif"}}>{v||"—"}</div></div>
                  </div>
                ))}
                <button onClick={()=>{LS.set("customer",null);setCustomer(null);setPage("home");}} style={{marginTop:"16px",background:"none",border:"1px solid #dc2626",padding:"10px 20px",color:"#dc2626",cursor:"pointer",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",fontFamily:"'Jost',sans-serif"}}>SIGN OUT</button>
              </div>
            </div>
          </section>
          <Footer settings={settings} setShowTrack={setShowTrack}/>
        </>}

        {/* Modals */}
        {selProd&&<ProdModal p={selProd} onClose={()=>setSelProd(null)} wishlist={wishlist} toggleWish={toggleWish} onAdd={addCart} reviews={reviews} onReview={addReview} settings={settings}/>}
        {showCart&&<Cart cart={cart} setCart={setCart} onClose={()=>setShowCart(false)} customer={customer} setShowLogin={setShowLogin} setShowCheckout={setShowCheckout} settings={settings} coupon={coupon} setCoupon={setCoupon}/>}
        {showCheckout&&customer&&<Checkout cart={cart} customer={customer} onClose={()=>setShowCheckout(false)} settings={settings} coupon={coupon}/>}
        {showLogin&&<Login onClose={()=>setShowLogin(false)} onLogin={setCustomer}/>}
        {showTrack&&<Tracking onClose={()=>setShowTrack(false)}/>}
        {showAdmin&&<AdminPanel products={products} setProducts={setProducts} reviews={reviews} settings={settings} setSettings={setSettings} onClose={()=>setShowAdmin(false)}/>}

        {/* Admin Login — hidden */}
        {showAdminLogin&&!showAdmin&&(
          <div style={{position:"fixed",inset:0,background:"rgba(26,18,8,0.9)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(12px)"}}>
            <div style={{background:"#faf8f3",width:"100%",maxWidth:"360px",padding:"36px",textAlign:"center",animation:"scaleIn 0.3s ease"}}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>🔐</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:"700",color:"#1a1208",marginBottom:"4px"}}>Admin Access</div>
              <p style={{fontSize:"12px",color:"#8a7a5a",marginBottom:"20px",fontFamily:"'Jost',sans-serif",letterSpacing:"0.5px"}}>Enter admin password</p>
              <input type="password" value={adminInput} onChange={e=>setAdminInput(e.target.value)} placeholder="Password..." style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid #d4a84344",padding:"10px 0",fontSize:"14px",color:"#1a1208",outline:"none",marginBottom:"16px",textAlign:"center",fontFamily:"'Cormorant Garamond',serif",letterSpacing:"4px"}} onKeyDown={e=>{if(e.key==="Enter"){const sv=LS.get("adminPass",ADMIN_PASS_DEFAULT);if(adminInput===sv){setShowAdmin(true);setShowAdminLogin(false);setAdminInput("");}else alert("Wrong password!");}}}/>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={()=>{const sv=LS.get("adminPass",ADMIN_PASS_DEFAULT);if(adminInput===sv){setShowAdmin(true);setShowAdminLogin(false);setAdminInput("");}else alert("Wrong password!");}} style={{flex:1,background:"#1a1208",color:"#d4a843",border:"none",padding:"13px",fontSize:"10px",fontWeight:"700",letterSpacing:"2px",cursor:"pointer",fontFamily:"'Jost',sans-serif",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.background="#d4a843";e.target.style.color="#1a1208";}} onMouseLeave={e=>{e.target.style.background="#1a1208";e.target.style.color="#d4a843";}}>UNLOCK</button>
                <button onClick={()=>{setShowAdminLogin(false);setAdminInput("");}} style={{background:"none",border:"1px solid #d4a84344",padding:"13px 18px",color:"#8a7a5a",cursor:"pointer",fontFamily:"'Jost',sans-serif",fontSize:"10px"}}>✕</button>
              </div>
            </div>
          </div>
        )}

        <WAFloat settings={settings}/>

        {/* Hidden admin trigger */}
        <div onClick={handleSecretClick} style={{position:"fixed",bottom:0,left:0,width:"30px",height:"30px",zIndex:999,cursor:"default",opacity:0}}/>
      </div>
    </>
  );
}
