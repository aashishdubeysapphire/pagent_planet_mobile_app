import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../../assets/commonStyles';
import {moderateScaleVertical, textScale} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },

  freeHeight: {
    marginBottom: moderateScaleVertical(170),
  },

  seperatorStyle: {
    height: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
  },
  noConvo: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    marginTop: moderateScaleVertical(24),
  },
});
