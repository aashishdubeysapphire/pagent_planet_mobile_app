import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    marginHorizontal: moderateScale(16),
  },
  pinkHeading: {
    ...CommonStyles.tpp_h2,
    color: color.P_PINK,
    textAlign: 'center',
    marginTop: moderateScaleVertical(100),
    lineHeight: moderateScaleVertical(24)
  },
  subHeading: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
  },
  celebrationImage: {
    marginTop: moderateScaleVertical(40),
    marginBottom: moderateScaleVertical(80),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  boostProfileText: {
    ...CommonStyles.tpp_h2,
    textAlign: 'center',
    color: color.BLACK,
    marginBottom: moderateScaleVertical(56),
    lineHeight: moderateScaleVertical(24)
  },
  borderButtonText: {
    color: color.P_PINK,
    fontWeight: 'bold',
    fontSize: textScale(18),
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(24),
  },
  buttonView: {
    height: moderateScaleVertical(60),
  },
});
