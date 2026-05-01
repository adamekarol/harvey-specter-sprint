"use client";

import { useRef } from "react";
import gsap from "gsap";
import { urlFor } from "@/sanity/lib/image";
import { type Service } from "@/sanity/lib/queries";

export function ServiceItem({ item }: { item: Service }) {
  const titleRef = useRef<HTMLParagraphElement>(null);
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

  const imgSrc = item.image?.asset ? urlFor(item.image).url() : "";
  const imgPos = item.imagePosition ?? "object-center";
  const num = `[ ${item.order} ]`;

  return (
    <div
      className="flex flex-col gap-[9px] cursor-default"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col gap-[9px]">
        <p className="text-white text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>{num}</p>
        <div className="relative w-full h-px bg-white/20">
          <span
            ref={lineRef}
            className="absolute inset-0 bg-white"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between min-[900px]:gap-x-6 pt-[9px]">
        <p
          ref={titleRef}
          className="font-bold italic text-white uppercase leading-[1.1] tracking-[-0.04em] text-[28px] min-[900px]:text-[36px] min-[900px]:min-w-[320px]"
        >
          {item.title}
        </p>
        <div className="flex flex-row flex-wrap justify-between gap-6 items-start">
          <p className="text-white text-[14px] leading-[1.3] tracking-[-0.04em] min-[900px]:flex-1 max-w-[400px]">
            {item.description}
          </p>
          <div className="w-[151px] h-[151px] shrink-0 overflow-hidden min-[900px]:ml-auto">
            {imgSrc && (
              <img
                src={imgSrc}
                alt={item.title}
                className={`w-full h-full object-cover ${imgPos}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
