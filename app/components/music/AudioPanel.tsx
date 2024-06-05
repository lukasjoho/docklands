"use client";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AudioPanel() {
  const [playing, setPlaying] = useState(false);
  function play() {
    const audio = document.getElementById("a1") as HTMLAudioElement | null;
    audio?.play();
  }

  function stop() {
    const audio = document.getElementById("a1") as HTMLAudioElement | null;
    audio?.pause();
  }

  const handlePlay = () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      setPlaying(true);
      play();
    }
  };
  return (
    <div className="bg-secondary p-4 rounded-2xl w-full space-y-2">
      <div className="flex items-center gap-3">
        <Image
          src={"/images/music-cover.png"}
          alt=""
          width={100}
          height={100}
          className="w-16 h-16 shrink-0 rounded-lg"
          style={{ objectFit: "cover" }}
          sizes="64px"
        />
        <div className="overflow-hidden">
          <h3 className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            California Dreamin
          </h3>
          <p className="text-muted-foreground text-sm overflow-hidden text-ellipsis whitespace-nowrap ">
            DJ Dark, Mentol
          </p>
        </div>
        <button
          className="bg-slate-950 text-white w-16 h-16 grid place-items-center rounded-full self-end mt-auto shrink-0 grow-0 ml-auto"
          onClick={handlePlay}
        >
          {playing ? <Pause /> : <Play />}
        </button>
      </div>

      <audio id="a1" src="/audio/california-dreamin.mp3"></audio>
    </div>
  );
}
