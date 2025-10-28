# Unit Tests Overview

Unit tests in this directory focus on isolating and testing individual components (layers) of the API in a controlled environment. They are fast, repeatable, and help catch issues early by verifying small units of code (e.g., functions or methods) without dependencies on external systems like databases or networks.

## Purpose and Function

- **Isolation**: Each unit test targets a single layer (service or controller), mocking dependencies to ensure the test only verifies the component's logic.
- **Benefits**:
    - Quick execution (no full stack spin-up).
    - High granularity for debugging.
    - Enforces separation of concerns (e.g., business logic in services vs. HTTP handling in controllers).
- **Tools**: Jest with `ts-jest` for TypeScript support, including assertions, mocking, and coverage.
- **Coverage**: Target 80%+ branch/function/line coverage, focusing on happy paths, edge cases, and errors.
- **Structure**: Sub-divided into `controller-layer` and `service-layer` for clear organization, aligning with the MVC pattern.

## Integration with Other Layers

- Unit tests do not integrate with other layers directly; instead, they mock interactions (e.g., controllers mock services).
- This ensures loose coupling: Changes in one layer (e.g., service data source) don't break tests in another (e.g., controller).

## Scope of Testing

- **Narrow Focus**: Tests a single function/method per test suite (e.g., resource fetching in services).
- **What’s Tested**:
    - Input validation and processing (e.g., parsing ID or code arrays).
    - Core logic (e.g., filtering resources by ID or code).
    - Output formatting (e.g., structured responses like `{ foundResources, unrecognizedIds }` or `{ foundRankings, unrecognizedCodes }`).
    - Edge cases (e.g., duplicate IDs/codes, large inputs, empty inputs).
- **What’s Not Tested**: Full end-to-end flows (handled in integration tests), actual HTTP requests/responses, or external dependencies.

## Dependencies and Mocking

- **Dependencies**: Services have minimal dependencies (e.g., in-memory data arrays); controllers depend on services.
- **Mocking Strategy**:
    - Use `jest.mock` to replace dependencies with controlled fakes.
    - In controller tests: Mock service methods to return predefined results or throw errors.
    - In service tests: No mocks needed, as services are the lowest layer.
- **Benefits of Mocking**: Prevents cascading failures; tests focus on the unit, not downstream issues.

## Layer of Application Tested

- **Service Layer**: Tests business/data logic (e.g., resource filtering, validation).
- **Controller Layer**: Tests HTTP orchestration (e.g., parsing requests, delegating to services, formatting responses).

## Error Testing

- **Approach**: Explicitly test error paths by simulating invalid inputs or failures.
- **Sub-Points**:
    - Verify specific error types (e.g., `NotFoundError` for no matches, `BadRequestError` for empty inputs).
    - Check error messages and propagation (e.g., services throw errors; controllers pass them to middleware).
    - Include assertions like `expect(...).rejects.toThrow(NotFoundError)`.
- **Coverage**: Errors are tested for full failure (e.g., no resources found) and partial success (e.g., some unrecognized IDs/codes returned without error).

Additional Points:

- **Maintainability**: Tests are modular, allowing easy addition for new resource types (e.g., rooms, biohazards, stars rankings).
- **Best Practices**: Follows TDD principles; descriptive test names enhance readability (e.g., `should return partial found resources and unrecognized IDs`).
- **Extensibility**: Ready for future database integration or additional endpoints.
