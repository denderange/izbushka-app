import { SignUpCard } from "@/components/auth/sign-up-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/constants/auth-routes";

type Props = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const locale = await getLocale();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { callbackUrl } = await searchParams;

  if (session) {
    redirect({
      href: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      locale: locale ?? "en",
    });
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <SignUpCard callbackUrl={callbackUrl} />
    </div>
  );
}
