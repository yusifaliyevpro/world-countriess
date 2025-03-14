"use client";

import { Locales } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { CountryForPage } from "@/lib/types";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { Snippet } from "@heroui/snippet";
import { addToast, closeAll } from "@heroui/toast";
import countries from "i18n-iso-countries";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiDotsVerticalRounded, BiImageAlt, BiLink, BiLogoTelegram, BiLogoWhatsapp, BiSolidShareAlt } from "react-icons/bi";

export default function Share({ country, locale }: { country: CountryForPage; locale: Locales }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Country.Share");
  const [canShareFiles, setCanShareFiles] = useState(false);
  const [canShareText, setCanShareText] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.canShare) {
      setCanShareFiles(navigator.canShare({ files: [new File([], "test.png", { type: "image/png" })] }));
      setCanShareText(navigator.canShare({ text: "Test" }));
    }
  }, []);

  const ShareText = (s: string) => {
    return t("shareText", {
      s: s,
      flag: country.flag,
      country: countries.getName(country.cca3, locale) || country.name.common,
      officialName: country.name.official,
      capital: country.capital ? country.capital.join(", ") : "No Capital City",
      population: country.population.toLocaleString("az"),
      region: country.subregion ? country.subregion : "No Information",
      currency: country.currencies
        ? Object.values(country.currencies)[0].name + ` (${Object.values(country.currencies)[0].symbol})`
        : "No Currency",
      independent: country.independent ? "✅" : "❎",
      baseURL: BASE_URL,
      pathname: pathname,
    });
  };

  const handleShare = (platform: string) => {
    if (platform === "whatsapp") {
      router.push(`whatsapp://send?text=${encodeURIComponent(ShareText("*"))}`);
    } else if (platform === "telegram") {
      router.push(`tg://msg?text=${encodeURIComponent(ShareText("**"))}`);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(ShareText(""));
      addToast({ title: t("copied"), color: "success" });
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    } else if (platform === "other") {
      const shareData = {
        title: `World Countriess | ${country.name.common}`,
        text: ShareText(""),
      };
      addToast({ title: t("preparing"), timeout: 1000 });
      navigator.share(shareData);
    }
  };

  async function handlePoster() {
    if (!country) return null;
    try {
      const posterURL = country.flags.png;
      const response = await fetch(posterURL);

      if (!response.ok) {
        throw new Error("İmage couldn't fetch");
      }

      const blob = await response.blob();
      const filesArray = [
        new File([blob], `flag.png`, {
          type: "image/png",
          lastModified: new Date().getTime(),
        }),
      ];
      const shareData = {
        title: `FilmIsBest | ${country.name.common}`,
        files: filesArray,
      };
      closeAll();
      addToast({ title: t("imageIsPreparing") });
      return navigator
        .share(shareData)
        .then(() => {
          closeAll();
          addToast({ title: t("imageIsReady"), color: "success" });
        })
        .catch(() => {
          throw new Error(t("anErrorOccurred"));
        });
    } catch (error) {
      addToast({ title: "An error Occured", color: "danger" });
      console.log(error);
    }
  }

  return (
    <div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{
          duration: 0.8,
          delay: country.borders ? 3.5 : 2.8,
          type: "spring",
          stiffness: 100,
        }}
      >
        <Button
          className="relative flex flex-row items-center justify-center gap-1 text-xl font-bold"
          color="primary"
          size="lg"
          onPress={onOpen}
        >
          <BiSolidShareAlt className="mt-1 text-2xl" />
          <p className="select-none">{t("share")}</p>
        </Button>
      </motion.div>
      <Modal className="light:text-white dark:text-white" isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex w-full flex-row items-center justify-center gap-3 font-bold">
            <BiSolidShareAlt className="mt-1 text-4xl" />
            <h6 className="select-none text-3xl font-bold">{t("share")}</h6>
          </ModalHeader>
          <ModalBody className="p-8">
            <div className="no-scrollbar relative mb-10 flex flex-1 select-none flex-row items-center gap-4 overflow-x-scroll p-2 scrollbar-hide">
              <div
                className="relative flex w-fit cursor-pointer flex-col items-center rounded-lg p-2 hover:shadow-medium"
                onClick={() => handleShare("whatsapp")}
              >
                <BiLogoWhatsapp className="text-7xl text-blue-600" />
                <p className="font-bold">WhatsApp</p>
              </div>
              {isMobile && (
                <div
                  className="relative flex w-fit cursor-pointer flex-col items-center rounded-lg p-2 hover:shadow-medium"
                  onClick={() => handleShare("telegram")}
                >
                  <BiLogoTelegram className="text-7xl text-blue-600" />
                  <p className="font-bold">Telegram</p>
                </div>
              )}
              <div
                className="relative flex w-fit cursor-pointer flex-col items-center rounded-lg p-2 hover:shadow-medium"
                onClick={() => handleShare("copy")}
              >
                <BiLink className="text-7xl text-blue-600" />
                <p className="text-nowrap font-bold">Copy Text</p>
              </div>
              {canShareFiles && (
                <div
                  className="relative flex w-fit cursor-pointer flex-col items-center rounded-lg p-2 hover:shadow-medium"
                  onClick={handlePoster}
                >
                  <BiImageAlt className="text-nowrap text-7xl text-blue-600" />
                  <p className="font-bold" title="Low quality">
                    {t("flag")}
                  </p>
                </div>
              )}
              {canShareText && (
                <div
                  className="relative flex w-fit cursor-pointer flex-col items-center rounded-lg p-2 hover:shadow-medium"
                  onClick={() => handleShare("other")}
                >
                  <BiDotsVerticalRounded className="text-7xl text-blue-600" />
                  <p className="font-bold">{t("other")}</p>
                </div>
              )}
            </div>
            <div className="mx-auto">
              <Snippet codeString={`${BASE_URL}/${locale}/${country.cca3.toLowerCase()}`} symbol="" variant="bordered">
                <div className="line-clamp-1 w-48 flex-row truncate text-nowrap lg:w-80">
                  {`${BASE_URL}/${locale}/${country.cca3.toLowerCase()}`}
                </div>
              </Snippet>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
