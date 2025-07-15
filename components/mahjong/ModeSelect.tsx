import GameMode from "@/types/GameMode";
import { Button } from "../ui/button";

interface ModeSelectProps {
  currentMode: GameMode;
  setCurrentMode: (mode: GameMode) => void;
}

const ModeSelect: React.FC<ModeSelectProps> = ({
  currentMode,
  setCurrentMode,
}) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={currentMode === GameMode.Recognize ? "default" : "outline"}
        onClick={() => setCurrentMode(GameMode.Recognize)}
        className="flex-1"
      >
        🀄 → 文字
      </Button>
      <Button
        variant={currentMode === GameMode.Select ? "default" : "outline"}
        onClick={() => setCurrentMode(GameMode.Select)}
        className="flex-1"
      >
        文字 → 🀄
      </Button>
      <Button
        variant={currentMode === GameMode.Type ? "default" : "outline"}
        onClick={() => setCurrentMode(GameMode.Type)}
        className="flex-1"
      >
        Type
      </Button>
    </div>
  );
};

export default ModeSelect;
