"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

type PreviewDialogProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  className: string;
  label?: string;
  labelledBy?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
  children: ReactNode;
};

export function PreviewDialog({ open, onClose, id, className, label, labelledBy, onKeyDown, children }: PreviewDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  const [mounted, setMounted] = useState(false);
  const [fallback, setFallback] = useState(false);
  useEffect(() => { close.current = onClose; }, [onClose]);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const viewer = dialog.current;
    if (!open || !mounted || !viewer) return;

    const initiator = document.activeElement as HTMLElement | null;
    const body = document.body;
    const root = document.documentElement;
    const scroll = { top: window.scrollY, left: window.scrollX };
    const original = {
      position: body.style.position, top: body.style.top, left: body.style.left,
      width: body.style.width, overflow: body.style.overflow, scrollBehavior: root.style.scrollBehavior,
    };
    let native = false;
    try {
      if (typeof viewer.showModal === "function") {
        viewer.showModal();
        native = true;
      }
    } catch {
      // Keep the same-page preview available when a browser cannot open a native modal.
    }
    const background: { element: HTMLElement; inert: boolean; hidden: string | null }[] = [];
    if (!native) {
      viewer.setAttribute("open", "");
      viewer.dataset.fallback = "true";
      for (const element of Array.from(body.children)) {
        if (!(element instanceof HTMLElement) || element.contains(viewer) || element.tagName === "SCRIPT") continue;
        background.push({ element, inert: element.inert, hidden: element.getAttribute("aria-hidden") });
        element.inert = true;
        element.setAttribute("aria-hidden", "true");
      }
    }
    setFallback(!native);

    // overflow:hidden alone does not reliably prevent page scrolling on iOS.
    root.style.scrollBehavior = "auto";
    body.style.position = "fixed";
    body.style.top = `-${scroll.top}px`;
    body.style.left = `-${scroll.left}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    const focusable = () => Array.from(viewer.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"]), iframe',
    )).filter(element => element.getClientRects().length > 0);
    (viewer.querySelector<HTMLElement>("[autofocus]") ?? focusable()[0] ?? viewer).focus({ preventScroll: true });

    const keyboard = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close.current(); }
      if (!native && event.key === "Tab") {
        const targets = focusable();
        const first = targets[0], last = targets.at(-1);
        if (!first) { event.preventDefault(); viewer.focus(); }
        else if (event.shiftKey && (document.activeElement === first || document.activeElement === viewer)) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };
    viewer.addEventListener("keydown", keyboard);
    return () => {
      viewer.removeEventListener("keydown", keyboard);
      if (native && viewer.open) viewer.close();
      else viewer.removeAttribute("open");
      delete viewer.dataset.fallback;
      for (const { element, inert, hidden } of background) {
        element.inert = inert;
        if (hidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", hidden);
      }
      body.style.position = original.position;
      body.style.top = original.top;
      body.style.left = original.left;
      body.style.width = original.width;
      body.style.overflow = original.overflow;
      window.scrollTo({ ...scroll, behavior: "auto" });
      root.style.scrollBehavior = original.scrollBehavior;
      initiator?.focus({ preventScroll: true });
    };
  }, [open, mounted]);

  const content = <>
    {open && fallback && <div className="preview-fallback-backdrop" aria-hidden="true" onClick={onClose} />}
    <dialog ref={dialog} id={id} className={className} role="dialog" aria-modal="true"
      aria-label={label} aria-labelledby={labelledBy} tabIndex={-1}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={onKeyDown}>
      {children}
    </dialog>
  </>;
  // Rendering outside cards avoids clipping and stacking contexts created by reveal animations.
  return mounted ? createPortal(<div className="preview-dialog-host">{content}</div>, document.body) : content;
}
