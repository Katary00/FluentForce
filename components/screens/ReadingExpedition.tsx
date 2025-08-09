/**
 * FluentForce - Reading Expedition Game Component
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 */
import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Sun,
  Monitor,
  Moon,
  Star,
  Flame,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ReadingPassage {
  title: string;
  text: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
  }[];
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

interface ReadingExpeditionProps {
  gameState: GameState;
  readingPassage: ReadingPassage;
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
  goToGameDashboard: () => void;
  setTheme: (theme: "light" | "dark" | "neutral") => void;
  handleAnswerSelect: (index: number) => void;
}

export default function ReadingExpedition({
  gameState,
  readingPassage,
  selectedAnswer,
  showFeedback,
  theme,
  themeClasses,
  goToGameDashboard,
  setTheme,
  handleAnswerSelect,
}: ReadingExpeditionProps) {
  const currentQ = readingPassage.questions[gameState.currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-300`}
    >
      {/* Game Header */}
      <div
        className={`${themeClasses.cardBg} ${themeClasses.border} border-b shadow-sm`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={goToGameDashboard}
                className={themeClasses.button}
                tabIndex={1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Expedition
              </Button>
              <div className="flex items-center space-x-2">
                <BookOpen
                  className={`w-5 h-5 ${themeClasses.textSecondary}`}
                />
                <span className={`font-semibold ${themeClasses.text}`}>
                  Reading Expedition
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
                  tabIndex={2}
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
                  tabIndex={3}
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
                  tabIndex={4}
                >
                  <Moon className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>

              <div className="flex items-center space-x-6">
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                  tabIndex={5}
                >
                  <Star className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.score}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                  tabIndex={6}
                >
                  <Flame
                    className={`w-4 h-4 ${themeClasses.textSecondary}`}
                  />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.streak}
                  </span>
                </div>
                <div className="flex items-center space-x-1" tabIndex={7}>
                  {Array.from({ length: gameState.lives }).map((_, i) => (
                    <Heart
                      key={i}
                      className="w-4 h-4 text-red-500 fill-current"
                    />
                  ))}
                </div>
                <div className={`text-lg font-semibold ${themeClasses.text}`} tabIndex={8}>
                  Question {gameState.currentQuestion + 1} of {gameState.totalQuestions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reading Passage */}
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg h-fit`}
          >
            <CardHeader>
              <h2
                className={`text-xl font-bold ${themeClasses.text}`}
                id="reading-passage-title"
                tabIndex={9}
              >
                {readingPassage.title}
              </h2>
              <CardDescription className={themeClasses.textSecondary} tabIndex={10}>
                Academic Text - Advanced Level
              </CardDescription>
            </CardHeader>
            <CardContent tabIndex={11}>
              <div className="prose prose-gray max-w-none">
                {readingPassage.text.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className={`mb-4 text-sm leading-relaxed ${themeClasses.text}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question Panel */}
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
          >
            <CardHeader>
              <h3
                className={`text-lg font-bold ${themeClasses.text}`}
                id="reading-comprehension-question"
                tabIndex={12}
              >
                Comprehension Question
              </h3>
              <Progress
                value={
                  ((gameState.currentQuestion + 1) /
                    gameState.totalQuestions) *
                  100
                }
                className="w-full h-2"
                tabIndex={13}
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-4`}
                tabIndex={14}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${themeClasses.text}`}
                >
                  {currentQ.question}
                </h3>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => {
                  let buttonClass = `w-full p-4 text-left border-2 transition-all duration-300 ${themeClasses.border}`;

                  if (showFeedback) {
                    if (index === currentQ.correct) {
                      buttonClass +=
                        " bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-300";
                    } else if (
                      index === selectedAnswer &&
                      index !== currentQ.correct
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
                      tabIndex={15 + index}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full ${themeClasses.cardBg} flex items-center justify-center text-sm font-bold mt-1 ${themeClasses.text}`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-sm leading-relaxed">
                          {option}
                        </span>
                      </div>
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
                  tabIndex={19}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${themeClasses.text}`}>
                      {isCorrect ? "Excellent Analysis!" : "Review the Text"}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.text}`}>
                    {isCorrect
                      ? `Great reading comprehension! You earned ${
                          100 + gameState.streak * 10
                        } points!`
                      : "Re-read the relevant section and look for key details that support the correct answer."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
