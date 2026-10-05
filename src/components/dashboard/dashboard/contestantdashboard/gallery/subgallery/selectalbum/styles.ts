import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(18),
    marginTop: moderateScaleVertical(15),
  },
});
