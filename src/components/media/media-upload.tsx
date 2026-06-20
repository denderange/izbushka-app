"use client";

import { useRouter } from "next/navigation";
import ImageUpload from "@/components/imagekit/image-upload";
import { createImage } from "@/lib/actions/image.actions";

export default function MediaUpload() {
  const router = useRouter();

  return (
    <ImageUpload
      folder="/stories"
      onSuccess={async (result) => {
        await createImage({
          fileId: result.fileId,
          name: result.name,
          url: result.url,
          thumbnailUrl: result.thumbnailUrl,
          fileType: result.fileType,
          fileSize: result.size,
          width: result.width,
          height: result.height,
        });

        router.refresh();
      }}
    />
  );
}
