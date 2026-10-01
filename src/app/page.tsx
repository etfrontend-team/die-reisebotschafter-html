import HeroBanner from "@/sections/HeroBanner";
import OurStory from "@/sections/OurStory";
import PartnersLogos from "@/sections/PartnersLogos";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <OurStory />
      <PartnersLogos />
      <div className="h-screen"></div>
    </main>
  );
}
