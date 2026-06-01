"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ScrollVideoSection from "../motion/ScrollVideoSection";
import TextReveal from "../motion/TextReveal";
import ScrollImageSequence from "../motion/ScrollImageSequence";
import PremiumServiceSections from "./ServicesSections";
import { services } from "../data/service";

export default function MotionGraphic() {
  return (
    <section className="relative py-10" style={{ background: "#f5f3ef" }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="flex flex-col gap-5">
        <div key={services[0].id}>
          <div className="relative z-10 container">
            <div className="my-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                  className="mb-6 flex items-center gap-4"
                >
                  <div className="h-px w-10 bg-black/20" />
                  <img src="/assets/bulb.svg" alt="Bulb" className="h-6 w-6" />
                  <span className="text-[10px] font-semibold tracking-[0.3em] text-black/40 uppercase">
                    Motion Graphics
                  </span>
                </motion.div>

                <div
                  className="leading-[0.92] font-black tracking-[-0.05em] text-[#0a0a0a]"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                  }}
                >
                  <TextReveal
                    lines={["Crafting Stories", "In Motion"]}
                    className="uppercase"
                    highlightWords={["Motion"]}
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
                    "AI Concept Design",
                    "Generative Art",
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

            <PremiumServiceSections
              index={services[0].index}
              section={services[0]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
