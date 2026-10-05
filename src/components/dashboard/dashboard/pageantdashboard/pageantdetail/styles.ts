import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingTop: moderateScaleVertical(16),
  },
  circleImageContainer: {
    position: 'absolute',
    marginTop: moderateScaleVertical(115),
    marginStart: moderateScaleVertical(16),
  },
  tabContainer: {
    marginTop: moderateScaleVertical(-20),
    height:
      isIosDevice()
        ? height * (moderateScaleVertical(85) / 100)
        : height * (moderateScaleVertical(90) / 100),
  },
  eventContainer: {
    height:
      isIosDevice()
        ? height * (moderateScaleVertical(72) / 100)
        : height * (moderateScaleVertical(85) / 100),
  },
  editIconTouch: {
    position: 'absolute',
    bottom: moderateScaleVertical(0),
    right: 0,
    borderRadius: 20,
    padding: moderateScaleVertical(1),
    backgroundColor: color.WHITE,
  },
  coverImage: {
    position: 'absolute',
    top: moderateScaleVertical(16),
    right: moderateScaleVertical(16),
    borderRadius: 20,
    padding: moderateScaleVertical(1),
    backgroundColor: color.WHITE,
  },
  editPageantDetailIcon: {
    alignItems: 'flex-end',
    paddingEnd: moderateScaleVertical(16),
  },
  heading: {
    ...CommonStyles.robotoMedium16,
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(12),
  },
  upgradeSliderContainter: {
    marginTop: moderateScaleVertical(16),
  },

  paginationContainerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: moderateScale(12),
  },
  name: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    lineHeight: moderateScaleVertical(24),
  },
  inactiveDotStyle: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    marginHorizontal: -moderateScale(10),
    backgroundColor: color.S_GRAY_3,
  },
  pageantDetailsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    width: '100%',
    alignItems: 'center',
  },
  activeDotStyle: {
    width: moderateScale(20),
    height: moderateScale(6),
    borderRadius: moderateScale(8),
    marginHorizontal: -moderateScale(4),
    backgroundColor: color.P_PINK,
  },
  otherdetailcontainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(8),
  },
  titleShimmerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(20),
  },
  webSiteShimmerContainer: {
    alignContent: 'center',
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(5),
  },
  upgradePlanHeaderTitle: {
    ...CommonStyles.robotoMedium14,
  },
  upgradePlanSubHeaderTitle: {
    ...CommonStyles.tpp_s2,
  },
  lifetimeParticipantLabel: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
  },
  clickableLink: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
    color: color.P_PINK,
  },
  upgradeButtonContainer: {
    width: moderateScaleVertical(106),
    height: moderateScaleVertical(32),
    paddingBottom: 0,
  },

  eventSection: {
    position: 'absolute',
    justifyContent: 'space-between',
    height: '100%',
    paddingStart: moderateScale(16),
    paddingTop: moderateScale(25),
    paddingEnd: moderateScale(16),
    paddingBottom: moderateScale(25),
  },
  containerBanner: {
    backgroundColor: 'red',
  },
  borderButtonText: {
    color: color.P_PINK,
    fontWeight: 'bold',
  },
  aboutRootContainer: {
    marginBottom: moderateScaleVertical(100),
  },
  aboutContainer: {
    borderColor: color.S_GRAY_2,
    backgroundColor: color.WHITE,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    borderRadius: moderateScaleVertical(24),
    paddingTop: isIosDevice() ? textScale(10) : textScale(-10),
    paddingBottom: isIosDevice() ? textScale(16) : textScale(0),
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    bottom: moderateScale(9),
    marginStart: moderateScale(16),
  },
  error: {
    color: color.RED,
    fontSize: textScale(8),
    marginStart: moderateScaleVertical(2),
    fontFamily: font.RobotoMedium,
  },
  aboutValueText: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
  },
  inactiveMessageStyle: {
    width: '100%',
    marginBottom: moderateScaleVertical(16),
    backgroundColor: color.S_PINK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(16),
  },
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    ...CommonStyles.capitalizedCase
  },
});
