import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  shimmerContainer: {
    alignContent: 'center',
    marginTop: moderateScaleVertical(5),
    flexDirection: 'row',
  },
  iconView: {
    marginRight: moderateScale(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greyView: {
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
    height: moderateScaleVertical(38),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(16),
    paddingTop: moderateScaleVertical(8),
    marginTop: moderateScaleVertical(16),
  },
  profileContainer: {
    flexDirection: 'row',
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
  profileButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: moderateScaleVertical(60),
    paddingEnd: moderateScaleVertical(70),
    marginTop: moderateScaleVertical(5),
  },
  seperatorStyle: {
    height: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
  },
});
