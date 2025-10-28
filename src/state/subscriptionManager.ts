/**
 * @file Centralized subscription manager for global state.
 * @description Manages subscriptions and unsubscriptions to state properties using a Map to store unsubscribe functions.
 * Allows dynamic addition and removal of subscriptions across modules, preventing memory leaks in lifecycle-based scenarios.
 * Use for conditional or dynamic subs; for always-active global subs, prefer plain subscribeState.
 * Exports managedSubscribe and managedUnsubscribe for lifecycle control.
 */
import { subscribeState, GlobalState } from './globalState';

/**
 * Type for subscription callbacks.
 */
type SubscriptionCallback<K extends keyof GlobalState> = (value: GlobalState[K]) => void;

/**
 * Map to store unsubscribe functions by state key.
 */
const unsubscribeMap = new Map<keyof GlobalState, () => void>();

/**
 * Subscribes to a state property and stores the unsubscribe function.
 * If already subscribed, does nothing (or could unsubscribe first).
 * @param key - The state property to subscribe to.
 * @param callback - The callback to execute on changes.*
 * @param force - If true, unsubscribe existing before adding new.
 */
export function managedSubscribe<K extends keyof GlobalState>(
    key: K,
    callback: SubscriptionCallback<K>,
    force: boolean = false,
): void {
    if (unsubscribeMap.has(key)) {
        if (force) {
            managedUnsubscribe(key);
        } else {
            return;
        }
    }
    const unsubscribe = subscribeState(key, callback);
    unsubscribeMap.set(key, unsubscribe);
}

/**
 * Unsubscribes from a state property if subscribed.
 * @param key - The state property to unsubscribe from.
 */
export function managedUnsubscribe<K extends keyof GlobalState>(key: K): void {
    const unsubscribe = unsubscribeMap.get(key);
    if (unsubscribe) {
        unsubscribe();
        unsubscribeMap.delete(key);
    }
}
