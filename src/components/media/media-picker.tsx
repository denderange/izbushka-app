"use client";

import Image from "next/image";

type MediaPickerProps = {
  images: {
    id: string;
    url: string;
    name: string;
  }[];

  onSelect: (imageId: string) => void;
};

export default function MediaPicker({ images, onSelect }: MediaPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onSelect(image.id)}
        >
          <Image
            src={image.url}
            alt={image.name}
            width={200}
            height={150}
            className="rounded border"
          />
        </button>
      ))}
    </div>
  );
}

// Где он пригодится

// Например форма создания сказки.

// <MediaPicker
//   images={images}
//   onSelect={(imageId) => {
//     form.setValue(
//       "coverImageId",
//       imageId
//     );
//   }}
// />
