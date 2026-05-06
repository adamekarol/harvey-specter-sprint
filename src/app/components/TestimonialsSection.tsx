"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(Draggable);

const TESTIMONIALS = [
  {
    logo: "/marko-logo.png",
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    logoW: 143, logoH: 19,
    mobileRotate: "-2deg",
    desktopRotate: "-6.85deg",
    desktopZ: 15,
  },
  {
    logo: "/lukas-logo.png",
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    logoW: 138, logoH: 19,
    mobileRotate: "2deg",
    desktopRotate: "2.9deg",
    desktopZ: 0,
  },
  {
    logo: "/sarah-logo.png",
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    logoW: 109, logoH: 31,
    mobileRotate: "-1.5deg",
    desktopRotate: "2.23deg",
    desktopZ: 0,
  },
  {
    logo: "/sofia-logo.png",
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    logoW: 81, logoH: 36,
    mobileRotate: "1.5deg",
    desktopRotate: "-4.15deg",
    desktopZ: 0,
  },
];

function Card({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] flex flex-col gap-4 p-6" style={{ width: "353px", maxWidth: "440px" }}>
      <img src={t.logo} alt="" style={{ width: t.logoW, height: t.logoH, maxWidth: "100%" }} />
      <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.72px]">{t.quote}</p>
      <p className="font-black text-black text-[16px] uppercase tracking-[-0.64px] leading-[1.1]">{t.name}</p>
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const zCounter = useRef(30);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1100px)", () => {
      const instances: Draggable[] = [];

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isBottom = i >= 2;

        let instance: Draggable;
        [instance] = Draggable.create(card, {
          type: "x,y",
          cursor: "grab",
          activeCursor: "grabbing",
          onPress() {
            const rect = card.getBoundingClientRect();
            const sRect = sectionRef.current!.getBoundingClientRect();
            instance.applyBounds({
              minX: instance.x - rect.left,
              maxX: instance.x + (window.innerWidth - rect.right),
              minY: instance.y - (rect.top - sRect.top),
              maxY: instance.y + (sRect.bottom - rect.bottom),
            });

            const z = ++zCounter.current;
            gsap.set(card, { zIndex: z });
            if (isBottom && bottomRowRef.current) {
              gsap.set(bottomRowRef.current, { zIndex: z });
            }
            gsap.to(card, { scale: 1.03, duration: 0.18, ease: "power2.out" });
          },
          onRelease() {
            gsap.to(card, { scale: 1, duration: 0.35, ease: "power3.out" });
          },
        });

        instances.push(instance);
      });

      return () => instances.forEach((d) => d.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">

      {/* Mobile — Swiper carousel */}
      <div className="min-[900px]:hidden py-16">
        <h2
          className="font-medium text-black px-4 mb-8"
          style={{ fontSize: "17vw", letterSpacing: "-0.07em", lineHeight: 0.8 }}
        >
          Testimonials
        </h2>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={-2}
          slidesPerView="auto"
          centeredSlides
          className="testimonials-swiper !pb-10"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="!h-auto" style={{ width: "min(85vw, 500px)" }}>
              <div className="py-2" style={{ transform: `rotate(${t.mobileRotate})` }}>
                <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] flex flex-col gap-4 p-5">
                  <img src={t.logo} alt="" style={{ width: t.logoW, height: t.logoH, maxWidth: "100%" }} />
                  <p className="text-[#1f1f1f] text-[16px] leading-[1.3] tracking-[-0.64px]">{t.quote}</p>
                  <p className="font-black text-black text-[14px] uppercase tracking-[-0.56px] leading-[1.1]">{t.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop */}
      <div className="hidden min-[900px]:flex flex-col items-center py-[8.33vw]">
        <div className="flex flex-col" style={{ width: "fit-content" }}>

          <div className="w-full">
            <div className="flex justify-between items-end w-full max-w-full min-[1100px]:max-w-[60vw]">
              <div
                ref={(el) => { cardRefs.current[0] = el; }}
                className="relative shrink-0"
                style={{ transform: `rotate(${TESTIMONIALS[0].desktopRotate})`, zIndex: 15 }}
              >
                <Card t={TESTIMONIALS[0]} />
              </div>
              <div
                ref={(el) => { cardRefs.current[1] = el; }}
                className="relative shrink-0"
                style={{ transform: `rotate(${TESTIMONIALS[1].desktopRotate})`, zIndex: 0 }}
              >
                <Card t={TESTIMONIALS[1]} />
              </div>
            </div>
          </div>

          <h2
            className="whitespace-nowrap text-center font-medium text-black relative"
            style={{ fontSize: "13.75vw", letterSpacing: "-0.07em", lineHeight: 1.1, zIndex: 10, marginTop: "-1.5vw" }}
          >
            Testimonials
          </h2>

          {/*
            At 900–1099px: no zIndex on this container → no stacking context, so cards
            participate in the outer stacking order directly.
            Sarah gets z-[20] (above h2 z:10); Sofia has no z-index (z:auto → below h2).
            At 1100px+: z-[20] restores the stacking context so all cards sit above the h2.
          */}
          <div
            ref={bottomRowRef}
            className="relative flex justify-between items-start ml-auto w-full max-w-full min-[1100px]:max-w-[60vw] min-[1100px]:z-[20]"
            style={{ marginTop: "-2vw" }}
          >
            {/* Sarah — stays above h2 at all desktop widths */}
            <div
              ref={(el) => { cardRefs.current[2] = el; }}
              className="relative shrink-0 z-[20]"
              style={{ transform: `rotate(${TESTIMONIALS[2].desktopRotate})` }}
            >
              <Card t={TESTIMONIALS[2]} />
            </div>
            {/* Sofia — no z-index: paints below h2 (z:10) at 900–1099px */}
            <div
              ref={(el) => { cardRefs.current[3] = el; }}
              className="relative shrink-0"
              style={{ transform: `rotate(${TESTIMONIALS[3].desktopRotate})` }}
            >
              <Card t={TESTIMONIALS[3]} />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
