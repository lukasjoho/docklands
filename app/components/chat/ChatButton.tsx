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

export default function ChatButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="white" className="w-full" size="lg">
          <BotMessageSquare />
          Münst·E starten
        </Button>
      </DrawerTrigger>
      <DrawerContent max>
        <DrawerHeader>
          <DrawerTitle>Frag Münst·E</DrawerTitle>
        </DrawerHeader>
        <Assistant />
      </DrawerContent>
    </Drawer>
  );
}
