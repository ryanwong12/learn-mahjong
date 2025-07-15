import { Brain, Flame, Trophy, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type StatsCardProps = {
  progress: {
    correct: number;
    incorrect: number;
    streak: number;
  };
  studiedTiles: Set<string>;
};

const StatsCard = ({ progress, studiedTiles }: StatsCardProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="text-2xl font-bold text-green-600">
              {progress.correct}
            </span>
          </div>
          <p className="text-sm text-gray-600">Correct</p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="p-4">
          <div className="flex items-center justify-center mb-2">
            <X className="w-5 h-5 text-red-500 mr-1" />
            <span className="text-2xl font-bold text-red-600">
              {progress.incorrect}
            </span>
          </div>
          <p className="text-sm text-gray-600">Incorrect</p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="p-4">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 text-orange-500 mr-1" />
            <span className="text-2xl font-bold text-blue-600">
              {progress.streak}
            </span>
          </div>
          <p className="text-sm text-gray-600">Streak</p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="p-4">
          <div className="flex items-center justify-center mb-2">
            <Brain className="w-5 h-5 text-purple-500 mr-1" />
            <span className="text-2xl font-bold text-purple-600">
              {studiedTiles.size}
            </span>
          </div>
          <p className="text-sm text-gray-600">Studied</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default StatsCard;
