// src/components/ChatWindow.tsx
import { Card, CardContent } from "@/components/ui/card";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWindow({
  messages,
  className = "",
}: {
  messages: Msg[];
  className?: string;
}) {
  return (
    <Card className={`w-full overflow-y-auto ${className}`}>
      <CardContent className="space-y-4 py-4">
        {messages.map((m, idx) => (
          <p
            key={idx}
            className={
              m.role === "user" ? "text-right font-medium" : "text-left"
            }
          >
            {m.text}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
