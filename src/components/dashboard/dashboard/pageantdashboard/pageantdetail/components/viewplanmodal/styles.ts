import {Dimensions, StyleSheet} from 'react-native';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
  },
  sliderContainer: {
    marginStart: moderateScaleVertical(18),
  },
  touchStyle: {
    height: Dimensions.get('window').height * 0.25,
  },
  imageStyles: {
    height: Dimensions.get('window').height * 0.5,
    width: '100%',
  },
  crossIcon: {
    marginLeft: 'auto',
    marginEnd: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(70),
    height: Dimensions.get('window').height * 0.15,
  },
});
