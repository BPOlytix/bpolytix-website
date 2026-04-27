import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Outsourced Payroll — SA & UK | BPOLytix",
  description:
    "Payroll processing, payslips, PAYE submissions. SA and UK payroll handled monthly.",
  url: "https://bpolytix.com/services/finance/payroll",
});

export default function PayrollLayout({ children }: { children: ReactNode }) {
  return children;
}
