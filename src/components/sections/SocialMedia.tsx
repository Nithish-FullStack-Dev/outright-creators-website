"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollVideoSection from "../motion/ScrollVideoSection";
import { services } from "../data/service";
import TextReveal from "../motion/TextReveal";
import PremiumServiceSections from "./ServicesSections";

const ease = [0.16, 1, 0.3, 1] as const;

const SlideIn = ({
  children,
  delay = 0,
  from = "left",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "left" | "right";
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: from === "left" ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.85, delay, ease }}
    viewport={{ once: true, margin: "-60px" }}
    className={className}
  >
    {children}
  </motion.div>
);

const platforms = [
  {
    name: "Instagram",
    handle: "@brand",
    reach: "2.4M",
    growth: "+34%",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Company",
    reach: "890K",
    growth: "+51%",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@brand",
    reach: "5.1M",
    growth: "+128%",
    color: "#010101",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    handle: "@brand",
    reach: "1.2M",
    growth: "+22%",
    color: "#14171A",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const offerings = [
  {
    num: "01",
    title: "Content Strategy",
    desc: "Data-backed editorial calendars built around your audience's peak engagement windows, search intent, and seasonal trends.",
    tags: ["Calendar Planning", "Trend Research", "Content Pillars"],
  },
  {
    num: "02",
    title: "Creative Production",
    desc: "Scroll-stopping visuals, Reels, carousels, and short-form video — designed to fit natively inside each platform's aesthetic.",
    tags: ["Video Editing", "Graphic Design", "Copywriting"],
  },
  {
    num: "03",
    title: "Community Management",
    desc: "Real humans responding in your brand voice — 24/7 DM handling, comment moderation, and reputation monitoring.",
    tags: ["DM Response", "Comment Moderation", "Crisis Management"],
  },
  {
    num: "04",
    title: "Paid Social",
    desc: "Meta, TikTok, and LinkedIn ad campaigns optimised daily using creative rotation, audience split-testing, and attribution modeling.",
    tags: ["Meta Ads", "TikTok Ads", "LinkedIn Ads"],
  },
  {
    num: "05",
    title: "Influencer Partnerships",
    desc: "Vetted creator networks matched by niche, audience quality, and genuine engagement — not just follower count.",
    tags: ["UGC", "Nano-Influencers", "Whitelisting"],
  },
  {
    num: "06",
    title: "Analytics & Reporting",
    desc: "Monthly performance deep-dives: reach, saves, CPM, ROAS, and sentiment — all tied back to revenue impact.",
    tags: ["Monthly Reports", "ROI Tracking", "Competitor Benchmarking"],
  },
];

const metrics = [
  { value: "340%", label: "Avg. Organic Reach Increase" },
  { value: "48hr", label: "Content Turnaround" },
  { value: "4.8×", label: "Average ROAS on Paid Social" },
  { value: "60+", label: "Active Brand Accounts" },
];

const testimonial = {
  quote:
    "Within 90 days our TikTok went from zero to 200K followers and our DMs became our top lead source. The team genuinely understands culture.",
  author: "Sofia Reyes",
  role: "CMO, Vitale Skincare",
};

const SocialMedia = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32"
      style={{ background: "#f5f3ef" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-black/10"
            style={{ top: `${i * 7.5}%` }}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[#7c3aed] opacity-[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/4 rounded-full bg-[#06b6d4] opacity-[0.05] blur-[100px]" />

      <div className="container">
        {/* HERO */}
        <div className="mb-24 grid gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SlideIn delay={0}>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-black/20" />
                <img src="/assets/bulb.svg" alt="Bulb" className="h-6 w-6" />

                <span className="text-[10px] font-semibold tracking-[0.35em] text-black/50 uppercase">
                  Social Media Marketing
                </span>
              </div>
            </SlideIn>

            <div style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}>
              <span className="block leading-[0.9] font-black tracking-[-0.05em] text-black uppercase">
                Create
              </span>

              <span className="block leading-[0.9] font-black tracking-[-0.05em] text-black/30 uppercase">
                Content
              </span>

              <span className="block leading-[0.9] font-black tracking-[-0.05em] text-black uppercase">
                That Connects.
              </span>
            </div>
          </div>

          <SlideIn
            from="right"
            delay={0.3}
            className="flex flex-col justify-end pb-2"
          >
            <p className="max-w-xs text-sm leading-relaxed text-black/60">
              We create platform-ready social media content including feed
              posts, stories, reels, carousel creatives, and ad campaigns
              designed to boost engagement, maintain brand consistency, and
              scale digital presence across every major platform.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                "Feed Posts",
                "Carousel Creatives",
                "Story Designs",
                "Ad Campaigns",
                "Festival Creatives",
                "Reels Content",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-medium text-black/60 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </div>
      <PremiumServiceSections
        key={services[2].id}
        section={services[2]}
        index={services[2].index}
      />
    </section>
  );
};

export default SocialMedia;
