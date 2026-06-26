"use client";

import { useTransition } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  CreateStorySchema,
  type TCreateStoryInput,
} from "@/lib/validation/story";
import { createStory } from "@/lib/actions/story.actions";
import type { TImage } from "@/types/media";
import MediaPickerDialog from "@/components/media/media-picker-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ImageSelector from "@/components/media/image-selector";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  images: TImage[];
};

const TITLE_MAX = 200;
const DESCRIPTION_MAX = 1000;

export default function StoryForm({ images }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<TCreateStoryInput>({
    resolver: zodResolver(CreateStorySchema),
    defaultValues: {
      published: false,
      coverImageId: null,
      title: "",
      description: "",
      pages: [
        {
          imageId: null,
          content: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pages",
  });

  const titleValue = form.watch("title");
  const descriptionValue = form.watch("description") ?? "";

  const onSubmit = (values: TCreateStoryInput) => {
    startTransition(async () => {
      try {
        const result = await createStory(values);

        if (result.success) {
          toast.success("История создана", {
            description: values.title,
          });
          router.push("/dashboard/stories");
        }
      } catch {
        toast.error("Не удалось сохранить историю");
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Публикация</CardTitle>
          <CardDescription>
            Черновик виден только в панели администратора.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Controller
            control={form.control}
            name="published"
            render={({ field }) => (
              <Field
                orientation="horizontal"
                className="items-center justify-between rounded-lg border p-4">
                <FieldContent>
                  <FieldLabel htmlFor="published">Опубликовать</FieldLabel>
                  <FieldDescription>
                    Если включено, история сразу будет доступна читателям.
                  </FieldDescription>
                </FieldContent>

                <Switch
                  id="published"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </Field>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Основное</CardTitle>
          <CardDescription>
            Название, описание и обложка истории.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <Controller
              control={form.control}
              name="coverImageId"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Обложка</FieldLabel>
                  <FieldDescription>
                    Выберите изображение из медиатеки или загрузите новое.
                  </FieldDescription>

                  <ImageSelector
                    images={images}
                    value={field.value}
                    onChange={field.onChange}
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field>
                  <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="title">Название</FieldLabel>
                    <span
                      className={cn(
                        "text-xs tabular-nums text-muted-foreground",
                        titleValue.length > TITLE_MAX && "text-destructive",
                      )}>
                      {titleValue.length}/{TITLE_MAX}
                    </span>
                  </div>

                  <Input
                    {...field}
                    id="title"
                    placeholder="Название истории"
                    aria-invalid={fieldState.invalid}
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field>
                  <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="description">Описание</FieldLabel>
                    <span
                      className={cn(
                        "text-xs tabular-nums text-muted-foreground",
                        descriptionValue.length > DESCRIPTION_MAX &&
                          "text-destructive",
                      )}>
                      {descriptionValue.length}/{DESCRIPTION_MAX}
                    </span>
                  </div>

                  <Textarea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Краткое описание (необязательно)"
                    aria-invalid={fieldState.invalid}
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="space-y-1">
            <CardTitle>Страницы</CardTitle>
            <CardDescription>
              Добавьте текст и изображение для каждой страницы истории.
            </CardDescription>
          </div>

          <CardAction>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  imageId: null,
                  content: "",
                })
              }>
              <Plus className="size-4" />
              Добавить страницу
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          {fields.map((page, index) => (
            <div
              key={page.id}
              className="rounded-lg border bg-muted/20 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="font-medium">Страница {index + 1}</span>
                </div>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => remove(index)}
                    aria-label={`Удалить страницу ${index + 1}`}>
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>

              <FieldGroup>
                <Controller
                  control={form.control}
                  name={`pages.${index}.imageId`}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Изображение</FieldLabel>
                      <FieldDescription>Необязательно.</FieldDescription>

                      <MediaPickerDialog
                        images={images}
                        value={field.value}
                        onChange={field.onChange}
                      />

                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name={`pages.${index}.content`}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor={`page-content-${index}`}>
                        Текст
                      </FieldLabel>

                      <Textarea
                        {...field}
                        id={`page-content-${index}`}
                        rows={8}
                        placeholder="Текст страницы..."
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          ))}

          {form.formState.errors.pages?.root && (
            <FieldError errors={[form.formState.errors.pages.root]} />
          )}
        </CardContent>
      </Card>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t bg-background/95 py-4 backdrop-blur supports-backdrop-filter:bg-background/80">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          asChild>
          <Link href="/dashboard/stories">Отмена</Link>
        </Button>

        <Button
          type="submit"
          disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            "Сохранить историю"
          )}
        </Button>
      </div>
    </form>
  );
}
