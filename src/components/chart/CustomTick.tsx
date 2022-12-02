import { format } from 'date-fns';
import React from 'react';
import { ForeignObject, G } from 'react-native-svg';
import { TextSize, VictoryLabelProps } from 'victory';

import { SansText, SansTextFontWeight } from '../StyledText';

export const TICK_STYLES = {
  fontFamily: 'DMSans-Regular',
  fontSize: 13,
};

type Axis = 'x' | 'y';

interface Props extends VictoryLabelProps {
  axis?: Axis;
}

const getConfig = (
  tick: string,
  axis: Axis,
  today: Date,
): { tick: string; fontWeight: SansTextFontWeight; color?: string } => {
  switch (axis) {
    case 'y':
      return {
        tick: `${tick}h`,
        fontWeight: 'Regular',
        color: '#727580',
      };
    case 'x': {
      const isCurrMonth = format(today, 'MMM') === tick;

      return {
        tick,
        fontWeight: isCurrMonth ? 'Bold' : 'Regular',
        color: isCurrMonth ? '#000' : '#727580',
      };
    }
  }
};

const CustomTick: React.FC<Props> = ({ x, y, text, axis = 'x' }) => {
  const { tick, fontWeight, color } = getConfig(
    text as string,
    axis,
    new Date(),
  );
  const textSize = TextSize.approximateTextSize(tick, TICK_STYLES);

  if (!x || !y) {
    return null;
  }

  return (
    <G x={x - textSize?.width / 2} y={y - textSize?.height / 2}>
      <ForeignObject>
        <SansText style={{ ...TICK_STYLES, color }} fontWeight={fontWeight}>
          {tick}
        </SansText>
      </ForeignObject>
    </G>
  );
};

export default React.memo(CustomTick);
