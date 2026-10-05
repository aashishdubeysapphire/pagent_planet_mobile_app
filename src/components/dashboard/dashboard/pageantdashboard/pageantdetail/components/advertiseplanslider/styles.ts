import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  carouselContainer: {
    alignSelf: 'center',
    backgroundColor: color.WHITE,
    paddingVertical: moderateScaleVertical(24),
    paddingHorizontal: moderateScaleVertical(16),
    marginHorizontal: moderateScaleVertical(50),
    borderRadius: moderateScaleVertical(16),
    borderWidth: moderateScaleVertical(1),
    borderColor: color.P_PINK,
  },

  containerAbsolute: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: moderateScaleVertical(8),
    left: 0,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: moderateScaleVertical(14),
    marginEnd: moderateScaleVertical(16),
  },
  upgradePlanHeaderTitle: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(24),
  },
  whatgetHeaderTitle: {
    ...CommonStyles.robotoMedium14,
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(12),
    lineHeight: moderateScaleVertical(20),
  },

  upgradePlanPrice: {
    ...CommonStyles.tpp_h2,
    lineHeight: moderateScaleVertical(24),
    marginTop: moderateScaleVertical(8),
    color: color.P_PINK,
  },
  upcomingEventSection: {
    marginStart: moderateScaleVertical(-30),
    paddingVertical: moderateScaleVertical(16),
  },
  activeDotStyle: {
    width: moderateScale(20),
    height: moderateScale(6),
    borderRadius: moderateScale(8),
    marginHorizontal: -moderateScale(4),
    backgroundColor: color.P_PINK,
  },
  upgradeContainerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: moderateScale(12),
  },
  upgradeInactiveDotStyle: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    marginHorizontal: -moderateScale(10),
    backgroundColor: color.S_GRAY_3,
  },
  upgradeInactiveDotWhitwStyle: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    marginHorizontal: -moderateScale(10),
    backgroundColor: color.WHITE,
  },
  name: {
    ...CommonStyles.tpp_size18,
    fontWeight: '600',
    lineHeight: moderateScaleVertical(24),
    marginTop: moderateScale(24),
    marginBottom: moderateScaleVertical(16),
  },
  title: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScale(12),
    marginBottom: moderateScaleVertical(16),
  },
  imageSection: {
    alignItems: 'center',
  },
  mainimage: {
    width: moderateScale(343),
    height: moderateScaleVertical(266),
    marginHorizontal: moderateScaleVertical(16),
  },
  contactUsContainer: {
    width: moderateScale(230),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(24),
    minHeight: moderateScaleVertical(20),
    maxHeight: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(24),
    height: moderateScaleVertical(20),
    marginHorizontal: moderateScaleVertical(16),
  },
});
