import Question from "@/types/Question";
import { Button } from "../ui/button";

type ResultProps = {
  isCorrect: boolean;
  currentQuestion: Question;
  nextQuestion: () => void;
};

const Result = ({ isCorrect, currentQuestion, nextQuestion }: ResultProps) => (
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
      <div className="text-sm text-gray-500">{currentQuestion.tile.pinyin}</div>
    </div>
    <Button onClick={nextQuestion} className="w-full">
      Next Question
    </Button>
  </div>
);

export default Result;
