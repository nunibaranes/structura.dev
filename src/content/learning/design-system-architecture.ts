import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'design-system-architecture',
  concepts: [
    {
      title: 'Design Tokens',
      explanation:
        'Design tokens are the smallest decisions in a design system — colors, spacing, typography, shadows — stored as platform-agnostic variables. They ensure consistency across components and make theming possible. Change one token, and every component using it updates automatically.',
    },
    {
      title: 'Component API Design',
      explanation:
        'A design system component\'s props are its API. Good APIs are minimal (few required props), consistent (similar components behave similarly), and composable (components work together without tight coupling). The API should make the common case easy and the uncommon case possible.',
    },
    {
      title: 'Versioning and Distribution',
      explanation:
        'Design system components are shared across teams, so breaking changes are costly. Semantic versioning (major.minor.patch) communicates change impact. Distribution via npm packages lets teams adopt updates at their own pace rather than forcing synchronized upgrades.',
    },
    {
      title: 'Composition over Configuration',
      explanation:
        'A Button with 30 props for every possible variation is hard to use and maintain. Instead, compose smaller primitives: a base Button, an IconButton that wraps it, a LinkButton that uses the same styles on an anchor tag. Composition scales better than configuration.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Building components that are too rigid or too flexible',
      why: 'Too rigid: teams fork the component because it doesn\'t support their use case. Too flexible: the component accepts so many props that it\'s hard to use correctly. Aim for the 80/20 — cover common cases well, provide escape hatches for the rest.',
    },
    {
      mistake: 'No clear ownership or contribution model',
      why: 'Without ownership, the design system either stagnates (nobody maintains it) or fragments (everyone adds their own versions). Define who reviews PRs, who decides on API changes, and how teams request new components.',
    },
    {
      mistake: 'Coupling the design system to one application\'s patterns',
      why: 'If the design system assumes a specific state management library or routing framework, it can\'t be reused across different apps. Keep components framework-aware but application-agnostic.',
    },
  ],
  quickCheck: [
    {
      question: 'A Button component has 25 boolean props for different variants (outlined, rounded, compact, etc). What\'s the better approach?',
      options: [
        'Add more props as new variants are needed',
        'Use a single "variant" prop with predefined options',
        'Let consumers style the button with className overrides',
        'Create separate components for each variant',
      ],
      correctIndex: 1,
      explanation:
        'A single "variant" prop (e.g., "primary", "secondary", "ghost") is easier to use, easier to document, and prevents invalid combinations. 25 boolean props means 33 million possible combinations — most of which are meaningless.',
    },
    {
      question: 'Team A needs a design system update, but Team B isn\'t ready for breaking changes. How should the system handle this?',
      options: [
        'Force all teams to update simultaneously',
        'Maintain two separate copies of the design system',
        'Use semantic versioning so teams can adopt updates at their own pace',
        'Never make breaking changes',
      ],
      correctIndex: 2,
      explanation:
        'Semantic versioning lets Team A upgrade to v3.0 while Team B stays on v2.x. Major versions signal breaking changes. Teams control their own upgrade timeline, and the design system can evolve without blocking anyone.',
    },
  ],
};
