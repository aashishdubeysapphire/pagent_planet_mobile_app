import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import useDynamicWidth from '../../utils/useDynamicWidth';
import {font} from '../../../assets/fonts/fontsConstant';
import {color} from '../../../assets/colorConstant';

const useStyle = () => {
  const {colors} = useTheme();
  const dW = useDynamicWidth();

  return StyleSheet.create({
    buttonText: {
      color: color.WHITE,
      fontWeight: 'bold',
      fontSize: dW(14),
      fontFamily: font.LatoBold,
    },
    buttonBg: {
      backgroundColor: color.P_PINK,
      borderRadius: 30,
      height: dW(40),
      width: dW(230),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },

    borderButtonBg: {
      borderRadius: 30,
      borderColor: color.P_PINK,
      borderWidth: 2,
      height: dW(50),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: dW(20),
    },
    borderButtonText: {
      color: color.P_PINK,
      fontWeight: 'bold',
      fontSize: dW(14),
      fontFamily: font.LatoBold,
    },

    inactiveButtonBg: {
      backgroundColor: color.S_PINK,
      borderRadius: 30,
      height: dW(50),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
  });
};

export default useStyle;
