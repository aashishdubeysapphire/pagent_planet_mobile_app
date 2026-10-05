import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  mainContiner: {
    flex: 1,
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
  },
  buttonView: {
    marginTop: 'auto',
    marginBottom: moderateScaleVertical(32),
  },
});
