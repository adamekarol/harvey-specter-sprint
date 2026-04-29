"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between py-6 z-10">
        <Link
          href="/"
          className="text-base font-semibold tracking-[-0.04em] text-black capitalize"
        >
          H.Studio
        </Link>

        <div className="hidden min-[900px]:flex gap-14 text-base font-semibold tracking-[-0.04em] text-black capitalize">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="hover:opacity-60 transition-opacity">
              {link}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="hidden min-[900px]:flex items-center bg-black text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em]"
        >
          Let&apos;s talk
        </a>

        <button
          className="min-[900px]:hidden p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
            <rect width="24" height="2" rx="1" fill="black" />
            <rect y="7" width="24" height="2" rx="1" fill="black" />
            <rect y="14" width="24" height="2" rx="1" fill="black" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="min-[900px]:hidden absolute top-[72px] inset-x-0 bg-white/90 backdrop-blur-md px-4 py-6 z-20 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-base font-semibold text-black tracking-[-0.04em]"
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="self-start mt-2 bg-black text-white text-sm font-medium px-4 py-3 rounded-full"
          >
            Let&apos;s talk
          </a>
        </div>
      )}
    </>
  );
}
