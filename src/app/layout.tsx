import type { Metadata } from "next";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

export const metadata: Metadata = {
  title: "The Satvik 3-Book Collection | Where Health Meets Celebration",
  description: "Discover the complete Satvik cookbook collection - traditional recipes that combine health and celebration.",
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
        {children}
      </body>
    </html>
  );
}
