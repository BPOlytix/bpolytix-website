# BuildChecklist.md — BPOLytix Master Task Tracker
# Version: 1.7 | Updated: 2026-04-22
# Status: [ ] Not started | [~] In progress | [x] Complete | [!] Blocked/Deferred

---

## PRE-BUILD SETUP
- [x] Design constitution finalised (v1.2)
- [x] Colour tokens confirmed and locked
- [x] Typography rules confirmed
- [x] Grain texture approach confirmed
- [x] Enquiry email confirmed: mitesh@bpolytix.com
- [x] WhatsApp confirmed: +27781790363
- [x] Tawk.to account created
- [x] GitHub repo: https://github.com/BPOlytix/bpolytix-website
- [x] grain.png in artifacts/bpolytix/public/
- [x] Vercel account created (BPOLytix_Projects, Hobby)
- [x] Vercel Root Directory: artifacts/bpolytix/
- [x] Cloudflare DNS configured
- [x] Site live at bpolytix.com ✅
- [x] DMARC TXT record added ✅

---

## PHASE 1 — WEEK 1 (MVP BUILD) ✅ COMPLETE

### Homepage ✅
- [x] Hero section
- [x] How It Works
- [x] Services bento grid (9 cards)
- [x] Stats bar
- [x] Trust block
- [x] CTA banner
- [x] Footer
- [x] Mobile responsive + hamburger menu

### Services page ✅
- [x] 8 service sections + Website in 3 Days

### Pricing page ✅
- [x] All blocks + FAQ + Remember banner
- [!] Pricing figures — DEFERRED — awaiting founder confirmation

### Contact page ✅
- [x] Form + sidebar + Resend integration

### Website in 3 Days page ✅
- [x] Landing page + intake form + file upload + Resend

### Integrations ✅
- [x] Resend — contact + brief forms
- [x] Tawk.to widget
- [x] WhatsApp floating button
- [x] Vercel Analytics
- [x] DMARC record

---

## PHASE 2 — WEEK 2

### Animation pass ✅
- [x] Framer Motion scroll-triggered reveals — all pages
- [x] Blur-in reveal (40px, blur 4px→0, 0.7s)
- [x] Card hover lift (8px + drop shadow)
- [x] Teal glow-border on all cards (desktop + mobile touch)
- [x] Blue glow-border-blue on all CTAs
- [x] Stat counter animations
- [x] Hero pulse dot verified
- [x] Bridge animation replays on scroll re-entry

### Pages ✅
- [x] About page (7 sections, SVG animations, stats, nav link)
- [x] Legal page (Privacy, GDPR/POPIA, Terms, Cookies — footer only)
- [x] Footer credit line — "Website by BPOLytix" → /website-in-3-days

### Auth & Portal
- [ ] Supabase project created
- [ ] Supabase auth (email + password)
- [ ] /login page
- [ ] /dashboard shell
- [ ] Route protection middleware
- [ ] Onboarding checklist (static)
- [ ] File upload migration — /api/website-brief → Supabase Storage

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
- [ ] Tawk.to customisation
- [ ] Chatbase account + training + widget
- [ ] Open Graph meta tags (all pages)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Google Search Console verified
- [ ] Core Web Vitals LCP < 2.5s

---

## BACKLOG

- [ ] Content edits and additions — founder compiling after live site review
- [ ] Pricing figures confirmed and updated
- [ ] SA Rand pricing alongside GBP on all service pages
- [ ] Repo structure cleanup — move out of artifacts/
- [ ] DMARC policy tighten (p=none → p=quarantine)
- [ ] Resend from address — change no-reply to real mailbox
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
| WhatsApp | Click-to-chat only (Phase 1) | 2026-04-21 |
| Background | #0D1B2A | 2026-04-21 |
| Fonts | Syne + DM Sans | 2026-04-21 |
| Pricing structure | Per-service cards | 2026-04-21 |
| Aesthetic ref | linear.app | 2026-04-21 |
| Legal entity | BPOLytix Business Solutions | 2026-04-22 |
| Registered address | Medstone Building, 19 The High St, Umhlanga, Durban, SA, 4319 | 2026-04-22 |
| Legal page access | Footer only — no nav link | 2026-04-22 |
| Reveal animation | y 40→0, blur 4px→0, 0.7s | 2026-04-22 |
| Glow border teal | rgba(0,212,170,0.6) — all cards | 2026-04-22 |
| Glow border blue | rgba(27,119,242,0.6) — all CTAs | 2026-04-22 |
| Footer credit | "Website by BPOLytix" → /website-in-3-days | 2026-04-22 |

---

## SESSION LOG

| Session | Date | Completed | Next |
|---|---|---|---|
| 1 | 2026-04-21 | Planning, design constitution, all .md files | GitHub, grain.png, Replit S1 |
| 2 | 2026-04-21 | Homepage, Services, Pricing, Contact, mobile nav | Vercel, Resend, Tawk.to, WhatsApp |
| 3 | 2026-04-22 | Vercel, CVE patch, Cloudflare DNS, site live | Resend, Tawk.to, WhatsApp |
| 4 | 2026-04-22 | Resend, Tawk.to, WhatsApp button, DMARC | Website in 3 Days, Analytics |
| 5 | 2026-04-22 | Website in 3 Days page, file upload, Vercel Analytics | Animation pass, About, Legal |
| 6 | 2026-04-22 | Animation pass, About page, Legal page, footer credit | Supabase auth, portal shell |