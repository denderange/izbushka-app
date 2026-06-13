export const LOCALES = {
  en: {
    label: "English",
    flag: "🇺🇸",
  },
  ru: {
    label: "Русский",
    flag: "🇷🇺",
  },
} as const;

export type Locale = keyof typeof LOCALES;
export const SUPPORTED_LOCALES = Object.keys(LOCALES) as Locale[];
export const DEFAULT_LOCALE: Locale = "en";
