"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";

const SERVICES = [
  "AI Business Automation",
  "Custom Web Application",
  "Android App Development",
  "Bookkeeping & Accounting",
  "CFO-as-a-Service",
  "Business Development",
  "Business Plans & Funding",
  "Xero Implementation",
  "Not sure yet — help me decide",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    service: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          service: form.service,
          message: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const inputBase: React.CSSProperties = {
    backgroundColor: "#0F1622",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "10px",
    padding: "12px 16px",
    fontFamily: "var(--font-dm-sans)",
    fontSize: "15px",
    color: "#F5F7FA",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s ease",
  };

  const labelBase: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans)",
    fontSize: "13px",
    color: "#8892A4",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <main style={{ backgroundColor: "#0A0F1A" }}>
      <Nav />

      {/* Page hero */}
      <section className="contact-hero relative overflow-hidden" style={{ backgroundColor: "#0A0F1A" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <p className="mb-4 text-[13px]" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
            Contact
          </p>
          <h1
            className="contact-h1 max-w-[720px]"
            style={{
              fontFamily: "var(--font-syne)",
              color: "#F5F7FA",
              letterSpacing: "-0.022em",
              lineHeight: 1.0,
              fontWeight: 700,
            }}
          >
            Let&apos;s scope your project.
          </h1>
          <p
            className="contact-sub mt-5 max-w-[520px]"
            style={{
              fontFamily: "var(--font-dm-sans)",
              color: "#8892A4",
              lineHeight: 1.7,
              letterSpacing: "-0.011em",
            }}
          >
            Tell us what you need. We&apos;ll come back within one business day with a clear scope and indicative cost — no commitment required.
          </p>
        </div>
        <style jsx>{`
          .contact-hero { padding-top: 64px; padding-bottom: 56px; }
          .contact-h1 { font-size: 36px; }
          .contact-sub { font-size: 16px; }
          @media (min-width: 640px) {
            .contact-hero { padding-top: 72px; padding-bottom: 64px; }
            .contact-h1 { font-size: 48px; }
          }
          @media (min-width: 1024px) {
            .contact-hero { padding-top: 96px; padding-bottom: 80px; }
            .contact-h1 { font-size: 60px; }
            .contact-sub { font-size: 18px; }
          }
        `}</style>
      </section>

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Main content */}
      <section className="contact-body relative overflow-hidden" style={{ backgroundColor: "#0A0F1A" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="contact-layout">

            {/* Form */}
            <div>
              {state === "success" ? (
                <div
                  className="flex flex-col items-start rounded-2xl p-8 sm:p-10"
                  style={{ backgroundColor: "#0F1622", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(0,212,170,0.12)", border: "1px solid rgba(0,212,170,0.3)" }}
                  >
                    <Check size={26} color="#00D4AA" strokeWidth={2} />
                  </div>
                  <h2
                    className="mb-3"
                    style={{ fontFamily: "var(--font-syne)", fontSize: "28px", color: "#F5F7FA", letterSpacing: "-0.022em", fontWeight: 700 }}
                  >
                    We&apos;ve got your message.
                  </h2>
                  <p
                    className="mb-8 max-w-[440px]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: "16px", color: "#8892A4", lineHeight: 1.7 }}
                  >
                    Your email client should have opened with a pre-filled message. If not, you can reach us directly at{" "}
                    <a href="mailto:info@bpolytix.com" style={{ color: "#1B77F2" }}>info@bpolytix.com</a>. We reply within one business day.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white"
                    style={{ backgroundColor: "#1B77F2" }}
                  >
                    Back to home
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-7 sm:p-10"
                  style={{ backgroundColor: "#0F1622", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <h2
                    className="mb-8"
                    style={{ fontFamily: "var(--font-syne)", fontSize: "22px", color: "#F5F7FA", letterSpacing: "-0.022em", fontWeight: 600 }}
                  >
                    Tell us about your project
                  </h2>

                  <div className="form-row mb-5">
                    <div>
                      <label htmlFor="name" style={labelBase}>Your name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        style={inputBase}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" style={labelBase}>Company</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Acme Ltd"
                        value={form.company}
                        onChange={handleChange}
                        style={inputBase}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" style={labelBase}>Email address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@acme.co.uk"
                      value={form.email}
                      onChange={handleChange}
                      style={inputBase}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="service" style={labelBase}>Service you&apos;re interested in</label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{ ...inputBase, appearance: "none", cursor: "pointer" }}
                    >
                      <option value="" disabled>Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} style={{ backgroundColor: "#0F1622", color: "#F5F7FA" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" style={labelBase}>What are you trying to solve? *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe the problem or opportunity in plain language. The more context, the better our first response."
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...inputBase, resize: "vertical", minHeight: "120px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-px disabled:opacity-60"
                    style={{
                      backgroundColor: "#1B77F2",
                      boxShadow: "0 4px 16px rgba(27,119,242,0.3)",
                      cursor: state === "submitting" ? "wait" : "pointer",
                    }}
                  >
                    {state === "submitting" ? "Sending…" : "Send message"}
                    <ArrowRight size={15} />
                  </button>

                  <p className="mt-4 text-center text-[12px]" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
                    No spam. No sales calls. We reply with a clear scope, not a pitch.
                  </p>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="flex flex-col gap-5">
              {/* What to expect */}
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#0F1622", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3
                  className="mb-5"
                  style={{ fontFamily: "var(--font-syne)", fontSize: "17px", color: "#F5F7FA", letterSpacing: "-0.022em", fontWeight: 600 }}
                >
                  What happens next
                </h3>
                {[
                  { step: "1", text: "We read your message and do our own research on your business." },
                  { step: "2", text: "Within one business day, you get a reply with a clear scope and indicative cost." },
                  { step: "3", text: "If it fits, we schedule a 30-minute video call to confirm the details." },
                  { step: "4", text: "We start. You see progress from week one." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 mb-4 last:mb-0">
                    <span
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-medium"
                      style={{
                        backgroundColor: "rgba(27,119,242,0.15)",
                        color: "#1B77F2",
                        fontFamily: "var(--font-dm-sans)",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      {item.step}
                    </span>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4", lineHeight: 1.6 }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#0F1622", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3
                  className="mb-5"
                  style={{ fontFamily: "var(--font-syne)", fontSize: "17px", color: "#F5F7FA", letterSpacing: "-0.022em", fontWeight: 600 }}
                >
                  Other ways to reach us
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:info@bpolytix.com"
                    className="flex items-start gap-3 transition-colors hover:text-[#F5F7FA] group"
                  >
                    <Mail size={16} color="#1B77F2" className="mt-0.5 flex-none" />
                    <div>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4" }}>Email</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#C8D0DC" }}>info@bpolytix.com</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 transition-colors hover:text-[#F5F7FA]"
                  >
                    <MessageSquare size={16} color="#00D4AA" className="mt-0.5 flex-none" />
                    <div>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4" }}>WhatsApp</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#C8D0DC" }}>+27 78 179 0363</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} color="#8892A4" className="mt-0.5 flex-none" />
                    <div>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4" }}>Based in</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#C8D0DC" }}>South Africa — serving UK SMEs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} color="#8892A4" className="mt-0.5 flex-none" />
                    <div>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4" }}>Response time</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#C8D0DC" }}>Within 1 business day</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick reassurance */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(27,119,242,0.08) 0%, rgba(0,212,170,0.05) 100%)",
                  border: "1px solid rgba(27,119,242,0.18)",
                }}
              >
                <p
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#C8D0DC", lineHeight: 1.7 }}
                >
                  <span style={{ color: "#00D4AA", fontWeight: 500 }}>No commitment required.</span>{" "}
                  Reaching out costs you nothing. We&apos;ll scope the work honestly and tell you if we&apos;re not the right fit.
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .contact-body { padding-top: 56px; padding-bottom: 80px; }
          .contact-layout { display: flex; flex-direction: column; gap: 24px; }
          .form-row { display: flex; flex-direction: column; gap: 16px; }

          @media (min-width: 640px) {
            .form-row { flex-direction: row; }
            .form-row > * { flex: 1; }
          }

          @media (min-width: 1024px) {
            .contact-body { padding-top: 72px; padding-bottom: 112px; }
            .contact-layout {
              display: grid;
              grid-template-columns: 1fr 420px;
              gap: 48px;
              align-items: start;
            }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
}
