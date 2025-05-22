"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Envuelve la app con soporte light / dark;  
 * usa `class` en <html> para que Tailwind pueda hacer `dark:bg-…`.
 */
export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="wia-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
