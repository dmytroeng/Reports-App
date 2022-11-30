import CustomTick, { AxisEnum } from './CustomTick';
import { INTERVAL, PADDING } from '../../constants';
import React, { useMemo } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import { format, sub } from 'date-fns';
import { getTotal, today } from '../../helpers';

import { ReportsDictionary } from '../../types';
import { useWindowDimensions } from 'react-native';

const CHART_HEIGHT = 150;
const DATA = [
  { x: 2, y: 400 },
  { x: 3, y: 200 },
  { x: 4, y: 300 },
  { x: 5, y: 200 },
];

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

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={width - PADDING * 2}
      height={CHART_HEIGHT}
      padding={{
        top: 10,
        right: 15,
        left: 30,
        bottom: 25,
      }}
      domainPadding={{ x: [20, 0], y: [10, 0] }}>
      <VictoryAxis
        dependentAxis
        tickLabelComponent={<CustomTick axis={AxisEnum.Y} />}
        style={{
          axis: {
            strokeWidth: 0,
          },
          ticks: {
            stroke: 'none',
          },
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
