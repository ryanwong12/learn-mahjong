interface MahjongTile {
  id: string;
  nameCantonese: string;
  nameEnglish: string;
  category: "dots" | "bamboo" | "characters" | "honors" | "flowers";
  unicode: string;
  pinyin?: string;
}

export default MahjongTile;