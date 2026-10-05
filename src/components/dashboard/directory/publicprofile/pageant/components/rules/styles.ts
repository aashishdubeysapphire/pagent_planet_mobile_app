import { StyleSheet } from 'react-native';
import { color } from '../../../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../../../assets/commonStyles';
import { font } from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.WHITE,
    paddingVertical: moderateScaleVertical(24),
    marginTop: moderateScaleVertical(24)
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  headingPublicPage: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
  },
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },
  rowSection: {
    flexDirection: 'row',
    paddingLeft: moderateScale(16),
  },
  flatlistView: {
    marginTop: moderateScaleVertical(24),
  },

  rectangularView: {
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    backgroundColor: color.WHITE,
    borderColor: color.S_GRAY_2,
    height: moderateScaleVertical(126),
    width: moderateScale(320),
    justifyContent: 'center',
  },
  subHeading: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(20),
    fontWeight: '400',
  },
  description: {
    ...CommonStyles.tpp_h4,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(22),
    fontWeight: '400',
    marginTop: moderateScaleVertical(8),
  },
  paginationContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: moderateScale(12),
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
  carouselContainer: {
    height: moderateScaleVertical(135),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonAreaStyles: {
    borderRadius: moderateScaleVertical(30),
    borderColor: color.P_PINK,
    borderWidth: 1,
    position: 'relative',
    marginTop: moderateScaleVertical(16),
  },
});
