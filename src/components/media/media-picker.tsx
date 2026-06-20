"use client";

import { TImage } from "@/types/media";
import MediaGrid from "./media-grid";

type Props = {
  images: TImage[];
  onSelect: (image: TImage) => void;
};

export default function MediaPicker({ images, onSelect }: Props) {
  return (
    <MediaGrid
      images={images}
      selectable
      onSelect={onSelect}
    />
  );
}
