import { Category } from '../types/content';

export const CATEGORIES: Category[] = [
  {
    id: 'communication',
    name: 'Communication & Feedback',
    description: 'Say it clearly, land the message, give feedback that lands.',
    color: '#FF5A5F',
    colorDark: '#C2262B',
    icon: 'chatbubbles-outline',
    group: 'topic',
  },
  {
    id: 'delegation',
    name: 'Delegation & Trust',
    description: 'Let go of the work without letting go of the outcome.',
    color: '#3D8BFF',
    colorDark: '#1450B8',
    icon: 'hand-left-outline',
    group: 'topic',
  },
  {
    id: 'decisions',
    name: 'Decision-Making',
    description: 'Move fast on reversible calls, slow down on the rest.',
    color: '#8A5CF6',
    colorDark: '#4E23A8',
    icon: 'git-branch-outline',
    group: 'topic',
  },
  {
    id: 'conflict',
    name: 'Conflict Resolution',
    description: 'Turn friction into alignment instead of resentment.',
    color: '#FF9F40',
    colorDark: '#C25E00',
    icon: 'shield-checkmark-outline',
    group: 'topic',
  },
  {
    id: 'hiring',
    name: 'Hiring & Team Building',
    description: 'Build a team that raises the bar, not just the headcount.',
    color: '#2FBF71',
    colorDark: '#0F7A46',
    icon: 'people-outline',
    group: 'topic',
  },
  {
    id: 'growth',
    name: 'Career Growth & Coaching',
    description: 'Grow the people who make you replaceable.',
    color: '#00C2CB',
    colorDark: '#007780',
    icon: 'trending-up-outline',
    group: 'topic',
  },
  {
    id: 'strategy',
    name: 'Strategic Thinking',
    description: 'Zoom out from the sprint to see the next two years.',
    color: '#5B6EE1',
    colorDark: '#2C3A9E',
    icon: 'compass-outline',
    group: 'topic',
  },
  {
    id: 'managing-up',
    name: 'Managing Up & Across',
    description: 'Influence without authority, upward and sideways.',
    color: '#E0507A',
    colorDark: '#9C1E45',
    icon: 'arrow-up-circle-outline',
    group: 'topic',
  },

  // --- Sourced by format, cutting across topics above ---
  {
    id: 'books',
    name: 'Books',
    description: 'Lessons distilled from the leadership books worth actually reading.',
    color: '#B8860B',
    colorDark: '#7A5900',
    icon: 'book-outline',
    group: 'format',
  },
  {
    id: 'conferences',
    name: 'Conferences & Talks',
    description: 'Big ideas from stages, keynotes, and panels — cut down to the point.',
    color: '#C026D3',
    colorDark: '#86198F',
    icon: 'mic-outline',
    group: 'format',
  },
  {
    id: 'courses',
    name: 'Courses',
    description: 'Structured lessons pulled from courses and training programs.',
    color: '#65A30D',
    colorDark: '#3F6212',
    icon: 'school-outline',
    group: 'format',
  },
  {
    id: 'forums',
    name: 'Forums & Communities',
    description: 'What other leaders are actually saying, in their own words.',
    color: '#0EA5E9',
    colorDark: '#075985',
    icon: 'people-circle-outline',
    group: 'format',
  },
  {
    id: 'daily-news',
    name: 'Daily News',
    description: "What's happening today in tech and leadership, in sixty seconds.",
    color: '#DC2626',
    colorDark: '#7F1D1D',
    icon: 'newspaper-outline',
    group: 'format',
  },

  // --- Sourced from inside Doctolib ---
  {
    id: 'doctolib-leadership',
    name: 'Doctolib Leadership',
    description: "Straight from Doctolib's own leadership, as it comes in.",
    color: '#0B5FFF',
    colorDark: '#06327F',
    icon: 'business-outline',
    group: 'internal',
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
);

// Each category is a card collection with a fixed target size. Content is
// filled in progressively — see getReelsForCategory().length for how many of
// the 100 slots are currently authored.
export const COLLECTION_CAPACITY = 100;
