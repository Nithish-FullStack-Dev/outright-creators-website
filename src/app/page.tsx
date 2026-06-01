import PortfolioSection from "../components/sections/PortfolioSection";
import Stats from "../components/sections/Stats";
import MotionGraphic from "../components/sections/MotionGraphic";
import Branding from "../components/sections/Branding";
import SocialMedia from "../components/sections/SocialMedia";
import FestivalCreatives from "../components/sections/FestivalCreatives";
import PremiumServiceSections from "../components/sections/ServicesSections";
import ScrollImageSequence from "../components/motion/ScrollImageSequence";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import GraphicDesign from "../components/sections/GraphicDesign";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans">
      <ScrollImageSequence folder="/sequences/motion" totalFrames={114} />
      <MotionGraphic />
      <ScrollImageSequence folder="/sequences/graphic" totalFrames={114} />
      <GraphicDesign />
      <ScrollImageSequence folder="/sequences/branding" totalFrames={114} />
      <Branding />
      <ScrollImageSequence folder="/sequences/social" totalFrames={114} />
      <SocialMedia />
      <Stats />
      <TestimonialsSection />
    </div>
  );
}
