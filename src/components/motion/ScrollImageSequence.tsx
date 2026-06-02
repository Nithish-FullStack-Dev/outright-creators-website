"use client";

import { useEffect, useRef } from "react";
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
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const frameRef = useRef({ current: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const revealTweenRef = useRef<gsap.core.Tween | null>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
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

    const currentFrame = (index: number) =>
      `${folder}/frame_${String(index).padStart(4, "0")}.webp`;

    const images: HTMLImageElement[] = new Array(totalFrames);
    const loaded: boolean[] = new Array(totalFrames).fill(false);
    imagesRef.current = images;
    loadedRef.current = loaded;

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
      const i = Math.max(0, Math.min(Math.round(index), totalFrames - 1));
      if (images[i] && loaded[i]) {
        drawImage(images[i]);
        return;
      }
      for (let fallback = i - 1; fallback >= 0; fallback--) {
        if (images[fallback] && loaded[fallback]) {
          drawImage(images[fallback]);
          return;
        }
      }
    };

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (loaded[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          loaded[index] = true;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = currentFrame(index + 1);
        images[index] = img;
      });
    };

    const loadBatch = (start: number, end: number) => {
      const clampedEnd = Math.min(end, totalFrames - 1);
      for (let i = start; i <= clampedEnd; i++) {
        if (!images[i]) {
          loadImage(i);
        }
      }
    };

    const initSequence = () => {
      if (hasInitializedRef.current) return;
      hasInitializedRef.current = true;

      gsap.set(sticky, { yPercent: 10, opacity: 0, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(sticky, {
        yPercent: 0,
        scale: 1,
        duration: 1.4,
        ease: "sine.inOut",
      });

      tl.to(
        sticky,
        {
          opacity: 1,
          duration: 0.6,
          ease: "sine.inOut",
        },
        "<",
      );

      revealTweenRef.current = tl.getChildren()[0] as gsap.core.Tween;

      loadImage(0).then(() => {
        render(0);
      });

      loadBatch(1, 6);

      const frame = frameRef.current;

      const tween = gsap.to(frame, {
        current: totalFrames - 1,
        snap: "current",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.round(self.progress * (totalFrames - 1));
            const bufferStart = Math.max(0, activeIndex - 2);
            const bufferEnd = Math.min(totalFrames - 1, activeIndex + 8);
            loadBatch(bufferStart, bufferEnd);
          },
        },
        onUpdate: () => {
          render(Math.round(frame.current));
        },
      });

      tweenRef.current = tween;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initSequence();
          }
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(section);

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      setCanvasSize();
      render(Math.round(frameRef.current.current));
      ScrollTrigger.refresh();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(document.documentElement);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();

      tweenRef.current?.scrollTrigger?.kill();
      tweenRef.current?.kill();

      revealTweenRef.current?.scrollTrigger?.kill();
      revealTweenRef.current?.kill();

      hasInitializedRef.current = false;
    };
  }, [folder, totalFrames]);

  return (
    <section ref={sectionRef} className={`relative h-[400vh] ${className}`}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black will-change-transform"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
          style={{ display: "block" }}
        />
        {title && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <h2
              className="text-center font-black tracking-[-0.05em] text-white uppercase"
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
