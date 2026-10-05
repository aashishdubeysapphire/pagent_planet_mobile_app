import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import { moderateScaleVertical } from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.SHADOW_COLOR,
    flex: 1,
  },
  touchStyle: {
    height: Dimensions.get('window').height * 0.25,
  },
  imageStyles: {
    height: Dimensions.get('window').height * 0.5,
    width: '100%',
  },
  crossIcon:{
    marginLeft:"auto",
    margin:moderateScaleVertical(16)
  }
});
