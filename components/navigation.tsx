"use client";
import { usePreferences } from "@/components/preferences";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, Moon, Sun } from "lucide-react";
import { navigation } from "@/content/portfolio";

export function Navigation() {
  const { t, language, theme, ready, setLanguage, toggleTheme } = usePreferences();
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const closeMenu = () => { if (mobileMenu.current) mobileMenu.current.open = false; };
  const [active, setActive] = useState("home");
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")];
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${ratio})`;
      const marker = Math.max(document.querySelector("header")?.getBoundingClientRect().height ?? 0, window.innerHeight * 0.25);
      let current = sections[0]?.id ?? "home";
      for (const section of sections) if (section.getBoundingClientRect().top <= marker) current = section.id;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1)?.id ?? current;
      setActive(current);
    };
    const schedule = () => { if (frame === null) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    resize?.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      resize?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenu.current?.open) {
        mobileMenu.current.open = false;
        mobileMenu.current.querySelector("summary")?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1241px)");
    const closeOnDesktop = () => { if (desktop.matches && mobileMenu.current) mobileMenu.current.open = false; };
    window.addEventListener("keydown", close);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", close);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);
  return <header className="site-header">
    <div className="reading-progress" aria-hidden="true"><div className="reading-progress-fill" ref={progress}/></div>
    <div className="header-inner">
      <a href="#home" className="wordmark" aria-label={t("Revaldy Arrahman, home")} onClick={closeMenu}><Image src="/images/brand/revaldy-character-head.png" alt={t("")} width={52} height={52} preload/></a>
      <nav aria-label={t("Main navigation")} id="main-navigation" className="navigation">
        {navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} aria-current={active === item.toLowerCase() ? "location" : undefined}>{t(item)}</a>)}
      </nav>
      <div className="header-controls">
        <div className="language-switch" role="group" aria-label={t("Choose language")}>
          <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} disabled={!ready} onClick={() => { closeMenu(); setLanguage("en"); }}>EN</button>
          <button type="button" lang="id" aria-label="Bahasa Indonesia" aria-pressed={language === "id"} disabled={!ready} onClick={() => { closeMenu(); setLanguage("id"); }}>ID</button>
        </div>
        <button type="button" className="theme-toggle" disabled={!ready} onClick={() => { closeMenu(); toggleTheme(); }} aria-label={t(theme === "dark" ? "Switch to light mode" : "Switch to dark mode")} title={t(theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}>
          {theme === "dark" ? <Sun size={19} aria-hidden="true"/> : <Moon size={19} aria-hidden="true"/>}
        </button>
      </div>
      <details className="mobile-navigation" ref={mobileMenu}>
        <summary className="menu-toggle" aria-label={t("Navigation menu")} aria-controls="mobile-navigation-links">
          <Menu className="menu-open-icon" size={22} aria-hidden="true"/><X className="menu-close-icon" size={22} aria-hidden="true"/>
        </summary>
        <nav aria-label={t("Main navigation")} id="mobile-navigation-links" className="mobile-navigation-links">
          {navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} aria-current={active === item.toLowerCase() ? "location" : undefined} onClick={closeMenu}>{t(item)}</a>)}
        </nav>
      </details>
    </div>
  </header>;
}
