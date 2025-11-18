# Architecture & Design Patterns

> **Purpose**: Deep dive into architectural patterns, design philosophies, and decision rationale for the RE Remake Interactive Map.

## Table of Contents

- [Design Philosophy](#design-philosophy)
- [Architectural Patterns](#architectural-patterns)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Event System](#event-system)
- [Data Layer](#data-layer)
- [API Design](#api-design)
- [Build & Deploy](#build--deploy)
- [Development Workflow](#development-workflow)

## Design Philosophy

### Core Principles

1. **Vanilla JavaScript First**: Use native browser APIs before considering libraries
2. **Component-Based Without Frameworks**: Modular components without React/Vue/Angular
3. **Progressive Enhancement**: Build from simple to complex
4. **Separation of Concerns**: Clear boundaries between layers
5. **Type Safety**: TypeScript throughout with strict mode
6. **Composition Over Inheritance**: Prefer functional composition
7. **Immutability**: Use `as const` for data, avoid mutations

### Why Vanilla JavaScript?

**From Project Context**:

> "This is intentionally vanilla - no UI frameworks, no jQuery"

**Rationale**:

- **Performance**: No framework overhead, direct DOM manipulation
- **Learning**: Understanding browser APIs deeply
- **Control**: Full control over rendering and state
- **Bundle Size**: Minimal dependencies
- **Future-Proof**: Native APIs evolve with the platform

### Key Architectural Decisions

| Decision               | Rationale                             | Alternative Considered                  |
| ---------------------- | ------------------------------------- | --------------------------------------- |
| No jQuery              | Migrate to modern vanilla JS          | Keep jQuery (rejected - outdated)       |
| No React/Vue           | Learn native APIs, reduce bundle size | Use framework (rejected - overkill)     |
| Proxy for State        | Native reactivity without libraries   | Custom pub/sub (chosen for simplicity)  |
| EventTarget for Events | Standard browser API                  | Custom event bus (chosen for standards) |
| Express 5              | Modern async/await support            | Express 4 (rejected - older patterns)   |
| ESBuild                | Fast builds, minimal config           | Webpack (rejected - too complex)        |
| Jest                   | Industry standard testing             | Vitest (rejected - newer, less proven)  |

## Architectural Patterns

### 1. MVC/Layered Architecture (Backend)

**Pattern**: Model-View-Controller with explicit layers

```
┌─────────────────────────────────────────────┐
│              HTTP Request                    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Route Layer (src/api/routes/)              │
│  - Define endpoints                         │
│  - Apply validation (express-validator)     │
│  - Rate limiting (express-rate-limit)       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Controller Layer (src/api/controllers/)    │
│  - Parse request (req.query, req.params)    │
│  - Delegate to service                      │
│  - Format response (res.json)               │
│  - Handle errors via middleware             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Service Layer (src/api/services/)          │
│  - Business logic                           │
│  - Data filtering/validation                │
│  - Throw errors (NotFoundError, etc.)       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Data Layer (src/data/)                     │
│  - Static in-memory data (as const)         │
│  - Type definitions                         │
│  - Immutable arrays                         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              HTTP Response                   │
└─────────────────────────────────────────────┘
```

**Benefits**:

- Clear separation of concerns
- Easy to test (mock each layer independently)
- Scalable (add new layers without affecting others)
- Database-agnostic (services can swap data sources)

**From** `src/data/README.md`:

> "This structure is designed for scalability, type safety, and ease of migration to a database if needed"

### 2. Event-Driven UI (Frontend)

**Pattern**: Event delegation + Global state + Reactive rendering

```
┌─────────────────────────────────────────────┐
│          User Interaction (Click)            │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Event Handler (src/ui/*/eventHandlers/)    │
│  - Delegate events (document.addEventListener) │
│  - Extract data from DOM                    │
│  - Update global state                      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Global State (src/state/globalState.ts)    │
│  - Proxy intercepts setter                  │
│  - Dispatches CustomEvent                   │
│  - Notifies subscribers                     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Subscriber/Orchestrator                    │
│  - Listens to state changes                │
│  - Fetches data if needed (API)            │
│  - Calls renderers in sequence              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Renderers (src/ui/*/renderers/)            │
│  - Pure functions                           │
│  - Update specific DOM sections             │
│  - No side effects                          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          DOM Updated (User Sees Change)      │
└─────────────────────────────────────────────┘
```

**Benefits**:

- Reactive without framework
- Decoupled components
- Testable (mock state, test renderers)
- Performance (selective updates)

### 3. Presenter/Container Pattern

**Pattern**: Separate DOM creation (presenters) from DOM manipulation (containers)

**From** `src/ui/roomDetail/renderers/README.md`:

> "Presenters are pure functions creating DOM from data. Containers handle queries, clearing, and appending. Applied pragmatically to sections with heavy DOM logic."

**Example**:

```typescript
// Presenter (Pure Function)
function createAdjoiningRoomsList(rooms: Room[]): HTMLElement {
    const list = document.createElement('ul');
    rooms.forEach((room) => {
        const li = document.createElement('li');
        li.textContent = room.name;
        list.appendChild(li);
    });
    return list;
}

// Container (Side Effects)
function renderAdjoiningRooms(rooms: Room[]): void {
    const container = document.querySelector('.adjoining-rooms');
    if (!container) return;

    // Clear existing
    container.innerHTML = '';

    // Create and append
    const list = createAdjoiningRoomsList(rooms);
    container.appendChild(list);
}
```

**When to Use**:

- ✅ Complex DOM structures (adjoining rooms, intel lists)
- ✅ Reusable presenters (previews, modals)
- ❌ Simple renders (thumbnails, single elements)

**From README**:

> "Not forced on simple logic to avoid over-abstraction"

### 4. Singleton Pattern (State Management)

**Pattern**: Module-level singleton for global state

```typescript
// src/state/globalState.ts
const stateTarget = new EventTarget();
const state = {
    theme: 'diurnal' as const,
    difficulty: 'JV-lvl-normal' as DifficultyLevel,
    roomId: null as RoomID | null,
    // ...
};

export const globalState = new Proxy(state, {
    set(target, prop, value) {
        target[prop] = value;
        stateTarget.dispatchEvent(new CustomEvent(prop, { detail: value }));
        return true;
    },
});

export function subscribeState<K extends keyof typeof state>(
    key: K,
    callback: (value: (typeof state)[K]) => void,
): void {
    stateTarget.addEventListener(key, (event: CustomEvent) => {
        callback(event.detail);
    });
}
```

**Benefits**:

- Single source of truth
- Type-safe (TypeScript enforces keys/values)
- Reactive (Proxy + EventTarget)
- No external dependencies

**From** `src/state/globalState.ts` (conceptual):

> "Singleton pattern via module scope, Proxy for reactivity, EventTarget for pub/sub"

### 5. Orchestrator Pattern

**Pattern**: Coordinate multiple renderers without business logic

**From** `src/ui/roomDetail/orchestrator/README.md`:

> "The orchestrator acts as a conductor for rendering room details, delegating to specialized renderers and processors without containing business logic."

```typescript
// src/ui/roomDetail/orchestrator/orchestrator.ts
export function renderRoomData(roomData: RoomData, difficulty: DifficultyLevel): void {
    // Reset UI
    resetRoomDetailUI();

    // Process data
    const filteredItems = processItems(roomData.items, difficulty);
    const filteredBiohazards = processBiohazards(roomData.biohazards, difficulty);

    // Delegate to renderers (each handles one section)
    renderThumbnail(roomData.thumbnail);
    renderTitle(roomData.name);
    renderThreatLevel(filteredBiohazards);
    renderItemsGrid(filteredItems);
    renderBiohazardsGrid(filteredBiohazards);
    renderIntel(roomData.intel);
    renderAdjoiningRooms(roomData.adjoiningRooms);
    // ...
}
```

**Benefits**:

- Single entry point for complex rendering
- Easy to extend (add new renderer call)
- Testable (mock renderers)
- Follows SRP (Single Responsibility Principle)

### 6. Registry Pattern (Event Handlers)

**Pattern**: Centralized registry for event handlers

**From** `src/eventHandlers/README.md`:

> "Handlers are registered in an array for central management, populated dynamically from imported tuples."

```typescript
// Component exports tuple
// src/ui/roomDetail/eventHandlers/index.ts
export const openRoomHandler: [string, EventListener] = [
    '[data-room-id]',
    (event: Event) => {
        const target = event.target as HTMLElement;
        const roomId = target.dataset.roomId;
        globalState.roomId = roomId;
    },
];

// Global handler imports and registers
// src/eventHandlers/globalEventHandlers.ts
import { openRoomHandler } from '../ui/roomDetail/eventHandlers';

const handlers = [
    openRoomHandler,
    // ... other handlers
];

export function initializeGlobalEventListeners(): void {
    handlers.forEach(([selector, handler]) => {
        document.addEventListener('click', (event) => {
            const target = (event.target as HTMLElement).closest(selector);
            if (target) handler.call(target, event);
        });
    });
}
```

**Benefits**:

- Centralized event management
- Easy to add/remove handlers
- Tuple pattern prevents selector mismatches
- Event delegation for performance

**Alternative Mentioned**:

> "For larger apps, consider an event bus with EventTarget and CustomEvent for pub/sub decoupling"

### 7. Client-Side API Layer Pattern

**Pattern**: Centralized API communication layer separate from UI components

**Location**: `src/client/`

**Structure**:

```
src/client/
├── api/                         # API communication functions
│   ├── roomApi.ts              # Room data fetching
│   └── fallbackData.ts         # Default/error state data
└── types/                       # Shared frontend types
    └── api.ts                   # API response interfaces
```

**Philosophy**:

Following the backend's layered architecture (controllers → services → data), the frontend has a dedicated client layer that:

- Centralizes all API calls
- Provides caching and error handling
- Maintains shared types
- Enables reusability across UI components

**Benefits**:

- **Separation of Concerns**: API logic separate from rendering logic
- **Reusability**: Multiple components can use the same API functions
- **Testability**: API layer can be mocked/tested independently
- **Type Safety**: Centralized type definitions for API contracts
- **Maintainability**: Changes to API structure isolated to one location

**Example Usage**:

```typescript
// src/ui/roomDetail/eventHandlers/openRoomDetailHandler.ts
import { fetchRoomData } from 'client/api/roomApi';
import { RoomResponse } from 'client/types/api';

const data: RoomResponse = await fetchRoomData(roomId);
```

**Contrasted with UI Components**:

- `src/client/` → API calls, data fetching, caching
- `src/ui/` → Rendering, event handling, DOM manipulation
- `src/state/` → Global state management
- `src/data/` → Static data definitions

### 8. MCP Server Pattern

**Pattern**: Model Context Protocol server for AI assistant integration

**Location**: `mcp-server/`

**Structure**:

```
mcp-server/
├── src/
│   ├── index.ts          # Main MCP server (stdio transport)
│   ├── config.ts         # Configuration (env vars)
│   ├── client.ts         # HTTP client (rate limiting)
│   ├── types.ts          # Type definitions (matches OpenAPI)
│   └── tools/
│       ├── index.ts      # Tool registry
│       ├── items.ts      # Items API tools
│       ├── biohazards.ts # Biohazards API tools
│       └── maps.ts       # Maps API tools
└── package.json          # Standalone package
```

**Philosophy**:

The MCP server acts as a bridge between AI assistants (like Claude) and the Express API:

- **Tool-based Interface**: Each API endpoint exposed as a named tool with typed inputs
- **Rate Limiting**: Client-side enforcement matching Express limits (100 req/15min)
- **Error Transparency**: Preserves detailed API errors for debugging
- **Type Safety**: Full TypeScript types matching OpenAPI specification
- **Standalone**: Independent package, can run in any environment

**Benefits**:

- **AI-Assisted Development**: Query API through Claude during development
- **Documentation as Code**: Tool schemas serve as API documentation
- **Testing**: Natural language API testing through Claude
- **Data Exploration**: Interactive data queries without writing code
- **Future-Ready**: Authentication, caching, webhooks can be added

**Example Tool Definition**:

```typescript
{
  name: 'search_items',
  description: 'Search items by name and/or type with optional difficulty filtering',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Search by name' },
      type: { type: 'string', enum: ['weapon', 'ammo', 'health', ...] },
      difficulty: { type: 'string', enum: ['JV-lvl-very-easy', ...] }
    }
  },
  handler: async (args) => {
    const data = await client.request('/api/items/search', args);
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
}
```

**⚠️ CRITICAL: OpenAPI Specification Dependency**:

MCP tools have a **strict 1:1 dependency** on the OpenAPI specification. **All parameters must match exactly**.

**When Adding/Modifying API Endpoints**:

1. ✅ Update Express routes/controllers/middleware
2. ✅ **Update `openapi.yaml`** with EXACT parameter names, types, enum values
3. ✅ **Update MCP tool** in `mcp-server/src/tools/` to match OpenAPI **EXACTLY**:
    - ❗ Parameter names must match query parameter names (e.g., `code` not `classification`)
    - ❗ Enum values must match exact case (e.g., `Weapon` not `weapon`)
    - ❗ All optional/required parameters must be included
    - ❗ Descriptions must reference actual valid values
4. ✅ Update types in `mcp-server/src/types.ts` if schemas changed
5. ✅ Document in `docs/MCP_SERVER.md` with examples
6. ✅ Rebuild: `cd mcp-server && npm run build`
7. ✅ **Test with actual API calls** to verify schema correctness

**Why Schema Matching is Critical**:

```typescript
// ❌ WRONG - Generic enum values
enum: ['weapon', 'ammo', 'health']
// API returns 400: Invalid enum value

// ✅ CORRECT - Exact API enum values
enum: ['Weapon', 'Ammunition', 'GreenHerb', 'RedHerb', 'BlueHerb', 'FirstAidSpray']
// Matches openapi.yaml exactly

// ❌ WRONG - Parameter name doesn't exist
{ classification: string }
// API returns 400: Unrecognized query parameter

// ✅ CORRECT - Actual API parameter name
{ code: string }
// Matches openapi.yaml parameter name
```

**Consequences of Mismatch**:

- 400 Bad Request errors for users
- Invalid query parameter errors
- Missing functionality (parameters not exposed)
- Runtime failures during tool execution
- Wasted tokens and slow response times

**Rate Limiting**:

MCP server implements client-side rate limiting matching Express:

- **Window**: 15 minutes
- **Limit**: 100 requests
- **Behavior**: Throws error when limit exceeded with wait time

**Error Handling**:

Errors are preserved from API responses:

- HTTP errors → Detailed error messages
- Timeout → "Request timed out"
- Rate limit → "Rate limit exceeded, wait X seconds"
- Network errors → Connection details

**Future Enhancements**:

- **Authentication**: Bearer token support (ready, awaiting API auth)
- **Caching**: Response caching for repeated queries
- **Webhooks**: Real-time updates via MCP notifications
- **Batch Operations**: Multi-request tools

## Component Architecture

### Component Structure

Each UI component follows this structure:

```
src/ui/componentName/
├── eventHandlers/          # Event handling
│   ├── clickHandler.ts
│   └── index.ts            # Exports tuples
├── renderers/              # DOM rendering
│   ├── renderSection1.ts
│   ├── renderSection2.ts
│   └── index.ts
├── processors/             # Data processing
│   └── processData.ts
├── presenters/             # DOM element creation
│   └── itemPresenter.ts
├── orchestrator/           # Coordination (if complex)
│   └── orchestrator.ts
├── helpers/                # Shared utility functions
│   └── helperFunctions.ts
├── logic/                  # Business logic
│   └── api/                # API client
│       └── apiClient.ts
├── templates/              # HTML partials
│   └── template.html
└── types/                  # Component types
    └── types.ts
```

### Import Path Conventions

**Critical for AI-assisted development**: Always use absolute path imports with TypeScript path mappings.

#### Path Mapping Setup

Path mappings are configured in both `tsconfig.json` and `jest.config.ts` to enable clean imports:

```json
// tsconfig.json
"paths": {
    "src/*": ["src/*"],
    "roomDetail/*": ["src/ui/roomDetail/*"],
    "roomSummary/*": ["src/ui/roomSummary/*"],
    "difficultySelect/*": ["src/ui/difficultySelect/*"],
    "shared/*": ["src/ui/shared/*"]
}
```

#### Import Patterns

```typescript
// ✅ CORRECT - Use absolute paths with path mappings
import { renderRoomSummary } from 'roomSummary/orchestrator/orchestrator';
import { fetchRoomData } from 'roomDetail/logic/api/roomApi';
import { animateGears } from 'shared/renderers/gearsAnimatorRenderer';
import { getState } from 'src/state/globalState';
import { RoomDetailsData } from 'src/data/types';

// ❌ INCORRECT - Avoid relative paths
import { renderRoomSummary } from '../orchestrator/orchestrator';
import { fetchRoomData } from '../../roomDetail/logic/api/roomApi';
```

#### When Adding New Components

1. Create component directory: `src/ui/newComponent/`
2. Add to `tsconfig.json` paths: `"newComponent/*": ["src/ui/newComponent/*"]`
3. Add to `jest.config.ts` moduleNameMapper: `'^newComponent/(.*)$': '<rootDir>/src/ui/newComponent/$1'`
4. Use absolute imports throughout: `import { foo } from 'newComponent/renderers/foo';`
5. Verify with `npm run typecheck` and `npm test`

**Why This Matters for AI**:

- Consistent import style across codebase
- No confusion about relative path depth (`../` vs `../../`)
- Easier for AI to generate correct imports
- Better refactoring support (moving files doesn't break imports)
- Component boundaries are explicit

### Example: roomDetail Component

**Most complex component** in the project:

```
src/ui/roomDetail/
├── orchestrator/
│   ├── README.md           # Philosophy & approach
│   └── orchestrator.ts     # renderRoomData()
├── renderers/
│   ├── README.md           # Presenter/Container pattern
│   ├── renderThumbnail.ts
│   ├── renderTitle.ts
│   ├── renderThreatLevel.ts
│   ├── renderItemsGrid.ts
│   ├── renderBiohazardsGrid.ts
│   ├── renderIntel.ts
│   ├── renderAdjoiningRooms.ts
│   └── ... (15+ renderers)
├── processors/
│   ├── processItems.ts     # Filter by difficulty
│   └── processBiohazards.ts
├── eventHandlers/
│   ├── openRoomHandler.ts
│   ├── closeRoomHandler.ts
│   └── index.ts
├── logic/api/
│   ├── roomApi.ts          # Fetch with caching
│   └── fallbackData.ts     # Error fallback
└── templates/
    └── roomDetail.html     # HTML partial
```

**Rendering Flow**:

1. Event handler updates `globalState.roomId`
2. State subscription calls API client
3. API returns room data
4. Orchestrator processes data
5. Each renderer updates its DOM section
6. User sees updated room detail

## State Management

### Global State Properties

```typescript
interface GlobalState {
    theme: 'diurnal' | 'nocturnal';
    difficulty: DifficultyLevel;
    character: CharacterCode;
    roomData: RoomDetailsData | null;
    roomId: RoomID | null;
    roomDetailActive: boolean;
}
```

### Reactivity Implementation

**Using Proxy**:

```typescript
const globalState = new Proxy(state, {
    set(target, prop, value) {
        // Update state
        target[prop] = value;

        // Notify subscribers via EventTarget
        stateTarget.dispatchEvent(new CustomEvent(prop, { detail: value }));

        return true;
    },
});
```

**Subscription**:

```typescript
subscribeState('roomId', (newRoomId) => {
    if (newRoomId) {
        fetchRoomData(newRoomId);
    }
});
```

### Why This Pattern?

| Approach              | Pros                           | Cons                         | Chosen? |
| --------------------- | ------------------------------ | ---------------------------- | ------- |
| Proxy + EventTarget   | Native APIs, type-safe, simple | Limited to object properties | ✅ Yes  |
| Custom Event Bus      | Decoupled, flexible            | More boilerplate             | No      |
| Redux-like Store      | Predictable, time-travel       | Heavy, verbose               | No      |
| MobX-like Observables | Automatic tracking             | External dependency          | No      |

**From Context**:

> "Uses Proxy for reactivity and EventTarget for pub/sub - no external dependencies"

## Event System

### Event Delegation

**From** `src/eventHandlers/README.md`:

**Pattern**: Single document listener with `closest()` matching

```typescript
document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest('[data-room-id]');
    if (target) {
        const roomId = target.dataset.roomId;
        globalState.roomId = roomId;
    }
});
```

**Benefits**:

- Performance (one listener for many elements)
- Works with dynamic DOM (future elements matched)
- Memory efficient

**For Non-Bubbling Events**:

```typescript
// mouseenter/mouseleave don't bubble
const elements = document.querySelectorAll('[data-hover]');
elements.forEach((el) => {
    el.addEventListener('mouseenter', hoverHandler);
});
```

### Debouncing

**From** `src/utils/eventUtils.ts`:

```typescript
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
```

**Usage**:

```typescript
const debouncedSearch = debounce(searchHandler, 300);
input.addEventListener('input', debouncedSearch);
```

## Data Layer

### Immutability with `as const`

**From** `src/data/README.md`:

```typescript
export const itemsRoomData = [
    {
        id: 'selfDefenseJV-keepersRoom',
        difficultyLevel: ['JV-lvl-very-easy', 'JV-lvl-easy'],
        name: 'Battery Pack',
        type: 'SelfDefense',
    },
] as const;
```

**Benefits**:

- **Readonly**: Can't `push()`, can't mutate properties
- **Literal Types**: `difficultyLevel` is `readonly ['JV-lvl-very-easy', 'JV-lvl-easy']` not `string[]`
- **Type Safety**: Only valid difficulty values in filters
- **Compile-Time Errors**: Mutations caught during development

### Type Safety

**Enums vs String Literal Types**:

**Choice**: String literal types (union types)

```typescript
// ✅ Used in project
type DifficultyLevel = 'JV-lvl-very-easy' | 'JV-lvl-easy' | 'JV-lvl-normal' | 'JV-lvl-hard';

// ❌ Not used (enums)
enum DifficultyLevel {
    VeryEasy = 'JV-lvl-very-easy',
    Easy = 'JV-lvl-easy',
}
```

**Rationale**:

- Better serialization to JSON
- Type safety without runtime code
- TypeScript best practice (per 2025 standards)

### Database Migration Path

**Current**: Static in-memory arrays

**Future**: Database (MongoDB, PostgreSQL, etc.)

**Migration Strategy**:

1. Services already abstract data access
2. Replace arrays with DB queries in services
3. Controllers/routes unchanged
4. Add database connection in `server.ts`

```typescript
// Current
export async function getItemsByIds(ids: string[]) {
    const found = itemsRoomData.filter((item) => ids.includes(item.id));
    return { foundResources: found };
}

// After DB migration
export async function getItemsByIds(ids: string[]) {
    const found = await db.items.find({ id: { $in: ids } });
    return { foundResources: found };
}
```

**No changes needed**:

- Controllers
- Routes
- Validation
- Error handling
- Tests (just mock DB instead of arrays)

## API Design

### RESTful Principles

**From** `docs/project-standards-and-setup.md`:

Follows REST principles (RFC 7231):

- Resource-based URLs (`/api/items`, `/api/biohazards`)
- HTTP methods (GET for retrieval)
- Query parameters for filtering (`?ids=...`, `?difficulty=...`)
- JSON responses
- Proper status codes (200, 400, 404, 429)

### Endpoint Structure

**Pattern**: `/api/{resource}/{action}?{filters}`

```
GET /api/items/all
GET /api/items?ids=id1,id2
GET /api/items/search?room=keepersRoom&difficulty=JV-lvl-easy&type=Weapon

GET /api/maps/rooms/all
GET /api/maps/rooms?ids=keepersRoom
GET /api/maps/rooms/search?map=mansionF1&items=true
```

### Response Structure

**Batch Operations**:

```json
{
    "foundResources": [...],
    "unrecognizedIds": [...]
}
```

**Search Operations**:

```json
{
    "results": [...]
}
```

**Errors**:

```json
{
    "error": "Error message",
    "statusCode": 400
}
```

### Input Validation

**Using express-validator**:

```typescript
// src/utils/validators.ts
export const idsValidator = [
    query('ids')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('IDs must be a non-empty string'),
];

// src/api/routes/itemsRoutes.ts
router.get('/items', idsValidator, getItems);
```

**Benefits**:

- Type-safe validation
- Reusable validators
- Automatic error responses
- Centralized messages

### Rate Limiting

**Configuration**:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: 'Too many requests, please try again later.',
});

app.use('/api/', limiter);
```

**Testing Note**:
Rate limiting tested manually (browser console), not in Jest due to state persistence issues. See `docs/rate-limiting-test-challenges.md`.

### API Documentation

**OpenAPI Specification**: `openapi.yaml`

**Served via Swagger UI**: `http://localhost:3000/api-docs`

**Benefits**:

- Interactive testing
- Auto-generated from YAML
- Standard format (OpenAPI 3.0)

## Build & Deploy

### ESBuild Configuration

**From** `esbuild.config.js`:

```javascript
esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/main.js',
    platform: 'browser',
    format: 'esm',
    loader: {
        '.css': 'css',
        '.html': 'text',
    },
    plugins: [templateManifestPlugin, templateCopyPlugin, imageCopyPlugin, excludeTestsPlugin],
});
```

### Custom Plugins

**1. Template Manifest Generation**:

- Auto-discovers `src/ui/**/templates/*.html`
- Generates manifest for template loader
- Enables dynamic template loading

**2. Template HTML Copying**:

- Copies templates to `dist/`
- Maintains directory structure

**3. Image Asset Copying**:

- Copies `src/img/` to `dist/img/`

**4. Test File Exclusion**:

- Excludes `__tests__/` from bundle
- Reduces bundle size

### Development vs Production

| Aspect           | Development       | Production     |
| ---------------- | ----------------- | -------------- |
| **Runtime**      | Bun (fast reload) | Node.js        |
| **TypeScript**   | ts-node/esm       | Compiled to JS |
| **Bundling**     | On-demand         | Pre-bundled    |
| **Source Maps**  | Yes               | Optional       |
| **Minification** | No                | Yes (esbuild)  |

### Scripts

```bash
# Development
npm run dev          # Bun with watch mode
npm start            # Node with ts-node

# Production
npm run build        # Typecheck + transpile + bundle
node dist/server.js  # Run bundled server

# Testing
npm test             # Jest
npm run test:coverage # Coverage report

# Code Quality
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # TypeScript
```

## Development Workflow

### Git Workflow

This project follows **Conventional Commits** specification for all commits and pull requests.

**Commit Format**:

```
<type>(<scope>): <subject>
```

**Important**: Subject must use **imperative mood** (command form):

- ✅ "add feature" (correct)
- ❌ "added feature" (wrong - past tense)
- ❌ "adds feature" (wrong - present tense)

**Examples**:

```bash
feat(roomDetail): add biohazard threat level indicator
fix(api): resolve caching issue in room data endpoint
docs(architecture): update state management documentation
refactor(state): simplify subscription manager
test(services): add unit tests for items service
```

All examples above use imperative mood: "add", "resolve", "update", "simplify", "add"

**Branch Naming**:

- `feature/*` - New features (e.g., `feature/add-boss-encounters`)
- `fix/*` - Bug fixes (e.g., `fix/room-detail-rendering`)
- `refactor/*` - Code refactoring (e.g., `refactor/state-management`)
- `docs/*` - Documentation (e.g., `docs/update-architecture`)
- `test/*` - Test improvements (e.g., `test/add-service-coverage`)

**Common Types**:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code formatting (no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding/updating tests
- `build` - Build system or dependencies
- `ci` - CI/CD changes
- `chore` - Maintenance tasks

**Common Scopes**:

- Backend: `api`, `routes`, `controllers`, `services`, `middleware`, `data`
- Frontend: `ui`, `roomDetail`, `difficultySelect`, `themeSelect`, `state`, `events`
- Infrastructure: `build`, `test`, `docs`, `deps`

**See**: [CONTRIBUTING.md](../CONTRIBUTING.md) for complete workflow guide and [COMMITS.md](./COMMITS.md) for quick reference.

## Design Decisions Summary

### What We Chose

✅ **Vanilla JavaScript** over frameworks
✅ **TypeScript** with strict mode
✅ **Proxy + EventTarget** for state
✅ **Express 5** with async/await
✅ **ESBuild** for fast builds
✅ **Jest** for testing
✅ **Static data** with `as const`
✅ **Component-based** architecture
✅ **Event delegation** for performance
✅ **Presenter/Container** for complex UI
✅ **Orchestrator** for coordination

### What We Avoided

❌ jQuery (outdated, being migrated away)
❌ React/Vue/Angular (unnecessary overhead)
❌ Redux/MobX (too complex for this scale)
❌ Webpack (slower, more config)
❌ Enums (prefer string literal types)
❌ Global namespace pollution (use modules)
❌ Direct DOM manipulation everywhere (use renderers)
❌ Tight coupling (use pub/sub)

## Future Architectural Considerations

### If the Project Grows

**Consider**:

1. **Event Bus**: For decoupled cross-component communication
2. **Web Components**: For true encapsulation
3. **Database**: PostgreSQL or MongoDB for data layer
4. **Authentication**: JWT tokens for user accounts
5. **State History**: For undo/redo functionality
6. **Virtual DOM**: If performance becomes an issue
7. **Service Workers**: For offline support
8. **WebSockets**: For real-time features

**Don't Consider** (Against Project Philosophy):

- Full UI framework (React/Vue)
- jQuery reintroduction
- Heavy state management library
- Opinionated backend framework

---

**See Also**:

- [AI_CONTEXT.md](./AI_CONTEXT.md) - Main project context
- [TESTING.md](./TESTING.md) - Testing guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - How to contribute
- `docs/project-standards-and-setup.md` - Standards
- Various `README.md` files - Component-specific patterns

**Last Updated**: 2025-10-25
