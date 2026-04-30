"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE_STYLE = { letterSpacing: "-0.08em", lineHeight: 0.84, color: "#c0c0c0" };

export function TaglineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const line5mRef = useRef<HTMLSpanElement>(null); // mobile "of chicago."
  const line5dRef = useRef<HTMLSpanElement>(null); // desktop "of chicago."

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [line1Ref, line2Ref, line3Ref, line4Ref, line5mRef, line5dRef]
        .map((r) => r.current)
        .filter(Boolean);

      gsap.to(lines, {
        color: "#000000",
        stagger: 0.12,
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
      <div className="flex flex-col items-end gap-3 mb-6 min-[900px]:mb-6">
        <p
          className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] tracking-[0.03em]"
          style={{ fontFamily: "monospace" }}
        >
          [ 8+ years in industry ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f] opacity-25" />
      </div>

      <div className="flex flex-col gap-2 min-[900px]:gap-[8px]">
        <p
          className="min-[900px]:hidden text-center text-[#1f1f1f] text-[13px] leading-[1.1] tracking-[0.03em]"
          style={{ fontFamily: "monospace" }}
        >
          001
        </p>

        <div className="flex items-start gap-3 justify-center min-[900px]:justify-start">
          <span
            ref={line1Ref}
            className="font-light uppercase whitespace-nowrap text-[8.5vw] min-[900px]:text-[6.67vw]"
            style={LINE_STYLE}
          >
            A creative director&nbsp;&nbsp;&nbsp;/
          </span>
          <span
            className="hidden min-[900px]:block text-[#1f1f1f] text-[13px] leading-[1.1] shrink-0 mt-2"
            style={{ fontFamily: "monospace" }}
          >
            001
          </span>
        </div>

        <div className="text-center min-[900px]:text-left min-[900px]:pl-[15.55%]">
          <span
            ref={line2Ref}
            className="font-light uppercase whitespace-nowrap text-[8.5vw] min-[900px]:text-[6.67vw]"
            style={LINE_STYLE}
          >
            Photographer
          </span>
        </div>

        <div className="text-center min-[900px]:text-left min-[900px]:pl-[44.33%]">
          <span
            ref={line3Ref}
            className="font-light uppercase whitespace-nowrap text-[8.5vw] min-[900px]:text-[6.67vw]"
            style={LINE_STYLE}
          >
            Born{" "}
            <span
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                textTransform: "none",
                letterSpacing: 0,
              }}
            >
              &amp;
            </span>
            {" "}raised
          </span>
        </div>

        <div className="text-center min-[900px]:text-left">
          <span
            ref={line4Ref}
            className="font-light uppercase whitespace-nowrap text-[8.5vw] min-[900px]:text-[6.67vw]"
            style={LINE_STYLE}
          >
            on the south side
          </span>
        </div>

        <div className="text-center min-[900px]:hidden">
          <span
            ref={line5mRef}
            className="font-light uppercase whitespace-nowrap text-[8.5vw]"
            style={LINE_STYLE}
          >
            of chicago.
          </span>
        </div>

        <div className="hidden min-[900px]:block">
          <div style={{ paddingLeft: "44%" }}>
            <span
              ref={line5dRef}
              className="font-light uppercase whitespace-nowrap text-[6.67vw]"
              style={LINE_STYLE}
            >
              of chicago.
            </span>
          </div>
          <p
            className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] whitespace-nowrap mt-3 text-right"
            style={{ fontFamily: "monospace" }}
          >
            [ CREATIVE FREELANCER ]
          </p>
        </div>

        <p
          className="min-[900px]:hidden text-center text-[#1f1f1f] text-[13px] leading-[1.1] tracking-[0.03em] mt-1"
          style={{ fontFamily: "monospace" }}
        >
          [ CREATIVE FREELANCER ]
        </p>
      </div>
    </section>
  );
}
