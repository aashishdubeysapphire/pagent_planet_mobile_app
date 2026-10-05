import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContiner: {
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
  },
  bgColor: {
    backgroundColor: color.WHITE,
  },
  bgImage: {
    width: moderateScale(170),
    height: moderateScaleVertical(45),
  },
  orderId: {
    ...CommonStyles.tpp_s2,
    color: color.WHITE,
    marginTop: 'auto',
    marginBottom: 'auto',
    bottom: moderateScaleVertical(3),
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  productName: {
    ...CommonStyles.tpp_s3,
    textAlign: 'center',
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(8),
  },
  colorSize: {
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  heading: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    color: color.P_GRAY_BLACK_1,
    lineHeight: moderateScaleVertical(20),
  },
  colorCircle: {
    backgroundColor: 'red',
    width: moderateScale(14),
    aspectRatio: 1,
    borderRadius: 100,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  border: {
    borderRadius: 100,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderWidth: 0.5,
    borderColor: color.S_GRAY_2,
    padding: 1,
  },
  name: {
    ...CommonStyles.tpp_p2,
    color: color.P_GRAY_BLACK_1,
    lineHeight: moderateScaleVertical(20),
  },
  marginRight: {
    marginRight: moderateScale(32),
  },
  pinkLine: {
    height: 1,
    backgroundColor: color.P_PINK,
    marginTop: moderateScaleVertical(24),
  },
  productStatusSection: {
    backgroundColor: color.WHITE,
    paddingTop: moderateScale(16),
    flexDirection: 'row',
  },
  orderSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  productLabel: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  dateTimeStyle: {
    ...CommonStyles.tpp_s1,
    lineHeight: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(4),
  },
  orderIdLabel: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
  },
  orderIdStyle: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(16),
    fontWeight: '400',
    color: color.INPUT_TEXT,
  },
  productDateTime: {
    marginLeft: moderateScale(8),
  },
  concernStyle: {
    ...CommonStyles.tpp_s2,
    fontFamily:font.LatoBold,
    fontSize: textScale(12),
    marginTop: 'auto',
    marginBottom: 'auto',
    color: color.P_PINK,
  },
  raiseConcernSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(32),
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(14),
    fontFamily: font.LatoBold,
  },
  buttonView: {
    height: moderateScaleVertical(48),
    marginTop: moderateScaleVertical(24),
  },
});
