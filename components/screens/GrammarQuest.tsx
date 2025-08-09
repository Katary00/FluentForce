/**
 * FluentForce - Grammar Quest Game Component
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 */
import React from "react";
import {
  ArrowLeft,
  Target,
  Sun,
  Monitor,
  Moon,
  Star,
  Timer,
  Zap,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GrammarQuestion {
  id: number;
  sentence: string;
  options: string[];
  correct: number;
  rule: string;
  explanation: string;
}

interface GameState {
  currentGame: string | null;
  score: number;
  lives: number;
  streak: number;
  timeLeft: number;
  currentQuestion: number;
  totalQuestions: number;
  isPlaying: boolean;
  isPaused: boolean;
}

interface GrammarQuestProps {
  gameState: GameState;
  grammarQuestions: GrammarQuestion[];
  selectedAnswer: number | null;
  showFeedback: boolean;
  theme: "light" | "dark" | "neutral";
  themeClasses: {
    bg: string;
    text: string;
    textSecondary: string;
    cardBg: string;
    border: string;
    button: string;
    accent: string;
  };
  resetGame: () => void;
  setTheme: (theme: "light" | "dark" | "neutral") => void;
  handleAnswerSelect: (index: number) => void;
}

export default function GrammarQuest({
  gameState,
  grammarQuestions,
  selectedAnswer,
  showFeedback,
  theme,
  themeClasses,
  resetGame,
  setTheme,
  handleAnswerSelect,
}: GrammarQuestProps) {
  const question = grammarQuestions[gameState.currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-300`}
    >
      {/* Game Header */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border-b shadow-sm`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={resetGame}
                className={themeClasses.button}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Quest
              </Button>
              <div className="flex items-center space-x-2">
                <Target className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                <span className={`font-semibold ${themeClasses.text}`}>
                  Grammar Quest Adventure
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Switcher in Game */}
              <div
                className={`flex items-center space-x-2 ${
                  theme === "dark"
                    ? "bg-gray-800"
                    : theme === "neutral"
                    ? "bg-gray-200"
                    : "bg-gray-100"
                } rounded-lg p-1`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("light")}
                  className={`p-2 ${
                    theme === "light"
                      ? `${themeClasses.cardBg} shadow-sm`
                      : ""
                  } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                  aria-label="Light theme"
                >
                  <Sun className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("neutral")}
                  className={`p-2 ${
                    theme === "neutral"
                      ? `${themeClasses.cardBg} shadow-sm`
                      : ""
                  } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                  aria-label="Neutral theme"
                >
                  <Monitor className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className={`p-2 ${
                    theme === "dark" ? `${themeClasses.cardBg} shadow-sm` : ""
                  } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                  aria-label="Dark theme"
                >
                  <Moon className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>

              <div className="flex items-center space-x-6">
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                >
                  <Star className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.score}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                >
                  <Timer
                    className={`w-4 h-4 ${themeClasses.textSecondary}`}
                  />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.timeLeft}s
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card
          className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
        >
          <CardHeader className="text-center">
            <div
              className={`w-16 h-16 ${themeClasses.accent} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <Zap className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h2
              className={`text-2xl font-bold mb-2 ${themeClasses.text}`}
              id="grammar-challenge-title"
            >
              Grammar Challenge
            </h2>
            <Badge className="bg-gray-700 text-white mb-4">
              {question.rule}
            </Badge>
            <CardDescription className={themeClasses.textSecondary}>
              Complete the sentence with the correct grammatical structure
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div
              className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-6 text-center`}
            >
              <p className={`text-xl leading-relaxed ${themeClasses.text}`}>
                {question.sentence.split("_____").map((part, index) => (
                  <span key={index}>
                    {part}
                    {index < question.sentence.split("_____").length - 1 && (
                      <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1 rounded mx-2 font-bold">
                        _____
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                let buttonClass = `p-4 text-center border-2 transition-all duration-300 hover:scale-105 ${themeClasses.border}`;

                if (showFeedback) {
                  if (index === question.correct) {
                    buttonClass +=
                      " bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-300";
                  } else if (
                    index === selectedAnswer &&
                    index !== question.correct
                  ) {
                    buttonClass +=
                      " bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-300";
                  } else {
                    buttonClass += ` ${themeClasses.cardBg} ${themeClasses.textSecondary}`;
                  }
                } else {
                  buttonClass += ` ${themeClasses.cardBg} hover:bg-gray-50 dark:hover:bg-gray-800 ${themeClasses.text}`;
                }

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                  >
                    <span className="text-lg font-semibold">{option}</span>
                  </Button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                }`}
              >
                <div className="flex items-center space-x-2 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className={`font-semibold ${themeClasses.text}`}>
                    {isCorrect ? "Perfect Grammar!" : "Grammar Tip"}
                  </span>
                </div>
                <p className={`text-sm mb-2 ${themeClasses.text}`}>
                  {question.explanation}
                </p>
                {isCorrect && (
                  <p className="text-sm text-green-700 dark:text-green-300">
                    You earned {100 + gameState.streak * 10} XP!
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
