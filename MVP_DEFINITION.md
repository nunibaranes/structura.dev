# Structura MVP Definition

## 1. The Smallest Useful MVP

A web app where a user picks an architecture challenge, submits their solution (as structured text — not a diagram editor), and gets AI-powered feedback that asks probing questions and identifies gaps in their thinking.

That's it. One loop: **Challenge → Solution → AI Feedback.**

No accounts, no progress tracking, no learning modules, no diagrams, no gamification. Just the core value — *practice architecture and get intelligent feedback* — in the simplest possible form.

## 2. Features That MUST Be Included

### A. Challenge Library (static, curated)

- 5-10 hand-written architecture challenges, hardcoded or stored in a simple data file
- Each challenge has: title, description, constraints, difficulty level, and hints for the AI evaluator
- Categories: at least 2 (e.g., "System Design" and "Frontend Architecture") to show breadth

### B. Challenge View

- Read the challenge brief with its constraints
- A text area where the user describes their architecture solution (components, data flow, tradeoffs, technology choices)
- Optional: a simple structured form — "Components", "Data Flow", "Key Tradeoffs" — to guide the user's thinking

### C. AI Feedback Engine

- Takes the user's solution + challenge context and returns feedback
- The AI should behave as a senior architect, not a grader — it asks follow-up questions, probes weak spots, and suggests what the user missed
- Uses a well-crafted system prompt — the quality of this prompt IS the product
- One round of feedback per submission (no back-and-forth conversation in V1)

### D. Landing Page

- What Structura is, who it's for, what you can do
- Direct link into the challenge list — zero friction

## 3. Features to EXCLUDE from V1

| Feature | Why Not Yet |
|---|---|
| User accounts / auth | Adds complexity, not needed to validate the core loop |
| Progress tracking / streaks | Gamification is meaningless without retention data |
| Learning modules / lessons | The practice loop is the hypothesis to validate first |
| Diagram editor / visual tools | Massive effort, text-based solutions test the core value just as well |
| Multi-turn AI conversation | One round of feedback is enough to prove the AI coaching value |
| Community / leaderboards | No users yet — premature |
| Payment / subscription | Validate before monetizing |
| Mobile optimization | Desktop-first is fine for this audience |
| Custom challenge creation | Curated content only in V1 |
| Backend / database | Static challenges + client-side AI calls or a thin API route — no DB needed |

## 4. Core User Flow

```
Landing Page
    |
    v
Challenge List (5-10 challenges, categorized)
    |
    |  user picks a challenge
    v
Challenge View
    |
    |  reads brief + constraints
    |  writes solution in text area
    |  clicks "Get Feedback"
    v
AI Feedback View
    |
    |  reads AI analysis:
    |    - what's strong in their design
    |    - probing questions on gaps
    |    - concepts/patterns they missed
    |    - suggested improvements
    |
    v
Back to Challenge List (try another)
```

**Total screens: 3** — Landing, Challenge List, Challenge + Feedback (same page).

## 5. What Success Looks Like

**Validation goal:** Does AI-powered architecture feedback feel valuable enough that someone would come back and try a second challenge?

Concrete signals:

- **Qualitative:** Share with 5-10 engineers you know. If 3+ say "this feedback actually made me think about something I missed" — the core idea works
- **Quantitative (lightweight):** Add basic analytics (Plausible, Vercel Analytics, or similar). Track:
  - How many people submit a solution (not just browse)
  - How many people try a second challenge after completing one
  - Time spent reading AI feedback (proxy for engagement)
- **The bar:** If people who submit one challenge submit a second one at a reasonable rate, the core loop has pull. If they browse but don't submit, the challenges need work. If they submit but ignore the feedback, the AI coaching needs work.

**What success is NOT:**

- User count. With no marketing, 20 engaged users who give you feedback are worth more than 500 drive-by visitors.
- Feature completeness. The MVP is a test of the *core interaction*, not the product.

## Recommended Tech Stack (for a solo React/TS developer)

- **Next.js** (App Router) — you know React, this gives you pages + API routes in one project
- **Tailwind CSS** — fast styling, no design system needed yet
- **AI integration** — Anthropic Claude API via a single API route (keeps the API key server-side)
- **Challenge data** — JSON or MDX files in the repo, no database
- **Deployment** — Vercel (zero-config for Next.js)
- **No auth, no DB, no ORM** — add these when you have something worth persisting

The entire MVP is roughly: 3 pages, 1 API route, 1 well-crafted system prompt, and 5-10 challenge files.
