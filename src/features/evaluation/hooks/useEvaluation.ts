'use client';

import { useState } from 'react';
import type { UserSolution, AIFeedback } from '@/types/challenge';

type EvaluationState =
  | { status: 'idle' }
  | { status: 'evaluating' }
  | { status: 'done'; feedback: AIFeedback }
  | { status: 'error'; message: string };

export function useEvaluation() {
  const [state, setState] = useState<EvaluationState>({ status: 'idle' });

  async function evaluate(solution: UserSolution) {
    setState({ status: 'evaluating' });

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solution),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Evaluation failed');
      }

      const feedback: AIFeedback = await response.json();
      setState({ status: 'done', feedback });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to evaluate. Please try again.';
      setState({ status: 'error', message });
    }
  }

  function reset() {
    setState({ status: 'idle' });
  }

  return { state, evaluate, reset };
}
