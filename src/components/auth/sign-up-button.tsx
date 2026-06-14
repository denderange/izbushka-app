"use client";

import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";

export function SignUpButton() {
  const pathname = usePathname();

  return (
    <Button
      asChild
      size="sm">
      <Link
        href={{
          pathname: "/sign-up",
          query: {
            callbackUrl: pathname,
          },
        }}>
        Sign Up
      </Link>
    </Button>
  );
}
