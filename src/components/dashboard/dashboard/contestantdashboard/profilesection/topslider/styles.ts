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
  wrapper: {
    marginTop: moderateScaleVertical(16),
    marginLeft: moderateScale(16),
    height: moderateScaleVertical(80 + 16),
    paddingBottom: moderateScaleVertical(16),
  },
  container: {
    marginRight: moderateScale(12),
    width: moderateScale(80),
    height: moderateScaleVertical(80),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTitle: {
    ...CommonStyles.latoBoldBlack12,
    color: color.S_GRAY_4,
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
  },
  activeTitle: {
    ...CommonStyles.latoBoldBlack12,
    color: color.WHITE,
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
  },
  arrowIconStyles: {
    position: 'absolute',
    top: '86%',
    left: '30%',
  },
  comingSoonTextStyles: {
    fontFamily: font.LatoMedium,
    color: color.INPUT_TEXT,
    fontSize: textScale(8.5),
    lineHeight: moderateScaleVertical(10),
    top: moderateScaleVertical(-12),
  },
});
