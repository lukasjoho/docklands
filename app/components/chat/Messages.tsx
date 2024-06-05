import { cn } from "@/lib/utils";
import { AssistantStatus } from "ai";
import { BotMessageSquare } from "lucide-react";
import { RenderMessage } from "./ReactMarkdown";

export default function Messages({
  messages,
  status,
}: {
  messages: { id: string; role: string; content: string }[];
  status: AssistantStatus;
}) {
  return messages.slice().map((m) => {
    const isUser = m.role === "user";
    const isLastMessage = messages[messages.length - 1].id === m.id;
    if (isUser) {
      return (
        <div
          key={m.id}
          className="bg-muted rounded-xl px-4 py-2 ml-16 self-end"
        >
          {m.content}
        </div>
      );
    }
    return (
      <div key={m.id} className="flex gap-3">
        <div className="h-[1.75rem] grid place-items-center">
          <BotMessageSquare className="w-5 h-5 shrink-0" />
        </div>
        {/* <p
          className={cn(
            status === "in_progress" && isLastMessage && "spinner-cust"
          )}
        >
        </p> */}
        <div>
          <RenderMessage>{m.content}</RenderMessage>
        </div>
      </div>
    );
  });
}
