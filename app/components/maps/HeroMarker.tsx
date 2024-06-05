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
        <div className="bg-primary w-6 h-6 text-white grid place-items-center rounded-md overflow-hidden">
          <Music className="w-3 h-3" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 rounded-xl space-y-2">
        <Image src={locationImage} alt="" className="w-full rounded-md" />
        <p className="text-sm text-muted-foreground">
          Hier schallen die Beats übers Holz.
        </p>
      </PopoverContent>
    </Popover>
  );
}
