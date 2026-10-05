import {StyleSheet} from 'react-native';
import {moderateScaleVertical} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  Container: {
    alignContent: 'center',
    marginTop: moderateScaleVertical(5),
  },
  wrapper: {
    paddingStart: moderateScaleVertical(16),
    marginVertical: moderateScaleVertical(16),
  },
  addressSection: {
    flexDirection: 'row',
    paddingStart: moderateScaleVertical(8),
    marginTop: moderateScaleVertical(5),
    alignItems: 'center',
  },
});
