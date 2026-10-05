import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  textShimmer: {
    alignSelf: 'center',
    marginTop: moderateScaleVertical(16),
  },
  profileArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(8),
  },
});
