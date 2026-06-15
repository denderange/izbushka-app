import { SendMessageForm } from "@/components/send-message/send-message-form";
import { requireAuth } from "@/lib/helpers/require-auth";
import { getLocale, getTranslations } from "next-intl/server";

const MessagePage = async () => {
  const t = await getTranslations("messagePage");
  const session = await requireAuth();

  if (!session) return null;

  return (
    <>
      {/* <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      /> */}
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-2 mb-4 max-w-3xl">
          {t("Write a message")}
        </h1>
        <SendMessageForm
          userName={session?.user.name}
          userEmail={session?.user.email}
        />
      </div>
    </>
  );
};

export default MessagePage;
