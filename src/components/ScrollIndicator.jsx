import React from 'react';
import { motion, useScroll } from "framer-motion";
import "./ScrollIndicator.css";

export default function ScrollIndicator() {
    const { scrollYProgress } = useScroll();
  return (
    <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
  )
}
