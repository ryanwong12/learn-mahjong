import MahjongTile from "@/types/MahjongTile";
import Image from 'next/image'

const TileDisplay = ({ tile }: { tile: MahjongTile }) => (
  <div className="tile-container flex justify-center">
    {/* Try Unicode first */}
    {/* <span className="unicode-tile">{tile.unicode}</span> */}
    {/* SVG fallback */}
    <img
      src={`/tiles/svg/${tile.category}/${tile.id}.svg`}
      alt={tile.nameEnglish}
    />
  </div>
);

export default TileDisplay;
