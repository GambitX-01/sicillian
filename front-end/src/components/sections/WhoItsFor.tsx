"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Building2,
  School,
  Landmark,
  Lightbulb,
} from "lucide-react";

const roles = [
  {
    icon: GraduationCap,
    role: "Learners",
    tagline: "Find your pathway",
    description:
      "TVET and university students who need a system that surfaces real jobs, learnerships, internships, and bursaries matched to their actual skills.",
    features: [
      "AI-matched opportunities",
      "Skills profile builder",
      "Application tracker",
      "Instant notifications",
    ],
    color: "#1B2A4A",
  },
  {
    icon: Building2,
    role: "Employers",
    tagline: "Find the right talent",
    description:
      "Companies and organisations posting opportunities who need access to pre-qualified, skills-matched candidates — without sifting through thousands of unrelated CVs.",
    features: [
      "Post opportunities",
      "View matched candidates",
      "Manage applicants",
      "Skills gap insights",
    ],
    color: "#0D9488",
  },
  {
    icon: School,
    role: "Institutions",
    tagline: "Track your outcomes",
    description:
      "TVETs and universities managing learner cohorts and programmes — with visibility into how graduates perform in the real employment market.",
    features: [
      "Learner cohort management",
      "Programme listings",
      "Placement tracking",
      "Outcome reports",
    ],
    color: "#1B2A4A",
  },
  {
    icon: Landmark,
    role: "SETAs",
    tagline: "Govern the pipeline",
    description:
      "Sector Education and Training Authorities that need live visibility across the Eastern Cape's skills pipeline — identifying gaps and coordinating funding before problems escalate.",
    features: [
      "District pipeline map",
      "Skill gap alerts",
      "Funding management",
      "Compliance tracking",
    ],
    color: "#0D9488",
  },
  {
    icon: Lightbulb,
    role: "Incubators",
    tagline: "Fuel entrepreneurship",
    description:
      "Business incubators offering mentorship, entrepreneurship programmes, and startup support — connecting graduates who want to build, not just work.",
    features: [
      "Programme listings",
      "Mentor profiles",
      "Entrepreneur matching",
      "Opportunity posts",
    ],
    color: "#1B2A4A",
  },
];

export default function WhoItsFor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="who" className="py-24 bg-[#1B2A4A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest">
            Who It&apos;s For
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">
            Built for everyone
            <br />
            in the ecosystem.
          </h2>
          <p className="mt-6 text-white/60 text-lg">
            SkillsGrid serves five distinct stakeholder groups — each with their
            own tailored dashboard and workflow.
          </p>
        </motion.div>

        {/* Roles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });

            return (
              <motion.div
                key={role.role}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-6 border border-white/10 hover:border-[#0D9488]/50 transition-all duration-300 ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${role.color === "#0D9488" ? "#0D9488" : "#ffffff"}15` }}
                  >
                    <role.icon
                      size={20}
                      className={
                        role.color === "#0D9488"
                          ? "text-[#0D9488]"
                          : "text-white/70"
                      }
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{role.role}</div>
                    <div className="text-[#0D9488] text-xs">{role.tagline}</div>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {role.description}
                </p>

                <ul className="space-y-2">
                  {role.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                      <span className="text-white/50">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
