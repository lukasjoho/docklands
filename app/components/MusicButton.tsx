import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Music as MusicIcon, Sun } from "lucide-react";
import CategoryButton from "./CategoryButton";
import Weather from "./Weather";
import Music from "./Music";

export default function MusicButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="text-lg">
        <CategoryButton icon={<MusicIcon />} label="Musik" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Groov' dich ein</DrawerTitle>
          <DrawerDescription>
            The ALmighty und Fraed werden uns die feinsten Tunes auflegen. Hier
            ist schonmal ein Vorgeschmack.
          </DrawerDescription>
        </DrawerHeader>
        <Music />
      </DrawerContent>
    </Drawer>
  );
}
