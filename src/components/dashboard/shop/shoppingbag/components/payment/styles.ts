import { StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import { font } from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
  },
  paddingContiner: {
    padding: moderateScale(16),
    backgroundColor: color.WHITE,
  },
  paymentText: {
    ...CommonStyles.tpp_s3,
  },
  seperator: {
    height: moderateScaleVertical(12),
    backgroundColor: color.S_GRAY_1,
  },
  CREDIT_CARDText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    marginBottom: moderateScaleVertical(4),
  },
  headingView: {
    marginLeft: moderateScale(8),
  },
  arrowIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  textInputView: {
    paddingHorizontal: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
  dynamicWidth: {
    width: '200%',
    marginRight: 'auto',
  },
  dynamicWidth2: {
    width: '48%',
    marginLeft: 'auto',
  },
  spaceBtw: {
    width: moderateScale(15),
  },
  splitSubHeading: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    ...CommonStyles.capitalizedCase,
    width: moderateScale(290),
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(16),
    ...CommonStyles.capitalizedCase,
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    ...CommonStyles.capitalizedCase,
  },
  pinkNote: {
    marginTop: moderateScaleVertical(16),
    marginRight: moderateScale(32),
    lineHeight: 18,
  },
  pinkView: {
    padding: moderateScale(16),
    backgroundColor: color.S_PINK,
  },
  whiteView: {
    backgroundColor: color.WHITE,
    height: moderateScaleVertical(16),
  },
  pnkViewSeperator: {
    height: 1,
    backgroundColor: color.S_GRAY_3,
    marginVertical: moderateScaleVertical(12),
  },
  freeIns: {
    ...CommonStyles.tpp_s3,
    color: color.INPUT_TEXT,
  },
  totalAmount: {
    ...CommonStyles.tpp_h5,
    color: color.INPUT_TEXT,
    fontSize: textScale(14),
  },
  totalPrice: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    fontSize: textScale(14),
    marginLeft: 'auto',
  },
  timeIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  instalmentText: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    marginLeft: moderateScale(8),
  },
  price: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    marginLeft: 'auto',
  },
  mainView: {
    flexGrow: 1,
    height: '90%',
    backgroundColor: color.S_GRAY_1
  },
  scrollView: {
    flex: 1,
  },
  totalAmountText: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
  },
  paymentView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: moderateScaleVertical(99),
    backgroundColor: color.WHITE,
    marginTop: moderateScaleVertical(0),
    flexDirection: 'row',
  },
  shadowView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.shadow,
    height: moderateScaleVertical(100),
  },
  amountText: {
    ...CommonStyles.tpp_s3,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(4),
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
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  extraheight: {
    height: 50,
  },
  knowMore: {
    ...CommonStyles.latoBoldWhite14,
    color: color.P_PINK,
    fontSize: textScale(10),
    marginLeft: moderateScale(8),
    ...CommonStyles.capitalizedCase,
  },
  tickIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  addresText: {
    ...CommonStyles.latoSemiBold16,
    ...CommonStyles.capitalizedCase,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    marginLeft: moderateScale(8),
    color: color.P_GRAY_BLACK_1,
  },
  unselectedTickText: {
    color: color.S_GRAY_4,
  },
  mar16: {
    margin: moderateScaleVertical(16),
  },
  T_C: {
    ...CommonStyles.latoBoldPink14,
    fontFamily:font.LatoBold,
    color: color.P_PINK,
  },
});
