/**
 * Creates a debounced version of a function.
 * @param fn - The function to debounce.
 * @param delay - The debounce delay in ms.
 * @returns The debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: Parameters<T>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Simulates a click on an element by dispatching a MouseEvent.
 * @param element - The element to click.
 */
export function simulateClick(element: HTMLElement): void {
    element.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true, view: window }),
    );
}
