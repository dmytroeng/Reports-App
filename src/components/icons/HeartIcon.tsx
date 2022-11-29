import * as React from 'react';

import Svg, { Path, Rect } from 'react-native-svg';

const HeartIcon = ({
  width = 73,
  height = 86,
  fill = '#D1C8FF',
}: React.SVGProps<SVGSVGElement>) => (
  <Svg width={width} height={height} fill="none">
    <Path
      d="M6.257 43.902a19.186 19.186 0 0 1-4.216-6.177 19.314 19.314 0 0 1-.171-14.702 19.197 19.197 0 0 1 4.07-6.273 18.987 18.987 0 0 1 13.43-5.749c2.503-.02 4.988.46 7.307 1.408a19.06 19.06 0 0 1 6.214 4.122l.265.268 3.656 3.684 3.575-3.684a18.978 18.978 0 0 1 13.491-5.757 18.922 18.922 0 0 1 7.335 1.441 18.969 18.969 0 0 1 6.216 4.174A19.224 19.224 0 0 1 73 30.311a19.31 19.31 0 0 1-1.503 7.371 19.234 19.234 0 0 1-4.209 6.22L36.975 74.438 6.257 43.902Z"
      fill={fill}
    />
    <Rect x={41} y={39.771} width={32} height={32} rx={10} fill="#D6F781" />
    <Path
      d="M54.5 64.104h5c4.167 0 5.833-1.666 5.833-5.833v-5c0-4.167-1.666-5.833-5.833-5.833h-5c-4.167 0-5.833 1.666-5.833 5.833v5c0 4.167 1.666 5.833 5.833 5.833Z"
      stroke="#232428"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M52.833 52.646a2.153 2.153 0 0 0 3.034 0M58.133 52.646a2.153 2.153 0 0 0 3.034 0M54 56.604h6c.417 0 .75.334.75.75a3.745 3.745 0 0 1-3.75 3.75 3.745 3.745 0 0 1-3.75-3.75c0-.416.333-.75.75-.75Z"
      stroke="#232428"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MemoHeartIcon = React.memo(HeartIcon);

export default MemoHeartIcon;
