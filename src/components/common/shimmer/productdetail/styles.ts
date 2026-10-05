import { StyleSheet } from 'react-native';
import { moderateScaleVertical } from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  shimmerContainer: {
    alignContent: 'center',
    marginTop: moderateScaleVertical(5),
  },
  profileContainer: {
    paddingHorizontal: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
  profileButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileCircleContainer: {
    flexDirection: 'row',
  },
});
