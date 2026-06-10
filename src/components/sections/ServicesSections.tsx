"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, X, Play, ZoomIn } from "lucide-react";
import { ServiceSection, ShowcaseItem } from "../data/service";

const typeLabel: Record<ShowcaseItem["type"], string> = {
  video: "Video",
  image: "Image",
  pdf: "PDF",
  logo: "Brand Asset",
};

const typeBadgeStyle: Record<ShowcaseItem["type"], string> = {
  video: "bg-rose-50 text-rose-600 border-rose-100",
  image: "bg-sky-50 text-sky-600 border-sky-100",
  pdf: "bg-amber-50 text-amber-600 border-amber-100",
  logo: "bg-violet-50 text-violet-600 border-violet-100",
};

export function InfiniteSlider({
  items,
  direction = "left",
  onAssetClick,
}: {
  items: ShowcaseItem[];
  direction?: "left" | "right";
  onAssetClick: (asset: ShowcaseItem) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isPageVisibleRef = useRef(true);
  const singleWidthRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, { amount: 0.1, once: false });
  const doubled = [...items, ...items];

  const applyTransform = useCallback((x: number) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        singleWidthRef.current = trackRef.current.scrollWidth / 2;
        posRef.current = direction === "left" ? 0 : -singleWidthRef.current;
        applyTransform(posRef.current);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, direction, applyTransform]);

  useEffect(() => {
    const onVisibility = () => {
      isPageVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    let lastTime: number | null = null;
    const SPEED = 0.04;

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      if (!isInView || !isPageVisibleRef.current) {
        lastTime = null;
        return;
      }

      if (lastTime === null) {
        lastTime = now;
        return;
      }

      const delta = Math.min(now - lastTime, 50);
      lastTime = now;

      const w = singleWidthRef.current;
      if (w === 0) return;

      if (direction === "left") {
        posRef.current -= SPEED * delta;
        if (posRef.current <= -w) posRef.current += w;
      } else {
        posRef.current += SPEED * delta;
        if (posRef.current >= 0) posRef.current -= w;
      }

      applyTransform(posRef.current);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, isInView, applyTransform]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max gap-4 will-change-transform"
        style={{ userSelect: "none" }}
      >
        {doubled.map((asset, index) => (
          <button
            key={`${asset.id}-${index}`}
            type="button"
            onClick={() => {
              onAssetClick(asset);
            }}
            className="group/card relative h-80 w-80 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            {asset.thumbnail && (
              <Image
                src={asset.thumbnail}
                alt={asset.title ?? "Showcase item"}
                width={512}
                height={512}
                loading="eager"
                sizes="320px"
                className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
            )}

            {asset.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/40">
                  <Play className="h-5 w-5 translate-x-0.5 text-gray-900" />
                </div>
              </div>
            )}

            {asset.type === "image" && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/40">
                  <ZoomIn className="h-5 w-5 text-gray-900" />
                </div>
              </div>
            )}

            {(asset.type === "pdf" || asset.type === "logo") && (
              <div className="absolute top-3 right-3 translate-y-1 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                  <ArrowUpRight className="h-4 w-4 text-gray-700" />
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute right-0 bottom-0 left-0 p-4">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-widest uppercase ${typeBadgeStyle[asset.type]}`}
              >
                {typeLabel[asset.type]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function VideoDialog({
  asset,
  onClose,
}: {
  asset: ShowcaseItem;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />

              <p className="mt-4 text-sm font-medium text-white/80">
                Loading video, please wait...
              </p>
            </div>
          )}

          <video
            key={asset.videoSrc}
            className={`aspect-video w-full object-contain transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            src={asset.videoSrc}
            autoPlay
            loop
            playsInline
            controls
            preload="auto"
            poster={asset.thumbnail}
            onLoadedData={() => setIsLoading(false)}
          />
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <p className="text-sm font-semibold text-white">
            {asset.title ?? "Showcase item"}
          </p>

          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-widest uppercase ${typeBadgeStyle[asset.type]}`}
          >
            {typeLabel[asset.type]}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ImageDialog({
  asset,
  onClose,
}: {
  asset: ShowcaseItem;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] max-w-[90vw] flex-col"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />

              <p className="mt-4 text-sm font-medium text-white/80">
                Loading image, please wait...
              </p>
            </div>
          )}

          <Image
            src={asset.thumbnail!}
            alt={asset.title ?? "Showcase item"}
            width={1600}
            height={1200}
            priority
            onLoad={() => setIsLoading(false)}
            className={`block max-h-[80vh] w-auto max-w-[88vw] object-contain transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <p className="text-sm font-semibold text-white">{asset.title}</p>

          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-widest uppercase ${typeBadgeStyle[asset.type]}`}
          >
            {typeLabel[asset.type]}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FallbackDialog({
  asset,
  onClose,
}: {
  asset: ShowcaseItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-500 to-violet-500 text-2xl font-bold text-white shadow-lg">
            {asset.fileLabel?.slice(0, 1) ?? "F"}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {asset.fileLabel ?? "Document Preview"}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
            {asset.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <p className="text-sm font-semibold text-gray-900">{asset.title}</p>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-widest uppercase ${typeBadgeStyle[asset.type]}`}
          >
            {typeLabel[asset.type]}
          </span>
        </div>
      </motion.div>
    </motion.div>
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

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-5 text-white"
    >
      {section.labelImage && (
        <motion.div
          style={{ y: imageY }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.06]"
        >
          <img
            src={section.labelImage}
            alt=""
            width={500}
            height={500}
            loading="eager"
            className="h-80 w-80 object-contain sm:h-96 sm:w-96 lg:h-112 lg:w-md"
          />
        </motion.div>
      )}

      <div className="relative z-10 container">
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.06,
          }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/60"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative border-b border-gray-100 p-6 sm:p-8 lg:border-r lg:border-b-0">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                  {section.labelImage ? (
                    <Image
                      src={section.labelImage}
                      alt={section.label}
                      width={40}
                      height={40}
                      className="h-7 w-7 object-contain"
                    />
                  ) : (
                    <span className="text-sm font-bold text-gray-700">
                      {section.label.slice(0, 1)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                  {section.label}
                </span>
              </div>

              <h2 className="text-2xl leading-tight font-bold tracking-tight text-gray-900 md:text-3xl">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {section.description}
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">
                    Tools & Technology
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {section.tech.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 px-3 py-2.5 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="h-5 w-5 object-contain"
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div>
                  <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">
                    Features
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {section.features.map((feature) => (
                      <div
                        key={feature}
                        className="group flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2.5 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/50"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 group-hover:bg-blue-500">
                          <Sparkles className="h-3 w-3 text-blue-500 transition-colors duration-200 group-hover:text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-5 overflow-hidden bg-gray-50/50 py-8">
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
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeAsset?.type === "video" && (
          <VideoDialog
            key="video-dialog"
            asset={activeAsset}
            onClose={() => setActiveAsset(null)}
          />
        )}
        {activeAsset?.type === "image" && (
          <ImageDialog
            key="image-dialog"
            asset={activeAsset}
            onClose={() => setActiveAsset(null)}
          />
        )}
        {activeAsset &&
          activeAsset.type !== "video" &&
          activeAsset.type !== "image" && (
            <FallbackDialog
              key="fallback-dialog"
              asset={activeAsset}
              onClose={() => setActiveAsset(null)}
            />
          )}
      </AnimatePresence>
    </section>
  );
}
