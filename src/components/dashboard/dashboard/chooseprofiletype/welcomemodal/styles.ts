import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(30),
  },
  container: {
    width: moderateScale(327),
    height: moderateScaleVertical(365),
    alignItems: 'center',
    paddingTop: moderateScaleVertical(45),
  },
  containerWithOutStatciHeight: {
    width: moderateScale(327),
    alignItems: 'center',
    paddingTop: moderateScaleVertical(45),
  },
  headerLabel: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(5),
    lineHeight: moderateScaleVertical(24),
  },
  textLabel: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
  },
  textLabel1: {
    ...CommonStyles.tpp_p3,
    color: color.BLACK,
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(32),
    textAlign: 'center',
    lineHeight: moderateScaleVertical(18),
  },
  buttonStyles: {
    alignItems: 'center',
    paddingTop: moderateScaleVertical(40),
  },
});
