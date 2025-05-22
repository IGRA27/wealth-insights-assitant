import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";

interface Props {
  message: Message;
  showAvatar: boolean;
  showTimestamp: boolean;
  isLoading?: boolean;
}

export default function ChatMessage({
  message,
  showAvatar,
  showTimestamp,
  isLoading = false,
}: Props) {
  const isUser = message.role === "user";
  const timeLabel = format(new Date(message.createdAt), "hh:mm a");

  return (
    <div className={cn("flex items-start gap-3", isUser && "justify-end")}>
      {showAvatar && !isUser && (
        <Avatar className="mt-1">
          <AvatarFallback>🤖</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col">
        <div
          className={cn(
            "relative max-w-xl px-4 py-2 rounded-2xl shadow-chat",
            isUser
              ? "bg-primary text-white self-end"
              : "bg-card text-foreground"
          )}
        >
          {isLoading ? (
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          ) : (
            message.text
          )}

          {/* Triángulo de la burbuja */}
          <div
            className={cn(
              "absolute w-3 h-3 bg-inherit rotate-45",
              isUser
                ? "bottom-0 right-0 translate-x-1/2"
                : "bottom-0 left-0 -translate-x-1/2"
            )}
          />
        </div>

        {showTimestamp && (
          <span
            className={cn(
              "mt-1 text-xs text-muted",
              isUser ? "self-end" : "self-start"
            )}
          >
            {timeLabel}
          </span>
        )}
      </div>

      {showAvatar && isUser && (
        <Avatar className="mt-1">
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
