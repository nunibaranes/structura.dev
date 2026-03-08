import type { AIFeedback } from '@/types/challenge';

interface RawFeedback {
  strengths?: unknown;
  probingQuestions?: unknown;
  missedConcepts?: unknown;
  suggestions?: unknown;
  overallAssessment?: unknown;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

export function parseAIResponse(raw: string, challengeSlug: string): AIFeedback {
  // Strip markdown fences if the model wraps the JSON
  const cleaned = raw.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();

  const parsed: RawFeedback = JSON.parse(cleaned);

  return {
    challengeSlug,
    strengths: toStringArray(parsed.strengths),
    probingQuestions: toStringArray(parsed.probingQuestions),
    missedConcepts: toStringArray(parsed.missedConcepts),
    suggestions: toStringArray(parsed.suggestions),
    overallAssessment:
      typeof parsed.overallAssessment === 'string'
        ? parsed.overallAssessment
        : 'Unable to generate assessment.',
    evaluatedAt: new Date().toISOString(),
  };
}
