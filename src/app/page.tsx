import PortfolioSection from "../components/sections/PortfolioSection";
import Stats from "../components/sections/Stats";
import MotionGraphic from "../components/sections/MotionGraphic";
import Branding from "../components/sections/Branding";
import SocialMedia from "../components/sections/SocialMedia";
import FestivalCreatives from "../components/sections/FestivalCreatives";
import PremiumServiceSections from "../components/sections/ServicesSections";
import ScrollImageSequence from "../components/motion/ScrollImageSequence";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans">
      <ScrollImageSequence folder="/sequences/motion" totalFrames={114} />
      <MotionGraphic />
      <ScrollImageSequence folder="/sequences/graphic" totalFrames={114} />
      <Branding />
      <ScrollImageSequence folder="/sequences/branding" totalFrames={114} />
      <SocialMedia />
      <ScrollImageSequence folder="/sequences/social" totalFrames={114} />
      <FestivalCreatives />
      <Stats />
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
