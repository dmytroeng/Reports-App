import {
  BREAK_LENGTH_MAX,
  INTERVAL,
  ITERATIONS_NUM,
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
import React, { useMemo, useState } from 'react';
import { Report, ReportsDictionary } from './src/types';
import { format, isAfter, isBefore, isSameDay, sub } from 'date-fns';
import {
  generateRandomDate,
  generateRandomMs,
} from './src/helpers/dateHelpers';
import { getSortedReports, getTotalFrom, groupBy, today } from './src/helpers';

import Chart from './src/components/chart';
import ClockIcon from './src/components/icons/ClockIcon';
import DataCard from './src/components/DataCard';
import Divider from './src/components/layout/Divider';
import { MainText } from './src/components/StyledText';
import Row from './src/components/layout/Row';
import ScoreCard from './src/components/ScoreCard';

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState<ReportsDictionary>();

  const getNewData = () => {
    const newData: Report[] = [];

    for (let i = 0; i < ITERATIONS_NUM; i++) {
      const start = generateRandomDate(
        sub(today, { months: INTERVAL - 1 }),
        today,
      );
      const total = generateRandomMs(
        TOTAL_RANGE.min,
        TOTAL_RANGE.min,
        QUARTER_HOURS,
      );
      const breakLength = generateRandomMs(0, BREAK_LENGTH_MAX);
      const end = new Date(total + start.getTime() + breakLength);
      const month = format(start, 'MMM');

      newData.push({ start, breakLength, end, createdAt: today, month });
    }

    const sortedData = getSortedReports(newData);
    const groupedData = groupBy(sortedData, i => i.month);

    setData(groupedData);
  };

  const dataForCurrMonth = useMemo(() => data?.[format(today, 'MMM')], [data]);

  const totalForToday = useMemo(() => {
    if (!dataForCurrMonth) {
      return '200h';
    }

    const idx = dataForCurrMonth?.findIndex(report =>
      isSameDay(report.start, today),
    );

    return getTotalFrom(dataForCurrMonth, idx);
  }, [dataForCurrMonth]);

  const totalForWeek = useMemo(() => {
    if (!dataForCurrMonth) {
      return '120h 30m';
    }

    const start = sub(today, { weeks: 1 });
    const idx = dataForCurrMonth?.findIndex((report, index) => {
      const nextStart = dataForCurrMonth?.[index + 1]?.start;

      return (
        isBefore(report.start, start) &&
        (isAfter(nextStart, start) || isSameDay(nextStart, start))
      );
    });

    return getTotalFrom(dataForCurrMonth, idx + 1);
  }, [dataForCurrMonth]);

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
        <Chart reports={data} />
        <Divider height={16} />
        <Row>
          <ScoreCard title={totalForToday} subtitle="Today" />
          <Divider width={16} />
          <ScoreCard
            title={totalForWeek}
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
