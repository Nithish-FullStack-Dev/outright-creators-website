"use client";

import { motion } from "framer-motion";
import TextReveal from "../motion/TextReveal";
import CoverflowCarousel, { MediaItem } from "../ui/Coverflowcarousel";

const items: MediaItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  },
  { type: "image", src: "/assets/social-media/posters/1.jpg" },
  { type: "image", src: "/assets/social-media/posters/2.jpg" },
  { type: "image", src: "/assets/social-media/posters/3.jpg" },
  { type: "image", src: "/assets/social-media/posters/4.jpg" },
  {
    type: "video",
    src: "/assets/branding/11.mp4",
    poster: "/assets/branding/11.png",
  },
];

export default function MotionGraphic() {
  const features = [
    "3D Animation",
    "2D Animation",
    "VFX & Compositing",
    "Motion Graphics",
    "AI Videos",
    "AI Movies",
    "Explainer Videos",
    "Branding Videos",
    "Festival Creative Videos",
    "Social Media Videos",
    "Website Videos",
    "Creative Campaign Videos",
    "Visual Presentations",
    "Video Editing",
    "Audio Editing & Sync",
  ];

  return (
    <section className="relative overflow-hidden bg-[#f5f3ef] py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
          repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="relative z-10 container">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-10 bg-black/20" />

              <img
                src="/assets/otc-bulb.png"
                alt="Bulb"
                className="h-6 w-6 md:h-9 md:w-9"
              />

              <span className="text-[11px] font-semibold tracking-[0.3em] text-black/40 uppercase md:text-[14px]">
                Motion + AI
              </span>
            </div>

            <div
              className="leading-[0.9] font-black tracking-tighter text-[#0a0a0a]"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              }}
            >
              <TextReveal
                lines={["Crafting Stories", "In Motion"]}
                className="uppercase"
                highlightWords={["Motion"]}
                highlightClassName="italic font-medium text-black/30"
              />
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-black/50 md:text-lg">
              We create high-end motion graphics, AI-powered videos, cinematic
              brand films, explainer videos, VFX sequences, and immersive
              storytelling experiences designed for advertising, digital
              campaigns, websites, and modern social media platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
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
          </motion.div>
        </div>

        <div className="mt-24">
          <CoverflowCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
