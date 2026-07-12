import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Clock, CheckCircle2, Send, ChevronDown,
  Linkedin, Github, ArrowRight
} from "lucide-react";

const projectTypes = [
  "Big Data Engineering",
  "Quantitative Analysis",
  "Data Visualization",
  "Web Development",
  "Consulting / Review",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

const empty: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.projectType) e.projectType = "Please select a project type.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb] dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 right-0 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-violet-100/50 to-indigo-100/40 dark:from-violet-900/20 dark:to-indigo-900/10 blur-3xl" />
          </div>
          <div className="relative container max-w-7xl mx-auto px-6 md:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5 leading-tight">
                Let's build something<br />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  worth talking about.
                </span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-light">
                Available for consulting, architecture reviews, data engineering, and full-stack projects.
                Reach out and I'll respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main content */}
        <section className="pb-24">
          <div className="container max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-5 gap-10 lg:gap-16">

            {/* ── Form ── */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="rounded-3xl bg-white dark:bg-slate-900 p-10 md:p-14 flex flex-col items-center text-center"
                    style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.10)" }}
                    data-testid="contact-success"
                  >
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-violet-200 dark:shadow-violet-900">
                      <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Message received!</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-8">
                      Thanks, <span className="font-semibold text-slate-700 dark:text-slate-200">{form.name}</span>. I'll review your message and get back to you at{" "}
                      <span className="font-semibold text-violet-600 dark:text-violet-400">{form.email}</span> within 24 hours.
                    </p>
                    <button
                      onClick={() => { setForm(empty); setSubmitted(false); }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-3 transition-all duration-300"
                      data-testid="button-contact-reset"
                    >
                      Send another message <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl bg-white dark:bg-slate-900 p-8 md:p-10 space-y-7"
                    style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.10)" }}
                    noValidate
                    data-testid="contact-form"
                  >

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field error={errors.name}>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Name"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          data-testid="input-contact-name"
                          className={inputCls(!!errors.name)}
                        />
                      </Field>
                      <Field error={errors.email}>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          data-testid="input-contact-email"
                          className={inputCls(!!errors.email)}
                        />
                      </Field>
                    </div>

                    {/* Project type */}
                    <Field error={errors.projectType}>
                      <div className="relative">
                        <select
                          id="contact-project"
                          value={form.projectType}
                          onChange={(e) => handleChange("projectType", e.target.value)}
                          data-testid="input-contact-project"
                          className={`${inputCls(!!errors.projectType)} appearance-none pr-10 ${!form.projectType ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}
                        >
                          <option value="" disabled hidden>Project type</option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t} className="text-slate-900 dark:text-slate-100">{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      </div>
                    </Field>

                    {/* Budget (optional) */}
                    <Field>
                      <input
                        id="contact-budget"
                        type="text"
                        placeholder="Budget (optional)"
                        value={form.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        data-testid="input-contact-budget"
                        className={inputCls(false)}
                      />
                    </Field>

                    {/* Message */}
                    <Field error={errors.message}>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Message"
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        data-testid="input-contact-message"
                        className={`${inputCls(!!errors.message)} resize-none`}
                      />
                      <div className="flex justify-end mt-1">
                        <span className={`text-xs ${form.message.length < 20 && form.message.length > 0 ? "text-rose-400" : "text-slate-300 dark:text-slate-600"}`}>
                          {form.message.length} / 20 min
                        </span>
                      </div>
                    </Field>

                    {/* Submit */}
                    <div className="flex justify-center w-full pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        data-testid="btn-contact-submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-700 shadow-md shadow-violet-200 dark:shadow-violet-900 group"
                      >
                        {loading ? (
                          <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            Send message
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* ── Sidebar ── */}
            <aside className="md:col-span-2 space-y-6">
              {/* Availability card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl bg-white dark:bg-slate-900 p-7"
                style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
                  </span>
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">Accepting inquiries</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Currently available for new engagements starting next month.
                  Open to contract roles, project-based consulting, and technical reviews.
                </p>
              </motion.div>

              {/* Contact details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="rounded-2xl bg-white dark:bg-slate-900 p-7 space-y-5"
                style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.08)" }}
              >
                <InfoRow icon={Mail} label="Email">
                  <a href="mailto:gb@infoart.ca" className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline">
                    gb@infoart.ca
                  </a>
                </InfoRow>

                <InfoRow icon={Clock} label="Response time">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Within 24 hours</span>
                </InfoRow>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="rounded-2xl bg-white dark:bg-slate-900 p-7"
                style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.08)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Find me online</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 group"
                    data-testid="link-contact-linkedin"
                  >
                    <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                      <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    LinkedIn
                    <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 group"
                    data-testid="link-contact-github"
                  >
                    <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Github className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    </div>
                    GitHub
                    <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>


            </aside>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ── Helpers ── */

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
    "border transition-all duration-300 outline-none",
    "focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 focus:border-transparent",
    hasError
      ? "border-rose-300 dark:border-rose-700 bg-rose-50/30 dark:bg-rose-950/20"
      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600",
  ].join(" ");
}

function Field({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-xs text-rose-500 dark:text-rose-400 font-medium pl-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-violet-500 dark:text-violet-400" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}
