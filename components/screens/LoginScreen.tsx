/**
 * FluentForce - Login Screen Component
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 */
import React, { useState } from "react";
import {
  ArrowLeft,
  Gamepad2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserType {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  completedGames: string[];
}

interface LoginScreenProps {
  isLogin: boolean;
  theme: "light" | "dark" | "neutral";
  themeClasses: {
    bg: string;
    text: string;
    textSecondary: string;
    cardBg: string;
    border: string;
    button: string;
    accent: string;
  };
  setIsLogin: (isLogin: boolean) => void;
  setShowWelcome: (show: boolean) => void;
  handleLogin: (email: string, password: string) => void;
  handleRegister: (name: string, email: string, password: string) => void;
}

export default function LoginScreen({
  isLogin,
  theme,
  themeClasses,
  setIsLogin,
  setShowWelcome,
  handleLogin,
  handleRegister,
}: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} flex items-center justify-center p-4 transition-colors duration-300`}
    >
      {/* Skip Links for accessibility */}
      <div className="sr-only-focusable">
        <a href="#auth-form" className="skip-link">
          Skip to login form
        </a>
      </div>

      <Card
        id="auth-form"
        className={`w-full max-w-md ${themeClasses.cardBg} ${themeClasses.border} shadow-lg`}
      >
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            onClick={() => setShowWelcome(true)}
            className={`${themeClasses.button} mb-4 self-start`}
            aria-label="Back to welcome screen"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4" role="presentation">
            <Gamepad2 className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h1 className={`text-2xl font-bold ${themeClasses.text}`}>
            FluentForce
          </h1>
          <CardDescription className={themeClasses.textSecondary}>
            {isLogin
              ? "Welcome back! Sign in to continue your learning journey."
              : "Join thousands of students mastering academic English."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              const name = formData.get("name") as string;

              if (isLogin) {
                handleLogin(email, password);
              } else {
                handleRegister(name, email, password);
              }
            }}
            className="space-y-4"
            role="form"
            aria-labelledby="auth-form-title"
          >
            <fieldset
              className="space-y-4"
              aria-describedby="auth-form-description"
            >
              <legend className="sr-only" id="auth-form-title">
                {isLogin ? "Sign in to your account" : "Create a new account"}
              </legend>
              <div className="sr-only" id="auth-form-description">
                {isLogin
                  ? "Enter your email and password to sign in to FluentForce"
                  : "Fill out this form to create your FluentForce account"}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className={themeClasses.text}>
                    Full Name{" "}
                    <span className="text-red-500" aria-label="required">
                      *
                    </span>
                  </Label>
                  <div className="relative">
                    <User
                      className={`absolute left-3 top-3 w-4 h-4 ${themeClasses.textSecondary}`}
                      aria-hidden="true"
                    />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      aria-label="Full name input field"
                      aria-describedby="name-error name-description"
                      aria-required="true"
                      autoComplete="name"
                      className={`pl-10 ${themeClasses.border} ${themeClasses.text} ${themeClasses.cardBg}`}
                    />
                  </div>
                  <div
                    id="name-error"
                    className="sr-only"
                    aria-live="polite"
                  ></div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className={themeClasses.text}>
                  Email Address{" "}
                  <span className="text-red-500" aria-label="required">
                    *
                  </span>
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-3 w-4 h-4 ${themeClasses.textSecondary}`}
                    aria-hidden="true"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    aria-required="true"
                    aria-describedby="email-error"
                    aria-label="Email address input field"
                    autoComplete="email"
                    className={`pl-10 ${themeClasses.border} ${themeClasses.text} ${themeClasses.cardBg}`}
                  />
                </div>
                <div
                  id="email-error"
                  className="sr-only"
                  aria-live="polite"
                ></div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={themeClasses.text}>
                  Password{" "}
                  <span className="text-red-500" aria-label="required">
                    *
                  </span>
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-3 w-4 h-4 ${themeClasses.textSecondary}`}
                    aria-hidden="true"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    aria-required="true"
                    aria-describedby="password-error password-help"
                    aria-label="Password input field"
                    autoComplete={
                      isLogin ? "current-password" : "new-password"
                    }
                    className={`pl-10 pr-10 ${themeClasses.border} ${themeClasses.text} ${themeClasses.cardBg}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`absolute right-2 top-2 ${themeClasses.textSecondary}`}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
                <div
                  id="password-error"
                  className="sr-only"
                  aria-live="polite"
                ></div>
                {!isLogin && (
                  <div
                    id="password-help"
                    className={`text-xs ${themeClasses.textSecondary}`}
                  >
                    Password should be at least 8 characters long
                  </div>
                )}
              </div>
            </fieldset>

            <Button
              type="submit"
              className={`w-full ${themeClasses.accent}`}
              aria-describedby="submit-help"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
            <div id="submit-help" className="sr-only">
              {isLogin
                ? "Press to sign in to your FluentForce account"
                : "Press to create your new FluentForce account"}
            </div>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className={themeClasses.button}
              aria-describedby="auth-toggle-help"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
            <div id="auth-toggle-help" className="sr-only">
              {isLogin
                ? "Switch to account registration form"
                : "Switch to account sign in form"}
            </div>
          </div>

          <div
            className={`text-center text-sm ${themeClasses.textSecondary}`}
            role="status"
            aria-live="polite"
          >
            <p>Press F1 for help and accessibility options</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
