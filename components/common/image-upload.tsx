"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/api";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

const getPublicImageUrl = (url: string) => {
  if (!url.startsWith("/")) return url;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fallbackOrigin =
    typeof window !== "undefined" ? window.location.origin : undefined;

  try {
    const origin = apiUrl?.startsWith("http")
      ? new URL(apiUrl).origin
      : fallbackOrigin;
    return new URL(url, origin).toString();
  } catch {
    return url;
  }
};

export const ImageUpload = ({ value, onChange, label }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    value ? getPublicImageUrl(value) : null
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Set local preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.uploads.image(formData);

        const uploadUrl = response.data.url;

        if (!uploadUrl) {
          throw new Error("Upload failed: No URL returned from server");
        }

        const publicUrl = getPublicImageUrl(uploadUrl);
        onChange(publicUrl);
        setPreview(publicUrl);
      } catch (error: unknown) {
        console.error("Image upload error:", error);
        alert(error instanceof Error ? error.message : "Failed to upload image");
        setPreview(null);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange("");
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer border-2 border-dashed rounded-lg p-4 transition-colors flex flex-col items-center justify-center gap-2 min-h-[160px]",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20 hover:border-primary/50",
          preview && "border-solid"
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="Upload preview"
              className="max-h-40 w-auto rounded-md object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 rounded-full bg-muted text-muted-foreground group-hover:text-primary transition-colors">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">
              Drag & drop an image here, or{" "}
              <span className="text-primary font-medium">browse</span>
            </p>
            <p className="text-xs text-muted-foreground/60">
              PNG, JPG, GIF or WEBP (MAX 5MB)
            </p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};
