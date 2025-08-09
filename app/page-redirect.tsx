"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/welcome");
    }
  }, [isAuthenticated, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Loading FluentForce...</p>
      </div>
    </div>
  );
}
