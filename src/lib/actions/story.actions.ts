"use server";

import slugify from "slugify";
import prisma from "@/lib/prisma";

import { CreateStorySchema, TCreateStoryInput } from "@/lib/validation/story";

export async function getStories() {
  return prisma.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      translations: true,
      coverImage: true,
      _count: {
        select: {
          pages: true,
        },
      },
    },
  });
}

export async function createStory(data: TCreateStoryInput) {
  const validated = CreateStorySchema.parse(data);

  const slug = slugify(validated.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  const story = await prisma.story.create({
    data: {
      published: validated.published,
      publishedAt: validated.published ? new Date() : null,
      coverImageId: validated.coverImageId,
      translations: {
        create: {
          locale: "ru",
          slug,
          title: validated.title,
          description: validated.description,
        },
      },
      pages: {
        create: validated.pages.map((page, index) => ({
          sortOrder: index,
          imageId: page.imageId,
          translations: {
            create: {
              locale: "ru",
              content: page.content,
            },
          },
        })),
      },
    },
    include: {
      translations: true,
      pages: true,
    },
  });

  return {
    success: true,
    data: story,
  };
}
