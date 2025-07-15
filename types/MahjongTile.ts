import TileCategory from "./TileCategory";

interface MahjongTile {
  id: string;
  nameCantonese: string;
  nameEnglish: string;
  category: TileCategory;
  unicode: string;
  pinyin?: string;
}

export default MahjongTile;