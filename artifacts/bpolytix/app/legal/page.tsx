import { Reveal } from "@/components/Reveal";

const BG = "#0D1B2A";
const SURFACE = "#111F2E";
const TEXT = "#F5F7FA";
const MUTED = "#8892A4";
const BORDER = "#1E2D3D";
const SYNE = "var(--font-syne)";
const DM = "var(--font-dm-sans)";

const anchorStyle = {
  fontFamily: DM,
  fontSize: 13,
  color: MUTED,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const sectionTitleStyle = {
  fontFamily: SYNE,
  fontWeight: 700,
  fontSize: 28,
  color: TEXT,
  marginBottom: 24,
  lineHeight: 1.2,
};

const subHeadingStyle = {
  fontFamily: DM,
  fontSize: 14,
  color: TEXT,
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  marginTop: 32,
  marginBottom: 12,
};

const bodyStyle = {
  fontFamily: DM,
  fontSize: 16,
  color: MUTED,
  lineHeight: 1.8,
};

const dateLineStyle = {
  fontFamily: DM,
  fontSize: 13,
  color: MUTED,
  marginTop: -12,
  marginBottom: 8,
};

const dividerStyle = {
  height: 1,
  background: BORDER,
  border: 0,
  margin: "32px 0 0 0",
};

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ ...bodyStyle, marginTop: 12 }}>{children}</p>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 style={subHeadingStyle}>{children}</h3>;
}

type CardProps = {
  title: string;
  dateLine?: string;
  children: React.ReactNode;
  index: number;
};

function LegalCard({ title, dateLine, children, index }: CardProps) {
  return (
    <Reveal delay={index * 0.1}>
      <section
        className="glow-border"
        style={{
          background: SURFACE,
          borderRadius: 16,
          padding: 48,
          marginBottom: 32,
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2 style={sectionTitleStyle}>{title}</h2>
        {dateLine ? <p style={dateLineStyle}>{dateLine}</p> : null}
        {children}
      </section>
    </Reveal>
  );
}

export default function LegalPage() {
  return (
    <main style={{ background: BG, minHeight: "100vh" }}>
      <section
        style={{
          paddingTop: 100,
          paddingBottom: 64,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
            <p style={anchorStyle}>Legal &amp; Privacy</p>
            <h1
              style={{
                fontFamily: SYNE,
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 64px)",
                color: TEXT,
                marginTop: 16,
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Legal &amp; Privacy
            </h1>
            <p
              style={{
                fontFamily: DM,
                fontSize: 18,
                color: MUTED,
                lineHeight: 1.7,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Plain English. No surprises.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
        <LegalCard
          index={0}
          title="Privacy Policy"
          dateLine="Effective date: April 2026 · Last updated: April 2026"
        >
          <SubHeading>Who We Are</SubHeading>
          <P>
            BPOLytix Business Solutions operates bpolytix.com. Our registered address is Medstone
            Building, 19 The High Street, Umhlanga, Durban, South Africa, 4319. You can reach us at
            mitesh@bpolytix.com.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>What Information We Collect</SubHeading>
          <P>
            We collect information you provide directly — your name, company name, email address,
            and any details you submit through our contact or intake forms. We do not collect
            payment information directly; no card or banking details pass through this website.
          </P>
          <P>
            We also collect limited technical data automatically — your IP address, browser type,
            pages visited, and time spent on the site. This is collected via Vercel Analytics and
            is used solely to improve site performance.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>How We Use Your Information</SubHeading>
          <ul style={{ ...bodyStyle, marginTop: 12, paddingLeft: 20, listStyle: "disc" }}>
            <li>To respond to your enquiry or service request</li>
            <li>To deliver the service you have engaged us for</li>
            <li>To send you information relevant to your enquiry (no unsolicited marketing)</li>
            <li>To comply with legal obligations</li>
          </ul>
          <P>
            We do not sell, rent, or share your personal information with third parties for
            marketing purposes.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>How We Store Your Information</SubHeading>
          <P>
            Form submissions are processed via Resend and delivered to our internal inbox. We
            retain enquiry data for a maximum of 24 months. You may request deletion at any time
            by emailing mitesh@bpolytix.com.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Your Rights</SubHeading>
          <P>
            You have the right to access, correct, or delete any personal information we hold
            about you. To exercise these rights, contact us at mitesh@bpolytix.com. We will respond
            within 30 days.
          </P>
        </LegalCard>

        <LegalCard index={1} title="GDPR & POPIA Compliance">
          <SubHeading>South Africa — POPIA</SubHeading>
          <P>
            BPOLytix Business Solutions processes personal information in accordance with the
            Protection of Personal Information Act 4 of 2013 (POPIA). We process your information
            lawfully, for a specific purpose, and only to the extent necessary for that purpose.
            You have the right to lodge a complaint with the Information Regulator of South Africa
            at inforeg.org.za.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>United Kingdom — GDPR</SubHeading>
          <P>
            For users based in the United Kingdom, we process personal data in accordance with the
            UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. Our
            lawful basis for processing is legitimate interest and, where applicable, consent. You
            have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO)
            at ico.org.uk.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Data Transfers</SubHeading>
          <P>
            Data submitted through this website may be processed by third-party services including
            Vercel (hosting, USA/EU) and Resend (email delivery, USA). Both services operate under
            appropriate data protection frameworks. No data is transferred to countries without
            adequate protection.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Data Retention</SubHeading>
          <P>
            We retain personal data only for as long as necessary to fulfil the purpose for which
            it was collected, or as required by law. Enquiry data is retained for a maximum of 24
            months.
          </P>
        </LegalCard>

        <LegalCard
          index={2}
          title="Terms of Service"
          dateLine="Effective date: April 2026"
        >
          <SubHeading>Acceptance</SubHeading>
          <P>
            By accessing bpolytix.com or engaging BPOLytix Business Solutions for any service, you
            agree to these terms. If you do not agree, do not use this website or our services.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Our Services</SubHeading>
          <P>
            BPOLytix Business Solutions provides technology development, automation, financial,
            and business consulting services to startups and SMEs. Specific terms, deliverables,
            timelines, and pricing for each engagement are agreed in writing before any work
            begins.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>No Invoice Before Satisfaction</SubHeading>
          <P>
            We do not invoice for project work until you have reviewed the deliverable and
            confirmed it meets the agreed brief. This applies to all development and design
            engagements. Ongoing service retainers (bookkeeping, CFO-as-a-Service, business
            development) are invoiced monthly in arrears.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Intellectual Property</SubHeading>
          <P>
            All work product created by BPOLytix Business Solutions remains our intellectual
            property until full payment is received. Upon payment, and after the 12-month
            engagement period where applicable, full ownership transfers to the client. This
            includes source code, designs, and documentation.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Limitation of Liability</SubHeading>
          <P>
            BPOLytix Business Solutions is not liable for any indirect, incidental, or
            consequential losses arising from the use of our services or this website. Our total
            liability in any circumstance is limited to the amount paid by the client in the three
            months preceding the claim.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Governing Law</SubHeading>
          <P>
            These terms are governed by the laws of the Republic of South Africa. For UK-based
            clients, disputes may also be subject to the jurisdiction of the courts of England and
            Wales by mutual agreement.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Changes to These Terms</SubHeading>
          <P>
            We may update these terms at any time. Continued use of our services after changes are
            posted constitutes acceptance of the revised terms.
          </P>
        </LegalCard>

        <LegalCard index={3} title="Cookie Policy">
          <SubHeading>What Are Cookies</SubHeading>
          <P>
            Cookies are small text files stored on your device when you visit a website. They help
            the site remember your preferences and understand how you use it.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>What Cookies We Use</SubHeading>
          <P>This website uses a minimal set of cookies.</P>
          <div style={{ marginTop: 16, overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: DM,
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  {["Cookie", "Purpose", "Duration"].map((h) => (
                    <th
                      key={h}
                      style={{
                        background: BG,
                        color: TEXT,
                        fontSize: 13,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        textAlign: "left",
                        padding: "12px 16px",
                        border: `1px solid ${BORDER}`,
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Vercel Analytics",
                    "Anonymous page view tracking — no personal data",
                    "Session",
                  ],
                  [
                    "Tawk.to",
                    "Live chat functionality — stores chat session state",
                    "Session / 6 months",
                  ],
                  [
                    "Preference cookies",
                    "Remembers if you have dismissed banners",
                    "30 days",
                  ],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          background: SURFACE,
                          color: MUTED,
                          padding: "12px 16px",
                          border: `1px solid ${BORDER}`,
                          lineHeight: 1.6,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            We do not use advertising cookies, tracking pixels, or any third-party marketing
            cookies.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Your Choices</SubHeading>
          <P>
            You can control cookies through your browser settings. Disabling cookies may affect
            the live chat functionality on this site. No other site functionality requires cookies
            to operate.
          </P>

          <hr style={dividerStyle} />
          <SubHeading>Third-Party Cookies</SubHeading>
          <P>
            Tawk.to may set its own cookies for live chat session management. Their cookie policy
            is available at tawk.to/privacy-policy.
          </P>
        </LegalCard>
      </section>
    </main>
  );
}
