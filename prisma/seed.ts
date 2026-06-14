import { faker } from "@faker-js/faker";
import { UserRole } from "../generated/prisma/client";
import prisma from "@/lib/prisma";

async function main() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      emailVerified: true,
      image: faker.image.avatar(),
      role: Math.random() > 0.95 ? UserRole.admin : UserRole.user,
      banned: Math.random() > 0.9,
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("100 users created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
