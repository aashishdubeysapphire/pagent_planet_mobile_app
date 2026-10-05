import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
const Label = ({text, ...restProps}) => (
  <View style={styles.label} {...restProps}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default memo(Label);
