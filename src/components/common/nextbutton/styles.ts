import {StyleSheet} from 'react-native';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      marginEnd: moderateScaleVertical(5),
    },
    imageStyles: {
      height: moderateScale(65),
      aspectRatio: 1,
    },
  });
};

export default useStyle;
