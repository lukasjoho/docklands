import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import ChatDrawer from "./components/ChatDrawer";
import WeatherButton from "./components/WeatherButton";
import MusicButton from "./components/MusicButton";

export default function Home() {
  return (
    <>
      <div className="lg:hidden relative w-screen h-[100dvh]" style={{}}>
        <Image
          src="/images/cover-mobile-trees.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
          priority
          sizes="400px"
        />
        <div className="relative h-full w-full flex flex-col">
          <div className="space-y-2 p-6 pb-8 bg-gradient-to-b from-black/30 to-transparent">
            <h1 className="text-4xl text-white font-bold">
              Meet Again. <br />
              <span className="opacity-75 text-3xl">Docklands Warm-Up.</span>
            </h1>
            <div className="space-y-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <p>Pardo-Steg, Aasee</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <p>Samstag 08. Juni, 10:30</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 mt-auto gap-3">
            <div className="col-span-2">
              <ChatDrawer />
            </div>
            <div className="col-span-1">
              <WeatherButton />
            </div>
            <div className="col-span-1">
              <MusicButton />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:grid relative w-screen h-[100dvh]  place-items-center">
        <Image
          src="/images/cover.webp"
          fill
          alt=""
          style={{ objectFit: "cover" }}
        />
        <h1 className="relative text-6xl font-semibold text-white">
          Besuch mich auf Mobile!
        </h1>
      </div>
    </>
  );
}
