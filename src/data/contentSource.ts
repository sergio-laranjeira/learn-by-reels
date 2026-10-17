import { CATEGORIES, CATEGORY_MAP } from './categories';
import { Category, Reel } from '../types/content';

import communication from './collections/communication.json';
import delegation from './collections/delegation.json';
import decisions from './collections/decisions.json';
import conflict from './collections/conflict.json';
import hiring from './collections/hiring.json';
import growth from './collections/growth.json';
import strategy from './collections/strategy.json';
import managingUp from './collections/managing-up.json';
import books from './collections/books.json';
import conferences from './collections/conferences.json';
import courses from './collections/courses.json';
import forums from './collections/forums.json';
import dailyNews from './collections/daily-news.json';
import doctolibLeadership from './collections/doctolib-leadership.json';

// Each collection is its own JSON file under ./collections — real,
// standalone files (not just TS literals), so a collection can be
// downloaded, edited, or swapped for a CMS/API later without touching the
// screens that call these functions.
const REELS_BY_CATEGORY: Record<string, Reel[]> = {
  communication: communication as Reel[],
  delegation: delegation as Reel[],
  decisions: decisions as Reel[],
  conflict: conflict as Reel[],
  hiring: hiring as Reel[],
  growth: growth as Reel[],
  strategy: strategy as Reel[],
  'managing-up': managingUp as Reel[],
  books: books as Reel[],
  conferences: conferences as Reel[],
  courses: courses as Reel[],
  forums: forums as Reel[],
  'daily-news': dailyNews as Reel[],
  'doctolib-leadership': doctolibLeadership as Reel[],
};

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategory(categoryId: string): Category | undefined {
  return CATEGORY_MAP[categoryId];
}

export function getAllReels(): Reel[] {
  return Object.values(REELS_BY_CATEGORY).flat();
}

export function getReelsForCategory(categoryId: string): Reel[] {
  return REELS_BY_CATEGORY[categoryId] ?? [];
}
