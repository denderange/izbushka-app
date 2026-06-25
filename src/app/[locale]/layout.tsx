import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Footer } from "@/components/footer/footer";
import { Container } from "@/components/layout/container";
import { Header } from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ImageKitProvider } from "@imagekit/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Izbushka",
  description: "Not Children's Fairy Tales",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col",
          "antialiased",
          "font-sans",
          geistSans.variable,
          geistMono.variable,
          inter.variable,
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          enableColorScheme
          disableTransitionOnChange>
          <NextIntlClientProvider>
            <ImageKitProvider
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}>
              <Header />
              <main className="flex-1">
                <Container>{children}</Container>
              </main>
              <Footer />
              <Toaster position="top-center" />
            </ImageKitProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
