import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export async function Breadcrumb({ alpha_3, countryName }: { alpha_3: string; countryName: string }) {
  const t = await getTranslations("Header");
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-7 mt-10 mb-0 flex h-fit font-bold text-nowrap select-none lg:mx-20 lg:mt-14"
      initial={{ opacity: 0, y: -30 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <Breadcrumbs color="primary" size="lg">
        <BreadcrumbItem href="/">{t("homePage")}</BreadcrumbItem>
        <BreadcrumbItem href={`/countries/${alpha_3}`}>{countryName}</BreadcrumbItem>
      </Breadcrumbs>
    </motion.div>
  );
}
