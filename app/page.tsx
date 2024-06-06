import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import WeatherButton from "./components/weather/WeatherButton";
import MusicButton from "./components/music/MusicButton";
import MapsButton from "./components/maps/MapsButton";
import ChatButton from "./components/chat/ChatButton";
import ImageAnimation from "./components/home/ImageAnimation";
import WhileTapper from "./components/shared/WhileTapper";
import iphoneMockup from "@/public/images/iphone-mockup.png";

export const revalidate = 7200;

export default function Home() {
  return (
    <>
      <div className="lg:hidden relative w-screen h-[100dvh]" style={{}}>
        <ImageAnimation>
          <Image
            src="/images/docklands-cover-blue.jpg"
            alt=""
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="400px"
            className="z-0"
          />
        </ImageAnimation>
        <div className="relative h-full w-full flex flex-col">
          <div className="space-y-1 p-6 pb-8 bg-gradient-to-b from-black/30 to-transparent pt-12">
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
              <WhileTapper>
                <ChatButton />
              </WhileTapper>
            </div>
            <div className="col-span-1">
              <WhileTapper scale={0.9}>
                <WeatherButton />
              </WhileTapper>
            </div>
            <div className="col-span-1">
              <WhileTapper scale={0.9}>
                <MusicButton />
              </WhileTapper>
            </div>
            <div className="col-span-1">
              <WhileTapper scale={0.9}>
                <MapsButton />
              </WhileTapper>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex relative w-screen h-[100dvh] items-center justify-center gap-24">
        <h1 className="font-bold tracking-tighter text-4xl">Mobile-Only</h1>
        <Image src={iphoneMockup} alt="" className="w-[320px]" />
      </div>
    </>
  );
}
