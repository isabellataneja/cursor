"use client";

import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";
import HelloMoontasir from "@/components/HelloMoontasir";
import PromptBattle from "@/components/PromptBattle";
import CursorMasterclass from "@/components/CursorMasterclass";
import GitHubGuide from "@/components/GitHubGuide";
import VercelGuide from "@/components/VercelGuide";
import RetoolGuide from "@/components/RetoolGuide";
import SectionWrapper from "@/components/SectionWrapper";
import SectionTitle from "@/components/SectionTitle";
import { Github, ExternalLink, Zap, Code2, Database, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] grid-bg">
      <CustomCursor />
      <NavBar />

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Big background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-cyan-600/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            The Ultimate Cursor + Vercel + Retool Guide
          </motion.div>

          {/* Hello Moontasir — main attraction */}
          <HelloMoontasir />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-6 text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Master Cursor, connect to GitHub, deploy on Vercel, and build powerful
            data workflows with Retool — all in one interactive guide.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#cursor"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:from-purple-500 hover:to-violet-500 transition-all shadow-lg shadow-purple-500/20"
            >
              Start Learning →
            </a>
            <a
              href="#game"
              className="px-7 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:border-purple-500/50 hover:text-white hover:bg-purple-500/5 transition-all"
            >
              🎮 Play the Game
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex justify-center pt-2">
              <div className="w-1 h-2 bg-purple-400 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── QUICK OVERVIEW CARDS ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4">
          {[
            { icon: <Code2 className="w-6 h-6" />, title: "Cursor", desc: "AI-native IDE with ⌘K, ⌘L, ⌘I superpowers", color: "text-purple-400", border: "border-purple-500/20", href: "#cursor" },
            { icon: <Github className="w-6 h-6" />, title: "GitHub", desc: "Version control & collaboration hub", color: "text-slate-300", border: "border-slate-700", href: "#github" },
            { icon: <Globe className="w-6 h-6" />, title: "Vercel", desc: "Push to deploy — live in 60 seconds", color: "text-blue-400", border: "border-blue-500/20", href: "#vercel" },
            { icon: <Database className="w-6 h-6" />, title: "Retool", desc: "ETL workflows & fast data pipelines", color: "text-orange-400", border: "border-orange-500/20", href: "#retool" },
          ].map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-xl border ${card.border} bg-slate-900/40 hover:bg-slate-900/80 transition-all group`}
            >
              <div className={`${card.color} mb-3 group-hover:scale-110 transition-transform`}>{card.icon}</div>
              <div className="font-bold text-white mb-1">{card.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{card.desc}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── PROMPT BATTLE GAME ── */}
      <section id="game" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="🎮 Mini Game"
            title="Prompt Battle"
            subtitle="Pick the best prompt for each scenario. Master this and Cursor becomes 10x more powerful."
            eyebrowColor="text-pink-400"
          />
          <PromptBattle />
        </div>
      </section>

      {/* ── CURSOR MASTERCLASS ── */}
      <SectionWrapper id="cursor">
        <SectionTitle
          eyebrow="Chapter 01"
          title="The Cursor Masterclass"
          subtitle="Three keyboard shortcuts that replace an entire team of developers. Learn them cold."
          eyebrowColor="text-purple-400"
        />
        <CursorMasterclass />
      </SectionWrapper>

      {/* ── GITHUB GUIDE ── */}
      <SectionWrapper id="github">
        <SectionTitle
          eyebrow="Chapter 02"
          title="Connecting to GitHub"
          subtitle="Version control is your time machine. This interactive checklist walks you through every step."
          eyebrowColor="text-emerald-400"
        />
        <GitHubGuide />
      </SectionWrapper>

      {/* ── VERCEL GUIDE ── */}
      <SectionWrapper id="vercel">
        <SectionTitle
          eyebrow="Chapter 03"
          title="Deploying with Vercel"
          subtitle="From git push to live website in 60 seconds. The pipeline that powers modern web development."
          eyebrowColor="text-blue-400"
        />
        <VercelGuide />
      </SectionWrapper>

      {/* ── RETOOL GUIDE ── */}
      <SectionWrapper id="retool">
        <SectionTitle
          eyebrow="Chapter 04"
          title="Retool Data Workflows"
          subtitle="Build ETL pipelines that keep your frontend fast and your data clean. The professional way."
          eyebrowColor="text-orange-400"
        />
        <RetoolGuide />
      </SectionWrapper>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-black">C</span>
              </div>
              <div>
                <div className="font-bold text-white">Cursor Mastery Guide</div>
                <div className="text-xs text-slate-500">Built with Cursor + Next.js + Vercel</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center text-sm">
              {[
                { label: "Cursor Docs", href: "https://cursor.sh/docs" },
                { label: "GitHub", href: "https://github.com" },
                { label: "Vercel", href: "https://vercel.com" },
                { label: "Retool", href: "https://retool.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>

            <div className="text-xs text-slate-600 text-center">
              Share this guide with your team 🚀
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
