import type { Metadata } from "next";
import { Noto_Sans_Thai_Looped, Prompt } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  variable: "--font-prompt",
  subsets: ["thai"],
});

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-thai-looped",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "CC36 Staff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-prompt antialiased",
          prompt.variable,
          notoSansThaiLooped.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
