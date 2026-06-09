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
import PageLoader from "../components/loader/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <div className="bg-zinc-50 font-sans">
        <div id="motion-graphic">
          <ScrollImageSequence folder="/sequences/motion" totalFrames={114} />
          <MotionGraphic />
        </div>
        <div id="graphic-design">
          <ScrollImageSmall folder="/sequences/graphic" totalFrames={40} />
          <GraphicDesign />
        </div>
        <div id="branding">
          <ScrollImageSmall folder="/sequences/branding" totalFrames={45} />
          <Branding />
        </div>
        <div id="social-media">
          <ScrollImageSmall folder="/sequences/social" totalFrames={40} />
          <SocialMedia />
        </div>
        <Stats />
        <TestimonialsSection />
      </div>
    </>
  );
}
