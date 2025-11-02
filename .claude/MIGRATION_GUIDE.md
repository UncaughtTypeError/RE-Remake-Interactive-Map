# jQuery to TypeScript Migration Guide

> **Purpose**: Practical guide for migrating from jQuery monolith to TypeScript component architecture.

## Table of Contents

- [Migration Overview](#migration-overview)
- [Pattern Translation](#pattern-translation)
- [Common jQuery Patterns](#common-jquery-patterns)
- [Component Migration Checklist](#component-migration-checklist)
- [State Management Migration](#state-management-migration)
- [Event Handling Migration](#event-handling-migration)
- [Animation Migration](#animation-migration)
- [DOM Manipulation Migration](#dom-manipulation-migration)
- [AJAX Migration](#ajax-migration)
- [Testing Migrated Code](#testing-migrated-code)

## Migration Overview

### What We're Migrating From

**Old Architecture** (deleted files):

```
Root/
├── index.html (~17,000 lines)        # Monolithic HTML
│   ├── Inlined CSS (themes)
│   ├── Inlined jQuery code
│   └── All markup
├── mansion-1f.html                   # Static room pages
├── courtyard-1b.html
├── guardhouse-residence-1f.html
└── ... (15+ static HTML files)
```

**Characteristics**:

- Single massive HTML file
- jQuery for all interactivity
- Inlined styles and scripts
- No component separation
- No build process
- No type safety

### What We're Migrating To

**New Architecture** (current):

```
src/
├── main.ts                           # Client entry point
├── server.ts                         # API entry point
├── index.html                        # Clean HTML
│
├── client/                           # NEW: Client-side API layer
│   ├── api/                          # API communication
│   │   ├── roomApi.ts               # Room data fetching
│   │   └── fallbackData.ts          # Fallback data
│   └── types/                        # Shared frontend types
│       └── api.ts                    # API response interfaces
│
├── ui/                               # Component-based
│   ├── roomDetail/
│   ├── difficultySelect/
│   └── ... (modular components)
│
├── state/                            # Reactive state
├── api/                              # Express 5 backend
├── data/                             # Type-safe data
└── __tests__/                        # Test coverage
```

**Characteristics**:

- TypeScript with strict mode
- Vanilla JavaScript (no jQuery)
- Component-based architecture
- Reactive state management
- ESBuild for bundling
- Comprehensive testing

### Migration Status

**Completed**:

- ✅ Core architecture established
- ✅ Express 5 API layer
- ✅ Global state management
- ✅ Build system (ESBuild)
- ✅ Testing infrastructure
- ✅ Major components (roomDetail, difficultySelect, etc.)

**In Progress**:

- 🔄 Migrating remaining jQuery code
- 🔄 Adding tests for new components
- 🔄 Documenting patterns

**Not Started**:

- ⏳ Some specialized UI components
- ⏳ Complete test coverage
- ⏳ Performance optimizations

## Pattern Translation

### Quick Reference Table

| jQuery Pattern                     | Vanilla JS Equivalent                 | Where to Use       |
| ---------------------------------- | ------------------------------------- | ------------------ |
| `$(selector)`                      | `document.querySelector(selector)`    | Single element     |
| `$(selector)`                      | `document.querySelectorAll(selector)` | Multiple elements  |
| `.click(fn)`                       | `.addEventListener('click', fn)`      | Direct attachment  |
| `$(document).on('click', sel, fn)` | Event delegation (see below)          | Global events      |
| `.addClass(name)`                  | `.classList.add(name)`                | Class manipulation |
| `.removeClass(name)`               | `.classList.remove(name)`             | Class removal      |
| `.toggleClass(name)`               | `.classList.toggle(name)`             | Class toggle       |
| `.fadeIn()`                        | `fadeIn(el, duration)` (from utils)   | Animations         |
| `.fadeOut()`                       | `fadeOut(el, duration)` (from utils)  | Animations         |
| `.hide()`                          | `.style.display = 'none'`             | Hide element       |
| `.show()`                          | `.style.display = ''`                 | Show element       |
| `.text(value)`                     | `.textContent = value`                | Set text           |
| `.html(value)`                     | `.innerHTML = value`                  | Set HTML           |
| `.val()`                           | `.value`                              | Form values        |
| `.attr(name, value)`               | `.setAttribute(name, value)`          | Attributes         |
| `.data(key, value)`                | `.dataset.key = value`                | Data attributes    |
| `$.ajax()`                         | `fetch()`                             | API calls          |

## Common jQuery Patterns

### 1. DOM Selection and Manipulation

#### Old jQuery:

```javascript
jQuery('.room-title').text("Keeper's Room");
jQuery('.room-detail').addClass('active');
jQuery('.room-thumbnail').attr('src', imageUrl);
```

#### New Vanilla TypeScript:

```typescript
const title = document.querySelector('.room-title');
if (title) {
    title.textContent = "Keeper's Room";
}

const detail = document.querySelector('.room-detail');
detail?.classList.add('active');

const thumbnail = document.querySelector('.room-thumbnail') as HTMLImageElement;
if (thumbnail) {
    thumbnail.src = imageUrl;
}
```

**Pattern**: Always null-check with `if` or optional chaining (`?.`)

### 2. Event Handling (Direct)

#### Old jQuery:

```javascript
jQuery('.difficulty-select').click(function () {
    const difficulty = jQuery(this).data('difficulty');
    jQuery('.difficulty-select').removeClass('active');
    jQuery(this).addClass('active');
});
```

#### New Vanilla TypeScript:

```typescript
// In eventHandlers file
export const difficultySelectHandler: [string, EventListener] = [
    '.difficulty-select',
    (event: Event) => {
        const target = event.currentTarget as HTMLElement;
        const difficulty = target.dataset.difficulty as DifficultyLevel;

        // Update state (triggers reactive updates)
        globalState.difficulty = difficulty;

        // UI updates handled by state subscription
    },
];
```

**Better Pattern**: Use global state instead of direct DOM manipulation

### 3. Event Delegation

#### Old jQuery:

```javascript
jQuery(document).on('click', '.room-card', function () {
    const roomId = jQuery(this).data('room-id');
    openRoomDetail(roomId);
});
```

#### New Vanilla TypeScript:

```typescript
// In src/eventHandlers/globalEventHandlers.ts
export const openRoomHandler: [string, EventListener] = [
    '[data-room-id]',
    (event: Event) => {
        const target = (event.target as HTMLElement).closest('[data-room-id]');
        if (!target) return;

        const roomId = (target as HTMLElement).dataset.roomId as RoomID;
        globalState.roomId = roomId;
    },
];

// Register in globalEventHandlers
document.addEventListener('click', (event) => {
    const [selector, handler] = openRoomHandler;
    const target = (event.target as HTMLElement).closest(selector);
    if (target) handler.call(target, event);
});
```

**Pattern**: Export tuple `[selector, handler]` from component, register globally

### 4. Show/Hide with Animation

#### Old jQuery:

```javascript
jQuery('.welcome-overlay').fadeOut(500);
jQuery('.room-detail').fadeIn('slow');
```

#### New Vanilla TypeScript:

```typescript
import { fadeOut, fadeIn } from 'src/utils/animationUtils';

// In async function
await fadeOut(welcomeOverlay, 500);
await fadeIn(roomDetail, 500);
```

**Pattern**: Use Web Animations API utilities from `src/utils/animationUtils.ts`

### 5. AJAX Calls

#### Old jQuery:

```javascript
jQuery.ajax({
    url: '/api/rooms?id=' + roomId,
    method: 'GET',
    success: function (data) {
        renderRoom(data);
    },
    error: function (err) {
        console.error(err);
    },
});
```

#### New Vanilla TypeScript:

```typescript
// In API client (src/ui/roomDetail/logic/api/roomApi.ts)
export async function fetchRoomData(roomId: RoomID): Promise<RoomResponse> {
    // Check cache
    if (roomCache.has(roomId)) {
        return roomCache.get(roomId)!;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/maps/rooms?ids=${roomId}`, {
            signal: AbortSignal.timeout(10000), // 10s timeout
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Cache result
        roomCache.set(roomId, data);

        return data;
    } catch (error) {
        console.error('Failed to fetch room data:', error);
        throw error;
    }
}

// Usage in component
try {
    const roomData = await fetchRoomData(roomId);
    renderRoomData(roomData, globalState.difficulty);
} catch (error) {
    // Handle error
}
```

**Pattern**: Use `fetch()` with error handling and caching

### 6. Iteration

#### Old jQuery:

```javascript
jQuery('.item-card').each(function () {
    const itemId = jQuery(this).data('item-id');
    // Process each item
});
```

#### New Vanilla TypeScript:

```typescript
const itemCards = document.querySelectorAll('.item-card');
itemCards.forEach((card) => {
    const itemId = (card as HTMLElement).dataset.itemId;
    // Process each item
});

// Or with for...of
for (const card of itemCards) {
    const itemId = (card as HTMLElement).dataset.itemId;
    // Process each item
}
```

**Pattern**: Use `forEach` or `for...of` on `NodeList`

### 7. Document Ready

#### Old jQuery:

```javascript
jQuery(document).ready(function () {
    initializeApp();
});
```

#### New Vanilla TypeScript:

```typescript
// In src/main.ts
function onDomReady() {
    // Initialize app
}

document.addEventListener('DOMContentLoaded', onDomReady, { once: true });
```

**Pattern**: Use `DOMContentLoaded` event with `{ once: true }`

### 8. Window Load

#### Old jQuery:

```javascript
jQuery(window).on('load', function () {
    startAnimations();
});
```

#### New Vanilla TypeScript:

```typescript
function onWindowLoad() {
    startAnimations();
}

window.addEventListener('load', onWindowLoad, { once: true });
```

### 9. Creating Elements

#### Old jQuery:

```javascript
const item = jQuery('<div>').addClass('item-card').attr('data-item-id', itemId).text(itemName);

jQuery('.items-grid').append(item);
```

#### New Vanilla TypeScript:

```typescript
function createItemCard(item: ItemRoomData): HTMLElement {
    const card = document.createElement('div');
    card.classList.add('item-card');
    card.dataset.itemId = item.id;
    card.textContent = item.name;
    return card;
}

// Usage (in renderer)
const grid = document.querySelector('.items-grid');
const card = createItemCard(item);
grid?.appendChild(card);
```

**Better Pattern**: Use presenter function (returns element)

### 10. Toggling

#### Old jQuery:

```javascript
jQuery('.toggle-button').click(function () {
    jQuery('.menu').toggleClass('open');
    jQuery(this).toggleClass('active');
});
```

#### New Vanilla TypeScript:

```typescript
export const toggleMenuHandler: [string, EventListener] = [
    '.toggle-button',
    (event: Event) => {
        const menu = document.querySelector('.menu');
        menu?.classList.toggle('open');

        const button = event.currentTarget as HTMLElement;
        button.classList.toggle('active');
    },
];
```

## Component Migration Checklist

When migrating a component from jQuery to TypeScript:

### 1. Identify Component Boundaries

- [ ] What is the component's responsibility?
- [ ] What state does it manage?
- [ ] What events does it handle?
- [ ] What does it render?

### 2. Create Component Structure

```
src/ui/componentName/
├── eventHandlers/
│   ├── handler1.ts
│   └── index.ts          # Export tuples
├── renderers/
│   ├── renderSection1.ts
│   └── index.ts
├── processors/           # If needed
│   └── processData.ts
├── logic/                # If needed
│   └── api/
├── templates/            # If needed
│   └── template.html
└── types/                # If needed
    └── types.ts
```

### 2.1. Configure Import Paths (CRITICAL)

- [ ] Add path mapping to `tsconfig.json`:
    ```json
    "componentName/*": ["src/ui/componentName/*"]
    ```
- [ ] Add module mapper to `jest.config.ts`:
    ```typescript
    '^componentName/(.*)$': '<rootDir>/src/ui/componentName/$1'
    ```
- [ ] **Always use absolute imports** in all component files:

    ```typescript
    // ✅ CORRECT
    import { renderFoo } from 'componentName/renderers/fooRenderer';
    import { handleClick } from 'componentName/eventHandlers/clickHandler';
    import { fetchData } from 'roomDetail/logic/api/roomApi';
    import { getState } from 'src/state/globalState';

    // ❌ INCORRECT - Never use relative paths
    import { renderFoo } from '../renderers/fooRenderer';
    import { handleClick } from './clickHandler';
    import { fetchData } from '../../roomDetail/logic/api/roomApi';
    ```

- [ ] Verify with `npm run typecheck` and `npm test`

**Why This Matters**:

- Consistency across entire codebase
- AI can generate correct imports without knowing file structure depth
- Refactoring-friendly (moving files doesn't break imports)
- IDE autocomplete works better
- Component boundaries are explicit

### 3. Extract Data

- [ ] Identify data structures
- [ ] Create types in `src/data/types.ts` or component `types/`
- [ ] Move data to `src/data/` with `as const`

### 4. Create Event Handlers

- [ ] Convert jQuery event handlers to vanilla JS
- [ ] Export as tuples: `[selector: string, handler: EventListener]`
- [ ] Register in `src/eventHandlers/globalEventHandlers.ts`

### 5. Create Renderers

- [ ] Separate DOM creation (presenters) from manipulation (containers)
- [ ] Make renderers pure functions (input → DOM update)
- [ ] Use type-safe parameters

### 6. Integrate State

- [ ] Identify state dependencies
- [ ] Update handlers to modify `globalState`
- [ ] Subscribe to state changes for reactive updates

### 7. Add Tests

- [ ] Unit tests for renderers (mock data → DOM check)
- [ ] Unit tests for event handlers (mock events → state check)
- [ ] Integration tests if component has API calls

### 8. Update Documentation

- [ ] Create component README if patterns are novel
- [ ] Document in this migration guide if common pattern

## State Management Migration

### Old jQuery Pattern (Global Variables)

```javascript
// Old: Global variables scattered everywhere
var currentDifficulty = 'JV-lvl-normal';
var currentRoomId = null;
var isRoomDetailOpen = false;

// Scattered updates
jQuery('.difficulty-select').click(function () {
    currentDifficulty = jQuery(this).data('difficulty');
    updateItemsDisplay(); // Manual update
    updateBiohazardsDisplay(); // Manual update
});
```

### New Pattern (Reactive State)

```typescript
// src/state/globalState.ts
interface GlobalState {
    difficulty: DifficultyLevel;
    roomId: RoomID | null;
    roomDetailActive: boolean;
}

const state: GlobalState = {
    difficulty: 'JV-lvl-normal',
    roomId: null,
    roomDetailActive: false,
};

// Proxy for reactivity
export const globalState = new Proxy(state, {
    set(target, prop, value) {
        target[prop] = value;
        stateTarget.dispatchEvent(new CustomEvent(prop, { detail: value }));
        return true;
    },
});

// Subscribe to changes
subscribeState('difficulty', (newDifficulty) => {
    renderItems(newDifficulty);
    renderBiohazards(newDifficulty);
});

// Update state (triggers subscribers automatically)
globalState.difficulty = 'JV-lvl-hard';
```

**Benefits**:

- Centralized state
- Automatic updates
- Type-safe
- Decoupled components

## Event Handling Migration

### Pattern: Direct Event Binding

**Old jQuery**:

```javascript
jQuery('.room-card').click(function () {
    const roomId = jQuery(this).data('room-id');
    openRoom(roomId);
});
```

**New Vanilla**:

```typescript
const roomCards = document.querySelectorAll('.room-card');
roomCards.forEach((card) => {
    card.addEventListener('click', (event) => {
        const roomId = (card as HTMLElement).dataset.roomId;
        openRoom(roomId as RoomID);
    });
});
```

**Problem**: Doesn't work with dynamically added elements

### Pattern: Event Delegation (Better)

**Old jQuery**:

```javascript
jQuery(document).on('click', '.room-card', function () {
    const roomId = jQuery(this).data('room-id');
    openRoom(roomId);
});
```

**New Vanilla**:

```typescript
// Export as tuple
export const roomCardClickHandler: [string, EventListener] = [
    '[data-room-id]',
    (event: Event) => {
        const target = (event.target as HTMLElement).closest('[data-room-id]');
        if (!target) return;

        const roomId = (target as HTMLElement).dataset.roomId as RoomID;
        globalState.roomId = roomId;
    },
];

// Register globally
import { roomCardClickHandler } from '../ui/roomSummary/eventHandlers';

const [selector, handler] = roomCardClickHandler;
document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest(selector);
    if (target) handler.call(target, event);
});
```

**Benefits**:

- Works with dynamic DOM
- Single listener (performance)
- Centralized registration

## Animation Migration

### From jQuery Animations

**Old jQuery**:

```javascript
jQuery('.overlay').fadeOut('slow');
jQuery('.panel').slideDown(500);
jQuery('.element').animate({ opacity: 0.5 }, 1000);
```

### To Web Animations API

**New Utilities** (`src/utils/animationUtils.ts`):

```typescript
export async function fadeOut(element: HTMLElement, duration: number = 300): Promise<void> {
    const animation = element.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration,
        easing: 'ease-in-out',
    });

    await animation.finished;
    element.style.display = 'none';
}

export async function slideDown(element: HTMLElement, duration: number = 300): Promise<void> {
    element.style.display = 'block';
    const height = element.scrollHeight;

    const animation = element.animate(
        [
            { height: '0px', opacity: 0 },
            { height: `${height}px`, opacity: 1 },
        ],
        { duration, easing: 'ease-in-out' },
    );

    await animation.finished;
    element.style.height = 'auto';
}
```

**Usage**:

```typescript
import { fadeOut, slideDown } from 'src/utils/animationUtils';

async function showPanel() {
    await fadeOut(overlay, 500);
    await slideDown(panel, 300);
}
```

**Benefits**:

- Native browser API
- Promise-based (async/await)
- Better performance
- No jQuery dependency

## DOM Manipulation Migration

### Creating Complex DOM Structures

**Old jQuery (Imperative)**:

```javascript
function createItemCard(item) {
    var card = jQuery('<div>').addClass('item-card').attr('data-item-id', item.id);

    var thumbnail = jQuery('<div>')
        .addClass('item-thumbnail')
        .css('background-image', `url(${item.image})`);

    var name = jQuery('<div>').addClass('item-name').text(item.name);

    card.append(thumbnail).append(name);
    return card;
}

jQuery('.items-grid').empty();
items.forEach((item) => {
    jQuery('.items-grid').append(createItemCard(item));
});
```

**New Vanilla (Presenter Pattern)**:

```typescript
// Presenter (pure function, returns element)
function createItemCard(item: ItemRoomData): HTMLElement {
    const card = document.createElement('div');
    card.classList.add('item-card');
    card.dataset.itemId = item.id;

    const thumbnail = document.createElement('div');
    thumbnail.classList.add('item-thumbnail');
    thumbnail.style.backgroundImage = `url(${item.image})`;

    const name = document.createElement('div');
    name.classList.add('item-name');
    name.textContent = item.name;

    card.appendChild(thumbnail);
    card.appendChild(name);

    return card;
}

// Container (handles DOM manipulation)
function renderItemsGrid(items: ItemRoomData[]): void {
    const grid = document.querySelector('.items-grid');
    if (!grid) return;

    // Clear
    grid.innerHTML = '';

    // Create and append
    items.forEach((item) => {
        const card = createItemCard(item);
        grid.appendChild(card);
    });
}
```

**Benefits**:

- Testable presenter (mock data → element)
- Reusable (can use in different contexts)
- Type-safe parameters

### Template Literals for Complex HTML

**Alternative Pattern**:

```typescript
function createItemCard(item: ItemRoomData): HTMLElement {
    const template = `
        <div class="item-card" data-item-id="${item.id}">
            <div class="item-thumbnail" style="background-image: url(${item.image})"></div>
            <div class="item-name">${escapeHtml(item.name)}</div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = template;
    return div.firstElementChild as HTMLElement;
}
```

**Important**: Always escape user content with `escapeHtml()` utility

## AJAX Migration

### Pattern: jQuery AJAX → Fetch API

**Old jQuery**:

```javascript
jQuery.ajax({
    url: '/api/items',
    type: 'GET',
    data: { ids: 'id1,id2' },
    dataType: 'json',
    success: function (data) {
        renderItems(data.foundResources);
    },
    error: function (xhr, status, error) {
        console.error('Failed:', error);
    },
});
```

**New Fetch**:

```typescript
async function fetchItems(ids: string[]): Promise<ItemsResponse> {
    try {
        const queryString = ids.join(',');
        const response = await fetch(`${API_BASE_URL}/api/items?ids=${queryString}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(10000), // 10s timeout
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: ItemsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch items:', error);
        throw error;
    }
}

// Usage
try {
    const data = await fetchItems(['id1', 'id2']);
    renderItems(data.foundResources);
} catch (error) {
    // Handle error
}
```

**With Caching**:

```typescript
const cache = new Map<string, ItemsResponse>();

async function fetchItems(ids: string[]): Promise<ItemsResponse> {
    const cacheKey = ids.sort().join(',');

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey)!;
    }

    const data = await fetch(/* ... */);
    cache.set(cacheKey, data);
    return data;
}
```

### API Layer Migration

**Old Pattern** (Component-specific API):

```typescript
// src/ui/roomDetail/logic/api/roomApi.ts
// API logic embedded in component directory
```

**New Pattern** (Centralized API layer):

```typescript
// src/client/api/roomApi.ts
// Centralized, reusable across all components
import { fetchRoomData } from 'client/api/roomApi';
```

**Benefits**:

- Shared across `roomDetail` and `roomSummary` components
- Single location for API changes
- Easier to test and mock
- Consistent error handling

**Migration Steps**:

1. Move API files from `src/ui/[component]/logic/api/` to `src/client/api/`
2. Move types from `src/ui/[component]/types/` to `src/client/types/`
3. Update imports in all consuming components
4. Add TypeScript path alias: `"client/*": ["src/client/*"]`
5. Update tests to import from `client/` namespace

## Testing Migrated Code

### Test Checklist

After migrating a component:

- [ ] **Unit Test Presenters**:

    ```typescript
    describe('createItemCard', () => {
        it('should create card with correct structure', () => {
            const item = mockItemData();
            const card = createItemCard(item);

            expect(card.classList.contains('item-card')).toBe(true);
            expect(card.dataset.itemId).toBe(item.id);
        });
    });
    ```

- [ ] **Unit Test Event Handlers**:

    ```typescript
    describe('itemCardClickHandler', () => {
        it('should update globalState with item ID', () => {
            const mockEvent = new MouseEvent('click');
            const mockElement = document.createElement('div');
            mockElement.dataset.itemId = 'test-id';

            const [, handler] = itemCardClickHandler;
            handler.call(mockElement, mockEvent);

            expect(globalState.selectedItemId).toBe('test-id');
        });
    });
    ```

- [ ] **Integration Test API Calls**:

    ```typescript
    describe('fetchItems', () => {
        it('should fetch and cache items', async () => {
            const data = await fetchItems(['id1']);
            expect(data.foundResources).toBeDefined();

            // Should use cache on second call
            const cachedData = await fetchItems(['id1']);
            expect(cachedData).toBe(data);
        });
    });
    ```

## Migration Examples

### Example 1: Simple Toggle Component

**Before (jQuery)**:

```javascript
// In monolithic index.html <script>
jQuery('.theme-toggle').click(function () {
    if (jQuery('body').hasClass('diurnal-theme')) {
        jQuery('body').removeClass('diurnal-theme').addClass('nocturnal-theme');
        jQuery(this).text('Switch to Diurnal');
    } else {
        jQuery('body').removeClass('nocturnal-theme').addClass('diurnal-theme');
        jQuery(this).text('Switch to Nocturnal');
    }
});
```

**After (TypeScript)**:

```typescript
// src/ui/themeSelect/eventHandlers/toggleTheme.ts
export const toggleThemeHandler: [string, EventListener] = [
    '.theme-toggle',
    (event: Event) => {
        const currentTheme = globalState.theme;
        const newTheme = currentTheme === 'diurnal' ? 'nocturnal' : 'diurnal';
        globalState.theme = newTheme;
    },
];

// src/state/globalSubscriptions.ts
subscribeState('theme', (newTheme) => {
    document.body.classList.remove('diurnal-theme', 'nocturnal-theme');
    document.body.classList.add(`${newTheme}-theme`);

    const button = document.querySelector('.theme-toggle');
    if (button) {
        button.textContent = newTheme === 'diurnal' ? 'Switch to Nocturnal' : 'Switch to Diurnal';
    }
});
```

### Example 2: Data-Driven List

**Before (jQuery)**:

```javascript
function renderRoomsList(rooms) {
    jQuery('.rooms-list').empty();

    jQuery.each(rooms, function (index, room) {
        var li = jQuery('<li>')
            .attr('data-room-id', room.id)
            .text(room.name)
            .click(function () {
                openRoom(room.id);
            });

        jQuery('.rooms-list').append(li);
    });
}
```

**After (TypeScript)**:

```typescript
// Presenter
function createRoomListItem(room: RoomData): HTMLElement {
    const li = document.createElement('li');
    li.dataset.roomId = room.id;
    li.textContent = room.name;
    return li;
}

// Container
function renderRoomsList(rooms: RoomData[]): void {
    const list = document.querySelector('.rooms-list');
    if (!list) return;

    list.innerHTML = '';

    rooms.forEach((room) => {
        const li = createRoomListItem(room);
        list.appendChild(li);
    });
}

// Event handler (registered globally)
export const roomListItemClickHandler: [string, EventListener] = [
    '.rooms-list [data-room-id]',
    (event: Event) => {
        const target = event.currentTarget as HTMLElement;
        const roomId = target.dataset.roomId as RoomID;
        globalState.roomId = roomId;
    },
];
```

## Common Pitfalls

### ❌ Pitfall 1: Direct jQuery Translation

```typescript
// ❌ Bad: Translating jQuery line-by-line
const element = document.querySelector('.element');
element.style.display = 'none';
element.classList.add('hidden');
element.textContent = 'Updated';
```

```typescript
// ✅ Good: Using established patterns
globalState.elementHidden = true; // State drives UI
```

### ❌ Pitfall 2: Ignoring Type Safety

```typescript
// ❌ Bad: Using 'any' or loose types
function renderItem(item: any) {
    // ...
}
```

```typescript
// ✅ Good: Using strict types
function renderItem(item: ItemRoomData) {
    // TypeScript ensures item has required properties
}
```

### ❌ Pitfall 3: Forgetting Null Checks

```typescript
// ❌ Bad: Assuming element exists
document.querySelector('.element').textContent = 'Text';
```

```typescript
// ✅ Good: Null checking
const element = document.querySelector('.element');
if (element) {
    element.textContent = 'Text';
}

// Or with optional chaining
document.querySelector('.element')?.textContent = 'Text';
```

### ❌ Pitfall 4: Not Using Utilities

```typescript
// ❌ Bad: Reinventing animation
element.style.opacity = '0';
setTimeout(() => {
    element.style.display = 'none';
}, 300);
```

```typescript
// ✅ Good: Using existing utilities
await fadeOut(element, 300);
```

## Next Steps

1. **Identify Next Component**: Choose a jQuery section to migrate
2. **Read READMEs**: Check component READMEs for patterns
3. **Follow Checklist**: Use component migration checklist
4. **Write Tests**: Add tests as you migrate
5. **Document**: Update this guide with new patterns

---

**See Also**:

- [AI_CONTEXT.md](./AI_CONTEXT.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Design patterns
- [TESTING.md](./TESTING.md) - Testing guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contributing guidelines

**Last Updated**: 2025-10-25
