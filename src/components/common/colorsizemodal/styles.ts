import { StyleSheet } from 'react-native';
import { color } from '../../../assets/colorConstant';
import { CommonStyles } from '../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,

    marginTop: moderateScaleVertical(4),
  },
  title: {
    ...CommonStyles.tpp_s3,
    maxWidth: '88%',
  },
  vary: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    marginTop: moderateScaleVertical(4),
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

  instock: {
    ...CommonStyles.tpp_s2,
    color: color.RED,
  },

  bottomFilterShadowContainer: {
    width: '100%',
    marginBottom: moderateScaleVertical(12),
  },
  bottomFilterContainer: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(40),
    width: '100%',
    marginBottom: moderateScaleVertical(12),
  },
  totalAmountHeading: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
  },
  amountContainer: {
    flex: 1,
  },

  color: {
    ...CommonStyles.tpp_h5,
    color: color.P_GRAY_BLACK_1,
    fontSize: textScale(13),
  },
  color1: {
    ...CommonStyles.tpp_p2,
    color: color.P_GRAY_BLACK_1,
    fontSize: textScale(13),
  },
  size: {
    ...CommonStyles.tpp_h5,
    color: color.P_GRAY_BLACK_1,
    fontSize: textScale(13),
  },
  colorRound: {
    borderRadius: moderateScale(100),
    width: moderateScale(24),
    backgroundColor: 'red',
    height: moderateScaleVertical(24),
    alignSelf: 'center',
    marginRight: moderateScale(6),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(8),
  },
  actualPriceLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    textDecorationLine: 'none',
  },
  maxPriceLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.S_GRAY_3,
    textDecorationLine: 'line-through',
    lineHeight: moderateScaleVertical(20),
  },
  sizeName: {
    ...CommonStyles.tpp_h5,
  },

  crossIcon: {
    marginLeft: 'auto',
  },

  headingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(10),
  },
});
