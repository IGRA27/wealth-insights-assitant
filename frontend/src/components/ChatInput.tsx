"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ChatInput({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (t: string) => Promise<void>;
}) {
  const [text, setText] = useState("");
  const maxLen = 500;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length > maxLen) return;
    await onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <textarea
        rows={1}
        maxLength={maxLen}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu pregunta…"
        className={cn(
          "flex-1 resize-none p-3 rounded-lg border bg-card focus:outline-none focus:ring-2 focus:ring-primary",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        disabled={disabled}
      />
      <div className="flex flex-col items-end text-xs text-muted">
        {text.length}/{maxLen}
      </div>
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !text.trim()}
        className="bg-primary text-white hover:bg-primary-dark"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
