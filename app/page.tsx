import Image from "next/image";
import Assistant from "./components/Assistant";
import Chat from "./components/Chat";
import cover from "@/public/cover.webp";
import { BotMessageSquare, Speaker } from "lucide-react";
import Weather from "./components/Weather";
import Maps from "./components/Maps";
import Music from "./components/Music";

export default function Home() {
  return (
    <div className="p-6 lg:p-12 grow gap-12 grid grid-cols-1 lg:grid-cols-2 overflow-hidden h-screen">
      <div className="flex flex-col gap-4 overflow-hidden">
        <Assistant />
      </div>
      <div className="flex flex-col gap-6">
        <div className="rounded-xl overflow-hidden grow">
          <Image
            src={cover}
            alt=""
            className="h-full w-full"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
