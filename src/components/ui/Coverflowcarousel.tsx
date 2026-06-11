"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

interface CoverflowCarouselProps {
  items: MediaItem[];
  slideWidth?: number;
  slideHeight?: number;
  gap?: number;
  borderRadius?: number;
  perspective?: number;
  rotateY?: number;
  depth?: number;
  activeScale?: number;
  inactiveScale?: number;
  inactiveOpacity?: number;
  snapDuration?: number;
  snapEase?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const FALLBACK_ITEMS: MediaItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  },
];

export default function CoverflowCarousel({
  items,
  slideWidth = 320,
  slideHeight = 400,
  gap = 20,
  borderRadius = 12,
  perspective = 1000,
  rotateY = 45,
  depth = 150,
  activeScale = 1,
  inactiveScale = 0.85,
  inactiveOpacity = 0.5,
  snapDuration = 0.6,
  snapEase = "power3.out",
  showArrows = true,
  showDots = true,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
}: CoverflowCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackX = useRef(0);
  const indexRef = useRef(0);
  const drag = useRef({
    active: false,
    startX: 0,
    startTrackX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogItem, setDialogItem] = useState<MediaItem | null>(null);

  const slides = items?.length > 0 ? items : FALLBACK_ITEMS;
  const count = slides.length;
  const step = slideWidth + gap;

  const centerXFor = useCallback(
    (i: number) => {
      const el = containerRef.current;
      if (!el) return -i * step;
      return el.offsetWidth / 2 - i * step - slideWidth / 2;
    },
    [step, slideWidth],
  );

  const render = useCallback(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    track.style.transform = `translateX(${trackX.current}px)`;
    const center = el.offsetWidth / 2;

    slidesRef.current.forEach((slide, i) => {
      if (!slide) return;
      const slideCenter = i * step + slideWidth / 2 + trackX.current;
      const norm = (slideCenter - center) / step;
      const abs = Math.abs(norm);
      const ry = norm * rotateY;
      const tz = -abs * depth;
      const sc = Math.max(
        inactiveScale,
        activeScale - abs * (activeScale - inactiveScale),
      );
      const op = Math.max(inactiveOpacity, 1 - abs * (1 - inactiveOpacity));

      slide.style.transform = `perspective(${perspective}px) rotateY(${ry}deg) translateZ(${tz}px) scale(${sc})`;
      slide.style.opacity = `${op}`;
      slide.style.zIndex = `${100 - Math.round(abs * 10)}`;
    });
  }, [
    step,
    slideWidth,
    rotateY,
    depth,
    activeScale,
    inactiveScale,
    inactiveOpacity,
    perspective,
  ]);

  const snapTo = useCallback(
    (i: number, instant = false) => {
      const target = loop
        ? ((i % count) + count) % count
        : Math.max(0, Math.min(count - 1, i));
      const x = centerXFor(target);

      if (instant) {
        trackX.current = x;
        render();
        indexRef.current = target;
        setActiveIndex(target);
        return;
      }

      indexRef.current = target;
      setActiveIndex(target);
      gsap.killTweensOf(trackX);
      gsap.to(trackX, {
        current: x,
        duration: snapDuration,
        ease: snapEase,
        onUpdate: render,
      });
    },
    [centerXFor, count, loop, snapDuration, snapEase, render],
  );

  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, count);
    snapTo(0, true);
  }, [count, slideWidth, gap]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onStart = (e: MouseEvent | TouchEvent) => {
      gsap.killTweensOf(trackX);
      drag.current.active = true;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      drag.current.startX = x;
      drag.current.startTrackX = trackX.current;
      drag.current.lastX = x;
      drag.current.lastTime = Date.now();
      drag.current.velocity = 0;
      container.style.cursor = "grabbing";
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!drag.current.active) return;
      if (e.cancelable) e.preventDefault();
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const now = Date.now();
      const dt = now - drag.current.lastTime;
      if (dt > 0)
        drag.current.velocity = ((x - drag.current.lastX) / dt) * 1000;
      drag.current.lastX = x;
      drag.current.lastTime = now;
      trackX.current = drag.current.startTrackX + (x - drag.current.startX);
      render();
    };

    const onEnd = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      container.style.cursor = "grab";

      const projected = trackX.current + drag.current.velocity * 0.12;
      const center = container.offsetWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      for (let i = 0; i < count; i++) {
        const sc = i * step + slideWidth / 2 + projected;
        const d = Math.abs(sc - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      snapTo(best);
    };

    container.addEventListener("mousedown", onStart as EventListener);
    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("mouseup", onEnd);
    container.addEventListener("touchstart", onStart as EventListener, {
      passive: true,
    });
    window.addEventListener("touchmove", onMove as EventListener, {
      passive: false,
    });
    window.addEventListener("touchend", onEnd);

    return () => {
      container.removeEventListener("mousedown", onStart as EventListener);
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("mouseup", onEnd);
      container.removeEventListener("touchstart", onStart as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend", onEnd);
    };
  }, [count, step, slideWidth, render, snapTo]);

  useEffect(() => {
    if (!autoplay || count <= 1) return;

    const tick = () => {
      const next = indexRef.current + 1;
      if (!loop && next >= count) snapTo(0);
      else snapTo(next);
    };

    const start = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(tick, autoplayDelay);
    };

    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    start();
    const container = containerRef.current;
    if (container && pauseOnHover) {
      container.addEventListener("mouseenter", stop);
      container.addEventListener("mouseleave", start);
    }

    return () => {
      stop();
      if (container && pauseOnHover) {
        container.removeEventListener("mouseenter", stop);
        container.removeEventListener("mouseleave", start);
      }
    };
  }, [autoplay, autoplayDelay, pauseOnHover, loop, count, snapTo]);

  useEffect(() => {
    render();
  }, [
    rotateY,
    depth,
    activeScale,
    inactiveScale,
    inactiveOpacity,
    perspective,
    borderRadius,
  ]);

  const handleSlideClick = useCallback(
    (item: MediaItem, i: number) => {
      if (i === indexRef.current) {
        setDialogItem(item);
      } else {
        snapTo(i);
      }
    },
    [snapTo],
  );

  const closeDialog = useCallback(() => setDialogItem(null), []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          cursor: "grab",
          userSelect: "none",
          position: "relative",
        }}
      >
        <div
          ref={trackRef}
          style={{ display: "flex", gap, alignItems: "center" }}
        >
          {slides.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              ref={(el) => {
                slidesRef.current[i] = el;
              }}
              onClick={() => handleSlideClick(item, i)}
              style={{
                width: slideWidth,
                height: slideHeight,
                borderRadius,
                overflow: "hidden",
                flexShrink: 0,
                willChange: "transform, opacity",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    poster={item.poster}
                    muted
                    playsInline
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.18)",
                    }}
                  >
                    <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
                      <circle
                        cx={24}
                        cy={24}
                        r={24}
                        fill="rgba(255,255,255,0.85)"
                      />
                      <polygon points="19,14 38,24 19,34" fill="#111" />
                    </svg>
                  </div>
                </>
              ) : (
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button
              onClick={() => snapTo(indexRef.current - 1)}
              aria-label="Previous slide"
              style={arrowBtnStyle(44, "left")}
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => snapTo(indexRef.current + 1)}
              aria-label="Next slide"
              style={arrowBtnStyle(44, "right")}
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </>
        )}

        {showDots && (
          <div style={dotsRowStyle}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => snapTo(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background: "#333",
                  opacity: i === activeIndex ? 1 : 0.3,
                  transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {dialogItem && <MediaDialog item={dialogItem} onClose={closeDialog} />}
    </>
  );
}

function MediaDialog({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, {
      opacity: 0,
      scale: 0.94,
      y: 16,
      duration: 0.25,
      ease: "power2.in",
    });
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.2, ease: "power2.in" },
      "-=0.1",
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          background: "#000",
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <X size={18} />
        </button>

        {item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            style={{
              display: "block",
              maxWidth: "85vw",
              maxHeight: "85vh",
              width: "auto",
              height: "auto",
            }}
          />
        ) : (
          <img
            src={item.src}
            alt=""
            style={{
              display: "block",
              maxWidth: "85vw",
              maxHeight: "85vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
}

const arrowBtnStyle = (
  size: number,
  side: "left" | "right",
): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  [side]: 12,
  transform: "translateY(-50%)",
  zIndex: 200,
  width: size,
  height: size,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
});

const dotsRowStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 16,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: 8,
  zIndex: 200,
};
