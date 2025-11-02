# Contributing to RE Remake Interactive Map

Thank you for your interest in contributing! This document provides guidelines and standards for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

## Code of Conduct

This project follows standard open-source community guidelines:

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a harassment-free environment

## Getting Started

### Prerequisites

- **Node.js**: v18+ or **Bun**: v1.2+
- **Git**: For version control
- **TypeScript**: Project uses TypeScript 5.8+
- **Code Editor**: VS Code recommended (with TypeScript and ESLint extensions)

### Initial Setup

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd RE-Remake-Interactive-Map
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run tests** (ensure everything works):

    ```bash
    npm test
    ```

4. **Start development server**:

    ```bash
    npm run dev
    ```

5. **Read the documentation**:
    - [`.claude/AI_CONTEXT.md`](.claude/AI_CONTEXT.md) - Project overview
    - [`.claude/ARCHITECTURE.md`](.claude/ARCHITECTURE.md) - Design patterns
    - [`.claude/TESTING.md`](.claude/TESTING.md) - Testing guide
    - [`.claude/MIGRATION_GUIDE.md`](.claude/MIGRATION_GUIDE.md) - jQuery migration

## Development Workflow

### Branch Strategy

- **`master`**: Main branch (stable)
- **`feature/*`**: New features (e.g., `feature/add-boss-encounter-component`)
- **`fix/*`**: Bug fixes (e.g., `fix/room-detail-rendering`)
- **`refactor/*`**: Code refactoring (e.g., `refactor/state-management`)
- **`docs/*`**: Documentation updates (e.g., `docs/update-architecture`)
- **`test/*`**: Test improvements (e.g., `test/add-service-layer-coverage`)

### Creating a New Feature

1. **Create a branch**:

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make changes** following project standards

3. **Write tests** for your changes

4. **Run quality checks**:

    ```bash
    npm run typecheck    # TypeScript
    npm run lint         # ESLint
    npm run format       # Prettier
    npm test             # Jest
    ```

5. **Commit using Conventional Commits** (see below)

6. **Push and create Pull Request**:
    ```bash
    git push origin feature/your-feature-name
    ```

## Commit Guidelines

This project uses **[Conventional Commits](https://www.conventionalcommits.org/)** specification.

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

**⚠️ IMPORTANT: Use Imperative Mood in Subject Line**

Write commit subjects as commands:

- ✅ "add feature" (imperative - correct)
- ✅ "fix bug" (imperative - correct)
- ✅ "update documentation" (imperative - correct)
- ❌ "added feature" (past tense - wrong)
- ❌ "adds feature" (present tense - wrong)
- ❌ "adding feature" (gerund - wrong)

**Think**: "This commit will **[subject]**"

- "This commit will **add feature**" ← Correct!
- "This commit will **added feature**" ← Wrong!

### Types

| Type         | Description                               | Example                                                  |
| ------------ | ----------------------------------------- | -------------------------------------------------------- |
| **feat**     | New feature                               | `feat(roomDetail): add biohazard threat level indicator` |
| **fix**      | Bug fix                                   | `fix(api): resolve room data caching issue`              |
| **docs**     | Documentation only                        | `docs(readme): update installation instructions`         |
| **style**    | Code style (formatting, semicolons, etc.) | `style(global): format with prettier`                    |
| **refactor** | Code refactoring (no feature/fix)         | `refactor(state): simplify subscription manager`         |
| **perf**     | Performance improvement                   | `perf(renderers): optimize DOM updates`                  |
| **test**     | Adding/updating tests                     | `test(services): add unit tests for items service`       |
| **build**    | Build system or dependencies              | `build(deps): upgrade express to 5.1.0`                  |
| **ci**       | CI/CD changes                             | `ci(github): add test workflow`                          |
| **chore**    | Maintenance tasks                         | `chore(gitignore): add .env to gitignore`                |
| **revert**   | Revert previous commit                    | `revert: feat(roomDetail): add threat level`             |

### Scopes

Common scopes in this project:

**Backend/API**:

- `api` - General API changes
- `routes` - Route definitions
- `controllers` - Controller logic
- `services` - Service layer
- `middleware` - Middleware functions
- `data` - Data layer

**Frontend/UI**:

- `ui` - General UI changes
- `roomDetail` - Room detail component
- `difficultySelect` - Difficulty selector
- `themeSelect` - Theme switcher
- `safeRoomAudioPlayer` - Audio player
- `introOverlay` - Intro overlay
- `roomSummary` - Room summary

**Core**:

- `state` - State management
- `events` - Event handling
- `utils` - Utility functions
- `types` - TypeScript types
- `constants` - Constants

**Infrastructure**:

- `build` - Build configuration
- `test` - Testing infrastructure
- `docs` - Documentation
- `deps` - Dependencies

### Examples

#### Feature Addition

```
feat(roomDetail): add adjoining rooms navigation

Add clickable adjoining rooms list to room detail panel.
Users can now navigate between connected rooms directly
from the detail view.

- Add renderAdjoiningRooms renderer
- Add click handler for room navigation
- Update room detail orchestrator
- Add tests for new functionality

Closes #123
```

#### Bug Fix

```
fix(api): resolve rate limiting state persistence

Fix rate limiting middleware state persisting across
integration tests causing false 429 errors.

The issue was caused by MemoryStore not resetting between
test runs. Documented manual testing approach in
docs/rate-limiting-test-challenges.md.

Fixes #456
```

#### Documentation

```
docs(contributing): add conventional commits guide

Add comprehensive contributing documentation including:
- Conventional Commits specification
- Branch naming conventions
- PR process
- Coding standards
```

#### Refactoring

```
refactor(state): use WeakMap for subscription tracking

Replace array-based subscription tracking with WeakMap
for automatic cleanup when components are removed.

Performance improvement: O(1) lookup vs O(n) array search.
```

#### Breaking Change

```
feat(api)!: change room search response format

BREAKING CHANGE: Room search now returns paginated results.

Old format:
{ results: [...] }

New format:
{ results: [...], page: 1, totalPages: 10, totalResults: 95 }

Clients must update to handle pagination.

Closes #789
```

### Commit Best Practices

1. **Use imperative mood** in subject line (required)
    - Write as a command: "add", "fix", "update", "remove"
    - NOT past tense: "added", "fixed", "updated"
    - NOT present tense: "adds", "fixes", "updates"
    - Think: "This commit will **[subject]**"
    - Examples:
        - ✅ `feat(api): add room search endpoint`
        - ✅ `fix(ui): resolve rendering issue`
        - ❌ `feat(api): added room search endpoint`
        - ❌ `fix(ui): resolves rendering issue`
2. **Keep subject line ≤ 72 characters**
3. **Start subject with lowercase** (after the colon)
4. **No period at end of subject**
5. **Separate subject from body with blank line**
6. **Wrap body at 72 characters**
7. **Explain what and why, not how** (code shows how)
8. **Reference issues/PRs** in footer

### Breaking Changes

Mark breaking changes with `!` after type/scope or `BREAKING CHANGE:` in footer:

```
feat(api)!: remove deprecated /api/v1 endpoints

BREAKING CHANGE: /api/v1/* endpoints removed. Use /api/v2/*.
```

### AI-Generated Commits

When using AI (like Claude Code) to generate commits, the format is:

```
<type>(<scope>): <subject>

[body explaining changes]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Example:

```
feat(roomDetail): add biohazard threat level display

Implement visual threat level indicator based on
S.T.A.R.S. ranking data for biohazards in room.

- Add renderThreatLevel renderer
- Calculate threat level from biohazard codes
- Add CSS styling for threat levels
- Add unit tests

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Pull Request Process

### Before Creating a PR

1. ✅ All tests pass (`npm test`)
2. ✅ Code is formatted (`npm run format`)
3. ✅ No linting errors (`npm run lint`)
4. ✅ TypeScript compiles (`npm run typecheck`)
5. ✅ Coverage is maintained/improved (`npm run test:coverage`)
6. ✅ Documentation is updated (if needed)
7. ✅ Commits follow Conventional Commits

### PR Title Format

Use same format as commits:

```
<type>(<scope>): <description>
```

Examples:

- `feat(roomDetail): add biohazard threat level indicator`
- `fix(api): resolve caching issue in room data endpoint`
- `docs(architecture): update state management documentation`

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Related Issues

Closes #(issue)
Related to #(issue)

## Changes Made

- Bullet point list of changes
- Include technical details
- Reference affected components

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings introduced
- [ ] Tests provide adequate coverage
- [ ] Commits follow Conventional Commits
```

### PR Review Process

1. **Automated Checks**: CI runs tests, linting, type checking
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address review comments
4. **Approval**: Maintainer approves PR
5. **Merge**: Squash and merge (preserving conventional commit in merge commit)

## Coding Standards

### General Guidelines

- **No jQuery**: Use vanilla JavaScript only
- **No UI Frameworks**: No React, Vue, Angular
- **TypeScript Strict Mode**: All code must pass strict type checking
- **Native APIs**: Prefer browser native APIs (Proxy, EventTarget, Web Animations API)
- **Component-Based**: Follow established component architecture
- **Immutability**: Use `as const` for data, avoid mutations

See [docs/project-standards-and-setup.md](docs/project-standards-and-setup.md) for complete standards.

### File Naming

- **TypeScript files**: `camelCase.ts` (e.g., `itemsService.ts`)
- **Component directories**: `camelCase/` (e.g., `roomDetail/`)
- **Test files**: `*.test.ts` (e.g., `itemsService.test.ts`)
- **README files**: `README.md` (uppercase)

### Code Organization

Follow the established directory structure:

```
src/
├── api/              # Backend (Express 5)
├── ui/               # Frontend components
├── state/            # State management
├── data/             # Static data
├── utils/            # Utilities
└── __tests__/        # Tests
```

See [.claude/AI_CONTEXT.md](.claude/AI_CONTEXT.md#directory-structure) for complete structure.

### TypeScript

```typescript
// ✅ Good: Strict typing, explicit return type
export function fetchRoomData(roomId: RoomID): Promise<RoomResponse> {
    return fetch(`/api/rooms?ids=${roomId}`).then((r) => r.json());
}

// ❌ Bad: Any types, implicit return
export function fetchRoomData(roomId: any) {
    return fetch(`/api/rooms?ids=${roomId}`).then((r) => r.json());
}
```

### Event Handlers

```typescript
// ✅ Good: Export as tuple, type-safe
export const clickHandler: [string, EventListener] = [
    '[data-room-id]',
    (event: Event) => {
        const target = event.target as HTMLElement;
        const roomId = target.dataset.roomId as RoomID;
        globalState.roomId = roomId;
    },
];

// ❌ Bad: Direct binding, not delegated
document.querySelector('.room').addEventListener('click', function () {
    // ...
});
```

### State Updates

```typescript
// ✅ Good: Update global state (triggers reactivity)
globalState.difficulty = newDifficulty;

// ❌ Bad: Direct DOM manipulation
document.querySelectorAll('.item').forEach((item) => {
    item.style.display = difficulty === 'hard' ? 'block' : 'none';
});
```

## Testing Requirements

### Coverage Requirements

- **Target**: 80%+ code coverage (branches, functions, lines, statements)
- **Unit Tests**: All new services and controllers
- **Integration Tests**: All new API endpoints
- **Component Tests**: Complex rendering logic

### Test Structure

```typescript
describe('Component/Function Name', () => {
    describe('Happy Path', () => {
        it('should return expected result for valid input', () => {
            // Test
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty input', () => {
            // Test
        });
    });

    describe('Error Handling', () => {
        it('should throw appropriate error', () => {
            // Test
        });
    });
});
```

See [.claude/TESTING.md](.claude/TESTING.md) for complete testing guide.

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test file
npm test -- itemsService.test.ts
```

## Documentation

### When to Update Documentation

Update documentation when:

- ✏️ Adding new features
- ✏️ Changing architectural patterns
- ✏️ Modifying APIs
- ✏️ Updating dependencies
- ✏️ Fixing significant bugs

### Documentation Files

| File                                  | When to Update                           |
| ------------------------------------- | ---------------------------------------- |
| `README.md`                           | Project description, setup, overview     |
| `CONTRIBUTING.md`                     | Contributing guidelines (this file)      |
| `.claude/AI_CONTEXT.md`               | Project context, architecture overview   |
| `.claude/ARCHITECTURE.md`             | Design patterns, architectural decisions |
| `.claude/TESTING.md`                  | Testing strategy, examples               |
| `.claude/MIGRATION_GUIDE.md`          | jQuery to TypeScript patterns            |
| `docs/project-standards-and-setup.md` | Coding standards, tools                  |
| Component `README.md` files           | Component-specific patterns              |

### JSDoc Comments

All functions should have JSDoc comments:

```typescript
/**
 * Fetches room data from the API by room ID.
 *
 * @param roomId - The unique identifier for the room
 * @returns Promise resolving to room response data
 * @throws {NotFoundError} When room is not found
 * @throws {Error} When network request fails
 *
 * @example
 * const data = await fetchRoomData('keepersRoom');
 */
export async function fetchRoomData(roomId: RoomID): Promise<RoomResponse> {
    // Implementation
}
```

## Migration from jQuery

If you're migrating old jQuery code, see [.claude/MIGRATION_GUIDE.md](.claude/MIGRATION_GUIDE.md) for:

- jQuery to Vanilla JS pattern translations
- Component migration checklist
- State management migration
- Event handling migration
- Testing migrated code

## Questions or Issues?

- **Questions**: Open a Discussion (if available) or Issue
- **Bugs**: Open an Issue with reproduction steps
- **Feature Requests**: Open an Issue with use case and rationale
- **Security Issues**: Contact maintainers directly (do not open public issue)

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Express Documentation](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

---

Thank you for contributing to RE Remake Interactive Map! 🎮
