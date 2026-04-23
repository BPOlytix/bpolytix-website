# CLAUDE.md — BPOLytix Project
# Version: 1.0 | Created: 2026-04-23
# Place this file at: bpolytix-website/artifacts/bpolytix/CLAUDE.md
# Claude Code reads this file automatically at the start of every session.

---

## PROJECT IDENTITY

- **Site:** bpolytix.com — SaaS/BPO marketing website
- **Repo:** https://github.com/BPOlytix/bpolytix-website
- **Next.js project root:** artifacts/bpolytix/
- **Vercel root directory:** artifacts/bpolytix/
- **Live URL:** https://bpolytix.com

---

## TECH STACK — DO NOT DEVIATE

- Framework: Next.js 15 with App Router
- Styling: Tailwind CSS
- Animations: Framer Motion
- Charts: Recharts
- Icons: Lucide React ONLY — no other icon libraries
- Fonts: Syne (headings) + DM Sans (body) via next/font/google
- Backend: Supabase (@supabase/supabase-js + @supabase/ssr)
- Email: Resend
- Package manager: pnpm
- Hosting: Vercel (Hobby tier)
- DNS: Cloudflare → Vercel

---

## COLOUR TOKENS — EXACT HEX, NO SUBSTITUTIONS

```
Background:   #0D1B2A   — page background, all sections
Surface:      #111F2E   — card and panel backgrounds
Card:         #1C2A3A   — elevated card backgrounds
Accent:       #1B77F2   — CTA buttons, active states, links
Highlight:    #00D4AA   — stats, saving values, success states
Text:         #F5F7FA   — primary text
Muted:        #8892A4   — secondary text, labels, placeholders
Border:       #1E2D3D   — all borders — this value only, everywhere
Danger:       #FF4444   — in-house cost totals (signals cost)
```

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
- Section padding: 96px top / 128px bottom (marketing pages)
- Max content width: 1440px centered, 32px horizontal inset
- Border: rgba(255,255,255,0.08) on marketing pages
  #1E2D3D on hub/calculator/admin pages
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

---

## KEY FILE LOCATIONS

```
artifacts/bpolytix/
├── app/
│   ├── layout.tsx              — root layout, fonts, Tawk.to, WhatsApp button
│   ├── page.tsx                — homepage
│   ├── about/page.tsx          — about page
│   ├── services/page.tsx       — services page
│   ├── pricing/page.tsx        — pricing page
│   ├── contact/page.tsx        — contact page
│   ├── legal/page.tsx          — legal page (footer only)
│   ├── website-in-3-days/page.tsx
│   ├── calculator/page.tsx     — quoting engine (DO NOT MODIFY LOGIC)
│   ├── hub/                    — client hub (auth-protected)
│   ├── admin/                  — admin panel (auth-protected)
│   └── api/
│       ├── contact/route.ts    — contact form → Resend
│       ├── website-brief/route.ts
│       └── quote-email/route.ts — calculator quote → Resend
├── components/
│   ├── Nav.tsx                 — main navigation
│   ├── calculator/             — calculator components
│   │   ├── ResultsCharts.tsx   — gauge, bar chart, donut
│   │   ├── DrillDownPanel.tsx  — left side panel
│   │   ├── InclusionsPanel.tsx — right side panel
│   │   └── ...
│   └── ...
├── lib/
│   ├── calculatorLogic.ts      — NEVER MODIFY — pure calculation functions
│   ├── industryCopy.ts         — industry-specific copy map
│   ├── quoteRef.ts             — quote reference generator
│   └── supabase.ts             — Supabase client
└── public/
    └── grain.png               — noise texture overlay
```

---

## ENVIRONMENT VARIABLES

```
NEXT_PUBLIC_SUPABASE_URL        — Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   — Supabase anon key
RESEND_API_KEY                  — Resend email API key
NEXT_PUBLIC_TAWKTO_PROPERTY_ID  — Tawk.to widget ID
```

---

## CONFIRMED CONTACT DETAILS

- Enquiry email: mitesh@bpolytix.com
- Resend from: no-reply@bpolytix.com
- Resend reply-to: form submitter email (dynamic)
- WhatsApp: +27781790363
- WA click-to-chat: https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix
- Legal entity: BPOLytix Business Solutions
- Address: Medstone Building, 19 The High Street, Umhlanga, Durban, SA, 4319

---

## CRITICAL RULES FOR CLAUDE CODE

1. NEVER modify lib/calculatorLogic.ts under any circumstances
2. NEVER change any colour to anything outside the token list above
3. NEVER use a font other than Syne, DM Sans, or JetBrains Mono
4. NEVER add new npm/pnpm packages without stating the reason
5. NEVER modify layout.tsx unless explicitly instructed
6. NEVER touch Supabase RLS policies without explicit instruction
7. Always use pnpm — never npm or yarn
8. Always verify the build passes after changes: pnpm build
9. One change at a time — verify before the next
10. After any change, state exactly which files were modified

---

## GIT WORKFLOW (WINDOWS POWERSHELL — ONE AT A TIME)

```powershell
git add .
git commit -m "message"
git pull --rebase origin main
git push
```

Never use && chaining in PowerShell.
Vercel auto-deploys on push to main.

---

## VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-04-23 | Initial creation |
