# Utils Directory

## Overview

The `src/utils/` directory contains reusable utility functions for the vanilla TypeScript application, such as formatters, animation helpers and other encapsulated logic. These promote DRY principles, modularity, and consistency across components like event handlers and rendering. Utilities leverage native browser APIs (e.g., Web Animations API for effects) for performance and avoid external dependencies.

This directory also accommodates server-side utilities, including request validators for Express routing. Validators use `express-validator` middleware to ensure query parameters (e.g., `ids`, `difficulty`) are type-safe and consistent, drawing from enums and centralized messages. They are organized by purpose (e.g., query param chains) and exported for use in routes, following best practices for separation of concerns and reusability in Express apps.

## Files

- **`animationUtils.ts`**: Defines helper functions, including animations (e.g., `fadeIn`, `slideDown`) using Web Animations API for programmatic, promise-based effects.
- **`validatorsUtils.ts`**: Defines Express-validator middleware chains for query parameters (e.g., `idsValidator`, `difficultyValidator`), ensuring validation and sanitization for API routes with type safety via enums.
- **`formatUtils.ts`**: Defines string and integer formatting utilities (e.g., `slugifyString`) for normalizing strings, such as converting to slugs for IDs or URLs.
- **`audioUtils.ts`**: Defines audio-related utilities, such as volume clamping, rounding, and control disabling logic for audio elements.
- **`eventUtils.ts`**: Defines event-related utilities, including debouncing and simulating clicks via dispatched MouseEvents.
- **`domUtils.ts`**: Defines DOM manipulation utilities, such as class toggling and grid hexagon appending.
- **`index.ts`**: Barrel file exporting all utilities for convenient imports (e.g., `import { fadeIn, idsValidator, slugifyString } from '../utils';`).

## Naming Conventions

- **Files**: Lowercase with "Utils" suffix (e.g., `animationUtils.ts`).
- **Functions**: camelCase (e.g., `fadeOut`), returning promises where applicable for async chaining. For validators, suffix with `Validator` (e.g., `idsValidator`) to indicate middleware purpose.
- **Types**: PascalCase (e.g., if types are defined).

## Usage

- **Accessing Utilities**: Import via `index.ts` (e.g., `import { fadeIn, slideDown } from '../utils';`) in event handlers or rendering functions.
- **Using Validators**: Import and apply in Express routes (e.g., `router.get('/rooms', idsValidator, getRoomsByIds);`) for query param validation.
- **Extending Utilities**: Add new functions to `utils.ts` or create specialized files (e.g., `dom.ts` for DOM helpers, `validators.ts` for additional middleware), exporting via `index.ts`.
- **Example**:
    ```typescript
    import { fadeIn, slideDown, idsValidator, slugifyString } from '../utils';
    await fadeIn(element, 500);
    await slideDown(quoteElement);
    // In routes:
    router.get('/api/rooms', idsValidator, getRoomsByIds);
    const slug = slugifyString('Hello World'); // 'hello-world'
    ```
