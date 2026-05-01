"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ServicesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: 0 },
        {
          yPercent: -12,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        [labelRef.current, headingRef.current, subtitleRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 1, ease: "power3.out", delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative min-h-dvh bg-[#111] flex flex-col overflow-hidden"
    >
      <img
        ref={imgRef}
        src="/hero2.jpg"
        alt=""
        className="absolute w-full object-cover object-[center_20%] opacity-30"
        style={{ height: "120%", top: "-10%", willChange: "transform" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent" />

      <div className="relative flex flex-col min-h-dvh px-4 min-[900px]:px-8">
        <div className="flex-1" />

        <div className="pb-10 min-[900px]:pb-14 flex flex-col gap-8">
          <p
            ref={labelRef}
            className="text-white/60 text-sm uppercase"
            style={{ fontFamily: "monospace", letterSpacing: "0.05em", opacity: 0 }}
          >
            [ Services ]
          </p>

          <h1
            ref={headingRef}
            className="text-white font-light uppercase leading-[0.9] text-[17vw] min-[900px]:text-[10vw]"
            style={{ letterSpacing: "-0.06em", opacity: 0 }}
          >
            What<br />we build.
          </h1>

          <div className="min-[900px]:flex min-[900px]:justify-end">
            <p
              ref={subtitleRef}
              className="text-white/70 text-[14px] leading-[1.4] tracking-[-0.04em] max-w-[360px]"
              style={{ opacity: 0 }}
            >
              Four disciplines. One studio. Every service designed to make your brand impossible to ignore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
