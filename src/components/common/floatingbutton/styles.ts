import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';

import {moderateScaleVertical} from '../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      bottom: moderateScaleVertical(40),
      right: moderateScaleVertical(12),
    },
    rotate: {
      transform: [{rotate: '134deg'}],
      marginBottom: moderateScaleVertical(5),
    },
    none: {
      transform: [{rotate: '0deg'}],
      marginBottom: moderateScaleVertical(5),
    },
    text: {
      ...CommonStyles.latoBoldPink16,
      color: color.WHITE,
      alignSelf: 'center',
      lineHeight: moderateScaleVertical(22),
    },
    plus: {
      fontSize: moderateScaleVertical(30),
      color: color.WHITE,
    },

    textPlusContainer: {
      flexDirection: 'row',
      padding: moderateScaleVertical(16),
      borderRadius: moderateScaleVertical(30),
      backgroundColor: color.P_PINK,
      marginEnd: moderateScaleVertical(3),
      marginBottom: moderateScaleVertical(14.6),
      maxHeight: moderateScaleVertical(60),
    },
    text1PlusContainer: {
      flexDirection: 'row',
    },
  });
};

export default useStyle;
