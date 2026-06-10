"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "../providers/LoaderProvider";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  desktopFolder: string;
  mobileFolder: string;

  desktopFrames: number;
  mobileFrames: number;

  title?: string;
  className?: string;
};

export default function ScrollImageSmall({
  desktopFolder,
  mobileFolder,
  desktopFrames,
  mobileFrames,
  title,
  className = "",
}: Props) {
  const { addAssets, assetLoaded } = useLoader();

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });

  const [isReady, setIsReady] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const activeFolder = isMobile ? mobileFolder : desktopFolder;

  const totalFrames = isMobile ? mobileFrames : desktopFrames;

  useEffect(() => {
    addAssets(totalFrames);

    const preloadImages = async () => {
      const images: HTMLImageElement[] = [];

      const promises = Array.from({ length: totalFrames }, (_, i) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();

          img.src = `${activeFolder}/frame_${String(i + 1).padStart(
            4,
            "0",
          )}.webp`;

          img.onload = () => {
            assetLoaded();
            resolve();
          };

          img.onerror = () => {
            console.error("Failed:", img.src);
            reject();
          };

          images.push(img);
        });
      });

      await Promise.all(promises);

      imagesRef.current = images;

      setIsReady(true);
    };

    preloadImages();
  }, [activeFolder, totalFrames]);

  useEffect(() => {
    if (!isReady) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;

    if (!section || !canvas || !sticky) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const drawImage = (img: HTMLImageElement) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);

      const sw = img.naturalWidth * scale;
      const sh = img.naturalHeight * scale;

      const sx = (w - sw) / 2;
      const sy = (h - sh) / 2;

      ctx.drawImage(img, sx, sy, sw, sh);
    };

    const render = (index: number) => {
      const images = imagesRef.current;

      const i = Math.max(0, Math.min(index, totalFrames - 1));

      drawImage(images[i]);
    };

    render(0);

    const tween = gsap.to(frameRef.current, {
      current: totalFrames - 1,
      snap: "current",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      onUpdate: () => {
        render(Math.round(frameRef.current.current));
      },
    });

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      setCanvasSize();

      render(Math.round(frameRef.current.current));

      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();

      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, totalFrames]);

  return (
    <section
      ref={sectionRef}
      className={`relative h-[200vh] overflow-x-clip ${className}`}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-dvh w-full overflow-hidden bg-white"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
        />

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
