// Budget Tracker — Natali
// All React hooks come from the global React object (loaded in index.html)

const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const NOW=new Date();
const CUR_MONTH=NOW.getMonth();
const CUR_YEAR=NOW.getFullYear();

const CATS_DEFAULT=[
  {id:"income",name:"Income",type:"income",color:"#1D9E75",emoji:"💰",items:[{id:"salary",name:"Salary (משכורת)"},{id:"side",name:"Side income"}]},
  {id:"housing",name:"Housing",type:"expense",color:"#378ADD",emoji:"🏠",items:[{id:"rent",name:"Rent / mortgage"},{id:"electric",name:"Electricity"},{id:"water",name:"Water"},{id:"internet",name:"Internet & phone"},{id:"vaad",name:"Vaad bayit"}]},
  {id:"food",name:"Food",type:"expense",color:"#EF9F27",emoji:"🍕",items:[{id:"supermarket",name:"Supermarket"},{id:"restaurants",name:"Restaurants"},{id:"coffee",name:"Coffee"}]},
  {id:"transport",name:"Transport",type:"expense",color:"#7F77DD",emoji:"🚌",items:[{id:"fuel",name:"Fuel"},{id:"transit",name:"Public transit"},{id:"carins",name:"Car insurance"},{id:"gett",name:"Gett/Train"}]},
  {id:"health",name:"Health",type:"expense",color:"#D85A30",emoji:"💊",items:[{id:"kupat",name:"Kupat holim"},{id:"insurance",name:"Insurance"},{id:"meds",name:"Medications"},{id:"gym",name:"Gym"}]},
  {id:"entertainment",name:"Entertainment",type:"expense",color:"#D4537E",emoji:"🎉",items:[{id:"subs",name:"Subscriptions"},{id:"outings",name:"Outings"},{id:"spotify",name:"Spotify, Google, Apple"},{id:"concerts",name:"Concert, Event, etc."}]},
  {id:"savings",name:"Savings",type:"expense",color:"#0F6E56",emoji:"💎",items:[{id:"emergency",name:"Emergency fund"},{id:"invest",name:"Investments"},{id:"roth",name:"Roth IRA"},{id:"brokerage",name:"Brokerage"},{id:"travel",name:"Travel"}]},
  {id:"personal",name:"Personal",type:"expense",color:"#BA7517",emoji:"✨",items:[{id:"clothing",name:"Clothing"},{id:"care",name:"Personal care"},{id:"misc",name:"Miscellaneous"}]},
];

const BUDGETS_DEFAULT={
  "b_income_salary":13000,"b_income_side":0,
  "b_housing_rent":3700,"b_housing_electric":150,"b_housing_water":100,"b_housing_internet":30,"b_housing_vaad":70,
  "b_food_supermarket":1000,"b_food_restaurants":1000,"b_food_coffee":300,
  "b_transport_fuel":0,"b_transport_transit":200,"b_transport_carins":0,"b_transport_gett":100,
  "b_health_kupat":0,"b_health_insurance":0,"b_health_meds":50,"b_health_gym":400,
  "b_entertainment_subs":0,"b_entertainment_outings":0,"b_entertainment_spotify":50,"b_entertainment_concerts":150,
  "b_savings_emergency":500,"b_savings_invest":0,"b_savings_roth":1500,"b_savings_brokerage":1500,"b_savings_travel":1000,
  "b_personal_clothing":300,"b_personal_care":300,"b_personal_misc":600,
};

const M3=2+2026*12, M4=3+2026*12;
const TX_DEFAULT={
  [`tx_housing_rent_${M3}`]:[{id:"m1",date:"2026-03-21",desc:"Rent",amount:3700}],
  [`tx_housing_internet_${M3}`]:[{id:"m2",date:"2026-03-21",desc:"phone",amount:30}],
  [`tx_food_supermarket_${M3}`]:[
    {id:"m3",date:"2026-03-21",desc:"ampm",amount:40},{id:"m4",date:"2026-03-21",desc:"tivtam",amount:29},
    {id:"m5",date:"2026-03-21",desc:"ampm",amount:31},{id:"m6",date:"2026-03-21",desc:"shuk aliya",amount:41},
    {id:"m7",date:"2026-03-21",desc:"ampm",amount:34},{id:"m8",date:"2026-03-21",desc:"street market",amount:23},
    {id:"m9",date:"2026-03-21",desc:"ampm",amount:38},{id:"m10",date:"2026-03-21",desc:"super mama",amount:18},
    {id:"m11",date:"2026-03-21",desc:"dates",amount:40},{id:"m12",date:"2026-03-21",desc:"victory",amount:99},
    {id:"m13",date:"2026-03-21",desc:"chicken",amount:60},{id:"m14",date:"2026-03-21",desc:"fruit and veg",amount:47},
    {id:"m15",date:"2026-03-21",desc:"dishwasher pods + other",amount:98},{id:"m16",date:"2026-03-21",desc:"cheede",amount:17},
    {id:"m17",date:"2026-03-21",desc:"groceries mama",amount:27},{id:"m18",date:"2026-03-21",desc:"superyuda",amount:29},
    {id:"m19",date:"2026-03-21",desc:"superyuda",amount:62},{id:"m20",date:"2026-03-21",desc:"superyuda",amount:10},
  ],
  [`tx_food_restaurants_${M3}`]:[
    {id:"m21",date:"2026-03-21",desc:"toni v ester",amount:53},{id:"m22",date:"2026-03-21",desc:"htaco",amount:49},
    {id:"m23",date:"2026-03-21",desc:"mclovin",amount:16},{id:"m24",date:"2026-03-21",desc:"mclovin",amount:28},{id:"m25",date:"2026-03-21",desc:"cassata",amount:19},
  ],
  [`tx_food_coffee_${M3}`]:[
    {id:"m26",date:"2026-03-21",desc:"nordoy",amount:18},{id:"m27",date:"2026-03-21",desc:"ada lewinsky",amount:37},
    {id:"m28",date:"2026-03-21",desc:"chachos",amount:18},{id:"m29",date:"2026-03-21",desc:"tony and ester",amount:40},
  ],
  [`tx_transport_gett_${M3}`]:[{id:"m30",date:"2026-03-21",desc:"gett",amount:78}],
  [`tx_entertainment_spotify_${M3}`]:[{id:"m31",date:"2026-03-21",desc:"spotify",amount:24},{id:"m32",date:"2026-03-21",desc:"google",amount:9}],
  [`tx_savings_travel_${M3}`]:[{id:"m33",date:"2026-03-21",desc:"Flight to Rhodes",amount:686}],
  [`tx_personal_care_${M3}`]:[{id:"m34",date:"2026-03-21",desc:"superpharm",amount:18},{id:"m35",date:"2026-03-21",desc:"superpharm",amount:52}],
  [`tx_food_restaurants_${M4}`]:[
    {id:"a1",date:"2026-04-06",desc:"Shafa Bar",amount:87},{id:"a2",date:"2026-04-05",desc:"Khao San Food TLV",amount:55},
    {id:"a3",date:"2026-04-04",desc:"Moon Sushi Burger",amount:136},{id:"a4",date:"2026-04-08",desc:"Gania Costanza B",amount:110},
  ],
  [`tx_food_coffee_${M4}`]:[
    {id:"a5",date:"2026-04-05",desc:"Café BaNachla",amount:30},{id:"a6",date:"2026-04-04",desc:"Tzakuli",amount:6},{id:"a7",date:"2026-04-02",desc:"Tom's",amount:33},
  ],
  [`tx_food_supermarket_${M4}`]:[
    {id:"a8",date:"2026-04-04",desc:"Ilay Market",amount:26.80},{id:"a9",date:"2026-04-03",desc:"Hasid HaYerek",amount:25},
    {id:"a10",date:"2026-04-03",desc:"Davka Gourmet",amount:15},{id:"a11",date:"2026-04-03",desc:"Shuk HaAliya",amount:23.10},
    {id:"a12",date:"2026-04-03",desc:"Street Market David",amount:22.80},{id:"a13",date:"2026-04-03",desc:"Super Al HaYam",amount:38.80},
    {id:"a14",date:"2026-04-01",desc:"Super Mama",amount:36.75},
  ],
  [`tx_personal_care_${M4}`]:[{id:"a15",date:"2026-04-01",desc:"A. Aviv Flowers",amount:120}],
  [`tx_personal_clothing_${M4}`]:[{id:"a16",date:"2026-04-01",desc:"Top Stock",amount:50}],
  [`tx_personal_misc_${M4}`]:[{id:"a17",date:"2026-04-05",desc:"Bank card fee",amount:9.90}],
};

const fmt=n=>"₪"+Math.round(Math.abs(n)).toLocaleString();
const bKey=(c,i)=>`b_${c}_${i}`;
const txKey=(c,i,m)=>`tx_${c}_${i}_${m}`;
const SK_C="bgt_cats",SK_V="bgt_vals",SK_T="bgt_tx";
const C={bg:"#f7f5f0",card:"#fff",border:"#ede9e2",text:"#1a1a18",muted:"#888780",green:"#1D9E75",red:"#D85A30"};
const cardS={background:C.card,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:14,boxShadow:"0 1px 6px rgba(0,0,0,0.06)"};
const inpS=(extra)=>({padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.card,color:C.text,fontSize:15,outline:"none",boxSizing:"border-box",...extra});
const btnS=(extra)=>({padding:"10px 18px",borderRadius:12,border:`1px solid ${C.border}`,background:C.card,color:C.text,cursor:"pointer",fontSize:15,fontWeight:600,...extra});

// ── Confetti ──────────────────────────────────────────────────
function Confetti({active}) {
  const ref=React.useRef();
  React.useEffect(()=>{
    if(!active) return;
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const pp=Array.from({length:90},()=>({
      x:Math.random()*canvas.width,y:-10,r:Math.random()*7+3,
      color:["#1D9E75","#378ADD","#EF9F27","#D4537E","#7F77DD","#D85A30"][Math.floor(Math.random()*6)],
      vx:(Math.random()-.5)*5,vy:Math.random()*4+2,rot:Math.random()*360,vr:(Math.random()-.5)*10,
    }));
    let fr,done=false;
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pp.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.vy+=.08;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color;ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);ctx.restore();});
      if(!done) fr=requestAnimationFrame(draw);
    };
    draw();
    const t=setTimeout(()=>{done=true;cancelAnimationFrame(fr);ctx.clearRect(0,0,canvas.width,canvas.height);},2200);
    return()=>{done=true;cancelAnimationFrame(fr);clearTimeout(t);};
  },[active]);
  return React.createElement("canvas",{ref,style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999}});
}

// ── Toast ─────────────────────────────────────────────────────
function Toast({msg,visible}) {
  return React.createElement("div",{style:{
    position:"fixed",bottom:100,left:"50%",transform:`translateX(-50%) translateY(${visible?0:16}px)`,
    opacity:visible?1:0,transition:"all 0.3s",background:"#1a1a18",color:"#fff",
    padding:"12px 24px",borderRadius:40,fontSize:15,fontWeight:700,zIndex:9998,
    whiteSpace:"nowrap",boxShadow:"0 6px 24px rgba(0,0,0,0.3)",
  }},msg);
}

// ── Donut Chart ───────────────────────────────────────────────
function Donut({data,total,label,sub}) {
  const r=72,stroke=26,circ=2*Math.PI*r;
  let off=0;
  const sl=data.filter(d=>d.v>0).map(d=>{
    const dash=(d.v/total)*circ,s={...d,dash,gap:circ-dash,off};
    off+=dash; return s;
  });
  return React.createElement("svg",{viewBox:"0 0 200 200",style:{width:"100%",maxWidth:200}},
    React.createElement("circle",{cx:100,cy:100,r,fill:"none",stroke:"#f0ede8",strokeWidth:stroke}),
    sl.map((s,i)=>React.createElement("circle",{key:i,cx:100,cy:100,r,fill:"none",stroke:s.color,strokeWidth:stroke,
      strokeDasharray:`${s.dash} ${s.gap}`,strokeDashoffset:-s.off+circ*.25})),
    React.createElement("text",{x:100,y:92,textAnchor:"middle",fontSize:18,fontWeight:700,fill:C.text},label),
    React.createElement("text",{x:100,y:114,textAnchor:"middle",fontSize:11,fill:C.muted},sub),
  );
}

// ── Bar Chart ─────────────────────────────────────────────────
function Bars({data}) {
  const max=Math.max(...data.map(d=>d.v),1);
  return React.createElement("div",{style:{display:"flex",alignItems:"flex-end",gap:8,height:100,padding:"0 4px"}},
    data.map((d,i)=>React.createElement("div",{key:i,style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}},
      d.v>0&&React.createElement("div",{style:{fontSize:9,color:d.cur?"#1D9E75":"#bbb",fontWeight:700}},`₪${Math.round(d.v/1000)}k`),
      React.createElement("div",{style:{width:"100%",background:d.cur?"#1D9E75":"#e8e6e0",borderRadius:"6px 6px 0 0",
        height:`${(d.v/max)*68}px`,minHeight:d.v>0?4:0,transition:"height 0.5s"}}),
      React.createElement("span",{style:{fontSize:10,color:d.cur?"#1D9E75":"#888",fontWeight:d.cur?700:400}},d.label),
    ))
  );
}

// ── Add Transaction Screen ─────────────────────────────────────
function AddScreen({cats,mi,monthIdx,year,onAdd,onBack}) {
  const [catId,setCatId]=React.useState(cats.filter(c=>c.type==="expense")[0]?.id||"");
  const [itemId,setItemId]=React.useState("");
  const [desc,setDesc]=React.useState("");
  const [amount,setAmount]=React.useState("");
  const [date,setDate]=React.useState(`${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`);
  const selCat=cats.find(c=>c.id===catId);
  React.useEffect(()=>{if(selCat?.items?.length) setItemId(selCat.items[0].id);},[catId]);
  const submit=()=>{
    const amt=parseFloat(amount); if(!amt||amt<=0||!itemId) return;
    onAdd(catId,itemId,{id:Date.now(),desc,amount:amt,date});
  };
  return React.createElement("div",{style:{position:"fixed",inset:0,background:C.bg,zIndex:400,display:"flex",flexDirection:"column",fontFamily:"-apple-system,sans-serif",overflowY:"auto"}},
    React.createElement("div",{style:{background:"linear-gradient(135deg,#1D9E75,#0F6E56)",padding:"52px 20px 24px",display:"flex",alignItems:"center",gap:16,flexShrink:0}},
      React.createElement("button",{onClick:onBack,style:{background:"rgba(255,255,255,0.25)",border:"none",color:"#fff",borderRadius:12,width:42,height:42,fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}},"←"),
      React.createElement("div",null,
        React.createElement("div",{style:{color:"rgba(255,255,255,0.8)",fontSize:13}},`${MONTHS[monthIdx]} ${year}`),
        React.createElement("div",{style:{color:"#fff",fontSize:24,fontWeight:800}},"Add Transaction"),
      )
    ),
    React.createElement("div",{style:{flex:1,overflowY:"auto",padding:20}},
      React.createElement("div",{style:{fontSize:13,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}},"Category"),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:22}},
        cats.filter(c=>c.type==="expense").map(c=>React.createElement("button",{key:c.id,onClick:()=>setCatId(c.id),style:{
          padding:"14px 10px",borderRadius:14,border:`2px solid ${catId===c.id?c.color:C.border}`,
          background:catId===c.id?c.color+"18":C.card,cursor:"pointer",
          display:"flex",flexDirection:"column",alignItems:"center",gap:6,
        }},
          React.createElement("span",{style:{fontSize:26}},c.emoji),
          React.createElement("span",{style:{fontSize:13,fontWeight:700,color:catId===c.id?c.color:C.text}},c.name),
        ))
      ),
      selCat&&React.createElement(React.Fragment,null,
        React.createElement("div",{style:{fontSize:13,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}},"Item"),
        React.createElement("select",{value:itemId,onChange:e=>setItemId(e.target.value),style:{...inpS({width:"100%",marginBottom:18})}},
          selCat.items.map(i=>React.createElement("option",{key:i.id,value:i.id},i.name))
        ),
      ),
      React.createElement("div",{style:{fontSize:13,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}},"Amount (₪)"),
      React.createElement("input",{type:"number",placeholder:"0",value:amount,onChange:e=>setAmount(e.target.value),
        style:{...inpS({width:"100%",marginBottom:18,fontSize:34,fontWeight:800,textAlign:"center",color:C.green})},autoFocus:true}),
      React.createElement("div",{style:{fontSize:13,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}},"Description"),
      React.createElement("input",{type:"text",placeholder:"e.g. Dinner with friends",value:desc,onChange:e=>setDesc(e.target.value),
        style:{...inpS({width:"100%",marginBottom:18})}}),
      React.createElement("div",{style:{fontSize:13,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}},"Date"),
      React.createElement("input",{type:"date",value:date,onChange:e=>setDate(e.target.value),style:{...inpS({width:"100%",marginBottom:18})}}),
    ),
    React.createElement("div",{style:{padding:"16px 20px",paddingBottom:"calc(20px + env(safe-area-inset-bottom))",flexShrink:0}},
      React.createElement("button",{onClick:submit,disabled:!amount||!itemId,style:{
        width:"100%",padding:18,background:amount&&itemId?"linear-gradient(135deg,#1D9E75,#0F6E56)":"#e0e0e0",
        color:amount&&itemId?"#fff":"#aaa",border:"none",borderRadius:16,fontSize:18,fontWeight:800,
        cursor:amount&&itemId?"pointer":"default",boxShadow:amount&&itemId?"0 4px 20px rgba(29,158,117,0.4)":"none",
      }},"✅  Log Transaction"),
    )
  );
}

// ── Category Screen ───────────────────────────────────────────
function CatScreen({cat,transactions,mi,monthIdx,year,getBudget,onRemove,onAdd,onBack}) {
  const [dDesc,setDDesc]=React.useState("");
  const [dAmt,setDAmt]=React.useState("");
  const [dDate,setDDate]=React.useState(`${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`);
  const [selItem,setSelItem]=React.useState(cat.items[0]?.id||"");
  const allTx=cat.items.flatMap(item=>(transactions[txKey(cat.id,item.id,mi)]||[]).map(tx=>({...tx,itemId:item.id,itemName:item.name}))).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const totalActual=allTx.reduce((s,tx)=>s+tx.amount,0);
  const totalBudget=cat.items.reduce((s,item)=>s+getBudget(bKey(cat.id,item.id)),0);
  const pct=totalBudget>0?Math.min(100,(totalActual/totalBudget)*100):0;
  const over=totalActual>totalBudget&&totalBudget>0;
  const submit=()=>{
    const amt=parseFloat(dAmt); if(!amt||amt<=0) return;
    onAdd(cat.id,selItem,{id:Date.now(),desc:dDesc,amount:amt,date:dDate});
    setDDesc(""); setDAmt("");
  };
  return React.createElement("div",{style:{position:"fixed",inset:0,background:C.bg,zIndex:300,display:"flex",flexDirection:"column",fontFamily:"-apple-system,sans-serif",overflowY:"auto"}},
    React.createElement("div",{style:{background:`linear-gradient(135deg,${cat.color},${cat.color}bb)`,padding:"52px 20px 24px",flexShrink:0}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:18}},
        React.createElement("button",{onClick:onBack,style:{background:"rgba(255,255,255,0.25)",border:"none",color:"#fff",borderRadius:12,width:42,height:42,fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}},"←"),
        React.createElement("span",{style:{fontSize:30}},cat.emoji),
        React.createElement("div",null,
          React.createElement("div",{style:{color:"rgba(255,255,255,0.8)",fontSize:13}},"Category"),
          React.createElement("div",{style:{color:"#fff",fontSize:24,fontWeight:800}},cat.name),
        )
      ),
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:12}},
        React.createElement("div",null,React.createElement("div",{style:{color:"rgba(255,255,255,0.7)",fontSize:12}},"Spent"),React.createElement("div",{style:{color:"#fff",fontSize:28,fontWeight:800}},fmt(totalActual))),
        React.createElement("div",{style:{textAlign:"right"}},React.createElement("div",{style:{color:"rgba(255,255,255,0.7)",fontSize:12}},"Budget"),React.createElement("div",{style:{color:"#fff",fontSize:28,fontWeight:800}},fmt(totalBudget))),
      ),
      React.createElement("div",{style:{height:8,background:"rgba(255,255,255,0.25)",borderRadius:4,overflow:"hidden"}},
        React.createElement("div",{style:{height:"100%",width:`${pct}%`,background:"#fff",borderRadius:4,transition:"width .5s"}})
      ),
    ),
    React.createElement("div",{style:{padding:16,flexShrink:0}},
      React.createElement("div",{style:{...cardS,padding:16,marginBottom:0}},
        React.createElement("div",{style:{fontSize:16,fontWeight:700,marginBottom:12}},"➕ Add transaction"),
        React.createElement("select",{value:selItem,onChange:e=>setSelItem(e.target.value),style:{...inpS({width:"100%",marginBottom:10})}},
          cat.items.map(i=>React.createElement("option",{key:i.id,value:i.id},i.name))
        ),
        React.createElement("input",{type:"text",placeholder:"Description (optional)",value:dDesc,onChange:e=>setDDesc(e.target.value),style:{...inpS({width:"100%",marginBottom:10})}}),
        React.createElement("div",{style:{display:"flex",gap:10}},
          React.createElement("input",{type:"number",placeholder:"₪ Amount",value:dAmt,onChange:e=>setDAmt(e.target.value),onKeyDown:e=>e.key==="Enter"&&submit(),style:{...inpS({flex:1,fontSize:18,fontWeight:700,textAlign:"right"})}}),
          React.createElement("input",{type:"date",value:dDate,onChange:e=>setDDate(e.target.value),style:{...inpS({flex:1})}}),
          React.createElement("button",{onClick:submit,style:{...btnS({background:cat.color,color:"#fff",border:"none",padding:"12px 18px",flexShrink:0})}},"Add"),
        ),
      )
    ),
    React.createElement("div",{style:{padding:"0 16px 40px"}},
      React.createElement("div",{style:{fontSize:15,fontWeight:700,color:C.muted,marginBottom:12}},`${allTx.length} transactions`),
      allTx.length===0
        ?React.createElement("div",{style:{textAlign:"center",padding:40,color:C.muted,fontSize:16}},"No transactions yet")
        :allTx.map(tx=>React.createElement("div",{key:tx.id,style:{...cardS,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:10}},
            React.createElement("div",{style:{width:44,height:44,borderRadius:12,background:cat.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}},cat.emoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:15,fontWeight:600}},tx.desc||tx.itemName),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:2}},`${tx.itemName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:17,fontWeight:800,color:C.red}},`-${fmt(tx.amount)}`),
            React.createElement("button",{onClick:()=>onRemove(cat.id,tx.itemId,tx.id),style:{background:"#fee",border:"none",borderRadius:8,width:34,height:34,cursor:"pointer",fontSize:16,color:C.red,display:"flex",alignItems:"center",justifyContent:"center"}},"×"),
          ))
    ),
  );
}

// ── Main App ──────────────────────────────────────────────────
function App() {
  const [tab,setTab]=React.useState("home");
  const [screen,setScreen]=React.useState(null);
  const [monthIdx,setMonthIdx]=React.useState(CUR_MONTH);
  const [year,setYear]=React.useState(CUR_YEAR);
  const [cats,setCats]=React.useState(CATS_DEFAULT);
  const [values,setValues]=React.useState(BUDGETS_DEFAULT);
  const [transactions,setTransactions]=React.useState(TX_DEFAULT);
  const [newCatName,setNewCatName]=React.useState("");
  const [newCatType,setNewCatType]=React.useState("expense");
  const [newItemName,setNewItemName]=React.useState({});
  const [openBudgetCats,setOpenBudgetCats]=React.useState({});
  const [loaded,setLoaded]=React.useState(false);
  const [saveStatus,setSaveStatus]=React.useState("");
  const [showBackup,setShowBackup]=React.useState(false);
  const [confetti,setConfetti]=React.useState(false);
  const [toast,setToast]=React.useState({msg:"",visible:false});
  const [search,setSearch]=React.useState("");
  const [showSearch,setShowSearch]=React.useState(false);

  const mi=monthIdx+year*12;

  const showToast=React.useCallback(msg=>{setToast({msg,visible:true});setTimeout(()=>setToast({msg:"",visible:false}),2500);},[]);

  React.useEffect(()=>{
    try{
      const c=localStorage.getItem(SK_C);if(c)setCats(JSON.parse(c));
      const v=localStorage.getItem(SK_V);if(v)setValues(JSON.parse(v));
      const t=localStorage.getItem(SK_T);if(t)setTransactions(JSON.parse(t));
    }catch{}
    setLoaded(true);
  },[]);

  const saveNow=React.useCallback(()=>{
    setSaveStatus("saving");
    try{
      localStorage.setItem(SK_C,JSON.stringify(cats));
      localStorage.setItem(SK_V,JSON.stringify(values));
      localStorage.setItem(SK_T,JSON.stringify(transactions));
      setSaveStatus("saved");setTimeout(()=>setSaveStatus(""),2000);
    }catch{setSaveStatus("error");}
  },[cats,values,transactions]);

  React.useEffect(()=>{if(!loaded)return;const t=setTimeout(saveNow,800);return()=>clearTimeout(t);},[cats,values,transactions,loaded]);

  const getBudget=k=>values[k]||0;
  const setBudgetVal=(k,v)=>setValues(p=>({...p,[k]:Number(v)||0}));
  const getTxList=(c,i)=>transactions[txKey(c,i,mi)]||[];
  const getActual=(c,i)=>getTxList(c,i).reduce((s,t)=>s+t.amount,0);
  const getCatActual=(cat,m)=>cat.items.reduce((s,item)=>s+((transactions[txKey(cat.id,item.id,m??mi)]||[]).reduce((a,t)=>a+t.amount,0)),0);
  const getCatBudget=cat=>cat.items.reduce((s,item)=>s+getBudget(bKey(cat.id,item.id)),0);

  const addTx=React.useCallback((cId,iId,txData)=>{
    const key=txKey(cId,iId,mi);
    setTransactions(p=>({...p,[key]:[...(p[key]||[]),txData]}));
    setConfetti(true);setTimeout(()=>setConfetti(false),100);
    const cat=cats.find(c=>c.id===cId);
    showToast(`${cat?.emoji||""} ₪${txData.amount} logged!`);
    setScreen(null);
  },[cats,mi,showToast]);

  const removeTx=React.useCallback((cId,iId,txId)=>{
    const key=txKey(cId,iId,mi);
    setTransactions(p=>({...p,[key]:(p[key]||[]).filter(t=>t.id!==txId)}));
    showToast("Transaction deleted");
  },[mi,showToast]);

  const totals=React.useMemo(()=>{
    const t={};
    cats.forEach(cat=>{t[cat.id]={budget:getCatBudget(cat),actual:getCatActual(cat)};});
    return t;
  },[cats,values,transactions,mi]);

  const summary=React.useMemo(()=>{
    const inc=cats.filter(c=>c.type==="income");
    const exp=cats.filter(c=>c.type==="expense");
    const bI=inc.reduce((s,c)=>s+totals[c.id].budget,0);
    const aI=inc.reduce((s,c)=>s+totals[c.id].actual,0);
    const bE=exp.reduce((s,c)=>s+totals[c.id].budget,0);
    const aE=exp.reduce((s,c)=>s+totals[c.id].actual,0);
    return {bI,aI,bE,aE,remaining:bE-aE};
  },[cats,totals]);

  const barData=React.useMemo(()=>Array.from({length:6},(_,i)=>{
    const d=new Date(year,monthIdx-5+i);
    const m=d.getMonth()+d.getFullYear()*12;
    const v=cats.filter(c=>c.type==="expense").reduce((s,cat)=>s+getCatActual(cat,m),0);
    return {label:MONTHS[d.getMonth()],v,cur:m===mi};
  }),[cats,transactions,mi]);

  const donutData=React.useMemo(()=>
    cats.filter(c=>c.type==="expense"&&totals[c.id].actual>0)
      .map(c=>({label:c.name,v:totals[c.id].actual,color:c.color,emoji:c.emoji}))
      .sort((a,b)=>b.v-a.v)
  ,[cats,totals]);

  const topCat=donutData[0];
  const prevTotal=React.useMemo(()=>cats.filter(c=>c.type==="expense").reduce((s,cat)=>s+getCatActual(cat,mi-1),0),[cats,transactions,mi]);

  const allTx=React.useMemo(()=>{
    const list=[];
    cats.forEach(cat=>cat.items.forEach(item=>{
      (transactions[txKey(cat.id,item.id,mi)]||[]).forEach(tx=>{
        list.push({...tx,catName:cat.name,catEmoji:cat.emoji,catColor:cat.color,itemName:item.name,catId:cat.id,itemId:item.id});
      });
    }));
    return list.sort((a,b)=>new Date(b.date)-new Date(a.date));
  },[cats,transactions,mi]);

  const filteredTx=React.useMemo(()=>{
    if(!search) return allTx;
    const q=search.toLowerCase();
    return allTx.filter(tx=>(tx.desc||"").toLowerCase().includes(q)||tx.catName.toLowerCase().includes(q)||tx.itemName.toLowerCase().includes(q));
  },[allTx,search]);

  const importData=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const d=JSON.parse(ev.target.result);
        if(d.cats)setCats(d.cats);if(d.values)setValues(d.values);if(d.transactions)setTransactions(d.transactions);
        setTimeout(saveNow,500);showToast("✅ Imported!");
      }catch{showToast("❌ Invalid file");}
    };
    reader.readAsText(file);e.target.value="";
  };

  const exportCSV=()=>{
    const rows=[["Date","Month","Category","Item","Description","Amount"]];
    cats.forEach(cat=>cat.items.forEach(item=>{
      Object.entries(transactions).forEach(([k,list])=>{
        if(!k.startsWith(`tx_${cat.id}_${item.id}_`))return;
        list.forEach(tx=>{const d=new Date(tx.date);rows.push([tx.date,MONTHS[d.getMonth()],cat.name,item.name,tx.desc||"",tx.amount]);});
      });
    }));
    const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv"});const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="budget.csv";a.click();URL.revokeObjectURL(url);
  };

  const addCat=()=>{if(!newCatName.trim())return;setCats(p=>[...p,{id:"cat_"+Date.now(),name:newCatName.trim(),type:newCatType,color:"#888780",emoji:"📦",items:[]}]);setNewCatName("");};
  const addItem=cId=>{const name=(newItemName[cId]||"").trim();if(!name)return;setCats(p=>p.map(c=>c.id===cId?{...c,items:[...c.items,{id:"item_"+Date.now(),name}]}:c));setNewItemName(p=>({...p,[cId]:""}));};
  const removeItem=(cId,iId)=>setCats(p=>p.map(c=>c.id===cId?{...c,items:c.items.filter(i=>i.id!==iId)}:c));
  const removeCat=cId=>setCats(p=>p.filter(c=>c.id!==cId));

  if(!loaded) return React.createElement("div",{style:{padding:40,textAlign:"center",color:C.muted,fontFamily:"-apple-system,sans-serif",fontSize:18}},"Loading...");

  // Full-screen overlays
  if(screen==="add") return React.createElement(React.Fragment,null,
    React.createElement(Confetti,{active:confetti}),
    React.createElement(Toast,{msg:toast.msg,visible:toast.visible}),
    React.createElement(AddScreen,{cats,mi,monthIdx,year,onAdd:addTx,onBack:()=>setScreen(null)}),
  );
  if(screen?.type==="cat") return React.createElement(React.Fragment,null,
    React.createElement(Confetti,{active:confetti}),
    React.createElement(Toast,{msg:toast.msg,visible:toast.visible}),
    React.createElement(CatScreen,{cat:screen.cat,transactions,mi,monthIdx,year,getBudget,onRemove:removeTx,onAdd:addTx,onBack:()=>setScreen(null)}),
  );

  const TABS=[["home","🏠","Home"],["tracker","📋","Transactions"],["budget","⚙️","Budgets"]];

  return React.createElement("div",{style:{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:C.bg,minHeight:"100vh",paddingBottom:90,fontSize:15}},
    React.createElement(Confetti,{active:confetti}),
    React.createElement(Toast,{msg:toast.msg,visible:toast.visible}),

    // Header
    React.createElement("div",{style:{background:"linear-gradient(135deg,#1D9E75,#0F6E56)",padding:"52px 20px 20px",position:"sticky",top:0,zIndex:100}},
      React.createElement("div",{style:{maxWidth:600,margin:"0 auto"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement("button",{onClick:()=>{const d=new Date(year,monthIdx-1);setMonthIdx(d.getMonth());setYear(d.getFullYear());},style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:20,borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center"}},"‹"),
            React.createElement("span",{style:{color:"#fff",fontSize:20,fontWeight:800}},`${MONTHS[monthIdx]} ${year}`),
            React.createElement("button",{onClick:()=>{const d=new Date(year,monthIdx+1);setMonthIdx(d.getMonth());setYear(d.getFullYear());},style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:20,borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center"}},"›"),
          ),
          React.createElement("div",{style:{display:"flex",gap:8}},
            React.createElement("button",{onClick:()=>setShowSearch(!showSearch),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:17,borderRadius:10,padding:"7px 11px"}},"🔍"),
            React.createElement("button",{onClick:saveNow,style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:14,borderRadius:10,padding:"7px 11px",fontWeight:700}},saveStatus==="saved"?"✓":saveStatus==="saving"?"...":"💾"),
            React.createElement("button",{onClick:()=>setShowBackup(true),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",borderRadius:10,padding:"7px 11px",fontSize:14}},"📋"),
          )
        ),
        showSearch&&React.createElement("input",{type:"text",placeholder:"Search transactions...",value:search,onChange:e=>setSearch(e.target.value),autoFocus:true,
          style:{width:"100%",marginTop:12,padding:"12px 16px",borderRadius:14,border:"none",fontSize:16,outline:"none",boxSizing:"border-box"}}),
      )
    ),

    // Search results
    showSearch&&React.createElement("div",{style:{maxWidth:600,margin:"0 auto",padding:"14px 16px"}},
      filteredTx.length===0
        ?React.createElement("div",{style:{textAlign:"center",color:C.muted,padding:40,fontSize:16}},"No transactions found")
        :filteredTx.map(tx=>React.createElement("div",{key:tx.id,style:{...cardS,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}},
            React.createElement("div",{style:{width:42,height:42,borderRadius:12,background:tx.catColor+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}},tx.catEmoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:15,fontWeight:600}},tx.desc||"—"),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:2}},`${tx.catName} · ${tx.itemName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:16,fontWeight:800,color:C.red}},`-${fmt(tx.amount)}`),
            React.createElement("button",{onClick:()=>removeTx(tx.catId,tx.itemId,tx.id),style:{background:"transparent",border:"none",color:"#ccc",cursor:"pointer",fontSize:20}},"×"),
          ))
    ),

    !showSearch&&React.createElement("div",{style:{maxWidth:600,margin:"0 auto",padding:"16px 16px 0"}},

      // ── HOME ──
      tab==="home"&&React.createElement(React.Fragment,null,
        // Hero card
        React.createElement("div",{style:{...cardS,background:"linear-gradient(135deg,#1D9E75,#0F6E56)",border:"none"}},
          React.createElement("div",{style:{padding:22}},
            React.createElement("div",{style:{color:"rgba(255,255,255,0.8)",fontSize:14}},"Remaining to spend"),
            React.createElement("div",{style:{color:"#fff",fontSize:44,fontWeight:900,letterSpacing:-1}},fmt(summary.remaining)),
            React.createElement("div",{style:{height:7,background:"rgba(255,255,255,0.2)",borderRadius:4,margin:"14px 0 10px",overflow:"hidden"}},
              React.createElement("div",{style:{height:"100%",width:`${summary.bE>0?Math.min(100,(summary.aE/summary.bE)*100):0}%`,background:"#fff",borderRadius:4,transition:"width .5s"}})
            ),
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,0.8)",fontSize:13}},
              React.createElement("span",null,`Spent: ${fmt(summary.aE)}`),
              React.createElement("span",null,`Budget: ${fmt(summary.bE)}`),
            )
          )
        ),
        // Insights
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}},
          React.createElement("div",{style:cardS},React.createElement("div",{style:{padding:16}},
            React.createElement("div",{style:{fontSize:12,color:C.muted,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:.4}},"🔥 Top category"),
            topCat?React.createElement(React.Fragment,null,
              React.createElement("div",{style:{fontSize:16,fontWeight:700}},`${topCat.emoji} ${topCat.label}`),
              React.createElement("div",{style:{fontSize:16,color:C.red,fontWeight:800,marginTop:2}},fmt(topCat.v)),
            ):React.createElement("div",{style:{fontSize:14,color:C.muted}},"No data"),
          )),
          React.createElement("div",{style:cardS},React.createElement("div",{style:{padding:16}},
            React.createElement("div",{style:{fontSize:12,color:C.muted,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:.4}},"📅 vs last month"),
            React.createElement("div",{style:{fontSize:20,fontWeight:900,color:summary.aE>prevTotal?C.red:C.green}},
              summary.aE>prevTotal?`▲ ${fmt(summary.aE-prevTotal)}`:`▼ ${fmt(prevTotal-summary.aE)}`
            ),
            React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:2}},`Last: ${fmt(prevTotal)}`),
          )),
        ),
        // Recent
        allTx.length>0&&React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:"16px 16px 4px",display:"flex",justifyContent:"space-between",alignItems:"center"}},
            React.createElement("span",{style:{fontWeight:700,fontSize:16}},"Recent"),
            React.createElement("span",{style:{fontSize:13,color:C.green,cursor:"pointer",fontWeight:700},onClick:()=>setTab("tracker")},"See all →"),
          ),
          allTx.slice(0,5).map(tx=>React.createElement("div",{key:tx.id,style:{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderTop:`1px solid ${C.border}`,cursor:"pointer"},
            onClick:()=>setScreen({type:"cat",cat:cats.find(c=>c.id===tx.catId)})},
            React.createElement("div",{style:{width:42,height:42,borderRadius:12,background:tx.catColor+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}},tx.catEmoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:15,fontWeight:600}},tx.desc||tx.itemName),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:1}},`${tx.catName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:16,fontWeight:800,color:C.red}},`-${fmt(tx.amount)}`),
          )),
        ),
        // Donut
        React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:18}},
            React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:14}},"Spending breakdown"),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:16}},
              React.createElement("div",{style:{width:150,flexShrink:0}},React.createElement(Donut,{data:donutData,total:summary.aE||1,label:fmt(summary.aE),sub:"spent"})),
              React.createElement("div",{style:{flex:1}},
                donutData.slice(0,6).map(d=>React.createElement("div",{key:d.label,style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},
                  React.createElement("div",{style:{width:10,height:10,borderRadius:"50%",background:d.color,flexShrink:0}}),
                  React.createElement("span",{style:{fontSize:13,flex:1}},d.label),
                  React.createElement("span",{style:{fontSize:13,fontWeight:700,color:C.muted}},`${Math.round(d.v/summary.aE*100)}%`),
                ))
              )
            )
          )
        ),
        // Bar
        React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:18}},
            React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:14}},"Last 6 months"),
            React.createElement(Bars,{data:barData}),
          )
        ),
        // Category grid
        React.createElement("div",{style:{fontWeight:800,fontSize:17,marginBottom:12}},"Categories"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}},
          cats.filter(c=>c.type==="expense").map(cat=>{
            const t=totals[cat.id];
            const pct=t.budget>0?Math.min(100,(t.actual/t.budget)*100):0;
            const over=t.actual>t.budget&&t.budget>0;
            return React.createElement("div",{key:cat.id,onClick:()=>setScreen({type:"cat",cat}),
              style:{...cardS,marginBottom:0,cursor:"pointer",padding:16,borderLeft:`4px solid ${cat.color}`}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},
                React.createElement("span",{style:{fontSize:24}},cat.emoji),
                React.createElement("span",{style:{fontSize:15,fontWeight:700}},cat.name),
              ),
              React.createElement("div",{style:{fontSize:20,fontWeight:800,color:over?C.red:C.text,marginBottom:2}},fmt(t.actual)),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginBottom:8}},`of ${fmt(t.budget)}`),
              React.createElement("div",{style:{height:5,background:"#f0ede8",borderRadius:3,overflow:"hidden"}},
                React.createElement("div",{style:{height:"100%",width:`${pct}%`,background:over?C.red:cat.color,borderRadius:3,transition:"width .4s"}})
              ),
            );
          })
        ),
      ),

      // ── TRANSACTIONS ──
      tab==="tracker"&&React.createElement(React.Fragment,null,
        React.createElement("div",{style:{fontWeight:800,fontSize:22,marginBottom:16}},"Transactions"),
        cats.map(cat=>{
          const t=totals[cat.id];
          const txCount=allTx.filter(tx=>tx.catId===cat.id).length;
          return React.createElement("div",{key:cat.id,onClick:()=>setScreen({type:"cat",cat}),
            style:{...cardS,padding:16,cursor:"pointer",display:"flex",alignItems:"center",gap:14}},
            React.createElement("div",{style:{width:50,height:50,borderRadius:14,background:cat.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}},cat.emoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:16,fontWeight:700,marginBottom:4}},cat.name),
              cat.type==="expense"&&t.budget>0&&React.createElement("div",{style:{height:5,background:"#f0ede8",borderRadius:3,overflow:"hidden",marginBottom:4}},
                React.createElement("div",{style:{height:"100%",width:`${Math.min(100,(t.actual/t.budget)*100)}%`,background:t.actual>t.budget?C.red:cat.color,borderRadius:3}})
              ),
              React.createElement("div",{style:{fontSize:13,color:C.muted}},`${txCount} transaction${txCount!==1?"s":""}`),
            ),
            React.createElement("div",{style:{textAlign:"right"}},
              React.createElement("div",{style:{fontSize:18,fontWeight:800,color:t.actual>t.budget&&t.budget>0?C.red:C.text}},fmt(t.actual)),
              React.createElement("div",{style:{fontSize:12,color:C.muted}},`/ ${fmt(t.budget)}`),
            ),
            React.createElement("span",{style:{fontSize:20,color:C.muted}},"›"),
          );
        })
      ),

      // ── BUDGETS ──
      tab==="budget"&&React.createElement(React.Fragment,null,
        React.createElement("div",{style:{fontWeight:800,fontSize:22,marginBottom:16}},"Set Budgets"),
        cats.map(cat=>React.createElement("div",{key:cat.id,style:cardS},
          React.createElement("div",{onClick:()=>setOpenBudgetCats(p=>({...p,[cat.id]:!p[cat.id]})),
            style:{display:"flex",alignItems:"center",gap:12,padding:16,cursor:"pointer",borderLeft:`4px solid ${cat.color}`}},
            React.createElement("span",{style:{fontSize:22}},cat.emoji),
            React.createElement("span",{style:{flex:1,fontWeight:700,fontSize:16}},cat.name),
            React.createElement("span",{style:{fontSize:15,color:C.muted,fontWeight:600}},fmt(totals[cat.id].budget)),
            React.createElement("button",{onClick:e=>{e.stopPropagation();removeCat(cat.id);},style:{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:22,padding:"0 6px"}},"×"),
            React.createElement("span",{style:{fontSize:14,color:C.muted}},openBudgetCats[cat.id]?"▲":"▼"),
          ),
          openBudgetCats[cat.id]&&React.createElement(React.Fragment,null,
            cat.items.map(item=>React.createElement("div",{key:item.id,style:{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderTop:`1px solid ${C.border}`}},
              React.createElement("span",{style:{flex:1,color:C.muted,fontSize:15}},item.name),
              React.createElement("span",{style:{fontSize:15,color:C.muted}},"₪"),
              React.createElement("input",{type:"number",min:"0",value:getBudget(bKey(cat.id,item.id))||"",placeholder:"0",
                onChange:e=>setBudgetVal(bKey(cat.id,item.id),e.target.value),
                style:{...inpS({width:100,textAlign:"right",fontSize:16,fontWeight:700})}}),
              React.createElement("button",{onClick:()=>removeItem(cat.id,item.id),style:{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:20}},"×"),
            )),
            React.createElement("div",{style:{display:"flex",gap:8,padding:"12px 16px",borderTop:`1px solid ${C.border}`}},
              React.createElement("input",{placeholder:"New line item...",value:newItemName[cat.id]||"",
                onChange:e=>setNewItemName(p=>({...p,[cat.id]:e.target.value})),
                onKeyDown:e=>e.key==="Enter"&&addItem(cat.id),
                style:{...inpS({flex:1,fontSize:15})}}),
              React.createElement("button",{onClick:()=>addItem(cat.id),style:btnS()},"+ Add"),
            )
          )
        )),
        React.createElement("div",{style:{...cardS,padding:16}},
          React.createElement("div",{style:{fontSize:15,color:C.muted,marginBottom:12,fontWeight:600}},"Add new category"),
          React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
            React.createElement("input",{placeholder:"Name...",value:newCatName,onChange:e=>setNewCatName(e.target.value),
              onKeyDown:e=>e.key==="Enter"&&addCat(),style:{...inpS({flex:2,minWidth:120,fontSize:15})}}),
            React.createElement("select",{value:newCatType,onChange:e=>setNewCatType(e.target.value),style:{...inpS({flex:1,minWidth:100,fontSize:15})}},
              React.createElement("option",{value:"expense"},"Expense"),
              React.createElement("option",{value:"income"},"Income"),
            ),
            React.createElement("button",{onClick:addCat,style:btnS({background:C.green,color:"#fff",border:"none"})},"+ Add"),
          )
        )
      )
    ),

    // FAB
    !showSearch&&React.createElement("button",{onClick:()=>setScreen("add"),style:{
      position:"fixed",bottom:96,right:20,width:62,height:62,borderRadius:"50%",
      background:"linear-gradient(135deg,#1D9E75,#0F6E56)",border:"none",color:"#fff",
      fontSize:34,cursor:"pointer",boxShadow:"0 6px 24px rgba(29,158,117,0.5)",
      display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,
    }},"+"),

    // Backup modal
    showBackup&&React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}},
      React.createElement("div",{style:{background:"#fff",borderRadius:20,padding:22,width:"100%",maxWidth:500}},
        React.createElement("div",{style:{fontWeight:800,fontSize:18,marginBottom:8}},"📋 Backup & Restore"),
        React.createElement("div",{style:{fontSize:13,color:C.muted,marginBottom:12}},"Select all → Copy → Save as budget-backup.json"),
        React.createElement("textarea",{readOnly:true,value:JSON.stringify({cats,values,transactions,exportedAt:new Date().toISOString()},null,2),
          style:{width:"100%",height:160,fontSize:11,fontFamily:"monospace",padding:10,borderRadius:10,border:`1px solid ${C.border}`,resize:"none",boxSizing:"border-box"},
          onClick:e=>e.target.select()}),
        React.createElement("div",{style:{display:"flex",gap:8,marginTop:14}},
          React.createElement("label",{style:{...btnS(),flex:1,textAlign:"center",cursor:"pointer"}},"⬆ Import",
            React.createElement("input",{type:"file",accept:".json",onChange:importData,style:{display:"none"}})),
          React.createElement("button",{onClick:exportCSV,style:btnS({flex:1})},"⬇ CSV"),
          React.createElement("button",{onClick:()=>setShowBackup(false),style:btnS({background:C.green,color:"#fff",border:"none"})},"Close"),
        )
      )
    ),

    // Bottom nav
    React.createElement("div",{style:{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:`1px solid ${C.border}`,
      display:"flex",paddingBottom:"env(safe-area-inset-bottom)",zIndex:100,boxShadow:"0 -2px 14px rgba(0,0,0,0.08)"}},
      TABS.map(([id,emoji,label])=>React.createElement("button",{key:id,onClick:()=>{setTab(id);setShowSearch(false);},
        style:{flex:1,padding:"11px 0 9px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}},
        React.createElement("span",{style:{fontSize:24}},emoji),
        React.createElement("span",{style:{fontSize:11,fontWeight:700,color:tab===id?C.green:C.muted}},label),
      ))
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
