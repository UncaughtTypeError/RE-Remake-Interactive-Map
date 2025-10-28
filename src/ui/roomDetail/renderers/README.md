# Room Detail Renderers

## Overview

Contains container functions for rendering specific UI sections of the room detail component. Uses presenter/container pattern where beneficial for complex DOM creation.

## Philosophy and Approach

- **Presenter/Container Pattern**: Presenters are pure functions creating DOM from data (e.g., `createAdjoiningRoomsList`). Containers handle queries, clearing, and appending (e.g., `renderAdjoiningRooms`). Applied pragmatically to sections with heavy DOM logic (e.g., adjoining rooms, intel); simple ones (e.g., thumbnail) are single functions.
- **Composition**: Uses helpers/factories (e.g., `createQtyUpdater` for qty logic) to avoid repetition.
- **Benefits**: Improves testability (mock data for presenters) and reusability (reuse presenters in previews/modals). Not forced on simple logic to avoid over-abstraction.

## Files

- Individual renderer files.
