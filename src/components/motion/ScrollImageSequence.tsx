"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  folder: string;
  totalFrames: number;
  title?: string;
  className?: string;
};

export default function ScrollImageSequence({
  folder,
  totalFrames,
  title,
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);

  const currentFrameRef = useRef(1);

  const [isActive, setIsActive] = useState(false);

  // =========================================
  // INTERSECTION OBSERVER
  // =========================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },

      {
        rootMargin: "1500px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // =========================================
  // MAIN ENGINE
  // =========================================

  useEffect(() => {
    if (!isActive) return;

    const section = sectionRef.current;

    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
    });

    if (!ctx) return;

    // =========================================
    // RETINA CANVAS
    // =========================================

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;

      // RESET TRANSFORM FIRST
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // INTERNAL RESOLUTION
      canvas.width = window.innerWidth * dpr;

      canvas.height = window.innerHeight * dpr;

      // VISUAL SIZE
      canvas.style.width = `${window.innerWidth}px`;

      canvas.style.height = `${window.innerHeight}px`;

      // SCALE DRAWING OPERATIONS
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // =========================================
    // FRAME PATH
    // =========================================

    const getFramePath = (index: number) => {
      return `${folder}/frame_${String(index).padStart(4, "0")}.webp`;
    };

    // =========================================
    // LOAD IMAGES
    // =========================================

    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();

      img.src = getFramePath(i);

      images.push(img);
    }

    imagesRef.current = images;

    // =========================================
    // DRAW
    // =========================================

    const drawImageCover = (img: HTMLImageElement) => {
      if (!img.complete) return;

      const canvasWidth = window.innerWidth;

      const canvasHeight = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // IMAGE SIZE
      const imageWidth = img.width;

      const imageHeight = img.height;

      // SCALE TO COVER
      const scale = Math.max(
        canvasWidth / imageWidth,
        canvasHeight / imageHeight,
      );

      // FINAL SIZE
      const scaledWidth = imageWidth * scale;

      const scaledHeight = imageHeight * scale;

      // CENTER POSITION
      const x = (canvasWidth - scaledWidth) / 2;

      const y = (canvasHeight - scaledHeight) / 2;

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    };

    // =========================================
    // INITIAL FRAME
    // =========================================

    images[0].onload = () => {
      drawImageCover(images[0]);
    };

    // =========================================
    // GSAP SCRUB
    // =========================================

    const frameState = {
      frame: 1,
    };

    const animation = gsap.to(frameState, {
      frame: totalFrames,

      snap: "frame",

      ease: "none",

      scrollTrigger: {
        trigger: section,

        start: "top top",

        end: "bottom bottom",

        scrub: 0.15,
      },

      onUpdate: () => {
        const frameIndex = Math.round(frameState.frame);

        if (frameIndex === currentFrameRef.current) return;

        currentFrameRef.current = frameIndex;

        const img = imagesRef.current[frameIndex - 1];

        if (!img) return;

        drawImageCover(img);
      },
    });

    // =========================================
    // RESIZE
    // =========================================

    const handleResize = () => {
      setCanvasSize();

      const currentImage = imagesRef.current[currentFrameRef.current - 1];

      if (currentImage) {
        drawImageCover(currentImage);
      }

      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      animation.kill();

      window.removeEventListener("resize", handleResize);

      // DESTROY IMAGES
      imagesRef.current = [];
    };
  }, [isActive, folder, totalFrames]);

  return (
    <section ref={sectionRef} className={`relative h-[400vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {title && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <h2
              className="text-center font-black tracking-tighter text-white uppercase"
              style={{
                fontSize: "clamp(4rem, 10vw, 10rem)",
                lineHeight: 0.9,
              }}
            >
              {title}
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
