"use client";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadDropzoneProps {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
}

export default function FileUploadDropzone({
  endpoint,
  onChange,
}: FileUploadDropzoneProps) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(error: Error) => console.error(error)}
    />
  );
}