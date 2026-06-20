"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { CreateImageInput } from "@/types/media";

export async function getImages() {
  return prisma.image.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createImage(data: CreateImageInput) {
  return prisma.image.create({
    data: {
      fileId: data.fileId,
      name: data.name,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl,
      fileType: data.fileType,
      fileSize: data.fileSize,
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
