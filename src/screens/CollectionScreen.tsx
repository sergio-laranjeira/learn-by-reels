import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from '../state/progress';
import { getCategories, getReelsForCategory } from '../data/contentSource';
import { COLLECTION_CAPACITY } from '../data/categories';
import { Category } from '../types/content';

const GRID_COLUMNS = 10;

export default function CollectionScreen() {
  const { isCollected, totalCollected } = useProgress();
  const [expanded, setExpanded] = useState<Category | null>(null);
  const categories = getCategories();
  const totalCapacity = categories.length * COLLECTION_CAPACITY;

  if (expanded) {
    return (
      <CollectionDetail
        category={expanded}
        onBack={() => setExpanded(null)}
        isCollected={isCollected}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Collection</Text>
        <Text style={styles.subheading}>
          Every reel is a card. Collect every card in a set to complete it.
        </Text>

        <View style={styles.overallCard}>
          <Text style={styles.overallCount}>
            {totalCollected}
            <Text style={styles.overallCapacity}> / {totalCapacity}</Text>
          </Text>
          <Text style={styles.overallLabel}>cards collected</Text>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                { width: `${Math.min(1, totalCollected / totalCapacity) * 100}%` },
              ]}
            />
          </View>
        </View>

        {categories.map((category) => {
          const reels = getReelsForCategory(category.id);
          const collectedCount = reels.filter((r) => isCollected(r.id)).length;
          const pct = collectedCount / COLLECTION_CAPACITY;
          return (
            <Pressable
              key={category.id}
              style={styles.row}
              onPress={() => setExpanded(category)}
            >
              <View style={[styles.rowIcon, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon} size={18} color="#fff" />
              </View>
              <View style={styles.rowBody}>
                <View style={styles.rowHeader}>
                  <Text style={styles.rowTitle}>{category.name}</Text>
                  <Text style={styles.rowCount}>
                    {collectedCount}/{COLLECTION_CAPACITY}
                  </Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${Math.min(1, pct) * 100}%`, backgroundColor: category.color },
                    ]}
                  />
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.3)" />
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function CollectionDetail({
  category,
  onBack,
  isCollected,
}: {
  category: Category;
  onBack: () => void;
  isCollected: (id: string) => boolean;
}) {
  const reels = getReelsForCategory(category.id);
  const collectedCount = reels.filter((r) => isCollected(r.id)).length;
  const slots = Array.from({ length: COLLECTION_CAPACITY }, (_, i) => reels[i] ?? null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.detailHeader}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
        <View style={styles.detailHeaderText}>
          <Text style={styles.rowTitle}>{category.name}</Text>
          <Text style={styles.subheading}>
            {collectedCount}/{COLLECTION_CAPACITY} collected · {reels.length} in this set so far
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.gridScrollContent}>
        <View style={styles.grid}>
          {slots.map((reel, index) => {
            const collected = reel ? isCollected(reel.id) : false;
            const authored = reel !== null;
            return (
              <View
                key={reel?.id ?? `empty-${index}`}
                style={[
                  styles.cell,
                  !authored && styles.cellLocked,
                  authored && !collected && styles.cellAuthored,
                  collected && { backgroundColor: category.color },
                ]}
              >
                {collected ? <Ionicons name="checkmark" size={12} color="#fff" /> : null}
              </View>
            );
          })}
        </View>
        <Text style={styles.gridLegend}>
          Filled = collected · outlined = discoverable now · dim = coming soon
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E12',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  subheading: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    marginTop: 4,
  },
  overallCard: {
    backgroundColor: '#1C1C24',
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  overallCount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  overallCapacity: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
  },
  overallLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 12,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1C1C24',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: {
    flex: 1,
    gap: 6,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  rowCount: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '700',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  detailHeaderText: {
    flex: 1,
  },
  gridScrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  cell: {
    width: `${100 / GRID_COLUMNS - 1.5}%`,
    aspectRatio: 1,
    borderRadius: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellAuthored: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  cellLocked: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  gridLegend: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    marginTop: 16,
    textAlign: 'center',
  },
});
