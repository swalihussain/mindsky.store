"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-[#024fe7] z-[1000] origin-left shadow-[0_2px_10px_rgba(77,166,255,0.3)]"
      style={{ scaleX }}
    />
  );
}
