"use client";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { LocaleSwitcher } from "./locale-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants/nav";

export function Header() {
  const scrolled = useScroll(10);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled &&
          "bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60",
      )}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LocaleSwitcher />

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
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
