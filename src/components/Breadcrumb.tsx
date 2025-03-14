"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";

export function Breadcrumb({ cca3, countryName }: { cca3: string; countryName: string }) {
  const t = useTranslations("Header");
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-7 mb-0 mt-10 flex h-fit select-none text-nowrap font-bold lg:mx-20 lg:mt-14"
      initial={{ opacity: 0, y: -30 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <Breadcrumbs color="primary" size="lg">
        <BreadcrumbItem href="/">{t("homePage")}</BreadcrumbItem>
        <BreadcrumbItem href={`/countries/${cca3}`}>{countryName}</BreadcrumbItem>
      </Breadcrumbs>
    </motion.div>
  );
}
