import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { WorkGallery } from "@/components/WorkGallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const title = "Osborn Roofing WA Pty Ltd — Quality. Reliability. Safety.";
const description =
  "Experienced and vibrant roofing team based in the South West. Roof replacement, new builds, gutters, repairs and maintenance across Busselton, WA.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WorkGallery />
      <BeforeAfter />
      <ContactSection />
      <Footer />
    </main>
  );
}
