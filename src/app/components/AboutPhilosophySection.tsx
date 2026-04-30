"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrincipleItem } from "./PrincipleItem";

gsap.registerPlugin(ScrollTrigger);

type Principle = { num: string; title: string; body: string };

export function AboutPhilosophySection({ principles }: { principles: Principle[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fades up
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Items stagger in — target direct children so last:border-b still works
      const items = containerRef.current ? [...containerRef.current.children] : [];
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="bg-black px-4 min-[900px]:px-8 py-12 min-[900px]:py-[120px]"
    >
      <div
        ref={headerRef}
        className="flex items-end justify-between mb-12 min-[900px]:mb-16"
        style={{ opacity: 0 }}
      >
        <p className="text-white text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>
          [ How I work ]
        </p>
        <span
          className="font-light text-white uppercase leading-none hidden min-[900px]:block"
          style={{ fontSize: "6vw", letterSpacing: "-0.08em" }}
        >
          Philosophy
        </span>
      </div>

      <div ref={containerRef} className="flex flex-col gap-0">
        {principles.map((p) => (
          <PrincipleItem key={p.num} num={p.num} title={p.title} body={p.body} />
        ))}
      </div>
    </section>
  );
}
