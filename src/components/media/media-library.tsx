"use client";

import { TImage } from "@/types/media";

import MediaGrid from "./media-grid";
import MediaUpload from "./media-upload";

type Props = {
  images: TImage[];
};

export default function MediaLibrary({ images }: Props) {
  return (
    <div className="space-y-6">
      <MediaUpload />

      <MediaGrid images={images} />
    </div>
  );
}
