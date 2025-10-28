# Data Directory

## Overview

The `src/data/` directory contains static, in-memory data for the Express API, organized by resource type (e.g., items, rooms, biohazards). This data serves as a lightweight alternative to a database for development and testing, used by services (e.g., `src/services/`) for querying and filtering. The structure is designed for scalability, type safety, and ease of migration to a database if needed, supporting agnostic resource handling across different entity types.

## Files

- **`<resource>-data.ts`** (e.g., `items.ts`, `rooms-data.ts`, `biohazards-data.ts`): Defines `resourceData` arrays of objects representing entities (e.g., items with properties like `id`, `map`, `difficultyLevel`, `name`, `type`, `qty`, `qtyItems`). Each file exports a single const array (e.g., `itemsRoomData`, `roomsData`) for use in services.
- **`types.ts`**: Contains shared TypeScript types/interfaces (e.g., `ResourceData`, `ItemSearchFilters`, `DifficultyLevel`, `ResourceType`) for type safety across resource data files.
- **`index.ts`**: Barrel file exporting all data and types for convenient imports (e.g., `import { itemsRoomData, ResourceData } from '../data';`).

New resource types can be added by creating new `<resource>-data.ts` files, following the same structure.

## Naming Conventions

- **Files**: Lowercase with hyphens (e.g., `items.ts`), following Node.js standards for file naming.
- **Variables**: camelCase for data exports (e.g., `itemsRoomData`, `roomsData`), using `const` for immutability.
- **Types/Interfaces**: PascalCase (e.g., `ResourceData`, `ItemSearchFilters`).
- **IDs**: Unique strings in camelCase-like format (e.g., `selfDefenseJV-keepersRoom`), designed to be descriptive and URL-compatible, avoiding special characters for REST API usage (per RFC 3986).

## Immutability with `as const`

Resource data arrays (e.g., `itemsRoomData` in `items.ts`) are defined with the `as const` assertion to ensure immutability and precise type inference:

- **Purpose**: Makes `resourceData` readonly, preventing accidental mutations (e.g., `itemsRoomData.push(newItem)` or `itemsRoomData[0].name = 'changed'` will error in TypeScript). Narrows properties to literal types for enhanced type safety.
- **Type Inference**: Converts array properties to readonly tuples of literal types (e.g., `difficultyLevel` becomes `readonly ['JV-lvl-very-easy', 'JV-lvl-easy', ...]` instead of `string[]`), ensuring only valid values are used in services (e.g., filtering in `searchResources`).
- **Example**:
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
        // ... other resources
    ] as const;
    ```
