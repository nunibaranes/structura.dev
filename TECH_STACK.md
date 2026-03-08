# Structura MVP — Tech Stack

## 1. Frontend Framework: Next.js (App Router)

**Why:** You already know React and TypeScript. Next.js gives you the one thing a plain React SPA can't — server-side API routes to keep your Claude API key safe. Without it, you'd need a separate backend.

Specifics:
- **App Router** over Pages Router — it's the current direction of Next.js, and Server Components let you render the challenge list with zero client JS
- **Server Components** for static pages (landing, challenge list) — they need no interactivity
- **Client Components** only for the challenge workspace where the user types and submits
- **Route Handlers** (`app/api/evaluate/route.ts`) for the AI endpoint — one file, no Express needed

**What you avoid:** Setting up a separate backend, configuring CORS, managing two deployments.

## 2. State Management: React useState + URL State

**Why:** The MVP has exactly one stateful screen — the challenge workspace. There's no cross-page state, no shared data between components, no cache to manage.

```typescript
// This is the entire state model for the workspace
const [phase, setPhase] = useState<
  | { step: 'solving' }
  | { step: 'evaluating' }
  | { step: 'feedback'; data: Feedback }
>({ step: 'solving' });
```

- **Form state** lives in `SolutionForm` via `useState`
- **Feedback state** lives in the workspace page
- **Current challenge** is derived from the URL slug — no state needed
- **Challenge filtering** (if added) goes in URL search params, not React state

**What you avoid:** Redux, Zustand, Jotai, React Query — all excellent tools you don't need yet. Adding any of them now adds dependencies, boilerplate, and decisions that don't serve a 3-page app.

**When to reconsider:** If you add auth + saved history, React Query becomes useful for server state. That's a post-MVP concern.

## 3. Styling: CSS Modules + CSS Custom Properties

**Why:** Co-located, scoped styles per component. CSS Modules are built into Next.js — zero config, zero dependencies, zero runtime cost.

The setup:

```
globals.css          → Design tokens as CSS custom properties
*.module.css         → Component-scoped styles consuming those tokens
```

```css
/* globals.css — the only global file */
:root {
  --color-primary: #6366f1;
  --color-surface: #ffffff;
  --color-text: #1e1e2e;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
  --color-success: #22c55e;
  --color-warning: #f59e0b;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

**Why not Tailwind:** Given the explicit preference for per-component styles and a background in design systems, CSS Modules give full control without utility class conventions dictating markup. It's also a more natural path toward a design system if Structura grows.

**Why not CSS-in-JS (styled-components, Emotion):** Runtime cost, SSR complexity with App Router, and an extra dependency — all for capabilities not needed in an MVP.

## 4. Data Layer: Static TypeScript Files

**Why:** The MVP has 5-10 challenges. They change when you change them, not when a user does something. This is content, not data — treat it like code.

```
src/content/challenges/
├── design-url-shortener.ts
├── frontend-state-management.ts
├── real-time-collaboration.ts
├── api-gateway-design.ts
└── event-driven-checkout.ts
```

Each file exports a typed `Challenge` object:

```typescript
import { Challenge } from '@/lib/challenges/types';

export const challenge: Challenge = {
  slug: 'design-url-shortener',
  title: 'Design a URL Shortener',
  category: 'system-design',
  difficulty: 'intermediate',
  description: '...',
  constraints: ['Must handle 10K writes/sec', '...'],
  evaluationHints: ['Should address hashing strategy', '...'],
};
```

A single `data.ts` barrel file imports and exports them all:

```typescript
import { challenge as urlShortener } from '@/content/challenges/design-url-shortener';
// ...
export const challenges = [urlShortener, /* ... */];
```

**What you avoid:** A database, a CMS, an admin panel, migration scripts, seed data, ORM config — all for 5-10 objects that fit in a single file.

**When to reconsider:** When non-developers need to edit challenges, or you have 50+ challenges and want filtering/search on the server.

## 5. Database: None

**Why:** There's nothing to persist in the MVP.

- Challenges are static files
- Solutions aren't saved (the user gets feedback and moves on)
- There are no user accounts
- There's no history or progress

Adding a database means choosing one, setting up an ORM, writing schemas, managing connections, handling migrations, and provisioning infrastructure — for storing nothing.

**When to add one:**  When you introduce user accounts + saved submission history. At that point:

| Option | Best for |
|---|---|
| **Vercel Postgres** (Neon) | Stays in the Vercel ecosystem, minimal setup |
| **Supabase** | If you also want auth, real-time, or storage |
| **SQLite via Turso** | If you want something lightweight and edge-compatible |

With **Drizzle ORM** as the TypeScript-native query layer (lighter and more type-safe than Prisma for a small schema).

But that's not today's problem.

## 6. AI Integration: Anthropic Claude API (direct)

**Why Claude:** The feedback quality is the product. Claude is strong at nuanced, structured reasoning — exactly what "senior architect coach" requires.

**Integration approach:**

```
src/lib/ai/
├── client.ts            # Anthropic SDK instance
├── prompt-builder.ts    # Constructs the full prompt
└── response-parser.ts   # Parses JSON response into Feedback type
```

```typescript
// client.ts
import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

```typescript
// Used in app/api/evaluate/route.ts
const message = await anthropic.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: buildSystemPrompt(),
  messages: [{
    role: 'user',
    content: buildUserMessage(challenge, solution),
  }],
});
```

**Model choice:** `claude-sonnet-4-6` for the MVP. It's fast, cheap, and smart enough for structured feedback. Move to Opus only if feedback quality needs a bump — test Sonnet first.

**Structured output:** Instruct Claude to return JSON matching the `Feedback` interface. Parse it in `response-parser.ts` with a validation step. If parsing fails, fall back to returning the raw text.

**Cost estimate:** ~500-800 input tokens + ~500-800 output tokens per evaluation. At Sonnet pricing, that's roughly $0.005-0.01 per submission. Even 1,000 submissions would cost ~$5-10.

## 7. Hosting: Vercel

**Why:** Next.js is built by Vercel. The deployment is zero-config:

- `git push` → deployed
- API routes run as serverless functions automatically
- Environment variables managed in the dashboard
- Preview deployments for every branch
- Free tier covers the MVP traffic easily

**What you get for free:**
- HTTPS
- CDN for static assets
- Serverless functions (for the `/api/evaluate` route)
- Analytics (optional add-on)
- Automatic preview deployments

**What you avoid:** Docker, AWS, infrastructure management, CI/CD pipelines.

## Full Stack Summary

| Layer | Choice | Dependency Count |
|---|---|---|
| Framework | Next.js (App Router) | 1 |
| Language | TypeScript | 0 (built into Next.js) |
| Styling | CSS Modules + CSS Custom Properties | 0 (built into Next.js) |
| State | React useState | 0 (built into React) |
| Data | Static TS files | 0 |
| Database | None | 0 |
| AI | @anthropic-ai/sdk | 1 |
| Hosting | Vercel | 0 (platform) |
| **Total added dependencies** | | **2** |

Two dependencies: `next` and `@anthropic-ai/sdk`. That's the entire MVP stack. Everything else is either built-in or unnecessary at this stage.
