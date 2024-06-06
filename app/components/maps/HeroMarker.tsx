import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Music } from "lucide-react";
import Image from "next/image";
import locationImage from "@/public/images/pardo-steg.jpg";

export default function HeroMarker({ lat, lng }: { lat: number; lng: number }) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="bg-white shadow-md w-5 h-5 grid place-items-center rounded-md overflow-hidden">
          🎶
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 space-y-2"
        onPointerDownOutside={() => console.log("click outside")}
      >
        <Image src={locationImage} alt="" className="w-full rounded-md" />
        <p className="text-sm text-muted-foreground">
          Hier ziehen die Beats ins Holz ein.
        </p>
      </PopoverContent>
    </Popover>
  );
}
