import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";

// self-hosted fonts (no external requests; works offline & behind firewalls)
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Saffron & Sage — Premium Catering for Weddings, Corporate & Celebrations",
    template: "%s — Saffron & Sage Catering",
  },
  description:
    "Bespoke catering for weddings, corporate gatherings and family celebrations. Seasonal menus, gracious service, unforgettable tables.",
  keywords: [
    "catering",
    "wedding catering",
    "corporate catering",
    "event catering",
    "party catering",
    "buffet catering",
  ],
  openGraph: {
    title: "Saffron & Sage — Premium Catering",
    description:
      "Bespoke menus, gracious service and tables people remember. Catering for weddings, corporate events and celebrations.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b2018",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
