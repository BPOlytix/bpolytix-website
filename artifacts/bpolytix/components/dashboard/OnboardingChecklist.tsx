"use client";

import Link from "next/link";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Circle } from "lucide-react";

type ChecklistItem = {
  label: string;
  href?: string;
};

type ChecklistGroup = {
  section: string;
  items: ChecklistItem[];
};

const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    section: "ACCOUNT SETUP",
    items: [
      { label: "Book your kickoff call", href: "/contact" },
      { label: "Upload your company documents" },
      { label: "Review your service agreement" },
      { label: "Complete your business profile" },
      { label: "Connect your Xero account" },
    ],
  },
  {
    section: "WEBSITE BUILD",
    items: [
      { label: "Submit your website brief", href: "/website-in-3-days" },
      { label: "Send us your logo and any images you want on the site" },
      { label: "Review the page layout we've designed for you" },
      { label: "Check your test site before it goes live" },
      { label: "Give the thumbs up - we launch your site" },
    ],
  },
];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.24,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function OnboardingChecklist() {
  const shouldReduceMotion = useReducedMotion();
  let rowIndex = 0;

  return (
    <section className="rounded-xl border border-[#1E2D3D] bg-[#111F2E] p-6">
      <div className="mb-6">
        <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-[#1E2D3D]">
          <div className="h-full w-0 rounded-full bg-[#00D4AA]" />
        </div>
        <p
          className="text-sm text-[#8892A4]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          0/10 complete
        </p>
      </div>

      <div className="mb-8">
        <h2
          className="text-2xl font-bold leading-tight text-[#F5F7FA]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Getting started
        </h2>
        <p
          className="mt-2 text-sm text-[#8892A4]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Complete these steps to set up your account
        </p>
      </div>

      <div className="space-y-8">
        {CHECKLIST_GROUPS.map((group) => (
          <div key={group.section}>
            <p
              className="mb-3 text-[13px] uppercase text-[#8892A4]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                letterSpacing: "0.08em",
              }}
            >
              {group.section}
            </p>

            <div className="space-y-3">
              {group.items.map((item) => {
                const currentIndex = rowIndex;
                rowIndex += 1;

                return (
                  <motion.div
                    key={item.label}
                    custom={currentIndex}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={shouldReduceMotion ? undefined : "visible"}
                    variants={rowVariants}
                    className="flex min-h-11 items-center gap-3 rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-4 py-3"
                  >
                    <Circle
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#8892A4]"
                      strokeWidth={1.8}
                    />

                    {item.href ? (
                      <Link
                        href={item.href}
                        className="min-w-0 flex-1 text-base text-[#F5F7FA] hover:underline"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <span
                          className="min-w-0 flex-1 text-base text-[#8892A4]"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="shrink-0 text-right text-sm italic text-[#8892A4]"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          Coming soon
                        </span>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
