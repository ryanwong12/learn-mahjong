import { Button } from "../ui/button";
import { playClickSound, playSoundSafely } from "@/lib/sounds";

type RomanAnswerInputProps = {
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  handleTextSubmit: () => void;
};

const RomanAnswerInput = ({
  userAnswer,
  setUserAnswer,
  handleTextSubmit,
}: RomanAnswerInputProps) => (
  <div className="space-y-4">
    <input
      type="text"
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && handleTextSubmit()}
      placeholder="Enter Cantonese romanized name..."
      className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Button
      onClick={() => {
        playSoundSafely(playClickSound);
        handleTextSubmit();
      }}
      className="w-full"
      disabled={!userAnswer.trim()}
    >
      Submit
    </Button>
  </div>
);

export default RomanAnswerInput;
