"use client";

/**
 * FluentForce - English Learning Platform
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 * Plataforma de aprendizaje de inglés académico con enfoque en gamificación
 * y cumplimiento de estándares WCAG 2.1 para accesibilidad
 */

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Headphones,
  PenTool,
  Trophy,
  Star,
  Target,
  Clock,
  CheckCircle,
  PlayCircle,
  Zap,
  Brain,
  Gamepad2,
  Volume2,
  Lightbulb,
  Timer,
  Heart,
  Flame,
  Crown,
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  HelpCircle,
  Pause,
  Play,
  SkipForward,
  Send,
  Save,
  RefreshCw,
  ArrowLeft,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Settings,
  ChevronRight,
  Users,
  Award,
  TrendingUp,
  Globe,
  Maximize,
  Minimize,
  Volume1,
  VibrateOffIcon as VolumeOff,
  CaptionsIcon as ClosedCaptioning,
  ArrowRight,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";

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

interface ListeningQuestion {
  id: string;
  audioText: string;
  question: string;
  options: string[];
  correct: number;
  transcript: string;
}

interface GrammarQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  rule: string;
}

interface ReadingPassage {
  title: string;
  text: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  showSubtitles: boolean;
  isFullscreen: boolean;
}

export default function EnglishLearningPlatform() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [theme, setTheme] = useState<Theme>("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentGame: null,
    score: 0,
    lives: 3,
    streak: 0,
    timeLeft: 60,
    currentQuestion: 0,
    totalQuestions: 0,
    isPlaying: false,
    isPaused: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [writingText, setWritingText] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Video state
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    showSubtitles: true,
    isFullscreen: false,
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("fluentforce-user");
    const savedTheme = localStorage.getItem("fluentforce-theme") as Theme;
    const savedAuth = localStorage.getItem("fluentforce-authenticated");

    if (savedUser && savedAuth === "true") {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.warn("Error loading user data:", error);
        localStorage.removeItem("fluentforce-user");
        localStorage.removeItem("fluentforce-authenticated");
      }
    }

    if (savedTheme && ["light", "dark", "neutral"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Save user data to localStorage whenever user changes
  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem("fluentforce-user", JSON.stringify(user));
      localStorage.setItem("fluentforce-authenticated", "true");
    } else {
      localStorage.removeItem("fluentforce-user");
      localStorage.removeItem("fluentforce-authenticated");
    }
  }, [user, isAuthenticated]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem("fluentforce-theme", theme);
  }, [theme]);

  // Theme classes - Mejorar el modo intermedio y visibilidad en modo oscuro
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return {
          bg: "bg-gray-900",
          cardBg: "bg-gray-800",
          text: "text-gray-100",
          textSecondary: "text-gray-300",
          border: "border-gray-700",
          button: "bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600",
          accent: "bg-blue-600 hover:bg-blue-700 text-white",
          navBg: "bg-gray-800/95 backdrop-blur-sm",
          helpButton:
            "bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600",
        };
      case "neutral":
        return {
          bg: "bg-gray-200",
          cardBg: "bg-gray-100",
          text: "text-gray-900",
          textSecondary: "text-gray-700",
          border: "border-gray-400",
          button: "bg-gray-300 hover:bg-gray-400 text-gray-900 border-gray-400",
          accent: "bg-gray-700 hover:bg-gray-800 text-white",
          navBg: "bg-gray-100/95 backdrop-blur-sm",
          helpButton:
            "bg-gray-300 hover:bg-gray-400 text-gray-900 border-gray-400",
        };
      default: // light
        return {
          bg: "bg-white",
          cardBg: "bg-white",
          text: "text-gray-900",
          textSecondary: "text-gray-600",
          border: "border-gray-200",
          button: "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200",
          accent: "bg-gray-800 hover:bg-gray-900 text-white",
          navBg: "bg-white/95 backdrop-blur-sm",
          helpButton:
            "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200",
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Sample data
  const vocabularyQuestions: VocabularyQuestion[] = [
    {
      word: "Paradigm",
      definition: "A typical example or pattern of something; a model",
      options: [
        "A complex mathematical equation",
        "A typical example or pattern; a model",
        "A type of academic research method",
        "A philosophical argument structure",
      ],
      correct: 1,
      context:
        "The new research represents a paradigm shift in cognitive psychology.",
      difficulty: "advanced",
    },
    {
      word: "Empirical",
      definition:
        "Based on, concerned with, or verifiable by observation or experience",
      options: [
        "Based on theoretical assumptions",
        "Related to emotional responses",
        "Based on observation or experience",
        "Concerning mathematical proofs",
      ],
      correct: 2,
      context: "The study provides empirical evidence for the hypothesis.",
      difficulty: "proficient",
    },
    {
      word: "Synthesis",
      definition: "The combination of ideas to form a theory or system",
      options: [
        "The breakdown of complex ideas",
        "The combination of ideas to form a theory",
        "The critical analysis of literature",
        "The presentation of research findings",
      ],
      correct: 1,
      context:
        "Her thesis demonstrates an excellent synthesis of multiple theoretical frameworks.",
      difficulty: "advanced",
    },
  ];

  const listeningQuestions: ListeningQuestion[] = [
    {
      id: "1",
      audioText:
        "Climate change represents one of the most pressing challenges of our time...",
      question: "What is the main topic of the lecture?",
      options: [
        "Environmental protection methods",
        "Climate change challenges",
        "Scientific research techniques",
        "Global warming solutions",
      ],
      correct: 1,
      transcript:
        "Climate change represents one of the most pressing challenges of our time. The scientific consensus indicates that human activities, particularly the emission of greenhouse gases, are the primary drivers of current climate patterns.",
    },
    {
      id: "2",
      audioText:
        "The methodology employed in this research follows a mixed-methods approach...",
      question: "What type of research methodology is described?",
      options: [
        "Qualitative only",
        "Mixed-methods approach",
        "Quantitative only",
        "Experimental design",
      ],
      correct: 1,
      transcript:
        "The methodology employed in this research follows a mixed-methods approach, combining both quantitative data analysis and qualitative interviews to provide a comprehensive understanding of the phenomenon.",
    },
  ];

  const grammarQuestions: GrammarQuestion[] = [
    {
      sentence:
        "The research _____ conducted over a period of five years yielded significant results.",
      options: ["that was", "which was", "what was", "who was"],
      correct: 0,
      explanation:
        "Use 'that was' for restrictive relative clauses with past passive voice.",
      rule: "Restrictive Relative Clauses with Passive Voice",
    },
    {
      sentence:
        "_____ the complexity of the data, the analysis required sophisticated software.",
      options: ["Despite", "Given", "Although", "Because"],
      correct: 1,
      explanation:
        "'Given' is used to introduce a reason or cause, meaning 'considering' or 'taking into account'.",
      rule: "Causal Connectors",
    },
  ];

  const readingPassage: ReadingPassage = {
    title: "The Impact of Artificial Intelligence on Higher Education",
    text: `Artificial Intelligence (AI) is revolutionizing higher education in unprecedented ways. Universities worldwide are integrating AI technologies to enhance learning experiences, streamline administrative processes, and support research endeavors. From personalized learning platforms that adapt to individual student needs to sophisticated research tools that can analyze vast datasets, AI is reshaping the academic landscape.

The implementation of AI in education presents both opportunities and challenges. On one hand, AI-powered systems can provide immediate feedback to students, identify learning gaps, and suggest personalized study paths. These systems can also assist educators in creating more effective curricula and assessment methods. On the other hand, concerns about data privacy, the digital divide, and the potential replacement of human interaction in education remain significant considerations.

Research indicates that students who engage with AI-enhanced learning platforms show improved academic performance and higher engagement levels. However, the effectiveness of these technologies largely depends on their thoughtful integration into existing pedagogical frameworks rather than their mere adoption.`,
    questions: [
      {
        question:
          "According to the passage, what is the main impact of AI on higher education?",
        options: [
          "It completely replaces traditional teaching methods",
          "It revolutionizes education in unprecedented ways",
          "It only affects administrative processes",
          "It primarily benefits research activities",
        ],
        correct: 1,
      },
      {
        question:
          "What does the passage suggest about the effectiveness of AI in education?",
        options: [
          "It automatically improves all educational outcomes",
          "It depends on thoughtful integration into pedagogical frameworks",
          "It only works for certain types of students",
          "It requires complete replacement of existing systems",
        ],
        correct: 1,
      },
    ],
  };

  // Video controls
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      try {
        if (videoState.isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch((error) => {
            console.warn("Video play failed:", error);
          });
        }
        setVideoState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
      } catch (error) {
        console.warn("Error toggling video play:", error);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      try {
        videoRef.current.muted = !videoState.isMuted;
        setVideoState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
      } catch (error) {
        console.warn("Error toggling mute:", error);
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      try {
        videoRef.current.volume = newVolume;
        setVideoState((prev) => ({ ...prev, volume: newVolume }));
      } catch (error) {
        console.warn("Error changing volume:", error);
      }
    }
  };

  const toggleSubtitles = () => {
    setVideoState((prev) => ({ ...prev, showSubtitles: !prev.showSubtitles }));
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      try {
        if (!videoState.isFullscreen) {
          videoRef.current.requestFullscreen().catch((error) => {
            console.warn("Fullscreen request failed:", error);
          });
        } else {
          document.exitFullscreen().catch((error) => {
            console.warn("Exit fullscreen failed:", error);
          });
        }
        setVideoState((prev) => ({
          ...prev,
          isFullscreen: !prev.isFullscreen,
        }));
      } catch (error) {
        console.warn("Error toggling fullscreen:", error);
      }
    }
  };

  // Authentication functions
  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    const mockUser: UserType = {
      id: "1",
      name: "Alex Johnson",
      email: email,
      level: 8,
      xp: 2450,
      completedGames: ["vocabulary"],
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulate registration
    const newUser: UserType = {
      id: "2",
      name: name,
      email: email,
      level: 1,
      xp: 0,
      completedGames: [],
    };
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear user data and localStorage
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("fluentforce-user");
    localStorage.removeItem("fluentforce-authenticated");

    // Reset game state
    setGameState({
      currentGame: null,
      score: 0,
      lives: 3,
      streak: 0,
      timeLeft: 60,
      currentQuestion: 0,
      totalQuestions: 0,
      isPlaying: false,
      isPaused: false,
    });

    // Clear any active timers
    if (gameTimer) {
      clearInterval(gameTimer);
      setGameTimer(null);
    }
  };

  // Game functions
  const startGame = (gameType: string) => {
    let totalQuestions = 0;
    switch (gameType) {
      case "vocabulary":
        totalQuestions = vocabularyQuestions.length;
        break;
      case "listening":
        totalQuestions = listeningQuestions.length;
        break;
      case "grammar":
        totalQuestions = grammarQuestions.length;
        break;
      case "reading":
        totalQuestions = readingPassage.questions.length;
        break;
      case "writing":
        totalQuestions = 1;
        break;
    }

    setGameState({
      currentGame: gameType,
      score: 0,
      lives: 3,
      streak: 0,
      timeLeft: gameType === "writing" ? 1800 : 60, // 30 minutes for writing, 60 seconds for others
      currentQuestion: 0,
      totalQuestions,
      isPlaying: true,
      isPaused: false,
    });
    setSelectedAnswer(null);
    setShowFeedback(false);
    setWritingText("");

    if (gameType !== "writing") {
      startTimer();
    }
  };

  const startTimer = () => {
    // Clear any existing timer first
    if (gameTimer) {
      clearInterval(gameTimer);
    }

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1 || prev.isPaused) {
          if (prev.timeLeft <= 1) {
            // Time's up - lose a life
            return {
              ...prev,
              timeLeft: 0,
              lives: prev.lives - 1,
              isPlaying: prev.lives > 1,
            };
          }
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    setGameTimer(timer);
  };

  const pauseGame = () => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback || gameState.isPaused) return;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    let isCorrect = false;
    switch (gameState.currentGame) {
      case "vocabulary":
        isCorrect =
          answerIndex ===
          vocabularyQuestions[gameState.currentQuestion].correct;
        break;
      case "listening":
        isCorrect =
          answerIndex === listeningQuestions[gameState.currentQuestion].correct;
        break;
      case "grammar":
        isCorrect =
          answerIndex === grammarQuestions[gameState.currentQuestion].correct;
        break;
      case "reading":
        isCorrect =
          answerIndex ===
          readingPassage.questions[gameState.currentQuestion].correct;
        break;
    }

    const points = isCorrect ? 100 + gameState.streak * 10 : 0;
    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const newLives = isCorrect ? gameState.lives : gameState.lives - 1;

    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
      streak: newStreak,
      lives: newLives,
      isPlaying: newLives > 0,
    }));

    if (user) {
      setUser((prev) => (prev ? { ...prev, xp: prev.xp + points } : null));
    }

    // Auto advance after 3 seconds
    setTimeout(() => {
      if (
        gameState.currentQuestion < gameState.totalQuestions - 1 &&
        newLives > 0
      ) {
        setGameState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          timeLeft: prev.currentGame === "writing" ? 1800 : 60,
        }));
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        endGame();
      }
    }, 3000);
  };

  const endGame = () => {
    // Clean up timer
    if (gameTimer) {
      clearInterval(gameTimer);
      setGameTimer(null);
    }

    // Update game state
    setGameState((prev) => ({ ...prev, currentGame: null, isPlaying: false }));

    // Update user progress if authenticated
    if (user && gameState.currentGame) {
      setUser((prev) => {
        if (!prev) return null;

        // Avoid duplicate entries in completedGames
        const updatedCompletedGames = prev.completedGames.includes(
          gameState.currentGame!
        )
          ? prev.completedGames
          : [...prev.completedGames, gameState.currentGame!];

        return {
          ...prev,
          completedGames: updatedCompletedGames,
        };
      });
    }
  };

  const resetGame = () => {
    if (gameTimer) clearInterval(gameTimer);
    setGameState({
      currentGame: null,
      score: 0,
      lives: 3,
      streak: 0,
      timeLeft: 60,
      currentQuestion: 0,
      totalQuestions: 0,
      isPlaying: false,
      isPaused: false,
    });
    setSelectedAnswer(null);
    setShowFeedback(false);
    setWritingText("");
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (gameTimer) clearInterval(gameTimer);
    };
  }, [gameTimer]);

  // Enhanced keyboard navigation and accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key handling for closing modals and pausing games
      if (event.key === "Escape") {
        if (showHelp) {
          setShowHelp(false);
        } else if (gameState.currentGame && gameState.isPlaying) {
          pauseGame();
        }
      }

      // F1 for help toggle
      if (event.key === "F1") {
        event.preventDefault();
        setShowHelp(!showHelp);
      }

      // Tab trapping for modals
      if (event.key === "Tab" && showHelp) {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstFocusable = focusableElements[0] as HTMLElement;
          const lastFocusable = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
              event.preventDefault();
              lastFocusable?.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              event.preventDefault();
              firstFocusable?.focus();
            }
          }
        }
      }

      // Arrow key navigation for game options
      if (
        gameState.currentGame &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        const buttons = document.querySelectorAll("button[data-option]");
        const currentIndex = Array.from(buttons).findIndex(
          (btn) => btn === document.activeElement
        );

        if (currentIndex !== -1) {
          event.preventDefault();
          let nextIndex;

          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            nextIndex = (currentIndex + 1) % buttons.length;
          } else {
            nextIndex =
              currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
          }

          (buttons[nextIndex] as HTMLElement)?.focus();
        }
      }

      // Video controls (only when on welcome screen)
      if (showWelcome && videoRef.current) {
        if (event.key === " " || event.key === "k") {
          event.preventDefault();
          toggleVideoPlay();
        }
        if (event.key === "m") {
          event.preventDefault();
          toggleMute();
        }
        if (event.key === "f") {
          event.preventDefault();
          toggleFullscreen();
        }
        if (event.key === "c") {
          event.preventDefault();
          toggleSubtitles();
        }
      }

      // Enter/Space for button activation
      if (
        (event.key === "Enter" || event.key === " ") &&
        document.activeElement?.tagName === "BUTTON"
      ) {
        const button = document.activeElement as HTMLButtonElement;
        if (!button.disabled) {
          event.preventDefault();
          button.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.currentGame, showHelp, showWelcome, gameState.isPlaying]);

  // Welcome Dashboard Screen
  if (showWelcome) {
    return (
      <div
        className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-300`}
      >
        {/* Skip Links for accessibility */}
        <div className="sr-only-focusable">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <a href="#video-section" className="skip-link">
            Skip to video
          </a>
          <a href="#navigation-menu" className="skip-link">
            Skip to navigation
          </a>
        </div>
        {/* Enhanced Modern Header */}
        <header
          className={`${themeClasses.cardBg} ${themeClasses.border} border-b shadow-lg backdrop-blur-sm sticky top-0 z-50`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Enhanced Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button 
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    tabIndex={1}
                    aria-label="FluentForce logo - Ir al inicio"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <Gamepad2 className="w-7 h-7 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                  </button>
                </div>
                <div className="flex flex-col">
                  <button
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                    tabIndex={2}
                    aria-label="FluentForce - Plataforma de Inglés Académico"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    FluentForce
                  </button>
                  <p
                    className={`text-xs ${themeClasses.textSecondary} font-medium tracking-wide`}
                  >
                    Academic English Gaming Platform
                  </p>
                </div>
              </div>

              {/* Quick Actions & Theme Section */}
              <div className="flex items-center space-x-3">
                {/* Quick Stats Badge */}
                <div 
                  className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-700"
                  tabIndex={3}
                  role="status"
                  aria-label="50K+ Active Students"
                >
                  <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                    50K+ Active Students
                  </span>
                </div>

                {/* Enhanced Theme Switcher */}
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("light")}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      theme === "light"
                        ? "bg-white shadow-md text-yellow-600 scale-105"
                        : "text-gray-600 hover:bg-white/50"
                    }`}
                    aria-label="Light theme"
                    tabIndex={4}
                  >
                    <Sun className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("neutral")}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      theme === "neutral"
                        ? "bg-white shadow-md text-gray-600 scale-105"
                        : "text-gray-600 hover:bg-white/50"
                    }`}
                    aria-label="Neutral theme"
                    tabIndex={5}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 shadow-md text-blue-400 scale-105"
                        : "text-gray-600 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    aria-label="Dark theme"
                    tabIndex={6}
                  >
                    <Moon className="w-4 h-4" />
                  </Button>
                </div>

                {/* Enhanced Help Button */}
                <Button
                  variant="ghost"
                  onClick={() => setShowHelp(true)}
                  className={`relative p-3 rounded-xl border-2 ${themeClasses.border} hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105`}
                  aria-label="Help and accessibility options"
                  tabIndex={7}
                >
                  <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                </Button>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    className={`p-3 rounded-xl ${themeClasses.border} border-2`}
                    onClick={() => {
                      // Add mobile menu toggle functionality
                      console.log("Mobile menu toggle");
                    }}
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Header Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-75"></div>
          </div>
        </header>

        {/* Ultra-Modern Navigation Menu */}
        <nav
          id="navigation-menu"
          className={`sticky top-0 z-40 ${themeClasses.navBg} ${themeClasses.border} border-b shadow-xl backdrop-blur-xl bg-opacity-95`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-5">
              {/* Enhanced Navigation Links */}
              <div className="hidden lg:flex items-center bg-white/70 dark:bg-gray-800/70 rounded-2xl p-2 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("hero-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative px-6 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:shadow-md group`}
                  tabIndex={8}
                >
                  <Crown className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                    Home
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("video-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative px-6 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:shadow-md group`}
                  tabIndex={9}
                >
                  <PlayCircle className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                    Demo
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("features-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative px-6 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:shadow-md group`}
                  tabIndex={10}
                >
                  <Gamepad2 className="w-5 h-5 mr-2 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
                    Games
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("stats-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative px-6 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 dark:hover:from-orange-900/30 dark:hover:to-yellow-900/30 hover:shadow-md group`}
                  tabIndex={11}
                >
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="bg-gradient-to-r from-orange-700 to-yellow-700 dark:from-orange-300 dark:to-yellow-300 bg-clip-text text-transparent">
                    Results
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Button>
              </div>

              {/* Mobile Navigation Trigger */}
              <div className="lg:hidden flex items-center space-x-3">
                <div className="flex items-center bg-white/70 dark:bg-gray-800/70 rounded-xl p-1 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-3 rounded-lg transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/30`}
                    onClick={() => {
                      console.log("Mobile menu toggle");
                    }}
                  >
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Auth Buttons */}
              <div className="flex items-center space-x-4">
                {/* Sign In Button */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsLogin(true);
                    setShowWelcome(false);
                  }}
                  className={`relative px-6 py-3 font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:-translate-y-0.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group overflow-hidden`}
                  tabIndex={12}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
                  <LogIn className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <span className="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Sign In
                  </span>
                </Button>

                {/* Sign Up Button */}
                <Button
                  onClick={() => {
                    setIsLogin(false);
                    setShowWelcome(false);
                  }}
                  className={`relative px-8 py-3 font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 group overflow-hidden`}
                  tabIndex={13}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">Sign Up Free</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg"></div>
                </Button>
              </div>
            </div>

            {/* Enhanced Mobile Navigation Menu */}
            <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 py-4 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("hero-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
                >
                  <Crown className="w-5 h-5 mx-auto mb-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Home
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("video-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
                >
                  <PlayCircle className="w-5 h-5 mx-auto mb-2 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Demo
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("features-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
                >
                  <Gamepad2 className="w-5 h-5 mx-auto mb-2 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Games
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById("stats-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
                >
                  <TrendingUp className="w-5 h-5 mx-auto mb-2 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Results
                  </span>
                </Button>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex space-x-3 mt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsLogin(true);
                    setShowWelcome(false);
                  }}
                  className={`flex-1 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm font-semibold transition-all duration-300 hover:shadow-md`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    setIsLogin(false);
                    setShowWelcome(false);
                  }}
                  className={`flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up Free
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main
          id="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {/* Hero Section */}
          <section
            id="hero-section"
            className="text-center mb-16"
            role="banner"
          >
            <div className="mb-6">
              <div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4"
                tabIndex={14}
                role="banner"
                aria-label="#1 Academic English Gaming Platform"
              >
                <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                  #1 Academic English Gaming Platform
                </span>
              </div>
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              tabIndex={15}
            >
              Master Academic English Through Gaming
            </h1>

            <p
              className={`text-xl md:text-2xl ${themeClasses.textSecondary} mb-6 max-w-4xl mx-auto leading-relaxed`}
              tabIndex={16}
            >
              🎓 <strong>Transform your university English skills</strong> with
              the world's first gamified academic English platform. Join
              thousands of students who've already improved their IELTS, TOEFL,
              and university performance!
            </p>

            {/* Key Selling Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-purple-500`}
                tabIndex={17}
                role="region"
                aria-label="5 Interactive Games"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                    5 Interactive Games
                  </span>
                </div>
                <p
                  className={`text-sm ${themeClasses.textSecondary} text-center`}
                >
                  <span className="text-purple-600 font-medium">
                    Vocabulary
                  </span>{" "}
                  • <span className="text-blue-600 font-medium">Listening</span>{" "}
                  • <span className="text-indigo-600 font-medium">Grammar</span>{" "}
                  • <span className="text-teal-600 font-medium">Reading</span> •{" "}
                  <span className="text-green-600 font-medium">Writing</span>
                </p>
              </div>

              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-yellow-500`}
                tabIndex={18}
                role="region"
                aria-label="Real Progress"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Real Progress
                  </span>
                </div>
                <p
                  className={`text-sm ${themeClasses.textSecondary} text-center`}
                >
                  <span className="text-yellow-600 font-medium">XP System</span>{" "}
                  • <span className="text-orange-600 font-medium">Levels</span>{" "}
                  • <span className="text-red-500 font-medium">Streaks</span> •{" "}
                  <span className="text-green-600 font-medium">
                    Achievements
                  </span>
                </p>
              </div>

              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-blue-500`}
                tabIndex={19}
                role="region"
                aria-label="Instant Results"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Instant Results
                  </span>
                </div>
                <p
                  className={`text-sm ${themeClasses.textSecondary} text-center`}
                >
                  <span className="text-blue-600 font-medium">
                    Immediate Feedback
                  </span>{" "}
                  •{" "}
                  <span className="text-cyan-600 font-medium">
                    Adaptive Learning
                  </span>{" "}
                  •{" "}
                  <span className="text-indigo-600 font-medium">
                    Smart Analytics
                  </span>
                </p>
              </div>
            </div>

            {/* What Makes Us Unique */}
            <div
              className={`${themeClasses.cardBg} ${themeClasses.border} rounded-2xl p-8 mb-8 max-w-5xl mx-auto shadow-2xl border-t-4 border-t-gradient-to-r from-purple-500 to-blue-500`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                    What Makes Us Unique
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  🚀 The FluentForce Advantage
                </h3>
                <p className={`text-lg ${themeClasses.textSecondary}`}>
                  The only platform that combines academic rigor with gaming
                  engagement
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div
                  className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300`}
                >
                  <h4 className="font-bold text-xl mb-4 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                      Academic Excellence
                    </span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        University-level vocabulary (IELTS 6.5-8.0)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        Academic writing skills for essays & research
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        Complex grammar structures for formal English
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        Listening comprehension for lectures & seminars
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300`}
                >
                  <h4 className="font-bold text-xl mb-4 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Gaming Innovation
                    </span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        Competitive scoring system with streaks
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        Progressive difficulty that adapts to you
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        Achievement badges & level progression
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className={`text-sm ${themeClasses.text}`}>
                        Study habits that actually stick!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div
              className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 mb-8 shadow-lg border-t-4 border-t-gradient-to-r from-green-500 to-teal-500`}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-xl font-bold ${themeClasses.text}`}>
                      Join <span className="text-green-600">10,000+</span>{" "}
                      students
                    </p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      from top universities worldwide
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  <div className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/10 dark:hover:to-purple-800/10 transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">O</span>
                    </div>
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      Oxford
                    </span>
                  </div>

                  <div className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/10 dark:hover:to-blue-800/10 transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Cambridge
                    </span>
                  </div>

                  <div className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/10 dark:hover:to-red-800/10 transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">H</span>
                    </div>
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">
                      Harvard
                    </span>
                  </div>

                  <div className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/10 dark:hover:to-green-800/10 transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      Stanford
                    </span>
                  </div>

                  <div className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/10 dark:hover:to-indigo-800/10 transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      MIT
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6 space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </div>
                  <span
                    className={`text-sm ${themeClasses.textSecondary} ml-3`}
                  >
                    And thousands more from 200+ universities
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Button
                  onClick={() => {
                    setShowWelcome(false);
                    setIsLogin(false);
                  }}
                  size="lg"
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 rounded-xl border border-transparent hover:border-purple-300/50"
                  aria-describedby="signup-description"
                  tabIndex={8}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <span>Start Your Journey</span>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Button>
              </div>
              <span id="signup-description" className="sr-only">
                Create a new account to begin learning
              </span>

              <div className="relative group">
                <Button
                  onClick={() => {
                    setShowWelcome(false);
                    setIsLogin(true);
                  }}
                  variant="outline"
                  size="lg"
                  className={`${themeClasses.border} ${themeClasses.text} ${
                    theme === "dark"
                      ? "hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 border-gray-600 hover:border-purple-500"
                      : theme === "neutral"
                      ? "hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 border-gray-400 hover:border-purple-500"
                      : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border-gray-300 hover:border-purple-500"
                  } px-10 py-5 text-xl font-semibold transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-105`}
                  aria-describedby="signin-description"
                  tabIndex={9}
                >
                  <div className="flex items-center space-x-3">
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </div>
                </Button>
              </div>
              <span id="signin-description" className="sr-only">
                Sign in to your existing account
              </span>
            </div>
          </section>

          {/* Welcome Video Section */}
          <section
            id="video-section"
            className="mb-16"
            role="region"
            aria-labelledby="video-heading"
          >
            <h2
              id="video-heading"
              className="text-3xl font-bold text-center mb-8"
              tabIndex={10}
            >
              Welcome to Your Learning Adventure
            </h2>
            <Card
              className={`${themeClasses.cardBg} ${themeClasses.border} shadow-xl max-w-4xl mx-auto`}
            >
              <CardContent className="p-0">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    className="w-full aspect-video"
                    poster="/english-learning-thumbnail.png"
                    aria-describedby="video-description"
                    aria-label="FluentForce introduction video - Learn academic English through interactive games"
                    tabIndex={11}
                    role="application"
                    onTimeUpdate={(e) => {
                      const video = e.target as HTMLVideoElement;
                      setVideoState((prev) => ({
                        ...prev,
                        currentTime: video.currentTime,
                        duration: video.duration || 0,
                      }));
                    }}
                  >
                    <source src="/videos/FluentForce.mp4" type="video/mp4" />
                    <track
                      kind="subtitles"
                      src="/subtitles/FluentForce-subtitulos.vtt"
                      srcLang="en"
                      label="English"
                      default={videoState.showSubtitles}
                    />
                    <track
                      kind="descriptions"
                      src="/subtitles/FluentForce-audio-descriptions.vtt"
                      srcLang="en"
                      label="Audio Descriptions"
                    />
                    Your browser does not support the video tag. This video
                    introduces FluentForce, an interactive platform for learning
                    academic English.
                  </video>

                  {/* Hidden description for screen readers */}
                  <div id="video-description" className="sr-only">
                    Promotional video showcasing FluentForce platform features
                    including vocabulary games, listening exercises, grammar
                    challenges, reading comprehension, and writing workshops
                    designed for academic English learning.
                  </div>

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center space-x-4">
                      {/* Play/Pause Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleVideoPlay}
                        className="text-white hover:bg-white/20"
                        aria-label={
                          videoState.isPlaying ? "Pause video" : "Play video"
                        }
                        tabIndex={12}
                      >
                        {videoState.isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </Button>

                      {/* Progress Bar */}
                      <div
                        className="flex-1"
                        role="progressbar"
                        aria-label="Video progress"
                        aria-valuemin={0}
                        aria-valuemax={videoState.duration}
                        aria-valuenow={videoState.currentTime}
                      >
                        <div className="w-full bg-white/30 rounded-full h-1">
                          <div
                            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                videoState.duration
                                  ? (videoState.currentTime /
                                      videoState.duration) *
                                    100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Time Display */}
                      <span
                        className="text-white text-sm font-mono"
                        aria-label={`Video time: ${Math.floor(
                          videoState.currentTime / 60
                        )} minutes ${Math.floor(
                          videoState.currentTime % 60
                        )} seconds of ${Math.floor(
                          videoState.duration / 60
                        )} minutes ${Math.floor(
                          videoState.duration % 60
                        )} seconds`}
                      >
                        {Math.floor(videoState.currentTime / 60)}:
                        {Math.floor(videoState.currentTime % 60)
                          .toString()
                          .padStart(2, "0")}{" "}
                        / {Math.floor(videoState.duration / 60)}:
                        {Math.floor(videoState.duration % 60)
                          .toString()
                          .padStart(2, "0")}
                      </span>

                      {/* Volume Control */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20"
                          aria-label={videoState.isMuted ? "Unmute" : "Mute"}
                          tabIndex={13}
                        >
                          {videoState.isMuted ? (
                            <VolumeOff className="w-4 h-4" />
                          ) : videoState.volume > 0.5 ? (
                            <Volume2 className="w-4 h-4" />
                          ) : (
                            <Volume1 className="w-4 h-4" />
                          )}
                        </Button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={videoState.volume}
                          onChange={(e) =>
                            handleVolumeChange(parseFloat(e.target.value))
                          }
                          className="w-16 accent-blue-500"
                          aria-label="Volume control"
                          tabIndex={14}
                        />
                      </div>

                      {/* Subtitles Toggle */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSubtitles}
                        className={`text-white hover:bg-white/20 ${
                          videoState.showSubtitles ? "bg-white/20" : ""
                        }`}
                        aria-label={
                          videoState.showSubtitles
                            ? "Hide subtitles"
                            : "Show subtitles"
                        }
                        tabIndex={15}
                      >
                        <ClosedCaptioning className="w-4 h-4" />
                      </Button>

                      {/* Fullscreen Toggle */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="text-white hover:bg-white/20"
                        aria-label={
                          videoState.isFullscreen
                            ? "Exit fullscreen"
                            : "Enter fullscreen"
                        }
                        tabIndex={16}
                      >
                        {videoState.isFullscreen ? (
                          <Minimize className="w-4 h-4" />
                        ) : (
                          <Maximize className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-3">
                      🎬 See FluentForce in Action
                    </h3>
                    <p
                      id="video-description"
                      className={`${themeClasses.textSecondary} mb-4`}
                      tabIndex={17}
                    >
                      Watch real students improve their academic English through
                      our revolutionary gaming approach. Discover the 5 core
                      games that have helped over 10,000 students achieve their
                      academic goals.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-purple-700 dark:text-purple-300">
                          Vocabulary
                        </span>
                        <span
                          className={`${themeClasses.textSecondary} text-xs text-center`}
                        >
                          Master Complex Terms
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <Headphones className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-blue-700 dark:text-blue-300">
                          Listening
                        </span>
                        <span
                          className={`${themeClasses.textSecondary} text-xs text-center`}
                        >
                          Academic Lectures
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/20 dark:hover:to-indigo-800/20 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-indigo-700 dark:text-indigo-300">
                          Grammar
                        </span>
                        <span
                          className={`${themeClasses.textSecondary} text-xs text-center`}
                        >
                          Advanced Structures
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-teal-100 dark:hover:from-teal-900/20 dark:hover:to-teal-800/20 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-teal-700 dark:text-teal-300">
                          Reading
                        </span>
                        <span
                          className={`${themeClasses.textSecondary} text-xs text-center`}
                        >
                          Complex Texts
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/20 dark:hover:to-green-800/20 transition-all duration-300 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <PenTool className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-green-700 dark:text-green-300">
                          Writing
                        </span>
                        <span
                          className={`${themeClasses.textSecondary} text-xs text-center`}
                        >
                          Academic Essays
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Features Grid */}
          <section
            id="features-section"
            className="mb-16"
            role="region"
            aria-labelledby="features-heading"
          >
            <h2
              id="features-heading"
              className="text-3xl font-bold text-center mb-4"
              tabIndex={18}
            >
              🎯 Why 95% of Our Students Achieve Their Goals
            </h2>
            <p
              className={`text-lg ${themeClasses.textSecondary} text-center mb-12 max-w-3xl mx-auto`}
            >
              Unlike traditional language apps, FluentForce is specifically
              designed for academic success. Here's what makes our students
              succeed where others struggle:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card
                className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold" tabIndex={19}>
                    🎮 5 Addictive Learning Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeClasses.textSecondary} tabIndex={20}>
                    <strong>Academic Vocabulary Challenge:</strong> Master 1000+
                    university-level terms
                    <br />
                    <strong>Listening Lab:</strong> Decode real academic
                    lectures
                    <br />
                    <strong>Grammar Quest:</strong> Conquer complex structures
                    <br />
                    <strong>Reading Expedition:</strong> Navigate scholarly
                    texts
                    <br />
                    <strong>Writing Workshop:</strong> Craft perfect academic
                    essays
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-semibold">
                      Proven by 10,000+ students
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card
                className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold" tabIndex={21}>
                    Personalized Progress Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeClasses.textSecondary} tabIndex={22}>
                    Monitor your improvement with detailed analytics, adaptive
                    difficulty levels, and personalized recommendations based on
                    your learning patterns and goals.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card
                className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold" tabIndex={23}>
                    Academic Excellence Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeClasses.textSecondary} tabIndex={24}>
                    Specifically designed for university students and
                    professionals who need advanced English skills for academic
                    writing, presentations, and research.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card
                className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold" tabIndex={25}>
                    Global Learning Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeClasses.textSecondary} tabIndex={26}>
                    Connect with learners worldwide, participate in challenges,
                    and benefit from peer learning in a supportive,
                    multicultural environment.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card
                className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold" tabIndex={27}>
                    Accessibility First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeClasses.textSecondary} tabIndex={28}>
                    Fully accessible platform with keyboard navigation, screen
                    reader support, multiple theme options, and inclusive design
                    for learners of all abilities.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card
                className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold" tabIndex={29}>
                    Instant Feedback & Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeClasses.textSecondary} tabIndex={30}>
                    Receive immediate, constructive feedback on your performance
                    with detailed explanations, tips for improvement, and
                    adaptive learning suggestions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Statistics Section */}
          <section
            id="stats-section"
            className="mb-16"
            role="region"
            aria-labelledby="stats-heading"
          >
            <Card
              className={`${themeClasses.cardBg} ${themeClasses.border} shadow-xl`}
            >
              <CardHeader className="text-center">
                <h2
                  id="stats-heading"
                  className="text-3xl font-bold mb-4"
                  tabIndex={31}
                >
                  Join Thousands of Successful Learners
                </h2>
                <p className={themeClasses.textSecondary} tabIndex={32}>
                  Our platform has helped students worldwide achieve their
                  academic English goals
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div
                      className="text-4xl font-bold text-blue-600 mb-2"
                      tabIndex={33}
                    >
                      50,000+
                    </div>
                    <p className={themeClasses.textSecondary}>
                      Active Learners
                    </p>
                  </div>
                  <div>
                    <div
                      className="text-4xl font-bold text-purple-600 mb-2"
                      tabIndex={34}
                    >
                      95%
                    </div>
                    <p className={themeClasses.textSecondary}>Success Rate</p>
                  </div>
                  <div>
                    <div
                      className="text-4xl font-bold text-green-600 mb-2"
                      tabIndex={35}
                    >
                      200+
                    </div>
                    <p className={themeClasses.textSecondary}>Universities</p>
                  </div>
                  <div>
                    <div
                      className="text-4xl font-bold text-orange-600 mb-2"
                      tabIndex={36}
                    >
                      4.9/5
                    </div>
                    <p className={themeClasses.textSecondary}>User Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Final CTA Section */}
          <section
            id="cta-section"
            className="text-center"
            role="region"
            aria-labelledby="cta-heading"
          >
            <Card
              className={`${themeClasses.cardBg} ${themeClasses.border} shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20`}
            >
              <CardContent className="py-12">
                <h2
                  id="cta-heading"
                  className="text-3xl font-bold mb-6"
                  tabIndex={37}
                >
                  Ready to Transform Your English Skills?
                </h2>
                <p
                  className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-2xl mx-auto`}
                  tabIndex={38}
                >
                  Join our community of learners and start your journey to
                  academic English mastery today. Your future success begins
                  with a single click.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setShowWelcome(false);
                      setIsLogin(false);
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    tabIndex={39}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Button>
                  <Button
                    onClick={() => {
                      setShowWelcome(false);
                      setIsLogin(true);
                    }}
                    variant="outline"
                    size="lg"
                    className={`${themeClasses.border} ${themeClasses.text} hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 text-lg font-semibold transition-all duration-300`}
                    tabIndex={40}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer
          className={`${themeClasses.cardBg} ${themeClasses.border} border-t mt-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className={themeClasses.textSecondary} tabIndex={41}>
                © 2024 English Quest University. Empowering academic success
                through innovative language learning.
              </p>
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <button
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                  tabIndex={42}
                >
                  Privacy Policy
                </button>
                <button
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                  tabIndex={43}
                >
                  Terms of Service
                </button>
                <button
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                  tabIndex={44}
                >
                  Accessibility
                </button>
                <button
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                  tabIndex={45}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Help Modal */}
        {showHelp && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            role="dialog"
            aria-labelledby="help-title"
            aria-describedby="help-description"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowHelp(false);
              }
            }}
          >
            <Card
              className={`${themeClasses.cardBg} ${themeClasses.border} w-full max-w-2xl border-2 max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle
                    id="help-title"
                    className={`flex items-center space-x-2 ${themeClasses.text}`}
                  >
                    <HelpCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Help & Accessibility Guide</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHelp(false)}
                    className={`${themeClasses.textSecondary} hover:${themeClasses.text}`}
                    aria-label="Close help dialog"
                    autoFocus
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </div>
                <CardDescription
                  id="help-description"
                  className={themeClasses.textSecondary}
                >
                  Complete guide for navigating FluentForce with keyboard and
                  assistive technologies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className={`font-semibold mb-3 ${themeClasses.text}`}>
                    Keyboard Navigation:
                  </h3>
                  <ul
                    className={`text-sm space-y-2 ${themeClasses.textSecondary}`}
                  >
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        Tab
                      </kbd>{" "}
                      - Navigate between interactive elements
                    </li>
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        Enter
                      </kbd>{" "}
                      or{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        Space
                      </kbd>{" "}
                      - Activate buttons and links
                    </li>
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        F1
                      </kbd>{" "}
                      - Open/close this help menu
                    </li>
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        Esc
                      </kbd>{" "}
                      - Close modals or pause games
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={`font-semibold mb-3 ${themeClasses.text}`}>
                    Video Controls:
                  </h3>
                  <ul
                    className={`text-sm space-y-2 ${themeClasses.textSecondary}`}
                  >
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        Space
                      </kbd>{" "}
                      or{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        K
                      </kbd>{" "}
                      - Play/pause video
                    </li>
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        M
                      </kbd>{" "}
                      - Mute/unmute audio
                    </li>
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        F
                      </kbd>{" "}
                      - Toggle fullscreen
                    </li>
                    <li>
                      •{" "}
                      <kbd
                        className={`${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200"
                            : theme === "neutral"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-800"
                        } px-2 py-1 rounded text-xs font-mono`}
                      >
                        C
                      </kbd>{" "}
                      - Toggle subtitles
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={`font-semibold mb-3 ${themeClasses.text}`}>
                    Accessibility Features:
                  </h3>
                  <ul
                    className={`text-sm space-y-2 ${themeClasses.textSecondary}`}
                  >
                    <li>
                      • Three visual themes: Light, Neutral, and Dark modes
                    </li>
                    <li>
                      • Full screen reader compatibility (NVDA, JAWS, VoiceOver)
                    </li>
                    <li>• High contrast ratios and scalable text</li>
                    <li>• Semantic HTML structure with proper ARIA labels</li>
                    <li>• Focus indicators and logical tab order</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`font-semibold mb-3 ${themeClasses.text}`}>
                    Getting Started:
                  </h3>
                  <ul
                    className={`text-sm space-y-2 ${themeClasses.textSecondary}`}
                  >
                    <li>
                      • Watch the welcome video to understand the platform
                    </li>
                    <li>• Choose "Get Started Free" to create a new account</li>
                    <li>• Use "Sign In" if you already have an account</li>
                    <li>
                      • Adjust theme settings using the buttons in the top-right
                      corner
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between gap-4">
                  <Button
                    onClick={() => setShowHelp(false)}
                    className={`flex-1 ${themeClasses.accent} font-semibold`}
                    aria-describedby="close-help-description"
                  >
                    Close Help Guide
                  </Button>
                  <div id="close-help-description" className="sr-only">
                    Closes the help dialog and returns to the main application
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // Login/Register Screen - COLORES MINIMALISTAS
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen ${themeClasses.bg} flex items-center justify-center p-4 transition-colors duration-300`}
      >
        {/* Skip Links for accessibility */}
        <div className="sr-only-focusable">
          <a href="#auth-form" className="skip-link">
            Skip to login form
          </a>
        </div>

        <Card
          id="auth-form"
          className={`w-full max-w-md ${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
        >
          <CardHeader className="text-center">
            <Button
              variant="ghost"
              onClick={() => setShowWelcome(true)}
              className={`${themeClasses.button} mb-4 self-start`}
              aria-label="Back to welcome screen"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className={`text-2xl font-bold ${themeClasses.text}`}>
              FluentForce
            </CardTitle>
            <CardDescription className={themeClasses.textSecondary}>
              {isLogin
                ? "Welcome back! Sign in to continue your learning journey."
                : "Join thousands of students mastering academic English."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const name = formData.get("name") as string;

                if (isLogin) {
                  handleLogin(email, password);
                } else {
                  handleRegister(name, email, password);
                }
              }}
              className="space-y-4"
              role="form"
              aria-labelledby="auth-form-title"
            >
              <fieldset
                className="space-y-4"
                aria-describedby="auth-form-description"
              >
                <legend className="sr-only" id="auth-form-title">
                  {isLogin ? "Sign in to your account" : "Create a new account"}
                </legend>
                <div className="sr-only" id="auth-form-description">
                  {isLogin
                    ? "Enter your email and password to sign in to FluentForce"
                    : "Fill out this form to create your FluentForce account"}
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className={themeClasses.text}>
                      Full Name{" "}
                      <span className="text-red-500" aria-label="required">
                        *
                      </span>
                    </Label>
                    <div className="relative">
                      <User
                        className={`absolute left-3 top-3 w-4 h-4 ${themeClasses.textSecondary}`}
                        aria-hidden="true"
                      />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        required
                        aria-required="true"
                        aria-describedby="name-error"
                        autoComplete="name"
                        className={`pl-10 ${themeClasses.border} ${themeClasses.text} ${themeClasses.cardBg}`}
                      />
                    </div>
                    <div
                      id="name-error"
                      className="sr-only"
                      aria-live="polite"
                    ></div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className={themeClasses.text}>
                    Email Address{" "}
                    <span className="text-red-500" aria-label="required">
                      *
                    </span>
                  </Label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-3 w-4 h-4 ${themeClasses.textSecondary}`}
                      aria-hidden="true"
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      aria-required="true"
                      aria-describedby="email-error"
                      autoComplete="email"
                      className={`pl-10 ${themeClasses.border} ${themeClasses.text} ${themeClasses.cardBg}`}
                    />
                  </div>
                  <div
                    id="email-error"
                    className="sr-only"
                    aria-live="polite"
                  ></div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className={themeClasses.text}>
                    Password{" "}
                    <span className="text-red-500" aria-label="required">
                      *
                    </span>
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-3 w-4 h-4 ${themeClasses.textSecondary}`}
                      aria-hidden="true"
                    />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      aria-required="true"
                      aria-describedby="password-error password-help"
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                      className={`pl-10 pr-10 ${themeClasses.border} ${themeClasses.text} ${themeClasses.cardBg}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`absolute right-2 top-2 ${themeClasses.textSecondary}`}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                  <div
                    id="password-error"
                    className="sr-only"
                    aria-live="polite"
                  ></div>
                  {!isLogin && (
                    <div
                      id="password-help"
                      className={`text-xs ${themeClasses.textSecondary}`}
                    >
                      Password should be at least 8 characters long
                    </div>
                  )}
                </div>
              </fieldset>

              <Button
                type="submit"
                className={`w-full ${themeClasses.accent}`}
                aria-describedby="submit-help"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
              <div id="submit-help" className="sr-only">
                {isLogin
                  ? "Press to sign in to your FluentForce account"
                  : "Press to create your new FluentForce account"}
              </div>
            </form>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className={themeClasses.button}
                aria-describedby="auth-toggle-help"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
              <div id="auth-toggle-help" className="sr-only">
                {isLogin
                  ? "Switch to account registration form"
                  : "Switch to account sign in form"}
              </div>
            </div>

            <div
              className={`text-center text-sm ${themeClasses.textSecondary}`}
              role="status"
              aria-live="polite"
            >
              <p>Press F1 for help and accessibility options</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Vocabulary Game Screen - COLORES MINIMALISTAS
  if (gameState.currentGame === "vocabulary") {
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
                  onClick={resetGame}
                  className={themeClasses.button}
                  tabIndex={1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit Game
                </Button>
                <Button
                  variant="ghost"
                  onClick={pauseGame}
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
                  <span
                    className={`font-semibold ${themeClasses.text}`}
                    tabIndex={3}
                  >
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
                    onClick={() => setTheme("light")}
                    className={`p-2 ${
                      theme === "light"
                        ? `${themeClasses.cardBg} shadow-sm`
                        : ""
                    } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                    aria-label="Light theme"
                    tabIndex={4}
                  >
                    <Sun className="w-4 h-4" />
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
                    tabIndex={5}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={`p-2 ${
                      theme === "dark" ? `${themeClasses.cardBg} shadow-sm` : ""
                    } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                    aria-label="Dark theme"
                    tabIndex={6}
                  >
                    <Moon className="w-4 h-4" />
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
                    <Flame
                      className={`w-4 h-4 ${themeClasses.textSecondary}`}
                    />
                    <span className={`font-bold ${themeClasses.text}`}>
                      {gameState.streak}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: gameState.lives }).map((_, i) => (
                      <Heart
                        key={i}
                        className="w-4 h-4 text-red-500 fill-current"
                      />
                    ))}
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
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
                <Button onClick={pauseGame} className={themeClasses.accent}>
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
                <CardTitle
                  className={`text-3xl font-bold mb-4 ${themeClasses.text}`}
                  tabIndex={7}
                >
                  {question.word}
                </CardTitle>
                <CardDescription
                  className={`text-lg ${themeClasses.textSecondary} italic`}
                  tabIndex={8}
                >
                  "{question.context}"
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p
                  className={`text-center text-lg mb-6 ${themeClasses.text}`}
                  tabIndex={9}
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
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        tabIndex={10 + index}
                        role="radio"
                        aria-checked={ariaPressed}
                        aria-label={ariaLabel}
                        data-option={index}
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

  // Listening Lab Game Screen - COLORES MINIMALISTAS
  if (gameState.currentGame === "listening") {
    const question = listeningQuestions[gameState.currentQuestion];
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
                  tabIndex={1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit Lab
                </Button>
                <Button
                  variant="ghost"
                  onClick={pauseGame}
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
                  <span
                    className={`font-semibold ${themeClasses.text}`}
                    tabIndex={3}
                  >
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
                    onClick={() => setTheme("light")}
                    className={`p-2 ${
                      theme === "light"
                        ? `${themeClasses.cardBg} shadow-sm`
                        : ""
                    } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                    aria-label="Light theme"
                    tabIndex={4}
                  >
                    <Sun className="w-4 h-4" />
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
                    tabIndex={5}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={`p-2 ${
                      theme === "dark" ? `${themeClasses.cardBg} shadow-sm` : ""
                    } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                    aria-label="Dark theme"
                    tabIndex={6}
                  >
                    <Moon className="w-4 h-4" />
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
                  <div className="flex items-center space-x-1">
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
              <CardTitle
                className={`text-2xl font-bold mb-4 ${themeClasses.text}`}
                tabIndex={7}
              >
                Listen to the Academic Lecture
              </CardTitle>
              <CardDescription
                className={themeClasses.textSecondary}
                tabIndex={8}
              >
                Listen carefully and answer the comprehension question
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Audio Player */}
              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-6 text-center`}
              >
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
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className={themeClasses.accent}
                    tabIndex={9}
                  >
                    {isAudioPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className={themeClasses.button}
                    tabIndex={10}
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    className={themeClasses.button}
                    tabIndex={11}
                  >
                    {isAudioPlaying ? (
                      <Volume2 className="w-5 h-5" />
                    ) : (
                      <VolumeX className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <div
                  className={`w-full ${themeClasses.border} rounded-full h-2 mb-2`}
                >
                  <div
                    className="bg-gray-600 h-2 rounded-full"
                    style={{ width: "45%" }}
                  />
                </div>
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  0:45 / 1:30
                </p>
              </div>

              {/* Transcript (initially hidden) */}
              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-4`}
              >
                <Button
                  variant="ghost"
                  className={themeClasses.button}
                  onClick={() => {
                    const transcript = document.getElementById("transcript");
                    if (transcript) {
                      transcript.style.display =
                        transcript.style.display === "none" ? "block" : "none";
                    }
                  }}
                  tabIndex={12}
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
                  tabIndex={13}
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
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        tabIndex={14 + index}
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

  // Grammar Quest Game Screen - COLORES MINIMALISTAS
  if (gameState.currentGame === "grammar") {
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
                  tabIndex={1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit Quest
                </Button>
                <div className="flex items-center space-x-2">
                  <Target className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  <span
                    className={`font-semibold ${themeClasses.text}`}
                    tabIndex={2}
                  >
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
                    tabIndex={3}
                  >
                    <Sun className="w-4 h-4" />
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
                    tabIndex={4}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={`p-2 ${
                      theme === "dark" ? `${themeClasses.cardBg} shadow-sm` : ""
                    } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                    aria-label="Dark theme"
                    tabIndex={5}
                  >
                    <Moon className="w-4 h-4" />
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
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className={`text-2xl font-bold mb-2 ${themeClasses.text}`}
                tabIndex={6}
              >
                Grammar Challenge
              </CardTitle>
              <Badge className="bg-gray-700 text-white mb-4">
                {question.rule}
              </Badge>
              <CardDescription
                className={themeClasses.textSecondary}
                tabIndex={7}
              >
                Complete the sentence with the correct grammatical structure
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div
                className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-6 text-center`}
              >
                <p
                  className={`text-xl leading-relaxed ${themeClasses.text}`}
                  tabIndex={8}
                >
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
                      tabIndex={9 + index}
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

  // Reading Expedition Game Screen - COLORES MINIMALISTAS
  if (gameState.currentGame === "reading") {
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
                  onClick={resetGame}
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
                  <span
                    className={`font-semibold ${themeClasses.text}`}
                    tabIndex={2}
                  >
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
                    tabIndex={3}
                  >
                    <Sun className="w-4 h-4" />
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
                    tabIndex={4}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={`p-2 ${
                      theme === "dark" ? `${themeClasses.cardBg} shadow-sm` : ""
                    } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                    aria-label="Dark theme"
                    tabIndex={5}
                  >
                    <Moon className="w-4 h-4" />
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
                  <div className={`text-sm ${themeClasses.textSecondary}`}>
                    Question {gameState.currentQuestion + 1} of{" "}
                    {gameState.totalQuestions}
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
                <CardTitle
                  className={`text-xl font-bold ${themeClasses.text}`}
                  tabIndex={6}
                >
                  {readingPassage.title}
                </CardTitle>
                <CardDescription
                  className={themeClasses.textSecondary}
                  tabIndex={7}
                >
                  Academic Text - Advanced Level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {readingPassage.text.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className={`mb-4 text-sm leading-relaxed ${themeClasses.text}`}
                      tabIndex={8 + index}
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
                <CardTitle
                  className={`text-lg font-bold ${themeClasses.text}`}
                  tabIndex={11}
                >
                  Comprehension Question
                </CardTitle>
                <Progress
                  value={
                    ((gameState.currentQuestion + 1) /
                      gameState.totalQuestions) *
                    100
                  }
                  className="w-full h-2"
                />
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-4`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${themeClasses.text}`}
                    tabIndex={12}
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
                        tabIndex={13 + index}
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

                {!showFeedback && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      className={`${themeClasses.border} ${themeClasses.textSecondary} hover:bg-gray-50 dark:hover:bg-gray-800`}
                      onClick={() => {
                        const passage = document.querySelector(".prose");
                        if (passage) {
                          passage.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      tabIndex={17}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Re-read Passage
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Writing Workshop Game Screen - COLORES MINIMALISTAS
  if (gameState.currentGame === "writing") {
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
                  onClick={resetGame}
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
                  <span
                    className={`font-semibold ${themeClasses.text}`}
                    tabIndex={2}
                  >
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
                    tabIndex={3}
                  >
                    <Sun className="w-4 h-4" />
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
                    tabIndex={4}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={`p-2 ${
                      theme === "dark" ? `${themeClasses.cardBg} shadow-sm` : ""
                    } ${themeClasses.text} hover:${themeClasses.cardBg}`}
                    aria-label="Dark theme"
                    tabIndex={5}
                  >
                    <Moon className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-6">
                  <div
                    className={`flex items-center space-x-2 ${themeClasses.cardBg} px-3 py-1 rounded-full`}
                  >
                    <Timer
                      className={`w-4 h-4 ${themeClasses.textSecondary}`}
                    />
                    <span className={`font-bold ${themeClasses.text}`}>
                      {Math.floor(gameState.timeLeft / 60)}:
                      {(gameState.timeLeft % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>
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
                    tabIndex={6}
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
                <CardTitle
                  className={`text-lg font-bold ${themeClasses.text}`}
                  tabIndex={7}
                >
                  Essay Prompt
                </CardTitle>
                <Badge className="bg-gray-700 text-white w-fit">
                  Academic Essay
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-4`}
                >
                  <h3
                    className={`font-semibold mb-3 ${themeClasses.text}`}
                    tabIndex={8}
                  >
                    Topic:
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${themeClasses.text}`}
                    tabIndex={9}
                  >
                    "The integration of artificial intelligence in higher
                    education presents both opportunities and challenges.
                    Discuss the potential benefits and drawbacks of AI
                    implementation in universities, providing specific examples
                    and evidence to support your arguments."
                  </p>
                </div>

                <div className="space-y-3">
                  <h4
                    className={`font-semibold ${themeClasses.text}`}
                    tabIndex={10}
                  >
                    Requirements:
                  </h4>
                  <ul
                    className={`text-sm space-y-1 ${themeClasses.textSecondary}`}
                    tabIndex={11}
                  >
                    <li>• Minimum 300 words</li>
                    <li>• Clear thesis statement</li>
                    <li>• Academic vocabulary</li>
                    <li>• Balanced argumentation</li>
                    <li>• Proper conclusion</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4
                    className={`font-semibold ${themeClasses.text}`}
                    tabIndex={12}
                  >
                    Suggested Structure:
                  </h4>
                  <ul
                    className={`text-sm space-y-1 ${themeClasses.textSecondary}`}
                    tabIndex={13}
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
                    <CardTitle
                      className={`text-lg font-bold ${themeClasses.text}`}
                      tabIndex={14}
                    >
                      Your Essay
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={themeClasses.button}
                        tabIndex={15}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={themeClasses.button}
                        tabIndex={16}
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
                    tabIndex={17}
                  />

                  <div className="mt-4 flex items-center justify-between">
                    <div
                      className={`flex items-center space-x-4 text-sm ${themeClasses.textSecondary}`}
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
                        writingText.split(" ").filter((w) => w.length > 0)
                          .length < 50
                      }
                      onClick={() => {
                        // Submit essay functionality
                        setGameState((prev) => ({
                          ...prev,
                          score: prev.score + 500,
                        }));
                        if (user) {
                          setUser((prev) =>
                            prev ? { ...prev, xp: prev.xp + 500 } : null
                          );
                        }
                        endGame();
                      }}
                      tabIndex={18}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Essay
                    </Button>
                  </div>

                  {/* Real-time feedback */}
                  <div
                    className={`mt-4 p-3 ${themeClasses.cardBg} ${themeClasses.border} rounded-lg`}
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

  // Main Dashboard - MANTENER COLORES ORIGINALES CON THEME SWITCHER
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
                tabIndex={1}
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
                  tabIndex={2}
                >
                  <Sun className="w-4 h-4" />
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
                  <Monitor className="w-4 h-4" />
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
                  <Moon className="w-4 h-4" />
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
                <span tabIndex={5}>Welcome, {user?.name}</span>
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
                  tabIndex={6}
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
                  tabIndex={7}
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
                tabIndex={8}
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
              <CardTitle
                className={`flex items-center space-x-2 ${
                  theme === "dark"
                    ? "text-gray-100"
                    : theme === "neutral"
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help & Accessibility</span>
              </CardTitle>
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
              <Button onClick={() => setShowHelp(false)} className="w-full">
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
            tabIndex={9}
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
            tabIndex={10}
          >
            Master university-level English through interactive games
          </p>
        </div>

        {/* Game Selection Grid */}
        <div
          id="game-selection"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
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
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-purple-300"
                    : theme === "neutral"
                    ? "text-purple-900"
                    : "text-purple-900"
                }`}
                tabIndex={11}
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
                tabIndex={12}
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
                tabIndex={13}
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-blue-300"
                    : theme === "neutral"
                    ? "text-blue-900"
                    : "text-blue-900"
                }`}
                tabIndex={14}
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
                tabIndex={15}
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
                tabIndex={16}
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
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-green-300"
                    : theme === "neutral"
                    ? "text-green-900"
                    : "text-green-900"
                }`}
                tabIndex={17}
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
                tabIndex={18}
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
                tabIndex={19}
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
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-indigo-300"
                    : theme === "neutral"
                    ? "text-indigo-900"
                    : "text-indigo-900"
                }`}
                tabIndex={20}
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
                tabIndex={21}
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
                tabIndex={22}
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
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className={`text-xl font-bold ${
                  theme === "dark"
                    ? "text-teal-300"
                    : theme === "neutral"
                    ? "text-teal-900"
                    : "text-teal-900"
                }`}
                tabIndex={23}
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
                tabIndex={24}
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
                tabIndex={25}
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
              tabIndex={26}
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
                tabIndex={27}
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
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3
                className="font-semibold text-lg"
                tabIndex={28}
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
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3
                className="font-semibold text-lg"
                tabIndex={29}
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
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3
                className="font-semibold text-lg"
                tabIndex={30}
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
                tabIndex={31}
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
                tabIndex={32}
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
