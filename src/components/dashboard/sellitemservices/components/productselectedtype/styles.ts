import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabelTitle: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
  },
  colorRow: {
    flexDirection: 'row',
  },
  colorName: {
    fontWeight: '400',
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    fontFamily: font.RobotoRegular,
    lineHeight: moderateScaleVertical(16),
  },
  categoryLabel: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(16),
    fontWeight: '400',
  },
  categoryInfo: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(4),
    fontWeight: 'normal',
  },
  colorCircle: {
    borderRadius: moderateScale(7),
    marginEnd: moderateScale(4),
    width: moderateScale(14),
    height: moderateScale(14),
    shadowColor: color.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  colorSection: {
    marginLeft: moderateScale(3),
    flex: 1,
  },
});
