import { StyleSheet} from 'react-native';
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
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  topSection: {
    width: '100%',
    paddingLeft: moderateScale(18),
    paddingVertical: moderateScaleVertical(24),
    backgroundColor: color.S_GRAY_1,
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  viewButton: {
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
  },
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },
  rowSection: {
    flexDirection: 'row',
  },

  shimmerList: {
    marginLeft: moderateScale(16),
  },

  claimProfileLabel: {
    ...CommonStyles.latoSemiBold12,
    lineHeight: moderateScaleVertical(16),
    marginLeft: moderateScale(8),
    color: color.INPUT_TEXT,
  },
  claimProfileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(22),
  },
  claimTouchableArea: {
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(38),
    borderRadius: moderateScale(18),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
  },
});
