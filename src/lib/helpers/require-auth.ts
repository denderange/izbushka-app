import { getLocale } from "next-intl/server";
import { getSession } from "./get-session";
import { redirect } from "@/i18n/navigation";

export async function requireAuth() {
  const locale = await getLocale();
  const session = await getSession();

  if (!session) {
    redirect({
      href: "/sign-up",
      locale,
    });
  }

  return session;
}
