import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { FormProps, UseFormReturn } from "react-hook-form";

export default function UsernameInput({ form }: { form: UseFormReturn<any> }) {
  useEffect(() => {
    setTimeout(() => {
      form.setFocus("username");
    }, 50);
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              className="text-2xl font-semibold border-none focus-visible:ring-0 rounded-none p-0 placeholder:text-muted-foreground/50 w-full"
              placeholder="Deine Name..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
