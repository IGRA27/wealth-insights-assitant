"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { Card, CardContent } from "@/components/ui/card";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text: string) {
    if (!text.trim()) return;

    // pinta inmediatamente
    setMessages((m) => [...m, { role: "user", text }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text }),
    });
    const { answer } = (await res.json()) as { answer: string };

    setMessages((m) => [...m, { role: "assistant", text: answer }]);
  }

  return (
    <>
      <Card className="w-full max-w-2xl h-[65vh] overflow-y-auto scrollbar-thin">
        <CardContent className="space-y-3 py-4">
          {messages.map((m, idx) => (
            <ChatMessage key={idx} role={m.role} text={m.text} />
          ))}
          <div ref={bottomRef} />
        </CardContent>
      </Card>

      <ChatInput onSend={handleSend} />
    </>
  );
}
