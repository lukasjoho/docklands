import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet Again",
  description: "Docklands Warm-Up am 8. Juni am Aasee.",
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
          {children}
        </main>
      </body>
    </html>
  );
}
