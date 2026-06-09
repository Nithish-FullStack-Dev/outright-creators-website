"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLoader } from "../providers/LoaderProvider";

export default function PageLoader() {
  const { progress, isComplete } = useLoader();

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
        >
          <div className="text-center">
            <motion.h1
              className="text-6xl font-bold tabular-nums"
              key={Math.floor(progress)}
            >
              {Math.floor(progress)}%
            </motion.h1>

            <div className="mt-6 h-0.5 w-64 overflow-hidden bg-white/20">
              <motion.div
                className="h-full bg-white"
                animate={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
