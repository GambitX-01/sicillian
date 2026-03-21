"use client";

import { AlertTriangle, ArrowUpRight, Loader2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import type { GapAlert, LearnerProfile, Opportunity } from "@/types";

function severityColor(type: string) {
  if (type === "critical_gap") return "bg-red-500";
  if (type === "high_gap")     return "bg-amber-400";
  return "bg-emerald-400";
}

function severityLabel(type: string) {
  if (type === "critical_gap") return "critical";
  if (type === "high_gap")     return "high";
  return "ready";
}

function rateColor(rate: number) {
  if (rate >= 40) return "text-emerald-600";
  if (rate >= 20) return "text-amber-600";
  return "text-red-500";
}

export default function SetaDashboard() {
  const { data: alerts,   loading: lAlerts }   = useApi<GapAlert[]>("/gap-alerts/");
  const { data: profiles, loading: lProfiles } = useApi<LearnerProfile[]>("/learner-profiles/");
  const { data: opps,     loading: lOpps }     = useApi<Opportunity[]>("/opportunities/");

  const loading = lAlerts || lProfiles || lOpps;

  const totalLearners  = (profiles ?? []).length;
  const activeEmployers = new Set((opps ?? []).map(o => o.employer)).size;
  const gapAlertCount  = (alerts ?? []).filter(a => a.status === "open").length;

  // Group learners by district
  const districtMap = new Map<string, { learners: number; placed: number }>();
  for (const p of profiles ?? []) {
    const prev = districtMap.get(p.district) ?? { learners: 0, placed: 0 };
    districtMap.set(p.district, {
      learners: prev.learners + 1,
      placed:   prev.placed + (p.status === "placed" ? 1 : 0),
    });
  }
  const districtStats = [...districtMap.entries()]
    .map(([district, d]) => ({ district, ...d }))
    .sort((a, b) => b.learners - a.learners);

  const openAlerts = (alerts ?? []).filter(a => a.status === "open");

  return (
    <div className="p-6 space-y-6 bg-[#f7f7f5] min-h-screen">
      {/* Page heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA — Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">Skills Development Overview</h1>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-4">
          <p className="text-xs text-gray-400 mb-1">Registered learners</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : totalLearners.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">on platform</p>
        </div>
        <div className="bg-white px-4 py-4">
          <p className="text-xs text-gray-400 mb-1">Active employers</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : activeEmployers}
          </p>
          <p className="text-xs text-gray-400">with open listings</p>
        </div>
        <div className="bg-white px-4 py-4">
          <p className="text-xs text-gray-400 mb-1">Skill gap alerts</p>
          <p className={`text-2xl font-bold leading-none mb-1 ${gapAlertCount > 0 ? "text-red-600" : "text-slate-900"}`}>
            {loading ? "—" : gapAlertCount}
          </p>
          <p className={`text-xs ${gapAlertCount > 0 ? "text-red-400" : "text-gray-400"}`}>open alerts</p>
        </div>
        <div className="bg-white px-4 py-4">
          <p className="text-xs text-gray-400 mb-1">Open opportunities</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : (opps ?? []).filter(o => o.status === "open").length}
          </p>
          <p className="text-xs text-gray-400">listings available</p>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Gap alerts */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Skill gap alerts</p>
            <a href="/seta/organisations" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              Manage orgs <ArrowUpRight size={11} />
            </a>
          </div>
          {lAlerts ? (
            <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
              <Loader2 size={16} className="animate-spin" /> Loading…
            </div>
          ) : openAlerts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No open gap alerts.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {openAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-3 px-4 py-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${severityColor(alert.alert_type)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 font-medium truncate">{alert.detail}</p>
                    <p className="text-xs text-gray-400">{alert.district} · {severityLabel(alert.alert_type)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-700">{alert.learners_ready - alert.learners_placed}</p>
                    <p className="text-xs text-gray-400">gap</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* District pipeline */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">District pipeline</p>
          </div>
          <div className="grid grid-cols-4 px-4 py-2 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-medium text-gray-400 col-span-2">District</p>
            <p className="text-xs font-medium text-gray-400 text-right">Learners</p>
            <p className="text-xs font-medium text-gray-400 text-right">Placed</p>
          </div>
          {lProfiles ? (
            <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
              <Loader2 size={16} className="animate-spin" /> Loading…
            </div>
          ) : districtStats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No learner data yet.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {districtStats.map((d) => {
                const rate = d.learners > 0 ? Math.round((d.placed / d.learners) * 100) : 0;
                return (
                  <div key={d.district} className="grid grid-cols-4 items-center px-4 py-2.5 hover:bg-gray-50 transition-colors">
                    <p className="text-sm text-slate-700 col-span-2 truncate">{d.district}</p>
                    <p className="text-sm text-slate-700 text-right font-medium">{d.learners}</p>
                    <div className="text-right">
                      <span className={`text-xs font-semibold ${rateColor(rate)}`}>{rate}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
