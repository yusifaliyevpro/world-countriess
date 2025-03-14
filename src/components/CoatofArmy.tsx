"use client";

import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/modal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function CoatofArmy({ src, alt }: { src: string; alt: string }) {
  const t = useTranslations("Country.MoreInfo");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <p
        className="text-md w-fit cursor-pointer font-bold text-blue-500 underline select-none hover:text-blue-600"
        onClick={onOpen}
      >
        {t("showCoatOfArmy")}
      </p>
      <Modal isOpen={isOpen} placement="center" size="3xl" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <div className="relative mx-4 my-4 flex items-center justify-center">
              <div className={`fixed right-1/2 left-1/2 mt-32 items-center justify-center ${loaded ? "hidden" : "flex"}`}>
                <p className="text-3xl font-bold">Loading...</p>
              </div>
              <Image
                alt={alt}
                className="bg-transparent object-fill select-none"
                height={400}
                src={src}
                width={400}
                onLoad={() => setLoaded(true)}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
