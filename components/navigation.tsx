"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navigation } from "@/content/portfolio";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")];
    let frame: number | null = null;
    const update = () => {
      frame = null;
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
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return <header className="site-header">
    <div className="header-inner">
      <a href="#home" className="wordmark" aria-label="Revaldy Arrahman, home" onClick={() => setOpen(false)}><Image src="/images/brand/revaldy-character-head.png" alt="" width={52} height={52} preload/></a>
      <nav aria-label="Main navigation" id="main-navigation" className={open ? "navigation is-open" : "navigation"}>
        {navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} aria-current={active === item.toLowerCase() ? "location" : undefined} onClick={() => setOpen(false)}>{item}</a>)}
      </nav>
      <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>
  </header>;
}
