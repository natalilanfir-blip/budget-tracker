const { useState, useMemo, useEffect, useCallback } = React;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const NOW = new Date();
const CUR_MONTH = NOW.getMonth();
const CUR_YEAR = NOW.getFullYear();

const DEFAULT_CATEGORIES = [
  { id: "income", name: "Income", type: "income", color: "#1D9E75", items: [
    { id: "salary", name: "Salary (משכורת)" }, { id: "side", name: "Side income" },
  ]},
  { id: "housing", name: "Housing & utilities", type: "expense", color: "#378ADD", items: [
    { id: "rent", name: "Rent / mortgage" }, { id: "electric", name: "Electricity" },
    { id: "water", name: "Water" }, { id: "internet", name: "Internet & phone" }, { id: "vaad", name: "Vaad bayit" },
  ]},
  { id: "food", name: "Food & groceries", type: "expense", color: "#EF9F27", items: [
    { id: "supermarket", name: "Supermarket" }, { id: "restaurants", name: "Restaurants" }, { id: "coffee", name: "Coffee" },
  ]},
  { id: "transport", name: "Transport", type: "expense", color: "#7F77DD", items: [
    { id: "fuel", name: "Fuel" }, { id: "transit", name: "Public transit" },
    { id: "carins", name: "Car insurance" }, { id: "gett", name: "Gett/Train" },
  ]},
  { id: "health", name: "Health & insurance", type: "expense", color: "#D85A30", items: [
    { id: "kupat", name: "Kupat holim" }, { id: "insurance", name: "Insurance" },
    { id: "meds", name: "Medications" }, { id: "gym", name: "Gym" },
  ]},
  { id: "entertainment", name: "Entertainment", type: "expense", color: "#D4537E", items: [
    { id: "subs", name: "Subscriptions" }, { id: "outings", name: "Outings" },
    { id: "spotify", name: "Spotify, Google, Apple Subscriptions" }, { id: "concerts", name: "Concert, Event, etc." },
  ]},
  { id: "savings", name: "Savings & investments", type: "expense", color: "#0F6E56", items: [
    { id: "emergency", name: "Emergency fund" }, { id: "invest", name: "Investments" },
    { id: "roth", name: "Roth IRA" }, { id: "brokerage", name: "Brokerage" }, { id: "travel", name: "Travel" },
  ]},
  { id: "personal", name: "Personal", type: "expense", color: "#BA7517", items: [
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

// Pre-loaded transactions
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
const makeBudgetKey = (cId, iId) => `b_${cId}_${iId}`;
const makeTxKey = (cId, iId, mi) => `tx_${cId}_${iId}_${mi}`;
const SK_CATS = "bgt_cats";
const SK_VALS = "bgt_vals";
const SK_TX = "bgt_tx";

function App() {
  const [tab, setTab] = useState("tracker");
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

  const mi = monthIdx + year * 12;

  useEffect(() => {
    try {
      const c = localStorage.getItem(SK_CATS);
      const v = localStorage.getItem(SK_VALS);
      const t = localStorage.getItem(SK_TX);
      if (c) setCats(JSON.parse(c));
      if (v) setValues(JSON.parse(v));
      if (t) setTransactions(JSON.parse(t));
    } catch {}
    setLoaded(true);
  }, []);

  const saveNow = useCallback(async () => {
    setSaveStatus("saving");
    try {
      localStorage.setItem(SK_CATS, JSON.stringify(cats));
      localStorage.setItem(SK_VALS, JSON.stringify(values));
      localStorage.setItem(SK_TX, JSON.stringify(transactions));
      setLastSaved(new Date());
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch {
      setSaveStatus("error");
    }
  }, [cats, values, transactions]);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(saveNow, 800);
    return () => clearTimeout(t);
  }, [cats, values, transactions, loaded]);

  const getBudget = k => values[k] || 0;
  const setBudget = (k, v) => setValues(p => ({ ...p, [k]: Number(v) || 0 }));
  const getTxList = (cId, iId) => transactions[makeTxKey(cId, iId, mi)] || [];
  const getActual = (cId, iId) => getTxList(cId, iId).reduce((s, tx) => s + tx.amount, 0);

  const addTx = (cId, iId) => {
    const d = txDraft[`${cId}_${iId}`] || {};
    const amt = parseFloat(d.amount);
    if (!amt || amt <= 0) return;
    const key = makeTxKey(cId, iId, mi);
    const tx = { id: Date.now(), desc: d.desc || "", amount: amt,
      date: d.date || `${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}` };
    setTransactions(p => ({ ...p, [key]: [...(p[key] || []), tx] }));
    setTxDraft(p => ({ ...p, [`${cId}_${iId}`]: { desc: "", amount: "", date: tx.date } }));
  };

  const removeTx = (cId, iId, txId) => {
    const key = makeTxKey(cId, iId, mi);
    setTransactions(p => ({ ...p, [key]: (p[key] || []).filter(t => t.id !== txId) }));
  };

  const totals = useMemo(() => {
    const t = {};
    cats.forEach(cat => {
      t[cat.id] = { budget: 0, actual: 0 };
      cat.items.forEach(item => {
        t[cat.id].budget += getBudget(makeBudgetKey(cat.id, item.id));
        t[cat.id].actual += getActual(cat.id, item.id);
      });
    });
    return t;
  }, [cats, values, transactions, mi]);

  const summary = useMemo(() => {
    const inc = cats.filter(c => c.type === "income");
    const exp = cats.filter(c => c.type === "expense");
    const bI = inc.reduce((s, c) => s + totals[c.id].budget, 0);
    const aI = inc.reduce((s, c) => s + totals[c.id].actual, 0);
    const bE = exp.reduce((s, c) => s + totals[c.id].budget, 0);
    const aE = exp.reduce((s, c) => s + totals[c.id].actual, 0);
    return { bI, aI, bE, aE, bBal: bI - bE, aBal: aI - aE };
  }, [cats, totals]);

  const exportData = () => {
    const data = { cats, values, transactions, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "budget-backup.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.cats) setCats(data.cats);
        if (data.values) setValues(data.values);
        if (data.transactions) setTransactions(data.transactions);
        setTimeout(saveNow, 500);
        alert("✅ Data imported successfully!");
      } catch {
        alert("❌ Invalid backup file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const exportCSV = () => {
    const rows = [["Date", "Month", "Category", "Item", "Description", "Amount (₪)"]];
    cats.forEach(cat => {
      cat.items.forEach(item => {
        Object.entries(transactions).forEach(([key, txList]) => {
          if (!key.startsWith(`tx_${cat.id}_${item.id}_`)) return;
          txList.forEach(tx => {
            const d = new Date(tx.date);
            rows.push([tx.date, MONTHS[d.getMonth()], cat.name, item.name, tx.desc || "", tx.amount]);
          });
        });
      });
    });
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "budget_transactions.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const addCat = () => {
    if (!newCatName.trim()) return;
    setCats(p => [...p, { id: "cat_" + Date.now(), name: newCatName.trim(), type: newCatType, color: "#888780", items: [] }]);
    setNewCatName("");
  };
  const addItem = catId => {
    const name = (newItemName[catId] || "").trim();
    if (!name) return;
    setCats(p => p.map(c => c.id === catId ? { ...c, items: [...c.items, { id: "item_" + Date.now(), name }] } : c));
    setNewItemName(p => ({ ...p, [catId]: "" }));
  };
  const removeItem = (cId, iId) => setCats(p => p.map(c => c.id === cId ? { ...c, items: c.items.filter(i => i.id !== iId) } : c));
  const removeCat = cId => setCats(p => p.filter(c => c.id !== cId));
  const toggleCat = id => setExpandedCats(p => ({ ...p, [id]: p[id] === false ? true : false }));
  const toggleItem = key => setExpandedItems(p => ({ ...p, [key]: !p[key] }));
  const draftSet = (cId, iId, field, val) => setTxDraft(p => ({ ...p, [`${cId}_${iId}`]: { ...(p[`${cId}_${iId}`] || {}), [field]: val } }));

  // Styles
  const colors = { bg: "#f5f5f0", card: "#ffffff", border: "#e8e6e0", text: "#1a1a18", muted: "#888780", success: "#1D9E75", danger: "#D85A30" };
  const card = { background: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", marginBottom: 10 };
  const inp = (w, extra={}) => ({ width: w, padding: "6px 8px", borderRadius: 8, border: `1px solid ${colors.border}`, background: "#fff", color: colors.text, fontSize: 14, ...extra });
  const btn = (extra={}) => ({ padding: "6px 14px", borderRadius: 8, border: `1px solid ${colors.border}`, background: "#fff", color: colors.text, cursor: "pointer", fontSize: 13, ...extra });

  if (!loaded) return React.createElement("div", { style: { padding: 32, textAlign: "center", color: colors.muted, fontFamily: "-apple-system, sans-serif" } }, "Loading...");

  return React.createElement("div", { style: { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 14, color: colors.text, paddingTop: "env(safe-area-inset-top)" } },

    // Header
    React.createElement("div", { style: { background: colors.success, padding: "16px 16px 12px", position: "sticky", top: 0, zIndex: 100 } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 680, margin: "0 auto" } },
        React.createElement("div", { style: { display: "flex", gap: 6 } },
          ...[["tracker","Tracker"],["budget","Budgets"]].map(([id, label]) =>
            React.createElement("button", { key: id, onClick: () => setTab(id), style: { padding: "6px 14px", borderRadius: 8, border: "none", background: tab === id ? "#fff" : "transparent", color: tab === id ? colors.success : "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500 } }, label)
          )
        ),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
          React.createElement("button", { onClick: () => { const d = new Date(year, monthIdx-1); setMonthIdx(d.getMonth()); setYear(d.getFullYear()); }, style: { background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 18, padding: "0 4px" } }, "‹"),
          React.createElement("span", { style: { color: "#fff", fontSize: 14, fontWeight: 600, minWidth: 80, textAlign: "center" } }, `${MONTHS[monthIdx]} ${year}`),
          React.createElement("button", { onClick: () => { const d = new Date(year, monthIdx+1); setMonthIdx(d.getMonth()); setYear(d.getFullYear()); }, style: { background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 18, padding: "0 4px" } }, "›"),
        )
      )
    ),

    React.createElement("div", { style: { maxWidth: 680, margin: "0 auto", padding: 16 } },

      // Save bar
      React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" } },
        React.createElement("button", { onClick: saveNow, style: btn({ background: colors.success, color: "#fff", border: "none", fontWeight: 500 }) }, "💾 Save"),
        React.createElement("button", { onClick: exportCSV, style: btn() }, "⬇ CSV"),
        React.createElement("button", { onClick: exportData, style: btn() }, "⬇ Backup"),
        React.createElement("label", { style: btn({ cursor: "pointer" }) }, "⬆ Import",
          React.createElement("input", { type: "file", accept: ".json", onChange: importData, style: { display: "none" } })
        ),
        saveStatus === "saving" && React.createElement("span", { style: { fontSize: 12, color: colors.muted } }, "saving..."),
        saveStatus === "saved" && React.createElement("span", { style: { fontSize: 12, color: colors.success } }, "✓ saved"),
        saveStatus === "error" && React.createElement("span", { style: { fontSize: 12, color: colors.danger } }, "✗ failed"),
        lastSaved && !saveStatus && React.createElement("span", { style: { fontSize: 11, color: colors.muted } }, `last saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`),
      ),

      // Summary cards
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 } },
        ...[
          { label: "Budget bal.", value: fmt(summary.bBal), color: summary.bBal >= 0 ? colors.success : colors.danger },
          { label: "Actual bal.", value: fmt(summary.aBal), color: summary.aBal >= 0 ? colors.success : colors.danger },
          { label: "Spent/Budget", value: `${fmt(summary.aE)}/${fmt(summary.bE)}`, color: summary.aE > summary.bE ? colors.danger : colors.success },
        ].map(c => React.createElement("div", { key: c.label, style: { background: colors.card, borderRadius: 12, padding: "10px 10px", border: `1px solid ${colors.border}` } },
          React.createElement("div", { style: { fontSize: 10, color: colors.muted, marginBottom: 3 } }, c.label),
          React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: c.color } }, c.value),
        ))
      ),

      // TRACKER TAB
      tab === "tracker" && cats.map(cat => {
        const t = totals[cat.id];
        const over = cat.type === "expense" && t.actual > t.budget && t.budget > 0;
        const catExpanded = expandedCats[cat.id] !== false;
        return React.createElement("div", { key: cat.id, style: card },
          React.createElement("div", { onClick: () => toggleCat(cat.id), style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", cursor: "pointer", background: "#fafaf8", borderLeft: `3px solid ${cat.color}` } },
            React.createElement("span", { style: { flex: 1, fontWeight: 600, fontSize: 14 } }, cat.name),
            cat.type === "expense" && t.budget > 0 && React.createElement("div", { style: { width: 60, height: 5, background: colors.border, borderRadius: 3, overflow: "hidden" } },
              React.createElement("div", { style: { height: "100%", width: `${Math.min(100,(t.actual/t.budget)*100)}%`, background: over ? colors.danger : cat.color, borderRadius: 3 } })
            ),
            React.createElement("span", { style: { fontSize: 12, color: over ? colors.danger : colors.muted, minWidth: 90, textAlign: "right" } }, `${fmt(t.actual)} / ${fmt(t.budget)}`),
            React.createElement("span", { style: { fontSize: 10, color: colors.muted } }, catExpanded ? "▲" : "▼"),
          ),
          catExpanded && cat.items.map(item => {
            const actual = getActual(cat.id, item.id);
            const budget = getBudget(makeBudgetKey(cat.id, item.id));
            const itemOver = cat.type === "expense" && actual > budget && budget > 0;
            const txList = getTxList(cat.id, item.id);
            const itemKey = `${cat.id}_${item.id}`;
            const txOpen = expandedItems[itemKey];
            const d = txDraft[itemKey] || {};
            return React.createElement("div", { key: item.id, style: { borderTop: `1px solid ${colors.border}` } },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, padding: "8px 12px 8px 16px" } },
                React.createElement("button", { onClick: () => toggleItem(itemKey), style: { background: "transparent", border: "none", cursor: "pointer", color: colors.muted, fontSize: 10, padding: "0 4px 0 0" } }, txOpen ? "▼" : "▶"),
                React.createElement("span", { style: { flex: 1, color: colors.muted, fontSize: 13 } }, item.name),
                React.createElement("span", { style: { fontSize: 11, color: "#bbb", marginRight: 4 } }, `bdg:${fmt(budget)}`),
                React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: itemOver ? colors.danger : colors.text } }, fmt(actual)),
                txList.length > 0 && React.createElement("span", { style: { fontSize: 10, color: colors.muted, marginLeft: 4 } }, `${txList.length}tx`),
              ),
              txOpen && React.createElement("div", { style: { background: "#f9f9f6", borderTop: `1px solid ${colors.border}`, padding: "8px 12px 8px 28px" } },
                txList.length > 0 && React.createElement("div", { style: { marginBottom: 8 } },
                  txList.map(tx => React.createElement("div", { key: tx.id, style: { display: "flex", alignItems: "center", gap: 6, padding: "4px 0", borderBottom: `1px solid ${colors.border}` } },
                    React.createElement("span", { style: { fontSize: 11, color: colors.muted, minWidth: 50 } }, tx.date.slice(5)),
                    React.createElement("span", { style: { flex: 1, fontSize: 12, color: colors.muted } }, tx.desc || "—"),
                    React.createElement("span", { style: { fontSize: 13, fontWeight: 500 } }, fmt(tx.amount)),
                    React.createElement("button", { onClick: () => removeTx(cat.id, item.id, tx.id), style: { background: "transparent", border: "none", color: "#ccc", cursor: "pointer", fontSize: 16, padding: "0 2px" } }, "×"),
                  )),
                  React.createElement("div", { style: { textAlign: "right", fontSize: 12, fontWeight: 600, paddingTop: 4, color: itemOver ? colors.danger : colors.text } }, `Total: ${fmt(actual)}`),
                ),
                React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" } },
                  React.createElement("input", { type: "date", value: d.date || `${year}-${String(monthIdx+1).padStart(2,"0")}-${String(NOW.getDate()).padStart(2,"0")}`, onChange: e => draftSet(cat.id, item.id, "date", e.target.value), style: inp(110) }),
                  React.createElement("input", { type: "text", placeholder: "Description", value: d.desc || "", onChange: e => draftSet(cat.id, item.id, "desc", e.target.value), onKeyDown: e => e.key === "Enter" && addTx(cat.id, item.id), style: inp("auto", { flex: 1, minWidth: 80 }) }),
                  React.createElement("input", { type: "number", placeholder: "₪", value: d.amount || "", onChange: e => draftSet(cat.id, item.id, "amount", e.target.value), onKeyDown: e => e.key === "Enter" && addTx(cat.id, item.id), style: inp(70, { textAlign: "right" }) }),
                  React.createElement("button", { onClick: () => addTx(cat.id, item.id), style: btn({ background: cat.color, color: "#fff", border: "none", fontWeight: 500 }) }, "+ Add"),
                )
              )
            );
          })
        );
      }),

      // BUDGET TAB
      tab === "budget" && React.createElement(React.Fragment, null,
        cats.map(cat => {
          const bExpanded = expandedCats["b_" + cat.id] !== false;
          return React.createElement("div", { key: cat.id, style: card },
            React.createElement("div", { onClick: () => setExpandedCats(p => ({ ...p, ["b_" + cat.id]: !p["b_" + cat.id] })), style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", cursor: "pointer", background: "#fafaf8", borderLeft: `3px solid ${cat.color}` } },
              React.createElement("span", { style: { flex: 1, fontWeight: 600, fontSize: 14 } }, cat.name),
              React.createElement("span", { style: { fontSize: 12, color: colors.muted } }, `${fmt(totals[cat.id].budget)} budgeted`),
              React.createElement("button", { onClick: e => { e.stopPropagation(); removeCat(cat.id); }, style: { background: "transparent", border: "none", color: colors.muted, cursor: "pointer", fontSize: 18, padding: "0 4px" } }, "×"),
              React.createElement("span", { style: { fontSize: 10, color: colors.muted } }, bExpanded ? "▲" : "▼"),
            ),
            bExpanded && React.createElement(React.Fragment, null,
              cat.items.map(item => React.createElement("div", { key: item.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 12px 8px 20px", borderTop: `1px solid ${colors.border}` } },
                React.createElement("span", { style: { flex: 1, color: colors.muted, fontSize: 13 } }, item.name),
                React.createElement("span", { style: { fontSize: 13, color: colors.muted } }, "₪"),
                React.createElement("input", { type: "number", min: "0", value: getBudget(makeBudgetKey(cat.id, item.id)) || "", placeholder: "0", onChange: e => setBudget(makeBudgetKey(cat.id, item.id), e.target.value), style: inp(90, { textAlign: "right" }) }),
                React.createElement("button", { onClick: () => removeItem(cat.id, item.id), style: { background: "transparent", border: "none", color: colors.muted, cursor: "pointer", fontSize: 16 } }, "×"),
              )),
              React.createElement("div", { style: { display: "flex", gap: 6, padding: "8px 12px", borderTop: `1px solid ${colors.border}` } },
                React.createElement("input", { placeholder: "New line item...", value: newItemName[cat.id] || "", onChange: e => setNewItemName(p => ({ ...p, [cat.id]: e.target.value })), onKeyDown: e => e.key === "Enter" && addItem(cat.id), style: inp("auto", { flex: 1 }) }),
                React.createElement("button", { onClick: () => addItem(cat.id), style: btn() }, "+ Add"),
              )
            )
          );
        }),
        React.createElement("div", { style: { ...card, padding: 12 } },
          React.createElement("div", { style: { fontSize: 12, color: colors.muted, marginBottom: 8 } }, "Add new category"),
          React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
            React.createElement("input", { placeholder: "Category name...", value: newCatName, onChange: e => setNewCatName(e.target.value), onKeyDown: e => e.key === "Enter" && addCat(), style: inp("auto", { flex: 2, minWidth: 120 }) }),
            React.createElement("select", { value: newCatType, onChange: e => setNewCatType(e.target.value), style: inp("auto", { flex: 1, minWidth: 90 }) },
              React.createElement("option", { value: "expense" }, "Expense"),
              React.createElement("option", { value: "income" }, "Income"),
            ),
            React.createElement("button", { onClick: addCat, style: btn() }, "+ Category"),
          )
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
