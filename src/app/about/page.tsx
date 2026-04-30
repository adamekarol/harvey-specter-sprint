import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { FooterSpacer } from "../components/FooterSpacer";
import { AboutSection } from "../components/AboutSection";
import { AboutHeroSection } from "../components/AboutHeroSection";
import { AboutStatementSection } from "../components/AboutStatementSection";
import { AboutPhilosophySection } from "../components/AboutPhilosophySection";
import { AboutStatsSection } from "../components/AboutStatsSection";
import { AboutCtaSection } from "../components/AboutCtaSection";

const HERO_IMAGE = "/fullbleed.png";
const ABOUT_IMAGE = "/about.png";

const PRINCIPLES = [
  {
    num: "[ 01 ]",
    title: "Clarity first",
    body: "Every great visual starts with a clear idea. Before a single frame is shot or a pixel is placed, I spend time understanding the core of what needs to be communicated — and what doesn't.",
  },
  {
    num: "[ 02 ]",
    title: "Craft over speed",
    body: "In a world of fast content, the work that endures is the work that was made with patience. I believe in slowing down enough to get it right, then refining until it's undeniable.",
  },
  {
    num: "[ 03 ]",
    title: "Story above all",
    body: "Brands are remembered through stories, not specs. Whether it's a campaign, a brand identity, or a single photograph — if it doesn't tell a human story, it won't move anyone.",
  },
];

export default function About() {
  return (
    <>
      <main className="relative z-10">
        <Nav />
        <AboutHeroSection src={HERO_IMAGE} />
        <AboutStatementSection />
        <AboutSection src={ABOUT_IMAGE} />
        <AboutPhilosophySection principles={PRINCIPLES} />
        <AboutStatsSection />
        <AboutCtaSection />
      </main>
      <FooterSpacer />
      <Footer />
    </>
  );
}
