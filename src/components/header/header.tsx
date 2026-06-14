import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants/nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { LocaleSwitcher } from "./locale-switcher";
import { HeaderShell } from "./header-shell";
import { AuthButton } from "../auth/auth-button";

export async function Header() {
  return (
    <HeaderShell>
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

          <AuthButton />
        </div>

        <MobileNav />
      </div>
    </HeaderShell>
  );
}
