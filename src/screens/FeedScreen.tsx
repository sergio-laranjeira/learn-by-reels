import React, { useMemo, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  ViewToken,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReelCard from '../components/ReelCard';
import DailyProgressBar from '../components/DailyProgressBar';
import { useProgress } from '../state/progress';
import { getAllReels, getCategory, getReelsForCategory } from '../data/contentSource';
import { Reel } from '../types/content';
import { dateKey } from '../utils/date';
import { seededShuffle } from '../utils/shuffle';

const LOOP_CYCLES = 6;

interface FeedItem {
  key: string;
  reel: Reel;
}

interface Props {
  categoryId?: string | null;
  onClearCategory?: () => void;
}

export default function FeedScreen({ categoryId, onClearCategory }: Props) {
  const { height } = useWindowDimensions();
  const { markViewed } = useProgress();
  const today = dateKey(new Date());

  const feed = useMemo<FeedItem[]>(() => {
    const base = categoryId ? getReelsForCategory(categoryId) : getAllReels();
    const shuffled = seededShuffle(base, `${today}:${categoryId ?? 'all'}`);
    const looped: FeedItem[] = [];
    for (let cycle = 0; cycle < LOOP_CYCLES; cycle += 1) {
      for (const reel of shuffled) {
        looped.push({ key: `${reel.id}:${cycle}`, reel });
      }
    }
    return looped;
  }, [categoryId, today]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 75,
    minimumViewTime: 500,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visible = viewableItems.find((v) => v.isViewable);
      if (visible?.item) {
        markViewed((visible.item as FeedItem).reel.id);
      }
    },
  ).current;

  const category = categoryId ? getCategory(categoryId) : null;

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <ReelCard
            reel={item.reel}
            category={getCategory(item.reel.categoryId)!}
            showSwipeHint={index === 0}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
        getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <DailyProgressBar />
      {category ? (
        <View style={styles.categoryHeader} pointerEvents="box-none">
          <View style={styles.categoryHeaderPill}>
            <Text style={styles.categoryHeaderText}>{category.name}</Text>
            <Pressable onPress={onClearCategory} hitSlop={10}>
              <Ionicons name="close" size={16} color="#fff" />
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  categoryHeader: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  categoryHeaderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  categoryHeaderText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
