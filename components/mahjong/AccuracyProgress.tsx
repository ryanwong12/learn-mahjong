import { Progress } from "@radix-ui/react-progress";
import { Card, CardContent } from "../ui/card";

interface AccuracyProgressProps {
  accuracy: number;
}

const AccuracyProgress = ({ accuracy }: AccuracyProgressProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Accuracy</span>
          <span className="text-sm font-medium">{accuracy.toFixed(1)}%</span>
        </div>
        <Progress
          value={accuracy}
          className="h-2 bg-gray-200 rounded"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            className="bg-green-500 h-2 rounded"
            style={{
              width: `${accuracy}%`,
              position: "absolute",
              top: 0,
              left: 0,
              transition: "width 0.3s",
            }}
          />
        </Progress>
      </CardContent>
    </Card>
  );
};

export default AccuracyProgress;
