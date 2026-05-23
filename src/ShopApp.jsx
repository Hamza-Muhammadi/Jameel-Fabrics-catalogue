import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import * as THREE from "three";

const SUPA_URL = process.env.REACT_APP_SUPABASE_URL || "";
const SUPA_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = SUPA_URL && SUPA_KEY ? createClient(SUPA_URL, SUPA_KEY) : null;

const WA_NUM = "923228722232";
const ADMIN_PASS = "jameel@admin2026";
const BRAND = "JAMEEL FABRICS";
const BRAND_SUB = "KUNJAH";
const TAGLINE = "Exclusive. Elegant. Pakistani.";
const PHONE = "03228722232";
const ADDRESS = "Circular Road Kunjah, Distt Gujrat, Punjab";
const MAPS_URL = "https://maps.google.com/?q=Kunjah,Gujrat,Punjab,Pakistan";
const CATS = ["All","Men's Unstitched","Women Unstitched","Women Stitched","Kids"];
const CAT_ICONS = {"All":"🧵","Men's Unstitched":"👔","Women Unstitched":"👗","Women Stitched":"✨","Kids":"🌟"};

const DEFAULT_SETTINGS = {
  announcements:["✦ New Arrivals — Limited Pieces — Book Now on WhatsApp ✦","✦ Exclusive Pakistani Fabrics — Quality Guaranteed — Fast Delivery ✦","✦ Each Design is Unique — Once Sold, Never Repeated ✦"],
  heroTexts:["Where Elegance Meets Pakistani Heritage","Exclusive Designs. Premium Quality.","Pakistan Ki Shaan — Har Thread Mein","Limited Pieces. Unlimited Beauty."],
  heroSubtitle:"Discover our exclusive collection of premium Pakistani fabrics. Each piece tells a story of craftsmanship and culture.",
  discountBanner:"",discountBannerActive:false,
  aboutText:"Welcome to Jameel Fabrics Kunjah — your trusted destination for premium Pakistani clothing. Established with a passion for quality and elegance, we bring you exclusive stitched and unstitched collections that blend tradition with modern style.\n\nLocated in the heart of Kunjah, we serve customers from across the region with pride and dedication.",
  policiesText:"RETURN POLICY\nWe accept exchanges within 3 days of purchase with original receipt. Sale items are non-returnable.\n\nDELIVERY POLICY\nWe deliver across Pakistan. Delivery time: 3-5 working days. Delivery charges apply based on location.\n\nPAYMENT POLICY\nWe accept Cash on Delivery (COD), JazzCash, and Easypaisa. All prices are in PKR.\n\nPRIVACY POLICY\nYour personal information is safe with us. We never share customer data with third parties.",
  tiktok:"@jameelfabrics",instagram:"@jameelfabrics",whatsapp:WA_NUM,
  tiktokUrl:"https://www.tiktok.com/@jameelfabrics",
  instagramUrl:"https://www.instagram.com/jameelfabrics",
  logoUrl:"",heroBg:"",
  featuredVideo:"",showVideo:false,videoTitle:"Our Collection",videoCaption:"Experience the finest Pakistani fabrics — crafted with love, designed for elegance.",
  uploadedVideoUrl:"",uploadedVideoTitle:"",uploadedVideoCaption:"",showUploadedVideo:false,
  coupons:[{code:"WELCOME10",discount:10,type:"percent",active:true},{code:"EID20",discount:20,type:"percent",active:false}],
};

// ── Global CSS ────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #050505; color: #f0ebe0; font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #050505; }
  ::-webkit-scrollbar-thumb { background: #c9a84c55; border-radius: 4px; }
  ::selection { background: #c9a84c33; color: #c9a84c; }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; }
  input, textarea { font-family: inherit; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideRight { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideLeft { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes shimmer { 0%,100%{opacity:0.7} 50%{opacity:1} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.05);opacity:0.8} }
  @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 20px #c9a84c22} 50%{box-shadow:0 0 40px #c9a84c44} }
  @keyframes lineExpand { from{width:0} to{width:100%} }
  @keyframes countUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes textReveal { 0%{clip-path:inset(0 100% 0 0)} 100%{clip-path:inset(0 0% 0 0)} }
  @keyframes particleFall { 0%{opacity:0;transform:translateY(-20px) rotate(0deg)} 50%{opacity:0.6} 100%{opacity:0;transform:translateY(100vh) rotate(360deg)} }
  @keyframes spotlightMove { 0%,100%{opacity:0.3;transform:translateX(-10%)} 50%{opacity:0.6;transform:translateX(10%)} }
  @keyframes zoomIn { from{transform:scale(1.15)} to{transform:scale(1)} }
  @keyframes cartBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }

  .animate-fadeUp { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-fadeIn { animation: fadeIn 0.5s ease both; }
  .animate-slideRight { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-slideLeft { animation: slideLeft 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-float { animation: float 4s ease-in-out infinite; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }
  .delay-6 { animation-delay: 0.6s; }
  .delay-8 { animation-delay: 0.8s; }

  .gold-text { background: linear-gradient(135deg,#c9a84c,#e8c97a,#b8882c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .gold-border { border: 1px solid #c9a84c44; }
  .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
  .glass-dark { background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(201,168,76,0.15); }

  .prod-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
  .prod-card:hover { transform: translateY(-8px); }
  .prod-card:hover .prod-img { transform: scale(1.08); }
  .prod-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }

  .nav-link { position: relative; }
  .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:linear-gradient(to right,#c9a84c,#e8c97a); transition:width 0.3s ease; }
  .nav-link:hover::after { width:100%; }

  .btn-gold { background: linear-gradient(135deg,#c9a84c,#e8c97a); color:#000; border:none; font-weight:700; transition: all 0.3s ease; }
  .btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 24px #c9a84c44; }
  .btn-outline { background:transparent; border:1px solid #c9a84c; color:#c9a84c; font-weight:600; transition:all 0.3s ease; }
  .btn-outline:hover { background:#c9a84c11; transform:translateY(-2px); }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .mobile-full { width: 100% !important; }
    .mobile-col { flex-direction: column !important; }
    .mobile-p { padding: 12px !important; }
    .grid-1-mobile { grid-template-columns: 1fr !important; }
    .grid-2-mobile { grid-template-columns: 1fr 1fr !important; }

    /* Product grid — 2 cols on mobile */
    .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }

    /* Product modal — single column */
    .modal-inner { grid-template-columns: 1fr !important; }
    .modal-inner > div:first-child { border-right: none !important; border-bottom: 1px solid #1a1a1a; }

    /* Category bar scroll */
    .cat-bar { justify-content: flex-start !important; }
    .cat-bar button { min-width: 70px !important; padding: 8px 10px !important; }

    /* Hero text */
    .hero-title { font-size: clamp(28px,8vw,48px) !important; }

    /* Cart sidebar full width */
    .cart-sidebar { width: 100vw !important; }

    /* Navbar */
    nav { padding: 0 12px !important; }
    .nav-logo span:first-child { font-size: 14px !important; }

    /* Sections padding */
    section { padding-left: 14px !important; padding-right: 14px !important; }

    /* Footer grid */
    .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }

    /* Stats bar */
    .stats-bar { gap: 16px !important; }
    .stats-bar > div { min-width: unset !important; }

    /* Admin panel tabs */
    .admin-tabs { flex-wrap: wrap !important; }
    .admin-tabs button { font-size: 10px !important; padding: 5px 8px !important; }

    /* Carousel grid */
    .carousel-grid { grid-template-columns: repeat(2, 1fr) !important; }

    /* Checkout modal */
    .checkout-modal { max-width: 100% !important; border-radius: 20px 20px 0 0 !important; position: fixed !important; bottom: 0 !important; top: auto !important; }

    /* Product card */
    .prod-card { border-radius: 12px !important; }
    .prod-card .prod-info { padding: 10px 12px 12px !important; }
    .prod-card .prod-price { font-size: 15px !important; }
  }

  @media (max-width: 480px) {
    .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
    .cat-bar button { min-width: 60px !important; font-size: 9px !important; padding: 8px 6px !important; }
    .cat-bar button span:first-child { font-size: 20px !important; }
  }
`;

// ── Helpers ───────────────────────────────────────────────────
const pkr = n => `Rs. ${Number(n||0).toLocaleString()}`;
const gid = () => Date.now() + Math.floor(Math.random()*1000);
const tryParseLocal = (v,def)=>{ try{return v?JSON.parse(v):def;}catch{return def;} };
const LS = { get:(k,d)=>{try{const v=localStorage.getItem("jf_shop_"+k);return v?JSON.parse(v):d;}catch{return d;}}, set:(k,v)=>{try{localStorage.setItem("jf_shop_"+k,JSON.stringify(v));}catch{}} };

// ── Intersection Observer Hook ────────────────────────────────
function useInView(threshold=0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setInView(true); }, {threshold});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[threshold]);
  return [ref, inView];
}

// ── Discount Banner ───────────────────────────────────────────
function DiscountBanner({ settings }) {
  if(!settings.discountBannerActive||!settings.discountBanner) return null;
  return (
    <div style={{background:"linear-gradient(135deg,#e05252,#c9184a,#e05252)",padding:"10px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.03) 10px,rgba(255,255,255,0.03) 20px)"}}/>
      <span style={{fontSize:"13px",fontWeight:"700",color:"#fff",letterSpacing:"2px",position:"relative"}}>
        🔥 {settings.discountBanner} 🔥
      </span>
    </div>
  );
}

// ── Category Visual Bar ───────────────────────────────────────
function CategoryBar({ catFilter, setCatFilter, setPage }) {
  return (
    <div style={{background:"#080808",borderBottom:"1px solid #1a1a1a",padding:"16px 24px",overflowX:"auto"}}>
      <div style={{display:"flex",gap:"10px",justifyContent:"center",minWidth:"max-content",margin:"0 auto"}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>{setCatFilter(c);setPage("shop");}}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",padding:"12px 20px",borderRadius:"14px",border:`1px solid ${catFilter===c?"#c9a84c":"#1a1a1a"}`,background:catFilter===c?"linear-gradient(135deg,#c9a84c11,#e8c97a11)":"#0f0f0f",cursor:"pointer",transition:"all 0.3s",minWidth:"90px",transform:catFilter===c?"translateY(-2px)":"translateY(0)",boxShadow:catFilter===c?"0 8px 24px rgba(201,168,76,0.15)":"none"}}>
            <span style={{fontSize:"24px"}}>{CAT_ICONS[c]}</span>
            <span style={{fontSize:"10px",fontWeight:"700",color:catFilter===c?"#c9a84c":"#666",letterSpacing:"1px",textTransform:"uppercase",whiteSpace:"nowrap"}}>{c==="All"?"All":c.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Rotating Hero Text ────────────────────────────────────────
function RotatingText({ texts }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(()=>{
    const t = setInterval(()=>{
      setVisible(false);
      setTimeout(()=>{ setIdx(i=>(i+1)%texts.length); setVisible(true); }, 500);
    }, 3000);
    return ()=>clearInterval(t);
  },[texts.length]);
  return (
    <span style={{opacity:visible?1:0,transition:"opacity 0.5s ease",display:"inline-block"}}>
      {texts[idx]}
    </span>
  );
}

// ── Real Viewer Count ─────────────────────────────────────────
function ViewerCount() {
  const [count, setCount] = useState(()=>Math.floor(Math.random()*8)+3);
  useEffect(()=>{
    const t = setInterval(()=>{
      setCount(c=>{ const delta=Math.random()>0.5?1:-1; return Math.max(2,Math.min(15,c+delta)); });
    }, 8000);
    return ()=>clearInterval(t);
  },[]);
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:"6px"}}>
      <span style={{width:"8px",height:"8px",borderRadius:"50%",background:"#4caf7d",display:"inline-block",animation:"pulse 2s ease infinite"}}/>
      {count} people browsing now
    </span>
  );
}

// ── Product Carousel ──────────────────────────────────────────
function ProductCarousel({ title, subtitle, products, onView, onAddCart, wishlist, toggleWish }) {
  const [start, setStart] = useState(0);
  const [ref, inView] = useInView(0.1);
  const visible = 4;
  const canPrev = start > 0;
  const canNext = start + visible < products.length;
  if(!products.length) return null;
  return (
    <section ref={ref} style={{padding:"70px 0",background:"#070707",borderTop:"1px solid #1a1a1a"}}>
      <div style={{maxWidth:"1400px",margin:"0 auto",padding:"0 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"40px",opacity:inView?1:0,transition:"all 0.8s ease",transform:inView?"translateY(0)":"translateY(20px)"}}>
          <div>
            <p style={{fontSize:"10px",letterSpacing:"5px",color:"#c9a84c88",marginBottom:"8px",textTransform:"uppercase"}}>{subtitle}</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,40px)",fontWeight:"700"}}><span className="gold-text">{title}</span></h2>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>setStart(s=>Math.max(0,s-1))} disabled={!canPrev} style={{width:"40px",height:"40px",borderRadius:"50%",background:canPrev?"#111":"#080808",border:`1px solid ${canPrev?"#c9a84c44":"#0f0f0f"}`,color:canPrev?"#c9a84c":"#333",cursor:canPrev?"pointer":"default",fontSize:"16px",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
            <button onClick={()=>setStart(s=>Math.min(products.length-visible,s+1))} disabled={!canNext} style={{width:"40px",height:"40px",borderRadius:"50%",background:canNext?"#111":"#080808",border:`1px solid ${canNext?"#c9a84c44":"#0f0f0f"}`,color:canNext?"#c9a84c":"#333",cursor:canNext?"pointer":"default",fontSize:"16px",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"20px",overflow:"hidden"}}>
          {products.slice(start, start+visible+1).map((p,i)=>(
            <ProductCard key={p.id} product={p} onView={onView} onAddCart={onAddCart} wishlist={wishlist} toggleWish={toggleWish} index={i}/>
          ))}
        </div>
        {/* Dots */}
        <div style={{display:"flex",justifyContent:"center",gap:"6px",marginTop:"24px"}}>
          {Array.from({length:Math.ceil(products.length/visible)}).map((_,i)=>(
            <div key={i} onClick={()=>setStart(i*visible)} style={{width:start===i*visible?"24px":"8px",height:"8px",borderRadius:"4px",background:start===i*visible?"#c9a84c":"#1a1a1a",cursor:"pointer",transition:"all 0.3s"}}/>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Three.js 3D Showroom ──────────────────────────────────────
function Showroom3D({ onEnter }) {
  const mountRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(()=>{
    const el = mountRef.current;
    if(!el) return;

    // Scene setup
    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030303);
    scene.fog = new THREE.FogExp2(0x030303, 0.06);

    const camera = new THREE.PerspectiveCamera(60, W/H, 0.1, 100);
    camera.position.set(0, 3, 12);
    camera.lookAt(0, 1, 0);

    // ── Reflective Floor ──
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color:0x0a0a0a, metalness:0.9, roughness:0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI/2;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Gold Grid on floor ──
    const gridHelper = new THREE.GridHelper(30, 30, 0xc9a84c, 0x1a1a1a);
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // ── Back Wall ──
    const wallGeo = new THREE.PlaneGeometry(20, 8);
    const wallMat = new THREE.MeshStandardMaterial({ color:0x080808, metalness:0.3, roughness:0.7 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 4, -8);
    wall.receiveShadow = true;
    scene.add(wall);

    // ── Gold Sign Board ──
    const signGeo = new THREE.BoxGeometry(6, 0.8, 0.1);
    const signMat = new THREE.MeshStandardMaterial({ color:0xc9a84c, metalness:0.9, roughness:0.1, emissive:0xc9a84c, emissiveIntensity:0.3 });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, 5.5, -7.9);
    sign.castShadow = true;
    scene.add(sign);

    // ── Mannequins (Pakistani dress style) ──
    const createMannequin = (x, color, isFemale) => {
      const group = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color, metalness:0.1, roughness:0.8 });

      // Body
      const bodyH = isFemale ? 1.8 : 1.6;
      const bodyGeo = new THREE.CylinderGeometry(isFemale?0.35:0.3, isFemale?0.4:0.35, bodyH, 8);
      const body = new THREE.Mesh(bodyGeo, mat);
      body.position.y = bodyH/2 + 0.3;
      body.castShadow = true;
      group.add(body);

      // Head
      const headGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({ color:0xd4a574, metalness:0.1, roughness:0.8 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = bodyH + 0.52;
      head.castShadow = true;
      group.add(head);

      // Female dupatta/scarf
      if(isFemale){
        const scarfGeo = new THREE.TorusGeometry(0.3, 0.08, 8, 20, Math.PI);
        const scarfMat = new THREE.MeshStandardMaterial({ color:0xc9a84c, metalness:0.3, roughness:0.5 });
        const scarf = new THREE.Mesh(scarfGeo, scarfMat);
        scarf.position.y = bodyH + 0.45;
        scarf.rotation.z = Math.PI/4;
        group.add(scarf);
      }

      // Stand
      const standGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8);
      const standMat = new THREE.MeshStandardMaterial({ color:0xc9a84c, metalness:0.9, roughness:0.1 });
      const stand = new THREE.Mesh(standGeo, standMat);
      stand.position.y = 0.15;
      group.add(stand);

      // Base
      const baseGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.06, 16);
      const base = new THREE.Mesh(baseGeo, standMat);
      base.position.y = 0.03;
      group.add(base);

      group.position.set(x, 0, -3);
      scene.add(group);
      return group;
    };

    // 4 mannequins — 2 female (women dresses), 2 male (shalwar kameez)
    const m1 = createMannequin(-4.5, 0x8b3a6b, true);   // Women - maroon
    const m2 = createMannequin(-2.5, 0x2d5a8e, true);   // Women - blue
    const m3 = createMannequin(2.5,  0x3d6b3a, false);  // Men - green
    const m4 = createMannequin(4.5,  0x6b4423, false);  // Men - brown

    // ── Spotlights ──
    const addSpot = (x, y, z, color, intensity) => {
      const spot = new THREE.SpotLight(color, intensity);
      spot.position.set(x, y, z);
      spot.angle = Math.PI/6;
      spot.penumbra = 0.5;
      spot.castShadow = true;
      spot.shadow.mapSize.width = 1024;
      spot.shadow.mapSize.height = 1024;
      scene.add(spot);
      scene.add(spot.target);
      spot.target.position.set(x, 0, z-3);
      return spot;
    };

    const spot1 = addSpot(-4.5, 6, -1, 0xffeedd, 3);
    const spot2 = addSpot(-2.5, 6, -1, 0xc9a84c, 2);
    const spot3 = addSpot(2.5, 6, -1, 0xc9a84c, 2);
    const spot4 = addSpot(4.5, 6, -1, 0xffeedd, 3);
    const centerSpot = addSpot(0, 8, 2, 0xffffff, 1.5);

    // ── Ambient ──
    scene.add(new THREE.AmbientLight(0x111111, 0.5));

    // ── Gold Particles ──
    const partGeo = new THREE.BufferGeometry();
    const partCount = 300;
    const positions = new Float32Array(partCount*3);
    for(let i=0;i<partCount;i++){
      positions[i*3]=(Math.random()-0.5)*20;
      positions[i*3+1]=Math.random()*8;
      positions[i*3+2]=(Math.random()-0.5)*15;
    }
    partGeo.setAttribute("position",new THREE.BufferAttribute(positions,3));
    const partMat = new THREE.PointsMaterial({ color:0xc9a84c, size:0.04, transparent:true, opacity:0.6 });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // ── Pillars ──
    [-7, 7].forEach(x=>{
      const pillarGeo = new THREE.CylinderGeometry(0.15, 0.15, 7, 16);
      const pillarMat = new THREE.MeshStandardMaterial({ color:0xc9a84c, metalness:0.8, roughness:0.2 });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, 3.5, -5);
      pillar.castShadow = true;
      scene.add(pillar);
    });

    // ── Animation ──
    let t = 0;
    let camZ = 12;
    let camY = 3;
    let spotIntensity = 0;

    const animate = () => {
      const id = requestAnimationFrame(animate);
      t += 0.01;

      // Camera zoom in
      if(camZ > 6) { camZ -= 0.02; camY = Math.max(1.8, camY - 0.008); }
      camera.position.set(Math.sin(t*0.3)*0.3, camY, camZ);
      camera.lookAt(0, 1.5, 0);

      // Spotlight intensity ramp
      if(spotIntensity < 1) spotIntensity += 0.005;
      spot1.intensity = 3 * spotIntensity;
      spot2.intensity = 2 * spotIntensity;
      spot3.intensity = 2 * spotIntensity;
      spot4.intensity = 3 * spotIntensity;
      centerSpot.intensity = 1.5 * spotIntensity;

      // Mannequin subtle sway
      [m1,m2,m3,m4].forEach((m,i)=>{ m.rotation.y = Math.sin(t*0.5 + i*0.8)*0.08; });

      // Particles
      particles.rotation.y += 0.001;
      const pos = particles.geometry.attributes.position.array;
      for(let i=1;i<partCount*3;i+=3){ pos[i] -= 0.005; if(pos[i]<0) pos[i]=8; }
      particles.geometry.attributes.position.needsUpdate = true;

      // Sign glow
      sign.material.emissiveIntensity = 0.2 + Math.sin(t*2)*0.1;

      renderer.render(scene, camera);

      // Show text after 1.5s
      if(t > 1.5 && !textVisible) setTextVisible(true);
    };
    const animId = requestAnimationFrame(animate);

    // Phases
    setTimeout(()=>setPhase(1), 500);
    setTimeout(()=>setPhase(2), 1500);
    setTimeout(()=>setPhase(3), 3000);

    // Resize
    const onResize = ()=>{ const w=el.clientWidth,h=el.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); };
    window.addEventListener("resize", onResize);

    return ()=>{
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      try{ el.removeChild(renderer.domElement); renderer.dispose(); }catch(e){}
    };
  },[]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:99999,background:"#030303"}}>
      <div ref={mountRef} style={{width:"100%",height:"100%"}}/>

      {/* Text overlay */}
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:2}}>
        <div style={{opacity:textVisible?1:0,transition:"opacity 1.5s ease",textAlign:"center",padding:"0 20px"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(11px,1.5vw,14px)",letterSpacing:"8px",color:"#c9a84c88",marginBottom:"16px",fontStyle:"italic",animation:textVisible?"fadeUp 0.8s ease both":"none"}}>
            ✦ EST. KUNJAH ✦
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,7vw,80px)",fontWeight:"900",letterSpacing:"6px",background:"linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"8px",animation:textVisible?"fadeUp 0.8s ease 0.2s both":"none",lineHeight:"1"}}>
            {BRAND}
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(14px,2vw,20px)",letterSpacing:"12px",color:"#c9a84c99",marginBottom:"24px",animation:textVisible?"fadeUp 0.8s ease 0.4s both":"none"}}>
            {BRAND_SUB}
          </div>
          <div style={{height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",maxWidth:"300px",margin:"0 auto 20px",animation:textVisible?"lineExpand 1s ease 0.6s both":"none"}}/>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(13px,1.8vw,17px)",color:"#c9a84c77",fontStyle:"italic",letterSpacing:"3px",animation:textVisible?"fadeUp 0.8s ease 0.8s both":"none"}}>
            {TAGLINE}
          </div>
        </div>
      </div>

      {/* Enter button */}
      {phase>=3&&(
        <div style={{position:"absolute",bottom:"10%",left:0,right:0,display:"flex",justifyContent:"center",zIndex:3}}>
          <button onClick={onEnter} style={{background:"linear-gradient(135deg,#c9a84c,#e8c97a)",color:"#000",border:"none",borderRadius:"30px",padding:"14px 48px",fontSize:"13px",fontWeight:"800",letterSpacing:"3px",textTransform:"uppercase",cursor:"pointer",animation:"fadeUp 0.6s ease both",boxShadow:"0 8px 32px rgba(201,168,76,0.4)",fontFamily:"'DM Sans',sans-serif"}}>
            Enter Store →
          </button>
        </div>
      )}

      {/* Skip */}
      <button onClick={onEnter} style={{position:"absolute",top:"20px",right:"20px",background:"none",border:"1px solid #c9a84c33",borderRadius:"20px",padding:"6px 16px",color:"#c9a84c88",fontSize:"11px",cursor:"pointer",letterSpacing:"2px",zIndex:3,fontFamily:"'DM Sans',sans-serif"}}>
        Skip ›
      </button>
    </div>
  );
}

// ── Order Tracking ────────────────────────────────────────────
function OrderTracking({ onClose }) {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const STATUS_STEPS = ["Pending","Confirmed","Processing","Shipped","Delivered"];
  const STATUS_ICONS = {Pending:"⏳",Confirmed:"✅",Processing:"🔧",Shipped:"🚚",Delivered:"🎉",Cancelled:"❌"};

  const search = async()=>{
    if(!phone) return alert("Phone number dalo!");
    setLoading(true);
    if(supabase){
      const {data} = await supabase.from("online_orders").select("*").eq("phone",phone).order("created_at",{ascending:false});
      setOrders(data||[]);
    } else {
      setOrders([]);
    }
    setSearched(true);
    setLoading(false);
  };

  const getStep = (status) => STATUS_STEPS.indexOf(status);

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:1300,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(12px)"}}>
      <div style={{background:"#0a0a0a",borderRadius:"20px",width:"100%",maxWidth:"540px",border:"1px solid #c9a84c22",overflow:"hidden",animation:"scaleIn 0.3s ease",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{padding:"20px 24px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(135deg,#1a1208,#0a0a0a)"}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"700",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>🚚 Track Your Order</div>
            <div style={{fontSize:"11px",color:"#555",marginTop:"2px"}}>Enter your phone number to track</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"1px solid #1a1a1a",borderRadius:"50%",width:"32px",height:"32px",color:"#666",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"24px"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="03XX-XXXXXXX" type="tel" style={{flex:1,background:"#111",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"11px 14px",color:"#f0ebe0",fontSize:"13px",outline:"none"}} onKeyDown={e=>e.key==="Enter"&&search()}/>
            <button onClick={search} className="btn-gold" style={{borderRadius:"10px",padding:"11px 20px",fontSize:"13px",letterSpacing:"1px"}}>
              {loading?"⏳":"Search"}
            </button>
          </div>

          {searched&&orders.length===0&&(
            <div style={{textAlign:"center",padding:"32px",color:"#444"}}>
              <div style={{fontSize:"36px",marginBottom:"12px"}}>📦</div>
              <div style={{color:"#f0ebe0",fontWeight:"600",marginBottom:"6px"}}>No orders found</div>
              <div style={{fontSize:"12px",color:"#555"}}>Check your phone number or contact us on WhatsApp</div>
              <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent("Assalam! I want to track my order. My phone: "+phone)}`} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:"12px",background:"#25D366",color:"#fff",borderRadius:"20px",padding:"8px 20px",fontSize:"12px",fontWeight:"700"}}>📱 Ask on WhatsApp</a>
            </div>
          )}

          {orders.map(order=>(
            <div key={order.id} style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"14px",padding:"16px",marginBottom:"12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}>
                <div>
                  <div style={{fontWeight:"700",color:"#f0ebe0",fontSize:"14px"}}>{order.product_name}</div>
                  <div style={{fontSize:"11px",color:"#555",marginTop:"2px"}}>Order #{String(order.id).slice(-6)} · {order.date}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:"800",color:"#c9a84c",fontSize:"15px"}}>Rs.{Number(order.product_price||0).toLocaleString()}</div>
                  <div style={{fontSize:"12px",marginTop:"2px"}}>{STATUS_ICONS[order.status]||"⏳"} <span style={{color:order.status==="Delivered"?"#4caf7d":order.status==="Cancelled"?"#e05252":"#c9a84c",fontWeight:"600"}}>{order.status}</span></div>
                </div>
              </div>

              {/* Progress bar */}
              {order.status!=="Cancelled"&&(
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                    {STATUS_STEPS.map((s,i)=>(
                      <div key={s} style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
                        <div style={{width:"24px",height:"24px",borderRadius:"50%",background:i<=getStep(order.status)?"linear-gradient(135deg,#c9a84c,#e8c97a)":"#1a1a1a",border:`2px solid ${i<=getStep(order.status)?"#c9a84c":"#2a2a2a"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",transition:"all 0.3s",color:i<=getStep(order.status)?"#000":"#444",fontWeight:"700",zIndex:1,position:"relative"}}>
                          {i<=getStep(order.status)?"✓":i+1}
                        </div>
                        <div style={{fontSize:"9px",color:i<=getStep(order.status)?"#c9a84c":"#444",marginTop:"4px",textAlign:"center",letterSpacing:"0.5px"}}>{s}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{height:"2px",background:"#1a1a1a",borderRadius:"2px",margin:"0 12px",position:"relative",top:"-28px",zIndex:0}}>
                    <div style={{height:"100%",background:"linear-gradient(to right,#c9a84c,#e8c97a)",borderRadius:"2px",width:`${(getStep(order.status)/4)*100}%`,transition:"width 0.8s ease"}}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Coupon Input ──────────────────────────────────────────────
function CouponInput({ settings, total, onApply, applied }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const apply = ()=>{
    const coupons = settings.coupons||[];
    const c = coupons.find(x=>x.code.toUpperCase()===code.toUpperCase()&&x.active);
    if(!c){ setMsg("❌ Invalid coupon code!"); return; }
    const disc = c.type==="percent" ? Math.round(total*c.discount/100) : c.discount;
    onApply({code:c.code, discount:disc, label:`${c.code} (${c.discount}${c.type==="percent"?"%":"Rs."} off)`});
    setMsg(`✅ ${c.discount}${c.type==="percent"?"%":"Rs."} discount applied!`);
  };

  return (
    <div style={{marginBottom:"12px"}}>
      {applied?(
        <div style={{background:"#4caf7d22",border:"1px solid #4caf7d44",borderRadius:"10px",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:"12px",color:"#4caf7d",fontWeight:"700"}}>🎫 {applied.label}</span>
          <button onClick={()=>onApply(null)} style={{background:"none",border:"none",color:"#e05252",fontSize:"16px",cursor:"pointer"}}>✕</button>
        </div>
      ):(
        <div>
          <div style={{display:"flex",gap:"6px"}}>
            <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="Coupon code..." style={{flex:1,background:"#111",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"9px 12px",color:"#f0ebe0",fontSize:"12px",outline:"none",textTransform:"uppercase",letterSpacing:"2px"}}/>
            <button onClick={apply} style={{background:"#111",border:"1px solid #c9a84c44",borderRadius:"8px",padding:"9px 14px",color:"#c9a84c",cursor:"pointer",fontSize:"12px",fontWeight:"700",transition:"all 0.2s"}}>Apply</button>
          </div>
          {msg&&<div style={{fontSize:"11px",marginTop:"5px",color:msg.startsWith("✅")?"#4caf7d":"#e05252"}}>{msg}</div>}
        </div>
      )}
    </div>
  );
}

// ── Splash Screen ─────────────────────────────────────────────
function SplashScreen({ onDone, logoUrl }) {
  const [phase, setPhase] = useState(0);
  useEffect(()=>{
    const t1 = setTimeout(()=>setPhase(1), 200);
    const t2 = setTimeout(()=>setPhase(2), 900);
    const t3 = setTimeout(()=>setPhase(3), 1700);
    const t4 = setTimeout(()=>setPhase(4), 2500);
    const t5 = setTimeout(()=>onDone(), 3400);
    return ()=>[t1,t2,t3,t4,t5].forEach(clearTimeout);
  },[onDone]);

  return (
    <div style={{position:"fixed",inset:0,background:"#050505",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      {/* Spotlight */}
      <div style={{position:"absolute",width:"600px",height:"600px",background:"radial-gradient(circle,#c9a84c08,transparent 70%)",borderRadius:"50%",animation:"spotlightMove 4s ease-in-out infinite",pointerEvents:"none"}}/>

      {/* Gold particles */}
      {[...Array(16)].map((_,i)=>(
        <div key={i} style={{position:"absolute",width:`${Math.random()*2+1}px`,height:`${Math.random()*80+40}px`,background:`linear-gradient(to bottom,transparent,#c9a84c${Math.floor(Math.random()*60+20).toString(16)},transparent)`,left:`${Math.random()*100}%`,top:"-100px",animation:`particleFall ${Math.random()*3+3}s ease ${Math.random()*2}s infinite`,borderRadius:"2px"}}/>
      ))}

      {/* Horizontal lines */}
      <div style={{position:"absolute",top:"50%",left:0,right:0,height:"1px",background:"linear-gradient(to right,transparent,#c9a84c33,transparent)",transform:"translateY(-60px)",opacity:phase>=2?1:0,transition:"opacity 0.8s ease"}}/>
      <div style={{position:"absolute",top:"50%",left:0,right:0,height:"1px",background:"linear-gradient(to right,transparent,#c9a84c22,transparent)",transform:"translateY(60px)",opacity:phase>=2?1:0,transition:"opacity 0.8s ease 0.2s"}}/>

      <div style={{textAlign:"center",position:"relative",zIndex:1}}>
        {/* Logo or monogram */}
        <div style={{marginBottom:"24px",opacity:phase>=1?1:0,transform:phase>=1?"scale(1)":"scale(0.5)",transition:"all 0.8s cubic-bezier(0.34,1.56,0.64,1)"}}>
          {logoUrl
            ?<img src={logoUrl} alt={BRAND} style={{height:"80px",objectFit:"contain"}}/>
            :<div style={{width:"80px",height:"80px",border:"1px solid #c9a84c",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",background:"radial-gradient(circle,#c9a84c11,transparent)",animation:phase>=2?"glow 2s ease infinite":"none"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:"28px",fontWeight:"900",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>JF</span>
            </div>
          }
        </div>

        {/* Brand name */}
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,5vw,52px)",fontWeight:"900",letterSpacing:"8px",background:"linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",opacity:phase>=1?1:0,transform:phase>=1?"translateY(0)":"translateY(20px)",transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)",animation:phase>=3?"shimmer 2s ease infinite":"none"}}>
          {BRAND}
        </div>

        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(13px,2vw,18px)",letterSpacing:"12px",color:"#c9a84c88",marginTop:"6px",opacity:phase>=2?1:0,transition:"opacity 0.8s ease 0.2s"}}>
          {BRAND_SUB}
        </div>

        {/* Expanding line */}
        <div style={{height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",margin:"20px auto",width:phase>=2?"200px":"0",transition:"width 0.9s ease 0.3s"}}/>

        {/* Tagline */}
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(12px,1.5vw,15px)",letterSpacing:"4px",color:"#c9a84c77",fontStyle:"italic",opacity:phase>=2?1:0,transition:"opacity 0.8s ease 0.5s"}}>
          {TAGLINE}
        </div>

        {/* Loading bar */}
        <div style={{width:"160px",height:"1px",background:"#1a1a1a",margin:"28px auto 0",borderRadius:"2px",overflow:"hidden",opacity:phase>=3?1:0,transition:"opacity 0.5s"}}>
          <div style={{height:"100%",background:"linear-gradient(to right,#c9a84c,#e8c97a)",width:phase>=3?"100%":"0%",transition:"width 0.8s ease"}}/>
        </div>
      </div>

      {/* Fade out */}
      <div style={{position:"absolute",inset:0,background:"#050505",opacity:phase>=4?1:0,transition:"opacity 0.6s ease",pointerEvents:"none"}}/>
    </div>
  );
}

// ── Announcement Bar ──────────────────────────────────────────
function AnnouncementBar({ announcements }) {
  const all = [...announcements, ...announcements];
  return (
    <div style={{background:"linear-gradient(135deg,#1a1208,#2a1f0a,#1a1208)",borderBottom:"1px solid #c9a84c22",overflow:"hidden",height:"34px",display:"flex",alignItems:"center"}}>
      <div style={{display:"flex",animation:"marquee 25s linear infinite",whiteSpace:"nowrap"}}>
        {all.map((a,i)=>(
          <span key={i} style={{padding:"0 40px",fontSize:"11px",letterSpacing:"2px",color:"#c9a84c",fontFamily:"'DM Sans',sans-serif",fontWeight:"500"}}>
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────
function Navbar({ cart, wishlist, setPage, page, catFilter, setCatFilter, search, setSearch, customer, setShowLogin, settings, setShowCart, setShowSearch, showSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(()=>{
    const onScroll = ()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll", onScroll);
    return ()=>window.removeEventListener("scroll", onScroll);
  },[]);

  const totalItems = cart.reduce((a,c)=>a+c.qty,0);

  return (
    <>
      <nav style={{position:"fixed",top:"34px",left:0,right:0,zIndex:500,background:scrolled?"rgba(5,5,5,0.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid #c9a84c22":"none",transition:"all 0.4s ease"}}>
        <div style={{maxWidth:"1400px",margin:"0 auto",padding:"0 24px",height:"64px",display:"flex",alignItems:"center",gap:"20px"}}>
          {/* Logo */}
          <div onClick={()=>{setPage("home");setCatFilter("All");}} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",flexShrink:0}}>
            {settings.logoUrl
              ?<img src={settings.logoUrl} alt={BRAND} style={{height:"40px",objectFit:"contain"}}/>
              :<div style={{display:"flex",flexDirection:"column",lineHeight:"1"}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"900",letterSpacing:"3px",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{BRAND}</span>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",letterSpacing:"5px",color:"#c9a84c77"}}>{BRAND_SUB}</span>
              </div>
            }
          </div>

          {/* Category nav — desktop */}
          <div className="hide-mobile" style={{display:"flex",gap:"4px",flex:1,justifyContent:"center"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>{setCatFilter(c);setPage("shop");}} className="nav-link"
                style={{background:"none",border:"none",color:catFilter===c?"#c9a84c":"#b0a898",padding:"6px 14px",fontSize:"12px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",transition:"color 0.2s",cursor:"pointer"}}>
                {c==="All"?"All Collections":c}
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
            <button onClick={()=>setShowSearch(s=>!s)} style={{background:"none",border:"none",color:"#b0a898",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",borderRadius:"50%",transition:"all 0.2s"}} title="Search">🔍</button>
            <button onClick={()=>customer?setPage("wishlist"):setShowLogin(true)} style={{background:"none",border:"none",color:"#b0a898",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",borderRadius:"50%",position:"relative"}} title="Wishlist">
              🤍{wishlist.length>0&&<span style={{position:"absolute",top:"2px",right:"2px",background:"#c9a84c",color:"#000",borderRadius:"50%",width:"14px",height:"14px",fontSize:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800"}}>{wishlist.length}</span>}
            </button>
            <button onClick={()=>setShowCart(true)} style={{background:"none",border:"none",color:"#b0a898",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",borderRadius:"50%",position:"relative"}} title="Cart">
              🛍️{totalItems>0&&<span style={{position:"absolute",top:"2px",right:"2px",background:"#c9a84c",color:"#000",borderRadius:"50%",width:"16px",height:"16px",fontSize:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",animation:totalItems>0?"cartBounce 0.3s ease":"none"}}>{totalItems}</span>}
            </button>
            <button onClick={()=>customer?setPage("account"):setShowLogin(true)} style={{background:"none",border:"1px solid #c9a84c44",borderRadius:"20px",padding:"6px 14px",color:"#c9a84c",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",transition:"all 0.2s"}} title="Account">
              {customer?`👤 ${customer.name.split(" ")[0]}`:"LOGIN"}
            </button>
            {/* Mobile menu */}
            <button className="hide-mobile" style={{display:"none"}} onClick={()=>setMobileMenu(m=>!m)}>☰</button>
            <button onClick={()=>setMobileMenu(m=>!m)} style={{display:"none",background:"none",border:"none",color:"#b0a898",fontSize:"22px",padding:"4px"}} className="show-mobile">☰</button>
          </div>
        </div>

        {/* Search bar */}
        {showSearch&&(
          <div style={{background:"rgba(5,5,5,0.98)",borderTop:"1px solid #c9a84c22",padding:"12px 24px"}}>
            <div style={{maxWidth:"600px",margin:"0 auto",position:"relative"}}>
              <span style={{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#c9a84c88",fontSize:"16px"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} autoFocus placeholder="Search products, colors, fabrics..." style={{width:"100%",background:"#111",border:"1px solid #c9a84c33",borderRadius:"30px",padding:"12px 16px 12px 44px",color:"#f0ebe0",fontSize:"14px",outline:"none"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:"16px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#777",fontSize:"18px",cursor:"pointer"}}>✕</button>}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenu&&(
          <div style={{background:"rgba(5,5,5,0.98)",borderTop:"1px solid #c9a84c22",padding:"12px 0"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>{setCatFilter(c);setPage("shop");setMobileMenu(false);}} style={{display:"block",width:"100%",background:"none",border:"none",color:catFilter===c?"#c9a84c":"#b0a898",padding:"12px 24px",fontSize:"13px",fontWeight:"600",textAlign:"left",letterSpacing:"1px",textTransform:"uppercase"}}>
                {c==="All"?"All Collections":c}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Category pills below nav on mobile */}
      <div style={{height:"98px"}}/>
    </>
  );
}

// ── Hero Section ──────────────────────────────────────────────
function Hero({ settings, setCatFilter, setPage }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{ setTimeout(()=>setLoaded(true), 100); },[]);

  return (
    <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#050505"}}>
      {/* Animated background */}
      <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%,#c9a84c08 0%,transparent 60%),radial-gradient(ellipse at 70% 50%,#8b6914 0 05 0%,transparent 60%)"}}/>
        {/* Animated lines */}
        {[15,30,45,60,75,90].map(y=>(
          <div key={y} style={{position:"absolute",left:0,right:0,top:`${y}%`,height:"1px",background:"linear-gradient(to right,transparent,#c9a84c08,transparent)",animation:`shimmer ${2+y*0.03}s ease-in-out infinite`}}/>
        ))}
        {/* Corner decorations */}
        <div style={{position:"absolute",top:"80px",left:"40px",width:"120px",height:"120px",border:"1px solid #c9a84c22",borderRadius:"2px",animation:"rotate 20s linear infinite",opacity:0.4}}/>
        <div style={{position:"absolute",bottom:"80px",right:"40px",width:"80px",height:"80px",border:"1px solid #c9a84c22",borderRadius:"2px",animation:"rotate 15s linear infinite reverse",opacity:0.3}}/>
      </div>

      {/* Hero background image */}
      {settings.heroBg&&<div style={{position:"absolute",inset:0,backgroundImage:`url(${settings.heroBg})`,backgroundSize:"cover",backgroundPosition:"center",opacity:0.15,animation:"zoomIn 20s ease infinite alternate"}}/>}

      {/* Content */}
      <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"0 24px",maxWidth:"900px",margin:"0 auto"}}>
        <div className={`animate-fadeIn`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(12px,1.5vw,14px)",letterSpacing:"6px",color:"#c9a84c88",marginBottom:"20px",fontStyle:"italic",opacity:loaded?1:0,transition:"opacity 0.8s ease"}}>
          ✦ PREMIUM PAKISTANI COLLECTION ✦
        </div>

        <h1 className="animate-fadeUp delay-1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,6vw,80px)",fontWeight:"900",lineHeight:"1.1",marginBottom:"24px",opacity:loaded?1:0,transition:"opacity 0.8s 0.2s"}}>
          <span className="gold-text">
            <RotatingText texts={settings.heroTexts||[settings.heroTitle||"Where Elegance Meets Pakistani Heritage"]}/>
          </span>
        </h1>

        <p className="animate-fadeUp delay-2" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,2vw,22px)",color:"#b0a898",lineHeight:"1.7",marginBottom:"40px",fontStyle:"italic",maxWidth:"650px",margin:"0 auto 40px",opacity:loaded?1:0,transition:"opacity 0.8s 0.4s"}}>
          {settings.heroSubtitle}
        </p>

        <div className="animate-fadeUp delay-3" style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap",opacity:loaded?1:0,transition:"opacity 0.8s 0.6s"}}>
          <button onClick={()=>{setCatFilter("All");setPage("shop");}} className="btn-gold" style={{borderRadius:"30px",padding:"14px 36px",fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase"}}>
            Explore Collection
          </button>
          <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent("Assalam o Alaikum! I'd like to see your latest collection.")}`} target="_blank" rel="noreferrer" className="btn-outline" style={{borderRadius:"30px",padding:"14px 36px",fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",display:"inline-block"}}>
            📱 WhatsApp Us
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fadeUp delay-5" style={{display:"flex",justifyContent:"center",gap:"clamp(20px,5vw,60px)",marginTop:"64px",opacity:loaded?1:0,transition:"opacity 0.8s 0.8s",flexWrap:"wrap"}}>
          {[["100%","Exclusive"],["1+","Each Unique"],["✓","Trusted Quality"],["⚡","Fast Delivery"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,3vw,28px)",fontWeight:"700",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
              <div style={{fontSize:"11px",color:"#666",letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{position:"absolute",bottom:"32px",left:"50%",transform:"translateX(-50%)",animation:"float 2s ease infinite"}}>
        <div style={{width:"24px",height:"40px",border:"1px solid #c9a84c44",borderRadius:"12px",display:"flex",justifyContent:"center",paddingTop:"6px"}}>
          <div style={{width:"4px",height:"8px",background:"#c9a84c",borderRadius:"2px",animation:"float 1.5s ease infinite"}}/>
        </div>
      </div>
    </section>
  );
}

// ── Product Card ──────────────────────────────────────────────
function ProductCard({ product, onView, onAddCart, wishlist, toggleWish, index }) {
  const [ref, inView] = useInView(0.1);
  const photos = [product.photo_url,product.photo_url2].filter(Boolean);
  const fallback = `https://placehold.co/400x520/111111/c9a84c?text=${encodeURIComponent(product.name?.slice(0,12)||"Product")}`;
  const img1 = photos[0]||fallback;
  const img2 = photos[1]||img1;
  const [hovered, setHovered] = useState(false);
  const wished = wishlist.includes(product.id);
  const hasDiscount = product.offerPrice && product.offerPrice < product.salePrice;

  return (
    <div ref={ref} className="prod-card" style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(32px)",transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${index*0.08}s`}}>
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{background:"#0f0f0f",borderRadius:"16px",overflow:"hidden",border:`1px solid ${hovered?"#c9a84c44":"#1a1a1a"}`,boxShadow:hovered?"0 24px 64px rgba(201,168,76,0.12)":"none",transition:"all 0.4s"}}>
        {/* Image */}
        <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",cursor:"pointer"}} onClick={()=>onView(product)}>
          <img src={hovered?img2:img1} alt={product.name} className="prod-img" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src=fallback}/>

          {/* Overlay */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)",opacity:hovered?1:0,transition:"opacity 0.3s"}}/>

          {/* Badges */}
          <div style={{position:"absolute",top:"12px",left:"12px",display:"flex",flexDirection:"column",gap:"5px"}}>
            {product.is_new_arrival&&<span style={{background:"linear-gradient(135deg,#c9a84c,#e8c97a)",color:"#000",padding:"3px 10px",borderRadius:"20px",fontSize:"9px",fontWeight:"800",letterSpacing:"1px"}}>NEW</span>}
            {hasDiscount&&<span style={{background:"#e05252",color:"#fff",padding:"3px 10px",borderRadius:"20px",fontSize:"9px",fontWeight:"800"}}>SALE</span>}
            {product.stock===1&&product.stock>0&&<span style={{background:"#e0a052",color:"#fff",padding:"3px 10px",borderRadius:"20px",fontSize:"9px",fontWeight:"800"}}>LAST 1!</span>}
          </div>

          {product.stock<=0&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:"14px",fontWeight:"900",letterSpacing:"3px",border:"1px solid #fff",padding:"6px 18px",borderRadius:"4px"}}>SOLD OUT</span></div>}

          {/* Wishlist */}
          <button onClick={e=>{e.stopPropagation();toggleWish(product.id);}} style={{position:"absolute",top:"12px",right:"12px",background:wished?"#c9a84c":"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",width:"34px",height:"34px",cursor:"pointer",fontSize:"14px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",backdropFilter:"blur(8px)"}}>
            {wished?"❤️":"🤍"}
          </button>

          {/* Quick add */}
          {hovered&&product.stock>0&&(
            <button onClick={e=>{e.stopPropagation();onAddCart(product);}} className="btn-gold" style={{position:"absolute",bottom:"12px",left:"12px",right:"12px",borderRadius:"8px",padding:"10px",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",animation:"fadeUp 0.2s ease both"}}>
              + Add to Cart
            </button>
          )}

          {/* Views */}
          <div style={{position:"absolute",bottom:"12px",left:"12px",background:"rgba(0,0,0,0.6)",color:"#ccc",padding:"2px 8px",borderRadius:"20px",fontSize:"10px",backdropFilter:"blur(4px)",opacity:hovered?0:1,transition:"opacity 0.2s"}}>
            👁 {product.views||0}
          </div>
        </div>

        {/* Info */}
        <div style={{padding:"14px 16px 16px"}}>
          <div style={{fontSize:"9px",color:"#c9a84c88",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"5px"}}>{product.category}</div>
          <div onClick={()=>onView(product)} style={{fontFamily:"'Playfair Display',serif",fontWeight:"700",fontSize:"15px",color:"#f0ebe0",marginBottom:"4px",lineHeight:"1.3",cursor:"pointer"}}>{product.name}</div>
          <div style={{fontSize:"11px",color:"#666",marginBottom:"8px"}}>
            <span>{product.color} · {product.fabric_type||product.fabric}</span>
            {product.size_type==="stitched"&&(product.available_sizes||[]).length>0&&(
              <div style={{marginTop:"5px",display:"flex",gap:"3px",flexWrap:"wrap"}}>
                {(product.available_sizes||[]).map(sz=><span key={sz} style={{background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:"4px",padding:"2px 6px",fontSize:"9px",color:"#c9a84c",fontWeight:"700"}}>{sz}</span>)}
              </div>
            )}
            {(product.size_type==="meter"||product.size_type==="gaz")&&product.stock>0&&<div style={{marginTop:"3px",fontSize:"10px",color:"#c9a84c88"}}>{product.stock} {product.size_type} available</div>}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
            <div>
              {hasDiscount?(
                <>
                  <div style={{fontSize:"11px",color:"#555",textDecoration:"line-through"}}>{pkr(product.salePrice)}</div>
                  <div style={{fontSize:"18px",fontWeight:"800",color:"#e8c97a"}}>{pkr(product.offerPrice)}</div>
                </>
              ):(
                <div style={{fontSize:"18px",fontWeight:"800",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{pkr(product.salePrice)}</div>
              )}
            </div>
            {product.stock>0
              ?<button onClick={()=>onAddCart(product)} className="btn-gold" style={{borderRadius:"8px",padding:"8px 14px",fontSize:"11px",letterSpacing:"1px"}}>ADD</button>
              :<span style={{fontSize:"11px",color:"#555",letterSpacing:"1px"}}>SOLD OUT</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product Modal ─────────────────────────────────────────────
function ProductModal({ product, T, onClose, wishlist, toggleWish, onAddCart, reviews, onAddReview, settings }) {
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("details");
  const [rv, setRv] = useState({name:"",rating:5,comment:""});
  const photos = [product.photo_url,product.photo_url2,product.photo_url3,product.photo_url4,product.photo_url5].filter(Boolean);
  const fallback = `https://placehold.co/600x750/111/c9a84c?text=${encodeURIComponent(product.name?.slice(0,12)||"")}`;
  const imgs = photos.length?photos:[fallback];
  const wished = wishlist.includes(product.id);
  const hasDiscount = product.offerPrice&&product.offerPrice<product.salePrice;
  const prodReviews = reviews.filter(r=>r.product_id===product.id);
  const avg = prodReviews.length?Math.round(prodReviews.reduce((a,r)=>a+r.rating,0)/prodReviews.length):5;
  const waText = `Assalam o Alaikum! 👋\n\nI'm interested in:\n*${product.name}*\n\n💰 Price: ${pkr(hasDiscount?product.offerPrice:product.salePrice)}\n🎨 Color: ${product.color}\n🧵 Fabric: ${product.fabric_type||product.fabric}\n📦 Category: ${product.category}\n\nIs this still available? Please confirm. Thank you!`;

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(12px)",animation:"fadeIn 0.3s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0a0a0a",borderRadius:"20px",width:"100%",maxWidth:"940px",maxHeight:"92vh",overflow:"auto",border:"1px solid #c9a84c22",boxShadow:"0 40px 120px rgba(201,168,76,0.15)",animation:"scaleIn 0.3s ease"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}} className="grid-1-mobile">
          {/* Images */}
          <div style={{padding:"24px",borderRight:"1px solid #1a1a1a"}}>
            <div style={{position:"relative",borderRadius:"14px",overflow:"hidden",aspectRatio:"3/4",background:"#111",marginBottom:"10px"}}>
              <img src={imgs[activeImg]} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"opacity 0.3s"}} onError={e=>e.target.src=fallback}/>
              {product.is_new_arrival&&<div style={{position:"absolute",top:"12px",left:"12px",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",color:"#000",padding:"4px 12px",borderRadius:"20px",fontSize:"10px",fontWeight:"800"}}>NEW ARRIVAL</div>}
              {product.stock<=0&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:"18px",fontWeight:"900",letterSpacing:"3px",border:"1px solid #fff",padding:"8px 20px",borderRadius:"4px"}}>SOLD OUT</span></div>}
            </div>
            {imgs.length>1&&<div style={{display:"flex",gap:"6px"}}>
              {imgs.map((im,i)=><div key={i} onClick={()=>setActiveImg(i)} style={{width:"58px",height:"70px",borderRadius:"8px",overflow:"hidden",cursor:"pointer",border:`2px solid ${activeImg===i?"#c9a84c":"#1a1a1a"}`,transition:"border 0.2s",flexShrink:0}}>
                <img src={im} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src=fallback}/>
              </div>)}
            </div>}
          </div>

          {/* Details */}
          <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:"10px",color:"#c9a84c88",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"6px"}}>{product.category}</div>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,2.5vw,24px)",fontWeight:"700",color:"#f0ebe0",lineHeight:"1.2"}}>{product.name}</h2>
              </div>
              <div style={{display:"flex",gap:"6px"}}>
                <button onClick={()=>toggleWish(product.id)} style={{background:"none",border:"1px solid #1a1a1a",borderRadius:"50%",width:"38px",height:"38px",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>{wished?"❤️":"🤍"}</button>
                <button onClick={onClose} style={{background:"none",border:"1px solid #1a1a1a",borderRadius:"50%",width:"38px",height:"38px",cursor:"pointer",color:"#666",fontSize:"18px",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            </div>

            {/* Rating */}
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{display:"flex",gap:"2px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=avg?"#c9a84c":"#222",fontSize:"14px"}}>★</span>)}</div>
              <span style={{fontSize:"12px",color:"#555"}}>({prodReviews.length} reviews)</span>
              <span style={{marginLeft:"auto",fontSize:"10px",color:"#555"}}>👁 {product.views||0} views</span>
            </div>

            {/* Price */}
            <div style={{background:"#111",borderRadius:"12px",padding:"14px",border:"1px solid #1a1a1a"}}>
              {hasDiscount?(
                <div style={{display:"flex",gap:"12px",alignItems:"baseline"}}>
                  <span style={{fontSize:"26px",fontWeight:"900",color:"#e8c97a"}}>{pkr(product.offerPrice)}</span>
                  <span style={{fontSize:"16px",color:"#444",textDecoration:"line-through"}}>{pkr(product.salePrice)}</span>
                  <span style={{background:"#e05252",color:"#fff",padding:"2px 8px",borderRadius:"20px",fontSize:"10px",fontWeight:"700"}}>SALE</span>
                </div>
              ):(
                <span style={{fontSize:"26px",fontWeight:"900",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{pkr(product.salePrice)}</span>
              )}
              <div style={{fontSize:"12px",color:"#555",marginTop:"4px"}}>
                {product.stock>0?`✅ Available${product.stock===1?" — Last piece!":""}` :"❌ Sold Out"}
              </div>
            </div>

            {/* Tabs */}
            <div style={{display:"flex",gap:"3px",background:"#0f0f0f",padding:"4px",borderRadius:"10px",border:"1px solid #1a1a1a"}}>
              {["details","specs","reviews"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"7px",borderRadius:"8px",border:"none",cursor:"pointer",background:tab===t?"#c9a84c":"transparent",color:tab===t?"#000":"#666",fontWeight:"700",fontSize:"11px",textTransform:"capitalize",transition:"all 0.2s"}}>
                  {t==="reviews"?`Reviews (${prodReviews.length})`:t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{fontSize:"13px",color:"#b0a898",lineHeight:"1.8",minHeight:"80px",flex:1,overflowY:"auto"}}>
              {tab==="details"&&<p>{product.description||"Premium quality exclusive fabric from Jameel Fabrics Kunjah. Each piece is unique — once sold, it's gone forever. Experience the finest Pakistani craftsmanship."}</p>}
              {tab==="specs"&&<div>{[["Brand",product.brand],["Color",product.color],["Fabric",product.fabric_type||product.fabric],["Category",product.category],["Rack",product.rack],["Washing",product.washing_instructions||"Dry clean recommended"],["Size Guide",product.size_guide||"Standard sizes"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #111"}}>
                  <span style={{color:"#555",fontWeight:"600",fontSize:"12px"}}>{k}</span>
                  <span style={{color:"#f0ebe0",fontWeight:"500",textAlign:"right",fontSize:"12px"}}>{v||"—"}</span>
                </div>
              ))}</div>}
              {tab==="reviews"&&<div>
                {prodReviews.map(r=>(
                  <div key={r.id} style={{background:"#111",borderRadius:"10px",padding:"10px",marginBottom:"8px",border:"1px solid #1a1a1a"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                      <span style={{fontWeight:"700",fontSize:"12px",color:"#f0ebe0"}}>{r.customer_name}{r.verified&&<span style={{color:"#c9a84c",fontSize:"10px",marginLeft:"6px"}}>✓ Verified</span>}</span>
                      <div style={{display:"flex",gap:"1px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=r.rating?"#c9a84c":"#222",fontSize:"11px"}}>★</span>)}</div>
                    </div>
                    <p style={{fontSize:"12px",color:"#777"}}>{r.comment}</p>
                  </div>
                ))}
                {!prodReviews.length&&<p style={{color:"#555",textAlign:"center",padding:"20px"}}>No reviews yet</p>}
                <div style={{background:"#111",borderRadius:"10px",padding:"12px",marginTop:"8px",border:"1px solid #1a1a1a"}}>
                  <p style={{fontSize:"12px",color:"#c9a84c",fontWeight:"700",marginBottom:"8px"}}>Write a Review</p>
                  <input value={rv.name} onChange={e=>setRv({...rv,name:e.target.value})} placeholder="Your name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"6px",padding:"7px 10px",color:"#f0ebe0",fontSize:"12px",marginBottom:"6px"}}/>
                  <div style={{display:"flex",gap:"4px",marginBottom:"6px"}}>{[1,2,3,4,5].map(i=><span key={i} onClick={()=>setRv({...rv,rating:i})} style={{fontSize:"22px",cursor:"pointer",color:i<=rv.rating?"#c9a84c":"#222",transition:"color 0.1s"}}>★</span>)}</div>
                  <textarea value={rv.comment} onChange={e=>setRv({...rv,comment:e.target.value})} placeholder="Share your experience..." style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"6px",padding:"7px 10px",color:"#f0ebe0",fontSize:"12px",height:"55px",resize:"none",marginBottom:"8px"}}/>
                  <button onClick={()=>{if(rv.name&&rv.comment){onAddReview({...rv,product_id:product.id,product_name:product.name,id:gid(),date:new Date().toLocaleDateString(),verified:false});setRv({name:"",rating:5,comment:""});}}} className="btn-gold" style={{borderRadius:"8px",padding:"7px 16px",fontSize:"11px",letterSpacing:"1px"}}>Submit ✓</button>
                </div>
              </div>}
            </div>

            {/* CTA Buttons */}
            {product.stock>0?(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"auto"}}>
                <button onClick={()=>{onAddCart(product);onClose();}} className="btn-gold" style={{borderRadius:"12px",padding:"13px",fontSize:"12px",letterSpacing:"1px",textTransform:"uppercase"}}>🛍️ Add to Cart</button>
                <a href={`https://wa.me/${settings.whatsapp||WA_NUM}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#25D366",color:"#fff",borderRadius:"12px",padding:"13px",fontWeight:"700",fontSize:"12px",letterSpacing:"1px",textTransform:"uppercase"}}>
                  📱 Enquire
                </a>
              </div>
            ):(
              <a href={`https://wa.me/${settings.whatsapp||WA_NUM}?text=${encodeURIComponent(`Assalam! "${product.name}" is sold out. Do you have something similar?`)}`} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"#25D366",color:"#fff",borderRadius:"12px",padding:"13px",fontWeight:"700",fontSize:"13px",textDecoration:"none",marginTop:"auto"}}>
                📱 Ask for Similar Item
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cart Sidebar ──────────────────────────────────────────────
function CartSidebar({ cart, setCart, onClose, customer, setShowLogin, setShowCheckout, settings, coupon, setCoupon }) {
  const subtotal = cart.reduce((a,c)=>a+c.price*c.qty,0);
  const total = coupon ? Math.max(0, subtotal - coupon.discount) : subtotal;
  const updateQty = (id,qty)=>{ if(qty<1){setCart(c=>c.filter(x=>x.id!==id));}else{setCart(c=>c.map(x=>x.id===id?{...x,qty}:x));} };

  return (
    <div style={{position:"fixed",inset:0,zIndex:900}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)"}}/>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:"min(420px,100vw)",background:"#0a0a0a",borderLeft:"1px solid #c9a84c22",display:"flex",flexDirection:"column",animation:"slideLeft 0.3s ease"}}>
        <div style={{padding:"20px 24px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"700",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Your Cart ({cart.length})</div>
          <button onClick={onClose} style={{background:"none",border:"1px solid #1a1a1a",borderRadius:"50%",width:"34px",height:"34px",color:"#666",fontSize:"18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          {cart.length===0&&(
            <div style={{textAlign:"center",padding:"60px 20px",color:"#444"}}>
              <div style={{fontSize:"48px",marginBottom:"16px"}}>🛍️</div>
              <div style={{fontSize:"16px",fontFamily:"'Playfair Display',serif",marginBottom:"8px",color:"#f0ebe0"}}>Your cart is empty</div>
              <p style={{fontSize:"13px"}}>Add some beautiful pieces to get started</p>
            </div>
          )}
          {cart.map(item=>{
            const fallback=`https://placehold.co/80x100/111/c9a84c?text=${encodeURIComponent(item.name?.slice(0,6)||"")}`;
            return(
              <div key={item.id} style={{display:"flex",gap:"12px",padding:"12px 0",borderBottom:"1px solid #0f0f0f"}}>
                <img src={item.photo||fallback} alt={item.name} style={{width:"70px",height:"88px",objectFit:"cover",borderRadius:"8px",flexShrink:0}} onError={e=>e.target.src=fallback}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontWeight:"600",color:"#f0ebe0",marginBottom:"3px",lineHeight:"1.3"}}>{item.name}</div>
                  <div style={{fontSize:"11px",color:"#555",marginBottom:"8px"}}>{item.color}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",background:"#111",borderRadius:"20px",padding:"3px 10px",border:"1px solid #1a1a1a"}}>
                      <button onClick={()=>updateQty(item.id,item.qty-1)} style={{background:"none",border:"none",color:"#c9a84c",fontSize:"16px",cursor:"pointer",width:"18px",lineHeight:"1"}}>−</button>
                      <span style={{color:"#f0ebe0",fontSize:"13px",fontWeight:"700",minWidth:"16px",textAlign:"center"}}>{item.qty}</span>
                      <button onClick={()=>updateQty(item.id,item.qty+1)} style={{background:"none",border:"none",color:"#c9a84c",fontSize:"16px",cursor:"pointer",width:"18px",lineHeight:"1"}}>+</button>
                    </div>
                    <span style={{fontWeight:"800",color:"#c9a84c",fontSize:"14px"}}>{pkr(item.price*item.qty)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cart.length>0&&(
          <div style={{padding:"16px 24px",borderTop:"1px solid #1a1a1a"}}>
            <CouponInput settings={settings} total={subtotal} onApply={setCoupon} applied={coupon}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:"#777",marginBottom:"6px"}}><span>Subtotal</span><span>{pkr(subtotal)}</span></div>
            {coupon&&<div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:"#4caf7d",marginBottom:"6px"}}><span>🎫 {coupon.code}</span><span>- Rs.{coupon.discount.toLocaleString()}</span></div>}
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"14px",padding:"10px 0",borderTop:"1px solid #0f0f0f"}}>
              <span style={{color:"#888",fontSize:"14px"}}>Total</span>
              <span style={{fontWeight:"900",fontSize:"20px",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{pkr(total)}</span>
            </div>
            <button onClick={()=>{customer?setShowCheckout(true):setShowLogin(true);}} className="btn-gold" style={{width:"100%",borderRadius:"12px",padding:"14px",fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"8px"}}>
              Checkout via WhatsApp
            </button>
            <button onClick={()=>setCart([])} style={{width:"100%",background:"none",border:"1px solid #1a1a1a",borderRadius:"12px",padding:"10px",color:"#555",fontSize:"12px",cursor:"pointer"}}>Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Checkout Modal ────────────────────────────────────────────
function CheckoutModal({ cart, customer, onClose, settings, coupon }) {
  const subtotal = cart.reduce((a,c)=>a+c.price*c.qty,0);
  const total = coupon ? Math.max(0, subtotal - coupon.discount) : subtotal;
  const orderText = [
    `🛍️ *NEW ORDER — JAMEEL FABRICS KUNJAH*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Customer Details*`,
    `Name: ${customer?.name}`,
    `Phone: ${customer?.phone}`,
    `City: ${customer?.city}`,
    `Address: ${customer?.address}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📦 *Order Items*`,
    ...cart.map((item,i)=>`${i+1}. ${item.name}\n   ${item.color} | Qty: ${item.qty} | ${pkr(item.price*item.qty)}`),
    `━━━━━━━━━━━━━━━━━━━━`,
    coupon?`🎫 Coupon: ${coupon.code} (-Rs.${coupon.discount.toLocaleString()})`:"",
    `💰 *Total: ${pkr(total)}*`,
    `💳 Payment: Cash on Delivery`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Order Date: ${new Date().toLocaleString()}`,
    `Please confirm this order. Thank you! 🙏`,
  ].filter(Boolean).join("\n");

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(12px)"}}>
      <div style={{background:"#0a0a0a",borderRadius:"20px",width:"100%",maxWidth:"480px",border:"1px solid #c9a84c22",overflow:"hidden",animation:"scaleIn 0.3s ease"}}>
        <div style={{padding:"20px 24px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(135deg,#1a1208,#0a0a0a)"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"700",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Order Summary</div>
          <button onClick={onClose} style={{background:"none",border:"1px solid #1a1a1a",borderRadius:"50%",width:"32px",height:"32px",color:"#666",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"20px 24px",maxHeight:"50vh",overflowY:"auto"}}>
          {cart.map(item=>(
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #0f0f0f",fontSize:"13px"}}>
              <div><div style={{color:"#f0ebe0",fontWeight:"600"}}>{item.name}</div><div style={{color:"#555",fontSize:"11px"}}>{item.color} × {item.qty}</div></div>
              <span style={{color:"#c9a84c",fontWeight:"700"}}>{pkr(item.price*item.qty)}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"14px 0",fontWeight:"900"}}>
            <span style={{color:"#888"}}>Total</span>
            <span style={{fontSize:"20px",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{pkr(total)}</span>
          </div>
        </div>
        <div style={{padding:"16px 24px",borderTop:"1px solid #1a1a1a"}}>
          <a href={`https://wa.me/${settings.whatsapp||WA_NUM}?text=${encodeURIComponent(orderText)}`} target="_blank" rel="noreferrer"
            onClick={async()=>{
              // Save order to Supabase
              if(supabase){
                for(const item of cart){
                  await supabase.from("online_orders").insert({
                    id:gid(), product_id:item.id, product_name:item.name,
                    product_price:coupon?Math.round(item.price*(1-((coupon.discount/cart.reduce((a,c)=>a+c.price*c.qty,0)))*item.qty)):item.price,
                    customer_name:customer.name, phone:customer.phone,
                    city:customer.city, address:customer.address,
                    message:`Coupon:${coupon?.code||"None"} | Total:${total}`,
                    status:"Pending", date:new Date().toLocaleDateString(),
                  });
                }
              }
            }}
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",background:"#25D366",color:"#fff",borderRadius:"12px",padding:"14px",fontWeight:"700",fontSize:"14px",textDecoration:"none",letterSpacing:"1px"}}>
            📱 Confirm Order on WhatsApp
          </a>
          <p style={{fontSize:"11px",color:"#444",textAlign:"center",marginTop:"10px",lineHeight:"1.6"}}>Order saved automatically · Payment on delivery</p>
        </div>
      </div>
    </div>
  );
}

// ── Login Modal ───────────────────────────────────────────────
function LoginModal({ onClose, onLogin }) {
  const [fm, setFm] = useState({name:"",phone:"",city:"",address:""});
  const save = ()=>{ if(!fm.name||!fm.phone)return alert("Name and phone required!"); LS.set("customer",fm); onLogin(fm); onClose(); };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:1200,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(12px)"}}>
      <div style={{background:"#0a0a0a",borderRadius:"20px",width:"100%",maxWidth:"400px",border:"1px solid #c9a84c22",overflow:"hidden",animation:"scaleIn 0.3s ease"}}>
        <div style={{padding:"28px 28px 0",textAlign:"center"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:"700",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"6px"}}>Welcome</div>
          <p style={{fontSize:"13px",color:"#555",marginBottom:"24px"}}>Enter your details to continue shopping</p>
        </div>
        <div style={{padding:"0 28px 28px",display:"flex",flexDirection:"column",gap:"12px"}}>
          {[["Full Name *","name","text"],["Phone Number *","phone","tel"],["City","city","text"],["Address","address","text"]].map(([l,k,t])=>(
            <div key={k}>
              <label style={{fontSize:"11px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",display:"block",marginBottom:"5px"}}>{l}</label>
              <input type={t} value={fm[k]} onChange={e=>setFm({...fm,[k]:e.target.value})} placeholder={l} style={{width:"100%",background:"#111",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"11px 14px",color:"#f0ebe0",fontSize:"13px",outline:"none",transition:"border 0.2s"}} onFocus={e=>e.target.style.border="1px solid #c9a84c44"} onBlur={e=>e.target.style.border="1px solid #1a1a1a"}/>
            </div>
          ))}
          <button onClick={save} className="btn-gold" style={{borderRadius:"12px",padding:"13px",fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px"}}>Continue Shopping →</button>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#444",fontSize:"12px",cursor:"pointer",padding:"4px"}}>Skip for now</button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Panel ───────────────────────────────────────────────
function AdminPanel({ products, setProducts, reviews, settings, setSettings, onClose }) {
  const [tab, setTab] = useState("pending");
  const [editProd, setEditProd] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sEdit, setSEdit] = useState({...settings});
  const [pwForm, setPwForm] = useState({old:"",nw:"",cf:""});
  const [alerts, setAlerts] = useState([]);
  const [allProds, setAllProds] = useState([]);
  const [loadingProds, setLoadingProds] = useState(true);

  // Load alerts + all products from Supabase
  useEffect(()=>{
    if(!supabase){setLoadingProds(false);return;}
    // Load alerts
    supabase.from("website_alerts").select("*").order("created_at",{ascending:false}).then(({data})=>setAlerts(data||[]));
    // Load ALL products (including pending)
    supabase.from("products").select("*").order("created_at",{ascending:false}).then(({data})=>{
      if(data?.length) setAllProds(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,available_sizes:tryParse(r.available_sizes,[])})));
      setLoadingProds(false);
    });
    // Real-time alerts
    const ch = supabase.channel("admin-alerts")
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"website_alerts"},({new:n})=>{
        setAlerts(a=>[n,...a]);
      })
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"products"},()=>{
        supabase.from("products").select("*").order("created_at",{ascending:false}).then(({data})=>{
          if(data?.length) setAllProds(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,available_sizes:tryParse(r.available_sizes,[])})));
        });
      })
      .subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);

  const tryParse=(v,def)=>{ try{return v?JSON.parse(v):def;}catch{return def;} };

  const unreadAlerts = alerts.filter(a=>!a.is_read);

  const updateWebsiteStatus = async(prodId, status)=>{
    setAllProds(p=>p.map(x=>x.id===prodId?{...x,website_status:status}:x));
    setProducts(p=>p.map(x=>x.id===prodId?{...x,website_status:status}:x));
    if(supabase) await supabase.from("products").update({website_status:status}).eq("id",prodId);
  };

  const markAlertRead = async(id, action)=>{
    setAlerts(a=>a.map(x=>x.id===id?{...x,is_read:true,action_taken:action}:x));
    if(supabase) await supabase.from("website_alerts").update({is_read:true,action_taken:action}).eq("id",id);
  };

  const handleAlertAction = async(alert, action)=>{
    if(action==="sold_out") await updateWebsiteStatus(alert.product_id, "sold_out");
    if(action==="remove") await updateWebsiteStatus(alert.product_id, "hidden");
    if(action==="waiting") await updateWebsiteStatus(alert.product_id, "waiting_stock");
    await markAlertRead(alert.id, action);
  };

  const uploadImg = async(file, field)=>{
    if(!supabase||!file||!editProd)return;
    setUploading(true);
    const ext=file.name.split(".").pop();
    const path=`${editProd.id}/${field}-${Date.now()}.${ext}`;
    const{error}=await supabase.storage.from("product-images").upload(path,file,{upsert:true});
    if(!error){const{data:u}=supabase.storage.from("product-images").getPublicUrl(path);setEditProd(p=>({...p,[field]:u.publicUrl}));}
    setUploading(false);
  };

  const saveProd = async()=>{
    if(!editProd)return;
    setAllProds(p=>p.map(x=>x.id===editProd.id?editProd:x));
    setProducts(p=>p.map(x=>x.id===editProd.id?{...x,...editProd}:x));
    if(supabase) await supabase.from("products").upsert({
      id:editProd.id,name:editProd.name,brand:editProd.brand,color:editProd.color,
      fabric:editProd.fabric,category:editProd.category,rack:editProd.rack,
      stock:editProd.stock,sale_price:editProd.salePrice,cost_price:editProd.costPrice,
      offer_price:editProd.offerPrice,qty_type:editProd.qtyType,barcode:editProd.barcode,
      bonus:editProd.bonus,description:editProd.description||editProd.website_description,
      fabric_type:editProd.fabric_type,washing_instructions:editProd.washing_instructions,
      size_guide:editProd.size_guide,is_new_arrival:editProd.is_new_arrival,
      is_active:editProd.is_active,views:editProd.views||0,
      website_status:editProd.website_status||"pending",
      website_title:editProd.website_title,
      website_description:editProd.website_description,
      website_category:editProd.website_category,
      size_type:editProd.size_type,
      available_sizes:JSON.stringify(editProd.available_sizes||[]),
      photo_url:editProd.photo_url,photo_url2:editProd.photo_url2,
      photo_url3:editProd.photo_url3,photo_url4:editProd.photo_url4,
      photo_url5:editProd.photo_url5,
    });
    setEditProd(null);
    alert("✅ Product saved!");
  };

  const saveSettings = ()=>{ setSettings(sEdit); LS.set("shopSettings",sEdit); alert("✅ Saved!"); };
  const changePassword = ()=>{
    const saved=LS.get("adminPass",ADMIN_PASS);
    if(pwForm.old!==saved)return alert("❌ Current password wrong!");
    if(!pwForm.nw||pwForm.nw.length<6)return alert("Min 6 characters!");
    if(pwForm.nw!==pwForm.cf)return alert("❌ Passwords don't match!");
    LS.set("adminPass",pwForm.nw);setPwForm({old:"",nw:"",cf:""});alert("✅ Password changed!");
  };

  const inp=(label,field,type="text",isSettings=false)=>{
    const obj=isSettings?sEdit:editProd;
    const setter=isSettings?(v)=>setSEdit(s=>({...s,[field]:v})):(v)=>setEditProd(p=>({...p,[field]:v}));
    return(
      <div key={field} style={{marginBottom:"10px"}}>
        <label style={{fontSize:"10px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",display:"block",marginBottom:"4px"}}>{label}</label>
        {type==="textarea"
          ?<textarea value={obj?.[field]||""} onChange={e=>setter(e.target.value)} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px",height:"90px",resize:"vertical"}}/>
          :<input type={type} value={obj?.[field]||""} onChange={e=>setter(type==="number"?+e.target.value:e.target.value)} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px"}}/>
        }
      </div>
    );
  };

  const STATUS_C = {pending:"#c9a84c",listed:"#4caf7d",sold_out:"#e05252",hidden:"#555",waiting_stock:"#e0a052"};
  const STATUS_L = {pending:"⏳ Pending",listed:"✅ Listed",sold_out:"❌ Sold Out",hidden:"🙈 Hidden",waiting_stock:"⏳ Waiting Stock"};

  const pendingProds = allProds.filter(p=>p.website_status==="pending"||!p.website_status);
  const listedProds = allProds.filter(p=>p.website_status==="listed");
  const alertProds = allProds.filter(p=>p.website_status==="sold_out"||p.website_status==="waiting_stock");

  const WEBSITE_CATS = ["Men's Unstitched","Women Unstitched","Women Stitched","Kids","Other"];

  const TABS = [
    {k:"pending",l:`⏳ Pending (${pendingProds.length})`},
    {k:"alerts",l:`🔔 Alerts ${unreadAlerts.length>0?`(${unreadAlerts.length})`:""}`,badge:unreadAlerts.length},
    {k:"listed",l:`✅ Listed (${listedProds.length})`},
    {k:"all",l:"📦 All Products"},
    {k:"content",l:"✍️ Content"},
    {k:"settings",l:"⚙️ Settings"},
    {k:"coupons",l:"🎫 Coupons"},
    {k:"orders",l:"📋 Orders"},
    {k:"reviews",l:"⭐ Reviews"},
  ];

  const ProductCard3 = ({p, showActions=true})=>(
    <div style={{background:"#0f0f0f",border:`1px solid ${STATUS_C[p.website_status||"pending"]}33`,borderRadius:"14px",overflow:"hidden"}}>
      {p.photo_url&&<img src={p.photo_url} alt={p.name} style={{width:"100%",height:"120px",objectFit:"cover"}}/>}
      {!p.photo_url&&<div style={{height:"50px",background:"#111",display:"flex",alignItems:"center",justifyContent:"center",color:"#333",fontSize:"20px"}}>📦</div>}
      <div style={{padding:"12px"}}>
        <div style={{fontWeight:"700",fontSize:"13px",color:"#f0ebe0",marginBottom:"3px"}}>{p.name}</div>
        <div style={{fontSize:"11px",color:"#555",marginBottom:"4px"}}>{p.category} · {p.color} · {p.size_type==="stitched"?(p.available_sizes||[]).join("/"):p.size_type||"meter"}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
          <span style={{fontWeight:"800",color:"#c9a84c",fontSize:"13px"}}>Rs.{Number(p.salePrice||0).toLocaleString()}</span>
          <span style={{fontSize:"10px",padding:"2px 8px",borderRadius:"20px",background:STATUS_C[p.website_status||"pending"]+"22",color:STATUS_C[p.website_status||"pending"],fontWeight:"700"}}>{STATUS_L[p.website_status||"pending"]}</span>
        </div>
        <div style={{fontSize:"10px",color:"#555",marginBottom:"8px"}}>Stock: {p.stock} {p.qtyType}</div>
        {showActions&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px"}}>
            <button onClick={()=>setEditProd({...p})} className="btn-gold" style={{borderRadius:"8px",padding:"6px",fontSize:"10px",letterSpacing:"0.5px"}}>✏️ Edit & List</button>
            {p.website_status!=="listed"&&<button onClick={()=>updateWebsiteStatus(p.id,"listed")} style={{background:"#4caf7d22",color:"#4caf7d",border:"1px solid #4caf7d44",borderRadius:"8px",padding:"6px",cursor:"pointer",fontSize:"10px",fontWeight:"700"}}>✅ List Now</button>}
            {p.website_status==="listed"&&<button onClick={()=>updateWebsiteStatus(p.id,"hidden")} style={{background:"#55522",color:"#555",border:"1px solid #2a2a2a",borderRadius:"8px",padding:"6px",cursor:"pointer",fontSize:"10px",fontWeight:"700"}}>🙈 Hide</button>}
            {p.website_status!=="sold_out"&&<button onClick={()=>updateWebsiteStatus(p.id,"sold_out")} style={{background:"#e0525222",color:"#e05252",border:"1px solid #e0525244",borderRadius:"8px",padding:"6px",cursor:"pointer",fontSize:"10px",fontWeight:"700"}}>❌ Sold Out</button>}
            <button onClick={()=>updateWebsiteStatus(p.id,"hidden")} style={{background:"#1a1a1a",color:"#555",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"6px",cursor:"pointer",fontSize:"10px"}}>🗑️ Remove</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:5000,background:"#050505",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{GLOBAL_CSS}</style>
      {/* Header */}
      <div style={{background:"#0a0a0a",borderBottom:"1px solid #c9a84c22",padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"16px",fontWeight:"700",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          ⚙️ Admin Panel — {BRAND}
          {unreadAlerts.length>0&&<span style={{marginLeft:"8px",background:"#e05252",color:"#fff",borderRadius:"50%",padding:"2px 7px",fontSize:"11px",WebkitTextFillColor:"#fff"}}>{unreadAlerts.length}</span>}
        </div>
        <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}} className="admin-tabs">
          {TABS.map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{background:tab===t.k?"linear-gradient(135deg,#c9a84c,#e8c97a)":"#111",color:tab===t.k?"#000":"#888",border:`1px solid ${t.badge>0?"#e05252":"#1a1a1a"}`,borderRadius:"8px",padding:"5px 10px",cursor:"pointer",fontWeight:"600",fontSize:"10px",position:"relative"}}>
              {t.l}
              {t.badge>0&&<span style={{position:"absolute",top:"-4px",right:"-4px",background:"#e05252",color:"#fff",borderRadius:"50%",width:"14px",height:"14px",fontSize:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800"}}>{t.badge}</span>}
            </button>
          ))}
          <button onClick={onClose} style={{background:"#e05252",color:"#fff",border:"none",borderRadius:"8px",padding:"5px 12px",cursor:"pointer",fontWeight:"700",fontSize:"10px"}}>✕ Close</button>
        </div>
      </div>

      <div style={{flex:1,overflow:"auto",padding:"20px"}}>

        {/* Pending Products */}
        {tab==="pending"&&(
          <div>
            <div style={{marginBottom:"14px"}}>
              <div style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"4px"}}>⏳ Pending Products ({pendingProds.length})</div>
              <div style={{fontSize:"12px",color:"#555"}}>ERP se aaye products — decide karo website pe list karni hai ya nahi</div>
            </div>
            {loadingProds&&<div style={{color:"#555",textAlign:"center",padding:"40px"}}>⏳ Loading from Supabase...</div>}
            {!loadingProds&&pendingProds.length===0&&<div style={{color:"#444",textAlign:"center",padding:"60px"}}><div style={{fontSize:"36px",marginBottom:"12px"}}>✅</div><div>No pending products! ERP se naya product aane pe yahan dikhega.</div></div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"12px"}}>
              {pendingProds.map(p=><ProductCard3 key={p.id} p={p}/>)}
            </div>
          </div>
        )}

        {/* Alerts */}
        {tab==="alerts"&&(
          <div>
            <div style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"16px"}}>🔔 ERP Alerts — Sold Out / Low Stock</div>
            {alerts.length===0&&<div style={{color:"#444",textAlign:"center",padding:"60px"}}><div style={{fontSize:"36px",marginBottom:"12px"}}>🔕</div><div>No alerts yet. Jab ERP mein sale hogi to alerts yahan aayenge.</div></div>}
            <div style={{display:"grid",gap:"10px"}}>
              {alerts.map(a=>(
                <div key={a.id} style={{background:a.is_read?"#0a0a0a":"#0f0f0f",border:`1px solid ${a.type==="sold_out"?"#e0525244":a.type==="low_stock"?"#e0a05244":"#c9a84c44"}`,borderRadius:"14px",padding:"16px",opacity:a.is_read?0.6:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                    <div>
                      <div style={{fontSize:"18px",marginBottom:"4px"}}>{a.type==="sold_out"?"❌":a.type==="low_stock"?"⚠️":"✨"}</div>
                      <div style={{fontWeight:"700",color:"#f0ebe0",fontSize:"13px"}}>{a.product_name}</div>
                      <div style={{fontSize:"12px",color:"#777",marginTop:"3px"}}>{a.message}</div>
                      <div style={{fontSize:"10px",color:"#444",marginTop:"4px"}}>{new Date(a.created_at).toLocaleString()}</div>
                    </div>
                    {a.is_read&&<span style={{fontSize:"10px",color:"#4caf7d",background:"#4caf7d22",padding:"3px 8px",borderRadius:"20px",fontWeight:"700"}}>Done ✓</span>}
                  </div>
                  {!a.is_read&&(
                    <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                      <button onClick={()=>handleAlertAction(a,"sold_out")} style={{background:"#e0525222",color:"#e05252",border:"1px solid #e0525244",borderRadius:"8px",padding:"7px 14px",cursor:"pointer",fontSize:"11px",fontWeight:"700"}}>❌ Mark Sold Out</button>
                      <button onClick={()=>handleAlertAction(a,"remove")} style={{background:"#1a1a1a",color:"#555",border:"1px solid #2a2a2a",borderRadius:"8px",padding:"7px 14px",cursor:"pointer",fontSize:"11px",fontWeight:"700"}}>🗑️ Remove from Website</button>
                      <button onClick={()=>handleAlertAction(a,"waiting")} style={{background:"#e0a05222",color:"#e0a052",border:"1px solid #e0a05244",borderRadius:"8px",padding:"7px 14px",cursor:"pointer",fontSize:"11px",fontWeight:"700"}}>⏳ Stock Coming</button>
                      <button onClick={()=>markAlertRead(a.id,"ignored")} style={{background:"none",color:"#444",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"7px 14px",cursor:"pointer",fontSize:"11px"}}>Ignore</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listed */}
        {tab==="listed"&&(
          <div>
            <div style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"16px"}}>✅ Listed on Website ({listedProds.length})</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"12px"}}>
              {listedProds.map(p=><ProductCard3 key={p.id} p={p}/>)}
              {listedProds.length===0&&<div style={{color:"#444",textAlign:"center",padding:"40px",gridColumn:"1/-1"}}>Koi listed product nahi</div>}
            </div>
          </div>
        )}

        {/* All Products */}
        {tab==="all"&&!editProd&&(
          <div>
            <div style={{marginBottom:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px"}}>📦 All Products ({allProds.length})</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"12px"}}>
              {allProds.map(p=><ProductCard3 key={p.id} p={p}/>)}
              {allProds.length===0&&<div style={{color:"#444",textAlign:"center",padding:"40px",gridColumn:"1/-1"}}>Koi product nahi — ERP mein products add karo</div>}
            </div>
          </div>
        )}

        {/* Edit Product */}
        {(tab==="all"||tab==="pending"||tab==="listed")&&editProd&&(
          <div style={{maxWidth:"800px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"16px"}}>
              <span style={{color:"#c9a84c",fontWeight:"700",fontSize:"16px"}}>✏️ Edit for Website: {editProd.name}</span>
              <button onClick={()=>setEditProd(null)} style={{background:"#111",color:"#888",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"6px 12px",cursor:"pointer",fontSize:"12px"}}>← Back</button>
            </div>
            <div style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"16px",padding:"20px"}}>

              {/* Website Status */}
              <div style={{marginBottom:"14px"}}>
                <label style={{fontSize:"10px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",display:"block",marginBottom:"6px"}}>Website Status</label>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  {Object.entries(STATUS_L).map(([k,l])=>(
                    <button key={k} onClick={()=>setEditProd(p=>({...p,website_status:k}))} style={{background:editProd.website_status===k?STATUS_C[k]+"33":"#111",color:editProd.website_status===k?STATUS_C[k]:"#555",border:`1px solid ${editProd.website_status===k?STATUS_C[k]:"#1a1a1a"}`,borderRadius:"20px",padding:"5px 12px",cursor:"pointer",fontSize:"11px",fontWeight:"700"}}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Website Category */}
              <div style={{marginBottom:"10px"}}>
                <label style={{fontSize:"10px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",display:"block",marginBottom:"4px"}}>Website Category</label>
                <select value={editProd.website_category||editProd.category||""} onChange={e=>setEditProd(p=>({...p,website_category:e.target.value}))} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px"}}>
                  <option value="">Same as ERP category</option>
                  {WEBSITE_CATS.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Size type display */}
              <div style={{marginBottom:"10px",background:"#111",borderRadius:"8px",padding:"10px"}}>
                <div style={{fontSize:"10px",color:"#555",marginBottom:"4px"}}>SIZE TYPE (from ERP)</div>
                <div style={{fontSize:"12px",color:"#c9a84c",fontWeight:"700"}}>
                  {editProd.size_type==="stitched"?`👗 Stitched — Sizes: ${(editProd.available_sizes||[]).join(", ")||"Not set"}`:editProd.size_type==="gaz"?"📏 Gaz":editProd.size_type==="free"?"🏷️ Free Size":"📏 Meter"}
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
                {inp("Website Title (English)","website_title")}
                {inp("Brand","brand")}
                {inp("Color","color")}
                {inp("Fabric Type","fabric_type")}
                {inp("Sale Price","salePrice","number")}
                {inp("Offer/Discount Price","offerPrice","number")}
                {inp("Washing Instructions","washing_instructions")}
                {inp("Size Guide","size_guide")}
              </div>
              <div style={{marginBottom:"10px"}}>{inp("Website Description (English)","website_description","textarea")}</div>

              <div style={{display:"flex",gap:"12px",margin:"10px 0"}}>
                {[["New Arrival","is_new_arrival"],["Active (Show on site)","is_active"]].map(([l,k])=>(
                  <label key={k} style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:"#f0ebe0"}}>
                    <input type="checkbox" checked={!!editProd[k]} onChange={e=>setEditProd(p=>({...p,[k]:e.target.checked}))} style={{accentColor:"#c9a84c"}}/>
                    {l}
                  </label>
                ))}
              </div>

              {/* Images */}
              <div style={{marginTop:"12px"}}>
                <p style={{color:"#c9a84c",fontWeight:"700",marginBottom:"10px",fontSize:"13px"}}>📸 Product Images (up to 5)</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"8px"}}>
                  {["photo_url","photo_url2","photo_url3","photo_url4","photo_url5"].map((f,i)=>(
                    <div key={f}>
                      <p style={{fontSize:"10px",color:"#555",marginBottom:"4px"}}>Photo {i+1}</p>
                      {editProd[f]&&<img src={editProd[f]} alt="" style={{width:"100%",height:"80px",objectFit:"cover",borderRadius:"6px",marginBottom:"4px",border:"1px solid #1a1a1a"}}/>}
                      <input type="file" accept="image/*" onChange={e=>e.target.files[0]&&uploadImg(e.target.files[0],f)} style={{width:"100%",fontSize:"9px",color:"#666",marginBottom:"3px"}}/>
                      <input value={editProd[f]||""} onChange={e=>setEditProd(p=>({...p,[f]:e.target.value}))} placeholder="Or paste URL" style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"5px",padding:"4px 6px",color:"#f0ebe0",fontSize:"9px"}}/>
                    </div>
                  ))}
                </div>
                {uploading&&<p style={{color:"#c9a84c",fontSize:"11px",marginTop:"6px",animation:"shimmer 1s infinite"}}>⏳ Uploading...</p>}
              </div>

              <div style={{display:"flex",gap:"10px",marginTop:"16px"}}>
                <button onClick={saveProd} className="btn-gold" style={{flex:1,borderRadius:"10px",padding:"12px",fontSize:"13px",letterSpacing:"1px"}}>💾 Save & Update Website</button>
                <button onClick={()=>setEditProd(null)} style={{background:"#111",color:"#666",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"12px 20px",cursor:"pointer"}}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {tab==="content"&&(
          <div style={{maxWidth:"700px"}}>
            <p style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"16px"}}>✍️ Website Content</p>
            <div style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"16px",padding:"20px",display:"flex",flexDirection:"column",gap:"4px"}}>
              <div style={{background:"#e0525211",border:"1px solid #e0525233",borderRadius:"10px",padding:"12px",marginBottom:"8px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                  <span style={{fontSize:"12px",fontWeight:"700",color:"#e05252"}}>🔥 Discount/Sale Banner</span>
                  <label style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:"#f0ebe0"}}>
                    <input type="checkbox" checked={!!sEdit.discountBannerActive} onChange={e=>setSEdit(s=>({...s,discountBannerActive:e.target.checked}))} style={{accentColor:"#e05252"}}/>
                    Show on site
                  </label>
                </div>
                <input value={sEdit.discountBanner||""} onChange={e=>setSEdit(s=>({...s,discountBanner:e.target.value}))} placeholder="e.g. EID SALE — 20% OFF!" style={{width:"100%",background:"#0a0a0a",border:"1px solid #e0525233",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px"}}/>
              </div>
              <div style={{marginBottom:"8px"}}>
                <p style={{fontSize:"11px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px"}}>Hero Rotating Texts (one per line)</p>
                <textarea value={(sEdit.heroTexts||[]).join("\n")} onChange={e=>setSEdit(s=>({...s,heroTexts:e.target.value.split("\n").filter(Boolean)}))} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px",height:"80px",resize:"vertical"}}/>
              </div>
              {inp("Hero Subtitle","heroSubtitle",undefined,true)}
              {inp("About Us Text","aboutText","textarea",true)}
              {inp("Policies Text","policiesText","textarea",true)}
              <div style={{marginTop:"4px"}}>
                <p style={{fontSize:"11px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px"}}>Announcement Bar (one per line)</p>
                <textarea value={sEdit.announcements?.join("\n")||""} onChange={e=>setSEdit(s=>({...s,announcements:e.target.value.split("\n").filter(Boolean)}))} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px",height:"80px",resize:"vertical"}}/>
              </div>
              <label style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:"#f0ebe0",marginTop:"4px"}}>
                <input type="checkbox" checked={!!sEdit.showVideo} onChange={e=>setSEdit(s=>({...s,showVideo:e.target.checked}))} style={{accentColor:"#c9a84c"}}/>Show YouTube Video Section
              </label>
              {sEdit.showVideo&&<>{inp("Video Title","videoTitle",undefined,true)}{inp("YouTube Embed URL","featuredVideo",undefined,true)}</>}
              <button onClick={saveSettings} className="btn-gold" style={{borderRadius:"10px",padding:"12px",fontSize:"13px",marginTop:"12px",letterSpacing:"1px"}}>💾 Save Content</button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {tab==="settings"&&(
          <div style={{maxWidth:"600px"}}>
            <p style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"16px"}}>⚙️ Website Settings</p>
            <div style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"16px",padding:"20px",display:"flex",flexDirection:"column",gap:"4px"}}>
              <div style={{marginBottom:"10px"}}>
                <label style={{fontSize:"10px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",display:"block",marginBottom:"4px"}}>Logo Image</label>
                <div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
                  <input type="file" accept="image/*" onChange={async(e)=>{const file=e.target.files[0];if(!file||!supabase)return;const ext=file.name.split(".").pop();const path=`logo/logo-${Date.now()}.${ext}`;const{error}=await supabase.storage.from("product-images").upload(path,file,{upsert:true});if(!error){const{data:u}=supabase.storage.from("product-images").getPublicUrl(path);setSEdit(s=>({...s,logoUrl:u.publicUrl}));}}} style={{fontSize:"11px",color:"#888"}}/>
                  <input value={sEdit.logoUrl||""} onChange={e=>setSEdit(s=>({...s,logoUrl:e.target.value}))} placeholder="Or paste URL" style={{flex:1,background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"7px 10px",color:"#f0ebe0",fontSize:"12px",minWidth:"180px"}}/>
                </div>
                {sEdit.logoUrl&&<img src={sEdit.logoUrl} alt="logo" style={{height:"50px",objectFit:"contain",marginTop:"8px",background:"#111",padding:"6px",borderRadius:"8px"}}/>}
              </div>
              {inp("WhatsApp Number","whatsapp",undefined,true)}
              {inp("TikTok ID","tiktok",undefined,true)}
              {inp("Instagram ID","instagram",undefined,true)}
              {inp("TikTok Profile URL","tiktokUrl",undefined,true)}
              {inp("Instagram Profile URL","instagramUrl",undefined,true)}
              <button onClick={saveSettings} className="btn-gold" style={{borderRadius:"10px",padding:"12px",fontSize:"13px",marginTop:"8px",letterSpacing:"1px"}}>💾 Save Settings</button>
            </div>

            {/* Video Upload */}
            <p style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",margin:"20px 0 12px"}}>🎥 Homepage Video</p>
            <div style={{background:"#0f0f0f",border:"1px solid #c9a84c22",borderRadius:"16px",padding:"20px"}}>
              <div style={{background:"#111",borderRadius:"8px",padding:"8px 12px",marginBottom:"10px",fontSize:"11px",color:"#c9a84c88"}}>Max 30MB · MP4/WebM/MOV</div>
              <label style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:"#f0ebe0",marginBottom:"10px"}}>
                <input type="checkbox" checked={!!sEdit.showUploadedVideo} onChange={e=>setSEdit(s=>({...s,showUploadedVideo:e.target.checked}))} style={{accentColor:"#c9a84c"}}/>
                Show Video on Homepage
              </label>
              <input type="file" accept="video/*" onChange={async(e)=>{const file=e.target.files[0];if(!file)return;if(file.size>30*1024*1024){alert("Max 30MB!");return;}if(!supabase)return;alert("⏳ Uploading...");const ext=file.name.split(".").pop();const path=`videos/v-${Date.now()}.${ext}`;const{error}=await supabase.storage.from("product-images").upload(path,file,{upsert:true,contentType:file.type});if(error){alert("❌ "+error.message);return;}const{data:u}=supabase.storage.from("product-images").getPublicUrl(path);setSEdit(s=>({...s,uploadedVideoUrl:u.publicUrl}));alert("✅ Uploaded!");}} style={{width:"100%",fontSize:"11px",color:"#888",marginBottom:"8px"}}/>
              <input value={sEdit.uploadedVideoUrl||""} onChange={e=>setSEdit(s=>({...s,uploadedVideoUrl:e.target.value}))} placeholder="Or paste video URL" style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px",marginBottom:"8px"}}/>
              {sEdit.uploadedVideoUrl&&<video src={sEdit.uploadedVideoUrl} controls style={{width:"100%",maxHeight:"160px",borderRadius:"8px",marginBottom:"8px"}}/>}
              {inp("Video Title","uploadedVideoTitle",undefined,true)}
              {inp("Video Caption/Description","uploadedVideoCaption","textarea",true)}
              <button onClick={saveSettings} className="btn-gold" style={{borderRadius:"10px",padding:"12px",fontSize:"13px",width:"100%",letterSpacing:"1px"}}>💾 Save Video</button>
            </div>

            {/* Password */}
            <p style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",margin:"20px 0 12px"}}>🔑 Change Password</p>
            <div style={{background:"#0f0f0f",border:"1px solid #c9a84c22",borderRadius:"16px",padding:"20px"}}>
              {[["Current Password","old","password"],["New Password","nw","password"],["Confirm New","cf","password"]].map(([l,k,t])=>(
                <div key={k} style={{marginBottom:"10px"}}>
                  <label style={{fontSize:"10px",color:"#555",display:"block",marginBottom:"4px"}}>{l}</label>
                  <input type={t} value={pwForm[k]} onChange={e=>setPwForm(p=>({...p,[k]:e.target.value}))} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px"}}/>
                </div>
              ))}
              <button onClick={changePassword} className="btn-gold" style={{borderRadius:"10px",padding:"11px",fontSize:"13px",width:"100%"}}>🔑 Change Password</button>
            </div>
          </div>
        )}

        {/* Coupons */}
        {tab==="coupons"&&(
          <div style={{maxWidth:"600px"}}>
            <p style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"16px"}}>🎫 Coupon Codes</p>
            <div style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"16px",padding:"20px",marginBottom:"16px"}}>
              {(sEdit.coupons||[]).map((c,i)=>(
                <div key={i} style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"8px",flexWrap:"wrap"}}>
                  <input value={c.code} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],code:e.target.value.toUpperCase()};setSEdit(s=>({...s,coupons:cp}));}} placeholder="CODE" style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"7px 10px",color:"#c9a84c",fontSize:"12px",fontWeight:"700",letterSpacing:"2px",width:"110px"}}/>
                  <input type="number" value={c.discount} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],discount:+e.target.value};setSEdit(s=>({...s,coupons:cp}));}} placeholder="Value" style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"7px 10px",color:"#f0ebe0",fontSize:"12px",width:"70px"}}/>
                  <select value={c.type} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],type:e.target.value};setSEdit(s=>({...s,coupons:cp}));}} style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"7px 10px",color:"#f0ebe0",fontSize:"12px"}}>
                    <option value="percent">% Off</option><option value="flat">Rs. Off</option>
                  </select>
                  <label style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"12px",color:"#f0ebe0",cursor:"pointer"}}>
                    <input type="checkbox" checked={!!c.active} onChange={e=>{const cp=[...(sEdit.coupons||[])];cp[i]={...cp[i],active:e.target.checked};setSEdit(s=>({...s,coupons:cp}));}} style={{accentColor:"#4caf7d"}}/>Active
                  </label>
                  <button onClick={()=>{const cp=(sEdit.coupons||[]).filter((_,j)=>j!==i);setSEdit(s=>({...s,coupons:cp}));}} style={{background:"#e0525222",border:"1px solid #e0525244",borderRadius:"8px",padding:"7px 10px",color:"#e05252",cursor:"pointer",fontSize:"11px"}}>✕</button>
                </div>
              ))}
              <button onClick={()=>setSEdit(s=>({...s,coupons:[...(s.coupons||[]),{code:"",discount:10,type:"percent",active:true}]}))} style={{background:"#111",border:"1px dashed #c9a84c44",borderRadius:"8px",padding:"8px 16px",color:"#c9a84c",cursor:"pointer",fontSize:"12px",marginTop:"6px"}}>+ Add Coupon</button>
            </div>
            <button onClick={saveSettings} className="btn-gold" style={{borderRadius:"10px",padding:"12px",fontSize:"13px",width:"100%",letterSpacing:"1px"}}>💾 Save Coupons</button>
          </div>
        )}

        {tab==="orders"&&<OrdersAdmin/>}

        {tab==="reviews"&&(
          <div>
            <p style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"16px"}}>⭐ Reviews ({reviews.length})</p>
            <div style={{display:"grid",gap:"8px"}}>
              {reviews.map(r=>(
                <div key={r.id} style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"12px",display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontWeight:"700",fontSize:"13px",color:"#f0ebe0",marginBottom:"3px"}}>{r.customer_name} <span style={{fontSize:"11px",color:"#555"}}>on {r.product_name}</span></div><div style={{display:"flex",gap:"1px",marginBottom:"4px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=r.rating?"#c9a84c":"#222",fontSize:"12px"}}>★</span>)}</div><p style={{fontSize:"12px",color:"#777"}}>{r.comment}</p></div>
                  <span style={{fontSize:"10px",color:"#444",flexShrink:0,marginLeft:"12px"}}>{r.date}</span>
                </div>
              ))}
              {!reviews.length&&<div style={{textAlign:"center",padding:"40px",color:"#444"}}>No reviews yet</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

  const changePassword = ()=>{
    const saved = LS.get("adminPass", ADMIN_PASS);
    if(pwForm.old !== saved) return alert("❌ Current password wrong!");
    if(!pwForm.nw) return alert("New password dalo!");
    if(pwForm.nw !== pwForm.cf) return alert("❌ Passwords match nahi karte!");
    if(pwForm.nw.length < 6) return alert("Password kam se kam 6 characters ka hona chahiye!");
    LS.set("adminPass", pwForm.nw);
    setPwForm({old:"",nw:"",cf:""});
    alert("✅ Password change ho gaya! Agli baar new password use karo.");
  };

  const uploadImg = async(file, field)=>{
    if(!supabase||!file||!editProd)return;
    setUploading(true);
    const ext=file.name.split(".").pop();
    const path=`${editProd.id}/${field}-${Date.now()}.${ext}`;
    const{error}=await supabase.storage.from("product-images").upload(path,file,{upsert:true});
    if(!error){const{data:u}=supabase.storage.from("product-images").getPublicUrl(path);setEditProd(p=>({...p,[field]:u.publicUrl}));}
    setUploading(false);
  };

  const saveProd = async()=>{
    if(!editProd)return;
    setProducts(p=>p.map(x=>x.id===editProd.id?editProd:x));
    if(supabase) await supabase.from("products").upsert({id:editProd.id,name:editProd.name,brand:editProd.brand,color:editProd.color,fabric:editProd.fabric,category:editProd.category,rack:editProd.rack,stock:editProd.stock,sale_price:editProd.salePrice,cost_price:editProd.costPrice,offer_price:editProd.offerPrice,qty_type:editProd.qtyType,barcode:editProd.barcode,bonus:editProd.bonus,description:editProd.description,fabric_type:editProd.fabric_type,washing_instructions:editProd.washing_instructions,size_guide:editProd.size_guide,is_new_arrival:editProd.is_new_arrival,is_pre_order:editProd.is_pre_order,is_active:editProd.is_active,views:editProd.views||0,photo_url:editProd.photo_url,photo_url2:editProd.photo_url2,photo_url3:editProd.photo_url3,photo_url4:editProd.photo_url4,photo_url5:editProd.photo_url5});
    setEditProd(null);
    alert("✅ Saved!");
  };

  const saveSettings = ()=>{ setSettings(sEdit); LS.set("shopSettings",sEdit); alert("✅ Settings saved!"); };

  const inp=(label,field,type="text",isSettings=false)=>{
    const obj=isSettings?sEdit:editProd;
    const setter=isSettings?(v)=>setSEdit(s=>({...s,[field]:v})):(v)=>setEditProd(p=>({...p,[field]:v}));
    return(
      <div key={field} style={{marginBottom:"10px"}}>
        <label style={{fontSize:"10px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",display:"block",marginBottom:"4px"}}>{label}</label>
        {type==="textarea"
          ?<textarea value={obj?.[field]||""} onChange={e=>setter(e.target.value)} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px",height:"90px",resize:"vertical"}}/>
          :<input type={type} value={obj?.[field]||""} onChange={e=>setter(type==="number"?+e.target.value:e.target.value)} style={{width:"100%",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:"8px",padding:"8px 10px",color:"#f0ebe0",fontSize:"12px"}}/>
        }
      </div>
    );
  };


// ── Orders Admin ──────────────────────────────────────────────
function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const STATUS = ["Pending","Confirmed","Processing","Shipped","Delivered","Cancelled"];
  const STATUS_C = {Pending:"#c9a84c",Confirmed:"#4a90e2",Processing:"#e0a052",Shipped:"#a052e0",Delivered:"#4caf7d",Cancelled:"#e05252"};

  useEffect(()=>{
    if(!supabase){setLoading(false);return;}
    supabase.from("online_orders").select("*").order("created_at",{ascending:false}).then(({data})=>{
      setOrders(data||[]);setLoading(false);
    });
    const ch = supabase.channel("orders-admin")
      .on("postgres_changes",{event:"*",schema:"public",table:"online_orders"},()=>{
        supabase.from("online_orders").select("*").order("created_at",{ascending:false}).then(({data})=>setOrders(data||[]));
      }).subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);

  const updateStatus = async(id, status)=>{
    setOrders(o=>o.map(x=>x.id===id?{...x,status}:x));
    if(supabase) await supabase.from("online_orders").update({status}).eq("id",id);
  };

  if(loading) return <div style={{color:"#555",padding:"40px",textAlign:"center"}}>⏳ Loading orders...</div>;

  return (
    <div>
      <p style={{color:"#f0ebe0",fontWeight:"700",fontSize:"15px",marginBottom:"16px"}}>📋 Online Orders ({orders.length})</p>
      {!supabase&&<div style={{background:"#e0525211",border:"1px solid #e0525233",borderRadius:"10px",padding:"12px",marginBottom:"12px",fontSize:"12px",color:"#e05252"}}>⚠️ Supabase not connected — orders won't show</div>}
      <div style={{display:"grid",gap:"10px"}}>
        {orders.map(o=>(
          <div key={o.id} style={{background:"#0f0f0f",border:`1px solid ${STATUS_C[o.status]||"#1a1a1a"}22`,borderRadius:"14px",padding:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",marginBottom:"10px"}}>
              <div>
                <div style={{fontWeight:"700",color:"#f0ebe0",fontSize:"13px"}}>{o.product_name}</div>
                <div style={{fontSize:"11px",color:"#555",marginTop:"2px"}}>Order #{String(o.id).slice(-6)} · {o.date}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:"800",color:"#c9a84c",fontSize:"14px"}}>Rs.{Number(o.product_price||0).toLocaleString()}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",fontSize:"11px",color:"#777",marginBottom:"10px"}}>
              <div>👤 {o.customer_name}</div>
              <div>📞 {o.phone}</div>
              <div>🏙️ {o.city}</div>
              <div>📍 {o.address}</div>
            </div>
            {o.message&&<div style={{fontSize:"11px",color:"#555",marginBottom:"10px",background:"#111",padding:"6px 10px",borderRadius:"6px"}}>💬 {o.message}</div>}
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:"10px",color:"#555"}}>Status:</span>
              {STATUS.map(s=>(
                <button key={s} onClick={()=>updateStatus(o.id,s)} style={{background:o.status===s?STATUS_C[s]||"#c9a84c":"#111",color:o.status===s?"#fff":"#555",border:`1px solid ${STATUS_C[s]||"#1a1a1a"}44`,borderRadius:"20px",padding:"3px 10px",cursor:"pointer",fontSize:"10px",fontWeight:"600",transition:"all 0.2s"}}>
                  {s}
                </button>
              ))}
              <a href={`https://wa.me/92${(o.phone||"").replace(/^0/,"")}?text=${encodeURIComponent(`Assalam ${o.customer_name}! Your order "${o.product_name}" is now ${o.status}. Thank you! — Jameel Fabrics Kunjah`)}`} target="_blank" rel="noreferrer" style={{marginLeft:"auto",background:"#25D366",color:"#fff",borderRadius:"20px",padding:"3px 10px",fontSize:"10px",fontWeight:"700"}}>📱 WA</a>
            </div>
          </div>
        ))}
        {orders.length===0&&<div style={{textAlign:"center",padding:"40px",color:"#444"}}>No orders yet</div>}
      </div>
    </div>
  );
}

// ── Trending Section ──────────────────────────────────────────
function TrendingSection({ products, onView, onAddCart, wishlist, toggleWish }) {
  const [ref, inView] = useInView(0.1);
  const trending = [...products].filter(p=>p.is_active!==false&&p.stock>0).sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,6);
  if(!trending.length)return null;
  return (
    <section ref={ref} style={{padding:"80px 24px",maxWidth:"1400px",margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:"48px",opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(24px)",transition:"all 0.8s ease"}}>
        <p style={{fontSize:"11px",letterSpacing:"5px",color:"#c9a84c88",marginBottom:"12px",textTransform:"uppercase"}}>Most Loved</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:"700"}}>
          <span className="gold-text">Trending Now</span>
        </h2>
        <div style={{height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",maxWidth:"200px",margin:"16px auto 0"}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"20px"}}  className="prod-grid">
        {trending.map((p,i)=><ProductCard key={p.id} product={p} onView={onView} onAddCart={onAddCart} wishlist={wishlist} toggleWish={toggleWish} index={i}/>)}
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────
function AboutSection({ settings }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section ref={ref} id="about" style={{padding:"80px 24px",background:"#0a0808",borderTop:"1px solid #1a1a1a",borderBottom:"1px solid #1a1a1a"}}>
      <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center",opacity:inView?1:0,transition:"all 0.8s ease",transform:inView?"translateY(0)":"translateY(24px)"}}>
        <p style={{fontSize:"11px",letterSpacing:"5px",color:"#c9a84c88",marginBottom:"14px",textTransform:"uppercase"}}>Our Story</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:"700",marginBottom:"32px"}}>
          About <span className="gold-text">{BRAND}</span>
        </h2>
        <div style={{height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",maxWidth:"160px",margin:"0 auto 40px"}}/>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,2vw,20px)",color:"#b0a898",lineHeight:"2",textAlign:"left",whiteSpace:"pre-line"}}>
          {settings.aboutText}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"24px",marginTop:"48px"}}>
          {[["📍",ADDRESS],["📞",PHONE],["🕐","Mon–Sat: 10am–8pm"]].map(([i,t])=>(
            <div key={t} style={{background:"#111",borderRadius:"12px",padding:"20px",border:"1px solid #1a1a1a"}}>
              <div style={{fontSize:"24px",marginBottom:"8px"}}>{i}</div>
              <div style={{fontSize:"13px",color:"#b0a898",lineHeight:"1.5"}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Policies Section ──────────────────────────────────────────
function PoliciesSection({ settings }) {
  const [ref, inView] = useInView(0.1);
  const sections = settings.policiesText?.split("\n\n").filter(Boolean)||[];
  return (
    <section ref={ref} id="policies" style={{padding:"80px 24px",maxWidth:"900px",margin:"0 auto",opacity:inView?1:0,transition:"all 0.8s ease",transform:inView?"translateY(0)":"translateY(24px)"}}>
      <div style={{textAlign:"center",marginBottom:"48px"}}>
        <p style={{fontSize:"11px",letterSpacing:"5px",color:"#c9a84c88",marginBottom:"12px",textTransform:"uppercase"}}>Terms & Policies</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:"700"}}><span className="gold-text">Our Policies</span></h2>
        <div style={{height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",maxWidth:"160px",margin:"16px auto 0"}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"16px"}}>
        {sections.map((s,i)=>{
          const [title,...rest]=s.split("\n");
          return(
            <div key={i} style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"14px",padding:"20px",transition:"border 0.3s"}} onMouseEnter={e=>e.currentTarget.style.border="1px solid #c9a84c33"} onMouseLeave={e=>e.currentTarget.style.border="1px solid #1a1a1a"}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:"700",color:"#c9a84c",marginBottom:"10px",letterSpacing:"1px"}}>{title}</h3>
              <p style={{fontSize:"13px",color:"#777",lineHeight:"1.8"}}>{rest.join("\n")}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Location Section ──────────────────────────────────────────
function LocationSection({ settings }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section ref={ref} id="location" style={{padding:"80px 24px",background:"#070707",borderTop:"1px solid #1a1a1a"}}>
      <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center",opacity:inView?1:0,transition:"all 0.8s ease",transform:inView?"translateY(0)":"translateY(24px)"}}>
        <p style={{fontSize:"11px",letterSpacing:"5px",color:"#c9a84c88",marginBottom:"12px",textTransform:"uppercase"}}>Find Us</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:"700",marginBottom:"8px"}}><span className="gold-text">Visit Our Store</span></h2>
        <div style={{height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",maxWidth:"160px",margin:"16px auto 32px"}}/>
        <div style={{background:"#0f0f0f",border:"1px solid #c9a84c22",borderRadius:"20px",overflow:"hidden",marginBottom:"24px"}}>
          <iframe title="Store Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27138.!2d73.97!3d32.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f235e!2sKunjah%2C+Gujrat+Punjab&output=embed" width="100%" height="280" style={{border:"none",display:"block",opacity:0.85,filter:"grayscale(0.5) invert(0.9) hue-rotate(180deg)"}} loading="lazy"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px"}}>
          {[["📍","Address",ADDRESS],["📞","Phone",PHONE],["📱","WhatsApp",PHONE],["⏰","Hours","Mon–Sat: 10am–8pm"]].map(([ic,l,v])=>(
            <div key={l} style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:"24px",marginBottom:"6px"}}>{ic}</div>
              <div style={{fontSize:"10px",color:"#555",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"4px"}}>{l}</div>
              <div style={{fontSize:"13px",color:"#b0a898"}}>{v}</div>
            </div>
          ))}
        </div>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn-outline" style={{display:"inline-block",marginTop:"20px",borderRadius:"30px",padding:"12px 28px",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase"}}>
          📍 Open in Google Maps
        </a>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer({ settings }) {
  return (
    <footer style={{background:"#030303",borderTop:"1px solid #c9a84c22",padding:"48px 24px 24px"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"32px",marginBottom:"40px"}}>
          {/* Brand */}
          <div>
            {settings.logoUrl
              ?<img src={settings.logoUrl} alt={BRAND} style={{height:"48px",objectFit:"contain",marginBottom:"12px"}}/>
              :<div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:"900",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"12px",letterSpacing:"2px"}}>{BRAND}<br/><span style={{fontSize:"12px",letterSpacing:"4px"}}>{BRAND_SUB}</span></div>
            }
            <p style={{fontSize:"13px",color:"#555",lineHeight:"1.8",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{TAGLINE}</p>
            <div style={{display:"flex",gap:"10px",marginTop:"16px"}}>
              {settings.tiktokUrl&&<a href={settings.tiktokUrl} target="_blank" rel="noreferrer" style={{width:"36px",height:"36px",background:"#111",border:"1px solid #1a1a1a",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.border="1px solid #c9a84c44"} onMouseLeave={e=>e.currentTarget.style.border="1px solid #1a1a1a"}>🎵</a>}
              {settings.instagramUrl&&<a href={settings.instagramUrl} target="_blank" rel="noreferrer" style={{width:"36px",height:"36px",background:"#111",border:"1px solid #1a1a1a",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.border="1px solid #c9a84c44"} onMouseLeave={e=>e.currentTarget.style.border="1px solid #1a1a1a"}>📸</a>}
              <a href={`https://wa.me/${settings.whatsapp||WA_NUM}`} target="_blank" rel="noreferrer" style={{width:"36px",height:"36px",background:"#25D366",border:"none",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"}}>📱</a>
            </div>
          </div>
          {/* Quick links */}
          <div>
            <h4 style={{fontSize:"11px",letterSpacing:"3px",color:"#c9a84c88",textTransform:"uppercase",marginBottom:"16px"}}>Quick Links</h4>
            {[["Home","#"],["Men's Collection","#mens"],["Women's Collection","#womens"],["About Us","#about"],["Policies","#policies"],["Contact","#location"]].map(([l,h])=>(
              <a key={l} href={h} style={{display:"block",fontSize:"13px",color:"#555",padding:"5px 0",transition:"color 0.2s",lineHeight:"1.5"}} onMouseEnter={e=>e.target.style.color="#c9a84c"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</a>
            ))}
          </div>
          {/* Contact */}
          <div>
            <h4 style={{fontSize:"11px",letterSpacing:"3px",color:"#c9a84c88",textTransform:"uppercase",marginBottom:"16px"}}>Contact</h4>
            <div style={{fontSize:"13px",color:"#555",lineHeight:"2"}}>
              <div>📍 {ADDRESS}</div>
              <div>📞 {PHONE}</div>
              {settings.tiktok&&<div>🎵 TikTok: {settings.tiktok}</div>}
              {settings.instagram&&<div>📸 Instagram: {settings.instagram}</div>}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid #0f0f0f",paddingTop:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <p style={{fontSize:"11px",color:"#2a2a2a"}}>© 2026 {BRAND} {BRAND_SUB}. All Rights Reserved.</p>
          <p style={{fontSize:"11px",color:"#1a1a1a"}}>Premium Pakistani Fabrics</p>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Float Button ─────────────────────────────────────
function WAButton({ settings }) {
  const [show, setShow] = useState(false);
  useEffect(()=>{ setTimeout(()=>setShow(true), 3000); },[]);
  return (
    <a href={`https://wa.me/${settings.whatsapp||WA_NUM}?text=${encodeURIComponent("Assalam o Alaikum! I'd like to inquire about your collection.")}`} target="_blank" rel="noreferrer"
      style={{position:"fixed",bottom:"24px",right:"24px",width:"56px",height:"56px",background:"#25D366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",boxShadow:"0 8px 24px rgba(37,211,102,0.4)",zIndex:800,opacity:show?1:0,transform:show?"scale(1)":"scale(0)",transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",animation:show?"pulse 3s ease 4s infinite":"none"}} title="Chat on WhatsApp">
      📱
    </a>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const [show3D, setShow3D] = useState(true);
  const [splash, setSplash] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [page, setPage] = useState("home");
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useState(()=>LS.get("cart",[]));
  const [wishlist, setWishlist] = useState(()=>LS.get("wishlist",[]));
  const [customer, setCustomer] = useState(()=>LS.get("customer",null));
  const [settings, setSettings] = useState(()=>({...DEFAULT_SETTINGS,...LS.get("shopSettings",{})}));
  const [selectedProd, setSelectedProd] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  // Persist cart + wishlist
  useEffect(()=>LS.set("cart",cart),[cart]);
  useEffect(()=>LS.set("wishlist",wishlist),[wishlist]);

  // Load products from Supabase
  useEffect(()=>{
    if(!supabase){ setProducts([]); return; }
    supabase.from("products").select("*").then(({data})=>{
      if(data?.length) setProducts(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,fabric_type:r.fabric_type||r.fabric,available_sizes:tryParseLocal(r.available_sizes,[])})));
    });
    supabase.from("reviews").select("*").then(({data})=>{ if(data?.length) setReviews(data); });
    // Real-time
    const ch = supabase.channel("shop-sync")
      .on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{
        supabase.from("products").select("*").then(({data})=>{ if(data?.length) setProducts(data.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,offerPrice:r.offer_price,qtyType:r.qty_type,fabric_type:r.fabric_type||r.fabric}))); });
      }).subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);

  const addCart = useCallback((product)=>{
    setCart(c=>{
      const ex=c.find(x=>x.id===product.id);
      if(ex)return c.map(x=>x.id===product.id?{...x,qty:x.qty+1}:x);
      const price=product.offerPrice&&product.offerPrice<product.salePrice?product.offerPrice:product.salePrice;
      return [...c,{id:product.id,name:product.name,color:product.color,price,qty:1,photo:product.photo_url}];
    });
  },[]);

  const toggleWish = useCallback((id)=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]),[]);

  const openProduct = useCallback((p)=>{
    setSelectedProd(p);
    if(supabase) supabase.from("products").update({views:(p.views||0)+1}).eq("id",p.id);
  },[]);

  const addReview = async(rv)=>{
    setReviews(r=>[...r,rv]);
    if(supabase) await supabase.from("reviews").insert({id:rv.id,product_id:rv.product_id,product_name:rv.product_name,customer_name:rv.name,rating:rv.rating,comment:rv.comment,date:new Date().toLocaleDateString(),verified:false});
  };

  // Secret admin access: triple click on footer copyright
  const handleAdminClick = ()=>{ setAdminClickCount(n=>{ if(n+1>=5){setShowAdminLogin(true);return 0;}return n+1; }); };

  const filtered = products.filter(p=>
    p.website_status==="listed" &&
    (catFilter==="All"||(p.website_category||p.category)===catFilter) &&
    (!search||(p.name?.toLowerCase().includes(search.toLowerCase())||p.color?.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase())))
  );

  const wishProds = products.filter(p=>wishlist.includes(p.id));

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <style>{`
        @media(max-width:768px){
          .show-mobile{display:flex!important}
          .hide-mobile{display:none!important}
          nav { top: 34px !important; }
          .modal-inner { grid-template-columns: 1fr !important; }
        }
        @media(min-width:769px){ .show-mobile{display:none!important} }
      `}</style>

      {show3D&&<Showroom3D onEnter={()=>{setShow3D(false);setSplash(false);}}/>}
      {!show3D&&splash&&<SplashScreen onDone={()=>setSplash(false)} logoUrl={settings.logoUrl}/>}

      {showTracking&&<OrderTracking onClose={()=>setShowTracking(false)}/>}
      <AnnouncementBar announcements={settings.announcements}/>
      <DiscountBanner settings={settings}/>
      <Navbar cart={cart} wishlist={wishlist} setPage={setPage} page={page} catFilter={catFilter} setCatFilter={setCatFilter} search={search} setSearch={setSearch} customer={customer} setShowLogin={setShowLogin} settings={settings} setShowCart={setShowCart} setShowSearch={setShowSearch} showSearch={showSearch}/>
      <CategoryBar catFilter={catFilter} setCatFilter={setCatFilter} setPage={setPage}/>

      {/* Main Content */}
      {page==="home"&&(
        <>
          <Hero settings={settings} setCatFilter={setCatFilter} setPage={setPage}/>
          {/* Live bar */}
          <div style={{background:"linear-gradient(135deg,#1a1208,#0a0a0a)",borderBottom:"1px solid #c9a84c22",padding:"8px 24px",textAlign:"center",fontSize:"11px",fontWeight:"600",color:"#c9a84c88",letterSpacing:"1px",display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
            <ViewerCount/>
            <span style={{color:"#2a2a2a"}}>·</span>
            <span>New arrivals added daily</span>
            <span style={{color:"#2a2a2a"}}>·</span>
            <span>WhatsApp: {PHONE}</span>
          </div>

          <ProductCarousel title="Trending Now" subtitle="Most Loved" products={[...products].filter(p=>p.is_active!==false&&p.stock>0).sort((a,b)=>(b.views||0)-(a.views||0))} onView={openProduct} onAddCart={addCart} wishlist={wishlist} toggleWish={toggleWish}/>

          {/* Video section — YouTube */}
          {settings.showVideo&&settings.featuredVideo&&(
            <section style={{padding:"80px 24px",textAlign:"center",background:"#070707",borderTop:"1px solid #1a1a1a"}}>
              <p style={{fontSize:"11px",letterSpacing:"5px",color:"#c9a84c88",marginBottom:"12px",textTransform:"uppercase"}}>Watch</p>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:"700",marginBottom:"32px"}}><span className="gold-text">{settings.videoTitle||"Our Collection"}</span></h2>
              <div style={{maxWidth:"800px",margin:"0 auto",borderRadius:"16px",overflow:"hidden",border:"1px solid #c9a84c22",boxShadow:"0 24px 80px rgba(201,168,76,0.15)"}}>
                <iframe src={settings.featuredVideo} width="100%" height="450" style={{border:"none",display:"block"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Collection Video"/>
              </div>
            </section>
          )}

          {/* Uploaded Video Section */}
          {settings.showUploadedVideo&&settings.uploadedVideoUrl&&(
            <section style={{padding:"80px 24px",background:"#040404",borderTop:"1px solid #c9a84c11"}}>
              <div style={{maxWidth:"900px",margin:"0 auto"}}>
                <div style={{textAlign:"center",marginBottom:"36px"}}>
                  <p style={{fontSize:"11px",letterSpacing:"5px",color:"#c9a84c88",marginBottom:"12px",textTransform:"uppercase"}}>Featured</p>
                  {settings.uploadedVideoTitle&&<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,44px)",fontWeight:"700",marginBottom:"0"}}><span className="gold-text">{settings.uploadedVideoTitle}</span></h2>}
                  <div style={{height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",maxWidth:"200px",margin:"16px auto 0"}}/>
                </div>

                {/* Video player */}
                <div style={{position:"relative",borderRadius:"16px",overflow:"hidden",border:"1px solid #c9a84c22",boxShadow:"0 32px 100px rgba(201,168,76,0.2)",background:"#000"}}>
                  <video
                    src={settings.uploadedVideoUrl}
                    controls
                    controlsList="nodownload"
                    style={{width:"100%",maxHeight:"560px",display:"block",objectFit:"cover"}}
                    poster=""
                  />
                  {/* Gold corner accents */}
                  {["top-left","top-right","bottom-left","bottom-right"].map(pos=>(
                    <div key={pos} style={{position:"absolute",...(pos.includes("top")?{top:0}:{bottom:0}),...(pos.includes("left")?{left:0}:{right:0}),width:"30px",height:"30px",borderTop:pos.includes("top")?"2px solid #c9a84c":undefined,borderBottom:pos.includes("bottom")?"2px solid #c9a84c":undefined,borderLeft:pos.includes("left")?"2px solid #c9a84c":undefined,borderRight:pos.includes("right")?"2px solid #c9a84c":undefined,borderRadius:pos==="top-left"?"2px 0 0 0":pos==="top-right"?"0 2px 0 0":pos==="bottom-left"?"0 0 0 2px":"0 0 2px 0"}}/>
                  ))}
                </div>

                {/* Caption table */}
                {settings.uploadedVideoCaption&&(
                  <div style={{marginTop:"24px",background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"12px",overflow:"hidden"}}>
                    <table style={{width:"100%",borderCollapse:"collapse"}}>
                      <thead>
                        <tr style={{background:"linear-gradient(135deg,#1a1208,#111)"}}>
                          <th style={{padding:"12px 20px",textAlign:"left",fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:"700",color:"#c9a84c",letterSpacing:"2px",borderBottom:"1px solid #1a1a1a"}}>About This Collection</th>
                        </tr>
                      </thead>
                      <tbody>
                        {settings.uploadedVideoCaption.split("\n").filter(Boolean).map((line,i)=>(
                          <tr key={i} style={{background:i%2===0?"#0f0f0f":"#111"}}>
                            <td style={{padding:"11px 20px",fontSize:"13px",color:"#b0a898",lineHeight:"1.7",borderBottom:"1px solid #0a0a0a",fontFamily:"'DM Sans',sans-serif"}}>{line}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Category sections */}
          {["Men's Unstitched","Women Unstitched","Women Stitched","Kids"].map(cat=>{
            const catProds = products.filter(p=>p.is_active!==false&&p.category===cat).slice(0,4);
            if(!catProds.length)return null;
            return(
              <section key={cat} style={{padding:"60px 24px",maxWidth:"1400px",margin:"0 auto"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"32px"}}>
                  <div>
                    <p style={{fontSize:"10px",letterSpacing:"4px",color:"#c9a84c88",marginBottom:"6px",textTransform:"uppercase"}}>Collection</p>
                    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:"700"}}><span className="gold-text">{cat}</span></h2>
                  </div>
                  <button onClick={()=>{setCatFilter(cat);setPage("shop");}} className="btn-outline" style={{borderRadius:"30px",padding:"10px 22px",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",flexShrink:0}}>View All →</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"20px"}}  className="prod-grid">
                  {catProds.map((p,i)=><ProductCard key={p.id} product={p} onView={openProduct} onAddCart={addCart} wishlist={wishlist} toggleWish={toggleWish} index={i}/>)}
                </div>
              </section>
            );
          })}

          <AboutSection settings={settings}/>
          <PoliciesSection settings={settings}/>
          <LocationSection settings={settings}/>

          {/* Features */}
          <section style={{padding:"60px 24px",background:"#070707",borderTop:"1px solid #1a1a1a"}}>
            <div style={{maxWidth:"1000px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"20px"}}>
              {[["✨","Exclusive Designs","Every piece is unique — once sold, never repeated"],["🧵","Premium Quality","Sourced from trusted mills across Pakistan"],["📱","Easy Booking","Book via WhatsApp in seconds"],["🔄","Easy Exchange","Hassle-free 3-day exchange policy"],["🚀","Fast Delivery","Delivered across Pakistan"],["💯","Trusted Store","Serving Kunjah & surrounding areas since years"]].map(([ic,t,d])=>(
                <div key={t} style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"14px",padding:"22px",textAlign:"center",transition:"all 0.3s"}} onMouseEnter={e=>e.currentTarget.style.border="1px solid #c9a84c33"} onMouseLeave={e=>e.currentTarget.style.border="1px solid #1a1a1a"}>
                  <div style={{fontSize:"30px",marginBottom:"10px"}}>{ic}</div>
                  <div style={{fontWeight:"700",color:"#f0ebe0",marginBottom:"6px",fontSize:"13px"}}>{t}</div>
                  <div style={{fontSize:"12px",color:"#555",lineHeight:"1.6"}}>{d}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Shop page */}
      {page==="shop"&&(
        <section style={{padding:"40px 24px",maxWidth:"1400px",margin:"0 auto",minHeight:"60vh"}}>
          <div style={{marginBottom:"28px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
            <div>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:"700"}}><span className="gold-text">{catFilter==="All"?"All Collections":catFilter}</span></h1>
              <p style={{color:"#555",fontSize:"13px",marginTop:"4px"}}>{filtered.length} pieces available</p>
            </div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
              {CATS.map(c=><button key={c} onClick={()=>setCatFilter(c)} style={{background:catFilter===c?"linear-gradient(135deg,#c9a84c,#e8c97a)":"#0f0f0f",color:catFilter===c?"#000":"#777",border:"1px solid #1a1a1a",borderRadius:"20px",padding:"7px 16px",cursor:"pointer",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",transition:"all 0.2s",textTransform:"uppercase"}}>{c}</button>)}
            </div>
          </div>
          {filtered.length===0
            ?<div style={{textAlign:"center",padding:"80px",color:"#333"}}>
              <div style={{fontSize:"48px",marginBottom:"16px"}}>🔍</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#f0ebe0",marginBottom:"8px"}}>No products found</div>
              <button onClick={()=>{setSearch("");setCatFilter("All");}} style={{background:"none",border:"1px solid #c9a84c44",borderRadius:"20px",padding:"8px 20px",color:"#c9a84c",cursor:"pointer",fontSize:"12px",marginTop:"8px"}}>Clear filters</button>
            </div>
            :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"20px"}}  className="prod-grid">
              {filtered.map((p,i)=><ProductCard key={p.id} product={p} onView={openProduct} onAddCart={addCart} wishlist={wishlist} toggleWish={toggleWish} index={i}/>)}
            </div>
          }
        </section>
      )}

      {/* Wishlist page */}
      {page==="wishlist"&&(
        <section style={{padding:"40px 24px",maxWidth:"1400px",margin:"0 auto",minHeight:"60vh"}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:"700",marginBottom:"28px"}}><span className="gold-text">My Wishlist</span></h1>
          {wishProds.length===0
            ?<div style={{textAlign:"center",padding:"80px",color:"#333"}}><div style={{fontSize:"48px",marginBottom:"16px"}}>🤍</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#f0ebe0"}}>Your wishlist is empty</div></div>
            :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"20px"}}  className="prod-grid">
              {wishProds.map((p,i)=><ProductCard key={p.id} product={p} onView={openProduct} onAddCart={addCart} wishlist={wishlist} toggleWish={toggleWish} index={i}/>)}
            </div>
          }
        </section>
      )}

      {/* Account page */}
      {page==="account"&&customer&&(
        <section style={{padding:"40px 24px",maxWidth:"600px",margin:"0 auto",minHeight:"60vh"}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:"700",marginBottom:"28px"}}><span className="gold-text">My Account</span></h1>
          <div style={{background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:"16px",padding:"24px"}}>
            {[["👤","Name",customer.name],["📞","Phone",customer.phone],["🏙️","City",customer.city],["📍","Address",customer.address]].map(([ic,l,v])=>(
              <div key={l} style={{display:"flex",gap:"12px",padding:"12px 0",borderBottom:"1px solid #0f0f0f"}}>
                <span style={{fontSize:"20px"}}>{ic}</span>
                <div><div style={{fontSize:"11px",color:"#555",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"2px"}}>{l}</div><div style={{color:"#f0ebe0",fontSize:"14px"}}>{v||"—"}</div></div>
              </div>
            ))}
            <button onClick={()=>{LS.set("customer",null);setCustomer(null);setPage("home");}} style={{marginTop:"16px",background:"none",border:"1px solid #e05252",borderRadius:"10px",padding:"10px 20px",color:"#e05252",cursor:"pointer",fontSize:"12px",fontWeight:"600"}}>Sign Out</button>
          </div>
        </section>
      )}

      <Footer settings={settings}/>

      {/* Overlays */}
      {selectedProd&&<ProductModal product={selectedProd} onClose={()=>setSelectedProd(null)} wishlist={wishlist} toggleWish={toggleWish} onAddCart={addCart} reviews={reviews} onAddReview={addReview} settings={settings}/>}
      {showCart&&<CartSidebar cart={cart} setCart={setCart} onClose={()=>setShowCart(false)} customer={customer} setShowLogin={setShowLogin} setShowCheckout={setShowCheckout} settings={settings} coupon={coupon} setCoupon={setCoupon}/>}
      {showCheckout&&customer&&<CheckoutModal cart={cart} customer={customer} onClose={()=>setShowCheckout(false)} settings={settings} coupon={coupon}/>}
      {showLogin&&<LoginModal onClose={()=>setShowLogin(false)} onLogin={setCustomer}/>}
      {showAdmin&&<AdminPanel products={products} setProducts={setProducts} reviews={reviews} settings={settings} setSettings={setSettings} onClose={()=>setShowAdmin(false)}/>}

      {/* Admin Login — hidden */}
      {showAdminLogin&&!showAdmin&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.97)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(12px)"}}>
          <div style={{background:"#0a0a0a",border:"1px solid #c9a84c22",borderRadius:"20px",padding:"36px",width:"300px",textAlign:"center",animation:"scaleIn 0.3s ease"}}>
            <div style={{fontSize:"36px",marginBottom:"12px"}}>🔐</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:"700",background:"linear-gradient(135deg,#c9a84c,#e8c97a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"4px"}}>Admin Access</div>
            <p style={{fontSize:"12px",color:"#444",marginBottom:"18px"}}>Enter admin password</p>
            <input type="password" value={adminInput} onChange={e=>setAdminInput(e.target.value)} placeholder="Password..." style={{width:"100%",background:"#111",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"11px 14px",color:"#f0ebe0",fontSize:"13px",marginBottom:"10px"}} onKeyDown={e=>{ if(e.key==="Enter"){const saved=LS.get("adminPass",ADMIN_PASS);if(adminInput===saved){setShowAdmin(true);setShowAdminLogin(false);setAdminInput("");}else alert("Wrong password!");} }}/>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>{const saved=LS.get("adminPass",ADMIN_PASS);if(adminInput===saved){setShowAdmin(true);setShowAdminLogin(false);setAdminInput("");}else alert("Wrong password!");}} className="btn-gold" style={{flex:1,borderRadius:"10px",padding:"11px",fontSize:"13px",letterSpacing:"1px"}}>Unlock</button>
              <button onClick={()=>{setShowAdminLogin(false);setAdminInput("");}} style={{background:"#111",color:"#555",border:"1px solid #1a1a1a",borderRadius:"10px",padding:"11px 16px",cursor:"pointer"}}>✕</button>
            </div>
          </div>
        </div>
      )}

      <WAButton settings={settings}/>

      {/* Hidden admin trigger — footer pe 5 baar click */}
      <div onClick={handleAdminClick} style={{position:"fixed",bottom:"4px",left:"4px",width:"20px",height:"20px",zIndex:999,cursor:"default",opacity:0}}/>
    </>
  );
}
