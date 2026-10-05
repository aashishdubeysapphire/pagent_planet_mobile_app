import { StyleSheet} from 'react-native';
import {
  moderateScaleVertical,
  textScale,
} from '../components/utils/responsiveSize';
import {color} from './colorConstant';
import {font} from './fonts/fontsConstant';
import { isIosDevice } from '../components/utils/helperFunction';

export const CommonStyles = StyleSheet.create({
  tpp_h2: {
    fontFamily: font.LatoBold,
    fontSize: isIosDevice() ? textScale(17) : textScale(18),
    color: color.WHITE,
    lineHeight: moderateScaleVertical(24),
  },
  tpp_p2: {
    fontFamily: font.RobotoRegular,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    color: color.WHITE,
  },
  tpp_p2_large: {
    fontFamily: font.RobotoRegular,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.WHITE,
  },
  latoBoldWhite14: {
    fontFamily: font.LatoBold,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    color: color.WHITE,
  },
  latoBoldWhite12: {
    fontFamily: font.LatoBold,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.WHITE,
  },

  latoBoldPink14: {
    fontFamily: font.LatoRegular,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    color: color.P_PINK,
  },
  latoRegular12: {
    fontFamily: font.LatoRegular,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.P_PINK,
  },
  latoRegularPink16: {
    fontFamily: font.LatoRegular,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.P_PINK,
  },
  latoBoldPink16: {
    fontFamily: font.LatoBold,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.P_PINK,
  },
  latoBoldBlack12: {
    fontFamily: font.LatoBold,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
  },
  tpp_h4: {
    fontFamily: font.RobotoRegular,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.BLACK,
  },
  tpp_size18: {
    fontFamily: font.LatoRegular,
    fontSize: isIosDevice() ? textScale(17) : textScale(18),
    color: color.BLACK,
  },
  tpp_h5: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.INPUT_TEXT,
  },
  tpp_h6: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.INPUT_TEXT,
  },
  tpp_h3: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(17) : textScale(18),
    color: color.BLACK,
  },
  tpp_p3: {
    fontFamily: font.RobotoRegular,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
  },
  tpp_p4: {
    fontFamily: font.RobotoRegular,
    fontSize: isIosDevice() ? textScale(9) : textScale(10),
    color: color.INPUT_TEXT,
  },
  lotoBold16: {
    fontFamily: font.LatoBold,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.BLACK,
  },
  latoSemiBold16: {
    fontFamily: font.LatoSemiBold,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.BLACK,
  },
  latoSemiBold12: {
    fontFamily: font.LatoSemiBold,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.P_PINK,
  },
  robotoMedium16: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.BLACK,
  },
  robotoMedium14: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    color: color.BLACK,
    fontWeight: '500',
  },
  tpp_s1: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(9) : textScale(10),
    color: color.S_GRAY_4,
  },
  tpp_s2: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.INPUT_TEXT,
  },
  tpp_s5: {
    fontFamily: font.RobotoRegular,
    fontSize: isIosDevice() ? textScale(7) : textScale(8),
    color: color.INPUT_TEXT,
    fontWeight: '400',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tpp_s3: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(15) : textScale(16),
    color: color.INPUT_TEXT,
  },
  capitalizedCase: {
    textTransform: 'capitalize',
  },
});
