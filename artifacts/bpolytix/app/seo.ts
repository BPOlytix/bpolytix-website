import type { Metadata } from "next";

const SITE_NAME = "BPOLytix";
const OG_IMAGE_URL = "https://bpolytix.com/og-image.png";

type PageMetadataInput = {
  title: string;
  description: string;
  url: string;
};

export function createPageMetadata({
  title,
  description,
  url,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
    },
  };
}
