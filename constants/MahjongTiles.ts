// Mahjong tile data with Cantonese names

import MahjongTile from "@/types/MahjongTile";
import DotTiles from "./DotTiles";
import BambooTiles from "./BambooTiles";
import CharacterTiles from "./CharacterTiles";
import HonourTiles from "./HonourTiles";

const MahjongTiles: MahjongTile[] = [
  // Dots (筒子)
  ...DotTiles,
  // Bamboo (索子)
  ...BambooTiles,

  // Characters (萬子)
  ...CharacterTiles,

  // Honor tiles
  ...HonourTiles,
];

export default MahjongTiles;
export { DotTiles, BambooTiles, CharacterTiles, HonourTiles };