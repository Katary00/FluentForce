"use client";

import ListeningLab from '@/components/screens/ListeningLab';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ListeningPage() {
  const { 
    user, 
    isAuthenticated, 
    theme, 
    setTheme,
    gameState,
    selectedAnswer,
    showFeedback,
    listeningQuestions,
    resetGame,
    pauseGame,
    handleAnswerSelect
  } = useApp();
  const router = useRouter();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Listening Lab...</p>
        </div>
      </div>
    );
  }

  return (
    <ListeningLab
      theme={theme}
      user={user}
      gameState={gameState}
      selectedAnswer={selectedAnswer}
      showFeedback={showFeedback}
      listeningQuestions={listeningQuestions}
      isAudioPlaying={isAudioPlaying}
      onSetTheme={setTheme}
      onResetGame={resetGame}
      onPauseGame={pauseGame}
      onHandleAnswerSelect={handleAnswerSelect}
      onSetIsAudioPlaying={setIsAudioPlaying}
    />
  );
}
