import { StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../utils/responsiveSize';
import { CommonStyles } from '../../../../../../../../assets/commonStyles';
import { font } from '../../../../../../../../assets/fonts/fontsConstant';
import { color } from '../../../../../../../../assets/colorConstant';
import { isIosDevice } from '../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  headingView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(20),
  },
  crossIcon: {
    marginLeft: 'auto',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginTop: 'auto',
  },
  bottomContainer: {
    height: moderateScale(99),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    elevation: 2,
    borderColor: color.GREY_WITH_OPACITY,
    borderWidth: isIosDevice() ? 2 : 0,
  },
  addTicketContainer: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(16),
    justifyContent: 'space-between',
    flex: 1,
  },
  addedTextContainer: {
    marginTop: moderateScaleVertical(19),
  },
  ticketText: {
    color: color.P_PINK,
    fontFamily: font.RobotoMedium,
    fontSize: textScale(16),
    fontWeight: '500',
    lineHeight: moderateScaleVertical(22),
    textTransform: 'capitalize',
  },
  addedText: {
    color: color.BLACK,
    fontFamily: font.RobotoMedium,
    textTransform: 'capitalize',
    fontSize: textScale(12),
    lineHeight: moderateScaleVertical(16),
    fontWeight: '500',
  },
  goToCartButton: {
    width: moderateScale(163.5),
    height: moderateScaleVertical(48),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    backgroundColor: color.P_PINK,
    marginTop: moderateScaleVertical(16),
  },
  goToCartText: {
    fontFamily: font.LatoBold,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    color: color.WHITE,
  },
  horizonatalLine: {
    width: moderateScale(150),
    height: moderateScale(5),
    borderRadius: moderateScale(5),
    backgroundColor: color.BLACK,
    marginVertical: moderateScaleVertical(10),
    alignSelf: 'center',
  },
  addTicketText: {
    color: color.BLACK,
    fontFamily: font.RobotoMedium,
    fontSize: textScale(16),
    lineHeight: moderateScaleVertical(22),
    textTransform: 'capitalize',
    marginTop: moderateScaleVertical(29),
  },
  PrimePageantsText: {
    color: color.P_PINK,
    fontSize: textScale(16),
    fontFamily: font.RobotoMedium,
    textTransform: 'capitalize',
    marginBottom: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(22),
  },
});
