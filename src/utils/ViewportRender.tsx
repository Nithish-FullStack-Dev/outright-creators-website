"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ViewportRender({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "200px",
  });

  return (
    <div ref={ref} className="flex flex-col justify-center gap-6 md:gap-10">
      {isInView ? children : null}
    </div>
  );
}
