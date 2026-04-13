# Architect: Developer Thinking OS

Serious planning and engineering-thinking workspace for transforming vague software ideas into build-ready blueprints, readiness diagnostics, and milestone sequences.

## Stack

- Svelte 5 + SvelteKit
- TypeScript strict mode
- Zod contracts for ontology validation
- TanStack Query runtime foundation
- GSAP for interface transitions
- Phosphor icons (`phosphor-svelte`)

## Core Product Surfaces

- `Workspace Home` (`/`) - intake + command deck
- `Projects` (`/projects`) - project lifecycle and constraints
- `Blueprint Studio` (`/blueprint`) - entity/action/rule/flow artifacts
- `Readiness` (`/readiness`) - capability fit and explainability traces
- `Roadmap` (`/roadmap`) - sequence and milestone quality gates
- `Journal` (`/journal`) - decision rationale log
- `Templates` (`/templates`) - archetype and anti-pattern reference
- `Insights` (`/insights`) - reflection and growth loop

## Architecture Modules

- `src/lib/domain/ontology.ts` - locked domain schema and relationships
- `src/lib/intelligence/engine.ts` - deterministic + pattern + recommendation reasoning
- `src/lib/intelligence/patterns.ts` - archetype signal catalog
- `src/lib/stores/workspace.ts` - artifact orchestration and workspace state
- `src/routes/api/*` - schema-enforced service boundaries

## Execution Governance

- `docs/EXECUTION_STAGES.md` - stage-by-stage implementation gates
- `docs/ARCHITECTURE_GUARDRAILS.md` - scope, ontology, and anti-pattern rules

## Development

```sh
pnpm install
pnpm dev
```

## Quality Gates

```sh
pnpm check
pnpm lint
pnpm test
```

## Production Build

```sh
pnpm build
pnpm preview
```

## macOS Desktop App (Tauri)

Requirements:
- Rust toolchain (`rustup`)
- Xcode Command Line Tools (`xcode-select --install`)

Run desktop app in development:

```sh
pnpm desktop:dev
```

Build a macOS app bundle:

```sh
pnpm desktop:build
```
