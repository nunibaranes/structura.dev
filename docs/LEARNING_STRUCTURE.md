# Structura — Learning Structure (Aligned with Software Architecture Syllabus)

## Part 1: Learning Domains from the Syllabus

The DevOps Experts Software Architecture course syllabus covers these domains:

| # | Domain | What It Covers |
|---|--------|----------------|
| 1 | Architecture Capabilities | Architecture decisions, design principles, justifying decisions, guiding technology choices |
| 2 | Domain-Driven Design | Ubiquitous language, bounded contexts, model-driven design, refactoring toward deeper insight |
| 3 | Architectural Styles | Components vs classes, hybrids & variants, layered architecture, event-driven, microkernel, sacrificial architecture |
| 4 | Separation of Concerns | Layers of isolation, layered architecture considerations, architecture sinkhole anti-pattern, coexistence with monoliths |
| 5 | Architectural Topologies | Mediator topology, broker topology, event-driven architecture, events and channels |
| 6 | Documenting the Process Layer | Services, contracts, versioning, availability, reconnection logic, failure handling, plug-in architecture |
| 7 | Integration Challenges | Data synchronization, shared databases, schema/ownership issues, data encapsulation, avoiding tight coupling |
| 8 | Service-Oriented & Microservices Architecture | Sync/async communication, reliable messaging, decoupled systems, scalability, integration styles |
| 9 | Data Monitoring | Prometheus, metrics collection, PromQL, exporters, Grafana, alerting |
| 10 | AI/ML in Architecture + AI Agent Patterns | ML concepts for architects, NLP, MLOps, MCP client-server, agent memory, scaling AI systems |
| 11 | Architecture & Business Strategy | Enterprise operating model, business needs vs IT capabilities, architecture governance |

---

## Part 2: Structura Learning Tracks

### Track 1: Architecture Foundations
**Description:** Core thinking skills every architect needs — making decisions, reasoning about tradeoffs, applying design principles, justifying choices.

**Learning goals:**
- Reason about architectural decisions with explicit tradeoffs
- Apply design principles (separation of concerns, cohesion, coupling)
- Justify decisions to stakeholders with clear reasoning
- Identify anti-patterns and architecture smells

**Challenge types:** Component boundary decisions, rendering strategy selection, state placement, feature decomposition

### Track 2: Architectural Styles & Patterns
**Description:** Understand and choose between architectural styles — layered, event-driven, microkernel, modular monolith.

**Learning goals:**
- Compare architectural styles by fitness for different problems
- Identify when to use event-driven vs request-response
- Recognize topology tradeoffs (mediator vs broker)
- Design systems using appropriate patterns

**Challenge types:** Style selection, event-driven redesign, modular monolith decomposition, pattern fitness analysis

### Track 3: System Design & Integration
**Description:** Design systems with multiple components that communicate, share data, and scale.

**Learning goals:**
- Design service boundaries and contracts
- Choose between sync/async communication patterns
- Handle data ownership and synchronization across services
- Avoid tight coupling while maintaining consistency

**Challenge types:** API gateway design, service decomposition, data fetching layer, real-time collaboration

### Track 4: Domain Modeling & Data Architecture
**Description:** Model business domains into bounded contexts, design data flows, make storage decisions.

**Learning goals:**
- Define bounded contexts and domain boundaries
- Design data models that match access patterns
- Handle schema evolution and data ownership
- Apply domain-driven design thinking

**Challenge types:** Domain boundary design, data model decisions, schema migration, multi-tenant data

### Track 5: Operational Architecture
**Description:** Design for the real world — error handling, monitoring, resilience, operational concerns.

**Learning goals:**
- Design error handling as an architectural concern
- Plan monitoring and observability into the architecture
- Apply resilience patterns (circuit breakers, retries, graceful degradation)
- Handle failure modes and recovery strategies

**Challenge types:** Error handling architecture, monitoring strategy, resilience design, deployment architecture

### Track 6: Architecture Decision-Making & Governance
**Description:** Make and communicate architecture decisions at the organizational level.

**Learning goals:**
- Create Architecture Decision Records (ADRs)
- Align technical decisions with business constraints
- Evaluate build-vs-buy and migration tradeoffs
- Communicate architecture to non-technical stakeholders

**Challenge types:** ADR writing, migration planning, design system governance, vendor evaluation

---

## Part 3: MVP Learning Structure

### The 8 MVP Challenges

| # | Challenge | Track | Difficulty | Syllabus Coverage |
|---|-----------|-------|------------|-------------------|
| 1 | Component Boundaries | Foundations | Beginner | Separation of Concerns, Architecture Capabilities |
| 2 | Separation of Concerns in a Feature | Foundations | Beginner | Separation of Concerns, Layers of Isolation |
| 3 | State Architecture Decisions | Foundations | Beginner | Architecture Decisions, Design Principles |
| 4 | Data Fetching Architecture | Styles & Patterns | Beginner | Integration Challenges, Service Contracts |
| 5 | Error Handling Architecture | Operational | Beginner | Addressing Failures, Process Availability |
| 6 | Event-Driven Redesign | Styles & Patterns | Intermediate | Architectural Topologies, Event-Driven Architecture |
| 7 | API Gateway Design | System Design | Intermediate | (Micro)Service Architecture, Integration Challenges |
| 8 | Service Decomposition | System Design | Intermediate | Domain-Driven Design, Bounded Contexts, SOA |

### Why these 8

- **Challenges 1-3** build foundational vocabulary — component thinking, separation of concerns, state placement. Maps to syllabus "Architecture Capabilities" and "Separation of Concerns."
- **Challenges 4-5** apply foundations to cross-cutting concerns — data and errors. Maps to "Integration Challenges" and "Documenting the Process Layer."
- **Challenges 6-8** step into system-level thinking — events, gateways, service boundaries. Maps to "Architectural Topologies," "Service-Oriented Architecture," and "Domain-Driven Design."

### Difficulty Progression

```
Beginner (1-5):  Single-concept decisions, familiar frontend context
                  → "Decide where this boundary goes and why"

Intermediate (6-8): Multi-concept tradeoffs, system-level scope
                     → "Design how these services communicate"
```

---

## Part 4: Learning Progression

### MVP: The 8-Challenge Path

```
Phase 1: Thinking in Boundaries (Challenges 1-3)
├── 1. Component Boundaries        → Learn to see and draw boundaries
├── 2. Separation of Concerns      → Learn to separate layers within a feature
└── 3. State Architecture          → Learn to place state at the right level

Phase 2: Cross-Cutting Infrastructure (Challenges 4-5)
├── 4. Data Fetching Architecture  → Design infrastructure many features depend on
└── 5. Error Handling Architecture → Design for failure as a first-class concern

Phase 3: System-Level Thinking (Challenges 6-8)
├── 6. Event-Driven Redesign       → Decouple services with events
├── 7. API Gateway Design          → Centralize cross-cutting concerns
└── 8. Service Decomposition       → Combine everything into a full decomposition
```

### Expansion to 30 Challenges

```
Track A: Architecture Foundations (8 challenges)
  MVP 1-3 + Rendering Strategy, Auth Architecture,
  Design Principles Workshop, Architecture Decision Records,
  Technical Debt Prioritization

Track B: Architectural Styles & Patterns (7 challenges)
  MVP 4, 6 + Microkernel Plugin System, CQRS Design,
  Modular Monolith, Saga Pattern, Caching Architecture

Track C: System Design & Integration (8 challenges)
  MVP 7, 8 + URL Shortener, Real-Time Collaboration,
  Notification System, Search Architecture,
  Multi-Tenant Data, Database Migration Strategy

Track D: Operational Architecture (4 challenges)
  MVP 5 + Monitoring & Observability, CI/CD Pipeline Design,
  Disaster Recovery Planning

Track E: Architecture Governance (3 challenges)
  Design System Architecture, Platform Team Charter,
  Build vs Buy Evaluation
```

### Syllabus Coverage in Full 30

| Syllabus Module | Structura Coverage |
|---|---|
| Architecture Capabilities | Track A (foundations + ADRs) |
| Domain-Driven Design | Track C (service decomposition, bounded contexts) |
| Architectural Styles | Track B (event-driven, microkernel, CQRS, modular monolith) |
| Separation of Concerns | Track A (challenges 1-3) |
| Architectural Topologies | Track B (event-driven, saga) |
| Documenting Process Layer | Track C (API gateway, contracts) + Track D (monitoring) |
| Data Monitoring | Track D (monitoring & observability) |
| Integration Challenges | Track C (multi-tenant, migration, search) |
| Service-Oriented Architecture | Track C (decomposition, real-time, notification) |
| AI/ML Architecture | Future Track F expansion |
| Architecture & Business Strategy | Track E (governance, build-vs-buy, platform team) |
