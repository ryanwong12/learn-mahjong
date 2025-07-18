// Sound utility functions for the mahjong learning app

// Create multiple audio instances to prevent Safari lag
const audioPool: HTMLAudioElement[] = [];
let currentAudioIndex = 0;
let isAudioInitialized = false;

/**
 * Initialize audio pool for better Safari performance
 */
const initializeAudioPool = () => {
  if (isAudioInitialized) return;

  try {
    // Create a pool of 3 audio instances to prevent Safari lag
    for (let i = 0; i < 3; i++) {
      const audio = new Audio('/sounds/tile_sound.mp3');
      audio.volume = 0.3; // Lower volume for mobile
      audio.preload = 'auto';

      // Important for Safari: load the audio
      audio.load();

      audioPool.push(audio);
    }
    isAudioInitialized = true;
  } catch (error) {
    console.warn('Could not initialize audio pool:', error);
  }
};

/**
 * Plays an MP3 click sound effect (Safari optimized)
 */
export const playClickSound = () => {
  try {
    // Initialize audio pool if not done already (must be in same user interaction for Safari)
    if (!isAudioInitialized) {
      initializeAudioPool();

      // For Safari: immediately try to play on first interaction
      if (audioPool.length > 0) {
        const audio = audioPool[0];
        audio.currentTime = 0;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('First audio play blocked:', error);
          });
        }
        return; // Exit early on first initialization
      }
    }

    if (audioPool.length === 0) return;

    // Get the next audio instance from the pool
    const audio = audioPool[currentAudioIndex];
    currentAudioIndex = (currentAudioIndex + 1) % audioPool.length;

    // Reset and play
    audio.currentTime = 0;

    // Use a promise to handle Safari's async audio better
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Safari often blocks autoplay, this is normal
        console.warn('Audio play blocked (likely due to autoplay policy):', error);
      });
    }

  } catch (error) {
    console.warn('Could not play click sound:', error);
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
