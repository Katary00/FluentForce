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
  goToGameDashboard: () => void;
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

  // Timer Effect - Countdown durante el juego (excepto listening)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (gameState.isPlaying && !gameState.isPaused && gameState.timeLeft > 0 && gameState.currentGame !== 'listening') {
      interval = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            // Tiempo agotado - Game Over, ir al GameDashboard
            return {
              ...prev,
              timeLeft: 0,
              isPlaying: false,
              currentGame: null,
              score: 0,
              lives: 3,
              streak: 0,
              currentQuestion: 0,
            };
          }
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.timeLeft]);

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
      word: "Interdisciplinary",
      definition: "Relating to more than one branch of knowledge",
      options: [
        "Focused on a single subject",
        "Relating to more than one branch of knowledge",
        "Involving only theoretical concepts",
        "Limited to practical applications"
      ],
      correct: 1,
      difficulty: "advanced",
      context: "The interdisciplinary approach combined psychology and neuroscience."
    },
    {
      word: "Cognitive",
      definition: "Related to the mental processes of perception, memory, judgment, and reasoning",
      options: [
        "Related to physical movement",
        "Related to emotional responses",
        "Related to the mental processes of perception, memory, judgment, and reasoning",
        "Related to social interactions"
      ],
      correct: 2,
      difficulty: "intermediate",
      context: "Cognitive psychology studies how people process information."
    },
    {
      word: "Sustainable",
      definition: "Able to be maintained at a certain rate or level without depleting natural resources",
      options: [
        "Temporary and short-term",
        "Able to be maintained at a certain rate or level without depleting natural resources",
        "Requiring constant external support",
        "Focused only on economic growth"
      ],
      correct: 1,
      difficulty: "intermediate",
      context: "Sustainable development balances economic growth with environmental protection."
    },
    {
      word: "Phenomenon",
      definition: "A fact or situation that is observed to exist or happen",
      options: [
        "A theoretical concept only",
        "A fact or situation that is observed to exist or happen",
        "A research methodology",
        "A statistical measurement"
      ],
      correct: 1,
      difficulty: "intermediate",
      context: "Climate change is a global phenomenon affecting all continents."
    },
    {
      word: "Contemporary",
      definition: "Belonging to or occurring in the present time",
      options: [
        "From ancient times",
        "Belonging to or occurring in the present time",
        "Related to the future",
        "From the medieval period"
      ],
      correct: 1,
      difficulty: "intermediate",
      context: "Contemporary literature reflects modern social issues."
    },
    {
      word: "Infrastructure",
      definition: "The basic physical and organizational structures needed for operation of a society",
      options: [
        "The basic physical and organizational structures needed for operation of a society",
        "Only digital and technological systems",
        "Cultural and artistic elements",
        "Educational curricula and programs"
      ],
      correct: 0,
      difficulty: "intermediate",
      context: "Digital infrastructure is crucial for modern economic development."
    },
    {
      word: "Biodiversity",
      definition: "The variety of plant and animal life in the world or in a particular habitat",
      options: [
        "The study of single species",
        "Only marine life forms",
        "The variety of plant and animal life in the world or in a particular habitat",
        "Extinct species documentation"
      ],
      correct: 2,
      difficulty: "intermediate",
      context: "The Amazon rainforest contains incredible biodiversity."
    },
    {
      word: "Demographic",
      definition: "Relating to the structure of populations",
      options: [
        "Related to geographic features",
        "Relating to the structure of populations",
        "Concerning economic policies",
        "About technological advancement"
      ],
      correct: 1,
      difficulty: "intermediate",
      context: "Demographic changes affect social security systems."
    },
    {
      word: "Globalization",
      definition: "The process by which businesses or other organizations develop international influence",
      options: [
        "Local community development",
        "National policy implementation",
        "The process by which businesses or other organizations develop international influence",
        "Regional trade agreements only"
      ],
      correct: 2,
      difficulty: "advanced",
      context: "Globalization has transformed international trade and communication."
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
      transcript: "In the academic world, research is the foundation on which knowledge is built. For any research to be valid and reliable, it must follow a set of guiding principles. These are known as the principles of research methodology. They outline how to plan, design, conduct, and evaluate a study. The process begins by clearly defining the research problem or question, ensuring it is specific, relevant, and achievable. Next comes selecting an appropriate design — whether qualitative, quantitative, or mixed methods — depending on the study's goals. Another vital principle is the systematic and ethical collection of data, protecting participants' rights and avoiding bias. Once data are collected, results must be interpreted accurately, based on evidence, and with careful acknowledgment of any limitations. Transparency is also essential: the entire research process should be documented in a way that allows others to replicate or verify it. Ultimately, understanding and applying these principles not only improves the quality of a project but also strengthens its credibility within the academic community."
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
      transcript: "Peer review is a critical process in academic publishing because it ensures that published research meets high standards of quality and rigor. Before an article is accepted for publication, it is evaluated by experts in the same field, known as peers. These reviewers assess the clarity of the research question, the appropriateness of the methodology, the accuracy of the data analysis, and the validity of the conclusions. By having independent experts carefully examine the work, potential errors, weaknesses, or biases can be identified and addressed before the study reaches the public. This process helps maintain the integrity of the academic record, ensuring that findings are trustworthy and reproducible. Peer review also provides constructive feedback to authors, allowing them to refine their arguments, improve their presentation, and strengthen their evidence. While it may take time, the ultimate goal is not speed or cost savings, but rather the protection of scientific credibility. In short, peer review is essential because it acts as a filter that upholds the standards of scholarship, giving readers confidence that the information they are consuming has been thoroughly evaluated by qualified professionals."
    },
    {
      id: "3",
      audioText: "Academic Writing Structure",
      question: "What is the primary purpose of a thesis statement in academic writing?",
      options: [
        "To summarize the conclusion",
        "To present the main argument",
        "To introduce the topic",
        "To list all references"
      ],
      correct: 1,
      transcript: "In academic writing, the thesis statement is one of the most important elements of an essay or research paper. It serves as the central claim or main argument that the entire work will support. Rather than simply stating a topic, the thesis makes a specific point or position that the author will defend through evidence, reasoning, and analysis. Typically, the thesis statement appears near the end of the introduction, giving readers a clear sense of direction. It tells them exactly what to expect in the rest of the paper, acting as a roadmap for both the writer and the audience. A strong thesis is concise, focused, and arguable — meaning it can be supported but also challenged. For example, instead of saying 'Social media is popular among teenagers,' a thesis might be 'Social media use among teenagers has significant effects on mental health, requiring greater awareness and regulation.' This expresses a clear argument that can be explored and proven. By presenting the main argument upfront, the thesis statement helps maintain clarity and focus throughout the writing process, ensuring that every paragraph works toward supporting that central idea."
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
    // Set totalQuestions based on game type
    const totalQuestions = gameType === 'listening' ? 3 : 10;
    
    setGameState(prev => ({
      ...prev,
      currentGame: gameType,
      isPlaying: true,
      isPaused: false,
      currentQuestion: 0,
      score: 0,
      lives: 3,
      timeLeft: 30,
      totalQuestions: totalQuestions
    }));
  };

  const resetGame = () => {
    const totalQuestions = gameState.currentGame === 'listening' ? 3 : 10;
    
    setGameState(prev => ({
      ...prev,
      score: 0,
      lives: 3,
      streak: 0,
      timeLeft: 30,
      currentQuestion: 0,
      totalQuestions: totalQuestions,
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

  const goToGameDashboard = () => {
    setGameState(prev => ({
      ...prev,
      currentGame: null,
      isPlaying: false,
      isPaused: false,
      score: 0,
      lives: 3,
      streak: 0,
      timeLeft: 30,
      currentQuestion: 0,
    }));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    // Obtener la pregunta actual según el juego
    let currentQuestion: any = null;
    let correctAnswer: number = -1;

    if (gameState.currentGame === 'vocabulary') {
      currentQuestion = vocabularyQuestions[gameState.currentQuestion];
      correctAnswer = currentQuestion?.correct || 0;
    } else if (gameState.currentGame === 'listening') {
      currentQuestion = listeningQuestions[gameState.currentQuestion];
      correctAnswer = currentQuestion?.correct || 0;
    } else if (gameState.currentGame === 'grammar') {
      currentQuestion = grammarQuestions[gameState.currentQuestion];
      correctAnswer = currentQuestion?.correct || 0;
    }

    // Verificar si la respuesta es correcta
    const isCorrect = answerIndex === correctAnswer;
    
    // Capturar valores actuales antes del setTimeout
    const currentLives = gameState.lives;
    const currentQuestionIndex = gameState.currentQuestion;
    const totalQuestions = gameState.totalQuestions;
    
    if (isCorrect) {
      // Incrementar puntuación y racha
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        streak: prev.streak + 1
      }));
      
      // Actualizar XP del usuario
      updateXP(10);
    } else {
      // Respuesta incorrecta: reducir vidas y reiniciar racha
      setGameState(prev => ({
        ...prev,
        lives: Math.max(0, prev.lives - 1),
        streak: 0
      }));
    }

    // Después de 2 segundos, avanzar a la siguiente pregunta o terminar el juego
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      // Verificar si quedan vidas (usar valor capturado y restar 1 si fue incorrecta)
      const livesAfterAnswer = isCorrect ? currentLives : currentLives - 1;
      
      if (livesAfterAnswer <= 0) {
        // Game Over - sin vidas, ir al GameDashboard
        setGameState(prev => ({
          ...prev,
          isPlaying: false,
          currentGame: null,
          score: 0,
          lives: 3,
          streak: 0,
          timeLeft: 30,
          currentQuestion: 0,
        }));
        return;
      }

      // Verificar si es la última pregunta (usar valor capturado)
      if (currentQuestionIndex >= totalQuestions - 1) {
        // Juego completado, ir al GameDashboard
        setGameState(prev => ({
          ...prev,
          isPlaying: false,
          currentGame: null,
          score: 0,
          lives: 3,
          streak: 0,
          timeLeft: 30,
          currentQuestion: 0,
        }));
        return;
      }

      // Avanzar a la siguiente pregunta
      setGameState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }, 2000);
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
    goToGameDashboard,
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
