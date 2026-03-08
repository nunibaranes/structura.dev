# Structura MVP — Data Model

## Entity Relationship Overview

```
LearningPath
    │
    │ 1:many
    ▼
LearningPathStep
    │
    │ references either:
    ├──────────────────┐
    ▼                  ▼
  Lesson           Challenge
                       │
                       │ 1:many (post-MVP, runtime)
                       ▼
                   Submission
                       │
                       │ 1:1
                       ▼
                   AIFeedback

Progress (post-MVP)
    │
    │ tracks user state across
    ▼
LearningPath / Challenge / Lesson
```

## Entity Definitions

### LearningPath

A curated sequence of lessons and challenges forming a learning journey.

```typescript
interface LearningPath {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  steps: LearningPathStep[];
}

interface LearningPathStep {
  order: number;
  type: 'lesson' | 'challenge';
  slug: string;                    // references Lesson.slug or Challenge.slug
}

type Difficulty = 'beginner' | 'intermediate' | 'advanced';
```

### Lesson

A bite-sized learning unit covering a single concept.

```typescript
interface Lesson {
  slug: string;
  title: string;
  description: string;
  learningPathSlug: string;
  order: number;
  contentPath: string;             // path to MDX file
  concepts: string[];              // tags for what this lesson covers
  estimatedMinutes: number;
}
```

### Challenge

An architecture problem the user solves. This is the most important entity in the MVP.

```typescript
interface Challenge {
  slug: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: Difficulty;
  constraints: string[];
  evaluationHints: string[];       // guides AI evaluation, not shown to user
  concepts: string[];              // architecture concepts tested
  learningPathSlug?: string;       // optional link to a learning path
}

type ChallengeCategory =
  | 'system-design'
  | 'frontend-architecture'
  | 'data-modeling'
  | 'api-design';
```

### Submission

A user's solution to a challenge. Not persisted in MVP (exists only in runtime state). Defined here to establish the contract between the form and the API.

```typescript
interface Submission {
  challengeSlug: string;
  solution: UserSolution;
  submittedAt: string;             // ISO timestamp
}

interface UserSolution {
  components: string;              // what components/services they proposed
  dataFlow: string;                // how data moves through the system
  tradeoffs: string;               // what tradeoffs they considered
  freeText: string;                // open-ended explanation
}
```

### AIFeedback

The structured response from the AI coach. Returned by the API, rendered on the client.

```typescript
interface AIFeedback {
  challengeSlug: string;
  strengths: string[];
  probingQuestions: string[];
  missedConcepts: string[];
  suggestions: string[];
  overallAssessment: string;
  evaluatedAt: string;             // ISO timestamp
}
```

### Progress (post-MVP)

Tracks a user's state across the platform. Included here to show how the model extends — not built in V1.

```typescript
interface UserProgress {
  odayStreak: number;
  lastActiveDate: string;
  completedChallengeSlugs: string[];
  completedLessonSlugs: string[];
  pathProgress: PathProgress[];
}

interface PathProgress {
  learningPathSlug: string;
  completedStepSlugs: string[];
  currentStepOrder: number;
}
```

## Relationships

```
┌──────────────────────────────────────────────────────────┐
│                     RELATIONSHIPS                         │
├───────────────────┬──────────┬────────────────────────────┤
│ From              │ Relation │ To                         │
├───────────────────┼──────────┼────────────────────────────┤
│ LearningPath      │ 1:many   │ LearningPathStep           │
│ LearningPathStep  │ 1:1      │ Lesson OR Challenge (slug) │
│ Lesson            │ many:1   │ LearningPath               │
│ Challenge         │ many:1   │ LearningPath (optional)    │
│ Submission        │ many:1   │ Challenge                  │
│ AIFeedback        │ 1:1      │ Submission                 │
│ UserProgress      │ 1:many   │ PathProgress               │
│ PathProgress      │ many:1   │ LearningPath               │
└───────────────────┴──────────┴────────────────────────────┘
```

Key design decisions:
- **Challenges can exist independently of a learning path.** A user can browse and solve challenges without following a path. The `learningPathSlug` is optional.
- **Lessons always belong to a learning path.** Standalone lessons without context don't make sense for this product.
- **AIFeedback is 1:1 with Submission.** Each submission gets exactly one feedback response. No multi-turn conversation in the MVP.
- **All relationships use slugs, not IDs.** Since everything is static content in the MVP, slugs serve as both identifiers and URL segments.

## Example Data

### Example Learning Path

```typescript
const frontendToArchitect: LearningPath = {
  slug: 'frontend-to-architect',
  title: 'Frontend to Architect',
  description: 'A guided path for frontend engineers growing into architecture roles. Covers component design, state management at scale, API design, and system-level thinking.',
  difficulty: 'intermediate',
  estimatedHours: 12,
  steps: [
    { order: 1, type: 'lesson',    slug: 'what-is-architecture' },
    { order: 2, type: 'lesson',    slug: 'component-boundaries' },
    { order: 3, type: 'challenge', slug: 'design-system-architecture' },
    { order: 4, type: 'lesson',    slug: 'state-management-patterns' },
    { order: 5, type: 'challenge', slug: 'frontend-state-management' },
    { order: 6, type: 'lesson',    slug: 'api-design-basics' },
    { order: 7, type: 'challenge', slug: 'design-api-gateway' },
  ],
};
```

### Example Lesson

```typescript
const componentBoundaries: Lesson = {
  slug: 'component-boundaries',
  title: 'Drawing Component Boundaries',
  description: 'Learn how to decide where one component ends and another begins. Covers cohesion, coupling, and the single responsibility principle applied to UI.',
  learningPathSlug: 'frontend-to-architect',
  order: 2,
  contentPath: 'content/lessons/component-boundaries/content.mdx',
  concepts: ['cohesion', 'coupling', 'single-responsibility', 'component-design'],
  estimatedMinutes: 8,
};
```

### Example Challenge

```typescript
const frontendStateManagement: Challenge = {
  slug: 'frontend-state-management',
  title: 'State Management at Scale',
  description: 'You are the tech lead of a large e-commerce frontend. The app has grown to 200+ components across 5 feature teams. State is managed inconsistently — some teams use Redux, others use local state, and one team built a custom pub/sub system. The CEO wants to launch a real-time inventory feature that requires shared state across multiple page sections. Design a state management architecture for this application.',
  category: 'frontend-architecture',
  difficulty: 'intermediate',
  constraints: [
    '5 feature teams must be able to work independently',
    'Real-time inventory updates must reflect across all visible components within 2 seconds',
    'The solution must be incrementally adoptable (no big-bang rewrite)',
    'Bundle size matters — the app already has performance issues',
  ],
  evaluationHints: [
    'Should address the distinction between server state and client state',
    'Should consider team autonomy and code ownership boundaries',
    'Should have a migration strategy, not just a target architecture',
    'Real-time aspect should address WebSocket or SSE for inventory updates',
    'Should mention how shared state is scoped to avoid global coupling',
  ],
  concepts: ['state-management', 'scalability', 'team-architecture', 'real-time'],
  learningPathSlug: 'frontend-to-architect',
};
```

### Example Submission + Feedback (runtime)

```typescript
const submission: Submission = {
  challengeSlug: 'frontend-state-management',
  solution: {
    components: 'Three layers: 1) Local component state for UI-only concerns (modals, form inputs). 2) Feature-level stores using Zustand — one store per feature team, scoped to their domain. 3) A shared real-time layer using React Query + WebSocket subscription for inventory data.',
    dataFlow: 'Inventory updates flow from WebSocket → React Query cache → components subscribe via useQuery. Feature stores are independent and don\'t cross-reference each other. A thin "bridge" hook connects inventory data to feature stores that need it.',
    tradeoffs: 'Chose Zustand over Redux for lower boilerplate and better team independence — each team owns their store. Trade-off: less enforced structure means teams could diverge in patterns. Mitigation: shared ESLint rules and a lightweight architecture guide.',
    freeText: 'Migration plan: Phase 1 — introduce React Query for all server state (2 weeks per team). Phase 2 — migrate Redux stores to Zustand one team at a time. Phase 3 — add WebSocket layer for real-time inventory. Each phase is independently shippable.',
  },
  submittedAt: '2026-03-07T14:30:00Z',
};

const feedback: AIFeedback = {
  challengeSlug: 'frontend-state-management',
  strengths: [
    'Clear separation between UI state, feature state, and server state — this is the right mental model.',
    'The migration plan is phased and realistic. Each phase ships independently, which reduces risk.',
    'Good instinct to scope stores per feature team. This supports team autonomy.',
  ],
  probingQuestions: [
    'What happens when two feature teams need the same piece of state (e.g., the user\'s cart and the inventory count)? Who owns that shared state?',
    'You mentioned a "bridge" hook for connecting inventory to feature stores. How would you prevent this from becoming a God hook that couples everything together?',
    'If a WebSocket connection drops, how does the UI behave? Does the user see stale inventory data, a loading state, or an error?',
  ],
  missedConcepts: [
    'Optimistic updates — for actions like "add to cart," should the UI update immediately or wait for server confirmation?',
    'State devtools and debugging — with 5 teams using independent stores, how would you debug cross-feature state issues in production?',
  ],
  suggestions: [
    'Consider defining a shared "contract" type for cross-feature data (like CartItem or InventoryStatus) to prevent shape mismatches between teams.',
    'For the real-time layer, evaluate whether all components need live updates or only visible ones. Subscription management could save significant bandwidth.',
  ],
  overallAssessment: 'Strong design with a practical migration strategy. The main gap is handling cross-team shared state — your current design handles independence well but doesn\'t fully address the boundaries where features must collaborate. Focus on defining those seams explicitly.',
  evaluatedAt: '2026-03-07T14:30:12Z',
};
```

## What's MVP vs Post-MVP

| Entity         | MVP                          | Post-MVP                        |
|----------------|------------------------------|---------------------------------|
| Challenge      | Static TS files, fully used  | Database-backed, user-created   |
| Submission     | Runtime only, not persisted  | Saved to DB, linked to user     |
| AIFeedback     | Runtime only, not persisted  | Saved to DB, history viewable   |
| LearningPath   | Static TS files, display only| Unlockable, trackable           |
| Lesson         | Not built                    | MDX content, interactive        |
| UserProgress   | Not built                    | Full tracking, streaks, stats   |
