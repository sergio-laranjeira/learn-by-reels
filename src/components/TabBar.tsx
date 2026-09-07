import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export type TabKey = 'feed' | 'categories' | 'progress';

const TABS: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'feed', label: 'For You', icon: 'play-circle-outline' },
  { key: 'categories', label: 'Topics', icon: 'grid-outline' },
  { key: 'progress', label: 'Progress', icon: 'bar-chart-outline' },
];

interface Props {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  overlay?: boolean;
}

export default function TabBar({ active, onChange, overlay }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        overlay && styles.overlay,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
      pointerEvents="box-none"
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <Ionicons
              name={isActive ? (tab.icon.replace('-outline', '') as any) : tab.icon}
              size={24}
              color={isActive ? '#fff' : 'rgba(255,255,255,0.55)'}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#0E0E12',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10,10,12,0.35)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
  },
  labelActive: {
    color: '#fff',
  },
});
