"use client";

import { motion } from "framer-motion";
import { Globe, GitBranch, Zap, ShieldCheck, Settings, ExternalLink } from "lucide-react";

const pipeline = [
  {
    step: "1",
    icon: <GitBranch className="w-6 h-6" />,
    title: "You write code in Cursor",
    description: "Build your feature, make your edits. Use ⌘K, ⌘L, or ⌘I to accelerate.",
    color: "from-purple-500 to-violet-600",
    code: null,
  },
  {
    step: "2",
    icon: <GitBranch className="w-6 h-6" />,
    title: "You push to GitHub",
    description: "Three commands. Your code travels from your machine to GitHub in seconds.",
    color: "from-violet-500 to-blue-600",
    code: `git add .
git commit -m "feat: new feature"
git push`,
  },
  {
    step: "3",
    icon: <Zap className="w-6 h-6" />,
    title: "Vercel detects the push",
    description: "Vercel watches your GitHub repo 24/7. The moment you push, it starts building automatically — no manual deploys.",
    color: "from-blue-500 to-cyan-600",
    code: null,
  },
  {
    step: "4",
    icon: <Globe className="w-6 h-6" />,
    title: "Your site goes live (~60 seconds)",
    description: "Vercel builds, optimizes, and deploys to their global CDN edge network. Your site is live everywhere instantly.",
    color: "from-cyan-500 to-emerald-600",
    code: null,
  },
];

const envVarGuide = [
  { key: "DATABASE_URL", value: "postgresql://user:pass@host/db", risk: "high" },
  { key: "RETOOL_API_KEY", value: "rtk_xxxxxxxxxxxxx", risk: "high" },
  { key: "NEXT_PUBLIC_API_URL", value: "https://api.yourapp.com", risk: "low" },
  { key: "STRIPE_SECRET_KEY", value: "sk_live_xxxxxxxx", risk: "high" },
];

const vercelFeatures = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Global CDN",
    description: "Your site is served from 100+ edge locations worldwide. Users always get the nearest server.",
  },
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: "Preview Deployments",
    description: "Every pull request gets its own live preview URL. Share with clients before merging.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Automatic HTTPS",
    description: "SSL certificates are provisioned and renewed automatically. Zero configuration.",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Environment Variables",
    description: "Store all secrets in the Vercel dashboard — never hardcode keys in your code.",
  },
];

export default function VercelGuide() {
  return (
    <div className="space-y-16">
      {/* What is Vercel */}
      <div className="p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Globe className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">What is Vercel?</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vercel is the <strong className="text-white">Publishing House</strong> for your code. Think of it like this:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <p className="text-purple-400 font-semibold mb-1">Cursor</p>
                <p className="text-slate-400">Where you write and edit code — your workshop.</p>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <p className="text-emerald-400 font-semibold mb-1">GitHub</p>
                <p className="text-slate-400">Where your code is stored and version-controlled — your vault.</p>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <p className="text-blue-400 font-semibold mb-1">Vercel</p>
                <p className="text-slate-400">Where your code becomes a live website — your publisher.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Pipeline */}
      <div>
        <h3 className="text-xl font-bold text-white mb-8 text-center">The Push-to-Deploy Pipeline</h3>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-emerald-500 hidden md:block" />

          <div className="space-y-4">
            {pipeline.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex flex-col items-center justify-center shadow-lg`}>
                  {step.icon}
                </div>
                <div className="flex-1 p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-500 font-mono">STEP {step.step}</span>
                  </div>
                  <h4 className="font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  {step.code && (
                    <pre className="mt-3 text-xs text-emerald-300 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
                      <code>{step.code}</code>
                    </pre>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Connecting GitHub to Vercel */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">Connecting GitHub → Vercel (One Time Setup)</h3>
        <div className="space-y-4">
          {[
            { n: "1", title: "Sign up at vercel.com", body: 'Go to vercel.com and click "Sign Up". Use your GitHub account to log in — this makes connecting repos instant.' },
            { n: "2", title: 'Click "Add New Project"', body: "From your Vercel dashboard, click the Add New → Project button. Vercel will show all your GitHub repositories." },
            { n: "3", title: "Select your GitHub repo", body: "Find your project repo and click Import. Vercel will auto-detect Next.js and configure the build settings." },
            { n: "4", title: "Add Environment Variables", body: "CRITICAL: Before deploying, go to Settings → Environment Variables. Add all your .env.local keys here. Vercel encrypts them and injects them at build time." },
            { n: "5", title: "Click Deploy", body: "Hit Deploy. Vercel builds your app, runs optimizations, and publishes it to a .vercel.app subdomain. Done." },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-5 bg-slate-900/40 border border-slate-800 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                {item.n}
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Variables */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Environment Variables — Never Hardcode Secrets
        </h3>
        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="text-red-300 font-semibold mb-1">Critical Security Rule</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                API keys, database passwords, and tokens must <strong className="text-white">NEVER</strong> appear in your code.
                If they end up on GitHub, bots will find them within minutes and abuse them.
                Always use environment variables.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800">
          <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400 font-mono">Vercel → Settings → Environment Variables</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-4 py-3 text-slate-500 font-medium">Variable Name</th>
                <th className="text-left px-4 py-3 text-slate-500 font-medium">Example Value</th>
                <th className="text-left px-4 py-3 text-slate-500 font-medium">Sensitivity</th>
              </tr>
            </thead>
            <tbody>
              {envVarGuide.map((row, i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="px-4 py-3 font-mono text-cyan-300">{row.key}</td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-xs">{row.value}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      row.risk === "high"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}>
                      {row.risk === "high" ? "🔒 SECRET" : "🌐 PUBLIC"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Variables prefixed with <code className="text-cyan-400">NEXT_PUBLIC_</code> are exposed to the browser. All others are server-only.
        </p>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">Why Vercel?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {vercelFeatures.map((f, i) => (
            <div key={i} className="flex gap-4 p-5 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-blue-500/30 transition-colors">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 h-fit">{f.icon}</div>
              <div>
                <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Go to Vercel.com
          </a>
        </div>
      </div>
    </div>
  );
}
