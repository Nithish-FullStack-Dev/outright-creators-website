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

export default function ScrollImageSequence({
  desktopFolder,
  mobileFolder,
  desktopFrames,
  mobileFrames,
  title,
  className = "",
}: Props) {
  const { addAssets, assetLoaded } = useLoader();
  const introTextRef = useRef<HTMLDivElement | null>(null);
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

      canvas.width = Math.ceil(w * dpr);
      canvas.height = Math.ceil(h * dpr);

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const drawImage = (img: HTMLImageElement) => {
      const w = window.innerWidth;

      const h = window.visualViewport?.height || window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const imageAspect = img.naturalWidth / img.naturalHeight;

      const canvasAspect = w / h;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      // portrait/mobile handling
      if (imageAspect > canvasAspect) {
        drawHeight = h;
        drawWidth = h * imageAspect;

        offsetX = (w - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = w;
        drawHeight = w / imageAspect;

        offsetX = 0;
        offsetY = (h - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const render = (index: number) => {
      const images = imagesRef.current;

      const i = Math.max(0, Math.min(index, totalFrames - 1));

      drawImage(images[i]);
    };

    render(0);

    gsap.to(".scroll-dot", {
      y: 16,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    if (introTextRef.current) {
      gsap.fromTo(
        introTextRef.current,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: -250,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=30%",
            scrub: true,
            onUpdate: (self) => {
              gsap.set(introTextRef.current, {
                filter: `blur(${self.progress * 8}px)`,
              });
            },
          },
        },
      );
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleResize();
      });
    });

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
      className={`relative h-[400vh] overflow-x-clip ${className}`}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-dvh w-full overflow-hidden bg-white"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
        />

        <div
          ref={introTextRef}
          className="pointer-events-none absolute right-0 bottom-15 left-0 flex items-center justify-center"
        >
          <div className="text-center">
            <p className="mb-4 text-sm tracking-[0.3em] text-black/80 uppercase">
              Creative Agency
            </p>

            <p className="mt-6 text-3xl text-[#4f033e]">
              We build immersive digital experiences
            </p>

            <div className="mt-10 flex flex-col items-center">
              <span className="mb-3 text-xs tracking-[0.25em] text-black/50 uppercase">
                Scroll
              </span>

              <div className="flex h-12 w-7 justify-center rounded-full border border-black/30">
                <div className="scroll-dot mt-2 h-2 w-2 rounded-full bg-black/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
