import DestinationCards from "@/sections/DestinationCards";
import HeroBanner from "@/sections/HeroBanner";
import LatestTrips from "@/sections/LatestTrips";
import OurStory from "@/sections/OurStory";
import PartnersLogos from "@/sections/PartnersLogos";
import TravelTypes from "@/sections/TravelTypes";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <OurStory />
      <LatestTrips />
      <TravelTypes />
      <DestinationCards />
      <PartnersLogos />
    </main>
  );
}
