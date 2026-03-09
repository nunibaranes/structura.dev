# Structura — Challenge Framework & 30 Challenges

## Challenge Framework

### Design Principles

1. **Practice-first.** Every challenge asks the user to produce something — a design, a decision, an architecture. Reading comes second.
2. **Realistic constraints.** Each challenge includes real-world constraints (team size, timeline, existing tech debt) that force tradeoffs. Architecture without constraints is just drawing boxes.
3. **No single right answer.** Challenges are evaluated on reasoning quality, tradeoff awareness, and completeness — not on matching a "correct" solution.
4. **Progressive depth.** Early challenges build vocabulary and mental models. Later challenges combine multiple concepts under pressure.
5. **Frontend-weighted but full-stack aware.** The audience is frontend-heavy engineers growing into architects. Challenges start in familiar territory (components, state, rendering) and expand outward (APIs, services, infra).

### Challenge Structure (per challenge)

Each challenge includes:
- **Brief** — what the user is asked to design
- **Constraints** — realistic limitations that force tradeoffs
- **Learning support** — collapsible section with concepts, mistakes, hints, quick-check
- **Solution input** — structured form (components, data flow, tradeoffs, notes)
- **AI feedback** — mentor-style evaluation

### Difficulty Levels

| Level | Who it's for | What it tests |
|---|---|---|
| **Beginner** | Mid-level engineers, frontend devs starting to think architecturally | Single-concept decisions, vocabulary, basic separation of concerns |
| **Intermediate** | Senior engineers, tech leads | Multi-concept tradeoffs, system-level thinking, migration strategies |
| **Advanced** | Staff engineers, aspiring architects | Complex system design, cross-cutting concerns, organizational impact |

### Progression Model

```
Phase 1: Foundations (Challenges 1-8)
  → Build architectural vocabulary
  → Learn to reason about single-concern decisions
  → Difficulty: beginner to beginner/intermediate

Phase 2: Frontend Architecture (Challenges 9-16)
  → Apply concepts to real frontend problems
  → Multi-concern tradeoffs within the frontend
  → Difficulty: intermediate

Phase 3: System Design (Challenges 17-24)
  → Expand beyond the frontend
  → Service boundaries, data flow, infrastructure
  → Difficulty: intermediate to advanced

Phase 4: Advanced Architecture (Challenges 25-30)
  → Full-system reasoning under complex constraints
  → Organizational and cross-cutting concerns
  → Difficulty: advanced
```

The user doesn't have to follow this order — challenges are browsable independently. But the suggested path provides the best learning curve.

---

## The 30 Challenges

---

### Challenge 1: Drawing Component Boundaries

**Difficulty:** Beginner
**Category:** Architecture Fundamentals

**Description:**
You're building a dashboard page that shows user profile info, a list of recent orders, a notification bell with a dropdown, and a sidebar navigation. A junior developer put it all in one 600-line component. Redesign the component architecture — decide where to draw boundaries and why.

**Why this matters:**
Component boundaries are the most frequent architectural decision frontend engineers make. Bad boundaries lead to components that are hard to test, reuse, and maintain. This is where architectural thinking starts.

**What the user should produce:**
A component tree with clear boundaries, explanation of what each component owns, and reasoning for why the boundaries are where they are.

**Key concepts needed:**
- Single responsibility principle
- Cohesion and coupling
- Props as component interfaces

**Learning support:**

*Concepts:*
1. **Single Responsibility** — A component should have one reason to change. If your component handles both data fetching and UI rendering, those are two reasons to change. Split them.
2. **Cohesion** — Things that change together should live together. A notification bell's icon, badge count, and dropdown are highly cohesive — they form one component, not three.
3. **Coupling** — Components should depend on each other as little as possible. If changing the sidebar breaks the order list, they're too coupled.
4. **Props as Contracts** — The props a component accepts define its API. Clean props = clean boundary. If a component needs 15 props, it probably does too much.

*Common mistakes:*
1. **Splitting too granularly** — Creating a component for every HTML element adds indirection without value. A `<UserAvatar>` is useful. A `<DivWrapper>` is not.
2. **Splitting by visual layout instead of responsibility** — "Left column" and "right column" are not good component boundaries. "UserProfile" and "OrderList" are.
3. **Passing data through many layers** — If you split into 6 levels of nesting and pass props through 4 of them, your boundaries may be wrong.

*Architecture hints:*
1. Ask yourself: "If I delete this component, what else breaks?" If the answer is "everything," your boundaries are too coupled.
2. Group by data dependency — components that use the same data often belong together.

*Quick-check:*
1. A component fetches user data, renders a profile card, and handles profile editing. How many responsibilities does it have? → **Three.** Fetching, displaying, and editing. Consider splitting into a data-fetching wrapper, a display component, and an edit form.
2. You have a `<Header>` that contains a logo, nav links, and a search bar. Should the search bar be its own component? → **Yes, if it has its own state and behavior** (input handling, suggestions, API calls). The logo probably doesn't need to be its own component.

**What a strong answer includes:**
- 4-8 components with clear names reflecting responsibility
- Explanation of data flow between components
- Reasoning for each boundary (not just "it felt right")
- Identification of which components are reusable vs page-specific

**Evaluation criteria:**
- Are boundaries based on responsibility, not visual layout?
- Is the component tree neither too flat nor too deep?
- Are data dependencies considered in the boundary decisions?
- Is the reasoning explicit, not just a diagram?

---

### Challenge 2: Client vs Server — Choosing a Rendering Strategy

**Difficulty:** Beginner
**Category:** Architecture Fundamentals

**Description:**
You're building an e-commerce site with these pages: homepage (marketing + featured products), product listing (filterable, sortable), product detail (SEO-critical, mostly static), shopping cart (highly interactive, user-specific), and checkout (multi-step form, payment). For each page, choose a rendering strategy (SSG, SSR, ISR, or client-side) and justify your choice.

**Why this matters:**
Rendering strategy is one of the highest-leverage architecture decisions in a frontend application. The wrong choice means slow pages, poor SEO, wasted server costs, or unnecessarily complex code.

**What the user should produce:**
A rendering strategy per page with justification, plus an explanation of how data freshness requirements influenced each decision.

**Key concepts needed:**
- SSG, SSR, ISR, CSR tradeoffs
- Data freshness vs performance
- SEO requirements

**Learning support:**

*Concepts:*
1. **Static Site Generation (SSG)** — HTML built at deploy time. Fastest possible load, but content is stale until the next deploy. Best for content that rarely changes (marketing pages, blog posts).
2. **Server-Side Rendering (SSR)** — HTML built on every request. Always fresh data, but adds server latency to every page load. Best for pages that need fresh, personalized, or SEO-critical content.
3. **Incremental Static Regeneration (ISR)** — Static pages that re-generate in the background after a time interval. Balances freshness and performance. Best for content that changes periodically (product catalog, pricing).
4. **Client-Side Rendering (CSR)** — HTML shell loads first, JavaScript fetches and renders data. No server needed per request, but slower initial load and no SEO for dynamic content. Best for authenticated, interactive pages (dashboards, carts).

*Common mistakes:*
1. **Using SSR for everything** — SSR adds server cost and latency. Pages that don't need fresh data on every request should be static.
2. **Ignoring data freshness requirements** — A product listing with SSG means price changes don't appear until the next deploy. ISR or SSR may be necessary.
3. **Forgetting about personalization** — Static pages can't show user-specific content. If a page mixes public and personalized data, you need a hybrid approach (static shell + client-side personalization).

*Architecture hints:*
1. Start with the data: How often does it change? Who can see it? Does Google need to index it? The answers determine your rendering strategy.
2. You can mix strategies on a single page — static shell with client-side dynamic parts.

*Quick-check:*
1. A product detail page needs to be indexed by Google and shows a price that changes daily. Which rendering strategy fits best? → **ISR** — static for performance and SEO, regenerates periodically for price freshness.
2. A shopping cart page shows user-specific data and doesn't need SEO. What's the simplest rendering approach? → **Client-side rendering** — no server involvement, data fetched after auth.

**What a strong answer includes:**
- Clear strategy per page with explicit reasoning
- Data freshness analysis for each page
- SEO requirements considered
- Acknowledgment of hybrid approaches where appropriate
- Cost/complexity tradeoffs mentioned

**Evaluation criteria:**
- Is each choice justified by data requirements, not just preference?
- Are SEO and performance tradeoffs explicit?
- Does the user recognize where hybrid approaches are needed?
- Are edge cases considered (stale data, personalization)?

---

### Challenge 3: Separation of Concerns in a Feature

**Difficulty:** Beginner
**Category:** Architecture Fundamentals

**Description:**
You're reviewing a feature implementation: a "Save to Wishlist" button. The current code is a single component that handles the click event, calls the API, updates local state, shows a toast notification, tracks an analytics event, and handles the error case with a retry. Redesign this feature with proper separation of concerns.

**Why this matters:**
Separation of concerns is the foundation of maintainable architecture. When a single unit does everything, it becomes untestable, unreusable, and fragile. Knowing how to decompose a feature into layers is a core architectural skill.

**What the user should produce:**
A layered design showing how the feature breaks into UI, state, API, side effects (analytics, notifications), and error handling — with clear interfaces between layers.

**Key concepts needed:**
- Separation of concerns
- Layer architecture
- Side effect management

**Learning support:**

*Concepts:*
1. **Separation of Concerns** — Each module should handle one aspect of the feature. The button component shouldn't know about the API URL. The API layer shouldn't know about toast notifications.
2. **UI Layer vs Logic Layer** — The component renders UI and responds to user events. The logic layer (hooks, services) handles what happens when those events fire. Separating them makes both testable.
3. **Side Effects** — Analytics tracking, toast notifications, and logging are side effects — they don't affect the core feature logic. They should be decoupled so removing analytics doesn't break the wishlist.

*Common mistakes:*
1. **Putting API calls directly in onClick handlers** — This couples UI events to network logic. Extract to a hook or service.
2. **Making error handling an afterthought** — Error states are part of the architecture, not a patch. Design for them from the start.
3. **Ignoring the analytics/notification coupling** — If your test suite needs a mock toast library to test a wishlist API call, your concerns aren't separated.

*Architecture hints:*
1. Ask: "If I remove the toast notification, does the wishlist feature still work?" If yes, they're properly separated.
2. Think in layers: UI → Action → API → Side effects. Each layer calls the next, never skips.

*Quick-check:*
1. A component directly calls `fetch()` in its onClick handler and shows an alert on error. What's the first concern to extract? → **The API call.** Move it to a custom hook or service function. The component should call `addToWishlist()` and not know about fetch.
2. Should analytics tracking live in the API layer or the UI layer? → **Neither — it's a side effect layer.** It should observe the action (e.g., via a callback or event) without being coupled to the API call or the button.

**What a strong answer includes:**
- Clear layers with defined responsibilities
- Interfaces between layers (what each layer exposes)
- Side effects decoupled from core logic
- Error handling as a first-class concern
- Testability considered

**Evaluation criteria:**
- Are there at least 3 distinct layers (UI, logic, API)?
- Are side effects (analytics, notifications) decoupled?
- Is each layer independently testable?
- Is the reasoning about why things are separated, not just how?

---

### Challenge 4: Prop Drilling vs Global State — Where Should State Live?

**Difficulty:** Beginner
**Category:** State Architecture

**Description:**
You're building a settings page with 4 sections (Profile, Notifications, Privacy, Billing), each in its own tab. A "Save All Changes" button at the bottom saves all sections at once. An "Unsaved Changes" banner appears when any section has been modified. The user's current plan (free/pro) affects which settings are visible. Design where each piece of state lives and how it flows between components.

**Why this matters:**
Deciding where state lives is the most common architectural decision in React. Put state too high and everything re-renders. Put it too low and you're passing callbacks through 5 layers. This challenge teaches state placement as an architectural skill.

**What the user should produce:**
A state architecture diagram showing where each piece of state lives (local, lifted, context, external store), how data flows, and why each decision was made.

**Key concepts needed:**
- State colocation
- Lifting state
- Context vs props vs external stores

**Learning support:**

*Concepts:*
1. **State Colocation** — State should live as close as possible to where it's used. If only the Profile tab needs the profile form state, it should live in the Profile tab — not in a global store.
2. **Lifting State** — When two sibling components need the same state, lift it to their nearest common parent. The "Unsaved Changes" banner and the "Save All" button both need to know about form changes — lift that state above both.
3. **Context for Dependency Injection** — React Context is good for values that many components need but rarely change (user plan, theme, locale). It's bad for frequently-changing state because it re-renders all consumers.
4. **External Stores for Cross-Cutting State** — When state is needed across many pages and components (auth, feature flags), an external store (Zustand, Redux) avoids prop drilling without Context's re-render cost.

*Common mistakes:*
1. **Putting everything in global state** — Form input values in Redux is almost always wrong. Local state is simpler, faster, and doesn't pollute the global scope.
2. **Using Context for frequently-changing values** — If form state lives in Context, every keystroke re-renders every consumer. Use Context for stable values, not for input state.
3. **Prop drilling 4+ levels as the default** — If you're passing a callback through 3 intermediary components that don't use it, consider lifting, Context, or a store.

*Architecture hints:*
1. Start with the lowest possible level. Only lift or globalize when you have a concrete reason.
2. Map out which components need which state — the overlap pattern tells you where state should live.

*Quick-check:*
1. The user's plan type (free/pro) is needed by all 4 settings tabs to show/hide fields. Where should it live? → **Context or external store** — it's stable, widely needed, and doesn't change during the session.
2. The text input value of the "Display Name" field in the Profile tab is needed nowhere else. Where should it live? → **Local state in the Profile tab component.** No reason to lift or globalize it.

**What a strong answer includes:**
- Clear state placement for each piece of state with reasoning
- Distinction between stable state (plan type) and dynamic state (form inputs)
- Data flow diagram showing how the Save button collects data from all tabs
- Re-render impact considered
- Explanation of what changes if a new section is added

**Evaluation criteria:**
- Is state placed at the lowest appropriate level?
- Are different state management strategies used for different types of state?
- Is the re-render cost of each approach considered?
- Is the "Unsaved Changes" detection clearly architected?

---

### Challenge 5: Designing a Data Fetching Layer

**Difficulty:** Beginner
**Category:** Data Architecture

**Description:**
Your React app currently makes `fetch()` calls directly in components — scattered across 40+ files with inconsistent error handling, no caching, no loading states, and duplicated requests when multiple components need the same data. Design a data fetching architecture that provides consistent patterns for loading, caching, error handling, and deduplication.

**Why this matters:**
Data fetching is the most common source of bugs, performance issues, and inconsistency in frontend applications. A well-designed fetching layer reduces bugs, improves performance, and makes the codebase predictable.

**What the user should produce:**
An architecture for the data fetching layer: what abstractions exist, how caching works, how loading/error states are handled, and how components consume data.

**Key concepts needed:**
- Server state vs client state
- Cache invalidation
- Request deduplication
- Stale-while-revalidate

**Learning support:**

*Concepts:*
1. **Server State vs Client State** — Data from your API (products, users, orders) is server state — the frontend holds a cached copy. UI state (modal open, selected tab) is client state — it exists only in the browser. They need different management strategies.
2. **Stale-While-Revalidate** — Show cached data immediately (fast), then refetch in the background (fresh). The user sees content instantly and gets updated data without a loading spinner. This is the core pattern behind React Query/SWR.
3. **Request Deduplication** — If 3 components mount simultaneously and all request the same user data, the fetching layer should make 1 API call, not 3. Deduplication prevents wasted bandwidth and race conditions.
4. **Cache Invalidation** — The hardest problem. When a user updates their profile, the cached profile data is stale. The fetching layer needs a strategy: invalidate on mutation, time-based expiry, or manual refetch.

*Common mistakes:*
1. **Building a custom fetching layer when React Query/SWR exists** — Unless you have unusual requirements, use a proven library. Custom solutions miss edge cases (race conditions, garbage collection, focus refetching).
2. **Ignoring loading and error states in the architecture** — Every fetch has 3 states: loading, success, error. If your architecture doesn't enforce handling all 3, components will show broken UIs.
3. **Caching without invalidation** — A cache that never updates is a bug factory. Define when and how cached data becomes stale.

*Architecture hints:*
1. Standardize the return type: every data hook returns `{ data, isLoading, error }`. Consistency across the app matters more than any individual optimization.
2. Separate "what to fetch" from "when to fetch." Components declare what data they need; the fetching layer decides when and how to get it.

*Quick-check:*
1. Two components on the same page both call `useUser(userId)`. How many API requests should this trigger? → **One.** The fetching layer should deduplicate identical in-flight requests.
2. A user updates their display name. The header still shows the old name. What's missing? → **Cache invalidation.** After the mutation, the user data cache should be invalidated or updated so all components reflect the change.

**What a strong answer includes:**
- Abstraction layer between components and API calls
- Consistent loading/error state pattern
- Caching strategy with invalidation rules
- Request deduplication approach
- Migration strategy from the current scattered fetch calls

**Evaluation criteria:**
- Is server state distinguished from client state?
- Is there a consistent pattern for loading/error/success?
- Is caching addressed with invalidation strategy?
- Is the design incremental (not a big-bang rewrite)?

---

### Challenge 6: Error Handling Architecture

**Difficulty:** Beginner
**Category:** Architecture Fundamentals

**Description:**
Your application has no consistent error handling strategy. Some components use try/catch, some ignore errors entirely, and the user sees raw error messages or blank screens. API failures, network errors, validation errors, and unexpected runtime errors are all handled differently (or not at all). Design an error handling architecture that provides a consistent, user-friendly experience.

**Why this matters:**
Error handling is an architectural concern, not a per-component afterthought. A consistent error architecture prevents blank screens, improves user trust, enables debugging, and makes the system resilient.

**What the user should produce:**
An error handling architecture covering error types, error boundaries, user-facing error states, logging/reporting, and recovery strategies.

**Key concepts needed:**
- Error boundaries
- Error types and classification
- Graceful degradation
- Error reporting

**Learning support:**

*Concepts:*
1. **Error Classification** — Not all errors are equal. Network errors (temporary, retriable), validation errors (user-fixable), auth errors (redirect to login), and runtime crashes (show fallback) each need different handling. Classify first, then handle.
2. **Error Boundaries** — React error boundaries catch render-time crashes and show a fallback UI instead of a white screen. Place them strategically: one at the app root (last resort), one per major section (isolate failures).
3. **Graceful Degradation** — When a non-critical feature fails (recommendations widget, analytics), the rest of the page should still work. Design components to degrade gracefully rather than crash entirely.
4. **Error Reporting** — Errors the user doesn't report are errors you never fix. Send structured error data (type, context, stack trace) to a monitoring service (Sentry, Datadog) automatically.

*Common mistakes:*
1. **Catching errors silently** — `catch (e) {}` hides bugs. Every caught error should either be shown to the user, logged, or both.
2. **Showing technical error messages to users** — "TypeError: Cannot read property 'name' of undefined" means nothing to a user. Map technical errors to human-friendly messages.
3. **One error boundary for the entire app** — If the sidebar crashes and the whole app shows an error page, the boundaries are too coarse. Isolate failures to the smallest reasonable section.

*Architecture hints:*
1. Define 4-5 error categories (network, validation, auth, not-found, unexpected) and a standard handling strategy for each.
2. Error boundaries should match your component architecture — one per independently-failing section.

*Quick-check:*
1. The recommendations widget fails to load. Should the entire product page show an error? → **No.** The recommendations widget should degrade gracefully (show nothing or a placeholder), and the rest of the page should work normally.
2. An API returns a 401 Unauthorized. What's the appropriate handling? → **Redirect to login** — not a generic error message. Auth errors have a specific recovery path.

**What a strong answer includes:**
- Error type classification with handling strategy per type
- Error boundary placement strategy
- User-facing error states per category
- Logging/reporting architecture
- Retry strategy for transient errors

**Evaluation criteria:**
- Are errors classified into distinct categories?
- Is there a clear strategy per error type?
- Are error boundaries placed strategically, not just at the root?
- Is graceful degradation addressed?
- Is error reporting included?

---

### Challenge 7: Authentication & Authorization Architecture

**Difficulty:** Beginner / Intermediate
**Category:** Architecture Fundamentals

**Description:**
You're building a SaaS application with 3 user roles: Admin (full access), Editor (can create and edit content), and Viewer (read-only). The app has a React frontend and a REST API. Design the authentication and authorization architecture — how users log in, how tokens are managed, how the frontend enforces permissions, and how protected routes work.

**Why this matters:**
Auth is one of the most security-critical architecture decisions. Getting token storage, route protection, or role enforcement wrong can expose user data. Every production app needs auth, and the architecture decisions you make early are hard to change later.

**What the user should produce:**
An auth architecture covering login flow, token storage, token refresh, frontend route protection, role-based UI rendering, and API authorization.

**Key concepts needed:**
- JWT vs session-based auth
- Token storage (cookies vs localStorage)
- Route guards
- Role-based access control (RBAC)

**Learning support:**

*Concepts:*
1. **JWT vs Sessions** — JWTs are stateless tokens the client stores and sends with each request — the server validates them without a database lookup. Sessions store state on the server and use a session ID cookie. JWTs scale better; sessions are easier to revoke.
2. **Token Storage** — localStorage is accessible to JavaScript (XSS risk). HttpOnly cookies are not accessible to JS (safer) but require CSRF protection. For most apps, HttpOnly cookies are the better default.
3. **Route Protection** — Frontend route guards prevent unauthorized users from seeing pages they shouldn't access. But they're a UX convenience, not security — the API must enforce permissions independently because frontend checks can be bypassed.
4. **RBAC** — Role-Based Access Control maps permissions to roles (Admin, Editor, Viewer), then assigns roles to users. The frontend uses roles to show/hide UI elements; the API uses roles to allow/deny operations.

*Common mistakes:*
1. **Relying on frontend-only route protection** — If the API doesn't check permissions, any user with a valid token can access admin endpoints via curl/Postman. The frontend hides buttons; the API enforces security.
2. **Storing JWTs in localStorage** — Any XSS vulnerability can steal the token. HttpOnly cookies are invisible to JavaScript and significantly more secure.
3. **Not handling token expiration gracefully** — When a token expires mid-session, the user shouldn't see a cryptic error. Implement silent refresh or redirect to login with a clear message.

*Architecture hints:*
1. Design auth as a layer that wraps your app — not something sprinkled into individual components.
2. Think about the unhappy paths: expired token, revoked session, role change mid-session.

*Quick-check:*
1. A user's JWT expires while they're filling out a long form. What should happen? → **Silent token refresh** using a refresh token. If refresh fails, save their form state and redirect to login.
2. An Editor can see an "Admin Settings" button in the sidebar because the frontend check is broken. Is this a security issue? → **Only if the API doesn't enforce permissions.** The frontend bug is a UX issue; the real security boundary is the API.

**What a strong answer includes:**
- Login flow (user → frontend → API → token)
- Token storage strategy with security reasoning
- Token refresh mechanism
- Route protection on the frontend
- Role-based rendering (show/hide UI by role)
- API-side authorization (the real security layer)

**Evaluation criteria:**
- Is the API the primary security boundary, not the frontend?
- Is token storage secure (HttpOnly cookies preferred)?
- Is token expiration and refresh handled?
- Are roles enforced on both frontend and backend?
- Are edge cases considered (expired token, role change)?

---

### Challenge 8: Designing a Notification System

**Difficulty:** Beginner / Intermediate
**Category:** Frontend Architecture

**Description:**
Your application needs a notification system that supports: toast messages (success, error, warning), a persistent notification center (bell icon with unread count), push notifications (browser), and email notifications triggered by backend events. Design the architecture spanning frontend and backend, including how notifications are created, delivered, stored, and displayed.

**Why this matters:**
Notifications touch every layer of the stack — UI components, client state, real-time delivery, backend events, and persistent storage. Designing a notification system teaches you to think across boundaries.

**What the user should produce:**
An architecture covering notification types, delivery mechanisms, frontend state management for notifications, and the relationship between transient toasts and persistent notifications.

**Key concepts needed:**
- Event-driven patterns
- Real-time delivery (WebSocket/SSE)
- Transient vs persistent state
- Pub/sub patterns

**Learning support:**

*Concepts:*
1. **Transient vs Persistent Notifications** — A toast ("Saved!") is transient — it appears and disappears. An inbox notification ("Your report is ready") is persistent — it's stored, has read/unread state, and can be revisited. They need different architecture.
2. **Event-Driven Notifications** — Backend events (order placed, export complete) trigger notifications. The backend publishes an event; a notification service subscribes, creates the notification, and routes it to the right channels (in-app, push, email).
3. **Real-Time Delivery** — In-app notifications need to appear without a page refresh. WebSockets or Server-Sent Events push new notifications to connected clients. Polling is simpler but adds latency.
4. **Notification Routing** — Not every event goes to every channel. A "file exported" notification might go in-app and email, but not push. Routing rules decide which notifications go where based on type and user preferences.

*Common mistakes:*
1. **Treating toasts and inbox notifications as the same system** — They have different lifecycles, storage needs, and delivery mechanisms. Design them as separate systems with a shared event source.
2. **Not considering user preferences** — Users want control over what they receive and where. Build notification preferences into the architecture from the start.
3. **No rate limiting or batching** — If a user gets 50 notifications in a minute, the experience is terrible. Batch or rate-limit delivery.

*Architecture hints:*
1. Start from the events, not the UI. What events produce notifications? Then decide how each notification type is delivered.
2. Separate the notification creation (backend) from notification delivery (channels) from notification display (frontend).

*Quick-check:*
1. A background export job completes. The user should see a notification immediately without refreshing. What delivery mechanism do you need? → **WebSocket or SSE** — the server pushes the notification to the connected client in real time.
2. Should the unread count in the notification bell come from local state or the server? → **Server** — because notifications can arrive from multiple channels and devices. Local state would be inaccurate after a page refresh or multi-device usage.

**What a strong answer includes:**
- Notification type taxonomy (toast, in-app persistent, push, email)
- Event → notification creation → routing → delivery flow
- Frontend architecture for toasts vs notification center
- Real-time delivery mechanism
- User preference system
- Read/unread state management

**Evaluation criteria:**
- Are transient and persistent notifications treated differently?
- Is the backend event-driven, not UI-triggered?
- Is real-time delivery addressed?
- Are notification preferences considered?
- Is the architecture extensible to new notification types?

---

### Challenge 9: Design System Architecture

**Difficulty:** Intermediate
**Category:** Design Systems

**Description:**
Your company has 3 product teams building separate React applications. They share a Figma design library, but each team implements components independently — leading to visual inconsistencies, duplicated effort, and diverging patterns. You've been asked to architect a shared design system. Define the technical architecture — how components are built, packaged, distributed, versioned, and consumed across teams.

**Why this matters:**
A design system is an architecture problem, not a component library. How you package, version, and distribute components determines whether teams adopt it or fork it. The technical decisions affect organizational velocity.

**What the user should produce:**
An architecture covering component structure, packaging strategy, versioning approach, distribution mechanism, theming, and adoption plan.

**Key concepts needed:**
- Monorepo vs multi-repo
- Semantic versioning
- Design tokens
- Component composition patterns

**Learning support:**

*Concepts:*
1. **Design Tokens** — Primitive values (colors, spacing, typography, radii) stored as platform-agnostic data. Tokens flow from design tools (Figma) to code (CSS variables, JS constants). They're the shared language between design and engineering.
2. **Monorepo Structure** — Hosting all design system packages (tokens, core components, icons, utilities) in a single repository. Teams can develop and test across packages simultaneously. Tools like Turborepo or Nx manage builds.
3. **Semantic Versioning** — Major.Minor.Patch (e.g., 2.1.0). Breaking changes = major bump. New features = minor. Bug fixes = patch. Consumers know whether an update is safe without reading changelogs.
4. **Composition over Configuration** — Instead of a component with 47 props, provide composable building blocks. `<Card><Card.Header /><Card.Body /></Card>` is more flexible than `<Card title="..." subtitle="..." icon="..." />`.

*Common mistakes:*
1. **Building every component before getting adoption** — Ship a small, high-quality set first (Button, Input, Card, Modal). Prove value before expanding.
2. **No versioning strategy** — If updating the design system breaks consuming apps, teams will stop updating. Semver + changelogs + migration guides are essential.
3. **Ignoring the Figma-to-code pipeline** — If design tokens are manually translated from Figma to CSS, they'll drift. Automate the pipeline.
4. **Making the design system mandatory by decree, not by quality** — Teams adopt tools that make their lives easier. If the design system is harder to use than building from scratch, adoption will fail.

*Architecture hints:*
1. Start with tokens and 3-5 core components. Validate the distribution and versioning pipeline before expanding.
2. Think about the consumer experience: what does `npm install @company/design-system` look like?

*Quick-check:*
1. Team A needs a DataTable component urgently but the design system doesn't have one yet. What should they do? → **Build it locally in their app.** Later, if other teams need it, it can be promoted to the design system. Don't block teams on the design system's roadmap.
2. A design system update changes the Button's padding. Is this a major, minor, or patch version bump? → **It depends.** If it's a visual change that doesn't break the API, it's a patch. If it could break layouts in consuming apps, treat it as major to be safe.

**What a strong answer includes:**
- Package structure (monorepo with tokens, components, icons)
- Build and distribution pipeline
- Versioning and release strategy
- Theming architecture (tokens → CSS variables)
- Adoption strategy (incremental, not mandatory)
- Documentation approach

**Evaluation criteria:**
- Is the packaging and distribution practical?
- Is versioning addressed with consumer safety in mind?
- Is the theming approach token-based?
- Is adoption planned as incremental?
- Is the Figma-to-code pipeline considered?

---

### Challenge 10: Form Architecture at Scale

**Difficulty:** Intermediate
**Category:** Frontend Architecture

**Description:**
Your application has 30+ forms ranging from simple (login, contact) to complex (multi-step onboarding, dynamic invoice builder, conditional fields based on user role). Currently, each form is built ad-hoc with different validation approaches, different submission patterns, and inconsistent error display. Design a form architecture that provides consistency without over-constraining simple forms.

**Why this matters:**
Forms are the primary way users interact with data in most applications. A fragmented form architecture means inconsistent validation, duplicated logic, accessibility gaps, and poor error UX. A well-designed form architecture is high leverage.

**What the user should produce:**
A form architecture covering validation strategy, state management, multi-step forms, dynamic fields, error display patterns, and submission handling.

**Key concepts needed:**
- Controlled vs uncontrolled forms
- Schema-based validation
- Multi-step form state
- Optimistic submission

**Learning support:**

*Concepts:*
1. **Schema-Based Validation** — Define validation rules as a schema (Zod, Yup) separate from the UI. The schema is the source of truth — it can be shared with the backend, used for type inference, and tested independently.
2. **Form State Management** — Simple forms work with local state. Complex forms (multi-step, dynamic fields) benefit from a form library (React Hook Form, Formik) that handles dirty tracking, validation timing, and field registration.
3. **Multi-Step Form Architecture** — A wizard-style form needs state that persists across steps, validation per step, and navigation logic (can the user go back? skip steps?). Store form state above the step components, validate per step, submit at the end.
4. **Progressive Validation** — Validate on blur (not on every keystroke) for individual fields, and validate the full form on submit. Show errors inline near the field, not in a banner at the top.

*Common mistakes:*
1. **Validating on every keystroke** — It's annoying and causes performance issues in large forms. Validate on blur for fields, on submit for the form.
2. **Building a custom form framework** — Unless your forms have truly unique requirements, use a proven library. Custom solutions miss edge cases (focus management, array fields, async validation).
3. **Inconsistent error display** — Some forms show errors inline, others in a toast, others not at all. Define a single pattern and enforce it across all forms.

*Architecture hints:*
1. Separate form schema (validation rules) from form UI (field rendering). They change for different reasons and should be independent.
2. Design a standard form submission pattern: `onSubmit → validate → submit → handle success/error`. Every form follows the same flow.

*Quick-check:*
1. A multi-step form has 4 steps. Should all steps share one validation schema or have individual schemas? → **Individual schemas per step.** Validate only the current step. Combine for final submission validation.
2. A form field's visibility depends on another field's value (e.g., "Other" → show text input). Where should this logic live? → **In the form's configuration or schema layer** — not in the component's JSX. Conditional logic should be declarative and testable.

**What a strong answer includes:**
- Validation strategy (schema-based, when to validate)
- Form state management approach (library choice, reasoning)
- Multi-step form architecture
- Dynamic/conditional fields approach
- Error display pattern
- Submission handling (loading, success, error)
- Accessibility considerations (error announcements, focus management)

**Evaluation criteria:**
- Is validation schema-based and separate from UI?
- Is the state management approach appropriate for form complexity?
- Is multi-step form state clearly architected?
- Is error display consistent?
- Is accessibility considered (focus, ARIA)?

---

### Challenge 11: Feature Flag Architecture

**Difficulty:** Intermediate
**Category:** Frontend Architecture

**Description:**
Your 50-person engineering org wants to adopt feature flags for progressive rollouts, A/B testing, and kill switches. Currently, features are either fully deployed or not. Design a feature flag system architecture — how flags are defined, evaluated, distributed, and managed across a React frontend and Node.js backend.

**Why this matters:**
Feature flags decouple deployment from release. They enable progressive rollouts, instant rollbacks, and experimentation — but poorly designed flag systems create technical debt, stale code, and unpredictable behavior.

**What the user should produce:**
Architecture for flag storage, evaluation (client vs server vs edge), distribution to the frontend, user targeting, and flag lifecycle management.

**Key concepts needed:**
- Client-side vs server-side evaluation
- User targeting and segmentation
- Flag lifecycle
- Technical debt from flags

**Learning support:**

*Concepts:*
1. **Flag Evaluation Location** — Server-side evaluation (flags resolved before HTML is sent) prevents flicker but adds latency. Client-side evaluation (flags resolved in the browser) is faster but can cause UI flicker. Edge evaluation (at the CDN) balances both.
2. **User Targeting** — Flags aren't just on/off. They target segments: "10% of users," "users in EU," "internal testers." This requires consistent user identification and a rules engine.
3. **Flag Lifecycle** — Flags are temporary. A flag goes through: created → testing → rolling out → 100% → cleanup (remove flag, keep winning code). Flags that are never cleaned up become permanent tech debt.
4. **Consistent Assignment** — A user should always see the same flag variant across sessions and devices. This requires deterministic hashing (e.g., hash of userId + flagName) rather than random assignment.

*Common mistakes:*
1. **Never removing old flags** — Every flag adds a code path. 100 flags means 100 `if/else` branches that make the code harder to read, test, and reason about. Set cleanup dates.
2. **Evaluating all flags on every request** — Fetch only the flags the current page/component needs. Evaluating 200 flags for a page that uses 3 is wasteful.
3. **No fallback for flag service outages** — If the flag service is down, what happens? Every flag needs a hardcoded default that produces a safe, functional experience.

*Architecture hints:*
1. Design the flag evaluation as a hook: `useFlag('new-checkout')` returns a boolean. Components don't know where the flag value comes from.
2. Create a flag registry that tracks every flag, its owner, its purpose, and its expected cleanup date.

*Quick-check:*
1. A feature flag controls a new checkout flow. The flag service goes down. What should happen? → **Fall back to the default value** (usually the old checkout flow). The app should work even if the flag service is unavailable.
2. A flag was set to 100% three months ago but the code still checks it. What should happen? → **Remove the flag and the old code path.** A flag at 100% for months is dead code with extra steps.

**What a strong answer includes:**
- Flag storage and management (central service or config)
- Evaluation strategy (client/server/edge) with tradeoffs
- User targeting and consistent assignment
- Distribution to frontend (SDK, API, bootstrapped in HTML)
- Flag lifecycle with cleanup strategy
- Fallback behavior for service outages

**Evaluation criteria:**
- Is evaluation location justified?
- Is user targeting addressed (not just global on/off)?
- Is the flag lifecycle (creation → cleanup) designed?
- Are fallback defaults considered?
- Is SSR/hydration addressed for the React frontend?

---

### Challenge 12: Accessibility as Architecture

**Difficulty:** Intermediate
**Category:** Frontend Architecture

**Description:**
Your React application was built without accessibility in mind. An audit reveals 200+ WCAG 2.1 AA violations. Leadership wants to fix this, but the team sees it as a checkbox exercise — "just add alt tags." Design an accessibility architecture that makes the application accessible and keeps it that way — not as a one-time fix, but as a sustainable practice embedded in the development process.

**Why this matters:**
Accessibility is an architectural concern. It affects component API design, state management (focus, announcements), routing (focus management on navigation), form design, and testing. Bolt-on accessibility is expensive and fragile.

**What the user should produce:**
An architecture covering accessible component patterns, focus management, screen reader announcements, keyboard navigation, testing strategy, and how accessibility is sustained across team contributions.

**Key concepts needed:**
- ARIA patterns and semantic HTML
- Focus management
- Screen reader announcements
- Automated and manual testing

**Learning support:**

*Concepts:*
1. **Semantic HTML First** — Native HTML elements (`button`, `input`, `nav`, `main`) have built-in accessibility. A `<button>` is keyboard-focusable, activatable with Enter/Space, and announced correctly. A `<div onClick>` has none of this. Semantic HTML solves 80% of accessibility for free.
2. **Focus Management** — When a modal opens, focus should move into it. When it closes, focus returns to the trigger. When the user navigates to a new page (SPA), focus should move to the main content. Focus management is a state management problem.
3. **Live Regions** — Screen readers don't automatically announce dynamic changes. When a toast appears or a form validates, you need `aria-live` regions to announce the change. This is an architectural pattern — you need a global announcement mechanism.
4. **Automated vs Manual Testing** — Automated tools (axe, Lighthouse) catch ~30% of accessibility issues (missing alt text, color contrast, missing labels). The other 70% (logical focus order, meaningful labels, keyboard workflows) require manual testing and screen reader testing.

*Common mistakes:*
1. **Adding ARIA to fix what semantic HTML would solve** — `<div role="button" tabIndex={0} onKeyDown={handleEnter}>` is a worse button than `<button>`. Use native elements first.
2. **Only testing with automated tools** — Passing axe with 0 violations doesn't mean the app is accessible. Automated tools can't evaluate if a label is meaningful or if the tab order makes sense.
3. **Treating accessibility as a separate sprint** — "Accessibility sprint" fixes current issues but doesn't prevent new ones. Accessibility must be part of the definition of done for every feature.

*Architecture hints:*
1. Build accessibility into the design system. If the Button component is accessible, every team that uses it gets accessibility for free.
2. Create a focus management utility that handles the common patterns (modal open/close, page navigation, dynamic content insertion).

*Quick-check:*
1. A modal opens but the user can still Tab to elements behind it. What architectural pattern is missing? → **Focus trapping.** When a modal is open, focus should be trapped inside it — Tab cycles through the modal's elements and doesn't escape to the page behind.
2. A form shows validation errors after submission, but a screen reader user hears nothing. What's missing? → **A live region announcement.** Validation errors should be announced to screen readers using `aria-live="assertive"` or by moving focus to the error summary.

**What a strong answer includes:**
- Component-level patterns (semantic HTML, ARIA when needed)
- Focus management architecture (modals, navigation, dynamic content)
- Announcement system (live regions for toasts, errors, status changes)
- Keyboard navigation patterns
- Testing strategy (automated + manual + screen reader)
- Sustainability plan (linting rules, design system, definition of done)

**Evaluation criteria:**
- Is semantic HTML prioritized over ARIA?
- Is focus management treated as an architectural concern?
- Is there a live region/announcement strategy?
- Does the testing strategy include manual/screen reader testing?
- Is sustainability addressed (not just a one-time fix)?

---

### Challenge 13: Routing Architecture for a Complex SPA

**Difficulty:** Intermediate
**Category:** Frontend Architecture

**Description:**
You're building a complex SPA with: public pages (marketing, docs), authenticated pages (dashboard, settings), role-gated pages (admin panel), nested layouts (dashboard has sidebar + nested routes), modals that have their own URLs (so they're shareable/bookmarkable), and deep links from email notifications. Design the routing architecture.

**Why this matters:**
Routing in a complex SPA is more than URL → component mapping. It involves layout composition, auth guards, data loading, code splitting, and state preservation. The routing architecture shapes the entire app structure.

**What the user should produce:**
A routing architecture covering route hierarchy, layout nesting, auth/role guards, URL-driven modals, code splitting boundaries, and data loading strategy per route.

**Key concepts needed:**
- Nested layouts and route groups
- Route guards and middleware
- URL state management
- Code splitting at route boundaries

**Learning support:**

*Concepts:*
1. **Nested Layouts** — Routes share layouts. The dashboard sidebar persists while nested pages change. The auth guard wraps all authenticated routes. Layout nesting is route nesting — each layout level is a route boundary.
2. **Route Guards** — Before rendering a route, check if the user is authorized. Auth guards redirect to login. Role guards redirect to a "not authorized" page. Guards should be declarative (part of the route config), not imperative (if statements in components).
3. **URL as State** — Modals, filters, pagination, and sort order can live in the URL. This makes states shareable, bookmarkable, and back-button friendly. The URL is a state container — design it intentionally.
4. **Code Splitting at Routes** — Each route is a natural code splitting boundary. The admin panel's code shouldn't load when a user visits the homepage. Lazy-load route components to keep the initial bundle small.

*Common mistakes:*
1. **Flat route configuration** — Listing 50 routes without hierarchy makes guards, layouts, and code splitting harder. Nest routes to reflect the UI hierarchy.
2. **Auth checks inside page components** — If the component renders before checking auth, there's a flash of protected content. Guards should prevent rendering, not react to it.
3. **Not encoding shareable state in the URL** — If a filtered, sorted table view can't be shared via URL, users will file it as a bug. Design URL state from the start.

*Architecture hints:*
1. Map your route tree to your layout tree. Every unique layout combination is a route boundary.
2. Think about "what should happen when the user pastes this URL in a new tab?" That question reveals what state must be in the URL.

*Quick-check:*
1. A user receives an email with a link to `/dashboard/projects/123/tasks/456`. They're not logged in. What should happen? → **Redirect to login, preserve the deep link, redirect back after auth.** The original URL should be stored (in URL params or session) and restored after login.
2. A modal for editing a task has the URL `/tasks/456/edit`. The user refreshes the page. What should happen? → **The page loads with the modal already open.** The URL is the source of truth — if the URL says "edit modal for task 456," the UI should reflect that.

**What a strong answer includes:**
- Route hierarchy with layout nesting
- Auth and role guard implementation
- URL-driven modal strategy
- Code splitting boundaries aligned with routes
- Deep link handling (email, bookmarks)
- Data loading strategy per route (parallel vs waterfall)

**Evaluation criteria:**
- Is the route hierarchy reflecting the layout hierarchy?
- Are guards declarative and prevent rendering (not reactive)?
- Is URL state used for shareable/bookmarkable states?
- Are code splitting boundaries aligned with routes?
- Is deep linking handled correctly?

---

### Challenge 14: Migrating a REST API to GraphQL

**Difficulty:** Intermediate
**Category:** APIs & Service Boundaries

**Description:**
Your React application consumes 15 REST endpoints. The frontend team is frustrated: some pages require 5+ sequential API calls, many endpoints return more data than needed (over-fetching), and adding a new field requires backend changes. The team wants to evaluate migrating to GraphQL. Design the migration strategy — not just "use GraphQL," but how to introduce it incrementally without breaking the existing system.

**Why this matters:**
API architecture directly affects frontend performance, developer experience, and team coupling. Migrating from REST to GraphQL is a common real-world challenge that tests your ability to plan incremental change at the API boundary.

**What the user should produce:**
A migration strategy covering where GraphQL sits in the architecture, how it coexists with REST during migration, which endpoints to migrate first, and how the frontend consumption changes.

**Key concepts needed:**
- GraphQL vs REST tradeoffs
- BFF (Backend for Frontend) pattern
- Schema design
- Incremental migration

**Learning support:**

*Concepts:*
1. **GraphQL as a BFF** — GraphQL doesn't replace your backend services. It sits between the frontend and REST APIs as a Backend for Frontend. The GraphQL server calls your existing REST endpoints and aggregates the data the frontend needs.
2. **Over-fetching and Under-fetching** — REST endpoints return fixed shapes. If you need 3 fields from a 30-field response, you're over-fetching. If you need data from 3 endpoints, you're under-fetching (multiple round trips). GraphQL lets the client request exactly what it needs.
3. **Schema-First Design** — Design the GraphQL schema based on what the frontend needs, not on how the database looks. The schema is a contract between frontend and backend — it should be optimized for consumption.
4. **Incremental Adoption** — Don't rewrite all 15 endpoints at once. Start with the highest-pain endpoint (the one requiring 5+ calls), wrap it in GraphQL, and validate the approach before expanding.

*Common mistakes:*
1. **Mirroring REST endpoints as GraphQL queries** — If your GraphQL schema is just your REST API with different syntax, you've gained nothing. Design the schema for the client's needs.
2. **Migrating everything at once** — Big-bang migrations fail. Start with 1-2 high-pain use cases, learn, then expand.
3. **Ignoring caching complexity** — REST with HTTP caching is simple (URL-based). GraphQL caching is harder (normalized client-side cache). Budget time for caching strategy.

*Architecture hints:*
1. Start with the page that makes the most API calls. If GraphQL reduces 5 calls to 1, the value is immediately visible.
2. Run GraphQL and REST in parallel. The frontend can use GraphQL for new features and REST for existing ones during migration.

*Quick-check:*
1. Your homepage makes 5 REST calls to load. With GraphQL, how many network requests would it take? → **One.** A single GraphQL query can request all the data the homepage needs in one round trip.
2. Should the GraphQL schema match your database tables? → **No.** The schema should match frontend needs. A `UserProfile` query might combine data from the `users`, `settings`, and `subscriptions` tables into one response.

**What a strong answer includes:**
- GraphQL's role in the architecture (BFF, not replacing backend services)
- Migration strategy (which endpoints first, how REST and GraphQL coexist)
- Schema design approach (client-driven, not database-driven)
- Frontend migration (how components switch from fetch to GraphQL queries)
- Caching strategy
- Team workflow impact

**Evaluation criteria:**
- Is GraphQL positioned as a BFF, not a backend rewrite?
- Is the migration incremental?
- Is the schema designed for client needs?
- Is caching addressed?
- Are tradeoffs of GraphQL honestly acknowledged?

---

### Challenge 15: Real-Time Dashboard at Scale

**Difficulty:** Intermediate
**Category:** System Design

**Description:**
A fintech company needs a dashboard showing live portfolio values, transaction feeds, and market alerts for 50K concurrent users. Data updates every 1-5 seconds from multiple backend services. The frontend must handle high-frequency updates without degrading performance. Design the frontend and data delivery architecture.

**Why this matters:**
Real-time systems expose every architectural weakness — rendering performance, memory management, connection handling, and data flow. A dashboard that freezes under load is worse than one that doesn't update at all.

**What the user should produce:**
Architecture for data delivery (WebSocket/SSE), connection management, frontend rendering under high-frequency updates, and graceful degradation.

**Key concepts needed:**
- WebSocket vs SSE vs polling
- Pub/sub for data fan-out
- Virtual scrolling
- Throttled rendering

**Learning support:**

*Concepts:*
1. **WebSocket vs SSE** — WebSockets are bidirectional (client and server can send). SSE is server-to-client only. For a dashboard where the server pushes data, SSE is simpler and sufficient. WebSockets are needed if the client sends data back (chat, trading).
2. **Data Fan-Out** — The backend can't maintain 50K individual database queries. A pub/sub layer (Redis Pub/Sub, Kafka) fans out updates from a few data sources to many connected clients.
3. **Throttled Rendering** — If data updates every 100ms, rendering every update causes UI jank. Buffer updates and render at a fixed rate (e.g., 4 times per second). The user can't perceive faster-than-250ms updates anyway.
4. **Virtual Scrolling** — A transaction feed with 10K rows can't render all DOM elements. Virtual scrolling renders only visible rows (~20-50) and recycles DOM nodes as the user scrolls.

*Common mistakes:*
1. **Re-rendering the entire page on every data tick** — Use granular subscriptions. Only the components displaying changed data should re-render.
2. **Accumulating all historical data in memory** — A transaction feed that keeps every event in state will eventually crash the browser tab. Set a maximum buffer size and evict old entries.
3. **No reconnection strategy** — WebSocket connections drop. The client needs automatic reconnection with exponential backoff, and the UI should indicate stale data.

*Architecture hints:*
1. Different data types need different update strategies. Prices update every second (high frequency, small payload). Transaction feed appends new entries (low frequency, list). Alerts are rare but high priority. Don't treat them the same.
2. Design a "data freshness indicator" — if the connection drops, show the user that data may be stale.

*Quick-check:*
1. Portfolio values update every second. Should you re-render the portfolio section on every tick? → **No.** Batch updates and render at a throttled rate (e.g., every 250ms). The user can't perceive the difference, and it prevents UI jank.
2. A WebSocket connection drops for 30 seconds. What should happen when it reconnects? → **Request a snapshot of current state** (not a replay of 30 seconds of missed events). Then resume receiving live updates.

**What a strong answer includes:**
- Data delivery mechanism per data type
- Connection management (reconnection, stale data indication)
- Backend fan-out architecture
- Frontend rendering strategy (throttled updates, granular subscriptions)
- Memory management (buffer limits, eviction)
- Graceful degradation (stale indicator, fallback to polling)

**Evaluation criteria:**
- Is the delivery mechanism chosen per data type, not one-size-fits-all?
- Is rendering performance addressed (throttling, granular updates)?
- Is memory management considered?
- Is reconnection/stale data handled?
- Is there a backend fan-out strategy?

---

### Challenge 16: Multi-Tenant SaaS Frontend

**Difficulty:** Intermediate
**Category:** System Design

**Description:**
You're building a B2B SaaS product where each customer (tenant) gets their own branded experience — custom colors, logos, feature sets, and even different navigation layouts. Some enterprise tenants want custom domains. Design the frontend architecture that supports multi-tenancy without maintaining separate codebases per tenant.

**Why this matters:**
Multi-tenancy is a defining architectural challenge for B2B SaaS. The wrong approach means one codebase per customer (unmaintainable) or a rigid one-size-fits-all (customers leave). Good multi-tenant architecture scales to 100+ tenants with minimal marginal cost.

**What the user should produce:**
Architecture for tenant resolution, theming, feature gating, configuration loading, and deployment strategy.

**Key concepts needed:**
- Tenant resolution
- Runtime theming
- Feature gating per tenant
- Configuration-driven UI

**Learning support:**

*Concepts:*
1. **Tenant Resolution** — The first thing the app must do is figure out which tenant the request is for. Strategies: subdomain (`acme.app.com`), custom domain (`app.acme.com`), path (`app.com/acme`), or header-based. Each has deployment and infrastructure implications.
2. **Runtime Theming** — Brand customization (colors, logos, fonts) should be applied at runtime, not build time. CSS custom properties loaded from tenant config enable this without per-tenant builds.
3. **Feature Gating** — Different pricing plans unlock different features. The UI checks tenant permissions and shows/hides features accordingly. This is similar to feature flags but scoped to tenant configuration.
4. **Configuration-Driven UI** — Navigation layout, dashboard widgets, and visible modules can be driven by tenant config. The code is the same; the configuration determines what appears.

*Common mistakes:*
1. **Build-time per-tenant customization** — If you need to build and deploy separately for each tenant, you can't scale to 100+ tenants. Everything must be runtime-configurable.
2. **Hardcoding tenant-specific logic** — `if (tenant === 'acme') { ... }` doesn't scale. Use configuration objects and feature flags, not conditionals.
3. **Serving tenant config on every request** — Load tenant config once at app initialization and cache it. Don't fetch it on every page navigation.

*Architecture hints:*
1. Think of tenant config as a runtime environment variable — it shapes the app's behavior but the code doesn't change.
2. Custom domains require DNS and TLS configuration at the infrastructure level. Budget for this if enterprise tenants need it.

*Quick-check:*
1. A tenant wants their primary brand color to be red instead of blue. Should this require a code change? → **No.** Brand colors should be driven by tenant configuration and applied via CSS custom properties at runtime.
2. Tenant A is on the "Pro" plan and has access to the analytics dashboard. Tenant B is on "Basic" and should not see it. Where should this be enforced? → **Both frontend and API.** The frontend hides the navigation link; the API rejects requests to analytics endpoints for Basic plan tenants.

**What a strong answer includes:**
- Tenant resolution strategy
- Runtime theming architecture (tokens/CSS variables from config)
- Feature gating per tenant/plan
- Tenant config loading and caching
- Deployment model (single deployment serving all tenants)
- Custom domain handling
- Data isolation on the frontend

**Evaluation criteria:**
- Is all customization runtime (no per-tenant builds)?
- Is tenant resolution cleanly separated from app logic?
- Is feature gating config-driven, not hardcoded?
- Does the design scale to 100+ tenants?
- Is data isolation considered?

---

### Challenge 17: API Gateway Design

**Difficulty:** Intermediate / Advanced
**Category:** APIs & Service Boundaries

**Description:**
Your company has 12 microservices, each with its own REST API. The frontend team is frustrated — they need to call 4-5 services per page and handle authentication, rate limiting, and error handling differently for each. Design an API gateway that provides a unified interface for the frontend while keeping backend services decoupled.

**Why this matters:**
An API gateway is the architectural boundary between frontend and backend. It simplifies the frontend, centralizes cross-cutting concerns, and decouples frontend needs from backend service structure. But it can also become a bottleneck or a monolith in disguise.

**What the user should produce:**
Architecture for request routing, response aggregation, authentication, rate limiting, caching, and how the gateway avoids becoming a bottleneck.

**Key concepts needed:**
- API gateway pattern
- BFF (Backend for Frontend)
- Circuit breaker
- Response aggregation

**Learning support:**

*Concepts:*
1. **API Gateway vs BFF** — An API gateway is a general-purpose entry point (routing, auth, rate limiting). A BFF is a gateway tailored to a specific frontend's needs (response aggregation, field selection). You might have one gateway with BFF behavior for the web frontend and different behavior for the mobile app.
2. **Response Aggregation** — Instead of the frontend calling 4 services, the gateway calls them and combines the responses into one payload. This reduces client round trips and hides backend service structure from the frontend.
3. **Circuit Breaker** — If a downstream service is failing, the gateway should stop sending requests to it (circuit "opens") and return a fallback response. This prevents cascade failures where one slow service makes the entire gateway slow.
4. **Rate Limiting** — Protect backend services from being overwhelmed. Apply rate limits per user, per IP, or per endpoint. The gateway is the natural place for this since all traffic flows through it.

*Common mistakes:*
1. **Putting business logic in the gateway** — The gateway handles routing, auth, and aggregation. Business logic (order processing, user validation) belongs in the services.
2. **Not handling partial failures** — If the gateway aggregates data from 4 services and 1 fails, it should return the 3 successful responses with an indication of the partial failure — not an error for the entire request.
3. **Single point of failure** — If the gateway goes down, everything goes down. Deploy multiple instances behind a load balancer.

*Architecture hints:*
1. Start simple — routing and auth. Add aggregation and circuit breakers as needs arise.
2. Define clear ownership: the gateway team owns routing and cross-cutting concerns. Service teams own their API contracts.

*Quick-check:*
1. The product service is down. A page needs data from product, user, and cart services. What should the gateway return? → **User and cart data successfully, with a clear indication that product data is unavailable.** The page can render partially.
2. Should the gateway transform response shapes (e.g., rename fields, flatten nested objects)? → **Yes, if it's acting as a BFF.** The gateway can translate backend response shapes into what the frontend needs. This decouples the frontend from backend schema changes.

**What a strong answer includes:**
- Gateway's role and boundaries
- Routing strategy
- Authentication at the gateway level
- Response aggregation with partial failure handling
- Circuit breaker pattern
- Rate limiting strategy
- Caching at the gateway level
- How to prevent the gateway from becoming a monolith

**Evaluation criteria:**
- Is the gateway scoped correctly (routing + cross-cutting, not business logic)?
- Is partial failure handled gracefully?
- Are circuit breakers addressed?
- Is the gateway horizontally scalable?
- Is ownership between gateway and services clear?

---

### Challenge 18: Event-Driven Order Processing

**Difficulty:** Intermediate / Advanced
**Category:** Event-Driven Systems

**Description:**
An e-commerce platform processes 5K orders per minute. The current synchronous flow — validate → charge → reserve inventory → send confirmation — is brittle. If the email service is down, the entire order fails. Redesign the order processing pipeline using event-driven architecture.

**Why this matters:**
Synchronous chains fail as systems grow. Event-driven architecture decouples services, improves resilience, and enables scaling — but introduces complexity around consistency, ordering, and failure handling.

**What the user should produce:**
An event-driven pipeline showing which steps are synchronous vs async, event flow, failure handling (sagas), idempotency, and how the user sees order status.

**Key concepts needed:**
- Events vs commands
- Saga pattern
- Idempotency
- Eventual consistency

**Learning support:**

*Concepts:*
1. **Synchronous vs Asynchronous Boundaries** — Payment should stay synchronous (user needs to know immediately if it failed). Email confirmation, inventory analytics, and loyalty points can be async (user doesn't need to wait).
2. **Saga Pattern** — A saga manages a multi-step distributed transaction. If step 3 fails, the saga triggers compensating actions for steps 1 and 2 (e.g., refund the charge, release the inventory). It's how you get transaction-like behavior without a single database.
3. **Idempotency** — If a message is delivered twice (network retry), the operation should produce the same result. Charging a credit card twice is a critical bug. Idempotency keys ensure operations are applied exactly once.
4. **Eventual Consistency** — In an event-driven system, different services have different views of the world at any given moment. Inventory might show "reserved" while the email hasn't sent yet. The system is eventually consistent — all services converge to the correct state.

*Common mistakes:*
1. **Making everything async** — Payment and core validation should be synchronous. The user needs immediate feedback on whether their order was accepted.
2. **No idempotency on payment** — Network retries can cause double charges. Every payment operation must have an idempotency key.
3. **No dead letter queue** — Events that fail processing repeatedly need to go somewhere for investigation. Without a DLQ, they're silently lost.

*Architecture hints:*
1. Draw the line: synchronous for user-facing decisions (payment, validation), asynchronous for downstream effects (email, analytics, loyalty points).
2. Design for "what happens if this event is processed twice?" before "what happens in the happy path?"

*Quick-check:*
1. The email service is down for 10 minutes. Should pending orders fail? → **No.** Email is async. Orders are accepted and confirmed via the payment step. Emails are queued and sent when the service recovers.
2. A payment event is delivered twice due to a network retry. What prevents the customer from being charged twice? → **An idempotency key.** The payment service checks if it has already processed this key and skips the duplicate.

**What a strong answer includes:**
- Clear sync/async boundary (what's sync, what's async, and why)
- Event flow diagram
- Saga pattern for multi-step failure handling
- Idempotency strategy for critical operations
- Dead letter queue for failed events
- User-facing order status updates
- Monitoring and alerting for the async pipeline

**Evaluation criteria:**
- Is payment kept synchronous?
- Is the saga pattern used for distributed transaction management?
- Are idempotency keys mentioned?
- Is there a dead letter queue strategy?
- Is the user experience during async processing addressed?

---

### Challenge 19: Offline-First PWA Architecture

**Difficulty:** Intermediate / Advanced
**Category:** System Design

**Description:**
A field service company needs a mobile web app for technicians who work in areas with unreliable connectivity. Technicians must fill out inspection forms, take photos, and sync when back online. Design the architecture for this offline-first progressive web app.

**Why this matters:**
Offline-first forces you to think about data ownership, conflict resolution, and synchronization — problems that most web developers never encounter but that reveal deep architectural thinking.

**What the user should produce:**
Architecture for offline data storage, service worker caching, sync strategy, conflict resolution, and progressive enhancement.

**Key concepts needed:**
- Service workers
- IndexedDB
- Sync strategies
- Conflict resolution

**Learning support:**

*Concepts:*
1. **Offline-First Mindset** — Instead of "works online, maybe offline," design for offline as the default. The app works with local data. When online, it syncs. This inversion changes every architectural decision.
2. **IndexedDB for Structured Data** — localStorage is limited (5MB, string-only). IndexedDB stores structured data, supports indexes for queries, and holds gigabytes. It's the right tool for offline form data and metadata.
3. **Service Workers for Asset Caching** — Service workers intercept network requests and serve cached responses. Cache static assets (HTML, JS, CSS) so the app shell loads offline. Cache API responses as fallback data.
4. **Conflict Resolution** — Two technicians edit the same inspection offline. When they sync, whose changes win? Strategies: last-write-wins (simple, data loss risk), field-level merge (complex, fewer conflicts), or manual resolution (safe, user effort).

*Common mistakes:*
1. **Assuming online is the default** — If the sync fails silently and the user doesn't know their data hasn't been saved to the server, they'll lose trust in the app.
2. **Storing photos in IndexedDB** — Large files should use the Cache API or File System Access API. IndexedDB works but degrades with large binary data.
3. **No queuing for offline actions** — User actions taken offline (form submissions, photo uploads) need to be queued and replayed when connectivity returns, in order.

*Architecture hints:*
1. Separate "available offline" (app shell, cached data) from "created offline" (new forms, photos). They have different storage and sync strategies.
2. Show a clear sync status indicator. The user must always know if their data is local-only or server-confirmed.

*Quick-check:*
1. A technician submits 3 inspection forms offline. They reconnect. In what order should the forms sync? → **In the order they were submitted.** A queue (FIFO) preserves the sequence.
2. Two technicians fill out the same inspection form offline with different answers for one field. How do you handle this? → **It depends on your conflict resolution strategy.** Last-write-wins is simplest. Field-level merge is more accurate. For high-stakes data, flag the conflict for manual resolution.

**What a strong answer includes:**
- Offline data storage strategy (IndexedDB + Cache API)
- Service worker caching strategy (app shell, API responses)
- Sync queue architecture (ordered replay of offline actions)
- Conflict resolution strategy
- Large file handling (photos)
- Sync status indicator for UX
- Retry and error handling for failed syncs

**Evaluation criteria:**
- Is offline treated as the default, not an edge case?
- Is the storage strategy appropriate (IndexedDB for data, Cache API for assets/files)?
- Is the sync queue ordered and resilient?
- Is conflict resolution addressed with a concrete strategy?
- Is the user informed about sync status?

---

### Challenge 20: Performance Architecture

**Difficulty:** Intermediate
**Category:** Performance

**Description:**
Your e-commerce site has a Largest Contentful Paint (LCP) of 4.2 seconds and a Time to Interactive (TTI) of 6.8 seconds. The site is a Next.js app with 2MB of JavaScript, 150 API calls on the homepage, and images served from the origin server. Leadership wants Core Web Vitals in the "good" range. Design a performance architecture — a systematic approach, not a list of quick fixes.

**What the user should produce:**
A layered performance architecture covering rendering strategy, code splitting, data loading, image delivery, caching, and sustainability (budgets, monitoring).

**Key concepts needed:**
- Core Web Vitals
- Code splitting and lazy loading
- Image optimization
- Performance budgets

**Learning support:**

*Concepts:*
1. **Core Web Vitals** — LCP (Largest Contentful Paint, < 2.5s), INP (Interaction to Next Paint, < 200ms), CLS (Cumulative Layout Shift, < 0.1). These are Google's metrics for user experience. They measure loading, interactivity, and visual stability.
2. **Code Splitting** — Instead of loading all 2MB of JavaScript upfront, split it into chunks loaded on demand. Route-based splitting (each page loads its own code) is the highest-impact strategy. Component-level splitting (heavy components loaded lazily) adds further gains.
3. **Request Waterfall** — 150 API calls on the homepage are likely sequential (one finishes → next starts). A BFF that aggregates these into 1-3 requests eliminates the waterfall. Parallel requests also help if a BFF isn't feasible.
4. **Performance Budgets** — A performance budget is a limit: "JavaScript must stay under 300KB per route." Without budgets, performance degrades as features are added. Enforce budgets in CI (fail the build if exceeded).

*Common mistakes:*
1. **Optimizing everything equally** — Focus on the critical rendering path first. The above-the-fold content visible in the first 2 seconds matters most.
2. **Fixing performance once instead of sustaining it** — Without budgets and monitoring, performance degrades within months as new features add weight.
3. **Ignoring the data layer** — You can optimize rendering perfectly, but if the page waits for 150 API calls, it's still slow. Data architecture is performance architecture.

*Architecture hints:*
1. Work backward from the metric. LCP too high? What's the largest element? Is it blocked by JS, data, or images? Fix that chain.
2. Layer your performance strategy: network (CDN, caching) → data (aggregation, prefetching) → rendering (SSR/SSG, code splitting) → runtime (lazy loading, virtualization).

*Quick-check:*
1. The homepage loads 2MB of JavaScript, but 1.4MB is code for the admin panel. What's the highest-impact fix? → **Code splitting.** Split the admin panel into a separate chunk that only loads when the admin route is visited.
2. Images are served from the origin server and load slowly. What two infrastructure changes have the most impact? → **CDN** (serve images from edge nodes near the user) and **responsive images** (serve appropriately sized images for each device).

**What a strong answer includes:**
- Rendering strategy per page type (SSG/SSR/ISR/CSR)
- Code splitting strategy with boundaries
- Data loading architecture (reduce 150 API calls)
- Image delivery (CDN, responsive, modern formats, lazy loading)
- Caching layers (CDN, service worker, HTTP headers)
- Performance budgets and CI enforcement
- Monitoring and alerting

**Evaluation criteria:**
- Is performance treated as architecture, not a checklist?
- Is the rendering strategy per-page, not one-size-fits-all?
- Is the data layer addressed (not just rendering)?
- Are performance budgets and monitoring included?
- Is the approach sustainable?

---

### Challenge 21: Micro-Frontend Migration

**Difficulty:** Advanced
**Category:** System Design

**Description:**
Your company has a 4-year-old React monolith with 300K lines of code. Three teams work on it, and deployments take 45 minutes. Merge conflicts are daily. Leadership wants independent team deployments without a full rewrite. Design a micro-frontend migration strategy.

**Why this matters:**
Micro-frontends solve organizational problems (team independence, deployment frequency) but introduce technical complexity (shared dependencies, routing, consistency). The migration strategy matters more than the target architecture.

**What the user should produce:**
Migration strategy covering extraction boundaries, micro-frontend pattern, shared dependencies, routing, communication, and phased migration plan.

**Key concepts needed:**
- Module Federation
- Strangler fig pattern
- Shared dependency management
- Cross-app communication

**Learning support:**

*Concepts:*
1. **Module Federation** — Webpack Module Federation lets separate applications share code at runtime. App A can load a component from App B without bundling it. This enables independent builds and deployments while sharing common libraries.
2. **Strangler Fig Pattern** — Gradually replace parts of the monolith with micro-frontends, one section at a time. The monolith and micro-frontends coexist behind a shared shell. Over time, the monolith shrinks until it can be retired.
3. **Shared Dependencies** — If each micro-frontend bundles its own React, the user downloads React 3 times. Shared dependencies (React, design system) must be loaded once and shared at runtime. Version mismatches are the biggest practical challenge.
4. **Cross-App Communication** — Micro-frontends need to communicate (user selects something in App A, App B reacts). Options: custom events, shared state store, URL parameters. Keep communication minimal — high coupling defeats the purpose.

*Common mistakes:*
1. **Splitting by technical layer instead of business domain** — "Header micro-frontend" and "sidebar micro-frontend" don't solve the team ownership problem. Split by business domain (orders, catalog, user management).
2. **Extracting everything at once** — Start with one well-bounded section, prove the pattern works (build, deploy, test independently), then expand.
3. **Ignoring UX consistency** — Independent teams can diverge on look and feel. A shared design system and shared tokens are essential.

*Architecture hints:*
1. The first extraction should be the section with the clearest boundary and highest deployment frequency. That's where you'll see the most benefit and the least risk.
2. The app shell (routing, navigation, auth) stays as a thin orchestrator. Don't put business logic in the shell.

*Quick-check:*
1. Team A uses React 18. Team B wants React 19. Both are micro-frontends. How do you handle this? → **Module Federation can load different versions, but sharing one version is strongly preferred.** Version mismatches cause bugs (two React instances) and bundle bloat. Align on a shared version.
2. Three teams deploy independently. Team A deploys a breaking change that affects Team B. How do you prevent this? → **Contract testing.** Each micro-frontend defines its integration contract (shared events, shared state shape). CI tests verify contracts aren't broken.

**What a strong answer includes:**
- Extraction boundaries (business domain, not technical layer)
- Micro-frontend pattern choice (Module Federation, iframe, etc.)
- Shared dependency strategy
- Routing across micro-frontends
- Cross-app communication approach
- App shell architecture
- Migration phases (strangler fig)
- Testing strategy (contract tests)

**Evaluation criteria:**
- Are boundaries based on business domain?
- Is the migration incremental (strangler fig)?
- Are shared dependencies handled?
- Is UX consistency addressed?
- Is the app shell thin and focused?

---

### Challenge 22: Monolith Decomposition Strategy

**Difficulty:** Advanced
**Category:** System Design

**Description:**
You've inherited a 6-year-old Node.js monolith — Express app, single PostgreSQL database, 800K lines of code. It handles users, billing, content management, notifications, and analytics. Deployments are weekly because the test suite takes 2 hours. Define a decomposition strategy: what to extract first, how to extract it, and how to manage the transition.

**Why this matters:**
Most engineers will encounter a monolith that needs decomposition. The challenge isn't knowing about microservices — it's knowing how to get there incrementally without breaking a running system.

**What the user should produce:**
Decomposition strategy covering extraction prioritization, database decomposition, communication during transition, and the hybrid operating model.

**Key concepts needed:**
- Service extraction patterns
- Database decomposition
- Strangler fig pattern
- Distributed transactions

**Learning support:**

*Concepts:*
1. **Extraction Prioritization** — Not all parts should be extracted at once (or ever). Prioritize by: change frequency (what changes most?), scaling needs (what needs independent scaling?), team ownership (what do different teams own?), and pain (what causes the most deployment conflicts?).
2. **Database Decomposition** — The hardest part. The monolith shares one database. Extracting a service means splitting the database — and dealing with joins that cross the new boundary. Start with a shared database (services read from the same DB), then gradually migrate to separate databases.
3. **Strangler Fig** — Route requests through a proxy. New functionality goes to the new service. Old functionality stays in the monolith. Over time, more routes point to new services. The monolith shrinks.
4. **Anti-Corruption Layer** — When the new service communicates with the monolith, use an adapter that translates between the old and new data models. This prevents the new service from inheriting the monolith's technical debt.

*Common mistakes:*
1. **Starting with the easiest extraction instead of the most valuable** — Extracting a simple utility service proves nothing. Extract the component with the highest deployment friction or scaling need.
2. **Ignoring the database** — Extracting code into a service but keeping it pointed at the monolith's database isn't decomposition. It's a distributed monolith.
3. **Underestimating the transition period** — The hybrid state (some services extracted, some still in the monolith) will last months or years. Design for this as a permanent architecture, not a temporary state.

*Architecture hints:*
1. Map the monolith's modules by change frequency and team ownership. The overlap reveals extraction candidates.
2. The first extraction teaches you more than the plan. Optimize for learning speed, not architectural purity.

*Quick-check:*
1. The notifications module changes weekly and is owned by a dedicated team. The billing module changes monthly and is shared by 3 teams. Which should you extract first? → **Notifications.** It changes frequently, has clear ownership, and extraction provides immediate deployment independence for that team.
2. After extracting the notifications service, it still queries the monolith's users table directly. Is this decomposition? → **Not yet.** It's a distributed monolith. The notification service should either have its own user data store or call the monolith's API for user data.

**What a strong answer includes:**
- Extraction prioritization framework
- First extraction candidate with reasoning
- Database decomposition strategy (phased)
- Communication between monolith and new services
- Anti-corruption layer
- Testing during transition
- Timeline and team impact acknowledgment

**Evaluation criteria:**
- Is extraction prioritized by business value?
- Is the database coupling addressed?
- Is the transition architecture sustainable (not just a migration plan)?
- Are cross-cutting concerns (auth, logging) addressed?
- Is the hybrid period acknowledged as long-lived?

---

### Challenge 23: AI Chat Interface Architecture

**Difficulty:** Advanced
**Category:** AI Architecture

**Description:**
Your product is adding an AI-powered assistant that streams responses, supports conversation history, handles tool calls (search, data lookup), and shows rich content (tables, charts, code blocks) in the response. Design the frontend architecture for this AI chat interface.

**Why this matters:**
AI-powered interfaces introduce new UI patterns — streaming content, mixed content types, tool execution, and conversation state management. These patterns don't fit neatly into traditional CRUD architecture.

**What the user should produce:**
Architecture for streaming UI, message data model, tool-call rendering, conversation state, and interruption handling.

**Key concepts needed:**
- Server-Sent Events / streaming fetch
- Mixed content message model
- Tool call lifecycle
- Conversation state management

**Learning support:**

*Concepts:*
1. **Streaming Tokens** — AI responses arrive token by token over several seconds. The UI must render incrementally — showing text as it arrives, not waiting for the full response. Server-Sent Events (SSE) or streaming fetch deliver tokens to the client.
2. **Mixed Content Messages** — An AI message might contain text, then a tool call result (a table), then more text, then a code block. The message model must support an ordered array of content blocks with different types.
3. **Tool Call Lifecycle** — The AI decides to call a tool (e.g., search). The frontend shows a "searching..." indicator. The tool result arrives. The AI continues generating text using the result. This is an async sub-flow within the message stream.
4. **Conversation Branching** — Users might want to regenerate a response or edit a previous message. This creates a tree of conversation paths, not a linear history. The data model needs to support branching.

*Common mistakes:*
1. **Rendering markdown on every token** — Re-parsing the full markdown string on every token is expensive. Use incremental markdown rendering or buffer tokens and render in chunks.
2. **Flat message model** — `{ role: 'assistant', text: string }` can't represent tool calls, code blocks, and rich content. Design a block-based message model from the start.
3. **No interruption support** — Users need to stop generation mid-stream. The frontend must signal the server to abort, stop rendering new tokens, and leave the partial response intact.

*Architecture hints:*
1. Design the message model first. Everything else (rendering, state, storage) flows from how messages are structured.
2. Treat tool calls as async operations embedded in the message flow — they have their own loading/success/error states.

*Quick-check:*
1. An AI response includes text, then a search result table, then more text. How should the message model represent this? → **As an ordered array of content blocks:** `[{ type: 'text', content: '...' }, { type: 'tool_result', tool: 'search', data: {...} }, { type: 'text', content: '...' }]`.
2. The user clicks "Stop" while the AI is mid-sentence. What should happen? → **Abort the stream, keep the partial response visible**, and allow the user to regenerate or continue from where it stopped.

**What a strong answer includes:**
- Streaming architecture (SSE/streaming fetch)
- Message data model (block-based, supports mixed content)
- Tool call rendering and lifecycle
- Conversation state (history, branching, regeneration)
- Interruption handling
- Markdown rendering strategy (incremental, not full re-parse)
- Loading and error states for the stream and tool calls

**Evaluation criteria:**
- Is the message model block-based for mixed content?
- Is streaming incremental, not batch-after-complete?
- Are tool calls modeled with their own lifecycle?
- Is interruption handled?
- Is conversation branching/regeneration considered?

---

### Challenge 24: Observability Architecture for Frontend

**Difficulty:** Advanced
**Category:** Reliability

**Description:**
Your production frontend has blind spots. When users report issues, the team can't reproduce them. Errors are logged inconsistently (or not at all). Performance regressions ship undetected. There's no way to know if a deployment caused problems until support tickets arrive. Design a frontend observability architecture that gives the team visibility into errors, performance, and user experience in production.

**Why this matters:**
You can't improve what you can't measure. Frontend observability is how you find bugs before users report them, catch performance regressions on deploy, and understand real-world user experience.

**What the user should produce:**
Architecture for error tracking, performance monitoring, session replay, alerting, and how observability data flows from browser to dashboards.

**Key concepts needed:**
- Error tracking and source maps
- Real User Monitoring (RUM)
- Session replay
- Alerting and SLOs

**Learning support:**

*Concepts:*
1. **Error Tracking** — Capture JavaScript errors, unhandled promise rejections, and React error boundary catches. Enrich with context (user ID, route, browser, state snapshot). Group by root cause, not by message text. Source maps translate minified stack traces to readable code.
2. **Real User Monitoring (RUM)** — Measure actual user performance (not synthetic benchmarks). Capture Core Web Vitals (LCP, INP, CLS) per page, per device, per geography. Aggregate into percentiles (p50, p75, p95) to understand the distribution, not just the average.
3. **Session Replay** — Record user sessions (DOM snapshots, clicks, scrolls) so you can replay what the user experienced before an error. Invaluable for reproducing bugs. Must handle PII carefully (mask inputs, exclude sensitive data).
4. **SLOs and Alerting** — A Service Level Objective is a target: "LCP p75 < 2.5s for 99% of sessions." Alerts fire when you're at risk of missing the SLO, not when a single user has a bad experience. This reduces alert noise.

*Common mistakes:*
1. **Logging everything without structure** — `console.log("error happened")` is useless at scale. Structured logging with context (error type, user action, component, state) is what makes errors debuggable.
2. **Monitoring averages instead of percentiles** — An average LCP of 2s might mean 90% of users see 1.5s and 10% see 6.5s. Percentiles reveal the true experience.
3. **No deployment correlation** — If you can't see errors and performance changes correlated with deployments, you can't tell if a deploy caused a regression. Tag metrics with the deployment version.

*Architecture hints:*
1. Start with error tracking (Sentry). It gives the highest signal with the least effort. Add RUM and session replay as the team matures.
2. Design a data pipeline: browser → collection SDK → transport (batched, not per-event) → backend → dashboards/alerts.

*Quick-check:*
1. A user reports "the page is slow" but your monitoring shows average load time is 1.8s. What might you be missing? → **Percentile data.** The average might be fine, but p95 could be 8s. Check performance at the tail, not just the center.
2. An error `TypeError: Cannot read property 'name' of undefined` appears 500 times after a deploy. The stack trace points to line 1, column 48972 of a minified file. What's missing? → **Source maps.** Upload source maps to your error tracking service so stack traces show original file names and line numbers.

**What a strong answer includes:**
- Error tracking architecture (capture, enrich, group, source maps)
- RUM for performance (Core Web Vitals, percentiles, per-route)
- Session replay with PII handling
- Alerting based on SLOs
- Deployment-correlated monitoring
- Data pipeline from browser to dashboards
- Privacy considerations

**Evaluation criteria:**
- Is error tracking structured and context-enriched?
- Is performance monitored with percentiles, not averages?
- Is deployment correlation included?
- Are SLOs and alerting designed to reduce noise?
- Is PII/privacy considered for session replay?

---

### Challenge 25: Design System Component API — The DataTable Problem

**Difficulty:** Advanced
**Category:** Design Systems

**Description:**
You're the architect of a shared design system used by 4 product teams. The current `<DataTable>` component has 47 props, constant bug reports, and every team has wrapped it with their own abstraction. Design a new DataTable component architecture that is flexible, composable, and maintainable.

**Why this matters:**
Component API design is architecture at the micro level. A well-designed component API multiplies productivity across teams. A poorly designed one (the 47-prop monster) creates more problems than it solves.

**What the user should produce:**
A component API design showing composition pattern, headless logic separation, customization points, and migration from the old component.

**Key concepts needed:**
- Compound component pattern
- Headless UI / hooks
- Inversion of control
- Progressive disclosure of complexity

**Learning support:**

*Concepts:*
1. **Compound Components** — Instead of one component with 47 props, provide composable building blocks: `<Table>`, `<Table.Header>`, `<Table.Row>`, `<Table.Cell>`, `<Table.Pagination>`. Users compose what they need. Simple tables are simple; complex tables are possible.
2. **Headless Logic** — Separate the data logic (sorting, filtering, pagination, selection) from the rendering. A `useTable()` hook provides state and handlers; the component provides the UI. Teams can use the hook with completely custom rendering.
3. **Inversion of Control** — Instead of the component deciding how to render a cell (via `cellRenderer` prop), let the user provide the cell content directly via composition. The component controls the layout; the user controls the content.
4. **Progressive Disclosure** — The simple case should be simple: `<Table data={rows} columns={cols} />`. Advanced cases build incrementally: add `<Table.Pagination>` for pagination, `useTableSort()` for sorting. Don't force users to learn everything upfront.

*Common mistakes:*
1. **Designing the API for power users only** — If a simple table requires importing 8 sub-components and 3 hooks, the API is too complex for basic use cases.
2. **Hardcoding the data format** — The table should accept any data shape. Column definitions should describe how to extract and render values from the user's data.
3. **Not considering accessibility from the start** — Tables need proper `<table>`, `<thead>`, `<tbody>`, `<th scope>` markup, sort indicators for screen readers, and keyboard navigation. Bolting this on later is painful.

*Architecture hints:*
1. Start from the consumer: write 3-5 example usage snippets for simple, medium, and complex tables. Then design the API that makes those snippets work.
2. The hook and the component are two products. Some teams want both. Some want just the hook with custom UI. Design them independently.

*Quick-check:*
1. A team needs a table with custom cell rendering for one column (a status badge). Should they use a render prop, a configuration object, or composition? → **Composition.** `<Table.Cell>{row.status === 'active' ? <Badge>Active</Badge> : <Badge>Inactive</Badge>}</Table.Cell>` is the most natural React pattern.
2. The table needs sorting, but one team wants client-side sorting and another wants server-side sorting. How does the API support both? → **The `useTableSort()` hook exposes `sortState` and `onSortChange`. Client-side: the hook sorts the data array. Server-side: `onSortChange` triggers a new API request.** The hook handles the state; the data source is the consumer's choice.

**What a strong answer includes:**
- Compound component API (sub-components for composition)
- Headless hook for data logic (useTable, useTableSort, useTableFilter)
- Simple-case API (few lines) vs complex-case API (composable)
- Customization points (cell rendering, custom styling)
- Accessibility (semantic table markup, keyboard navigation)
- Migration strategy from the 47-prop component

**Evaluation criteria:**
- Does the API favor composition over configuration?
- Is data logic separated from rendering (headless)?
- Is the simple case simple?
- Is accessibility built in?
- Is there a migration path?

---

### Challenge 26: Designing an AI-Powered Search Architecture

**Difficulty:** Advanced
**Category:** AI Architecture

**Description:**
Your content platform has 500K articles. The current keyword search is frustrating — users search for "how to handle errors in React" and get poor results because articles use different terminology. You're tasked with adding AI-powered semantic search that understands meaning, not just keywords. Design the architecture for the search system including indexing, retrieval, ranking, and the frontend search experience.

**Why this matters:**
AI-powered search is becoming a baseline feature. Understanding the architecture — embeddings, vector databases, retrieval pipelines — prepares you for a class of AI integration problems beyond just chatbots.

**What the user should produce:**
Architecture for embedding generation, vector storage, retrieval pipeline, ranking/reranking, and the frontend search UX.

**Key concepts needed:**
- Embeddings and vector similarity
- Vector databases
- Hybrid search (keyword + semantic)
- Retrieval-Augmented Generation (RAG)

**Learning support:**

*Concepts:*
1. **Embeddings** — An embedding is a numerical representation (vector) of text that captures its meaning. "Error handling in React" and "Managing exceptions in React components" have different keywords but similar embeddings. Embedding models (OpenAI, Cohere) convert text to vectors.
2. **Vector Database** — A specialized database for storing and searching embeddings. Instead of exact keyword matching, it finds the most similar vectors (nearest neighbors). Examples: Pinecone, Weaviate, pgvector.
3. **Hybrid Search** — Combine keyword search (exact matches, filters) with semantic search (meaning-based). A user searching for "useState hook" wants both exact keyword matches AND semantically related results about React state management.
4. **RAG (Retrieval-Augmented Generation)** — Retrieve relevant documents, then feed them to an LLM to generate a synthesized answer. Instead of showing 10 links, show a generated answer with citations. This is the "AI answer" experience.

*Common mistakes:*
1. **Replacing keyword search entirely** — Semantic search is great for fuzzy queries but bad for exact matches. Users searching for an exact error message need keyword search. Use both.
2. **Embedding entire articles as one vector** — Long articles cover multiple topics. Chunk articles into sections and embed each chunk separately for more precise retrieval.
3. **No relevance feedback loop** — If users click the 5th result instead of the 1st, that's a signal. Design for collecting and using relevance feedback to improve ranking over time.

*Architecture hints:*
1. The indexing pipeline (content → chunks → embeddings → vector DB) is a batch process. The search pipeline (query → embedding → retrieval → ranking) is real-time. Design them separately.
2. Start with hybrid search (keyword + semantic) before adding RAG. Each layer adds value and complexity independently.

*Quick-check:*
1. A user searches for "TypeError: Cannot read property 'map' of undefined". Should this use semantic search or keyword search? → **Keyword search.** This is an exact string. Semantic search might return vaguely related error handling articles. Keyword/exact match is more useful here.
2. An article about "React component lifecycle" is 5,000 words covering 8 topics. Should you create one embedding or multiple? → **Multiple.** Chunk the article into sections and embed each chunk. This way, a search about "cleanup in useEffect" matches the relevant section, not the entire article.

**What a strong answer includes:**
- Indexing pipeline (content → chunks → embeddings → storage)
- Search pipeline (query → embedding → retrieval → ranking)
- Hybrid search strategy (keyword + semantic)
- Vector database choice with reasoning
- Ranking/reranking approach
- Frontend search UX (instant results, AI-generated answers)
- RAG architecture for generated answers (if included)
- Feedback loop for improving relevance

**Evaluation criteria:**
- Is the indexing pipeline clearly separated from the search pipeline?
- Is hybrid search used (not semantic-only)?
- Is chunking addressed for long content?
- Is ranking/reranking considered?
- Is the frontend search experience designed?

---

### Challenge 27: Refactoring a God Component

**Difficulty:** Advanced
**Category:** Refactoring

**Description:**
You've inherited a 2,800-line React component called `<DashboardPage>`. It handles data fetching for 6 API endpoints, manages 14 pieces of state, contains 3 modals, renders a chart, a data table, a filter panel, and a summary card — all in one file. It has 94% test coverage, but every change risks breaking something. Design a refactoring strategy that breaks this component apart without breaking functionality.

**Why this matters:**
Refactoring at architectural scale is different from refactoring a function. You're restructuring a live system with tests, consumers, and team dependencies. The strategy matters as much as the target architecture.

**What the user should produce:**
A phased refactoring plan: extraction order, intermediate states, testing strategy at each step, and risk mitigation.

**Key concepts needed:**
- Extraction patterns (hooks, components, modules)
- Refactoring safety (tests as guardrails)
- Incremental delivery
- Dependency analysis

**Learning support:**

*Concepts:*
1. **Extract by Dependency Cluster** — Group the component's code by what depends on what. State + handlers + JSX that all relate to the filter panel form a cluster. Extract clusters, not individual lines.
2. **Refactor Under Test** — The existing 94% coverage is your safety net. Before extracting, ensure tests cover the behavior you're about to move. After extracting, run the same tests. If they pass, the refactoring is safe.
3. **Intermediate States Are Architecture** — The component won't go from 2,800 lines to perfect in one PR. Plan intermediate states where the code is better but not ideal. Each intermediate state should be a shippable, working improvement.
4. **Shallow Extraction First** — Start by extracting rendering (JSX) into presentational components. This is the safest refactoring — no logic moves, just visual organization. Then extract hooks for data/state clusters.

*Common mistakes:*
1. **Rewriting instead of refactoring** — A rewrite loses the safety of existing tests. Refactoring preserves behavior by definition. Move code, don't rewrite it.
2. **Extracting too many things in one PR** — Large refactoring PRs are unreviable and risky. One extraction per PR, with tests passing at each step.
3. **Changing behavior while refactoring** — Refactoring means changing structure without changing behavior. If you fix a bug or add a feature while refactoring, you can't tell if test failures are from the refactoring or the behavior change. Separate the concerns.

*Architecture hints:*
1. Draw a dependency graph of the state variables. Which state is used by which JSX? The clusters in this graph are your extraction boundaries.
2. The first extraction should be the most independent cluster — the one with the fewest connections to the rest of the component.

*Quick-check:*
1. The component has a `filterState` with handlers that only affect the filter panel JSX. Nothing else reads `filterState`. Is this a good first extraction? → **Yes.** It's an isolated cluster — state, handlers, and JSX that don't depend on the rest. Extract a `<FilterPanel>` component with a `useFilterState()` hook.
2. You've extracted 3 components and 2 hooks. Tests still pass. A team member wants to also change the data table's sorting logic in the same PR. Should you? → **No.** Ship the refactoring PR first. Change behavior in a separate PR. Mixing refactoring and behavior changes makes failures ambiguous.

**What a strong answer includes:**
- Dependency analysis of the component
- Extraction order (most independent clusters first)
- Intermediate states (each is shippable)
- Testing strategy at each step
- PR strategy (one extraction per PR)
- Risk mitigation (rollback plan, feature flags)
- Target architecture (what it looks like when done)

**Evaluation criteria:**
- Is the extraction based on dependency analysis, not gut feel?
- Is the plan incremental (not a big-bang rewrite)?
- Are tests used as safety guardrails?
- Is each step independently shippable?
- Is behavior change separated from structural change?

---

### Challenge 28: Platform Architecture — Building for Extensibility

**Difficulty:** Advanced
**Category:** System Design

**Description:**
Your SaaS product wants to become a platform — allowing third-party developers to build integrations, plugins, and custom workflows. The current architecture is a closed monolith. Design the platform architecture: how third-party code runs, what APIs it accesses, how it's sandboxed, and how the plugin lifecycle works.

**Why this matters:**
Platform thinking is staff-level architecture. It requires balancing openness (developers need power) with safety (plugins can't crash the platform), and designing APIs that are stable enough for external consumers.

**What the user should produce:**
Architecture for plugin execution, API surface, sandboxing, permissions, and developer experience.

**Key concepts needed:**
- Plugin architecture patterns
- API versioning
- Sandboxing and security
- Developer experience

**Learning support:**

*Concepts:*
1. **Plugin Execution Models** — Plugins can run: in-process (fast, but can crash the host), in a Web Worker (isolated, limited API), in an iframe (fully isolated, limited communication), or server-side (via webhooks). Each has different security, performance, and capability tradeoffs.
2. **API Surface Design** — The APIs you expose to plugins are a public contract. They must be versioned (v1, v2), stable (don't break existing plugins), and well-documented. Design the smallest API that enables the most use cases.
3. **Sandboxing** — Third-party code shouldn't access user data it wasn't granted, crash the main application, or degrade performance for other users. Sandboxing enforces these boundaries through isolation (Workers, iframes) and permissions.
4. **Lifecycle Hooks** — Plugins need to hook into the application at defined points: "before form submit," "after page load," "when user clicks." These hooks are the extension points. Define them carefully — each hook is a contract you must maintain.

*Common mistakes:*
1. **Exposing too much API surface** — Every API you expose is a contract you maintain forever. Start with a small, essential API and expand based on developer requests.
2. **No permission model** — If all plugins can access all data, a malicious or buggy plugin can leak user information. Plugins should request permissions (read user profile, write to database) and users should grant them.
3. **Ignoring developer experience** — A powerful plugin API with terrible documentation and no local development tools won't get adoption. DX is a feature.

*Architecture hints:*
1. Design the plugin system by working backward from 3-5 example plugins. What would a "Slack notification" plugin need? A "custom report builder"? Those examples reveal the required APIs and hooks.
2. Version your API from day one. V1 should be minimal and stable. Adding is easy; removing or changing is hard.

*Quick-check:*
1. A plugin runs in-process and has an infinite loop. What happens to the main application? → **It freezes.** In-process plugins share the main thread. An infinite loop blocks the entire app. This is why sandboxing (Web Worker, iframe) is critical.
2. A plugin needs to read user profile data. Should it access the database directly or through an API? → **Through an API.** Direct database access means any schema change breaks all plugins. The API provides a stable interface and enforces permissions.

**What a strong answer includes:**
- Plugin execution model with sandboxing strategy
- API surface design (what's exposed, what's not)
- Permission model (what plugins can access)
- Lifecycle hooks (where plugins can extend behavior)
- API versioning strategy
- Developer experience (docs, local dev tools, testing)
- Security considerations

**Evaluation criteria:**
- Is plugin execution sandboxed?
- Is the API surface minimal and versioned?
- Is there a permission model?
- Are lifecycle hooks well-defined?
- Is developer experience considered?

---

### Challenge 29: Architecture Decision Records System

**Difficulty:** Advanced
**Category:** Architecture Practice

**Description:**
Your 40-person engineering team makes architecture decisions in Slack threads, meeting notes, and hallway conversations. Six months later, nobody knows why the team chose PostgreSQL over MongoDB, or why the frontend uses Redux instead of Zustand. New engineers make the same mistakes or reverse decisions without understanding the original context. Design an Architecture Decision Records (ADR) system and process.

**Why this matters:**
Architecture decisions are valuable only if they're documented and discoverable. ADRs capture the why behind decisions — not just the what. This is a meta-challenge about how architecture is practiced in organizations.

**What the user should produce:**
An ADR system design covering template, workflow, storage, discoverability, and how to integrate ADRs into the team's development process.

**Key concepts needed:**
- ADR format and templates
- Decision lifecycle
- Knowledge management
- Architectural governance

**Learning support:**

*Concepts:*
1. **ADR Template** — A standard format: Title, Status (proposed/accepted/deprecated/superseded), Context (why this decision is needed), Decision (what we chose), Consequences (tradeoffs, implications). The power is in Context — it captures the reasoning.
2. **Decision Status Lifecycle** — Decisions evolve: Proposed → Accepted → (optionally) Deprecated or Superseded by a newer ADR. Deprecated decisions explain why the old approach no longer works. This creates a decision history, not just a current snapshot.
3. **Lightweight Governance** — ADRs shouldn't require a committee. Propose in a PR, get 1-2 reviews from relevant engineers, merge. The process should have low friction — if it's hard to write an ADR, people won't.
4. **Discoverability** — ADRs in a forgotten wiki are useless. Store them in the repository (close to the code), index them by topic, and link from relevant code files. When someone reads the Redux store, a comment links to the ADR explaining why Redux was chosen.

*Common mistakes:*
1. **Writing ADRs for everything** — Not every decision needs an ADR. Use them for decisions that are hard to reverse, affect multiple teams, or involve significant tradeoffs. "Which button color" is not an ADR.
2. **Never updating ADRs** — An ADR that says "we use REST" when the team migrated to GraphQL a year ago is misleading. Mark it superseded and link to the new ADR.
3. **Making the process too heavy** — If writing an ADR requires 3 meetings and 5 approvals, no one will do it. Keep it as simple as a PR.

*Architecture hints:*
1. Start with 3-5 ADRs for recent decisions the team remembers. This seeds the system with useful content and teaches the format.
2. Include a "Considered Alternatives" section. It prevents future engineers from re-evaluating options that were already rejected.

*Quick-check:*
1. A new engineer asks "why do we use PostgreSQL instead of MongoDB?" The answer is in someone's memory but not written down. What's the cost? → **The team re-debates the decision, wasting time. Or worse, someone switches to MongoDB without understanding the original reasoning.** An ADR prevents both.
2. An ADR from 2 years ago recommends REST. The team has since migrated to GraphQL. What should happen to the ADR? → **Mark it "Superseded by ADR-047: Migration to GraphQL."** Don't delete it — the original context is still valuable for understanding the history.

**What a strong answer includes:**
- ADR template with clear sections
- Workflow (how decisions are proposed, reviewed, accepted)
- Storage strategy (repo, wiki, or both)
- Discoverability (how engineers find relevant ADRs)
- Integration with development process (PR reviews, onboarding)
- Criteria for when to write an ADR
- How to handle superseded/deprecated decisions

**Evaluation criteria:**
- Is the template complete (context, decision, consequences)?
- Is the process lightweight enough for adoption?
- Is discoverability addressed?
- Are superseded decisions handled?
- Is the criteria for "when to write an ADR" clear?

---

### Challenge 30: Full System Design — Build a Learning Platform

**Difficulty:** Advanced
**Category:** Full System Design

**Description:**
Design the architecture for an interactive learning platform (like Structura itself). The platform supports: browsable challenge catalog, structured learning paths, a solution submission workspace, AI-powered feedback on submissions, user progress tracking, and a leaderboard. The platform should support 10K monthly active users initially with room to scale. You have a team of 3 engineers and 12 weeks.

**Why this matters:**
This is a capstone challenge that combines everything: frontend architecture, API design, data modeling, AI integration, state management, and real-world constraints (team size, timeline). It tests whether you can synthesize multiple concepts into a coherent system.

**What the user should produce:**
A complete system architecture covering frontend, backend, data model, AI integration, infrastructure, and a phased delivery plan.

**Key concepts needed:**
- Full-stack architecture
- Data modeling
- AI integration patterns
- Phased delivery

**Learning support:**

*Concepts:*
1. **Start with the Core Loop** — Every product has a core loop. For a learning platform: browse → attempt → submit → get feedback → improve. Build this loop first, before anything else. Everything else (paths, progress, leaderboard) amplifies the core loop.
2. **Data Model Drives Architecture** — The key entities (User, Challenge, Submission, Feedback, LearningPath, Progress) and their relationships determine the API design, the database schema, and the frontend state. Design the data model before the UI.
3. **AI as a Service Boundary** — AI feedback generation is a distinct service with its own latency profile (2-10 seconds), cost model (per-token), and failure modes (hallucination, timeout). Treat it as an external service, not inline code.
4. **Phased Delivery** — With 3 engineers and 12 weeks, you can't build everything. Phase 1: core loop (challenges + submission + AI feedback). Phase 2: learning paths + progress. Phase 3: leaderboard + social. Each phase is a shippable product.

*Common mistakes:*
1. **Building features before the core loop works** — Progress tracking is meaningless if the challenge experience isn't good. Get the core loop right first.
2. **Underestimating AI integration complexity** — AI feedback requires prompt engineering, response parsing, error handling for malformed responses, cost management, and latency management. It's not just an API call.
3. **Over-architecting for scale from day one** — 10K MAU is a small application. A single Next.js deployment with a PostgreSQL database handles this easily. Don't build a microservices architecture for a product that hasn't validated product-market fit.

*Architecture hints:*
1. Map the core user journey and count the screens. Each screen is a route. Each route has data requirements. This gives you the API surface.
2. Build for the current scale, design for the next order of magnitude. PostgreSQL now, but with a data model that could migrate to a distributed database if needed.

*Quick-check:*
1. You have 3 engineers and 12 weeks. Should you build a custom authentication system? → **No.** Use a managed auth service (Clerk, NextAuth, Supabase Auth). Spend engineering time on the core learning experience.
2. The AI feedback takes 5 seconds to generate. Should the user wait on a loading spinner, or should it be processed asynchronously? → **Loading spinner for MVP** (simpler). Async processing (submit → come back for results) is better UX but adds queuing, notification, and state complexity. Ship the simple version first.

**What a strong answer includes:**
- System architecture diagram (frontend, API, database, AI service)
- Data model (entities and relationships)
- Frontend architecture (pages, components, state management)
- API design (endpoints, contracts)
- AI integration architecture (prompt management, response handling, cost/latency)
- Infrastructure (hosting, database, CDN)
- Phased delivery plan (what ships when)
- Team allocation across phases

**Evaluation criteria:**
- Is the core loop prioritized?
- Is the data model well-designed?
- Is AI integration treated as a service with its own concerns?
- Is the delivery plan realistic for 3 engineers and 12 weeks?
- Is scale appropriate (not over-engineered)?
- Does the architecture support the phased plan?
