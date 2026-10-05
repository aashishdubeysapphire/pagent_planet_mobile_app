import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
const useStyle = () => {
  return StyleSheet.create({
    container: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignContent: 'center',
      position: 'absolute',
    },

    loaderRoot: {
      width: '20%',
      height: '12%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    borderButtonBg: {
      borderColor: color.S_GRAY_6,
      borderWidth: 1,
      width: '100%',
      opacity: 0.8,
      borderRadius: 10,
      backgroundColor: color.S_PINK,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      marginTop: 1,
    },
    taj: {
      position: 'absolute',
      marginBottom: 200,
    },
  });
};

export default useStyle;
