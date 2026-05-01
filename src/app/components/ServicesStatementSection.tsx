"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPAN_STYLE = { letterSpacing: "-0.08em", lineHeight: 0.84, color: "#c0c0c0" };

export function ServicesStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], {
        color: "#000000",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 55%",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[120px]">
      <div className="flex flex-col items-end gap-3 mb-10">
        <p
          className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] tracking-[0.03em]"
          style={{ fontFamily: "monospace" }}
        >
          [ Four services. One vision. ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f] opacity-25" />
      </div>

      <div className="flex flex-col gap-0 min-[900px]:gap-[6px]">
        <div className="text-center min-[900px]:text-left">
          <span
            ref={line1Ref}
            className="font-light uppercase whitespace-nowrap text-[8.5vw] min-[900px]:text-[6.67vw]"
            style={SPAN_STYLE}
          >
            Work built to
          </span>
        </div>
        <div className="text-center min-[900px]:text-left min-[900px]:pl-[18%]">
          <span
            ref={line2Ref}
            className="font-light uppercase whitespace-nowrap text-[8.5vw] min-[900px]:text-[6.67vw]"
            style={SPAN_STYLE}
          >
            move brands
          </span>
        </div>
        <div className="text-center min-[900px]:text-left min-[900px]:pl-[40%]">
          <span
            ref={line3Ref}
            className="font-light uppercase whitespace-nowrap text-[8.5vw] min-[900px]:text-[6.67vw]"
            style={SPAN_STYLE}
          >
            forward.
          </span>
        </div>
      </div>
    </section>
  );
}
