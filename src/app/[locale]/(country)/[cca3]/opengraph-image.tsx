import { CountryPageProps } from "./page";
import { getCountryByCode } from "@yusifaliyevpro/countries";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Country OpenGraph";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image({ params }: CountryPageProps) {
  const { cca3 } = await params;
  const country = await getCountryByCode(
    { code: cca3, fields: ["flags", "name"] },
    { next: { revalidate: 7 * 23 * 3600 }, cache: "force-cache" },
  );
  if (!country) notFound();
  const interSemiBold = fetch(new URL("./../../../../../public/fonts/Inter-Bold.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full items-center justify-center">
        <div tw="absolute flex inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={country.name.common} height={600} src={country.flags.svg} tw=" flex flex-1" width={1200} />
          <div tw="absolute flex inset-0 bg-black bg-opacity-70 z-10" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          <div tw="text-8xl font-bold">{country.name.common}</div>
        </div>
      </div>
    ),
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
