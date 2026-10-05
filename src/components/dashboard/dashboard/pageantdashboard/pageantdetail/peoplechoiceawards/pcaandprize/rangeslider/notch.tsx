import React, {memo} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
const Notch = props => <View style={styles.notch} {...props} />;

export default memo(Notch);
