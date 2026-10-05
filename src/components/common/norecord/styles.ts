import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScaleVertical} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    continer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.WHITE,
    },
    alertcontiner: {
      ...CommonStyles.robotoMedium14,
      textTransform: 'capitalize',
      fontWeight: '500',
      marginEnd: moderateScaleVertical(12),
      marginStart: moderateScaleVertical(12),
      lineHeight: moderateScaleVertical(20),
      color: color.BLACK,
      marginTop: moderateScaleVertical(24),
      textAlign: 'center',
    },
  });
};

export default useStyle;
