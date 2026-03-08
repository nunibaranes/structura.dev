# Structura — Folder Structure

## Overview

The structure supports the MVP (challenges + AI feedback) and is prepared for future features (roadmaps, lessons, progress) without requiring reorganization.

- **MVP core** — what gets built now
- **Prepared slots** — empty folders with types that make future features easy to add

## Folder Structure

```
src/
├── app/                                  # Next.js App Router (pages + API)
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Landing page
│   ├── page.module.css
│   │
│   ├── challenges/                       # Challenge feature pages
│   │   ├── page.tsx                      # Challenge list / browse
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.tsx                  # Challenge workspace
│   │       └── page.module.css
│   │
│   ├── roadmap/                          # Learning paths (post-MVP)
│   │   ├── page.tsx                      # All roadmaps overview
│   │   ├── page.module.css
│   │   └── [roadmapSlug]/
│   │       ├── page.tsx                  # Single roadmap view
│   │       ├── page.module.css
│   │       └── lessons/
│   │           └── [lessonSlug]/
│   │               ├── page.tsx          # Lesson view
│   │               └── page.module.css
│   │
│   ├── progress/                         # User progress dashboard (post-MVP)
│   │   ├── page.tsx
│   │   └── page.module.css
│   │
│   └── api/                              # Server-side API routes
│       └── evaluate/
│           └── route.ts                  # AI evaluation endpoint
│
├── components/                           # Shared UI components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   │
│   ├── challenges/
│   │   ├── ChallengeCard.tsx             # Card for challenge list
│   │   ├── ChallengeCard.module.css
│   │   ├── ChallengeBrief.tsx            # Challenge description + constraints
│   │   ├── ChallengeBrief.module.css
│   │   ├── SolutionForm.tsx              # User input form
│   │   ├── SolutionForm.module.css
│   │   ├── FeedbackView.tsx              # AI feedback display
│   │   └── FeedbackView.module.css
│   │
│   ├── roadmap/                          # Post-MVP
│   │   ├── RoadmapCard.tsx
│   │   ├── RoadmapCard.module.css
│   │   ├── RoadmapTimeline.tsx
│   │   ├── RoadmapTimeline.module.css
│   │   ├── LessonCard.tsx
│   │   └── LessonCard.module.css
│   │
│   ├── progress/                         # Post-MVP
│   │   ├── ProgressBar.tsx
│   │   ├── ProgressBar.module.css
│   │   ├── StreakIndicator.tsx
│   │   └── StreakIndicator.module.css
│   │
│   └── ui/                               # Generic reusable primitives
│       ├── Button.tsx
│       ├── Button.module.css
│       ├── Badge.tsx
│       ├── Badge.module.css
│       ├── Card.tsx
│       └── Card.module.css
│
├── features/                             # Feature-level business logic
│   ├── challenges/
│   │   ├── hooks/
│   │   │   └── useChallengeWorkspace.ts  # Workspace state machine
│   │   └── utils/
│   │       └── filterChallenges.ts       # Filter/sort helpers
│   │
│   ├── evaluation/
│   │   ├── hooks/
│   │   │   └── useEvaluation.ts          # Handles submit → loading → feedback
│   │   └── utils/
│   │       └── validateSolution.ts       # Client-side validation
│   │
│   ├── roadmap/                          # Post-MVP
│   │   ├── hooks/
│   │   │   └── useRoadmapProgress.ts
│   │   └── utils/
│   │       └── resolveNextLesson.ts
│   │
│   └── progress/                         # Post-MVP
│       ├── hooks/
│       │   └── useUserProgress.ts
│       └── utils/
│           └── calculateStreak.ts
│
├── lib/                                  # Core infrastructure (framework-agnostic)
│   ├── ai/
│   │   ├── client.ts                     # Anthropic SDK wrapper
│   │   ├── prompt-builder.ts             # Constructs system + user prompts
│   │   └── response-parser.ts            # Parses AI response → Feedback type
│   │
│   └── challenges/
│       ├── types.ts                      # Challenge, UserSolution, Feedback
│       ├── data.ts                       # Barrel file exporting all challenges
│       └── utils.ts                      # Lookup by slug, category helpers
│
├── content/                              # Static content (no runtime logic)
│   ├── challenges/
│   │   ├── design-url-shortener.ts
│   │   ├── frontend-state-management.ts
│   │   ├── real-time-collaboration.ts
│   │   └── ...
│   │
│   ├── roadmaps/                         # Post-MVP
│   │   ├── frontend-to-architect.ts
│   │   ├── system-design-fundamentals.ts
│   │   └── ...
│   │
│   └── lessons/                          # Post-MVP
│       ├── service-boundaries/
│       │   ├── index.ts                  # Lesson metadata
│       │   └── content.mdx               # Lesson body
│       └── ...
│
├── types/                                # Shared type definitions
│   ├── challenge.ts                      # Challenge, UserSolution, Feedback
│   ├── roadmap.ts                        # Roadmap, Lesson (post-MVP)
│   └── progress.ts                       # UserProgress, Streak (post-MVP)
│
└── styles/
    └── globals.css                       # CSS reset + design tokens only
```

## Explanation of Each Major Folder

### `app/` — Pages and API routes

This is the Next.js App Router. Every folder maps to a URL. Every `page.tsx` is a route. Every `page.module.css` is its scoped styles.

The routing structure mirrors the product's information architecture:

```
/                       → Landing page
/challenges             → Browse all challenges
/challenges/[slug]      → Solve a specific challenge
/roadmap                → Browse learning paths (post-MVP)
/roadmap/[slug]         → View a roadmap's timeline
/roadmap/[slug]/lessons/[slug]  → Take a lesson (post-MVP)
/progress               → User dashboard (post-MVP)
```

Pages are thin. They import components and hooks, wire them together, and render. A page should rarely exceed 50-80 lines.

### `components/` — UI components

Pure rendering. Components receive props and render UI. They don't fetch data, don't call APIs, and don't contain business logic.

Organized by **feature domain**, not by component type:

```
components/
├── challenges/    # Components used by the challenge feature
├── roadmap/       # Components used by the roadmap feature
├── progress/      # Components used by the progress feature
├── layout/        # App-wide structural components
└── ui/            # Generic primitives (Button, Badge, Card)
```

The rule: if a component is used by only one feature, it lives in that feature's folder. If it's used across features, it moves to `ui/`.

### `features/` — Business logic

This is where hooks, state management, and feature-specific utilities live. It sits between `app/` (pages) and `components/` (UI), owning the *behavior* that neither should contain.

```
features/
├── challenges/
│   ├── hooks/useChallengeWorkspace.ts    # State machine for the workspace
│   └── utils/filterChallenges.ts
│
└── evaluation/
    ├── hooks/useEvaluation.ts            # submit() → loading → feedback
    └── utils/validateSolution.ts
```

This separation keeps pages thin and components reusable. Example of how they connect:

```typescript
// app/challenges/[slug]/page.tsx — the page wires things together
import { useChallengeWorkspace } from '@/features/challenges/hooks/useChallengeWorkspace';
import { useEvaluation } from '@/features/evaluation/hooks/useEvaluation';
import { ChallengeBrief } from '@/components/challenges/ChallengeBrief';
import { SolutionForm } from '@/components/challenges/SolutionForm';
import { FeedbackView } from '@/components/challenges/FeedbackView';
```

### `lib/` — Core infrastructure

Framework-agnostic modules that could work outside of React. The AI integration lives here because it has nothing to do with UI:

- `lib/ai/client.ts` — Anthropic SDK instance
- `lib/ai/prompt-builder.ts` — constructs prompts from challenge + solution
- `lib/ai/response-parser.ts` — parses Claude's JSON into typed `Feedback`

This code is only called from `app/api/` route handlers (server-side).

### `content/` — Static content

All challenge definitions, roadmap definitions, and lesson content. These are data files, not logic. They export typed objects or MDX content.

This folder is effectively a "file-based CMS." If you later move to a real CMS or database, you replace imports from `content/` with API calls — nothing else changes.

### `types/` — Shared type definitions

Cross-cutting types that multiple folders reference:

```typescript
// types/challenge.ts
export interface Challenge {
  slug: string;
  title: string;
  description: string;
  category: 'system-design' | 'frontend-architecture';
  difficulty: 'intermediate' | 'advanced';
  constraints: string[];
  evaluationHints: string[];
}

export interface UserSolution {
  challengeSlug: string;
  components: string;
  dataFlow: string;
  tradeoffs: string;
  freeText: string;
}

export interface Feedback {
  strengths: string[];
  probingQuestions: string[];
  missedConcepts: string[];
  suggestions: string[];
  overallAssessment: string;
}
```

```typescript
// types/roadmap.ts (post-MVP)
export interface Roadmap {
  slug: string;
  title: string;
  description: string;
  lessonSlugs: string[];
  challengeSlugs: string[];
}

export interface Lesson {
  slug: string;
  title: string;
  roadmapSlug: string;
  order: number;
  contentPath: string;
}
```

## How Features Are Organized

Each feature spans four folders with clear responsibilities:

```
┌──────────────┬───────────────────────────────────────┐
│    Folder    │           Responsibility               │
├──────────────┼───────────────────────────────────────┤
│ app/         │ Route → page → wires hooks + components│
│ components/  │ Render UI from props                   │
│ features/    │ Hooks + business logic                 │
│ content/     │ Static data                            │
│ types/       │ Shared interfaces                      │
│ lib/         │ Infrastructure (AI, utilities)          │
└──────────────┴───────────────────────────────────────┘
```

Data flows top-down:

```
content/        → Static data definitions
    ↓
lib/            → Data utilities, AI integration
    ↓
features/       → Hooks consuming data + lib
    ↓
components/     → UI receiving props from hooks
    ↓
app/            → Pages wiring it all together
```

**The dependency rule:** arrows only point down. Components never import from `features/`. Features never import from `app/`. This keeps each layer testable and replaceable independently.
