# Project Standards and Setup

## Overview

This document outlines the standards, tools, libraries, and setup for the Express API project, a RESTful API for querying and filtering in-memory data for game-related resources (items, rooms, biohazards). The project is built with TypeScript, Express 5, and ESM, prioritizing type safety, maintainability, and scalability. It follows industry-standard practices for code quality, documentation, and testing, ensuring a robust foundation for development and future extensions.

## Standards and Conventions

### Coding Standards

- **JSDoc 3.x**: Used for comprehensive documentation of TypeScript files, including file-level (`@file`), function-level (`@description`, `@param`, `@returns`, `@throws`, `@example`), and type references (`@link`). Ensures clear, maintainable documentation with IDE support (e.g., VS Code hover). See [JSDoc Reference](https://jsdoc.app/) for details.
- **Google TypeScript Style Guide**: Guides naming conventions (camelCase for variables, PascalCase for types/interfaces, lowercase-with-hyphens for files), code organization, and type safety practices. Ensures consistency and readability across the codebase. See [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) (2025).
- **ESLint Rules**: Enforces code quality with rules like `require-jsdoc` for mandatory JSDoc, `no-hardcoded-strings` for centralized messages, and TypeScript-specific rules (`@typescript-eslint/no-unused-vars`, `@typescript-eslint/explicit-function-return-type`). Configured in `.eslintrc.json` to align with TypeScript best practices.
- **TypeScript Best Practices**: Leverages strict type checking (`strict: true` in `tsconfig.json`), string literal types over enums for serialization, and `as const` for immutable static data (e.g., `itemsRoomData`). Follows TypeScript Handbook (2025) for idiomatic usage.
- **REST API Standards**: Adheres to REST principles (RFC 7231) with endpoint naming (e.g., `/api/items`), query parameters (e.g., `?ids=...`), and HTTP status codes (200, 400, 404, 429). Uses JSON for request/response bodies.

### Naming Conventions

- **Files**: Lowercase with hyphens (e.g., `items.ts`, `itemsService.ts`), per Node.js standards.
- **Variables**: camelCase for data and functions (e.g., `itemsRoomData`, `getAllItems`).
- **Types/Interfaces**: PascalCase (e.g., `ItemRoomData`, `ItemSearchFilters`).
- **IDs**: Descriptive, camelCase-like strings (e.g., `selfDefenseJV-keepersRoom`), URL-compatible per RFC 3986.
- **Constants**: camelCase for message keys (e.g., `Messages.validation.invalidIdFormat`), per Google TypeScript Style Guide.

### Import Path Conventions

The project uses TypeScript path mappings to enable clean, absolute imports instead of relative paths. This improves code maintainability and prevents issues with deep relative paths (e.g., `../../../`).

#### Path Mapping Configuration

Path mappings are configured in two places and must be kept in sync:

1. **tsconfig.json** - For TypeScript compilation:

```json
"paths": {
    "src/*": ["src/*"],
    "themeSelect/*": ["src/ui/themeSelect/*"],
    "difficultySelect/*": ["src/ui/difficultySelect/*"],
    "roomDetail/*": ["src/ui/roomDetail/*"],
    "shared/*": ["src/ui/shared/*"]
}
```

2. **jest.config.ts** - For test execution:

```typescript
moduleNameMapper: {
    '^src$': '<rootDir>/src',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^themeSelect/(.*)$': '<rootDir>/src/ui/themeSelect/$1',
    '^difficultySelect/(.*)$': '<rootDir>/src/ui/difficultySelect/$1',
    '^roomDetail/(.*)$': '<rootDir>/src/ui/roomDetail/$1',
    '^shared/(.*)$': '<rootDir>/src/ui/shared/$1',
}
```

#### Import Path Usage

**Always use absolute paths for component imports:**

```typescript
// ✅ Correct - Use absolute paths with path mappings
import { renderRoomSummary } from 'roomSummary/orchestrator/orchestrator';
import { fetchRoomData } from 'roomDetail/logic/api/roomApi';
import { animateGears } from 'shared/renderers/gearsAnimatorRenderer';
import { getState } from 'src/state/globalState';

// ❌ Incorrect - Avoid relative paths
import { renderRoomSummary } from '../orchestrator/orchestrator';
import { fetchRoomData } from '../../roomDetail/logic/api/roomApi';
```

#### Adding New UI Components

When adding new UI components, follow these steps:

1. **Create the component directory** under `src/ui/` (e.g., `src/ui/newComponent/`)

2. **Add path mapping to tsconfig.json**:

```json
"newComponent/*": ["src/ui/newComponent/*"]
```

3. **Add corresponding mapping to jest.config.ts**:

```typescript
'^newComponent/(.*)$': '<rootDir>/src/ui/newComponent/$1'
```

4. **Update all imports** in the new component to use the absolute path pattern

5. **Verify** the build and tests work with the new mappings:

```bash
npm run typecheck  # Verify TypeScript compilation
npm test          # Verify tests pass with new mappings
```

#### Benefits

- **Cleaner imports**: No deep relative paths (`../../../`)
- **Refactoring-friendly**: Moving files doesn't break imports
- **IDE support**: Better autocomplete and navigation
- **Consistency**: Uniform import style across the codebase
- **Component isolation**: Clear boundaries between UI components

### Documentation

- **File-Level JSDoc**: Every source file includes a `@file` JSDoc block describing its purpose, key exports, and usage (e.g., `src/services/itemsService.ts`, `src/data/items.ts`).
- **Markdown Docs**: Key documentation files in `docs/` (e.g., `rate-limiting-test-challenges.md`) and directory-specific READMEs (e.g., `src/data/README.md`, `tests/README.md`) provide detailed guidance for maintainers.
- **Swagger/OpenAPI**: API endpoints are documented in `openapi.yaml`, served at `/api-docs` via `swagger-ui-express`, following OpenAPI 3.0 standards.

## Project Setup

### Core Technologies

- **TypeScript**: Provides static typing, interfaces (e.g., `ItemRoomData`), and literal types (e.g., `DifficultyLevel`) for type safety. Configured with `tsconfig.json` (e.g., `strict: true`, `module: 'esnext'`). Purpose: Enhances code reliability and IDE support.
- **Express 5**: Web framework for building RESTful APIs (e.g., `GET /api/items?ids=...`, `/search`). Handles routing, middleware, and request/response processing. Purpose: Simplifies API development with robust middleware support.
- **ECMAScript Modules (ESM)**: Uses `"type": "module"` in `package.json` for modern JavaScript module syntax (`import`/`export`). Configured with `ts-node --loader ts-node/esm` for development. Purpose: Enables modular code and tree-shaking.

### Tools and Libraries

- **ts-node**: Runs TypeScript files directly in development with ESM support (`--loader ts-node/esm --experimental-specifier-resolution=node`). Purpose: Streamlines development without pre-compilation.
- **esbuild**: Bundles the application for production (`esbuild src/server.ts --bundle`), generating a single `dist/server.js`. Purpose: Fast, optimized builds for deployment.
- **express-validator**: Validates query parameters (e.g., `ids`, `room`, `difficulty`) in routes (e.g., `src/utils/validators.ts`). Purpose: Ensures input validation and security.
- **express-rate-limit**: Limits requests (e.g., `max: 100` per 15 minutes) to prevent abuse. Purpose: Enhances API security and performance.
- **swagger-ui-express**: Serves interactive API documentation at `/api-docs` from `openapi.yaml`. Purpose: Improves API usability for developers.
- **yaml**: Parses `openapi.yaml` for Swagger UI. Purpose: Enables YAML-based API specification.
- **dotenv**: Loads environment variables (e.g., `PORT`, `DEBUG_MODE`) from `.env`. Purpose: Simplifies configuration management.

### Testing Setup

- **Jest**: Testing framework with `ts-jest` for TypeScript support, configured in `jest.config.ts`. Runs unit and integration tests in `tests/`. Purpose: Ensures code reliability and coverage.
- **Supertest**: Tests HTTP endpoints (e.g., `GET /api/items`) in integration tests (`tests/integration/itemsRoutes.test.ts`). Purpose: Validates API behavior end-to-end.
- **Test Structure**:
    - `tests/unit/controller-layer/`: Tests controllers (e.g., `itemsController.test.ts`).
    - `tests/unit/service-layer/`: Tests services (e.g., `itemsService.test.ts`).
    - `tests/integration/`: Tests routes (e.g., `itemsRoutes.test.ts`).
    - Purpose: Isolates unit tests for logic and integration tests for API flows.

### Directory Structure

```
project-root/
├── src/
│   ├── constants/           # Centralized constants (e.g., messages.ts)
│   ├── data/                # Static in-memory data (e.g., items.ts)
│   ├── errors/              # Custom error classes (e.g., customErrors.ts)
│   ├── middleware/          # Middleware (e.g., errorHandler.ts)
│   ├── routes/              # API routes (e.g., itemsRoutes.ts)
│   ├── services/            # Business logic (e.g., itemsService.ts)
│   ├── utils/               # Utilities (e.g., validators.ts)
│   └── server.ts            # Main entry point
├── tests/                   # Unit and integration tests
├── docs/                    # Project documentation
├── .eslintrc.json           # ESLint configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── openapi.yaml             # API specification
```

- **Purpose**: Organizes code by concern (data, logic, routes, tests), following SOLID principles and Node.js conventions.

## Data Management

- **Static Data**: Stored in `src/data/` (e.g., `items.ts`, `biohazards-data.ts`, `map-data.ts`) as readonly arrays with `as const` for immutability and literal type inference (e.g., `difficultyLevel: readonly ['JV-lvl-very-easy', ...]`).
- **Types**: Defined in `src/data/types.ts` (e.g., `ItemRoomData`, `DifficultyLevel`) for type safety across resources (items, rooms, biohazards).
- **Purpose**: Provides a lightweight, type-safe data source for development, with easy migration to a database (e.g., MongoDB) via services.

## Additional Details

- **Error Handling**: Centralized in `src/middleware/errorHandler.ts`, using custom errors (`NotFoundError`, `BadRequestError`) from `src/errors/customErrors.ts`. Messages are defined in `src/constants/messages.ts` for consistency.
- **Rate Limiting**: Applied via `express-rate-limit` in routes, with manual testing instructions in `docs/rate-limiting-test-challenges.md` due to Jest/Supertest state issues.
- **Extensibility**: Supports adding rooms and biohazards via new data files (e.g., `rooms-data.ts`) and services, maintaining agnostic resource handling.
- **Build and Run**:
    - Development: `npm start` (`node --loader ts-node/esm src/server.ts`).
    - Production: `npm run build` (`esbuild src/server.ts --bundle`), then `node dist/server.js`.
    - Tests: `npm test` (Jest), `npm run test:coverage` for coverage.

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) (2025)
- [JSDoc Reference](https://jsdoc.app/)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Express Documentation](https://expressjs.com/)
- [OpenAPI Specification](https://swagger.io/specification/)
