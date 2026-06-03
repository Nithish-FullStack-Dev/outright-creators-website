"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function BulbTransition({ active }: { active: boolean }) {
  const rays = [-65, -39, -13, 13, 39, 65];

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 flex items-center justify-center bg-[#050505] backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)]" />

            <div className="absolute h-[350px] w-[350px] rounded-full bg-[#FFD54F]/20 blur-[100px]" />

            <div className="relative h-[220px] w-[180px]">
              <div className="absolute top-[75px] left-1/2 z-0">
                {rays.map((angle, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <motion.div
                      initial={{ y: -75, opacity: 0, scaleY: 0.5 }}
                      animate={{
                        y: [-75, -240],
                        opacity: [0, 1, 0],
                        scaleY: [0.5, 2, 0.5],
                      }}
                      transition={{
                        duration: 0.9,
                        delay: 1.8 + i * 0.06,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                    >
                      <div className="-ml-[3px] h-[45px] w-[6px] rounded-full bg-[#FFD54F] shadow-[0_0_20px_#FFD54F]" />
                    </motion.div>
                  </div>
                ))}
              </div>

              <svg
                width="180"
                height="220"
                viewBox="0 0 100 130"
                fill="none"
                className="relative z-10 drop-shadow-[0_0_25px_rgba(255,213,79,0.8)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.1, ease: "easeInOut" }}
                  d="M28,90 C8,70 8,25 50,25 C92,25 92,70 72,90"
                  stroke="#FFD54F"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, delay: 0.4 }}
                  x1="35"
                  y1="104"
                  x2="65"
                  y2="104"
                  stroke="#FFD54F"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, delay: 0.65 }}
                  x1="38"
                  y1="117"
                  x2="62"
                  y2="117"
                  stroke="#FFD54F"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, delay: 0.9 }}
                  x1="44"
                  y1="130"
                  x2="56"
                  y2="130"
                  stroke="#FFD54F"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
