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
    flex: 1,
    backgroundColor: color.WHITE,
  },
  innerView: {
    paddingHorizontal: moderateScale(16),
  },
  innerViewpaddingTop: {
    paddingTop: moderateScaleVertical(16),
  },
  underline: {
    height: 0.7,
    backgroundColor: color.BLACK,
    opacity: 0.2,
    marginBottom: moderateScaleVertical(24),
    marginTop: moderateScale(8),
  },
  notVisible: {
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(-20),
    marginBottom: moderateScaleVertical(20),
    fontFamily: font.RobotoMedium,
    fontSize: textScale(11),
  },
  bottomView: {
    height: moderateScaleVertical(170),
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
    paddingHorizontal: moderateScaleVertical(16),
  },
});
