"use client";

import { forwardRef, useRef } from "react";
import gsap from "gsap";

export const LetsTalkBtn = forwardRef<HTMLAnchorElement, { className?: string }>(
function LetsTalkBtn({ className = "" }, ref) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  return (
    <a
      ref={ref}
      href="#"
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => {
        gsap.killTweensOf([fillRef.current, textRef.current]);
        gsap.set(fillRef.current, { transformOrigin: "left 50%" });
        gsap.to(fillRef.current, { scaleX: 1, duration: 0.35, ease: "power2.inOut" });
        gsap.to(textRef.current, { color: "#000", duration: 0.15, delay: 0.15 });
      }}
      onMouseLeave={() => {
        gsap.killTweensOf([fillRef.current, textRef.current]);
        gsap.set(fillRef.current, { transformOrigin: "right 50%" });
        gsap.to(fillRef.current, { scaleX: 0, duration: 0.3, ease: "power2.inOut" });
        gsap.to(textRef.current, {
          color: "#fff",
          duration: 0.1,
          onComplete: () => gsap.set(textRef.current, { clearProps: "color" }),
        });
      }}
    >
      <span
        ref={fillRef}
        className="absolute inset-0 bg-white rounded-full"
        style={{ transform: "scaleX(0)", transformOrigin: "left 50%" }}
      />
      <span ref={textRef} className="relative z-10">Let&apos;s talk</span>
    </a>
  );
});
