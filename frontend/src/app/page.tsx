import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <Image
        src="/vercel.svg"
        width={120}
        height={26}
        alt="Logo"
        className="dark:invert"
        priority
      />

      <h1 className="text-4xl font-bold text-primary">Wealth Insights Assistant</h1>

      <p className="max-w-md text-center leading-relaxed">
        Conversa con tu información financiera interna usando Inteligencia
        Artificial. Sube reportes, realiza preguntas y obtiene respuestas
        contextualizadas.
      </p>

      <Button asChild className="px-8 py-4 text-lg">
        <Link href="/chat">Ir al chat</Link>
      </Button>
    </main>
  );
}
