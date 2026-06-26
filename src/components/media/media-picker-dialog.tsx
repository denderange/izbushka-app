"use client";

import { useState } from "react";
import { Image } from "@imagekit/next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TImage } from "@/types/media";

type Props = {
  images: TImage[];
  value?: string | null;
  onChange: (imageId: string) => void;
};

export default function MediaPickerDialog({ images, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selectedImage = images.find((image) => image.id === value);

  return (
    <div className="space-y-4">
      {selectedImage && (
        <Image
          src={selectedImage.url}
          alt={selectedImage.name}
          width={300}
          height={200}
          className="rounded-lg border"
        />
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline">
            Select cover image
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-6xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Select cover image</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 max-h-[70vh] overflow-y-auto">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                className="border rounded-lg overflow-hidden hover:border-primary"
                onClick={() => {
                  onChange(image.id);
                  setOpen(false);
                }}>
                <Image
                  src={image.url}
                  alt={image.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
