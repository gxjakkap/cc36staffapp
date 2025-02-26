"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  ThemeProvider as StaticProvider,
  ThemeProviderProps,
} from "next-themes";

const DynProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  },
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const NextThemeProvider =
    process.env.NODE_ENV === "production" ? StaticProvider : DynProvider;
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
