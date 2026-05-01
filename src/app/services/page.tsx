import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { FooterSpacer } from "../components/FooterSpacer";
import { ServicesHeroSection } from "../components/ServicesHeroSection";
import { ServicesStatementSection } from "../components/ServicesStatementSection";
import { ServicesListSection } from "../components/ServicesListSection";
import { FullBleedSection } from "../components/FullBleedSection";
import { ServicesProcessSection } from "../components/ServicesProcessSection";
import { AboutCtaSection } from "../components/AboutCtaSection";
import { client } from "@/sanity/lib/client";
import { servicesQuery, type Service } from "@/sanity/lib/queries";

export default async function Services() {
  const services = await client.fetch<Service[]>(
    servicesQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <>
      <main className="relative z-10">
        <Nav />
        <ServicesHeroSection />
        <ServicesStatementSection />
        <ServicesListSection services={services} />
        <FullBleedSection src="/fullbleed.png" />
        <ServicesProcessSection />
        <AboutCtaSection />
      </main>
      <FooterSpacer />
      <Footer />
    </>
  );
}
