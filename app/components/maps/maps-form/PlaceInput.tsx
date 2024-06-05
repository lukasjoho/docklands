import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function PlaceInput({ form }: { form: UseFormReturn<any> }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      form.setFocus("placeId");
    }, 50);
  }, [form]);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 150,
    cache: 0,
  });
  useEffect(() => {
    if (data.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data]);

  function formatPlaceName(main: string, secondary?: string) {
    return `${main}${secondary ? ", " + secondary : ""}`;
  }

  async function handleSelect({
    placeId,
    name,
    secondaryName,
  }: {
    placeId: string;
    name: string;
    secondaryName: string;
  }) {
    form.setValue("placeId", placeId);
    form.setValue("placeName", formatPlaceName(name, secondaryName));
    setValue(formatPlaceName(name, secondaryName), false);
    clearSuggestions();
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled className="w-full">
        <FormField
          control={form.control}
          name="placeId"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormControl>
                <Input
                  {...field}
                  className="text-2xl font-semibold border-none focus-visible:ring-0 rounded-none p-0 placeholder:text-muted-foreground/50 w-full"
                  placeholder="Dein Ort..."
                  disabled={!ready}
                  value={form.watch("placeName") || value}
                  onChange={(e) => {
                    form.setValue("placeId", "");
                    form.setValue("placeName", "");
                    setValue(e.target.value);
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
                    placeId: place_id,
                    name: main_text,
                    secondaryName: secondary_text,
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
  );
}
