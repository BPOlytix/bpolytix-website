import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="pt-12 pb-10 md:pt-16 md:pb-12"
      style={{
        backgroundColor: "#0A0F1A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          {/* Logo + tagline */}
          <div>
            <div
              style={{ fontFamily: "var(--font-syne)", fontSize: "20px", color: "#F5F7FA", fontWeight: 700, letterSpacing: "-0.022em" }}
            >
              BPOLytix
            </div>
            <p
              className="mt-3 max-w-[260px]"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4", lineHeight: 1.6 }}
            >
              We build it. You own it after 12 months.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:justify-center">
            {["Services", "Pricing", "Contact", "Legal"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="transition-colors hover:text-[#F5F7FA]"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4" }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            <a
              href="mailto:info@bpolytix.com"
              className="transition-colors hover:text-[#F5F7FA]"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4" }}
            >
              info@bpolytix.com
            </a>
          </div>
        </div>

        <div
          className="footer-bottom mt-8 pt-6 sm:mt-12 sm:pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4" }}>
            © 2026 BPOLytix. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
