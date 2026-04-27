"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const supabase = createClient();
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setIsLoading(false);
      setError("Email or password is incorrect.");
      return;
    }

    const user = signInData.user;
    const { data: profile } = user
      ? await supabase.from("profiles").select("role").eq("id", user.id).single()
      : { data: null };

    const redirectPath = profile?.role === "admin" ? "/admin" : "/portal/web-build";

    router.replace(redirectPath);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D1B2A] px-6 py-16">
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md rounded-xl border border-[#1E2D3D] bg-[#111F2E] p-8"
      >
        <div className="mb-8 text-center">
          <h1
            className="text-[32px] font-bold leading-tight text-[#F5F7FA]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Sign in
          </h1>
          <p
            className="mt-2 text-base text-[#8892A4]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Access your client dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span
              className="mb-2 block text-sm font-medium text-[#F5F7FA]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="min-h-11 w-full rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-4 py-3 text-[#F5F7FA] outline-none placeholder:text-[#8892A4] focus:border-[#1B77F2] focus:ring-2 focus:ring-[#1B77F2]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
          </label>

          <label className="block">
            <span
              className="mb-2 block text-sm font-medium text-[#F5F7FA]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Password"
              className="min-h-11 w-full rounded-lg border border-[#1E2D3D] bg-[#0D1B2A] px-4 py-3 text-[#F5F7FA] outline-none placeholder:text-[#8892A4] focus:border-[#1B77F2] focus:ring-2 focus:ring-[#1B77F2]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="flex min-h-11 w-full items-center justify-center rounded-full bg-[#1B77F2] px-5 py-3 text-base font-semibold text-[#F5F7FA] transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {isLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#F5F7FA]/30 border-t-[#F5F7FA]" />
            ) : (
              "Sign in"
            )}
          </button>

          {error ? (
            <p
              className="text-center text-sm text-[#FF4444]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {error}
            </p>
          ) : null}
        </form>
      </motion.section>
    </main>
  );
}
