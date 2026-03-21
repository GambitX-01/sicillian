"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

// ── Demo data ───────────────────────────────────────────────────────────────

const DEMO_DISTRICTS = [
  { district: "Nelson Mandela Bay", learners: 42, placed: 18, opportunities: 8  },
  { district: "Buffalo City",        learners: 27, placed: 11, opportunities: 5  },
  { district: "OR Tambo",            learners: 15, placed:  3, opportunities: 2  },
  { district: "Amathole",            learners: 12, placed:  2, opportunities: 2  },
  { district: "Sarah Baartman",      learners:  8, placed:  1, opportunities: 1  },
  { district: "Joe Gqabi",           learners:  5, placed:  0, opportunities: 0  },
];

const DEMO_ALERTS = [
  { id: 1, district: "Nelson Mandela Bay", alert_type: "critical_gap", learners_ready: 42, learners_placed:  8, detail: "High demand for Python developers with SQL skills. Only 19% placement rate."  },
  { id: 2, district: "Buffalo City",        alert_type: "high_gap",     learners_ready: 27, learners_placed: 11, detail: "IT support roles available but learners lack networking certifications."   },
  { id: 3, district: "OR Tambo",            alert_type: "high_gap",     learners_ready: 15, learners_placed:  3, detail: "Limited employer engagement in district. Only 20% placement rate."         },
  { id: 4, district: "Amathole",            alert_type: "high_gap",     learners_ready: 12, learners_placed:  2, detail: "Data analytics skills in demand but learner supply pipeline is weak."      },
];

const DISTRICT_LIST = ["All", ...DEMO_DISTRICTS.map(d => d.district)];

// ── Helpers ─────────────────────────────────────────────────────────────────

function severityDot(type: string) {
  if (type === "critical_gap") return "bg-red-500";
  if (type === "high_gap")     return "bg-amber-400";
  return "bg-emerald-400";
}
function severityLabel(type: string) {
  if (type === "critical_gap") return { text: "Critical", cls: "bg-red-50 text-red-700 border-red-200" };
  if (type === "high_gap")     return { text: "High",     cls: "bg-amber-50 text-amber-700 border-amber-200" };
  return                              { text: "Ready",    cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
}
function rateColor(rate: number) {
  if (rate >= 40) return "text-emerald-600";
  if (rate >= 20) return "text-amber-600";
  return "text-red-500";
}

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            value === o ? "border-emerald-400 text-emerald-700 bg-emerald-50" : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
          }`}
        >{o}</button>
      ))}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function SetaDashboard() {
  // District pipeline filters
  const [districtSort, setDistrictSort] = useState("Learners ↓");
  const [districtSearch, setDistrictSearch] = useState("");

  // Gap alert filters
  const [alertSeverity, setAlertSeverity] = useState("All");
  const [alertDistrict, setAlertDistrict] = useState("All");
  const [alertSort, setAlertSort] = useState("Gap size ↓");

  // ── Stats ─────────────────────────────────────────────────────────────
  const totalLearners   = DEMO_DISTRICTS.reduce((s, d) => s + d.learners, 0);
  const totalPlaced     = DEMO_DISTRICTS.reduce((s, d) => s + d.placed, 0);
  const totalOpps       = DEMO_DISTRICTS.reduce((s, d) => s + d.opportunities, 0);
  const overallRate     = Math.round((totalPlaced / totalLearners) * 100);

  // ── District pipeline ─────────────────────────────────────────────────
  let districts = DEMO_DISTRICTS as typeof DEMO_DISTRICTS;
  if (districtSearch.trim()) {
    districts = districts.filter(d => d.district.toLowerCase().includes(districtSearch.toLowerCase()));
  }
  districts = [...districts].sort((a, b) => {
    if (districtSort === "Learners ↓")     return b.learners - a.learners;
    if (districtSort === "Placement % ↓")  return (b.placed / b.learners) - (a.placed / a.learners);
    if (districtSort === "Gap ↓")          return (b.learners - b.placed) - (a.learners - a.placed);
    return a.district.localeCompare(b.district);
  });

  // ── Gap alerts ────────────────────────────────────────────────────────
  let alerts = DEMO_ALERTS as typeof DEMO_ALERTS;
  if (alertSeverity !== "All") {
    const map: Record<string, string> = { Critical: "critical_gap", High: "high_gap" };
    alerts = alerts.filter(a => a.alert_type === map[alertSeverity]);
  }
  if (alertDistrict !== "All") alerts = alerts.filter(a => a.district === alertDistrict);
  alerts = [...alerts].sort((a, b) =>
    alertSort === "Gap size ↓"
      ? (b.learners_ready - b.learners_placed) - (a.learners_ready - a.learners_placed)
      : a.district.localeCompare(b.district)
  );

  return (
    <div className="p-6 space-y-6 bg-[#f7f7f5] min-h-screen">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA — Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">Skills Development Overview</h1>
        <p className="text-sm text-gray-400 mt-0.5">District pipeline, skill gaps, and placement outcomes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Registered learners", val: totalLearners.toLocaleString(), sub: "on platform" },
          { label: "Overall placement",    val: `${overallRate}%`,              sub: `${totalPlaced} placed` },
          { label: "Skill gap alerts",     val: DEMO_ALERTS.length,             sub: "open alerts", red: true },
          { label: "Open opportunities",   val: totalOpps,                      sub: "listings available" },
        ].map(({ label, val, sub, red }) => (
          <div key={label} className="bg-white px-4 py-4">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className={`text-2xl font-bold leading-none mb-1 ${red ? "text-red-600" : "text-slate-900"}`}>{val}</p>
            <p className={`text-xs ${red ? "text-red-400" : "text-gray-400"}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Gap alerts */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Skill gap alerts</p>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Severity:</span>
              <Pills options={["All", "Critical", "High"]} value={alertSeverity} onChange={setAlertSeverity} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort:</span>
              <Pills options={["Gap size ↓", "District A–Z"]} value={alertSort} onChange={setAlertSort} />
            </div>
          </div>
          {/* District sub-filter */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50">
            <span className="text-xs text-gray-400 shrink-0">District:</span>
            <Pills options={DISTRICT_LIST} value={alertDistrict} onChange={setAlertDistrict} />
          </div>

          <div className="divide-y divide-gray-50">
            {alerts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No alerts match these filters.</p>
            ) : alerts.map(alert => {
              const sev = severityLabel(alert.alert_type);
              const gap = alert.learners_ready - alert.learners_placed;
              return (
                <div key={alert.id} className="flex items-start gap-3 px-4 py-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${severityDot(alert.alert_type)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 font-medium">{alert.detail}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-gray-400">{alert.district}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${sev.cls}`}>{sev.text}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-lg font-bold text-slate-700">{gap}</p>
                    <p className="text-xs text-gray-400">unplaced</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* District pipeline */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">District pipeline</p>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort:</span>
              <Pills
                options={["Learners ↓", "Placement % ↓", "Gap ↓", "District A–Z"]}
                value={districtSort}
                onChange={setDistrictSort}
              />
            </div>
          </div>
          {/* Search */}
          <div className="px-4 py-2 border-b border-gray-100">
            <input
              type="text"
              value={districtSearch}
              onChange={e => setDistrictSearch(e.target.value)}
              placeholder="Search district…"
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-12 px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-400 col-span-5">District</p>
            <p className="text-xs font-medium text-gray-400 text-right col-span-2">Learners</p>
            <p className="text-xs font-medium text-gray-400 text-right col-span-2">Placed</p>
            <p className="text-xs font-medium text-gray-400 text-right col-span-2">Rate</p>
            <p className="text-xs font-medium text-gray-400 text-right col-span-1">Gap</p>
          </div>

          <div className="divide-y divide-gray-50">
            {districts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No districts match.</p>
            ) : districts.map(d => {
              const rate = Math.round((d.placed / d.learners) * 100);
              const gap  = d.learners - d.placed;
              return (
                <div key={d.district} className="grid grid-cols-12 items-center px-4 py-2.5 hover:bg-gray-50 transition-colors">
                  <div className="col-span-5">
                    <p className="text-sm text-slate-700 truncate">{d.district}</p>
                    <div className="h-1 bg-gray-100 rounded overflow-hidden mt-1 mr-2">
                      <div
                        className="h-full rounded"
                        style={{ width: `${rate}%`, background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 text-right font-medium col-span-2">{d.learners}</p>
                  <p className="text-sm text-slate-700 text-right col-span-2">{d.placed}</p>
                  <p className={`text-xs font-semibold text-right col-span-2 ${rateColor(rate)}`}>{rate}%</p>
                  <p className={`text-xs font-semibold text-right col-span-1 ${gap > 20 ? "text-red-500" : gap > 5 ? "text-amber-500" : "text-gray-400"}`}>{gap}</p>
                </div>
              );
            })}
          </div>
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-400">Totals — {totalLearners} learners · {totalPlaced} placed · {overallRate}% overall rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
