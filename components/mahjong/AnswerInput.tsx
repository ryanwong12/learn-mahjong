import Question from "@/types/Question";
import { Button } from "../ui/button";
import MahjongTile from "@/types/MahjongTile";

type AnswerInputProps = {
  currentMode: "select" | "input" | string;
  currentQuestion: Question;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  handleTextSubmit: () => void;
  handleOptionSelect: (selectedTile: MahjongTile) => void;
};

const AnswerInput: React.FC<AnswerInputProps> = ({
  currentMode,
  currentQuestion,
  userAnswer,
  setUserAnswer,
  handleTextSubmit,
  handleOptionSelect,
}) => (
  <div>
    {currentMode === "select" && currentQuestion.options ? (
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            onClick={() => handleOptionSelect(option)}
            className="h-20 text-4xl"
          >
            {option.unicode}
          </Button>
        ))}
      </div>
    ) : (
      <div className="space-y-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleTextSubmit()}
          placeholder="Enter Cantonese name..."
          className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleTextSubmit}
          className="w-full"
          disabled={!userAnswer.trim()}
        >
          Submit
        </Button>
      </div>
    )}
  </div>
);

export default AnswerInput;
