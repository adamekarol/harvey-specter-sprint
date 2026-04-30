"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LetsTalkBtn } from "./LetsTalkBtn";
import { urlFor } from "@/sanity/lib/image";
import { type PortfolioItem } from "@/sanity/lib/queries";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_HEIGHTS = ["h-[744px]", "h-[699px]", "h-[699px]", "h-[744px]"];

function resolveImage(item: PortfolioItem): string {
  return item.image?.asset ? urlFor(item.image).url() : "";
}

function PortfolioCard({
  item,
  heightClass = "h-[390px]",
  titleClass = "text-[24px]",
}: {
  item: PortfolioItem;
  heightClass?: string;
  titleClass?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.05, duration: 0.65, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 0.12, duration: 0.3, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 3, y: -3, rotation: 45, duration: 0.3, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.55, ease: "power2.inOut" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 0, y: 0, rotation: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div
      data-portfolio-item
      className="flex flex-col gap-[10px]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`relative ${heightClass} overflow-hidden`}>
        <img
          ref={imgRef}
          src={resolveImage(item)}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0 }}
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {(item.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.04em] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className={`font-black text-black uppercase leading-[1.1] tracking-[-0.04em] ${titleClass}`}>
          {item.title}
        </p>
        <svg ref={arrowRef} width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function SelectedWorksSection({ portfolioItems }: { portfolioItems: PortfolioItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 899px)", () => {
      const items = mobileListRef.current
        ? [...mobileListRef.current.querySelectorAll("[data-portfolio-item]")]
        : [];
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 48 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%" },
          }
        );
      });
    });

    mm.add("(min-width: 900px)", () => {
      const items = desktopGridRef.current
        ? [...desktopGridRef.current.querySelectorAll("[data-portfolio-item]")]
        : [];
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 48 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[80px]">

      {/* Mobile header */}
      <div className="min-[900px]:hidden flex flex-col gap-4 mb-8">
        <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>[ portfolio ]</p>
        <div className="flex items-start justify-between">
          <h2 className="font-light text-black uppercase leading-[0.86]" style={{ fontSize: "8.5vw", letterSpacing: "-0.08em" }}>
            Selected<br />Work
          </h2>
          <p className="text-[#1f1f1f] text-[13px] leading-[1.1]" style={{ fontFamily: "monospace" }}>004</p>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden min-[900px]:flex items-start justify-between mb-[61px]">
        <div className="flex gap-[10px] items-start">
          <h2 className="font-light text-black uppercase leading-[0.86]" style={{ fontSize: "96px", letterSpacing: "-0.08em" }}>
            Selected<br />Work
          </h2>
          <p className="text-[#1f1f1f] text-[13px] leading-[1.1] mt-2" style={{ fontFamily: "monospace" }}>004</p>
        </div>
        <div className="flex items-center justify-center shrink-0" style={{ width: 15, height: 110 }}>
          <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] whitespace-nowrap -rotate-90" style={{ fontFamily: "monospace" }}>[ portfolio ]</p>
        </div>
      </div>

      {/* Mobile: single column */}
      <div ref={mobileListRef} className="min-[900px]:hidden flex flex-col gap-6">
        {portfolioItems.map((p) => (
          <PortfolioCard key={p._id} item={p} heightClass="h-[390px]" titleClass="text-[24px]" />
        ))}
        <div className="flex items-stretch gap-4">
          <div className="flex flex-col justify-between shrink-0">
            <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
            <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
          </div>
          <div className="flex-1 flex flex-col gap-[10px] py-3">
            <p className="text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] italic">
              Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
            </p>
            <LetsTalkBtn className="self-start bg-black text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em] border border-black" />
          </div>
          <div className="flex flex-col justify-between items-end shrink-0">
            <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
            <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
          </div>
        </div>
      </div>

      {/* Desktop: 2-col staggered grid */}
      <div ref={desktopGridRef} className="hidden min-[900px]:flex gap-6 items-stretch">

        {/* Left column */}
        <div className="flex-1 flex flex-col gap-6">
          {portfolioItems.slice(0, 2).map((p, i) => (
            <PortfolioCard key={p._id} item={p} heightClass={DESKTOP_HEIGHTS[i]} titleClass="text-[36px] whitespace-nowrap" />
          ))}
          <div className="mt-auto w-full max-w-[465px] flex items-stretch gap-4">
            <div className="flex flex-col justify-between shrink-0">
              <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
            </div>
            <div className="flex-1 flex flex-col gap-[10px] py-3">
              <p className="text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] italic">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <LetsTalkBtn className="self-start bg-black text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em] border border-black" />
            </div>
            <div className="flex flex-col justify-between items-end shrink-0">
              <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
            </div>
          </div>
        </div>

        {/* Right column — offset down */}
        <div className="flex-1 flex flex-col gap-6 pt-[240px]">
          {portfolioItems.slice(2, 4).map((p, i) => (
            <PortfolioCard key={p._id} item={p} heightClass={DESKTOP_HEIGHTS[i + 2]} titleClass="text-[36px] whitespace-nowrap" />
          ))}
        </div>

      </div>
    </section>
  );
}
