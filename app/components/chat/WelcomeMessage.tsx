import { BotMessageSquare } from "lucide-react";

export default function WelcomeMessage() {
  return (
    <div className="border rounded-xl p-4 flex items-start gap-3">
      <div>
        <BotMessageSquare className="w-7 h-7" />
      </div>
      <p>
        Hi, ich bin Münst·E. Was willst du zum Docklands Warm-Up Event wissen?
        Gib deine Frage einfach unten ein und ich beantworte sie dir. 👇
      </p>
    </div>
  );
}
