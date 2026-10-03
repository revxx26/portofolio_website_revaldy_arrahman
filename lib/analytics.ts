type EventName = 'cv_click' | 'case_study_open' | 'project_github_click' | 'project_demo_click' | 'gallery_open';
type EventData = {content_id?: string; image_count?: number};
declare global {interface Window {dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; portfolioAnalyticsId?: string}}

// Never include contact-form values, asset URLs, or page query strings in custom events.
export function track(name: EventName, data: EventData = {}) {
  if (typeof window === 'undefined' || !window.portfolioAnalyticsId) return;
  const params: Record<string, string | number> = {};
  if (data.content_id) params.content_id = data.content_id.replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80);
  if (data.image_count) params.image_count = Math.max(1,Math.min(21,Math.floor(data.image_count)));
  window.gtag?.('event',name,params);
}
