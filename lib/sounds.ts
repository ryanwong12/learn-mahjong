// Sound utility functions for the mahjong learning app

// Create a single audio instance that can be reused
let clickAudio: HTMLAudioElement | null = null;

/**
 * Plays an MP3 click sound effect
 */
export const playClickSound = () => {
  try {
    // Initialize audio if it doesn't exist
    if (!clickAudio) {
      clickAudio = new Audio('/sounds/tile_sound.mp3');
      clickAudio.volume = 0.5; // Set volume to 50%
      clickAudio.preload = 'auto';
    }

    // Reset the audio to the beginning and play
    clickAudio.currentTime = 0;
    clickAudio.play().catch((error) => {
      console.warn('Could not play click sound:', error);
    });
  } catch (error) {
    console.warn('Could not initialize or play click sound:', error);
  }
};

/**
 * Plays a click sound effect using Web Audio API (fallback)
 */
export const playWebAudioClickSound = () => {
  // Create a simple click sound using Web Audio API
  const audioContext = new (
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext; }).webkitAudioContext!
  )();

  // Create oscillator for a brief tone
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Connect audio nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Configure the sound
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800 Hz tone
  oscillator.type = 'square'; // Square wave for a more digital sound

  // Configure volume envelope (quick fade out)
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

  // Play the sound
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

/**
 * Plays a sound effect with error handling
 */
export const playSoundSafely = (soundFunction: () => void) => {
  try {
    soundFunction();
  } catch (error) {
    console.warn('Could not play sound:', error);
  }
};
