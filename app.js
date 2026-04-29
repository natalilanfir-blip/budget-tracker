// Budget Tracker App

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const NOW = new Date();
const CUR_MONTH = NOW.getMonth();
const CUR_YEAR = NOW.getFullYear();

const DEFAULT_CATEGORIES = [
  { id:"income", name:"Income", type:"income", color:"#1D9E75", emoji:"💰", items:[
    {id:"salary",name:"Salary (משכורת)"},{id:"side",name:"Side income"}]},
  { id:"housing", name:"Housing", type:"expense", color:"#378ADD", emoji:"🏠", items:[
    {id:"rent",name:"Rent / mortgage"},{id:"electric",name:"Electricity"},
    {id:"water",name:"Water"},{id:"internet",name:"Internet & phone"},{id:"vaad",name:"Vaad bayit"}]},
  { id:"food", name:"Food", type:"expense", color:"#EF9F27", emoji:"🍕", items:[
    {id:"supermarket",name:"Supermarket"},{id:"restaurants",name:"Restaurants"},{id:"coffee",name:"Coffee"}]},
  { id:"transport", name:"Transport", type:"expense", color:"#7F77DD", emoji:"🚌", items:[
    {id:"fuel",name:"Fuel"},{id:"transit",name:"Public transit"},
    {id:"carins",name:"Car insurance"},{id:"gett",name:"Gett/Train"}]},
  { id:"health", name:"Health", type:"expense", color:"#D85A30", emoji:"💊", items:[
    {id:"kupat",name:"Kupat holim"},{id:"insurance",name:"Insurance"},
    {id:"meds",name:"Medications"},{id:"gym",name:"Gym"}]},
  { id:"entertainment", name:"Entertainment", type:"expense", color:"#D4537E", emoji:"🎉", items:[
    {id:"subs",name:"Subscriptions"},{id:"outings",name:"Outings"},
    {id:"spotify",name:"Spotify, Google, Apple"},{id:"concerts",name:"Concert, Event, etc."}]},
  { id:"savings", name:"Savings", type:"expense", color:"#0F6E56", emoji:"💎", items:[
    {id:"emergency",name:"Emergency fund"},{id:"invest",name:"Investments"},
    {id:"roth",name:"Roth IRA"},{id:"brokerage",name:"Brokerage"},{id:"travel",name:"Travel"}]},
  { id:"personal", name:"Personal", type:"expense", color:"#BA7517", emoji:"✨", items:[
    {id:"clothing",name:"Clothing"},{id:"care",name:"Personal care"},{id:"misc",name:"Miscellaneous"}]},
];

const DEFAULT_BUDGETS = {
  "b_income_salary":13000,"b_income_side":0,
  "b_housing_rent":3700,"b_housing_electric":150,"b_housing_water":100,"b_housing_internet":30,"b_housing_vaad":70,
  "b_food_supermarket":1000,"b_food_restaurants":1000,"b_food_coffee":300,
  "b_transport_fuel":0,"b_transport_transit":200,"b_transport_carins":0,"b_transport_gett":100,
  "b_health_kupat":0,"b_health_insurance":0,"b_health_meds":50,"b_health_gym":400,
  "b_entertainment_subs":0,"b_entertainment_outings":0,"b_entertainment_spotify":50,"b_entertainment_concerts":150,
  "b_savings_emergency":500,"b_savings_invest":0,"b_savings_roth":1500,"b_savings_brokerage":1500,"b_savings_travel":1000,
  "b_personal_clothing":300,"b_personal_care":300,"b_personal_misc":600,
};

const MAR_MI=2+2026*12, APR_MI=3+2026*12;
const PRELOADED_TX={
  [`tx_housing_rent_${MAR_MI}`]:[{id:"m1",date:"2026-03-21",desc:"Rent",amount:3700}],
  [`tx_housing_internet_${MAR_MI}`]:[{id:"m2",date:"2026-03-21",desc:"phone",amount:30}],
  [`tx_food_supermarket_${MAR_MI}`]:[
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
  [`tx_food_restaurants_${MAR_MI}`]:[
    {id:"m21",date:"2026-03-21",desc:"toni v ester",amount:53},{id:"m22",date:"2026-03-21",desc:"htaco",amount:49},
    {id:"m23",date:"2026-03-21",desc:"mclovin",amount:16},{id:"m24",date:"2026-03-21",desc:"mclovin",amount:28},
    {id:"m25",date:"2026-03-21",desc:"cassata",amount:19},
  ],
  [`tx_food_coffee_${MAR_MI}`]:[
    {id:"m26",date:"2026-03-21",desc:"nordoy",amount:18},{id:"m27",date:"2026-03-21",desc:"ada lewinsky",amount:37},
    {id:"m28",date:"2026-03-21",desc:"chachos",amount:18},{id:"m29",date:"2026-03-21",desc:"tony and ester",amount:40},
  ],
  [`tx_transport_gett_${MAR_MI}`]:[{id:"m30",date:"2026-03-21",desc:"gett",amount:78}],
  [`tx_entertainment_spotify_${MAR_MI}`]:[{id:"m31",date:"2026-03-21",desc:"spotify",amount:24},{id:"m32",date:"2026-03-21",desc:"google",amount:9}],
  [`tx_savings_travel_${MAR_MI}`]:[{id:"m33",date:"2026-03-21",desc:"Flight to Rhodes",amount:686}],
  [`tx_personal_care_${MAR_MI}`]:[{id:"m34",date:"2026-03-21",desc:"superpharm",amount:18},{id:"m35",date:"2026-03-21",desc:"superpharm",amount:52}],
  [`tx_food_restaurants_${APR_MI}`]:[
    {id:"a1",date:"2026-04-06",desc:"Shafa Bar",amount:87},{id:"a2",date:"2026-04-05",desc:"Khao San Food TLV",amount:55},
    {id:"a3",date:"2026-04-04",desc:"Moon Sushi Burger",amount:136},{id:"a4",date:"2026-04-08",desc:"Gania Costanza B",amount:110},
  ],
  [`tx_food_coffee_${APR_MI}`]:[
    {id:"a5",date:"2026-04-05",desc:"Café BaNachla",amount:30},{id:"a6",date:"2026-04-04",desc:"Tzakuli",amount:6},{id:"a7",date:"2026-04-02",desc:"Tom's",amount:33},
  ],
  [`tx_food_supermarket_${APR_MI}`]:[
    {id:"a8",date:"2026-04-04",desc:"Ilay Market",amount:26.80},{id:"a9",date:"2026-04-03",desc:"Hasid HaYerek",amount:25},
    {id:"a10",date:"2026-04-03",desc:"Davka Gourmet",amount:15},{id:"a11",date:"2026-04-03",desc:"Shuk HaAliya",amount:23.10},
    {id:"a12",date:"2026-04-03",desc:"Street Market David",amount:22.80},{id:"a13",date:"2026-04-03",desc:"Super Al HaYam",amount:38.80},
    {id:"a14",date:"2026-04-01",desc:"Super Mama",amount:36.75},
  ],
  [`tx_personal_care_${APR_MI}`]:[{id:"a15",date:"2026-04-01",desc:"A. Aviv Flowers",amount:120}],
  [`tx_personal_clothing_${APR_MI}`]:[{id:"a16",date:"2026-04-01",desc:"Top Stock",amount:50}],
  [`tx_personal_misc_${APR_MI}`]:[{id:"a17",date:"2026-04-05",desc:"Bank card fee",amount:9.90}],
};

const fmt=n=>"₪"+Math.round(Math.abs(n)).toLocaleString();
const makeBudgetKey=(cId,iId)=>`b_${cId}_${iId}`;
const makeTxKey=(cId,iId,mi)=>`tx_${cId}_${iId}_${mi}`;
const SK_CATS="bgt_cats",SK_VALS="bgt_vals",SK_TX="bgt_tx";

// ── Confetti ──────────────────────────────────────────────────
function Confetti({active}) {
  const ref=useRef();
  useEffect(()=>{
    if(!active) return;
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const pieces=Array.from({length:90},()=>({
      x:Math.random()*canvas.width, y:-10,
      r:Math.random()*7+3,
      color:["#1D9E75","#378ADD","#EF9F27","#D4537E","#7F77DD","#D85A30","#BA7517"][Math.floor(Math.random()*7)],
      vx:(Math.random()-.5)*5, vy:Math.random()*5+2,
      rot:Math.random()*360, vrot:(Math.random()-.5)*10,
    }));
    let frame,done=false;
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=p.vrot;p.vy+=0.1;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color;ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);ctx.restore();});
      if(!done) frame=requestAnimationFrame(draw);
    };
    draw();
    const t=setTimeout(()=>{done=true;cancelAnimationFrame(frame);ctx.clearRect(0,0,canvas.width,canvas.height);},2200);
    return()=>{done=true;cancelAnimationFrame(frame);clearTimeout(t);};
  },[active]);
  return React.createElement("canvas",{ref,style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999}});
}

// ── Toast ─────────────────────────────────────────────────────
function Toast({msg,visible}) {
  return React.createElement("div",{style:{
    position:"fixed",bottom:100,left:"50%",transform:`translateX(-50%) translateY(${visible?0:16}px)`,
    opacity:visible?1:0,transition:"all 0.3s",background:"#1a1a18",color:"#fff",
    padding:"12px 24px",borderRadius:40,fontSize:15,fontWeight:700,zIndex:9998,whiteSpace:"nowrap",
    boxShadow:"0 6px 24px rgba(0,0,0,0.3)",letterSpacing:.2,
  }},msg);
}

// ── Full-screen Add Transaction ───────────────────────────────
function AddTxScreen({cats,onAdd,onBack,monthIdx,year}) {
  const [catId,setCatId]=useState(cats.filter(c=>c.type==="expense")[0]?.id||"");
  const [itemId,setItemId]=useState("");
  const [desc,setDesc]=useState("");
  const [amount,setAmount]=useState("");
  const [date,setDate]=useState(`${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`);
  const selCat=cats.find(c=>c.id===catId);
  useEffect(()=>{if(selCat?.items?.length) setItemId(selCat.items[0].id);},[catId]);
  const submit=()=>{
    const amt=parseFloat(amount); if(!amt||amt<=0||!itemId) return;
    onAdd(catId,itemId,{id:Date.now(),desc,amount:amt,date});
  };
  const C={bg:"#f7f5f0",card:"#fff",border:"#ede9e2",text:"#1a1a18",muted:"#888780",success:"#1D9E75"};
  const field=(label,child)=>React.createElement("div",{style:{marginBottom:20}},
    React.createElement("label",{style:{fontSize:13,fontWeight:600,color:C.muted,display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}},label),
    child
  );
  const selStyle={width:"100%",padding:"16px",borderRadius:14,border:`1.5px solid ${C.border}`,fontSize:17,background:C.card,color:C.text,appearance:"none",outline:"none"};
  const inpStyle={width:"100%",padding:"16px",borderRadius:14,border:`1.5px solid ${C.border}`,fontSize:17,background:C.card,color:C.text,outline:"none",boxSizing:"border-box"};

  return React.createElement("div",{style:{position:"fixed",inset:0,background:C.bg,zIndex:400,display:"flex",flexDirection:"column",fontFamily:"-apple-system,sans-serif"}},
    // Header
    React.createElement("div",{style:{background:"linear-gradient(135deg,#1D9E75,#0F6E56)",padding:"52px 20px 20px",display:"flex",alignItems:"center",gap:16}},
      React.createElement("button",{onClick:onBack,style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",borderRadius:12,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}},"←"),
      React.createElement("div",null,
        React.createElement("div",{style:{color:"rgba(255,255,255,0.8)",fontSize:13}},`${MONTHS[monthIdx]} ${year}`),
        React.createElement("div",{style:{color:"#fff",fontSize:22,fontWeight:800}},"Add Transaction"),
      )
    ),
    // Form
    React.createElement("div",{style:{flex:1,overflowY:"auto",padding:20}},
      field("Category",
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}},
          cats.filter(c=>c.type==="expense").map(c=>
            React.createElement("button",{key:c.id,onClick:()=>setCatId(c.id),style:{
              padding:"14px 10px",borderRadius:14,border:`2px solid ${catId===c.id?c.color:C.border}`,
              background:catId===c.id?c.color+"18":C.card,cursor:"pointer",
              display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.15s"
            }},
              React.createElement("span",{style:{fontSize:24}},c.emoji),
              React.createElement("span",{style:{fontSize:13,fontWeight:600,color:catId===c.id?c.color:C.text}},c.name),
            )
          )
        )
      ),
      selCat && field("Item",
        React.createElement("select",{value:itemId,onChange:e=>setItemId(e.target.value),style:selStyle},
          selCat.items.map(i=>React.createElement("option",{key:i.id,value:i.id},i.name))
        )
      ),
      field("Amount (₪)",
        React.createElement("input",{type:"number",placeholder:"0",value:amount,onChange:e=>setAmount(e.target.value),
          style:{...inpStyle,fontSize:32,fontWeight:800,textAlign:"center",color:"#1D9E75"},autoFocus:true})
      ),
      field("Description (optional)",
        React.createElement("input",{type:"text",placeholder:"e.g. Dinner with friends",value:desc,onChange:e=>setDesc(e.target.value),style:inpStyle})
      ),
      field("Date",
        React.createElement("input",{type:"date",value:date,onChange:e=>setDate(e.target.value),style:inpStyle})
      ),
    ),
    // Submit
    React.createElement("div",{style:{padding:"16px 20px",paddingBottom:"calc(16px + env(safe-area-inset-bottom))"}},
      React.createElement("button",{onClick:submit,disabled:!amount||!itemId,style:{
        width:"100%",padding:18,background:amount&&itemId?"linear-gradient(135deg,#1D9E75,#0F6E56)":"#e0e0e0",
        color:amount&&itemId?"#fff":"#aaa",border:"none",borderRadius:16,fontSize:18,fontWeight:800,cursor:amount&&itemId?"pointer":"default",
        transition:"all 0.2s",boxShadow:amount&&itemId?"0 4px 20px rgba(29,158,117,0.4)":"none",
      }},"✅  Log Transaction"),
    )
  );
}

// ── Category Detail Screen ────────────────────────────────────
function CategoryScreen({cat,transactions,mi,monthIdx,year,getBudget,onRemoveTx,onBack,onAddTx}) {
  const [draftDesc,setDraftDesc]=useState("");
  const [draftAmt,setDraftAmt]=useState("");
  const [draftDate,setDraftDate]=useState(`${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`);
  const [selItem,setSelItem]=useState(cat.items[0]?.id||"");
  const C={bg:"#f7f5f0",card:"#fff",border:"#ede9e2",text:"#1a1a18",muted:"#888780",success:"#1D9E75",danger:"#D85A30"};

  const allTx=cat.items.flatMap(item=>(transactions[makeTxKey(cat.id,item.id,mi)]||[]).map(tx=>({...tx,itemId:item.id,itemName:item.name})));
  allTx.sort((a,b)=>new Date(b.date)-new Date(a.date));
  const totalActual=allTx.reduce((s,tx)=>s+tx.amount,0);
  const totalBudget=cat.items.reduce((s,item)=>s+getBudget(makeBudgetKey(cat.id,item.id)),0);
  const over=totalActual>totalBudget&&totalBudget>0;
  const pct=totalBudget>0?Math.min(100,(totalActual/totalBudget)*100):0;

  const submit=()=>{
    const amt=parseFloat(draftAmt); if(!amt||amt<=0||!selItem) return;
    onAddTx(cat.id,selItem,{id:Date.now(),desc:draftDesc,amount:amt,date:draftDate});
    setDraftDesc(""); setDraftAmt("");
  };

  return React.createElement("div",{style:{position:"fixed",inset:0,background:C.bg,zIndex:300,display:"flex",flexDirection:"column",fontFamily:"-apple-system,sans-serif",overflowY:"auto"}},
    // Header
    React.createElement("div",{style:{background:`linear-gradient(135deg,${cat.color},${cat.color}cc)`,padding:"52px 20px 24px"}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:16}},
        React.createElement("button",{onClick:onBack,style:{background:"rgba(255,255,255,0.25)",border:"none",color:"#fff",borderRadius:12,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}},"←"),
        React.createElement("span",{style:{fontSize:28}},cat.emoji),
        React.createElement("div",null,
          React.createElement("div",{style:{color:"rgba(255,255,255,0.8)",fontSize:13}},"Category"),
          React.createElement("div",{style:{color:"#fff",fontSize:24,fontWeight:800}},cat.name),
        )
      ),
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:10}},
        React.createElement("div",null,
          React.createElement("div",{style:{color:"rgba(255,255,255,0.7)",fontSize:12}},"Spent"),
          React.createElement("div",{style:{color:"#fff",fontSize:26,fontWeight:800}},fmt(totalActual)),
        ),
        React.createElement("div",{style:{textAlign:"right"}},
          React.createElement("div",{style:{color:"rgba(255,255,255,0.7)",fontSize:12}},"Budget"),
          React.createElement("div",{style:{color:"#fff",fontSize:26,fontWeight:800}},fmt(totalBudget)),
        ),
      ),
      React.createElement("div",{style:{height:8,background:"rgba(255,255,255,0.25)",borderRadius:4,overflow:"hidden"}},
        React.createElement("div",{style:{height:"100%",width:`${pct}%`,background:"#fff",borderRadius:4,transition:"width 0.5s"}})
      ),
    ),

    // Quick add
    React.createElement("div",{style:{background:C.card,margin:16,borderRadius:16,padding:16,boxShadow:"0 1px 6px rgba(0,0,0,0.07)"}},
      React.createElement("div",{style:{fontSize:15,fontWeight:700,marginBottom:12}},"➕ Quick add"),
      React.createElement("select",{value:selItem,onChange:e=>setSelItem(e.target.value),style:{width:"100%",padding:"12px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:15,marginBottom:10,background:C.card,color:C.text}},
        cat.items.map(i=>React.createElement("option",{key:i.id,value:i.id},i.name))
      ),
      React.createElement("input",{type:"text",placeholder:"Description (optional)",value:draftDesc,onChange:e=>setDraftDesc(e.target.value),style:{width:"100%",padding:"12px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:15,marginBottom:10,boxSizing:"border-box"}}),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement("input",{type:"number",placeholder:"₪ Amount",value:draftAmt,onChange:e=>setDraftAmt(e.target.value),onKeyDown:e=>e.key==="Enter"&&submit(),style:{flex:1,padding:"12px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:17,fontWeight:700,textAlign:"right"}}),
        React.createElement("input",{type:"date",value:draftDate,onChange:e=>setDraftDate(e.target.value),style:{flex:1,padding:"12px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14}}),
        React.createElement("button",{onClick:submit,style:{padding:"12px 18px",borderRadius:10,background:cat.color,border:"none",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer"}},"Add"),
      ),
    ),

    // Transaction list
    React.createElement("div",{style:{padding:"0 16px 32px"}},
      React.createElement("div",{style:{fontSize:15,fontWeight:700,marginBottom:12,color:C.muted}},`${allTx.length} transactions this month`),
      allTx.length===0
        ? React.createElement("div",{style:{textAlign:"center",padding:32,color:C.muted,fontSize:15}},"No transactions yet\nTap Add to log one!")
        : allTx.map(tx=>React.createElement("div",{key:tx.id,style:{background:C.card,borderRadius:14,padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}},
            React.createElement("div",{style:{width:42,height:42,borderRadius:12,background:cat.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}},cat.emoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:15,fontWeight:600}},tx.desc||tx.itemName),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:2}},`${tx.itemName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:17,fontWeight:800,color:C.danger}},`-${fmt(tx.amount)}`),
            React.createElement("button",{onClick:()=>onRemoveTx(cat.id,tx.itemId,tx.id),style:{background:"#fee",border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",fontSize:16,color:C.danger,display:"flex",alignItems:"center",justifyContent:"center"}},"×"),
          ))
    ),
  );
}

// ── Donut Chart ───────────────────────────────────────────────
function DonutChart({data,total,centerLabel,centerSub}) {
  const cx=100,cy=100,r=72,stroke=26,circ=2*Math.PI*r;
  let off=0;
  const slices=data.filter(d=>d.value>0).map(d=>{
    const dash=(d.value/total)*circ,s={...d,dash,gap:circ-dash,offset:off};
    off+=dash; return s;
  });
  return React.createElement("svg",{viewBox:"0 0 200 200",style:{width:"100%",maxWidth:200}},
    React.createElement("circle",{cx,cy,r,fill:"none",stroke:"#f0ede8",strokeWidth:stroke}),
    slices.map((s,i)=>React.createElement("circle",{key:i,cx,cy,r,fill:"none",stroke:s.color,strokeWidth:stroke,
      strokeDasharray:`${s.dash} ${s.gap}`,strokeDashoffset:-s.offset+circ*.25,style:{transition:"stroke-dasharray 0.5s"}})),
    React.createElement("text",{x:cx,y:cy-8,textAnchor:"middle",fontSize:18,fontWeight:700,fill:"#1a1a18"},centerLabel),
    React.createElement("text",{x:cx,y:cy+14,textAnchor:"middle",fontSize:11,fill:"#888780"},centerSub),
  );
}

// ── Bar Chart ─────────────────────────────────────────────────
function BarChart({monthData}) {
  const max=Math.max(...monthData.map(d=>d.actual),1);
  return React.createElement("div",{style:{display:"flex",alignItems:"flex-end",gap:8,height:90,padding:"0 4px"}},
    monthData.map((d,i)=>React.createElement("div",{key:i,style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}},
      d.actual>0&&React.createElement("div",{style:{fontSize:9,color:d.isCurrent?"#1D9E75":"#bbb",fontWeight:700}},`₪${Math.round(d.actual/1000)}k`),
      React.createElement("div",{style:{width:"100%",background:d.isCurrent?"#1D9E75":"#e8e6e0",borderRadius:"6px 6px 0 0",height:`${(d.actual/max)*64}px`,minHeight:d.actual>0?4:0,transition:"height 0.5s"}}),
      React.createElement("span",{style:{fontSize:10,color:d.isCurrent?"#1D9E75":"#888780",fontWeight:d.isCurrent?700:400}},d.label),
    ))
  );
}

function App() {
  const [tab,setTab]=useState("home");
  const [screen,setScreen]=useState(null); // null | "addTx" | {type:"category",cat}
  const [monthIdx,setMonthIdx]=useState(CUR_MONTH);
  const [year,setYear]=useState(CUR_YEAR);
  const [cats,setCats]=useState(DEFAULT_CATEGORIES);
  const [values,setValues]=useState(DEFAULT_BUDGETS);
  const [transactions,setTransactions]=useState(PRELOADED_TX);
  const [newCatName,setNewCatName]=useState("");
  const [newCatType,setNewCatType]=useState("expense");
  const [newItemName,setNewItemName]=useState({});
  const [loaded,setLoaded]=useState(false);
  const [saveStatus,setSaveStatus]=useState("");
  const [lastSaved,setLastSaved]=useState(null);
  const [showBackup,setShowBackup]=useState(false);
  const [confetti,setConfetti]=useState(false);
  const [toast,setToast]=useState({msg:"",visible:false});
  const [search,setSearch]=useState("");
  const [showSearch,setShowSearch]=useState(false);

  const mi=monthIdx+year*12;
  const C={bg:"#f7f5f0",card:"#fff",border:"#ede9e2",text:"#1a1a18",muted:"#888780",success:"#1D9E75",danger:"#D85A30"};

  const showToast=msg=>{setToast({msg,visible:true});setTimeout(()=>setToast({msg:"",visible:false}),2500);};

  useEffect(()=>{
    try{
      const c=localStorage.getItem(SK_CATS);if(c) setCats(JSON.parse(c));
      const v=localStorage.getItem(SK_VALS);if(v) setValues(JSON.parse(v));
      const t=localStorage.getItem(SK_TX);if(t) setTransactions(JSON.parse(t));
    }catch{}
    setLoaded(true);
  },[]);

  const saveNow=useCallback(()=>{
    setSaveStatus("saving");
    try{
      localStorage.setItem(SK_CATS,JSON.stringify(cats));
      localStorage.setItem(SK_VALS,JSON.stringify(values));
      localStorage.setItem(SK_TX,JSON.stringify(transactions));
      setLastSaved(new Date());setSaveStatus("saved");
      setTimeout(()=>setSaveStatus(""),2000);
    }catch{setSaveStatus("error");}
  },[cats,values,transactions]);

  useEffect(()=>{if(!loaded)return;const t=setTimeout(saveNow,800);return()=>clearTimeout(t);},[cats,values,transactions,loaded]);

  const getBudget=k=>values[k]||0;
  const setBudgetVal=(k,v)=>setValues(p=>({...p,[k]:Number(v)||0}));
  const getTxList=(cId,iId)=>transactions[makeTxKey(cId,iId,mi)]||[];
  const getActual=(cId,iId)=>getTxList(cId,iId).reduce((s,tx)=>s+tx.amount,0);
  const getCatActual=(cat,customMi)=>cat.items.reduce((s,item)=>s+((transactions[makeTxKey(cat.id,item.id,customMi??mi)]||[]).reduce((a,tx)=>a+tx.amount,0)),0);
  const getCatBudget=cat=>cat.items.reduce((s,item)=>s+getBudget(makeBudgetKey(cat.id,item.id)),0);

  const addTx=(cId,iId,txData)=>{
    const key=makeTxKey(cId,iId,mi);
    setTransactions(p=>({...p,[key]:[...(p[key]||[]),txData]}));
    setConfetti(true);setTimeout(()=>setConfetti(false),100);
    const cat=cats.find(c=>c.id===cId);
    showToast(`${cat?.emoji||""} ₪${txData.amount} logged!`);
    setScreen(null);
  };

  const removeTx=(cId,iId,txId)=>{
    const key=makeTxKey(cId,iId,mi);
    setTransactions(p=>({...p,[key]:(p[key]||[]).filter(t=>t.id!==txId)}));
    showToast("Transaction deleted");
  };

  const totals=useMemo(()=>{
    const t={};
    cats.forEach(cat=>{t[cat.id]={budget:getCatBudget(cat),actual:getCatActual(cat)};});
    return t;
  },[cats,values,transactions,mi]);

  const summary=useMemo(()=>{
    const inc=cats.filter(c=>c.type==="income");
    const exp=cats.filter(c=>c.type==="expense");
    const bI=inc.reduce((s,c)=>s+totals[c.id].budget,0);
    const aI=inc.reduce((s,c)=>s+totals[c.id].actual,0);
    const bE=exp.reduce((s,c)=>s+totals[c.id].budget,0);
    const aE=exp.reduce((s,c)=>s+totals[c.id].actual,0);
    return {bI,aI,bE,aE,bBal:bI-bE,aBal:aI-aE,remaining:bE-aE};
  },[cats,totals]);

  const barData=useMemo(()=>Array.from({length:6},(_,i)=>{
    const d=new Date(year,monthIdx-5+i);
    const mmi=d.getMonth()+d.getFullYear()*12;
    const actual=cats.filter(c=>c.type==="expense").reduce((s,cat)=>s+getCatActual(cat,mmi),0);
    return {label:MONTHS[d.getMonth()],actual,isCurrent:mmi===mi};
  }),[cats,transactions,mi]);

  const donutData=useMemo(()=>
    cats.filter(c=>c.type==="expense"&&totals[c.id].actual>0)
      .map(c=>({label:c.name,value:totals[c.id].actual,color:c.color,emoji:c.emoji}))
      .sort((a,b)=>b.value-a.value)
  ,[cats,totals]);

  const topCat=donutData[0];
  const prevMi=mi-1;
  const prevTotal=useMemo(()=>cats.filter(c=>c.type==="expense").reduce((s,cat)=>s+getCatActual(cat,prevMi),0),[cats,transactions,prevMi]);

  const allTx=useMemo(()=>{
    const list=[];
    cats.forEach(cat=>cat.items.forEach(item=>{
      (transactions[makeTxKey(cat.id,item.id,mi)]||[]).forEach(tx=>{
        list.push({...tx,catName:cat.name,catEmoji:cat.emoji,catColor:cat.color,itemName:item.name,catId:cat.id,itemId:item.id});
      });
    }));
    return list.sort((a,b)=>new Date(b.date)-new Date(a.date));
  },[cats,transactions,mi]);

  const filteredTx=useMemo(()=>{
    if(!search) return allTx;
    const q=search.toLowerCase();
    return allTx.filter(tx=>tx.desc.toLowerCase().includes(q)||tx.catName.toLowerCase().includes(q)||tx.itemName.toLowerCase().includes(q));
  },[allTx,search]);

  const importData=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const data=JSON.parse(ev.target.result);
        if(data.cats) setCats(data.cats);
        if(data.values) setValues(data.values);
        if(data.transactions) setTransactions(data.transactions);
        setTimeout(saveNow,500);showToast("✅ Data imported!");
      }catch{showToast("❌ Invalid file");}
    };
    reader.readAsText(file);e.target.value="";
  };

  const exportCSV=()=>{
    const rows=[["Date","Month","Category","Item","Description","Amount"]];
    cats.forEach(cat=>cat.items.forEach(item=>{
      Object.entries(transactions).forEach(([key,txList])=>{
        if(!key.startsWith(`tx_${cat.id}_${item.id}_`))return;
        txList.forEach(tx=>{const d=new Date(tx.date);rows.push([tx.date,MONTHS[d.getMonth()],cat.name,item.name,tx.desc||"",tx.amount]);});
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

  const cardS={background:C.card,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:14,boxShadow:"0 1px 6px rgba(0,0,0,0.06)"};
  const inp=(w,extra={})=>({width:w,padding:"10px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:"#fff",color:C.text,fontSize:15,outline:"none",...extra});
  const btnS=(extra={})=>({padding:"10px 18px",borderRadius:10,border:`1px solid ${C.border}`,background:"#fff",color:C.text,cursor:"pointer",fontSize:14,fontWeight:500,...extra});
  const TABS=[["home","🏠","Home"],["tracker","📋","Transactions"],["budget","⚙️","Budgets"]];

  if(!loaded) return React.createElement("div",{style:{padding:40,textAlign:"center",color:C.muted,fontFamily:"-apple-system,sans-serif",fontSize:18}},"Loading...");

  // ── Full-screen overlays ──
  if(screen==="addTx") return React.createElement(React.Fragment,null,
    React.createElement(Confetti,{active:confetti}),
    React.createElement(Toast,{msg:toast.msg,visible:toast.visible}),
    React.createElement(AddTxScreen,{cats,onAdd:addTx,onBack:()=>setScreen(null),monthIdx,year}),
  );
  if(screen?.type==="category") return React.createElement(React.Fragment,null,
    React.createElement(Confetti,{active:confetti}),
    React.createElement(Toast,{msg:toast.msg,visible:toast.visible}),
    React.createElement(CategoryScreen,{cat:screen.cat,transactions,mi,monthIdx,year,getBudget,onRemoveTx:removeTx,onBack:()=>setScreen(null),onAddTx:addTx}),
  );

  return React.createElement("div",{style:{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:C.bg,minHeight:"100vh",paddingBottom:90,fontSize:15}},
    React.createElement(Confetti,{active:confetti}),
    React.createElement(Toast,{msg:toast.msg,visible:toast.visible}),

    // ── HEADER ──
    React.createElement("div",{style:{background:"linear-gradient(135deg,#1D9E75 0%,#0F6E56 100%)",padding:"52px 20px 20px",position:"sticky",top:0,zIndex:100}},
      React.createElement("div",{style:{maxWidth:600,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
          React.createElement("button",{onClick:()=>{const d=new Date(year,monthIdx-1);setMonthIdx(d.getMonth());setYear(d.getFullYear());},style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:20,borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}},"‹"),
          React.createElement("span",{style:{color:"#fff",fontSize:20,fontWeight:800}},`${MONTHS[monthIdx]} ${year}`),
          React.createElement("button",{onClick:()=>{const d=new Date(year,monthIdx+1);setMonthIdx(d.getMonth());setYear(d.getFullYear());},style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:20,borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}},"›"),
        ),
        React.createElement("div",{style:{display:"flex",gap:8}},
          React.createElement("button",{onClick:()=>setShowSearch(!showSearch),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:17,borderRadius:10,padding:"7px 11px"}},"🔍"),
          React.createElement("button",{onClick:saveNow,style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:14,borderRadius:10,padding:"7px 11px",fontWeight:600}},saveStatus==="saved"?"✓":saveStatus==="saving"?"...":"💾"),
          React.createElement("button",{onClick:()=>setShowBackup(true),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:14,borderRadius:10,padding:"7px 11px"}},"📋"),
        )
      ),
      showSearch&&React.createElement("div",{style:{maxWidth:600,margin:"12px auto 0"}},
        React.createElement("input",{type:"text",placeholder:"Search transactions...",value:search,onChange:e=>setSearch(e.target.value),autoFocus:true,style:{width:"100%",padding:"12px 16px",borderRadius:14,border:"none",fontSize:16,outline:"none",boxSizing:"border-box"}})
      )
    ),

    // ── SEARCH RESULTS ──
    showSearch&&React.createElement("div",{style:{maxWidth:600,margin:"0 auto",padding:"14px 16px"}},
      filteredTx.length===0
        ?React.createElement("div",{style:{textAlign:"center",color:C.muted,padding:40,fontSize:16}},"No transactions found")
        :filteredTx.map(tx=>React.createElement("div",{key:tx.id,style:{...cardS,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}},
            React.createElement("div",{style:{width:40,height:40,borderRadius:12,background:tx.catColor+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}},tx.catEmoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:15,fontWeight:600}},tx.desc||"—"),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:2}},`${tx.catName} · ${tx.itemName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:16,fontWeight:800,color:C.danger}},`-${fmt(tx.amount)}`),
            React.createElement("button",{onClick:()=>removeTx(tx.catId,tx.itemId,tx.id),style:{background:"transparent",border:"none",color:"#ccc",cursor:"pointer",fontSize:20}},"×"),
          ))
    ),

    !showSearch&&React.createElement("div",{style:{maxWidth:600,margin:"0 auto",padding:"16px 16px 0"}},

      // ── HOME TAB ──
      tab==="home"&&React.createElement(React.Fragment,null,
        // Hero
        React.createElement("div",{style:{...cardS,background:"linear-gradient(135deg,#1D9E75,#0F6E56)",border:"none"}},
          React.createElement("div",{style:{padding:22}},
            React.createElement("div",{style:{color:"rgba(255,255,255,0.8)",fontSize:14,marginBottom:2}},"Remaining to spend"),
            React.createElement("div",{style:{color:"#fff",fontSize:42,fontWeight:900,letterSpacing:-1}},fmt(summary.remaining)),
            React.createElement("div",{style:{height:7,background:"rgba(255,255,255,0.2)",borderRadius:4,margin:"14px 0 10px",overflow:"hidden"}},
              React.createElement("div",{style:{height:"100%",width:`${summary.bE>0?Math.min(100,(summary.aE/summary.bE)*100):0}%`,background:"#fff",borderRadius:4,transition:"width 0.5s"}})
            ),
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,0.8)",fontSize:13}},
              React.createElement("span",null,`Spent: ${fmt(summary.aE)}`),
              React.createElement("span",null,`Budget: ${fmt(summary.bE)}`),
            )
          )
        ),

        // Insight cards
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}},
          React.createElement("div",{style:cardS},React.createElement("div",{style:{padding:16}},
            React.createElement("div",{style:{fontSize:12,color:C.muted,marginBottom:6,fontWeight:600,textTransform:"uppercase",letterSpacing:.4}},"🔥 Top category"),
            topCat?React.createElement(React.Fragment,null,
              React.createElement("div",{style:{fontSize:16,fontWeight:700}},`${topCat.emoji} ${topCat.label}`),
              React.createElement("div",{style:{fontSize:15,color:C.danger,fontWeight:800,marginTop:2}},fmt(topCat.value)),
            ):React.createElement("div",{style:{fontSize:14,color:C.muted}},"No data"),
          )),
          React.createElement("div",{style:cardS},React.createElement("div",{style:{padding:16}},
            React.createElement("div",{style:{fontSize:12,color:C.muted,marginBottom:6,fontWeight:600,textTransform:"uppercase",letterSpacing:.4}},"📅 vs last month"),
            React.createElement("div",{style:{fontSize:20,fontWeight:900,color:summary.aE>prevTotal?C.danger:C.success}},
              summary.aE>prevTotal?`▲ ${fmt(summary.aE-prevTotal)}`:`▼ ${fmt(prevTotal-summary.aE)}`
            ),
            React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:2}},`Last: ${fmt(prevTotal)}`),
          )),
        ),

        // Recent transactions
        allTx.length>0&&React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:"16px 16px 4px",display:"flex",justifyContent:"space-between",alignItems:"center"}},
            React.createElement("span",{style:{fontWeight:700,fontSize:16}},"Recent"),
            React.createElement("span",{style:{fontSize:13,color:C.success,cursor:"pointer",fontWeight:600},onClick:()=>setTab("tracker")},"See all →"),
          ),
          allTx.slice(0,5).map(tx=>React.createElement("div",{key:tx.id,style:{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderTop:`1px solid ${C.border}`,cursor:"pointer"},onClick:()=>setScreen({type:"category",cat:cats.find(c=>c.id===tx.catId)})},
            React.createElement("div",{style:{width:40,height:40,borderRadius:12,background:tx.catColor+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}},tx.catEmoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:15,fontWeight:600}},tx.desc||tx.itemName),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginTop:1}},`${tx.catName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:16,fontWeight:800,color:C.danger}},`-${fmt(tx.amount)}`),
          )),
        ),

        // Donut
        React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:18}},
            React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:14}},"Spending breakdown"),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:16}},
              React.createElement("div",{style:{width:150,flexShrink:0}},
                React.createElement(DonutChart,{data:donutData,total:summary.aE||1,centerLabel:fmt(summary.aE),centerSub:"spent"})
              ),
              React.createElement("div",{style:{flex:1}},
                donutData.slice(0,6).map(d=>React.createElement("div",{key:d.label,style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},
                  React.createElement("div",{style:{width:10,height:10,borderRadius:"50%",background:d.color,flexShrink:0}}),
                  React.createElement("span",{style:{fontSize:13,flex:1}},d.label),
                  React.createElement("span",{style:{fontSize:13,fontWeight:700,color:C.muted}},`${Math.round(d.value/summary.aE*100)}%`),
                ))
              )
            )
          )
        ),

        // Bar chart
        React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:18}},
            React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:14}},"Last 6 months"),
            React.createElement(BarChart,{monthData:barData}),
          )
        ),

        // Category tap cards
        React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:12,padding:"0 2px"}},"Categories"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}},
          cats.filter(c=>c.type==="expense").map(cat=>{
            const t=totals[cat.id];
            const pct=t.budget>0?Math.min(100,(t.actual/t.budget)*100):0;
            const over=t.actual>t.budget&&t.budget>0;
            return React.createElement("div",{key:cat.id,onClick:()=>setScreen({type:"category",cat}),style:{...cardS,marginBottom:0,cursor:"pointer",padding:16,borderLeft:`4px solid ${cat.color}`}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},
                React.createElement("span",{style:{fontSize:22}},cat.emoji),
                React.createElement("span",{style:{fontSize:14,fontWeight:700}},cat.name),
              ),
              React.createElement("div",{style:{fontSize:18,fontWeight:800,color:over?C.danger:C.text,marginBottom:4}},fmt(t.actual)),
              React.createElement("div",{style:{fontSize:12,color:C.muted,marginBottom:8}},`of ${fmt(t.budget)}`),
              React.createElement("div",{style:{height:5,background:"#f0ede8",borderRadius:3,overflow:"hidden"}},
                React.createElement("div",{style:{height:"100%",width:`${pct}%`,background:over?C.danger:cat.color,borderRadius:3,transition:"width 0.4s"}})
              ),
            );
          })
        ),
      ),

      // ── TRANSACTIONS TAB ──
      tab==="tracker"&&React.createElement(React.Fragment,null,
        React.createElement("div",{style:{fontWeight:800,fontSize:22,marginBottom:16,padding:"0 2px"}},"Transactions"),
        cats.map(cat=>{
          const t=totals[cat.id];
          return React.createElement("div",{key:cat.id,onClick:()=>setScreen({type:"category",cat}),style:{...cardS,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}},
            React.createElement("div",{style:{width:48,height:48,borderRadius:14,background:cat.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}},cat.emoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:16,fontWeight:700,marginBottom:4}},cat.name),
              cat.type==="expense"&&t.budget>0&&React.createElement("div",{style:{height:5,background:"#f0ede8",borderRadius:3,overflow:"hidden",marginBottom:4}},
                React.createElement("div",{style:{height:"100%",width:`${Math.min(100,(t.actual/t.budget)*100)}%`,background:t.actual>t.budget?C.danger:cat.color,borderRadius:3}})
              ),
              React.createElement("div",{style:{fontSize:13,color:C.muted}},`${(transactions[Object.keys(transactions).find(k=>k.includes(`_${cat.id}_`)&&k.endsWith(`_${mi}`))]||[]).length||allTx.filter(tx=>tx.catId===cat.id).length} transactions`),
            ),
            React.createElement("div",{style:{textAlign:"right"}},
              React.createElement("div",{style:{fontSize:17,fontWeight:800,color:t.actual>t.budget&&t.budget>0?C.danger:C.text}},fmt(t.actual)),
              React.createElement("div",{style:{fontSize:12,color:C.muted}},`/ ${fmt(t.budget)}`),
            ),
            React.createElement("span",{style:{fontSize:18,color:C.muted}},"›"),
          );
        })
      ),

      // ── BUDGETS TAB ──
      tab==="budget"&&React.createElement(React.Fragment,null,
        React.createElement("div",{style:{fontWeight:800,fontSize:22,marginBottom:16,padding:"0 2px"}},"Set Budgets"),
        cats.map(cat=>{
          const [open,setOpen]=useState(false);
          return React.createElement("div",{key:cat.id,style:cardS},
            React.createElement("div",{onClick:()=>setOpen(!open),style:{display:"flex",alignItems:"center",gap:12,padding:"16px",cursor:"pointer",borderLeft:`4px solid ${cat.color}`}},
              React.createElement("span",{style:{fontSize:22}},cat.emoji),
              React.createElement("span",{style:{flex:1,fontWeight:700,fontSize:16}},cat.name),
              React.createElement("span",{style:{fontSize:15,color:C.muted,fontWeight:600}},fmt(totals[cat.id].budget)),
              React.createElement("button",{onClick:e=>{e.stopPropagation();removeCat(cat.id);},style:{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:22,padding:"0 6px"}},"×"),
              React.createElement("span",{style:{fontSize:14,color:C.muted}},open?"▲":"▼"),
            ),
            open&&React.createElement(React.Fragment,null,
              cat.items.map(item=>React.createElement("div",{key:item.id,style:{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderTop:`1px solid ${C.border}`}},
                React.createElement("span",{style:{flex:1,color:C.muted,fontSize:15}},item.name),
                React.createElement("span",{style:{fontSize:15,color:C.muted}},"₪"),
                React.createElement("input",{type:"number",min:"0",value:getBudget(makeBudgetKey(cat.id,item.id))||"",placeholder:"0",onChange:e=>setBudgetVal(makeBudgetKey(cat.id,item.id),e.target.value),style:inp(100,{textAlign:"right",fontSize:16,fontWeight:700})}),
                React.createElement("button",{onClick:()=>removeItem(cat.id,item.id),style:{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:20}},"×"),
              )),
              React.createElement("div",{style:{display:"flex",gap:8,padding:"12px 16px",borderTop:`1px solid ${C.border}`}},
                React.createElement("input",{placeholder:"New line item...",value:newItemName[cat.id]||"",onChange:e=>setNewItemName(p=>({...p,[cat.id]:e.target.value})),onKeyDown:e=>e.key==="Enter"&&addItem(cat.id),style:inp("auto",{flex:1,fontSize:15})}),
                React.createElement("button",{onClick:()=>addItem(cat.id),style:btnS()},"+ Add"),
              )
            )
          );
        }),
        React.createElement("div",{style:{...cardS,padding:16}},
          React.createElement("div",{style:{fontSize:15,color:C.muted,marginBottom:12,fontWeight:600}},"Add new category"),
          React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
            React.createElement("input",{placeholder:"Name...",value:newCatName,onChange:e=>setNewCatName(e.target.value),onKeyDown:e=>e.key==="Enter"&&addCat(),style:inp("auto",{flex:2,minWidth:120,fontSize:15})}),
            React.createElement("select",{value:newCatType,onChange:e=>setNewCatType(e.target.value),style:inp("auto",{flex:1,minWidth:100,fontSize:15})},
              React.createElement("option",{value:"expense"},"Expense"),
              React.createElement("option",{value:"income"},"Income"),
            ),
            React.createElement("button",{onClick:addCat,style:btnS({background:C.success,color:"#fff",border:"none"})},"+ Add"),
          )
        )
      )
    ),

    // ── FAB ──
    !showSearch&&React.createElement("button",{onClick:()=>setScreen("addTx"),style:{
      position:"fixed",bottom:95,right:20,width:60,height:60,borderRadius:"50%",
      background:"linear-gradient(135deg,#1D9E75,#0F6E56)",border:"none",color:"#fff",
      fontSize:32,cursor:"pointer",boxShadow:"0 6px 24px rgba(29,158,117,0.5)",
      display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,
    }},"+"),

    // ── BACKUP MODAL ──
    showBackup&&React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}},
      React.createElement("div",{style:{background:"#fff",borderRadius:20,padding:22,width:"100%",maxWidth:500}},
        React.createElement("div",{style:{fontWeight:800,fontSize:18,marginBottom:8}},"📋 Backup & Restore"),
        React.createElement("div",{style:{fontSize:13,color:C.muted,marginBottom:12}},"Select all text → Copy → Save as budget-backup.json"),
        React.createElement("textarea",{readOnly:true,value:JSON.stringify({cats,values,transactions,exportedAt:new Date().toISOString()},null,2),style:{width:"100%",height:160,fontSize:11,fontFamily:"monospace",padding:10,borderRadius:10,border:`1px solid ${C.border}`,resize:"none",boxSizing:"border-box"},onClick:e=>e.target.select()}),
        React.createElement("div",{style:{display:"flex",gap:8,marginTop:14}},
          React.createElement("label",{style:{...btnS(),flex:1,textAlign:"center",cursor:"pointer"}},"⬆ Import",
            React.createElement("input",{type:"file",accept:".json",onChange:importData,style:{display:"none"}})),
          React.createElement("button",{onClick:exportCSV,style:btnS({flex:1})},"⬇ CSV"),
          React.createElement("button",{onClick:()=>setShowBackup(false),style:btnS({background:C.success,color:"#fff",border:"none"})},"Close"),
        )
      )
    ),

    // ── BOTTOM NAV ──
    React.createElement("div",{style:{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:`1px solid ${C.border}`,display:"flex",paddingBottom:"env(safe-area-inset-bottom)",zIndex:100,boxShadow:"0 -2px 14px rgba(0,0,0,0.08)"}},
      TABS.map(([id,emoji,label])=>React.createElement("button",{key:id,onClick:()=>{setTab(id);setShowSearch(false);},style:{flex:1,padding:"11px 0 9px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}},
        React.createElement("span",{style:{fontSize:22}},emoji),
        React.createElement("span",{style:{fontSize:11,fontWeight:700,color:tab===id?C.success:C.muted}},label),
      ))
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));const { useState, useMemo, useEffect, useCallback, useRef } = React;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const NOW = new Date();
const CUR_MONTH = NOW.getMonth();
const CUR_YEAR = NOW.getFullYear();

const DEFAULT_CATEGORIES = [
  { id: "income", name: "Income", type: "income", color: "#1D9E75", emoji: "💰", items: [
    { id: "salary", name: "Salary (משכורת)" }, { id: "side", name: "Side income" },
  ]},
  { id: "housing", name: "Housing", type: "expense", color: "#378ADD", emoji: "🏠", items: [
    { id: "rent", name: "Rent / mortgage" }, { id: "electric", name: "Electricity" },
    { id: "water", name: "Water" }, { id: "internet", name: "Internet & phone" }, { id: "vaad", name: "Vaad bayit" },
  ]},
  { id: "food", name: "Food", type: "expense", color: "#EF9F27", emoji: "🍕", items: [
    { id: "supermarket", name: "Supermarket" }, { id: "restaurants", name: "Restaurants" }, { id: "coffee", name: "Coffee" },
  ]},
  { id: "transport", name: "Transport", type: "expense", color: "#7F77DD", emoji: "🚌", items: [
    { id: "fuel", name: "Fuel" }, { id: "transit", name: "Public transit" },
    { id: "carins", name: "Car insurance" }, { id: "gett", name: "Gett/Train" },
  ]},
  { id: "health", name: "Health", type: "expense", color: "#D85A30", emoji: "💊", items: [
    { id: "kupat", name: "Kupat holim" }, { id: "insurance", name: "Insurance" },
    { id: "meds", name: "Medications" }, { id: "gym", name: "Gym" },
  ]},
  { id: "entertainment", name: "Entertainment", type: "expense", color: "#D4537E", emoji: "🎉", items: [
    { id: "subs", name: "Subscriptions" }, { id: "outings", name: "Outings" },
    { id: "spotify", name: "Spotify, Google, Apple" }, { id: "concerts", name: "Concert, Event, etc." },
  ]},
  { id: "savings", name: "Savings", type: "expense", color: "#0F6E56", emoji: "💎", items: [
    { id: "emergency", name: "Emergency fund" }, { id: "invest", name: "Investments" },
    { id: "roth", name: "Roth IRA" }, { id: "brokerage", name: "Brokerage" }, { id: "travel", name: "Travel" },
  ]},
  { id: "personal", name: "Personal", type: "expense", color: "#BA7517", emoji: "✨", items: [
    { id: "clothing", name: "Clothing" }, { id: "care", name: "Personal care" }, { id: "misc", name: "Miscellaneous" },
  ]},
];

const DEFAULT_BUDGETS = {
  "b_income_salary":13000,"b_income_side":0,
  "b_housing_rent":3700,"b_housing_electric":150,"b_housing_water":100,"b_housing_internet":30,"b_housing_vaad":70,
  "b_food_supermarket":1000,"b_food_restaurants":1000,"b_food_coffee":300,
  "b_transport_fuel":0,"b_transport_transit":200,"b_transport_carins":0,"b_transport_gett":100,
  "b_health_kupat":0,"b_health_insurance":0,"b_health_meds":50,"b_health_gym":400,
  "b_entertainment_subs":0,"b_entertainment_outings":0,"b_entertainment_spotify":50,"b_entertainment_concerts":150,
  "b_savings_emergency":500,"b_savings_invest":0,"b_savings_roth":1500,"b_savings_brokerage":1500,"b_savings_travel":1000,
  "b_personal_clothing":300,"b_personal_care":300,"b_personal_misc":600,
};

const MAR_MI = 2+2026*12, APR_MI = 3+2026*12;
const PRELOADED_TX = {
  [`tx_housing_rent_${MAR_MI}`]:[{id:"m1",date:"2026-03-21",desc:"Rent",amount:3700}],
  [`tx_housing_internet_${MAR_MI}`]:[{id:"m2",date:"2026-03-21",desc:"phone",amount:30}],
  [`tx_food_supermarket_${MAR_MI}`]:[
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
  [`tx_food_restaurants_${MAR_MI}`]:[
    {id:"m21",date:"2026-03-21",desc:"toni v ester",amount:53},{id:"m22",date:"2026-03-21",desc:"htaco",amount:49},
    {id:"m23",date:"2026-03-21",desc:"mclovin",amount:16},{id:"m24",date:"2026-03-21",desc:"mclovin",amount:28},
    {id:"m25",date:"2026-03-21",desc:"cassata",amount:19},
  ],
  [`tx_food_coffee_${MAR_MI}`]:[
    {id:"m26",date:"2026-03-21",desc:"nordoy",amount:18},{id:"m27",date:"2026-03-21",desc:"ada lewinsky",amount:37},
    {id:"m28",date:"2026-03-21",desc:"chachos",amount:18},{id:"m29",date:"2026-03-21",desc:"tony and ester",amount:40},
  ],
  [`tx_transport_gett_${MAR_MI}`]:[{id:"m30",date:"2026-03-21",desc:"gett",amount:78}],
  [`tx_entertainment_spotify_${MAR_MI}`]:[{id:"m31",date:"2026-03-21",desc:"spotify",amount:24},{id:"m32",date:"2026-03-21",desc:"google",amount:9}],
  [`tx_savings_travel_${MAR_MI}`]:[{id:"m33",date:"2026-03-21",desc:"Flight to Rhodes",amount:686}],
  [`tx_personal_care_${MAR_MI}`]:[{id:"m34",date:"2026-03-21",desc:"superpharm",amount:18},{id:"m35",date:"2026-03-21",desc:"superpharm",amount:52}],
  [`tx_food_restaurants_${APR_MI}`]:[
    {id:"a1",date:"2026-04-06",desc:"Shafa Bar",amount:87},{id:"a2",date:"2026-04-05",desc:"Khao San Food TLV",amount:55},
    {id:"a3",date:"2026-04-04",desc:"Moon Sushi Burger",amount:136},{id:"a4",date:"2026-04-08",desc:"Gania Costanza B",amount:110},
  ],
  [`tx_food_coffee_${APR_MI}`]:[
    {id:"a5",date:"2026-04-05",desc:"Café BaNachla",amount:30},{id:"a6",date:"2026-04-04",desc:"Tzakuli",amount:6},{id:"a7",date:"2026-04-02",desc:"Tom's",amount:33},
  ],
  [`tx_food_supermarket_${APR_MI}`]:[
    {id:"a8",date:"2026-04-04",desc:"Ilay Market",amount:26.80},{id:"a9",date:"2026-04-03",desc:"Hasid HaYerek",amount:25},
    {id:"a10",date:"2026-04-03",desc:"Davka Gourmet",amount:15},{id:"a11",date:"2026-04-03",desc:"Shuk HaAliya",amount:23.10},
    {id:"a12",date:"2026-04-03",desc:"Street Market David",amount:22.80},{id:"a13",date:"2026-04-03",desc:"Super Al HaYam",amount:38.80},
    {id:"a14",date:"2026-04-01",desc:"Super Mama",amount:36.75},
  ],
  [`tx_personal_care_${APR_MI}`]:[{id:"a15",date:"2026-04-01",desc:"A. Aviv Flowers",amount:120}],
  [`tx_personal_clothing_${APR_MI}`]:[{id:"a16",date:"2026-04-01",desc:"Top Stock",amount:50}],
  [`tx_personal_misc_${APR_MI}`]:[{id:"a17",date:"2026-04-05",desc:"Bank card fee",amount:9.90}],
};

const fmt = n => "₪"+Math.round(Math.abs(n)).toLocaleString();
const makeBudgetKey = (cId,iId) => `b_${cId}_${iId}`;
const makeTxKey = (cId,iId,mi) => `tx_${cId}_${iId}_${mi}`;
const SK_CATS="bgt_cats", SK_VALS="bgt_vals", SK_TX="bgt_tx";

// ── Confetti ─────────────────────────────────────────────────
function Confetti({ active }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const pieces = Array.from({length:80},()=>({
      x: Math.random()*canvas.width, y: -10,
      r: Math.random()*6+3, color: ["#1D9E75","#378ADD","#EF9F27","#D4537E","#7F77DD","#D85A30"][Math.floor(Math.random()*6)],
      vx: (Math.random()-0.5)*4, vy: Math.random()*4+2, rot: Math.random()*360, vrot: (Math.random()-0.5)*8,
    }));
    let frame, done=false;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.rot+=p.vrot; p.vy+=0.08;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color; ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);
        ctx.restore();
      });
      if (!done) frame=requestAnimationFrame(draw);
    };
    draw();
    const t = setTimeout(()=>{done=true; cancelAnimationFrame(frame); ctx.clearRect(0,0,canvas.width,canvas.height);},2000);
    return ()=>{done=true; cancelAnimationFrame(frame); clearTimeout(t);};
  },[active]);
  return React.createElement("canvas",{ref:canvasRef,style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999}});
}

// ── Toast ─────────────────────────────────────────────────────
function Toast({msg,visible}) {
  return React.createElement("div",{style:{
    position:"fixed",bottom:90,left:"50%",transform:`translateX(-50%) translateY(${visible?0:20}px)`,
    opacity:visible?1:0,transition:"all 0.3s ease",background:"#1a1a18",color:"#fff",
    padding:"10px 20px",borderRadius:30,fontSize:14,fontWeight:600,zIndex:9998,whiteSpace:"nowrap",
    boxShadow:"0 4px 20px rgba(0,0,0,0.3)"
  }},msg);
}

// ── Quick Add Modal ───────────────────────────────────────────
function QuickAdd({cats,onAdd,onClose,mi,monthIdx,year}) {
  const [catId,setCatId] = useState(cats.filter(c=>c.type==="expense")[0]?.id||"");
  const [itemId,setItemId] = useState("");
  const [desc,setDesc] = useState("");
  const [amount,setAmount] = useState("");
  const [date,setDate] = useState(`${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`);
  const selCat = cats.find(c=>c.id===catId);
  useEffect(()=>{ if(selCat?.items?.length) setItemId(selCat.items[0].id); },[catId]);
  const submit = () => {
    const amt=parseFloat(amount); if(!amt||amt<=0||!itemId) return;
    onAdd(catId,itemId,{id:Date.now(),desc,amount:amt,date});
    setDesc(""); setAmount("");
  };
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:500,display:"flex",alignItems:"flex-end"}},
    React.createElement("div",{style:{background:"#fff",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:600,margin:"0 auto"}},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}},
        React.createElement("span",{style:{fontSize:18,fontWeight:800}},"➕ Quick Add"),
        React.createElement("button",{onClick:onClose,style:{background:"#f0ede8",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:18}},"×"),
      ),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}},
        React.createElement("div",null,
          React.createElement("label",{style:{fontSize:12,color:"#888780",marginBottom:4,display:"block"}},"Category"),
          React.createElement("select",{value:catId,onChange:e=>setCatId(e.target.value),style:{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #ede9e2",fontSize:14,background:"#fff"}},
            cats.filter(c=>c.type==="expense").map(c=>React.createElement("option",{key:c.id,value:c.id},`${c.emoji} ${c.name}`))
          )
        ),
        React.createElement("div",null,
          React.createElement("label",{style:{fontSize:12,color:"#888780",marginBottom:4,display:"block"}},"Item"),
          React.createElement("select",{value:itemId,onChange:e=>setItemId(e.target.value),style:{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #ede9e2",fontSize:14,background:"#fff"}},
            (selCat?.items||[]).map(i=>React.createElement("option",{key:i.id,value:i.id},i.name))
          )
        ),
      ),
      React.createElement("div",{style:{marginBottom:12}},
        React.createElement("label",{style:{fontSize:12,color:"#888780",marginBottom:4,display:"block"}},"Description (optional)"),
        React.createElement("input",{type:"text",placeholder:"e.g. Sushi dinner",value:desc,onChange:e=>setDesc(e.target.value),style:{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #ede9e2",fontSize:14}}),
      ),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}},
        React.createElement("div",null,
          React.createElement("label",{style:{fontSize:12,color:"#888780",marginBottom:4,display:"block"}},"Amount (₪)"),
          React.createElement("input",{type:"number",placeholder:"0",value:amount,onChange:e=>setAmount(e.target.value),style:{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #ede9e2",fontSize:16,fontWeight:700,textAlign:"right"}}),
        ),
        React.createElement("div",null,
          React.createElement("label",{style:{fontSize:12,color:"#888780",marginBottom:4,display:"block"}},"Date"),
          React.createElement("input",{type:"date",value:date,onChange:e=>setDate(e.target.value),style:{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid #ede9e2",fontSize:14}}),
        ),
      ),
      React.createElement("button",{onClick:submit,style:{width:"100%",padding:16,background:"linear-gradient(135deg,#1D9E75,#0F6E56)",color:"#fff",border:"none",borderRadius:14,fontSize:16,fontWeight:800,cursor:"pointer"}},"✅ Log Transaction"),
    )
  );
}

// ── Donut Chart ───────────────────────────────────────────────
function DonutChart({data,total,centerLabel,centerSub}) {
  const size=200,cx=100,cy=100,r=75,stroke=28,circ=2*Math.PI*r;
  let off=0;
  const slices=data.filter(d=>d.value>0).map(d=>{
    const dash=(d.value/total)*circ,s={...d,dash,gap:circ-dash,offset:off};
    off+=dash; return s;
  });
  return React.createElement("svg",{viewBox:`0 0 ${size} ${size}`,style:{width:"100%",maxWidth:200}},
    React.createElement("circle",{cx,cy,r,fill:"none",stroke:"#f0ede8",strokeWidth:stroke}),
    slices.map((s,i)=>React.createElement("circle",{key:i,cx,cy,r,fill:"none",stroke:s.color,strokeWidth:stroke,strokeDasharray:`${s.dash} ${s.gap}`,strokeDashoffset:-s.offset+circ*0.25,style:{transition:"stroke-dasharray 0.5s"}})),
    React.createElement("text",{x:cx,y:cy-8,textAnchor:"middle",fontSize:18,fontWeight:700,fill:"#1a1a18"},centerLabel),
    React.createElement("text",{x:cx,y:cy+14,textAnchor:"middle",fontSize:11,fill:"#888780"},centerSub),
  );
}

// ── Bar Chart ─────────────────────────────────────────────────
function BarChart({monthData}) {
  const max=Math.max(...monthData.map(d=>d.actual),1);
  return React.createElement("div",{style:{display:"flex",alignItems:"flex-end",gap:6,height:80,padding:"0 4px"}},
    monthData.map((d,i)=>React.createElement("div",{key:i,style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}},
      React.createElement("div",{style:{width:"100%",background:d.isCurrent?"#1D9E75":"#e8e6e0",borderRadius:"4px 4px 0 0",height:`${(d.actual/max)*64}px`,minHeight:d.actual>0?4:0,transition:"height 0.5s"}}),
      React.createElement("span",{style:{fontSize:9,color:d.isCurrent?"#1D9E75":"#888780",fontWeight:d.isCurrent?700:400}},d.label),
    ))
  );
}

// ── Swipeable Transaction Row ─────────────────────────────────
function SwipeRow({tx,onDelete,color}) {
  const [swipeX,setSwipeX]=useState(0);
  const startX=useRef(null);
  const onTouchStart=e=>startX.current=e.touches[0].clientX;
  const onTouchMove=e=>{
    if(startX.current===null) return;
    const dx=e.touches[0].clientX-startX.current;
    if(dx<0) setSwipeX(Math.max(dx,-80));
  };
  const onTouchEnd=()=>{
    if(swipeX<-60) onDelete();
    else setSwipeX(0);
    startX.current=null;
  };
  return React.createElement("div",{style:{position:"relative",overflow:"hidden"}},
    React.createElement("div",{style:{position:"absolute",right:0,top:0,bottom:0,width:80,background:"#D85A30",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8}},
      React.createElement("span",{style:{color:"#fff",fontSize:20}},"🗑️")
    ),
    React.createElement("div",{
      onTouchStart,onTouchMove,onTouchEnd,
      style:{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:"1px solid #f0ede8",background:"#fff",transform:`translateX(${swipeX}px)`,transition:swipeX===0?"transform 0.3s":"none",borderRadius:8}
    },
      React.createElement("div",{style:{width:3,height:28,borderRadius:2,background:color,flexShrink:0}}),
      React.createElement("span",{style:{fontSize:11,color:"#888780",minWidth:42}}),
      React.createElement("span",{style:{flex:1,fontSize:13}}),
      React.createElement("span",{style:{fontSize:13,fontWeight:600}}),
      React.createElement("button",{onClick:onDelete,style:{background:"transparent",border:"none",color:"#ccc",cursor:"pointer",fontSize:18,padding:"0 4px"}},"×"),
    )
  );
}

function App() {
  const [tab,setTab]=useState("home");
  const [monthIdx,setMonthIdx]=useState(CUR_MONTH);
  const [year,setYear]=useState(CUR_YEAR);
  const [cats,setCats]=useState(DEFAULT_CATEGORIES);
  const [values,setValues]=useState(DEFAULT_BUDGETS);
  const [transactions,setTransactions]=useState(PRELOADED_TX);
  const [newCatName,setNewCatName]=useState("");
  const [newCatType,setNewCatType]=useState("expense");
  const [newItemName,setNewItemName]=useState({});
  const [expandedCats,setExpandedCats]=useState({});
  const [expandedItems,setExpandedItems]=useState({});
  const [txDraft,setTxDraft]=useState({});
  const [loaded,setLoaded]=useState(false);
  const [saveStatus,setSaveStatus]=useState("");
  const [lastSaved,setLastSaved]=useState(null);
  const [showBackup,setShowBackup]=useState(false);
  const [showQuickAdd,setShowQuickAdd]=useState(false);
  const [confetti,setConfetti]=useState(false);
  const [toast,setToast]=useState({msg:"",visible:false});
  const [search,setSearch]=useState("");
  const [showSearch,setShowSearch]=useState(false);

  const mi=monthIdx+year*12;

  const showToast=(msg)=>{
    setToast({msg,visible:true});
    setTimeout(()=>setToast({msg:"",visible:false}),2500);
  };

  useEffect(()=>{
    try {
      const c=localStorage.getItem(SK_CATS); if(c) setCats(JSON.parse(c));
      const v=localStorage.getItem(SK_VALS); if(v) setValues(JSON.parse(v));
      const t=localStorage.getItem(SK_TX); if(t) setTransactions(JSON.parse(t));
    } catch {}
    setLoaded(true);
  },[]);

  const saveNow=useCallback(()=>{
    setSaveStatus("saving");
    try {
      localStorage.setItem(SK_CATS,JSON.stringify(cats));
      localStorage.setItem(SK_VALS,JSON.stringify(values));
      localStorage.setItem(SK_TX,JSON.stringify(transactions));
      setLastSaved(new Date()); setSaveStatus("saved");
      setTimeout(()=>setSaveStatus(""),2000);
    } catch { setSaveStatus("error"); }
  },[cats,values,transactions]);

  useEffect(()=>{ if(!loaded) return; const t=setTimeout(saveNow,800); return()=>clearTimeout(t); },[cats,values,transactions,loaded]);

  const getBudget=k=>values[k]||0;
  const setBudgetVal=(k,v)=>setValues(p=>({...p,[k]:Number(v)||0}));
  const getTxList=(cId,iId)=>transactions[makeTxKey(cId,iId,mi)]||[];
  const getActual=(cId,iId)=>getTxList(cId,iId).reduce((s,tx)=>s+tx.amount,0);
  const getCatActual=(cat,customMi)=>cat.items.reduce((s,item)=>s+((transactions[makeTxKey(cat.id,item.id,customMi||mi)]||[]).reduce((a,tx)=>a+tx.amount,0)),0);
  const getCatBudget=cat=>cat.items.reduce((s,item)=>s+getBudget(makeBudgetKey(cat.id,item.id)),0);

  const addTx=(cId,iId,txData)=>{
    const key=makeTxKey(cId,iId,mi);
    const tx=txData||{};
    if(!txData) {
      const d=txDraft[`${cId}_${iId}`]||{};
      const amt=parseFloat(d.amount); if(!amt||amt<=0) return;
      tx.id=Date.now(); tx.desc=d.desc||""; tx.amount=amt;
      tx.date=d.date||`${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`;
      setTxDraft(p=>({...p,[`${cId}_${iId}`]:{desc:"",amount:"",date:tx.date}}));
    }
    setTransactions(p=>({...p,[key]:[...(p[key]||[]),tx]}));
    setConfetti(true); setTimeout(()=>setConfetti(false),100);
    const cat=cats.find(c=>c.id===cId);
    const item=cat?.items.find(i=>i.id===iId);
    showToast(`${cat?.emoji||""} ₪${tx.amount} logged!`);
    setShowQuickAdd(false);
  };

  const removeTx=(cId,iId,txId)=>{
    const key=makeTxKey(cId,iId,mi);
    setTransactions(p=>({...p,[key]:(p[key]||[]).filter(t=>t.id!==txId)}));
    showToast("Transaction deleted");
  };

  const totals=useMemo(()=>{
    const t={};
    cats.forEach(cat=>{ t[cat.id]={budget:getCatBudget(cat),actual:getCatActual(cat)}; });
    return t;
  },[cats,values,transactions,mi]);

  const summary=useMemo(()=>{
    const inc=cats.filter(c=>c.type==="income");
    const exp=cats.filter(c=>c.type==="expense");
    const bI=inc.reduce((s,c)=>s+totals[c.id].budget,0);
    const aI=inc.reduce((s,c)=>s+totals[c.id].actual,0);
    const bE=exp.reduce((s,c)=>s+totals[c.id].budget,0);
    const aE=exp.reduce((s,c)=>s+totals[c.id].actual,0);
    return {bI,aI,bE,aE,bBal:bI-bE,aBal:aI-aE,remaining:bE-aE};
  },[cats,totals]);

  const barData=useMemo(()=>Array.from({length:6},(_,i)=>{
    const d=new Date(year,monthIdx-5+i);
    const mmi=d.getMonth()+d.getFullYear()*12;
    const actual=cats.filter(c=>c.type==="expense").reduce((s,cat)=>s+getCatActual(cat,mmi),0);
    return {label:MONTHS[d.getMonth()].slice(0,3),actual,isCurrent:mmi===mi};
  }),[cats,transactions,mi]);

  const donutData=useMemo(()=>
    cats.filter(c=>c.type==="expense"&&totals[c.id].actual>0)
      .map(c=>({label:c.name,value:totals[c.id].actual,color:c.color,emoji:c.emoji}))
      .sort((a,b)=>b.value-a.value)
  ,[cats,totals]);

  const topCat=donutData[0];
  const prevMi=mi-1;
  const prevTotal=useMemo(()=>cats.filter(c=>c.type==="expense").reduce((s,cat)=>s+getCatActual(cat,prevMi),0),[cats,transactions,prevMi]);

  // All transactions flat list for search
  const allTx=useMemo(()=>{
    const list=[];
    cats.forEach(cat=>cat.items.forEach(item=>{
      (transactions[makeTxKey(cat.id,item.id,mi)]||[]).forEach(tx=>{
        list.push({...tx,catName:cat.name,catEmoji:cat.emoji,catColor:cat.color,itemName:item.name,catId:cat.id,itemId:item.id});
      });
    }));
    return list.sort((a,b)=>new Date(b.date)-new Date(a.date));
  },[cats,transactions,mi]);

  const filteredTx=useMemo(()=>{
    if(!search) return allTx;
    const q=search.toLowerCase();
    return allTx.filter(tx=>tx.desc.toLowerCase().includes(q)||tx.catName.toLowerCase().includes(q)||tx.itemName.toLowerCase().includes(q));
  },[allTx,search]);

  const importData=e=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try {
        const data=JSON.parse(ev.target.result);
        if(data.cats) setCats(data.cats);
        if(data.values) setValues(data.values);
        if(data.transactions) setTransactions(data.transactions);
        setTimeout(saveNow,500);
        showToast("✅ Data imported!");
      } catch { showToast("❌ Invalid file"); }
    };
    reader.readAsText(file); e.target.value="";
  };

  const exportCSV=()=>{
    const rows=[["Date","Month","Category","Item","Description","Amount"]];
    cats.forEach(cat=>cat.items.forEach(item=>{
      Object.entries(transactions).forEach(([key,txList])=>{
        if(!key.startsWith(`tx_${cat.id}_${item.id}_`)) return;
        txList.forEach(tx=>{const d=new Date(tx.date);rows.push([tx.date,MONTHS[d.getMonth()],cat.name,item.name,tx.desc||"",tx.amount]);});
      });
    }));
    const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");
    a.href=url;a.download="budget.csv";a.click();URL.revokeObjectURL(url);
  };

  const backupText=JSON.stringify({cats,values,transactions,exportedAt:new Date().toISOString()},null,2);
  const addCat=()=>{ if(!newCatName.trim()) return; setCats(p=>[...p,{id:"cat_"+Date.now(),name:newCatName.trim(),type:newCatType,color:"#888780",emoji:"📦",items:[]}]); setNewCatName(""); };
  const addItem=cId=>{const name=(newItemName[cId]||"").trim();if(!name)return;setCats(p=>p.map(c=>c.id===cId?{...c,items:[...c.items,{id:"item_"+Date.now(),name}]}:c));setNewItemName(p=>({...p,[cId]:""}));};
  const removeItem=(cId,iId)=>setCats(p=>p.map(c=>c.id===cId?{...c,items:c.items.filter(i=>i.id!==iId)}:c));
  const removeCat=cId=>setCats(p=>p.filter(c=>c.id!==cId));
  const toggleCat=id=>setExpandedCats(p=>({...p,[id]:p[id]===false?true:false}));
  const toggleItem=key=>setExpandedItems(p=>({...p,[key]:!p[key]}));
  const draftSet=(cId,iId,field,val)=>setTxDraft(p=>({...p,[`${cId}_${iId}`]:{...(p[`${cId}_${iId}`]||{}),[field]:val}}));

  const C={bg:"#f7f5f0",card:"#ffffff",border:"#ede9e2",text:"#1a1a18",muted:"#888780",success:"#1D9E75",danger:"#D85A30",accent:"#7F77DD"};
  const cardS={background:C.card,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"};
  const inp=(w,extra={})=>({width:w,padding:"8px 10px",borderRadius:10,border:`1px solid ${C.border}`,background:"#fff",color:C.text,fontSize:14,outline:"none",...extra});
  const btnS=(extra={})=>({padding:"8px 16px",borderRadius:10,border:`1px solid ${C.border}`,background:"#fff",color:C.text,cursor:"pointer",fontSize:13,fontWeight:500,...extra});

  const TABS=[["home","🏠","Home"],["tracker","📋","Track"],["budget","⚙️","Budget"]];

  if(!loaded) return React.createElement("div",{style:{padding:40,textAlign:"center",color:C.muted,fontFamily:"-apple-system,sans-serif",fontSize:16}},"Loading...");

  return React.createElement("div",{style:{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:C.bg,minHeight:"100vh",paddingBottom:80}},

    React.createElement(Confetti,{active:confetti}),
    React.createElement(Toast,{msg:toast.msg,visible:toast.visible}),
    showQuickAdd && React.createElement(QuickAdd,{cats,onAdd:addTx,onClose:()=>setShowQuickAdd(false),mi,monthIdx,year}),

    // ── HEADER ──
    React.createElement("div",{style:{background:"linear-gradient(135deg,#1D9E75 0%,#0F6E56 100%)",padding:"48px 20px 20px",position:"sticky",top:0,zIndex:100}},
      React.createElement("div",{style:{maxWidth:600,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},
          React.createElement("button",{onClick:()=>{const d=new Date(year,monthIdx-1);setMonthIdx(d.getMonth());setYear(d.getFullYear());},style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:18,borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center"}},"‹"),
          React.createElement("span",{style:{color:"#fff",fontSize:18,fontWeight:700}},`${MONTHS[monthIdx]} ${year}`),
          React.createElement("button",{onClick:()=>{const d=new Date(year,monthIdx+1);setMonthIdx(d.getMonth());setYear(d.getFullYear());},style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:18,borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center"}},"›"),
        ),
        React.createElement("div",{style:{display:"flex",gap:6}},
          React.createElement("button",{onClick:()=>setShowSearch(!showSearch),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:16,borderRadius:8,padding:"6px 10px"}},"🔍"),
          React.createElement("button",{onClick:saveNow,style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:13,borderRadius:8,padding:"6px 10px",fontWeight:500}},saveStatus==="saved"?"✓":saveStatus==="saving"?"...":"💾"),
          React.createElement("button",{onClick:()=>setShowBackup(true),style:{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontSize:13,borderRadius:8,padding:"6px 10px"}},"📋"),
        )
      ),
      // Search bar
      showSearch && React.createElement("div",{style:{maxWidth:600,margin:"12px auto 0"}},
        React.createElement("input",{type:"text",placeholder:"Search transactions...",value:search,onChange:e=>setSearch(e.target.value),autoFocus:true,style:{width:"100%",padding:"10px 14px",borderRadius:12,border:"none",fontSize:14,outline:"none",boxSizing:"border-box"}})
      )
    ),

    // ── SEARCH RESULTS ──
    showSearch && React.createElement("div",{style:{maxWidth:600,margin:"0 auto",padding:"12px 16px"}},
      filteredTx.length===0
        ? React.createElement("div",{style:{textAlign:"center",color:C.muted,padding:32}},"No transactions found")
        : filteredTx.map(tx=>React.createElement("div",{key:tx.id,style:{...cardS,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}},
            React.createElement("div",{style:{width:4,height:36,borderRadius:2,background:tx.catColor,flexShrink:0}}),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:13,fontWeight:600}}),
              React.createElement("div",{style:{fontSize:13,fontWeight:600}},tx.desc||"—"),
              React.createElement("div",{style:{fontSize:11,color:C.muted}},`${tx.catEmoji} ${tx.catName} · ${tx.itemName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:15,fontWeight:700}},fmt(tx.amount)),
            React.createElement("button",{onClick:()=>removeTx(tx.catId,tx.itemId,tx.id),style:{background:"transparent",border:"none",color:"#ccc",cursor:"pointer",fontSize:18}},"×"),
          ))
    ),

    !showSearch && React.createElement("div",{style:{maxWidth:600,margin:"0 auto",padding:"16px 16px 0"}},

      // ── HOME TAB ──
      tab==="home" && React.createElement(React.Fragment,null,
        // Hero card
        React.createElement("div",{style:{...cardS,background:"linear-gradient(135deg,#1D9E75,#0F6E56)",border:"none"}},
          React.createElement("div",{style:{padding:20}},
            React.createElement("div",{style:{color:"rgba(255,255,255,0.8)",fontSize:12,marginBottom:2}},"Remaining to spend"),
            React.createElement("div",{style:{color:"#fff",fontSize:38,fontWeight:900,letterSpacing:-1}},fmt(summary.remaining)),
            React.createElement("div",{style:{height:6,background:"rgba(255,255,255,0.2)",borderRadius:3,margin:"12px 0",overflow:"hidden"}},
              React.createElement("div",{style:{height:"100%",width:`${Math.min(100,(summary.aE/summary.bE)*100)||0}%`,background:"#fff",borderRadius:3,transition:"width 0.5s"}})
            ),
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,0.8)",fontSize:11}},
              React.createElement("span",null,`Spent: ${fmt(summary.aE)}`),
              React.createElement("span",null,`Budget: ${fmt(summary.bE)}`),
            )
          )
        ),

        // Insights
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}},
          React.createElement("div",{style:cardS},
            React.createElement("div",{style:{padding:14}},
              React.createElement("div",{style:{fontSize:11,color:C.muted,marginBottom:6}},"🔥 Top category"),
              topCat?React.createElement(React.Fragment,null,
                React.createElement("div",{style:{fontSize:22}}),
                React.createElement("div",{style:{fontSize:14,fontWeight:700}},`${topCat.emoji} ${topCat.label}`),
                React.createElement("div",{style:{fontSize:13,color:C.danger,fontWeight:700}},fmt(topCat.value)),
              ):React.createElement("div",{style:{fontSize:13,color:C.muted}},"No data"),
            )
          ),
          React.createElement("div",{style:cardS},
            React.createElement("div",{style:{padding:14}},
              React.createElement("div",{style:{fontSize:11,color:C.muted,marginBottom:6}},"📅 vs last month"),
              React.createElement("div",{style:{fontSize:18,fontWeight:800,color:summary.aE>prevTotal?C.danger:C.success}},
                summary.aE>prevTotal?`▲ ${fmt(summary.aE-prevTotal)}`:`▼ ${fmt(prevTotal-summary.aE)}`
              ),
              React.createElement("div",{style:{fontSize:11,color:C.muted,marginTop:2}},`Last: ${fmt(prevTotal)}`),
            )
          ),
        ),

        // Recent transactions
        allTx.length>0 && React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:"14px 14px 4px",display:"flex",justifyContent:"space-between",alignItems:"center"}},
            React.createElement("span",{style:{fontWeight:700,fontSize:15}},"Recent transactions"),
            React.createElement("span",{style:{fontSize:12,color:C.muted}},`${allTx.length} total`),
          ),
          allTx.slice(0,5).map(tx=>React.createElement("div",{key:tx.id,style:{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderTop:`1px solid ${C.border}`}},
            React.createElement("div",{style:{width:36,height:36,borderRadius:10,background:tx.catColor+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}},tx.catEmoji),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:13,fontWeight:600}},tx.desc||tx.itemName),
              React.createElement("div",{style:{fontSize:11,color:C.muted}},`${tx.catName} · ${tx.date.slice(5)}`),
            ),
            React.createElement("div",{style:{fontSize:14,fontWeight:700,color:C.danger}},`-${fmt(tx.amount)}`),
          )),
          React.createElement("div",{style:{padding:"10px 14px",borderTop:`1px solid ${C.border}`,textAlign:"center",cursor:"pointer",color:C.success,fontSize:13,fontWeight:600},onClick:()=>setTab("tracker")},"View all →"),
        ),

        // Donut chart
        React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:16}},
            React.createElement("div",{style:{fontWeight:700,fontSize:15,marginBottom:12}},"Spending breakdown"),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:16}},
              React.createElement("div",{style:{width:140,flexShrink:0}},
                React.createElement(DonutChart,{data:donutData,total:summary.aE||1,centerLabel:fmt(summary.aE),centerSub:"spent"})
              ),
              React.createElement("div",{style:{flex:1}},
                donutData.slice(0,6).map(d=>React.createElement("div",{key:d.label,style:{display:"flex",alignItems:"center",gap:8,marginBottom:7}},
                  React.createElement("div",{style:{width:10,height:10,borderRadius:"50%",background:d.color,flexShrink:0}}),
                  React.createElement("span",{style:{fontSize:12,flex:1}}),
                  React.createElement("span",{style:{fontSize:12,flex:1}},d.label),
                  React.createElement("span",{style:{fontSize:12,fontWeight:700,color:C.muted}},`${Math.round(d.value/summary.aE*100)}%`),
                ))
              )
            )
          )
        ),

        // Bar chart
        React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:16}},
            React.createElement("div",{style:{fontWeight:700,fontSize:15,marginBottom:12}},"Last 6 months"),
            React.createElement(BarChart,{monthData:barData}),
          )
        ),

        // Category bars
        React.createElement("div",{style:cardS},
          React.createElement("div",{style:{padding:16}},
            React.createElement("div",{style:{fontWeight:700,fontSize:15,marginBottom:14}},"Category progress"),
            cats.filter(c=>c.type==="expense").map(cat=>{
              const t=totals[cat.id];
              const pct=t.budget>0?Math.min(100,(t.actual/t.budget)*100):0;
              const over=t.actual>t.budget&&t.budget>0;
              return React.createElement("div",{key:cat.id,style:{marginBottom:14}},
                React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:5}},
                  React.createElement("span",{style:{fontSize:13,fontWeight:500}},`${cat.emoji} ${cat.name}`),
                  React.createElement("span",{style:{fontSize:12,color:over?C.danger:C.muted}},`${fmt(t.actual)} / ${fmt(t.budget)}`),
                ),
                React.createElement("div",{style:{height:7,background:"#f0ede8",borderRadius:4,overflow:"hidden"}},
                  React.createElement("div",{style:{height:"100%",width:`${pct}%`,background:over?C.danger:cat.color,borderRadius:4,transition:"width 0.4s"}})
                )
              );
            })
          )
        ),
      ),

      // ── TRACKER TAB ──
      tab==="tracker" && cats.map(cat=>{
        const t=totals[cat.id];
        const over=cat.type==="expense"&&t.actual>t.budget&&t.budget>0;
        const catExpanded=expandedCats[cat.id]!==false;
        return React.createElement("div",{key:cat.id,style:cardS},
          React.createElement("div",{onClick:()=>toggleCat(cat.id),style:{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer",borderLeft:`4px solid ${cat.color}`}},
            React.createElement("span",{style:{fontSize:18}},cat.emoji),
            React.createElement("span",{style:{flex:1,fontWeight:600,fontSize:14}},cat.name),
            cat.type==="expense"&&t.budget>0&&React.createElement("div",{style:{width:50,height:5,background:C.border,borderRadius:3,overflow:"hidden",marginRight:4}},
              React.createElement("div",{style:{height:"100%",width:`${Math.min(100,(t.actual/t.budget)*100)}%`,background:over?C.danger:cat.color,borderRadius:3}})
            ),
            React.createElement("span",{style:{fontSize:12,color:over?C.danger:C.muted,minWidth:90,textAlign:"right"}},`${fmt(t.actual)} / ${fmt(t.budget)}`),
            React.createElement("span",{style:{fontSize:10,color:C.muted,marginLeft:4}},catExpanded?"▲":"▼"),
          ),
          catExpanded&&cat.items.map(item=>{
            const actual=getActual(cat.id,item.id);
            const budget=getBudget(makeBudgetKey(cat.id,item.id));
            const itemOver=cat.type==="expense"&&actual>budget&&budget>0;
            const txList=getTxList(cat.id,item.id);
            const itemKey=`${cat.id}_${item.id}`;
            const txOpen=expandedItems[itemKey];
            const d=txDraft[itemKey]||{};
            return React.createElement("div",{key:item.id,style:{borderTop:`1px solid ${C.border}`}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px 10px 18px"}},
                React.createElement("button",{onClick:()=>toggleItem(itemKey),style:{background:"transparent",border:"none",cursor:"pointer",color:C.muted,fontSize:11,padding:"0 4px 0 0"}},txOpen?"▼":"▶"),
                React.createElement("span",{style:{flex:1,color:C.muted,fontSize:13}},item.name),
                React.createElement("span",{style:{fontSize:11,color:"#ccc",marginRight:6}},fmt(budget)),
                React.createElement("span",{style:{fontSize:13,fontWeight:600,color:itemOver?C.danger:C.text}},fmt(actual)),
                txList.length>0&&React.createElement("span",{style:{fontSize:10,color:C.muted,marginLeft:4,background:C.bg,borderRadius:10,padding:"1px 6px"}},txList.length),
              ),
              txOpen&&React.createElement("div",{style:{background:"#fafaf8",borderTop:`1px solid ${C.border}`,padding:"10px 14px 10px 26px"}},
                txList.length>0&&React.createElement("div",{style:{marginBottom:10}},
                  txList.map(tx=>{
                    const [swipeX,setSwipeX]=useState(0);
                    const startX=useRef(null);
                    return React.createElement("div",{key:tx.id,style:{position:"relative",overflow:"hidden",borderRadius:8,marginBottom:2}},
                      React.createElement("div",{style:{position:"absolute",right:0,top:0,bottom:0,width:64,background:C.danger,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8}},
                        React.createElement("span",{style:{fontSize:16}},"🗑️")
                      ),
                      React.createElement("div",{
                        onTouchStart:e=>{startX.current=e.touches[0].clientX;},
                        onTouchMove:e=>{if(startX.current===null)return;const dx=e.touches[0].clientX-startX.current;if(dx<0)setSwipeX(Math.max(dx,-64));},
                        onTouchEnd:()=>{if(swipeX<-50)removeTx(cat.id,item.id,tx.id);else setSwipeX(0);startX.current=null;},
                        style:{display:"flex",alignItems:"center",gap:8,padding:"7px 4px",background:"#fafaf8",transform:`translateX(${swipeX}px)`,transition:swipeX===0?"transform 0.3s":"none"}
                      },
                        React.createElement("span",{style:{fontSize:11,color:C.muted,minWidth:42}},tx.date.slice(5)),
                        React.createElement("span",{style:{flex:1,fontSize:13}},tx.desc||"—"),
                        React.createElement("span",{style:{fontSize:13,fontWeight:600}},fmt(tx.amount)),
                        React.createElement("button",{onClick:()=>removeTx(cat.id,item.id,tx.id),style:{background:"transparent",border:"none",color:"#ccc",cursor:"pointer",fontSize:18,padding:"0 4px"}},"×"),
                      )
                    );
                  }),
                  React.createElement("div",{style:{textAlign:"right",fontSize:12,fontWeight:700,paddingTop:4,color:itemOver?C.danger:C.success}},`Total: ${fmt(actual)}`),
                ),
                React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}},
                  React.createElement("input",{type:"date",value:d.date||`${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`,onChange:e=>draftSet(cat.id,item.id,"date",e.target.value),style:inp(110)}),
                  React.createElement("input",{type:"text",placeholder:"Description",value:d.desc||"",onChange:e=>draftSet(cat.id,item.id,"desc",e.target.value),onKeyDown:e=>e.key==="Enter"&&addTx(cat.id,item.id,null),style:inp("auto",{flex:1,minWidth:80})}),
                  React.createElement("input",{type:"number",placeholder:"₪",value:d.amount||"",onChange:e=>draftSet(cat.id,item.id,"amount",e.target.value),onKeyDown:e=>e.key==="Enter"&&addTx(cat.id,item.id,null),style:inp(70,{textAlign:"right"})}),
                  React.createElement("button",{onClick:()=>addTx(cat.id,item.id,null),style:btnS({background:cat.color,color:"#fff",border:"none",padding:"8px 12px"})},"+ Add"),
                )
              )
            );
          })
        );
      }),

      // ── BUDGET TAB ──
      tab==="budget"&&React.createElement(React.Fragment,null,
        cats.map(cat=>{
          const bExpanded=expandedCats["b_"+cat.id]!==false;
          return React.createElement("div",{key:cat.id,style:cardS},
            React.createElement("div",{onClick:()=>setExpandedCats(p=>({...p,["b_"+cat.id]:!p["b_"+cat.id]})),style:{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer",borderLeft:`4px solid ${cat.color}`}},
              React.createElement("span",{style:{fontSize:18}},cat.emoji),
              React.createElement("span",{style:{flex:1,fontWeight:600,fontSize:14}},cat.name),
              React.createElement("span",{style:{fontSize:12,color:C.muted}},fmt(totals[cat.id].budget)),
              React.createElement("button",{onClick:e=>{e.stopPropagation();removeCat(cat.id);},style:{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:20,padding:"0 4px"}},"×"),
              React.createElement("span",{style:{fontSize:10,color:C.muted}},bExpanded?"▲":"▼"),
            ),
            bExpanded&&React.createElement(React.Fragment,null,
              cat.items.map(item=>React.createElement("div",{key:item.id,style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",borderTop:`1px solid ${C.border}`}},
                React.createElement("span",{style:{flex:1,color:C.muted,fontSize:13}},item.name),
                React.createElement("span",{style:{fontSize:13,color:C.muted}},"₪"),
                React.createElement("input",{type:"number",min:"0",value:getBudget(makeBudgetKey(cat.id,item.id))||"",placeholder:"0",onChange:e=>setBudgetVal(makeBudgetKey(cat.id,item.id),e.target.value),style:inp(90,{textAlign:"right"})}),
                React.createElement("button",{onClick:()=>removeItem(cat.id,item.id),style:{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:18}},"×"),
              )),
              React.createElement("div",{style:{display:"flex",gap:8,padding:"10px 14px",borderTop:`1px solid ${C.border}`}},
                React.createElement("input",{placeholder:"New line item...",value:newItemName[cat.id]||"",onChange:e=>setNewItemName(p=>({...p,[cat.id]:e.target.value})),onKeyDown:e=>e.key==="Enter"&&addItem(cat.id),style:inp("auto",{flex:1})}),
                React.createElement("button",{onClick:()=>addItem(cat.id),style:btnS()},"+ Add"),
              )
            )
          );
        }),
        React.createElement("div",{style:{...cardS,padding:14}},
          React.createElement("div",{style:{fontSize:13,color:C.muted,marginBottom:10,fontWeight:500}},"Add new category"),
          React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
            React.createElement("input",{placeholder:"Name...",value:newCatName,onChange:e=>setNewCatName(e.target.value),onKeyDown:e=>e.key==="Enter"&&addCat(),style:inp("auto",{flex:2,minWidth:120})}),
            React.createElement("select",{value:newCatType,onChange:e=>setNewCatType(e.target.value),style:inp("auto",{flex:1,minWidth:90})},
              React.createElement("option",{value:"expense"},"Expense"),
              React.createElement("option",{value:"income"},"Income"),
            ),
            React.createElement("button",{onClick:addCat,style:btnS({background:C.success,color:"#fff",border:"none"})},"+ Add"),
          )
        )
      )
    ),

    // ── FAB BUTTON ──
    !showSearch&&React.createElement("button",{
      onClick:()=>setShowQuickAdd(true),
      style:{position:"fixed",bottom:90,right:20,width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#1D9E75,#0F6E56)",border:"none",color:"#fff",fontSize:28,cursor:"pointer",boxShadow:"0 4px 20px rgba(29,158,117,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}
    },"+"),

    // ── BACKUP MODAL ──
    showBackup&&React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}},
      React.createElement("div",{style:{background:"#fff",borderRadius:20,padding:20,width:"100%",maxWidth:500}},
        React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:8}},"📋 Backup & Restore"),
        React.createElement("div",{style:{fontSize:12,color:C.muted,marginBottom:10}},"Select all text below → Copy → Save as budget-backup.json"),
        React.createElement("textarea",{readOnly:true,value:backupText,style:{width:"100%",height:160,fontSize:11,fontFamily:"monospace",padding:8,borderRadius:8,border:`1px solid ${C.border}`,resize:"none",boxSizing:"border-box"},onClick:e=>e.target.select()}),
        React.createElement("div",{style:{display:"flex",gap:8,marginTop:12}},
          React.createElement("label",{style:{...btnS(),flex:1,textAlign:"center",cursor:"pointer"}},
            "⬆ Import",
            React.createElement("input",{type:"file",accept:".json",onChange:importData,style:{display:"none"}})
          ),
          React.createElement("button",{onClick:exportCSV,style:btnS({flex:1})},"⬇ CSV"),
          React.createElement("button",{onClick:()=>setShowBackup(false),style:btnS({background:C.success,color:"#fff",border:"none"})},"Close"),
        )
      )
    ),

    // ── BOTTOM NAV ──
    React.createElement("div",{style:{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:`1px solid ${C.border}`,display:"flex",paddingBottom:"env(safe-area-inset-bottom)",zIndex:100,boxShadow:"0 -2px 12px rgba(0,0,0,0.08)"}},
      TABS.map(([id,emoji,label])=>
        React.createElement("button",{key:id,onClick:()=>{setTab(id);setShowSearch(false);},style:{flex:1,padding:"10px 0 8px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}},
          React.createElement("span",{style:{fontSize:20}},emoji),
          React.createElement("span",{style:{fontSize:10,fontWeight:600,color:tab===id?C.success:C.muted}},label),
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const NOW = new Date();
const CUR_MONTH = NOW.getMonth();
const CUR_YEAR = NOW.getFullYear();

const DEFAULT_CATEGORIES = [
  { id: "income", name: "Income", type: "income", color: "#1D9E75", emoji: "💰", items: [
    { id: "salary", name: "Salary (משכורת)" }, { id: "side", name: "Side income" },
  ]},
  { id: "housing", name: "Housing", type: "expense", color: "#378ADD", emoji: "🏠", items: [
    { id: "rent", name: "Rent / mortgage" }, { id: "electric", name: "Electricity" },
    { id: "water", name: "Water" }, { id: "internet", name: "Internet & phone" }, { id: "vaad", name: "Vaad bayit" },
  ]},
  { id: "food", name: "Food", type: "expense", color: "#EF9F27", emoji: "🍕", items: [
    { id: "supermarket", name: "Supermarket" }, { id: "restaurants", name: "Restaurants" }, { id: "coffee", name: "Coffee" },
  ]},
  { id: "transport", name: "Transport", type: "expense", color: "#7F77DD", emoji: "🚌", items: [
    { id: "fuel", name: "Fuel" }, { id: "transit", name: "Public transit" },
    { id: "carins", name: "Car insurance" }, { id: "gett", name: "Gett/Train" },
  ]},
  { id: "health", name: "Health", type: "expense", color: "#D85A30", emoji: "💊", items: [
    { id: "kupat", name: "Kupat holim" }, { id: "insurance", name: "Insurance" },
    { id: "meds", name: "Medications" }, { id: "gym", name: "Gym" },
  ]},
  { id: "entertainment", name: "Entertainment", type: "expense", color: "#D4537E", emoji: "🎉", items: [
    { id: "subs", name: "Subscriptions" }, { id: "outings", name: "Outings" },
    { id: "spotify", name: "Spotify, Google, Apple" }, { id: "concerts", name: "Concert, Event, etc." },
  ]},
  { id: "savings", name: "Savings", type: "expense", color: "#0F6E56", emoji: "💎", items: [
    { id: "emergency", name: "Emergency fund" }, { id: "invest", name: "Investments" },
    { id: "roth", name: "Roth IRA" }, { id: "brokerage", name: "Brokerage" }, { id: "travel", name: "Travel" },
  ]},
  { id: "personal", name: "Personal", type: "expense", color: "#BA7517", emoji: "✨", items: [
    { id: "clothing", name: "Clothing" }, { id: "care", name: "Personal care" }, { id: "misc", name: "Miscellaneous" },
  ]},
];

const DEFAULT_BUDGETS = {
  "b_income_salary": 13000, "b_income_side": 0,
  "b_housing_rent": 3700, "b_housing_electric": 150, "b_housing_water": 100,
  "b_housing_internet": 30, "b_housing_vaad": 70,
  "b_food_supermarket": 1000, "b_food_restaurants": 1000, "b_food_coffee": 300,
  "b_transport_fuel": 0, "b_transport_transit": 200, "b_transport_carins": 0, "b_transport_gett": 100,
  "b_health_kupat": 0, "b_health_insurance": 0, "b_health_meds": 50, "b_health_gym": 400,
  "b_entertainment_subs": 0, "b_entertainment_outings": 0, "b_entertainment_spotify": 50, "b_entertainment_concerts": 150,
  "b_savings_emergency": 500, "b_savings_invest": 0, "b_savings_roth": 1500,
  "b_savings_brokerage": 1500, "b_savings_travel": 1000,
  "b_personal_clothing": 300, "b_personal_care": 300, "b_personal_misc": 600,
};

const MAR_MI = 2 + 2026 * 12;
const APR_MI = 3 + 2026 * 12;

const PRELOADED_TX = {
  [`tx_housing_rent_${MAR_MI}`]: [{ id: "m1", date: "2026-03-21", desc: "Rent", amount: 3700 }],
  [`tx_housing_internet_${MAR_MI}`]: [{ id: "m2", date: "2026-03-21", desc: "phone", amount: 30 }],
  [`tx_food_supermarket_${MAR_MI}`]: [
    { id: "m3", date: "2026-03-21", desc: "ampm", amount: 40 },
    { id: "m4", date: "2026-03-21", desc: "tivtam", amount: 29 },
    { id: "m5", date: "2026-03-21", desc: "ampm", amount: 31 },
    { id: "m6", date: "2026-03-21", desc: "shuk aliya", amount: 41 },
    { id: "m7", date: "2026-03-21", desc: "ampm", amount: 34 },
    { id: "m8", date: "2026-03-21", desc: "street market", amount: 23 },
    { id: "m9", date: "2026-03-21", desc: "ampm", amount: 38 },
    { id: "m10", date: "2026-03-21", desc: "super mama", amount: 18 },
    { id: "m11", date: "2026-03-21", desc: "dates", amount: 40 },
    { id: "m12", date: "2026-03-21", desc: "victory", amount: 99 },
    { id: "m13", date: "2026-03-21", desc: "chicken", amount: 60 },
    { id: "m14", date: "2026-03-21", desc: "fruit and veg", amount: 47 },
    { id: "m15", date: "2026-03-21", desc: "dishwasher pods + other", amount: 98 },
    { id: "m16", date: "2026-03-21", desc: "cheede", amount: 17 },
    { id: "m17", date: "2026-03-21", desc: "groceries mama", amount: 27 },
    { id: "m18", date: "2026-03-21", desc: "superyuda", amount: 29 },
    { id: "m19", date: "2026-03-21", desc: "superyuda", amount: 62 },
    { id: "m20", date: "2026-03-21", desc: "superyuda", amount: 10 },
  ],
  [`tx_food_restaurants_${MAR_MI}`]: [
    { id: "m21", date: "2026-03-21", desc: "toni v ester", amount: 53 },
    { id: "m22", date: "2026-03-21", desc: "htaco", amount: 49 },
    { id: "m23", date: "2026-03-21", desc: "mclovin", amount: 16 },
    { id: "m24", date: "2026-03-21", desc: "mclovin", amount: 28 },
    { id: "m25", date: "2026-03-21", desc: "cassata", amount: 19 },
  ],
  [`tx_food_coffee_${MAR_MI}`]: [
    { id: "m26", date: "2026-03-21", desc: "nordoy", amount: 18 },
    { id: "m27", date: "2026-03-21", desc: "ada lewinsky", amount: 37 },
    { id: "m28", date: "2026-03-21", desc: "chachos", amount: 18 },
    { id: "m29", date: "2026-03-21", desc: "tony and ester", amount: 40 },
  ],
  [`tx_transport_gett_${MAR_MI}`]: [{ id: "m30", date: "2026-03-21", desc: "gett", amount: 78 }],
  [`tx_entertainment_spotify_${MAR_MI}`]: [
    { id: "m31", date: "2026-03-21", desc: "spotify", amount: 24 },
    { id: "m32", date: "2026-03-21", desc: "google", amount: 9 },
  ],
  [`tx_savings_travel_${MAR_MI}`]: [{ id: "m33", date: "2026-03-21", desc: "Flight to Rhodes", amount: 686 }],
  [`tx_personal_care_${MAR_MI}`]: [
    { id: "m34", date: "2026-03-21", desc: "superpharm", amount: 18 },
    { id: "m35", date: "2026-03-21", desc: "superpharm", amount: 52 },
  ],
  [`tx_food_restaurants_${APR_MI}`]: [
    { id: "a1", date: "2026-04-06", desc: "Shafa Bar", amount: 87 },
    { id: "a2", date: "2026-04-05", desc: "Khao San Food TLV", amount: 55 },
    { id: "a3", date: "2026-04-04", desc: "Moon Sushi Burger", amount: 136 },
    { id: "a4", date: "2026-04-08", desc: "Gania Costanza B", amount: 110 },
  ],
  [`tx_food_coffee_${APR_MI}`]: [
    { id: "a5", date: "2026-04-05", desc: "Café BaNachla", amount: 30 },
    { id: "a6", date: "2026-04-04", desc: "Tzakuli", amount: 6 },
    { id: "a7", date: "2026-04-02", desc: "Tom's", amount: 33 },
  ],
  [`tx_food_supermarket_${APR_MI}`]: [
    { id: "a8", date: "2026-04-04", desc: "Ilay Market", amount: 26.80 },
    { id: "a9", date: "2026-04-03", desc: "Hasid HaYerek", amount: 25 },
    { id: "a10", date: "2026-04-03", desc: "Davka Gourmet", amount: 15 },
    { id: "a11", date: "2026-04-03", desc: "Shuk HaAliya", amount: 23.10 },
    { id: "a12", date: "2026-04-03", desc: "Street Market David", amount: 22.80 },
    { id: "a13", date: "2026-04-03", desc: "Super Al HaYam", amount: 38.80 },
    { id: "a14", date: "2026-04-01", desc: "Super Mama", amount: 36.75 },
  ],
  [`tx_personal_care_${APR_MI}`]: [{ id: "a15", date: "2026-04-01", desc: "A. Aviv Flowers", amount: 120 }],
  [`tx_personal_clothing_${APR_MI}`]: [{ id: "a16", date: "2026-04-01", desc: "Top Stock", amount: 50 }],
  [`tx_personal_misc_${APR_MI}`]: [{ id: "a17", date: "2026-04-05", desc: "Bank card fee", amount: 9.90 }],
};

const fmt = n => "₪" + Math.round(Math.abs(n)).toLocaleString();
const fmtDec = n => "₪" + Math.abs(n).toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const makeBudgetKey = (cId, iId) => `b_${cId}_${iId}`;
const makeTxKey = (cId, iId, mi) => `tx_${cId}_${iId}_${mi}`;
const SK_CATS = "bgt_cats"; const SK_VALS = "bgt_vals"; const SK_TX = "bgt_tx";

// ── Donut Chart ──────────────────────────────────────────────
function DonutChart({ data, total, centerLabel, centerSub }) {
  const size = 200, cx = 100, cy = 100, r = 75, stroke = 28;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.filter(d => d.value > 0).map(d => {
    const pct = d.value / total;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const s = { ...d, dash, gap, offset, pct };
    offset += dash;
    return s;
  });
  return React.createElement("svg", { viewBox: `0 0 ${size} ${size}`, style: { width: "100%", maxWidth: 200 } },
    React.createElement("circle", { cx, cy, r, fill: "none", stroke: "#f0ede8", strokeWidth: stroke }),
    slices.map((s, i) =>
      React.createElement("circle", { key: i, cx, cy, r, fill: "none", stroke: s.color,
        strokeWidth: stroke, strokeDasharray: `${s.dash} ${s.gap}`,
        strokeDashoffset: -s.offset + circumference * 0.25,
        style: { transition: "stroke-dasharray 0.5s ease" } })
    ),
    React.createElement("text", { x: cx, y: cy - 8, textAnchor: "middle", fontSize: 20, fontWeight: 700, fill: "#1a1a18" }, centerLabel),
    React.createElement("text", { x: cx, y: cy + 14, textAnchor: "middle", fontSize: 11, fill: "#888780" }, centerSub),
  );
}

// ── Bar Chart ────────────────────────────────────────────────
function BarChart({ monthData }) {
  const max = Math.max(...monthData.map(d => d.actual), 1);
  return React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 6, height: 80, padding: "0 4px" } },
    monthData.map((d, i) =>
      React.createElement("div", { key: i, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
        React.createElement("div", { style: { width: "100%", background: d.isCurrent ? "#1D9E75" : "#e8e6e0", borderRadius: "4px 4px 0 0", height: `${(d.actual / max) * 64}px`, minHeight: d.actual > 0 ? 4 : 0, transition: "height 0.5s ease" } }),
        React.createElement("span", { style: { fontSize: 9, color: d.isCurrent ? "#1D9E75" : "#888780", fontWeight: d.isCurrent ? 700 : 400 } }, d.label),
      )
    )
  );
}

function App() {
  const [tab, setTab] = useState("home");
  const [monthIdx, setMonthIdx] = useState(CUR_MONTH);
  const [year, setYear] = useState(CUR_YEAR);
  const [cats, setCats] = useState(DEFAULT_CATEGORIES);
  const [values, setValues] = useState(DEFAULT_BUDGETS);
  const [transactions, setTransactions] = useState(PRELOADED_TX);
  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState("expense");
  const [newItemName, setNewItemName] = useState({});
  const [expandedCats, setExpandedCats] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [txDraft, setTxDraft] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [lastSaved, setLastSaved] = useState(null);
  const [showBackup, setShowBackup] = useState(false);

  const mi = monthIdx + year * 12;

  useEffect(() => {
    try {
      const c = localStorage.getItem(SK_CATS); if (c) setCats(JSON.parse(c));
      const v = localStorage.getItem(SK_VALS); if (v) setValues(JSON.parse(v));
      const t = localStorage.getItem(SK_TX); if (t) setTransactions(JSON.parse(t));
    } catch {}
    setLoaded(true);
  }, []);

  const saveNow = useCallback(() => {
    setSaveStatus("saving");
    try {
      localStorage.setItem(SK_CATS, JSON.stringify(cats));
      localStorage.setItem(SK_VALS, JSON.stringify(values));
      localStorage.setItem(SK_TX, JSON.stringify(transactions));
      setLastSaved(new Date()); setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch { setSaveStatus("error"); }
  }, [cats, values, transactions]);

  useEffect(() => { if (!loaded) return; const t = setTimeout(saveNow, 800); return () => clearTimeout(t); }, [cats, values, transactions, loaded]);

  const getBudget = k => values[k] || 0;
  const setBudgetVal = (k, v) => setValues(p => ({ ...p, [k]: Number(v) || 0 }));
  const getTxList = (cId, iId) => transactions[makeTxKey(cId, iId, mi)] || [];
  const getActual = (cId, iId) => getTxList(cId, iId).reduce((s, tx) => s + tx.amount, 0);
  const getCatActual = (cat, customMi) => cat.items.reduce((s, item) => s + ((transactions[makeTxKey(cat.id, item.id, customMi || mi)] || []).reduce((a, tx) => a + tx.amount, 0)), 0);
  const getCatBudget = cat => cat.items.reduce((s, item) => s + getBudget(makeBudgetKey(cat.id, item.id)), 0);

  const addTx = (cId, iId) => {
    const d = txDraft[`${cId}_${iId}`] || {};
    const amt = parseFloat(d.amount); if (!amt || amt <= 0) return;
    const key = makeTxKey(cId, iId, mi);
    const tx = { id: Date.now(), desc: d.desc || "", amount: amt, date: d.date || `${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}` };
    setTransactions(p => ({ ...p, [key]: [...(p[key] || []), tx] }));
    setTxDraft(p => ({ ...p, [`${cId}_${iId}`]: { desc: "", amount: "", date: tx.date } }));
  };

  const removeTx = (cId, iId, txId) => {
    const key = makeTxKey(cId, iId, mi);
    setTransactions(p => ({ ...p, [key]: (p[key] || []).filter(t => t.id !== txId) }));
  };

  const totals = useMemo(() => {
    const t = {};
    cats.forEach(cat => { t[cat.id] = { budget: getCatBudget(cat), actual: getCatActual(cat) }; });
    return t;
  }, [cats, values, transactions, mi]);

  const summary = useMemo(() => {
    const inc = cats.filter(c => c.type === "income");
    const exp = cats.filter(c => c.type === "expense");
    const bI = inc.reduce((s, c) => s + totals[c.id].budget, 0);
    const aI = inc.reduce((s, c) => s + totals[c.id].actual, 0);
    const bE = exp.reduce((s, c) => s + totals[c.id].budget, 0);
    const aE = exp.reduce((s, c) => s + totals[c.id].actual, 0);
    return { bI, aI, bE, aE, bBal: bI - bE, aBal: aI - aE, remaining: bE - aE };
  }, [cats, totals]);

  // Last 6 months bar data
  const barData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(year, monthIdx - 5 + i);
      const mmi = d.getMonth() + d.getFullYear() * 12;
      const actual = cats.filter(c => c.type === "expense").reduce((s, cat) => s + getCatActual(cat, mmi), 0);
      return { label: MONTHS[d.getMonth()].slice(0,3), actual, isCurrent: mmi === mi };
    });
  }, [cats, transactions, mi]);

  // Donut data
  const donutData = useMemo(() =>
    cats.filter(c => c.type === "expense" && totals[c.id].actual > 0).map(c => ({
      label: c.name, value: totals[c.id].actual, color: c.color, emoji: c.emoji
    })), [cats, totals]);

  const topCat = useMemo(() => donutData.sort((a, b) => b.value - a.value)[0], [donutData]);
  const prevMi = mi - 1;
  const prevTotal = useMemo(() => cats.filter(c => c.type === "expense").reduce((s, cat) => s + getCatActual(cat, prevMi), 0), [cats, transactions, prevMi]);

  const importData = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.cats) setCats(data.cats);
        if (data.values) setValues(data.values);
        if (data.transactions) setTransactions(data.transactions);
        setTimeout(saveNow, 500);
        alert("✅ Data imported!");
      } catch { alert("❌ Invalid file."); }
    };
    reader.readAsText(file); e.target.value = "";
  };

  const exportCSV = () => {
    const rows = [["Date","Month","Category","Item","Description","Amount"]];
    cats.forEach(cat => cat.items.forEach(item => {
      Object.entries(transactions).forEach(([key, txList]) => {
        if (!key.startsWith(`tx_${cat.id}_${item.id}_`)) return;
        txList.forEach(tx => { const d = new Date(tx.date); rows.push([tx.date, MONTHS[d.getMonth()], cat.name, item.name, tx.desc||"", tx.amount]); });
      });
    }));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "budget.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const backupText = JSON.stringify({ cats, values, transactions, exportedAt: new Date().toISOString() }, null, 2);

  const addCat = () => { if (!newCatName.trim()) return; setCats(p => [...p, { id: "cat_"+Date.now(), name: newCatName.trim(), type: newCatType, color: "#888780", emoji: "📦", items: [] }]); setNewCatName(""); };
  const addItem = cId => { const name = (newItemName[cId]||"").trim(); if (!name) return; setCats(p => p.map(c => c.id===cId ? {...c, items:[...c.items,{id:"item_"+Date.now(),name}]} : c)); setNewItemName(p=>({...p,[cId]:""})); };
  const removeItem = (cId, iId) => setCats(p => p.map(c => c.id===cId ? {...c, items:c.items.filter(i=>i.id!==iId)} : c));
  const removeCat = cId => setCats(p => p.filter(c => c.id!==cId));
  const toggleCat = id => setExpandedCats(p => ({...p,[id]:p[id]===false?true:false}));
  const toggleItem = key => setExpandedItems(p => ({...p,[key]:!p[key]}));
  const draftSet = (cId, iId, field, val) => setTxDraft(p => ({...p,[`${cId}_${iId}`]:{...(p[`${cId}_${iId}`]||{}),[field]:val}}));

  const C = { bg: "#f7f5f0", card: "#ffffff", border: "#ede9e2", text: "#1a1a18", muted: "#888780", success: "#1D9E75", danger: "#D85A30", accent: "#7F77DD" };
  const cardStyle = { background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" };
  const inp = (w, extra={}) => ({ width: w, padding: "8px 10px", borderRadius: 10, border: `1px solid ${C.border}`, background: "#fff", color: C.text, fontSize: 14, outline: "none", ...extra });
  const btnStyle = (extra={}) => ({ padding: "8px 16px", borderRadius: 10, border: `1px solid ${C.border}`, background: "#fff", color: C.text, cursor: "pointer", fontSize: 13, fontWeight: 500, ...extra });

  const TABS = [["home","🏠","Home"],["tracker","📋","Track"],["budget","⚙️","Budget"]];

  if (!loaded) return React.createElement("div", { style: { padding: 40, textAlign: "center", color: C.muted, fontFamily: "-apple-system,sans-serif", fontSize: 16 } }, "Loading...");

  return React.createElement("div", { style: { fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: C.bg, minHeight: "100vh", paddingBottom: 80 } },

    // ── TOP HEADER ──
    React.createElement("div", { style: { background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)", padding: "48px 20px 20px", position: "sticky", top: 0, zIndex: 100 } },
      React.createElement("div", { style: { maxWidth: 600, margin: "0 auto" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement("button", { onClick: () => { const d = new Date(year, monthIdx-1); setMonthIdx(d.getMonth()); setYear(d.getFullYear()); }, style: { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer", fontSize: 18, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" } }, "‹"),
            React.createElement("span", { style: { color: "#fff", fontSize: 18, fontWeight: 700 } }, `${MONTHS[monthIdx]} ${year}`),
            React.createElement("button", { onClick: () => { const d = new Date(year, monthIdx+1); setMonthIdx(d.getMonth()); setYear(d.getFullYear()); }, style: { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer", fontSize: 18, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" } }, "›"),
          ),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            React.createElement("button", { onClick: saveNow, style: { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer", fontSize: 13, borderRadius: 8, padding: "6px 10px", fontWeight: 500 } }, saveStatus === "saved" ? "✓ Saved" : saveStatus === "saving" ? "..." : "💾"),
            React.createElement("button", { onClick: () => setShowBackup(true), style: { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer", fontSize: 13, borderRadius: 8, padding: "6px 10px" } }, "📋"),
          )
        )
      )
    ),

    // ── BACKUP MODAL ──
    showBackup && React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } },
      React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 20, width: "100%", maxWidth: 500 } },
        React.createElement("div", { style: { fontWeight: 700, fontSize: 16, marginBottom: 8 } }, "📋 Backup Data"),
        React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 10 } }, "Select all → Copy → Paste into TextEdit → Save as budget-backup.json"),
        React.createElement("textarea", { readOnly: true, value: backupText, style: { width: "100%", height: 180, fontSize: 11, fontFamily: "monospace", padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, resize: "none" }, onClick: e => e.target.select() }),
        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } },
          React.createElement("label", { style: btnStyle({ flex: 1, textAlign: "center", cursor: "pointer" }) }, "⬆ Import JSON",
            React.createElement("input", { type: "file", accept: ".json", onChange: importData, style: { display: "none" } })
          ),
          React.createElement("button", { onClick: exportCSV, style: btnStyle({ flex: 1 }) }, "⬇ CSV"),
          React.createElement("button", { onClick: () => setShowBackup(false), style: btnStyle({ background: C.success, color: "#fff", border: "none" }) }, "Close"),
        )
      )
    ),

    React.createElement("div", { style: { maxWidth: 600, margin: "0 auto", padding: "16px 16px 0" } },

      // ── HOME TAB ──
      tab === "home" && React.createElement(React.Fragment, null,

        // Big balance card
        React.createElement("div", { style: { ...cardStyle, background: "linear-gradient(135deg, #1D9E75, #0F6E56)", border: "none" } },
          React.createElement("div", { style: { padding: 20 } },
            React.createElement("div", { style: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 4 } }, "Remaining budget"),
            React.createElement("div", { style: { color: "#fff", fontSize: 36, fontWeight: 800, letterSpacing: -1 } }, fmt(summary.remaining)),
            React.createElement("div", { style: { display: "flex", gap: 20, marginTop: 16 } },
              ...[
                { label: "Income", value: fmt(summary.bI) },
                { label: "Budgeted", value: fmt(summary.bE) },
                { label: "Spent", value: fmt(summary.aE) },
              ].map(s => React.createElement("div", { key: s.label },
                React.createElement("div", { style: { color: "rgba(255,255,255,0.7)", fontSize: 11 } }, s.label),
                React.createElement("div", { style: { color: "#fff", fontSize: 16, fontWeight: 700 } }, s.value),
              ))
            )
          )
        ),

        // Insights row
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 } },
          React.createElement("div", { style: cardStyle },
            React.createElement("div", { style: { padding: 14 } },
              React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 4 } }, "🔥 Top spending"),
              topCat ? React.createElement(React.Fragment, null,
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700 } }, `${topCat.emoji} ${topCat.label}`),
                React.createElement("div", { style: { fontSize: 13, color: C.danger, fontWeight: 600 } }, fmt(topCat.value)),
              ) : React.createElement("div", { style: { fontSize: 13, color: C.muted } }, "No data yet"),
            )
          ),
          React.createElement("div", { style: cardStyle },
            React.createElement("div", { style: { padding: 14 } },
              React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 4 } }, "📅 vs last month"),
              React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: summary.aE > prevTotal ? C.danger : C.success } },
                summary.aE > prevTotal ? `▲ ${fmt(summary.aE - prevTotal)}` : `▼ ${fmt(prevTotal - summary.aE)}`
              ),
              React.createElement("div", { style: { fontSize: 11, color: C.muted } }, `Last: ${fmt(prevTotal)}`),
            )
          ),
        ),

        // Donut chart
        React.createElement("div", { style: cardStyle },
          React.createElement("div", { style: { padding: 16 } },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 15, marginBottom: 12 } }, "Spending breakdown"),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16 } },
              React.createElement("div", { style: { width: 140, flexShrink: 0 } },
                React.createElement(DonutChart, { data: donutData, total: summary.aE || 1, centerLabel: fmt(summary.aE), centerSub: "spent" })
              ),
              React.createElement("div", { style: { flex: 1 } },
                donutData.slice(0, 6).map(d => React.createElement("div", { key: d.label, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } },
                  React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 } }),
                  React.createElement("span", { style: { fontSize: 12, flex: 1, color: C.text } }, d.label),
                  React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: C.muted } }, `${Math.round(d.value/summary.aE*100)}%`),
                ))
              )
            )
          )
        ),

        // Bar chart — last 6 months
        React.createElement("div", { style: cardStyle },
          React.createElement("div", { style: { padding: 16 } },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 15, marginBottom: 12 } }, "Last 6 months"),
            React.createElement(BarChart, { monthData: barData }),
          )
        ),

        // Category progress bars
        React.createElement("div", { style: cardStyle },
          React.createElement("div", { style: { padding: 16 } },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 15, marginBottom: 12 } }, "Category breakdown"),
            cats.filter(c => c.type === "expense").map(cat => {
              const t = totals[cat.id];
              const pct = t.budget > 0 ? Math.min(100, (t.actual / t.budget) * 100) : 0;
              const over = t.actual > t.budget && t.budget > 0;
              return React.createElement("div", { key: cat.id, style: { marginBottom: 12 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
                  React.createElement("span", { style: { fontSize: 13, fontWeight: 500 } }, `${cat.emoji} ${cat.name}`),
                  React.createElement("span", { style: { fontSize: 12, color: over ? C.danger : C.muted } }, `${fmt(t.actual)} / ${fmt(t.budget)}`),
                ),
                React.createElement("div", { style: { height: 6, background: "#f0ede8", borderRadius: 3, overflow: "hidden" } },
                  React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: over ? C.danger : cat.color, borderRadius: 3, transition: "width 0.4s ease" } })
                )
              );
            })
          )
        ),
      ),

      // ── TRACKER TAB ──
      tab === "tracker" && cats.map(cat => {
        const t = totals[cat.id];
        const over = cat.type === "expense" && t.actual > t.budget && t.budget > 0;
        const catExpanded = expandedCats[cat.id] !== false;
        return React.createElement("div", { key: cat.id, style: cardStyle },
          React.createElement("div", { onClick: () => toggleCat(cat.id), style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", borderLeft: `4px solid ${cat.color}` } },
            React.createElement("span", { style: { fontSize: 18 } }, cat.emoji),
            React.createElement("span", { style: { flex: 1, fontWeight: 600, fontSize: 14 } }, cat.name),
            cat.type === "expense" && t.budget > 0 && React.createElement("div", { style: { width: 50, height: 5, background: C.border, borderRadius: 3, overflow: "hidden", marginRight: 4 } },
              React.createElement("div", { style: { height: "100%", width: `${Math.min(100,(t.actual/t.budget)*100)}%`, background: over ? C.danger : cat.color, borderRadius: 3 } })
            ),
            React.createElement("span", { style: { fontSize: 12, color: over ? C.danger : C.muted, minWidth: 90, textAlign: "right" } }, `${fmt(t.actual)} / ${fmt(t.budget)}`),
            React.createElement("span", { style: { fontSize: 10, color: C.muted, marginLeft: 4 } }, catExpanded ? "▲" : "▼"),
          ),
          catExpanded && cat.items.map(item => {
            const actual = getActual(cat.id, item.id);
            const budget = getBudget(makeBudgetKey(cat.id, item.id));
            const itemOver = cat.type === "expense" && actual > budget && budget > 0;
            const txList = getTxList(cat.id, item.id);
            const itemKey = `${cat.id}_${item.id}`;
            const txOpen = expandedItems[itemKey];
            const d = txDraft[itemKey] || {};
            return React.createElement("div", { key: item.id, style: { borderTop: `1px solid ${C.border}` } },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px 10px 18px" } },
                React.createElement("button", { onClick: () => toggleItem(itemKey), style: { background: "transparent", border: "none", cursor: "pointer", color: C.muted, fontSize: 11, padding: "0 4px 0 0" } }, txOpen ? "▼" : "▶"),
                React.createElement("span", { style: { flex: 1, color: C.muted, fontSize: 13 } }, item.name),
                React.createElement("span", { style: { fontSize: 11, color: "#ccc", marginRight: 6 } }, fmt(budget)),
                React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: itemOver ? C.danger : C.text } }, fmt(actual)),
                txList.length > 0 && React.createElement("span", { style: { fontSize: 10, color: C.muted, marginLeft: 4, background: C.bg, borderRadius: 10, padding: "1px 6px" } }, txList.length),
              ),
              txOpen && React.createElement("div", { style: { background: "#fafaf8", borderTop: `1px solid ${C.border}`, padding: "10px 14px 10px 26px" } },
                txList.length > 0 && React.createElement("div", { style: { marginBottom: 10 } },
                  txList.map(tx => React.createElement("div", { key: tx.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${C.border}` } },
                    React.createElement("span", { style: { fontSize: 11, color: C.muted, minWidth: 50 } }, tx.date.slice(5)),
                    React.createElement("span", { style: { flex: 1, fontSize: 13 } }, tx.desc || "—"),
                    React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, fmt(tx.amount)),
                    React.createElement("button", { onClick: () => removeTx(cat.id, item.id, tx.id), style: { background: "transparent", border: "none", color: "#ccc", cursor: "pointer", fontSize: 18, padding: "0 2px" } }, "×"),
                  )),
                  React.createElement("div", { style: { textAlign: "right", fontSize: 12, fontWeight: 700, paddingTop: 4, color: itemOver ? C.danger : C.success } }, `Total: ${fmt(actual)}`),
                ),
                React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" } },
                  React.createElement("input", { type: "date", value: d.date || `${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`, onChange: e => draftSet(cat.id, item.id, "date", e.target.value), style: inp(110) }),
                  React.createElement("input", { type: "text", placeholder: "Description", value: d.desc||"", onChange: e => draftSet(cat.id, item.id, "desc", e.target.value), onKeyDown: e => e.key==="Enter" && addTx(cat.id, item.id), style: inp("auto", { flex: 1, minWidth: 80 }) }),
                  React.createElement("input", { type: "number", placeholder: "₪", value: d.amount||"", onChange: e => draftSet(cat.id, item.id, "amount", e.target.value), onKeyDown: e => e.key==="Enter" && addTx(cat.id, item.id), style: inp(70, { textAlign: "right" }) }),
                  React.createElement("button", { onClick: () => addTx(cat.id, item.id), style: btnStyle({ background: cat.color, color: "#fff", border: "none", padding: "8px 12px" }) }, "+ Add"),
                )
              )
            );
          })
        );
      }),

      // ── BUDGET TAB ──
      tab === "budget" && React.createElement(React.Fragment, null,
        cats.map(cat => {
          const bExpanded = expandedCats["b_"+cat.id] !== false;
          return React.createElement("div", { key: cat.id, style: cardStyle },
            React.createElement("div", { onClick: () => setExpandedCats(p => ({...p,["b_"+cat.id]:!p["b_"+cat.id]})), style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", borderLeft: `4px solid ${cat.color}` } },
              React.createElement("span", { style: { fontSize: 18 } }, cat.emoji),
              React.createElement("span", { style: { flex: 1, fontWeight: 600, fontSize: 14 } }, cat.name),
              React.createElement("span", { style: { fontSize: 12, color: C.muted } }, fmt(totals[cat.id].budget)),
              React.createElement("button", { onClick: e => { e.stopPropagation(); removeCat(cat.id); }, style: { background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 20, padding: "0 4px" } }, "×"),
              React.createElement("span", { style: { fontSize: 10, color: C.muted } }, bExpanded ? "▲" : "▼"),
            ),
            bExpanded && React.createElement(React.Fragment, null,
              cat.items.map(item => React.createElement("div", { key: item.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderTop: `1px solid ${C.border}` } },
                React.createElement("span", { style: { flex: 1, color: C.muted, fontSize: 13 } }, item.name),
                React.createElement("span", { style: { fontSize: 13, color: C.muted } }, "₪"),
                React.createElement("input", { type: "number", min: "0", value: getBudget(makeBudgetKey(cat.id, item.id))||"", placeholder: "0", onChange: e => setBudgetVal(makeBudgetKey(cat.id, item.id), e.target.value), style: inp(90, { textAlign: "right" }) }),
                React.createElement("button", { onClick: () => removeItem(cat.id, item.id), style: { background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 18 } }, "×"),
              )),
              React.createElement("div", { style: { display: "flex", gap: 8, padding: "10px 14px", borderTop: `1px solid ${C.border}` } },
                React.createElement("input", { placeholder: "New line item...", value: newItemName[cat.id]||"", onChange: e => setNewItemName(p=>({...p,[cat.id]:e.target.value})), onKeyDown: e => e.key==="Enter" && addItem(cat.id), style: inp("auto", { flex: 1 }) }),
                React.createElement("button", { onClick: () => addItem(cat.id), style: btnStyle() }, "+ Add"),
              )
            )
          );
        }),
        React.createElement("div", { style: { ...cardStyle, padding: 14 } },
          React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 10, fontWeight: 500 } }, "Add new category"),
          React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
            React.createElement("input", { placeholder: "Name...", value: newCatName, onChange: e => setNewCatName(e.target.value), onKeyDown: e => e.key==="Enter" && addCat(), style: inp("auto", { flex: 2, minWidth: 120 }) }),
            React.createElement("select", { value: newCatType, onChange: e => setNewCatType(e.target.value), style: inp("auto", { flex: 1, minWidth: 90 }) },
              React.createElement("option", { value: "expense" }, "Expense"),
              React.createElement("option", { value: "income" }, "Income"),
            ),
            React.createElement("button", { onClick: addCat, style: btnStyle({ background: C.success, color: "#fff", border: "none" }) }, "+ Add"),
          )
        )
      )
    ),

    // ── BOTTOM NAV ──
    React.createElement("div", { style: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${C.border}`, display: "flex", paddingBottom: "env(safe-area-inset-bottom)", zIndex: 100, boxShadow: "0 -2px 10px rgba(0,0,0,0.08)" } },
      TABS.map(([id, emoji, label]) =>
        React.createElement("button", { key: id, onClick: () => setTab(id), style: { flex: 1, padding: "10px 0 8px", background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 } },
          React.createElement("span", { style: { fontSize: 20 } }, emoji),
          React.createElement("span", { style: { fontSize: 10, fontWeight: 600, color: tab === id ? C.success : C.muted } }, label),
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
