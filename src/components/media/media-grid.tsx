import { TImage } from "@/types/media";
import MediaCard from "./media-card";

type Props = {
  images: TImage[];
  selectable?: boolean;
  onSelect?: (image: TImage) => void;
};

export default function MediaGrid({ images }: Props) {
  if (!images.length) {
    return <div className="text-muted-foreground">No images found</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
      {images.map((image) => (
        <MediaCard
          key={image.id}
          image={image}
        />
      ))}
    </div>
  );
}
