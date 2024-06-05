import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import WeatherButton from "./components/weather/WeatherButton";
import MusicButton from "./components/music/MusicButton";
import MapsButton from "./components/maps/MapsButton";
import ChatButton from "./components/chat/ChatButton";

export const revalidate = 7200;
export default function Home() {
  return (
    <>
      <div className="lg:hidden relative w-screen h-[100dvh]" style={{}}>
        <Image
          src="/images/docklands-cover-blue.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
          priority
          sizes="400px"
        />
        <div className="relative h-full w-full flex flex-col">
          <div className="space-y-1 p-6 pb-8 bg-gradient-to-b from-black/30 to-transparent">
            <h1 className="text-xl text-white font-bold tracking-tight">
              <span className="opacity-75">Docklands Warm-Up</span> <br />
              <span className="opacity-100 text-4xl">Meet Again.</span>
            </h1>
            <div className=" text-white font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <p>Pardo-Steg, Aasee</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <p>Samstag, 8. Juni, 10:30</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-3 mt-auto gap-3">
            <div className="col-span-3">
              <ChatButton />
            </div>
            <div className="col-span-1">
              <WeatherButton />
            </div>
            <div className="col-span-1">
              <MusicButton />
            </div>
            <div className="col-span-1">
              <MapsButton />
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
