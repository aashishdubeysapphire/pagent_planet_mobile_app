import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  closedContainer: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    marginTop: moderateScale(16),
    flexDirection: 'row',
  },
  button: {
    height: moderateScaleVertical(24),
    width: moderateScale(24),
  },
  quantity: {
    marginHorizontal: moderateScale(10),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(13),
    borderColor: color.S_GRAY_2,
  },
  row: {
    flexDirection: 'column',
    marginLeft: moderateScale(12),
    marginBottom: moderateScaleVertical(12),
  },
  row1: {
    flexDirection: 'row',
    marginTop: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  deleteIcon: {
    position: 'absolute',
    bottom: moderateScaleVertical(12),
    right: moderateScale(12),
  },
  bulletView: {
    width: moderateScale(32),
    justifyContent: 'center',
    backgroundColor: color.GREY_WITH_OPACITY,
    borderTopLeftRadius: moderateScale(16),
    borderBottomLeftRadius: moderateScale(16),
  },

  bulletUnselected: {
    borderWidth: 1,
    borderColor: color.S_GRAY_4,
    borderRadius: 3,
    alignSelf: 'center',
    width: moderateScale(16),
    height: moderateScaleVertical(16),
    marginHorizontal: moderateScale(8),
    justifyContent: 'center',
    alignContent: 'center',
  },
  bulletSelected: {
    backgroundColor: color.WHITE,
    borderRadius: 3,
    alignSelf: 'center',
    width: moderateScale(16),
    height: moderateScaleVertical(16),
    marginHorizontal: moderateScale(8),
  },
  topSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(12),
    marginLeft: moderateScale(12),
    borderRadius: moderateScale(16),
    width: '100%',
    alignItems: 'flex-start',
  },
  productSection: {
    marginLeft: moderateScale(12),
    alignSelf: 'center',
  },
  productLabel: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(20),
    fontSize: textScale(13),
    maxWidth: '85%',
  },
  infoSection: {
    marginTop: moderateScaleVertical(14),
    flexDirection: 'row',
    alignItems: 'center',
    width: '82%',
  },
  colorSizeSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(4),
    alignItems: 'center',
  },

  color: {
    width: moderateScale(8),
    height: moderateScaleVertical(8),
    backgroundColor: color.RED,
    borderRadius: 100,
    marginRight: moderateScale(4),
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
  outofstock: {
    ...CommonStyles.tpp_s1,
    color: color.RED,
  },
  available: {
    ...CommonStyles.tpp_s1,
    color: color.UPCOMING,
    marginStart: moderateScale(8),
  },
  error: {
    ...CommonStyles.tpp_s2,
    color: color.RED,
    marginStart: moderateScale(8),
  },
  emptyView: {
    marginTop: moderateScaleVertical(12),
    height: moderateScaleVertical(16),
  },
});
