import { StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  topSection: {
    width: '100%',
    paddingLeft: moderateScale(16),
    paddingVertical: moderateScaleVertical(24),
    backgroundColor: color.S_GRAY_1,
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    // fontWeight: '800',
    width: '83%',
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
  flatlistView: {
    marginLeft: -moderateScale(16),
    marginTop: moderateScaleVertical(24),
  },
  locationSection: {
    marginTop: moderateScaleVertical(16),
    flexDirection: 'row',
  },
  locationLabel: {
    ...CommonStyles.tpp_p3,
    fontWeight: '400',
    color: color.INPUT_TEXT,
    marginLeft: moderateScale(8),
    marginTop: -moderateScaleVertical(1.5),
  },

  headerSection: {
    position: 'absolute',
    justifyContent: 'space-between',
    height: '100%',
    padding: moderateScale(20),
    paddingVertical: moderateScale(16),
  },
  borderButtonText: {
    ...CommonStyles.latoSemiBold12,
    paddingVertical: moderateScaleVertical(8),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  headerTitle: {
    ...CommonStyles.tpp_s2,
    width: '90%',
    lineHeight: moderateScaleVertical(16),
    color: color.BLACK,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScaleVertical(24),
    borderRadius : moderateScale(20),
    overflow: 'hidden'
  },
  buttonAreaStyles: {
    borderRadius: moderateScaleVertical(30),
    borderColor: color.P_PINK,
    borderWidth: 1,
    marginTop: moderateScaleVertical(16),
    width: moderateScale(142),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyles: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScaleVertical(10),
    textTransform: 'uppercase',
  },
  image: {
    height: moderateScaleVertical(116),
    width: width - moderateScale(32),
  },
  prizeBannerArea: {
    width: width,
    height: moderateScaleVertical(186),
    marginTop: -moderateScaleVertical(20),
  },
  prizeTitle: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    marginRight: moderateScale(10),
    color: color.INPUT_TEXT,
  },
  prizeClosed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScaleVertical(40),
    width: width,
  },
  arrowIcon: {
    transform: [{rotate: '-90deg'}],
  },
  downArrowIcon: {
    transform: [{rotate: '180deg'}],
  },
  shimmerList: {
    marginVertical: moderateScaleVertical(20),
    marginLeft: moderateScale(16),
  },
});
