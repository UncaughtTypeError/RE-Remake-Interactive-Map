# Constants Directory

## Overview

The `src/constants/` directory contains centralized, immutable constants for the Express API, such as error and validation messages. These are used across services, controllers, and tests to ensure consistency, avoid duplication, and simplify maintenance. Constants are defined with `as const` for type safety and immutability. Environment-specific configurations like API base URLs are also stored here for client-side use, allowing easy adjustments across development, testing, and production environments. Global app-wide constants, such as defaults for state values (e.g., difficulty levels), are included for global access.

## Files

- **`messages.ts`**: Defines readonly error and validation messages (e.g., `Messages.validation.invalidQueryParameters`) for use in error handling and test assertions.
- **`api.ts`**: Defines API-related constants, such as base URLs (e.g., `ApiConstants.API_BASE_URL`), for configurable endpoints in client-side fetching.
- **`global.ts`**: Defines global app-wide constants, such as state and rendering defaults (e.g., `GlobalConstants.DEFAULT_DIFFICULTY_LEVEL`), used in client-side rendering (e.g., `renderRoomData`) and services.
- **`index.ts`**: Barrel file exporting all constants for convenient imports (e.g., `import { Messages, ApiConstants, GlobalConstants } from '../constants';`).

## Naming Conventions

- **Files**: Lowercase with hyphens (e.g., `messages.ts`), per Node.js standards.
- **Variables**: camelCase for keys (e.g., `invalidQueryParameters`), UPPER_CASE for legacy constants (if any), using `const` for immutability.
- **Types**: PascalCase (e.g., `MessageKey`).

## Usage

- **Accessing Constants**: Import via `index.ts` (e.g., `import { Messages, ApiConstants, GlobalConstants } from '../constants';`) in services, controllers, or tests.
- **Extending Constants**: Add new files (e.g., `config.ts` for additional env vars, `global.ts` for defaults) for additional constants, exporting via `index.ts`.
- **Example**:
    ```typescript
    import { Messages, ApiConstants, GlobalConstants } from '../constants';
    throw new BadRequestError(Messages.validation.invalidIdFormat);
    const response = await fetch(`${ApiConstants.API_BASE_URL}/api/rooms?ids=${roomId}`);
    const defaultLevel = GlobalConstants.DEFAULT_DIFFICULTY_LEVEL;
    ```
