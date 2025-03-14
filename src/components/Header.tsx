"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import { Locales } from "@/i18n/routing";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/navbar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Suspense, useState } from "react";
import { FcGlobe } from "react-icons/fc";

export default function Header({ locale }: { locale: Locales }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Header");
  return (
    <Navbar isBordered className="select-none" isBlurred={false} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Link className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold" href={`/${locale}/`}>
            <FcGlobe className="text-3xl font-normal text-blue-600" />
            <p className="font-bold text-black">World Countriess</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="gap-6" justify="center">
        {navigationRoutes.map((route, i) => (
          <NavbarItem key={i}>
            <Link
              aria-current="page"
              className="hidden text-lg font-bold text-slate-700 hover:text-black sm:flex"
              color="foreground"
              href={`/${locale}${route.path}`}
            >
              {t(route.name)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Suspense fallback={<p>Loading...</p>}>
            <LanguageSwitcher locale={locale} />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="max-h-[200px] items-center justify-center gap-3 overflow-hidden bg-gray-100/90 backdrop-blur-md">
        {navigationRoutes.map((route, i) => (
          <NavbarMenuItem key={i}>
            <Link className={`w-full text-xl font-bold`} href={`/${locale}${route.path}`}>
              {t(route.name)}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Suspense fallback={<p>Loading...</p>}>
            <LanguageSwitcher locale={locale} />
          </Suspense>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
    </Navbar>
  );
}

const navigationRoutes = [
  {
    path: "/",
    name: "homePage",
  },
  {
    path: "/about",
    name: "about",
  },
];
