import { useUploadThing } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AvatarSelector from "./AvatarSelector";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  imageUrl?: string;
  onUploadComplete?: (imageUrl: string) => void;
}

export default function ImageUploader({
  imageUrl,
  onUploadComplete,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const [progress, setProgress] = useState<number | undefined>();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: (progress) => {
      console.log("Progress: ", progress);
      setProgress(progress);
    },
    onClientUploadComplete: (res) => {
      onUploadComplete?.(res[0].url);
      toast.success("Dein Bild wurde hochgeladen.");
    },
    onUploadError: (error) => {
      console.error("Error: ", error);
      toast.success("Fehler. Dein Bild konnte nicht hochgeladen werden.");
    },
    onBeforeUploadBegin: (files) => {
      console.log("Files before: ", files);
      return files;
    },
    onUploadBegin: (files) => {
      console.log("Files begin: ", files);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFiles([e.target.files[0]]);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      console.log("start upload");
      startUpload(files);
    }
  }, [files, startUpload]);
  return (
    <div>
      <label className="block relative w-48 h-48 bg-muted rounded-full overflow-hidden">
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {!imageUrl && (
          <div className="w-full h-full relative grid place-items-center">
            <ImagePlus className="w-8 h-8" />
          </div>
        )}
        {imageUrl && <Image src={imageUrl} alt="" fill sizes="256px" />}
      </label>
    </div>
  );
}
