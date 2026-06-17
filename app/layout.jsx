"use client";

import "./global.css";
import { Montserrat, Playfair_Display } from "next/font/google";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BsEmojiSunglasses } from "react-icons/bs";
import { GiNightSleep } from "react-icons/gi";

const Navigation = dynamic(() => import("../components/Navigation"), {
  ssr: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // User override exists → use it
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      // No override → follow system
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  }, []);

  // Save override when user toggles
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, hydrated]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  if (!hydrated) {
    return (
      <html>
        <body className="bg-black w-full h-screen" />
      </html>
    );
  }

  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body
        className={`
          transition-colors duration-500 font-sans
          ${
            isDarkMode
              ? "bg-gradient-to-b from-gray-900 via-black to-gray-950"
              : "bg-gradient-to-b from-white via-gray-100 to-gray-200"
          }
        `}
      >
        <Navigation />

        {/* ⭐ Sliding Switch Theme Toggle */}
        <div className="flex justify-end max-w-6xl mx-auto px-4 mt-4">
          <button
            onClick={toggleTheme}
            className={`
              relative w-16 h-8 rounded-full flex items-center transition-all duration-300
              backdrop-blur-xl border shadow-lg
              ${
                isDarkMode
                  ? "bg-black/40 border-white/10"
                  : "bg-white/40 border-black/10"
              }
            `}
          >
            <span
              className={`
                absolute w-7 h-7 rounded-full flex items-center justify-center shadow-md
                transition-all duration-300
                ${
                  isDarkMode
                    ? "translate-x-8 bg-white/20 text-yellow-300"
                    : "translate-x-1 bg-white/70 text-gray-900"
                }
              `}
            >
              {isDarkMode ? (
                <GiNightSleep className="w-5 h-5" />
              ) : (
                <BsEmojiSunglasses className="w-5 h-5" />
              )}
            </span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 space-y-24">{children}</div>
      </body>
    </html>
  );
};

export default Layout;
