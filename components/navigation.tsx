"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/content/portfolio";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return <header className="site-header">
    <div className="header-inner">
      <a href="#home" className="wordmark" aria-label="Revaldy Arrahman, home" onClick={() => setOpen(false)}>ra<span>.</span></a>
      <nav aria-label="Main navigation" id="main-navigation" className={open ? "navigation is-open" : "navigation"}>
        {navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} aria-current={active === item.toLowerCase() ? "location" : undefined} onClick={() => setOpen(false)}>{item}</a>)}
      </nav>
      <span className="header-caption mono">DATA / PORTFOLIO</span>
      <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>
  </header>;
}
