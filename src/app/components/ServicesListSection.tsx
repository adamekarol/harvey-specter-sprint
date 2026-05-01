"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  num: string;
  title: string;
  img: string;
  objectPosition: string;
  description: string;
  deliverables: string[];
};

function ServiceDetailItem({ service }: { service: Service }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const overlayMobileRef = useRef<HTMLDivElement>(null);
  const overlayDesktopRef = useRef<HTMLDivElement>(null);
  const imgMobileRef = useRef<HTMLImageElement>(null);
  const imgDesktopRef = useRef<HTMLImageElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const overlays = [overlayMobileRef.current, overlayDesktopRef.current].filter(Boolean);
      gsap.to(overlays, {
        scaleX: 0,
        transformOrigin: "right",
        ease: "none",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 68%",
          end: "top 5%",
          scrub: 1,
        },
      });

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: itemRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: itemRef.current, start: "top 68%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={itemRef} className="flex flex-col gap-4 min-[900px]:gap-6">
      {/* Label + divider */}
      <div className="flex flex-col gap-[9px]">
        <p
          className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]"
          style={{ fontFamily: "monospace" }}
        >
          {service.num}
        </p>
        <div className="w-full h-px bg-[#1f1f1f]/20" />
      </div>

      {/* Title */}
      <h2
        ref={titleRef}
        className="font-bold italic text-[#1f1f1f] uppercase leading-[0.95] tracking-[-0.04em] text-[11vw] min-[900px]:text-[5.5vw]"
        style={{ opacity: 0 }}
      >
        {service.title}
      </h2>

      {/* Mobile image (between title and body) */}
      <div
        className="min-[900px]:hidden relative overflow-hidden w-full"
        style={{ aspectRatio: "4/3" }}
        onMouseEnter={() => gsap.to(imgMobileRef.current, { scale: 1.04, duration: 0.6, ease: "power2.out" })}
        onMouseLeave={() => gsap.to(imgMobileRef.current, { scale: 1, duration: 0.55, ease: "power2.inOut" })}
      >
        <img
          ref={imgMobileRef}
          src={service.img}
          alt={service.title}
          className={`w-full h-full object-cover ${service.objectPosition}`}
        />
        <div ref={overlayMobileRef} className="absolute inset-0 bg-black" />
      </div>

      {/* Body: description + tags (mobile), plus desktop image */}
      <div className="flex flex-col gap-5 min-[900px]:flex-row min-[900px]:gap-12 min-[900px]:items-start">
        <div ref={bodyRef} className="flex flex-col gap-5 min-[900px]:flex-1" style={{ opacity: 0 }}>
          <p className="text-[14px] leading-[1.4] tracking-[-0.04em] text-[#1f1f1f] max-w-[480px]">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.deliverables.map((d) => (
              <span
                key={d}
                className="border border-[#1f1f1f]/30 text-[#1f1f1f] text-[12px] uppercase tracking-[0.02em] px-3 py-1.5 rounded-full"
                style={{ fontFamily: "monospace" }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop image */}
        <div
          className="hidden min-[900px]:block relative overflow-hidden shrink-0 w-[42%]"
          style={{ aspectRatio: "4/3" }}
          onMouseEnter={() => gsap.to(imgDesktopRef.current, { scale: 1.04, duration: 0.6, ease: "power2.out" })}
          onMouseLeave={() => gsap.to(imgDesktopRef.current, { scale: 1, duration: 0.55, ease: "power2.inOut" })}
        >
          <img
            ref={imgDesktopRef}
            src={service.img}
            alt={service.title}
            className={`w-full h-full object-cover ${service.objectPosition}`}
          />
          <div ref={overlayDesktopRef} className="absolute inset-0 bg-black" />
        </div>
      </div>
    </div>
  );
}

export function ServicesListSection({ services }: { services: Service[] }) {
  return (
    <section className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[80px]">

      {/* Section header */}
      <div className="flex items-start justify-between mb-12 min-[900px]:mb-16">
        <div className="flex gap-[10px] items-start">
          <h2
            className="font-light text-black uppercase leading-[0.86]"
            style={{ fontSize: "clamp(40px, 8.5vw, 96px)", letterSpacing: "-0.08em" }}
          >
            Our<br />Services
          </h2>
          <p className="text-[#1f1f1f] text-[13px] leading-[1.1] mt-2" style={{ fontFamily: "monospace" }}>
            003
          </p>
        </div>
        <div className="hidden min-[900px]:flex items-center justify-center shrink-0" style={{ width: 15, height: 110 }}>
          <p
            className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] whitespace-nowrap -rotate-90"
            style={{ fontFamily: "monospace" }}
          >
            [ deliverables ]
          </p>
        </div>
      </div>

      {/* Service items */}
      <div className="flex flex-col gap-16 min-[900px]:gap-24">
        {services.map((s) => (
          <ServiceDetailItem key={s.num} service={s} />
        ))}
      </div>
    </section>
  );
}
