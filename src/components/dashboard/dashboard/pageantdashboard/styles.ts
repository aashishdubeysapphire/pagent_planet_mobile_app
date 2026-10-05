import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  toggleContainer: {
    marginTop: moderateScaleVertical(17),
    marginHorizontal: moderateScale(16),
    height: moderateScaleVertical(60),
    flexDirection: 'row',
    borderRadius: 30,
    borderColor: color.S_GRAY_E1,
    borderWidth: 1,
    backgroundColor: color.HEADER_GRAY,
  },
  activeButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.P_PINK,
    width: '50%',
    borderRadius: 30,
  },
  inActiveButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  activeLabelStyles: {
    ...CommonStyles.latoBoldWhite14,
  },
  inActiveLabelStyles: {
    ...CommonStyles.latoBoldWhite14,
    color: color.BLACK,
  },
  upcomingEventSection: {
    width: '100%',
    backgroundColor: color.S_PINK,
    marginTop: moderateScaleVertical(16),
    paddingVertical: moderateScaleVertical(16),
  },
  upcomingEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(16),
    alignItems: 'center',
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '80%',
  },
  carouselContainer: {
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(16),
    height: moderateScaleVertical(102),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    alignSelf: 'center',
  },
  staticHeight: {
    height: moderateScaleVertical(50),
  },
  paginationContainerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
  },
  inactiveDotStyle: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    marginHorizontal: -moderateScale(10),
    backgroundColor: color.S_GRAY_3,
  },
  activeDotStyle: {
    width: moderateScale(20),
    height: moderateScale(6),
    borderRadius: moderateScale(8),
    marginHorizontal: -moderateScale(4),
    backgroundColor: color.P_PINK,
  },
  ratingArea: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(9),
    alignItems: 'center',
  },
  eventNameLabel: {
    ...CommonStyles.robotoMedium14,
    width: moderateScale(190),
  },
  lifetimeParticipantLabel: {
    ...CommonStyles.tpp_s1,
    marginLeft: moderateScale(4),
  },
  eventImageArea: {
    aspectRatio: 1,
    height: moderateScaleVertical(102),
    overflow: 'hidden',
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -0.5,
    marginLeft: -moderateScale(2),
  },

  scrollableContainer: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(18),
  },
  space: {
    marginStart: moderateScaleVertical(16),
  },
  inactiveMessageStyle: {
    width: '100%',
    backgroundColor: color.S_PINK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(16),
  },
  eventSection: {
    justifyContent: 'center',
    marginHorizontal: moderateScale(12),
  },
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
  },
});
