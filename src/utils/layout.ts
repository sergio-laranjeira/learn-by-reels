import { useWindowDimensions } from 'react-native';

// Above this width, the mobile-first full-bleed layout (one swipeable card
// spanning the whole viewport) stops being readable — long unbroken text
// lines, cards stretched edge-to-edge on a desktop monitor. Past this point
// the app renders as a centered, phone-proportioned column instead.
export const MAX_CONTENT_WIDTH = 480;

export function useAppDimensions() {
  const { width, height } = useWindowDimensions();
  return { width: Math.min(width, MAX_CONTENT_WIDTH), height };
}
