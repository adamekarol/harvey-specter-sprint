"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TESTIMONIALS = [
  {
    logo: "https://www.figma.com/api/mcp/asset/cd9fc73e-b761-430b-a053-0da1aa830a49",
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    logoW: 143, logoH: 19,
    mobileRotate: "-2deg",
    desktopRotate: "-6.85deg",
    desktopZ: 15,
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/2b4aac27-4629-413a-9f79-d22ca0f2d21b",
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    logoW: 138, logoH: 19,
    mobileRotate: "2deg",
    desktopRotate: "2.9deg",
    desktopZ: 0,
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/28dd5f44-aa4b-4544-81fc-13751743e40e",
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    logoW: 109, logoH: 31,
    mobileRotate: "-1.5deg",
    desktopRotate: "2.23deg",
    desktopZ: 0,
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/510bf496-b278-48bd-af59-5b7a559650d7",
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    logoW: 81, logoH: 36,
    mobileRotate: "1.5deg",
    desktopRotate: "-4.15deg",
    desktopZ: 0,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white overflow-hidden">

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
              <div className="relative shrink-0" style={{ transform: `rotate(${TESTIMONIALS[0].desktopRotate})`, zIndex: 15 }}>
                <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] flex flex-col gap-4 p-6" style={{ width: "353px", maxWidth: "440px" }}>
                  <img src={TESTIMONIALS[0].logo} alt="" style={{ width: TESTIMONIALS[0].logoW, height: TESTIMONIALS[0].logoH, maxWidth: "100%" }} />
                  <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.72px]">{TESTIMONIALS[0].quote}</p>
                  <p className="font-black text-black text-[16px] uppercase tracking-[-0.64px] leading-[1.1]">{TESTIMONIALS[0].name}</p>
                </div>
              </div>
              <div className="relative shrink-0" style={{ transform: `rotate(${TESTIMONIALS[1].desktopRotate})`, zIndex: 0 }}>
                <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] flex flex-col gap-4 p-6" style={{ width: "353px", maxWidth: "440px" }}>
                  <img src={TESTIMONIALS[1].logo} alt="" style={{ width: TESTIMONIALS[1].logoW, height: TESTIMONIALS[1].logoH, maxWidth: "100%" }} />
                  <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.72px]">{TESTIMONIALS[1].quote}</p>
                  <p className="font-black text-black text-[16px] uppercase tracking-[-0.64px] leading-[1.1]">{TESTIMONIALS[1].name}</p>
                </div>
              </div>
            </div>
          </div>

          <h2
            className="whitespace-nowrap text-center font-medium text-black relative"
            style={{ fontSize: "13.75vw", letterSpacing: "-0.07em", lineHeight: 1.1, zIndex: 10, marginTop: "-1.5vw" }}
          >
            Testimonials
          </h2>

          <div className="relative flex justify-between items-start ml-auto w-full max-w-full min-[1100px]:max-w-[60vw]" style={{ zIndex: 20, marginTop: "-2vw" }}>
            <div className="relative shrink-0" style={{ transform: `rotate(${TESTIMONIALS[2].desktopRotate})` }}>
              <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] flex flex-col gap-4 p-6" style={{ width: "353px", maxWidth: "440px" }}>
                <img src={TESTIMONIALS[2].logo} alt="" style={{ width: TESTIMONIALS[2].logoW, height: TESTIMONIALS[2].logoH, maxWidth: "100%" }} />
                <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.72px]">{TESTIMONIALS[2].quote}</p>
                <p className="font-black text-black text-[16px] uppercase tracking-[-0.64px] leading-[1.1]">{TESTIMONIALS[2].name}</p>
              </div>
            </div>
            <div className="relative shrink-0" style={{ transform: `rotate(${TESTIMONIALS[3].desktopRotate})` }}>
              <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] flex flex-col gap-4 p-6" style={{ width: "353px", maxWidth: "440px" }}>
                <img src={TESTIMONIALS[3].logo} alt="" style={{ width: TESTIMONIALS[3].logoW, height: TESTIMONIALS[3].logoH, maxWidth: "100%" }} />
                <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.72px]">{TESTIMONIALS[3].quote}</p>
                <p className="font-black text-black text-[16px] uppercase tracking-[-0.64px] leading-[1.1]">{TESTIMONIALS[3].name}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
