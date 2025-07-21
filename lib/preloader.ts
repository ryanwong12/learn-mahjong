// Asset preloader for mahjong learning app

import MahjongTiles from "@/constants/MahjongTiles";

let preloadingStarted = false;
let preloadingComplete = false;

// Keep track of preloaded assets
const preloadedImages = new Map<string, HTMLImageElement>();
const preloadedAudio = new Map<string, HTMLAudioElement>();

/**
 * Preload all tile images
 */
const preloadTileImages = (): Promise<void[]> => {
  const imagePromises = MahjongTiles.map((tile) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        preloadedImages.set(tile.id, img);
        resolve();
      };

      img.onerror = () => {
        console.warn(`Failed to preload image for tile: ${tile.id}`);
        resolve(); // Don't reject to prevent breaking the entire preload process
      };

      // Construct the image path based on your tile structure
      img.src = `/tiles/svg/${tile.category}/${tile.id}.svg`;
    });
  });

  return Promise.all(imagePromises);
};

/**
 * Preload audio files
 */
const preloadAudio = (): Promise<void[]> => {
  const audioFiles = ['/sounds/tile_sound.mp3'];

  const audioPromises = audioFiles.map((audioPath) => {
    return new Promise<void>((resolve) => {
      try {
        const audio = new Audio();

        audio.addEventListener('canplaythrough', () => {
          preloadedAudio.set(audioPath, audio);
          resolve();
        });

        audio.addEventListener('error', () => {
          console.warn(`Failed to preload audio: ${audioPath}`);
          resolve(); // Don't reject
        });

        audio.preload = 'auto';
        audio.src = audioPath;
      } catch (error) {
        console.warn(`Error setting up audio preload for: ${audioPath}`, error);
        resolve();
      }
    });
  });

  return Promise.all(audioPromises);
};

/**
 * Preload all assets (images and audio)
 */
export const preloadAssets = async (): Promise<void> => {
  if (preloadingStarted) return;

  preloadingStarted = true;
  console.log('Starting asset preload...');

  try {
    // Preload images and audio in parallel
    await Promise.all([
      preloadTileImages(),
      preloadAudio()
    ]);

    preloadingComplete = true;
    console.log(`Asset preload complete! Loaded ${preloadedImages.size} images and ${preloadedAudio.size} audio files.`);
  } catch (error) {
    console.error('Error during asset preloading:', error);
  }
};

/**
 * Check if assets are preloaded
 */
export const areAssetsPreloaded = (): boolean => {
  return preloadingComplete;
};

/**
 * Get preloaded image (returns null if not preloaded)
 */
export const getPreloadedImage = (tileId: string): HTMLImageElement | null => {
  return preloadedImages.get(tileId) || null;
};

/**
 * Get preloaded audio (returns null if not preloaded)
 */
export const getPreloadedAudio = (audioPath: string): HTMLAudioElement | null => {
  return preloadedAudio.get(audioPath) || null;
};

/**
 * Preload assets on user interaction (better for mobile)
 */
export const preloadAssetsOnUserInteraction = (): void => {
  // Start preloading in the background after first user interaction
  setTimeout(() => {
    preloadAssets();
  }, 100); // Small delay to not interfere with the user action
};
