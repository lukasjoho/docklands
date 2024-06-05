"use client";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import UsernameInput from "./maps-form/UsernameInput";
import PlaceInput from "./maps-form/PlaceInput";
import ImageScreen from "./maps-form/ImageScreen";
import useLocations from "@/lib/useLocations";
import { getCookie } from "cookies-next";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Gib deinen Namen an.")
    .max(20, "Dein Name ist zu lang."),
  placeId: z.string().min(2, "Wähle einen Ort aus."),
  placeName: z.string(),
  imageUrl: z.string().optional(),
});

interface MapsFormProps {
  className?: string;
  onSubmitSuccess?: () => void;
  onClose?: () => void;
}

export default function MapsDrawerContent({
  className,
  onSubmitSuccess,
  onClose,
}: MapsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      placeName: "",
      placeId: "",
      imageUrl: "",
    },
  });

  const { addLocation } = useLocations();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userIdCookie = getCookie("userId");
    const results = await getGeocode({ placeId: values.placeId });
    const { lat, lng } = getLatLng(results[0]);
    console.log("userIdCookie");
    addLocation({
      user: {
        name: values.username,
        imageUrl: values.imageUrl,
        cookieUserId: userIdCookie,
      },
      location: { lat, lng, name: values.placeName, placeId: values.placeId },
    });
    onSubmitSuccess?.();
  }

  const [step, setStep] = useState<number>(0);

  return (
    <DrawerContent className="px-4 pb-4" max>
      <DrawerHeader>
        <DrawerTitle>
          {step === 0 && "Wie heißt du?"}
          {step === 1 && "Wo wohnst du?"}
          {step === 2 && "Teile ein Bild von dir"}
        </DrawerTitle>
      </DrawerHeader>
      <div className={cn("grow flex flex-col", className)}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grow flex flex-col gap-4 pt-12"
          >
            {step === 0 && <UsernameInput form={form} />}
            {step === 1 && <PlaceInput form={form} />}
            {step === 2 && <ImageScreen form={form} />}

            <div className="mt-auto flex justify-between">
              <Button
                type="button"
                variant="secondary"
                className="shrink-0"
                size="icon"
                onClick={() => {
                  if (step === 0) {
                    onClose?.();
                  } else {
                    setStep(step - 1);
                  }
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {step === 0 && (
                <Button
                  className="w-[128px]"
                  disabled={form.watch("username").length < 2}
                  onClick={() => setStep(1)}
                >
                  Weiter
                </Button>
              )}
              {step === 1 && (
                <Button
                  className="w-[128px]"
                  disabled={!form.watch("placeId")}
                  onClick={() => setStep(2)}
                >
                  Weiter
                </Button>
              )}
              {step === 2 && (
                <Button
                  type="submit"
                  className="w-[128px]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  Fertig
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </DrawerContent>
  );
}
