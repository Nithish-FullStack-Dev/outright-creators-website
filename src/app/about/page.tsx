// src/app/about/page.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";

const textVariant = {
  hidden: {
    y: "100%",
    opacity: 0,
  },

  visible: (delay: number) => ({
    y: "0%",
    opacity: 1,

    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],
      delay,
    },
  }),
};

const About = () => {
  return (
    <div
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{ background: "#f5f3ef" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="flex flex-col text-center text-6xl leading-none font-semibold uppercase sm:text-7xl md:text-8xl">
        <div className="overflow-hidden">
          <motion.span
            custom={0.3}
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="block"
          >
            About
          </motion.span>
        </div>

        <div className="overflow-hidden">
          <motion.span
            custom={0.45}
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="block text-yellow-500"
          >
            Us
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default About;
