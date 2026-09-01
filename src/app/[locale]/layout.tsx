import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Poppins } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import { sharedMetdata } from "@/lib/shared-metadata";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"] });

export const metadata: Metadata = sharedMetdata;

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html className="flex min-h-screen flex-col scroll-smooth bg-white text-black light" lang={locale}>
      <body className={poppins.className}>
        <NuqsAdapter>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <Header locale={locale} />
              {children}
              <Footer />
            </Providers>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
