# Structura MVP — Product Architecture

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                    Client                        │
│              (Next.js App Router)                │
│                                                  │
│  ┌────────────┐ ┌────────────┐ ┌──────────────┐ │
│  │  Landing   │ │ Challenge  │ │  Challenge   │ │
│  │   Page     │ │   List     │ │  Workspace   │ │
│  └────────────┘ └────────────┘ └──────┬───────┘ │
│                                       │          │
└───────────────────────────────────────┼──────────┘
                                        │
                                        │ POST /api/evaluate
                                        │
┌───────────────────────────────────────┼──────────┐
│                  Server                │          │
│            (Next.js API Routes)        │          │
│                                        ▼          │
│  ┌─────────────────────────────────────────────┐ │
│  │            AI Evaluation Service             │ │
│  │  ┌───────────────┐  ┌────────────────────┐  │ │
│  │  │ Prompt Builder │  │  Response Parser   │  │ │
│  │  └───────┬───────┘  └────────────────────┘  │ │
│  └──────────┼──────────────────────────────────┘ │
│             │                                     │
└─────────────┼─────────────────────────────────────┘
              │
              │ Claude API
              ▼
┌──────────────────────┐
│   Anthropic Claude   │
└──────────────────────┘

┌──────────────────────┐
│  Challenge Data      │
│  (static JSON/TS)    │
│  lives in repo       │
└──────────────────────┘
```

Key principle: The server layer is *thin*. It exists only to keep the API key secret and to build prompts. All rendering, state, and interaction logic lives on the client.

## 2. Frontend Architecture

```
src/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # Landing page
│   ├── page.module.css
│   ├── challenges/
│   │   ├── page.tsx                  # Challenge list
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.tsx              # Challenge workspace (brief + input + feedback)
│   │       └── page.module.css
│   ├── api/
│   │   └── evaluate/
│   │       └── route.ts             # AI evaluation endpoint
│   └── layout.tsx                    # Root layout (minimal global resets only)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   ├── challenges/
│   │   ├── ChallengeCard.tsx
│   │   ├── ChallengeCard.module.css
│   │   ├── ChallengeBrief.tsx
│   │   ├── ChallengeBrief.module.css
│   │   ├── SolutionForm.tsx
│   │   ├── SolutionForm.module.css
│   │   ├── FeedbackView.tsx
│   │   └── FeedbackView.module.css
│   └── ui/
│       ├── Button.tsx
│       ├── Button.module.css
│       ├── Badge.tsx
│       └── Badge.module.css
│
├── lib/
│   ├── ai/
│   │   ├── prompt-builder.ts         # Constructs system + user prompts
│   │   ├── response-parser.ts        # Structures raw AI output
│   │   └── client.ts                 # Anthropic SDK wrapper
│   └── challenges/
│       ├── types.ts                  # Challenge, Solution, Feedback types
│       ├── data.ts                   # Exports challenge array
│       └── utils.ts                  # Filtering, lookup by slug
│
├── content/
│   └── challenges/
│       ├── design-url-shortener.ts
│       ├── frontend-state-management.ts
│       └── ...                       # Each challenge as a typed object
│
└── styles/
    └── globals.css                   # Minimal resets and CSS variables only
```

### Styling approach: CSS Modules

Every component and page owns its styles via a co-located `.module.css` file. This gives scoped class names, zero style leakage, and no naming collisions.

`globals.css` contains **only**:
- CSS reset / normalize
- CSS custom properties (design tokens: colors, spacing, fonts, radii)
- Base typography on `body`

Components consume tokens via `var(--token-name)` and define all their styles locally:

```css
/* Button.module.css */
.button {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-weight: 600;
}

.secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary', ...props }) {
  const className = variant === 'secondary'
    ? `${styles.button} ${styles.secondary}`
    : styles.button;
  return <button className={className} {...props} />;
}
```

### Component responsibility boundaries

| Component | Owns | Does NOT own |
|---|---|---|
| `SolutionForm` | Input state, validation, submit trigger | AI call, feedback display |
| `FeedbackView` | Rendering structured feedback | Fetching feedback |
| `ChallengeWorkspace` (page) | Orchestrates the full flow: load challenge → collect solution → call API → show feedback | UI details of sub-components |
| `ChallengeCard` | Visual presentation of a challenge in a list | Navigation logic |

## 3. Data Flow

```
                    CHALLENGE DATA FLOW

  ┌──────────────┐
  │ content/     │    Build time: challenges are imported
  │ challenges/  │    as static data. No fetch needed.
  │ *.ts files   │
  └──────┬───────┘
         │ import
         ▼
  ┌──────────────┐     ┌──────────────┐
  │ Challenge    │────▶│ Challenge    │
  │ List Page    │     │ Workspace    │
  └──────────────┘     └──────┬───────┘
                              │
                              │ User writes solution
                              ▼
                    ┌──────────────────┐
                    │  SolutionForm    │
                    │  (local state)   │
                    └────────┬─────────┘
                             │ onSubmit
                             ▼
              ┌─────────────────────────────┐
              │  POST /api/evaluate         │
              │  Body: {                    │
              │    challengeSlug: string    │
              │    solution: UserSolution   │
              │  }                          │
              └──────────────┬──────────────┘
                             │
                    SERVER SIDE
                             │
                             ▼
              ┌─────────────────────────────┐
              │  prompt-builder.ts          │
              │  Combines:                  │
              │   - system prompt (coach)   │
              │   - challenge context       │
              │   - evaluation criteria     │
              │   - user's solution         │
              └──────────────┬──────────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │  Claude API call            │
              └──────────────┬──────────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │  response-parser.ts         │
              │  Structures raw response    │
              │  into typed Feedback obj    │
              └──────────────┬──────────────┘
                             │
                    CLIENT SIDE
                             │
                             ▼
              ┌─────────────────────────────┐
              │  FeedbackView               │
              │  Renders:                   │
              │   - Strengths               │
              │   - Probing questions       │
              │   - Missed concepts         │
              │   - Suggested improvements  │
              └─────────────────────────────┘
```

**State management:** React `useState` within the workspace page component. No global state library needed. The workspace page holds three states:

```typescript
type WorkspaceState =
  | { phase: 'solving' }
  | { phase: 'evaluating' }
  | { phase: 'feedback'; feedback: Feedback }
```

## 4. AI Integration

The AI layer lives entirely in `src/lib/ai/` and is called only from the server-side API route.

**prompt-builder.ts** is the most important file in the codebase. It constructs the prompt from three pieces:

```
┌─────────────────────────────────────────────────────┐
│                   SYSTEM PROMPT                      │
│  "You are a senior software architect coach..."     │
│  - Persona and tone                                  │
│  - Output format (structured sections)               │
│  - Rules (don't give full solutions, ask questions)  │
└─────────────────────────────────────────────────────┘
                        +
┌─────────────────────────────────────────────────────┐
│               CHALLENGE CONTEXT                      │
│  - Challenge description                             │
│  - Constraints                                       │
│  - Evaluation hints (what a good answer covers)      │
│  - Common pitfalls for this challenge                │
└─────────────────────────────────────────────────────┘
                        +
┌─────────────────────────────────────────────────────┐
│               USER'S SOLUTION                        │
│  - Raw text from the form                            │
└─────────────────────────────────────────────────────┘
```

**Why this separation matters:**
- The system prompt is stable across all challenges — you refine it once
- The challenge context is per-challenge — each challenge file includes its own evaluation hints
- The user solution is dynamic — passed at runtime

**response-parser.ts** takes the AI's raw text and structures it into a typed object:

```typescript
interface Feedback {
  strengths: string[];
  probingQuestions: string[];
  missedConcepts: string[];
  suggestions: string[];
  overallAssessment: string;
}
```

Use a structured output format in the prompt (ask Claude to respond in JSON) so parsing is reliable.

**client.ts** is a thin wrapper around the Anthropic SDK — keeps API config in one place.

## 5. Modularity and Extensibility

The architecture is designed so each future feature maps to a clear extension point:

```
CURRENT MVP                    FUTURE EXTENSION
─────────────                  ─────────────────

Static challenge files    →    CMS or database-backed challenges
  (content/*.ts)               (swap data.ts for a fetch layer)

Single API route           →   Multiple routes or service layer
  (/api/evaluate)              (/api/evaluate, /api/hint, /api/conversation)

prompt-builder.ts          →   Multiple prompt strategies
  (one prompt template)        (evaluation, hints, interview mode)

Text-only solution input   →   Diagram editor, structured forms
  (SolutionForm.tsx)           (swap component, same data contract)

No auth                    →   Auth layer (NextAuth / Clerk)
                               (wraps pages, adds userId to API calls)

No persistence             →   Database for history
                               (add after auth, store submissions + feedback)

CSS Modules + tokens       →   Full design system
  (globals.css variables)      (extract tokens to a theme file, add themes)
```

**The contracts that make this work:**

```typescript
// This interface is the seam between challenges and the AI layer.
// As long as both sides respect it, they can evolve independently.

interface Challenge {
  slug: string;
  title: string;
  description: string;
  category: 'system-design' | 'frontend-architecture';
  difficulty: 'intermediate' | 'advanced';
  constraints: string[];
  evaluationHints: string[];   // guides the AI, not shown to user
}

interface UserSolution {
  challengeSlug: string;
  components: string;          // what components/services they proposed
  dataFlow: string;            // how data moves through the system
  tradeoffs: string;           // what tradeoffs they considered
  freeText: string;            // open-ended explanation
}

interface Feedback {
  strengths: string[];
  probingQuestions: string[];
  missedConcepts: string[];
  suggestions: string[];
  overallAssessment: string;
}
```

These three types are the backbone. Every layer — UI, API, AI — communicates through them.

## 6. Backend vs Frontend Responsibilities

| Concern | Where | Why |
|---|---|---|
| Challenge data | Frontend (static import) | No latency, no API needed, works at build time |
| Challenge rendering | Frontend | Pure UI |
| Solution form state | Frontend | Local component state, no persistence |
| Solution validation | Frontend | Basic checks (non-empty fields) before submit |
| AI prompt construction | Backend (API route) | Keeps system prompt and evaluation hints server-side — users shouldn't see the grading criteria |
| API key management | Backend (env var) | Never expose to client |
| Claude API call | Backend | Server-to-server, no CORS, key stays safe |
| Response parsing | Backend | Parse and validate before sending to client |
| Feedback rendering | Frontend | Pure UI |
| Analytics | Frontend | Client-side script (Vercel Analytics / Plausible) |
| Error handling | Both | Frontend shows user-friendly errors; backend logs details |

**The rule of thumb:** if it touches the API key or the system prompt, it's backend. Everything else is frontend.
