"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "../layout/container";
import { Logo } from "../header/logo";
import { FOOTER_SECTIONS } from "@/lib/constants/nav";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t">
      <Container>
        <div className="py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Logo />

              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                {t("description")}
              </p>
            </div>

            {FOOTER_SECTIONS.map((section) => (
              <div key={section.key}>
                <h3 className="mb-4 text-sm font-semibold">{t(section.key)}</h3>

                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t pt-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t("copyright")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
