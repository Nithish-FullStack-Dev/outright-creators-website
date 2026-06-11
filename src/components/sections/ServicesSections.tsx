"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  X,
  Play,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const CARD_W = 380;
const CARD_H = 480;
const GAP = 20;

function useCarousel(total: number) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const startIdxRef = useRef(0);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((p) => Math.max(0, Math.min(total - 1, p + dir)));
    },
    [total],
  );

  const goTo = useCallback(
    (i: number) => {
      setCurrent(Math.max(0, Math.min(total - 1, i)));
    },
    [total],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setDragging(true);
      startXRef.current = e.clientX;
      startIdxRef.current = current;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [current],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const delta = e.clientX - startXRef.current;
      const step = CARD_W + GAP;
      const moved = Math.round(-delta / step);
      const next = Math.max(
        0,
        Math.min(total - 1, startIdxRef.current + moved),
      );
      setCurrent(next);
    },
    [dragging, total],
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  return {
    current,
    go,
    goTo,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    dragging,
  };
}

function CarouselCard({
  asset,
  onClick,
  isActive,
}: {
  asset: ShowcaseItem;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{ scale: isActive ? 1 : 0.93, opacity: isActive ? 1 : 0.6 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group/card relative shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-lg"
      style={{ width: CARD_W, height: CARD_H }}
    >
      {asset.thumbnail && (
        <Image
          src={asset.thumbnail}
          alt="Showcase item"
          fill
          sizes="380px"
          loading="eager"
          className="pointer-events-none object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

      {asset.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/30">
            <Play className="h-6 w-6 translate-x-0.5 text-gray-900" />
          </div>
        </div>
      )}

      {asset.type === "image" && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/30">
            <ZoomIn className="h-5 w-5 text-gray-900" />
          </div>
        </div>
      )}

      {(asset.type === "pdf" || asset.type === "logo") && (
        <div className="absolute top-4 right-4 translate-y-1 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
            <ArrowUpRight className="h-4 w-4 text-gray-700" />
          </div>
        </div>
      )}
    </motion.button>
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
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
                Loading video…
              </p>
            </div>
          )}
          <video
            key={asset.videoSrc}
            className={`aspect-video w-full object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
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
                Loading image…
              </p>
            </div>
          )}
          <Image
            src={asset.thumbnail!}
            alt="Showcase item"
            width={1600}
            height={1200}
            priority
            onLoad={() => setIsLoading(false)}
            className={`block max-h-[80vh] w-auto max-w-[88vw] object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          />
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
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

        <div className="p-8 pt-12">
          {asset.thumbnail && (
            <div className="mb-6 overflow-hidden rounded-xl">
              <Image
                src={asset.thumbnail}
                alt="Showcase item"
                width={600}
                height={400}
                className="w-full object-cover"
              />
            </div>
          )}
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${typeBadgeStyle[asset.type]}`}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(0);

  const items = section.assets;
  const {
    current,
    go,
    goTo,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    dragging,
  } = useCarousel(items.length);

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setViewportW(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const step = CARD_W + GAP;
  const offsetToCenter = viewportW / 2 - CARD_W / 2;
  const trackX = offsetToCenter - current * step;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const canPrev = current > 0;
  const canNext = current < items.length - 1;

  return (
    <section ref={containerRef} className="relative overflow-hidden py-16">
      <div className="relative z-10">
        <div
          className="relative overflow-hidden"
          style={{
            height: CARD_H + 60,
            cursor: dragging ? "grabbing" : "grab",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <motion.div
            ref={trackRef}
            className="absolute top-[30px] flex items-center will-change-transform"
            animate={{ x: trackX }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 36,
              mass: 0.9,
            }}
            style={{ gap: GAP, userSelect: "none" }}
          >
            {items.map((asset, i) => (
              <CarouselCard
                key={asset.id}
                asset={asset}
                isActive={i === current}
                onClick={() => {
                  if (!dragging) setActiveAsset(asset);
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!canPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "h-2 w-6 bg-gray-900"
                    : "h-2 w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={!canNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="mt-5 text-center">
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase tabular-nums">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
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
