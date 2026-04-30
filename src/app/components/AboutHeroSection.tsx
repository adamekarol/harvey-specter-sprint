"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutHeroSection({ src }: { src: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax — image travels slower than scroll
      gsap.fromTo(
        imgRef.current,
        { yPercent: 0 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Entrance stagger (label → heading → subtitle)
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
        src={src}
        alt=""
        className="absolute w-full object-cover object-[65%_center] opacity-40"
        style={{ height: "120%", top: "-10%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />

      <div className="relative flex flex-col min-h-dvh px-4 min-[900px]:px-8">
        <div className="flex-1" />

        <div className="pb-10 min-[900px]:pb-14 flex flex-col gap-8">
          <p
            ref={labelRef}
            className="text-white/60 text-sm uppercase"
            style={{ fontFamily: "monospace", letterSpacing: "0.05em", opacity: 0 }}
          >
            [ About Me ]
          </p>

          <div>
            <h1
              ref={headingRef}
              className="text-white font-light uppercase leading-[0.9] text-[17vw] min-[900px]:text-[10vw]"
              style={{ letterSpacing: "-0.06em", opacity: 0 }}
            >
              The story<br />behind<br />the studio.
            </h1>
          </div>

          <div className="min-[900px]:flex min-[900px]:justify-end">
            <p
              ref={subtitleRef}
              className="text-white/70 text-[14px] leading-[1.4] tracking-[-0.04em] max-w-[360px]"
              style={{ opacity: 0 }}
            >
              Creative Director &amp; Photographer based in Chicago. Crafting visual narratives for brands that want to be remembered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
