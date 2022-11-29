import { StyleSheet, Text, View } from 'react-native';

import Divider from './layout/Divider';
import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  bgColor?: string;
}

const ScoreCard: React.FC<Props> = ({
  title,
  subtitle,
  bgColor = '#F7FFE2',
}) => {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Divider height={4} />
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 20,
    flex: 1,
    borderRadius: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 16,
    color: '#727580',
  },
});

export default ScoreCard;
