import { getState, setState, subscribeState } from '../../../state/globalState';

import { DifficultyLevelEnum } from '../../../data';

describe('Global State', () => {
    beforeEach(() => {
        // Reset state to a default value before each test to ensure isolation
        setState('difficulty', DifficultyLevelEnum.JV_VERY_EASY);
    });

    it('should set and get difficulty', () => {
        setState('difficulty', DifficultyLevelEnum.JV_HARD);
        expect(getState('difficulty')).toBe(DifficultyLevelEnum.JV_HARD);
    });

    it('should notify subscribers on change', async () => {
        let initialCalled = false;
        let unsubscribe: (() => void) | undefined;
        const changePromise = new Promise((resolve) => {
            unsubscribe = subscribeState('difficulty', (value) => {
                if (!initialCalled) {
                    // Skip initial call (with 'JV-lvl-very-easy')
                    initialCalled = true;
                    return;
                }
                resolve(value);
            });
        });

        setState('difficulty', DifficultyLevelEnum.JV_HARD);

        try {
            const notifiedValue = await changePromise;
            expect(notifiedValue).toBe(DifficultyLevelEnum.JV_HARD);
        } finally {
            // Clean up in finally for robustness (runs even on failure)
            if (unsubscribe) {
                unsubscribe();
            }
        }
    });

    it('should not notify subscribers if no change', async () => {
        const currentValue = getState('difficulty'); // 'JV-lvl-very-easy' from beforeEach
        const callback = jest.fn(); // Mock to track calls

        const unsubscribe = subscribeState('difficulty', callback);

        // Initial call should happen
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(currentValue);

        // Set same value — no notification due to equality check
        setState('difficulty', currentValue);

        // No additional call
        expect(callback).toHaveBeenCalledTimes(1);

        // Clean up
        unsubscribe();
    });

    it('should notify subscribers on multiple changes', async () => {
        const values: string[] = [];
        const expectedChanges = [DifficultyLevelEnum.JV_EASY, DifficultyLevelEnum.JV_HARD]; // Distinct changes

        const unsubscribe = subscribeState('difficulty', (value) => {
            values.push(value);
        });

        // Initial call ('JV-lvl-very-easy')
        expect(values).toEqual([DifficultyLevelEnum.JV_VERY_EASY]);

        // Multiple distinct sets — each triggers a notification
        setState('difficulty', expectedChanges[0]);
        setState('difficulty', expectedChanges[1]);

        // Include initial + changes
        expect(values).toEqual([DifficultyLevelEnum.JV_VERY_EASY, ...expectedChanges]);

        // Clean up
        unsubscribe();
    });

    it('should stop notifying after unsubscribe', () => {
        const callback = jest.fn();

        const unsubscribe = subscribeState('difficulty', callback);

        // Initial call
        expect(callback).toHaveBeenCalledTimes(1);

        // Change before unsubscribe
        setState('difficulty', DifficultyLevelEnum.JV_HARD);
        expect(callback).toHaveBeenCalledTimes(2);

        // Unsubscribe
        unsubscribe();

        // Change after
        setState('difficulty', DifficultyLevelEnum.JV_VERY_EASY);
        expect(callback).toHaveBeenCalledTimes(2); // No more calls
    });
});
