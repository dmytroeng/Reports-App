import { ForeignObject, G } from 'react-native-svg';
import { SansText, SansTextFontWeight } from '../StyledText';
import { TextSize, VictoryLabelProps } from 'victory';

import React from 'react';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';

export enum AxisEnum {
  X = 'x',
  Y = 'y',
}

interface Props extends VictoryLabelProps {
  axis?: AxisEnum;
}

const getConfig = (
  tick: string,
  axis: AxisEnum,
  today: Date,
): { tick: string; fontWeight: SansTextFontWeight; color?: string } => {
  switch (axis) {
    case AxisEnum.Y:
      return {
        tick: `${tick}h`,
        fontWeight: 'Regular',
        color: '#727580',
      };
    case AxisEnum.X:
      const isCurrMonth = format(today, 'MMM') === tick;

      return {
        tick,
        fontWeight: isCurrMonth ? 'Bold' : 'Regular',
        color: isCurrMonth ? '#000' : '#727580',
      };
  }
};

const CustomTick: React.FC<Props> = ({ x, y, text, axis = AxisEnum.X }) => {
  const { tick, fontWeight, color } = getConfig(
    text as string,
    axis,
    new Date(),
  );
  const textSize = TextSize.approximateTextSize(tick, styles.tick);

  if (!x || !y) {
    return null;
  }

  return (
    <G x={x - textSize?.width / 2} y={y - textSize?.height / 2}>
      <ForeignObject>
        <SansText style={{ ...styles.tick, color }} fontWeight={fontWeight}>
          {tick}
        </SansText>
      </ForeignObject>
    </G>
  );
};

const styles = StyleSheet.create({
  tick: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
  },
});

export default React.memo(CustomTick);
