"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollVideoSection from "../motion/ScrollVideoSection";
import { services } from "../data/service";
import Image from "next/image";
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

const FestivalCreatives = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-6%", "4%"]);
  const centerScale = useTransform(scrollYProgress, [0, 0.3], [0.97, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32"
      style={{ background: "#f5f3ef" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="flex flex-col gap-5">
        <div key={services[2]?.id ?? "festival"}>
          {/* <ScrollVideoSection
            video={services[2]?.scrubVideo}
            title={services[2]?.title}
          /> */}

          <div className="container">
            <div className="mb-24 grid gap-12 lg:grid-cols-[1fr_auto]">
              <div>
                <SlideIn delay={0}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-8 bg-black/20" />

                    <img
                      src="/assets/bulb.svg"
                      alt="Bulb"
                      className="h-6 w-6"
                    />

                    <span className="text-[10px] font-semibold tracking-[0.35em] text-black/50 uppercase">
                      Festival Creatives
                    </span>
                  </div>
                </SlideIn>

                <div style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}>
                  <span className="block leading-[0.9] font-black tracking-[-0.05em] text-black uppercase">
                    Festival
                  </span>

                  <span className="block leading-[0.9] font-black tracking-[-0.05em] text-black/30 uppercase">
                    Campaigns
                  </span>

                  <span className="block leading-[0.9] font-black tracking-[-0.05em] text-black uppercase">
                    That Stand Out.
                  </span>
                </div>
              </div>

              <SlideIn
                from="right"
                delay={0.3}
                className="flex flex-col justify-end pb-2"
              >
                <p className="max-w-xs text-sm leading-relaxed text-black/60">
                  We design high-impact festival creatives, seasonal campaigns,
                  offer promotions, and branded social media visuals crafted to
                  capture audience attention while maintaining strong brand
                  consistency across every platform.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {[
                    "Festival Creatives",
                    "Seasonal Campaigns",
                    "Offer Promotions",
                    "Story Creatives",
                    "Social Media Ads",
                    "Brand Templates",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-medium text-black/60 backdrop-blur"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </SlideIn>
            </div>

            <PremiumServiceSections
              key={services[1].id}
              section={services[1]}
              index={services[1].index}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestivalCreatives;
