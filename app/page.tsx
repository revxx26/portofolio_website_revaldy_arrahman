import PortfolioPage from '@/components/portfolio-page';
import {fallbackContent} from '@/content/fallback';
import {sanityConfig} from '@/content/sanity-config';
import {normalizeDocuments, queryUrl} from '@/lib/sanity-content.mjs';

export const dynamic = 'force-static';

export default async function Home() {
  // Build a static snapshot; published edits refresh again when the page opens.
  let initialContent;
  try {
    const response = await fetch(queryUrl(sanityConfig), {signal: AbortSignal.timeout(8000), cache: 'no-store'});
    if (response.ok) initialContent = normalizeDocuments((await response.json()).result, fallbackContent, sanityConfig) || undefined;
  } catch {console.warn('CMS snapshot unavailable during build; retaining bundled portfolio.');}
  return <PortfolioPage initialContent={initialContent}/>;
}
