import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';

export const styles = StyleSheet.create({
  continer: {
    backgroundColor: color.WHITE,
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  whiteView: {
    height: moderateScaleVertical(100),
  },
  heading: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    fontSize: textScale(14),
  },
  marginRight32: {
    marginRight: moderateScale(32),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
  upgradeView: {
    flex: 1,
    marginBottom: moderateScaleVertical(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientView: {
    width: Dimensions.get('window').width - moderateScale(32),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(12),
  },
  purchasePlanTxt: {
    ...CommonStyles.tpp_s2,
    ...CommonStyles.capitalizedCase,
  },

  upgradeText: {
    ...CommonStyles.tpp_p3,
    maxWidth: moderateScale(191),
    lineHeight: moderateScaleVertical(18),
    marginTop: moderateScaleVertical(6),
    marginBottom: moderateScaleVertical(16),
  },
  upgradeFromWeb: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(-8),
    fontFamily: font.RobotoRegular,
  },
});
