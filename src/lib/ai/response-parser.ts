import type { AIFeedback } from '@/types/challenge';

interface RawFeedback {
  summary?: unknown;
  strengths?: unknown;
  gapsAndRisks?: unknown;
  tradeoffs?: unknown;
  nextStep?: unknown;
  reflectionQuestion?: unknown;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function toString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export function parseAIResponse(raw: string, challengeSlug: string): AIFeedback {
  // Strip markdown fences if the model wraps the JSON
  const cleaned = raw.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();

  const parsed: RawFeedback = JSON.parse(cleaned);

  return {
    challengeSlug,
    summary: toString(parsed.summary, 'Unable to generate summary.'),
    strengths: toStringArray(parsed.strengths),
    gapsAndRisks: toStringArray(parsed.gapsAndRisks),
    tradeoffs: toStringArray(parsed.tradeoffs),
    nextStep: toString(parsed.nextStep, 'Review your design and consider edge cases.'),
    reflectionQuestion: toString(parsed.reflectionQuestion, 'What would change in your design if requirements doubled?'),
    evaluatedAt: new Date().toISOString(),
  };
}
