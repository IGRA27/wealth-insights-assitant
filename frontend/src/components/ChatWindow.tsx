"use client";

import React from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "@/types/chat";

export interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  /** Ref al elemento final para hacer scroll automático */
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatWindow({
  messages,
  isLoading,
  scrollRef,
}: ChatWindowProps) {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-4 scrollbar-thin">
      {messages.map((msg, idx) => {
        const prev = messages[idx - 1];
        const showAvatar = !prev || prev.role !== msg.role;
        const showTimestamp = showAvatar;
        return (
          <ChatMessage
            key={msg.id}
            message={msg}
            showAvatar={showAvatar}
            showTimestamp={showTimestamp}
          />
        );
      })}

      {isLoading && (
        <ChatMessage
          key="__loading__"
          message={{
            id: "__loading__",
            role: "assistant",
            text: "",
            createdAt: new Date().toISOString(),
          }}
          showAvatar={false}
          showTimestamp={false}
          isLoading
        />
      )}

      {/* Anchor para scroll */}
      <div ref={scrollRef} />
    </div>
  );
}
