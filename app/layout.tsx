import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "./providers/QueryProvider";
import CookieManager from "./components/shared/CookieManager";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet Again",
  description: "Docklands Warm-Up am 8. Juni am Aasee.",
  metadataBase: new URL("https://meet-again.vercel.app"),
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
          <QueryProvider>
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
          </QueryProvider>
        </main>
        <Toaster richColors position="top-center" />
        <CookieManager />
      </body>
    </html>
  );
}
