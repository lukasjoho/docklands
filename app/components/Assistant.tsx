"use client";

import { useAssistant } from "ai/react";
import { BotMessageSquare, Loader2, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Assistant() {
  const { status, messages, input, handleInputChange, submitMessage } =
    useAssistant({
      api: "/api/assistant",
    });

  return (
    <div className="flex flex-col grow overflow-hidden">
      <div className="flex flex-col shrink overflow-hidden grow justify-end">
        <div className="flex flex-col-reverse gap-4 mb-auto overflow-scroll">
          {messages.length < 1 && (
            <div className="border rounded-xl p-5 flex items-center gap-3 mb-auto">
              <div>
                <Sparkle className="w-7 h-7" />
              </div>
              <p className="text-lg">
                Hi, ich bin Electra und beantworte dir alle deine Fragen rund um
                das Docklands Warm-Up Event. Gib dazu einfach deine Frage unten
                ein. 👇{" "}
              </p>
            </div>
          )}
          {status === "in_progress" ? (
            <Loader2 className="animate-spin inline" />
          ) : null}
          {messages
            .slice()
            .reverse()
            .map((m) => {
              const isUser = m.role === "user";
              if (isUser) {
                return (
                  <div
                    key={m.id}
                    className="bg-slate-100 rounded-full px-4 py-2 ml-16 self-end text-lg"
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
                  <p className="text-lg">{m.content}</p>
                </div>
              );
            })}
        </div>
      </div>
      <form onSubmit={submitMessage} className="mt-auto shrink-0">
        <input
          disabled={status !== "awaiting_message"}
          value={input}
          placeholder="Deine Frage..."
          onChange={handleInputChange}
          className="text-3xl font-medium focus-visible:outline-none w-full"
        />
      </form>
    </div>
  );
}
