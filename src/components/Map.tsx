"use client";

import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useTranslations } from "next-intl";

export default function MapModal({ latlng, latlng2 }: { latlng: number; latlng2: number }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const t = useTranslations("Country.MoreInfo");
  return (
    <div>
      <p
        className="text-md w-fit cursor-pointer font-bold text-blue-500 underline select-none hover:text-blue-600"
        onClick={onOpen}
      >
        {t("showOnMap")}
      </p>
      <Modal isOpen={isOpen} placement="center" size="3xl" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <div className="relative mx-4 my-4 flex items-center justify-center">
              <GoogleMapsEmbed
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || ""}
                height={500}
                mode="place"
                q={`${latlng},${latlng2}`}
                width={600}
                zoom="5"
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
