"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, GraduationCap, Briefcase, BookOpen, ShieldCheck, Layers, ChevronLeft } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { OrgType } from "@/types";

type RoleOption = { id: string; label: string; description: string; icon: LucideIcon };

const roles: RoleOption[] = [
  { id: "learner",     label: "Learner",     description: "Find opportunities & matches", icon: GraduationCap },
  { id: "employer",    label: "Employer",    description: "Post jobs & find talent",       icon: Briefcase },
  { id: "institution", label: "Institution", description: "Manage programmes & learners",  icon: BookOpen },
  { id: "seta",        label: "SETA",        description: "Oversee skills development",    icon: ShieldCheck },
  { id: "incubator",   label: "Incubator",   description: "Support entrepreneurs",         icon: Layers },
];

const NQF_LEVELS = ["1","2","3","4","5","6","7","8","9","10"];
const DISTRICTS = ["Nelson Mandela Bay","Buffalo City","Amathole","Chris Hani","Joe Gqabi","OR Tambo","Alfred Nzo","Cacadu/Sarah Baartman"];

export default function RegisterPage() {
  const { registerLearner, registerOrg } = useAuth();
  const router = useRouter();

  // Step 1 fields
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 — shared
  const [phone, setPhone] = useState("");

  // Step 2 — learner
  const [district, setDistrict] = useState("");
  const [nqfLevel, setNqfLevel] = useState("");
  const [qualification, setQualification] = useState("");
  const [skillsInput, setSkillsInput] = useState("");

  // Step 2 — org
  const [companyName, setCompanyName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [useCase, setUseCase] = useState("");
  const [orgDistrict, setOrgDistrict] = useState("");
  const [institutionType, setInstitutionType] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) { setError("Please select a role."); return; }
    setError("");
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (selectedRole === "learner") {
        await registerLearner({
          email, password, first_name: firstName, phone,
          district, nqf_level: nqfLevel, qualification,
          skills: skillsInput.split(",").map(s => s.trim()).filter(Boolean),
        });
      } else {
        const res = await registerOrg({
          email, password, first_name: firstName, phone,
          org_type: selectedRole as OrgType,
          company_name: companyName,
          registration_number: regNumber,
          contact_person: contactPerson,
          use_case: useCase,
          district: orgDistrict,
          ...(selectedRole === "institution" ? { institution_type: institutionType } : {}),
        });
        setSuccess(res.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800 border border-slate-700 rounded-sm p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={24} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Application received</h2>
          <p className="text-slate-400 text-sm mb-6">{success} We'll notify you once your account is verified.</p>
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: "32px 32px" }}
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-xl">
        <div className="text-center mb-8">
          <span className="text-3xl font-bold tracking-tight" style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            SkillsGrid
          </span>
          <p className="text-slate-400 text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-sm p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {step === 2 && (
              <button type="button" onClick={() => { setStep(1); setError(""); }} className="text-slate-400 hover:text-white mr-1">
                <ChevronLeft size={18} />
              </button>
            )}
            <div className="flex gap-1.5">
              <div className="h-1 w-8 rounded-full" style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }} />
              <div className={`h-1 w-8 rounded-full transition-colors ${step === 2 ? "bg-emerald-400" : "bg-slate-700"}`} />
            </div>
            <span className="text-xs text-slate-500 ml-1">Step {step} of 2</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} onSubmit={handleNext} className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Get started</h2>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Full name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Your full name" required
                      className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                      className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" minLength={6} required
                      className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                </div>

                {/* Role selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">I am a…</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      const isSelected = selectedRole === role.id;
                      return (
                        <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)}
                          className="flex flex-col items-center gap-2 p-3 rounded-sm border text-center transition-all duration-150"
                          style={isSelected ? { border: "1.5px solid #34d399", background: "rgba(52,211,153,0.08)" } : { border: "1.5px solid #334155", background: "transparent" }}>
                          <Icon size={20} className={isSelected ? "text-emerald-400" : "text-slate-500"} />
                          <span className={`text-xs font-semibold ${isSelected ? "text-emerald-400" : "text-slate-300"}`}>{role.label}</span>
                          <span className="text-[10px] text-slate-500 leading-tight">{role.description}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">{error}</p>}

                <button type="submit" className="w-full py-2.5 rounded-sm text-sm font-semibold text-slate-900 mt-2 transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}>
                  Next
                </button>
              </motion.form>
            ) : (
              <motion.form key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {selectedRole === "learner" ? "Your profile" : "Organisation details"}
                </h2>

                {/* Phone — both */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+27 xx xxx xxxx" required
                      className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                </div>

                {selectedRole === "learner" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">District</label>
                      <select value={district} onChange={e => setDistrict(e.target.value)} required
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400">
                        <option value="">Select district</option>
                        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">NQF Level</label>
                      <select value={nqfLevel} onChange={e => setNqfLevel(e.target.value)} required
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400">
                        <option value="">Select NQF level</option>
                        {NQF_LEVELS.map(l => <option key={l} value={l}>NQF {l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Qualification</label>
                      <input type="text" value={qualification} onChange={e => setQualification(e.target.value)} placeholder="e.g. National Diploma in IT" required
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Skills <span className="text-slate-500 font-normal">(comma separated)</span></label>
                      <input type="text" value={skillsInput} onChange={e => setSkillsInput(e.target.value)} placeholder="e.g. Python, SQL, Excel"
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Organisation name</label>
                      <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Legal entity name" required
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Registration number</label>
                      <input type="text" value={regNumber} onChange={e => setRegNumber(e.target.value)} placeholder="Company / CIPC number"
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact person</label>
                      <input type="text" value={contactPerson} onChange={e => setContactPerson(e.target.value)} placeholder="Primary contact name"
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">District</label>
                      <select value={orgDistrict} onChange={e => setOrgDistrict(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400">
                        <option value="">Select district</option>
                        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">How will you use SkillsGrid?</label>
                      <textarea value={useCase} onChange={e => setUseCase(e.target.value)} rows={2} placeholder="Brief description of your intended use…"
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors resize-none" />
                    </div>
                    {selectedRole === "institution" && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Institution type</label>
                        <select value={institutionType} onChange={e => setInstitutionType(e.target.value)} required
                          className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400">
                          <option value="">Select type</option>
                          <option value="university">University</option>
                          <option value="tvet">TVET College</option>
                          <option value="training_body">Training Body</option>
                        </select>
                      </div>
                    )}
                  </>
                )}

                {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full py-2.5 rounded-sm text-sm font-semibold text-slate-900 mt-2 transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}>
                  {loading ? "Creating account…" : selectedRole === "learner" ? "Create Account" : "Submit for Verification"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-sm text-slate-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
