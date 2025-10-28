# Room Detail Orchestrator

## Overview

The orchestrator acts as a conductor for rendering room details, delegating to specialized renderers and processors without containing business logic. This keeps it lean and focused on sequencing.

## Philosophy

- **Role**: Coordinates flow (e.g., reset UI, process data, render sections). No DOM manipulation or data transformation here—delegates to renderers/logic.
- **Benefits**: Easy to extend (add a new renderer call for features like "events"). Follows composition over inheritance, aligning with SRP.

## Files

- `orchestrator.ts`: Main `renderRoomData` function.
