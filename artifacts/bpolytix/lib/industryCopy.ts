export type Industry =
  | "Professional Services"
  | "Retail & E-commerce"
  | "Construction & Property"
  | "Logistics & Transport"
  | "Healthcare & Wellness"
  | "Tech & Startups"
  | "Hospitality & Tourism"
  | "Non-profit & NGO";

export type IndustryCopy = {
  reinvestLine: string;
  roiMultiplier: number;
  sectorNote: string;
};

export const INDUSTRIES: readonly Industry[] = [
  "Professional Services",
  "Retail & E-commerce",
  "Construction & Property",
  "Logistics & Transport",
  "Healthcare & Wellness",
  "Tech & Startups",
  "Hospitality & Tourism",
  "Non-profit & NGO",
] as const;

export const INDUSTRY_COPY: Record<Industry, IndustryCopy> = {
  "Professional Services": {
    reinvestLine: "Reinvested into client acquisition and service expansion",
    roiMultiplier: 5,
    sectorNote:
      "Professional service firms typically save 35–55% by outsourcing non-billable finance functions.",
  },
  "Retail & E-commerce": {
    reinvestLine: "Reinvested into inventory, digital marketing and fulfilment",
    roiMultiplier: 4,
    sectorNote:
      "Retail SMEs reduce overhead 30–45% by outsourcing bookkeeping and compliance.",
  },
  "Construction & Property": {
    reinvestLine: "Reinvested into project working capital and equipment",
    roiMultiplier: 4,
    sectorNote:
      "Construction firms save significantly on project accounting and compliance overhead.",
  },
  "Logistics & Transport": {
    reinvestLine: "Reinvested into fleet, route optimisation and driver costs",
    roiMultiplier: 4,
    sectorNote:
      "Transport businesses reduce admin overhead 30–40% through finance outsourcing.",
  },
  "Healthcare & Wellness": {
    reinvestLine:
      "Reinvested into patient experience, equipment and digital ops",
    roiMultiplier: 5,
    sectorNote:
      "Healthcare practices save 40–55% by outsourcing billing, compliance and reporting.",
  },
  "Tech & Startups": {
    reinvestLine: "Reinvested into product development and growth marketing",
    roiMultiplier: 6,
    sectorNote:
      "Startups that outsource finance functions early scale 2x faster on average.",
  },
  "Hospitality & Tourism": {
    reinvestLine:
      "Reinvested into guest experience, marketing and seasonal ops",
    roiMultiplier: 3,
    sectorNote:
      "Hospitality operators save 25–40% by outsourcing back-office finance functions.",
  },
  "Non-profit & NGO": {
    reinvestLine: "Reinvested into programme delivery and donor reporting",
    roiMultiplier: 3,
    sectorNote:
      "NGOs improve fund utilisation by 30–45% through outsourced finance and compliance.",
  },
};
