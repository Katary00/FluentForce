"use client";

import WelcomeScreen from '@/components/screens/WelcomeScreen';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const { theme, setTheme, isAuthenticated } = useApp();
  const router = useRouter();

  const handleContinue = () => {
    // If already authenticated, go to dashboard; otherwise go to login
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

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

  return (
    <WelcomeScreen
      theme={theme}
      themeClasses={themeClasses[theme]}
      setShowWelcome={() => handleContinue()}
      setIsLogin={() => {}}
      setTheme={setTheme}
    />
  );
}
