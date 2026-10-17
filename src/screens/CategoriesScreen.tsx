import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCategories, getReelsForCategory } from '../data/contentSource';
import { Category, CategoryGroup } from '../types/content';

interface Props {
  onSelectCategory: (categoryId: string) => void;
  onSelectAll: () => void;
}

const SECTION_TITLE: Record<CategoryGroup, string> = {
  topic: 'By topic',
  format: 'By format',
  internal: 'From Doctolib',
};

const SECTION_SUBTITLE: Record<CategoryGroup, string> = {
  topic: 'Technical leadership, broken into focus areas.',
  format: 'The same skills, pulled from books, talks, courses, forums, and the news.',
  internal: "Added directly by Doctolib's own leadership.",
};

export default function CategoriesScreen({ onSelectCategory, onSelectAll }: Props) {
  const categories = getCategories();
  const groups: CategoryGroup[] = ['topic', 'format', 'internal'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Topics</Text>
        <Text style={styles.subheading}>Pick a focus, or mix it all in For You.</Text>

        <Pressable style={[styles.card, styles.allCard]} onPress={onSelectAll}>
          <Ionicons name="sparkles-outline" size={22} color="#fff" />
          <Text style={styles.cardTitle}>For You</Text>
          <Text style={styles.cardDescription}>A mixed feed across every collection</Text>
        </Pressable>

        {groups.map((group) => {
          const groupCategories = categories.filter((c) => c.group === group);
          if (groupCategories.length === 0) return null;
          return (
            <View key={group} style={styles.section}>
              <Text style={styles.sectionTitle}>{SECTION_TITLE[group]}</Text>
              <Text style={styles.sectionSubtitle}>{SECTION_SUBTITLE[group]}</Text>
              <View style={styles.grid}>
                {groupCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onPress={() => onSelectCategory(category.id)}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryCard({ category, onPress }: { category: Category; onPress: () => void }) {
  const count = getReelsForCategory(category.id).length;
  const isEmpty = count === 0;
  return (
    <Pressable
      style={[styles.card, styles.gridCard, { backgroundColor: category.color }, isEmpty && styles.gridCardEmpty]}
      onPress={onPress}
    >
      <Ionicons name={category.icon} size={22} color="#fff" />
      <Text style={styles.cardTitle}>{category.name}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>
        {category.description}
      </Text>
      <Text style={styles.cardCount}>{isEmpty ? 'Coming soon' : `${count} cards`}</Text>
    </Pressable>
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
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    gap: 6,
  },
  allCard: {
    backgroundColor: '#1C1C24',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  section: {
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '47%',
    minHeight: 150,
    justifyContent: 'space-between',
  },
  gridCardEmpty: {
    opacity: 0.55,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  cardDescription: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    lineHeight: 16,
  },
  cardCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '600',
  },
});
