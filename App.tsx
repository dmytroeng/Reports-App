import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import ClockIcon from './src/components/icons/ClockIcon';
import DataCard from './src/components/DataCard';
import Divider from './src/components/layout/Divider';
import React from 'react';
import Row from './src/components/layout/Row';
import ScoreCard from './src/components/ScoreCard';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>Most Useful App Ever</Text>
        <Divider height={24} />
        <Row>
          <ClockIcon />
          <Divider width={10} />
          <Text style={styles.subtitle}>Total tracked time</Text>
        </Row>
        <Divider height={16} />
        <Row>
          <ScoreCard title={'200h'} subtitle="Today" />
          <Divider width={16} />
          <ScoreCard
            title={'120h 30m'}
            subtitle="This week"
            bgColor="#EFFCFF"
          />
        </Row>
        <Divider height={16} />
        <DataCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
  },
  subtitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default App;
