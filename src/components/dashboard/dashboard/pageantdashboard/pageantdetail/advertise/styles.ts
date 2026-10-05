import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginEnd: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(150),
  },
  front: {
    marginStart: moderateScaleVertical(-32),
    marginTop: moderateScaleVertical(16),
  },
  flipContainer: {
    width: width - moderateScaleVertical(32),
    maxHeight: moderateScaleVertical(162),
    minHeight: moderateScaleVertical(162),
    borderRadius: moderateScaleVertical(22),
    marginStart: moderateScaleVertical(-32),
    marginBottom: moderateScaleVertical(3),
    justifyContent: 'center',
    marginTop: moderateScaleVertical(16),
    borderWidth: moderateScaleVertical(1.5),
    borderColor: color.P_PINK,
  },
  cardBackContainer: {
    flexDirection: 'row',
    marginStart: moderateScaleVertical(-2),
  },
  tpp_see_prep_timeline_illustration_ICON: {
    height: moderateScaleVertical(162),
    marginStart: moderateScaleVertical(-2),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderBottomLeftRadius: moderateScaleVertical(20),
    resizeMode: 'cover',
  },

  cardBackDetailContainer: {
    flex: 1,
    marginStart: moderateScaleVertical(16),
  },
  cardBackContainer1: {
    flex: 1,
    marginLeft: moderateScaleVertical(32),
  },
  cardContainer: {
    maxHeight: moderateScaleVertical(162),
    width: '100%',
    marginBottom: moderateScaleVertical(50),
    alignSelf: 'center',
  },
  priceBordrContainer: {
    position: 'absolute',
    marginStart: moderateScaleVertical(40),
  },
  containerAbsolute: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: moderateScaleVertical(8),
    left: 0,
  },
  infoWhite: {
    position: 'absolute',
    bottom: moderateScaleVertical(16),
    right: moderateScaleVertical(16),
  },
  pointersText: {
    ...CommonStyles.tpp_p3,
    marginBottom: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(18),
    color: color.INPUT_TEXT,
    maxWidth: '90%',
  },
  filledRatingIcon: {
    width: moderateScale(10),
    height: moderateScaleVertical(7),
    marginRight: moderateScale(8),
    marginTop: moderateScaleVertical(6),
  },
  rowView: {
    flexDirection: 'row',
  },
  rowViewAllginRight: {
    position: 'absolute',
    flexDirection: 'row',
    right: moderateScale(12),
    bottom: moderateScaleVertical(12),
  },
  upgradePlanHeaderTitle: {
    ...CommonStyles.tpp_size18,
    fontWeight: '700',
    lineHeight: moderateScaleVertical(24),
  },
  whatgetHeaderTitle: {
    ...CommonStyles.robotoMedium14,
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(12),
    lineHeight: moderateScaleVertical(20),
  },
  cardTitle: {
    ...CommonStyles.tpp_s3,
    marginTop: moderateScaleVertical(12),
    marginBottom: moderateScaleVertical(4),
    lineHeight: moderateScaleVertical(22),
  },
  cardTitleBenefit: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    color: color.S_GRAY_4,
  },
  cardTitleBenefitLead: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    color: color.P_PINK,
  },
  cardTitlePerMonth: {
    ...CommonStyles.tpp_s3,
    textAlign: 'center',
    marginTop: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(22),
    color: color.P_PINK,
  },
  cardTitlePerMonthTitle: {
    ...CommonStyles.tpp_s5,
    textAlign: 'center',
    marginTop: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(10),
    color: color.INPUT_TEXT,
  },
  cardTransaction: {
    ...CommonStyles.tpp_s1,
    alignSelf: 'center',
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(2),
    lineHeight: moderateScaleVertical(12),
    color: color.BLACK,
  },
  cardTransactionNumber: {
    ...CommonStyles.tpp_p4,
    alignSelf: 'center',
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(2),
    lineHeight: moderateScaleVertical(12),
    color: color.BLACK,
  },
  cardCancelPlan: {
    ...CommonStyles.latoBoldBlack12,
    lineHeight: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(12),
    color: color.P_PINK,
  },

  validTill: {
    ...CommonStyles.tpp_s1,
    alignSelf: 'center',
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(2),
    lineHeight: moderateScaleVertical(12),
    color: color.BLACK,
  },
  validTillDate: {
    ...CommonStyles.robotoMedium14,
    textAlign: 'center',
    alignSelf: 'center',
    minWidth: moderateScaleVertical(75),
    maxWidth: moderateScaleVertical(75),
    lineHeight: moderateScaleVertical(18),
    color: color.P_PINK,
  },

  name: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(24),
    marginTop: moderateScale(12),
    marginBottom: moderateScaleVertical(16),
  },
  title: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(10),
    marginTop: moderateScale(-16),
  },
  allPlantitle: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScale(10),
  },
  imageSection: {
    alignItems: 'center',
  },

  contactUsContainer: {
    width: moderateScale(230),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(24),
    minHeight: moderateScaleVertical(20),
    maxHeight: moderateScaleVertical(20),
    height: moderateScaleVertical(20),
    marginHorizontal: moderateScaleVertical(16),
  },
});
