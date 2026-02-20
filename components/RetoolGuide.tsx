"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, ArrowRight, Zap, Clock, Webhook, Code2, RefreshCw } from "lucide-react";

const workflowTypes = [
  {
    id: "scheduled",
    icon: <Clock className="w-5 h-5" />,
    title: "Scheduled ETL Workflow",
    subtitle: "Best for: Dashboards, reports, syncing data",
    color: "from-purple-500 to-violet-600",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
    description: "Runs on a timer (every 15 min, hourly, daily). Extracts data from sources, transforms it, and caches it in your database. Your frontend queries the fast cache, not the slow source.",
    steps: [
      {
        label: "Extract",
        icon: <Database className="w-4 h-4" />,
        color: "bg-purple-500",
        description: "Pull data from multiple sources IN PARALLEL — Google Sheets, SQL, REST APIs, Salesforce.",
        code: `// Retool Step: "fetch_all_data" (Resource Query)
// Run these queries in PARALLEL (enable "Run in background"):

query_sheets: GET Google Sheets → Sheet1
query_postgres: SELECT * FROM orders WHERE date > {{last_run}}
query_stripe: GET /v1/charges?limit=100`,
      },
      {
        label: "Transform",
        icon: <Code2 className="w-4 h-4" />,
        color: "bg-violet-500",
        description: "One JavaScript block cleans, merges, and shapes all data. This is your single source of truth for transformation logic.",
        code: `// Retool Step: "prepare_response" (JS Query)
const sheets = query_sheets.data.values;
const orders = query_postgres.data;
const charges = query_stripe.data.data;

// Merge and normalize
const combined = orders.map(order => ({
  id: order.id,
  customer: order.customer_name,
  amount: charges.find(c => c.metadata.order_id === order.id)?.amount / 100,
  source: 'postgres',
  synced_at: new Date().toISOString()
}));

return combined;`,
      },
      {
        label: "Load (UPSERT)",
        icon: <Database className="w-4 h-4" />,
        color: "bg-cyan-500",
        description: "Write the clean data to a PostgreSQL cache table using UPSERT — updates existing rows, inserts new ones. Idempotent and safe.",
        code: `-- Retool Step: "upsert_cache" (SQL Query)
INSERT INTO dashboard_cache (id, customer, amount, source, synced_at)
VALUES ({{ prepare_response.data.map(r => [r.id, r.customer, r.amount, r.source, r.synced_at]) }})
ON CONFLICT (id) 
DO UPDATE SET 
  customer = EXCLUDED.customer,
  amount = EXCLUDED.amount,
  synced_at = EXCLUDED.synced_at;`,
      },
    ],
  },
  {
    id: "webhook",
    icon: <Webhook className="w-5 h-5" />,
    title: "Fast Webhook Workflow",
    subtitle: "Best for: Real-time queries from your Next.js frontend",
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/5",
    description: "Triggered by an HTTP request from your app. Reads ONLY from the pre-populated cache table — not the slow sources. Responds in <100ms.",
    steps: [
      {
        label: "Receive Request",
        icon: <Webhook className="w-4 h-4" />,
        color: "bg-cyan-500",
        description: "Retool webhook receives a POST from your Next.js API route with optional filter parameters.",
        code: `// Your Next.js API route (app/api/data/route.ts)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('filter');
  
  const res = await fetch(process.env.RETOOL_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Authorization': \`Bearer \${process.env.RETOOL_API_KEY}\` },
    body: JSON.stringify({ filter })
  });
  
  return Response.json(await res.json());
}`,
      },
      {
        label: "Query Cache (FAST)",
        icon: <Zap className="w-4 h-4" />,
        color: "bg-blue-500",
        description: "Read from the pre-populated cache table. Single SQL query. No external API calls. This is what makes it fast.",
        code: `-- Retool Step: "read_cache" (SQL Query)
SELECT id, customer, amount, source, synced_at
FROM dashboard_cache
WHERE ({{ trigger.data.filter }} IS NULL OR customer ILIKE '%' || {{ trigger.data.filter }} || '%')
ORDER BY synced_at DESC
LIMIT 500;`,
      },
      {
        label: "Return Response",
        icon: <RefreshCw className="w-4 h-4" />,
        color: "bg-indigo-500",
        description: "Format and return the cached data to your frontend. Total response time: under 100ms.",
        code: `// Retool Step: "format_response" (JS Query)
return {
  success: true,
  data: read_cache.data,
  count: read_cache.data.length,
  cached_at: read_cache.data[0]?.synced_at ?? null
};`,
      },
    ],
  },
];

export default function RetoolGuide() {
  const [activeWorkflow, setActiveWorkflow] = useState("scheduled");
  const [activeStep, setActiveStep] = useState(0);

  const workflow = workflowTypes.find((w) => w.id === activeWorkflow)!;

  return (
    <div className="space-y-12">
      {/* Architecture Diagram */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">The Optimal Data Architecture</h3>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[600px] flex items-center justify-between gap-2 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
            {[
              { label: "Data Sources", items: ["Google Sheets", "PostgreSQL", "Stripe API", "Salesforce"], color: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/5" },
              { label: null, items: [], color: "", border: "", bg: "" },
              { label: "Retool ETL", items: ["Extract (parallel)", "Transform (JS)", "Load (UPSERT)"], color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/5" },
              { label: null, items: [], color: "", border: "", bg: "" },
              { label: "Cache DB", items: ["PostgreSQL table", "Pre-cleaned data", "Indexed for speed"], color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/5" },
              { label: null, items: [], color: "", border: "", bg: "" },
              { label: "Next.js App", items: ["Fast webhook query", "<100ms response", "Happy users 🎉"], color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5" },
            ].map((node, i) =>
              node.label === null ? (
                <div key={i} className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                </div>
              ) : (
                <div key={i} className={`flex-1 p-4 rounded-xl border ${node.border} ${node.bg} min-w-0`}>
                  <p className={`font-bold text-sm mb-2 ${node.color}`}>{node.label}</p>
                  {node.items.map((item, j) => (
                    <p key={j} className="text-xs text-slate-500 leading-relaxed">{item}</p>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">
          The ETL runs on a schedule. The webhook reads only from the fast cache. These are two separate workflows.
        </p>
      </div>

      {/* Workflow selector */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">The Two Workflow Types</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {workflowTypes.map((w) => (
            <button
              key={w.id}
              onClick={() => { setActiveWorkflow(w.id); setActiveStep(0); }}
              className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                activeWorkflow === w.id
                  ? `${w.borderColor} ${w.bgColor} shadow-lg`
                  : "border-slate-800 bg-slate-900/30 hover:border-slate-600"
              }`}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${w.color} text-white text-xs font-bold mb-3`}>
                {w.icon}
                {w.title}
              </div>
              <p className="text-xs text-slate-500">{w.subtitle}</p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorkflow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <p className="text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
              {workflow.description}
            </p>

            {/* Step tabs */}
            <div className="flex gap-2 justify-center flex-wrap">
              {workflow.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeStep === i
                      ? `text-white ${step.color.replace("bg-", "bg-")}/20 border border-current/30`
                      : "text-slate-500 hover:text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full ${step.color} flex items-center justify-center text-white`}>
                    {step.icon}
                  </span>
                  {step.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-6 rounded-xl border ${workflow.borderColor} ${workflow.bgColor}`}
              >
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {workflow.steps[activeStep].description}
                </p>
                <pre className="text-xs text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto font-mono leading-relaxed">
                  <code>{workflow.steps[activeStep].code}</code>
                </pre>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Best Practices */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 text-center">Retool Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: "⚡", title: "Always run source queries in parallel", body: "Enable 'Run in background' on all extraction queries. Never chain them — parallel execution is 3-5x faster." },
            { icon: "🧹", title: "Single transform block", body: "All data cleaning happens in one JS block called prepare_response. Never transform in multiple places — it becomes unmaintainable." },
            { icon: "🔄", title: "UPSERT, never INSERT", body: "Use ON CONFLICT DO UPDATE for your cache writes. This makes your ETL idempotent — safe to re-run without duplicating data." },
            { icon: "🔑", title: "Store API keys in Retool Secrets", body: "Go to Settings → Secrets in Retool. Never hardcode keys in query bodies. Reference them as {{ retool.env.YOUR_KEY }}." },
            { icon: "📊", title: "Separate read and write workflows", body: "Your ETL writes. Your webhook reads. Never combine them. Mixing concerns causes slow response times and debugging headaches." },
            { icon: "🧪", title: "Test webhooks with Postman first", body: "Before connecting to your Next.js app, test every webhook with Postman or the Retool test panel to validate the response shape." },
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <span className="text-xl shrink-0 mt-0.5">{tip.icon}</span>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">{tip.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
