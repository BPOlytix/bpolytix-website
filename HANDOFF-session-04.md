# HANDOFF.md — Session 4
Date: 2026-04-22
Phase: Phase 1 — Week 1

---

## What was completed this session

- Resend account created and bpolytix.com domain verified ✅
- RESEND_API_KEY added to Vercel environment variables ✅
- Resend API route created at artifacts/bpolytix/app/api/contact/route.ts ✅
- Contact form handleSubmit replaced — POSTs to /api/contact via fetch (mailto fallback removed) ✅
- From address: BPOLytix <no-reply@bpolytix.com> ✅
- To address: mitesh@bpolytix.com ✅
- Reply-To: set to form submitter's email address ✅
- Email delivery confirmed — test email received, Resend status: Delivered ✅
- Tawk.to widget embedded via TawkChat.tsx in artifacts/bpolytix/app/layout.tsx ✅
- Tawk.to confirmed live on all pages ✅
- Inline WhatsApp buttons removed from CTABanner.tsx and Footer.tsx ✅
- WhatsApp floating button (WhatsAppButton.tsx) created and positioned bottom-left ✅
- WhatsApp button hidden on mobile below 768px ✅
- WhatsApp button confirmed working — correct number and pre-filled message ✅
- DMARC TXT record added to Cloudflare (_dmarc.bpolytix.com) ✅
- DMARC verified via MXToolbox — record published and valid ✅
- All changes committed and pushed to GitHub ✅
- Vercel deployments successful throughout session ✅

## Current state of the build

- Last working Replit URL: [paste your Replit URL]
- Last GitHub commit: "Move WhatsApp floating button to bottom-left to avoid Tawk.to conflict"
- Vercel deployment: ✅ Live
- Site live: ✅ YES — bpolytix.com

## Errors encountered this session

| Error | Root Cause | Fix Applied |
|---|---|---|
| Resend 550 bounce | onboarding@resend.dev cannot send to external addresses | Changed from address to no-reply@bpolytix.com |
| WhatsApp button not visible | Tawk.to widget overlapping at same z-index and position | Moved WhatsApp button to bottom-left |
| WhatsApp button removed accidentally | Change prompt issued before previous work was committed | Restored WhatsAppButton.tsx and re-committed |
| DMARC not configured | Record never added to Cloudflare | Added _dmarc TXT record manually in Cloudflare |

## Prompt errors this session (Team Lead accountability)

| Error | Impact | Root Cause |
|---|---|---|
| Issued remove prompt before confirming commit | WhatsApp button lost from live site | Did not verify GitHub state before prompting |
| Misidentified both desktop screenshots as mobile/desktop mix | Wrong diagnosis | Did not describe screenshot before responding |
| Converted "floating icon" instruction to static button | Incorrect implementation | Did not read instruction literally |

## Decisions locked this session

| Decision | Value | Date |
|---|---|---|
| Resend from address | no-reply@bpolytix.com | 2026-04-22 |
| Resend to address | mitesh@bpolytix.com | 2026-04-22 |
| Resend reply-to | Form submitter email (dynamic) | 2026-04-22 |
| WhatsApp button position | Fixed bottom-left, 24px offsets | 2026-04-22 |
| WhatsApp button mobile | Hidden below 768px | 2026-04-22 |
| DMARC policy | p=none (monitor only) — tighten later | 2026-04-22 |
| Tawk.to customisation | Deferred — response messages, design, automation to later session | 2026-04-22 |
| WhatsApp automation | Deferred to Phase 3 (WhatsApp Business API) | 2026-04-22 |

## Deferred — do not action yet

- Tawk.to widget customisation (response messages, departments, branding)
- WhatsApp Business API integration (Phase 3)
- Pricing figures — awaiting founder confirmation of GBP amounts
- New service: Website in 3 Days — approved for Session 5 build

## New service approved this session — Website in 3 Days

- Route: /website-in-3-days
- Structure: Service card on Services page + dedicated landing page with intake form
- Form fields: Business name, your name, email, business description, asset link, requirements
- No file upload in Phase 1 — use Google Drive/Dropbox link field instead
- Copy locked:
  - Card tagline: "Brief us on Monday. Review your site on Thursday. Pay only when you're satisfied."
  - Page headline: "Your business online in 72 hours."
  - Subheadline: "We design and deploy a production-ready website in 3 days. No invoice until you've seen it and approved it."
  - CTA: "Start my 3-day build →"
  - Trust line: "No payment. No commitment. Just a website you can actually review."
  - Post-submit: "We've got your brief. Expect a site to review within 3 business days."

## What to do in the next session (in order)

1. Verify WhatsApp floating button is confirmed live and visible at bottom-left on desktop
2. Build new service: Website in 3 Days — service card + /website-in-3-days landing page with intake form
3. Wire intake form to send to mitesh@bpolytix.com via Resend (same pattern as contact form)
4. Add new service to Services page bento grid
5. Confirm Vercel Analytics — add to layout.tsx
6. Review and confirm pricing figures (or swap placeholders for "Available on request")

## Files to save before closing this session

- [ ] HANDOFF-session-04.md (this file)
- [ ] BuildChecklist-v1.5.md (updated)
- [ ] PROJECT.md (updated)
- [ ] Confirm GitHub push is current

---

## Session 5 Opener Prompt

Paste this exactly at the start of your next Claude chat:

```
You are the Team Lead for the BPOLytix website project. This is Session 5.

Load context from project files:
- SKILLS.md v1.2
- PROJECT.md
- BuildChecklist-v1.5.md
- AGENTS.md v1.2
- HANDOFF-session-04.md

Project summary:
- Building bpolytix.com — SaaS/BPO marketing site for SA startups and UK SMEs
- Stack: Next.js 15, Tailwind CSS, Framer Motion, Supabase, Resend, Vercel
- Design: #0A0F1A bg, Syne + DM Sans fonts, linear.app register
- Founder is a complete beginner — all changes via Replit Agent, Claude Code, or Codex only
- Enquiry email: mitesh@bpolytix.com | WhatsApp: +27781790363
- Next.js project lives at: artifacts/bpolytix/ inside the repo
- Resend from: no-reply@bpolytix.com | to: mitesh@bpolytix.com | reply-to: form submitter

Session 4 completed: Resend integration, Tawk.to widget, WhatsApp floating button, 
DMARC record. All integrations live and verified.

Session 5 tasks (in order):
1. Confirm WhatsApp floating button visible bottom-left on live site
2. Build Website in 3 Days service card on Services page
3. Build /website-in-3-days landing page with intake form
4. Wire intake form → mitesh@bpolytix.com via Resend
5. Add Vercel Analytics to layout.tsx
6. Review pricing placeholders

Deferred — do not action:
- Tawk.to customisation
- WhatsApp Business API
- Pricing figures (awaiting founder confirmation)

Rules:
- Read instructions literally before generating any prompt
- Confirm previous work is committed before issuing new change prompts
- Describe screenshots before diagnosing
- One change at a time — verify before proceeding
- Never add, remove or modify anything outside stated scope
- Generate HANDOFF.md at session close
```
