import { getTranslations } from "next-intl/server";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { FcGlobe } from "react-icons/fc";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header({ locale }: { locale: Locale }) {
  "use cache";
  cacheLife("max");

  const t = await getTranslations("Header");
  return (
    <Navbar isBordered className="select-none" isBlurred={false}>
      <NavbarContent>
        <NavbarBrand>
          <Link className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold" href={`/`}>
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
              href={`/${route.path}`}
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
      <NavbarMenu className="max-h-50 items-center justify-center gap-3 overflow-hidden bg-gray-100/90 backdrop-blur-md">
        {navigationRoutes.map((route, i) => (
          <NavbarMenuItem key={i}>
            <Link className={`w-full text-xl font-bold`} href={`/${route.path}`}>
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
      <NavbarMenuToggle className="sm:hidden" />
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
