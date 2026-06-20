"use client";

import { Image } from "@imagekit/next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TImage } from "@/types/media";

type Props = {
  image: TImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (image: TImage) => void;
};

export default function MediaDialog({
  image,
  open,
  onOpenChange,
  onSelect,
}: Props) {
  if (!image) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{image.name}</DialogTitle>
        </DialogHeader>

        <Image
          src={image.url}
          alt={image.alt ?? image.name}
          width={1200}
          height={800}
          className="w-full h-auto"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Width: {image.width ?? "-"}</div>
          <div>Height: {image.height ?? "-"}</div>
          <div>Type: {image.fileType ?? "-"}</div>
          <div>
            Size:{" "}
            {image.fileSize ? `${Math.round(image.fileSize / 1024)} KB` : "-"}
          </div>
        </div>

        {onSelect && (
          <Button
            onClick={() => {
              onSelect(image);
              onOpenChange(false);
            }}
          >
            Select image
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
