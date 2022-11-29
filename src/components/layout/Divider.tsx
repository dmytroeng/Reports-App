import { View, ViewStyle } from 'react-native';

import React from 'react';

interface Props extends ViewStyle {
  width?: number | string;
  height?: number | string;
  flex?: number;
}

const Divider: React.FC<Props> = ({ width, height, flex, ...props }) => {
  if (height && !width) {
    width = '100%';
  }
  if (width && !height) {
    height = '100%';
  }

  return (
    <View style={{ width, height, flex }} {...props} pointerEvents="box-none" />
  );
};

export default Divider;
