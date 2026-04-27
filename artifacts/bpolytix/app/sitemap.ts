import type { MetadataRoute } from "next";

const SITE_URL = "https://bpolytix.com";
const LAST_MODIFIED = new Date("2026-04-27");

const routes: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/contact`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/legal`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/services`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/pricing`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/calculator`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/website-in-3-days`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/services/finance`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/services/ai-automation`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/services/people`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/services/build`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/services/finance/compliance`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/finance/fractional-cfo`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/finance/bookkeeping`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/finance/payroll`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/finance/xero`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/ai-automation/ai-marketing-ops`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/ai-automation/ai-workflow-automation`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/ai-automation/ai-receptionist`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/ai-automation/ai-agent-build`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/ai-automation/ai-operations`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/people/employer-of-record`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/people/outsourced-hr`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/people/onboarding`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/build/website-in-3-days`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/build/custom-web-app`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/build/android-app`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/build/business-plans`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/services/build/business-development`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes;
}
