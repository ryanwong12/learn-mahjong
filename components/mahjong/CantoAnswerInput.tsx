import { Button } from "../ui/button";

type CantoAnswerInputProps = {
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  handleCantoTextSubmit: () => void;
};

const CantoAnswerInput = ({
  userAnswer,
  setUserAnswer,
  handleCantoTextSubmit,
}: CantoAnswerInputProps) => (
  <div className="space-y-4">
    <input
      type="text"
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && handleCantoTextSubmit()}
      placeholder="Enter Cantonese name..."
      className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Button
      onClick={handleCantoTextSubmit}
      className="w-full"
      disabled={!userAnswer.trim()}
    >
      Submit
    </Button>
  </div>
);

export default CantoAnswerInput;
