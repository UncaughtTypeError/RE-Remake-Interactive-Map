const DEFAULT_AUDIO_VOLUME = 0.1,
    VOLUME_STEP = 0.1,
    VOLUME_MIN = 0,
    VOLUME_MAX = 1;

/**
 * Rounds a number to one decimal place for precision in volume calculations.
 *
 * @param n - The number to round.
 * @returns The number rounded to one decimal place.
 */
const roundTo1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Clamps a number between a minimum and maximum value to ensure it stays within audio volume bounds.
 *
 * @param n - The number to clamp.
 * @returns The clamped value, no less than VOLUME_MIN and no greater than VOLUME_MAX.
 *
 * @see {@link Math.max} - Returns the largest of zero or more numbers.
 * @see {@link Math.min} - Returns the smallest of zero or more numbers.
 */
const clamp = (n: number) => Math.min(VOLUME_MAX, Math.max(VOLUME_MIN, n));

/**
 * Clamps and rounds the audio volume to prevent floating-point drift and ensure valid range.
 *
 * @param volume - The volume value to clamp and round.
 * @returns The clamped and rounded volume.
 */
function clampVolume(volume: number) {
    return clamp(roundTo1(volume));
}

/**
 * Sets the volume of an audio element, clamping and rounding the value.
 * Optionally resets to default or adjusts up/down by a step.
 * Applies only if volume differs to avoid unnecessary updates.
 *
 * @param element - The audio element to adjust.
 * @param toDefault - If true, resets to DEFAULT_AUDIO_VOLUME (ignores isVolumeUp).
 * @param isVolumeUp - If true, increases volume by VOLUME_STEP; else decreases by VOLUME_STEP.
 * @param volume - The current volume to adjust from (defaults to DEFAULT_AUDIO_VOLUME).
 */
export function setAudioVolume(
    element: HTMLAudioElement,
    toDefault: boolean = false,
    isVolumeUp: boolean = true,
    volume: number = DEFAULT_AUDIO_VOLUME,
) {
    const delta = isVolumeUp ? VOLUME_STEP : -VOLUME_STEP;
    if (element) {
        const volumeClamped = toDefault ? DEFAULT_AUDIO_VOLUME : clampVolume(volume + delta);

        // Apply only if changed (avoids unnecessary UI churn)
        if (volumeClamped !== element.volume) {
            element.volume = volumeClamped;
        }
    }
}

/**
 * Toggles disabled state on volume control elements based on current volume.
 * Disables 'up' controls at max volume and 'down' at min.
 * Iterates over elements, determining direction from data-volume attribute.
 *
 * @param elements - The NodeList of volume control elements to update.
 * @param volume - The current audio volume to check against min/max.
 */
export function disabledVolumeControls(elements: NodeListOf<Element>, volume: number) {
    elements.forEach((element) => {
        // Determine direction for this element
        const isVolumeUp = (element as HTMLElement).dataset.volume === 'up';
        const isVolumeDown = (element as HTMLElement).dataset.volume === 'down';

        if (isVolumeUp) {
            element.classList.toggle('disabled', volume >= VOLUME_MAX);
        } else if (isVolumeDown) {
            element.classList.toggle('disabled', volume <= VOLUME_MIN);
        }
    });
}
