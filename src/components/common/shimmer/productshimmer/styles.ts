import {StyleSheet} from 'react-native';
import {moderateScaleVertical} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  shimmerContainer: {
    alignContent: 'center',
    marginTop: moderateScaleVertical(5),
    flexDirection:'row'
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
});
