export const NAV_LINKS = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "About",
    href: "#about",
  },
] as const;

export const FOOTER_SECTIONS = [
  {
    key: "product",
    links: [
      {
        key: "features",
        href: "/features",
      },
      {
        key: "pricing",
        href: "/pricing",
      },
    ],
  },
  {
    key: "company",
    links: [
      {
        key: "about",
        href: "/about",
      },
      {
        key: "contact",
        href: "/contact",
      },
    ],
  },
  {
    key: "legal",
    links: [
      {
        key: "privacy",
        href: "/privacy",
      },
      {
        key: "terms",
        href: "/terms",
      },
    ],
  },
] as const;
