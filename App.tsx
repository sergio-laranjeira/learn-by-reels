import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressProvider } from './src/state/progress';
import FeedScreen from './src/screens/FeedScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import TabBar, { TabKey } from './src/components/TabBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('feed');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <View style={styles.container}>
          <View style={styles.screen}>
            {activeTab === 'feed' ? (
              <FeedScreen
                categoryId={selectedCategory}
                onClearCategory={() => setSelectedCategory(null)}
              />
            ) : null}
            {activeTab === 'categories' ? (
              <CategoriesScreen
                onSelectCategory={(id) => {
                  setSelectedCategory(id);
                  setActiveTab('feed');
                }}
                onSelectAll={() => {
                  setSelectedCategory(null);
                  setActiveTab('feed');
                }}
              />
            ) : null}
            {activeTab === 'progress' ? <ProgressScreen /> : null}
          </View>
          <TabBar active={activeTab} onChange={setActiveTab} overlay={activeTab === 'feed'} />
          <StatusBar style="light" />
        </View>
      </ProgressProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  screen: {
    flex: 1,
  },
});
