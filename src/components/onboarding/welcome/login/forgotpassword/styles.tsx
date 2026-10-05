import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  womanstandingImage: {
    marginVertical: moderateScaleVertical(40),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  enterEmailTExt: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  sendinVerificationText: {
    fontFamily: font.LatoRegular,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    color: color.BLACK,
    textAlign: 'center',
    marginEnd: moderateScaleVertical(70),
    marginStart: moderateScaleVertical(70),
    lineHeight: moderateScaleVertical(25),
    marginTop: moderateScaleVertical(4),
    marginBottom: moderateScale(38),
    marginHorizontal: moderateScale(45),
  },
  textInputArea: {
    marginHorizontal: moderateScale(16),
  },
  tpp_next_btn: {
    marginLeft: 'auto',
    marginRight: moderateScale(16),
    marginTop: moderateScaleVertical(88),
  },
  nextbutton: {
    marginLeft: 'auto',
    marginRight: moderateScale(17),
    marginTop: moderateScaleVertical(35),
  },
});
