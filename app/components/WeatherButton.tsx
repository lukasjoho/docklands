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
import CategoryButton from "./CategoryButton";
import Weather from "./Weather";

export default function WeatherButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="text-lg">
        <CategoryButton icon="Sun" label="Wetter" />
      </DrawerTrigger>
      <DrawerContent className="pb-8">
        <DrawerHeader>
          <DrawerTitle>Münster</DrawerTitle>
          <DrawerDescription>Samstag, 08.06</DrawerDescription>
        </DrawerHeader>
        <Weather />
      </DrawerContent>
    </Drawer>
  );
}
