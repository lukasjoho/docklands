import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BotMessageSquare } from "lucide-react";
import Assistant from "./Assistant";

export default function Chat() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full" size="lg" variant="white">
          <BotMessageSquare />
          Münst·E starten
        </Button>
      </DrawerTrigger>
      <DrawerContent max className="p-3 pt-0">
        <DrawerHeader>
          <DrawerTitle>Frag Münst·E</DrawerTitle>
        </DrawerHeader>
        <Assistant />
      </DrawerContent>
    </Drawer>
  );
}
