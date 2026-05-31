import{useState,useEffect,useRef,useCallback}from"react";
import{createClient}from"@supabase/supabase-js";

const SURL=process.env.REACT_APP_SUPABASE_URL||"";
const SKEY=process.env.REACT_APP_SUPABASE_ANON_KEY||"";
const sb=SURL&&SKEY?createClient(SURL,SKEY):null;
const WA="923228722232";
const BRAND="JAMEEL FABRICS";
const CAT_L={WU:"Women Unstitched",WS:"Women Stitched",M:"Men's Unstitched",K:"Kids"};
const CATS=[["All","All Collections"],["M","Men's Unstitched"],["WU","Women Unstitched"],["WS","Women Stitched"],["K","Kids"]];

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Jost:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Jost',sans-serif;overflow-x:hidden;background:#fff}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:10px}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideR{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes slideL{from{transform:translateX(-100%)}to{transform:translateX(0)}}
@keyframes annS{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes toastIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
`;

/* ═══ TOAST ═══ */
let _toastFn=null;
function useToast(){
  const[list,setList]=useState([]);
  _toastFn=useCallback((msg,type="")=>{
    const id=Date.now();
    setList(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setList(t=>t.filter(x=>x.id!==id)),3000);
  },[]);
  return list;
}
function toast(msg,type=""){if(_toastFn)_toastFn(msg,type);}
function Toasts({list}){
  return(
    <div style={{position:"fixed",bottom:24,right:24,zIndex:99999,display:"flex",flexDirection:"column",gap:8,maxWidth:300,pointerEvents:"none"}}>
      {list.map(t=>(
        <div key={t.id} style={{background:t.type==="error"?"#1a0000":t.type==="success"?"#001a06":"#111",color:"#fff",padding:"11px 16px",borderRadius:8,fontSize:13,boxShadow:"0 8px 24px rgba(0,0,0,.3)",borderLeft:`3px solid ${t.type==="error"?"#ef4444":t.type==="success"?"#22c55e":"#c9a84c"}`,animation:"toastIn .25s ease"}}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ═══ HOOKS ═══ */
function useDB(fn,deps=[]){
  const[data,setData]=useState(null);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    if(!sb){setLoading(false);return;}
    setLoading(true);
    fn().then(({data,error})=>{if(!error)setData(data);setLoading(false);});
  },deps);
  return{data,loading};
}

function useSettings(){
  const{data}=useDB(()=>sb.from("website_settings").select("*"),[]);
  const s={};
  if(data)data.forEach(r=>s[r.key]=r.value);
  return s;
}

/* ═══ INTRO ═══ */
function Intro({onEnter}){
  const[step,setStep]=useState(0);
  useEffect(()=>{
    const ts=[300,900,1500,2200].map((d,i)=>setTimeout(()=>setStep(i+1),d));
    return()=>ts.forEach(clearTimeout);
  },[]);
  const fu=s=>({opacity:step>=s?1:0,transform:step>=s?"translateY(0)":"translateY(20px)",transition:"all .7s cubic-bezier(.16,1,.3,1)"});
  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,background:"#111",height:step>=4?"0":"clamp(14px,2.5vw,36px)",transition:"height 1s cubic-bezier(.77,0,.18,1) .2s"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,background:"#111",height:step>=4?"0":"clamp(14px,2.5vw,36px)",transition:"height 1s cubic-bezier(.77,0,.18,1) .2s"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(#ebebeb 1px,transparent 1px),linear-gradient(90deg,#ebebeb 1px,transparent 1px)",backgroundSize:"40px 40px",opacity:.5,WebkitMaskImage:"radial-gradient(ellipse 70% 70% at 50% 50%,#000 30%,transparent 100%)"}}/>
      <div style={{...fu(1),marginBottom:"clamp(16px,2.5vw,24px)",zIndex:1}}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="37" stroke="#111" strokeWidth="1.5" opacity=".8"/>
          <path d="M40 5L42 11L40 17L38 11Z" fill="#111" opacity=".7"/>
          <path d="M40 75L42 69L40 63L38 69Z" fill="#111" opacity=".7"/>
          <path d="M5 40L11 38L17 40L11 42Z" fill="#111" opacity=".7"/>
          <path d="M75 40L69 38L63 40L69 42Z" fill="#111" opacity=".7"/>
          <text x="19" y="54" fontFamily="Playfair Display,serif" fontSize="28" fontWeight="900" fill="#111">JF</text>
        </svg>
      </div>
      <div style={{...fu(2),zIndex:1,textAlign:"center"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(44px,9vw,100px)",fontWeight:900,letterSpacing:"clamp(6px,2vw,18px)",color:"#111",lineHeight:.9}}>JAMEEL</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,7.5vw,84px)",fontWeight:700,fontStyle:"italic",color:"#888",letterSpacing:"clamp(4px,1.5vw,14px)",lineHeight:.9}}>FABRICS</div>
      </div>
      <div style={{...fu(3),zIndex:1,fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(12px,1.6vw,18px)",letterSpacing:"clamp(8px,2vw,22px)",color:"#aaa",fontStyle:"italic",marginTop:"clamp(12px,1.5vw,18px)"}}>KUNJAH</div>
      <div style={{...fu(3),width:44,height:1,background:"#111",margin:"clamp(14px,2vw,22px) auto",zIndex:1}}/>
      <div style={{...fu(3),zIndex:1,fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(11px,1.3vw,14px)",letterSpacing:5,color:"#aaa",fontStyle:"italic"}}>Exclusive · Elegant · Pakistani</div>
      {step>=4&&(
        <button onClick={onEnter} style={{marginTop:"clamp(22px,3vw,34px)",padding:"13px clamp(40px,5vw,60px)",background:"#111",color:"#fff",border:"none",fontFamily:"'Jost',sans-serif",fontSize:10,fontWeight:600,letterSpacing:4,textTransform:"uppercase",cursor:"pointer",transition:"all .3s",zIndex:1,animation:"fadeUp .6s ease both"}}
          onMouseEnter={e=>{e.currentTarget.style.background="#333";e.currentTarget.style.letterSpacing="6px"}}
          onMouseLeave={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.letterSpacing="4px"}}>
          Enter the Store
        </button>
      )}
    </div>
  );
}


/* ═══ AUTH MODAL ═══ */
function AuthModal({mode,onClose,onSuccess}){
  const[tab,setTab]=useState(mode||"login");
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const[name,setName]=useState("");
  const[phone,setPhone]=useState("");
  const[loading,setLoading]=useState(false);
  const I={width:"100%",border:"none",borderBottom:"1px solid #ddd",padding:"10px 0",fontSize:14,outline:"none",fontFamily:"inherit",background:"transparent",transition:"border-color .2s"};
  const L={fontSize:10,fontWeight:600,letterSpacing:2,color:"#888",textTransform:"uppercase",marginBottom:4,display:"block"};
  async function login(){
    if(!sb){toast("Database not connected","error");return;}
    if(!email||!pass){toast("Email aur password daalo","error");return;}
    setLoading(true);
    const{error}=await sb.auth.signInWithPassword({email,password:pass});
    setLoading(false);
    if(error)toast("Login failed: "+error.message,"error");
    else{toast("Welcome! ✓","success");onSuccess();}
  }
  async function register(){
    if(!sb){toast("Database not connected","error");return;}
    if(!email||!pass||!name){toast("Sab fields fill karo","error");return;}
    if(pass.length<6){toast("Password min 6 chars","error");return;}
    setLoading(true);
    const{error}=await sb.auth.signUp({email,password:pass,options:{data:{full_name:name,phone}}});
    setLoading(false);
    if(error)toast("Register failed: "+error.message,"error");
    else{toast("Account created! Email verify karo ✓","success");onSuccess();}
  }
  return(
    <div style={{position:"fixed",inset:0,zIndex:9998,background:"rgba(0,0,0,.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"#fff",width:"100%",maxWidth:400,padding:36,borderRadius:4,boxShadow:"0 20px 60px rgba(0,0,0,.2)"}}>
        <div style={{display:"flex",marginBottom:28,borderBottom:"1px solid #ebebeb"}}>
          {["login","register"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,color:tab===t?"#111":"#888",borderBottom:tab===t?"2px solid #111":"2px solid transparent",transition:"all .2s"}}>
              {t==="login"?"Login":"Register"}
            </button>
          ))}
        </div>
        <div style={{display:"grid",gap:20}}>
          {tab==="register"&&<div><label style={L}>Full Name *</label><input style={I} value={name} onChange={e=>setName(e.target.value)} placeholder="Ayesha Tariq" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#ddd"}/></div>}
          <div><label style={L}>Email *</label><input style={I} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#ddd"}/></div>
          <div><label style={L}>Password *</label><input style={I} type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#ddd"} onKeyDown={e=>e.key==="Enter"&&(tab==="login"?login():register())}/></div>
          {tab==="register"&&<div><label style={L}>Phone</label><input style={I} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="0300-1234567" onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#ddd"}/></div>}
        </div>
        <button onClick={tab==="login"?login:register} disabled={loading} style={{width:"100%",marginTop:24,padding:13,background:"#111",color:"#fff",border:"none",fontFamily:"inherit",fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",opacity:loading?.6:1}}>
          {loading?"Please wait...":(tab==="login"?"Login":"Create Account")}
        </button>
        <button onClick={onClose} style={{width:"100%",marginTop:10,padding:10,background:"none",border:"none",color:"#aaa",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
      </div>
    </div>
  );
}

/* ═══ CART PANEL ═══ */
function CartPanel({cart,setCart,waNum,onClose,user}){
  const[code,setCode]=useState("");
  const[coupon,setCoupon]=useState(null);
  const[cLoad,setCLoad]=useState(false);
  const sub=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const disc=coupon?(coupon.type==="percent"?Math.round(sub*coupon.value/100):coupon.value):0;
  const total=Math.max(0,sub-disc);
  async function applyC(){
    if(!code.trim()||!sb)return;
    setCLoad(true);
    const{data}=await sb.from("coupons").select("*").eq("code",code.toUpperCase()).eq("active",true).single();
    setCLoad(false);
    if(!data){toast("Invalid coupon","error");return;}
    if(data.expires_at&&new Date(data.expires_at)<new Date()){toast("Coupon expired!","error");return;}
    if(sub<(data.min_order||0)){toast("Min order Rs."+Number(data.min_order).toLocaleString()+" chahiye","error");return;}
    setCoupon(data);toast("Coupon applied! ✓","success");
  }
  async function checkout(){
    if(!cart.length)return;
    if(sb&&user){
      await sb.from("online_orders").insert({customer_id:user.id,customer_email:user.email,customer_name:user.user_metadata?.full_name||"",items:cart,total,coupon_code:coupon?.code||null,discount_amount:disc,status:"pending"});
      if(coupon)await sb.from("coupons").update({used_count:(coupon.used_count||0)+1}).eq("id",coupon.id);
    }
    let msg="Assalamualaikum! 🌙\n\nI would like to place an order from *JAMEEL FABRICS*.\n\n";
    msg+="━━━━━━━━━━━━━━━━━━━━\n🛍️ *ORDER DETAILS*\n━━━━━━━━━━━━━━━━━━━━\n\n";
    msg+=cart.map(p=>{
      let l="▪ *"+p.name+"*";
      l+="\n   Category: "+(CAT_L[p.cat]||p.cat||"");
      if(p.color)l+="\n   Color: "+p.color;
      l+="\n   Price: Rs."+Number(p.price).toLocaleString()+" x "+p.qty+" = Rs."+(p.price*p.qty).toLocaleString();
      if(p.img1||p.photo_url)l+="\n   Image: "+(p.img1||p.photo_url);
      return l;
    }).join("\n\n");
    msg+="\n\n";
    if(coupon)msg+="🏷️ Coupon: "+coupon.code+" (-Rs."+disc.toLocaleString()+")\n\n";
    msg+="━━━━━━━━━━━━━━━━━━━━\n💰 *TOTAL: Rs."+total.toLocaleString()+"*\n━━━━━━━━━━━━━━━━━━━━\n\n";
    msg+="Please confirm availability and delivery details.\n\nJazakAllah Khair! 🤲";
    window.open("https://wa.me/"+(waNum||WA)+"?text="+encodeURIComponent(msg),"_blank");
    setCart([]);onClose();
  }
  return(
    <>
      <div style={{position:"fixed",inset:0,zIndex:9990,background:"rgba(0,0,0,.4)",backdropFilter:"blur(3px)"}} onClick={onClose}/>
      <div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(400px,95vw)",background:"#fff",zIndex:9991,display:"flex",flexDirection:"column",boxShadow:"-12px 0 40px rgba(0,0,0,.15)",animation:"slideR .3s ease"}}>
        <div style={{padding:"18px 20px",borderBottom:"1px solid #ebebeb",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Cart ({cart.reduce((s,x)=>s+x.qty,0)})</div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#888",lineHeight:1}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
          {!cart.length?(
            <div style={{textAlign:"center",padding:"48px 20px",color:"#aaa"}}>
              <div style={{fontSize:40,marginBottom:12}}>🛒</div>
              <div style={{fontSize:15,fontWeight:600,color:"#888"}}>Cart is empty</div>
              <div style={{fontSize:13,marginTop:4}}>Products add karo!</div>
            </div>
          ):cart.map(item=>(
            <div key={item.id} style={{display:"flex",gap:12,marginBottom:16,padding:12,background:"#f9f9f9",borderRadius:8}}>
              <div style={{width:52,height:64,background:"#f0f0f0",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0,overflow:"hidden"}}>
                {(item.img1||item.photo_url)?<img src={item.img1||item.photo_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(item.icon||"👗")}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{item.name}</div>
                <div style={{fontSize:12,color:"#888",marginBottom:6}}>{item.color}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <button onClick={()=>setCart(c=>item.qty===1?c.filter(x=>x.id!==item.id):c.map(x=>x.id===item.id?{...x,qty:x.qty-1}:x))} style={{width:26,height:26,border:"1px solid #ddd",borderRadius:4,background:"#fff",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:13,fontWeight:600,minWidth:16,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={()=>setCart(c=>c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x))} style={{width:26,height:26,border:"1px solid #ddd",borderRadius:4,background:"#fff",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontWeight:700,fontFamily:"'Cormorant Garamond',serif",fontSize:16}}>Rs.{(item.price*item.qty).toLocaleString()}</span>
                    <button onClick={()=>setCart(c=>c.filter(x=>x.id!==item.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#ccc",fontSize:18,lineHeight:1}}>×</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length>0&&(
          <div style={{padding:"16px 20px",borderTop:"1px solid #ebebeb",flexShrink:0}}>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="Coupon code" style={{flex:1,border:"1px solid #ddd",borderRadius:4,padding:"8px 12px",fontSize:13,outline:"none",fontFamily:"inherit",letterSpacing:1,fontWeight:600}}/>
              <button onClick={applyC} disabled={cLoad} style={{background:"#111",color:"#fff",border:"none",padding:"8px 16px",borderRadius:4,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{cLoad?"...":"APPLY"}</button>
            </div>
            <div style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#888",marginBottom:4}}><span>Subtotal</span><span>Rs.{sub.toLocaleString()}</span></div>
              {coupon&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#16a34a",marginBottom:4}}><span>Discount ({coupon.code})</span><span>-Rs.{disc.toLocaleString()}</span></div>}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700,marginTop:8,paddingTop:8,borderTop:"1px solid #ebebeb"}}>
                <span>Total</span>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20}}>Rs.{total.toLocaleString()}</span>
              </div>
              <div style={{fontSize:11,color:"#aaa",marginTop:4}}>* Delivery charges separate (WhatsApp pe discuss)</div>
            </div>
            <button onClick={checkout} style={{width:"100%",padding:14,background:"#111",color:"#fff",border:"none",borderRadius:4,fontFamily:"inherit",fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}


/* ═══ PRODUCT CARD ═══ */
function PCard({prod,onAdd,onWish,wished,idx}){
  const[hov,setHov]=useState(false);
  const[added,setAdded]=useState(false);
  const img=prod.img1||prod.photo_url||"";
  function handleAdd(e){
    e.stopPropagation();
    onAdd(prod);
    setAdded(true);
    setTimeout(()=>setAdded(false),1200);
  }
  return(
    <div style={{background:"#fff",border:"1px solid "+(hov?"#111":"#ebebeb"),cursor:"pointer",transition:"all .4s cubic-bezier(.16,1,.3,1)",position:"relative",overflow:"hidden",transform:hov?"translateY(-6px)":"none",boxShadow:hov?"0 18px 48px rgba(0,0,0,.08)":"none",animation:"fadeUp .7s ease both",animationDelay:idx*.06+"s"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden"}}>
        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(48px,7vw,72px)",background:"#f5f5f5",transition:"transform .6s cubic-bezier(.16,1,.3,1)",transform:hov?"scale(1.08)":"scale(1)"}}>
          {img?<img src={img} alt={prod.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";}}/>:(prod.icon||"👗")}
        </div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent 55%)",opacity:hov?1:0,transition:"opacity .3s",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",paddingBottom:16,gap:8}}>
          <button onClick={handleAdd} style={{background:"#fff",color:"#111",border:"none",padding:"9px 28px",fontSize:9,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",transform:hov?"translateY(0)":"translateY(14px)",transition:"transform .3s"}}>
            ADD TO CART
          </button>
        </div>
        {prod.badge&&<div style={{position:"absolute",top:10,left:10,background:prod.badge==="SALE"?"#c0392b":"#111",color:"#fff",padding:"3px 9px",fontSize:7,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase",zIndex:2}}>{prod.badge}</div>}
        <button onClick={e=>{e.stopPropagation();onWish(prod.id);}} style={{position:"absolute",top:10,right:10,zIndex:2,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.9)",border:"1px solid #e0e0e0",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:hov?1:0,transform:hov?"scale(1)":"scale(.7)",transition:"all .25s"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke={wished?"#c0392b":"currentColor"} strokeWidth="1.5" fill={wished?"#c0392b":"none"}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div style={{padding:"12px 14px 16px"}}>
        <div style={{fontSize:8,color:"#888",letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{CAT_L[prod.cat]||prod.website_category||prod.category||""}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#111",marginBottom:3,lineHeight:1.3}}>{prod.name}</div>
        {prod.color&&<div style={{fontSize:11,color:"#888",marginBottom:6}}>{prod.color}</div>}
        {prod.display_stock_text&&<div style={{fontSize:10,color:"#999",marginBottom:7,fontStyle:"italic"}}>{prod.display_stock_text}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
          <div style={{display:"flex",flexDirection:"column",gap:1}}>
            {prod.old_price&&<span style={{fontSize:11,color:"#bbb",textDecoration:"line-through",fontFamily:"'Cormorant Garamond',serif"}}>Rs.{Number(prod.old_price).toLocaleString()}</span>}
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:700,color:prod.old_price?"#c0392b":"#111"}}>Rs.{Number(prod.sale_price||prod.price||0).toLocaleString()}</span>
          </div>
          <button onClick={handleAdd} style={{flexShrink:0,background:added?"#16a34a":"#111",color:"#fff",border:"none",width:40,height:40,cursor:"pointer",fontFamily:"inherit",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
            {added?"✓":"ADD"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══ ACCOUNT PAGE ═══ */
function AccountPage({user,onBack}){
  const[orders,setOrders]=useState([]);
  const[wl,setWl]=useState([]);
  useEffect(()=>{
    if(!sb||!user)return;
    sb.from("online_orders").select("*").eq("customer_id",user.id).order("created_at",{ascending:false}).then(({data})=>setOrders(data||[]));
    sb.from("wishlists").select("*,products(*)").eq("customer_id",user.id).then(({data})=>setWl(data||[]));
  },[user]);
  const C={card:{background:"#fff",border:"1px solid #ebebeb",borderRadius:8,padding:20,marginBottom:16}};
  return(
    <div style={{background:"#f9f9f9",minHeight:"100vh",fontFamily:"'Jost',sans-serif"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #ebebeb",padding:"16px clamp(16px,4vw,60px)",display:"flex",alignItems:"center",gap:16,position:"sticky",top:0,zIndex:100}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:"#666",fontSize:13,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
          Back
        </button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>My Account</div>
      </div>
      <div style={{maxWidth:800,margin:"0 auto",padding:"24px clamp(16px,4vw,40px)"}}>
        <div style={C.card}>
          <div style={{fontSize:15,fontWeight:600,marginBottom:12}}>Account Info</div>
          <div style={{fontSize:14,color:"#666",marginBottom:4}}><strong>Email:</strong> {user.email}</div>
          <div style={{fontSize:14,color:"#666"}}><strong>Name:</strong> {user.user_metadata?.full_name||"Not set"}</div>
        </div>
        <div style={C.card}>
          <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>My Orders ({orders.length})</div>
          {!orders.length?<div style={{textAlign:"center",padding:32,color:"#aaa"}}><div style={{fontSize:32,marginBottom:8}}>📦</div><div>No orders yet</div></div>:
            orders.map(o=>(
              <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f0f0f0",flexWrap:"wrap",gap:8}}>
                <div><div style={{fontWeight:600,fontSize:13}}>#{o.id.slice(-6).toUpperCase()}</div><div style={{fontSize:11,color:"#aaa",marginTop:2}}>{(o.items||[]).length} items · {new Date(o.created_at).toLocaleDateString()}</div></div>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{fontWeight:700,fontFamily:"'Cormorant Garamond',serif",fontSize:17}}>Rs.{Number(o.total).toLocaleString()}</div>
                  <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:o.status==="delivered"?"#dcfce7":o.status==="confirmed"?"#dbeafe":"#fef9c3",color:o.status==="delivered"?"#16a34a":o.status==="confirmed"?"#2563eb":"#ca8a04"}}>{o.status}</span>
                </div>
              </div>
            ))
          }
        </div>
        <div style={C.card}>
          <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>Wishlist ({wl.length})</div>
          {!wl.length?<div style={{textAlign:"center",padding:32,color:"#aaa"}}><div style={{fontSize:32,marginBottom:8}}>🤍</div><div>No saved items</div></div>:
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12}}>
              {wl.map(w=>(
                <div key={w.id} style={{border:"1px solid #ebebeb",borderRadius:6,overflow:"hidden"}}>
                  <div style={{aspectRatio:"3/4",background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{w.products?.icon||"👗"}</div>
                  <div style={{padding:"10px 12px"}}>
                    <div style={{fontWeight:600,fontSize:13,color:"#111"}}>{w.products?.name||""}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,marginTop:4}}>Rs.{Number(w.products?.sale_price||w.products?.price||0).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}


/* ═══ STORE ═══ */
function Store({user,onLogout,onAccount,onAdmin}){
  const settings=useSettings();
  const[prods,setProds]=useState([]);
  const[cat,setCat]=useState("All");
  const[cart,setCart]=useState([]);
  const[wish,setWish]=useState(new Set());
  const[cartOpen,setCartOpen]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[authModal,setAuthModal]=useState(null);
  const[subEmail,setSubEmail]=useState("");
  const[subLoading,setSubLoading]=useState(false);

  useEffect(()=>{
    if(!sb)return;
    sb.from("products").select("*").eq("website_status","approved").eq("active",true).order("created_at",{ascending:false}).then(({data})=>setProds(data||[]));
    const ch=sb.channel("shop_prods").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{
      sb.from("products").select("*").eq("website_status","approved").eq("active",true).order("created_at",{ascending:false}).then(({data})=>setProds(data||[]));
    }).subscribe();
    return()=>sb.removeChannel(ch);
  },[]);

  useEffect(()=>{
    if(!sb||!user)return;
    sb.from("wishlists").select("product_id").eq("customer_id",user.id).then(({data})=>{if(data)setWish(new Set(data.map(x=>x.product_id)));});
  },[user]);

  useEffect(()=>{
    document.body.style.overflow=menuOpen?"hidden":"";
    return()=>{document.body.style.overflow="";};
  },[menuOpen]);

  const aRef=useRef(0),aTimer=useRef(null);
  function adminTrigger(){
    aRef.current++;
    clearTimeout(aTimer.current);
    aTimer.current=setTimeout(()=>aRef.current=0,2000);
    if(aRef.current>=5){aRef.current=0;onAdmin();}
  }

  const filtered=cat==="All"?prods:prods.filter(p=>p.cat===cat||(p.website_category&&p.website_category.includes(cat)));
  const cartCount=cart.reduce((s,x)=>s+x.qty,0);
  const wa=settings.wa_number||WA;
  const ann=(settings.announcement||"✦ New Arrivals|✦ Exclusive Designs|✦ Fast Delivery|✦ Book on WhatsApp").split("|");

  function addToCart(prod){
    setCart(c=>{const ex=c.find(x=>x.id===prod.id);if(ex)return c.map(x=>x.id===prod.id?{...x,qty:x.qty+1}:x);return[...c,{...prod,qty:1}];});
    toast("Added: "+prod.name,"success");
  }

  async function toggleWish(id){
    if(!user){setAuthModal("login");toast("Login karke wishlist save karo");return;}
    const has=wish.has(id);
    if(has){setWish(w=>{const n=new Set(w);n.delete(id);return n;});if(sb)await sb.from("wishlists").delete().eq("customer_id",user.id).eq("product_id",id);}
    else{setWish(w=>new Set([...w,id]));if(sb)await sb.from("wishlists").insert({customer_id:user.id,product_id:id});}
  }

  async function subscribe(){
    if(!subEmail||!subEmail.includes("@")){toast("Valid email daalo","error");return;}
    setSubLoading(true);
    if(sb)await sb.from("subscribers").upsert({email:subEmail},{onConflict:"email"});
    setSubLoading(false);
    toast("Subscribed! Discount offers milenge ✓","success");
    setSubEmail("");
  }

  const WASvg=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;

  const menuItems=[
    {ic:"🏠",lbl:"Home",fn:()=>{setCat("All");setMenuOpen(false);window.scrollTo({top:0,behavior:"smooth"});}},
    {ic:"👔",lbl:"Men's Unstitched",fn:()=>{setCat("M");setMenuOpen(false);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}},
    {ic:"👗",lbl:"Women Unstitched",fn:()=>{setCat("WU");setMenuOpen(false);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}},
    {ic:"✨",lbl:"Women Stitched",fn:()=>{setCat("WS");setMenuOpen(false);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}},
    {ic:"🌟",lbl:"Kids",fn:()=>{setCat("K");setMenuOpen(false);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}},
  ];

  return(
    <div style={{background:"#fff",minHeight:"100vh",fontFamily:"'Jost',sans-serif"}}>

      {/* Announcement */}
      <div style={{background:"#111",height:34,display:"flex",alignItems:"center",overflow:"hidden"}}>
        <div style={{display:"flex",animation:"annS 28s linear infinite",whiteSpace:"nowrap"}}>
          {[...ann,...ann].map((a,i)=><span key={i} style={{padding:"0 44px",fontSize:10,letterSpacing:2,color:"#fff",textTransform:"uppercase"}}>{a.trim()}</span>)}
        </div>
      </div>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid #e8e8e8",height:66,display:"flex",alignItems:"center",padding:"0 clamp(12px,3vw,48px)",gap:8,boxShadow:"0 1px 12px rgba(0,0,0,.05)"}}>
        <button onClick={()=>{setCat("All");window.scrollTo({top:0,behavior:"smooth"});}} style={{cursor:"pointer",flexShrink:0,lineHeight:1.1,marginRight:"auto",background:"none",border:"none",textAlign:"left"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(12px,1.5vw,16px)",fontWeight:900,letterSpacing:3,color:"#111"}}>{settings.store_name||"JAMEEL FABRICS"}</div>
          <div style={{fontSize:8,letterSpacing:4,color:"#888",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>Kunjah · Est. Punjab</div>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
          {/* Wishlist */}
          <button onClick={()=>user?onAccount():setAuthModal("login")} style={{background:"none",border:"none",cursor:"pointer",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",color:"#666",borderRadius:4,transition:"background .2s",position:"relative"}} onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {wish.size>0&&<span style={{position:"absolute",top:4,right:4,background:"#111",color:"#fff",borderRadius:"50%",width:15,height:15,fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{wish.size}</span>}
          </button>
          {/* Cart */}
          <button onClick={()=>setCartOpen(true)} style={{background:"#111",color:"#fff",border:"none",padding:"8px 12px",fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,cursor:"pointer",transition:"background .2s",whiteSpace:"nowrap",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.background="#333"} onMouseLeave={e=>e.currentTarget.style.background="#111"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Cart ({cartCount})
          </button>
          {/* 3-dot menu */}
          <button onClick={()=>setMenuOpen(true)} style={{background:"none",border:"none",cursor:"pointer",width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:5,flexShrink:0,borderRadius:4,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#f0f0f0"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            {[0,1,2].map(i=><span key={i} style={{display:"block",width:5,height:5,borderRadius:"50%",background:"#111"}}/>)}
          </button>
        </div>
      </nav>

      {/* SIDE MENU */}
      {menuOpen&&(
        <>
          <div style={{position:"fixed",inset:0,zIndex:998,background:"rgba(0,0,0,.45)",backdropFilter:"blur(3px)"}} onClick={()=>setMenuOpen(false)}/>
          <div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(310px,85vw)",zIndex:999,background:"#fff",display:"flex",flexDirection:"column",boxShadow:"-12px 0 40px rgba(0,0,0,.12)",animation:"slideR .3s cubic-bezier(.77,0,.18,1)"}}>
            <div style={{padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #ebebeb",flexShrink:0}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700}}>JAMEEL FABRICS</span>
              <button onClick={()=>setMenuOpen(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#888",lineHeight:1}}>✕</button>
            </div>
            <div style={{flex:1,overflowY:"auto",overscrollBehavior:"contain"}}>
              <div style={{padding:"10px 20px 4px",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#aaa",fontWeight:600}}>Navigation</div>
              {menuItems.map(({ic,lbl,fn})=>(
                <button key={lbl} onClick={fn} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 20px",cursor:"pointer",border:"none",background:"none",width:"100%",textAlign:"left",fontFamily:"inherit",fontSize:13,fontWeight:500,color:"#111",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  <span style={{opacity:.7,fontSize:18,width:24,textAlign:"center"}}>{ic}</span>{lbl}
                </button>
              ))}
              <div style={{height:1,margin:"8px 20px",background:"#ebebeb"}}/>
              <div style={{padding:"10px 20px 4px",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#aaa",fontWeight:600}}>Account</div>
              {user?(
                <>
                  <button onClick={()=>{onAccount();setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 20px",cursor:"pointer",border:"none",background:"none",width:"100%",textAlign:"left",fontFamily:"inherit",fontSize:13,fontWeight:500,color:"#111"}} onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                    <span style={{opacity:.7,fontSize:18,width:24,textAlign:"center"}}>👤</span>My Account
                  </button>
                  <button onClick={()=>{onLogout();setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 20px",cursor:"pointer",border:"none",background:"none",width:"100%",textAlign:"left",fontFamily:"inherit",fontSize:13,fontWeight:500,color:"#888"}} onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                    <span style={{opacity:.7,fontSize:18,width:24,textAlign:"center"}}>🚪</span>Logout
                  </button>
                </>
              ):(
                <button onClick={()=>{setAuthModal("login");setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 20px",cursor:"pointer",border:"none",background:"none",width:"100%",textAlign:"left",fontFamily:"inherit",fontSize:13,fontWeight:500,color:"#111"}} onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  <span style={{opacity:.7,fontSize:18,width:24,textAlign:"center"}}>👤</span>Login / Register
                </button>
              )}
              <div style={{height:1,margin:"8px 20px",background:"#ebebeb"}}/>
              <div style={{padding:"10px 20px 4px",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#aaa",fontWeight:600}}>Contact</div>
              <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <button style={{display:"flex",alignItems:"center",gap:14,padding:"12px 20px",cursor:"pointer",border:"none",background:"none",width:"100%",textAlign:"left",fontFamily:"inherit",fontSize:13,fontWeight:500,color:"#111"}} onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  <span style={{opacity:.7,fontSize:18,width:24,textAlign:"center",color:"#25D366"}}>💬</span>WhatsApp Us
                </button>
              </a>
            </div>
            {/* Subscribe */}
            <div style={{padding:"14px 20px 18px",borderTop:"1px solid #ebebeb",background:"#f9f9f9",flexShrink:0}}>
              <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#888",fontWeight:600,marginBottom:8}}>Get Discount Offers</div>
              <div style={{display:"flex",gap:6}}>
                <input type="email" value={subEmail} onChange={e=>setSubEmail(e.target.value)} placeholder="Your email" style={{flex:1,border:"1px solid #ddd",padding:"9px 11px",fontSize:12,color:"#111",outline:"none",fontFamily:"inherit",background:"#fff",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor="#111"} onBlur={e=>e.target.style.borderColor="#ddd"} onKeyDown={e=>e.key==="Enter"&&subscribe()}/>
                <button onClick={subscribe} disabled={subLoading} style={{background:"#111",color:"#fff",border:"none",padding:"9px 13px",fontSize:9,fontWeight:700,letterSpacing:1,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",whiteSpace:"nowrap",opacity:subLoading?.6:1}}>
                  {subLoading?"...":"Subscribe"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* HERO */}
      <section style={{minHeight:"92vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px clamp(16px,5vw,80px) 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(#efefef 1px,transparent 1px),linear-gradient(90deg,#efefef 1px,transparent 1px)",backgroundSize:"44px 44px",WebkitMaskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,#000 20%,transparent 100%)",opacity:.5,pointerEvents:"none"}}/>
        <div style={{fontSize:10,letterSpacing:7,color:"#888",textTransform:"uppercase",marginBottom:20,animation:"fadeUp .8s ease .1s both",zIndex:1}}>{settings.hlabel||"Winter Collection 2026"}</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(52px,10vw,120px)",fontWeight:900,lineHeight:.92,color:"#111",letterSpacing:"clamp(3px,1.5vw,14px)",animation:"fadeUp .8s ease .2s both",zIndex:1}}>
          JAMEEL
          <span style={{display:"block",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:"italic",color:"#888",fontSize:"clamp(28px,5vw,64px)",letterSpacing:"clamp(8px,2.5vw,28px)"}}>FABRICS</span>
        </h1>
        <div style={{width:44,height:1,background:"#111",margin:"clamp(18px,2.5vw,28px) auto",animation:"fadeUp .6s ease .45s both",zIndex:1}}/>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(14px,1.8vw,20px)",color:"#888",fontStyle:"italic",letterSpacing:3,marginBottom:36,animation:"fadeUp .8s ease .5s both",zIndex:1}}>{settings.hsub||"Exclusive · Elegant · Pakistani"}</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",animation:"fadeUp .8s ease .6s both",zIndex:1}}>
          <button onClick={()=>document.getElementById("prods")?.scrollIntoView({behavior:"smooth"})} style={{background:"#111",color:"#fff",border:"none",padding:"14px 40px",fontSize:10,fontWeight:600,letterSpacing:4,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.background="#333";e.currentTarget.style.letterSpacing="5px"}} onMouseLeave={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.letterSpacing="4px"}}>
            Explore Collection
          </button>
          <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"transparent",color:"#111",border:"1px solid #111",padding:"14px 34px",fontSize:10,fontWeight:600,letterSpacing:4,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.color="#fff"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#111"}}>
              WhatsApp Us
            </button>
          </a>
        </div>
        <div onClick={adminTrigger} style={{position:"absolute",bottom:0,left:0,width:30,height:30,opacity:0,cursor:"default"}}/>
      </section>

      {/* VIDEO SECTION */}
      {settings.video_show==="true"&&settings.video_url&&(
        <section style={{padding:"clamp(48px,6vw,72px) clamp(16px,4vw,60px)",borderTop:"1px solid #ebebeb"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:9,letterSpacing:5,color:"#888",textTransform:"uppercase",marginBottom:10}}>{settings.video_label||"Featured"}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,2.5vw,34px)",fontWeight:700,color:"#111"}}>{settings.video_title||"Watch Our Collection"}</div>
            <div style={{width:36,height:1,background:"#111",margin:"12px auto"}}/>
          </div>
          <div style={{maxWidth:900,margin:"0 auto",border:"1px solid #ebebeb"}}>
            {(settings.video_url.includes("youtube")||settings.video_url.includes("youtu.be"))?
              <iframe src={"https://www.youtube.com/embed/"+(settings.video_url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)||[])[1]+"?rel=0"} style={{width:"100%",height:"clamp(200px,45vw,500px)",border:"none"}} allowFullScreen/>:
              <video src={settings.video_url} controls style={{width:"100%",maxHeight:500,display:"block"}} preload="metadata"/>
            }
          </div>
        </section>
      )}

      {/* PRODUCTS */}
      <section id="prods" style={{borderTop:"1px solid #ebebeb"}}>
        {/* Category tabs */}
        <div style={{background:"#fff",borderBottom:"1px solid #ebebeb",display:"flex",justifyContent:"center",overflowX:"auto",position:"sticky",top:66,zIndex:99}}>
          {CATS.map(([c,lbl])=>(
            <button key={c} onClick={()=>setCat(c)} style={{padding:"14px clamp(10px,2vw,20px)",border:"none",background:"none",cursor:"pointer",fontFamily:"inherit",fontSize:10,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",color:cat===c?"#111":"#888",borderBottom:cat===c?"2px solid #111":"2px solid transparent",transition:"all .25s",whiteSpace:"nowrap",flexShrink:0}}>
              {lbl}
            </button>
          ))}
        </div>
        <div style={{textAlign:"center",padding:"clamp(40px,5vw,60px) clamp(16px,4vw,60px) 28px"}}>
          <div style={{fontSize:9,letterSpacing:5,color:"#888",textTransform:"uppercase",marginBottom:8}}>Our Collection</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,2.5vw,34px)",fontWeight:700,color:"#111"}}>{cat==="All"?"All Collections":CAT_L[cat]||cat}</div>
          <div style={{width:36,height:1,background:"#111",margin:"12px auto"}}/>
        </div>
        {!prods.length&&!sb?(
          <div style={{textAlign:"center",padding:48,color:"#aaa"}}><div style={{fontSize:36,marginBottom:12}}>⚙️</div><div style={{fontSize:14}}>Database not connected</div></div>
        ):filtered.length===0?(
          <div style={{textAlign:"center",padding:48,color:"#aaa"}}><div style={{fontSize:36,marginBottom:12}}>📦</div><div style={{fontSize:15,fontWeight:600,color:"#888"}}>No products found</div></div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:"clamp(10px,1.5vw,18px)",padding:"0 clamp(16px,4vw,60px) 80px",maxWidth:1440,margin:"0 auto"}}>
            {filtered.map((prod,i)=>(
              <PCard key={prod.id} prod={prod} idx={i} onAdd={addToCart} onWish={toggleWish} wished={wish.has(prod.id)}/>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section style={{background:"#f9f9f9",borderTop:"1px solid #ebebeb",borderBottom:"1px solid #ebebeb",padding:"clamp(60px,8vw,100px) clamp(16px,5vw,80px)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(32px,5vw,72px)",alignItems:"center"}}>
        <div>
          <div style={{fontSize:9,letterSpacing:5,color:"#888",textTransform:"uppercase",marginBottom:10}}>Our Story</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3.5vw,36px)",fontWeight:700,color:"#111",marginBottom:16}}>About Jameel Fabrics</h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(14px,1.6vw,18px)",color:"#888",lineHeight:2,fontStyle:"italic"}}>{settings.about||"Welcome to Jameel Fabrics Kunjah — your trusted destination for premium Pakistani clothing."}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["100%","Exclusive"],["✓","Quality"],["⚡","Fast"],["🔄","Exchange"]].map(([n,l])=>(
            <div key={l} style={{border:"1px solid #e0e0e0",padding:22,textAlign:"center",transition:"all .3s",cursor:"default"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#111";e.currentTarget.style.background="#fff";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e0e0e0";e.currentTarget.style.background="none";}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,2.5vw,26px)",fontWeight:700,color:"#111"}}>{n}</div>
              <div style={{fontSize:9,letterSpacing:2,color:"#aaa",textTransform:"uppercase",marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",borderTop:"1px solid #ebebeb",borderBottom:"1px solid #ebebeb"}}>
        {[["✨","Exclusive","Each piece unique"],["🧵","Premium","Finest fabrics"],["📱","Easy Booking","Via WhatsApp"],["🚀","Fast Delivery","3–5 days"],["🔄","Exchange","Hassle-free"],["💯","Trusted","Serving Kunjah"]].map(([ic,n,d])=>(
          <div key={n} style={{padding:"clamp(18px,2.5vw,28px)",textAlign:"center",borderRight:"1px solid #ebebeb",transition:"background .2s",cursor:"default"}} onMouseEnter={e=>e.currentTarget.style.background="#f9f9f9"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <div style={{fontSize:22,marginBottom:8}}>{ic}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:"#111",marginBottom:3}}>{n}</div>
            <div style={{fontSize:10,color:"#888",lineHeight:1.7}}>{d}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer style={{background:"#111",color:"#e0e0e0",padding:"clamp(44px,5vw,70px) clamp(16px,4vw,60px) 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:"clamp(20px,3vw,40px)",marginBottom:44}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:900,letterSpacing:3,color:"#fff",marginBottom:4}}>{settings.store_name||"JAMEEL FABRICS"}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:9,letterSpacing:4,color:"rgba(255,255,255,.35)",marginBottom:12,fontStyle:"italic"}}>Kunjah · Est. Punjab</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.9,marginBottom:14}}>Premium Pakistani clothing.</div>
            <div style={{display:"flex",gap:8}}>
              {[{url:settings.insta||"#",bg:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",lbl:"IG"},{url:"https://wa.me/"+wa,bg:"#25D366",lbl:"WA"},{url:settings.tiktok||"#",bg:"#000",lbl:"TK"},{url:settings.fb||"#",bg:"#1877F2",lbl:"FB"}].map(s=>(
                <a key={s.lbl} href={s.url} target="_blank" rel="noopener noreferrer" style={{width:34,height:34,borderRadius:4,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"transform .2s",textDecoration:"none",fontSize:10,fontWeight:700,color:"#fff"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>{s.lbl}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{fontSize:8,letterSpacing:3,color:"rgba(255,255,255,.5)",textTransform:"uppercase",marginBottom:14}}>Collection</h4>
            {["Men's Unstitched","Women Unstitched","Women Stitched","Kids"].map(l=>(
              <div key={l} style={{fontSize:11,color:"rgba(255,255,255,.32)",padding:"4px 0",cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:8,letterSpacing:3,color:"rgba(255,255,255,.5)",textTransform:"uppercase",marginBottom:14}}>Info</h4>
            {["About Us","Delivery Info","Return Policy","Contact"].map(l=>(
              <div key={l} style={{fontSize:11,color:"rgba(255,255,255,.32)",padding:"4px 0",cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:8,letterSpacing:3,color:"rgba(255,255,255,.5)",textTransform:"uppercase",marginBottom:14}}>Contact</h4>
            {["📍 "+(settings.addr1||"Circular Road, Kunjah"),"📍 "+(settings.addr2||"Distt Gujrat, Punjab"),"📞 "+(settings.phone||"03228722232"),"⏰ "+(settings.hours||"Mon–Sat: 10am–8pm")].map(l=>(
              <div key={l} style={{fontSize:11,color:"rgba(255,255,255,.32)",padding:"4px 0"}}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:18,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,.2)",letterSpacing:1}}>© 2026 {settings.store_name||"JAMEEL FABRICS"}. All Rights Reserved.</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,.2)",letterSpacing:1}}>Premium Pakistani Fabrics</div>
        </div>
      </footer>

      {/* WA Float */}
      <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:26,right:26,width:52,height:52,background:"#25D366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 26px rgba(37,211,102,.4)",cursor:"pointer",textDecoration:"none",zIndex:700,transition:"transform .3s",color:"#fff"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
        <WASvg/>
      </a>

      {cartOpen&&<CartPanel cart={cart} setCart={setCart} waNum={wa} onClose={()=>setCartOpen(false)} user={user}/>}
      {authModal&&<AuthModal mode={authModal} onClose={()=>setAuthModal(null)} onSuccess={()=>setAuthModal(null)}/>}
    </div>
  );
}


/* ═══ ADMIN LOGIN ═══ */
function AdminLogin({onSuccess,onCancel}){
  const[pass,setPass]=useState("");
  const[loading,setLoading]=useState(false);
  async function check(){
    setLoading(true);
    let ok=false;
    if(sb){const{data}=await sb.from("website_settings").select("value").eq("key","admin_pass").single();ok=data?.value===pass;}
    else ok=pass==="jameel@admin2026";
    setLoading(false);
    if(ok)onSuccess();else{setPass("");toast("Wrong password!","error");}
  }
  return(
    <div style={{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,.85)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)"}}>
      <div style={{background:"#fff",padding:40,width:"100%",maxWidth:340,textAlign:"center",borderRadius:4}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#111",marginBottom:6}}>Admin Panel</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"#888",fontStyle:"italic",marginBottom:28}}>Jameel Fabrics</div>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&check()} style={{width:"100%",border:"none",borderBottom:"1px solid #ddd",padding:"10px 0",fontSize:16,color:"#111",outline:"none",textAlign:"center",letterSpacing:4,marginBottom:20,fontFamily:"inherit",background:"transparent",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderBottomColor="#111"} onBlur={e=>e.target.style.borderBottomColor="#ddd"}/>
        <button onClick={check} disabled={loading} style={{width:"100%",background:"#111",color:"#fff",border:"none",padding:13,fontSize:11,fontWeight:700,letterSpacing:3,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",textTransform:"uppercase",marginBottom:10,opacity:loading?.6:1}}>
          {loading?"Checking...":"Unlock"}
        </button>
        <button onClick={onCancel} style={{background:"none",border:"none",color:"#aaa",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
      </div>
    </div>
  );
}

/* ═══ ADMIN PANEL (PROFESSIONAL SIDEBAR) ═══ */
function AdminPanel({onExit}){
  const[page,setPage]=useState("dashboard");
  const[collapsed,setCollapsed]=useState(false);
  const settings=useSettings();
  const{data:allProds}=useDB(()=>sb.from("products").select("*").order("created_at",{ascending:false}),[]);
  const{data:pending}=useDB(()=>sb.from("products").select("*").eq("website_status","pending"),[]);
  const{data:orders}=useDB(()=>sb.from("online_orders").select("*").order("created_at",{ascending:false}),[]);
  const{data:alerts}=useDB(()=>sb.from("website_alerts").select("*").eq("resolved",false).order("created_at",{ascending:false}),[]);
  const{data:coupons}=useDB(()=>sb.from("coupons").select("*"),[]);
  const{data:offers}=useDB(()=>sb.from("website_offers").select("*"),[]);
  const{data:subs}=useDB(()=>sb.from("subscribers").select("*").order("subscribed_at",{ascending:false}),[]);

  const pCount=pending?.length||0;
  const aCount=alerts?.length||0;
  const pendingOrders=orders?.filter(o=>o.status==="pending").length||0;

  function refresh(){window.location.reload();}

  const navItems=[
    {id:"dashboard",ic:"⊞",lbl:"Dashboard"},
    {id:"orders",ic:"📋",lbl:"Orders",badge:pendingOrders||0},
    null,
    {id:"pending",ic:"⏳",lbl:"Pending (ERP)",badge:pCount,badgeColor:"#c9a84c"},
    {id:"products",ic:"📦",lbl:"Products"},
    {id:"alerts",ic:"🔔",lbl:"Stock Alerts",badge:aCount,badgeColor:"#ef4444"},
    {id:"offers",ic:"🏷️",lbl:"Offers & Deals"},
    {id:"coupons",ic:"🎟️",lbl:"Coupons"},
    null,
    {id:"content",ic:"✏️",lbl:"Website Content"},
    {id:"subscribers",ic:"✉️",lbl:"Subscribers"},
    {id:"settings",ic:"⚙️",lbl:"Settings"},
  ];

  const titles={dashboard:"Dashboard",pending:"Pending Approval",alerts:"Stock Alerts",products:"Products",orders:"Orders",coupons:"Coupons",offers:"Offers & Deals",content:"Website Content",subscribers:"Subscribers",settings:"Settings"};

  const pages={
    dashboard:<ADash prods={allProds} orders={orders} alerts={alerts} onNav={setPage}/>,
    pending:<APending pending={pending||[]} onRefresh={refresh}/>,
    alerts:<AAlerts alerts={alerts||[]} onRefresh={refresh}/>,
    products:<AProducts products={allProds||[]} onRefresh={refresh}/>,
    orders:<AOrders orders={orders||[]} wa={settings.wa_number||WA}/>,
    coupons:<ACoupons coupons={coupons||[]} onRefresh={refresh}/>,
    offers:<AOffers offers={offers||[]} onRefresh={refresh}/>,
    content:<AContent settings={settings}/>,
    subscribers:<ASubs subs={subs||[]}/>,
    settings:<ASettings settings={settings}/>,
  };

  const S={
    sidebar:{width:collapsed?64:240,flexShrink:0,background:"#0f0d0a",height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden",transition:"width .3s ease"},
    navBtn:(active)=>({display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:6,cursor:"pointer",transition:"all .15s",color:active?"#c9a84c":"rgba(255,255,255,.55)",background:active?"rgba(201,168,76,.15)":"transparent",border:"none",width:"100%",textAlign:"left",fontFamily:"inherit",fontSize:13,whiteSpace:"nowrap",overflow:"hidden"}),
  };

  return(
    <div style={{display:"flex",height:"100vh",overflow:"hidden",fontFamily:"Inter,sans-serif"}}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={{padding:"18px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <div style={{width:36,height:36,background:"#c9a84c",borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:900,color:"#000"}}>JF</div>
          {!collapsed&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#fff",letterSpacing:1}}>JAMEEL FABRICS</div><div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>Admin Panel</div></div>}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:8}}>
          {navItems.map((item,i)=>item===null?(
            <div key={i} style={{height:1,background:"rgba(255,255,255,.06)",margin:"4px 0"}}/>
          ):(
            <button key={item.id} onClick={()=>setPage(item.id)} style={S.navBtn(page===item.id)}>
              <span style={{fontSize:16,flexShrink:0,width:18,textAlign:"center"}}>{item.ic}</span>
              {!collapsed&&<span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis"}}>{item.lbl}</span>}
              {!collapsed&&item.badge>0&&<span style={{background:item.badgeColor||"#ef4444",color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700,flexShrink:0}}>{item.badge}</span>}
            </button>
          ))}
        </div>
        <div style={{padding:"12px 8px",borderTop:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
          <button onClick={onExit} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:6,cursor:"pointer",border:"none",background:"none",color:"rgba(255,255,255,.4)",width:"100%",textAlign:"left",fontFamily:"inherit",fontSize:12,whiteSpace:"nowrap",overflow:"hidden"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.06)"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <span style={{fontSize:16,flexShrink:0}}>🚪</span>{!collapsed&&"Exit to Store"}
          </button>
        </div>
      </aside>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        <div style={{height:60,background:"#fff",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",padding:"0 24px",gap:16,flexShrink:0,boxShadow:"0 1px 3px rgba(0,0,0,.1)"}}>
          <button onClick={()=>setCollapsed(c=>!c)} style={{background:"none",border:"none",cursor:"pointer",padding:6,borderRadius:6,color:"#6b7280"}} onMouseEnter={e=>e.currentTarget.style.background="#f4f5f7"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div style={{fontSize:16,fontWeight:600,color:"#111",flex:1}}>{titles[page]||page}</div>
          <button onClick={onExit} style={{background:"#0f0d0a",color:"#fff",border:"none",padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>View Store</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:24,background:"#f4f5f7"}}>
          {sb?pages[page]:<div style={{textAlign:"center",padding:60,color:"#9ca3af"}}><div style={{fontSize:36,marginBottom:12}}>⚙️</div><div style={{fontWeight:600}}>Supabase not connected</div><div style={{fontSize:13,marginTop:6}}>Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in Vercel</div></div>}
        </div>
      </div>
    </div>
  );
}


/* ═══ ADMIN SUB-PAGES ═══ */
const Btn=(props)=><button {...props} style={{display:"inline-flex",alignItems:"center",gap:6,padding:props.sm?"5px 12px":"8px 16px",borderRadius:6,fontSize:props.sm?12:13,fontWeight:500,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .15s",...props.style}}/>;
const Card=({children,style})=><div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,...style}}>{children}</div>;
const Label=({children})=><div style={{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5,marginBottom:5}}>{children}</div>;
function Inp({...p}){return<input {...p} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#111",outline:"none",fontFamily:"inherit",...p.style}} onFocus={e=>{e.target.style.borderColor="#111";if(p.onFocus)p.onFocus(e);}} onBlur={e=>{e.target.style.borderColor="#e5e7eb";if(p.onBlur)p.onBlur(e);}}/>;}
function Sel({children,...p}){return<select {...p} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#111",outline:"none",fontFamily:"inherit",cursor:"pointer",...p.style}}>{children}</select>;}
const Badge=({children,color})=><span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:color==="green"?"#dcfce7":color==="yellow"?"#fef9c3":color==="red"?"#fee2e2":color==="blue"?"#dbeafe":"#f3f4f6",color:color==="green"?"#16a34a":color==="yellow"?"#ca8a04":color==="red"?"#dc2626":color==="blue"?"#2563eb":"#6b7280"}}>{children}</span>;

function ADash({prods,orders,alerts,onNav}){
  const stats=[{l:"Products",v:prods?.length||0,ic:"📦",bg:"#dbeafe"},{l:"Pending Orders",v:orders?.filter(o=>o.status==="pending").length||0,ic:"📋",bg:"#fef9c3"},{l:"Alerts",v:alerts?.length||0,ic:"🔔",bg:"#fee2e2"},{l:"Total Orders",v:orders?.length||0,ic:"✅",bg:"#dcfce7"}];
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16,marginBottom:20}}>
        {stats.map(s=>(
          <Card key={s.l} style={{padding:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5}}>{s.l}</div>
              <div style={{width:36,height:36,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{s.ic}</div>
            </div>
            <div style={{fontSize:28,fontWeight:700,color:"#111",fontFamily:"'Playfair Display',serif"}}>{s.v}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{padding:"16px 20px",borderBottom:"1px solid #e5e7eb",fontSize:15,fontWeight:600}}>Recent Orders</div>
        <div style={{padding:"8px 0"}}>
          {!orders?.length?<div style={{padding:"24px",textAlign:"center",color:"#9ca3af",fontSize:13}}>No orders yet</div>:
            orders.slice(0,5).map(o=>(
              <div key={o.id} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderBottom:"1px solid #f3f4f6"}}>
                <div><div style={{fontWeight:600,fontSize:13}}>{o.customer_name||o.customer_email||"Customer"}</div><div style={{fontSize:11,color:"#9ca3af"}}>{new Date(o.created_at).toLocaleString()}</div></div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{fontWeight:700}}>Rs.{Number(o.total).toLocaleString()}</div>
                  <Badge color={o.status==="pending"?"yellow":o.status==="confirmed"?"green":"blue"}>{o.status}</Badge>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}

function APending({pending,onRefresh}){
  async function approve(p){
    if(!sb)return;
    await sb.from("products").update({website_status:"approved",active:true}).eq("id",p.id);
    toast("Approved! Website pe live ✓","success");onRefresh();
  }
  async function ignore(p){
    if(!sb)return;
    await sb.from("products").update({website_status:"ignored"}).eq("id",p.id);
    toast("Ignored");onRefresh();
  }
  return(
    <div>
      <div style={{marginBottom:20}}><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Pending Approval</div><div style={{fontSize:13,color:"#6b7280"}}>ERP se aaye products — approve ya ignore karo</div></div>
      {!pending.length?<Card style={{padding:48,textAlign:"center",color:"#9ca3af"}}><div style={{fontSize:36,marginBottom:12}}>✓</div><div style={{fontWeight:600}}>No pending products</div></Card>:
        pending.map(p=>(
          <Card key={p.id} style={{padding:16,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:48,height:56,borderRadius:8,background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:"1px solid #e5e7eb",flexShrink:0,overflow:"hidden"}}>
                {(p.img1||p.photo_url)?<img src={p.img1||p.photo_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(p.icon||"👗")}
              </div>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:"#111"}}>{p.name}</div>
                <div style={{fontSize:12,color:"#9ca3af",marginTop:3}}>{CAT_L[p.cat]||p.category||""} · Rs.{Number(p.sale_price||p.price||0).toLocaleString()} · Stock: {p.real_stock||p.stock||0}</div>
                <div style={{display:"flex",gap:6,marginTop:6}}>
                  <Badge color="">ERP</Badge>
                  <Badge color="yellow">Pending</Badge>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn onClick={()=>approve(p)} style={{background:"#111",color:"#fff"}}>✓ Approve</Btn>
              <Btn onClick={()=>ignore(p)} style={{background:"transparent",color:"#6b7280",border:"1px solid #e5e7eb"}}>Ignore</Btn>
            </div>
          </Card>
        ))
      }
    </div>
  );
}

function AAlerts({alerts,onRefresh}){
  async function minus(a){
    if(!sb)return;
    if(a.product_id){const{data:p}=await sb.from("products").select("real_stock,stock").eq("id",a.product_id).single();if(p)await sb.from("products").update({real_stock:Math.max(0,(p.real_stock||p.stock||0)-1)}).eq("id",a.product_id);}
    await sb.from("website_alerts").update({resolved:true}).eq("id",a.id);
    toast("-1 Stock done","success");onRefresh();
  }
  async function remove(a){
    if(!sb)return;
    if(a.product_id)await sb.from("products").update({active:false,website_status:"removed"}).eq("id",a.product_id);
    await sb.from("website_alerts").update({resolved:true}).eq("id",a.id);
    toast("Removed from website","success");onRefresh();
  }
  async function resolve(a){
    if(!sb)return;
    await sb.from("website_alerts").update({resolved:true}).eq("id",a.id);
    toast("Resolved");onRefresh();
  }
  return(
    <div>
      <div style={{marginBottom:20}}><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Stock Alerts</div><div style={{fontSize:13,color:"#6b7280"}}>ERP pe sale hone ke baad updates</div></div>
      {!alerts.length?<Card style={{padding:48,textAlign:"center",color:"#9ca3af"}}><div style={{fontSize:36,marginBottom:12}}>✓</div><div style={{fontWeight:600}}>No alerts</div></Card>:
        alerts.map(a=>(
          <div key={a.id} style={{background:"#fff",border:"1px solid #e5e7eb",borderLeft:"3px solid "+(a.alert_type==="sold"||a.type==="sold_out"?"#ef4444":"#f59e0b"),borderRadius:8,padding:14,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:8,background:a.alert_type==="sold"||a.type==="sold_out"?"#fee2e2":"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{a.alert_type==="sold"||a.type==="sold_out"?"❌":"⚠️"}</div>
              <div>
                <div style={{fontWeight:600,fontSize:13,color:"#111"}}>{a.product_name}</div>
                <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{a.message}</div>
                {a.qty_remaining!=null&&<div style={{fontSize:11,color:"#ef4444",fontWeight:700,marginTop:2}}>Remaining: {a.qty_remaining}</div>}
              </div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <Btn onClick={()=>minus(a)} style={{background:"#fee2e2",color:"#dc2626"}} sm>-1 Stock</Btn>
              <Btn onClick={()=>remove(a)} style={{background:"#111",color:"#fff"}} sm>Remove</Btn>
              <Btn onClick={()=>resolve(a)} style={{background:"transparent",color:"#9ca3af",border:"1px solid #e5e7eb"}} sm>Ignore</Btn>
            </div>
          </div>
        ))
      }
    </div>
  );
}

function AProducts({products,onRefresh}){
  const[editP,setEditP]=useState(null);
  const[form,setForm]=useState({});
  function open(p){setEditP(p);setForm({...p,sizes:(p.sizes||[]).join(",")});}
  async function save(){
    if(!sb||!form.name){toast("Name required","error");return;}
    const data={...form,sizes:form.sizes?form.sizes.split(",").map(s=>s.trim()).filter(Boolean):[],active:form.active!==false,website_status:form.website_status||"approved"};
    if(editP?.id&&editP.id!=="new")await sb.from("products").update(data).eq("id",editP.id);
    else await sb.from("products").insert({...data,website_status:"approved",active:true});
    toast("Saved!","success");setEditP(null);onRefresh();
  }
  async function toggle(p){if(!sb)return;await sb.from("products").update({active:!p.active}).eq("id",p.id);onRefresh();}
  async function del(p){if(!sb||!window.confirm("Delete "+p.name+"?"))return;await sb.from("products").delete().eq("id",p.id);toast("Deleted");onRefresh();}
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Products</div><div style={{fontSize:13,color:"#6b7280"}}>{products.length} total</div></div>
        <Btn onClick={()=>open({id:"new"})} style={{background:"#111",color:"#fff"}}>+ Add Product</Btn>
      </div>
      {editP&&(
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#fff",width:"100%",maxWidth:620,maxHeight:"90vh",overflowY:"auto",borderRadius:12,boxShadow:"0 25px 50px rgba(0,0,0,.25)"}}>
            <div style={{padding:"20px 24px",borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#fff",zIndex:1}}>
              <div style={{fontSize:16,fontWeight:600}}>{editP.id==="new"?"Add Product":"Edit Product"}</div>
              <button onClick={()=>setEditP(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"#9ca3af"}}>✕</button>
            </div>
            <div style={{padding:24}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div><Label>Name *</Label><Inp value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Product name"/></div>
                <div><Label>Category</Label><Sel value={form.cat||"WU"} onChange={e=>setForm({...form,cat:e.target.value})}><option value="WU">Women Unstitched</option><option value="WS">Women Stitched</option><option value="M">Men's Unstitched</option><option value="K">Kids</option></Sel></div>
                <div><Label>Price (Rs.) *</Label><Inp type="number" value={form.sale_price||form.price||""} onChange={e=>setForm({...form,sale_price:e.target.value,price:e.target.value})} placeholder="3500"/></div>
                <div><Label>Old Price (Sale)</Label><Inp type="number" value={form.old_price||""} onChange={e=>setForm({...form,old_price:e.target.value})} placeholder="Leave empty"/></div>
                <div><Label>Discount %</Label><Inp type="number" placeholder="e.g. 20 → auto" onChange={e=>{const d=parseFloat(e.target.value);if(d&&(form.sale_price||form.price)){const orig=parseFloat(form.sale_price||form.price);setForm({...form,old_price:orig,sale_price:Math.round(orig*(1-d/100)),price:Math.round(orig*(1-d/100))});}}}/></div>
                <div><Label>Real Stock (hidden)</Label><Inp type="number" value={form.real_stock||""} onChange={e=>setForm({...form,real_stock:e.target.value})} placeholder="10"/></div>
                <div style={{gridColumn:"1/-1"}}><Label>Display Stock Text</Label><Inp value={form.display_stock_text||""} onChange={e=>setForm({...form,display_stock_text:e.target.value})} placeholder="e.g. Last 5 Pieces!"/></div>
                <div><Label>Badge</Label><Sel value={form.badge||""} onChange={e=>setForm({...form,badge:e.target.value})}><option value="">None</option><option>NEW</option><option>SALE</option><option>HOT</option></Sel></div>
                <div><Label>Sizes (comma separated)</Label><Inp value={form.sizes||""} onChange={e=>setForm({...form,sizes:e.target.value})} placeholder="S,M,L,XL"/></div>
                <div style={{gridColumn:"1/-1"}}><Label>Color / Description</Label><Inp value={form.color||""} onChange={e=>setForm({...form,color:e.target.value})}/></div>
              </div>
              <div style={{marginTop:14}}><Label>Product Images (5 slots)</Label>
                {[1,2,3,4,5].map(n=>(
                  <div key={n} style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                    <div style={{width:40,height:48,background:"#f5f5f5",border:"1px solid "+(form["img"+n]||form["photo_url"+(n===1?"":n)]?"#111":"#e5e7eb"),borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:n===1?18:14,flexShrink:0,overflow:"hidden"}}>
                      {(form["img"+n]||form["photo_url"+(n===1?"":n)])?<img src={form["img"+n]||form["photo_url"+(n===1?"":n)]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(n===1?"🖼️":"+")}
                    </div>
                    <Inp value={form["img"+n]||form["photo_url"+(n===1?"":n)]||""} onChange={e=>setForm({...form,["img"+n]:e.target.value,["photo_url"+(n===1?"":n)]:e.target.value})} placeholder={"Image "+n+(n===1?" (main)":"")}/>
                  </div>
                ))}
              </div>
              <div style={{marginTop:14}}><Label>WA Order Note</Label><textarea value={form.note||""} onChange={e=>setForm({...form,note:e.target.value})} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#111",outline:"none",fontFamily:"inherit",minHeight:60,resize:"vertical"}} placeholder="Note for WhatsApp order..."/></div>
              <div style={{display:"flex",gap:20,marginTop:14}}>
                <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}><input type="checkbox" checked={form.active!==false} onChange={e=>setForm({...form,active:e.target.checked})} style={{accentColor:"#111"}}/>Show on website</label>
                <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}><input type="checkbox" checked={form.featured||false} onChange={e=>setForm({...form,featured:e.target.checked})} style={{accentColor:"#111"}}/>Featured</label>
              </div>
            </div>
            <div style={{padding:"16px 24px",borderTop:"1px solid #e5e7eb",display:"flex",justifyContent:"flex-end",gap:8,position:"sticky",bottom:0,background:"#fff"}}>
              <Btn onClick={()=>setEditP(null)} style={{background:"transparent",color:"#6b7280",border:"1px solid #e5e7eb"}}>Cancel</Btn>
              <Btn onClick={save} style={{background:"#111",color:"#fff"}}>💾 Save</Btn>
            </div>
          </div>
        </div>
      )}
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb"}}>{["Product","Category","Price","Stock Text","Status","Actions"].map(h=><th key={h} style={{padding:"10px 16px",fontSize:11,fontWeight:600,color:"#6b7280",textAlign:"left",textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>
              {products.map(p=>(
                <tr key={p.id} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:40,height:48,borderRadius:6,background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,border:"1px solid #e5e7eb",flexShrink:0,overflow:"hidden"}}>
                        {(p.img1||p.photo_url)?<img src={p.img1||p.photo_url} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:(p.icon||"👗")}
                      </div>
                      <div><div style={{fontWeight:600,fontSize:13}}>{p.name}</div><div style={{fontSize:11,color:"#9ca3af"}}>{p.color||""}</div></div>
                    </div>
                  </td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"#6b7280"}}>{CAT_L[p.cat]||p.category||""}</td>
                  <td style={{padding:"12px 16px"}}><div style={{fontWeight:600,color:p.old_price?"#c0392b":"#111"}}>Rs.{Number(p.sale_price||p.price||0).toLocaleString()}</div>{p.old_price&&<div style={{fontSize:11,textDecoration:"line-through",color:"#9ca3af"}}>Rs.{Number(p.old_price).toLocaleString()}</div>}</td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"#888",fontStyle:"italic"}}>{p.display_stock_text||"In Stock"}</td>
                  <td style={{padding:"12px 16px"}}><Badge color={p.active?"green":""}>{p.active?"Active":"Hidden"}</Badge></td>
                  <td style={{padding:"12px 16px"}}><div style={{display:"flex",gap:4}}>
                    <Btn onClick={()=>open(p)} style={{background:"transparent",border:"1px solid #e5e7eb",color:"#374151"}} sm>Edit</Btn>
                    <Btn onClick={()=>toggle(p)} style={{background:"transparent",border:"1px solid #e5e7eb",color:"#374151"}} sm>{p.active?"Hide":"Show"}</Btn>
                    <Btn onClick={()=>del(p)} style={{background:"#fee2e2",color:"#dc2626"}} sm>Del</Btn>
                  </div></td>
                </tr>
              ))}
              {!products.length&&<tr><td colSpan={6} style={{padding:40,textAlign:"center",color:"#9ca3af"}}>No products yet</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AOrders({orders,wa}){
  async function upd(id,status){if(!sb)return;await sb.from("online_orders").update({status}).eq("id",id);toast("Status: "+status,"success");window.location.reload();}
  return(
    <div>
      <div style={{marginBottom:20}}><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Orders</div><div style={{fontSize:13,color:"#6b7280"}}>WhatsApp se aaye orders</div></div>
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb"}}>{["Order","Customer","Items","Total","Status","Date","Actions"].map(h=><th key={h} style={{padding:"10px 14px",fontSize:11,fontWeight:600,color:"#6b7280",textAlign:"left",textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"12px 14px",fontWeight:700,color:"#c9a84c",fontSize:12}}>#{o.id.slice(-6).toUpperCase()}</td>
                  <td style={{padding:"12px 14px"}}><div style={{fontWeight:600,fontSize:13}}>{o.customer_name||"Customer"}</div><div style={{fontSize:11,color:"#9ca3af"}}>{o.customer_email||""}</div></td>
                  <td style={{padding:"12px 14px",fontSize:12,color:"#6b7280"}}>{(o.items||[]).length} items</td>
                  <td style={{padding:"12px 14px",fontWeight:700}}>Rs.{Number(o.total).toLocaleString()}</td>
                  <td style={{padding:"12px 14px"}}><Badge color={o.status==="pending"?"yellow":o.status==="confirmed"?"green":"blue"}>{o.status}</Badge></td>
                  <td style={{padding:"12px 14px",fontSize:11,color:"#9ca3af"}}>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td style={{padding:"12px 14px"}}><div style={{display:"flex",gap:4}}>
                    {o.status==="pending"&&<Btn onClick={()=>upd(o.id,"confirmed")} style={{background:"#dcfce7",color:"#16a34a"}} sm>Confirm</Btn>}
                    {o.status==="confirmed"&&<Btn onClick={()=>upd(o.id,"delivered")} style={{background:"#dbeafe",color:"#2563eb"}} sm>Delivered</Btn>}
                    <a href={"https://wa.me/"+wa} target="_blank" rel="noopener noreferrer"><Btn style={{background:"#25D366",color:"#fff"}} sm>WA</Btn></a>
                  </div></td>
                </tr>
              ))}
              {!orders.length&&<tr><td colSpan={7} style={{padding:48,textAlign:"center",color:"#9ca3af"}}>No orders yet</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ACoupons({coupons,onRefresh}){
  const[form,setForm]=useState({code:"",type:"percent",value:"",min_order:"",max_uses:"",expires_at:"",category_filter:"all",active:true});
  async function save(){
    if(!sb||!form.code||!form.value){toast("Code and value required","error");return;}
    await sb.from("coupons").insert({...form,code:form.code.toUpperCase(),value:parseFloat(form.value),min_order:parseFloat(form.min_order)||0,max_uses:parseInt(form.max_uses)||null,expires_at:form.expires_at||null});
    toast("Coupon created!","success");setForm({code:"",type:"percent",value:"",min_order:"",max_uses:"",expires_at:"",category_filter:"all",active:true});onRefresh();
  }
  async function del(id){if(!sb||!window.confirm("Delete?"))return;await sb.from("coupons").delete().eq("id",id);onRefresh();}
  return(
    <div>
      <div style={{marginBottom:20}}><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Coupons</div></div>
      <Card style={{padding:20,marginBottom:20}}>
        <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>Create Coupon</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={{gridColumn:"1/-1"}}><Label>Code *</Label><Inp value={form.code} onChange={e=>setForm({...form,code:e.target.value.toUpperCase()})} placeholder="e.g. SAVE20" style={{fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}/></div>
          <div><Label>Type</Label><Sel value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="percent">Percentage (%)</option><option value="flat">Fixed (Rs.)</option></Sel></div>
          <div><Label>Value *</Label><Inp type="number" value={form.value} onChange={e=>setForm({...form,value:e.target.value})} placeholder={form.type==="percent"?"20":"500"}/></div>
          <div><Label>Min Order (Rs.)</Label><Inp type="number" value={form.min_order} onChange={e=>setForm({...form,min_order:e.target.value})} placeholder="2000"/></div>
          <div><Label>Expiry Date</Label><Inp type="date" value={form.expires_at} onChange={e=>setForm({...form,expires_at:e.target.value})}/></div>
        </div>
        <Btn onClick={save} style={{background:"#111",color:"#fff",marginTop:14}}>+ Create</Btn>
      </Card>
      {coupons.map(c=>(
        <Card key={c.id} style={{padding:"16px 20px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,letterSpacing:2}}>{c.code}</div>
            <div style={{fontSize:12,color:"#9ca3af",marginTop:4}}>{c.type==="percent"?c.value+"%":"Rs."+c.value} off{c.min_order?" · Min Rs."+c.min_order:""}{c.expires_at?" · Expires "+new Date(c.expires_at).toLocaleDateString():""}</div>
            <div style={{display:"flex",gap:6,marginTop:6}}><Badge color={c.active?"green":""}>{c.active?"Active":"Inactive"}</Badge><Badge color="">{c.used_count||0} used</Badge></div>
          </div>
          <Btn onClick={()=>del(c.id)} style={{background:"#fee2e2",color:"#dc2626"}}>Delete</Btn>
        </Card>
      ))}
    </div>
  );
}

function AOffers({offers,onRefresh}){
  const types=[{id:"disc",ic:"🏷️",lbl:"Discounted Offers"},{id:"sale",ic:"⚡",lbl:"Limited Sale"},{id:"lc",ic:"⏰",lbl:"Last Chance"}];
  async function add(type){const t=window.prompt("Title:");if(!t||!sb)return;const d=window.prompt("Description:")||"";const e=window.prompt("Emoji:","🏷️")||"🏷️";await sb.from("website_offers").insert({type,title:t,description:d,emoji:e,active:true});toast("Added!","success");onRefresh();}
  async function del(id){if(!sb||!window.confirm("Delete?"))return;await sb.from("website_offers").delete().eq("id",id);onRefresh();}
  return(
    <div>
      <div style={{marginBottom:20}}><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Offers & Deals</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {types.map(t=>(
          <Card key={t.id} style={{padding:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:600}}>{t.ic} {t.lbl}</div>
              <Btn onClick={()=>add(t.id)} style={{background:"#111",color:"#fff"}} sm>+ Add</Btn>
            </div>
            {offers.filter(o=>o.type===t.id).map(o=>(
              <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:10,background:"#f9fafb",borderRadius:6,marginBottom:6}}>
                <div><div style={{fontWeight:600,fontSize:13}}>{o.emoji} {o.title}</div>{o.description&&<div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{o.description}</div>}</div>
                <button onClick={()=>del(o.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:18,lineHeight:1}}>×</button>
              </div>
            ))}
            {!offers.filter(o=>o.type===t.id).length&&<div style={{fontSize:12,color:"#9ca3af",textAlign:"center",padding:12}}>No offers</div>}
          </Card>
        ))}
      </div>
    </div>
  );
}

function AContent({settings}){
  const[f,setF]=useState({});
  useEffect(()=>setF({...settings}),[settings]);
  async function save(){
    if(!sb)return;
    await Promise.all(Object.entries(f).map(([k,v])=>sb.from("website_settings").upsert({key:k,value:String(v)},{onConflict:"key"})));
    toast("Saved!","success");
  }
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Website Content</div></div>
        <Btn onClick={save} style={{background:"#111",color:"#fff"}}>💾 Save All</Btn>
      </div>
      {[
        {title:"📢 Announcement Bar",fields:[["announcement","Messages (pipe | separated)","✦ New Arrivals|✦ Fast Delivery"]]},
        {title:"🏠 Hero Section",fields:[["hlabel","Hero Label","Winter Collection 2026"],["hsub","Tagline","Exclusive · Elegant · Pakistani"],["about","About Text","",true]]},
        {title:"🎬 Video Section",fields:[["video_label","Label","Featured"],["video_title","Title","Watch Our Collection"],["video_url","YouTube or MP4 URL",""]]},
      ].map(sec=>(
        <Card key={sec.title} style={{padding:20,marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>{sec.title}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {sec.fields.map(([k,lbl,ph,full])=>(
              <div key={k} style={full?{gridColumn:"1/-1"}:{}}>
                <Label>{lbl}</Label>
                {full?<textarea value={f[k]||""} onChange={e=>setF({...f,[k]:e.target.value})} style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#111",outline:"none",fontFamily:"inherit",minHeight:70,resize:"vertical"}}/>:<Inp value={f[k]||""} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph}/>}
              </div>
            ))}
          </div>
          {sec.title.includes("Video")&&(
            <div style={{marginTop:12}}>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
                <input type="checkbox" checked={f.video_show==="true"||f.video_show===true} onChange={e=>setF({...f,video_show:String(e.target.checked)})} style={{accentColor:"#111"}}/>
                Show video section on website
              </label>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function ASubs({subs}){
  function exportCSV(){const csv="Email,Date"+subs.map(s=>s.email+","+new Date(s.subscribed_at).toLocaleDateString()).join("");const a=document.createElement("a");a.href="data:text/csv,"+encodeURIComponent(csv);a.download="subscribers.csv";a.click();}
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div><div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",marginBottom:4}}>Subscribers</div><div style={{fontSize:13,color:"#6b7280"}}>{subs.length} total</div></div>
        <Btn onClick={exportCSV} style={{background:"transparent",color:"#374151",border:"1px solid #e5e7eb"}}>Export CSV</Btn>
      </div>
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f9fafb",borderBottom:"1px solid #e5e7eb"}}>{["Email","Subscribed","Status"].map(h=><th key={h} style={{padding:"10px 16px",fontSize:11,fontWeight:600,color:"#6b7280",textAlign:"left",textTransform:"uppercase",letterSpacing:.5}}>{h}</th>)}</tr></thead>
            <tbody>
              {subs.map(s=>(
                <tr key={s.id} style={{borderBottom:"1px solid #f3f4f6"}}>
                  <td style={{padding:"12px 16px",fontWeight:500,fontSize:13}}>{s.email}</td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"#9ca3af"}}>{new Date(s.subscribed_at).toLocaleDateString()}</td>
                  <td style={{padding:"12px 16px"}}><Badge color={s.active?"green":""}>{s.active?"Active":"Unsubscribed"}</Badge></td>
                </tr>
              ))}
              {!subs.length&&<tr><td colSpan={3} style={{padding:48,textAlign:"center",color:"#9ca3af"}}>No subscribers yet</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ASettings({settings}){
  const[f,setF]=useState({});
  const[np,setNp]=useState("");
  const[cp,setCp]=useState("");
  useEffect(()=>setF({...settings}),[settings]);
  async function save(){if(!sb)return;await Promise.all(Object.entries(f).map(([k,v])=>sb.from("website_settings").upsert({key:k,value:String(v)},{onConflict:"key"})));toast("Saved!","success");}
  async function chgPass(){if(!np||np.length<6){toast("Min 6 chars","error");return;}if(np!==cp){toast("Passwords don't match","error");return;}if(sb)await sb.from("website_settings").upsert({key:"admin_pass",value:np},{onConflict:"key"});toast("Password changed!","success");setNp("");setCp("");}
  async function backup(){const{data:p}=sb?await sb.from("products").select("*"):{data:[]};const{data:s}=sb?await sb.from("website_settings").select("*"):{data:[]};const d=JSON.stringify({v:1,ts:new Date().toISOString(),products:p,settings:s},null,2);const a=document.createElement("a");a.href="data:application/json,"+encodeURIComponent(d);a.download="jf-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();toast("Downloaded!","success");}
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif"}}>Settings</div>
        <Btn onClick={save} style={{background:"#111",color:"#fff"}}>💾 Save</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start"}}>
        <div>
          <Card style={{padding:20,marginBottom:16}}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>🏪 Store Info</div>
            <div style={{display:"grid",gap:12}}>
              {[["store_name","Store Name"],["wa_number","WhatsApp (923...)"],["phone","Phone"],["addr1","Address 1"],["addr2","Address 2"],["hours","Business Hours"]].map(([k,lbl])=>(
                <div key={k}><Label>{lbl}</Label><Inp value={f[k]||""} onChange={e=>setF({...f,[k]:e.target.value})}/></div>
              ))}
            </div>
          </Card>
          <Card style={{padding:20}}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>📱 Social Links</div>
            <div style={{display:"grid",gap:12}}>
              {[["insta","Instagram URL"],["tiktok","TikTok URL"],["fb","Facebook URL"]].map(([k,lbl])=>(
                <div key={k}><Label>{lbl}</Label><Inp value={f[k]||""} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={"https://...com/..."}/></div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card style={{padding:20,marginBottom:16}}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>🔗 Supabase Status</div>
            <div style={{background:"#f9fafb",borderRadius:8,padding:12,fontSize:12,color:"#6b7280",marginBottom:8}}>{SURL?"✅ Connected":"❌ Not connected — add env vars in Vercel"}</div>
            {SURL&&<div style={{fontSize:11,color:"#9ca3af",wordBreak:"break-all"}}>{SURL}</div>}
          </Card>
          <Card style={{padding:20,marginBottom:16}}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>🔑 Change Password</div>
            <div style={{display:"grid",gap:12}}>
              <div><Label>New Password</Label><Inp type="password" value={np} onChange={e=>setNp(e.target.value)} placeholder="Min 6 characters"/></div>
              <div><Label>Confirm Password</Label><Inp type="password" value={cp} onChange={e=>setCp(e.target.value)}/></div>
            </div>
            <Btn onClick={chgPass} style={{background:"#111",color:"#fff",marginTop:12}}>Change</Btn>
          </Card>
          <Card style={{padding:20}}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:14}}>💾 Backup</div>
            <Btn onClick={backup} style={{background:"#fef3c7",color:"#92400e"}}>⬇️ Download Backup</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
}


/* ═══ MAIN APP ═══ */
export default function App(){
  const[view,setView]=useState("intro");
  const[showAdminLogin,setShowAdminLogin]=useState(false);
  const[user,setUser]=useState(null);
  const toasts=useToast();

  useEffect(()=>{
    if(!sb)return;
    sb.auth.getSession().then(({data:{session}})=>setUser(session?.user||null));
    const{data:{subscription}}=sb.auth.onAuthStateChange((_e,s)=>setUser(s?.user||null));
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!sb)return;
    const ch=sb.channel("global_alerts").on("postgres_changes",{event:"INSERT",schema:"public",table:"website_alerts"},payload=>{
      toast("🔔 "+(payload.new?.message||"New stock alert!"));
    }).subscribe();
    return()=>sb.removeChannel(ch);
  },[]);

  async function logout(){
    if(sb)await sb.auth.signOut();
    setUser(null);
    toast("Logged out");
    setView("store");
  }

  return(
    <>
      <style>{CSS}</style>
      {view==="intro"&&<Intro onEnter={()=>setView("store")}/>}
      {view==="store"&&(
        <Store
          user={user}
          onLogout={logout}
          onAccount={()=>setView("account")}
          onAdmin={()=>setShowAdminLogin(true)}
        />
      )}
      {view==="account"&&user&&(
        <AccountPage user={user} onBack={()=>setView("store")}/>
      )}
      {view==="account"&&!user&&(
        <>{setView("store")}</>
      )}
      {view==="admin"&&(
        <AdminPanel onExit={()=>setView("store")}/>
      )}
      {showAdminLogin&&(
        <AdminLogin
          onSuccess={()=>{setShowAdminLogin(false);setView("admin");}}
          onCancel={()=>setShowAdminLogin(false)}
        />
      )}
      <Toasts list={toasts}/>
    </>
  );
}
