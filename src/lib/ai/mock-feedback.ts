import type { AIFeedback } from '@/types/challenge';

export function generateMockFeedback(challengeSlug: string): AIFeedback {
  return {
    challengeSlug,
    strengths: [
      'Clear separation of concerns between components.',
      'Good consideration of scalability constraints.',
      'Practical tradeoff analysis — shows real-world thinking.',
    ],
    probingQuestions: [
      'How would your design handle a sudden 10x spike in traffic?',
      'What happens if the primary data store becomes unavailable?',
      'You mentioned caching — what is your cache invalidation strategy?',
    ],
    missedConcepts: [
      'Monitoring and observability — how would you detect issues in production?',
      'Data consistency model — are you assuming strong or eventual consistency?',
    ],
    suggestions: [
      'Consider adding a circuit breaker pattern between your services to handle partial failures gracefully.',
      'Think about how you would migrate to this architecture incrementally rather than as a big-bang deployment.',
    ],
    overallAssessment:
      'Solid foundation with good instincts on component separation and scalability. The main gaps are around failure handling and observability. Focus on what happens when things go wrong, not just the happy path.',
    evaluatedAt: new Date().toISOString(),
  };
}
