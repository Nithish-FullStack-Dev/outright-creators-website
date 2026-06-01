"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ScrollVideoSection from "../motion/ScrollVideoSection";
import { services } from "../data/service";
import TextReveal from "../motion/TextReveal";
import PremiumServiceSections from "./ServicesSections";

const stats = [
  { value: "120+", label: "Brand Identities" },
  { value: "98%", label: "Client Retention" },
  { value: "12", label: "Awwwards Sites" },
  { value: "6yr", label: "Crafting Motion" },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We dig into your brand DNA — competitive landscape, audience psychology, and the emotional territory you want to own.",
  },
  {
    step: "02",
    title: "Motion Language",
    desc: "We define a proprietary motion grammar: easing curves, timing signatures, and kinetic metaphors unique to your brand.",
  },
  {
    step: "03",
    title: "Production",
    desc: "From storyboard to final render — 3D animation, visual FX, and brand films crafted frame by frame.",
  },
  {
    step: "04",
    title: "Delivery",
    desc: "Export-ready assets, interaction specs, and a living style guide so your team can scale the system independently.",
  },
];

const capabilities = [
  { label: "Social Media Grids & Campaigns", width: "96%" },
  { label: "AI-Powered Creative Design", width: "92%" },
  { label: "Web Banner Design", width: "88%" },
  { label: "Logo & Brochure Design", width: "94%" },
  { label: "Standee & Flyer Design", width: "90%" },
  { label: "Business Cards & Letterheads", width: "93%" },
  { label: "Brand Books & Merchandise", width: "86%" },
  { label: "Packaging & Bottle Design", width: "84%" },
  { label: "Shop Branding & Signage", width: "91%" },
  { label: "Billboards & Outdoor Ads", width: "89%" },
  { label: "YouTube Thumbnails & Banners", width: "95%" },
];

const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: "-80px" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Branding = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-10"
      style={{ background: "#f5f3ef" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="flex flex-col gap-5">
        <div key={services[0].id}>
          {/* <ScrollVideoSection
            video={services[0].scrubVideo}
            title={services[0].title}
          /> */}

          <div className="container">
            {/* ── HERO HEADER ── */}
            <div className="my-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="mb-6 flex items-center gap-4"
                >
                  <div className="h-px w-10 bg-black/20" />
                  <img src="/assets/bulb.svg" alt="Bulb" className="h-6 w-6" />
                  <span className="text-[10px] font-semibold tracking-[0.3em] text-black/40 uppercase">
                    Branding
                  </span>
                </motion.div>

                <div
                  className="leading-[0.92] font-black tracking-[-0.05em] text-[#0a0a0a]"
                  style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                >
                  <TextReveal
                    lines={["Building Bold", "Branding Systems"]}
                    className="uppercase"
                    highlightWords={["Branding"]}
                    highlightClassName="italic font-medium"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="flex flex-col justify-end"
              >
                <p className="max-w-md text-sm leading-relaxed text-black/45">
                  We create cinematic motion systems that transform static
                  brands into immersive visual experiences — combining
                  animation, storytelling, sound, and interaction into one
                  seamless language.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "3D Animation",
                    "Visual FX",
                    "Brand Films",
                    "Product Reveals",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-medium text-black/60 backdrop-blur"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── SERVICE CARD ── */}
            <PremiumServiceSections
              key={services[3].id}
              section={services[3]}
              index={services[3].index}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Branding;
