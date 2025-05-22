import clsx from "clsx";

export default function ChatMessage({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  return (
    <p
      className={clsx(
        "max-w-sm whitespace-pre-wrap rounded-lg px-3 py-2 text-sm break-words",
        role === "user"
          ? "ml-auto bg-primary text-white"
          : "mr-auto bg-gray-200",
      )}
    >
      {text}
    </p>
  );
}
