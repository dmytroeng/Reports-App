import CustomTick, { TICK_STYLES } from './CustomTick';
import { INTERVAL, PADDING } from '../../constants';
import React, { useMemo } from 'react';
import {
  TextSize,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import { format, sub } from 'date-fns';
import { getTotal, today } from '../../helpers';

import { DATA } from '../../mocks';
import { ReportsDictionary } from '../../types';
import { useWindowDimensions } from 'react-native';

const CHART_HEIGHT = 150;
const DEFAULT_OFFSET_LEFT = 20;

interface Props {
  reports?: ReportsDictionary;
}

const Chart: React.FC<Props> = ({ reports }) => {
  const { width } = useWindowDimensions();

  const horizontalTickValues = [...Array(INTERVAL)].map((_, idx) =>
    format(sub(today, { months: INTERVAL - idx - 1 }), 'MMM'),
  );

  const formattedData = useMemo(
    () =>
      reports
        ? Object.keys(reports).map(month => {
            const y = reports[month].reduce(
              (accum, curr) => accum + getTotal(curr),
              0,
            );

            return {
              x: month,
              y,
            };
          })
        : DATA,
    [reports],
  );

  const offsetLeft = useMemo(
    () =>
      TextSize.approximateTextSize(`${formattedData[0].y}h`, TICK_STYLES)
        .width + DEFAULT_OFFSET_LEFT,
    [formattedData],
  );

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={width - PADDING * 2}
      height={CHART_HEIGHT}
      padding={{
        top: 10,
        right: 15,
        left: offsetLeft,
        bottom: 25,
      }}
      domainPadding={{ x: [offsetLeft, 0], y: [10, 10] }}>
      <VictoryAxis
        dependentAxis
        tickFormat={tick => `${tick}h`}
        style={{
          axis: {
            strokeWidth: 0,
          },
          ticks: {
            stroke: 'none',
          },
          tickLabels: { fontFamily: 'DMSans-Regular' },
          grid: {
            strokeDasharray: 3,
            stroke: '#E3E3E6',
            strokeWidth: 1,
          },
        }}
      />
      <VictoryAxis
        tickValues={horizontalTickValues}
        tickLabelComponent={<CustomTick />}
        style={{
          axis: {
            strokeWidth: 0,
          },
          ticks: {
            stroke: 'none',
          },
          grid: { stroke: 'none' },
        }}
      />

      <VictoryLine interpolation="cardinal" data={formattedData} />
      <VictoryScatter
        style={{ data: { fill: '#fff', stroke: '#000', strokeWidth: 2 } }}
        size={4}
        data={[formattedData[0], formattedData[formattedData.length - 1]]}
      />
    </VictoryChart>
  );
};

export default Chart;
