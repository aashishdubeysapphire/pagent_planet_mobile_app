import { StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: color.WHITE,
    paddingBottom: moderateScaleVertical(70),
  },
  profileArea: {
    paddingHorizontal: moderateScale(16),
  },
  claimProfileLabel: {
    ...CommonStyles.latoSemiBold12,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(16),
    marginLeft: moderateScale(8),
  },
  claimProfileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(24),
  },
  claimTouchableArea: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(38),
    borderRadius: moderateScale(18),
  },

  awardSection: {
    width: '100%',
    paddingLeft: moderateScale(18),
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
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },
  rowSection: {
    flexDirection: 'row',
  },
  bottomHieght: {
    height: moderateScaleVertical(100),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  shimmerList: {
    marginTop: moderateScaleVertical(20),
  },
});
