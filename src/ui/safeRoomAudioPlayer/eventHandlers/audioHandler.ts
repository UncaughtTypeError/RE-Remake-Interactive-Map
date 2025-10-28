import { simulateClick, setAudioVolume, disabledVolumeControls } from 'src/utils';

/**
 * Handles volume changes on audio element.
 * Adjusts volume up/down and disables controls at min/max.
 * @param element - The clicked volume control element (data-volume = 'up' or 'down').
 */
export function handleSetAudioVolume(element: HTMLElement): void {
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement | null;
    if (!audioPlayer) return;

    const isVolumeUp = element.dataset.volume === 'up';
    const toDefault = false;
    setAudioVolume(audioPlayer, toDefault, isVolumeUp, audioPlayer.volume);

    const volumeControls = document.querySelectorAll('.audio-volume-control');
    disabledVolumeControls(volumeControls, audioPlayer.volume);
}

/**
 * Attempts to auto-play the audio element.
 * Handles browser autoplay policies; logs if blocked.
 * @returns A promise that resolves after play attempt.
 */
export async function handlePlayAudio(): Promise<void> {
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement | null;
    if (!audioPlayer) return;

    try {
        await audioPlayer.play();
        const audioPlay = document.getElementById('audio-play') as HTMLElement | null;
        if (audioPlay) simulateClick(audioPlay);
    } catch (error: any) {
        if (error?.name === 'NotAllowedError') {
            // Autoplay blocked by browser policy; surface minimal info
            console.log('Autoplay not allowed', { error });
        }
    }
}

/**
 * Handles click on toggle-mute elements.
 * Toggles 'toggle-state' on mute/unmute elements and auto-plays audio on unmute if not already playing.
 * Determines mute state from data-mute attribute.
 * @param element - The clicked mute toggle element (data-mute = 'true' or 'false').
 */
export function handleToggleMute(element: HTMLElement): void {
    // Toggle UI state
    document.querySelectorAll('.toggle-mute').forEach((el) => el.classList.toggle('toggle-state'));
    document.querySelectorAll('.audio-toggle').forEach((el) => el.classList.toggle('toggle-state'));

    // Apply audio mute/unmute and auto-play if needed
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement | null;
    if (!audioPlayer) return;

    // Determine intended mute state based on the clicked control
    const isMute = element.dataset.mute === 'false';
    let targetMuted: boolean;
    if (isMute) {
        targetMuted = true;
    } else {
        targetMuted = false;
    }

    audioPlayer.muted = targetMuted;

    // If unmuted and not playing, try to start playback
    if (!targetMuted && (audioPlayer.paused || audioPlayer.ended)) {
        handlePlayAudio();
    }
}

/**
 * Handles click on audio-play-pause-toggle elements.
 * Toggles 'toggle-state' on play/pause elements, handles unmute if muted, and plays/pauses audio.
 * Determines play state from data-play attribute.
 * @param element - The clicked play/pause toggle element (data-play = 'true' or 'false').
 */
export function handlePlayPauseToggleAudio(element: HTMLElement): void {
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement | null;
    if (!audioPlayer) return;

    // Toggle UI state if muted
    const isMuted =
        (document.querySelector('.toggle-mute.toggle-state') as HTMLElement)?.dataset.mute ===
        'true';
    if (isMuted) {
        document
            .querySelectorAll('.toggle-mute')
            .forEach((el) => el.classList.toggle('toggle-state'));
        document
            .querySelectorAll('.audio-toggle')
            .forEach((el) => el.classList.toggle('toggle-state'));
    }

    // Determine intended play state based on the clicked control
    const isPlay = element.dataset.play === 'true';
    if (isPlay) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }

    document
        .querySelectorAll('.audio-play-pause-toggle')
        .forEach((el) => el.classList.toggle('toggle-state'));
}
