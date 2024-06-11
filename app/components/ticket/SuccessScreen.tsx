import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ticketImage from "@/public/images/ticket.png";
import WhileTapper from "../shared/WhileTapper";

interface SuccessScreenProps {
  username: string;
}

export default function SuccessScreen({ username }: SuccessScreenProps) {
  return (
    <div className="flex flex-col grow">
      <div className="flex flex-col items-center gap-6 text-center my-auto">
        <div className="w-14 h-14 rounded-full grid place-items-center bg-green-500 text-white">
          <Check className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight">
          {username.split(" ")[0]}, du gehst zum <br />
          Meet Again 2025! 🎉🎶
        </h1>
        <div className="flex items-center gap-4 bg-muted rounded-xl p-4">
          <Image
            src={ticketImage}
            alt=""
            className="scale-125 w-[80px]"
            sizes="400px"
            priority
          />
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-lg font-semibold">Dein Meet Again Ticket</h2>
            <WhileTapper>
              <Link
                download
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "px-6 h-10"
                )}
                href="/images/ticket.png"
              >
                <Download className="w-4 h-4" />
                Download
              </Link>
            </WhileTapper>
          </div>
        </div>
      </div>
    </div>
  );
}
