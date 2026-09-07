import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from '../state/progress';

function dayLabel(key: string): string {
  const d = new Date(`${key}T00:00:00`);
  return d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
}

export default function ProgressScreen() {
  const {
    todayCount,
    dailyGoal,
    todayGoalMet,
    currentStreak,
    longestStreak,
    totalReelsViewed,
    last7Days,
  } = useProgress();

  const maxCount = Math.max(dailyGoal, ...last7Days.map((d) => d.count));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Your progress</Text>

        <View style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <Text style={styles.todayLabel}>Today</Text>
            {todayGoalMet ? (
              <View style={styles.goalMetPill}>
                <Ionicons name="checkmark-circle" size={14} color="#0F7A46" />
                <Text style={styles.goalMetText}>Goal hit</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.todayCount}>
            {Math.min(todayCount, dailyGoal)}
            <Text style={styles.todayGoal}> / {dailyGoal}</Text>
          </Text>
          <View style={styles.todayTrack}>
            <View
              style={[
                styles.todayFill,
                { width: `${Math.min(1, todayCount / dailyGoal) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.todayHint}>
            {todayGoalMet
              ? "You've hit today's goal — keep going or come back tomorrow."
              : `${Math.max(0, dailyGoal - todayCount)} more reels to hit today's goal.`}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={20} color="#FF9F40" />
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>day streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trophy-outline" size={20} color="#F5C542" />
            <Text style={styles.statValue}>{longestStreak}</Text>
            <Text style={styles.statLabel}>best streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="albums-outline" size={20} color="#3D8BFF" />
            <Text style={styles.statValue}>{totalReelsViewed}</Text>
            <Text style={styles.statLabel}>reels total</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Last 7 days</Text>
        <View style={styles.weekChart}>
          {last7Days.map((day) => (
            <View key={day.key} style={styles.weekBarColumn}>
              <View style={styles.weekBarTrack}>
                <View
                  style={[
                    styles.weekBarFill,
                    {
                      height: `${Math.max(4, (day.count / maxCount) * 100)}%`,
                      backgroundColor: day.count >= dailyGoal ? '#2FBF71' : '#3D8BFF',
                    },
                  ]}
                />
              </View>
              <Text style={styles.weekBarLabel}>{dayLabel(day.key)}</Text>
            </View>
          ))}
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
    marginBottom: 20,
  },
  todayCard: {
    backgroundColor: '#1C1C24',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
  goalMetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(47,191,113,0.15)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  goalMetText: {
    color: '#2FBF71',
    fontSize: 11,
    fontWeight: '700',
  },
  todayCount: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    marginTop: 4,
  },
  todayGoal: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
  },
  todayTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    marginTop: 14,
  },
  todayFill: {
    height: '100%',
    backgroundColor: '#2FBF71',
    borderRadius: 4,
  },
  todayHint: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1C1C24',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 12,
  },
  weekChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    backgroundColor: '#1C1C24',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  weekBarColumn: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  weekBarTrack: {
    width: 14,
    height: '80%',
    justifyContent: 'flex-end',
  },
  weekBarFill: {
    width: '100%',
    borderRadius: 6,
  },
  weekBarLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '600',
  },
});
