"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";

const FEATURES = [
  "See it first — pay only when you're satisfied. No upfront fees.",
  "Unlimited pages to market your brand",
  "Live chat included at no extra cost",
  "Option to add a client portal (available as an upgrade)",
  "Works perfectly on mobile and all devices",
  "No hidden costs — everything is included",
  "Free changes for 12 months after we deliver",
  "We connect your domain or help you get one",
  "Contact form — enquiries go straight to your inbox",
  "WhatsApp chat button so visitors can reach you instantly",
  "Set up so Google can find your business",
  "Fast loading and secure by default (HTTPS included)",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function WebsiteIn3DaysPage() {
  const [form, setForm] = useState({
    businessName: "",
    name: "",
    email: "",
    description: "",
    assetLink: "",
    requirements: "",
  });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/website-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  const scrollToForm = () => {
    const el = document.getElementById("brief");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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

      {/* SECTION 1 — Hero */}
      <section className="w3d-hero relative overflow-hidden" style={{ backgroundColor: "#0A0F1A" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1100px] px-6 sm:px-8">
          <p className="mb-4 text-[13px]" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
            Web Design
          </p>
          <h1
            className="w3d-h1 max-w-[900px]"
            style={{
              fontFamily: "var(--font-syne)",
              color: "#F5F7FA",
              letterSpacing: "-0.022em",
              lineHeight: 1.0,
              fontWeight: 700,
            }}
          >
            Your business online in 72 hours.
          </h1>
          <p
            className="w3d-sub mt-6 max-w-[640px]"
            style={{
              fontFamily: "var(--font-dm-sans)",
              color: "#8892A4",
              fontSize: "18px",
              lineHeight: 1.7,
              letterSpacing: "-0.011em",
            }}
          >
            We design and deploy a production-ready website in 3 days. No invoice
            until you&apos;ve seen it and approved it.
          </p>
          <p
            className="mt-3 max-w-[640px]"
            style={{
              fontFamily: "var(--font-dm-sans)",
              color: "#00D4AA",
              fontSize: "15px",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            No payment. No commitment. Just a website you can actually review.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-px"
              style={{
                backgroundColor: "#1B77F2",
                boxShadow: "0 4px 16px rgba(27,119,242,0.3)",
              }}
            >
              Start my 3-day build
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <style jsx>{`
          .w3d-hero { padding-top: 72px; padding-bottom: 64px; }
          .w3d-h1 { font-size: 44px; }
          @media (min-width: 640px) {
            .w3d-hero { padding-top: 96px; padding-bottom: 80px; }
            .w3d-h1 { font-size: 60px; }
          }
          @media (min-width: 1024px) {
            .w3d-hero { padding-top: 128px; padding-bottom: 96px; }
            .w3d-h1 { font-size: 76px; }
          }
        `}</style>
      </section>

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* SECTION 2 — Features + Pricing */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: "#0F1622" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="w3d-grid">
            {/* Left — feature list */}
            <div>
              <p className="mb-5 text-[13px]" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
                What&apos;s included
              </p>
              <ul className="flex flex-col gap-4">
                {FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "rgba(0,212,170,0.15)",
                        border: "1px solid rgba(0,212,170,0.35)",
                      }}
                    >
                      <Check size={11} color="#00D4AA" strokeWidth={2.5} />
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "16px",
                        color: "#F5F7FA",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — pricing card */}
            <div
              className="rounded-2xl"
              style={{
                backgroundColor: "#0F1622",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "32px",
                alignSelf: "start",
              }}
            >
              <p className="mb-6 text-[13px]" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
                Simple pricing
              </p>

              <div className="mb-6">
                <p
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "44px",
                    color: "#F5F7FA",
                    letterSpacing: "-0.022em",
                    lineHeight: 1.0,
                    fontWeight: 700,
                  }}
                >
                  R850 / £40
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "13px",
                    color: "#8892A4",
                  }}
                >
                  Once-off setup
                </p>
              </div>

              <div className="mb-6">
                <p
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "32px",
                    color: "#1B77F2",
                    letterSpacing: "-0.022em",
                    lineHeight: 1.0,
                    fontWeight: 700,
                  }}
                >
                  R299 / £15
                  <span style={{ fontSize: "16px", color: "#8892A4", fontWeight: 500 }}> / month</span>
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "13px",
                    color: "#8892A4",
                  }}
                >
                  Monthly
                </p>
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", margin: "8px 0 20px" }} />

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  color: "#00D4AA",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                After 12 months — the website is yours.
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  color: "#8892A4",
                  lineHeight: 1.5,
                }}
              >
                Only your domain renewal to pay.
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-px"
                style={{
                  backgroundColor: "#1B77F2",
                  boxShadow: "0 4px 16px rgba(27,119,242,0.25)",
                }}
              >
                Start my 3-day build
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .w3d-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
          }
          @media (min-width: 1024px) {
            .w3d-grid {
              grid-template-columns: 1fr 440px;
              gap: 64px;
              align-items: start;
            }
          }
        `}</style>
      </section>

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* SECTION 3 — Intake form */}
      <section
        id="brief"
        className="relative overflow-hidden py-16 lg:py-24"
        style={{ backgroundColor: "#0A0F1A" }}
      >
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[760px] px-6 sm:px-8">
          <p className="mb-4 text-[13px]" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
            Your brief
          </p>

          {state === "success" ? (
            <div
              className="rounded-2xl p-8 sm:p-10"
              style={{
                backgroundColor: "#0F1622",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
              }}
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
                Brief received.
              </h2>
              <p
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "16px", color: "#8892A4", lineHeight: 1.7 }}
              >
                We&apos;ve got your brief. Expect a site to review within 3 business days.
                We&apos;ll be in touch if we need anything else.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl"
              style={{
                backgroundColor: "#0F1622",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "40px",
              }}
            >
              <h2
                className="mb-2"
                style={{ fontFamily: "var(--font-syne)", fontSize: "22px", color: "#F5F7FA", letterSpacing: "-0.022em", fontWeight: 600 }}
              >
                Tell us about your business.
              </h2>
              <p
                className="mb-7"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4", lineHeight: 1.6 }}
              >
                No brief is too short. Fill in what you know — we&apos;ll do the research.
              </p>

              <div className="mb-5">
                <label htmlFor="businessName" style={labelBase}>What&apos;s your business called?</label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  value={form.businessName}
                  onChange={handleChange}
                  style={inputBase}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="name" style={labelBase}>Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  style={inputBase}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" style={labelBase}>Your email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputBase}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="description" style={labelBase}>Tell us what your business does</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="Plain language is perfect — no jargon needed."
                  value={form.description}
                  onChange={handleChange}
                  style={{ ...inputBase, resize: "vertical", minHeight: "110px" }}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="assetLink" style={labelBase}>
                  Do you have a logo, photos or any existing designs? If yes, pop them
                  in a Google Drive or Dropbox folder and paste the link here.
                </label>
                <input
                  id="assetLink"
                  name="assetLink"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={form.assetLink}
                  onChange={handleChange}
                  style={inputBase}
                />
              </div>

              <div className="mb-8">
                <label htmlFor="requirements" style={labelBase}>
                  Anything specific you&apos;d like on your website?
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={3}
                  placeholder="e.g. a booking form, gallery, specific colours — or leave blank and we'll suggest what works."
                  value={form.requirements}
                  onChange={handleChange}
                  style={{ ...inputBase, resize: "vertical", minHeight: "90px" }}
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
                {state === "submitting" ? "Sending…" : "Send my brief"}
                {state !== "submitting" && <ArrowRight size={15} />}
              </button>

              {state === "error" && (
                <p
                  className="mt-4 text-center"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#FF6B6B" }}
                >
                  Something went wrong. Please email us directly at{" "}
                  <a href="mailto:mitesh@bpolytix.com" style={{ color: "#1B77F2" }}>
                    mitesh@bpolytix.com
                  </a>
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
