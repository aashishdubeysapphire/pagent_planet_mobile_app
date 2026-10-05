import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScaleVertical(20),
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WHITE,
    width: moderateScale(154),
    height: moderateScale(153),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
  },
  wrapper: {
    marginRight: moderateScale(12),
  },
});
