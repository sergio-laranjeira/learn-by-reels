import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Category, Reel } from '../types/content';

const KIND_LABEL: Record<Reel['kind'], string> = {
  tip: 'Tip',
  quote: 'Quote',
  question: 'Quick check',
  story: 'Scenario',
  challenge: 'Try today',
};

const KIND_ICON: Record<Reel['kind'], keyof typeof Ionicons.glyphMap> = {
  tip: 'bulb-outline',
  quote: 'chatbox-outline',
  question: 'help-circle-outline',
  story: 'book-outline',
  challenge: 'flash-outline',
};

interface Props {
  reel: Reel;
  category: Category;
  showSwipeHint?: boolean;
}

export default function ReelCard({ reel, category, showSwipeHint }: Props) {
  const { height, width } = useWindowDimensions();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <View style={{ height, width }}>
      <LinearGradient
        colors={[category.color, category.colorDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.headerRow}>
          <View style={styles.categoryPill}>
            <Ionicons name={category.icon} size={14} color="#fff" />
            <Text style={styles.categoryPillText}>{category.name}</Text>
          </View>
          <View style={styles.kindPill}>
            <Ionicons name={KIND_ICON[reel.kind]} size={13} color="#fff" />
            <Text style={styles.kindPillText}>{KIND_LABEL[reel.kind]}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {reel.kind === 'quote' ? (
            <>
              <Text style={styles.quoteMark}>&ldquo;</Text>
              <Text style={styles.quoteText}>{reel.body}</Text>
              {reel.author ? <Text style={styles.quoteAuthor}>— {reel.author}</Text> : null}
            </>
          ) : (
            <>
              <Text style={styles.title}>{reel.title}</Text>
              <Text style={styles.bodyText}>{reel.body}</Text>
            </>
          )}

          {reel.kind === 'question' && reel.options ? (
            <View style={styles.options}>
              {reel.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const revealed = selectedOption !== null;
                const isCorrect = !!option.correct;
                return (
                  <Pressable
                    key={option.label}
                    onPress={() => setSelectedOption(index)}
                    disabled={revealed}
                    style={[
                      styles.option,
                      revealed && isCorrect && styles.optionCorrect,
                      revealed && isSelected && !isCorrect && styles.optionWrong,
                    ]}
                  >
                    <Text style={styles.optionText}>{option.label}</Text>
                  </Pressable>
                );
              })}
              {selectedOption !== null && reel.explanation ? (
                <Text style={styles.explanation}>{reel.explanation}</Text>
              ) : null}
            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <View style={styles.tagsRow}>
            {reel.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.readTime}>{reel.readSeconds}s read</Text>
          {showSwipeHint ? (
            <View style={styles.swipeHint}>
              <Ionicons name="chevron-up" size={16} color="rgba(255,255,255,0.85)" />
              <Text style={styles.swipeHintText}>Swipe up for the next one</Text>
            </View>
          ) : null}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 64,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexShrink: 1,
  },
  categoryPillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },
  kindPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  kindPillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 16,
    lineHeight: 32,
  },
  bodyText: {
    color: 'rgba(255,255,255,0.94)',
    fontSize: 18,
    lineHeight: 26,
  },
  quoteMark: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 64,
    fontWeight: '800',
    lineHeight: 64,
    marginBottom: -20,
  },
  quoteText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '600',
  },
  options: {
    marginTop: 24,
    gap: 10,
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionCorrect: {
    backgroundColor: 'rgba(47, 191, 113, 0.85)',
  },
  optionWrong: {
    backgroundColor: 'rgba(194, 38, 43, 0.75)',
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  explanation: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
  footer: {
    paddingBottom: 48,
    gap: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontWeight: '600',
  },
  readTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'center',
    marginTop: 4,
  },
  swipeHintText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
  },
});
