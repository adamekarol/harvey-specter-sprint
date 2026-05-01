"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroHeading() {
  const harveyRef = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = document.querySelector("[data-hero-section]") as HTMLElement | null;
    if (!section) return;

    const st = { trigger: section, start: "top top", end: "bottom top", scrub: 1.5 };

    const ctx = gsap.context(() => {
      gsap.to(harveyRef.current, { xPercent: -30, ease: "none", force3D: true, scrollTrigger: st });
      gsap.to(specterRef.current,{ xPercent:  30, ease: "none", force3D: true, scrollTrigger: st });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <p
        className="text-white text-sm uppercase mix-blend-overlay min-[900px]:px-[18px]"
        style={{ fontFamily: "monospace", letterSpacing: "0.05em", lineHeight: 1.1, transform: 'translateZ(0)' }}
      >
        [ Hello i&apos;m ]
      </p>
      <h1
        className="text-white font-medium capitalize mix-blend-overlay text-center
                   text-[25vw] min-[900px]:text-[13.75vw] min-[900px]:whitespace-nowrap"
        style={{ letterSpacing: "-0.07em", lineHeight: 0.95, transform: 'translateZ(0)' }}
      >
        <span ref={harveyRef} className="block min-[900px]:inline-block">Harvey</span>{" "}
        <span ref={specterRef} className="block min-[900px]:inline-block">Specter</span>
      </h1>
    </>
  );
}
