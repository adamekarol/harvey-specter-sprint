import { Nav } from "./components/Nav";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { portfolioQuery } from "@/sanity/lib/queries";

const HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/a38d0ce5-78f9-473a-b9f7-f4b2bfc82223";

const ABOUT_IMAGE =
  "https://www.figma.com/api/mcp/asset/fc0580db-499d-4712-989b-3bd4bce96b2b";

const FULLBLEED_IMAGE =
  "https://www.figma.com/api/mcp/asset/aa99f4a9-4c02-4ec0-8542-a2962fa1776c";

const SERVICES = [
  { num: "[ 1 ]", title: "Brand Discovery",  img: "https://www.figma.com/api/mcp/asset/ca415b1a-a6c0-4c69-89cb-a60c7aa4cef5" },
  { num: "[ 2 ]", title: "Web Design & Dev", img: "https://www.figma.com/api/mcp/asset/cca7a4ab-787d-4468-9c82-cc639e7ae604" },
  { num: "[ 3 ]", title: "Marketing",        img: "https://www.figma.com/api/mcp/asset/a6318c13-416f-4efb-88bf-20098aad32ac" },
  { num: "[ 4 ]", title: "Photography",      img: "https://www.figma.com/api/mcp/asset/aa417492-69cd-4e86-a1b0-c3c1f5843d23" },
] as const;

const NEWS_ITEMS = [
  { img: "https://www.figma.com/api/mcp/asset/8be4e21f-629a-4cd3-8640-bdf02175314f", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { img: "https://www.figma.com/api/mcp/asset/e767195b-0d01-4c0f-a5e5-b2d6630eda58", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { img: "https://www.figma.com/api/mcp/asset/9c2a05a4-28df-4e9d-84fa-a49a3f86a291", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

type PortfolioItem = {
  _id: string;
  title: string;
  slug: { current: string } | null;
  tags: string[] | null;
  image: { asset: { _ref: string } } | null;
  externalImageUrl: string | null;
  link: string | null;
  order: number | null;
};

function resolveImage(item: PortfolioItem): string {
  if (item.image?.asset) return urlFor(item.image).url();
  return item.externalImageUrl ?? "";
}

// Heights for the staggered desktop 2-col grid: outer index maps to position
const DESKTOP_HEIGHTS = ["h-[744px]", "h-[699px]", "h-[699px]", "h-[744px]"];

export default async function Home() {
  const portfolioItems: PortfolioItem[] = await client.fetch(portfolioQuery, {}, { next: { revalidate: 60 } });

  return (
    <main>
      <section className="relative min-h-dvh overflow-hidden bg-[#c8cbd0]">
        {/* Background photo */}
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
        />

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
          <Nav />

          <div className="flex-1" />

          {/* ── Hero content ── */}
          <div className="pb-10 min-[900px]:pb-14 flex flex-col gap-[40px]">
            <div>
              <p
                className="text-white text-sm uppercase mix-blend-overlay min-[900px]:px-[18px]"
                style={{
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                  lineHeight: 1.1,
                }}
              >
                [ Hello i&apos;m ]
              </p>

              <h1
                className="text-white font-medium capitalize text-center mix-blend-overlay
                           text-[25vw]
                           min-[900px]:text-[13.75vw] min-[900px]:whitespace-nowrap"
                style={{ letterSpacing: "-0.07em", lineHeight: 0.95 }}
              >
                Harvey Specter
              </h1>
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
                <a
                  href="#"
                  className="self-start bg-black text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em]"
                >
                  Let&apos;s talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tagline section ── */}
      <section className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[120px]">
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
              className="font-light text-black uppercase whitespace-nowrap
                         text-[8.5vw] min-[900px]:text-[6.67vw]"
              style={{ letterSpacing: "-0.08em", lineHeight: 0.84 }}
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
              className="font-light text-black uppercase whitespace-nowrap
                         text-[8.5vw] min-[900px]:text-[6.67vw]"
              style={{ letterSpacing: "-0.08em", lineHeight: 0.84 }}
            >
              Photographer
            </span>
          </div>

          <div className="text-center min-[900px]:text-left min-[900px]:pl-[44.33%]">
            <span
              className="font-light text-black uppercase whitespace-nowrap
                         text-[8.5vw] min-[900px]:text-[6.67vw]"
              style={{ letterSpacing: "-0.08em", lineHeight: 0.84 }}
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
              className="font-light text-black uppercase whitespace-nowrap
                         text-[8.5vw] min-[900px]:text-[6.67vw]"
              style={{ letterSpacing: "-0.08em", lineHeight: 0.84 }}
            >
              on the south side
            </span>
          </div>

          <div className="text-center min-[900px]:hidden">
            <span
              className="font-light text-black uppercase whitespace-nowrap text-[8.5vw]"
              style={{ letterSpacing: "-0.08em", lineHeight: 0.84 }}
            >
              of chicago.
            </span>
          </div>

          <div className="hidden min-[900px]:block">
            <div style={{ paddingLeft: "44%" }}>
              <span
                className="font-light text-black uppercase whitespace-nowrap text-[6.67vw]"
                style={{ letterSpacing: "-0.08em", lineHeight: 0.84 }}
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

      {/* ── About section ── */}
      <section className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[80px]">

        {/* Mobile */}
        <div className="min-[900px]:hidden flex flex-col gap-5">
          <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>002</p>
          <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>[ About ]</p>

          <div className="flex items-stretch gap-4">
            <div className="flex flex-col justify-between shrink-0">
              <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
            </div>
            <p className="flex-1 text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] py-3">
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>
            <div className="flex flex-col justify-between items-end shrink-0">
              <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
            </div>
          </div>

          <div className="w-full overflow-hidden" style={{ aspectRatio: "436/614" }}>
            <img src={ABOUT_IMAGE} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden min-[900px]:flex justify-between items-start">
          <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] whitespace-nowrap shrink-0" style={{ fontFamily: "monospace" }}>[ About ]</p>

          <div className="w-[71%] flex gap-8 items-end">
            <div className="flex flex-1 items-stretch gap-4">
              <div className="flex flex-col justify-between shrink-0">
                <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
                <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
              </div>
              <p className="flex-1 text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] py-3">
                Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
              </p>
              <div className="flex flex-col justify-between items-end shrink-0">
                <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
                <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
              </div>
            </div>

            <div className="flex gap-6 items-start shrink-0">
              <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>002</p>
              <div className="w-[30vw] overflow-hidden" style={{ aspectRatio: "436/614" }}>
                <img src={ABOUT_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed photo ── */}
      <section className="w-full overflow-hidden aspect-[3/4] min-[900px]:aspect-auto min-[900px]:h-[900px]">
        <img
          src={FULLBLEED_IMAGE}
          alt=""
          className="w-full h-full object-cover object-[65%_center] min-[900px]:object-center"
        />
      </section>

      {/* ── Services ── */}
      <section className="bg-black px-4 min-[900px]:px-8 py-12 min-[900px]:py-[80px] flex flex-col gap-8 min-[900px]:gap-12">

        <p className="text-white text-[13px] uppercase leading-[1.1] whitespace-nowrap" style={{ fontFamily: "monospace" }}>[ services ]</p>

        <div className="flex items-center justify-between w-full uppercase whitespace-nowrap">
          <span className="font-light text-white leading-none" style={{ fontSize: "8.5vw", letterSpacing: "-0.08em", lineHeight: 1 }}>
            [4]
          </span>
          <span className="font-light text-white leading-none min-[900px]:text-[96px]" style={{ fontSize: "8.5vw", letterSpacing: "-0.08em", lineHeight: 1 }}>
            Deliverables
          </span>
        </div>

        <div className="flex flex-col gap-12">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex flex-col gap-[9px]">
              <div className="flex flex-col gap-[9px]">
                <p className="text-white text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>{s.num}</p>
                <div className="w-full h-px bg-white opacity-20" />
              </div>

              <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between pt-[9px]">
                <p className="font-bold italic text-white uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap text-[28px] min-[900px]:text-[36px] shrink-0">
                  {s.title}
                </p>
                <div className="flex flex-col min-[900px]:flex-row gap-6 items-start shrink-0">
                  <p className="text-white text-[14px] leading-[1.3] tracking-[-0.04em] min-[900px]:w-[393px]">
                    Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.
                  </p>
                  <div className="w-[151px] h-[151px] shrink-0 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section className="bg-white px-4 min-[900px]:px-8 py-12 min-[900px]:py-[80px]">

        {/* Mobile header */}
        <div className="min-[900px]:hidden flex flex-col gap-4 mb-8">
          <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1]" style={{ fontFamily: "monospace" }}>[ portfolio ]</p>
          <div className="flex items-start justify-between">
            <h2 className="font-light text-black uppercase leading-[0.86]" style={{ fontSize: "8.5vw", letterSpacing: "-0.08em" }}>
              Selected<br />Work
            </h2>
            <p className="text-[#1f1f1f] text-[13px] leading-[1.1]" style={{ fontFamily: "monospace" }}>004</p>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden min-[900px]:flex items-start justify-between mb-[61px]">
          <div className="flex gap-[10px] items-start">
            <h2 className="font-light text-black uppercase leading-[0.86]" style={{ fontSize: "96px", letterSpacing: "-0.08em" }}>
              Selected<br />Work
            </h2>
            <p className="text-[#1f1f1f] text-[13px] leading-[1.1] mt-2" style={{ fontFamily: "monospace" }}>004</p>
          </div>
          <div className="flex items-center justify-center shrink-0" style={{ width: 15, height: 110 }}>
            <p className="text-[#1f1f1f] text-[13px] uppercase leading-[1.1] whitespace-nowrap -rotate-90" style={{ fontFamily: "monospace" }}>[ portfolio ]</p>
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="min-[900px]:hidden flex flex-col gap-6">
          {portfolioItems.map((p) => (
            <div key={p._id} className="flex flex-col gap-[10px]">
              <div className="relative h-[390px] overflow-hidden">
                <img src={resolveImage(p)} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {(p.tags ?? []).map((tag) => (
                    <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.04em] whitespace-nowrap">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-black text-[24px] text-black uppercase leading-[1.1] tracking-[-0.04em]">{p.title}</p>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          ))}

          {/* Mobile CTA bracket */}
          <div className="flex items-stretch gap-4">
            <div className="flex flex-col justify-between shrink-0">
              <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
            </div>
            <div className="flex-1 flex flex-col gap-[10px] py-3">
              <p className="text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] italic">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <a href="#" className="self-start bg-black text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em]">Let&apos;s talk</a>
            </div>
            <div className="flex flex-col justify-between items-end shrink-0">
              <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
              <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
            </div>
          </div>
        </div>

        {/* Desktop: 2-col staggered grid */}
        <div className="hidden min-[900px]:flex gap-6 items-stretch">

          {/* Left column: items 0 and 1 */}
          <div className="flex-1 flex flex-col gap-6">
            {portfolioItems.slice(0, 2).map((p, i) => (
              <div key={p._id} className="flex flex-col gap-[10px]">
                <div className={`relative ${DESKTOP_HEIGHTS[i]} overflow-hidden`}>
                  <img src={resolveImage(p)} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {(p.tags ?? []).map((tag) => (
                      <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.04em] whitespace-nowrap">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-black text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{p.title}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}

            {/* Desktop CTA bracket */}
            <div className="mt-auto w-full max-w-[465px] flex items-stretch gap-4">
              <div className="flex flex-col justify-between shrink-0">
                <div className="w-4 h-4 border-l border-t border-[#1f1f1f]" />
                <div className="w-4 h-4 border-l border-b border-[#1f1f1f]" />
              </div>
              <div className="flex-1 flex flex-col gap-[10px] py-3">
                <p className="text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] italic">
                  Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
                </p>
                <a href="#" className="self-start bg-black text-white text-sm font-medium px-4 py-3 rounded-full tracking-[-0.035em]">Let&apos;s talk</a>
              </div>
              <div className="flex flex-col justify-between items-end shrink-0">
                <div className="w-4 h-4 border-r border-t border-[#1f1f1f]" />
                <div className="w-4 h-4 border-r border-b border-[#1f1f1f]" />
              </div>
            </div>
          </div>

          {/* Right column: items 2 and 3, offset down */}
          <div className="flex-1 flex flex-col gap-6 pt-[240px]">
            {portfolioItems.slice(2, 4).map((p, i) => (
              <div key={p._id} className="flex flex-col gap-[10px]">
                <div className={`relative ${DESKTOP_HEIGHTS[i + 2]} overflow-hidden`}>
                  <img src={resolveImage(p)} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {(p.tags ?? []).map((tag) => (
                      <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.04em] whitespace-nowrap">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-black text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{p.title}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <TestimonialsSection />

      {/* ── News ── */}
      <section className="bg-[#f3f3f3]">

        {/* Mobile */}
        <div className="min-[900px]:hidden py-16 flex flex-col gap-8">
          <h2
            className="font-light text-black uppercase px-4"
            style={{ fontSize: "8.5vw", letterSpacing: "-0.08em", lineHeight: 0.86 }}
          >
            Keep up with my latest news &amp; achievements
          </h2>
          <div className="flex gap-4 overflow-x-auto px-4 pb-2">
            {NEWS_ITEMS.map((n) => (
              <div key={n.img} className="shrink-0 w-[72vw] max-w-[300px] flex flex-col gap-4">
                <div className="overflow-hidden" style={{ aspectRatio: "300/398" }}>
                  <img src={n.img} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px]">{n.text}</p>
                <a href="#" className="self-start flex items-center gap-2 border-b border-black pb-1">
                  <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
                  <svg width="13" height="13" viewBox="0 0 32 32" fill="none"><path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden min-[900px]:flex items-end px-8 py-[120px] gap-8">

          <div
            className="shrink-0 self-stretch flex items-center justify-center"
            style={{ width: "7.64vw" }}
          >
            <div style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap" }}>
              <h2
                className="font-light text-black uppercase"
                style={{ fontSize: "4.44vw", letterSpacing: "-0.08em", lineHeight: 0.86 }}
              >
                Keep up with my latest<br />news &amp; achievements
              </h2>
            </div>
          </div>

          <div className="flex-1 flex items-start" style={{ gap: "2.15vw" }}>

            <div className="flex-1 flex flex-col gap-4">
              <div className="overflow-hidden" style={{ aspectRatio: "353/469" }}>
                <img src={NEWS_ITEMS[0].img} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px]">{NEWS_ITEMS[0].text}</p>
              <a href="#" className="self-start flex items-center gap-2 border-b border-black pb-1">
                <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
                <svg width="13" height="13" viewBox="0 0 32 32" fill="none"><path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            <div className="w-px self-stretch bg-black/15 shrink-0" />

            <div className="flex-1 flex flex-col gap-4" style={{ paddingTop: "8.33vw" }}>
              <div className="overflow-hidden" style={{ aspectRatio: "353/469" }}>
                <img src={NEWS_ITEMS[1].img} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px]">{NEWS_ITEMS[1].text}</p>
              <a href="#" className="self-start flex items-center gap-2 border-b border-black pb-1">
                <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
                <svg width="13" height="13" viewBox="0 0 32 32" fill="none"><path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            <div className="w-px self-stretch bg-black/15 shrink-0" />

            <div className="flex-1 flex flex-col gap-4">
              <div className="overflow-hidden" style={{ aspectRatio: "353/469" }}>
                <img src={NEWS_ITEMS[2].img} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px]">{NEWS_ITEMS[2].text}</p>
              <a href="#" className="self-start flex items-center gap-2 border-b border-black pb-1">
                <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
                <svg width="13" height="13" viewBox="0 0 32 32" fill="none"><path d="M10 22L22 10M22 10H14M22 10V18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

          </div>
        </div>

      </section>

      {/* ── Footer ── */}
      <footer className="bg-black overflow-hidden">

        {/* Mobile top */}
        <div className="min-[900px]:hidden px-4 pt-12 flex flex-col gap-6 pb-6">
          <div className="flex flex-col gap-3">
            <p className="font-light italic text-white text-[24px] tracking-[-0.96px] uppercase leading-[1.1]">
              Have a <span className="font-black not-italic">project</span> in mind?
            </p>
            <a href="#" className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-full">
              Let&apos;s talk
            </a>
          </div>
          <div className="flex flex-col gap-4">
            {["Facebook", "Instagram", "X.com", "Linkedin"].map((s) => (
              <a key={s} href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">{s}</a>
            ))}
          </div>
        </div>

        {/* Desktop top */}
        <div className="hidden min-[900px]:flex items-start justify-between px-8 pt-12 pb-12">
          <div className="flex flex-col gap-3 w-[298px]">
            <p className="font-light italic text-white text-[24px] tracking-[-0.96px] uppercase leading-[1.1]">
              Have a <span className="font-black not-italic">project</span> in mind?
            </p>
            <a href="#" className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-full">
              Let&apos;s talk
            </a>
          </div>
          <div className="flex flex-col gap-0.5 text-center">
            <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">Facebook</a>
            <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">Instagram</a>
          </div>
          <div className="flex flex-col gap-0.5 text-right">
            <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">X.com</a>
            <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">Linkedin</a>
          </div>
        </div>

        <div className="px-4 min-[900px]:px-8">
          <div className="w-full h-px bg-white/20" />
        </div>

        {/* Mobile bottom */}
        <div className="min-[900px]:hidden px-4 pt-8 flex flex-col gap-3 overflow-hidden">
          <div className="flex justify-center gap-[34px] items-center text-white text-[12px] tracking-[-0.48px] uppercase">
            <a href="#" className="underline">Licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <p className="font-mono text-white text-[10px] uppercase leading-[1.1]">[ Coded By Claude ]</p>
            <p className="text-white font-semibold capitalize leading-[0.8] text-center" style={{ fontSize: "23.4vw", letterSpacing: "-1.4vw" }}>
              H.Studio
            </p>
          </div>
        </div>

        {/* Desktop bottom */}
        <div
          className="hidden min-[900px]:grid items-end px-8"
          style={{ marginTop: "120px", gridTemplateColumns: "16px 1fr 20%", columnGap: "8px" }}
        >
          <p
            className="font-mono text-white text-[10px] uppercase leading-[1.1] self-end pb-8"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            [ Coded By Claude ]
          </p>
          <div>
            <p className="text-white font-semibold capitalize leading-[0.8]" style={{ fontSize: "20.14vw", letterSpacing: "-1.21vw" }}>
              H.Studio
            </p>
          </div>
          <div className="bg-black flex flex-wrap justify-end gap-x-[34px] gap-y-2 items-end pb-8 text-white text-[12px] tracking-[-0.48px] uppercase">
            <a href="#" className="underline whitespace-nowrap">Licences</a>
            <a href="#" className="underline whitespace-nowrap">Privacy policy</a>
          </div>
        </div>

      </footer>

    </main>
  );
}
