import { useState, useMemo } from "react";

const TIERS = [
  {
    id: "budget",
    name: "Cosmetic Refresh",
    tag: "Preserve Value",
    color: "#2D6A4F",
    accent: "#40916C",
    light: "#D8F3DC",
    description: "Surface-level updates to maintain tenant appeal and prevent rent erosion. Ideal for units between tenants.",
    rentImpactPerCat: { kitchen: 30, bathroom: 25, flooring: 20, paint: 15, fixtures: 10, appliances: 10, exterior: 15, hvac: 5 },
    timelineWeeks: [1, 2],
  },
  {
    id: "mid",
    name: "Standard Upgrade",
    tag: "Grow Rents",
    color: "#1B4965",
    accent: "#5FA8D3",
    light: "#CAE9FF",
    description: "Meaningful improvements that modernize the unit and justify a rent increase. Best ROI tier for most Seattle markets.",
    rentImpactPerCat: { kitchen: 75, bathroom: 60, flooring: 45, paint: 30, fixtures: 25, appliances: 40, exterior: 35, hvac: 20 },
    timelineWeeks: [3, 5],
  },
  {
    id: "premium",
    name: "Full Renovation",
    tag: "Reposition Asset",
    color: "#6B2737",
    accent: "#C9556B",
    light: "#FADADD",
    description: "Gut-level renovation to reposition the property into a higher rent class. Best for distressed acquisitions in Seattle.",
    rentImpactPerCat: { kitchen: 120, bathroom: 100, flooring: 70, paint: 45, fixtures: 40, appliances: 65, exterior: 60, hvac: 50 },
    timelineWeeks: [6, 12],
  },
];

const CATEGORIES = [
  {
    id: "kitchen",
    icon: "🍳",
    name: "Kitchen",
    tiers: {
      budget: {
        cost: [1200, 2200],
        scope: [
          "Deep clean & degrease all surfaces",
          "Paint or reface cabinet fronts",
          "Replace hardware (pulls, knobs)",
          "Install new faucet",
          "Replace outlet covers & switch plates",
        ],
      },
      mid: {
        cost: [5500, 10000],
        scope: [
          "New laminate or butcher block countertops",
          "Full cabinet repaint with new soft-close hinges",
          "New stainless steel sink & faucet",
          "Tile or peel-and-stick backsplash",
          "Under-cabinet LED lighting",
          "New LVP flooring",
        ],
      },
      premium: {
        cost: [15000, 30000],
        scope: [
          "New shaker-style cabinets",
          "Quartz or granite countertops",
          "Tile backsplash (subway or modern)",
          "New stainless steel appliance package",
          "Recessed lighting & pendant fixtures",
          "New LVP or tile flooring",
          "Fresh drywall & paint",
        ],
      },
    },
  },
  {
    id: "bathroom",
    icon: "🚿",
    name: "Bathroom",
    tiers: {
      budget: {
        cost: [800, 1800],
        scope: [
          "Re-caulk tub/shower & toilet base",
          "Replace toilet seat & supply line",
          "New faucet & showerhead",
          "Replace mirror & towel bars",
          "Deep clean grout or apply grout paint",
        ],
      },
      mid: {
        cost: [4000, 7500],
        scope: [
          "New vanity with countertop & mirror",
          "Replace toilet (elongated, comfort height)",
          "Tub refinishing or new surround insert",
          "New LVP or peel-and-stick tile flooring",
          "Updated light fixture & exhaust fan",
          "Fresh paint & new accessories",
        ],
      },
      premium: {
        cost: [10000, 22000],
        scope: [
          "New tile shower/tub surround",
          "Custom vanity or double sink",
          "New toilet, bidet seat optional",
          "Heated flooring or premium tile",
          "Glass shower door",
          "Recessed lighting & sconces",
          "Complete drywall, paint, & trim",
        ],
      },
    },
  },
  {
    id: "flooring",
    icon: "🪵",
    name: "Flooring",
    tiers: {
      budget: {
        cost: [800, 1600],
        scope: [
          "Deep clean existing carpet or hard surface",
          "Patch & repair damaged areas",
          "Paint concrete floors (basements/utility)",
          "Add area rugs for staging",
        ],
      },
      mid: {
        cost: [3000, 6500],
        scope: [
          "Install LVP throughout living areas",
          "New carpet in bedrooms (if preferred)",
          "New transition strips & baseboards",
          "Subfloor repair if needed",
        ],
      },
      premium: {
        cost: [7000, 14000],
        scope: [
          "Premium LVP or engineered hardwood throughout",
          "Tile in kitchen, bath, & entry",
          "New baseboards & shoe molding",
          "Subfloor leveling & moisture barrier",
          "Heated floors in bathrooms (optional)",
        ],
      },
    },
  },
  {
    id: "paint",
    icon: "🎨",
    name: "Paint & Walls",
    tiers: {
      budget: {
        cost: [600, 1400],
        scope: [
          "Touch-up paint on scuffs & marks",
          "Repaint accent walls",
          "Patch nail holes & minor drywall dings",
          "Clean or repaint trim & doors",
        ],
      },
      mid: {
        cost: [2200, 4500],
        scope: [
          "Full interior repaint (walls & ceilings)",
          "Drywall patching & skim coat where needed",
          "Paint all trim, doors, & closets",
          "Modern neutral color palette",
        ],
      },
      premium: {
        cost: [4500, 8000],
        scope: [
          "Full interior repaint with premium paint",
          "Complete drywall repair & texture matching",
          "New trim & crown molding where appropriate",
          "Accent wall treatments (shiplap, board & batten)",
          "Paint or replace all interior doors",
        ],
      },
    },
  },
  {
    id: "fixtures",
    icon: "💡",
    name: "Fixtures & Lighting",
    tiers: {
      budget: {
        cost: [300, 700],
        scope: [
          "Replace all outlet & switch covers (white)",
          "New LED bulbs throughout",
          "Replace broken or dated light covers",
          "Tighten or adjust loose fixtures",
        ],
      },
      mid: {
        cost: [1200, 2800],
        scope: [
          "New entry & hallway light fixtures",
          "Under-cabinet kitchen lighting",
          "New bathroom vanity lights",
          "Dimmer switches in living areas",
          "New doorknobs & deadbolts",
        ],
      },
      premium: {
        cost: [3000, 6500],
        scope: [
          "Recessed lighting package (kitchen, living)",
          "Statement pendant or chandelier",
          "Smart switches & dimmer system",
          "New door hardware throughout",
          "USB outlet upgrades",
          "Smart thermostat integration",
        ],
      },
    },
  },
  {
    id: "appliances",
    icon: "🧊",
    name: "Appliances",
    tiers: {
      budget: {
        cost: [0, 400],
        scope: [
          "Deep clean all existing appliances",
          "Replace burner drip pans & oven racks",
          "New microwave if missing or broken",
          "Replace fridge water filter & ice tray",
        ],
      },
      mid: {
        cost: [2200, 4500],
        scope: [
          "New range/oven (stainless or black)",
          "New dishwasher",
          "New over-the-range microwave",
          "Replace fridge if 10+ years old",
        ],
      },
      premium: {
        cost: [5000, 9500],
        scope: [
          "Full stainless steel appliance suite",
          "French door refrigerator",
          "Dishwasher (quiet model)",
          "Gas or induction range",
          "Washer/dryer (in-unit if plumbing allows)",
        ],
      },
    },
  },
  {
    id: "exterior",
    icon: "🏠",
    name: "Exterior / Curb Appeal",
    tiers: {
      budget: {
        cost: [500, 1200],
        scope: [
          "Power wash siding, walkways, & driveway",
          "Clean gutters & downspouts",
          "Basic landscaping cleanup & mulch",
          "Replace house numbers & mailbox",
          "Touch-up exterior paint (trim & door)",
        ],
      },
      mid: {
        cost: [2500, 6000],
        scope: [
          "Paint or stain front door & shutters",
          "New exterior light fixtures",
          "New porch railing or step repair",
          "Professional landscaping refresh",
          "Window cleaning & screen replacement",
        ],
      },
      premium: {
        cost: [7500, 18000],
        scope: [
          "Full exterior paint or siding repair",
          "New entry door with hardware",
          "New porch/deck boards or concrete work",
          "Landscape design with irrigation",
          "Privacy fencing or gates",
          "Security camera & smart doorbell",
        ],
      },
    },
  },
  {
    id: "hvac",
    icon: "❄️",
    name: "HVAC / Mechanical",
    tiers: {
      budget: {
        cost: [250, 700],
        scope: [
          "Replace HVAC filters & clean vents",
          "Service furnace & AC (tune-up)",
          "Flush water heater",
          "Check smoke & CO detectors",
          "Seal visible duct leaks with mastic",
        ],
      },
      mid: {
        cost: [1500, 4500],
        scope: [
          "Smart thermostat installation",
          "Duct cleaning & sealing",
          "Water heater replacement (standard)",
          "New smoke, CO, & fire extinguisher package",
          "Attic insulation top-up",
        ],
      },
      premium: {
        cost: [6000, 18000],
        scope: [
          "New furnace or heat pump",
          "New AC condenser or mini-split",
          "Tankless water heater",
          "Complete duct replacement",
          "Whole-house insulation upgrade",
          "Electrical panel upgrade (if needed)",
        ],
      },
    },
  },
];

function formatCurrency(val) {
  return "$" + val.toLocaleString();
}

function CostBar({ low, high, maxVal, color }) {
  const pct = (high / maxVal) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
      <div style={{ flex: 1, height: 8, background: "#e8e8e8", borderRadius: 4, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#444", minWidth: 140, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>
        {formatCurrency(low)} – {formatCurrency(high)}
      </span>
    </div>
  );
}

function TierCard({ tier, isSelected, onClick, unitCount, totalCost, rentImpact }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, minWidth: 220, padding: "24px 20px",
      border: isSelected ? `2.5px solid ${tier.color}` : "2px solid #e0e0e0",
      borderRadius: 14, background: isSelected ? tier.light : "#fff",
      cursor: "pointer", textAlign: "left", transition: "all 0.25s ease",
      boxShadow: isSelected ? `0 4px 20px ${tier.color}22` : "0 1px 4px #0001",
      position: "relative", overflow: "hidden", outline: "none",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: isSelected ? tier.color : "transparent", transition: "background 0.25s ease" }} />
      <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: tier.color, background: `${tier.color}15`, padding: "3px 10px", borderRadius: 20, marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>{tier.tag}</div>
      <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Fraunces', serif" }}>{tier.name}</h3>
      <p style={{ margin: "0 0 14px", fontSize: 13, color: "#666", lineHeight: 1.5 }}>{tier.description}</p>
      <div style={{ borderTop: `1px solid ${isSelected ? tier.color + "33" : "#eee"}`, paddingTop: 12 }}>
        <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>
          Selected Scope ({unitCount} {unitCount === 1 ? "unit" : "units"})
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: tier.color, fontFamily: "'DM Mono', monospace" }}>
          {formatCurrency(totalCost[0])} – {formatCurrency(totalCost[1])}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
          <span style={{ fontWeight: 600, color: tier.accent }}>+${rentImpact[0]}–${rentImpact[1]}</span> /mo rent increase per unit
        </div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{tier.timelineWeeks[0]}–{tier.timelineWeeks[1]} weeks timeline</div>
      </div>
    </button>
  );
}

function ROIPanel({ tier, unitCount, totalCost, rentImpact }) {
  const avgCost = (totalCost[0] + totalCost[1]) / 2;
  const avgRentPerUnit = (rentImpact[0] + rentImpact[1]) / 2;
  const avgRentIncrease = avgRentPerUnit * unitCount;
  const annualIncrease = avgRentIncrease * 12;
  const paybackMonths = avgCost > 0 && avgRentIncrease > 0 ? Math.ceil(avgCost / avgRentIncrease) : 0;
  const yearOneROI = avgCost > 0 ? ((annualIncrease / avgCost) * 100).toFixed(1) : "0.0";
  const fiveYearReturn = annualIncrease * 5;

  const stats = [
    { label: "Avg. Remodel Cost", value: formatCurrency(Math.round(avgCost)), sub: `${unitCount} unit${unitCount > 1 ? "s" : ""}` },
    { label: "Monthly Rent Uplift", value: `+${formatCurrency(Math.round(avgRentIncrease))}`, sub: "all units combined" },
    { label: "Payback Period", value: paybackMonths > 0 ? `${paybackMonths} mo` : "—", sub: paybackMonths > 0 ? (paybackMonths <= 12 ? "Under 1 year ✓" : paybackMonths <= 24 ? "Under 2 years" : "Long-term play") : "Select categories" },
    { label: "Year 1 ROI", value: `${yearOneROI}%`, sub: `${formatCurrency(Math.round(annualIncrease))} annual` },
    { label: "5-Year Return", value: formatCurrency(Math.round(fiveYearReturn)), sub: `on ${formatCurrency(Math.round(avgCost))} invested` },
  ];

  return (
    <div style={{ background: `linear-gradient(135deg, ${tier.color}08, ${tier.color}15)`, border: `1px solid ${tier.color}25`, borderRadius: 14, padding: 28, marginTop: 8 }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: tier.color, fontFamily: "'Fraunces', serif", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>📊</span> ROI Projections — {tier.name} (Seattle, WA)
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: "1 1 140px", background: "#fff", borderRadius: 10, padding: "16px 14px", boxShadow: "0 1px 4px #0001" }}>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: "#888", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: tier.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ margin: "18px 0 0", fontSize: 11, color: "#999", lineHeight: 1.5 }}>
        * Projections based on Seattle metro average renovation costs and rental comps. Actual results vary by neighborhood (Capitol Hill vs Renton vs Tacoma), property condition, and current market rents.
      </p>
    </div>
  );
}

export default function RemodelPackage() {
  const [selectedTier, setSelectedTier] = useState("mid");
  const [unitCount, setUnitCount] = useState(2);
  const [expandedCats, setExpandedCats] = useState({});
  const [selectedCats, setSelectedCats] = useState(() => {
    const init = {};
    CATEGORIES.forEach((c) => (init[c.id] = true));
    return init;
  });

  const tier = TIERS.find((t) => t.id === selectedTier);
  const activeCats = CATEGORIES.filter((c) => selectedCats[c.id]);
  const selectedCount = activeCats.length;

  const totalCost = useMemo(() => {
    const low = activeCats.reduce((sum, cat) => sum + cat.tiers[selectedTier].cost[0], 0) * unitCount;
    const high = activeCats.reduce((sum, cat) => sum + cat.tiers[selectedTier].cost[1], 0) * unitCount;
    return [low, high];
  }, [selectedTier, unitCount, selectedCats]);

  const rentImpact = useMemo(() => {
    const t = TIERS.find((t) => t.id === selectedTier);
    const total = activeCats.reduce((sum, cat) => sum + t.rentImpactPerCat[cat.id], 0);
    return [Math.round(total * 0.8), Math.round(total * 1.2)];
  }, [selectedTier, selectedCats]);

  const maxCatCost = useMemo(() => Math.max(...CATEGORIES.map((c) => c.tiers.premium.cost[1])), []);

  const toggleCat = (id) => setExpandedCats((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSelect = (id) => setSelectedCats((prev) => ({ ...prev, [id]: !prev[id] }));
  const selectAll = () => { const u = {}; CATEGORIES.forEach((c) => (u[c.id] = true)); setSelectedCats(u); };
  const selectNone = () => { const u = {}; CATEGORIES.forEach((c) => (u[c.id] = false)); setSelectedCats(u); };

  const getTierRentImpact = (tierId) => {
    const t = TIERS.find((t) => t.id === tierId);
    const total = activeCats.reduce((sum, cat) => sum + t.rentImpactPerCat[cat.id], 0);
    return [Math.round(total * 0.8), Math.round(total * 1.2)];
  };

  const getTierTotalCost = (tierId) => {
    const low = activeCats.reduce((sum, cat) => sum + cat.tiers[tierId].cost[0], 0) * unitCount;
    const high = activeCats.reduce((sum, cat) => sum + cat.tiers[tierId].cost[1], 0) * unitCount;
    return [low, high];
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)", color: "#fff", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
            Multi-Family Investment Tool — Seattle, WA
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 36, fontWeight: 800, fontFamily: "'Fraunces', serif", letterSpacing: -0.5, lineHeight: 1.15 }}>
            Rental Remodel Package
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: "#bbb", maxWidth: 600, lineHeight: 1.5 }}>
            Build a custom remodel scope by selecting categories below. Costs reflect Seattle metro labor rates ($65–95/hr) and material pricing.
          </p>

          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: "#999", fontFamily: "'DM Mono', monospace" }}>
              Units to remodel
            </label>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button key={n} onClick={() => setUnitCount(n)} style={{
                  width: 38, height: 38, borderRadius: 8,
                  border: unitCount === n ? "2px solid #fff" : "1px solid #555",
                  background: unitCount === n ? "#fff" : "transparent",
                  color: unitCount === n ? "#1a1a1a" : "#aaa",
                  fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Mono', monospace",
                }}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 60px" }}>
        {/* Tier Cards */}
        <div style={{ display: "flex", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
          {TIERS.map((t) => (
            <TierCard key={t.id} tier={t} isSelected={selectedTier === t.id} onClick={() => setSelectedTier(t.id)} unitCount={unitCount} totalCost={getTierTotalCost(t.id)} rentImpact={getTierRentImpact(t.id)} />
          ))}
        </div>

        {/* ROI Panel */}
        <ROIPanel tier={tier} unitCount={unitCount} totalCost={totalCost} rentImpact={rentImpact} />

        {/* Category Breakdown */}
        <div style={{ marginTop: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Fraunces', serif", margin: 0 }}>
              Scope of Work — {tier.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, color: "#888", fontFamily: "'DM Mono', monospace" }}>{selectedCount}/{CATEGORIES.length} selected</span>
              <button onClick={selectAll} style={{ fontSize: 12, fontWeight: 600, color: tier.color, background: "none", border: `1px solid ${tier.color}44`, borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>Select All</button>
              <button onClick={selectNone} style={{ fontSize: 12, fontWeight: 600, color: "#999", background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>Clear</button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CATEGORIES.map((cat) => {
              const data = cat.tiers[selectedTier];
              const isOpen = expandedCats[cat.id];
              const isActive = selectedCats[cat.id];
              const catRentImpact = tier.rentImpactPerCat[cat.id];

              return (
                <div key={cat.id} style={{
                  background: "#fff", borderRadius: 12,
                  border: isActive ? `1.5px solid ${tier.color}33` : "1.5px solid #e8e8e8",
                  overflow: "hidden", transition: "all 0.25s",
                  boxShadow: isOpen ? "0 2px 12px #0001" : "none",
                  opacity: isActive ? 1 : 0.5,
                }}>
                  <div style={{ display: "flex", alignItems: "center", padding: "6px 8px 6px 6px" }}>
                    <button onClick={() => toggleSelect(cat.id)} style={{
                      width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0,
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        border: isActive ? `2px solid ${tier.color}` : "2px solid #ccc",
                        background: isActive ? tier.color : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s", fontSize: 13, color: "#fff", fontWeight: 700,
                      }}>
                        {isActive && "✓"}
                      </div>
                    </button>

                    <button onClick={() => toggleCat(cat.id)} style={{
                      flex: 1, padding: "10px 12px 10px 4px", border: "none", background: "transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", outline: "none",
                    }}>
                      <span style={{ fontSize: 24, width: 32, textAlign: "center" }}>{cat.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{cat.name}</span>
                          {isActive && (
                            <span style={{ fontSize: 10, fontWeight: 600, color: tier.accent, background: `${tier.accent}15`, padding: "2px 8px", borderRadius: 10, fontFamily: "'DM Mono', monospace" }}>
                              +${Math.round(catRentImpact * 0.8)}–${Math.round(catRentImpact * 1.2)}/mo
                            </span>
                          )}
                        </div>
                        <CostBar low={data.cost[0] * unitCount} high={data.cost[1] * unitCount} maxVal={maxCatCost * unitCount} color={isActive ? tier.color : "#bbb"} />
                      </div>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isOpen ? tier.light : "#f5f5f5",
                        color: isOpen ? tier.color : "#aaa",
                        fontSize: 14, fontWeight: 700, transition: "all 0.2s",
                        transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0,
                      }}>▾</div>
                    </button>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 20px 20px 80px" }}>
                      <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: "#888", marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>Scope of Work</div>
                      <ul style={{ margin: 0, paddingLeft: 16, listStyle: "none" }}>
                        {data.scope.map((item, i) => (
                          <li key={i} style={{ fontSize: 14, color: "#444", lineHeight: 1.5, marginBottom: 6, position: "relative", paddingLeft: 4 }}>
                            <span style={{ position: "absolute", left: -14, color: tier.accent, fontWeight: 700 }}>·</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f0f0f0" }}>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: "#bbb", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                          Compare all tiers (per unit · Seattle pricing)
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {TIERS.map((t) => (
                            <div key={t.id} style={{
                              flex: "1 1 120px", padding: "8px 12px", borderRadius: 8,
                              background: t.id === selectedTier ? `${t.color}12` : "#f8f8f8",
                              border: t.id === selectedTier ? `1px solid ${t.color}33` : "1px solid #eee",
                            }}>
                              <div style={{ fontSize: 10, fontWeight: 600, color: t.color, marginBottom: 2, fontFamily: "'DM Mono', monospace" }}>{t.name}</div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace" }}>
                                {formatCurrency(cat.tiers[t.id].cost[0])}–{formatCurrency(cat.tiers[t.id].cost[1])}
                              </div>
                              <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>
                                +${Math.round(t.rentImpactPerCat[cat.id] * 0.8)}–${Math.round(t.rentImpactPerCat[cat.id] * 1.2)}/mo
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Footer */}
        <div style={{ marginTop: 40, padding: "28px 24px", background: "#fff", borderRadius: 14, border: "1px solid #eee", boxShadow: "0 1px 6px #0001" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: "#999", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>
                {tier.name} — {selectedCount} categories · {unitCount} Unit{unitCount > 1 ? "s" : ""} · Seattle, WA
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: tier.color, fontFamily: "'DM Mono', monospace" }}>
                {formatCurrency(totalCost[0])} – {formatCurrency(totalCost[1])}
              </div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Total estimated remodel investment</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#666" }}>
                Projected rent increase: <strong style={{ color: tier.color }}>+${rentImpact[0]}–${rentImpact[1]}/mo per unit</strong>
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>
                Timeline: <strong>{tier.timelineWeeks[0]}–{tier.timelineWeeks[1]} weeks</strong>
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 28, lineHeight: 1.5 }}>
          Cost estimates reflect Seattle metro area pricing (King & Pierce County). Labor rates estimated at $65–95/hr. Actual costs vary by neighborhood, contractor, material selections, and property condition. Always obtain multiple bids.
        </p>
      </div>
    </div>
  );
}
