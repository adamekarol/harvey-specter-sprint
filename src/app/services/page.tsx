import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { FooterSpacer } from "../components/FooterSpacer";
import { ServicesHeroSection } from "../components/ServicesHeroSection";
import { ServicesStatementSection } from "../components/ServicesStatementSection";
import { ServicesListSection } from "../components/ServicesListSection";
import { FullBleedSection } from "../components/FullBleedSection";
import { ServicesProcessSection } from "../components/ServicesProcessSection";
import { AboutCtaSection } from "../components/AboutCtaSection";

const SERVICES = [
  {
    num: "[ 01 ]",
    title: "Brand Discovery",
    img: "/service-brand.png",
    objectPosition: "object-center",
    description:
      "We uncover what makes your brand irreplaceable. Through deep research, competitive analysis, and creative exploration, we build the strategic foundation everything else is built on.",
    deliverables: ["Brand Strategy", "Identity Design", "Logo Systems", "Visual Direction"],
  },
  {
    num: "[ 02 ]",
    title: "Web Design & Dev",
    img: "/service-web.png",
    objectPosition: "object-center",
    description:
      "Websites that do more than look good — they perform. We design and build pixel-perfect, fast, and accessible digital experiences that convert visitors into believers.",
    deliverables: ["UI/UX Design", "Full-Stack Dev", "CMS Integration", "Performance Audit"],
  },
  {
    num: "[ 03 ]",
    title: "Marketing",
    img: "/service-marketing.png",
    objectPosition: "object-center",
    description:
      "Marketing that earns attention instead of buying it. From campaign strategy to content creation, we build systems that grow your audience and move your bottom line.",
    deliverables: ["Campaign Strategy", "Content Creation", "Social Media", "Paid Media"],
  },
  {
    num: "[ 04 ]",
    title: "Photography",
    img: "/service-photography.png",
    objectPosition: "object-bottom",
    description:
      "Images speak before words do. Our commercial and editorial photography captures the essence of your brand in every frame — authentic, striking, and built to last.",
    deliverables: ["Commercial Shoots", "Editorial", "Brand Photography", "Post-Production"],
  },
];

export default function Services() {
  return (
    <>
      <main className="relative z-10">
        <Nav />
        <ServicesHeroSection />
        <ServicesStatementSection />
        <ServicesListSection services={SERVICES} />
        <FullBleedSection src="/fullbleed.png" />
        <ServicesProcessSection />
        <AboutCtaSection />
      </main>
      <FooterSpacer />
      <Footer />
    </>
  );
}
