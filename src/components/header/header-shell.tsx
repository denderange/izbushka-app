"use client";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

interface HeaderShellProps {
  children: React.ReactNode;
}

export function HeaderShell({ children }: HeaderShellProps) {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled &&
          "bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60",
      )}>
      {children}
    </header>
  );
}
