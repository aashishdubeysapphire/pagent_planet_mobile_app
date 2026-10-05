import { Dimensions, StyleSheet } from 'react-native';
import { color } from '../../../../assets/colorConstant';
import { CommonStyles } from '../../../../assets/commonStyles';
import { font } from '../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
  },

  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },

  paginationDotActive: {
    backgroundColor: color.P_PINK,
    width: 10,
    height: 10,
  },
  likeRow: {
    position: 'absolute',
    width: moderateScale(67),
    height: moderateScaleVertical(30),
    backgroundColor: color.P_GRAY_BLACK_1,
    opacity: 0.9,
    borderRadius: 18,
    right: moderateScale(16),
    top: moderateScaleVertical(16),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(8),
  },
  likeCount: {
    ...CommonStyles.tpp_s1,
    marginLeft: moderateScale(4),
    color: color.WHITE,
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
  colorRow: { flexDirection: 'row', marginBottom: moderateScaleVertical(8) },

  productTitle: {
    ...CommonStyles.tpp_s3,
    marginLeft: moderateScale(16),
    width: '70%',
    lineHeight: moderateScaleVertical(22),
    marginBottom: moderateScaleVertical(8),
  },
  sizeName: {
    ...CommonStyles.tpp_h5,
  },
  colorText: {
    ...CommonStyles.tpp_s1,
  },
  colorColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  pageantColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  pageantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(25),
    marginRight: moderateScale(35),
  },
  pageantName: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(16),
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(12),
    color: color.P_PINK,
    width: moderateScale(212),
    marginBottom: moderateScaleVertical(4),
  },
  wornAt: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(16),
    marginBottom: moderateScaleVertical(4),
    lineHeight: moderateScaleVertical(18),
    fontSize: textScale(12),
  },
  colorRound: {
    borderRadius: moderateScale(100),
    width: moderateScale(24),
    backgroundColor: 'red',
    height: moderateScaleVertical(24),
    marginRight: moderateScale(4),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
  smallcolorRound: {
    borderRadius: moderateScale(100),
    width: moderateScale(12),
    backgroundColor: 'red',
    height: moderateScaleVertical(12),
    marginLeft: moderateScale(-3),
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,

    marginTop: moderateScaleVertical(4),
  },
  vary: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    marginTop: moderateScaleVertical(4),
  },
  titleRow: {
    marginTop: moderateScaleVertical(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: moderateScale(16),
  },
  sizeRound: {
    borderRadius: moderateScale(100),
    width: moderateScale(36),
    backgroundColor: color.WHITE,
    height: moderateScaleVertical(36),
    marginRight: moderateScale(4),
    marginTop: moderateScaleVertical(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(16),
  },
  colorList: {
    // marginLeft: moderateScale(16),
  },
  brandTitle: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(9),
  },
  brandTitle1: {
    fontFamily: font.RobotoRegular,
    marginLeft: moderateScale(9),
  },
  imageStyle: {
    marginTop: moderateScaleVertical(24),
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(24),
  },
  color: {
    ...CommonStyles.tpp_h5,
    color: color.P_GRAY_BLACK_1,
    fontSize: textScale(13),
  },

  size: {
    ...CommonStyles.tpp_h5,
    color: color.P_GRAY_BLACK_1,
    fontSize: textScale(13),
  },
  instock: {
    ...CommonStyles.tpp_s2,
    color: color.RED,
  },
  colorsBackground: {
    backgroundColor: color.WHITE,

    height: 'auto',
    paddingLeft: moderateScale(16),
    paddingVertical: moderateScaleVertical(24),
  },
  priceRow: {
    flexDirection: 'row',
  },
  brandrow: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
    marginLeft: moderateScale(16),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
    marginHorizontal: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  minorflaws: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(38),
    marginRight: moderateScale(16),
    marginTop: moderateScaleVertical(8),
    color: color.S_GRAY_4,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    ...CommonStyles.tpp_s3,
    marginLeft: moderateScale(16),
    color: color.S_GRAY_3,
    textDecorationLine: 'line-through',
  },
  price1: {
    ...CommonStyles.tpp_s3,
    marginLeft: moderateScale(16),
    color: color.P_PINK,
  },
  sellingPrice: {
    ...CommonStyles.tpp_s3,
    marginLeft: moderateScale(8),
    color: color.P_PINK,
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
    // backgroundColor: color.S_PINK,
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
    fontWeight: '800',
    width: '80%',
  },
  carouselContainer: {
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(16),
    height: moderateScaleVertical(102),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    alignSelf: 'center',
  },
  paginationContainerStyle: {
    marginTop: moderateScaleVertical(-52),
  },
  viewSimilar: {
    position: 'absolute',
    left: moderateScale(16),
    bottom: moderateScaleVertical(22),
  },
  inactiveDotStyle: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: color.WHITE,
  },
  activeDotStyle: {
    width: moderateScale(20),
    height: moderateScale(6),
    borderRadius: moderateScale(8),
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
    height: moderateScaleVertical(400),
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  eventSection: {
    justifyContent: 'center',
    marginHorizontal: moderateScale(12),
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
  gap: {
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
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
  },
  staticHeight: {
    height: moderateScaleVertical(50),
  },
});
