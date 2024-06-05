"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CategoryButton from "../home/CategoryButton";
import Music from "./Music";

export default function MusicButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <CategoryButton icon="Music" label="Musik" />
      </DrawerTrigger>
      <DrawerContent max>
        <DrawerHeader>
          <DrawerTitle>The ALmighty</DrawerTitle>
          <DrawerDescription>
            Groov&apos; dich ein. Es wird fein!
          </DrawerDescription>
        </DrawerHeader>
        <Music />
      </DrawerContent>
    </Drawer>
  );
}
