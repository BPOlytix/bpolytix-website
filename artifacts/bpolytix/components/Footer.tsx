import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0A0F1A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "64px",
        paddingBottom: "48px",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "20px",
                color: "#F5F7FA",
                fontWeight: 700,
                letterSpacing: "-0.022em",
              }}
            >
              BPOLytix
            </div>
            <p
              className="mt-3 max-w-[260px]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                color: "#8892A4",
                lineHeight: 1.6,
              }}
            >
              We build it. You own it after 12 months.
            </p>
          </div>

          {/* Centre */}
          <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:justify-center">
            {["Services", "Pricing", "Contact", "Legal"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="transition-colors hover:text-[#F5F7FA]"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  color: "#8892A4",
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            <a
              href="mailto:info@bpolytix.com"
              className="transition-colors hover:text-[#F5F7FA]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                color: "#8892A4",
              }}
            >
              info@bpolytix.com
            </a>
            <a
              href="https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-4 py-2 text-[13px] font-medium transition-colors hover:bg-white/10"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#F5F7FA",
              }}
            >
              WhatsApp us
            </a>
          </div>
        </div>

        <div
          className="mt-12 pt-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "13px",
              color: "#8892A4",
            }}
          >
            © 2026 BPOLytix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
