/**
 * @file Global state management module for the application.
 * @description Provides a singleton-like state store achieved using module scoping and
 * using Proxy for reactivity and EventTarget for pub/sub notifications.
 * Direct access to state is prevented; getter and setter functions enforce controlled access and updates.
 * Allows setting/getting state values (e.g., difficulty level) and subscribing to changes
 * from UI callbacks or event handlers. State is type-safe with interfaces
 * and immutable where possible. No external libraries; uses Vanilla JS/TS features.
 *
 * Proxy for Reactivity: Used for intercepting changes in state management.
 * Avoid overuse for performance reasons (Proxy adds overhead).
 *
 * EventTarget/CustomEvent for Pub/Sub: Ideal for Vanilla JS/TS event systems, lightweight
 * and browser-compatible.
 *
 * Type Safety: The generic <K extends keyof GlobalState> ensures key/value types match
 * the state interface, preventing errors (e.g., subscribeState('invalidKey', ...)) at compile-time.
 *
 * @see {@link ./README.md} for state management details.
 */
import { CharacterCode, DifficultyLevel, RoomDetailsData, RoomID } from '../data';

import { blankRoomData } from 'client/api/fallbackData';

// Define state interface for type safety (extend as needed for more properties)
export interface GlobalState {
    isStartUp: boolean;
    theme: 'diurnal' | 'nocturnal';
    activeCharacter: CharacterCode;
    difficulty: DifficultyLevel;
    roomData: RoomDetailsData;
    roomId: RoomID;
    roomDetailActive: boolean;
}

/**
 * Initial state initialized once at module load with initialState (using as const
 * for literal inference and immutability). Akin to a singleton's lazy initialization,
 * as the module loads once.
 */
const initialState: GlobalState = {
    isStartUp: true,
    theme: 'nocturnal',
    activeCharacter: 'JV',
    difficulty: 'JV-lvl-very-easy',
    roomData: blankRoomData,
    roomId: 'unknown',
    roomDetailActive: false,
} as const;

/**
 * Global state proxy for reactivity
 * The "single instance" — there's only one state object per module import,
 * as JavaScript modules are singletons by design (e.g., per ECMAScript standards,
 * modules are evaluated once, and their variables are shared across imports).
 */
let state: GlobalState = { ...initialState };

/*
 * EventTarget for pub/sub notifications
 * Module-scoped, ensuring a single event bus for notifications, reinforcing the singleton nature,
 * i.e.: single instance shared app-wide (singleton-like)
 */
const eventTarget = new EventTarget();

/**
 * Proxy for reactive updates (triggers events on set)
 * The Proxy ensures all access/modifications go through a single controlled interface,
 * reinforcing singleton-like access. Uses set "trap" to update the state and notify subscribers.
 * Dispatches a CustomEvent with the new value to notify subscribers. This makes the state
 * "reactive" — any update via stateProxy[key] = value (in setState) triggers an event,
 * allowing components (e.g., UI in renderRoomData) to subscribe and react to changes without polling.
 *
 * Note on future enhancements:
 * - deep equality check : for complex objects and arrays consider a deep equality check via JSON.stringify
 * - batched updates : use queueMicrotask or setTimeout if async dispatches are needed
 */
const stateProxy = new Proxy(state, {
    set(target: GlobalState, property: string, value: any) {
        // Equality check: Skip update and notification if value hasn't changed
        if (target[property as keyof GlobalState] === value) {
            return true;
        }
        (target as any)[property] = value;
        // Proxy set() trap: dispatch change event for subscribers to trigger state change notifications
        eventTarget.dispatchEvent(new CustomEvent(`state:${property}`, { detail: value }));
        return true;
    },
});

/**
 * The state is not exported directly; instead, exported functions provide the only access points.
 * This encapsulation mimics the singleton's controlled access. Multiple state instances cannot
 * be created and state cannot be modified directly, ensuring a single point of truth.
 */

/**
 * Retrieves the value of a specific key from the global state.
 * This function provides controlled read access to the state, ensuring type safety
 * through generics.
 *
 * @template K - A key of the GlobalState interface.
 * @param {K} key - The key of the state property to retrieve.
 * @returns {GlobalState[K]} The value associated with the given key.
 */
export const getState = <K extends keyof GlobalState>(key: K): GlobalState[K] => stateProxy[key];

/**
 * Sets the value of a specific key in the global state.
 * This function provides controlled write access, triggering reactivity
 * through the Proxy to notify subscribers of the change.
 *
 * @template K - A key of the GlobalState interface.
 * @param {K} key - The key of the state property to update.
 * @param {GlobalState[K]} value - The new value to set for the key.
 */
export const setState = <K extends keyof GlobalState>(key: K, value: GlobalState[K]) => {
    stateProxy[key] = value;
};

/**
 * Subscribes to changes for a specific key in the global state.
 * The provided callback is invoked immediately with the current value
 * and subsequently whenever the value changes. Returns an unsubscribe function
 * for cleanup.
 *
 * @template K - A key of the GlobalState interface.
 * @param {K} key - The key of the state property to subscribe to.
 * @param {(value: GlobalState[K]) => void} callback - The function to call when the value changes.
 * @returns {() => void} A function to unsubscribe from changes.
 */
export const subscribeState = <K extends keyof GlobalState>(
    key: K,
    callback: (value: GlobalState[K]) => void,
) => {
    const listener = (event: Event) => {
        const customEvent = event as CustomEvent<GlobalState[K]>;
        callback(customEvent.detail);
    };
    // Register callbacks for specific keys (e.g., state:difficulty)
    eventTarget.addEventListener(`state:${key}`, listener);
    // Provide initial state to ensure subscribers are synced immediately
    callback(getState(key));
    // Return unsubscribe cleanup function
    return () => eventTarget.removeEventListener(`state:${key}`, listener);
};
