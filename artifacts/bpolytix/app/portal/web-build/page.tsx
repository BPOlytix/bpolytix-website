"use client";

export default function WebBuildPortalPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D1B2A] px-6">
      <div className="text-center">
        <h1
          className="text-[32px] font-bold leading-tight text-[#F5F7FA]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Web Build Portal
        </h1>
        <p
          className="mt-2 text-base text-[#8892A4]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Loading...
        </p>
      </div>
    </main>
  );
}
