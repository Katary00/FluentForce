"use client";

import LoginScreen from '@/components/screens/LoginScreen';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { 
    theme, 
    isLogin, 
    setIsLogin, 
    handleLogin, 
    handleRegister 
  } = useApp();
  const router = useRouter();

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

  const wrappedHandleLogin = (email: string, password: string) => {
    handleLogin(email, password);
    router.push('/dashboard');
  };

  const wrappedHandleRegister = (name: string, email: string, password: string) => {
    handleRegister(name, email, password);
    router.push('/dashboard');
  };

  return (
    <LoginScreen
      isLogin={isLogin}
      theme={theme}
      themeClasses={themeClasses[theme]}
      setIsLogin={setIsLogin}
      setShowWelcome={() => router.push('/welcome')}
      handleLogin={wrappedHandleLogin}
      handleRegister={wrappedHandleRegister}
    />
  );
}
