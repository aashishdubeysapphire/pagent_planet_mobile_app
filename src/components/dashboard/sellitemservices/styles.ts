import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  squareContainer:{
    paddingLeft : moderateScale(8),
    paddingTop: moderateScaleVertical(16),
    paddingBottom : moderateScaleVertical(60)
  },
  tabContainer :{
    marginTop: moderateScaleVertical(16)
  }
});
