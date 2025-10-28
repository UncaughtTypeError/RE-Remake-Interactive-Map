/**
 * Type for handler tuples: [eventType, selector, handler function].
 */
export type HandlerTuple = [
    string,
    string,
    (element: HTMLElement, event: Event | MouseEvent) => void | Promise<void>,
];

/**
 * Interface for click handler registry entries.
 */
export interface ClickHandler {
    eventType: string;
    selector: string;
    handler: (element: HTMLElement, event: Event) => void | Promise<void>;
}
