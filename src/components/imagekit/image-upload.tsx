"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { useRef, useState } from "react";

type Props = {
  folder: string;
  onSuccess?: (response: any) => void;
};

export default function ImageUpload({ folder, onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [progress, setProgress] = useState(0);

  const abortController = new AbortController();

  async function authenticator() {
    const response = await fetch("/api/imagekit-auth");

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    return response.json();
  }

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      return;
    }

    const { token, expire, signature, publicKey } = await authenticator();

    try {
      const result = await upload({
        file,
        fileName: file.name,

        token,
        expire,
        signature,
        publicKey,

        folder,

        abortSignal: abortController.signal,

        onProgress(event) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      onSuccess?.(result);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error(error);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error(error);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error(error);
      } else if (error instanceof ImageKitServerError) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
      />

      <button
        type="button"
        onClick={handleUpload}
      >
        Upload
      </button>

      <progress
        value={progress}
        max={100}
      />
    </div>
  );
}

{
  /* <ImageUpload
  folder="/stories/pages"
  onSuccess={async (result) => {
    await createImage({
      fileId: result.fileId,
      name: result.name,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      width: result.width,
      height: result.height,
    });
  }}
/> */
}
