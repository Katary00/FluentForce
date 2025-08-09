"use client";

import ReadingExpedition from '@/components/screens/ReadingExpedition';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ReadingPage() {
  const { 
    user, 
    isAuthenticated, 
    theme, 
    setTheme,
    gameState,
    setGameState,
    selectedAnswer,
    showFeedback,
    readingPassage,
    goToGameDashboard,
    pauseGame,
    handleAnswerSelect,
    updateXP,
    startGame
  } = useApp();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Auto-start reading game if not already playing, but redirect to dashboard if game was ended
  useEffect(() => {
    if (isAuthenticated) {
      if (gameState.currentGame === null && !gameState.isPlaying) {
        // Game was ended, redirect to dashboard
        router.push('/dashboard');
      } else if (gameState.currentGame !== 'reading' && !gameState.isPlaying) {
        startGame('reading');
      }
    }
  }, [isAuthenticated, gameState.currentGame, gameState.isPlaying, startGame, router]);

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
          <p className="mt-4 text-lg text-gray-600">Loading Reading Expedition...</p>
        </div>
      </div>
    );
  }

  return (
    <ReadingExpedition
      gameState={gameState}
      readingPassage={readingPassage}
      selectedAnswer={selectedAnswer}
      showFeedback={showFeedback}
      theme={theme}
      themeClasses={themeClasses[theme]}
      goToGameDashboard={goToGameDashboard}
      setTheme={setTheme}
      handleAnswerSelect={handleAnswerSelect}
    />
  );
}
