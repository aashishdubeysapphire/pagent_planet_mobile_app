import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.S_GRAY_1,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    borderRadius: moderateScale(16),
    alignItems: 'flex-start',
    marginTop: moderateScale(16),
    marginHorizontal: moderateScale(16),
  },
  topSection: {
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(16),
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: moderateScale(12)
  },
  imageSection: {
  },
  imageInfo: {
    position: 'absolute',
    backgroundColor: color.BLACK,
    opacity: 0.7,
    bottom: 0,
    marginStart: moderateScale(1),
    width: moderateScaleVertical(90),
    borderBottomRightRadius: moderateScale(12),
    borderBottomLeftRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScaleVertical(20),
    flexDirection: 'row',
  },
  infoProductLabel: {
    ...CommonStyles.tpp_s5,
    color: color.WHITE,
  },
  productSection: {
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(12),
    width: width - moderateScale(138),
  },
  productLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
  },
  infoSection: {
    marginTop: moderateScaleVertical(8),
    flexDirection: 'row',
    alignItems: 'center',
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
  infoLabel: {
    ...CommonStyles.tpp_s1,
    marginLeft: moderateScale(4),
    lineHeight: moderateScaleVertical(12),
  },
  middleSection: {
    padding: moderateScale(12),
    width: '100%',
    paddingTop: moderateScale(2)
  },
});
