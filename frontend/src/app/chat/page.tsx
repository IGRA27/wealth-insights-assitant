"use client";

import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Card, CardContent } from "@/components/ui/card";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import { postJson } from "@/lib/utils";
import { Message, ChatResponse, ChatRequest } from "@/types/chat";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll cada vez que cambian mensajes o loading
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    // Primero el mensaje de usuario
    const userMsg: Message = {
      id: uuid(),
      role: "user",
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);
    try {
      // Llamada al backend
      const payload = await postJson<ChatResponse, ChatRequest>(
        "/api/chat",
        { question: text }
      );

      // Mensaje de la IA
      const botMsg: Message = {
        id: uuid(),
        role: "assistant",
        text: payload.answer,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback de error
      const errMsg: Message = {
        id: uuid(),
        role: "assistant",
        text: "⚠️ Lo siento, algo salió mal.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Card className="w-full max-w-3xl h-full flex flex-col shadow-lg">
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ChatWindow
            messages={messages}
            isLoading={loading}
            scrollRef={scrollRef}
          />
        </CardContent>
        <div className="px-6 py-4 border-t bg-card/90 backdrop-blur-md">
          <ChatInput disabled={loading} onSend={sendMessage} />
        </div>
      </Card>
    </div>
  );
}
