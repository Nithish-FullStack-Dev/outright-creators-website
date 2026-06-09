"use client";

import { ArrowUpRight, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { usePageTransition } from "../transitions/TransitionProvider";

const navItems = [
  { label: "Motion Graphic", id: "motion-graphic", num: "01" },
  { label: "Graphic Design", id: "graphic-design", num: "02" },
  { label: "Branding", id: "branding", num: "03" },
  { label: "Social Media", id: "social-media", num: "04" },
];

const menuVariants = {
  closed: {
    clipPath: "inset(0% 0% 0% 100%)",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      when: "afterChildren",
    },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 40 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const overlayVariants = {
  closed: { opacity: 0, transition: { duration: 0.5, delay: 0.2 } },
  open: { opacity: 1, transition: { duration: 0.4 } },
};

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { navigate } = usePageTransition();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: scrolled ? 12 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed top-0 left-0 z-50 w-full"
      >
        <div className="mx-auto flex h-18 max-w-350 items-center justify-end px-5 md:px-10">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-lg shadow-black/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Toggle menu"
          >
            <div className="flex w-5 flex-col items-center justify-center gap-1.25">
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: 45, y: 7.5, width: "20px" }
                    : { rotate: 0, y: 0, width: "20px" }
                }
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="block h-[1.5px] origin-center rounded-full bg-white"
                style={{ width: "20px" }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, x: 8 }
                    : { opacity: 1, x: 0, width: "14px" }
                }
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block h-[1.5px] self-start rounded-full bg-white"
                style={{ width: "14px" }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: -45, y: -7.5, width: "20px" }
                    : { rotate: 0, y: 0, width: "20px" }
                }
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="block h-[1.5px] origin-center rounded-full bg-white"
                style={{ width: "20px" }}
              />
            </div>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            <motion.div
              key="panel"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 z-50 flex h-full w-full flex-col overflow-hidden bg-white md:w-[40%]"
            >
              <div className="flex h-18 items-center justify-between border-b border-black/5 px-8">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-black/30 uppercase">
                  Navigation
                </span>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close menu"
                >
                  <X size={16} strokeWidth={2} />
                </motion.button>
              </div>

              <nav className="flex flex-1 flex-col px-8 pt-10">
                {navItems.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="group border-b border-black/8 last:border-b-0"
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);

                        const element = document.getElementById(item.id);

                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                      className="flex w-full items-center justify-between py-7"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-[11px] font-medium text-black/25 tabular-nums">
                          {item.num}
                        </span>
                        <span className="text-[36px] font-bold tracking-tight text-black transition-colors duration-300 group-hover:text-black/40 md:text-[42px]">
                          {item.label}
                        </span>
                      </div>
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/30"
                        whileHover={{ rotate: 45, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight size={16} />
                      </motion.div>
                    </button>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                variants={itemVariants}
                className="border-t border-black/5 px-8 pt-6 pb-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold tracking-[0.15em] text-black/30 uppercase">
                      Get in touch
                    </span>
                    <span className="text-[15px] font-semibold text-black">
                      info@outrightcreators.com
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);

                      document.getElementById("contact-form")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="group flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white transition-all duration-300 hover:bg-black/80"
                  >
                    <span className="text-[13px] font-semibold">
                      Talk to us
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
