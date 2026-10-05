import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  inputContainer: {
    marginTop: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
    paddingBottom: 100,
  },
  tagPageantSection: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tagPageantText: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    marginLeft: moderateScale(8),
  },
  bottomHeight: {
    height: moderateScaleVertical(132 + 16),
  },
  linkHeader: {
    marginBottom: moderateScaleVertical(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkHeaderLabel: {
    lineHeight: moderateScaleVertical(20),
    ...CommonStyles.robotoMedium14,
  },
});
