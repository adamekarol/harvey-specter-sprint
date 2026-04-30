"use client";

import { useEffect } from "react";

export function FooterSpacer() {
  useEffect(() => {
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    if (!footer || !main) return;

    const update = () => {
      (main as HTMLElement).style.marginBottom = `${footer.offsetHeight}px`;
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(footer);
    return () => {
      observer.disconnect();
      (main as HTMLElement).style.marginBottom = "";
    };
  }, []);

  return null;
}
