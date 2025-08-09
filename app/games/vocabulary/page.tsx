"use client";

import VocabularyGame from '@/components/screens/VocabularyGame';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VocabularyPage() {
  const { 
    user, 
    isAuthenticated, 
    theme, 
    setTheme,
    gameState,
    selectedAnswer,
    showFeedback,
    vocabularyQuestions,
    goToGameDashboard,
    pauseGame,
    handleAnswerSelect,
    startGame
  } = useApp();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Auto-start vocabulary game if not already playing, but redirect to dashboard if game was ended
  useEffect(() => {
    if (isAuthenticated) {
      if (gameState.currentGame === null && !gameState.isPlaying) {
        // Game was ended, redirect to dashboard
        router.push('/dashboard');
      } else if (gameState.currentGame !== 'vocabulary' && !gameState.isPlaying) {
        startGame('vocabulary');
      }
    }
  }, [isAuthenticated, gameState.currentGame, gameState.isPlaying, startGame, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Vocabulary Game...</p>
        </div>
      </div>
    );
  }

  return (
    <VocabularyGame
      theme={theme}
      user={user}
      gameState={gameState}
      selectedAnswer={selectedAnswer}
      showFeedback={showFeedback}
      vocabularyQuestions={vocabularyQuestions}
      onSetTheme={setTheme}
      onGoToGameDashboard={goToGameDashboard}
      onPauseGame={pauseGame}
      onHandleAnswerSelect={handleAnswerSelect}
    />
  );
}
