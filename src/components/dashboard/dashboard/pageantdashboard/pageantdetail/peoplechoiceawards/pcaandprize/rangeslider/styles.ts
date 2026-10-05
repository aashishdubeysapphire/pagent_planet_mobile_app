import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';
const THUMB_RADIUS = moderateScale(7);

export const styles = StyleSheet.create({
  label: {
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(2),
    paddingHorizontal: moderateScale(8),
    backgroundColor: color.WHITE,
    borderRadius: 4,
    borderWidth: moderateScale(1),
    borderColor: color.P_PINK,
  },
  notch: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: color.P_PINK,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 1,
    borderColor: color.P_PINK,
    backgroundColor: color.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerThumb: {
    width: (THUMB_RADIUS - moderateScale(2.5)) * 2,
    height: (THUMB_RADIUS - moderateScale(2.5)) * 2,
    backgroundColor: color.P_PINK,
    borderRadius: THUMB_RADIUS - 2,
  },

  AgeRangeText: {
    textAlign: 'center',
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    color: color.P_PINK,
    marginBottom: moderateScaleVertical(8),
  },
  rangeSelected: {
    height: moderateScaleVertical(4),
    backgroundColor: color.P_PINK,
    borderRadius: moderateScale(4),
  },
  range: {
    flex: 1,
    height: moderateScaleVertical(4),
    borderRadius: moderateScale(4),
    backgroundColor: color.S_GRAY_2,
  },
  text: {
    fontSize: 16,
    color: color.P_PINK,
  },
});
