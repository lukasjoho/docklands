import { useUploadThing } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AvatarSelector from "./AvatarSelector";
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { set } from "zod";

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
      setProgress(progress);
    },
    onClientUploadComplete: (res) => {
      onUploadComplete?.(res[0].url);
      toast.success("Dein Bild wurde hochgeladen.");
    },
    onUploadError: (error) => {
      if (error.message.includes("FileSizeMismatch")) {
        toast.error("Bitte lade ein Bild unter 16MB hoch.");
      } else {
        toast.error("Fehler. Dein Bild konnte nicht hochgeladen werden.");
      }
      setProgress(undefined);
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
      <label className="block relative w-48 h-48 bg-muted rounded-full overflow-hidden shadow-lg">
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {!imageUrl && typeof progress !== "number" && (
          <div className="w-full h-full relative grid place-items-center">
            <ImagePlus className="w-8 h-8" />
          </div>
        )}
        {typeof progress === "number" && progress !== 100 && (
          <div className="w-full h-full relative grid place-items-center">
            <span className="text-xl font-semibold">{progress}%</span>
          </div>
        )}
        {progress === 100 && isUploading && (
          <div className="w-full h-full relative grid place-items-center">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        )}
        {imageUrl && !isUploading && (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="120px"
            style={{ objectFit: "cover" }}
          />
        )}
      </label>
    </div>
  );
}
