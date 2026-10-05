import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  buttonView: {
    width: moderateScale(106),
    height: moderateScaleVertical(32),
  },
  upgradeView: {
    flex: 1,
    marginBottom: moderateScaleVertical(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientView: {
    width: Dimensions.get('window').width - moderateScale(32),
    height: moderateScaleVertical(151),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(12),
  },
  upgradeText: {
    ...CommonStyles.tpp_p3,
    maxWidth: moderateScale(191),
    marginVertical: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(18),
    fontSize: textScale(10),
  },
  mainView: {
    marginTop: moderateScaleVertical(18),
  },
  borderButtonText: {
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(11),
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
  },
  heightTouchLine: {
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(-8),
    color: color.P_PINK,
    marginBottom: moderateScaleVertical(16),
  },
  notVisible: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(-8),
    fontFamily: font.RobotoRegular,
  },
  opaceView: {
    opacity: 0.5,
  },
});
