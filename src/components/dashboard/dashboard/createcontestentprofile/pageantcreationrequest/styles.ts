import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  subContiner: {
    marginHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(16),
  },
  bottomHeight: {
    height: moderateScaleVertical(104),
  },
  modalButtonBottom: {
    marginBottom: moderateScaleVertical(40),
  },
});
