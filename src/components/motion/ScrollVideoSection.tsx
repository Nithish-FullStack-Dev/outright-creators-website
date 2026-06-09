"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  video: string;
  title: string;
};

export default function ScrollVideoSection({ video, title }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    const video = videoRef.current;

    const overlay = overlayRef.current;

    const title = titleRef.current;

    if (!section || !video || !overlay || !title) return;

    const ctx = gsap.context(() => {
      const onLoaded = () => {
        // VIDEO SCRUB
        gsap.to(video, {
          currentTime: video.duration,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "bottom bottom",

            scrub: 1,
          },
        });

        // OVERLAY FADE
        gsap.to(overlay, {
          opacity: 0,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "30% top",

            scrub: true,
          },
        });

        // TITLE MOVE
        gsap.to(title, {
          yPercent: -150,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "bottom bottom",

            scrub: true,
          },
        });
      };

      // IMPORTANT
      // wait for metadata before scrub

      if (video.readyState >= 1) {
        onLoaded();
      } else {
        video.addEventListener("loadedmetadata", onLoaded);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      {/* STICKY VIDEO */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/40" />

        {/* TITLE */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <h2
            ref={titleRef}
            className="text-center font-black tracking-tighter text-white uppercase"
            style={{
              fontSize: "clamp(4rem, 10vw, 10rem)",
              lineHeight: 0.9,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
}
