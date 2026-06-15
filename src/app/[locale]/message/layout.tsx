import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "messagePage" });

  return {
    title: t("WriteMessageMeta"),
    description: t("MessagePageDescription", {
      defaultValue: "Send a message to our support team quickly and securely.",
    }),
    openGraph: {
      title: t("Write a message"),
      description: t("MessagePageDescription"),
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/message`,
    },
  };
}

export default function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
