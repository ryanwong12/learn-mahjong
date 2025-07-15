import MahjongTile from "@/types/MahjongTile";
import TileCategory from "@/types/TileCategory";

const HonourTiles: MahjongTile[] = [
  {
    id: "east",
    nameCantonese: "東",
    nameEnglish: "East Wind",
    category: TileCategory.Honour,
    unicode: "🀀",
    pinyin: "dung1",
  },
  {
    id: "south",
    nameCantonese: "南",
    nameEnglish: "South Wind",
    category: TileCategory.Honour,
    unicode: "🀁",
    pinyin: "naam4",
  },
  {
    id: "west",
    nameCantonese: "西",
    nameEnglish: "West Wind",
    category: TileCategory.Honour,
    unicode: "🀂",
    pinyin: "sai1",
  },
  {
    id: "north",
    nameCantonese: "北",
    nameEnglish: "North Wind",
    category: TileCategory.Honour,
    unicode: "🀃",
    pinyin: "bak1",
  },
  {
    id: "red",
    nameCantonese: "中",
    nameEnglish: "Red Dragon",
    category: TileCategory.Honour,
    unicode: "🀄",
    pinyin: "zung1",
  },
  {
    id: "green",
    nameCantonese: "發",
    nameEnglish: "Green Dragon",
    category: TileCategory.Honour,
    unicode: "🀅",
    pinyin: "faat3",
  },
  {
    id: "white",
    nameCantonese: "白",
    nameEnglish: "White Dragon",
    category: TileCategory.Honour,
    unicode: "🀆",
    pinyin: "baak6",
  },
];

export default HonourTiles;