"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, MessageSquare, Wand2, ChevronDown } from "lucide-react";

const shortcuts = [
  {
    keys: ["⌘", "K"],
    name: "Inline Edit",
    icon: <Command className="w-5 h-5" />,
    color: "from-purple-500 to-violet-600",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
    description: "Cursor opens an inline editor directly in your code. Describe the change and it rewrites just that block — no context switching.",
    useCase: "Refactoring a function, renaming variables, converting JavaScript to TypeScript.",
    example: `// Select this function, press ⌘K, type:
// "Convert to async/await and add TypeScript types"

function fetchUser(id) {
  return fetch('/api/users/' + id)
    .then(r => r.json())
}

// Cursor transforms it to:
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`,
    tip: "Best for surgical edits. Select only the code you want changed.",
  },
  {
    keys: ["⌘", "L"],
    name: "AI Chat",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/5",
    description: "Opens a chat panel with full codebase context. Ask questions, get explanations, debug errors, or request multi-file changes.",
    useCase: "Debugging, asking 'why does this work?', reviewing code before a PR.",
    example: `// Example chat prompts that work great:

"Why is this useEffect running infinitely? 
 Here is the component: [paste code]"

"Explain the difference between 
 useMemo and useCallback with examples 
 relevant to my codebase"

"I'm getting a 403 on this API call. 
 Here's my auth middleware — what's wrong?"`,
    tip: "Include error messages and relevant file content directly in chat for best results.",
  },
  {
    keys: ["⌘", "I"],
    name: "Composer",
    icon: <Wand2 className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-600",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    description: "The most powerful mode. Composer can create, edit, and delete multiple files across your entire project in a single session.",
    useCase: "Building entire features, scaffolding new modules, large-scale refactors.",
    example: `// Example Composer prompt for scalability:

"Build a reusable <DataTable> component with:
- TypeScript generic types <T extends object>
- Column definition interface with sortable/filterable flags
- Pagination hook in /hooks/usePagination.ts
- Loading skeleton state
- Empty state with slot for custom message
- Export all types from /components/DataTable/index.ts

Follow the existing pattern in /components/Button/"`,
    tip: "Use Composer for anything that touches more than 2 files. It's a force multiplier.",
  },
];

const scalabilityTips = [
  {
    title: "Always specify TypeScript interfaces",
    code: `// ✅ Good prompt pattern:
"Create a UserProfile component. 
 Define a UserProfile interface in types.ts first,
 then use it as props. Export the interface."`,
  },
  {
    title: "Reference your existing patterns",
    code: `// ✅ Good prompt pattern:
"Add a new API route following the 
 exact same pattern as /app/api/users/route.ts — 
 same error handling, same response shape."`,
  },
  {
    title: "Specify modularity upfront",
    code: `// ✅ Good prompt pattern:
"Split the business logic into a 
 custom hook useOrderProcessor.ts,
 keep the component purely presentational,
 add unit test file alongside each."`,
  },
  {
    title: "Set project-wide rules in .cursorrules",
    code: `// .cursorrules file in your project root:
- Always use TypeScript, never plain JS
- Use Tailwind for styling, never inline styles
- API calls go in /lib/api/, not in components
- All hooks live in /hooks/
- Prefer named exports over default exports`,
  },
];

export default function CursorMasterclass() {
  const [activeShortcut, setActiveShortcut] = useState(0);
  const [openTip, setOpenTip] = useState<number | null>(null);

  return (
    <div className="space-y-16">
      {/* Shortcuts */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">The 3 Power Shortcuts</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {shortcuts.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveShortcut(i)}
              className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                activeShortcut === i
                  ? `${s.borderColor} ${s.bgColor} shadow-lg`
                  : "border-slate-800 bg-slate-900/30 hover:border-slate-600"
              }`}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${s.color} text-white text-xs font-bold mb-3`}>
                {s.icon}
                {s.keys.join(" + ")}
              </div>
              <div className="font-semibold text-white">{s.name}</div>
              <div className="text-xs text-slate-400 mt-1">{s.useCase}</div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeShortcut}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-6 rounded-xl border ${shortcuts[activeShortcut].borderColor} ${shortcuts[activeShortcut].bgColor}`}
          >
            <p className="text-slate-300 mb-4 leading-relaxed">
              {shortcuts[activeShortcut].description}
            </p>
            <pre className="text-xs text-slate-300 bg-slate-950/80 p-4 rounded-lg border border-slate-800 overflow-x-auto">
              <code>{shortcuts[activeShortcut].example}</code>
            </pre>
            <div className="mt-4 flex items-start gap-2 text-sm">
              <span className="text-yellow-400">💡</span>
              <span className="text-slate-400">{shortcuts[activeShortcut].tip}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scalability Tips */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">Prompting for Scalability</h3>
        <p className="text-slate-400 text-center mb-6 max-w-xl mx-auto">
          These prompt patterns consistently produce clean, maintainable code that doesn't break as your project grows.
        </p>
        <div className="space-y-3">
          {scalabilityTips.map((tip, i) => (
            <div
              key={i}
              className="border border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenTip(openTip === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/30 transition-colors"
              >
                <span className="font-semibold text-white flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {tip.title}
                </span>
                <motion.div animate={{ rotate: openTip === i ? 180 : 0 }}>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openTip === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <pre className="text-xs text-slate-300 bg-slate-950 p-4 border-t border-slate-800 overflow-x-auto">
                      <code>{tip.code}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
