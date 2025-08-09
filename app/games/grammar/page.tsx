"use client";

import GrammarQuest from '@/components/screens/GrammarQuest';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GrammarPage() {
  const { 
    user, 
    isAuthenticated, 
    theme, 
    setTheme,
    gameState,
    setGameState,
    selectedAnswer,
    showFeedback,
    grammarQuestions,
    resetGame,
    pauseGame,
    handleAnswerSelect,
    updateXP
  } = useApp();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const themeClasses = {
    light: {
      bg: "bg-white",
      cardBg: "bg-white",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      border: "border-gray-200",
      button: "bg-white hover:bg-gray-50 text-gray-900",
      accent: "text-blue-600",
    },
    dark: {
      bg: "bg-gray-900",
      cardBg: "bg-gray-800",
      text: "text-gray-100",
      textSecondary: "text-gray-300",
      border: "border-gray-700",
      button: "bg-gray-700 hover:bg-gray-600 text-gray-100",
      accent: "text-blue-400",
    },
    neutral: {
      bg: "bg-gray-100",
      cardBg: "bg-gray-50",
      text: "text-gray-800",
      textSecondary: "text-gray-600",
      border: "border-gray-300",
      button: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      accent: "text-blue-700",
    },
  };

  const endGame = () => {
    router.push('/dashboard');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Grammar Quest...</p>
        </div>
      </div>
    );
  }

  return (
    <GrammarQuest
      gameState={gameState}
      grammarQuestions={grammarQuestions}
      selectedAnswer={selectedAnswer}
      showFeedback={showFeedback}
      theme={theme}
      themeClasses={themeClasses[theme]}
      resetGame={resetGame}
      setTheme={setTheme}
      handleAnswerSelect={handleAnswerSelect}
    />
  );
}
