"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function getImages() {
  return prisma.image.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createImage(data: {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
}) {
  return prisma.image.create({
    data: {
      fileId: data.fileId,
      name: data.name,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl,
      width: data.width,
      height: data.height,
    },
  });
}

export async function deleteImage(id: string) {
  await prisma.image.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/media");
}
