import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  dateNotSure: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(-8),
  },
  notVisibleText: {
    ...CommonStyles.tpp_p3,
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(-8),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  bottmHeigt: {
    height: moderateScaleVertical(72),
  },
  opacity: {
    opacity: 0.5,
  },
  inactiveMessageStyle: {
    width: '100%',
    backgroundColor: color.S_PINK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    textAlign: 'center',
    paddingVertical: moderateScaleVertical(10),
    lineHeight: 20,
  },
  errorText: {
    color: color.INPUT_TEXT,
    marginBottom: moderateScaleVertical(8),
    fontFamily: font.RobotoRegular,
    fontSize: textScale(11),
  },
});
