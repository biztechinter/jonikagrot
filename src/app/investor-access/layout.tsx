import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Access & Confidential Diligence Data Room",
  description:
    "Register for verified investor credentials to access Jonik Ndovu Farm's financial models, feasibility studies, architectural masterplans, and investment memorandum.",
  openGraph: {
    title: "Investor Access & Diligence Data Room | Jonik Ndovu Farm",
    description:
      "Accredited investor portal registration with online NDA execution for Jonik Ndovu Farm's US$2.4M capital opportunity in Segera, Laikipia.",
  },
};

export default function InvestorAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
