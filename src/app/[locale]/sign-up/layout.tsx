import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SignUpPage" });

  return {
    title: t("SignUpMeta"),
    description: t("SignUpPageDescription"),
    openGraph: {
      title: t("title"),
      description: t("SignUpPageDescription"),
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/sign-up`,
    },
  };
}

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
