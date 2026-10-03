"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { indonesian } from "@/content/translations";
import { usePortfolio } from "./portfolio-provider";

type Language = "en" | "id";
type Theme = "light" | "dark";
const Context = createContext<{ language: Language; theme: Theme; ready: boolean; setLanguage: (value: Language) => void; toggleTheme: () => void; t: (value: string) => string } | null>(null);
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { translations } = usePortfolio();
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let savedLanguage: string | null = null;
    let savedTheme: string | null = null;
    try { savedLanguage = localStorage.getItem("portfolio-language"); savedTheme = localStorage.getItem("portfolio-theme"); } catch {}
    setLanguageState(savedLanguage === "id" ? "id" : "en");
    setTheme(savedTheme === "dark" || savedTheme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setReady(true);
  }, []);
  useEffect(() => { if (ready) document.documentElement.lang = language; }, [language, ready]);
  useEffect(() => { if (ready) { document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } }, [theme, ready]);
  const setLanguage = (value: Language) => { setLanguageState(value); try { localStorage.setItem("portfolio-language", value); } catch {} };
  const toggleTheme = () => { const next = theme === "dark" ? "light" : "dark"; setTheme(next); try { localStorage.setItem("portfolio-theme", next); } catch {} };
  const t = (value: string) => { const cms = translations[value]; if (cms) return cms[language]; const translated = indonesian[value.trim()]; return language === "id" && typeof translated === "string" ? value.replace(value.trim(), translated) : value; };
  return <Context.Provider value={{ language, theme, ready, setLanguage, toggleTheme, t }}>{children}</Context.Provider>;
}
export function usePreferences() { const value = useContext(Context); if (!value) throw new Error("PreferencesProvider is required"); return value; }
