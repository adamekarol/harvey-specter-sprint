"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FullBleedSection({ src }: { src: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blur clears once section center reaches viewport center (~50% scrolled in)
      gsap.to(imgRef.current, {
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Parallax: image travels slower than scroll
      gsap.fromTo(
        imgRef.current,
        { yPercent: 5 },
        {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative w-full overflow-hidden aspect-[3/4] min-[900px]:aspect-auto min-[900px]:h-[900px]"
    >
      <img
        ref={imgRef}
        src={src}
        alt=""
        className="absolute w-full object-cover object-[65%_center] min-[900px]:object-center"
        style={{ height: "130%", top: "-15%", filter: "blur(20px)" }}
      />
    </section>
  );
}
