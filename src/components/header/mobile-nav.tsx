"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NAV_LINKS } from "@/lib/constants/nav";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-75 px-4">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-2">
          {NAV_LINKS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="justify-start"
              asChild>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}

          <div className="my-4 flex items-center gap-2">
            <ThemeToggle />
            <LocaleSwitcher />
          </div>

          <Button asChild>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
