// components/layout/Footer.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import TextReveal from "../motion/TextReveal";

const navLinks = [
  {
    title: "Navigation",
    links: ["Home", "About", "Services", "Collections"],
  },
  {
    title: "Company",
    links: ["Pricing", "Privacy Policy", "Terms & Conditions", "Contact"],
  },
];

const socials = [
  {
    icon: "/assets/FaceBook.jpg",
    alt: "Facebook",
  },
  {
    icon: "/assets/Instagram.jpg",
    alt: "Instagram",
  },
  {
    icon: "/assets/LinkedIn.jpg",
    alt: "LinkedIn",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // SMOOTH SCROLL ANIMATION LIKE REFERENCE
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.5,
  });

  const titleY = useTransform(smoothProgress, [0, 1], [180, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  const rightY = useTransform(smoothProgress, [0, 1], [120, 0]);
  const gridY = useTransform(smoothProgress, [0, 1], [100, 0]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pt-10 pb-8 sm:px-8 lg:px-12">
        {/* HERO */}
        <div className="flex flex-col gap-14 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}
          <motion.div
            style={{
              y: titleY,
              opacity: titleOpacity,
            }}
            className="max-w-[950px]"
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300 backdrop-blur-xl">
              <Sparkles size={14} />
              Let’s Build Something Extraordinary
            </div>

            <TextReveal
              lines={["Let`s", "Connect"]}
              className="text-2xl leading-[1.1] font-bold sm:text-5xl md:text-8xl"
            ></TextReveal>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            style={{
              y: rightY,
              opacity: titleOpacity,
            }}
            className="w-full max-w-[420px]"
          >
            <p className="mb-8 text-[15px] leading-[1.9] text-white/55 sm:text-[16px]">
              We craft cinematic digital experiences blending design,
              development, branding and strategy to elevate ambitious brands
              worldwide.
            </p>

            <Link
              href="/contact"
              className="group flex h-14 w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 backdrop-blur-xl transition-all duration-500 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              <span className="text-sm font-medium tracking-[0.25em] uppercase">
                Start Project
              </span>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-500 group-hover:bg-black group-hover:text-white">
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* MAIN GRID */}
        <motion.div
          style={{
            y: gridY,
            opacity: gridOpacity,
          }}
          className="grid gap-14 py-16 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] lg:gap-20"
        >
          {/* BRAND */}
          <div>
            <Link href="/" className="relative mb-8 block h-[58px] w-[190px]">
              <Image
                src="/logo.svg"
                alt="Outright Creators"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>

            <p className="max-w-[420px] text-[15px] leading-[2] text-white/50">
              Building modern experiences through strategic branding, immersive
              websites, high-converting visuals and futuristic creative systems.
            </p>

            {/* SOCIALS */}
            <div className="mt-10 flex items-center gap-4">
              {socials.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href="/"
                    className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-yellow-400 hover:bg-yellow-400"
                  >
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={18}
                      height={18}
                      className="h-5 w-5 transition-all duration-500 group-hover:scale-110"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* NAV */}
          {navLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-7 text-sm font-semibold tracking-[0.25em] text-white uppercase">
                {section.title}
              </h3>

              <div className="flex flex-col gap-5">
                {section.links.map((item) => (
                  <Link
                    key={item}
                    href="/"
                    className="group flex w-fit items-center gap-2 text-[15px] text-white/50 transition-all duration-300 hover:text-yellow-300"
                  >
                    <span>{item}</span>

                    <ArrowUpRight
                      size={15}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CONTACT */}
          <div>
            <h3 className="mb-7 text-sm font-semibold tracking-[0.25em] text-white uppercase">
              Contact
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-yellow-300 backdrop-blur-xl">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="mb-1 text-xs tracking-[0.2em] text-white/35 uppercase">
                    Phone
                  </p>

                  <p className="text-[15px] text-white/75">+91 9014844173</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-yellow-300 backdrop-blur-xl">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="mb-1 text-xs tracking-[0.2em] text-white/35 uppercase">
                    Email
                  </p>

                  <p className="text-[15px] break-all text-white/75">
                    info@outrightcreators.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-yellow-300 backdrop-blur-xl">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="mb-1 text-xs tracking-[0.2em] text-white/35 uppercase">
                    Location
                  </p>

                  <p className="text-[15px] leading-relaxed text-white/75">
                    3rd Floor, Medicherla Towers,
                    <br />
                    Madhapur, Hyderabad - 500081
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM */}
        <motion.div
          style={{
            opacity: gridOpacity,
            y: useTransform(smoothProgress, [0, 1], [60, 0]),
          }}
          className="flex flex-col gap-5 border-t border-white/10 pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left"
        >
          <p className="text-sm text-white/35">
            © 2026 Outright Creators. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/35 md:justify-end">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-yellow-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="transition-colors duration-300 hover:text-yellow-300"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/"
              className="transition-colors duration-300 hover:text-yellow-300"
            >
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
