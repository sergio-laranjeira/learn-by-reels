import { CATEGORIES, CATEGORY_MAP } from './categories';
import { REELS } from './reels';
import { Category, Reel } from '../types/content';

// Single seam between the UI and where content actually comes from. Today it
// is a bundled static array; swapping in a CMS or API later means changing
// this file only, not the screens/components that call it.
export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategory(categoryId: string): Category | undefined {
  return CATEGORY_MAP[categoryId];
}

export function getAllReels(): Reel[] {
  return REELS;
}

export function getReelsForCategory(categoryId: string): Reel[] {
  return REELS.filter((r) => r.categoryId === categoryId);
}
