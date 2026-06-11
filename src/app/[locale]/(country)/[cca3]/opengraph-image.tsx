import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { restCountries } from "@/lib/countries";
import { CountryPageProps } from "./page";

export const runtime = "nodejs";
export const alt = "Country OpenGraph";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image({ params }: CountryPageProps) {
  const { cca3 } = await params;
  const country = await restCountries.getCountryByCode(
    { code: cca3, fields: ["flag", "names"] },
    { next: { revalidate: 7 * 23 * 3600 }, cache: "force-cache" },
  );
  if (!country) notFound();
  const interSemiBold = fetch(new URL("./../../../../../public/fonts/Inter-Bold.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    <div tw="relative flex h-full w-full items-center justify-center">
      <div tw="absolute inset-0 flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={country.names.common}
          height={600}
          src={country.flag.url_svg || "/placeholder_flag.png"}
          tw="flex flex-1"
          width={1200}
        />
        <div tw="bg-opacity-70 absolute inset-0 z-10 flex bg-black" />
      </div>
      <div tw="flex flex-col text-neutral-50">
        <div tw="text-8xl font-bold">{country.names.common}</div>
      </div>
    </div>,
    {
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 700,
        },
      ],
      height: 600,
      width: 1200,
    },
  );
}
