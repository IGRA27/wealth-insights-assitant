// src/app/chat/layout.tsx
import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header fijo */}
      <header className="flex items-center justify-between px-6 py-4 bg-card/90 backdrop-blur shadow-md z-10">
        <h1 className="text-2xl font-bold">Wealth Insights Assistant</h1>
        <ThemeToggle />
      </header>

      {/* Contenido */}
      <main className="flex-1 flex flex-col items-center overflow-hidden">
        {children}
      </main>
    </div>
  );
}
