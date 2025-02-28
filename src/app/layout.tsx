import type { Metadata } from "next";
import { Toaster } from "sonner";

import ReactQueryProvider from "@/components/providers/react-query";
import { cn } from "@/lib/utils";

import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/components/providers/theme";
import { LineSeedSans, sarabun } from "@/fonts";

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
          "font-line-seed-sans antialiased",
          LineSeedSans.variable,
          sarabun.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <NuqsAdapter>
              {children}
              <Toaster richColors />
            </NuqsAdapter>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
