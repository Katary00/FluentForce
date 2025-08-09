"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Pause,
  Play,
  Headphones,
  Sun,
  Moon,
  Monitor,
  Star,
  Heart,
  Flame,
  SkipForward,
  Volume2,
  VolumeX,
  Eye,
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

interface ListeningQuestion {
  id: string;
  audioText: string;
  question: string;
  options: string[];
  correct: number;
  transcript: string;
}

interface ListeningLabProps {
  theme: Theme;
  user: UserType | null;
  gameState: GameState;
  selectedAnswer: number | null;
  showFeedback: boolean;
  listeningQuestions: ListeningQuestion[];
  isAudioPlaying: boolean;
  onSetTheme: (theme: Theme) => void;
  onGoToGameDashboard: () => void;
  onPauseGame: () => void;
  onHandleAnswerSelect: (index: number) => void;
  onSetIsAudioPlaying: (playing: boolean) => void;
}

export default function ListeningLab({
  theme,
  user,
  gameState,
  selectedAnswer,
  showFeedback,
  listeningQuestions,
  isAudioPlaying,
  onSetTheme,
  onGoToGameDashboard,
  onPauseGame,
  onHandleAnswerSelect,
  onSetIsAudioPlaying,
}: ListeningLabProps) {
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

  // Audio states and refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);

  // Get current question
  const question = listeningQuestions[gameState.currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  // Audio functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onSetIsAudioPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        onSetIsAudioPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration
      );
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setAudioProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioProgress(0);
    onSetIsAudioPlaying(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Reset audio when question changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioProgress(0);
    onSetIsAudioPlaying(false);
    
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [gameState.currentQuestion, onSetIsAudioPlaying]);

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
                Exit Lab
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
                <Headphones
                  className={`w-5 h-5 ${themeClasses.textSecondary}`}
                />
                <span className={`font-semibold ${themeClasses.text}`}>
                  Academic Listening Lab
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
                >
                  <Star className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.score}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                  tabIndex={7}
                >
                  <Flame
                    className={`w-4 h-4 ${themeClasses.textSecondary}`}
                  />
                  <span className={`font-bold ${themeClasses.text}`}>
                    {gameState.streak}
                  </span>
                </div>
                <div className="flex items-center space-x-1" tabIndex={8}>
                  {Array.from({ length: gameState.lives }).map((_, i) => (
                    <Heart
                      key={i}
                      className="w-4 h-4 text-red-500 fill-current"
                    />
                  ))}
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
            tabIndex={9}
          >
            <span className={`text-sm ${themeClasses.textSecondary}`}>
              Audio {gameState.currentQuestion + 1} of{" "}
              {gameState.totalQuestions}
            </span>
          </div>
          <Progress
            value={
              ((gameState.currentQuestion + 1) / gameState.totalQuestions) *
              100
            }
            className="w-full h-2"
          />
        </div>

        <Card
          className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
        >
          <CardHeader className="text-center">
            <h2
              className={`text-2xl font-bold mb-4 ${themeClasses.text}`}
              id="listening-lecture-title"
              tabIndex={10}
            >
              Listen to the Academic Lecture
            </h2>
            <h3
              className={`text-xl font-semibold mb-2 ${themeClasses.text}`}
              tabIndex={11}
            >
              {question.audioText}
            </h3>
            <CardDescription className={themeClasses.textSecondary} tabIndex={12}>
              Listen carefully and answer the comprehension question
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Audio Player */}
            <div
              className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-6 text-center`}
            >
              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnded}
                preload="metadata"
              >
                <source 
                  src={`/audio/question${gameState.currentQuestion + 1}.mp3`} 
                  type="audio/mpeg" 
                />
                <source 
                  src={`/audio/question${gameState.currentQuestion + 1}.wav`} 
                  type="audio/wav" 
                />
                Your browser does not support the audio element.
              </audio>

              <div
                className={`w-24 h-24 ${themeClasses.cardBg} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Headphones
                  className={`w-12 h-12 ${themeClasses.textSecondary}`}
                />
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlayPause}
                  className={themeClasses.accent}
                  tabIndex={13}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  className={themeClasses.button}
                  onClick={skipForward}
                  tabIndex={14}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  className={themeClasses.button}
                  onClick={toggleMute}
                  tabIndex={15}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
              
              <div
                className={`w-full ${themeClasses.border} rounded-full h-2 mb-2`}
              >
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>

            {/* Transcript (initially hidden) */}
            <div
              className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-4`}
            >
              <Button
                variant="ghost"
                className={themeClasses.button}
                tabIndex={16}
                onClick={() => {
                  const transcript = document.getElementById("transcript");
                  if (transcript) {
                    transcript.style.display =
                      transcript.style.display === "none" ? "block" : "none";
                  }
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Show/Hide Transcript
              </Button>
              <div
                id="transcript"
                style={{ display: "none" }}
                className={`text-sm ${themeClasses.textSecondary} italic`}
              >
                {question.transcript}
              </div>
            </div>

            {/* Question */}
            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold text-center ${themeClasses.text}`}
                tabIndex={17}
              >
                {question.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {question.options.map((option, index) => {
                  let buttonClass = `w-full p-4 text-left border-2 transition-all duration-300 ${themeClasses.border}`;

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
                      onClick={() => onHandleAnswerSelect(index)}
                      disabled={showFeedback}
                      tabIndex={18 + index}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full ${themeClasses.cardBg} flex items-center justify-center text-sm font-bold ${themeClasses.text}`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
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
                      {isCorrect ? "Excellent listening!" : "Listen again"}
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.text}`}>
                    {isCorrect
                      ? `Great comprehension! You earned ${
                          100 + gameState.streak * 10
                        } points!`
                      : "Try listening to the audio again and focus on the key information."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
