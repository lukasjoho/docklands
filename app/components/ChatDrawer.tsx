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
import { BotMessageSquare, Sparkles } from "lucide-react";
import Assistant from "./Assistant";

export default function ChatDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="white" className="text-lg h-12 rounded-full w-full">
          <BotMessageSquare />
          Münst·E starten
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[1000px]">
        <DrawerHeader>
          <DrawerTitle>Frag Münst·E</DrawerTitle>
        </DrawerHeader>
        <Assistant />
      </DrawerContent>
    </Drawer>
  );
}
