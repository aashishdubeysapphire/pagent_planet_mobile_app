import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  wrapper: {
    marginLeft: moderateScale(11.5),
    marginBottom: moderateScaleVertical(16),
  },
  selectedHeaderView: {
    borderRadius: moderateScale(30),
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(5),
    paddingVertical: moderateScaleVertical(17),
    paddingHorizontal: moderateScale(24),
    backgroundColor: color.P_PINK,
  },
  selectedHeadingText: {
    ...CommonStyles.latoBoldWhite14,
    textAlign: 'center',
    fontFamily: font.LatoBold,
  },
});
