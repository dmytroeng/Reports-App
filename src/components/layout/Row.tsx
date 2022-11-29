import { StyleSheet, View, ViewProps } from 'react-native';

import React from 'react';

const Row: React.FC<ViewProps> = ({ style, children, ...props }) => (
  <View style={[styles.row, style]} {...props} pointerEvents="box-none">
    {children}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});

export default Row;
