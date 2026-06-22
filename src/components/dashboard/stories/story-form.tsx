"use client";

import { useTransition } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateStorySchema,
  type TCreateStoryInput,
} from "@/lib/validation/story";
import { createStory } from "@/lib/actions/story.actions";
import type { TImage } from "@/types/media";
import MediaPickerDialog from "@/components/media/media-picker-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  images: TImage[];
};

export default function StoryForm({ images }: Props) {
  const [isPending, startTransition] = useTransition();

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

  const onSubmit = (values: TCreateStoryInput) => {
    startTransition(async () => {
      await createStory(values);
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="published"
          render={({ field }) => (
            <Field orientation="horizontal">
              <FieldLabel>Published</FieldLabel>

              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="coverImageId"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Cover image</FieldLabel>

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
          name="title"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Title</FieldLabel>

              <Input {...field} />

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Description</FieldLabel>

              <Textarea
                rows={4}
                {...field}
              />

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <FieldSet>
        <div className="flex items-center justify-between">
          <FieldLegend>Pages</FieldLegend>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                imageId: null,
                content: "",
              })
            }
          >
            Add page
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((page, index) => (
            <FieldSet
              key={page.id}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <FieldLegend variant="label">Page {index + 1}</FieldLegend>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Delete page
                  </Button>
                )}
              </div>

              <Controller
                control={form.control}
                name={`pages.${index}.imageId`}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Image</FieldLabel>

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
                    <FieldLabel>Content</FieldLabel>

                    <Textarea
                      rows={8}
                      {...field}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </FieldSet>
          ))}
        </div>
      </FieldSet>

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save story"}
      </Button>
    </form>
  );
}
