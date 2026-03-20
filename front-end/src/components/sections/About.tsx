"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Globe, Users } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "Built to directly address the Eastern Cape's youth unemployment crisis by closing the gap between skills training and real employment opportunities.",
  },
  {
    icon: Globe,
    title: "Inclusive by Design",
    description:
      "A Progressive Web App (PWA) built for low-bandwidth rural communities — accessible even offline, on any device, without a data barrier.",
  },
  {
    icon: Users,
    title: "Ecosystem-First",
    description:
      "Unlike siloed job boards, SkillsGrid brings every stakeholder — learners, employers, institutions, SETAs, and incubators — into one coordinated platform.",
  },
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <div className="max-w-3xl mb-16">
            <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest">
              About SkillsGrid
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#1B2A4A] leading-tight">
              The Eastern Cape has talent.
              <br />
              We connect it to opportunity.
            </h2>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              SkillsGrid is a centralised digital platform built for the Eastern
              Cape — designed to solve the persistent disconnect between youth
              with skills and the employers, learnerships, and funding that need
              them. Using AI-powered matching and real-time coordination, we
              collapse the silos that have long separated stakeholders in the
              skills ecosystem.
            </p>
          </div>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Context block */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#1B2A4A] text-white">
                <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
                  The Problem
                </p>
                <p className="text-xl font-semibold leading-relaxed">
                  Thousands of Eastern Cape graduates are trained but unemployed
                  — not because they lack skills, but because there&apos;s no
                  system to surface them.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0D9488]/10 border border-[#0D9488]/20">
                <p className="text-[#0D9488] text-sm uppercase tracking-wider mb-2">
                  Our Answer
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  An AI-driven ecosystem that matches learner profiles to real
                  opportunities, coordinates stakeholders across the province,
                  and surfaces skill gaps to SETAs before they become crises.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Universities & TVETs", value: "Onboarded" },
                  { label: "AI Matching Engine", value: "Gemini 2.0" },
                  { label: "Coverage", value: "Eastern Cape" },
                  { label: "Platform Type", value: "PWA Offline" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="text-[#1B2A4A] font-bold">{item.value}</div>
                    <div className="text-gray-500 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: Pillars */}
          <div className="space-y-6">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={0.15 + i * 0.1}>
                <div className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-[#0D9488]/30 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0D9488]/10 flex items-center justify-center">
                    <pillar.icon className="text-[#0D9488]" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1B2A4A] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
