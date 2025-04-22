import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { EerieNav } from "@/components/eerie-nav";
import { Footer } from "@/components/footer";
import { EerieCursor } from "@/components/ui/eerie-cursor";
import { ClientLayoutWrapper } from "@/components/ClientLayoutWrapper";

export const manifold = localFont({
  src: [
    { path: "./fonts/ManifoldCF-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/ManifoldCF-Light.woff2", weight: "300", style: "normal" },
    {
      path: "./fonts/ManifoldCF-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/ManifoldCF-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "./fonts/ManifoldCF-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/ManifoldCF-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "./fonts/ManifoldCF-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    { path: "./fonts/ManifoldCF-Heavy.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-manifold",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NEXUS CORP",
  description:
    "Optimizing human potential through proprietary algorithms and data-driven insights.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
  cursor,
}: Readonly<{
  children: React.ReactNode;
  cursor: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`relative ${manifold.variable} ${inter.variable} font-manifold`}>
        <ClientLayoutWrapper>
          <div className="flex min-h-screen flex-col">
            {cursor}
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <EerieNav logo="/logo.svg" />
              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </div>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
