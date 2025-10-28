# Service Unit Tests

This sub-directory contains unit tests for the service layer (`src/services/`), which encapsulates business logic and data operations for resources like items, rooms, biohazards, and S.T.A.R.S. rankings.

## Purpose and Function

- **Role**: Services handle core logic like data filtering, validation, and error generation (e.g., fetching resources by IDs or codes).
- **Purpose**: Verify that services process inputs correctly, apply business rules (e.g., return unrecognized IDs or codes), and throw appropriate errors.
- **Benefits**: Ensures reliable data operations independent of HTTP layers, facilitating reuse (e.g., in CLI tools or other endpoints).

## Integration with Other Layers

- **With Data**: Services interact directly with in-memory data arrays (e.g., for items, rooms, biohazards, stars rankings); tests use actual data.
- **With Controllers**: Services are called by controllers; in unit tests, no integration—controllers mock services.
- **With Middleware**: Errors thrown by services (e.g., `NotFoundError`) are propagated upward; not tested here.
- **Independence**: Services are pure (no side effects), making them easy to test in isolation.

## Scope of Testing

- **Focus**: Business functions like resource fetching.
- **Sub-Points**:
    - Input processing (e.g., handling arrays of IDs or codes).
    - Logic execution (e.g., filtering resources, computing unrecognized IDs/codes using Map for O(1) lookups).
    - Output structure (e.g., `{ foundResources, unrecognizedIds }` or `{ foundRankings, unrecognizedCodes }`).
    - Edge cases (e.g., duplicate IDs/codes, empty arrays, large inputs).
- **What’s Not Tested**: HTTP parsing/responses (controller tests), full stack (integration tests).

## Dependencies and Mocking

- **Dependencies**: Minimal—only internal data arrays; no external (e.g., DB) in current setup.
- **Mocking**:
    - None required, as services are the base layer.
    - Sub-Points:
        - Tests call functions directly (e.g., `await someServiceMethod(ids)` or `await getSTARSRankingByCodes(codes)`).
        - If future dependencies (e.g., DB), mock them here.
- **Data Handling**: Use real data arrays for accurate testing.

## Layer of Application Tested

- **Service Layer**: The business/data access layer.
- **Sub-Points**:
    - Tests domain-specific rules (e.g., batch ID/code lookup, partial matches).
    - Verifies optimizations (e.g., Map for efficient filtering).
    - Focuses on data integrity (e.g., matching resource interfaces).

## Error Testing

- **Approach**: Directly assert thrown errors.
- **Sub-Points**:
    - Test `NotFoundError` (no matches): `await expect(someServiceMethod(['invalid'])).rejects.toThrow(NotFoundError)`.
    - Test `BadRequestError` (empty inputs): Verify message and type.
    - Cover scenarios like all unrecognized vs. partial matches.

Additional Points:

- **Performance**: Tests could include benchmarks for large input arrays if data grows.
- **Extensibility**: Ready for DB migration (e.g., replace arrays with queries).
- **Type Safety**: TypeScript ensures input/output types align with interfaces.
