"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Theme } from "@/contexts/AppContext";
import {
  Crown,
  PlayCircle,
  Gamepad2,
  TrendingUp,
  LogIn,
  UserPlus,
  ArrowRight,
  Users,
  Brain,
  Trophy,
  Zap,
  Sparkles,
  Target,
  BookOpen,
  PenTool,
  Headphones,
  Award,
  Globe,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeOff,
  Subtitles,
  Maximize,
  Minimize,
  HelpCircle,
  Settings,
  Sun,
  Moon,
  Monitor,
  X
} from "lucide-react";

// Video state interface
interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  showSubtitles: boolean;
  isFullscreen: boolean;
}

// Theme classes interface
interface ThemeClasses {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
}

// Welcome Screen props interface
interface WelcomeScreenProps {
  theme: Theme;
  themeClasses: ThemeClasses;
  setShowWelcome: (show: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
  setTheme?: (theme: Theme) => void;
}

export default function WelcomeScreen({ 
  theme, 
  themeClasses, 
  setShowWelcome, 
  setIsLogin,
  setTheme: externalSetTheme 
}: WelcomeScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  // Función para cambiar tema
  const setTheme = (newTheme: string) => {
    if (externalSetTheme) {
      externalSetTheme(newTheme as Theme);
    } else {
      console.log('Theme change requested:', newTheme);
    }
  };
  
  // Video state management
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    showSubtitles: false,
    isFullscreen: false,
  });

  // Video control functions
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoState.isMuted;
      setVideoState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVideoState(prev => ({ ...prev, volume: newVolume }));
    }
  };

  const toggleSubtitles = () => {
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = videoState.showSubtitles ? 'hidden' : 'showing';
      }
      setVideoState(prev => ({ ...prev, showSubtitles: !prev.showSubtitles }));
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!videoState.isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setVideoState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
    }
  };

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
      role="banner"
      aria-label="Main site header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button
                className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="FluentForce logo - Ir al inicio"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Gamepad2 className="w-7 h-7 text-white" aria-hidden="true" />
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"
                  aria-hidden="true"
                ></div>
              </button>
            </div>
            <div className="flex flex-col">
              <button
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                aria-label="FluentForce - Plataforma de Inglés Académico"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                FluentForce
              </button>
              <p
                className={`text-xs ${themeClasses.textSecondary} font-medium tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded`}
                role="text"
                aria-label="Academic English Gaming Platform - Plataforma de juegos para inglés académico"
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
              role="status"
              aria-label="50K+ Active Students"
            >
              <Users
                className="w-4 h-4 text-green-600 dark:text-green-400"
                aria-hidden="true"
              />
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
                    ? "bg-white shadow-md text-yellow-700 dark:text-yellow-300 scale-105"
                    : "text-gray-600 hover:bg-white/50"
                }`}
                aria-label="Light theme"
              >
                <Sun className="w-4 h-4" aria-hidden="true" />
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
              >
                <Monitor className="w-4 h-4" aria-hidden="true" />
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
              >
                <Moon className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Enhanced Help Button */}
            <Button
              variant="ghost"
              onClick={() => setShowHelp(true)}
              className={`relative p-3 rounded-xl border-2 ${themeClasses.border} hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105`}
              aria-label="Help and accessibility options"
            >
              <HelpCircle
                className="w-5 h-5 text-blue-800 dark:text-blue-300"
                aria-hidden="true"
              />
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
      className={`sticky top-0 z-40 ${themeClasses.cardBg} ${themeClasses.border} border-b shadow-xl backdrop-blur-xl bg-opacity-95`}
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
              aria-label="Navigate to home section"
            >
              <Crown
                className="w-5 h-5 mr-2 text-blue-800 dark:text-blue-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
              aria-label="Navigate to demo video section"
            >
              <PlayCircle
                className="w-5 h-5 mr-2 text-purple-800 dark:text-purple-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
            >
              <Gamepad2
                className="w-5 h-5 mr-2 text-green-800 dark:text-green-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
            >
              <TrendingUp
                className="w-5 h-5 mr-2 text-orange-800 dark:text-orange-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
                <Settings className="w-5 h-5 text-blue-800 dark:text-blue-300" />
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
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
              <LogIn
                className="w-5 h-5 mr-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors"
                aria-hidden="true"
              />
              <span className="relative z-10 text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
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
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <UserPlus
                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <span className="relative z-10">Sign Up Free</span>
              <div
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg"
                aria-hidden="true"
              ></div>
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
              <Crown
                className="w-5 h-5 mx-auto mb-2 text-blue-800 dark:text-blue-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
              <PlayCircle
                className="w-5 h-5 mx-auto mb-2 text-purple-800 dark:text-purple-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
              <Gamepad2
                className="w-5 h-5 mx-auto mb-2 text-green-800 dark:text-green-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
              <TrendingUp
                className="w-5 h-5 mx-auto mb-2 text-orange-800 dark:text-orange-300 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
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
              <LogIn className="w-4 h-4 mr-2" aria-hidden="true" />
              Sign In
            </Button>
            <Button
              onClick={() => {
                setIsLogin(false);
                setShowWelcome(false);
              }}
              className={`flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <UserPlus className="w-4 h-4 mr-2" aria-hidden="true" />
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
        role="region"
        aria-labelledby="hero-heading"
      >
        <div className="mb-6">
          <div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4"
            role="banner"
            aria-label="#1 Academic English Gaming Platform"
          >
            <Crown
              className="w-5 h-5 text-purple-800 dark:text-purple-300"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">
              #1 Academic English Gaming Platform
            </span>
          </div>
        </div>

        <h1
          id="hero-heading"
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Master Academic English Through Gaming
        </h1>

        <p
          className={`text-xl md:text-2xl ${themeClasses.textSecondary} mb-6 max-w-4xl mx-auto leading-relaxed`}
          role="text"
        >
          🎓{" "}
          <span role="heading" aria-level={2} className="font-bold">
            Transform your university English skills
          </span>{" "}
          with the world's first gamified academic English platform. Join
          thousands of students who've already improved their IELTS, TOEFL, and
          university performance!
        </p>

        {/* Key Selling Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
          <div
            className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-purple-500`}
            role="region"
            aria-label="5 Interactive Games"
          >
            <div className="flex items-center justify-center mb-3">
              <div
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3"
                role="presentation"
              >
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                5 Interactive Games
              </span>
            </div>
            <p className={`text-sm ${themeClasses.textSecondary} text-center`}>
              <span className="text-purple-800 dark:text-purple-300 font-medium">
                Vocabulary
              </span>{" "}
              •{" "}
              <span className="text-blue-800 dark:text-blue-300 font-medium">
                Listening
              </span>{" "}
              •{" "}
              <span className="text-indigo-800 dark:text-indigo-300 font-medium">
                Grammar
              </span>{" "}
              •{" "}
              <span className="text-teal-800 dark:text-teal-300 font-medium">
                Reading
              </span>{" "}
              •{" "}
              <span className="text-green-800 dark:text-green-300 font-medium">
                Writing
              </span>
            </p>
          </div>

          <div
            className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-yellow-500`}
            role="region"
            aria-label="Real Progress"
          >
            <div className="flex items-center justify-center mb-3">
              <div
                className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3"
                role="presentation"
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Real Progress
              </span>
            </div>
            <p className={`text-sm ${themeClasses.textSecondary} text-center`}>
              <span className="text-yellow-800 dark:text-yellow-300 font-medium">
                XP System
              </span>{" "}
              •{" "}
              <span className="text-orange-800 dark:text-orange-300 font-medium">
                Levels
              </span>{" "}
              •{" "}
              <span className="text-red-700 dark:text-red-300 font-medium">
                Streaks
              </span>{" "}
              •{" "}
              <span className="text-green-800 dark:text-green-300 font-medium">
                Achievements
              </span>
            </p>
          </div>

          <div
            className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-blue-500`}
            role="region"
            aria-label="Instant Results"
          >
            <div className="flex items-center justify-center mb-3">
              <div
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3"
                role="presentation"
              >
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Instant Results
              </span>
            </div>
            <p className={`text-sm ${themeClasses.textSecondary} text-center`}>
              <span className="text-blue-800 dark:text-blue-300 font-medium">
                Immediate Feedback
              </span>{" "}
              •{" "}
              <span className="text-cyan-800 dark:text-cyan-300 font-medium">
                Adaptive Learning
              </span>{" "}
              •{" "}
              <span className="text-indigo-800 dark:text-indigo-300 font-medium">
                Smart Analytics
              </span>
            </p>
          </div>
        </div>

        {/* What Makes Us Unique */}
        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} rounded-2xl p-8 mb-8 max-w-5xl mx-auto shadow-2xl border-t-4 border-t-gradient-to-r from-purple-500 to-blue-500`}
          role="region"
          aria-label="What Makes Us Unique"
        >
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 px-4 py-2 rounded-full mb-4"
              role="banner"
            >
              <Sparkles
                className="w-5 h-5 text-purple-800 dark:text-purple-300"
                role="presentation"
              />
              <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                What Makes Us Unique
              </span>
            </div>
            <h2
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              id="fluentforce-advantage-heading"
            >
              🚀 The FluentForce Advantage
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary}`}>
              The only platform that combines academic rigor with gaming
              engagement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300`}
              role="region"
              aria-label="Academic Excellence"
            >
              <h3
                className="font-bold text-xl mb-4 flex items-center"
                id="academic-excellence-heading"
              >
                <div
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3"
                  role="presentation"
                >
                  <Brain className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Academic Excellence
                </span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    University-level vocabulary (IELTS 6.5-8.0)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    Academic writing skills for essays & research
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-indigo-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    Complex grammar structures for formal English
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    Listening comprehension for lectures & seminars
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300`}
              role="region"
              aria-label="Gaming Innovation"
            >
              <h3
                className="font-bold text-xl mb-4 flex items-center"
                id="gaming-innovation-heading"
              >
                <div
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3"
                  role="presentation"
                >
                  <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Gaming Innovation
                </span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-yellow-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    Competitive scoring system with streaks
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-orange-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    Progressive difficulty that adapts to you
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-red-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    Achievement badges & level progression
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 bg-teal-500 rounded-full"
                    aria-hidden="true"
                  ></div>
                  <span className={`text-sm ${themeClasses.text}`}>
                    Study habits that actually stick!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section
        id="social-proof-section"
        className="mb-16"
        role="region"
        aria-labelledby="social-proof-heading"
      >
        <h2 id="social-proof-heading" className="sr-only">
          Social Proof and Student Success
        </h2>
        {/* Social Proof */}
        <div
          className={`${themeClasses.cardBg} ${themeClasses.border} rounded-xl p-6 mb-8 shadow-lg border-t-4 border-t-gradient-to-r from-green-500 to-teal-500`}
          role="region"
          aria-label="Join 10,000+ students from top universities worldwide"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3"
                role="presentation"
              >
                <Users className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${themeClasses.text}`}
                  id="student-count-heading"
                >
                  Join{" "}
                  <span className="text-green-800 dark:text-green-300">
                    10,000+
                  </span>{" "}
                  students
                </h3>
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  from top universities worldwide
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              <div
                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/10 dark:hover:to-purple-800/10 transition-all duration-300"
                tabIndex={0}
                role="button"
                aria-label="Oxford University"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center"
                  role="presentation"
                >
                  <span className="text-white text-xs font-bold">O</span>
                </div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Oxford
                </span>
              </div>

              <div
                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/10 dark:hover:to-blue-800/10 transition-all duration-300"
                tabIndex={0}
                role="button"
                aria-label="Cambridge University"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
                  role="presentation"
                >
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Cambridge
                </span>
              </div>

              <div
                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/10 dark:hover:to-red-800/10 transition-all duration-300"
                tabIndex={0}
                role="button"
                aria-label="Harvard University"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center"
                  role="presentation"
                >
                  <span className="text-white text-xs font-bold">H</span>
                </div>
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  Harvard
                </span>
              </div>

              <div
                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/10 dark:hover:to-green-800/10 transition-all duration-300"
                tabIndex={0}
                role="button"
                aria-label="Stanford University"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center"
                  role="presentation"
                >
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Stanford
                </span>
              </div>

              <div
                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/10 dark:hover:to-indigo-800/10 transition-all duration-300"
                tabIndex={0}
                role="button"
                aria-label="MIT University"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center"
                  role="presentation"
                >
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  MIT
                </span>
              </div>
            </div>

            <div
              className="flex items-center justify-center mt-6 space-x-2"
              role="text"
              aria-label="And thousands more from 200+ universities"
            >
              <div className="flex -space-x-2">
                <div
                  className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-800"
                  role="presentation"
                ></div>
                <div
                  className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-800"
                  role="presentation"
                ></div>
                <div
                  className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800"
                  role="presentation"
                ></div>
                <div
                  className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center"
                  role="presentation"
                >
                  <span className="text-white text-xs font-bold">+</span>
                </div>
              </div>
              <span className={`text-sm ${themeClasses.textSecondary} ml-3`}>
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
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>Start Your Journey</span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
            >
              <div className="flex items-center space-x-3">
                <LogIn className="w-5 h-5" aria-hidden="true" />
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
        <h2 id="video-heading" className="text-3xl font-bold text-center mb-8">
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
                              ? (videoState.currentTime / videoState.duration) *
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
                    )} minutes ${Math.floor(videoState.duration % 60)} seconds`}
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
                    >
                      {videoState.isMuted ? (
                        <VolumeOff className="w-4 h-4" aria-hidden="true" />
                      ) : videoState.volume > 0.5 ? (
                        <Volume2 className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Volume1 className="w-4 h-4" aria-hidden="true" />
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
                      aria-label="Volume control slider"
                      aria-valuemin={0}
                      aria-valuemax={1}
                      aria-valuenow={videoState.volume}
                      aria-valuetext={`Volume ${Math.round(
                        videoState.volume * 100
                      )}%`}
                      className="w-16 accent-blue-500"
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
                  >
                    <Subtitles className="w-4 h-4" aria-hidden="true" />
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
                  >
                    {videoState.isFullscreen ? (
                      <Minimize className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Maximize className="w-4 h-4" aria-hidden="true" />
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
                >
                  Watch real students improve their academic English through our
                  revolutionary gaming approach. Discover the 5 core games that
                  have helped over 10,000 students achieve their academic goals.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 transition-all duration-300 cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label="Vocabulary game - Master Complex Terms"
                  >
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-2 shadow-lg"
                      role="presentation"
                    >
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
                  <div
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label="Listening game - Academic Lectures"
                  >
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg"
                      role="presentation"
                    >
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
                  <div
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/20 dark:hover:to-indigo-800/20 transition-all duration-300 cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label="Grammar game - Advanced Structures"
                  >
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-2 shadow-lg"
                      role="presentation"
                    >
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
                  <div
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-teal-100 dark:hover:from-teal-900/20 dark:hover:to-teal-800/20 transition-all duration-300 cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label="Reading game - Complex Texts"
                  >
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-2 shadow-lg"
                      role="presentation"
                    >
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
                  <div
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/20 dark:hover:to-green-800/20 transition-all duration-300 cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label="Writing game - Academic Essays"
                  >
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2 shadow-lg"
                      role="presentation"
                    >
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
        >
          🎯 Why 95% of Our Students Achieve Their Goals
        </h2>
        <p
          className={`text-lg ${themeClasses.textSecondary} text-center mb-12 max-w-3xl mx-auto`}
        >
          Unlike traditional language apps, FluentForce is specifically designed
          for academic success. Here's what makes our students succeed where
          others struggle:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader className="text-center">
              <div
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                role="presentation"
              >
                <Brain className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold" id="learning-games-feature">
                🎮 5 Addictive Learning Games
              </h3>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.textSecondary}>
                <strong>Academic Vocabulary Challenge:</strong> Master 1000+
                university-level terms
                <br />
                <span>
                  <strong>Listening Lab:</strong> Decode real academic lectures
                </span>
                <br />
                <span>
                  <strong>Grammar Quest:</strong> Conquer complex structures
                </span>
                <br />
                <span>
                  <strong>Reading Expedition:</strong> Navigate scholarly texts
                </span>
                <br />
                <span>
                  <strong>Writing Workshop:</strong> Craft perfect academic
                  essays
                </span>
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-black-600 dark:text-black-400">
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
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
              <div
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                role="presentation"
              >
                <TrendingUp className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold" id="progress-tracking-feature">
                Personalized Progress Tracking
              </h3>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.textSecondary}>
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
              <div
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                role="presentation"
              >
                <Award className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3
                className="text-xl font-bold"
                id="academic-excellence-focus-feature"
              >
                Academic Excellence Focus
              </h3>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.textSecondary}>
                Specifically designed for university students and professionals
                who need advanced English skills for academic writing,
                presentations, and research.
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader className="text-center">
              <div
                className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
                role="presentation"
              >
                <Users className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold" id="global-community-feature">
                Global Learning Community
              </h3>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.textSecondary}>
                Connect with learners worldwide, participate in challenges, and
                benefit from peer learning in a supportive, multicultural
                environment.
              </p>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader className="text-center">
              <div
                className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
                role="presentation"
              >
                <Globe className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3
                className="text-xl font-bold"
                id="accessibility-first-feature"
              >
                Accessibility First
              </h3>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.textSecondary}>
                Fully accessible platform with keyboard navigation, screen
                reader support, multiple theme options, and inclusive design for
                learners of all abilities.
              </p>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card
            className={`${themeClasses.cardBg} ${themeClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader className="text-center">
              <div
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                role="presentation"
              >
                <Zap className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold" id="instant-feedback-feature">
                Instant Feedback & Support
              </h3>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.textSecondary}>
                Receive immediate, constructive feedback on your performance
                with detailed explanations, tips for improvement, and adaptive
                learning suggestions.
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
            <h2 id="stats-heading" className="text-3xl font-bold mb-4">
              Join Thousands of Successful Learners
            </h2>
            <p className={themeClasses.textSecondary}>
              Our platform has helped students worldwide achieve their academic
              English goals
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  50,000+
                </div>
                <p className={themeClasses.textSecondary}>Active Learners</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  95%
                </div>
                <p className={themeClasses.textSecondary}>Success Rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  200+
                </div>
                <p className={themeClasses.textSecondary}>Universities</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
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
            <h2 id="cta-heading" className="text-3xl font-bold mb-6">
              Ready to Transform Your English Skills?
            </h2>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-2xl mx-auto`}
            >
              Join our community of learners and start your journey to academic
              English mastery today. Your future success begins with a single
              click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setShowWelcome(false);
                  setIsLogin(false);
                }}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="w-5 h-5 mr-2" aria-hidden="true" />
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
              >
                <LogIn className="w-5 h-5 mr-2" aria-hidden="true" />
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
          <p className={themeClasses.textSecondary}>
            © 2024 English Quest University. Empowering academic success through
            innovative language learning.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <button
              className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              Privacy Policy
            </button>
            <button
              className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              Terms of Service
            </button>
            <button
              className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              Accessibility
            </button>
            <button
              className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
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
              <ul className={`text-sm space-y-2 ${themeClasses.textSecondary}`}>
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
              <ul className={`text-sm space-y-2 ${themeClasses.textSecondary}`}>
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
              <ul className={`text-sm space-y-2 ${themeClasses.textSecondary}`}>
                <li>• Three visual themes: Light, Neutral, and Dark modes</li>
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
              <ul className={`text-sm space-y-2 ${themeClasses.textSecondary}`}>
                <li>• Watch the welcome video to understand the platform</li>
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
                className={`flex-1 ${themeClasses.text} font-semibold`}
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
