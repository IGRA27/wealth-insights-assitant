"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSend }: { onSend: (t: string) => void }) {
  const [value, setValue] = useState("");

  function fire() {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  }

  return (
    <div className="mt-4 flex w-full max-w-2xl gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            fire();
          }
        }}
        rows={1}
        placeholder="Escribe tu pregunta…"
        className="flex-1 resize-none"
      />
      <Button onClick={fire} disabled={!value.trim()}>
        Enviar
      </Button>
    </div>
  );
}
