# Architecture Guardrails

## Core Product Ontology (Non-Negotiable)

- `Project` -> `Blueprint` -> `ReadinessAssessment` -> `Roadmap` -> `Milestones` -> `ReflectionSummary`.
- Every feature must attach to this chain, or it is out-of-scope.
- No output can bypass typed contracts in `src/lib/domain/ontology.ts`.

## Service Boundaries

- `domain`: stable schema and invariants.
- `intelligence`: deterministic scoring, pattern inference, recommendations.
- `workspace`: orchestration and user-driven updates.
- `api`: schema-validated service boundaries.

## Feature Acceptance Criteria

A feature is accepted only if:

1. It maps to at least one core ontology entity.
2. It improves blueprint quality, readiness quality, or sequence quality.
3. It includes explainability for recommendations if intelligence is involved.
4. It does not increase UI complexity without progressive disclosure.

## Explicit Anti-Patterns

- Generic chat-first interface with no artifact structure.
- Standalone task manager detached from blueprint context.
- Premature microservices split before monolith pressure signals.
- Recommendation output without traceability.

## Definition of Product Quality

- Structured outputs over generic prose.
- Explainable recommendations over opaque scores.
- Compounding user capability over one-time output quality.
