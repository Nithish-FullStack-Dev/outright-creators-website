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
      <div className="overflow-clip bg-zinc-50 font-sans">
        <ScrollImageSequence
          desktopFolder="/sequences/motion"
          desktopFrames={114}
          mobileFolder="/sequences-mobile/motion"
          mobileFrames={114}
        />
        <div id="motion-graphic">
          <MotionGraphic />
        </div>
        <ScrollImageSmall
          desktopFolder="/sequences/graphic"
          desktopFrames={40}
          mobileFolder="/sequences-mobile/graphic"
          mobileFrames={60}
        />
        <div id="graphic-design">
          <GraphicDesign />
        </div>
        <ScrollImageSmall
          desktopFolder="/sequences/branding"
          desktopFrames={45}
          mobileFolder="/sequences-mobile/branding"
          mobileFrames={51}
        />
        <div id="branding">
          <Branding />
        </div>
        <ScrollImageSmall
          desktopFolder="/sequences/social"
          desktopFrames={40}
          mobileFolder="/sequences-mobile/social"
          mobileFrames={51}
        />
        <div id="social-media">
          <SocialMedia />
        </div>
        <Stats />
        <TestimonialsSection />
      </div>
    </>
  );
}
