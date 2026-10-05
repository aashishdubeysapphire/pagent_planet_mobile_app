import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScaleVertical} from '../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    container: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      alignContent: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },

    loaderRoot: {
      width: '20%',
      height: '12%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    borderButtonBg: {
      borderRadius: 10,
      borderColor: color.S_GRAY_6,
      borderWidth: 1,
      opacity: 0.8,
      width: '100%',
      backgroundColor: color.S_PINK,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    taj: {
      position: 'absolute',
      marginBottom: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },

    counterText: {
      flexDirection: 'row',
      ...CommonStyles.tpp_s2,
      marginTop: moderateScaleVertical(1),
    },
  });
};

export default useStyle;
