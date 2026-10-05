import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    padding: moderateScale(16),
    backgroundColor: color.WHITE,
  },
  heading: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
  },
  amount: {
    ...CommonStyles.tpp_s3,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(4),
  },
  rowView: {
    flexDirection: 'row',
  },
  breakupText: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  paymentType: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    marginLeft: moderateScale(12),
  },
  paymentTypeView: {
    marginTop: moderateScaleVertical(16),
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
  line: {
    height: 1,
    backgroundColor: color.S_GRAY_3,
  },
  amountDueText: {
    ...CommonStyles.tpp_h5,
    color: color.P_GRAY_BLACK_1,
    marginVertical: moderateScaleVertical(12),
    fontSize: textScale(14),
  },
  pinkDigit: {
    marginLeft: 'auto',
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    marginVertical: moderateScaleVertical(12),
    fontSize: textScale(14),
  },
});
