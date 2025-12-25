import type { Metadata } from "next";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";
import OpenReplayTracker from "@/components/OpenReplayTracker";

export const metadata: Metadata = {
  title: "The Satvik 3-Book Collection | Where Health Meets Celebration",
  description: "Discover the complete Satvik cookbook collection - traditional recipes that combine health and celebration.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FacebookPixel />
        <OpenReplayTracker />
        {children}
      </body>
    </html>
  );
}
