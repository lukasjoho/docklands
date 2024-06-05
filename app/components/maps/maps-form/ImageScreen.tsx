import { UseFormReturn } from "react-hook-form";
import ImageUploader from "./ImageUploader";
import AvatarSelector from "./AvatarSelector";

export default function ImageScreen({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <ImageUploader
        imageUrl={form.watch("imageUrl")}
        onUploadComplete={(url) => form.setValue("imageUrl", url)}
      />
      <p className="text-sm text-muted-foreground whitespace-nowrap">
        oder{" "}
        <AvatarSelector onSelect={(url) => form.setValue("imageUrl", url)}>
          <span className="underline">wähl eins aus.</span>
        </AvatarSelector>
      </p>
    </div>
  );
}
