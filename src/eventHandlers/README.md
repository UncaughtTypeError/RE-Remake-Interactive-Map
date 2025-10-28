# Event Handlers Directory

## Overview

This directory contains global event handling logic for the application, including click delegation, keyboard support, and a registry for extensible handlers. It's not tied to specific components like roomDetail, allowing reuse across the app (e.g., for map clicks, menu interactions). Handlers are imported as tuples ([selector, handler]) from component-specific modules, ensuring paired definitions to prevent mismatches.

## Philosophy and Approach

- **Event Delegation**: Uses a single document-level listener with `closest()` for efficiency, reducing memory usage in large DOMs. Applies to bubbling events like `click`, `mouseover`, `mouseout`.
- **Direct Attachment for Non-Bubbling Events**: For non-bubbling events like `mouseenter`/`mouseleave` (which don't bubble), attaches listeners directly to matching elements via `querySelectorAll()`. This ensures reliable triggering without delegation conflicts, run on init (re-run for dynamic DOM or use `MutationObserver`).
- **Registry Pattern**: Handlers are registered in an array for central management, populated dynamically from imported tuples. This makes adding new behaviors (e.g., for a new component) easy without modifying core code—call `registerHandler` dynamically or update tuples in component files.
- **Tuple Exports**: Component handlers are exported as [selector: string, handler: Function] tuples to atomically pair them, avoiding selector mismatches between registry and logic, and abstracting this implementation detail from the registry.
- **Debouncing**: Wraps handlers to prevent rapid fires, improving performance.
- **Accessibility**: Includes keyboard support (Enter/Space) for interactive elements, with dynamic `matches` generated from registry selectors for automatic updates.
- **Best Practice Alternative**: For larger apps, consider an event bus with `EventTarget` and `CustomEvent` for pub/sub decoupling (e.g., components dispatch 'roomClick' events, handlers subscribe). This is more scalable than registries for micro-frontends or modules, as per MDN and modern JS patterns.

## Files

- `globalEventHandlers.ts`: Central registry and delegation logic. Imports tuples (e.g., from roomDetailHandlers.ts), maps them to registry objects, and sets up listeners. Includes error/loading states in delegated handlers.
