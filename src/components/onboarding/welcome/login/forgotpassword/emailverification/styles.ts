import {  StyleSheet } from 'react-native';
import { color } from '../../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../../assets/commonStyles';
import { font } from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  enterEmailText: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScale(4),
  },
  sendinVerificationText: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginEnd: moderateScale(55),
    marginStart: moderateScale(55),
    lineHeight: moderateScaleVertical(20),
    marginHorizontal: moderateScale(20),
    textAlign: 'center',
  },
  emailID: {
    fontFamily: font.RobotoMedium,
    marginBottom: moderateScale(36),
    fontSize: moderateScale(15),
    lineHeight: moderateScale(20),
    textAlign: 'center',
    color: color.INPUT_TEXT,
  },
  roundedTextInput: {
    marginTop: moderateScaleVertical(24),
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    width: moderateScale(34),
    height: moderateScaleVertical(42),
    backgroundColor: color.WHITE,
    paddingTop: 0,
    paddingBottom: 0,
  },
  optView: {
    marginHorizontal: moderateScale(56),
  },
  timer: {
    marginTop: moderateScaleVertical(48),
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(17) : textScale(16),
    color: color.BLACK,
    textAlign: 'center',
  },
  resendCode: {
    marginTop: moderateScaleVertical(48),
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.P_PINK,
    textDecorationColor: color.P_PINK,
    textAlign: 'center',
  },
  sumbitButtonStyle: {
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(70),
  },
  verificationText: {
    ...CommonStyles.tpp_p2,
    color: color.P_PINK,
    textAlign: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  verificationView: {
    backgroundColor: color.S_PINK,
    marginTop: moderateScaleVertical(1),
  },
});
