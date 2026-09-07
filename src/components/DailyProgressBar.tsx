import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from '../state/progress';

export default function DailyProgressBar() {
  const { todayCount, dailyGoal, currentStreak } = useProgress();
  const pct = Math.min(1, todayCount / dailyGoal);

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.row}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.label}>
          {Math.min(todayCount, dailyGoal)}/{dailyGoal} today
        </Text>
        {currentStreak > 0 ? (
          <View style={styles.streak}>
            <Ionicons name="flame" size={14} color="#FF9F40" />
            <Text style={styles.streakText}>{currentStreak}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  track: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 3,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  streakText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 3,
  },
});
