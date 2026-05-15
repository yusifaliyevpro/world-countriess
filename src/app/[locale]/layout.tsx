import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import { sharedMetdata } from "@/lib/shared-metadata";
import { validateLocale } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"] });

export const metadata: Metadata = sharedMetdata;

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  validateLocale(locale);
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
