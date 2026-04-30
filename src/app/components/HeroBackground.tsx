"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroBackground({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = document.querySelector("[data-hero-section]") as HTMLElement | null;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
    />
  );
}
