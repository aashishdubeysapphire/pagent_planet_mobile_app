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
  topRow1: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginLeft: moderateScale(16),
  },
  column: {
    flexDirection: 'column',
  },

  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    ...CommonStyles.tpp_h5,
    marginHorizontal: moderateScale(8),
    marginBottom: moderateScaleVertical(4),
    fontSize: textScale(13),
    color: color.UPCOMING,
  },

  topSection: {
    borderRadius: moderateScale(16),
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: moderateScaleVertical(12),
    paddingTop: moderateScaleVertical(4),
  },
  bulletView: {
    backgroundColor: 'rgba(215, 215, 215, .4)',
    borderTopLeftRadius: moderateScale(16),
    borderBottomLeftRadius: moderateScale(16),
    width: moderateScale(32),
    justifyContent: 'center',
  },

  bulletSelected: {
    width: moderateScale(16),
    height: moderateScaleVertical(16),
    marginHorizontal: moderateScale(8),
    backgroundColor: color.WHITE,
    borderRadius: 3,
    alignSelf: 'center',
  },
  date: {
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(4),
  },
  date1: {
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(12),
    marginHorizontal: moderateScale(8),
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
    marginTop: moderateScaleVertical(16),
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
  productLabel1: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(11),
    marginTop: moderateScaleVertical(16),
    marginRight: moderateScale(16),
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

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(8),
    width: '100%',
  },

  viewDetails: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  categoryRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScaleVertical(8),
  },
  categoryRow2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  error: {
    ...CommonStyles.tpp_s2,
    color: color.RED,
    marginStart: moderateScale(8),
  },
});
