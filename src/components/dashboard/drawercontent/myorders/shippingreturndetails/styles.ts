import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  feidlsView: {
    marginTop: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  submitView: {
    marginTop: 'auto',
    height: moderateScaleVertical(60),
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScaleVertical(40),
  },
});
