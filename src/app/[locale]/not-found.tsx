import { Locales } from "@/i18n/routing";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locales }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFound" });
  return {
    title: t("title"),
    description: t("notFoundMessage"),
    creator: "YusifAliyevPro",
    openGraph: {
      title: t("title"),
      description: t("notFoundMessage"),
    },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center gap-y-7">
      <div className="flex flex-row items-center gap-x-9 text-8xl md:text-9xl lg:text-[16rem]">
        <p>4</p>
        <Link href={"/"}>
          <Image
            priority
            unoptimized
            alt="Profile Picture"
            className="rounded-full border-2 shadow-small max-lg:h-36 max-lg:w-36 max-md:h-28 max-md:w-28"
            height={250}
            src={"/icon.png"}
            width={250}
          />
        </Link>
        <p>4</p>
      </div>
      <h1 className="px-10 text-center text-2xl lg:px-72 lg:text-3xl">{t("notFoundMessage")}</h1>
    </main>
  );
}
