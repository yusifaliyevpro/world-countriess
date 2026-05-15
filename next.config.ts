import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    rootParams: true,
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    messages: {
      format: "json",
      locales: "infer",
      path: "./messages",
      precompile: true,
    },
  },
});

export default withNextIntl(nextConfig);
