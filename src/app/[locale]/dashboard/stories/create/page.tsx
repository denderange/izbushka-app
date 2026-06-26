import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import StoryForm from "@/components/dashboard/stories/story-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function CreateStoryPage() {
  const images = await prisma.image.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          className="mt-1 shrink-0"
          asChild>
          <Link href="/dashboard/stories">
            <ArrowLeft className="size-4" />
            <span className="sr-only">Назад к списку</span>
          </Link>
        </Button>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Новая история</h1>
          <p className="text-muted-foreground">
            Заполните основные данные и добавьте страницы истории.
          </p>
        </div>
      </div>

      <StoryForm images={images} />
    </div>
  );
}
