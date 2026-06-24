"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { toast } from "sonner";
import { createImage } from "@/lib/actions/image.actions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { TImage } from "@/types/media";

type Props = {
  folder?: string;
  onUploaded?: (image: TImage) => void;
};

type AuthResponse = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function MediaUpload({
  folder = "/stories",
  onUploaded,
}: Props) {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  async function authenticator(): Promise<AuthResponse> {
    const response = await fetch("/api/imagekit-auth");

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    return response.json();
  }

  function handleCancelUpload() {
    abortControllerRef.current?.abort();

    toast.info("Upload cancelled");
  }

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Please select an image");

      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be less than 10 MB");

      return;
    }

    setIsUploading(true);
    setProgress(0);

    abortControllerRef.current = new AbortController();

    try {
      const { token, expire, signature, publicKey } = await authenticator();

      const result = await upload({
        file,
        fileName: file.name,
        token,
        expire,
        signature,
        publicKey,
        folder,
        abortSignal: abortControllerRef.current.signal,

        onProgress(event) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      if (!result.fileId || !result.name || !result.url) {
        throw new Error("ImageKit returned incomplete upload data");
      }

      const image = await createImage({
        fileId: result.fileId,
        name: result.name,
        url: result.url,
        thumbnailUrl: result.thumbnailUrl,
        fileType: result.fileType,
        fileSize: result.size,
        width: result.width,
        height: result.height,
      });

      onUploaded?.(image);

      toast.success("Image uploaded successfully");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (!onUploaded) {
        router.refresh();
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        toast.info("Upload cancelled");
      } else if (error instanceof ImageKitInvalidRequestError) {
        toast.error(error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        toast.error("Network error during upload");
      } else if (error instanceof ImageKitServerError) {
        toast.error("ImageKit server error");
      } else {
        console.error(error);

        toast.error("Failed to upload image");
      }
    } finally {
      abortControllerRef.current = null;

      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        disabled={isUploading}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
        >
          Upload image
        </Button>

        {isUploading && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleCancelUpload}
          >
            Cancel upload
          </Button>
        )}
      </div>

      {isUploading && (
        <Progress
          value={progress}
          className="w-full"
        />
      )}
    </div>
  );
}
