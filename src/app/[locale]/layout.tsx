import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import { locales, Locales } from "@/i18n/routing";
import { sharedMetdata } from "@/lib/shared-metadata";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"] });

export const metadata: Metadata = sharedMetdata;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locales }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html className="flex min-h-screen flex-col scroll-smooth bg-white text-black light" lang={locale}>
      <body className={poppins.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header locale={locale} />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
