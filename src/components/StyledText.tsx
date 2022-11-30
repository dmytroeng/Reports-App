import { Text, TextProps } from 'react-native';

import React from 'react';

interface MainTextProps extends Omit<TextProps, 'fontWeight'> {
  fontWeight?: 'SemiBold' | 'Bold';
}

interface SansTextProps extends Omit<TextProps, 'fontWeight'> {
  fontWeight?: 'Regular' | 'Bold';
}

export const MainText: React.FC<MainTextProps> = ({
  fontWeight = 'Bold',
  ...props
}) => (
  <Text
    {...props}
    style={[{ fontFamily: `Sora-${fontWeight}` }, props.style]}
  />
);

export const SansText: React.FC<SansTextProps> = ({
  fontWeight = 'Regular',
  ...props
}) => (
  <Text
    {...props}
    style={[{ fontFamily: `DMSans-${fontWeight}` }, props.style]}
  />
);
