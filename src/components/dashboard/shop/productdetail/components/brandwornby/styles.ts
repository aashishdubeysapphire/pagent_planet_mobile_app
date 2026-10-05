import {StyleSheet} from 'react-native';
import {moderateScale, moderateScaleVertical} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  cardStyle: {
    marginRight: moderateScale(12),
  },
  listView: {
    marginLeft: moderateScale(16),
    marginTop:moderateScaleVertical(24)
  },
});
