import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  ratingArea: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(2),
    alignItems: 'center',
  },
  ratingStyle: {
    ...CommonStyles.tpp_s5,
    color: color.BLACK,
    alignSelf: 'center',
  },
  touchableArea: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
  },
  reviewSection: {
    marginLeft: moderateScale(4),
    flexDirection: 'row',
  },
  reviewCount: {
    ...CommonStyles.tpp_s1,
    alignSelf: 'center',
  },
});
