import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
    agentUpgrade: "security",
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
