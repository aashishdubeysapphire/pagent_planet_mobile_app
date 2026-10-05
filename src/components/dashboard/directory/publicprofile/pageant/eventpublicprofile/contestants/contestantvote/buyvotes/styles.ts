import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  headerImg: {
    width: '100%',
    height: moderateScaleVertical(38),
  },
});
