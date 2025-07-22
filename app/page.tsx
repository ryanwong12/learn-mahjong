"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/mahjong/StatsCard";
import AccuracyProgress from "@/components/mahjong/AccuracyProgress";
import ModeSelect from "@/components/mahjong/ModeSelect";
import MahjongTiles from "@/constants/MahjongTiles";
import MahjongTile from "@/types/MahjongTile";
import GameMode from "@/types/GameMode";
import Question from "@/types/Question";
import UserProgress from "@/types/UserProgress";
import AnswerInput from "@/components/mahjong/AnswerInput";
import Result from "@/components/mahjong/Result";
import TileDisplay from "@/components/mahjong/TileDisplay";
import TileCategory from "@/types/TileCategory";
import SettingsMenu from "@/components/mahjong/SettingsMenu";
import { preloadAssets } from "@/lib/preloader";

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
  const [currentMode, setCurrentMode] = useState<GameMode>(
    GameMode.SelectPinyin
  );
  const [studiedTiles, setStudiedTiles] = useState<Set<string>>(new Set());
  const [showEnglishNames, setShowEnglishNames] = useState<boolean>(false);
  const [hardMode, setHardMode] = useState<boolean>(false);
  const [showChineseNames, setShowChineseNames] = useState<boolean>(false);

  // Generate a new question
  const generateQuestion = () => {
    const randomTile =
      MahjongTiles[Math.floor(Math.random() * MahjongTiles.length)];

    let question: Question;

    if (currentMode === GameMode.SelectPinyin && hardMode) {
      // Show tile, user selects Pinyin
      const randomNumber = Math.random();
      // 50% chance to show tile, 50% chance to show Pinyin
      let incorrectOptions: MahjongTile[] = [];
      if (randomNumber < 0.5) {
        // all same category
        incorrectOptions = MahjongTiles.filter(
          (t) => t.id !== randomTile.id && t.category === randomTile.category
        )
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
      } else {
        // all different category
        if (
          [
            TileCategory.Bamboo,
            TileCategory.Dot,
            TileCategory.Character,
          ].includes(randomTile.category)
        ) {
          // Number tile: pick same number from other categories, plus a random tile from the same category
          const otherCategories = [
            TileCategory.Bamboo,
            TileCategory.Dot,
            TileCategory.Character,
          ].filter((cat) => cat !== randomTile.category);
          const sameNumberTiles = MahjongTiles.filter(
            (t) =>
              t.category !== randomTile.category &&
              otherCategories.includes(t.category) &&
              t.id[0] === randomTile.id[0] //id is like "1b", "2b", etc. so the first character is the number
          );
          // Pick a random tile that's not a repeat and not same category/number
          const excludeIds = [
            randomTile.id,
            ...sameNumberTiles.map((t) => t.id),
          ];
          const randomTileExtra = MahjongTiles.filter(
            (t) =>
              !excludeIds.includes(t.id) && t.category === randomTile.category
          );
          const extra =
            randomTileExtra[Math.floor(Math.random() * randomTileExtra.length)];
          incorrectOptions = [...sameNumberTiles, extra].slice(0, 3);
        } else {
          // Honour tile: pick 3 random honour tiles that are not the current one
          incorrectOptions = MahjongTiles.filter(
            (t) =>
              t.category !== TileCategory.Bamboo &&
              t.category !== TileCategory.Dot &&
              t.category !== TileCategory.Character &&
              t.id !== randomTile.id
          )
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        }
      }

      question = {
        tile: randomTile,
        options: [randomTile, ...incorrectOptions].sort(
          () => Math.random() - 0.5
        ),
        mode: GameMode.SelectPinyin,
      };
    } else if (currentMode === GameMode.SelectPinyin) {
      // Show tile, user selects Pinyin
      const incorrectOptions = MahjongTiles.filter(
        (t) => t.id !== randomTile.id
      )
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      question = {
        tile: randomTile,
        options: [randomTile, ...incorrectOptions].sort(
          () => Math.random() - 0.5
        ),
        mode: GameMode.SelectPinyin,
      };
    } else if (currentMode === GameMode.SelectTile && hardMode) {
      // Show Pinyin, user selects correct tile
      const incorrectOptions = MahjongTiles.filter(
        (t) => t.id !== randomTile.id && t.category === randomTile.category
      )
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      question = {
        tile: randomTile,
        options: [randomTile, ...incorrectOptions].sort(
          () => Math.random() - 0.5
        ),
        mode: GameMode.SelectTile,
      };
    } else if (currentMode === GameMode.SelectTile) {
      // Show Cantonese name, user selects correct tile
      const incorrectOptions = MahjongTiles.filter(
        (t) => t.id !== randomTile.id
      )
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      question = {
        tile: randomTile,
        options: [randomTile, ...incorrectOptions].sort(
          () => Math.random() - 0.5
        ),
        mode: GameMode.SelectTile,
      };
    } else {
      // Type mode - show tile, user types name
      question = {
        tile: randomTile,
        mode: GameMode.Type,
      };
    }

    setCurrentQuestion(question);
    setUserAnswer("");
    setShowResult(false);
    setStudiedTiles((prev) => new Set([...prev, randomTile.id]));
  };

  // Check answer in cantonese
  const checkAnswerCanto = (answer: string) => {
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

  // Check answer in english
  const checkAnswerRoman = (answer: string) => {
    if (!currentQuestion) return;

    const correct = answer === currentQuestion.tile.pinyin;
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
    checkAnswerCanto(selectedTile.nameCantonese);
  };

  // Handle canto text input
  const handleCantoTextSubmit = () => {
    checkAnswerCanto(userAnswer);
  };

  // Handle english text input
  const handleRomanTextSubmit = () => {
    checkAnswerRoman(userAnswer);
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

  // Start preloading assets after component mounts
  useEffect(() => {
    // Preload assets in the background
    preloadAssets().catch((error) => {
      console.warn("Asset preloading failed:", error);
    });
  }, []);

  const accuracy =
    progress.totalAnswered > 0
      ? (progress.correct / progress.totalAnswered) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <SettingsMenu
            showEnglishNames={showEnglishNames}
            setShowEnglishNames={setShowEnglishNames}
            showChineseNames={showChineseNames}
            setShowChineseNames={setShowChineseNames}
            hardMode={hardMode}
            setHardMode={setHardMode}
            resetProgress={resetProgress}
          />
          <div className="text-center flex-1 mx-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">
              <span className="md:hidden">🀄 🐣🤲</span>
              <span className="hidden md:inline">🀄 麻雀學習</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-600 hidden md:block">
              Learn Mahjong Tiles in Cantonese
            </p>
          </div>
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          </button>
        </div>

        {/* Sound Toggle */}

        {/* Mode Selection */}
        <ModeSelect currentMode={currentMode} setCurrentMode={setCurrentMode} />

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader className="flex items-center justify-between">
            {/* Settings on the left */}
            <div className="flex-1 flex justify-center items-center">
              <CardTitle className="text-center">
                {currentMode === GameMode.SelectPinyin
                  ? "What is this tile called?"
                  : currentMode === GameMode.SelectTile
                  ? "Select the correct tile:"
                  : "Type the Cantonese name:"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {currentQuestion && (
              <div className="text-center">
                {currentMode === GameMode.SelectPinyin ||
                currentMode === GameMode.Type ? (
                  <div className="mb-6">
                    <div className="text-8xl mb-4">
                      <TileDisplay tile={currentQuestion.tile} />
                    </div>
                    {showEnglishNames && (
                      <div className="text-lg text-gray-600 mb-2">
                        {currentQuestion.tile.nameEnglish}
                      </div>
                    )}
                    {/* <div className="text-sm text-gray-500">
                      {currentQuestion.tile.pinyin}
                    </div> */}
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-4 text-gray-800">
                      {currentQuestion.tile.pinyin}
                    </div>
                    {showChineseNames && (
                      <div className="text-lg text-gray-600 mb-2">
                        {currentQuestion.tile.nameCantonese}
                      </div>
                    )}
                    {showEnglishNames && (
                      <div className="text-lg text-gray-600 mb-2">
                        {currentQuestion.tile.nameEnglish}
                      </div>
                    )}
                    {/* {!hardMode && (
                      <div className="text-sm text-gray-500">
                        {currentQuestion.tile.nameCantonese}
                      </div>
                    )} */}
                  </div>
                )}

                {/* Answer Input */}
                {!showResult && (
                  <AnswerInput
                    currentMode={currentMode}
                    currentQuestion={currentQuestion}
                    userAnswer={userAnswer}
                    setUserAnswer={setUserAnswer}
                    handleRomanTextSubmit={handleRomanTextSubmit}
                    handleOptionSelect={handleOptionSelect}
                    showChineseNames={showChineseNames}
                  />
                )}

                {/* Result */}
                {showResult && (
                  <Result
                    gamemode={currentMode}
                    isCorrect={isCorrect}
                    currentQuestion={currentQuestion}
                    nextQuestion={nextQuestion}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Accuracy Progress */}
        <AccuracyProgress accuracy={accuracy} />

        {/* Stats (Dropdown on mobile) */}
        <div className="mb-4">
          <div className="block md:hidden">
            <details>
              <summary className="cursor-pointer font-semibold text-gray-700">
                Show Stats
              </summary>
              <div className="mt-2">
                <StatsCard progress={progress} studiedTiles={studiedTiles} />
              </div>
            </details>
          </div>
          <div className="hidden md:block">
            <StatsCard progress={progress} studiedTiles={studiedTiles} />
          </div>
        </div>
      </div>
    </div>
  );
}
