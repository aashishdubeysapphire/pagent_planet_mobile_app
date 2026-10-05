import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    title: {
      ...CommonStyles.tpp_s2,

      lineHeight: moderateScaleVertical(20),
      fontSize: textScale(14),
      paddingHorizontal: moderateScale(8),
      flex: 1,
    },

    pasteMsgContainer: {
      flexDirection: 'row',
      width: '92%',
      alignContent: 'flex-end',
      borderRadius: moderateScale(15),
      borderColor: color.S_GRAY_2,
      padding: moderateScale(16),
      marginEnd: moderateScale(4),
      borderWidth: 1,
      backgroundColor: color.S_GRAY_1,
      bottom: 0,
    },
  });
};

export default useStyle;
