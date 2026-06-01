import PortfolioSection from "../components/sections/PortfolioSection";
import Stats from "../components/sections/Stats";
import MotionGraphic from "../components/sections/MotionGraphic";
import Branding from "../components/sections/Branding";
import SocialMedia from "../components/sections/SocialMedia";
import FestivalCreatives from "../components/sections/FestivalCreatives";
import PremiumServiceSections from "../components/sections/ServicesSections";
import ScrollImageSequence from "../components/motion/ScrollImageSequence";
import TestimonialsSection from "../components/sections/TestimonialsSection";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans">
      <ScrollImageSequence folder="/videos/frames" totalFrames={236} />
      <MotionGraphic />
      <ScrollImageSequence folder="/videos/frames" totalFrames={236} />
      <Branding />
      <SocialMedia />
      <FestivalCreatives />
      <Stats />
      {/* <ServicesSection /> */}
      {/* <PortfolioSection /> */}
      {/* <ImageSection /> */}
      <TestimonialsSection />
      <div className="relative h-60" style={{ background: "#f5f3ef" }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
          }}
        />
      </div>
    </div>
  );
}
