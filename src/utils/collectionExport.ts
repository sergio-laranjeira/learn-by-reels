import { Category, Reel } from '../types/content';

export interface CollectionExportPayload {
  collection: { id: string; name: string; description: string };
  exportedAt: string;
  cardCount: number;
  cards: Reel[];
}

export function buildExportPayload(category: Category, reels: Reel[]): CollectionExportPayload {
  return {
    collection: { id: category.id, name: category.name, description: category.description },
    exportedAt: new Date().toISOString(),
    cardCount: reels.length,
    cards: reels,
  };
}
