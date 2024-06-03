"use client";

import { useAssistant } from "ai/react";
import { BotMessageSquare, CornerDownLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AssistantStatus } from "ai";

export default function Assistant() {
  const { status, messages, input, handleInputChange, submitMessage } =
    useAssistant({
      api: "/api/assistant",
    });

  //listen to the height of message-container and scroll scroll-container to bottom on change
  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const messageContainer = document.getElementById("message-container");
    if (scrollContainer && messageContainer) {
      scrollContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="grow flex flex-col overflow-hidden p-4 pt-0">
      {/* <pre>{JSON.stringify(messages, null, 2)}</pre> */}
      {messages.length < 1 && (
        <div>
          <WelcomeMessage />
        </div>
      )}
      {messages.length > 0 && (
        <div
          className="grow flex flex-col overflow-scroll"
          id="scroll-container"
        >
          <div className="flex flex-col gap-4" id="message-container">
            <Messages messages={messages} status={status} />
            {/* if last messages role is user, show loader */}
            {messages[messages.length - 1].role === "user" && (
              <div className="spinner-cust flex gap-3 items-center h-[1.75rem]">
                <BotMessageSquare className="w-5 h-5 shrink-0" />
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={submitMessage} className="mt-auto flex gap-2">
        <Input
          value={input}
          placeholder="Deine Frage..."
          onChange={handleInputChange}
        />
        <Button
          size="icon"
          className="shrink-0"
          disabled={status !== "awaiting_message"}
        >
          <CornerDownLeft className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="border rounded-xl p-4 flex items-start gap-3">
      <div>
        <BotMessageSquare className="w-7 h-7" />
      </div>
      <p>
        Hi, ich bin Münst·E. Was willst du zum Docklands Warm-Up Event wissen?
        Ich beantworte es dir. Gib deine Frage einfach unten ein. 👇
      </p>
    </div>
  );
}

function Messages({
  messages,
  status,
}: {
  messages: { id: string; role: string; content: string }[];
  status: AssistantStatus;
}) {
  return messages.slice().map((m) => {
    const isUser = m.role === "user";
    if (isUser) {
      return (
        <div
          key={m.id}
          className="bg-slate-100 rounded-xl px-4 py-2 ml-16 self-end"
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
        <p className={cn(status === "in_progress" && "spinner-cust")}>
          {m.content}
        </p>
      </div>
    );
  });
}
