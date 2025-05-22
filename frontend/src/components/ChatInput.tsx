"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="flex gap-2">
      <Textarea
        placeholder="Escribe tu pregunta…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="flex-1 resize-none"
        rows={2}
      />
      <Button onClick={handleSubmit} disabled={!value.trim()}>
        Enviar
      </Button>
    </div>
  );
}
