import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import { locales, Locales } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/icon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.ico",
    },
  },
  title: {
    default: "World Countriess",
    template: "%s | World Countriess",
  },
  keywords: [
    "countries",
    "world",
    "world countriess",
    "World-Countriess",
    "World Countriess",
    "countries information",
    "country flags",
    "yusifaliyevpro",
    "YusifAliyevPro",
    "yusifaliyevpro.com",
    "filmisbest.com",
    "filmisbest",
    "yusifaliyev",
    "yusif",
    "aliyev",
  ],
  creator: "YusifAliyevPro",
  publisher: "YusifAliyevPro",
  applicationName: "World Countriess",
  generator: "World Countriess",
  authors: [{ name: "YusifAliyevPro", url: "https://yusifaliyevpro.com" }],
  openGraph: {
    images: ["/World-countriess.png"],
    type: "website",
    title: "World Countriess",
    url: `/`,
    siteName: "World Countriess",
    locale: "en_US",
  },
  other: {
    "google-site-verification": "HNjp-JRQToNMjuOEzQ7iFVr2h4sZi4q26x4Tli62gow",
  },
};

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
