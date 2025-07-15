import GameMode from "./GameMode";
import MahjongTile from "./MahjongTile";

interface Question {
  tile: MahjongTile;
  options?: MahjongTile[];
  mode: GameMode;
}

export default Question;