import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: color.RED,
  },
  nameLabel: {
    ...CommonStyles.tpp_s3,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(22),
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScaleVertical(16),
  },
  proileImageContianer: {
    marginTop: moderateScaleVertical(24),
    marginHorizontal: moderateScaleVertical(16),
  },
  separatorLine: {
    height: 1,
    width: '91.5%',
    backgroundColor: color.P_PINK,
    marginStart: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(24),
  },
  gap: {
    marginTop: moderateScaleVertical(10),
  },
  bannerContainer: {
    marginTop: moderateScaleVertical(24),
    margin: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(16),
  },
  qantityContainer: {
    marginTop: moderateScaleVertical(8),
    margin: moderateScaleVertical(16),
  },
  awardWinnerArea: {
    width: '100%',
    height: moderateScaleVertical(107),
  },
  promotionalLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    textTransform: 'capitalize',
    lineHeight : moderateScaleVertical(20),
    textAlign : "center"
  },
  awardWinnerLabel: {
    position: 'absolute',
    width: moderateScaleVertical(150),
    marginLeft: moderateScale(16),
    justifyContent: 'center',
    height: moderateScaleVertical(107),
  },
  totalCountLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(4),
  },
  rowSection: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  priceRow: {
    flexDirection: 'row',
  },
  heading: {
    ...CommonStyles.robotoMedium14,
    color: color.BLACK,
    flex: 1,
    lineHeight: moderateScaleVertical(20),
  },
  totalAmountHeading: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
  },
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },
  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
  },
  realPrice: {
    ...CommonStyles.robotoMedium14,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: color.S_GRAY_4,
    marginEnd: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
  },
  price: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    marginEnd: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
  },
  byPrice: {
    ...CommonStyles.robotoMedium16,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(4),
    lineHeight: moderateScaleVertical(22),
  },
  bottomFilterShadowContainer: {
    height: moderateScaleVertical(82),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.shadow,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  bottomFilterContainer: {
    flexDirection: 'row',
    maxHeight: moderateScaleVertical(80),
    padding: moderateScale(16),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_1,
  },
  amountContainer: {
    flex: 1,
  },
  claimProfileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(16),
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
  claimProfileLabel: {
    ...CommonStyles.latoSemiBold12,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(16),
    marginLeft: moderateScale(8),
  },
  linearGradientStyles:{
    paddingVertical : moderateScaleVertical(24),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(16)
  },
  purchaseLabel:{
    ...CommonStyles.latoBoldWhite14,
    textTransform: 'uppercase',
  },
  buttonStyle: {
    backgroundColor: color.P_PINK,
    borderRadius: 30,
    height: moderateScaleVertical(48),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
