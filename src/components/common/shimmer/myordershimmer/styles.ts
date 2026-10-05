import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    height: moderateScaleVertical(38),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(16),
    paddingTop: moderateScaleVertical(8),
    marginTop: moderateScaleVertical(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shimmerContainer: {
    alignContent: 'center',
    marginTop: moderateScaleVertical(5),
    flexDirection: 'row',
  },
  iconView: {
    marginRight: moderateScale(12),
  },
  productContainer: {
    borderWidth: 1,
    margin: moderateScale(16),
    backgroundColor: color.GREY_BACKGROUND,
    borderRadius: moderateScale(20),
    borderColor: color.S_GRAY_2,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(32),
    width: width / 3,
  },
  seperatorStyle: {
    height: moderateScaleVertical(12),
    backgroundColor: color.S_GRAY_1,
  },
});
