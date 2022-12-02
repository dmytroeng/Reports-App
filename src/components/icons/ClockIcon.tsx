import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ClockIcon = ({
  width = 24,
  height = 24,
  stroke = '#689100',
}: React.SVGProps<SVGSVGElement>) => (
  <Svg width={width} height={height} fill="none">
    <Path
      d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m15.71 15.18-3.1-1.85c-.54-.32-.98-1.09-.98-1.72v-4.1"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MemoClockIcon = React.memo(ClockIcon);

export default MemoClockIcon;
