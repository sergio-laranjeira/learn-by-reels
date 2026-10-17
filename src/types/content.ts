export type ReelKind = 'tip' | 'quote' | 'question' | 'story' | 'challenge';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';

// Cards are a collectible, so every kind doubles as a rarity tier instead of
// needing a separate field authored on each of the (eventually hundreds of)
// reels.
const RARITY_BY_KIND: Record<ReelKind, Rarity> = {
  tip: 'common',
  challenge: 'common',
  story: 'uncommon',
  question: 'rare',
  quote: 'legendary',
};

export function getRarity(kind: ReelKind): Rarity {
  return RARITY_BY_KIND[kind];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  colorDark: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
}

export interface QuizOption {
  label: string;
  correct?: boolean;
}

export interface Reel {
  id: string;
  categoryId: string;
  kind: ReelKind;
  title: string;
  body: string;
  author?: string;
  source?: string;
  options?: QuizOption[];
  explanation?: string;
  readSeconds: number;
  tags: string[];
}
