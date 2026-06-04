import dynamic from "next/dynamic";

const MotionGraphic = dynamic(
  () => import("../components/sections/MotionGraphic"),
  {
    loading: () => <div className="h-screen" />,
  },
);
import Stats from "../components/sections/Stats";

import TestimonialsSection from "../components/sections/TestimonialsSection";

const GraphicDesign = dynamic(
  () => import("../components/sections/GraphicDesign"),
  {
    loading: () => <div className="h-screen" />,
  },
);

const Branding = dynamic(() => import("../components/sections/Branding"), {
  loading: () => <div className="h-screen" />,
});

const SocialMedia = dynamic(
  () => import("../components/sections/SocialMedia"),
  {
    loading: () => <div className="h-screen" />,
  },
);

import ScrollImageSequence from "../components/motion/ScrollImageSequence";
import ScrollImageSmall from "../components/motion/ScrollImageSmall";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans">
      <ScrollImageSequence folder="/sequences/motion" totalFrames={114} />
      <MotionGraphic />
      <ScrollImageSmall folder="/sequences/graphic" totalFrames={40} />
      <GraphicDesign />
      <ScrollImageSmall folder="/sequences/branding" totalFrames={45} />
      <Branding />
      <ScrollImageSmall folder="/sequences/social" totalFrames={40} />
      <SocialMedia />
      <Stats />
      <TestimonialsSection />
    </div>
  );
}
