# Project Guidelines

> Synthesized from [Karpathy's coding principles](https://github.com/forrestchang/andrej-karpathy-skills) + [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)

---

## Core Philosophy

1. **Agent-First** — route work to the right specialist early
2. **Test-Driven** — write or refresh tests before trusting implementation
3. **Security-First** — validate inputs, protect secrets, safe defaults
4. **Immutability** — prefer explicit state transitions over mutation
5. **Plan Before Execute** — complex changes broken into deliberate phases

---

## Principle 1: Think Before Coding

- State assumptions explicitly; if uncertain, **ask**
- If multiple interpretations exist, present them — don't pick silently
- If a simpler approach exists, say so; push back when warranted
- If something is unclear, stop, name what's confusing, ask
- Search for existing implementations before writing new code (npm, PyPI, GitHub)

## Principle 2: Simplicity First

- No features beyond what was asked
- No abstractions for single-use code
- No speculative "flexibility" or "configurability"
- No error handling for impossible scenarios
- If 200 lines could be 50, rewrite it
- Self-test: "Would a senior engineer say this is overcomplicated?"
- KISS, DRY, YAGNI — functions <50 lines, files 200-800 lines max

## Principle 3: Surgical Changes

- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style, even if you'd do it differently
- If you notice unrelated dead code, mention it — don't delete it
- Remove orphans YOUR changes created, but not pre-existing dead code
- Self-test: "Every changed line should trace directly to the user's request"

## Principle 4: Goal-Driven Execution

- Transform imperative tasks into verifiable goals with success criteria
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- For multi-step tasks, state a plan with verification checks at each step
- Strong success criteria enable autonomous looping

---

## Code Quality Standards

### Style
- ALWAYS create new objects, never mutate existing ones
- No `any` types — use `unknown` for untrusted input
- No `console.log` in production code
- No emojis in code or output unless user requests them
- Validate at system boundaries (user input, external APIs)
- Nesting <4 levels deep
- Try-catch for async operations

### TypeScript Specific
- Add types to exported functions, allow inference for locals
- Interfaces for extensible object shapes, type aliases for unions/intersections
- Zod for schema validation, `z.infer<typeof schema>` for types
- No `React.FC` unless necessary
- Server components by default; minimize client components (no useState/useEffect in server)

### Testing (TDD)
- 80% minimum coverage
- RED → GREEN → REFACTOR cycle
- Unit + Integration + E2E mandatory for features
- Test: null/undefined inputs, invalid data types, boundary values, error conditions, concurrent operations, large datasets, special characters
- Fix implementation, not tests
- AAA pattern: Arrange, Act, Assert

### Security (Pre-Commit Checklist)
1. No hardcoded secrets
2. All inputs validated
3. Parameterized SQL queries
4. XSS prevention
5. CSRF protection
6. Auth verified on protected routes
7. Rate limiting on public endpoints
8. Error messages don't leak internal data

---

## Workflow

### Development Flow
1. **Search** — look for existing implementations first
2. **Plan** — break complex tasks into phases with verification at each step
3. **TDD** — write failing test → implement → pass → refactor
4. **Review** — check security, quality, performance after writing code
5. **Commit** — conventional commits: `feat|fix|refactor|docs|test|chore|perf|ci`

### Git Workflow
- Conventional commits (e.g., `feat: add user auth`, `fix: null check on email`)
- No direct commits to main — use branches + PRs
- `git diff [base-branch]...HEAD` for PR scope review
- Push with `-u` flag

### Code Review Priorities
1. **CRITICAL** — Security vulnerabilities
2. **HIGH** — Code quality, backend patterns
3. **MEDIUM** — Performance issues
4. **LOW** — Best practices, style

### Verification Loop (Run Regularly)
1. Build check
2. Type check (`tsc --noEmit`)
3. Lint
4. Test suite (80% minimum)
5. Security scan
6. Diff review — every changed line traces to the request

---

## Context & Token Management

- Use subagents for exploration (keeps main context clean)
- Compact at logical breakpoints — after exploration, between phases, NOT mid-implementation
- Model routing: Haiku for lookups, Sonnet for daily coding, Opus for architecture/deep review
- Keep MCP servers under 10 (each tool schema ~500 tokens)
- Reserve 20% context for large refactors

---

## Multi-Agent Patterns

- **Parallel execution** for independent operations (always)
- **Complex features** → planner agent (automatically)
- **Written code** → code reviewer (automatically)
- **New features/bugs** → TDD guide (automatically)
- **Design questions** → architect (automatically)
- **Adversarial review** — two independent reviewers for critical changes

---

## Session Persistence

When saving session state, capture:
1. What we're building
2. What WORKED
3. What did NOT work (most critical — prevents retrying failed approaches)
4. What has NOT been tried
5. Current state of files
6. Decisions made
7. Blockers
8. Exact next step

---

## Design Quality

- Do NOT ship generic template-looking UI
- Establish visual direction before coding (e.g., neo-brutalism, glassmorphism, luxury, bento, 3D)
- Must demonstrate: hierarchy, spacing rhythm, depth, distinctive typography, semantic color, interactive states, motion
- Every component should feel intentional, not default

---

## Anti-Patterns to Avoid

| Anti-Pattern | Fix |
|---|---|
| Silent assumptions | Ask clarifying questions first |
| Strategy pattern for one case | Simple function |
| Adding caching/validation/notifications unrequested | Do only what was asked |
| Reformatting adjacent code | Touch only relevant lines |
| Implementing everything at once | Incremental steps with verification |
| Fixing without reproducing | Write failing test first |
| Vague "review and improve" | Define specific success criteria |
