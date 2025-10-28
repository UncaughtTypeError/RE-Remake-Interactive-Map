/**
 * @file animations.ts
 * @description Utility functions for DOM animations.
 *
 * Animation Principles:
 * - Utilizes the Web Animations API (WAAPI), a W3C standard, for native browser animations without external libraries.
 * - Chosen for programmatic control, allowing dynamic calculations (e.g., slide heights) and promise-based chaining for sequential effects.
 * - Preferred over CSS transitions for JS-driven animations to enable better integration with data-driven UI updates, easier cancellation, and GPU-accelerated performance.
 * - Follows best practices from MDN Web Docs and Google's Web Fundamentals: Batch DOM changes, use requestAnimationFrame implicitly via WAAPI, ensure 60fps smoothness, non-blocking (promises) animations, and support accessibility (e.g., reduced motion via media queries if extended).
 * - Standards: Complies with WCAG 2.1 for animations (non-intrusive, promise-resolvable for testing), ECMAScript for idiomatic JS, and TypeScript for type safety.
 */

/**
 * Animates an element to fade out.
 * @param el - The element to fade out.
 * @param duration - The duration in milliseconds.
 * @param callback - An optional callback function to be called after the animation completes.
 * @returns A promise that resolves when the animation is complete.
 */
export function fadeOut(
    el: HTMLElement,
    duration: number = 500,
    callback?: () => void,
): Promise<void> {
    return el.animate({ opacity: [1, 0] }, duration).finished.then(() => {
        el.style.opacity = '0';
        el.style.display = 'none';
        if (callback) callback();
    });
}

/**
 * Animates an element to fade in.
 * @param el - The element to fade in.
 * @param duration - The duration in milliseconds.
 * @param callback - An optional callback function to be called after the animation completes.
 * @returns A promise that resolves when the animation is complete.
 */
export function fadeIn(
    el: HTMLElement,
    duration: number = 500,
    callback?: () => void,
): Promise<void> {
    el.style.opacity = '0';
    return el.animate({ opacity: [0, 1] }, duration).finished.then(() => {
        el.style.opacity = '1';
        el.style.display = 'block';
        if (callback) callback();
    });
}

/**
 * Animates an element to slide down.
 * @param el - The element to slide down.
 * @param duration - The duration in milliseconds.
 * @returns A promise that resolves when the animation is complete.
 */
export function slideDown(el: HTMLElement, duration: number = 500): Promise<void> {
    el.style.overflow = 'hidden';
    el.style.maxHeight = '0px';
    el.style.padding = '0px'; // collapse box-model padding
    el.style.display = 'block'; // ensure the element is visible for animation
    const height = el.scrollHeight + 'px';
    return el.animate({ maxHeight: ['0px', height] }, duration).finished.then(() => {
        el.style.maxHeight = '';
        el.style.overflow = '';
        el.style.padding = '';
    });
}

/**
 * Animates an element to slide up.
 * @param el - The element to slide up.
 * @param duration - The duration in milliseconds.
 * @returns A promise that resolves when the animation is complete.
 */
export function slideUp(el: HTMLElement, duration: number = 500): Promise<void> {
    el.style.overflow = 'hidden';
    const height = el.scrollHeight + 'px';
    const computedStyle = getComputedStyle(el);
    const currentPadding = computedStyle.padding;

    return el
        .animate(
            {
                maxHeight: [height, '0px'],
                padding: [currentPadding, '0px'],
            },
            duration,
        )
        .finished.then(() => {
            el.style.maxHeight = '0px';
            el.style.padding = '0px'; // collapse box-model padding
            el.style.display = 'none'; // hide the element after animation
        });
}
