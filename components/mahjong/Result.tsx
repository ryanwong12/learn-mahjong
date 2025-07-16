import Question from "@/types/Question";
import { Button } from "../ui/button";
import GameMode from "@/types/GameMode";
import TileDisplay from "./TileDisplay";

type ResultProps = {
  gamemode: GameMode;
  isCorrect: boolean;
  currentQuestion: Question;
  nextQuestion: () => void;
};

const Result = ({
  gamemode,
  isCorrect,
  currentQuestion,
  nextQuestion,
}: ResultProps) => (
  <div className="space-y-4">
    <div
      className={`text-2xl font-bold ${
        isCorrect ? "text-green-600" : "text-red-600"
      }`}
    >
      {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
    </div>
    <div className="text-lg">
      <div className="font-semibold text-gray-800">
        {currentQuestion.tile.nameCantonese}
      </div>
      <div className="text-gray-600">{currentQuestion.tile.nameEnglish}</div>
      {gamemode === GameMode.SelectPinyin ? (
        <div className="text-sm text-gray-500">
          {currentQuestion.tile.pinyin}
        </div>
      ) : (
        <div>
          <TileDisplay
            tile={currentQuestion.tile}
            // className="w-24 h-24 mx-auto"
          />
        </div>
      )}
    </div>
    <Button onClick={nextQuestion} className="w-full">
      Next Question
    </Button>
  </div>
);

export default Result;
