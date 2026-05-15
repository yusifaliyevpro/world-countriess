"use client";

import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { Input } from "@heroui/input";
import { BiSearch } from "react-icons/bi";
import { searchParams } from "@/lib/searchParams";

export default function Search() {
  const [query, setQuery] = useQueryState("q", searchParams.q);
  const t = useTranslations("Home.Search");

  // useEffect(() => {
  //   setSearch(query);
  // }, [query, setSearch]);

  // useEffect(() => {
  //   if (resultCount === 0) {
  //     addToast({ title: t("noResult"), icon: <BiSearch className="text-2xl font-bold" /> });
  //   }
  // }, [t, resultCount]);

  return (
    <div>
      <div className="mx-5 mt-6 mb-4 w-auto sm:mx-auto sm:w-125">
        <Input
          classNames={{
            base: "h-11 sm:max-w-400",
            mainWrapper: "h-full",
            input: "text-md text-small font-bold text-black",
            inputWrapper: "h-full font-normal text-white",
          }}
          placeholder={t("placeholder")}
          radius="full"
          size="lg"
          startContent={<BiSearch className="text-[1.7rem] font-bold text-black" />}
          type="search"
          value={query}
          variant="bordered"
          onChange={(e) => setQuery(e.target.value.replace(/['\[\]\/\\()]/g, ""))}
        />
      </div>
    </div>
  );
}
