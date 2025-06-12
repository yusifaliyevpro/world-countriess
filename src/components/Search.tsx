"use client";

import useStore from "@/lib/store";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounce } from "use-debounce";

export default function Search() {
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 600);
  const setSearch = useStore((state) => state.setSearch);
  const resultCount = useStore((state) => state.resultCount);
  const t = useTranslations("Home.Search");

  useEffect(() => {
    setSearch(query);
  }, [query, setSearch]);

  useEffect(() => {
    if (resultCount === 0) {
      addToast({ title: t("noResult"), icon: <BiSearch className="text-2xl font-bold" /> });
    }
  }, [t, resultCount]);

  return (
    <div>
      <div className="mx-5 mb-4 mt-6 w-auto sm:mx-auto sm:w-[500px]">
        <Input
          classNames={{
            base: "h-11 sm:max-w-[100rem]",
            mainWrapper: "h-full",
            input: "text-md text-small font-bold text-black",
            inputWrapper: "h-full font-normal text-white",
          }}
          placeholder={t("placeholder")}
          radius="full"
          size="lg"
          startContent={<BiSearch className="text-[1.7rem] font-bold text-black" />}
          type="search"
          value={text}
          variant="bordered"
          onChange={(e) => {
            setText(e.target.value.replace(/['\[\]\/\\()]/g, ""));
          }}
        />
      </div>
    </div>
  );
}
