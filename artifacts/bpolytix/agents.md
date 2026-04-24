# CODEX.md — BPOLytix Website
# Version: 1.0 | Created: 2026-04-24
# Place this file at: artifacts/bpolytix/CODEX.md
# Read this file at the start of every Codex session before doing anything else.

---

## WHO YOU ARE

You are the specialist engineer executing contained build tasks for bpolytix.com.
Your Team Lead has already made all architectural and design decisions.
Your job is precise execution within the constraints below.

- Read this entire file before writing a single line
- Execute the task as specified — do not expand scope
- Do not make design decisions — they are already made
- If something is genuinely ambiguous, stop and ask — do not assume
- When done, state exactly which files were created or modified

---

## PROJECT IDENTITY

- **Site:** bpolytix.com — SaaS/BPO marketing website
- **Repo:** https://github.com/BPOlytix/bpolytix-website
- **Project root:** artifacts/bpolytix/
- **Live URL:** https://bpolytix.com
- **Package manager:** pnpm — always pnpm, never npm or yarn

---

## TECH STACK — DO NOT DEVIATE

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React ONLY
- Fonts: Syne + DM Sans via next/font/google
- Package manager: pnpm

Do not install new packages without stating the reason.
Do not suggest alternative libraries — use what is listed above.

---

## COLOUR TOKENS — USE ONLY THESE

```
Background:  #0D1B2A
Surface:     #111F2E
Card:        #1C2A3A
Accent:      #1B77F2
Highlight:   #00D4AA
Text:        #F5F7FA
Muted:       #8892A4
Border:      #1E2D3D
Danger:      #FF4444
```

No white. No grey. No off-white. Dark throughout — no exceptions.

---

## TYPOGRAPHY

- Headings: Syne via `var(--font-syne)` — weight 700
- Body: DM Sans via `var(--font-dm-sans)`
- NEVER: Inter, Roboto, Arial, system-ui for headings
- Hero: min 72px, weight 700, line-height 1.05, letter-spacing -0.022em
- H2: 48px, line-height 1.0, letter-spacing -0.022em
- Body: 16–18px, line-height 1.7
- Labels: 13px, #8892A4, uppercase, letter-spacing 0.08em

---

## LAYOUT CONSTRAINTS

- Dark background #0D1B2A on every section — no exceptions
- No glassmorphism, no backdrop-filter blur
- No stock photos, no blob illustrations, no gradient blobs
- No 3-equal-column grids
- Asymmetric preferred — text left, visual right
- Section padding: 96px top / 128px bottom
- Max width: 1440px, 32px horizontal inset
- Buttons: pill shape (border-radius: 9999px)
- Primary CTA: #1B77F2, one per section
- Grain texture overlay: /public/grain.png on marketing sections

---

## ANIMATION CONSTRAINTS (FRAMER MOTION)

- Scroll-triggered only on marketing pages
- Scroll reveals: y 40→0, opacity 0→1, 0.7s
- Cards: translateY(-4px) on hover, 200ms ease
- CTA: glow pulse on hover only — never idle
- useInView with once: true on all scroll triggers
- "use client" directive required on all Framer Motion components

### Workflow diagram animations
When building animated process/workflow visuals:
- Nodes must move along connector paths — not just fade in
- Arrows and edges show direction of flow
- Nodes animate sequentially with stagger — not simultaneously
- Use Framer Motion path animation or sequential motion variants
- Node colours: #1B77F2 or #00D4AA
- Connector colours: #1E2D3D or rgba(255,255,255,0.15)
- Loop or replay on scroll re-entry

---

## COPY CONSTRAINTS

- Plain English only
- No jargon — banned: vendors, solutions, scalable, leverage, stakeholders,
  deliverables, streamline, synergy, optimise, frictionless, cutting-edge,
  innovative, empowering, seamless
- Every headline is a concrete claim or plain-English question
- Named platforms allowed in copy: WhatsApp, Slack, Xero only
- Never name any other software, tool, or platform in site copy

---

## COMPONENT PATTERNS

### Service page structure (use for all service pages)
Every service page follows this section order:
1. Hero — pillar label, service name, hook line, CTA
2. What it is — 2–3 plain English paragraphs
3. What you get — bento card grid
4. Animated visual — workflow diagram (spec provided per page in prompt)
5. Pricing — ZAR + GBP side by side, ownership line if applicable
6. CTA strip — "Talk to us" → /contact

### Shared UI components (build in components/ui/)
- Accordion — open/close with Framer Motion
- ExpandableCard — collapsed summary, expand on click
- Modal — overlay with Framer Motion fade + scale
- Tooltip — hover desktop, tap mobile, 44px tap target
- TabSwitcher — tab highlight slides with Framer Motion

### Pricing blocks
- ZAR and GBP always side by side
- Ownership line on all AI and Build services: "Yours after 12 months"
- Accordion per service on pricing page

---

## FILE STRUCTURE REFERENCE

```
artifacts/bpolytix/
├── app/
│   ├── layout.tsx                 — DO NOT MODIFY unless instructed
│   ├── page.tsx                   — homepage
│   ├── services/
│   │   ├── finance/page.tsx
│   │   ├── ai-automation/page.tsx
│   │   ├── people/page.tsx
│   │   └── build/page.tsx
│   ├── pricing/page.tsx
│   ├── contact/page.tsx
│   └── calculator/page.tsx        — DO NOT MODIFY
├── components/
│   ├── Nav.tsx
│   ├── ServicePageTemplate.tsx
│   └── ui/
│       ├── Accordion.tsx
│       ├── ExpandableCard.tsx
│       ├── Modal.tsx
│       ├── Tooltip.tsx
│       └── TabSwitcher.tsx
├── lib/
│   └── calculatorLogic.ts         — NEVER MODIFY
└── public/
    └── grain.png
```

---

## HARD LIMITS

1. NEVER modify lib/calculatorLogic.ts
2. NEVER modify layout.tsx unless the task explicitly says to
3. NEVER use colours outside the token list
4. NEVER use fonts other than Syne, DM Sans, JetBrains Mono
5. NEVER name tools or platforms in copy (except WhatsApp, Slack, Xero)
6. NEVER install packages without stating why
7. Always use pnpm
8. Run pnpm build to verify before considering the task complete

---

## GIT — WINDOWS POWERSHELL (ONE COMMAND AT A TIME)

```powershell
git add .
git commit -m "descriptive message"
git pull --rebase origin main
git push
```

No && chaining. One command, wait for response, then next.

---

## DONE CRITERIA

A task is only complete when:
- [ ] The feature works as specified
- [ ] pnpm build passes with no errors
- [ ] No colours outside the token list
- [ ] No fonts other than Syne/DM Sans
- [ ] No layout.tsx modifications (unless instructed)
- [ ] calculatorLogic.ts untouched
- [ ] Files modified are listed explicitly

---

## VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-04-24 | Initial creation — Session 9 |
