import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  modalStyle: {
    height: 'auto',
    marginTop: 70,
    backgroundColor: color.WHITE,
    padding: moderateScale(16),
    borderTopRightRadius: moderateScaleVertical(20),
    borderTopLeftRadius: moderateScaleVertical(20),
  },
  heading: {
    ...CommonStyles.tpp_h3,
    marginRight: 'auto',
    marginBottom: moderateScaleVertical(26),
  },
  rowView: {
    flexDirection: 'row',
  },
  productName: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    marginRight: 'auto',
    marginBottom: moderateScaleVertical(12),
    // backgroundColor: 'red',
    width: '80%',
  },
  price: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
  },
  line: {
    height: 1,
    backgroundColor: color.S_GRAY_2,
    marginBottom: moderateScaleVertical(12),
  },
  greenColor: {
    color: color.UPCOMING,
  },
  grandTotal: {
    ...CommonStyles.tpp_s3,
    color: color.INPUT_TEXT,
    marginBottom: moderateScaleVertical(24),
  },
  pinkColor: {
    color: color.P_PINK,
    marginLeft: 'auto',
  },
});
