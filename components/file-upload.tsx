"use client";

import React from "react";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const UploadDropzone = dynamic(
  () => import("@/lib/uploadthing").then((m) => m.UploadDropzone),
  { ssr: false }
);

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export function FileUpload({ onChange, value, endpoint }: FileUploadProps) {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("✅ Upload result:", res);

        if (res && res.length > 0) {
          // Uploadthing v9 dùng ufsUrl
          const url = res[0].ufsUrl ?? `https://utfs.io/f/${res[0].key}`;
          console.log("👉 Final URL:", url);
          onChange(url);
        } else {
          console.warn("❌ Upload result invalid:", res);
        }
      }}
      onUploadError={(error: Error) =>
        console.error("❌ Upload error:", error.message)
      }
    />
  );
}
