"use client";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { MotionConfig } from "motion/react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function Providers({ children }: { children: Readonly<ReactNode> }) {
  const router = useRouter();
  // oxlint-disable-next-line typescript/no-unnecessary-type-assertion
  const routerPush = (path: string, routerOptions: undefined) => router.push(path as Route, routerOptions);

  return (
    <HeroUIProvider navigate={routerPush}>
      <ToastProvider toastOffset={70} />
      <MotionConfig>{children}</MotionConfig>
    </HeroUIProvider>
  );
}
