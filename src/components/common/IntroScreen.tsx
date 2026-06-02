"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

// Updated to reflect your actual in-house services
const words = ["Motion", "Graphics", "Branding", "Social Media"];

const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: {
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      className="fixed inset-0 z-[99999] overflow-hidden bg-[#14050f]"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/20 blur-[140px]"
        />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-300/10"
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-200/10"
        />
      </div>

      {/* PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              y: [-20, -120],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.12,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-yellow-300"
            style={{
              left: `${(i * 4.2) % 100}%`,
              bottom: "-20px",
            }}
          />
        ))}
      </div>

      <div className="relative flex h-full w-full items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          {/* BULB GLOW & LOGO */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative"
          >
            {/* outer glow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-yellow-300/30 blur-[60px]"
            />

            {/* rotating ring */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[-20px] rounded-full border border-dashed border-yellow-300/20"
            />

            {/* logo */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Image
                src="/logo.webp"
                alt="Outright Creators"
                width={280}
                height={180}
                loading="eager"
                className="h-auto w-[180px] drop-shadow-[0_0_45px_rgba(255,215,0,0.7)] sm:w-[240px] md:w-[320px]"
              />
            </motion.div>
          </motion.div>

          {/* DIVIDER LINE */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.3, // Sped up the delay slightly since the H1 is gone
              ease: [0.76, 0, 0.24, 1],
            }}
            className="mt-12 h-px w-[220px] origin-center bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
          />

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6, // Adjusted timing for better flow
            }}
            className="mt-8 max-w-[700px] text-sm tracking-[0.35em] text-yellow-100/60 uppercase md:text-base"
          >
            Creative • Digital • Innovation
          </motion.p>

          {/* ANIMATED SERVICE WORDS */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {words.map((word, i) => (
              <motion.div
                key={word}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + i * 0.15, // Smooth cascade reveal
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="relative overflow-hidden rounded-full border border-yellow-300/20 bg-white/5 px-6 py-2.5 backdrop-blur-xl"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-[40%] skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                <span className="relative text-sm font-medium tracking-[0.15em] text-yellow-100 uppercase md:text-base">
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          {/* LOADING BAR */}
          <div className="mt-14 h-[4px] w-[260px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-1/2 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 shadow-[0_0_20px_rgba(255,215,0,0.9)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroScreen;
