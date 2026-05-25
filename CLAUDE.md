# CLAUDE.md — personal-site-v2

> **Scope:** Project-level. Supplements `~/.claude/CLAUDE.md` (user-level defaults). Where this file is silent, user-level defaults apply. Where they conflict, this file wins.

---

## Project Overview

**Daniel Astudillo's personal website (v2)** — a performance-optimised, SEO-focused portfolio and blog at [danielastudillo.io](https://danielastudillo.io).

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (canary) — App Router |
| Language | TypeScript 6 |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Content | MDX (blog posts under `app/blog/content/`) |
| Theming | `next-themes` (dark/light/system) |
| Icons | Font Awesome (React) |
| Validation | Zod |
| Email | Nodemailer (contact form → `services/emailService.ts`) |
| Package manager | pnpm 11 |
| Build output | `standalone` (Dockerisable) |
| Deployment | Vercel |

### Directory Structure

```
app/                    # Next.js App Router — all routes
  page.tsx              # Home (Hero, Introduction, FeaturedProjects)
  about/                # About page
  blog/
    [slug]/             # Dynamic MDX blog posts
    content/            # MDX source files (one dir per post)
  projects/             # Projects listing
  contact/              # Contact form
  amp/                  # AMP variant
  api/
    contact/            # Contact form handler (Nodemailer)
    test-email/         # Email delivery smoke test
components/             # Shared UI components (Server + Client)
data/                   # Static data layer (experience, projects, posts)
types/                  # Shared TypeScript types
lib/                    # Shared utilities (fontawesome icons, font store)
utils/                  # Pure utility functions (date, experience, font)
hooks/                  # Client-side hooks (useObfuscatedContent)
services/               # Side-effectful services (emailService)
constants/              # App-wide constants (contact, navigation)
public/                 # Static assets (images, fonts, favicon, OG image)
docs/                   # Internal project docs (ADRs, audit reports)
scripts/                # Dev tooling (shai-hulud security scan)
```

### Key Architectural Decisions

- **No database.** All content (projects, experience, blog posts) is static TypeScript data or MDX files. No ORM, no migrations, no runtime DB connections.
- **Server components by default.** Client components (`"use client"`) only where interactivity, browser APIs, or hooks are required. Over-use of `"use client"` is a regression.
- **Static generation everywhere possible.** Pages use `export const dynamic = "force-static"`. Revalidation via ISR where content could change.
- **Standalone output.** `output: "standalone"` in `next.config.ts` for Docker-compatible builds. `postbuild` copies `public/` and `static/` into standalone.
- **Turbopack in dev, Webpack in production.** Webpack config is customised to lock context to project root — prevents module resolution from walking up to a parent `package.json` in the workspace.
- **Content obfuscation.** `ObfuscatedContent` component + `useObfuscatedContent` hook protect contact details from scrapers without blocking legitimate users.
- **Font preference.** User-selectable font via `FontProvider` and `fontPreferenceStore`. Preference is stored client-side; initial server render must not flicker (see `docs/FONT-FLICKERING.md`).

### Development Conventions

- **Formatter:** Prettier — run `pnpm format` before committing. `pnpm format:check` in CI.
- **Linter:** ESLint — run `pnpm lint` (auto-fixes on run). Zero warnings policy.
- **Dev server:** `pnpm dev` (Turbopack). Opens on `localhost:3000`.
- **Build:** `pnpm build` → `pnpm start` (standalone server).
- **Security scan:** `pnpm security:shai-hulud` — runs `scripts/shai-hulud-scan.sh`. Run before shipping security-sensitive changes.
- **Bundle analysis:** `pnpm analyze` — opens bundle analyzer. Run before adding heavy dependencies.
- **Type checking:** `tsc --noEmit` — `ignoreBuildErrors: false` in Next config; type errors fail the build.

### Performance Targets

- Core Web Vitals (LCP, CLS, INP) — production signal. Do not regress.
- Bundle: large packages (Framer Motion, Font Awesome, React) are code-split into separate chunks for caching. Adding new heavy dependencies requires bundle analysis first.
- Images: WebP/AVIF formats, 1-year immutable cache, explicit `deviceSizes` and `imageSizes`.
- Fonts: 1-year immutable cache on `/fonts/*`. Subsetted, self-hosted. No external font fetches in production.

### SEO Constraints

- Every page must export `metadata` (or a `generateMetadata` function) with `title`, `description`, and `alternates.canonical`.
- `sitemap.ts` and `robots.ts` are code-generated — update them when adding/removing routes.
- Structured data (`structured-data.tsx`) in the root layout — keep in sync with content.
- Open Graph image at `/public/images/og-image.png`. Update if branding changes.

### Deployment Notes

- www → non-www redirect: configured in Vercel Dashboard (not in code).
- HTTP → HTTPS: handled by Vercel platform (not in code).
- Environment variables required: `EMAIL_*` vars for Nodemailer (set in Vercel project settings). Never commit `.env.local`.

---

## Engineering Reference

> The sections below are the detailed engineering guidelines that complement the user-level CLAUDE.md. User-level file governs agent behavior, process, decision framework, definition of done, and hard rules. These sections provide implementation depth.

---

## Code Quality

### Readability

- Optimise for the reader, not the writer.
- Functions should do one cohesive thing. If you need "and" or "then" to describe it, consider splitting.
- Prefer flat over nested — early returns and guard clauses beat deep conditionals.
- Comments explain **why** (intent, trade-off, constraint). If the *what* needs a comment, the code needs a rename or refactor first.
- Delete dead code. Don't comment it out except during active development on a local branch.

### Naming

- Names should be pronounceable and unambiguous in context.
- Avoid abbreviations unless universal in the domain (`req`, `ctx`, `err`, `id` — but `userId` over bare `id` when disambiguation matters).
- Booleans: `isLoading`, `hasPermission`, `canRetry` — not `flag`, `status`, `ok`.
- Collections: plural. Single items: singular. Generic types: descriptive (`TEntity` not `T`).
- Constants and enums: follow the project's existing convention (UPPER_SNAKE, PascalCase, etc.).

### Style & Formatting

- Follow the project's formatter (Prettier, Black, gofmt, rustfmt, etc.). Never bikeshed formatting manually.
- Refer to `.editorconfig` and linter configs when present; they are the source of truth.
- Text files end with a trailing newline.
- Column limit: follow the project config. If absent, match the dominant existing style.

---

## Architecture

### Universal Principles

- **Composition over inheritance** — Prefer dependency injection and interfaces over deep class hierarchies. In functional codebases: prefer function composition and explicit dependencies over global state.
- **Explicit over implicit** — Visible data flow and declared dependencies beat magic, auto-wiring, or action-at-a-distance.
- **Fail fast at boundaries** — Validate inputs at system entry points. Don't propagate bad data into the core.
- **Design to the interface, not the implementation** — Any component should be replaceable at its interface boundary without rewriting callers.
- **Backwards compatibility is a feature** — Never break existing contracts (API, data format, event schema) without a migration path and versioned transition period.
- **Feature flags for risky changes** — New behaviour affecting production paths should be gated behind a flag, enabling dark launches, gradual rollouts, and instant rollback.
- **Config is typed and validated at startup** — Environment variables, feature flags, and secrets should be parsed into typed structs at boot time, not read ad-hoc throughout the codebase.

### Scale Tiers

Build for current scale. Design interface boundaries (abstraction points, module seams) that enable the *next* tier without a full rewrite.

| Tier | Signal | Key concerns |
|------|--------|--------------|
| Prototype / internal tool | < few hundred users or single team | Correctness, clarity, delivery speed |
| Early production | Paying users, SLA expectations | Reliability, observability, safe deploys, on-call runbooks |
| Growth (mid-scale) | Scaling bottlenecks appearing | DB query patterns, caching strategy, async queues, stateless services |
| Hyper-scale | Architecture is the constraint | Sharding, eventual consistency trade-offs, multi-region, SLO budgets, data locality |

> User count is one axis. A batch job processing terabytes for 10 users can be hyper-scale by data volume. A B2B SaaS at 500 enterprise accounts can require enterprise-grade reliability.

### Module and Service Boundaries

*(Applies to microservices, modular monoliths, and large monorepos alike — scope the boundary to your architecture.)*

- Each module/service owns its data. No direct cross-boundary DB access.
- Communicate via explicit, typed contracts (REST schemas, Protobuf, AsyncAPI, tRPC routers, etc.).
- For any call that crosses a network: set timeouts, implement retries with exponential backoff + jitter, and consider circuit breakers for high-frequency paths. Not every call needs a circuit breaker — prioritise by blast radius.
- Idempotency is required for mutations that will be retried. Where business rules forbid retry, make that explicit and enforce it at the call site.

---

## Concurrency & Thread Safety

Concurrency bugs are among the hardest to reproduce and the most damaging in production. Apply these rules in any environment with parallelism (async/await, threads, goroutines, workers, distributed systems).

- **Shared mutable state is the root cause** — identify every piece of shared mutable state before introducing concurrency. Default to immutability; mutate only with explicit synchronisation.
- **Critical sections must be minimal** — hold locks for the shortest possible time. Never call external services, perform I/O, or yield inside a lock.
- **At-least-once delivery is the default** — design consumers and handlers to be idempotent. Assume any message or event can arrive more than once.
- **Race conditions require explicit testing** — for Go: `go test -race`; for others: use thread sanitisers or deterministic replay frameworks. Don't rely on "it worked in development."
- **Async ≠ concurrent** — async/await manages I/O wait; it doesn't provide thread safety. Shared state across coroutines still requires synchronisation.
- **Set timeouts on everything** — locks, channel operations, queue polls, distributed locks. An operation without a timeout is a potential deadlock.
- **Document thread safety** — any type or function with concurrency constraints must declare it in its doc comment: thread-safe, not thread-safe, or call-once.

---

## Error Handling

- **Errors are values** — propagate explicitly; never swallow silently.
- **Include context** — error messages should name the operation, include relevant IDs, and state the constraint violated.
- **Handle at the right layer** — transient infrastructure errors (retry logic) at the infrastructure layer; domain rule violations at the domain layer; user-facing messages at the API/UI layer.
- **Distinguish error kinds:**
  - *Programmer errors* (invariant violations, impossible states): crash/panic in Go/Rust; throw unchecked exception in Java/C#; let Python raise naturally — these should surface and be fixed, not caught-and-swallowed.
  - *Operational errors* (transient failures, validation, resource not found): return explicitly; handle at the call site.
- **Don't use exceptions for expected business logic paths** in exception-first languages. Reserve exceptions for truly exceptional conditions.
- **Error shape consistency** — user-facing errors carry a stable machine-readable code and a human-readable message. Never expose stack traces or internal details to external clients.
- **Retry budgets** — errors that trigger retries need a max attempt count, backoff interval, jitter, and a dead-letter destination.

---

## Testing

### Pyramid

Apply layers proportionally to the architecture. A library may need no E2E tests. A pure-function module may need no integration tests.

1. **Unit** — Fast, isolated, no I/O. Cover all logic branches and edge cases. These are the primary safety net.
2. **Integration** — Test real wiring: DB queries, queue consumers, external client adapters (testcontainers, local fakes, recorded fixtures).
3. **Contract** *(multi-service architectures only)* — Validate API contracts between services (Pact, OpenAPI schema validation, or equivalent).
4. **E2E** — Minimal set covering critical user journeys against a production-like environment. Expensive to maintain; keep small.

### Rules

- **Test behaviour, not implementation** — tests should survive refactors that don't change external behaviour.
- **Never disable or skip tests** — fix the underlying problem. If a test is genuinely broken by environment (CI-only flake, infra dependency), quarantine it explicitly with a tracking issue and a known-good rollback path.
- **Deterministic only** — no time-dependent logic without a seeded/fake clock; no random data without pinned seeds; no live network calls.
- **One scenario per test** — each test should have a clear, single failure reason. Multiple assertions are fine if they all validate the same scenario.
- **Test names are sentences** — `"returns 401 when token is expired"`, not `"test_auth"`.
- **Flaky test policy** — a flaky test is worse than no test. Quarantine and fix within one sprint. Track in a dedicated label/board.
- **Coverage is a gap detector, not a target** — use it to find untested critical paths, not to hit a percentage. All critical/hot paths must have coverage. Peripheral utility code may not.

---

## Security

Apply the items relevant to the project type (web API, CLI, library, batch job, frontend, etc.).

- **Never commit secrets** — no keys, tokens, passwords, or certificates in source. Use environment variables, a secrets manager, or encrypted vaults.
- **Validate at every trust boundary** — treat all external input (HTTP, CLI args, files, queue messages) as hostile. Parse and validate before use.
- **Least privilege** — services, DB users, IAM roles, and API tokens get only the permissions they need and nothing more.
- **Parameterised queries always** — never interpolate user input into SQL, shell commands, or templates.
- **Auth: use established flows** — OAuth2/OIDC for user auth, mTLS or signed tokens for service-to-service. Never implement custom cryptographic primitives.
- **Web: set security headers** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. Restrict CORS to known origins.
- **Rate limit every public endpoint** — protect against enumeration, brute force, and scraping.
- **Supply chain hygiene** — pin dependencies in lockfiles, run dependency vulnerability scanning in CI (not just locally), verify package integrity where the ecosystem supports it.
- **Never log PII or secrets** — scrub before any log statement. Apply this to error messages surfaced to clients too.
- **SSRF protection** — if the service fetches URLs from user input, validate against an allowlist or use a sandboxed fetcher.
- **Dependency audit in CI** — automated; not a manual "regularly audit" step.

---

## Performance

### Measure First

- Profile before optimising. Establish baselines (latency p50/p95/p99, throughput, error rate, memory) before any change.
- Optimise the measured bottleneck — not what's easiest to optimise or most satisfying to fix.

### Patterns

- **N+1 queries** — batch or eager-load related data. Use query analysis in development (query logging, EXPLAIN).
- **Caching layers** — CDN for static/immutable assets; in-process cache for hot, stable read paths; distributed cache (Redis, Memcached) for shared mutable state. Define cache invalidation strategy before implementing the cache — it's the hard part.
- **Async for non-blocking work** — move work off the request path if the caller doesn't need the result immediately. Use queues and workers.
- **Pagination** — cursor-based over offset for production endpoints (offset breaks under concurrent mutations). No unbounded queries.
- **Connection pooling** — configure pool size to match DB connection limits; never open a connection per request.
- **Memory management** — close connections, file handles, event listeners, and subscriptions explicitly. Profile for leaks in long-running services.
- **Frontend** — Core Web Vitals (LCP, CLS, INP) are the production signal. Code-split aggressively; lazy-load below-fold content.

---

## Observability

Apply to production services and long-running processes. Static sites, pure CLIs, and one-off scripts are exempt from full instrumentation.

### Logs

- Structured logging only (JSON or equivalent). Never use string-interpolated log statements in production code paths.
- Log levels: `DEBUG` (dev/local only), `INFO` (lifecycle events, key state changes), `WARN` (recoverable unexpected state), `ERROR` (requires investigation), `CRITICAL/FATAL` (service cannot continue — triggers immediate alert).
- Every log entry in a request context includes: trace/correlation ID, request ID, and operation name. User IDs where available and appropriate.
- No PII or secrets in logs without explicit masking.

### Metrics

- RED metrics for every service: **Rate**, **Errors**, **Duration**.
- Use the correct instrument type: counters (monotonic totals), gauges (current state), histograms (distribution of values). Never use a gauge for a monotonic value.
- Add business-level metrics alongside technical ones (e.g. orders processed, payment success rate). These are often the first signal of a production issue.

### Traces

- Propagate trace context (`traceparent` W3C header or equivalent) across every service boundary.
- Instrument all I/O: DB queries, HTTP calls, queue operations. Not same-process utility functions.
- Sampling: use head-based sampling proportional to volume. Apply tail-based sampling to capture 100% of errors and slow traces.

### Health Endpoints

Every service behind a load balancer or container orchestrator must expose:
- `/health` or `/healthz` — is the process alive?
- `/ready` or `/readyz` — is it ready to serve traffic? (DB connected, cache warm, dependencies reachable.)

### Alerting

- Alert on symptoms (user-visible degradation), not causes (high CPU, low cache hit rate).
- Every alert must be actionable and linked to a runbook.
- Define SLOs with error budgets. Alert when the burn rate indicates the budget will be exhausted before the window ends.

---

## Data & Persistence

- **Migrations are code** — version-controlled, reviewed, and run in CI. Never alter production schema manually.
- **Expand-contract for live migrations** — add nullable column → backfill → add constraint → drop old column. Never block reads or writes.
- **Index intentionally** — add indexes for every high-frequency query predicate. Review write amplification; consider partial or covering indexes. Audit slow query logs regularly.
- **Transactions scope** — keep transactions short. Never span a transaction across a network call; use the Saga or Outbox pattern for distributed consistency.
- **Read replicas** — route read-heavy, non-critical queries to replicas; preserve primary capacity for writes and critical reads.
- **Soft deletes with intent** — adds query complexity and can cause silent data leaks. Use only when regulatory compliance or audit requirements demand it. Always add a `deleted_at` index.
- **Data retention** — define retention policies at schema design time. Understand GDPR/compliance implications before storing user data.

---

## API Design

Apply the relevant subsection to your API paradigm. Skip the others.

### REST

- Resource nouns, HTTP verbs for actions. Consistent response envelope and error shape across the entire API.
- `4xx` for client errors — include a machine-readable error code and a human-readable message. `5xx` for server errors — never expose stack traces or internal details.
- Version from day one: `/v1/`. Internal-only single-client APIs may omit this with documented justification.
- Cursor-based pagination for collections that mutate (offset breaks under concurrent writes). Return a `nextCursor` in the response envelope.
- Long-running operations: return `202 Accepted` with a `Location` header pointing to a status resource, or use webhooks for push notification.
- Deprecate explicitly: add `Deprecation` and `Sunset` response headers; keep deprecated endpoints alive for at least one deprecation window before removal.

### GraphQL

- Schema-first design; generate types from the schema, not the reverse.
- DataLoader (or equivalent) for every resolver that accesses a data store — prevent N+1 at the resolver layer.
- Depth and complexity limits on all queries.
- Persisted queries in production to prevent arbitrary query injection.

### gRPC / Protobuf

- `.proto` files are the contract — version-control them as a first-class artifact.
- Follow backward-compatible evolution rules (no field renumbering, no required fields added).
- Define and distribute a client SDK or generated stubs alongside the service.

### Async / Event-Driven

- Events name completed facts in past tense: `OrderPlaced`, `PaymentFailed`, `UserDeactivated`.
- Every event envelope includes: `eventId`, `eventType`, `schemaVersion`, `occurredAt`, `correlationId`.
- Use a schema registry for event schemas in shared event buses.
- Consumers must be idempotent (same event delivered twice produces the same outcome).
- Dead-letter queue on every consumer with alerting on DLQ depth.
- Understand and document delivery semantics: at-least-once (most common) vs. exactly-once (very rare, usually requires special broker support).

---

## Version Control

- Commit working increments. On personal branches, WIP commits are acceptable if squashed before merge.
- Never use `--no-verify` to bypass hooks.
- Never force-push to a shared or protected branch.
- Commit messages: follow the project's established convention. If none exists, use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`). The message body explains *why*.
- Branch names: descriptive and scoped (`feat/user-auth`, `fix/payment-timeout`, `chore/upgrade-node`).
- PRs: one logical change per PR. If reviewers can't hold the whole diff in their head, it's too large. Aim for < 400 lines of change; split if larger.
- PR descriptions: explain the *why*, link to the relevant issue, and call out areas of risk or uncertainty for reviewers.
- Merge strategy: follow the project's existing convention (squash, merge commit, or rebase). If none, prefer squash for feature PRs to maintain a clean main-branch history.
- Tag releases: use semantic versioning (`v1.2.3`) for any deployable or publishable artifact.
