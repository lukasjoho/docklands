"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CirclePlus, Map, MapPin, Sun } from "lucide-react";
import CategoryButton from "./CategoryButton";
import GoogleMapReact from "google-map-react";
import mapStyles from "./maps/mapStyles";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import MapsForm from "./MapsForm";
import { useLoadScript } from "@react-google-maps/api";

export default function MapsButton() {
  const defaultProps = {
    center: {
      lat: 50.8687324,
      lng: 9.5485311,
    },
    zoom: 4.5,
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });
  return (
    <Drawer handleOnly>
      <DrawerTrigger asChild>
        <CategoryButton icon="Map" label="Städte" />
      </DrawerTrigger>
      <DrawerContent className="pb-4 px-4">
        <DrawerHeader>
          <DrawerTitle>Karte</DrawerTitle>
          <DrawerDescription>Hier wohnen wir mittlerweile.</DrawerDescription>
        </DrawerHeader>
        <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden">
          <GoogleMapReact
            options={{
              fullscreenControl: false,
              zoomControl: false,
              styles: mapStyles,
              disableDefaultUI: true,
            }}
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker
              lat={53.551086}
              lng={9.993682}
              user={{
                img: "https://media.licdn.com/dms/image/D4E03AQFMxx-NrttZnQ/profile-displayphoto-shrink_800_800/0/1676973688888?e=1723075200&v=beta&t=PTV53yBc5DvCuzWLUmutNPfFfNWSff4pHOVl_9G5YiI",
              }}
            />
            <Marker
              lat={48.864716}
              lng={2.349014}
              user={{
                img: "https://media.licdn.com/dms/image/C4E03AQEOQgEzUmW22A/profile-displayphoto-shrink_800_800/0/1635459848557?e=1723075200&v=beta&t=OyWwVqVUvHCITsyaAtThy0LdcyaEmDvCG2alNOgevSQ",
              }}
            />
            <Marker
              lat={49.39875}
              lng={8.672434}
              user={{
                img: "https://lukashoppe.com/_next/image?url=%2Fimages%2Fhome%2Flukas-avatar.jpg&w=384&q=75",
              }}
            />
          </GoogleMapReact>
          <div className="p-2 w-full absolute bottom-0 left-0">
            {isLoaded && (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    className="rounded-full shadow-lg w-full"
                    variant="white"
                  >
                    <CirclePlus className="w-4 h-4" />
                    Mich hinzufügen
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-screen px-4 pb-4">
                  <DrawerHeader>
                    <DrawerTitle>Setz dich auf die Karte</DrawerTitle>
                  </DrawerHeader>
                  <MapsForm className="grow" />
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Marker({
  lat,
  lng,
  user,
}: {
  lat: number;
  lng: number;
  user: {
    img: string;
  };
}) {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <div
            className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-orange-600"
            onClick={(e) => {
              e.stopPropagation();
              console.log("click");
              setOpen(true);
            }}
          >
            <img
              src={user.img}
              alt=""
              className="w-full h-full absolute left-0 top-0"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="py-3 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://lukashoppe.com/_next/image?url=%2Fimages%2Fhome%2Flukas-avatar.jpg&w=384&q=75"
              alt=""
              className="w-16 h-16 rounded-full overflow-hidden"
            />
            <div className="text-center">
              <p className="font-medium leading-none">Lukas</p>
              <p className="text-sm text-muted-foreground">Heidelberg</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
