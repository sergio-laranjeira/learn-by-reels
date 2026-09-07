export type ReelKind = 'tip' | 'quote' | 'question' | 'story' | 'challenge';

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
