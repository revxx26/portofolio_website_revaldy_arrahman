"use client";
import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';
import {fallbackContent, type PortfolioData, type ContentTranslations} from '@/content/fallback';
import {sanityConfig} from '@/content/sanity-config';
import {queryUrl, normalizeDocuments} from '@/lib/sanity-content.mjs';

export type PortfolioContentState = {data: PortfolioData; translations: ContentTranslations};
const defaults: PortfolioContentState = {data: fallbackContent, translations: {}};
const Context = createContext(defaults);
export function PortfolioProvider({children, initialContent = defaults}: {children: ReactNode; initialContent?: PortfolioContentState}) {
  const [content, setContent] = useState(initialContent);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    fetch(queryUrl(sanityConfig), {signal: controller.signal, credentials: 'omit'})
      .then(response => {if (!response.ok) throw new Error('CMS unavailable'); return response.json();})
      .then(response => {const next = normalizeDocuments(response.result, fallbackContent, sanityConfig); if (next && !controller.signal.aborted) setContent(next);})
      .catch(() => {console.warn('Portfolio CMS unavailable or not initialized; using the bundled content.');})
      .finally(() => window.clearTimeout(timeout));
    return () => {controller.abort(); window.clearTimeout(timeout);};
  }, []);
  return <Context.Provider value={content}>{children}</Context.Provider>;
}
export function usePortfolio() {return useContext(Context);}
