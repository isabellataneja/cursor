"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, Copy, Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Open the Terminal in Cursor",
    description: "Press ⌃` (Ctrl + backtick) to open the integrated terminal. You'll run all Git commands from here.",
    command: null,
    tip: "Cursor's terminal is the same as your system terminal — it's just built-in for convenience.",
  },
  {
    number: "02",
    title: "Initialize a Git Repository",
    description: "Turn your project folder into a Git repository. This creates a hidden .git folder that tracks all changes.",
    command: "git init",
    tip: "Only run this once per project. If you cloned a repo, it's already initialized.",
  },
  {
    number: "03",
    title: "Create a .gitignore File",
    description: "Tell Git which files to never track — like node_modules, .env files, and build outputs.",
    command: `# Cursor will generate this for you — just ask:
# ⌘I → "Create a .gitignore for a Next.js + Vercel project"

# Or manually create .gitignore with:
echo "node_modules/\\n.env.local\\n.next/\\ndist/" > .gitignore`,
    tip: "NEVER commit .env files. They contain secrets. Always add them to .gitignore first.",
  },
  {
    number: "04",
    title: "Stage Your Files",
    description: "Tell Git which files to include in the next snapshot (commit). The '.' stages everything.",
    command: "git add .",
    tip: "Run 'git status' first to see what's changed. Use 'git add <filename>' to stage only specific files.",
  },
  {
    number: "05",
    title: "Create Your First Commit",
    description: "A commit is a permanent snapshot of your staged files with a message describing what changed.",
    command: 'git commit -m "Initial commit: project scaffolding"',
    tip: "Write commit messages in present tense: 'Add dark mode' not 'Added dark mode'. Be specific.",
  },
  {
    number: "06",
    title: "Create a Repo on GitHub",
    description: "Go to github.com, click New Repository. Name it, leave it empty (no README), then copy the remote URL.",
    command: null,
    tip: "Keep repos public for open-source projects, private for client work or sensitive code.",
  },
  {
    number: "07",
    title: "Connect to GitHub Remote",
    description: "Link your local repo to the GitHub remote so you can push/pull code.",
    command: `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main`,
    tip: "Replace YOUR_USERNAME and YOUR_REPO with your actual GitHub username and repo name.",
  },
  {
    number: "08",
    title: "Push to GitHub",
    description: "Upload your commits to GitHub. From now on, every push updates the remote.",
    command: "git push -u origin main",
    tip: "After the first push, you only need 'git push'. The -u flag sets the default upstream.",
  },
  {
    number: "09",
    title: "The Daily Workflow",
    description: "This is the loop you'll use every day. Write code in Cursor, then push your changes.",
    command: `git add .
git commit -m "feat: add user profile page"
git push`,
    tip: "Commit often — small commits are easier to debug and revert than massive ones.",
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-3 group">
      <pre className="text-xs text-emerald-300 bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

export default function GitHubGuide() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [active, setActive] = useState(0);

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
      <div className="p-4 bg-slate-900/60 border border-emerald-500/20 rounded-xl">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Your progress</span>
          <span className="text-emerald-400 font-semibold">{completed.size}/{steps.length} steps</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
            animate={{ width: `${(completed.size / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              active === i
                ? "border-emerald-500/40 bg-emerald-500/5"
                : completed.has(i)
                ? "border-emerald-800/50 bg-emerald-900/5"
                : "border-slate-800 bg-slate-900/30"
            }`}
          >
            <button
              className="w-full flex items-center gap-4 p-4 text-left"
              onClick={() => setActive(active === i ? -1 : i)}
            >
              <button
                onClick={(e) => { e.stopPropagation(); toggleComplete(i); }}
                className="shrink-0"
              >
                {completed.has(i) ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                )}
              </button>
              <span className="text-slate-500 font-mono text-xs">{step.number}</span>
              <span className={`font-semibold ${completed.has(i) ? "text-slate-500 line-through" : "text-white"}`}>
                {step.title}
              </span>
            </button>

            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3 border-t border-slate-800/50 pt-4">
                    <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                    {step.command && <CodeBlock code={step.command} />}
                    <div className="flex items-start gap-2 text-sm bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-lg">
                      <span className="text-yellow-400 shrink-0">💡</span>
                      <span className="text-slate-400">{step.tip}</span>
                    </div>
                    <button
                      onClick={() => toggleComplete(i)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
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
