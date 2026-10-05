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
    marginBottom: moderateScale(16),
  },

  bulletView: {
    backgroundColor: color.GREY_WITH_OPACITY,
    borderTopLeftRadius: moderateScale(16),
    borderBottomLeftRadius: moderateScale(16),
    width: moderateScale(32),
    justifyContent: 'center',
  },

  bulletUnselected: {
    width: moderateScale(16),
    height: moderateScaleVertical(16),
    marginHorizontal: moderateScale(8),
    borderWidth: 1,
    borderColor: color.S_GRAY_4,
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bulletSelected: {
    width: moderateScale(16),
    height: moderateScaleVertical(16),
    marginHorizontal: moderateScale(8),
    backgroundColor: color.WHITE,
    borderRadius: 3,
    alignSelf: 'center',
  },
  topSection: {
    borderRadius: moderateScale(16),
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: moderateScaleVertical(12),
  },

  date: {
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(4),
  },

  productCategory: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(11),
    marginLeft: moderateScale(8),
  },
  productCategory1: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(11),
    marginLeft: moderateScale(8),
  },
  productName: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(11),
    marginTop: moderateScaleVertical(12),
    marginBottom: moderateScaleVertical(8),
  },
  productLabel: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(20),
    fontSize: textScale(13),
    marginTop: moderateScaleVertical(12),
  },

  productLabel2: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(11),
  },
  productLabel3: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(20),
    fontSize: textScale(13),
  },
  topRow1: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginLeft: moderateScale(16),
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPrice: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
    fontSize: textScale(13),
    marginLeft: moderateScale(24),
  },

  statusText: {
    ...CommonStyles.tpp_h5,
    marginHorizontal: moderateScale(8),
    marginBottom: moderateScaleVertical(4),
    fontSize: textScale(13),
    color: color.UPCOMING,
  },
  date1: {
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(12),
    marginHorizontal: moderateScale(8),
  },
  productLabel1: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(11),
    marginTop: moderateScaleVertical(16),
    marginRight: moderateScale(16),
  },

  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },

  error: {
    ...CommonStyles.tpp_s2,
    color: color.RED,
    marginStart: moderateScale(8),
  },
});
