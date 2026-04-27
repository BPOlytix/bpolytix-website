"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingChecklist } from "@/components/dashboard/OnboardingChecklist";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    const supabase = createClient();

    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-[#F5F7FA]">
      <header className="border-b border-[#1E2D3D] bg-[#111F2E]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <h1
            className="text-xl font-bold leading-tight text-[#F5F7FA]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Dashboard
          </h1>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-[#F5F7FA] transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {isSigningOut ? "Signing out" : "Sign out"}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2
          className="text-[32px] font-bold leading-tight text-[#F5F7FA]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Welcome to your dashboard
        </h2>
        <div className="mt-8">
          <OnboardingChecklist />
        </div>
      </section>
    </main>
  );
}
