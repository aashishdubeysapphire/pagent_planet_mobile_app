import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    zIndex: 1000,
    marginEnd: moderateScaleVertical(2),
    height: moderateScaleVertical(55),
    paddingHorizontal: moderateScale(7),
  },
  rightIcons: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  redCircle: {
    backgroundColor: color.P_PINK,
    width: moderateScaleVertical(17),
    justifyContent: 'center',
    position: 'absolute',
    top: moderateScaleVertical(-8),
    right: moderateScaleVertical(-8),
    height: moderateScaleVertical(17),
    borderRadius: moderateScaleVertical(14),
  },
  redSmallCircle: {
    backgroundColor: color.P_PINK,
    width: moderateScaleVertical(8),
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: moderateScaleVertical(1),
    right: moderateScaleVertical(0),
    height: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(14),
  },
  redCircleText: {
    ...CommonStyles.tpp_s5,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(1),
    color: color.WHITE,
  },
});
