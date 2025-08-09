"use client";

import GameDashboard from '@/components/screens/GameDashboard';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { 
    user, 
    isAuthenticated, 
    theme, 
    setTheme, 
    startGame, 
    handleLogout 
  } = useApp();
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const wrappedStartGame = (gameType: string) => {
    startGame(gameType);
    router.push(`/games/${gameType}`);
  };

  const wrappedHandleLogout = () => {
    handleLogout();
    router.push('/welcome');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <GameDashboard
      user={user}
      theme={theme}
      setTheme={setTheme}
      startGame={wrappedStartGame}
      handleLogout={wrappedHandleLogout}
      showHelp={showHelp}
      setShowHelp={setShowHelp}
    />
  );
}
