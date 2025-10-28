# State Directory

## Overview

The `src/state/` directory contains modules for managing global application state in Vanilla JavaScript/TypeScript. This includes a singleton-like state store for values like difficulty level, used in UI callbacks for reactivity without libraries. The state management uses module scoping to achieve singleton behavior, a Proxy for intercepting changes (reactivity), and EventTarget for pub/sub notifications. Direct access to the underlying state object is prevented; all interactions must go through exported functions like `getState`, `setState`, and `subscribeState` for controlled, type-safe access. This ensures a single source of truth, immutability where possible, and efficient change notifications without external dependencies.

## Files

- **`globalState.ts`**: Defines the global state store with Proxy for reactivity and EventTarget for pub/sub notifications. Exports functions like `getState`, `setState`, `subscribeState`. The `GlobalState` interface provides type safety, and generics (e.g., `<K extends keyof GlobalState>`) prevent invalid key usage at compile-time.
- **`subscriptionManager.ts`**: Provides a centralized manager for handling subscriptions and unsubscriptions to state changes. Exports functions like `managedSubscribe` and `managedUnsubscribe` to manage subscription lifecycles, storing unsubscribe references in a Map for cross-module access and cleanup. This helps prevent memory leaks in scenarios requiring dynamic subscribe/unsubscribe (e.g., component mount/unmount-like behavior).
- **`globalSubscriptions.ts`**: Defines always-active global subscriptions to state properties (e.g., 'difficulty'). Exports an initialization function `initializeGlobalSubscriptions` to set up long-lived subscriptions with conditional logic in callbacks for reactive updates.

## Naming Conventions

- **Files**: Lowercase with hyphens (e.g., `global-state.ts`), per Node.js standards.
- **Variables**: camelCase for state keys (e.g., `difficulty`).
- **Types/Interfaces**: PascalCase (e.g., `GlobalState`).

## Immutability with `as const`

Initial state uses `as const` for literal type inference and immutability (e.g., `difficulty: 'JV-lvl-very-easy' as const` becomes literal type `'JV-lvl-very-easy'`).

## Usage

- **Accessing State**: Import from `globalState.ts` (e.g., `import { getState, setState } from 'src/state/globalState';`) in UI scripts or callbacks.
- **Extending State**: Add properties to `GlobalState` interface (e.g., `theme: 'diurnal' | 'nocturnal'`). Ensure new properties are added to the `initialState` object as well for proper initialization.

### Usage Examples

These examples demonstrate how to interact with the global state, including retrieving values, updating them (which triggers events), and subscribing to changes for reactive UI updates.

#### Getting a State Value

Use `getState` to read a value safely.

```typescript
const currentDifficulty = getState('difficulty');
console.log(currentDifficulty); // Outputs: 'JV-lvl-very-easy' (or the current value)
```

#### Setting a State Value (Triggering Changes)

Use `setState` to update a value. This invokes the Proxy's `set` trap, which updates the state and dispatches a `CustomEvent` (e.g., `state:difficulty`) via the `EventTarget` to notify all subscribers.

```typescript
setState('difficulty', 'JV-lvl-medium');
// This triggers an event notification to any subscribers for the 'difficulty' key.
```

> **Note**: Updates are reactive — subscribers are automatically notified without polling. Avoid setting invalid types or keys, as TypeScript generics enforce compatibility.

#### Subscribing to State Changes

Use `subscribeState` to listen for changes to a specific key. The callback is called immediately with the current value and again on any future updates. It returns an unsubscribe function for cleanup (e.g., to prevent memory leaks in UI components).

```typescript
// In a UI script or event handler
const unsubscribe = subscribeState('difficulty', (newValue) => {
    // Example: Update UI element
});

// Simulate a change (e.g., from a button click handler)
setState('difficulty', 'JV-lvl-hard'); // This will trigger the callback above

// Later, when no longer needed (e.g., on component unmount)
unsubscribe();
```

#### Using the Subscription Manager

The subscription manager (`subscriptionManager.ts`) is an optional utility for managing subscription lifecycles, particularly useful in scenarios where subscriptions need to be dynamically added/removed. It stores unsubscribe references in a Map, allowing cleanup from different modules/files. Use it under suitable conditions like:

- When subscriptions are tied to UI lifecycles (e.g., subscribe on open, unsubscribe on close).
- In modular code where cleanup must be callable cross-file without passing closures.
- To prevent duplicate subscriptions (it skips if already subscribed, or forces replace).

Avoid for always-active global subscriptions — use plain `subscribeState` for those.

```typescript
import { managedSubscribe, managedUnsubscribe } from '../state/subscriptionManager';

// Subscribe (e.g., on UI init/open)
managedSubscribe('difficulty', (newValue) => {
    // Reactive logic
});

// Unsubscribe (e.g., on UI close/teardown)
managedUnsubscribe('difficulty');
```

#### Initializing Global Subscriptions

Use `initializeGlobalSubscriptions` to set up app-wide reactive listeners (e.g., for 'difficulty'). Call once on app startup in the entry point.

Example (in `main.ts`):

```typescript
import { initializeGlobalSubscriptions } from 'src/state/globalSubscriptions';

// ... in DOMContentLoaded or init
initializeGlobalSubscriptions();
```

## Best Practices

- **Immutability**: Use `as const` for initial state to prevent mutations. For complex state values (e.g., objects), consider deep freezing if needed, but rely on the Proxy for controlled updates.
- **Type Safety**: Define the `GlobalState` interface for type-checked access and updates. Leverage generics to catch errors early (e.g., invalid keys like `subscribeState('invalidKey', ...)` won't compile).
- **Reactivity**: Use Proxy for change detection and EventTarget for subscriptions, adhering to ES6 standards. Limit subscriptions to necessary components to avoid performance overhead from excessive event listeners. Follow the reactive philosophy: "State changes always notify; logic decides action" — subscribe globally where possible, and use conditional checks (e.g., flags) in callbacks to control behavior, rather than frequent subscribe/unsubscribe cycles.
- **Encapsulation**: Avoid direct access or mutation of the state object. Always use the exported functions to maintain the singleton-like integrity and reactivity.
- **Performance**: Proxies add minor overhead, so avoid overuse in performance-critical paths. Use specific key subscriptions (e.g., `state:difficulty`) rather than broad listeners.

## Future Enhancements & Optimizations

- **Deep Equality Check**: Use `JSON.stringify` for equality checks on complex objects and arrays
- **Batched Updates**: Use `queueMicrotask` or `setTimeout` if async dispatches are needed
