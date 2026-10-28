import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Investor Relations",
  description:
    "Direct contact channel with Jonik Ndovu Farm project directors for investment inquiries, institutional partnerships, and scheduled site visits in Segera, Laikipia County.",
  openGraph: {
    title: "Contact & Investor Relations | Jonik Ndovu Farm, Laikipia",
    description:
      "Direct inquiry with project leadership for private equity participation, conservation partnerships, and farm-to-table hospitality inquiries in Kenya.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
