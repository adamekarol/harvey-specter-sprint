"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LetsTalkBtn } from "./LetsTalkBtn";

gsap.registerPlugin(ScrollTrigger);

export function AboutCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, actionsRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f3f3f3] px-4 min-[900px]:px-8 py-12 min-[900px]:py-[120px]">
      <div className="flex flex-col gap-3 mb-8">
        <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>
          [ Let&apos;s collaborate ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f] opacity-25" />
      </div>

      <div className="min-[900px]:flex min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-12">
        <h2
          ref={headingRef}
          className="font-light text-black uppercase leading-[0.88] mb-6 min-[900px]:mb-0"
          style={{ fontSize: "clamp(40px, 7vw, 96px)", letterSpacing: "-0.07em", opacity: 0 }}
        >
          Ready to build<br />something<br />extraordinary?
        </h2>

        <div ref={actionsRef} className="flex flex-col gap-4 shrink-0" style={{ opacity: 0 }}>
          <LetsTalkBtn className="self-start bg-black text-white text-sm font-medium px-6 py-4 rounded-full tracking-[-0.035em] border border-black" />
          <p className="text-[#1f1f1f]/50 text-[13px] uppercase tracking-[0.02em]" style={{ fontFamily: "monospace" }}>
            Based in Chicago, IL
          </p>
        </div>
      </div>
    </section>
  );
}
