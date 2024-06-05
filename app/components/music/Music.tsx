import Image from "next/image";
import AudioPanel from "./AudioPanel";

export default function Music() {
  return (
    <div className="flex flex-col items-center gap-4 grow">
      <div className="grow w-full min-h-[100px] relative">
        <Image
          src={"/images/dj-al.jpg"}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          sizes="250px"
        />
      </div>
      <AudioPanel />
    </div>
  );
}
