import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginRight: moderateScale(6),
  },
  container: {
    width: moderateScale(154),
    borderRadius: moderateScale(24),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: moderateScale(12),
    height: moderateScaleVertical(258),
    backgroundColor: color.S_GRAY_1,
  },
  awardSection: {
    backgroundColor: color.P_PINK,
    width: moderateScale(154),
    height: moderateScaleVertical(192),
    borderRadius: moderateScale(24),
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(4),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(17),
    color: color.INPUT_TEXT,
    paddingHorizontal: moderateScale(8),
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    backgroundColor: color.WHITE,
  },
  titleSection: {
    width: moderateScale(160),
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    backgroundColor: 'transparent',
    height: moderateScaleVertical(60),
    justifyContent: 'center',
  },
  editCircleIcon: {
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScaleVertical(10),
  },
  awardLabel: {
    ...CommonStyles.tpp_s1,
    color: color.WHITE,
    paddingHorizontal: moderateScale(12),
    textAlign: 'center',
  },
  icon: {
    width: moderateScale(156),
    height: moderateScaleVertical(148),
    marginTop: moderateScale(8),
  },
  labelView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScaleVertical(40),
  },
});
