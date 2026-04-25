markdown# CLAUDE.md — BPOLytix Project
# Version: 2.0 | Updated: 2026-04-25
# Place this file at: bpolytix-website/artifacts/bpolytix/CLAUDE.md
# Claude Code reads this file automatically at the start of every session.

---

## PROJECT IDENTITY

- **Site:** bpolytix.com — SaaS/BPO marketing website
- **Repo:** https://github.com/BPOlytix/bpolytix-website
- **Next.js project root:** artifacts/bpolytix/
- **Vercel root directory:** artifacts/bpolytix/
- **Live URL:** https://bpolytix.com
- **Phase:** Phase 2 — Content Overhaul + Site Restructure
- **Founder:** 20 years as Group Financial Manager (UK & SA) — zero coding. All changes via AI agents.

---

## BRAND POSITIONING — LOCKED

- **Display name:** BPOLytix + Business Process Outsourcing Solutions
  - "BPOLytix" rendered larger, in Syne 700
  - "Business Process Outsourcing Solutions" smaller, DM Sans
  - B, P, O letters in "Business Process Outsourcing" accentuated in #1B77F2 or heavier weight
- **Hero tagline:** "We build it. You own it." — verbatim, two lines, never extended
- **Core positioning:** "We manage your full circle back office operations. One partner. No upfront cost — whilst you focus on income generating operations and scaling your business."
- **Ownership USP:** Build → fixed monthly fee for 12 months → client owns the system fully (applies to AI, Build, and any custom-built deliverable)
- **Invoice/commitment line:** "No invoice until we deliver"
- **Markets:** SA startups + UK SMEs (dual-region — both audiences served on every page)

---

## COPY VOICE — NON-NEGOTIABLE

- **Plain English only.** Write for a smart business owner who has never heard of BPO.
- **Banned words:** vendors, solutions, scalable, leverage, stakeholders, deliverables, streamline, synergy, optimise, onboarding (as a marketing term), frictionless, cutting-edge, innovative, empowering, seamless, full potential, game-changer, transformative
- **Banned phrases:** "We provide", "Why Choose Us", "passionate about", "dedicated to", "our journey", "we believe"
- **Platform name rule:** Only WhatsApp, Slack, and Xero may be named in copy. No other tool, vendor, or platform names appear in user-facing copy.
- **Exception:** "no vendor lock-in" — the word "vendor" is permitted in this one industry-locked phrase only.
- Headlines are concrete claims or plain-English questions
- Short sentences. Active voice. Specific over vague.

---

## SITE ARCHITECTURE — 4-PILLAR STRUCTURE

Locked Session 8. Site organised into four pillars, each with an overview page and individual service pages.
/                                    Homepage
/services/finance                    Finance Office overview
/services/finance/bookkeeping
/services/finance/fractional-cfo
/services/finance/payroll
/services/finance/xero
/services/finance/compliance
/services/ai-automation              AI & Automation Office overview
/services/ai-automation/ai-workflow-automation
/services/ai-automation/ai-agent-build
/services/ai-automation/ai-operations
/services/ai-automation/ai-receptionist
/services/ai-automation/ai-marketing-ops
/services/people                     People Office overview
/services/people/employer-of-record
/services/people/outsourced-hr
/services/people/onboarding
/services/build                      Build Office overview
/services/build/custom-web-app
/services/build/android-app
/services/build/website-in-3-days
/services/build/business-plans
/services/build/business-development
/pricing                             Interactive FP&A pricing dashboard
/about
/contact
/legal
/website-in-3-days                   Existing intake form
/login                               Phase 2 — not yet built
/dashboard                           Phase 2 — not yet built

**Pillar pages already built:** Finance, AI & Automation, People, Build (all live, all share the same template).

**Service detail pages:** Round 1 not yet started.

---

## TECH STACK — DO NOT DEVIATE

- Framework: Next.js 15 with App Router
- Styling: Tailwind CSS
- Animations: Framer Motion
- Charts: Recharts
- Icons: Lucide React ONLY — no other icon libraries
- Fonts: Syne (headings) + DM Sans (body) via next/font/google
- Backend: Supabase (@supabase/supabase-js + @supabase/ssr) — Phase 2, not yet integrated
- Email: Resend
- Package manager: pnpm
- Hosting: Vercel (Hobby tier)
- DNS: Cloudflare → Vercel

---

## COLOUR TOKENS — EXACT HEX, NO SUBSTITUTIONS
Background:   #0D1B2A   — page background, all sections
Surface:      #111F2E   — card and panel backgrounds
Card:         #1C2A3A   — elevated card backgrounds
Accent:       #1B77F2   — CTA buttons, active states, links
Highlight:    #00D4AA   — stats, saving values, success states, live indicators
Text:         #F5F7FA   — primary text
Muted:        #8892A4   — secondary text, labels, placeholders
Border:       #1E2D3D   — all borders — this value only, everywhere
Danger:       #FF4444   — in-house cost totals (signals cost)

---

## TYPOGRAPHY RULES

- Headings: Syne — accessed via `var(--font-syne)`
- Body/UI: DM Sans — accessed via `var(--font-dm-sans)`
- Code: JetBrains Mono
- NEVER use: Inter, Roboto, Arial, system-ui for headings
- Hero headline: min 72px, weight 700, line-height 1.05, letter-spacing -0.022em
- Section H2: 48px, line-height 1.0, letter-spacing -0.022em
- Body: 16–18px, line-height 1.7, letter-spacing -0.011em
- Section labels: 13px, #8892A4, uppercase, letter-spacing 0.08em

---

## DESIGN RULES — NON-NEGOTIABLE

- Dark throughout — #0D1B2A background on ALL sections
- NO white or grey backgrounds anywhere on the site
- NO glassmorphism, NO backdrop-filter blur
- NO stock photos, NO blob illustrations, NO gradient blobs
- NO 3-equal-column grids
- Depth via opacity layering only
- Grain texture: /public/grain.png on all marketing sections
- Asymmetric layouts preferred — text left, visual right
- Section padding: ~72/96 desktop, ~56/72 mobile (tightened Session 11 — match the rhythm of the live pillar pages)
- Max content width: 1440px centered, 32px horizontal inset
- Border: rgba(255,255,255,0.08) on marketing pages, #1E2D3D on hub/calculator/admin pages
- Icons: Lucide React only, one consistent weight
- Buttons: pill shape (border-radius: 9999px)
- Primary CTA: #1B77F2 background, ONE per page
- Ghost button: rgba(255,255,255,0.05), no border

---

## ANIMATION RULES (FRAMER MOTION)

- Scroll-triggered ONLY on marketing pages
- Exception: login card fade-in on /hub page load
- Exception: hero dot grid fade-in on /calculator page load
- Stat counters: count-up on scroll into view
- Cards: translateY(-4px) on hover, 200ms ease
- CTA: glow pulse on hover only, not idle
- Scroll reveals: y 40→0, opacity 0→1, 0.7s
- All transitions: 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)
- useInView with once: true for all scroll triggers
- All Framer Motion components need "use client" directive
- Animated SVG elements: explicit fill and stroke values — NEVER use currentColor or rely on inheritance (caused round 1 hero failure Session 11)
- Respect prefers-reduced-motion on all animated elements — show final/static state when reduced motion is set

---

## PROGRESSIVE DISCLOSURE COMPONENTS — REUSE, DON'T REBUILD

A shared interactive component library lives at `components/ui/`. Always import these, never rebuild inline:

- `Accordion` — pricing page rows, FAQ
- `ExpandableCard` — pillar overview pages, feature cards
- `Modal` — service detail overlays
- `Tooltip` — technical term explanations
- `TabSwitcher` — pricing page pillar tabs

All components mobile-friendly (44px tap targets), Framer Motion for open/close.

---

## KEY FILE LOCATIONS
artifacts/bpolytix/
├── app/
│   ├── layout.tsx                              — root layout, fonts, Tawk.to, WhatsApp button — DO NOT MODIFY
│   ├── page.tsx                                — homepage (Session 11 in progress)
│   ├── about/page.tsx                          — about page
│   ├── services/
│   │   ├── finance/page.tsx                    — Finance pillar overview (live)
│   │   ├── ai-automation/page.tsx              — AI & Automation pillar overview (live)
│   │   ├── people/page.tsx                     — People pillar overview (live)
│   │   └── build/page.tsx                      — Build pillar overview (live)
│   ├── pricing/page.tsx                        — Interactive FP&A dashboard (Session 10)
│   ├── contact/page.tsx
│   ├── legal/page.tsx
│   ├── website-in-3-days/page.tsx
│   ├── calculator/page.tsx                     — quoting engine — DO NOT MODIFY LOGIC
│   ├── hub/                                    — client hub (Phase 2 — not yet built)
│   ├── admin/                                  — admin panel (Phase 2 — not yet built)
│   └── api/
│       ├── contact/route.ts                    — contact form → Resend
│       ├── website-brief/route.ts
│       └── quote-email/route.ts                — calculator quote → Resend
├── components/
│   ├── Nav.tsx                                 — main navigation (4 pillar dropdowns, mobile drawer)
│   ├── HeroSection.tsx                         — homepage hero with hub-and-spoke diagram
│   ├── ServicePageTemplate.tsx                 — reusable service page template (DO NOT MODIFY without explicit instruction)
│   ├── ui/                                     — shared interactive component library
│   │   ├── Accordion.tsx
│   │   ├── ExpandableCard.tsx
│   │   ├── Modal.tsx
│   │   ├── Tooltip.tsx
│   │   ├── TabSwitcher.tsx
│   │   └── index.ts
│   ├── pricing/                                — pricing page components (Session 10)
│   │   ├── BuildFlow.tsx                       — routes 18 service IDs to bespoke flows
│   │   └── ...                                 — 18 bespoke service flow components
│   └── calculator/                             — calculator components (legacy, do not modify logic)
├── lib/
│   ├── calculatorLogic.ts                      — NEVER MODIFY — pure calculation functions
│   ├── industryCopy.ts                         — industry-specific copy map
│   ├── quoteRef.ts                             — quote reference generator
│   └── supabase.ts                             — Supabase client
└── public/
└── grain.png                               — noise texture overlay

---

## ENVIRONMENT VARIABLES
NEXT_PUBLIC_SUPABASE_URL                — Supabase project URL (Phase 2)
NEXT_PUBLIC_SUPABASE_ANON_KEY           — Supabase anon key (Phase 2)
RESEND_API_KEY                          — Resend email API key
NEXT_PUBLIC_TAWKTO_PROPERTY_ID          — Tawk.to widget ID
NEXT_PUBLIC_TAWKTO_WIDGET_ID            — Tawk.to widget ID
NEXT_PUBLIC_VERCEL_ANALYTICS            — Vercel Analytics

---

## CONFIRMED CONTACT DETAILS

- Enquiry email: mitesh@bpolytix.com
- Resend from: no-reply@bpolytix.com
- Resend reply-to: form submitter email (dynamic)
- WhatsApp: +27781790363
- WA click-to-chat: https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix
- Legal entity: BPOLytix Business Solutions

---

## TOOL ROUTING — WHEN TO USE CLAUDE CODE vs CODEX

Locked Session 9. Updated Session 10.

| Task type | Tool |
|---|---|
| Multi-file / architectural / refactors across pages | Claude Code |
| New page builds, contained component edits, single-file copy/style changes | Codex (GPT-5.5 High reasoning) |
| Visual / frontend debug | Claude Code (load bpolytix-frontend-debugger skill first) |
| Backend / API / deploy debug | Claude Code (load bpolytix-backend-debugger skill first) |
| File inspection / diagnostic without code change | Either — Codex preferred for token cost |

Claude Code is for tasks where reasoning across multiple files matters more than throughput. Codex is for contained tasks where the brief defines the answer.

---

## CRITICAL RULES FOR CLAUDE CODE

1. **NEVER modify lib/calculatorLogic.ts under any circumstances**
2. **NEVER modify components/ServicePageTemplate.tsx without explicit instruction**
3. **NEVER modify components/ui/* without explicit instruction** — these are shared, changes ripple across the site
4. **NEVER modify components/pricing/* without explicit instruction** — this is the Session 10 pricing dashboard
5. **NEVER change any colour to anything outside the token list above**
6. **NEVER use a font other than Syne, DM Sans, or JetBrains Mono**
7. **NEVER add new npm/pnpm packages without stating the reason and confirming with the user**
8. **NEVER modify app/layout.tsx unless explicitly instructed**
9. **NEVER touch Supabase RLS policies without explicit instruction**
10. **NEVER use platform/vendor names in copy except WhatsApp, Slack, Xero (and "vendor" only inside the locked phrase "no vendor lock-in")**
11. Always use pnpm — never npm or yarn
12. **Always verify the build using `cmd /c pnpm build`** — Windows PowerShell blocks `pnpm.ps1` directly
13. One change at a time — verify before the next
14. After any change, state exactly which files were modified
15. After a successful task, commit with a clear message and push to origin/main

---

## GIT WORKFLOW (WINDOWS POWERSHELL — ONE COMMAND AT A TIME)

```powershell
git add .
git commit -m "message"
git pull --rebase origin main
git push
```

Never use && chaining in PowerShell.
Vercel auto-deploys on push to main.

---

## DEFERRED — DO NOT ACTION

The following are out of scope until explicitly raised:

- KYC/AML service (Year 2 review)
- Supabase auth/portal build (Phase 2 — after content overhaul complete)
- Tawk.to customisation (Phase 3)
- WhatsApp Business API (Phase 3)
- Xero OAuth integration (backlog)
- DMARC tightening (p=none → p=quarantine) (backlog)
- Resend from address change (no-reply → real mailbox) (backlog)
- Repo structure cleanup (move out of artifacts/) (backlog)
- mockup-sandbox @/lib/calculatorLogic resolution failure (backlog — separate sandbox, not user-facing)
- Recruitment-as-a-Service (removed — EOR covers hiring compliance)

---

## SESSION CONTEXT

The current session is **Session 11 — Phase 2 — Content Overhaul + Site Restructure**.

Recent decisions in scope this session:
- Homepage hero rebuilt with hub-and-spoke 4-pillar diagram
- Comparison table added to Finance pillar page
- 6-section homepage update underway (hero done, stats / process / services / trust / CTA banner pending)

For full session-by-session history, see HANDOFF-session-{N}.md and BuildChecklist-v{X}.md in the project root (parent of artifacts/bpolytix).

---

## VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-04-23 | Initial creation |
| 2.0 | 2026-04-25 | Major update for Session 11: brand positioning section added, copy voice rules, 4-pillar architecture, component library locations, tool routing rules, cmd /c pnpm build workaround, expanded protected files list |