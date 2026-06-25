import { Link } from "@/i18n/navigation";
import { getStories } from "@/lib/actions/story.actions";
import { StoriesTable } from "@/components/dashboard/stories/stories-table";
import { Button } from "@/components/ui/button";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Истории</h1>

        <Button asChild>
          <Link href="/dashboard/stories/create">Создать новую историю</Link>
        </Button>
      </div>

      <StoriesTable stories={stories} />
    </div>
  );
}
