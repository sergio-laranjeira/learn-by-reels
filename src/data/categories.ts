import { Category } from '../types/content';

export const CATEGORIES: Category[] = [
  {
    id: 'communication',
    name: 'Communication & Feedback',
    description: 'Say it clearly, land the message, give feedback that lands.',
    color: '#FF5A5F',
    colorDark: '#C2262B',
    icon: 'chatbubbles-outline',
  },
  {
    id: 'delegation',
    name: 'Delegation & Trust',
    description: 'Let go of the work without letting go of the outcome.',
    color: '#3D8BFF',
    colorDark: '#1450B8',
    icon: 'hand-left-outline',
  },
  {
    id: 'decisions',
    name: 'Decision-Making',
    description: 'Move fast on reversible calls, slow down on the rest.',
    color: '#8A5CF6',
    colorDark: '#4E23A8',
    icon: 'git-branch-outline',
  },
  {
    id: 'conflict',
    name: 'Conflict Resolution',
    description: 'Turn friction into alignment instead of resentment.',
    color: '#FF9F40',
    colorDark: '#C25E00',
    icon: 'shield-checkmark-outline',
  },
  {
    id: 'hiring',
    name: 'Hiring & Team Building',
    description: 'Build a team that raises the bar, not just the headcount.',
    color: '#2FBF71',
    colorDark: '#0F7A46',
    icon: 'people-outline',
  },
  {
    id: 'growth',
    name: 'Career Growth & Coaching',
    description: 'Grow the people who make you replaceable.',
    color: '#00C2CB',
    colorDark: '#007780',
    icon: 'trending-up-outline',
  },
  {
    id: 'strategy',
    name: 'Strategic Thinking',
    description: 'Zoom out from the sprint to see the next two years.',
    color: '#5B6EE1',
    colorDark: '#2C3A9E',
    icon: 'compass-outline',
  },
  {
    id: 'managing-up',
    name: 'Managing Up & Across',
    description: 'Influence without authority, upward and sideways.',
    color: '#E0507A',
    colorDark: '#9C1E45',
    icon: 'arrow-up-circle-outline',
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
);
