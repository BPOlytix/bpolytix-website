"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  y?: number;
  duration?: number;
};

export function Reveal({
  children,
  delay = 0,
  amount = 0.2,
  className,
  style,
  y = 40,
  duration = 0.7,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
