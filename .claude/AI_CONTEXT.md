# AI Context: RE Remake Interactive Map

> **Purpose**: This document provides comprehensive context for AI assistants working on this project. It serves as both AI-readable reference and human-readable documentation.

## Project Overview

**RE Remake Interactive Map** is an interactive companion guide for Resident Evil Remake, built as a full-stack TypeScript application with vanilla JavaScript (no UI frameworks) and an Express 5 API backend.

### Key Facts

- **Migration Status**: In active migration from jQuery/monolithic HTML to TypeScript/component-based architecture
- **Tech Stack**: TypeScript, Express 5, Vanilla JS (no React/Vue/Angular), ESBuild, Jest
- **Philosophy**: No UI libraries, no jQuery - uses native browser APIs (Proxy, EventTarget, Web Animations API)
- **Architecture**: Component-based with clear separation between API layer and UI layer

## Project History & Migration Context

### Original Architecture (Being Phased Out)

- **Single monolithic HTML file** (`index.html`) with ~17,000 lines
- **Inlined jQuery code** for all interactivity
- **Multiple static HTML files** for different game areas (mansion-1f.html, courtyard-1b.html, etc.)
- **All styling embedded** in HTML files

### Current Architecture (Migration Target)

- **Modular TypeScript** components with clear separation of concerns
- **Vanilla JavaScript** using native browser APIs (no jQuery dependency)
- **Express 5 API** serving data endpoints
- **Component-based UI** with template loading system
- **Separate CSS files** with theme support (diurnal/nocturnal)

### Migration Evidence

Git status shows deleted files from old architecture:

```
deleted: index.html (root)
deleted: mansion-1f.html, mansion-2f.html, mansion-3f.html, mansion-bf.html
deleted: courtyard-1b.html, courtyard-1f.html, courtyard-2b.html, courtyard-heliport.html
deleted: guardhouse-residence-1f.html
deleted: altar-1b.html, altar-2b.html
deleted: aqua-ring-1b.html, aqua-ring-2b.html
deleted: underground-laboratory-1b.html through 4b.html
```

**Current state**: New `src/` directory structure with TypeScript, new build system, API layer established.

## Critical Development Principles

When working on this project, you MUST:

1. **Follow Established Patterns**: Read the READMEs in various directories - they function as ADRs (Architecture Decision Records) and explain design philosophies
2. **No jQuery**: Never introduce jQuery dependencies - use vanilla JavaScript and native APIs
3. **No UI Frameworks**: Don't suggest React, Vue, Angular, etc. - this is intentionally vanilla
4. **Maintain Type Safety**: Use TypeScript with strict typing throughout
5. **Component-Based Thinking**: Follow the established component architecture patterns
6. **Use Native APIs**: Leverage Proxy for reactivity, EventTarget for pub/sub, Web Animations API for effects
7. **Immutability**: Use `as const` for static data to ensure immutability and type safety
8. **Use Absolute Import Paths**: ALWAYS use TypeScript path mappings for imports (see below)
9. **Run Linting and Formatting**: ALWAYS run `npm run format` after making changes to ensure code is properly formatted with Prettier

### Import Path Convention (CRITICAL)

**NEVER use relative imports** - always use absolute paths with TypeScript path mappings.

```typescript
// ✅ CORRECT - Use path mappings
import { renderRoomSummary } from 'roomSummary/orchestrator/orchestrator';
import { fetchRoomData } from 'roomDetail/logic/api/roomApi';
import { animateGears } from 'shared/renderers/gearsAnimatorRenderer';
import { getState } from 'src/state/globalState';
import { RoomDetailsData } from 'src/data/types';

// ❌ INCORRECT - Never use relative paths
import { renderRoomSummary } from '../orchestrator/orchestrator';
import { fetchRoomData } from '../../roomDetail/logic/api/roomApi';
```

**Path mappings are configured in**:

- `tsconfig.json` → paths: `{ "componentName/*": ["src/ui/componentName/*"] }`
- `jest.config.ts` → moduleNameMapper: `{ '^componentName/(.*)$': '<rootDir>/src/ui/componentName/$1' }`

**When adding new components**: Update both config files with the new component's path mapping.

## Architecture Overview

### High-Level Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │  UI Components (Vanilla TypeScript)              │   │
│  │  - Event Handlers → Orchestrators → Renderers    │   │
│  │  - Global State (Proxy-based reactivity)         │   │
│  │  - Template System (HTML partials)               │   │
│  └──────────────────────────────────────────────────┘   │
│                        ↕ fetch()                         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│              Express 5 API (Node.js)                     │
│  Routes → Controllers → Services → Static Data           │
│  - express-validator for input validation               │
│  - express-rate-limit for API protection                │
│  - Custom error handling middleware                     │
└─────────────────────────────────────────────────────────┘
```

### Directory Structure

```
src/
├── server.ts                 # Express API entry point
├── main.ts                   # Client-side entry point
├── index.html                # Main HTML file (in src/, not root)
│
├── api/                      # Backend API Layer
│   ├── routes/               # Express route definitions
│   ├── controllers/          # HTTP request/response handlers
│   ├── services/             # Business logic
│   └── middleware/           # Error handling, etc.
│
├── data/                     # Static in-memory data
│   ├── types.ts              # Shared TypeScript types
│   ├── items.ts              # Item data (as const)
│   ├── biohazards.ts         # Biohazard data
│   ├── rooms.ts              # Room data
│   ├── areas.ts              # Area groupings
│   └── maps.ts               # Map/floor definitions
│
├── state/                    # Client-side state management
│   ├── globalState.ts        # Proxy-based reactive state
│   ├── globalSubscriptions.ts # Subscription initialization
│   └── subscriptionManager.ts # Lifecycle management
│
├── ui/                       # Client-side UI components
│   ├── roomDetail/           # Largest component (room detail panel)
│   │   ├── orchestrator/     # Rendering coordination
│   │   ├── renderers/        # Specialized rendering functions
│   │   ├── processors/       # Data processing
│   │   ├── eventHandlers/    # Event delegation
│   │   ├── logic/api/        # API client with caching
│   │   ├── templates/        # HTML templates
│   │   └── types/            # Component-specific types
│   ├── difficultySelect/
│   ├── roomSummary/
│   ├── safeRoomAudioPlayer/
│   ├── introOverlay/
│   ├── themeSelect/
│   └── shared/               # Shared UI utilities
│
├── constants/                # Centralized constants
│   ├── messages.ts           # Error/validation messages
│   ├── api.ts                # API configuration
│   └── global.ts             # Global defaults
│
├── utils/                    # Utility functions
│   ├── validators.ts         # express-validator middleware
│   ├── domUtils.ts           # DOM manipulation helpers
│   ├── eventUtils.ts         # Event handling (debouncing, etc.)
│   ├── animationUtils.ts     # Web Animations API helpers
│   ├── formatUtils.ts        # String formatting
│   └── audioUtils.ts         # Audio controls
│
├── initializers/             # Startup initialization
│   ├── globalStartupInitializer.ts
│   └── templateLoader.ts     # Loads HTML partials
│
├── eventHandlers/            # Global event delegation
│   └── globalEventHandlers.ts
│
├── errors/                   # Custom error classes
│   └── customErrors.ts       # NotFoundError, BadRequestError, etc.
│
├── types/                    # Global TypeScript types
│   └── globalTypes.ts
│
├── css/                      # Stylesheets
│   ├── global.css
│   ├── diurnal.css           # Light theme
│   └── nocturnal.css         # Dark theme
│
├── audio/                    # Audio assets
├── img/                      # Image assets
│
└── __tests__/                # Test suite
    ├── unit/
    │   ├── controller-layer/
    │   └── service-layer/
    └── integration/
```

## Key Architectural Patterns

### 1. MVC/Layered Architecture (Backend)

**Flow**: Route → Controller → Service → Data

- **Routes** (`src/api/routes/`): Define endpoints with validation and rate limiting
- **Controllers** (`src/api/controllers/`): Handle HTTP request/response
- **Services** (`src/api/services/`): Pure business logic
- **Data** (`src/data/`): Static in-memory data (immutable with `as const`)

### 2. Event-Driven UI (Frontend)

**Flow**: Event Handlers → Orchestrator → Renderers → DOM

- **Event Handlers**: Delegate DOM events, update global state
- **Orchestrator**: Coordinates rendering pipeline (e.g., `renderRoomData`)
- **Renderers**: Pure functions that update specific DOM sections
- **Global State**: Proxy-based reactive state with EventTarget for pub/sub

### 3. Presenter/Container Pattern (Complex UI)

Applied pragmatically in components with heavy DOM logic:

- **Presenters**: Pure functions creating DOM from data (e.g., `createAdjoiningRoomsList`)
- **Containers**: Handle queries, clearing, and appending (e.g., `renderAdjoiningRooms`)
- **Benefit**: Testability (mock data for presenters) and reusability

### 4. Singleton Pattern (State Management)

`globalState.ts` uses module-level singleton:

- Single instance via ES6 module scoping
- Proxy for reactivity (intercepts property changes)
- EventTarget for pub/sub (components subscribe to state changes)

### 5. Template System

- HTML partials in `src/ui/*/templates/*.html`
- Loaded via `templateLoader.ts` at startup
- Auto-discovery via ESBuild plugin

### 6. Event Delegation

From `src/eventHandlers/README.md`:

- **Single document-level listener** for bubbling events (click, mouseover, mouseout)
- **Direct attachment** for non-bubbling events (mouseenter, mouseleave)
- **Registry pattern** for extensible handlers
- **Tuple exports** from components: `[selector: string, handler: Function]`

## Code Quality Tools

### Linting and Formatting (CRITICAL)

**ALWAYS run formatting after making code changes:**

```bash
npm run format  # Runs Prettier on all files
```

**Configuration:**

- **Prettier** (`.prettierrc.json`): Code formatting (spacing, line breaks, quotes, etc.)
- **ESLint** (`eslint.config.js`): Code quality checks (unused vars, type safety, etc.)

**Important Notes:**

- Prettier runs automatically via `npm run format` and formats all project files
- The format command should be run after every file creation or modification
- ESLint automatically ignores `dist/`, `node_modules/`, `coverage/`, and other generated folders
- Source files in `src/` should be clean and properly formatted

**When to Run:**

1. **After creating new files** - Ensures consistent formatting from the start
2. **After editing existing files** - Maintains code consistency
3. **Before committing** - Keeps the codebase clean

## Data Flow Examples

### Opening a Room Detail

1. User clicks room on map
2. `openRoomDetailHandler` fires → updates `globalState.roomId`
3. State change triggers `subscribeState('roomData')` callback
4. Callback calls `fetchRoomData(roomId)` via API client (with caching)
5. API returns `RoomDetailsData` with items & biohazards
6. `renderRoomData()` orchestrator runs
7. Each renderer updates specific DOM sections
8. UI reflects room data with difficulty-filtered items/enemies

### API Request Flow

1. Client: `fetch('/api/maps/rooms?ids=keepersRoom')`
2. Route validates query params (express-validator)
3. Controller parses `req.query.ids` → calls service
4. Service filters static data → returns results
5. Controller formats response → `res.json(data)`
6. Client receives JSON, updates UI

## Type System

### Core Types (`src/data/types.ts`)

**Character & Difficulty**:

```typescript
CharacterCode: 'JV' | 'CR'
DifficultyLevel: 'JV-lvl-very-easy' | 'JV-lvl-easy' | 'JV-lvl-normal' | 'JV-lvl-hard' | ...
```

**Items**:

```typescript
ItemType: 14 types (Typewriter, ItemBox, Document, Weapon, etc.)
ItemRoomData: { id, map, difficultyLevel, name, type, qty, qtyItems }
```

**Biohazards**:

```typescript
BiohazardCode: 18 enemy codes (Zb, Cr, Ht, Ty, etc.)
BiohazardRoomData: { id, map, difficultyLevel, code, qty, ambush }
```

**Maps/Rooms**:

```typescript
AreaID: 5 areas (mansion, courtyard, guardhouse, altar, undergroundLaboratory)
MapID: 18 maps (mansionF1, mansionB1, courtyardF1, etc.)
RoomID: 40+ rooms per map
RoomData: Full room details (functions, risk, intel, adjoining rooms)
```

### Immutability with `as const`

All data arrays use `as const` assertion:

- Makes arrays readonly (prevents mutations)
- Narrows types to literal types
- Ensures type safety in services

Example:

```typescript
export const itemsRoomData = [
    {
        id: 'selfDefenseJV-keepersRoom',
        map: { room: 'keepersRoom', map: 'mansionF1' },
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy', 'JV-lvl-normal', 'JV-lvl-hard'],
        name: 'Battery Pack',
        type: 'SelfDefense',
        qty: 1,
        qtyItems: 0,
    },
] as const;
```

## State Management

### Global State (`src/state/globalState.ts`)

**Properties**:

- `theme`: 'diurnal' | 'nocturnal'
- `difficulty`: DifficultyLevel
- `character`: CharacterCode
- `roomData`: RoomDetailsData | null
- `roomId`: RoomID | null
- `roomDetailActive`: boolean

**Reactivity**:

- Proxy intercepts `set` operations
- Dispatches CustomEvent on change
- Components subscribe via `subscribeState(key, callback)`

**Pattern**:

```typescript
// Update state
globalState.roomId = 'keepersRoom';

// Subscribe to changes
subscribeState('roomId', (newValue) => {
    console.log('Room changed:', newValue);
});
```

## API Endpoints

### Items API (`/api/items`)

- `GET /api/items/all` - Fetch all items
- `GET /api/items?ids=...` - Fetch by IDs
- `GET /api/items/search?room=...&difficulty=...&type=...&name=...` - Filter

### Biohazards API (`/api/biohazards`)

- `GET /api/biohazards/all` - Fetch all
- `GET /api/biohazards?ids=...` - Fetch by IDs
- `GET /api/biohazards/search?room=...&difficulty=...&code=...&name=...` - Filter

### Maps API (`/api/maps`)

- `GET /api/maps/areas/all` - All areas
- `GET /api/maps/areas?ids=...` - Areas by IDs
- `GET /api/maps/maps/all` - All maps
- `GET /api/maps/maps?ids=...` - Maps by IDs
- `GET /api/maps/rooms/all` - All rooms
- `GET /api/maps/rooms?ids=...` - Rooms by IDs
- `GET /api/maps/rooms/search?map=...&items=...&biohazards=...` - Complex search

### Additional Endpoints

- `GET /api-docs` - Swagger UI (from `openapi.yaml`)
- `GET /` - Serves `index.html`
- Static files from `/dist` and `/src`

**API Features**:

- Rate limiting: 100 requests per 15 minutes (express-rate-limit)
- Input validation: express-validator middleware
- Error handling: Custom errors (NotFoundError, BadRequestError)
- Caching: Client-side API cache with 10-second timeout

## Build System

### ESBuild Configuration (`esbuild.config.js`)

**Bundling**:

- Entry: `src/main.ts`
- Output: `dist/main.js` (single bundle)
- CSS inlined in bundle
- Watch mode with chokidar

**Plugins**:

1. **Template Manifest Generation**: Auto-discovers templates
2. **Template HTML Copying**: Copies to `/dist`
3. **Image Asset Copying**: Copies images
4. **Test File Exclusion**: Excludes `__tests__/`

### Scripts

```json
{
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "transpile": "tsc",
    "bundle": "node esbuild.config.js",
    "build": "npm run typecheck && npm run transpile && npm run bundle",
    "build:watch": "npm run build",
    "start": "node --loader ts-node/esm --experimental-specifier-resolution=node src/server.ts",
    "dev": "bun scripts/dev-watch.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
}
```

**Development**:

- `npm run dev`: Bun runtime with auto-reload
- `npm start`: Node with ts-node

**Production**:

- `npm run build`: Full build (typecheck + transpile + bundle)
- `node dist/server.js`: Run production server

## Testing Strategy

See [TESTING.md](./TESTING.md) for comprehensive testing documentation.

**Quick Overview**:

- **Unit Tests**: Service layer, controller layer (isolated with mocks)
- **Integration Tests**: Full API stack (routes → controllers → services → data)
- **Tools**: Jest, ts-jest, Supertest
- **Coverage Target**: 80%+
- **Philosophy**: Follow 2025 industry best practices

## Coding Standards

### TypeScript

- **Strict Mode**: `strict: true` in tsconfig.json
- **String Literal Types**: Prefer over enums for serialization
- **Immutability**: `as const` for static data
- **Type Safety**: Explicit function return types

### Documentation

- **JSDoc 3.x**: File-level and function-level documentation
- **Markdown READMEs**: In every major directory (function as ADRs)
- **OpenAPI**: API spec in `openapi.yaml`

### Git Commits

- **Conventional Commits**: All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) specification
- **Format**: `<type>(<scope>): <subject>` (e.g., `feat(roomDetail): add threat level indicator`)
- **Imperative Mood**: Subject must use imperative mood - "add" not "added" or "adds"
- **Types**: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- **Scopes**: Component or layer affected (e.g., api, ui, state, roomDetail, services)
- **See**: [CONTRIBUTING.md](../CONTRIBUTING.md#commit-guidelines) for complete guide, [COMMITS.md](.claude/COMMITS.md) for quick reference

### Style Guides

- **Google TypeScript Style Guide**: Naming conventions, code organization
- **ESLint**: Enforces code quality rules
- **Prettier**: Code formatting

### Naming Conventions

- **Files**: lowercase-with-hyphens (e.g., `items-service.ts`)
- **Variables/Functions**: camelCase (e.g., `itemsRoomData`, `getAllItems`)
- **Types/Interfaces**: PascalCase (e.g., `ItemRoomData`, `DifficultyLevel`)
- **Constants**: camelCase for message keys (e.g., `Messages.validation.invalidIdFormat`)
- **IDs**: Descriptive camelCase-like strings (e.g., `selfDefenseJV-keepersRoom`)
- **Branches**: `<type>/<description>` (e.g., `feature/add-boss-encounters`, `fix/room-caching`)

## Common Pitfalls & Best Practices

### ❌ Don't Do This

```typescript
// Don't suggest jQuery
$('.element').hide();

// Don't suggest UI frameworks
import React from 'react';

// Don't mutate data arrays
itemsRoomData.push(newItem);

// Don't hardcode strings
throw new Error('Invalid ID');

// Don't skip validation
app.get('/api/items', getItems); // Missing validation middleware
```

### ✅ Do This

```typescript
// Use vanilla JavaScript
document.querySelector('.element').style.display = 'none';

// Use established component patterns
const renderer = (data) => {
    /* update DOM */
};

// Data is readonly (as const)
const newData = [...itemsRoomData, newItem]; // Won't work anyway due to 'as const'

// Use centralized messages
throw new BadRequestError(Messages.validation.invalidIdFormat);

// Always validate
app.get('/api/items', idsValidator, getItems);
```

### When Adding Features

1. **Read the relevant README first** - Understand the pattern before coding
2. **Follow established patterns** - Don't introduce new architectural patterns without discussion
3. **Use native APIs** - Check if a native browser API exists before adding a library
4. **Maintain type safety** - Add types to `types.ts`, use strict typing
5. **Write tests** - Follow the testing structure in `__tests__/`
6. **Update documentation** - Add/update READMEs when changing patterns

### When Debugging

1. **Check state subscriptions** - Are components subscribed to the right state keys?
2. **Verify API responses** - Use browser DevTools to inspect fetch calls
3. **Check rate limiting** - Could the API be throttling requests?
4. **Review event delegation** - Is the selector matching correctly?
5. **Inspect cache** - Is the API client returning cached data?

## Migration Guidance

### If You Need to Migrate Old jQuery Code

**Pattern Recognition**:

Old jQuery:

```javascript
jQuery('.element').click(function () {
    jQuery(this).addClass('active');
    jQuery('.other').fadeOut('slow');
});
```

New Vanilla:

```typescript
// Event handler registration
export const elementClickHandler: [string, EventListener] = [
    '.element',
    (event: Event) => {
        const target = event.target as HTMLElement;
        target.classList.add('active');

        const other = document.querySelector('.other');
        fadeOut(other, 500); // Using animationUtils
    },
];

// In globalEventHandlers.ts
import { elementClickHandler } from './ui/component/eventHandlers';
registerHandler(...elementClickHandler);
```

**State Management**:

Old jQuery:

```javascript
var currentRoom = 'keepersRoom';
$('.room-title').text(currentRoom);
```

New State:

```typescript
// Update state
globalState.roomId = 'keepersRoom';

// Subscribe to changes
subscribeState('roomId', (newRoomId) => {
    const title = document.querySelector('.room-title');
    if (title) title.textContent = newRoomId;
});
```

**Animations**:

Old jQuery:

```javascript
$('.element').fadeIn('slow');
$('.other').slideDown(500);
```

New Web Animations API:

```typescript
import { fadeIn, slideDown } from 'src/utils/animationUtils';

await fadeIn(element, 500);
await slideDown(otherElement);
```

## References

- **Main README**: `README.md` (project overview)
- **Contributing Guide**: [CONTRIBUTING.md](../CONTRIBUTING.md) (how to contribute, commit guidelines, PR process)
- **Commit Reference**: [.claude/COMMITS.md](.claude/COMMITS.md) (Conventional Commits quick reference)
- **Testing**: [TESTING.md](.claude/TESTING.md) (comprehensive testing guide)
- **Architecture**: [ARCHITECTURE.md](.claude/ARCHITECTURE.md) (design patterns and decisions)
- **Migration Guide**: [MIGRATION_GUIDE.md](.claude/MIGRATION_GUIDE.md) (jQuery to TypeScript patterns)
- **Component READMEs**: Various `README.md` files in `src/` subdirectories (ADRs)
- **API Spec**: `openapi.yaml` (OpenAPI 3.0 specification)
- **Standards**: `docs/project-standards-and-setup.md` (coding standards and setup)
- **Known Issues**: `docs/rate-limiting-test-challenges.md` (rate limiting testing challenges)

## Project Goals

1. **Complete migration** from jQuery monolith to TypeScript component architecture
2. **Maintain no dependencies** on UI frameworks (stay vanilla)
3. **Scalable architecture** that can grow with new features
4. **Type-safe** throughout with comprehensive TypeScript coverage
5. **Well-tested** with unit and integration tests
6. **Documented** with READMEs serving as living ADRs

---

**Last Updated**: 2025-10-25
**Migration Status**: In Progress - Core architecture established, continuing component migration
