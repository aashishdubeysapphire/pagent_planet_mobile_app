import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';

export const styles = StyleSheet.create({
  inactiveStyle: {
    ...CommonStyles.tpp_s2,
  },
  activeStyle: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
  },
});
