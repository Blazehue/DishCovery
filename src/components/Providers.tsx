"use client";

import { ThemeProvider } from "@/components/ThemeProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
