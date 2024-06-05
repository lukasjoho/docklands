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
import { Sun } from "lucide-react";
import CategoryButton from "../home/CategoryButton";
import Weather from "./Weather";
import { Input } from "@/components/ui/input";

export default function WeatherButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <CategoryButton icon="Sun" label="Wetter" />
      </DrawerTrigger>
      <DrawerContent max>
        <DrawerHeader>
          <DrawerTitle>Münster</DrawerTitle>
          <DrawerDescription>Samstag, 08.06, 12:00 Uhr</DrawerDescription>
        </DrawerHeader>
        <Weather />
      </DrawerContent>
    </Drawer>
  );
}
