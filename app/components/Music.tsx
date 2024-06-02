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
    <div className="rounded-xl border p-6 flex gap-4">
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={"/images/music-cover.png"}
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col grow">
        <div>
          <h3 className="text-lg font-semibold">
            California Dreamin' (radio Edit)
          </h3>
          <p>DJ Dark, Mentol</p>
        </div>
        <button
          className="bg-slate-950 text-white w-12 h-12 grid place-items-center rounded-full self-end mt-auto shrink-0 grow-0"
          onClick={handlePlay}
        >
          {playing ? <Pause /> : <Play />}
        </button>
      </div>
      <audio id="a1" src="california-dreamin.mp3"></audio>
    </div>
  );
}
