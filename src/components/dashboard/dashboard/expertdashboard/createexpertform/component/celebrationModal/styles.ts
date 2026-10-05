import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(80),
  },
  pinkHeading: {
    ...CommonStyles.tpp_h2,
    color: color.P_PINK,
    textAlign: 'center',
    marginTop: moderateScaleVertical(100),
    lineHeight: moderateScaleVertical(24),
  },
  subHeading: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(8),
    textAlign: 'center',
    ...CommonStyles.capitalizedCase,
  },
  celebrationImage: {
    marginTop: moderateScaleVertical(40),
    marginBottom: moderateScaleVertical(16),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  boostProfileText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    textAlign: 'center',
    color: color.BLACK,
    lineHeight: moderateScaleVertical(24),
    ...CommonStyles.capitalizedCase,
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(18),
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(24),
  },
  buttonView: {
    height: moderateScaleVertical(60),
  },
  animcontainer: {
    width: '100%',
    position: 'absolute',
    height: '70%',
  },
  pngImage: {
    height: moderateScaleVertical(218),
    width: moderateScale(310),
  },
  addProduct: {
    fontFamily: font.RobotoRegular,
    fontSize: textScale(14),
    textAlign: 'center',
    color: color.BLACK,
    marginBottom: moderateScaleVertical(40),
  },
});
