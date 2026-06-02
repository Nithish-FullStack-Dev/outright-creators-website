"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import TextReveal from "../motion/TextReveal";
import {
  ArrowBigDown,
  ArrowUp,
  ArrowUpRight,
  ClipboardCheck,
  LucideMousePointerClick,
  Sparkles,
  X,
} from "lucide-react";
import { ServiceSection, ShowcaseItem } from "../data/service";
import ViewportRender from "@/src/utils/ViewportRender";

const typeLabel = {
  video: "Video",
  image: "Image",
  pdf: "PDF",
  logo: "Brand Asset",
};
function InfiniteSlider({
  items,
  direction = "left",
  onAssetClick,
}: {
  items: ShowcaseItem[];
  direction?: "left" | "right";
  onAssetClick: (asset: ShowcaseItem) => void;
}) {
  const sliderRef = useRef(null);

  const isInView = useInView(sliderRef, {
    margin: "-100px",
  });

  const duplicated = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <motion.div
        ref={sliderRef}
        className="flex w-max gap-5"
        animate={
          isInView
            ? {
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
              }
            : undefined
        }
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicated.map((asset, index) => (
          <button
            key={`${asset.id}-${index}`}
            type="button"
            onClick={() => onAssetClick(asset)}
            className="group/card relative h-[270px] w-[260px] flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left backdrop-blur-xl"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/10 to-black/70" />

            {asset.thumbnail && (
              <Image
                src={asset.thumbnail}
                alt={asset.title}
                width={700}
                height={700}
                className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
            )}
            <div className="absolute top-3 right-3 z-30">
              <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-transparent text-white opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover/card:scale-100 group-hover/card:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-0 z-30 p-5">
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] tracking-[0.3em] text-white uppercase backdrop-blur-md">
                {typeLabel[asset.type]}
              </div>
            </div>

            <div className="absolute inset-0 z-20 rounded-[2rem] ring-1 ring-white/10 transition-all duration-500 group-hover/card:ring-white/30" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default function PremiumServiceSections({
  section,
  index,
}: {
  section: ServiceSection;
  index: number;
}) {
  const [activeAsset, setActiveAsset] = useState<ShowcaseItem | null>(null);
  const middleIndex = Math.ceil(section.assets.length / 2);

  const topRow = section.assets.slice(0, middleIndex);
  const bottomRow = section.assets.slice(middleIndex);
  return (
    <section className="relative overflow-hidden py-5 text-white">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_30%)]" /> */}

      <div className="relative z-10 container">
        <div className="space-y-28">
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.08,
            }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-purple-500/[0.08]" />

            <div className="relative grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* LEFT */}
              <div className="relative border-b border-white/10 p-5 sm:p-8 lg:border-r lg:border-b-0">
                <div className="mb-3 inline-flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold shadow-2xl shadow-blue-500/30">
                    {section.labelImage ? (
                      <Image
                        src={section.labelImage}
                        alt={section.label}
                        width={100}
                        height={100}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span>{section.label.slice(0, 1)}</span>
                    )}
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.35em] text-black uppercase">
                      {section.label}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl leading-tight font-semibold tracking-tight text-black md:text-4xl">
                  {section.title}
                </h2>

                <p className="mt-2 text-base leading-8 text-black">
                  {section.description}
                </p>

                <div className="mt-2 grid gap-2">
                  <div className="rounded-[2rem] p-3">
                    <h3 className="mb-5 text-xs tracking-[0.3em] text-black uppercase">
                      Tools & Technology
                    </h3>

                    <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                      {section.tech.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-3 px-2 py-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm">
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="h-7 w-7 object-contain"
                            />
                          </div>

                          <p className="text-sm font-medium text-black">
                            {item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-fit rounded-2xl p-2">
                    <h3 className="mb-4 text-xs tracking-[0.35em] text-black/60 uppercase">
                      Features
                    </h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {section.features.map((feature) => (
                        <div
                          key={feature}
                          className="group flex items-center gap-3 rounded-xl bg-white px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 transition-colors duration-300 group-hover:bg-blue-500">
                            <Sparkles className="h-3.5 w-3.5 text-blue-500 transition-colors duration-300 group-hover:text-white" />
                          </div>

                          <span className="text-sm font-medium text-black/90">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative flex flex-col justify-center gap-6 overflow-hidden rounded-2xl">
                <ViewportRender>
                  <div className="px-6">
                    <InfiniteSlider
                      items={topRow}
                      direction="left"
                      onAssetClick={setActiveAsset}
                    />
                  </div>

                  <div className="px-6">
                    <InfiniteSlider
                      items={bottomRow}
                      direction="right"
                      onAssetClick={setActiveAsset}
                    />
                  </div>
                </ViewportRender>

                {/* CLICK LAYER */}
                {/* <div className="absolute inset-0 z-40 grid grid-cols-2 gap-5 px-6 py-10">
                  {[...topRow, ...bottomRow].map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => setActiveAsset(asset)}
                      className="rounded-[2rem]"
                    />
                  ))}
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeAsset ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-5"
          >
            {/* BACKDROP */}
            <div
              className="absolute inset-0"
              onClick={() => setActiveAsset(null)}
            />

            {/* MODAL CONTAINER */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-[95vw] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050816] shadow-[0_40px_120px_rgba(0,0,0,0.7)] sm:max-w-[90vw] sm:rounded-[2rem] lg:max-w-[75vw] xl:max-w-[65vw]"
            >
              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={() => setActiveAsset(null)}
                className="absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:top-5 sm:right-5 sm:h-12 sm:w-12"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* CONTENT */}
              <div className="relative flex max-h-[90vh] items-center justify-center overflow-hidden bg-transparent p-2 sm:p-4">
                {activeAsset.type === "video" ? (
                  <video
                    key={activeAsset.videoSrc}
                    className="max-h-[90vh] w-auto max-w-full rounded-2xl object-contain"
                    src={activeAsset.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    poster={activeAsset.thumbnail}
                  />
                ) : activeAsset.type === "image" && activeAsset.thumbnail ? (
                  <Image
                    src={activeAsset.thumbnail}
                    alt={activeAsset.title}
                    width={1600}
                    height={1200}
                    className="max-h-[90vh] w-auto max-w-full rounded-2xl object-contain"
                  />
                ) : (
                  <div className="flex w-full items-center justify-center overflow-y-auto p-5 text-center sm:p-8 md:p-10">
                    <div className="max-w-3xl">
                      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-500 text-2xl font-bold text-white sm:h-24 sm:w-24 sm:rounded-[2rem] sm:text-3xl">
                        {activeAsset.fileLabel?.slice(0, 1) || "F"}
                      </div>

                      <h3 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                        {activeAsset.fileLabel || "Document Preview"}
                      </h3>

                      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                        {activeAsset.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
