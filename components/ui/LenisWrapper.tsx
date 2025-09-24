"use client";

import { useEffect } from "react";
import { initLenis } from "@/utils/lenis";

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = initLenis();

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
