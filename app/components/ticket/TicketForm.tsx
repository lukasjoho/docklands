"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UsernameInput from "../maps/maps-form/UsernameInput";
import { upsertUser } from "@/lib/actions";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import WhileTapper from "../shared/WhileTapper";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Gib deinen Namen an.")
    .max(255, "Der Name ist zu lang"),
});

interface TicketFormProps {
  onSubmitSuccess?: (name: string) => void;
  username?: string | null;
}

export default function TicketForm({
  onSubmitSuccess,
  username,
}: TicketFormProps) {
  const userIdCookie = getCookie("userId");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username || "",
    },
  });

  const queryClient = useQueryClient();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userIdCookie) {
      toast.error("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
      return;
    }

    const user = await upsertUser({
      name: values.username,
      cookieUserId: userIdCookie,
    });
    if (!user) {
      toast.error("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["userLocations"] });
    onSubmitSuccess?.(values.username);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grow flex flex-col gap-4 pt-12"
      >
        <div className="px-4">
          <UsernameInput form={form} />
        </div>
        <WhileTapper className="mt-auto w-full">
          <Button className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin w-4 h-4" />
            )}
            Absenden
          </Button>
        </WhileTapper>
      </form>
    </Form>
  );
}
