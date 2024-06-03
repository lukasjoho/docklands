"use client";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Music() {
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
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="relative aspect-square rounded-lg overflow-hidden h-64">
        <Image
          src={"/images/dj-al.jpg"}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="250px"
        />
      </div>
      <div className="bg-secondary p-4 rounded-2xl w-full space-y-2">
        <div className="flex justify-between items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden w-16">
            <Image
              src={"/images/music-cover.png"}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <button
            className="bg-slate-950 text-white w-16 h-16 grid place-items-center rounded-full self-end mt-auto shrink-0 grow-0"
            onClick={handlePlay}
          >
            {playing ? <Pause /> : <Play />}
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            California Dreamin
          </h3>
          <p className="text-muted-foreground">DJ Dark, Mentol</p>
        </div>
        <audio id="a1" src="california-dreamin.mp3"></audio>
      </div>
    </div>
  );
}
