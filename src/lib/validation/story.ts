import { z } from "zod";

export const StoryPageInputSchema = z.object({
  imageId: z.string().nullable(),
  content: z.string().min(1, "Content is required"),
});

export const CreateStorySchema = z.object({
  published: z.boolean(),
  coverImageId: z.string().nullable(),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional().or(z.literal("")),
  pages: z.array(StoryPageInputSchema).min(1, "At least one page is required"),
});

export type TCreateStoryInput = z.infer<typeof CreateStorySchema>;
