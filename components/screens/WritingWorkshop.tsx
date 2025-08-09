/**
 * FluentForce - Writing Workshop Game Component
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 */
import React from "react";
import {
  ArrowLeft,
  PenTool,
  Sun,
  Monitor,
  Moon,
  Star,
  Flame,
  Heart,
  Save,
  RefreshCw,
  HelpCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

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

interface WritingWorkshopProps {
  gameState: GameState;
  writingText: string;
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
  user: any;
  goToGameDashboard: () => void;
  setTheme: (theme: "light" | "dark" | "neutral") => void;
  setWritingText: (text: string) => void;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  endGame: () => void;
}

export default function WritingWorkshop({
  gameState,
  writingText,
  theme,
  themeClasses,
  user,
  goToGameDashboard,
  setTheme,
  setWritingText,
  setGameState,
  setUser,
  endGame,
}: WritingWorkshopProps) {
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
                Exit Workshop
              </Button>
              <div className="flex items-center space-x-2">
                <PenTool
                  className={`w-5 h-5 ${themeClasses.textSecondary}`}
                />
                <span className={`font-semibold ${themeClasses.text}`}>
                  Academic Writing Workshop
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
                <div className={`text-sm ${themeClasses.textSecondary}`} tabIndex={8}>
                  Words:{" "}
                  {writingText.split(" ").filter((w) => w.length > 0).length}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${themeClasses.border} ${themeClasses.textSecondary} hover:bg-gray-50 dark:hover:bg-gray-800`}
                  onClick={() => {
                    // Save draft functionality
                    console.log("Draft saved");
                  }}
                  tabIndex={9}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Writing Prompt */}
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
          >
            <CardHeader>
              <h2
                className={`text-lg font-bold ${themeClasses.text}`}
                id="writing-essay-prompt"
                tabIndex={10}
              >
                Essay Prompt
              </h2>
              <Badge className="bg-gray-700 text-white w-fit">
                Academic Essay
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-4`}
              >
                <h3 className={`font-semibold mb-3 ${themeClasses.text}`} tabIndex={11}>
                  Topic:
                </h3>
                <p className={`text-sm leading-relaxed ${themeClasses.text}`} tabIndex={12}>
                  "The integration of artificial intelligence in higher
                  education presents both opportunities and challenges.
                  Discuss the potential benefits and drawbacks of AI
                  implementation in universities, providing specific examples
                  and evidence to support your arguments."
                </p>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold ${themeClasses.text}`} tabIndex={13}>
                  Requirements:
                </h4>
                <ul
                  className={`text-sm space-y-1 ${themeClasses.textSecondary}`}
                  tabIndex={14}
                >
                  <li>• Minimum 150 words</li>
                  <li>• Clear thesis statement</li>
                  <li>• Academic vocabulary</li>
                  <li>• Balanced argumentation</li>
                  <li>• Proper conclusion</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold ${themeClasses.text}`} tabIndex={15}>
                  Suggested Structure:
                </h4>
                <ul
                  className={`text-sm space-y-1 ${themeClasses.textSecondary}`}
                  tabIndex={16}
                >
                  <li>1. Introduction with thesis</li>
                  <li>2. Benefits of AI in education</li>
                  <li>3. Challenges and concerns</li>
                  <li>4. Balanced conclusion</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Writing Area */}
          <div className="lg:col-span-2">
            <Card
              className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg h-full`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-lg font-bold ${themeClasses.text}`}
                    id="essay-writing-area"
                    tabIndex={17}
                  >
                    Your Essay
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={themeClasses.button}
                      tabIndex={18}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={themeClasses.button}
                      tabIndex={19}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full">
                <Textarea
                  value={writingText}
                  onChange={(e) => setWritingText(e.target.value)}
                  placeholder="Begin writing your academic essay here. Remember to use formal academic language and structure your arguments clearly..."
                  className={`w-full h-96 ${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} placeholder:${themeClasses.textSecondary} resize-none text-sm leading-relaxed`}
                  tabIndex={20}
                />

                <div className="mt-4 flex items-center justify-between">
                  <div
                    className={`flex items-center space-x-4 text-sm ${themeClasses.textSecondary}`}
                    tabIndex={21}
                  >
                    <span>Characters: {writingText.length}</span>
                    <span>
                      Words:{" "}
                      {
                        writingText.split(" ").filter((w) => w.length > 0)
                          .length
                      }
                    </span>
                    <span>
                      Paragraphs:{" "}
                      {
                        writingText
                          .split("\n\n")
                          .filter((p) => p.trim().length > 0).length
                      }
                    </span>
                  </div>

                  <Button
                    className={themeClasses.accent}
                    disabled={
                      writingText.trim().length === 0 ||
                      writingText.split(" ").filter((w) => w.length > 0)
                        .length < 150
                    }
                    onClick={() => {
                      const wordCount = writingText.split(" ").filter((w) => w.length > 0).length;
                      if (writingText.trim().length === 0) {
                        alert("Please write something before submitting!");
                        return;
                      }
                      if (wordCount < 150) {
                        alert(`Your essay needs at least 150 words. You currently have ${wordCount} words.`);
                        return;
                      }
                      
                      // Submit essay functionality
                      setGameState((prev) => ({
                        ...prev,
                        score: prev.score + 500,
                      }));
                      if (user) {
                        setUser((prev: any) =>
                          prev ? { ...prev, xp: prev.xp + 500 } : null
                        );
                      }
                      alert("Essay submitted successfully! Great work!");
                      endGame();
                    }}
                    tabIndex={22}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Essay
                  </Button>
                </div>

                {/* Real-time feedback */}
                <div
                  className={`mt-4 p-3 ${themeClasses.cardBg} ${themeClasses.border} rounded-lg`}
                  tabIndex={23}
                >
                  <h4
                    className={`font-semibold mb-2 text-sm ${themeClasses.text}`}
                  >
                    Writing Assistant:
                  </h4>
                  <div
                    className={`text-xs space-y-1 ${themeClasses.textSecondary}`}
                  >
                    {writingText.length < 100 && (
                      <p>
                        • Start with a clear introduction and thesis statement
                      </p>
                    )}
                    {writingText.split(" ").filter((w) => w.length > 0)
                      .length >= 50 && (
                      <p className="text-green-700 dark:text-green-300">
                        • Good progress! Continue developing your arguments
                      </p>
                    )}
                    {writingText.includes("however") ||
                    writingText.includes("furthermore") ? (
                      <p className="text-green-700 dark:text-green-300">
                        • Excellent use of transition words
                      </p>
                    ) : (
                      <p>
                        • Consider using transition words to connect your
                        ideas
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
