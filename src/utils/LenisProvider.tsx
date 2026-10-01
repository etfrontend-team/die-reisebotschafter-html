"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const instance = new Lenis();

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const stop = () => instance.stop();
    const start = () => instance.start();
    window.addEventListener("lenis:stop", stop);
    window.addEventListener("lenis:start", start);

    const unsub = instance.on("scroll", () => {
      window.dispatchEvent(
        new CustomEvent("lenis:update", { detail: { targetScroll: instance.targetScroll } }),
      );
    });

    window.dispatchEvent(
      new CustomEvent("lenis:update", { detail: { targetScroll: instance.targetScroll } }),
    );

    if (window.location.hash) {
      // querySelector throws on hashes that aren't valid selectors (e.g. "#1-intro")
      let target: Element | null = null;
      try {
        target = document.querySelector(window.location.hash);
      } catch {
        target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      }
      if (target) {
        requestAnimationFrame(() => {
          instance.scrollTo(target as HTMLElement, { immediate: false });
        });
      }
    }

    return () => {
      unsub();
      cancelAnimationFrame(rafId);
      instance.destroy();
      window.removeEventListener("lenis:stop", stop);
      window.removeEventListener("lenis:start", start);
    };
  }, []);

  return <>{children}</>;
}
