"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import avatarData from "./avatarData";
import Avatar from "../../shared/Avatar";

interface AvatarSelectorProps {
  children: React.ReactNode;
  onSelect: (imageUrl: string) => void;
}
export default function AvatarSelector({
  onSelect,
  children,
}: AvatarSelectorProps) {
  return (
    <Popover modal={true}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0 overflow-hidden">
        <ScrollArea className="h-[160px] relative ">
          <div className="grid gap-3 grid-cols-4 p-4">
            {avatarData.map((url) => (
              <Avatar
                key={url}
                src={url}
                onClick={() => onSelect(url)}
                className="w-10 h-10"
              />
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
