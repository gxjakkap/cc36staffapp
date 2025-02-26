import type { Metadata } from "next";
import ReactQueryProvider from "@/components/providers/react-query";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme";
import { LineSeedSand } from "@/fonts";

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
          "font-line-seed-sand antialiased",
          LineSeedSand.variable,
          LineSeedSand.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {children}
            <Toaster richColors />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
