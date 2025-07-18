import MahjongTile from "@/types/MahjongTile";
import Image from 'next/image'

const TileDisplay = ({ tile }: { tile: MahjongTile }) => (
  <div className="tile-container flex justify-center">
    {/* Try Unicode first */}
    {/* <span className="unicode-tile">{tile.unicode}</span> */}
    {/* SVG fallback */}
    <Image
      src={`/tiles/svg/${tile.category}/${tile.id}.svg`}
      alt={tile.nameEnglish}
      width={100}
      height={100}
    />
  </div>
);

export default TileDisplay;
