"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Wifi, Network } from "lucide-react";

const problems = [
  {
    number: "02",
    icon: Briefcase,
    tag: "Skills-to-Opportunity Matching",
    title: "Trained but unemployed",
    description:
      "Thousands of Eastern Cape youth graduate from TVETs and universities with real qualifications — but there is no system connecting them to the jobs, learnerships, internships, and bursaries that exist. Skills exist. Opportunities exist. The bridge does not.",
    solution:
      "SkillsGrid's AI engine (powered by Gemini 2.0 Flash) analyses learner profiles and surfaces ranked, reasoned matches to real opportunities — automatically.",
    color: "from-blue-50 to-indigo-50",
    accent: "#1B2A4A",
  },
  {
    number: "04",
    icon: Wifi,
    tag: "Rural Digital Access & Inclusion",
    title: "Digital exclusion in rural communities",
    description:
      "Most digital platforms are built for urban, high-bandwidth users. Rural Eastern Cape communities lack reliable connectivity, making conventional web apps inaccessible for the learners who need them most.",
    solution:
      "SkillsGrid is a Progressive Web App (PWA) built for low-bandwidth and offline use — deployable on SA-hosted infrastructure, and structured for ICASA zero-rating under a .co.za domain.",
    color: "from-teal-50 to-emerald-50",
    accent: "#0D9488",
  },
  {
    number: "05",
    icon: Network,
    tag: "Ecosystem Coordination & Visibility",
    title: "Stakeholders operating in silos",
    description:
      "SETAs, institutions, employers, and incubators each operate independently with no shared visibility. Funding gaps go undetected. Skill shortages are identified too late. The Eastern Cape's skills pipeline has no control tower.",
    solution:
      "SkillsGrid provides a centralised coordination dashboard with a live Eastern Cape district pipeline map, stakeholder profiles, opportunity aggregation, and automated gap alerts for SETAs.",
    color: "from-orange-50 to-amber-50",
    accent: "#D97706",
  },
];

function ProblemCard({
  problem,
  index,
}: {
  problem: (typeof problems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`rounded-3xl bg-gradient-to-br ${problem.color} p-8 border border-white`}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${problem.accent}15` }}
        >
          <problem.icon size={22} style={{ color: problem.accent }} />
        </div>
        <span
          className="text-5xl font-black opacity-10"
          style={{ color: problem.accent }}
        >
          {problem.number}
        </span>
      </div>

      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
        style={{
          background: `${problem.accent}15`,
          color: problem.accent,
        }}
      >
        Problem Statement {problem.number}
      </span>

      <h3 className="text-2xl font-bold text-[#1B2A4A] mb-3">
        {problem.title}
      </h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        {problem.description}
      </p>

      <div className="border-t border-black/5 pt-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Our Solution
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          {problem.solution}
        </p>
      </div>
    </motion.div>
  );
}

export default function Problems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="solutions" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest">
            What We&apos;re Solving
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#1B2A4A] leading-tight">
            Three real problems.
            <br />
            One integrated platform.
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            SkillsGrid simultaneously addresses three MICT SETA challenge
            statements — not as separate features, but as a unified ecosystem
            that makes each solution stronger.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.number} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
