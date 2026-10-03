"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function TouchCard({ as: Element = "article", className, children }: {
  as?: "article" | "li";
  className: string;
  children: ReactNode;
}) {
  const [pressed, setPressed] = useState(false);
  const release = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const reset = () => {
    if (release.current) clearTimeout(release.current);
    release.current = null;
    start.current = null;
    setPressed(false);
  };
  useEffect(() => () => { if (release.current) clearTimeout(release.current); }, []);
  return <Element className={className} data-touch-active={pressed || undefined}
    onPointerDown={event => {
      if (release.current) clearTimeout(release.current);
      start.current = { x: event.clientX, y: event.clientY };
      setPressed(true);
    }}
    onPointerMove={event => {
      if (start.current && Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > 10) reset();
    }}
    onPointerUp={() => {
      start.current = null;
      release.current = setTimeout(() => { setPressed(false); release.current = null; }, 160);
    }}
    onPointerCancel={reset} onPointerLeave={event => { if (event.pointerType === "mouse") reset(); }}>
    {children}
  </Element>;
}
