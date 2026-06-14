import prisma from "@/lib/prisma";

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Изменение роли
export async function updateUserRole(userId: string, role: "user" | "admin") {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });
}

// Бан
export async function toggleUserBan(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      banned: !user.banned,
    },
  });
}

// Удаление пользователя
export async function deleteUser(userId: string) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
