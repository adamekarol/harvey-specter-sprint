"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const NEWS_ITEMS = [
  { img: "/news-1.png", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { img: "/news-2.png", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { img: "/news-3.png", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

const ReadMoreLink = () => (
  <a href="#" className="self-start flex items-center gap-2 border-b border-black pb-1">
    <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
    <svg width="13" height="13" viewBox="0 0 32 32" fill="none">
      <path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </a>
);

function DesktopNewsItem({ item, offsetTop }: { item: typeof NEWS_ITEMS[number]; offsetTop?: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.05, duration: 0.65, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 0.1, duration: 0.3, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.55, ease: "power2.inOut" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
  };

  const onArrowEnter = () => {
    gsap.to(arrowRef.current, { x: 2, y: -2, duration: 0.25, ease: "power2.out" });
  };

  const onArrowLeave = () => {
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.25, ease: "power2.out" });
  };

  return (
    <div
      className="flex flex-col gap-4 cursor-default"
      style={{ paddingTop: offsetTop ? "120px" : "0" }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "353/469" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <img ref={imgRef} src={item.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div ref={overlayRef} className="absolute inset-0 bg-black" style={{ opacity: 0 }} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px] flex-1">{item.text}</p>
      </div>
      <a href="#" className="self-start flex items-center gap-2 border-b border-black pb-1" onMouseEnter={onArrowEnter} onMouseLeave={onArrowLeave}>
        <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
        <svg ref={arrowRef} width="13" height="13" viewBox="0 0 32 32" fill="none">
          <path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export function NewsSection() {
  return (
    <section className="bg-[#f3f3f3]">

      {/* Mobile */}
      <div className="min-[900px]:hidden pt-16 pb-10 flex flex-col gap-8">

        {/* Heading */}
        <h2
          className="font-light text-black uppercase px-4"
          style={{ fontSize: "8.5vw", letterSpacing: "-0.08em", lineHeight: 0.86 }}
        >
          Keep up with my latest news &amp; achievements
        </h2>

        {/* Swiper — starts flush left, peeks next slide */}
        <div className="overflow-x-clip">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
        >
          {NEWS_ITEMS.map((n) => (
            <SwiperSlide key={n.img} style={{ width: "80%", maxWidth: "350px" }}>
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img src={n.img} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px]">{n.text}</p>
                <ReadMoreLink />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>

        <p className="px-4 text-[13px] text-[#1f1f1f] uppercase tracking-[-0.04em]" style={{ fontFamily: "monospace" }}>{'[ <SCROLL> ]'}</p>

      </div>

      {/* Desktop — heading anchored left, cards swipe right past viewport edge */}
      <div className="hidden min-[900px]:flex items-end py-[120px]">

        {/* Left: heading column — 30% of viewport creates spacing before cards */}
        <div className="shrink-0 pl-8 self-stretch flex items-center" style={{ width: "30%" }}>
          <div className="self-stretch flex items-center justify-center" style={{ width: "110px" }}>
            <div style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap" }}>
              <h2
                className="font-light text-black uppercase"
                style={{ fontSize: "4.44vw", letterSpacing: "-0.08em", lineHeight: 0.86 }}
              >
                Keep up with my latest<br />news &amp; achievements
              </h2>
            </div>
          </div>
        </div>

        {/* Right: Swiper extends to right viewport edge, no right padding */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <p className="pl-0 text-[13px] text-[#1f1f1f] uppercase tracking-[-0.04em]" style={{ fontFamily: "monospace" }}>{'[ <SCROLL> ]'}</p>
          <div className="overflow-x-clip">
          <Swiper
            slidesPerView="auto"
            spaceBetween={31}
            slidesOffsetAfter={32}
          >
            {NEWS_ITEMS.map((n, i) => (
              <SwiperSlide key={n.img} style={{ width: "calc(70vw / 2.3)" }}>
                <DesktopNewsItem item={n} offsetTop={i === 1} />
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>

      </div>

    </section>
  );
}
