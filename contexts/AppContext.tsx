"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  completedGames: string[];
  streak: number;
  achievements: string[];
  courses: string[];
}

export interface GameState {
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

export interface VocabularyQuestion {
  word: string;
  definition: string;
  options: string[];
  correct: number;
  context: string;
  difficulty: "intermediate" | "advanced" | "proficient";
}

export interface ListeningQuestion {
  id: string;
  audioText: string;
  question: string;
  options: string[];
  correct: number;
  transcript: string;
}

export interface GrammarQuestion {
  id: number;
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  rule: string;
}

export interface ReadingPassage {
  title: string;
  text: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

export type Theme = "light" | "dark" | "neutral";

// Context interface
interface AppContextType {
  // Authentication
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  // Game State
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  
  // Game Data
  vocabularyQuestions: VocabularyQuestion[];
  listeningQuestions: ListeningQuestion[];
  grammarQuestions: GrammarQuestion[];
  readingPassage: ReadingPassage;
  
  // Game Controls
  selectedAnswer: number | null;
  setSelectedAnswer: (answer: number | null) => void;
  showFeedback: boolean;
  setShowFeedback: (show: boolean) => void;
  writingText: string;
  setWritingText: (text: string) => void;
  
  // Auth Functions
  handleLogin: (email: string, password: string) => void;
  handleRegister: (name: string, email: string, password: string) => void;
  handleLogout: () => void;
  
  // Game Functions
  startGame: (gameType: string) => void;
  resetGame: () => void;
  pauseGame: () => void;
  endGame: () => void;
  handleAnswerSelect: (answerIndex: number) => void;
  updateXP: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  // Theme State
  const [theme, setTheme] = useState<Theme>("light");
  
  // Game State
  const [gameState, setGameState] = useState<GameState>({
    currentGame: null,
    score: 0,
    lives: 3,
    streak: 0,
    timeLeft: 30,
    currentQuestion: 0,
    totalQuestions: 10,
    isPlaying: false,
    isPaused: false,
  });
  
  // Game Controls
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [writingText, setWritingText] = useState("");

  // Game Data
  const vocabularyQuestions: VocabularyQuestion[] = [
    {
      word: "Methodology",
      definition: "A system of methods used in a particular area of study or activity",
      options: [
        "A system of methods used in a particular area of study or activity",
        "A type of scientific equipment",
        "A mathematical formula",
        "A research conclusion"
      ],
      correct: 0,
      difficulty: "intermediate",
      context: "The researcher explained her methodology before presenting the results."
    },
    {
      word: "Hypothesis",
      definition: "A proposed explanation made on the basis of limited evidence",
      options: [
        "A proven scientific fact",
        "A proposed explanation made on the basis of limited evidence",
        "A type of laboratory equipment",
        "A statistical measurement"
      ],
      correct: 1,
      difficulty: "intermediate",
      context: "The scientists tested their hypothesis through controlled experiments."
    }
  ];

  const listeningQuestions: ListeningQuestion[] = [
    {
      id: "1",
      audioText: "Academic Methodology Lecture",
      question: "What is the main focus of today's lecture?",
      options: [
        "Research methodology principles",
        "Statistical analysis techniques", 
        "Data collection methods",
        "Laboratory procedures"
      ],
      correct: 0,
      transcript: "In today's lecture, we will explore the fundamental principles of academic research methodology..."
    },
    {
      id: "2",
      audioText: "Peer Review Process",
      question: "Why is peer review important in academic publishing?",
      options: [
        "It speeds up publication",
        "It ensures quality and rigor",
        "It reduces costs",
        "It increases readership"
      ],
      correct: 1,
      transcript: "The importance of peer review in academic publishing cannot be overstated..."
    }
  ];

  const grammarQuestions: GrammarQuestion[] = [
    {
      id: 1,
      sentence: "The research _____ conducted over a period of five years yielded significant results.",
      options: ["that was", "which was", "what was", "who was"],
      correct: 0,
      explanation: "Use 'that was' for restrictive relative clauses with past passive voice.",
      rule: "Restrictive Relative Clauses with Passive Voice",
    },
    {
      id: 2,
      sentence: "_____ the complexity of the data, the analysis required sophisticated software.",
      options: ["Despite", "Given", "Although", "Because"],
      correct: 1,
      explanation: "'Given' is used to introduce a reason or cause, meaning 'considering' or 'taking into account'.",
      rule: "Causal Connectors",
    }
  ];

  const readingPassage: ReadingPassage = {
    title: "The Impact of Artificial Intelligence on Higher Education",
    text: `Artificial Intelligence (AI) is revolutionizing higher education in unprecedented ways. Universities worldwide are integrating AI technologies to enhance learning experiences, streamline administrative processes, and support research endeavors. From personalized learning platforms that adapt to individual student needs to sophisticated research tools that can analyze vast datasets, AI is reshaping the academic landscape.

The implementation of AI in education presents both opportunities and challenges. On one hand, AI-powered systems can provide immediate feedback to students, identify learning gaps, and suggest personalized study paths. These systems can also assist educators in creating more effective curricula and assessment methods. On the other hand, concerns about data privacy, the digital divide, and the potential replacement of human interaction in education remain significant considerations.

Research indicates that students who engage with AI-enhanced learning platforms show improved academic performance and higher engagement levels. However, the effectiveness of these technologies largely depends on their thoughtful integration into existing pedagogical frameworks rather than their mere adoption.`,
    questions: [
      {
        question: "According to the passage, what is the main impact of AI on higher education?",
        options: [
          "It completely replaces traditional teaching methods",
          "It revolutionizes education in unprecedented ways",
          "It only affects administrative processes",
          "It primarily benefits research activities"
        ],
        correct: 1
      },
      {
        question: "What does the passage suggest about the effectiveness of AI in education?",
        options: [
          "It automatically improves all educational outcomes",
          "It depends on thoughtful integration into pedagogical frameworks",
          "It only works for certain types of students",
          "It requires complete replacement of existing systems"
        ],
        correct: 1
      }
    ]
  };

  // Load saved state from localStorage
  useEffect(() => {
    // Use setTimeout to defer localStorage operations
    const loadSavedState = () => {
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem("fluentforce-user");
        const savedAuth = localStorage.getItem("fluentforce-authenticated");
        const savedTheme = localStorage.getItem("fluentforce-theme");

        if (savedUser && savedAuth === "true") {
          try {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Error parsing saved user data:", error);
          }
        }

        if (savedTheme) {
          setTheme(savedTheme as Theme);
        }
      }
    };

    // Defer loading to avoid blocking initial render
    setTimeout(loadSavedState, 0);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user && isAuthenticated) {
        localStorage.setItem("fluentforce-user", JSON.stringify(user));
        localStorage.setItem("fluentforce-authenticated", "true");
      } else {
        localStorage.removeItem("fluentforce-user");
        localStorage.removeItem("fluentforce-authenticated");
      }
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("fluentforce-theme", theme);
      document.documentElement.classList.remove("light", "dark", "neutral");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  // Authentication functions
  const handleLogin = (email: string, password: string) => {
    const mockUser: User = {
      id: "1",
      name: "Alex Johnson",
      email: email,
      level: 8,
      xp: 2450,
      completedGames: ["vocabulary"],
      streak: 5,
      achievements: ["First Steps", "Vocabulary Master"],
      courses: ["Academic Writing", "IELTS Preparation"],
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: "2",
      name: name,
      email: email,
      level: 1,
      xp: 0,
      completedGames: [],
      streak: 0,
      achievements: [],
      courses: [],
    };
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
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
      timeLeft: 30,
      currentQuestion: 0,
      totalQuestions: 10,
      isPlaying: false,
      isPaused: false,
    });
  };

  // Game functions
  const startGame = (gameType: string) => {
    setGameState(prev => ({
      ...prev,
      currentGame: gameType,
      isPlaying: true,
      isPaused: false,
      currentQuestion: 0,
      score: 0,
      lives: 3,
      timeLeft: 30
    }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      score: 0,
      lives: 3,
      streak: 0,
      timeLeft: 30,
      currentQuestion: 0,
      isPlaying: false,
      isPaused: false,
    }));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const pauseGame = () => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      currentGame: null
    }));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
  };

  const updateXP = (points: number) => {
    setUser((prev: User | null) => (prev ? { ...prev, xp: prev.xp + points } : null));
  };

  const value: AppContextType = {
    // Authentication
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLogin,
    setIsLogin,
    
    // Theme
    theme,
    setTheme,
    
    // Game State
    gameState,
    setGameState,
    
    // Game Data
    vocabularyQuestions,
    listeningQuestions,
    grammarQuestions,
    readingPassage,
    
    // Game Controls
    selectedAnswer,
    setSelectedAnswer,
    showFeedback,
    setShowFeedback,
    writingText,
    setWritingText,
    
    // Functions
    handleLogin,
    handleRegister,
    handleLogout,
    startGame,
    resetGame,
    pauseGame,
    endGame,
    handleAnswerSelect,
    updateXP,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
