import {  StyleSheet } from 'react-native';
import { color } from '../../../../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../../../../assets/commonStyles';
import { font } from '../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    fontWeight: '800',
    width: '83%',
  },
  container: {
    width: '100%',
    paddingLeft: moderateScale(16),
    paddingVertical: moderateScaleVertical(24),
    backgroundColor: color.S_GRAY_1,
  },

  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
  },
  rowSection: {
    flexDirection: 'row',
  },
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },

  flatlistView: {
    marginTop: moderateScaleVertical(24),
  },
});
