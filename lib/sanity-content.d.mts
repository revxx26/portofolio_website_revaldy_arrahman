import type {PortfolioData, ContentTranslations} from '../content/fallback';
type Configuration = {projectId: string; dataset: string; apiVersion: string};
export const portfolioQuery: string;
export function queryUrl(config: Configuration): string;
export function safeAsset(value: unknown, config: Configuration): string;
export function safeLink(value: unknown): string;
export function normalizeDocuments(documents: unknown, fallback: PortfolioData, config: Configuration): {data: PortfolioData; translations: ContentTranslations} | null;
