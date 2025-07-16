import Question from "@/types/Question";
import { Button } from "../ui/button";
import MahjongTile from "@/types/MahjongTile";
import GameMode from "@/types/GameMode";
import RomanAnswerInput from "./RomanAnswerInput";
import TileDisplay from "./TileDisplay";

type AnswerInputProps = {
  currentMode: GameMode;
  currentQuestion: Question;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  handleRomanTextSubmit: () => void;
  handleOptionSelect: (selectedTile: MahjongTile) => void;
};

const AnswerInput: React.FC<AnswerInputProps> = ({
  currentMode,
  currentQuestion,
  userAnswer,
  setUserAnswer,
  handleRomanTextSubmit,
  handleOptionSelect,
}) => {
  switch (currentMode) {
    case GameMode.SelectPinyin:
      return (
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options?.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => handleOptionSelect(option)}
              className="h-20 text-2xl flex flex-col items-center justify-center"
            >
              {option.pinyin}
            </Button>
          ))}
        </div>
      );

    case GameMode.Type:
      return (
        <RomanAnswerInput
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          handleTextSubmit={handleRomanTextSubmit}
        />
      );
    case GameMode.SelectTile:
      return (
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options?.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => handleOptionSelect(option)}
              className="h-20 text-4xl flex items-center justify-center p-2"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <TileDisplay tile={option} />
              </div>
            </Button>
          ))}
        </div>
      );
  }
};

export default AnswerInput;
