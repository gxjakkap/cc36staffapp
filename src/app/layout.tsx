import type { Metadata } from "next";
import { Noto_Sans_Thai_Looped, Prompt } from "next/font/google";
import ReactQueryProvider from "@/components/providers/react-query";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme";

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
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
