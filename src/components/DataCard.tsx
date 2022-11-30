import { MainText, SansText } from './StyledText';
import { Pressable, StyleSheet, View } from 'react-native';

import Divider from './layout/Divider';
import HeartIcon from './icons/HeartIcon';
import React from 'react';
import Row from './layout/Row';

interface Props {
  onButtonPress?: () => void;
}

const DataCard: React.FC<Props> = ({ onButtonPress }) => {
  return (
    <Row style={styles.container}>
      <HeartIcon />
      <Divider width={10} />
      <View>
        <MainText style={styles.title}>Want more data?</MainText>
        <Divider height={8} />
        <SansText style={styles.subtitle}>
          Press this button to add 1,000 blocks!
        </SansText>
        <Divider height={16} />
        <Pressable style={styles.button} onPress={onButtonPress}>
          <MainText style={styles.buttonText}>Do it!</MainText>
        </Pressable>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F8F9',
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 16,
    color: '#727580',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#D6F781',
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
  },
});

export default DataCard;
