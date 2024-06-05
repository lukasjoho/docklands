"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import MapsDrawerContent from "./MapsDrawerContent";

export default function AddLocationButton() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="shadow-lg w-full" variant="white" size="default">
          <CirclePlus className="w-5 h-5" />
          Mich hinzufügen
        </Button>
      </DrawerTrigger>
      <MapsDrawerContent
        className="grow"
        onSubmitSuccess={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    </Drawer>
  );
}
