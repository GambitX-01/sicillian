"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserCircle, Brain, CheckCircle2, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserCircle,
    title: "Build Your Profile",
    description:
      "Learners complete a structured skills profile — qualifications, experience, location, and availability. Employers and institutions set up their opportunity and programme listings.",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Does the Matching",
    description:
      "SkillsGrid's AI engine sends profile data to Google Gemini 2.0 Flash, which analyses fit across all active opportunities and returns match scores with clear reasoning.",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Review Your Matches",
    description:
      "Matched opportunities appear ranked on the learner's dashboard. Employers see pre-matched candidates. SETAs see district-level skill gap analytics in real time.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Apply & Track",
    description:
      "Apply to opportunities directly through SkillsGrid. Track application status, receive in-app notifications, and stay connected throughout the placement process.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#1B2A4A] leading-tight">
            Simple for users.
            <br />
            Powerful underneath.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#0D9488]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });

              return (
                <motion.div
                  key={step.step}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#1B2A4A] flex items-center justify-center shadow-lg">
                      <step.icon className="text-[#0D9488]" size={28} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0D9488] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-[#1B2A4A] text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
