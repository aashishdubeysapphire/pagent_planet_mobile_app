import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';

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
  rectangle: {
    backgroundColor: color.S_PINK,
    width: Dimensions.get('window').width,
    height: moderateScaleVertical(60),
    borderBottomEndRadius: moderateScale(16),
    borderBottomStartRadius: moderateScale(16),
    flexDirection: 'row',
    paddingVertical: moderateScaleVertical(12),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal:moderateScale(43)
  },

  line: {
    borderWidth: 0.7,
    borderColor: color.P_PINK,
    height: moderateScaleVertical(24),
  },
  column: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginLeft: moderateScale(8),
  },
  paymentView: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: !isIosDevice() ? moderateScaleVertical(16) : 0,
    paddingTop: moderateScaleVertical(16),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.WHITE,
    marginTop: moderateScaleVertical(2),
    flexDirection: 'row',
  },
  payNowSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(4),
    alignItems: 'center',
  },
  sliderContainer: {
    borderRadius: moderateScaleVertical(16),
    alignSelf: 'center',
    marginVertical: moderateScaleVertical(16),
  },
  totalAmountLabel: {
    ...CommonStyles.tpp_p4,
    lineHeight: moderateScaleVertical(14),
    marginLeft: moderateScale(4),
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
  amountText: {
    ...CommonStyles.tpp_s3,
    color: color.P_PINK,
  },
  claimText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    marginBottom: moderateScaleVertical(16),
  },
  btnView: {
    width: moderateScale(163),
    height: moderateScaleVertical(48),
    marginLeft: 'auto',
    backgroundColor: color.P_PINK,
    borderRadius: 50,
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
    fontSize:textScale(14),
    marginTop: moderateScaleVertical(4),
  },
  filterAppliedCircleContainer: {
    height: moderateScaleVertical(6),
    aspectRatio:1,
    marginTop:"auto",
    marginBottom:"auto",
    borderRadius:100,
    marginRight:2,
    backgroundColor: color.P_PINK,
  },
});
