# Conventional Commits Reference

> **Quick reference for Conventional Commits in this project**

This is a condensed reference for AI assistants and developers. For complete guidelines, see [CONTRIBUTING.md](../CONTRIBUTING.md#commit-guidelines).

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**⚠️ CRITICAL: Use Imperative Mood**

The subject must be in imperative mood (command form):

- ✅ **"add"** not "added" or "adds"
- ✅ **"fix"** not "fixed" or "fixes"
- ✅ **"update"** not "updated" or "updates"
- ✅ **"remove"** not "removed" or "removes"

**Rule**: "This commit will **[subject]**"

## Quick Examples

```bash
# Feature
feat(roomDetail): add biohazard threat level indicator

# Bug fix
fix(api): resolve caching issue in room data endpoint

# Documentation
docs(readme): update installation instructions

# Refactor
refactor(state): simplify subscription manager

# Test
test(services): add unit tests for items service

# Breaking change
feat(api)!: change room search response format

BREAKING CHANGE: Room search now returns paginated results
```

## Types

| Type       | Use For                    | Affects Version |
| ---------- | -------------------------- | --------------- |
| `feat`     | New feature                | Minor (0.X.0)   |
| `fix`      | Bug fix                    | Patch (0.0.X)   |
| `docs`     | Documentation only         | -               |
| `style`    | Formatting, no code change | -               |
| `refactor` | Code refactor              | -               |
| `perf`     | Performance improvement    | Patch           |
| `test`     | Adding/updating tests      | -               |
| `build`    | Build system or deps       | -               |
| `ci`       | CI/CD changes              | -               |
| `chore`    | Maintenance                | -               |
| `revert`   | Revert previous commit     | -               |

**Breaking change**: Add `!` after type/scope OR `BREAKING CHANGE:` in footer → Major version (X.0.0)

## Common Scopes

### Backend

- `api` - General API
- `routes` - Routes
- `controllers` - Controllers
- `services` - Services
- `middleware` - Middleware
- `data` - Data layer

### Frontend

- `ui` - General UI
- `roomDetail` - Room detail component
- `difficultySelect` - Difficulty selector
- `themeSelect` - Theme switcher
- `safeRoomAudioPlayer` - Audio player
- `introOverlay` - Intro overlay
- `roomSummary` - Room summary

### Core

- `state` - State management
- `events` - Event handling
- `utils` - Utilities
- `types` - TypeScript types
- `constants` - Constants

### Infrastructure

- `build` - Build config
- `test` - Testing infrastructure
- `docs` - Documentation
- `deps` - Dependencies

## Subject Line Rules

1. **Imperative mood (REQUIRED)**: Write as a command
    - ✅ "add" "fix" "update" "remove" "refactor" "implement"
    - ❌ "added" "fixed" "updated" "removed" "refactored" "implemented"
    - ❌ "adds" "fixes" "updates" "removes" "refactors" "implements"
    - Test: "This commit will **[your subject]**" - must make sense
2. **Lowercase**: `feat(api): add endpoint` not `feat(api): Add endpoint`
3. **No period**: `fix(ui): resolve bug` not `fix(ui): resolve bug.`
4. **≤72 characters**: Keep it concise
5. **What, not how**: Describe the change, not implementation

## Body Guidelines

- Separate from subject with blank line
- Explain **what** and **why**, not how
- Wrap at 72 characters
- Use bullet points for multiple changes

```
feat(roomDetail): add adjoining rooms navigation

Add clickable adjoining rooms list to room detail panel.
Users can now navigate between connected rooms directly.

- Add renderAdjoiningRooms renderer
- Add click handler for room navigation
- Update orchestrator
- Add tests
```

## Footer

- **Reference issues**: `Closes #123`, `Fixes #456`, `Relates to #789`
- **Breaking changes**: `BREAKING CHANGE: description`
- **Co-authors**: `Co-Authored-By: Name <email>`
- **AI attribution**: `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

## AI-Generated Commits

When AI generates the commit:

```
feat(roomDetail): add threat level display

Implement visual threat level indicator based on
S.T.A.R.S. ranking data.

- Add renderThreatLevel renderer
- Calculate threat from biohazard codes
- Add CSS styling
- Add unit tests

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Breaking Changes

Two ways to indicate:

**Method 1**: Add `!` after type/scope

```
feat(api)!: remove deprecated endpoints
```

**Method 2**: Add `BREAKING CHANGE:` in footer

```
feat(api): remove deprecated endpoints

BREAKING CHANGE: /api/v1/* endpoints removed. Use /api/v2/*.
```

## Multiple Changes in One Commit

If multiple related changes, use body with bullet points:

```
refactor(ui): improve room detail performance

Optimize rendering pipeline for better performance:

- Use DocumentFragment for batch DOM updates
- Implement virtual scrolling for long lists
- Add memoization to expensive calculations
- Reduce re-renders with selective state updates

Reduces initial render time by ~40%.
```

## Revert Commits

```
revert: feat(roomDetail): add threat level

This reverts commit abc123def456.

Reverting due to performance issues on low-end devices.
Will revisit with optimized approach.
```

## Commit Message Checklist

Before committing, verify:

- [ ] **Subject uses imperative mood** (add/fix/update, NOT added/fixed/updated)
- [ ] Type is correct (feat/fix/docs/etc.)
- [ ] Scope matches affected component/layer
- [ ] Subject is lowercase (after colon)
- [ ] Subject has no period at end
- [ ] Subject is ≤72 characters
- [ ] Body explains what and why (if needed)
- [ ] Footer references issues (if applicable)
- [ ] Breaking changes marked with `!` or `BREAKING CHANGE:`
- [ ] AI attribution added (if AI-generated)

**Quick test**: Can you say "This commit will **[your subject]**"? If yes, it's imperative!

## Common Mistakes

### ❌ Wrong

```
# Not imperative mood (WRONG - past tense)
feat(api): added new endpoint
fix(ui): fixed rendering bug
docs(readme): updated installation steps

# Not imperative mood (WRONG - present tense)
feat(api): adds new endpoint
fix(ui): fixes rendering bug
docs(readme): updates installation steps

# Not imperative mood (WRONG - gerund)
feat(api): adding new endpoint
fix(ui): fixing rendering bug

# Uppercase subject
feat(api): Add new endpoint

# Period at end
feat(api): add new endpoint.

# Too vague
fix(ui): fix bug

# Mixed concerns
feat(api): add endpoint and fix bug and update docs
```

### ✅ Correct

```
# Imperative mood (CORRECT - command form)
feat(api): add room search endpoint
fix(ui): resolve room detail rendering issue
docs(readme): update installation steps
refactor(state): simplify subscription logic
test(services): add unit tests for items service

# Specific description
fix(ui): resolve room detail rendering issue on mobile

# Single concern per commit
feat(api): add room search endpoint
fix(api): resolve caching issue in room endpoint
docs(api): update room search documentation
```

## Quick Commit Command

```bash
# Using git commit with editor
git commit

# In editor, write:
feat(roomDetail): add biohazard threat level

# With inline message (short commits only)
git commit -m "docs(readme): update installation steps"
```

## Tools

### Commitlint (Optional)

```bash
# Install
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Configure commitlint.config.js
module.exports = { extends: ['@commitlint/config-conventional'] };

# Use in pre-commit hook
npx commitlint --edit $1
```

### Git Commit Template (Optional)

```bash
# Create template file
cat > ~/.gitmessage << EOF
# <type>(<scope>): <subject>
#
# [body]
#
# [footer]
EOF

# Configure git to use template
git config --global commit.template ~/.gitmessage
```

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Full project guidelines

---

**Last Updated**: 2025-10-25
