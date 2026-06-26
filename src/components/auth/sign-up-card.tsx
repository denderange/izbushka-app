"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useLocale } from "next-intl";

interface Props {
  callbackUrl?: string;
}

export function SignUpCard({ callbackUrl }: Props) {
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const t = useTranslations("SignUpPage");
  const tFooter = useTranslations("Footer");

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl || `/${locale}`,
      });
    } catch (error) {
      console.error(error);
      toast.error(t("errorGeneric"));
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardDescription className="text-base">
          {t("description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          variant="outline"
          size="lg"
          className="h-11 w-full gap-3 text-base"
          onClick={handleGoogleLogin}
          disabled={loading}>
          {loading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <FcGoogle className="size-5 shrink-0" />
          )}
          {loading ? t("loading") : t("continueWithGoogle")}
        </Button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          {t("termsNotice")}{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-foreground">
            {tFooter("terms")}
          </Link>{" "}
          {t("and")}{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-foreground">
            {tFooter("privacy")}
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
