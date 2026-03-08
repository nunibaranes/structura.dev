import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'design-system-architecture',
  title: 'Architect a Design System',
  description:
    'Your company has 3 product teams building separate React applications. They share a Figma design library, but each team implements components independently, leading to visual inconsistencies, duplicated effort, and diverging patterns. You\'ve been asked to architect a shared design system. Define the technical architecture — how components are built, packaged, distributed, versioned, and consumed across teams.',
  category: 'frontend-architecture',
  difficulty: 'intermediate',
  constraints: [
    'Each product team must be able to adopt the design system incrementally',
    'Teams should not be blocked by design system releases',
    'The design system must support theming (light/dark + brand variations)',
    'Components must be accessible (WCAG 2.1 AA)',
  ],
  evaluationHints: [
    'Should address monorepo vs multi-repo strategy for the component library',
    'Should consider versioning and release strategy (semver, changesets)',
    'Should mention the component API design philosophy (composition vs configuration)',
    'Should address how design tokens flow from Figma to code',
    'Should consider documentation and adoption strategy, not just technical architecture',
  ],
  concepts: ['design-systems', 'component-architecture', 'monorepo', 'theming'],
};
