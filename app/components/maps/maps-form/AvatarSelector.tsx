"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import avatarData from "./avatarData";
import Avatar from "../../shared/Avatar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

interface AvatarSelectorProps {
  children: React.ReactNode;
  onSelect: (imageUrl: string) => void;
}
export default function AvatarSelector({
  onSelect,
  children,
}: AvatarSelectorProps) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer modal={true} open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent
        className="overflow-hidden pb-0"
        style={{
          height: "calc(100vh - 96px)",
        }}
      >
        <DrawerHeader>
          <DrawerTitle>Avatar wählen</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="">
          <div className="grid gap-3 grid-cols-4 py-4">
            {avatarData.map((url) => (
              <Avatar
                key={url}
                src={url}
                onClick={() => {
                  onSelect(url);
                  setOpen(false);
                }}
                className="w-full h-auto"
              />
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
