# Integration Tests

This directory contains integration tests that verify the full API stack, including routes, controllers, services, and middleware, using Supertest for simulated HTTP requests.

## Purpose and Function

- **Role**: Integration tests simulate real API calls to ensure components work together seamlessly for resources like items, rooms, biohazards, and S.T.A.R.S. rankings.
- **Purpose**: Catch issues in interactions (e.g., query parsing → service call → response), including end-to-end error flows.
- **Benefits**: Validates the API contract (e.g., GET `/api/resources?ids=...` or `/api/stars-rankings?codes=...` returns 200 with JSON); bridges unit and E2E testing.

## Integration with Other Layers

- **Full Stack**: Tests routes calling controllers, which call services, with errors handled by middleware.
- **With Express**: Uses a test Express app (`const app = express(); app.use('/api/resources', router);`) to mimic production.
- **With Data**: Uses real service data (no mocks), ensuring realistic flows.
- **Dependencies**: Relies on all layers; failures indicate integration bugs (e.g., mismatched params).

## Scope of Testing

- **Focus**: HTTP endpoints like GET `/api/resources?ids=...`.
- **Sub-Points**:
    - Request handling (e.g., query param parsing).
    - Response verification (status, body structure).
    - End-to-end logic (e.g., partial success returns 200 with unrecognized IDs/codes).
    - Edge cases (e.g., no IDs/codes → all resources, invalid IDs/codes → 400, unrecognized → 404).
- **What’s Not Tested**: Isolated logic (unit tests); browser/UI (E2E).

## Dependencies and Mocking

- **Dependencies**: Full app stack; Supertest simulates requests.
- **Mocking**:
    - None—tests use real components.
    - Sub-Points: If external (e.g., DB), mock here; current in-memory data needs no mocks.

## Layer of Application Tested

- **Multi-Layer**: Entire request lifecycle (routes → controllers → services → middleware).
- **Sub-Points**:
    - Tests Express 5 async error handling (e.g., thrown errors → middleware → response).
    - Verifies API as a whole (e.g., 200 for partial matches).

## Error Testing

- **Approach**: Send invalid requests and assert responses.
- **Sub-Points**:
    - Test 404 (`NotFoundError`): `expect(response.status).toBe(404); expect(response.body.error).toBe('No IDs...')`.
    - Test 400 (`BadRequestError`): Empty query.
    - Cover partial errors (unrecognized IDs/codes in body, no throw).

Additional Points:

- **Tools**: Supertest for requests (`request(app).get(...)`).
- **Best Practices**: Run after unit tests; use for smoke testing API changes.
- **Expansion**: Add tests for new resource types (e.g., rooms, biohazards, stars rankings) or authentication middleware.
