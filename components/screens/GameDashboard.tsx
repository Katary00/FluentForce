"use client";

/**
 * GameDashboard - Pantalla principal de selección de juegos
 * FluentForce - English Learning Platform
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Headphones,
  PenTool,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  PlayCircle,
  Brain,
  Gamepad2,
  Volume2,
  Lightbulb,
  Crown,
  Sparkles,
  Flame,
  Sun,
  Moon,
  Monitor,
  Star,
  Zap,
  HelpCircle,
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

interface GameDashboardProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  user: UserType | null;
  startGame: (gameType: string) => void;
  handleLogout: () => void;
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
}

// Theme classes utility
const getThemeClasses = (theme: Theme) => {
  switch (theme) {
    case "dark":
      return {
        bg: "bg-gray-900",
        text: "text-gray-100",
        textSecondary: "text-gray-300",
        cardBg: "bg-gray-800",
        border: "border-gray-700",
        button: "text-gray-300 hover:text-gray-100",
        accent: "bg-blue-600 hover:bg-blue-700",
      };
    case "neutral":
      return {
        bg: "bg-gray-200",
        text: "text-gray-900",
        textSecondary: "text-gray-700",
        cardBg: "bg-gray-100",
        border: "border-gray-400",
        button: "text-gray-700 hover:text-gray-900",
        accent: "bg-blue-600 hover:bg-blue-700",
      };
    default: // light
      return {
        bg: "bg-gradient-to-br from-slate-50 to-blue-50",
        text: "text-slate-900",
        textSecondary: "text-slate-600",
        cardBg: "bg-white",
        border: "border-slate-200",
        button: "text-slate-600 hover:text-slate-900",
        accent: "bg-blue-600 hover:bg-blue-700",
      };
  }
};

export default function GameDashboard({
  theme,
  setTheme,
  user,
  startGame,
  handleLogout,
  showHelp,
  setShowHelp,
}: GameDashboardProps) {
  const themeClasses = getThemeClasses(theme);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900"
          : theme === "neutral"
          ? "bg-gray-200"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
      } transition-colors duration-300`}
    >
      {/* Skip Links for accessibility */}
      <div className="sr-only-focusable">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <a href="#game-selection" className="skip-link">
          Skip to game selection
        </a>
      </div>

      {/* Header */}
      <header
        className={`${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : theme === "neutral"
            ? "bg-gray-100 border-gray-400"
            : "bg-white border-slate-200"
        } border-b shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <h1
                className={`text-xl font-semibold ${
                  theme === "dark"
                    ? "text-gray-100"
                    : theme === "neutral"
                    ? "text-gray-900"
                    : "text-slate-900"
                }`}
              >
                FluentForce
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Switcher in Dashboard */}
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
                    theme === "light" ? `${themeClasses.cardBg} shadow-sm` : ""
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

              <div
                className={`flex items-center space-x-2 text-sm ${
                  theme === "dark"
                    ? "text-gray-300"
                    : theme === "neutral"
                    ? "text-gray-700"
                    : "text-slate-600"
                }`}
              >
                <span>Welcome, {user?.name}</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-yellow-900/50 to-orange-900/50"
                    : theme === "neutral"
                    ? "bg-gradient-to-r from-yellow-200 to-orange-200"
                    : "bg-gradient-to-r from-yellow-100 to-orange-100"
                } px-3 py-1 rounded-full`}
              >
                <Crown
                  className={`w-4 h-4 ${
                    theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    theme === "dark"
                      ? "text-yellow-300"
                      : theme === "neutral"
                      ? "text-yellow-900"
                      : "text-yellow-800"
                  }`}
                >
                  Level {user?.level}
                </span>
              </div>
              <div
                className={`flex items-center space-x-2 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-900/50 to-blue-900/50"
                    : theme === "neutral"
                    ? "bg-gradient-to-r from-purple-200 to-blue-200"
                    : "bg-gradient-to-r from-purple-100 to-blue-100"
                } px-3 py-1 rounded-full`}
              >
                <Sparkles
                  className={`w-4 h-4 ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    theme === "dark"
                      ? "text-purple-300"
                      : theme === "neutral"
                      ? "text-purple-900"
                      : "text-purple-800"
                  }`}
                >
                  {user?.xp} XP
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-gray-100"
                    : theme === "neutral"
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card
            className={`w-full max-w-2xl ${
              theme === "dark"
                ? "bg-gray-800"
                : theme === "neutral"
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
            <CardHeader>
              <h2
                className={`flex items-center space-x-2 ${
                  theme === "dark"
                    ? "text-gray-100"
                    : theme === "neutral"
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}
                id="help-accessibility-title"
              >
                <HelpCircle className="w-5 h-5" aria-hidden="true" />
                <span>Help & Accessibility</span>
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3
                  className={`font-semibold mb-2 ${
                    theme === "dark"
                      ? "text-gray-100"
                      : theme === "neutral"
                      ? "text-gray-900"
                      : "text-gray-900"
                  }`}
                >
                  Keyboard Shortcuts:
                </h3>
                <ul
                  className={`text-sm space-y-1 ${
                    theme === "dark"
                      ? "text-gray-300"
                      : theme === "neutral"
                      ? "text-gray-700"
                      : "text-slate-600"
                  }`}
                >
                  <li>• F1: Toggle this help menu</li>
                  <li>• Esc: Pause current game</li>
                  <li>• Tab: Navigate between elements</li>
                  <li>• Enter/Space: Select options</li>
                  <li>• Arrow keys: Navigate in games</li>
                </ul>
              </div>
              <div>
                <h3
                  className={`font-semibold mb-2 ${
                    theme === "dark"
                      ? "text-gray-100"
                      : theme === "neutral"
                      ? "text-gray-900"
                      : "text-gray-900"
                  }`}
                >
                  Game Features:
                </h3>
                <ul
                  className={`text-sm space-y-1 ${
                    theme === "dark"
                      ? "text-gray-300"
                      : theme === "neutral"
                      ? "text-gray-700"
                      : "text-slate-600"
                  }`}
                >
                  <li>• All games support keyboard navigation</li>
                  <li>• Progress is automatically saved</li>
                  <li>• Games can be paused at any time</li>
                  <li>• Feedback is provided for all answers</li>
                </ul>
              </div>
              <Button
                onClick={() => setShowHelp(false)}
                className="w-full"
                aria-label="Close help dialog"
              >
                Close Help
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Game Hub */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="text-center mb-8">
          <h2
            className={`text-3xl font-bold mb-4 ${
              theme === "dark"
                ? "text-gray-100"
                : theme === "neutral"
                ? "text-gray-900"
                : "text-slate-900"
            }`}
          >
            Choose Your Academic Challenge
          </h2>
          <p
            className={`text-lg ${
              theme === "dark"
                ? "text-gray-300"
                : theme === "neutral"
                ? "text-gray-700"
                : "text-slate-600"
            }`}
          >
            Master university-level English through interactive games
          </p>
        </div>

        {/* Game Selection Grid */}
        <div
          id="game-selection"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          role="region"
          aria-label="Learning games selection grid"
        >
          {/* Vocabulary Challenge */}
          <Card
            className={`border-2 ${
              theme === "dark"
                ? "border-purple-700 hover:border-purple-500 bg-gradient-to-br from-purple-900/30 to-purple-800/30"
                : theme === "neutral"
                ? "border-purple-400 hover:border-purple-600 bg-gradient-to-br from-purple-100 to-purple-200"
                : "border-purple-200 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100"
            } transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4" role="presentation">
                <Brain className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-purple-300"
                    : theme === "neutral"
                    ? "text-purple-900"
                    : "text-purple-900"
                }`}
              >
                Academic Vocabulary
              </CardTitle>
              <CardDescription
                className={`${
                  theme === "dark"
                    ? "text-purple-400"
                    : theme === "neutral"
                    ? "text-purple-800"
                    : "text-purple-700"
                }`}
              >
                Master complex academic terms and definitions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock
                    className={`w-4 h-4 ${
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    }`}
                  />
                  <span>5-10 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>100-500 XP</span>
                </div>
              </div>
              <Button
                onClick={() => startGame("vocabulary")}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                aria-describedby="vocab-game-description"
                aria-label="Start Academic Vocabulary Challenge - 5 to 10 minutes, earn 100 to 500 XP"
              >
                <PlayCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                Start Challenge
              </Button>
              <div id="vocab-game-description" className="sr-only">
                Academic Vocabulary game helps you master complex academic terms
                and definitions. Duration: 5-10 minutes. Potential XP: 100-500
                points.
              </div>
            </CardContent>
          </Card>

          {/* Listening Lab */}
          <Card
            className={`border-2 ${
              theme === "dark"
                ? "border-blue-700 hover:border-blue-500 bg-gradient-to-br from-blue-900/30 to-blue-800/30"
                : theme === "neutral"
                ? "border-blue-400 hover:border-blue-600 bg-gradient-to-br from-blue-100 to-blue-200"
                : "border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100"
            } transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4" role="presentation">
                <Headphones className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-blue-300"
                    : theme === "neutral"
                    ? "text-blue-900"
                    : "text-blue-900"
                }`}
              >
                Listening Lab
              </CardTitle>
              <CardDescription
                className={`${
                  theme === "dark"
                    ? "text-blue-400"
                    : theme === "neutral"
                    ? "text-blue-800"
                    : "text-blue-700"
                }`}
              >
                Decode academic lectures and conferences
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock
                    className={`w-4 h-4 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span>10-15 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>150-600 XP</span>
                </div>
              </div>
              <Button
                onClick={() => startGame("listening")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                aria-describedby="listening-game-description"
                aria-label="Enter Listening Lab - 10 to 15 minutes, earn 150 to 600 XP"
              >
                <Volume2 className="w-4 h-4 mr-2" aria-hidden="true" />
                Enter Lab
              </Button>
              <div id="listening-game-description" className="sr-only">
                Listening Lab helps you decode academic lectures and
                conferences. Duration: 10-15 minutes. Potential XP: 150-600
                points.
              </div>
            </CardContent>
          </Card>

          {/* Writing Workshop */}
          <Card
            className={`border-2 ${
              theme === "dark"
                ? "border-green-700 hover:border-green-500 bg-gradient-to-br from-green-900/30 to-green-800/30"
                : theme === "neutral"
                ? "border-green-400 hover:border-green-600 bg-gradient-to-br from-green-100 to-green-200"
                : "border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-green-100"
            } transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4" role="presentation">
                <PenTool className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-green-300"
                    : theme === "neutral"
                    ? "text-green-900"
                    : "text-green-900"
                }`}
              >
                Writing Workshop
              </CardTitle>
              <CardDescription
                className={`${
                  theme === "dark"
                    ? "text-green-400"
                    : theme === "neutral"
                    ? "text-green-800"
                    : "text-green-700"
                }`}
              >
                Craft academic essays and research papers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock
                    className={`w-4 h-4 ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }`}
                  />
                  <span>20-30 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>300-1000 XP</span>
                </div>
              </div>
              <Button
                onClick={() => startGame("writing")}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                aria-describedby="writing-game-description"
                aria-label="Start Writing Workshop - 20 to 30 minutes, earn 300 to 1000 XP"
              >
                <Lightbulb className="w-4 h-4 mr-2" aria-hidden="true" />
                Start Writing
              </Button>
              <div id="writing-game-description" className="sr-only">
                Writing Workshop helps you craft academic essays and research
                papers. Duration: 20-30 minutes. Potential XP: 300-1000 points.
              </div>
            </CardContent>
          </Card>

          {/* Grammar Quest */}
          <Card
            className={`border-2 ${
              theme === "dark"
                ? "border-indigo-700 hover:border-indigo-500 bg-gradient-to-br from-indigo-900/30 to-indigo-800/30"
                : theme === "neutral"
                ? "border-indigo-400 hover:border-indigo-600 bg-gradient-to-br from-indigo-100 to-indigo-200"
                : "border-indigo-200 hover:border-indigo-400 bg-gradient-to-br from-indigo-50 to-indigo-100"
            } transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4" role="presentation">
                <Target className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-indigo-300"
                    : theme === "neutral"
                    ? "text-indigo-900"
                    : "text-indigo-900"
                }`}
              >
                Grammar Quest
              </CardTitle>
              <CardDescription
                className={`${
                  theme === "dark"
                    ? "text-indigo-400"
                    : theme === "neutral"
                    ? "text-indigo-800"
                    : "text-indigo-700"
                }`}
              >
                Master advanced grammatical structures
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock
                    className={`w-4 h-4 ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  />
                  <span>8-12 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>120-400 XP</span>
                </div>
              </div>
              <Button
                onClick={() => startGame("grammar")}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white"
                aria-describedby="grammar-game-description"
                aria-label="Begin Grammar Quest - 8 to 12 minutes, earn 120 to 400 XP"
              >
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                Begin Quest
              </Button>
              <div id="grammar-game-description" className="sr-only">
                Grammar Quest helps you master advanced grammatical structures.
                Duration: 8-12 minutes. Potential XP: 120-400 points.
              </div>
            </CardContent>
          </Card>

          {/* Reading Expedition */}
          <Card
            className={`border-2 ${
              theme === "dark"
                ? "border-teal-700 hover:border-teal-500 bg-gradient-to-br from-teal-900/30 to-teal-800/30"
                : theme === "neutral"
                ? "border-teal-400 hover:border-teal-600 bg-gradient-to-br from-teal-100 to-teal-200"
                : "border-teal-200 hover:border-teal-400 bg-gradient-to-br from-teal-50 to-teal-100"
            } transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4" role="presentation">
                <BookOpen className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-teal-300"
                    : theme === "neutral"
                    ? "text-teal-900"
                    : "text-teal-900"
                }`}
              >
                Reading Expedition
              </CardTitle>
              <CardDescription
                className={`${
                  theme === "dark"
                    ? "text-teal-400"
                    : theme === "neutral"
                    ? "text-teal-800"
                    : "text-teal-700"
                }`}
              >
                Navigate complex academic texts
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock
                    className={`w-4 h-4 ${
                      theme === "dark" ? "text-teal-400" : "text-teal-600"
                    }`}
                  />
                  <span>12-18 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>180-700 XP</span>
                </div>
              </div>
              <Button
                onClick={() => startGame("reading")}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                aria-describedby="reading-game-description"
                aria-label="Explore Reading Expedition - 12 to 18 minutes, earn 180 to 700 XP"
              >
                <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" />
                Explore Texts
              </Button>
              <div id="reading-game-description" className="sr-only">
                Reading Expedition helps you navigate complex academic texts.
                Duration: 12-18 minutes. Potential XP: 180-700 points.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Player Stats */}
        <section
          aria-labelledby="player-stats-title"
          className={`${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-900"
              : theme === "neutral"
              ? "bg-gradient-to-r from-gray-300 to-gray-400"
              : "bg-gradient-to-r from-slate-900 to-blue-900"
          } ${
            theme === "dark"
              ? "text-gray-100"
              : theme === "neutral"
              ? "text-gray-900"
              : "text-white"
          } border-0 rounded-lg p-6`}
        >
          <header>
            <h2
              id="player-stats-title"
              className="text-center text-2xl font-bold mb-6"
            >
              Your Academic Journey
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6" role="list">
            <div className="text-center" role="listitem">
              <div
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3"
                aria-hidden="true"
              >
                <Trophy className="w-8 h-8 text-yellow-900" />
              </div>
              <h3
                className="font-semibold text-lg"
                aria-label={`Current level: ${user?.level}, Academic Scholar`}
              >
                Level {user?.level}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-400"
                    : theme === "neutral"
                    ? "text-gray-700"
                    : "text-gray-300"
                }`}
              >
                Academic Scholar
              </p>
              <Progress
                value={75}
                className="mt-2 h-2"
                aria-label="Progress to next level: 75%"
              />
              <p
                className={`text-xs ${
                  theme === "dark"
                    ? "text-gray-500"
                    : theme === "neutral"
                    ? "text-gray-600"
                    : "text-gray-400"
                } mt-1`}
              >
                750/1000 XP to next level
              </p>
            </div>

            <div className="text-center" role="listitem">
              <div
                className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3"
                aria-hidden="true"
              >
                <Sparkles className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3
                className="font-semibold text-lg"
                aria-label={`Total experience points: ${user?.xp}`}
              >
                {user?.xp} XP
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-400"
                    : theme === "neutral"
                    ? "text-gray-700"
                    : "text-gray-300"
                }`}
              >
                Total Experience
              </p>
            </div>

            <div className="text-center" role="listitem">
              <div
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3"
                aria-hidden="true"
              >
                <CheckCircle
                  className="w-8 h-8 text-white"
                  aria-hidden="true"
                />
              </div>
              <h3
                className="font-semibold text-lg"
                aria-label={`Challenges completed: ${user?.completedGames.length}`}
              >
                {user?.completedGames.length}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-400"
                    : theme === "neutral"
                    ? "text-gray-700"
                    : "text-gray-300"
                }`}
              >
                Challenges Completed
              </p>
            </div>

            <div className="text-center" role="listitem">
              <div
                className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3"
                aria-hidden="true"
              >
                <Flame className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3
                className="font-semibold text-lg"
                aria-label="Study streak: 7 days"
              >
                7 Days
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-400"
                    : theme === "neutral"
                    ? "text-gray-700"
                    : "text-gray-300"
                }`}
              >
                Study Streak
              </p>
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <div
          className={`mt-8 p-6 ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800"
              : theme === "neutral"
              ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300"
              : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
          } border rounded-lg`}
        >
          <div className="flex items-start space-x-3">
            <Lightbulb
              className={`w-6 h-6 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              } mt-1`}
            />
            <div>
              <h3
                className={`font-semibold ${
                  theme === "dark"
                    ? "text-blue-300"
                    : theme === "neutral"
                    ? "text-blue-900"
                    : "text-blue-900"
                } mb-2`}
              >
                Game Tips for Success
              </h3>
              <ul
                className={`text-sm ${
                  theme === "dark"
                    ? "text-blue-200"
                    : theme === "neutral"
                    ? "text-blue-800"
                    : "text-blue-800"
                } space-y-1`}
              >
                <li>
                  • Complete daily challenges to maintain your study streak
                </li>
                <li>• Focus on your weakest skills to maximize XP gains</li>
                <li>
                  • Use keyboard shortcuts: Space to select, Enter to confirm,
                  Esc to pause
                </li>
                <li>
                  • Review feedback carefully to improve your academic English
                </li>
                <li>• Press F1 anytime for help and accessibility options</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
