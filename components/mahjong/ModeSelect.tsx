import { Button } from "../ui/button";

type Mode = "recognize" | "select" | "type";

interface ModeSelectProps {
  currentMode: Mode;
  setCurrentMode: (mode: Mode) => void;
}

const ModeSelect: React.FC<ModeSelectProps> = ({
  currentMode,
  setCurrentMode,
}) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={currentMode === "recognize" ? "default" : "outline"}
        onClick={() => setCurrentMode("recognize")}
        className="flex-1"
      >
        🀄 → 文字
      </Button>
      <Button
        variant={currentMode === "select" ? "default" : "outline"}
        onClick={() => setCurrentMode("select")}
        className="flex-1"
      >
        文字 → 🀄
      </Button>
      <Button
        variant={currentMode === "type" ? "default" : "outline"}
        onClick={() => setCurrentMode("type")}
        className="flex-1"
      >
        Type
      </Button>
    </div>
  );
};

export default ModeSelect;
