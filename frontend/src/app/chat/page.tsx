// src/app/chat/page.tsx
"use client";

import { useState, useCallback } from "react";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);

  const sendMessage = useCallback(async (question: string) => {
    //pinta de inmediato el mensaje del usuario
    setMessages((prev) => [...prev, { role: "user", text: question }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const payload = await res.json();

    if (!res.ok) {
      //mensaje de error legible para el usuario
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: payload.error ?? "Error inesperado" },
      ]);
      return;
    }

    //respuesta normal del backend
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: payload.answer },
    ]);
  }, []);

  return (
    <div className="flex flex-col h-full max-h-screen px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Chat</h1>

      {/* Ventana de mensajes */}
      <ChatWindow messages={messages} className="flex-1 mb-4" />

      {/* Input */}
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
