import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    width: width,
  },
  header: {
    flexDirection: 'row',
  },
  headerLabel: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(22),
  },
  priceArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(12),
  },
  priceLabel: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(20),
  },
  seperator: {
    height: moderateScaleVertical(1),
    backgroundColor: color.S_GRAY_2,
    marginTop: moderateScaleVertical(12),
  },
  halfPriceSection: {
    flexDirection: 'row',
  },
});
