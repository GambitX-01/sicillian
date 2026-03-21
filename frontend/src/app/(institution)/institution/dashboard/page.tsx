"use client";

import { ArrowUpRight, Loader2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import type { LearnerProfile, Match } from "@/types";

function placementColor(pct: number) {
  if (pct >= 70) return "text-emerald-700";
  if (pct >= 55) return "text-amber-600";
  return "text-red-500";
}

function barColor(pct: number) {
  if (pct >= 70) return "bg-emerald-400";
  if (pct >= 55) return "bg-amber-400";
  return "bg-red-400";
}

export default function InstitutionDashboard() {
  const { user } = useAuth();
  const { data: profiles, loading: lProfiles } = useApi<LearnerProfile[]>("/learner-profiles/");
  const { data: matches,  loading: lMatches  } = useApi<Match[]>("/matches/");

  const loading = lProfiles || lMatches;

  // Filter to learners from this institution
  const myLearners = (profiles ?? []).filter(p => p.institution === user?.id);

  const totalLearners  = myLearners.length;
  const placedLearners = myLearners.filter(p => p.status === "placed").length;
  const searchingLearners = myLearners.filter(p => p.status === "searching").length;

  const learnerIds = new Set(myLearners.map(p => p.user));
  const matchedLearnerCount = new Set(
    (matches ?? []).filter(m => learnerIds.has(m.learner)).map(m => m.learner)
  ).size;

  const placementRate = totalLearners > 0 ? Math.round((placedLearners / totalLearners) * 100) : 0;

  // Group by qualification for programme breakdown
  const qualMap = new Map<string, { count: number; placed: number; nqf: string }>();
  for (const p of myLearners) {
    const prev = qualMap.get(p.qualification) ?? { count: 0, placed: 0, nqf: p.nqf_level };
    qualMap.set(p.qualification, {
      count:  prev.count + 1,
      placed: prev.placed + (p.status === "placed" ? 1 : 0),
      nqf:    prev.nqf,
    });
  }
  const programmes = [...qualMap.entries()]
    .map(([name, d]) => ({
      name,
      nqf: `NQF ${d.nqf}`,
      count: d.count,
      placementPct: d.count > 0 ? Math.round((d.placed / d.count) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  const orgName = user?.first_name ?? "Your Institution";

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{orgName}</p>
        <h1 className="text-xl font-bold text-slate-900">Institution Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Graduate pipeline and employment outcomes overview</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Learners on Platform</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : totalLearners}
          </p>
          <p className="text-xs text-gray-400">registered</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Placement Rate</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : totalLearners > 0 ? `${placementRate}%` : "—"}
          </p>
          <p className="text-xs text-gray-400">{placedLearners} placed</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">AI Matched</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : matchedLearnerCount}
          </p>
          <p className="text-xs text-gray-400">in pipeline now</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Searching</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : searchingLearners}
          </p>
          <p className="text-xs text-gray-400">active job seekers</p>
        </div>
      </div>

      {/* Programme outcomes */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Programme outcomes</p>
          <a href="/institution/learners" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            All learners <ArrowUpRight size={11} />
          </a>
        </div>
        {lProfiles ? (
          <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        ) : programmes.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No learners linked to your institution yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-50">
            {programmes.map((p) => (
              <div key={p.name} className="flex items-center justify-between px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{p.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.nqf}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.count} learner{p.count !== 1 ? "s" : ""}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4 shrink-0">
                  <div className="text-right">
                    <p className={`text-lg font-bold ${placementColor(p.placementPct)}`}>{p.placementPct}%</p>
                    <p className="text-xs text-gray-400">placed</p>
                  </div>
                  <div className="w-24">
                    <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
                      <div
                        className={`h-full rounded ${barColor(p.placementPct)}`}
                        style={{ width: `${p.placementPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      {totalLearners === 0 && !loading && (
        <div className="bg-white border border-gray-200 rounded px-4 py-6 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">No learners linked yet</p>
          <p className="text-xs text-slate-400">
            Learners can select your institution when they register. Their profiles will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
