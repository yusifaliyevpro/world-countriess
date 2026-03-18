import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { notFound } from "next/navigation";

export const locales = ["en", "az", "tr"] as const;
export type Locales = (typeof locales)[number];
export const routing = defineRouting({ locales, defaultLocale: "az" });

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

export function validateLocale(locale: string): asserts locale is Locales {
  if (!routing.locales.includes(locale as Locales)) {
    notFound();
  }
}
