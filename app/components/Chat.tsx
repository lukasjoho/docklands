"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "You" : "AI"}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
