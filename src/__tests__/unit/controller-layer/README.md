# Controller Unit Tests

This sub-directory contains unit tests for the controller layer (`src/controllers/`), which handles HTTP request/response logic in the Express API for resources like items, rooms, biohazards, and S.T.A.R.S. rankings.

## Purpose and Function

- **Role**: Controllers act as the entry point for HTTP requests, parsing inputs (e.g., `req.query.ids` or `req.query.codes`), delegating to services, and formatting responses (e.g., `res.json`).
- **Purpose**: Verify that controllers correctly interpret Express `req` objects, call services with proper parameters, and handle outputs/errors via middleware.
- **Benefits**: Ensures robust HTTP handling without spinning up the full app, catching issues like query parsing errors early.

## Integration with Other Layers

- **With Services**: Controllers call service methods (e.g., fetching resources by IDs or codes); tests mock these to simulate results/errors.
- **With Middleware**: Errors propagated from services are handled by error middleware (e.g., setting 404 for `NotFoundError`); tests verify status codes.
- **With Routes**: Not directly tested here (integration tests cover routes); assumes routes pass correct `req` to controllers.
- **Loose Coupling**: Mocking services ensures controller tests don’t depend on service implementation details.

## Scope of Testing

- **Focus**: HTTP-specific logic in controller functions (e.g., handling batch ID or code requests).
- **Sub-Points**:
    - Parsing inputs (e.g., splitting `req.query.ids` or `req.query.codes` into an array).
    - Delegating to services (e.g., passing parsed IDs/codes).
    - Formatting responses (e.g., `res.json({ foundResources, unrecognizedIds })` or `res.json({ foundRankings, unrecognizedCodes })`).
    - Handling partial success (e.g., returning unrecognized IDs/codes without error).
    - Edge cases (e.g., empty query string, malformed IDs/codes, invalid formats).
- **What’s Not Tested**: Service internals (mocked), full HTTP flows (integration tests), data persistence.

## Dependencies and Mocking

- **Dependencies**: Primarily the service layer (e.g., `import * as services`).
- **Mocking**:
    - Use `jest.mock` to mock service modules (e.g., `../../src/services/`).
    - Sub-Points:
        - Mock resolved values for success (e.g., `(services.someMethod as jest.Mock).mockResolvedValue(mockResult)`).
        - Mock rejected promises for errors (e.g., `.mockRejectedValue(new NotFoundError(...))`).
        - Verify calls (e.g., `expect(services.someMethod).toHaveBeenCalledWith(['id1', 'id2'])` or `expect(services.getSTARSRankingByCodes).toHaveBeenCalledWith(['Zb', 'Cr'])`).
- **Simulated Express Objects**: Mock `req` (with `params`, `query`, `body`) and `res` (with `json`, `status` methods).

## Layer of Application Tested

- **Controller Layer**: The orchestration layer between routes and services.
- **Sub-Points**:
    - Tests Express-specific features (e.g., `req.query` parsing).
    - Verifies integration with Express 5’s async error handling (errors auto-passed to middleware).
    - Focuses on API contract (inputs → outputs), not data logic.

## Error Testing

- **Approach**: Simulate service errors and verify controller/middleware response.
- **Sub-Points**:
    - Test `NotFoundError` (no matches): Expect 404 status and JSON error.
    - Test `BadRequestError` (empty or invalid inputs): Expect 400 status.
    - Assert middleware handling (e.g., `expect(mockResponse.status).toHaveBeenCalledWith(404)`).
    - Cover propagation: Controllers don’t catch errors; Express 5 routes them to middleware.

Additional Points:

- **Scalability**: Easy to add tests for new resource types (e.g., rooms, biohazards, stars rankings) or query parameters.
- **Best Practices**: Follows TDD; tests are readable with descriptive `it` blocks (e.g., `should handle NotFoundError`).
- **Type Safety**: Leverages TypeScript for robust mock and response typing.
