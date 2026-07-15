export type RouteResult = {
  intent: string;
  queue: string;
  priority: "low" | "normal" | "high";
  confidence: number;
  signals: string[];
};

const intents = [
  { intent: "billing", queue: "revenue-ops", terms: ["invoice", "billing", "refund", "charge"] },
  { intent: "technical", queue: "tier-2-support", terms: ["bug", "error", "crash", "api", "latency"] },
  { intent: "security", queue: "security-response", terms: ["breach", "phishing", "compromised", "malware"] },
  { intent: "account", queue: "customer-success", terms: ["login", "password", "locked", "access"] }
];

const urgentTerms = ["urgent", "down", "blocked", "breach", "production", "cannot access"];

export function routeMessage(message: string): RouteResult {
  const lower = message.toLowerCase();
  const scored = intents.map((candidate) => ({
    ...candidate,
    score: candidate.terms.filter((term) => lower.includes(term)).length
  }));
  const best = scored.sort((a, b) => b.score - a.score)[0];
  const urgentSignals = urgentTerms.filter((term) => lower.includes(term));
  const priority = urgentSignals.length > 0 || best.intent === "security" ? "high" : best.score > 1 ? "normal" : "low";
  const confidence = Math.min(0.95, 0.45 + best.score * 0.2 + urgentSignals.length * 0.05);

  return {
    intent: best.score === 0 ? "general" : best.intent,
    queue: best.score === 0 ? "frontline-support" : best.queue,
    priority,
    confidence,
    signals: [...best.terms.filter((term) => lower.includes(term)), ...urgentSignals]
  };
}
