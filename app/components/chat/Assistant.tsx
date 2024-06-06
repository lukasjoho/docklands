"use client";

import { useAssistant } from "ai/react";
import { BotMessageSquare, CornerDownLeft } from "lucide-react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Messages from "./Messages";
import WelcomeMessage from "./WelcomeMessage";
import { createMessage } from "@/lib/actions";
import { getCookie } from "cookies-next";
import WhileTapper from "../shared/WhileTapper";

export default function Assistant() {
  const { status, messages, input, handleInputChange, submitMessage } =
    useAssistant({
      api: "/api/assistant",
    });

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const messageContainer = document.getElementById("message-container");
    if (scrollContainer && messageContainer) {
      scrollContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: any) => {
    submitMessage(e);
    const userIdCookie = getCookie("userId");
    createMessage({ text: input, cookieUserId: userIdCookie });
  };

  return (
    <div className="grow flex flex-col gap-4 overflow-hidden p-1 -m-1">
      <div className="flex flex-col shrink overflow-hidden">
        {messages.length < 1 && <WelcomeMessage />}
        {messages.length > 0 && (
          <div
            className="grow flex flex-col overflow-scroll"
            id="scroll-container"
          >
            <div className="flex flex-col gap-4" id="message-container">
              <Messages messages={messages} status={status} />
              {messages[messages.length - 1].role === "user" && (
                <div className="spinner-cust flex gap-3 items-center h-[1.75rem]">
                  <BotMessageSquare className="w-5 h-5 shrink-0" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto flex gap-2">
        <Input
          value={input}
          placeholder="Deine Frage..."
          onChange={handleInputChange}
          className="h-11"
        />
        <WhileTapper className="shrink-0" scale={0.9}>
          <Button size="icon" disabled={status !== "awaiting_message"}>
            <CornerDownLeft className="w-4 h-4" />
          </Button>
        </WhileTapper>
      </form>
    </div>
  );
}
