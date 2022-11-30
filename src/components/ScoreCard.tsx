import { MainText, SansText } from './StyledText';
import { StyleSheet, View } from 'react-native';

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
      <MainText fontWeight="SemiBold" style={styles.title}>
        {title}
      </MainText>
      <Divider height={4} />
      <SansText style={styles.subtitle}>{subtitle}</SansText>
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
    fontSize: 20,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 16,
    color: '#727580',
  },
});

export default ScoreCard;
