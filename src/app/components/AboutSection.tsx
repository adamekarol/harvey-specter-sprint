"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection({ src }: { src: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayMobileRef = useRef<HTMLDivElement>(null);
  const overlayDesktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop-only: text block drifts left
      mm.add("(min-width: 900px)", () => {
        gsap.to(textRef.current, {
          x: -48,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 35%",
            scrub: 2,
          },
        });
      });

      // Black overlay wipes left → right to reveal image (both viewports)
      const overlays = [overlayMobileRef.current, overlayDesktopRef.current].filter(Boolean);
      gsap.to(overlays, {
        scaleX: 0,
        transformOrigin: "right",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 10%",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[80px]">

      {/* Mobile */}
      <div className="min-[900px]:hidden flex flex-col gap-5">
        <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>002</p>
        <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>[ About ]</p>

        <div className="flex items-stretch gap-4">
          <div className="flex flex-col justify-between shrink-0">
            <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
            <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
          </div>
          <p className="flex-1 text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] py-3">
            Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
          </p>
          <div className="flex flex-col justify-between items-end shrink-0">
            <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
            <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
          </div>
        </div>

        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "436/614" }}>
          <img src={src} alt="" className="w-full h-full object-cover" />
          <div ref={overlayMobileRef} className="absolute inset-0 bg-black" />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden min-[900px]:flex justify-between items-start">
        <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] whitespace-nowrap shrink-0" style={{ fontFamily: "monospace" }}>[ About ]</p>

        <div className="w-[71%] flex gap-8 items-end">
          <div ref={textRef} className="flex flex-1 items-stretch gap-4">
            <div className="flex flex-col justify-between shrink-0">
              <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
            </div>
            <p className="flex-1 text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] py-3">
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>
            <div className="flex flex-col justify-between items-end shrink-0">
              <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
            </div>
          </div>

          <div className="flex gap-6 items-start shrink-0">
            <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>002</p>
            <div className="relative w-[30vw] overflow-hidden" style={{ aspectRatio: "436/614" }}>
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div ref={overlayDesktopRef} className="absolute inset-0 bg-black" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
