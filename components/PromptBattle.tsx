"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";

interface Question {
  scenario: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

const questions: Question[] = [
  {
    scenario: "You want Cursor to build a user authentication system. Which prompt is best?",
    options: [
      {
        text: "Build auth",
        correct: false,
        explanation: "Too vague — Cursor doesn't know the stack, requirements, or patterns to use.",
      },
      {
        text: "Build a NextAuth.js authentication system with Google OAuth and email/password. Use TypeScript interfaces for all types. Store sessions in a PostgreSQL database. Follow the existing project structure in /app.",
        correct: true,
        explanation: "Specific stack, clear constraints, specifies data storage, and references project context.",
      },
      {
        text: "Can you please make a login page that works and also maybe add signup and also forgot password would be nice",
        correct: false,
        explanation: "Conversational tone with no technical specifics. Cursor works best with structured requirements.",
      },
    ],
  },
  {
    scenario: "You want Cursor to refactor a slow function. What's the ideal approach?",
    options: [
      {
        text: "Make this faster",
        correct: false,
        explanation: "Without context, Cursor may over-engineer or miss the real bottleneck.",
      },
      {
        text: "This function runs on every keystroke and causes jank. Optimize it by debouncing the API call (300ms), memoizing the result with useMemo, and adding an AbortController to cancel stale requests.",
        correct: true,
        explanation: "Explains the problem, desired solution pattern, and technical constraints. Gold standard.",
      },
      {
        text: "Refactor the whole codebase for performance",
        correct: false,
        explanation: "Scope is too broad — Cursor needs focused, actionable tasks.",
      },
    ],
  },
  {
    scenario: "You're adding a new feature and want Cursor to maintain code quality. Best prompt?",
    options: [
      {
        text: "Add a dark mode toggle",
        correct: false,
        explanation: "Missing context about where to add it, which state manager to use, or design system.",
      },
      {
        text: "Add a dark mode toggle to the Settings page. Use the existing Zustand store pattern from useThemeStore. Apply classes from our Tailwind config (dark: prefix). Persist the preference to localStorage.",
        correct: true,
        explanation: "References the existing architecture, state pattern, and persistence requirement.",
      },
      {
        text: "I want dark mode everywhere in my app, make it look really good and professional",
        correct: false,
        explanation: "Subjective quality terms and no technical constraints make this unreliable.",
      },
    ],
  },
];

export default function PromptBattle() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQ];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExplanation(true);
    if (question.options[i].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExplanation(false);
  };

  const scoreColor =
    score === questions.length
      ? "text-emerald-400"
      : score >= Math.floor(questions.length / 2)
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span className="text-purple-400 font-semibold">Score: {score}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Question */}
            <div className="p-6 bg-slate-900/60 border border-purple-500/20 rounded-xl">
              <p className="text-slate-200 font-medium text-lg leading-relaxed">
                🎯 {question.scenario}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, i) => {
                const isSelected = selected === i;
                const isCorrect = option.correct;
                let borderColor = "border-slate-700 hover:border-purple-500/60";
                let bg = "bg-slate-900/40 hover:bg-slate-800/60";
                let textColor = "text-slate-300";

                if (selected !== null) {
                  if (isCorrect) {
                    borderColor = "border-emerald-500";
                    bg = "bg-emerald-500/10";
                    textColor = "text-emerald-300";
                  } else if (isSelected && !isCorrect) {
                    borderColor = "border-red-500";
                    bg = "bg-red-500/10";
                    textColor = "text-red-300";
                  } else {
                    borderColor = "border-slate-700";
                    bg = "bg-slate-900/20";
                    textColor = "text-slate-500";
                  }
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${borderColor} ${bg} ${textColor}`}
                    whileHover={selected === null ? { scale: 1.01 } : {}}
                    whileTap={selected === null ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5">
                        {selected !== null && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        )}
                        {selected !== null && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        {(selected === null || (!isSelected && !isCorrect)) && (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-current text-xs font-bold">
                            {String.fromCharCode(65 + i)}
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-sm leading-relaxed">{option.text}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    question.options[selected].correct
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  <p className="text-sm leading-relaxed">
                    <strong>{question.options[selected].correct ? "✅ Correct! " : "❌ Not quite. "}</strong>
                    {question.options[selected].explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {selected !== null && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleNext}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:from-purple-500 hover:to-violet-500 transition-all duration-200"
              >
                {currentQ + 1 >= questions.length ? "See Results →" : "Next Question →"}
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
          >
            <Trophy className={`w-16 h-16 mx-auto ${scoreColor}`} />
            <div>
              <h3 className={`text-4xl font-black ${scoreColor}`}>
                {score}/{questions.length}
              </h3>
              <p className="text-slate-400 mt-2 text-lg">
                {score === questions.length
                  ? "Perfect! You're a Cursor Prompt Master 🏆"
                  : score >= Math.floor(questions.length / 2)
                  ? "Good work! Keep practising your prompts 💪"
                  : "Keep studying — great prompts = great output 📚"}
              </p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-purple-500/20 rounded-xl text-left">
              <p className="text-purple-300 font-semibold mb-2">Key Takeaway:</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                The golden rule: <strong className="text-white">Context + Stack + Constraints = Perfect Output.</strong>{" "}
                Always tell Cursor what framework, what pattern, what file, and why.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
