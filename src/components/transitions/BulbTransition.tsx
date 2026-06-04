"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function BulbTransition({ active }: { active: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
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

            <div className="absolute h-[350px] w-[350px] rounded-full bg-[#FDC526]/20 blur-[100px]" />

            <div className="relative flex h-[250px] w-[250px] items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                className="relative z-10 h-full w-full drop-shadow-[0_0_20px_rgba(253,197,38,0.8)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                  d="M 36 58 A 21 21 0 1 1 64 58"
                  stroke="#FDC526"
                  strokeWidth="6.5"
                  strokeLinecap="butt"
                />

                {[
                  { x1: 38, y1: 66, x2: 62, y2: 66 },
                  { x1: 38, y1: 73, x2: 62, y2: 73 },
                  { x1: 40, y1: 80, x2: 60, y2: 80 },
                  { x1: 43, y1: 87, x2: 57, y2: 87 },
                ].map((line, i) => (
                  <motion.line
                    key={`base-${i}`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.25, delay: 0.8 + i * 0.15 }}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#FDC526"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                ))}

                {[
                  { x1: 23.7, y1: 33.4, x2: 14.3, y2: 30.0 },
                  { x1: 30.2, y1: 23.2, x2: 23.1, y2: 16.1 },
                  { x1: 40.4, y1: 16.7, x2: 37.0, y2: 7.3 },
                  { x1: 50.0, y1: 15.0, x2: 50.0, y2: 5.0 },
                  { x1: 59.6, y1: 16.7, x2: 63.0, y2: 7.3 },
                  { x1: 69.8, y1: 23.2, x2: 76.9, y2: 16.1 },
                  { x1: 76.3, y1: 33.4, x2: 85.7, y2: 30.0 },
                ].map((ray, i) => (
                  <motion.line
                    key={`ray-${i}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 1.4 + i * 0.08,
                      ease: "easeOut",
                    }}
                    x1={ray.x1}
                    y1={ray.y1}
                    x2={ray.x2}
                    y2={ray.y2}
                    stroke="#FDC526"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
