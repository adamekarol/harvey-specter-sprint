"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "8+",   label: "Years in the industry" },
  { value: "120+", label: "Projects delivered" },
  { value: "3×",   label: "Award-winning campaigns" },
  { value: "40+",  label: "Global brand clients" },
];

export function AboutStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[120px]">
      <p
        ref={labelRef}
        className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] mb-12"
        style={{ fontFamily: "monospace", opacity: 0 }}
      >
        [ By the numbers ]
      </p>

      <div className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-y-10 gap-x-6">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="flex flex-col gap-2"
            style={{ opacity: 0 }}
          >
            <span
              className="font-light text-black leading-none"
              style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.06em" }}
            >
              {s.value}
            </span>
            <p
              className="text-[#1f1f1f]/60 text-[13px] uppercase leading-[1.2] tracking-[0.02em]"
              style={{ fontFamily: "monospace" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
