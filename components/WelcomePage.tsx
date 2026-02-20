"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onEnter: (name: string) => void;
}

export default function WelcomePage({ onEnter }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }
    onEnter(trimmed);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-cyan-600/8 rounded-full blur-[80px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.06) 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400 pointer-events-none"
          style={{
            left: `${(i * 11 + 5) % 100}%`,
            top: `${(i * 17 + 10) % 100}%`,
          }}
          animate={{ y: [0, -24, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-black">C</span>
            </div>
            <span className="text-purple-300 text-sm font-medium">Cursor Mastery Guide</span>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
          {/* From Bella tag */}
          <div className="flex justify-center mb-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-500 px-3 py-1 rounded-full border border-slate-800">
              ✉️ &nbsp;from bella
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-3 leading-tight">
              Welcome 👋
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Before we start — what&apos;s your name?
              <br />
              <span className="text-slate-500 text-sm">I&apos;ll use it to personalise your experience.</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              animate={error ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your name…"
                maxLength={30}
                className={`w-full px-5 py-4 rounded-xl bg-slate-800/80 border text-white text-lg font-semibold placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/20"
                }`}
                style={{ cursor: "text" }}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs mt-2 pl-1"
                  >
                    Please enter your name to continue.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-lg hover:from-purple-500 hover:to-violet-500 transition-all shadow-lg shadow-purple-500/20"
              style={{ cursor: "pointer" }}
            >
              Let&apos;s go →
            </motion.button>
          </form>

          {/* Subtext */}
          <p className="text-center text-xs text-slate-600 mt-5">
            Your name is saved locally — never sent anywhere.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
