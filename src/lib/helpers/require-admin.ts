import { getLocale } from "next-intl/server";
import { requireAuth } from "./require-auth";
import { redirect } from "@/i18n/navigation";

export async function requireAdmin() {
  const locale = await getLocale();
  const session = await requireAuth();

  if (session?.user.role !== "admin") {
    redirect({
      href: "/",
      locale,
    });
  }

  return session;
}
