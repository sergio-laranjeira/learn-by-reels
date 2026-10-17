import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dateKey, daysBetween, lastNDayKeys } from '../utils/date';

export const DAILY_GOAL = 10;
const STORAGE_KEY = 'lbr:progress:v1';
const HISTORY_DAYS_KEPT = 60;

interface PersistedState {
  dailyViewed: Record<string, string[]>;
  streak: number;
  longestStreak: number;
  lastCompletedDateKey: string | null;
  collectedReelIds: string[];
}

const EMPTY_STATE: PersistedState = {
  dailyViewed: {},
  streak: 0,
  longestStreak: 0,
  lastCompletedDateKey: null,
  collectedReelIds: [],
};

function pruneOldDays(dailyViewed: Record<string, string[]>): Record<string, string[]> {
  const keep = new Set(lastNDayKeys(HISTORY_DAYS_KEPT));
  const next: Record<string, string[]> = {};
  for (const key of Object.keys(dailyViewed)) {
    if (keep.has(key)) next[key] = dailyViewed[key];
  }
  return next;
}

interface ProgressContextValue {
  loading: boolean;
  dailyGoal: number;
  todayCount: number;
  todayGoalMet: boolean;
  currentStreak: number;
  longestStreak: number;
  totalReelsViewed: number;
  last7Days: { key: string; count: number }[];
  isViewedToday: (reelId: string) => boolean;
  markViewed: (reelId: string) => void;
  isCollected: (reelId: string) => boolean;
  totalCollected: number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<PersistedState>(EMPTY_STATE);
  const [today, setToday] = useState(() => dateKey(new Date()));

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (cancelled) return;
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<PersistedState>;
          const merged = { ...EMPTY_STATE, ...parsed };
          // Back-fill collection history for anyone who viewed reels before
          // the collection feature existed, so they don't lose that progress.
          if (!parsed.collectedReelIds) {
            const everViewed = new Set<string>();
            for (const ids of Object.values(merged.dailyViewed)) {
              ids.forEach((id) => everViewed.add(id));
            }
            merged.collectedReelIds = Array.from(everViewed);
          }
          setState(merged);
        }
      })
      .catch(() => {
        // Corrupt or unavailable storage: fall back to a fresh in-memory state.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: PersistedState) => {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {
      // Best-effort persistence; the in-memory state still reflects the update.
    });
  }, []);

  const isViewedToday = useCallback(
    (reelId: string) => (state.dailyViewed[today] ?? []).includes(reelId),
    [state.dailyViewed, today],
  );

  const markViewed = useCallback(
    (reelId: string) => {
      const todayKey = dateKey(new Date());
      if (todayKey !== today) setToday(todayKey);

      const todayList = state.dailyViewed[todayKey] ?? [];
      if (todayList.includes(reelId)) return;

      const nextTodayList = [...todayList, reelId];
      const nextDailyViewed = pruneOldDays({
        ...state.dailyViewed,
        [todayKey]: nextTodayList,
      });

      let { streak, longestStreak, lastCompletedDateKey } = state;
      if (nextTodayList.length === DAILY_GOAL) {
        const alreadyCreditedToday = lastCompletedDateKey === todayKey;
        if (!alreadyCreditedToday) {
          const extendsStreak =
            lastCompletedDateKey !== null &&
            daysBetween(lastCompletedDateKey, todayKey) === 1;
          streak = extendsStreak ? streak + 1 : 1;
          longestStreak = Math.max(longestStreak, streak);
          lastCompletedDateKey = todayKey;
        }
      }

      const collectedReelIds = state.collectedReelIds.includes(reelId)
        ? state.collectedReelIds
        : [...state.collectedReelIds, reelId];

      persist({
        dailyViewed: nextDailyViewed,
        streak,
        longestStreak,
        lastCompletedDateKey,
        collectedReelIds,
      });
    },
    [state, today, persist],
  );

  const currentStreak = useMemo(() => {
    if (!state.lastCompletedDateKey) return 0;
    const gap = daysBetween(state.lastCompletedDateKey, today);
    if (gap <= 1) return state.streak;
    return 0;
  }, [state.lastCompletedDateKey, state.streak, today]);

  const totalReelsViewed = useMemo(
    () => Object.values(state.dailyViewed).reduce((sum, ids) => sum + ids.length, 0),
    [state.dailyViewed],
  );

  const last7Days = useMemo(
    () => lastNDayKeys(7, new Date(`${today}T00:00:00`)).map((key) => ({
      key,
      count: (state.dailyViewed[key] ?? []).length,
    })),
    [state.dailyViewed, today],
  );

  const todayCount = state.dailyViewed[today]?.length ?? 0;

  const collectedSet = useMemo(
    () => new Set(state.collectedReelIds),
    [state.collectedReelIds],
  );
  const isCollected = useCallback((reelId: string) => collectedSet.has(reelId), [collectedSet]);

  const value: ProgressContextValue = {
    loading,
    dailyGoal: DAILY_GOAL,
    todayCount,
    todayGoalMet: todayCount >= DAILY_GOAL,
    currentStreak,
    longestStreak: state.longestStreak,
    totalReelsViewed,
    last7Days,
    isViewedToday,
    markViewed,
    isCollected,
    totalCollected: state.collectedReelIds.length,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
