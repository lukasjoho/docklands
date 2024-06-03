"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Gib deinen Namen an.")
    .max(20, "Dein Name ist zu lang."),
  placeId: z.string().min(2, "Wähle einen Ort aus."),
});

interface MapsFormProps {
  className?: string;
}

export default function MapsForm({ className }: MapsFormProps) {
  const [open, setOpen] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 150,
    cache: 86400,
  });

  useEffect(() => {
    if (data.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      placeId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const results = await getGeocode({ placeId: values.placeId });
    const { lat, lng } = getLatLng(results[0]);
    const newUserLocation = {
      username: values.username,
      lat,
      lng,
    };
    console.log(newUserLocation);
  }

  async function handleSelect({ id, name }: { id: string; name: string }) {
    form.setValue("placeId", id);
    setValue(name, false);
    clearSuggestions();
  }

  return (
    <div className={cn("grow flex flex-col", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grow flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Deine Name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled className="w-full">
              <FormField
                control={form.control}
                name="placeId"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Dein Ort..."
                        disabled={!ready}
                        value={value}
                        onChange={(e) => {
                          setValue(e.target.value);
                          form.setValue("placeId", "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="p-1"
            >
              <ul>
                {data.map(
                  (
                    {
                      place_id,
                      description,
                      structured_formatting: { main_text, secondary_text },
                    },
                    index
                  ) => (
                    <li
                      key={place_id}
                      onClick={() =>
                        handleSelect({
                          id: place_id,
                          name: main_text,
                        })
                      }
                      className={cn(
                        "cursor-pointer transition duration-100 hover:bg-accent px-2 py-1.5 text-sm whitespace-nowrap overflow-hidden text-ellipsis rounded-sm",
                        index === 0 && "bg-accent"
                      )}
                    >
                      {description}
                    </li>
                  )
                )}
              </ul>
            </PopoverContent>
          </Popover>
          <Button type="submit" className="mt-auto">
            Fertig
          </Button>
        </form>
      </Form>
    </div>
  );
}
