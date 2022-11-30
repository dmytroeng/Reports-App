import {
  BREAK_LENGTH_MAX,
  INTERVAL,
  PADDING,
  QUARTER_HOURS,
  TOTAL_RANGE,
} from './src/constants';
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import {
  generateRandomDate,
  generateRandomMs,
} from './src/helpers/dateHelpers';

import { Block } from './src/types';
import Chart from './src/components/chart';
import ClockIcon from './src/components/icons/ClockIcon';
import DataCard from './src/components/DataCard';
import Divider from './src/components/layout/Divider';
import { MainText } from './src/components/StyledText';
import Row from './src/components/layout/Row';
import ScoreCard from './src/components/ScoreCard';
import { sub } from 'date-fns';

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState<Block>();

  const getNewData = () => {
    const today = new Date();

    const start = generateRandomDate(sub(today, { months: INTERVAL }), today);
    const total = generateRandomMs(
      TOTAL_RANGE.min,
      TOTAL_RANGE.min,
      QUARTER_HOURS,
    );
    const breakLength = generateRandomMs(0, BREAK_LENGTH_MAX);
    const end = new Date(total + start.getTime() + breakLength);

    setData({ start, breakLength, end, createdAt: today });
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <MainText style={styles.title}>Most Useful App Ever</MainText>
        <Divider height={24} />
        <Row>
          <ClockIcon />
          <Divider width={10} />
          <MainText fontWeight="SemiBold" style={styles.subtitle}>
            Total tracked time
          </MainText>
        </Row>
        <Divider height={16} />
        <Chart />
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
        <DataCard onButtonPress={getNewData} />
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
    paddingHorizontal: PADDING,
  },
  title: {
    fontSize: 20,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default App;
