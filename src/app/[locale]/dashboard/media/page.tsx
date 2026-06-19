import MediaLibrary from "@/components/media/media-library";
import { getImages } from "@/lib/actions/image.actions";

export default async function MediaPage() {
  const images = await getImages();

  return <MediaLibrary images={images} />;
}
