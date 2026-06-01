"use client";

import { JSX, useEffect, useRef, useState } from "react";

interface Stat {
  number: string;
  raw: number;
  suffix: string;
  description: string;
}

const stats: Stat[] = [
  {
    number: "60+",
    raw: 60,
    suffix: "+",
    description:
      "creative professionals delivering scalable graphic design, branding, motion graphics, and digital content solutions",
  },

  {
    number: "1000+",
    raw: 1000,
    suffix: "+",
    description:
      "projects successfully delivered across social media, branding, motion graphics, AI videos, and digital campaigns",
  },

  {
    number: "2020",
    raw: 2020,
    suffix: "",
    description:
      "established in Hyderabad with a vision to help brands grow through strategic and high-quality creative production",
  },
];

function useCountUp(
  target: number,
  duration: number = 1800,
  shouldStart: boolean = false,
): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(
        (timestamp - (startTime as number)) / duration,
        1,
      );
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, shouldStart]);

  return count;
}

interface StatItemProps {
  item: Stat;
  index: number;
  isVisible: boolean;
}

function StatItem({ item, index, isVisible }: StatItemProps): JSX.Element {
  const count = useCountUp(item.raw, 1600 + index * 100, isVisible);

  return (
    <div
      className="stat-item"
      style={{
        display: "flex",
        flexDirection: "column",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.18}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.18}s`,
      }}
    >
      <div style={{ overflow: "hidden", paddingBottom: "0.5rem" }}>
        <div
          style={{
            fontSize: "clamp(4rem, 10vw, 8rem)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "black",
            fontFamily: "var(--font-sans)",
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            transition: `transform 1s cubic-bezier(0.22,1,0.36,1) ${0.4 + index * 0.18}s`,
          }}
        >
          {isVisible ? `${count}${item.suffix}` : item.number}
        </div>
      </div>

      <div
        style={{
          height: "1px",
          background: "black",
          transformOrigin: "left",
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 0.85s cubic-bezier(0.83,0,0.17,1) ${index * 0.18}s`,
        }}
      />

      <div style={{ overflow: "hidden", paddingTop: "1.5rem" }}>
        <p
          style={{
            fontSize: "clamp(1.1rem, 2.2vw, 1.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "black",
            maxWidth: "420px",
            margin: 0,
            transform: isVisible ? "translateY(0)" : "translateY(-100%)",
            transition: `transform 1s cubic-bezier(0.22,1,0.36,1) ${0.45 + index * 0.18}s`,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "5rem 0",
        background: "#f5f3ef",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "4rem 3rem",
          }}
        >
          {stats.map((item, i) => (
            <StatItem key={i} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
