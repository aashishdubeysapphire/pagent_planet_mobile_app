import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  mainContiner: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  continer: {
    flex: 1,
    justifyContent: 'center',
  },
  placeHolderContiner: {
    borderWidth: 1,
    borderRadius: moderateScaleVertical(24),
    marginEnd: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: color.S_GRAY_2,
  },
  demoImage: {
    height: moderateScaleVertical(375),
    marginTop: '30%',
    backgroundColor: color.S_GRAY_1,
    marginBottom: 'auto',
  },
});
