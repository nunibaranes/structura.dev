# AI Feedback Feature — Design

## 1. AI Interaction Flow

```
User submits solution
        │
        ▼
┌─────────────────────┐
│  Client: SolutionForm│
│  validates fields    │
└────────┬────────────┘
         │ POST /api/evaluate
         ▼
┌─────────────────────┐
│  API Route           │
│  1. Validate body    │
│  2. Load challenge   │
│     by slug          │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Prompt Builder      │
│  Assembles:          │
│  - System prompt     │
│  - Challenge context │
│  - User solution     │
│  - Output format     │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Claude API          │
│  model: sonnet       │
│  max_tokens: 1500    │
│  temperature: 0.3    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Response Parser     │
│  JSON → AIFeedback   │
│  with fallback for   │
│  malformed responses │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Client: FeedbackView│
│  renders structured  │
│  feedback sections   │
└─────────────────────┘
```

Key design decisions:
- **Temperature 0.3** — low enough for consistent, structured output, high enough to avoid robotic repetition
- **Single round** — no back-and-forth in MVP. The user submits, gets feedback, can try again with a revised solution
- **Streaming not needed yet** — feedback is ~300-500 words, returns in 2-4 seconds. A loading state is fine.

## 2. Prompt Structure

The prompt has three layers, each with a clear job:

```
┌────────────────────────────────────────────────┐
│  SYSTEM PROMPT (stable across all challenges)  │
│                                                │
│  Who you are:                                  │
│    Senior architect coach persona              │
│                                                │
│  How you behave:                               │
│    - Coach, don't lecture                      │
│    - Ask questions, don't just list flaws      │
│    - Acknowledge what's good first             │
│    - Be specific to their design, not generic  │
│                                                │
│  Output format:                                │
│    Strict JSON matching AIFeedback interface   │
│                                                │
│  Rules:                                        │
│    - Never give a complete solution            │
│    - Never invent details the user didn't say  │
│    - Always reference specific parts of their  │
│      submission when giving feedback           │
└────────────────────────────────────────────────┘
                      +
┌────────────────────────────────────────────────┐
│  CHALLENGE CONTEXT (per challenge)             │
│                                                │
│  - Full challenge description                  │
│  - Constraints                                 │
│  - Evaluation hints (what good answers cover)  │
│  - Common pitfalls for this specific challenge │
└────────────────────────────────────────────────┘
                      +
┌────────────────────────────────────────────────┐
│  USER MESSAGE (per submission)                 │
│                                                │
│  - Components & services they proposed         │
│  - Data flow description                       │
│  - Tradeoffs they considered                   │
│  - Additional notes / free text                │
└────────────────────────────────────────────────┘
```

## 3. Example Prompt

### System prompt

```
You are a senior software architect acting as a coach on the Structura
learning platform. Your job is to review a user's architecture solution
and provide structured feedback that helps them grow.

## Your coaching style

- Lead with strengths. Acknowledge what the user did well before
  addressing gaps. Be specific — reference their actual design decisions,
  not generic praise.
- Ask probing questions instead of stating flaws. Instead of "You didn't
  handle caching," ask "What happens when the same URL is requested
  1000 times per second? How would your system handle that load?"
- Identify missed concepts they should research, but don't explain them
  in full — name them and give enough context that the user knows what
  to look up.
- Suggest concrete improvements tied to their specific design. Avoid
  generic advice like "consider scalability."
- Write an overall assessment (2-3 sentences) that captures where the
  user stands and what to focus on next.

## Rules

- NEVER provide a complete solution or redesign their architecture.
- NEVER invent details the user didn't mention. If their solution is
  vague in an area, ask about it — don't assume.
- ALWAYS reference specific parts of the user's submission.
- Keep each feedback item to 1-2 sentences. Be concise.

## Output format

Respond with a JSON object matching this exact structure. No markdown
fences, no extra text — only the JSON object:

{
  "strengths": ["string", ...],
  "probingQuestions": ["string", ...],
  "missedConcepts": ["string", ...],
  "suggestions": ["string", ...],
  "overallAssessment": "string"
}

Aim for 2-4 items per array. Quality over quantity.
```

### User message (constructed by prompt-builder)

```
## Challenge: Design a URL Shortener

Design the architecture for a URL shortening service like bit.ly. The
service should generate short URLs, redirect users to the original URL,
and handle high read traffic. Consider storage, encoding strategy, and
how to handle collisions.

### Constraints
- Must handle 10K new URLs per day
- Redirects must complete in under 50ms (p99)
- Short URLs should be 7 characters or fewer
- The system should be horizontally scalable

### Evaluation focus areas
- Hashing vs counter-based ID generation
- Read-heavy access patterns and caching
- Collision handling strategy
- Storage estimates and data model
- Expiration and cleanup of old URLs

---

## User's Solution

### Components & Services
API service handles create and redirect. PostgreSQL stores the mappings.
Redis cache sits in front for hot URLs. A background worker cleans up
expired URLs daily.

### Data Flow
User submits a long URL → API generates a hash using Base62 encoding of
an auto-increment ID → stores mapping in PostgreSQL → returns short URL.
On redirect: check Redis first → fallback to PostgreSQL → 301 redirect.

### Tradeoffs
Chose auto-increment + Base62 over random hashing to avoid collisions
entirely. Tradeoff: IDs are sequential and predictable. Using 301
(permanent) redirects for better browser caching, but this means we
can't track click analytics easily.

### Additional Notes
No thoughts on multi-region yet. Would probably start single-region
and add replication later.
```

## 4. UI Interaction

```
SOLVING PHASE                    FEEDBACK PHASE
┌──────────────────────┐         ┌──────────────────────┐
│ Challenge Brief      │         │ Challenge Brief      │
│ ┌──────────────────┐ │         │ (collapsed/summary)  │
│ │ Title + badges   │ │         ├──────────────────────┤
│ │ Description      │ │         │ + Strengths          │
│ │ Constraints      │ │         │   + item             │
│ └──────────────────┘ │         │   + item             │
│                      │         │                      │
│ ─────────────────── │         │ ? Probing Questions   │
│                      │         │   ? item              │
│ Your Solution        │         │   ? item              │
│ ┌──────────────────┐ │         │                      │
│ │ Components [    ]│ │         │ ! Missed Concepts     │
│ │ Data Flow  [    ]│ │         │   ! item              │
│ │ Tradeoffs  [    ]│ │         │                      │
│ │ Notes      [    ]│ │         │ > Suggestions         │
│ └──────────────────┘ │         │   > item              │
│                      │         │                      │
│    [Get Feedback] │         │ ┌────────────────────┐│
│                      │         │ │Overall Assessment ││
└──────────────────────┘         │ │"Solid design..."  ││
                                 │ └────────────────────┘│
                                 │                      │
                                 │ [Try Again] [Next →] │
                                 └──────────────────────┘
```

State transitions:

```
solving ──[submit]──→ evaluating ──[success]──→ feedback
                          │                        │
                          │ [error]                 │ [try again]
                          ▼                        │
                        error ◄────────────────────┘
                          │                  (resets to solving)
                          │ [retry]
                          ▼
                       evaluating
```

## 5. How to Store Feedback

### MVP: No persistence. Runtime only.

Feedback lives in the useEvaluation hook state. When the user navigates away, it's gone. This is intentional — we're validating the feedback quality, not building a history feature.

### Post-MVP: When to add persistence

Add persistence when you introduce user accounts. Store submissions and feedback in a database with a `model` field to track which AI model generated the feedback — this lets you compare quality across prompt/model changes.
