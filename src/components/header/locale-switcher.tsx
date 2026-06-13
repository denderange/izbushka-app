"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

const languages = [
  {
    code: "en",
    label: "English",
    flag: "🇺🇸",
  },
  {
    code: "ru",
    label: "Русский",
    flag: "🇷🇺",
  },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, {
      locale: newLocale,
    });
  };

  const current =
    languages.find((lang) => lang.code === locale) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2">
          <Globe className="h-4 w-4" />
          <span>{current.flag}</span>
          <span>{current.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLocale(lang.code)}>
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
