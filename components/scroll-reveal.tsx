"use client";

import { useEffect } from "react";
import { usePortfolio } from "./portfolio-provider";

export function ScrollReveal() {
  const { data } = usePortfolio();
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll<HTMLElement>(".section-heading, .project-overview, .experience-row, .volunteer-card, .certification-card, .skill-card, .contact-copy, .contact-form")];
    const reveal = (element: HTMLElement) => {
      element.dataset.reveal = "visible";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement);
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    for (const element of elements) {
      // Keep the initial viewport and any content above it visible.
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.dataset.reveal = "pending";
        observer.observe(element);
      }
    }
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) {
        const element = event.target.closest<HTMLElement>('[data-reveal="pending"]');
        if (element) reveal(element);
      }
    };
    const stopMotion = () => {
      if (!motion.matches) return;
      observer.disconnect();
      for (const element of elements) delete element.dataset.reveal;
    };
    document.addEventListener("focusin", onFocus);
    motion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", stopMotion);
      for (const element of elements) delete element.dataset.reveal;
    };
  }, [data]);
  return null;
}
