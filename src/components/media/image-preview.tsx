"use client";

import { Image } from "@imagekit/next";

type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function ImagePreview({
  src,
  alt = "",
  width = 1200,
  height = 800,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      responsive
      transformation={[
        {
          width,
        },
      ]}
    />
  );
}
