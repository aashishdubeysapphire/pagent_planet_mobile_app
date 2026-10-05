import React, {memo} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

const Thumb = () => (
  <View style={styles.thumb}>
    <View style={styles.innerThumb}></View>
  </View>
);

export default memo(Thumb);
