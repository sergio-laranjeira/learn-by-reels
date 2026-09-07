import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCategories, getReelsForCategory } from '../data/contentSource';

interface Props {
  onSelectCategory: (categoryId: string) => void;
  onSelectAll: () => void;
}

export default function CategoriesScreen({ onSelectCategory, onSelectAll }: Props) {
  const categories = getCategories();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Topics</Text>
        <Text style={styles.subheading}>Pick a focus, or mix it all in For You.</Text>

        <Pressable style={[styles.card, styles.allCard]} onPress={onSelectAll}>
          <Ionicons name="sparkles-outline" size={22} color="#fff" />
          <Text style={styles.cardTitle}>For You</Text>
          <Text style={styles.cardDescription}>A mixed feed across every topic</Text>
        </Pressable>

        <View style={styles.grid}>
          {categories.map((category) => {
            const count = getReelsForCategory(category.id).length;
            return (
              <Pressable
                key={category.id}
                style={[styles.card, styles.gridCard, { backgroundColor: category.color }]}
                onPress={() => onSelectCategory(category.id)}
              >
                <Ionicons name={category.icon} size={22} color="#fff" />
                <Text style={styles.cardTitle}>{category.name}</Text>
                <Text style={styles.cardDescription} numberOfLines={3}>
                  {category.description}
                </Text>
                <Text style={styles.cardCount}>{count} reels</Text>
              </Pressable>
            );
          })}
        </View>
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
