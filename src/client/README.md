# Client-Side API Layer

## Purpose

This directory contains the client-side API communication layer for the frontend application. It provides a centralized location for all API calls and related utilities, separate from UI components.

## Philosophy

Following the project's layered architecture pattern, the client-side code mirrors the backend structure:

- **Backend**: `src/controllers/`, `src/services/`, `src/routes/`
- **Frontend**: `src/client/api/`, `src/client/types/`

This separation ensures:

- **Reusability**: API functions can be used by any component
- **Testability**: API layer can be tested independently
- **Maintainability**: Changes to API logic don't affect UI components
- **Type Safety**: Centralized types for API responses

## Directory Structure

```
src/client/
├── api/
│   ├── roomApi.ts              # Room data fetching with caching
│   └── fallbackData.ts         # Fallback data for error states
└── types/
    └── api.ts                  # API response types and interfaces
```

## Files

### `api/roomApi.ts`

Handles fetching room data from the backend API.

**Features:**

- Room ID validation
- In-memory caching to prevent redundant API calls
- Request timeout handling (10s)
- Error handling with descriptive messages

**Usage:**

```typescript
import { fetchRoomData } from 'client/api/roomApi';

const data = await fetchRoomData('mansion-1f-dining-room');
```

### `api/fallbackData.ts`

Provides blank/default room data for error states and resets.

**Usage:**

```typescript
import { blankRoomData } from 'client/api/fallbackData';

setState('roomData', blankRoomData);
```

### `types/api.ts`

TypeScript interfaces for API responses.

**Exports:**

- `RoomResponse`: API response structure for room queries
- `ItemGroup`: Grouped items with counts
- `BiohazardGroup`: Grouped biohazards with quantities

## Design Patterns

### Caching Strategy

The `roomApi` implements a simple Map-based cache:

- Reduces server load
- Improves response times for frequently accessed rooms
- Cache persists for the session lifetime

### Error Handling

All API calls follow consistent error patterns:

- **Validation errors**: "Invalid room ID format"
- **Not found**: "Room not found"
- **Server errors**: "Server error: {status}"
- **Timeout errors**: "Request timed out. Please try again."

## Usage by Components

**Used by:**

- `src/ui/roomDetail/` - Displays full room details
- `src/ui/roomSummary/` - Shows hover summary panels
- Other components needing room data

**Import Pattern:**

```typescript
// Always import from client/ namespace
import { fetchRoomData } from 'client/api/roomApi';
import { RoomResponse } from 'client/types/api';
```

## Testing

See `src/__tests__/` for integration tests covering the API layer.

## Related Documentation

- [Architecture Overview](../../.claude/ARCHITECTURE.md)
- [State Management](../state/README.md)
- [UI Components](../ui/)
