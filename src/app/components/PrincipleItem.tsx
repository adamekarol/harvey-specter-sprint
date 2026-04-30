"use client";

import { useRef } from "react";
import gsap from "gsap";

type Props = {
  num: string;
  title: string;
  body: string;
};

export function PrincipleItem({ num, title, body }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(titleRef.current, { x: 12, duration: 0.45, ease: "power2.out" });
    gsap.killTweensOf(lineRef.current);
    gsap.set(lineRef.current, { transformOrigin: "left" });
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.75, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(titleRef.current, { x: 0, duration: 0.45, ease: "power2.out" });
    gsap.killTweensOf(lineRef.current);
    gsap.set(lineRef.current, { transformOrigin: "right" });
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.6, ease: "power2.in" });
  };

  return (
    <div
      className="flex flex-col gap-3 py-8 cursor-default last:border-b last:border-white/15"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative w-full h-px bg-white/15 mb-1">
        <span
          ref={lineRef}
          className="absolute inset-0 bg-white"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
      </div>

      <div className="min-[900px]:flex min-[900px]:items-start min-[900px]:gap-12">
        <p
          className="text-white/40 text-[13px] uppercase leading-[1.1] shrink-0 mb-3 min-[900px]:mb-0 min-[900px]:w-[120px]"
          style={{ fontFamily: "monospace" }}
        >
          {num}
        </p>
        <div className="flex-1 flex flex-col min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-16">
          <h3
            ref={titleRef}
            className="font-bold italic text-white uppercase leading-[1.1] tracking-[-0.04em] text-[24px] min-[900px]:text-[32px] min-[900px]:min-w-[280px] mb-3 min-[900px]:mb-0"
          >
            {title}
          </h3>
          <p className="text-white/60 text-[14px] leading-[1.5] tracking-[-0.03em] max-w-[480px]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
