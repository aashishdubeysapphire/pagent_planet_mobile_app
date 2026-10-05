import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  chipClickableContainer: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingStart: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
  },
  circleImageContainer: {
    position: 'absolute',
    left: 0,
    marginTop: moderateScaleVertical(1),
    marginStart: moderateScaleVertical(-0.8),
  },
  whiteClickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.WHITE,
  },
  inactiveClickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingLeft: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_2,
  },
  inactive: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_2,
  },
  awardName: {
    ...CommonStyles.tpp_p3,
  },
  imageAvaialbeName: {
    ...CommonStyles.tpp_p3,
    marginStart: moderateScale(30),
  },

  uploadImageInnerVIew: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginEnd: moderateScaleVertical(8),
    marginStart: moderateScaleVertical(8),
  },
});
