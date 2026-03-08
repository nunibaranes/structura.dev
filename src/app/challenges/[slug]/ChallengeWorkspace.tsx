'use client';

import type { Challenge, UserSolution, LearningMaterial } from '@/types/challenge';
import { useEvaluation } from '@/features/evaluation/hooks/useEvaluation';
import { ChallengeBrief } from '@/components/challenges/ChallengeBrief';
import { LearnSection } from '@/components/challenges/LearnSection';
import { SolutionForm } from '@/components/challenges/SolutionForm';
import { FeedbackView } from '@/components/challenges/FeedbackView';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

interface ChallengeWorkspaceProps {
  challenge: Challenge;
  learningMaterial?: LearningMaterial;
}

export function ChallengeWorkspace({ challenge, learningMaterial }: ChallengeWorkspaceProps) {
  const { state, evaluate, reset } = useEvaluation();

  function handleSubmit(solution: UserSolution) {
    evaluate(solution);
  }

  return (
    <>
      <ChallengeBrief challenge={challenge} />

      {learningMaterial && <LearnSection material={learningMaterial} />}

      <hr className={styles.divider} />

      {state.status === 'done' ? (
        <>
          <div>
            <h2 className={styles.sectionTitle}>AI Feedback</h2>
          </div>
          <FeedbackView feedback={state.feedback} />
          <Button variant="secondary" onClick={reset}>
            Try Again
          </Button>
        </>
      ) : (
        <>
          <div>
            <h2 className={styles.sectionTitle}>Your Solution</h2>
          </div>
          <SolutionForm
            challengeSlug={challenge.slug}
            onSubmit={handleSubmit}
            isSubmitting={state.status === 'evaluating'}
          />
          {state.status === 'error' && (
            <p className={styles.errorMessage}>{state.message}</p>
          )}
        </>
      )}
    </>
  );
}
