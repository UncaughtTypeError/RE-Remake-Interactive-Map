# AI Documentation Index

This directory contains comprehensive documentation for AI assistants working on the RE Remake Interactive Map project.

## Quick Start

**New to the project?** Start here:
1. Read [AI_CONTEXT.md](./AI_CONTEXT.md) - Complete project overview
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) - Design patterns and decisions
3. Check [TESTING.md](./TESTING.md) - Testing guide and best practices

## Documentation Files

### 🎯 [AI_CONTEXT.md](./AI_CONTEXT.md)
**Main reference document** - Start here for comprehensive project context.

**Contents**:
- Project overview and history
- Migration from jQuery to TypeScript
- Critical development principles
- Architecture overview
- Directory structure
- Key patterns
- Data flow examples
- Type system
- State management
- API endpoints
- Build system
- Coding standards
- Common pitfalls and best practices

**When to use**: Before starting any work, when onboarding, when uncertain about architectural decisions.

---

### 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md)
**Deep dive into patterns** - Read for architectural understanding.

**Contents**:
- Design philosophy
- Architectural patterns (MVC, Event-Driven, Presenter/Container, etc.)
- Component architecture
- State management implementation
- Event system details
- Data layer design
- API design principles
- Build and deploy configuration

**When to use**: When implementing new features, when refactoring, when making architectural decisions.

---

### 🧪 [TESTING.md](./TESTING.md)
**Testing guide** - Read before writing tests.

**Contents**:
- Testing philosophy
- Test structure and organization
- Unit tests (service and controller layers)
- Integration tests
- Running tests
- Writing new tests
- Known issues (rate limiting)
- Best practices

**When to use**: When writing tests, when debugging test failures, when improving coverage.

---

### 🔄 [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
**jQuery to TypeScript migration** - Read when migrating old code.

**Contents**:
- Migration overview
- Pattern translation (jQuery → Vanilla JS)
- Common jQuery patterns and equivalents
- Component migration checklist
- State management migration
- Event handling migration
- Animation migration
- DOM manipulation migration
- AJAX migration
- Testing migrated code

**When to use**: When migrating jQuery code, when understanding the project's evolution, when translating old patterns.

---

## Quick Reference

### Critical Rules

❌ **Never Do**:
- Suggest jQuery
- Suggest React/Vue/Angular
- Mutate data arrays (they're readonly with `as const`)
- Skip reading READMEs before coding
- Add external dependencies without justification
- Commit without following Conventional Commits format

✅ **Always Do**:
- Use vanilla JavaScript and native APIs
- Follow established patterns
- Maintain type safety
- Write tests
- Update documentation
- Read component READMEs first
- Use Conventional Commits for all commits
- Follow the contributing guidelines

### Common Tasks

| Task | Where to Look |
|------|---------------|
| Understanding project structure | [AI_CONTEXT.md](./AI_CONTEXT.md#directory-structure) |
| Adding new component | [ARCHITECTURE.md](./ARCHITECTURE.md#component-architecture) |
| Writing tests | [TESTING.md](./TESTING.md#writing-new-tests) |
| State management | [ARCHITECTURE.md](./ARCHITECTURE.md#state-management) |
| Event handling | [ARCHITECTURE.md](./ARCHITECTURE.md#event-system) |
| API endpoints | [AI_CONTEXT.md](./AI_CONTEXT.md#api-endpoints) |
| Build configuration | [ARCHITECTURE.md](./ARCHITECTURE.md#build--deploy) |
| Migrating jQuery code | [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) |
| jQuery → Vanilla JS patterns | [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md#pattern-translation) |
| Contributing guidelines | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| Commit message format | [COMMITS.md](./COMMITS.md) or [CONTRIBUTING.md](../CONTRIBUTING.md#commit-guidelines) |
| Pull request process | [CONTRIBUTING.md](../CONTRIBUTING.md#pull-request-process) |

### Project Structure Cheat Sheet

```
src/
├── server.ts              # Backend entry point
├── main.ts                # Frontend entry point
├── index.html             # Main HTML
│
├── api/                   # Backend (Express 5)
│   ├── routes/            # Endpoints + validation
│   ├── controllers/       # Request/response handling
│   ├── services/          # Business logic
│   └── middleware/        # Error handling
│
├── data/                  # Static data (as const)
├── state/                 # Global state (Proxy + EventTarget)
├── ui/                    # Components (vanilla TS)
├── constants/             # Centralized constants
├── utils/                 # Utility functions
├── eventHandlers/         # Global event delegation
├── initializers/          # Startup logic
├── errors/                # Custom errors
├── types/                 # Global types
├── css/                   # Themes
└── __tests__/             # Test suite
```

### Key Patterns

| Pattern | Purpose | Where |
|---------|---------|-------|
| **MVC Layers** | Backend structure | `src/api/` |
| **Event-Driven UI** | Reactive frontend | `src/ui/`, `src/state/` |
| **Presenter/Container** | Complex DOM rendering | `src/ui/*/renderers/` |
| **Singleton State** | Global state management | `src/state/globalState.ts` |
| **Orchestrator** | Coordinate rendering | `src/ui/*/orchestrator/` |
| **Registry** | Event handler management | `src/eventHandlers/` |

### State Flow

```
User Action → Event Handler → Update globalState
    ↓
globalState Proxy → Dispatch CustomEvent
    ↓
Subscribers Notified → Fetch Data (if needed)
    ↓
Orchestrator → Renderers → DOM Update
```

### API Flow

```
HTTP Request → Route (validation) → Controller (parse)
    ↓
Service (logic) → Data (filter) → Response
```

## Additional Resources

### In This Directory
- This `README.md` - Quick reference index
- `AI_CONTEXT.md` - Main reference
- `ARCHITECTURE.md` - Design patterns
- `TESTING.md` - Testing guide
- `MIGRATION_GUIDE.md` - jQuery to TypeScript migration
- `COMMITS.md` - Conventional Commits quick reference

### In Project Root
- `README.md` - Project overview (brief)
- `CONTRIBUTING.md` - **How to contribute** (commit guidelines, PR process, standards)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript config
- `jest.config.ts` - Test config
- `esbuild.config.js` - Build config
- `openapi.yaml` - API specification

### In `docs/`
- `project-standards-and-setup.md` - Coding standards
- `rate-limiting-test-challenges.md` - Known testing issue

### In `src/` (READMEs as ADRs)
- `src/constants/README.md` - Constants usage
- `src/data/README.md` - Data layer design
- `src/utils/README.md` - Utility functions
- `src/eventHandlers/README.md` - Event delegation
- `src/ui/roomDetail/orchestrator/README.md` - Orchestrator pattern
- `src/ui/roomDetail/renderers/README.md` - Presenter/Container pattern
- `src/__tests__/README.md` - Testing overview
- `src/__tests__/unit/README.md` - Unit testing
- `src/__tests__/unit/service-layer/README.md` - Service tests
- `src/__tests__/unit/controller-layer/README.md` - Controller tests
- `src/__tests__/integration/README.md` - Integration tests

## Development Workflow

### Before Coding
1. ✅ Read relevant README files
2. ✅ Check [AI_CONTEXT.md](./AI_CONTEXT.md) for patterns
3. ✅ Review [ARCHITECTURE.md](./ARCHITECTURE.md) for design
4. ✅ Understand the migration context

### While Coding
1. ✅ Follow established patterns
2. ✅ Use TypeScript with strict mode
3. ✅ Use vanilla JavaScript (no jQuery, no frameworks)
4. ✅ Maintain type safety
5. ✅ Write tests as you go

### After Coding
1. ✅ Run tests (`npm test`)
2. ✅ Check coverage (`npm run test:coverage`)
3. ✅ Lint (`npm run lint`)
4. ✅ Format (`npm run format`)
5. ✅ Type check (`npm run typecheck`)
6. ✅ Commit using Conventional Commits format
7. ✅ Update documentation if patterns changed

## Maintenance

These AI documentation files should be updated when:

- ✏️ Major architectural changes occur
- ✏️ New patterns are introduced
- ✏️ Migration milestones are reached
- ✏️ Testing strategies change
- ✏️ New conventions are established

**Last Updated**: 2025-10-25

**Next Review**: When migration from jQuery is complete

---

**Questions?** Check the main docs first:
- [AI_CONTEXT.md](./AI_CONTEXT.md) - "What is this project?"
- [ARCHITECTURE.md](./ARCHITECTURE.md) - "How is it built?"
- [TESTING.md](./TESTING.md) - "How do I test it?"
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - "How do I migrate jQuery code?"
