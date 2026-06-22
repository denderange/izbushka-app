import StoryForm from "@/components/dashboard/stories/story-form";
import prisma from "@/lib/prisma";

export default async function CreateStoryPage() {
  const images = await prisma.image.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <StoryForm images={images} />;
}
