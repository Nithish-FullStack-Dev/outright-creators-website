// components/transitions/BulbTransition.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function BulbTransition({ active }: { active: boolean }) {
  // Exactly 6 lines, perfectly spaced out
  const rays = [-65, -39, -13, 13, 39, 65];

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          // Root wrapper stays fixed and clips the screen during movement
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* THE SOLID CURTAIN PANEL */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.6, // Slightly punchier drop
              ease: [0.76, 0, 0.24, 1], // Ultra-premium, Apple-style smooth ease
            }}
            className="absolute inset-0 flex items-center justify-center bg-[#050505] backdrop-blur-md"
          >
            {/* VIGNETTE BORDER */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)]" />

            {/* AMBIENT GLOW */}
            <div className="absolute h-[350px] w-[350px] rounded-full bg-[#FFD54F]/20 blur-[100px]" />

            {/* BULB & RAYS CONTAINER */}
            <div className="relative h-[220px] w-[180px]">
              {/* SHOOTING LINES ORIGIN */}
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
                        y: [-75, -240], // Shoots slightly further out
                        opacity: [0, 1, 0],
                        scaleY: [0.5, 2, 0.5], // More dynamic stretch
                      }}
                      transition={{
                        duration: 0.9, // Slightly slower shooting lines as you requested
                        delay: 0.45 + i * 0.06, // Cascades smoothly just as the panel settles
                        ease: [0.21, 0.47, 0.32, 0.98], // Premium custom ease-out
                      }}
                    >
                      <div className="-ml-[3px] h-[45px] w-[6px] rounded-full bg-[#FFD54F] shadow-[0_0_20px_#FFD54F]" />
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* BULB SVG */}
              <svg
                width="180"
                height="220"
                viewBox="0 0 100 130"
                fill="none"
                className="relative z-10 drop-shadow-[0_0_25px_rgba(255,213,79,0.8)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main Bulb Arc */}
                <path
                  d="M28,90 C8,70 8,25 50,25 C92,25 92,70 72,90"
                  stroke="#FFD54F"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Thread/Base Lines */}
                <line
                  x1="35"
                  y1="104"
                  x2="65"
                  y2="104"
                  stroke="#FFD54F"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <line
                  x1="38"
                  y1="117"
                  x2="62"
                  y2="117"
                  stroke="#FFD54F"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <line
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
