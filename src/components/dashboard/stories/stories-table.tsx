import { Link } from "@/i18n/navigation";
import { getStories } from "@/lib/actions/story.actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Stories = Awaited<ReturnType<typeof getStories>>;

function getStoryTitle(story: Stories[number]) {
  return (
    story.translations.find((t) => t.locale === "ru")?.title ??
    story.translations[0]?.title ??
    "Без названия"
  );
}

type Props = {
  stories: Stories;
};

export function StoriesTable({ stories }: Props) {
  if (stories.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        Историй пока нет. Создайте первую.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Обложка</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Страниц</TableHead>
            <TableHead>Просмотры</TableHead>
            <TableHead>Создана</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {stories.map((story) => (
            <TableRow key={story.id}>
              <TableCell>
                {story.coverImage ? (
                  <img
                    src={story.coverImage.thumbnailUrl ?? story.coverImage.url}
                    alt={story.coverImage.alt ?? getStoryTitle(story)}
                    className="size-10 rounded object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                    —
                  </div>
                )}
              </TableCell>

              <TableCell className="max-w-xs font-medium">
                <span className="line-clamp-2">{getStoryTitle(story)}</span>
              </TableCell>

              <TableCell>
                {story.published ? (
                  <span className="text-green-600 dark:text-green-400">
                    Опубликована
                  </span>
                ) : (
                  <span className="text-muted-foreground">Черновик</span>
                )}
              </TableCell>

              <TableCell>{story._count.pages}</TableCell>

              <TableCell>{story.viewCount}</TableCell>

              <TableCell>
                {story.createdAt.toLocaleDateString("ru-RU")}
              </TableCell>

              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  asChild>
                  <Link href={`/dashboard/stories/${story.id}/edit`}>
                    Изменить
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
