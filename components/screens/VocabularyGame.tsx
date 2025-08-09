"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Pause,
  Play,
  Brain,
  Sun,
  Moon,
  Monitor,
  Star,
  Flame,
  Heart,
  Timer,
  CheckCircle,
  Target,
} from "lucide-react";

// Types
type Theme = "light" | "dark" | "neutral";

interface UserType {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  completedGames: string[];
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

interface VocabularyQuestion {
  word: string;
  definition: string;
  options: string[];
  correct: number;
  context: string;
  difficulty: "intermediate" | "advanced" | "proficient";
}

interface VocabularyGameProps {
  theme: Theme;
  user: UserType | null;
  gameState: GameState;
  selectedAnswer: number | null;
  showFeedback: boolean;
  vocabularyQuestions: VocabularyQuestion[];
  onSetTheme: (theme: Theme) => void;
  onGoToGameDashboard: () => void;
  onPauseGame: () => void;
  onHandleAnswerSelect: (index: number) => void;
}

export default function VocabularyGame({
  theme,
  user,
  gameState,
  selectedAnswer,
  showFeedback,
  vocabularyQuestions,
  onSetTheme,
  onGoToGameDashboard,
  onPauseGame,
  onHandleAnswerSelect,
}: VocabularyGameProps) {
  // Theme configuration
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return {
          bg: "bg-gray-900",
          cardBg: "bg-gray-800",
          text: "text-white",
          textSecondary: "text-gray-300",
          border: "border-gray-700",
          accent: "bg-purple-600 hover:bg-purple-700 text-white",
          button: "text-gray-300 hover:text-white hover:bg-gray-700",
        };
      case "neutral":
        return {
          bg: "bg-gray-50",
          cardBg: "bg-white",
          text: "text-gray-900",
          textSecondary: "text-gray-600",
          border: "border-gray-200",
          accent: "bg-gray-800 hover:bg-gray-900 text-white",
          button: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        };
      default:
        return {
          bg: "bg-white",
          cardBg: "bg-white",
          text: "text-gray-900",
          textSecondary: "text-gray-600",
          border: "border-gray-200",
          accent: "bg-blue-600 hover:bg-blue-700 text-white",
          button: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Get current question
  const question = vocabularyQuestions[gameState.currentQuestion];
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
                onClick={onGoToGameDashboard}
                className={themeClasses.button}
                tabIndex={1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Game
              </Button>
              <Button
                variant="ghost"
                onClick={onPauseGame}
                className={themeClasses.button}
                tabIndex={2}
              >
                {gameState.isPaused ? (
                  <Play className="w-4 h-4 mr-2" />
                ) : (
                  <Pause className="w-4 h-4 mr-2" />
                )}
                {gameState.isPaused ? "Resume" : "Pause"}
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                <span className={`font-semibold ${themeClasses.text}`}>
                  Academic Vocabulary Challenge
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
                  onClick={() => onSetTheme("light")}
                  className={`p-2 ${
                    theme === "light"
                      ? `${themeClasses.cardBg} shadow-sm`
                      : ""
                  } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                  aria-label="Light theme"
                  tabIndex={3}
                >
                  <Sun className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetTheme("neutral")}
                  className={`p-2 ${
                    theme === "neutral"
                      ? `${themeClasses.cardBg} shadow-sm`
                      : ""
                  } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                  aria-label="Neutral theme"
                  tabIndex={4}
                >
                  <Monitor className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetTheme("dark")}
                  className={`p-2 ${
                    theme === "dark" ? `${themeClasses.cardBg} shadow-sm` : ""
                  } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                  aria-label="Dark theme"
                  tabIndex={5}
                >
                  <Moon className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>

              <div className="flex items-center space-x-6">
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                  tabIndex={6}
                  role="status"
                  aria-label={`Current score: ${gameState.score} points`}
                >
                  <Star className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.score}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                  tabIndex={7}
                  role="status"
                  aria-label={`Current streak: ${gameState.streak} correct answers in a row`}
                >
                  <Flame
                    className={`w-4 h-4 ${themeClasses.textSecondary}`}
                  />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.streak}
                  </span>
                </div>
                <div 
                  className="flex items-center space-x-1"
                  tabIndex={8}
                  role="status"
                  aria-label={`Lives remaining: ${gameState.lives} out of 3`}
                >
                  {Array.from({ length: gameState.lives }).map((_, i) => (
                    <Heart
                      key={i}
                      className="w-4 h-4 text-red-500 fill-current"
                    />
                  ))}
                </div>
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                  tabIndex={9}
                  role="timer"
                  aria-label={`Time remaining: ${gameState.timeLeft} seconds`}
                >
                  <Timer
                    className={`w-4 h-4 ${themeClasses.textSecondary}`}
                  />
                  <span className={`font-bold text-lg ${themeClasses.text}`}>
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
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center space-x-2 ${themeClasses.cardBg} ${themeClasses.border} rounded-full px-4 py-2 mb-4`}
            tabIndex={10}
            role="status"
            aria-label={`Question ${gameState.currentQuestion + 1} of ${gameState.totalQuestions}`}
          >
            <span className={`text-sm ${themeClasses.textSecondary}`}>
              Question {gameState.currentQuestion + 1} of{" "}
              {gameState.totalQuestions}
            </span>
          </div>
          <Progress
            value={
              ((gameState.currentQuestion + 1) / gameState.totalQuestions) *
              100
            }
            className="w-full h-2"
            aria-label={`Vocabulary game progress: ${
              gameState.currentQuestion + 1
            } of ${gameState.totalQuestions} questions completed`}
          />
        </div>

        {gameState.isPaused ? (
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
          >
            <CardContent className="py-12 text-center">
              <Pause
                className={`w-16 h-16 mx-auto mb-4 ${themeClasses.textSecondary}`}
              />
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.text}`}>
                Game Paused
              </h2>
              <p className={`${themeClasses.textSecondary} mb-6`}>
                Take a break! Your progress is saved.
              </p>
              <Button
                onClick={onPauseGame}
                className={themeClasses.accent}
                aria-label="Resume the vocabulary challenge game"
                tabIndex={1}
              >
                <Play className="w-4 h-4 mr-2" />
                Resume Game
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Badge
                  className={`${
                    question.difficulty === "proficient"
                      ? "bg-gray-700 text-white"
                      : question.difficulty === "advanced"
                      ? "bg-gray-600 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {question.difficulty.toUpperCase()}
                </Badge>
              </div>
              <h2
                className={`text-3xl font-bold mb-4 ${themeClasses.text}`}
                id="vocabulary-question-word"
                tabIndex={11}
                role="heading"
                aria-level={2}
              >
                {question.word}
              </h2>
              <CardDescription
                className={`text-lg ${themeClasses.textSecondary} italic`}
                tabIndex={12}
                role="text"
              >
                "{question.context}"
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p
                className={`text-center text-lg mb-6 ${themeClasses.text}`}
                id="question-instruction"
              >
                Choose the correct definition:
              </p>

              <div
                className="grid grid-cols-1 gap-4"
                role="radiogroup"
                aria-labelledby="question-instruction"
                aria-describedby="vocabulary-word"
              >
                {question.options.map((option, index) => {
                  let buttonClass = `w-full p-4 text-left border-2 transition-all duration-300 hover:scale-105 ${themeClasses.border}`;
                  let ariaPressed = selectedAnswer === index;
                  let ariaLabel = `Option ${String.fromCharCode(
                    65 + index
                  )}: ${option}`;

                  if (showFeedback) {
                    if (index === question.correct) {
                      buttonClass +=
                        " bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-300";
                      ariaLabel += " - Correct answer";
                    } else if (
                      index === selectedAnswer &&
                      index !== question.correct
                    ) {
                      buttonClass +=
                        " bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-300";
                      ariaLabel += " - Incorrect answer";
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
                      onClick={() => onHandleAnswerSelect(index)}
                      disabled={showFeedback}
                      role="radio"
                      aria-checked={ariaPressed}
                      aria-label={ariaLabel}
                      data-option={index}
                      tabIndex={13 + index}
                      aria-describedby={
                        showFeedback ? `feedback-${index}` : undefined
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full ${themeClasses.cardBg} flex items-center justify-center font-bold ${themeClasses.text}`}
                          aria-hidden="true"
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-base">{option}</span>
                      </div>
                      {showFeedback && (
                        <div id={`feedback-${index}`} className="sr-only">
                          {index === question.correct
                            ? "This is the correct answer"
                            : index === selectedAnswer
                            ? "This is your selected answer, but it is incorrect"
                            : "This answer was not selected"}
                        </div>
                      )}
                    </Button>
                  );
                })}
              </div>

              {showFeedback && (
                <div
                  className={`mt-6 p-4 rounded-lg border ${
                    isCorrect
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Target className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${themeClasses.text}`}>
                      {isCorrect ? "Excellent!" : "Not quite right"}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.text}`}>
                    {isCorrect
                      ? `Perfect! You earned ${
                          100 + (gameState.streak - 1) * 10
                        } points!`
                      : `The correct answer is: ${question.definition}`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
