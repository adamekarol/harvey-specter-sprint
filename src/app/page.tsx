import { Nav } from "./components/Nav";
import { HeroHeading } from "./components/HeroHeading";
import { HeroBackground } from "./components/HeroBackground";
import { TaglineSection } from "./components/TaglineSection";
import { AboutSection } from "./components/AboutSection";
import { FullBleedSection } from "./components/FullBleedSection";
import { ServiceItem } from "./components/ServiceItem";
import { SelectedWorksSection } from "./components/SelectedWorksSection";
import { FooterSpacer } from "./components/FooterSpacer";
import { Footer } from "./components/Footer";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { NewsSection } from "./components/NewsSection";
import { LetsTalkBtn } from "./components/LetsTalkBtn";
import { client } from "@/sanity/lib/client";
import { portfolioQuery, servicesQuery, type PortfolioItem, type Service } from "@/sanity/lib/queries";

const HERO_IMAGE = "/hero2.jpg";
const ABOUT_IMAGE = "/about.png";
const FULLBLEED_IMAGE = "/fullbleed.png";

export default async function Home() {
  const [portfolioItems, services] = await Promise.all([
    client.fetch<PortfolioItem[]>(portfolioQuery, {}, { next: { revalidate: 60 } }),
    client.fetch<Service[]>(servicesQuery, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <>
    <main className="relative z-10">
      <Nav />
      <section className="relative min-h-dvh overflow-hidden bg-[#c8cbd0]" data-hero-section style={{ transform: 'translateZ(0)' }}>
        {/* Background photo */}
        <HeroBackground src={HERO_IMAGE} />

        <div
          className="absolute bottom-0 inset-x-0 h-[50%] min-[900px]:h-[40%] pointer-events-none"
          style={{
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 30%, transparent 100%)",
          }}
        />

        <div className="relative flex flex-col min-h-dvh px-4 min-[900px]:px-8">
          <div className="flex-1" />

          {/* ── Hero content ── */}
          <div className="pb-10 min-[900px]:pb-14 flex flex-col gap-[40px]">
            <div>
              <HeroHeading />
            </div>

            <div className="min-[900px]:flex min-[900px]:justify-end">
              <div className="min-[900px]:w-[294px] flex flex-col gap-[17px]">
                <p
                  className="text-[#1f1f1f] text-sm font-bold italic uppercase tracking-[-0.04em]"
                  style={{ lineHeight: 1.1 }}
                >
                  H.Studio is a{" "}
                  <span className="font-normal not-italic">full-service</span>{" "}
                  creative studio creating beautiful digital experiences and
                  products. We are an{" "}
                  <span className="font-normal not-italic">award winning</span>{" "}
                  design and art group specializing in branding, web design and
                  engineering.
                </p>
                <LetsTalkBtn className="self-start bg-black text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em] border border-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tagline section ── */}
      <TaglineSection />

      {/* ── About section ── */}
      <AboutSection src={ABOUT_IMAGE} />

      {/* ── Full-bleed photo ── */}
      <FullBleedSection src={FULLBLEED_IMAGE} />

      {/* ── Services ── */}
      <section data-nav-theme="dark" className="bg-black px-4 min-[900px]:px-8 py-12 min-[900px]:py-[80px] flex flex-col gap-8 min-[900px]:gap-12">

        <p className="text-white text-[13px] uppercase leading-[1.1] whitespace-nowrap" style={{ fontFamily: "monospace" }}>[ services ]</p>

        <div className="flex items-center justify-between w-full uppercase whitespace-nowrap">
          <span className="font-light text-white leading-none" style={{ fontSize: "8.5vw", letterSpacing: "-0.08em", lineHeight: 1 }}>
            [{services.length}]
          </span>
          <span className="font-light text-white leading-none min-[900px]:text-[96px]" style={{ fontSize: "8.5vw", letterSpacing: "-0.08em", lineHeight: 1 }}>
            Deliverables
          </span>
        </div>

        <div className="flex flex-col gap-12">
          {services.map((s) => (
            <ServiceItem key={s._id} item={s} />
          ))}
        </div>
      </section>

      {/* ── Selected Work ── */}
      <SelectedWorksSection portfolioItems={portfolioItems} />

      <TestimonialsSection />

      <NewsSection />

    </main>
    <FooterSpacer />

      <Footer />
    </>
  );
}
