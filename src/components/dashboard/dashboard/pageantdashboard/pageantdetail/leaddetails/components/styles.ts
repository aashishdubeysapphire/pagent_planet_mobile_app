import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  totalAmountText: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
  },
  credits: {
    ...CommonStyles.tpp_s1,
    color: color.BLACK,
  },
  priceView: {
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(-8),
  },
  leadHeaderTitle: {
    ...CommonStyles.tpp_h5,
    flex: 1,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
  },
  leadHeaderCount: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    color: color.P_PINK,
  },
  rowLeadView: {
    marginBottom: moderateScaleVertical(16),
    flexDirection: 'row',
  },
  buttonView: {
    position:'relative',
    width: Dimensions.get('window').width - moderateScale(32),
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(10),
  },
  realPrice: {
    ...CommonStyles.robotoMedium14,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: color.S_GRAY_4,
    marginHorizontal: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
  },
  price: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    marginEnd: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
  },
  divider: {
    backgroundColor: color.P_PINK,
    marginVertical: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(24),
    height: moderateScaleVertical(1),
  },
  row: {
    flexDirection: 'row',
  },
  row1: {
    flexDirection: 'row',
  },
  container1: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
  },
  column: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginLeft: moderateScale(8),
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    flex: 1,
    marginBottom: moderateScaleVertical(10),
    lineHeight: moderateScaleVertical(18),
    color: color.S_GRAY_4,
  },
  noteHeader: {
    ...CommonStyles.tpp_h5,
    lineHeight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(2),
    marginEnd: moderateScaleVertical(4),
    textAlign: 'center',
  },
  rectangle: {
    backgroundColor: color.S_PINK,
    width: Dimensions.get('window').width,
    height: moderateScaleVertical(60),
    borderBottomEndRadius: moderateScale(16),
    borderBottomStartRadius: moderateScale(16),
    flexDirection: 'row',
    paddingVertical: moderateScaleVertical(12),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(43),
    alignItems: 'center',
  },
  line: {
    borderWidth: 0.7,
    borderColor: color.P_PINK,
    height: moderateScaleVertical(24),
  },
  paymentView: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: !isIosDevice()? moderateScaleVertical(16) : 0,
    paddingTop: moderateScaleVertical(16),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.WHITE,
    marginTop: moderateScaleVertical(2),
    flexDirection: 'row',
  },
  sliderContainer: {
    borderRadius: moderateScaleVertical(16),
    alignSelf: 'center',
    marginVertical: moderateScaleVertical(16),
  },
  payNowSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(4),
    alignItems: 'center',
  },
  totalAmountLabel: {
    ...CommonStyles.tpp_p4,
    lineHeight: moderateScaleVertical(14),
    marginLeft: moderateScale(4),
  },
  amountText: {
    ...CommonStyles.tpp_s3,
    color: color.P_PINK,
  },
  claimText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    marginBottom: moderateScaleVertical(16),
  },
  claimText1: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    marginHorizontal: moderateScale(16),
    marginBottom: moderateScaleVertical(16),
  },
  shadowView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.shadow,
    height: 'auto',
  },
  btnView: {
    width: moderateScale(163),
    height: moderateScaleVertical(48),
    marginLeft: 'auto',
    backgroundColor: color.P_PINK,
    borderRadius: 50,
  },
  payNowBtnText: {
    ...CommonStyles.latoBoldWhite14,
    color: color.WHITE,
    textAlign: 'center',
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(10),
  },
  todosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(145),
  },
  loader: {
    height: moderateScaleVertical(100),
    justifyContent: 'center',
    bottom: moderateScaleVertical(50),
  },
  staticSelectedCardLable: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(145),
  },
  cardTouch: {
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(16),
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerview: {
    position: 'absolute',
    top: moderateScaleVertical(219),
    right: moderateScale(16),
    backgroundColor: color.WHITE,
    borderRadius: 12,
    paddingLeft: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
    width: moderateScale(194),
    ...CommonStyles.shadow,
  },

  bagList: {
    marginHorizontal: moderateScale(16),
  },
  noRecordContainer: {
    marginTop: moderateScaleVertical(64),
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  title: {
    ...CommonStyles.tpp_s3,
    lineHeight: moderateScaleVertical(22),
    textAlign: 'left',
  },

  image: {
    width: Dimensions.get('window').width - moderateScale(32),
    height: moderateScaleVertical(138),
    paddingVertical: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
    alignSelf: 'center',
    marginVertical: moderateScaleVertical(16),
  },
  detailRow: {
    flexDirection: 'row',
    lineHeight: moderateScaleVertical(18),
    marginVertical: moderateScaleVertical(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditCount: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(4),
  },
  payNowSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(4),
    alignItems: 'center',
  },
  totalAmountLabel: {
    ...CommonStyles.tpp_p4,
    lineHeight: moderateScaleVertical(14),
    marginLeft: moderateScale(4),
  },
});
