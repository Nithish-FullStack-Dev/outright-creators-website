"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { services } from "../data/service";
import PremiumServiceSections from "./ServicesSections";

const ease = [0.16, 1, 0.3, 1] as const;

const SlideIn = ({
  children,
  delay = 0,
  from = "left",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "left" | "right";
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: from === "left" ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.85, delay, ease }}
    viewport={{ once: true, margin: "-60px" }}
    className={className}
  >
    {children}
  </motion.div>
);

const features = [
  "Logo Design",
  "Social Media Management",
  "Instagram Feed Designs",
  "Reels & Shorts Content",
  "Festival Creatives",
  "Story Creatives",
  "Ad Creatives",
  "Social Media Videos",
  "Print Design",
  "Packaging Design",
  "Brochure Design",
  "Marketing Creatives",
  "Mockup Designs",
  "Grid & Carousel Designs",
];

const SocialMedia = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f3ef] py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
          repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="relative z-10 container">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <SlideIn delay={0} className="flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-10 bg-black/20" />

              <img
                src="/assets/otc-bulb.png"
                alt="Bulb"
                className="h-6 w-6 md:h-9 md:w-9"
              />

              <span className="text-[11px] font-semibold tracking-[0.3em] text-black/40 uppercase md:text-[14px]">
                Social Media Marketing
              </span>
            </div>

            <div
              className="leading-[0.92] font-black tracking-tighter text-[#0a0a0a]"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              }}
            >
              <span className="block uppercase">Building</span>

              <span className="block text-black/30 uppercase">
                Visual Identity
              </span>

              <span className="block uppercase">Systems.</span>
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-black/50 md:text-lg">
              We build modern branding systems that create strong visual
              identity, improve brand recognition, and deliver consistent
              communication across digital, print, packaging, and physical brand
              touchpoints.
            </p>
          </SlideIn>

          <SlideIn
            from="right"
            delay={0.2}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <h3 className="text-sm font-semibold tracking-[0.25em] text-black/40 uppercase md:text-base">
                Services & Capabilities
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {features.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-black/70 backdrop-blur transition-all duration-300 hover:border-black/20 hover:bg-white md:px-5 md:py-3 md:text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </SlideIn>
        </div>

        <div className="mt-24">
          <PremiumServiceSections
            key={services[3].id}
            section={services[3]}
            index={services[3].index}
          />
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
