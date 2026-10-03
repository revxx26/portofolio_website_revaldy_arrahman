"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePreferences } from "./preferences";

export function BackToTop() {
  const { t } = usePreferences();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      setVisible(window.scrollY > 320);
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const returnToTop = () => {
    history.replaceState(history.state, "", location.pathname + location.search);
    document.querySelector<HTMLAnchorElement>(".wordmark")?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return <button type="button" className="back-to-top" hidden={!visible} onClick={returnToTop}
    aria-label={t("Back to top")} title={t("Back to top")}>
    <ArrowUp size={22} aria-hidden="true" />
  </button>;
}
