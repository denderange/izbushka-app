"use client";

import { useState } from "react";
import { Image } from "@imagekit/next";
import type { TImage } from "@/types/media";
import MediaPickerDialog from "./media-picker-dialog";
import MediaUpload from "./media-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  images: TImage[];
  value?: string | null;
  onChange: (imageId: string | null) => void;
  folder?: string;
};

export default function ImageSelector({
  images,
  value,
  onChange,
  folder = "/stories",
}: Props) {
  const [uploadedImage, setUploadedImage] = useState<TImage | null>(null);

  const selectedImage =
    uploadedImage ?? images.find((image) => image.id === value) ?? null;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          {selectedImage ? (
            <div className="space-y-4">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt ?? selectedImage.name}
                width={400}
                height={250}
                className="rounded-lg border object-cover"
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onChange(null)}
                >
                  Remove image
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No image selected
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <MediaPickerDialog
          images={images}
          value={value}
          onChange={onChange}
        />

        <MediaUpload
          folder={folder}
          onUploaded={(image) => {
            setUploadedImage(image);
            onChange(image.id);
          }}
        />
      </div>
    </div>
  );
}
