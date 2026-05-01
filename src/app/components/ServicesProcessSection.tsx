"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrincipleItem } from "./PrincipleItem";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "[ 01 ]",
    title: "Discover",
    body: "We immerse ourselves in your world — your business, your audience, your competitors. No brief is too detailed; no conversation is too long. Understanding comes first.",
  },
  {
    num: "[ 02 ]",
    title: "Define",
    body: "From research we draw strategy. We establish your brand pillars, visual language, technical requirements, and a clear roadmap for everything that follows.",
  },
  {
    num: "[ 03 ]",
    title: "Design",
    body: "With direction locked in, we create. Every pixel, every word, every interaction is deliberate. We refine until the work speaks for itself.",
  },
  {
    num: "[ 04 ]",
    title: "Deliver",
    body: "Launch is the beginning, not the end. We stay through the rollout, monitor performance, and make sure what we built does exactly what it was meant to do.",
  },
];

export function ServicesProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

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
        <p
          className="text-white text-[13px] uppercase leading-[1.1]"
          style={{ fontFamily: "monospace" }}
        >
          [ How we work ]
        </p>
        <span
          className="font-light text-white uppercase leading-none hidden min-[900px]:block"
          style={{ fontSize: "6vw", letterSpacing: "-0.08em" }}
        >
          Process
        </span>
      </div>

      <div ref={containerRef} className="flex flex-col gap-0">
        {STEPS.map((s) => (
          <PrincipleItem key={s.num} num={s.num} title={s.title} body={s.body} />
        ))}
      </div>
    </section>
  );
}
