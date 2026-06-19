"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";

import { Image, ImageKitProvider } from "@imagekit/next";

import { deleteImage } from "@/lib/actions/image.actions";
import { TImage } from "@/types/media";

import { Button } from "@/components/ui/button";

type Props = {
  image: TImage;
};

export default function MediaCard({ image }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <div
      className="
        border
        rounded-lg
        overflow-hidden
        bg-background
      "
    >
      <div className="aspect-square">
        <ImageKitProvider urlEndpoint="https://ik.imagekit.io/3fziqmklo">
          <Image
            src={image.url}
            alt={image.alt ?? image.name}
            width={400}
            height={400}
            className="
            h-full
            w-full
            object-cover
          "
          />
        </ImageKitProvider>
      </div>

      <div className="p-2 space-y-2">
        <div
          className="
            text-xs
            truncate
          "
        >
          {image.name}
        </div>

        <div
          className="
            text-xs
            text-muted-foreground
          "
        >
          {image.width}×{image.height}
        </div>

        <Button
          size="sm"
          variant="destructive"
          disabled={pending}
          onClick={() => startTransition(() => deleteImage(image.id))}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
