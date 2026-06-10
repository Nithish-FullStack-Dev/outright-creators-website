"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface ImageSource {
  src: string;
  alt: string;
}

interface MenuRevealItemProps {
  text: string;
  num: string;
  id: string;
  images: [ImageSource, ImageSource];
  onClick: () => void;
}

export default function MenuRevealItem({
  text,
  num,
  images,
  onClick,
}: MenuRevealItemProps) {
  const container =
    "absolute right-6 top-1/2 -translate-y-1/2 z-40 h-24 w-20 pointer-events-none";

  const effect =
    "relative overflow-hidden rounded-2xl scale-0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 shadow-2xl";

  return (
    <div className="group relative border-b border-black/8 last:border-b-0">
      <button
        onClick={onClick}
        className="relative flex w-full items-center justify-between overflow-visible py-5"
      >
        <div className="flex items-baseline gap-4">
          <span className="text-[11px] font-medium text-black/25 tabular-nums">
            {num}
          </span>

          <h2 className="text-3xl font-black tracking-tight text-black transition-all duration-500 group-hover:opacity-40 md:text-6xl">
            {text}
          </h2>
        </div>

        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black/30"
          whileHover={{ rotate: 45, scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight size={18} />
        </motion.div>

        {/* IMAGE 1 */}
        <div className={container}>
          <div className={cn(effect, "h-full w-full")}>
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* IMAGE 2 */}
        <div
          className={cn(
            container,
            "translate-x-0 translate-y-0 rotate-0 transition-all delay-100 duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12",
          )}
        >
          <div className={cn(effect, "h-full w-full duration-300")}>
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </button>
    </div>
  );
}
