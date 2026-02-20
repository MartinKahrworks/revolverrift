import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      // Check if the hovered element or its parents are interactive
      const target = e.target;

      // Safety check: ensure target is an Element before accessing properties
      if (!target || !(target instanceof Element)) return;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "transparent",
      border: "2px solid #00f0ff", // Cyan color for gaming vibe
      boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff",
      mixBlendMode: "difference",
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(0, 240, 255, 0.1)",
      border: "2px solid #ff0055", // Red/Pink accent on hover
      boxShadow: "0 0 20px #ff0055",
      mixBlendMode: "normal",
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      opacity: 0,
    },
  };

  return (
    <>
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block" // Hidden on mobile
        variants={variants}
        animate={isHovered ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={dotVariants}
        animate={isHovered ? "hover" : "default"}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default Cursor;
