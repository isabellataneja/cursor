"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, ExternalLink, ChevronDown } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Download Cursor",
    description: "Go to cursor.com and click Download. It's available for macOS, Windows, and Linux. The installer is about 200MB.",
    tip: "Cursor is built on top of VS Code — so if you already use VS Code, everything will feel familiar immediately.",
    link: { label: "cursor.com →", href: "https://cursor.com" },
    details: null,
  },
  {
    number: "02",
    title: "Run the installer",
    description: "Open the downloaded file and drag Cursor into your Applications folder (macOS) or run the .exe installer (Windows). Launch Cursor once it's installed.",
    tip: "On macOS you may see a security prompt the first time — go to System Settings → Privacy & Security → Open Anyway.",
    link: null,
    details: null,
  },
  {
    number: "03",
    title: "Import your VS Code settings (optional)",
    description: "If you used VS Code before, Cursor will offer to import all your extensions, themes, keybindings, and settings in one click. Say yes — it saves 30 minutes of setup.",
    tip: "Even if you're brand new, skip this step. You can always add extensions later from the Extensions panel (⇧⌘X).",
    link: null,
    details: null,
  },
  {
    number: "04",
    title: "Sign in to your Cursor account",
    description: "Click Sign In in the top right corner. Create a free account with your email or log in with GitHub. Your account is what links your AI quota to the editor.",
    tip: "The free plan gives you 2,000 AI completions per month. The Pro plan ($20/mo) is unlimited and worth it once you're hooked.",
    link: null,
    details: null,
  },
  {
    number: "05",
    title: "Choose your AI model",
    description: "Press ⌘Shift+J to open Cursor Settings → Models. You'll see options like GPT-4o, Claude 3.5 Sonnet, and Cursor's own models. Claude 3.5 Sonnet is recommended for coding.",
    tip: "You can switch models mid-conversation. Use a fast model for quick edits (⌘K) and a smarter model for architecture questions (⌘I Composer).",
    link: null,
    details: [
      { model: "claude-3.5-sonnet", tag: "Recommended", desc: "Best for complex code, debugging, and architectural decisions." },
      { model: "gpt-4o", tag: "Fast", desc: "Great for quick inline edits and autocomplete. Very responsive." },
      { model: "cursor-small", tag: "Fastest", desc: "Instant completions. Best for repetitive tasks and Tab autocomplete." },
    ],
  },
  {
    number: "06",
    title: "Open your first project",
    description: "Go to File → Open Folder and select your project directory, or create a new folder. Cursor works best when you open the root of your project — not individual files.",
    tip: "Always open the full project folder, not a single file. Cursor uses all the files in context to give better, more consistent suggestions.",
    link: null,
    details: null,
  },
  {
    number: "07",
    title: "Create a .cursorrules file",
    description: "In the root of your project, create a file called .cursorrules. This file tells Cursor how to behave for your specific project — the stack, the patterns, the rules.",
    tip: "This is the single most impactful thing you can do. It means every AI response is tailored to your project from the very first prompt.",
    link: null,
    details: null,
    codeExample: `# .cursorrules
# Place this file in the root of your project

- Always use TypeScript, never plain JavaScript
- Use Tailwind CSS for all styling — no inline styles
- Prefer named exports over default exports
- All API calls go in /lib/api/ — never inside components
- Use Next.js App Router conventions (/app directory)
- All types and interfaces go in /types/
- Write clean, self-documenting code with no obvious comments
- When creating a new component, also create a barrel export in index.ts`,
  },
  {
    number: "08",
    title: "Enable Tab autocomplete",
    description: "Cursor's Tab key completes entire lines and blocks of code as you type — smarter than GitHub Copilot. It should be on by default, but verify in Settings → Features → Cursor Tab.",
    tip: "Press Tab to accept a suggestion, or Escape to dismiss it. If you only want part of a suggestion, press ⌘→ to accept word by word.",
    link: null,
    details: null,
  },
  {
    number: "09",
    title: "Try your first AI edit with ⌘K",
    description: "Click anywhere in a file, press ⌘K, and type a natural-language instruction like 'add a TypeScript interface for a User object'. Watch Cursor write the code inline.",
    tip: "You don't need to select code first for new additions. Select existing code before pressing ⌘K when you want to modify something specific.",
    link: null,
    details: null,
  },
  {
    number: "10",
    title: "You're ready. Now go build.",
    description: "That's the full setup. Cursor will get smarter the more context it has — open files, a good .cursorrules, and specific prompts are your multipliers.",
    tip: "Bookmark this guide and share it with your team. The next chapter covers the 3 power shortcuts that turn Cursor into a superpower.",
    link: { label: "Cursor Masterclass →", href: "#cursor" },
    details: null,
  },
];

export default function CursorSetup() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number>(0);

  const toggleComplete = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="p-4 bg-slate-900/60 border border-violet-500/20 rounded-xl">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Setup progress</span>
          <span className="text-violet-400 font-semibold">{completed.size}/{steps.length} steps</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
            animate={{ width: `${(completed.size / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        {completed.size === steps.length && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400 text-xs font-semibold mt-2 text-center"
          >
            🎉 Setup complete — you're ready to build!
          </motion.p>
        )}
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              active === i
                ? "border-violet-500/40 bg-violet-500/5"
                : completed.has(i)
                ? "border-slate-800/50 bg-slate-900/20"
                : "border-slate-800 bg-slate-900/30"
            }`}
          >
            {/* Row header */}
            <button
              className="w-full flex items-center gap-4 p-4 text-left"
              onClick={() => setActive(active === i ? -1 : i)}
            >
              <button
                onClick={(e) => { e.stopPropagation(); toggleComplete(i); }}
                className="shrink-0"
              >
                {completed.has(i) ? (
                  <CheckCircle className="w-5 h-5 text-violet-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400 transition-colors" />
                )}
              </button>
              <span className="text-slate-600 font-mono text-xs w-6 shrink-0">{step.number}</span>
              <span className={`font-semibold flex-1 ${completed.has(i) ? "text-slate-500 line-through" : "text-white"}`}>
                {step.title}
              </span>
              <motion.div animate={{ rotate: active === i ? 180 : 0 }} className="shrink-0">
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </motion.div>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-slate-800/50 pt-4">
                    <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>

                    {/* Model comparison table */}
                    {step.details && (
                      <div className="space-y-2">
                        {step.details.map((d, di) => (
                          <div key={di} className="flex items-start gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                            <div className="shrink-0 mt-0.5">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                d.tag === "Recommended"
                                  ? "bg-violet-500/15 text-violet-400 border border-violet-500/30"
                                  : d.tag === "Fast"
                                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                                  : "bg-slate-700 text-slate-400 border border-slate-600"
                              }`}>
                                {d.tag}
                              </span>
                            </div>
                            <div>
                              <p className="text-white text-xs font-mono font-semibold mb-0.5">{d.model}</p>
                              <p className="text-slate-400 text-xs leading-relaxed">{d.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Code example */}
                    {step.codeExample && (
                      <pre className="text-xs text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto font-mono leading-relaxed">
                        <code>{step.codeExample}</code>
                      </pre>
                    )}

                    {/* Tip */}
                    <div className="flex items-start gap-2 bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-lg">
                      <span className="text-yellow-400 shrink-0">💡</span>
                      <span className="text-slate-400 text-sm leading-relaxed">{step.tip}</span>
                    </div>

                    {/* External link */}
                    {step.link && (
                      <a
                        href={step.link.href}
                        target={step.link.href.startsWith("http") ? "_blank" : undefined}
                        rel={step.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                      >
                        {step.link.label}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => toggleComplete(i)}
                      className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      {completed.has(i) ? "Mark as incomplete" : "Mark as complete ✓"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
