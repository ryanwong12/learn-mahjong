"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Volume2, Check, X, RotateCcw, Trophy, Brain } from "lucide-react";
import StatsCard from "@/components/mahjong/StatsCard";
import AccuracyProgress from "@/components/mahjong/AccuracyProgress";

// Mahjong tile data with Cantonese names
interface MahjongTile {
  id: string;
  nameCantonese: string;
  nameEnglish: string;
  category: "dots" | "bamboo" | "characters" | "honors" | "flowers";
  unicode: string;
  pinyin?: string;
}

const mahjongTiles: MahjongTile[] = [
  // Dots (筒子)
  {
    id: "1d",
    nameCantonese: "一筒",
    nameEnglish: "1 Dot",
    category: "dots",
    unicode: "🀙",
    pinyin: "yat1 tung2",
  },
  {
    id: "2d",
    nameCantonese: "二筒",
    nameEnglish: "2 Dots",
    category: "dots",
    unicode: "🀚",
    pinyin: "yi6 tung2",
  },
  {
    id: "3d",
    nameCantonese: "三筒",
    nameEnglish: "3 Dots",
    category: "dots",
    unicode: "🀛",
    pinyin: "saam1 tung2",
  },
  {
    id: "4d",
    nameCantonese: "四筒",
    nameEnglish: "4 Dots",
    category: "dots",
    unicode: "🀜",
    pinyin: "sei3 tung2",
  },
  {
    id: "5d",
    nameCantonese: "五筒",
    nameEnglish: "5 Dots",
    category: "dots",
    unicode: "🀝",
    pinyin: "ng5 tung2",
  },
  {
    id: "6d",
    nameCantonese: "六筒",
    nameEnglish: "6 Dots",
    category: "dots",
    unicode: "🀞",
    pinyin: "luk6 tung2",
  },
  {
    id: "7d",
    nameCantonese: "七筒",
    nameEnglish: "7 Dots",
    category: "dots",
    unicode: "🀟",
    pinyin: "cat1 tung2",
  },
  {
    id: "8d",
    nameCantonese: "八筒",
    nameEnglish: "8 Dots",
    category: "dots",
    unicode: "🀠",
    pinyin: "baat3 tung2",
  },
  {
    id: "9d",
    nameCantonese: "九筒",
    nameEnglish: "9 Dots",
    category: "dots",
    unicode: "🀡",
    pinyin: "gau2 tung2",
  },

  // Bamboo (索子)
  {
    id: "1b",
    nameCantonese: "一索",
    nameEnglish: "1 Bamboo",
    category: "bamboo",
    unicode: "🀐",
    pinyin: "yat1 sok3",
  },
  {
    id: "2b",
    nameCantonese: "二索",
    nameEnglish: "2 Bamboo",
    category: "bamboo",
    unicode: "🀑",
    pinyin: "yi6 sok3",
  },
  {
    id: "3b",
    nameCantonese: "三索",
    nameEnglish: "3 Bamboo",
    category: "bamboo",
    unicode: "🀒",
    pinyin: "saam1 sok3",
  },
  {
    id: "4b",
    nameCantonese: "四索",
    nameEnglish: "4 Bamboo",
    category: "bamboo",
    unicode: "🀓",
    pinyin: "sei3 sok3",
  },
  {
    id: "5b",
    nameCantonese: "五索",
    nameEnglish: "5 Bamboo",
    category: "bamboo",
    unicode: "🀔",
    pinyin: "ng5 sok3",
  },
  {
    id: "6b",
    nameCantonese: "六索",
    nameEnglish: "6 Bamboo",
    category: "bamboo",
    unicode: "🀕",
    pinyin: "luk6 sok3",
  },
  {
    id: "7b",
    nameCantonese: "七索",
    nameEnglish: "7 Bamboo",
    category: "bamboo",
    unicode: "🀖",
    pinyin: "cat1 sok3",
  },
  {
    id: "8b",
    nameCantonese: "八索",
    nameEnglish: "8 Bamboo",
    category: "bamboo",
    unicode: "🀗",
    pinyin: "baat3 sok3",
  },
  {
    id: "9b",
    nameCantonese: "九索",
    nameEnglish: "9 Bamboo",
    category: "bamboo",
    unicode: "🀘",
    pinyin: "gau2 sok3",
  },

  // Characters (萬子)
  {
    id: "1c",
    nameCantonese: "一萬",
    nameEnglish: "1 Character",
    category: "characters",
    unicode: "🀇",
    pinyin: "yat1 maan6",
  },
  {
    id: "2c",
    nameCantonese: "二萬",
    nameEnglish: "2 Characters",
    category: "characters",
    unicode: "🀈",
    pinyin: "yi6 maan6",
  },
  {
    id: "3c",
    nameCantonese: "三萬",
    nameEnglish: "3 Characters",
    category: "characters",
    unicode: "🀉",
    pinyin: "saam1 maan6",
  },
  {
    id: "4c",
    nameCantonese: "四萬",
    nameEnglish: "4 Characters",
    category: "characters",
    unicode: "🀊",
    pinyin: "sei3 maan6",
  },
  {
    id: "5c",
    nameCantonese: "五萬",
    nameEnglish: "5 Characters",
    category: "characters",
    unicode: "🀋",
    pinyin: "ng5 maan6",
  },

  // Honor tiles
  {
    id: "east",
    nameCantonese: "東",
    nameEnglish: "East Wind",
    category: "honors",
    unicode: "🀀",
    pinyin: "dung1",
  },
  {
    id: "south",
    nameCantonese: "南",
    nameEnglish: "South Wind",
    category: "honors",
    unicode: "🀁",
    pinyin: "naam4",
  },
  {
    id: "west",
    nameCantonese: "西",
    nameEnglish: "West Wind",
    category: "honors",
    unicode: "🀂",
    pinyin: "sai1",
  },
  {
    id: "north",
    nameCantonese: "北",
    nameEnglish: "North Wind",
    category: "honors",
    unicode: "🀃",
    pinyin: "bak1",
  },
  {
    id: "red",
    nameCantonese: "中",
    nameEnglish: "Red Dragon",
    category: "honors",
    unicode: "🀄",
    pinyin: "zung1",
  },
  {
    id: "green",
    nameCantonese: "發",
    nameEnglish: "Green Dragon",
    category: "honors",
    unicode: "🀅",
    pinyin: "faat3",
  },
  {
    id: "white",
    nameCantonese: "白",
    nameEnglish: "White Dragon",
    category: "honors",
    unicode: "🀆",
    pinyin: "baak6",
  },
];

type GameMode = "recognize" | "select" | "type";

interface Question {
  tile: MahjongTile;
  options?: MahjongTile[];
  mode: GameMode;
}

interface UserProgress {
  correct: number;
  incorrect: number;
  streak: number;
  totalAnswered: number;
}

export default function MahjongLearningApp() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgress>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    totalAnswered: 0,
  });
  const [currentMode, setCurrentMode] = useState<GameMode>("recognize");
  const [studiedTiles, setStudiedTiles] = useState<Set<string>>(new Set());
  const [showEnglishNames, setShowEnglishNames] = useState<boolean>(true);

  // Generate a new question
  const generateQuestion = () => {
    const randomTile =
      mahjongTiles[Math.floor(Math.random() * mahjongTiles.length)];

    let question: Question;

    if (currentMode === "recognize") {
      // Show tile, user types Cantonese name
      question = {
        tile: randomTile,
        mode: "recognize",
      };
    } else if (currentMode === "select") {
      // Show Cantonese name, user selects correct tile
      const incorrectOptions = mahjongTiles
        .filter((t) => t.id !== randomTile.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      question = {
        tile: randomTile,
        options: [randomTile, ...incorrectOptions].sort(
          () => Math.random() - 0.5
        ),
        mode: "select",
      };
    } else {
      // Type mode - show tile, user types name
      question = {
        tile: randomTile,
        mode: "type",
      };
    }

    setCurrentQuestion(question);
    setUserAnswer("");
    setShowResult(false);
    setStudiedTiles((prev) => new Set([...prev, randomTile.id]));
  };

  // Check answer
  const checkAnswer = (answer: string) => {
    if (!currentQuestion) return;

    const correct = answer === currentQuestion.tile.nameCantonese;
    setIsCorrect(correct);
    setShowResult(true);

    setProgress((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      streak: correct ? prev.streak + 1 : 0,
      totalAnswered: prev.totalAnswered + 1,
    }));
  };

  // Handle option selection
  const handleOptionSelect = (selectedTile: MahjongTile) => {
    setUserAnswer(selectedTile.nameCantonese);
    checkAnswer(selectedTile.nameCantonese);
  };

  // Handle text input
  const handleTextSubmit = () => {
    checkAnswer(userAnswer);
  };

  // Next question
  const nextQuestion = () => {
    generateQuestion();
  };

  // Reset progress
  const resetProgress = () => {
    setProgress({
      correct: 0,
      incorrect: 0,
      streak: 0,
      totalAnswered: 0,
    });
    setStudiedTiles(new Set());
    generateQuestion();
  };

  // Initialize first question
  useEffect(() => {
    generateQuestion();
  }, [currentMode]);

  const accuracy =
    progress.totalAnswered > 0
      ? (progress.correct / progress.totalAnswered) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🀄 麻雀學習</h1>
          <p className="text-lg text-gray-600">
            Learn Mahjong Tiles in Cantonese
          </p>
        </div>

        {/* Stats */}
        <StatsCard progress={progress} studiedTiles={studiedTiles} />

        {/* Accuracy Progress */}
        <AccuracyProgress accuracy={accuracy} />

        {/* Sound Toggle */}

        {/* Mode Selection */}
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

        {/* Show English Names Toggle */}
        <div className="mb-6">
          <span className="text-sm font-medium">Show English Names</span>
          <Switch
            checked={showEnglishNames}
            onClick={() => setShowEnglishNames(!showEnglishNames)}
            className="ml-2"
          />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">
              {currentMode === "recognize"
                ? "What is this tile called?"
                : currentMode === "select"
                ? "Select the correct tile:"
                : "Type the Cantonese name:"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion && (
              <div className="text-center">
                {currentMode === "recognize" || currentMode === "type" ? (
                  <div className="mb-6">
                    <div className="text-8xl mb-4">
                      {currentQuestion.tile.unicode}
                    </div>
                    {showEnglishNames && (
                      <div className="text-lg text-gray-600 mb-2">
                        {currentQuestion.tile.nameEnglish}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      {currentQuestion.tile.pinyin}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-4 text-gray-800">
                      {currentQuestion.tile.nameCantonese}
                    </div>
                    {showEnglishNames && (
                      <div className="text-lg text-gray-600 mb-2">
                        {currentQuestion.tile.nameEnglish}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      {currentQuestion.tile.pinyin}
                    </div>
                  </div>
                )}

                {/* Answer Input */}
                {!showResult && (
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
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleTextSubmit()
                          }
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
                )}

                {/* Result */}
                {showResult && (
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
                      <div className="text-gray-600">
                        {currentQuestion.tile.nameEnglish}
                      </div>
                      <div className="text-sm text-gray-500">
                        {currentQuestion.tile.pinyin}
                      </div>
                    </div>
                    <Button onClick={nextQuestion} className="w-full">
                      Next Question
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reset Button */}
        <div className="text-center">
          <Button variant="outline" onClick={resetProgress} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
