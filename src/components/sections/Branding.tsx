"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "../data/service";
import TextReveal from "../motion/TextReveal";
import PremiumServiceSections from "./ServicesSections";

const Branding = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
                  <img
                    src="/assets/otc-bulb.png"
                    alt="Bulb"
                    className="h-6 w-6 md:h-9 md:w-9"
                  />
                  <span className="text-[10px] font-semibold tracking-[0.3em] text-black/40 uppercase">
                    Branding
                  </span>
                </motion.div>

                <div
                  className="leading-[0.92] font-black tracking-tighter text-[#0a0a0a]"
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
                <p className="max-w-full text-sm leading-relaxed text-black/45 md:max-w-xl md:text-xl">
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
                      className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-black/60 backdrop-blur md:text-xl"
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
