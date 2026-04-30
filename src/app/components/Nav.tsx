"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LetsTalkBtn } from "./LetsTalkBtn";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isFirstRender = useRef(true);
  const isDarkRef = useRef(false); // homepage hero is light; dark sections override via ScrollTrigger
  const menuOpenRef = useRef(false);

  const navBgRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileLinkRefs = useRef<(HTMLElement | null)[]>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const desktopLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const desktopUnderlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const line1Ref = useRef<SVGRectElement>(null);
  const line2Ref = useRef<SVGRectElement>(null);
  const line3Ref = useRef<SVGRectElement>(null);

  const applyTheme = (dark: boolean, animate = true) => {
    isDarkRef.current = dark;
    if (menuOpenRef.current) return;

    const fg = dark ? "#ffffff" : "#000000";
    const dur = animate ? 0.3 : 0;
    const ease = "power2.out";

    const linkTargets = [logoRef.current, ...desktopLinkRefs.current].filter(Boolean);
    if (linkTargets.length) gsap.to(linkTargets, { color: fg, duration: dur, ease, overwrite: "auto" });

    const lineTargets = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
    if (lineTargets.length) gsap.to(lineTargets, { fill: fg, duration: dur, ease, overwrite: "auto" });

    if (btnRef.current) {
      gsap.to(btnRef.current, {
        backgroundColor: dark ? "rgba(0,0,0,0)" : "#000000",
        borderColor: fg,
        duration: dur,
        ease,
        overwrite: "auto",
      });
    }
  };

  // Scroll-triggered nav blur bg
  useEffect(() => {
    ScrollTrigger.create({
      start: "top -10",
      onEnter: () => gsap.to(navBgRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(navBgRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" }),
    });
  }, []);

  // Dark-section theme detection via scroll listener
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']"));
    if (!sections.length) return;

    const NAV_HEIGHT = 80;

    const getIsDark = () => {
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top < NAV_HEIGHT && r.bottom > 0) return true;
      }
      return false;
    };

    // Set initial theme without animation
    applyTheme(getIsDark(), false);

    const onScroll = () => {
      const dark = getIsDark();
      if (dark !== isDarkRef.current) applyTheme(dark);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu open/close animation
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const menu = menuRef.current;
    const links = mobileLinkRefs.current.filter(Boolean);
    if (!menu) return;

    if (menuOpen) {
      menuOpenRef.current = true;

      gsap.to(navBgRef.current, { opacity: 0, duration: 0.15 });

      gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], { fill: "#fff", duration: 0.15 });
      gsap.to(line1Ref.current, { y: 7, rotation: 45, transformOrigin: "center", duration: 0.3, ease: "power2.inOut" });
      gsap.to(line2Ref.current, { opacity: 0, duration: 0.15 });
      gsap.to(line3Ref.current, { y: -7, rotation: -45, transformOrigin: "center", duration: 0.3, ease: "power2.inOut" });

      gsap.to(logoRef.current, { color: "#fff", duration: 0.2 });

      gsap.set(menu, { display: "flex", opacity: 1, clipPath: "inset(0 0 100% 0)" });
      gsap.to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" });

      gsap.fromTo(links,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.2 }
      );
    } else {
      menuOpenRef.current = false;
      const themeColor = isDarkRef.current ? "#fff" : "#000";

      gsap.to(line1Ref.current, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(line2Ref.current, { opacity: 1, duration: 0.2, delay: 0.1 });
      gsap.to(line3Ref.current, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], { fill: themeColor, duration: 0.2, delay: 0.15 });

      gsap.to(logoRef.current, { color: themeColor, duration: 0.2 });

      if (window.scrollY > 10) {
        gsap.to(navBgRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });
      }

      gsap.to(links, {
        opacity: 0, y: -30,
        stagger: { each: 0.04, from: "end" },
        duration: 0.2, ease: "power2.in",
      });

      gsap.to(menu, {
        clipPath: "inset(100% 0 0% 0)",
        duration: 0.45, ease: "power4.inOut", delay: 0.15,
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 px-4 min-[900px]:px-8">
        <div
          ref={navBgRef}
          className="absolute inset-0 bg-white/10 backdrop-blur-2xl"
          style={{ opacity: 0 }}
        />
        <div className="relative flex items-center justify-between py-6">
          <Link
            ref={logoRef}
            href="/"
            className="text-base font-semibold tracking-[-0.04em] capitalize"
            style={{ color: "#000000" }}
          >
            H.Studio
          </Link>

          <div className="hidden min-[900px]:flex gap-14 text-base font-semibold tracking-[-0.04em] capitalize">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                ref={(el) => { desktopLinkRefs.current[i] = el; }}
                href="#"
                className="relative pb-px"
                style={{ color: "#000000" }}
                onMouseEnter={() => {
                  gsap.killTweensOf(desktopUnderlineRefs.current[i]);
                  gsap.set(desktopUnderlineRefs.current[i], { transformOrigin: "left 50%" });
                  gsap.to(desktopUnderlineRefs.current[i], { scaleX: 1, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={() => {
                  gsap.killTweensOf(desktopUnderlineRefs.current[i]);
                  gsap.set(desktopUnderlineRefs.current[i], { transformOrigin: "right 50%" });
                  gsap.to(desktopUnderlineRefs.current[i], { scaleX: 0, duration: 0.25, ease: "power2.in" });
                }}
              >
                {link}
                <span
                  ref={(el) => { desktopUnderlineRefs.current[i] = el; }}
                  className="absolute bottom-0 left-0 w-full h-px bg-current"
                  style={{ transform: "scaleX(0)", transformOrigin: "left 50%" }}
                />
              </a>
            ))}
          </div>

          <LetsTalkBtn
            ref={btnRef}
            className="hidden min-[900px]:flex items-center text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em] border border-black bg-black"
          />

          <button
            className="min-[900px]:hidden p-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
              <rect ref={line1Ref} width="24" height="2" rx="1" fill="black" />
              <rect ref={line2Ref} y="7" width="24" height="2" rx="1" fill="black" />
              <rect ref={line3Ref} y="14" width="24" height="2" rx="1" fill="black" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="min-[900px]:hidden fixed inset-0 bg-black/85 backdrop-blur-md z-40 flex-col justify-center px-8 gap-4"
        style={{ display: "none", opacity: 0 }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href="#"
            ref={(el) => { mobileLinkRefs.current[i] = el; }}
            className="text-[clamp(36px,10vw,56px)] font-light uppercase text-white tracking-[-0.04em] leading-tight"
          >
            {link}
          </a>
        ))}
        <LetsTalkBtn className="self-start mt-6 text-white text-sm font-medium px-4 py-3 rounded-full border border-white" />
      </div>
    </>
  );
}
