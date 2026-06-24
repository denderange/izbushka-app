"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/users",
    label: "Users",
  },
  {
    href: "/dashboard/stories",
    label: "Stories",
  },
  {
    href: "/dashboard/media",
    label: "Media",
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex gap-6 px-4 py-3">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
