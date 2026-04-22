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
  y = 20,
  duration = 0.6,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
