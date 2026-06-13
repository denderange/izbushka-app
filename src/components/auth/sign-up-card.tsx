"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl || `/${locale}`,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Create account</CardTitle>

        <CardDescription>Continue with your Google account</CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}
