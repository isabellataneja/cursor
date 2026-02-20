"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const COLORS = [
  "#a855f7", "#8b5cf6", "#7c3aed", "#6d28d9",
  "#06b6d4", "#0891b2", "#ec4899", "#f59e0b",
  "#10b981", "#a855f7", "#8b5cf6", "#06b6d4",
  "#ec4899", "#f59e0b", "#10b981", "#a855f7",
  "#8b5cf6", "#7c3aed", "#06b6d4", "#ec4899",
];

function MagneticLetter({ char, index }: { char: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 80;
      if (dist < radius) {
        const strength = (1 - dist / radius) * 20;
        x.set(dx * strength * 0.1);
        y.set(dy * strength * 0.1);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  if (char === " ") {
    return <span className="inline-block w-4 md:w-8" />;
  }

  const color = COLORS[index % COLORS.length];

  return (
    <motion.span
      ref={ref}
      className="inline-block font-black select-none"
      style={{
        x: xSpring,
        y: ySpring,
        color,
        textShadow: `0 0 30px ${color}80, 0 0 60px ${color}40`,
        fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}
      initial={{ opacity: 0, y: 60, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: index * 0.045,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.3,
        rotate: [-5, 5, -5, 0],
        transition: { duration: 0.3 },
      }}
    >
      {char}
    </motion.span>
  );
}

interface Props {
  name: string;
}

export default function HelloMoontasir({ name }: Props) {
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(false);

  const greeting = `HELLO ${name.toUpperCase()}`;
  const letters = greeting.split("");

  const handleContainerClick = () => {
    setScore((s) => s + 1);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[420px] py-16 overflow-hidden"
      onClick={handleContainerClick}
    >
      {/* Background orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #7c3aed, transparent)",
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #06b6d4, transparent)",
          top: "30%",
          left: "30%",
        }}
        animate={{ scale: [1.2, 1, 1.2], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Score badge */}
      <motion.div
        className="mb-6 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-mono"
        animate={clicked ? { scale: [1, 1.2, 1] } : {}}
      >
        ✨ Click score: {score} — hover each letter!
      </motion.div>

      {/* Main greeting */}
      <div className="relative z-10 text-center">
        <div className="flex flex-wrap justify-center items-center gap-0">
          {letters.map((char, i) => (
            <MagneticLetter key={`${greeting}-${i}`} char={char} index={i} />
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <motion.p
        className="mt-8 text-slate-400 text-lg font-light tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: letters.length * 0.045 + 0.4 }}
      >
        Welcome to the Cursor Universe 🚀
      </motion.p>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400 pointer-events-none"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13.7) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
