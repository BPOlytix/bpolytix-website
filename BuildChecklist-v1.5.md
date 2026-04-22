# BuildChecklist.md — BPOLytix Master Task Tracker
# Version: 1.5 | Updated: 2026-04-22
# Status: [ ] Not started | [~] In progress | [x] Complete | [!] Blocked/Deferred

---

## PRE-BUILD SETUP

- [x] Design constitution finalised (v1.2)
- [x] Linear.app design analysis completed and incorporated
- [x] Colour tokens confirmed and locked (#0A0F1A bg, #1B77F2 CTA, #00D4AA highlight)
- [x] Typography rules confirmed (Syne + DM Sans, -0.022em/-0.011em tracking, 1.0 lh)
- [x] Grain texture approach confirmed
- [x] Enquiry email confirmed: mitesh@bpolytix.com
- [x] WhatsApp confirmed: +27781790363
- [x] Tawk.to account created
- [x] Pricing tier names recommended: Launch / Scale / Command
- [x] GitHub account created (BPOlytix)
- [x] GitHub repo URL confirmed: https://github.com/BPOlytix/bpolytix-website
- [x] grain.png sourced and added to artifacts/bpolytix/public/
- [x] Replit project created and linked to GitHub
- [x] Vercel account created (free Hobby — BPOLytix_Projects)
- [x] Vercel project linked to GitHub repo (Root Directory: artifacts/bpolytix/)
- [x] Cloudflare account created (info@bpolytix.com)
- [x] IONOS nameservers updated to Cloudflare
- [x] Cloudflare DNS: CNAME records added → cname.vercel-dns.com (DNS only)
- [x] Site live at bpolytix.com ✅
- [x] DMARC TXT record added to Cloudflare (_dmarc.bpolytix.com, p=none) ✅

---

## PHASE 1 — WEEK 1 (MVP BUILD)

### Homepage
- [x] Hero section (headline, subheadline, CTA, pulse dot, grain overlay)
- [x] How It Works (vertical timeline: 1.0 Engage → 6.0 Own)
- [x] Services bento grid (8 cards, asymmetric layout)
- [x] Stats bar (70% / R0 / 12 months / 30 days)
- [x] Trust block (4 concrete claims)
- [x] CTA banner
- [x] Footer (links, email, tagline)
- [x] Mobile responsive layout
- [x] Mobile hamburger menu

### Services page
- [x] 8 service sections (practice badges, qualifiers, included items)
- [x] Per-service CTAs → /contact
- [ ] Website in 3 Days service card added to bento grid (Session 5)

### Pricing page
- [x] Technology block (AI Automation, Web Application, Android App)
- [x] Finance block (Bookkeeping, CFO-as-a-Service, Xero Implementation)
- [x] Strategy block (Business Development, Business Plan)
- [x] FAQ section
- [x] "Remember" banner
- [!] Pricing figures — DEFERRED — founder to confirm GBP amounts
  Current placeholders:
  - AI Automation: £950/month
  - Web Application: £1,800/month
  - Android App: £1,500/month
  - Bookkeeping: £550/month
  - CFO-as-a-Service: £1,600/month
  - Xero Implementation: £750 one-time
  - Business Development: £1,200/month
  - Business Plan: £1,800 per plan

### Contact page
- [x] Enquiry form (name, company, email, service selector, message)
- [x] "What happens next" sidebar
- [x] Contact channels (email, WhatsApp, location)
- [x] Form submission → mitesh@bpolytix.com via Resend ✅
- [x] Reply-to set to form submitter email ✅

### New page — Website in 3 Days (Session 5)
- [ ] /website-in-3-days landing page
- [ ] Intake form (business name, name, email, description, asset link, requirements)
- [ ] Form submission → mitesh@bpolytix.com via Resend

### Integrations
- [x] Resend: domain verified in Resend dashboard ✅
- [x] Resend: form → mitesh@bpolytix.com (artifacts/bpolytix/app/api/contact/route.ts) ✅
- [x] Tawk.to: JS snippet in artifacts/bpolytix/app/layout.tsx ✅
- [x] WhatsApp: floating button bottom-left, desktop only ✅
- [ ] Vercel Analytics (Session 5)
- [!] Tawk.to customisation — DEFERRED (response messages, design, automation)
- [!] WhatsApp Business API — DEFERRED to Phase 3

---

## PHASE 2 — WEEK 2

### Animation pass
- [ ] Framer Motion: scroll-triggered fade-ins all sections
- [ ] Framer Motion: stat counter animations
- [ ] Framer Motion: card hover states
- [ ] Framer Motion: CTA pulse hover
- [ ] Hero: pulse dot animation verified
- [ ] Grain texture verified across all sections

### Auth & Portal
- [ ] Supabase project created
- [ ] Supabase auth (email + password)
- [ ] /login page
- [ ] /dashboard shell
- [ ] Route protection middleware
- [ ] Onboarding checklist (static)

### Pages
- [ ] About page
- [ ] Legal page (Privacy, GDPR, Terms)

### Marketing
- [ ] InVideo AI account created
- [ ] Video 1: "Why SA startups overpay for bookkeepers"
- [ ] Video 2: "We built a client an app — what it cost"
- [ ] Video 3: "What is CFO-as-a-Service"
- [ ] TikTok account created
- [ ] Instagram account created
- [ ] LinkedIn company page created
- [ ] First posts published

---

## PHASE 3 — WEEK 3+

- [ ] Client portal: dynamic onboarding checklist
- [ ] Document upload section
- [ ] Meta Business account verified
- [ ] WhatsApp Business API setup
- [ ] Tawk.to customisation (response messages, departments, branding, automation)
- [ ] Chatbase account + training
- [ ] Chatbase widget embedded
- [ ] Open Graph meta tags (all pages)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Google Search Console verified
- [ ] Core Web Vitals LCP < 2.5s

---

## BACKLOG

- [ ] Repo structure cleanup — move project out of artifacts/ to repo root
- [ ] Pricing page — swap placeholders for "Available on request" (optional interim fix)
- [ ] SA Rand pricing added alongside GBP
- [ ] DMARC policy tighten — change p=none to p=quarantine once sending volume confirmed
- [ ] Xero OAuth integration
- [ ] Android app (separate project)
- [ ] Blog/content section
- [ ] Case studies page
- [ ] Custom quote calculator

---

## LOCKED DECISIONS

| Decision | Value | Date |
|---|---|---|
| Hosting | Vercel free Hobby | 2026-04-21 |
| Vercel Root Directory | artifacts/bpolytix/ | 2026-04-22 |
| Backend | Supabase free | 2026-04-21 |
| Chat widget | Tawk.to free | 2026-04-21 |
| WhatsApp | Click-to-chat only (no API Phase 1) | 2026-04-21 |
| Background | #0A0F1A | 2026-04-21 |
| Fonts | Syne + DM Sans | 2026-04-21 |
| Pricing structure | Per-service cards | 2026-04-21 |
| Testimonials | Replaced with Trust Block | 2026-04-21 |
| Aesthetic ref | linear.app | 2026-04-21 |
| Mobile nav | Hamburger menu below md breakpoint | 2026-04-21 |
| Cloudflare DNS proxy | DNS only (grey) — not proxied | 2026-04-22 |
| Resend from address | no-reply@bpolytix.com | 2026-04-22 |
| Resend to address | mitesh@bpolytix.com | 2026-04-22 |
| Resend reply-to | Form submitter email (dynamic) | 2026-04-22 |
| WhatsApp button position | Fixed bottom-left, 24px offsets, desktop only | 2026-04-22 |
| DMARC policy | p=none (monitor only) — tighten in Phase 3 | 2026-04-22 |
| Tawk.to customisation | Deferred to Phase 3 | 2026-04-22 |
| WhatsApp automation | Deferred to Phase 3 | 2026-04-22 |

---

## SESSION LOG

| Session | Date | Completed | Next |
|---|---|---|---|
| 1 | 2026-04-21 | Planning, PRD, Linear analysis, design v1.2, all .md files | Confirm GitHub URL, grain.png, Replit Session 1 |
| 2 | 2026-04-21 | Homepage, Services, Pricing, Contact pages. Mobile nav. GitHub push. | Vercel deploy, Resend, Tawk.to, WhatsApp button |
| 3 | 2026-04-22 | Vercel deployed, CVE patched, Cloudflare DNS, bpolytix.com live | Resend, Tawk.to, WhatsApp button |
| 4 | 2026-04-22 | Resend integration, Tawk.to widget, WhatsApp floating button, DMARC record | Website in 3 Days page, Vercel Analytics, pricing review |
