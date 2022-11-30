import { Text, TextProps } from 'react-native';

import React from 'react';

export type MainTextFontWeight = 'SemiBold' | 'Bold';
export type SansTextFontWeight = 'Regular' | 'Bold';

interface MainTextProps extends Omit<TextProps, 'fontWeight'> {
  fontWeight?: MainTextFontWeight;
}

interface SansTextProps extends Omit<TextProps, 'fontWeight'> {
  fontWeight?: SansTextFontWeight;
}

export const MainText: React.FC<MainTextProps> = ({
  fontWeight = 'Bold',
  ...props
}) => (
  <Text
    {...props}
    style={[props.style, { fontFamily: `Sora-${fontWeight}` }]}
  />
);

export const SansText: React.FC<SansTextProps> = ({
  fontWeight = 'Regular',
  ...props
}) => (
  <Text
    {...props}
    style={[props.style, { fontFamily: `DMSans-${fontWeight}` }]}
  />
);
