export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type ChallengeCategory =
  | 'system-design'
  | 'frontend-architecture'
  | 'data-modeling'
  | 'api-design';

export interface Challenge {
  slug: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: Difficulty;
  constraints: string[];
  evaluationHints: string[];
  concepts: string[];
}

export interface UserSolution {
  challengeSlug: string;
  components: string;
  dataFlow: string;
  tradeoffs: string;
  freeText: string;
}

export interface QuickCheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningMaterial {
  challengeSlug: string;
  concepts: {
    title: string;
    explanation: string;
  }[];
  commonMistakes: {
    mistake: string;
    why: string;
  }[];
  quickCheck: QuickCheckQuestion[];
}

export interface AIFeedback {
  challengeSlug: string;
  summary: string;
  strengths: string[];
  gapsAndRisks: string[];
  tradeoffs: string[];
  nextStep: string;
  reflectionQuestion: string;
  evaluatedAt: string;
}
