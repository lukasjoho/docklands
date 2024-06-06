import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "./providers/QueryProvider";
import CookieManager from "./components/shared/CookieManager";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet Again - 08. Juni - Pardo-Steg Münster",
  description:
    "Lass dir von Münst·E alle Fragen rund um das Docklands Warm-Up beantworten.",
  metadataBase: new URL("https://meet-again.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <main className="flex min-h-[100dvh] flex-col overflow-hidden">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Toaster richColors position="top-center" />
        <CookieManager />
        <Analytics />
      </body>
    </html>
  );
}
