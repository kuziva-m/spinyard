import Hero from "../components/home/Hero";
import TrustSignals from "../components/home/TrustSignals";
import Categories from "../components/home/Categories";
import AgronomistCTA from "../components/home/AgronomistCTA";
import Locations from "../components/home/Locations";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <Hero />
      <Categories />
      <TrustSignals />

      <AgronomistCTA />
      <Locations />
    </div>
  );
}
