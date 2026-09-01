import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { locales, routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const shouldHandle = pathname === "/" || new RegExp(`^/(${locales.join("|")})/:path`).test(request.nextUrl.pathname);
  if (!shouldHandle) return;

  handleI18nRouting(request);
}
