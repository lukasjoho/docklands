"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Ticket } from "lucide-react";

import ticketImage from "@/public/images/ticket.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmailButton from "./EmailButton";
import { useState } from "react";
import TicketForm from "./TicketForm";
import SuccessScreen from "./SuccessScreen";
import useUserName from "@/lib/useUser";
import WhileTapper from "../shared/WhileTapper";

export default function TicketButton() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { username } = useUserName();
  return (
    <Drawer
      onOpenChange={() => {
        setOpen(!open);
        if (!open) {
          setStep(0);
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button
          variant="none"
          className="blur-cust text-white bg-white/10 border-[1.5px] border-white w-full"
          size="lg"
        >
          <Ticket />
          Early Bird Tickets 2025
        </Button>
      </DrawerTrigger>
      <DrawerContent max>
        {step === 0 && (
          <>
            <DrawerHeader className="pb-0">
              <DrawerTitle>Early Bird Ticket 2025</DrawerTitle>
            </DrawerHeader>
            <div className="pointer-events-none grow shrink grid place-items-center relative">
              <Image
                src={ticketImage}
                alt=""
                fill
                className="scale-125 h-auto  object-contain shrink"
                sizes="400px"
                priority
              />
            </div>
            <WhileTapper className="w-full">
              <Button className="w-full" onClick={() => setStep(1)}>
                Ticket Shoppen
              </Button>
            </WhileTapper>
          </>
        )}
        {step === 1 && (
          <>
            <DrawerHeader className="pb-0">
              <DrawerTitle>Wie heißt du?</DrawerTitle>
            </DrawerHeader>
            <TicketForm
              username={username}
              onSubmitSuccess={(name) => {
                setStep(2);
                setName(name);
              }}
            />
          </>
        )}
        {step === 2 && <SuccessScreen username={name} />}
      </DrawerContent>
    </Drawer>
  );
}
