import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    gridContainer: {
      alignItems: 'center',
      borderRadius: moderateScaleVertical(24),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      justifyContent: 'center',
      overflow: 'hidden',
    },

    imageSection: {
      width: '100%',

      borderRadius: moderateScale(24),
      backgroundColor: color.WHITE,
      overflow: 'hidden',
    },
    middleSection: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      flexDirection: 'row',
      width: '100%',
      flex: 1,
      padding: moderateScaleVertical(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    circleContainer: {
      width: moderateScaleVertical(60),
      height: moderateScaleVertical(60),
      borderRadius: moderateScaleVertical(60),
      marginEnd: moderateScaleVertical(12),
    },
    container: {
      height: 'auto',
      marginHorizontal: moderateScale(8),
      marginBottom: moderateScaleVertical(16),
      width: '45.5%',
    },
    title: {
      ...CommonStyles.tpp_s2,
      textAlign: 'center',
      lineHeight: moderateScaleVertical(16),
      fontSize: textScale(12),
      paddingHorizontal: moderateScale(8),
    },
    options: {
      fontFamily: font.LatoSemiBold,
      fontSize: textScale(10),
      lineHeight: moderateScaleVertical(14),
      marginLeft: moderateScale(8),
      color: color.S_GRAY_4,
    },

    bottomSection: {
      flexDirection: 'row',
      height: moderateScaleVertical(30),
      marginTop: moderateScaleVertical(-4),
      width: moderateScale(150),
      alignItems: 'center',
      backgroundColor: color.TRANSPARNT,
      paddingTop: moderateScaleVertical(4),
      borderBottomLeftRadius: moderateScale(20),
      borderBottomRightRadius: moderateScale(20),
      justifyContent: 'center',
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderLeftColor: color.S_GRAY_2,
      borderBottomColor: color.S_GRAY_2,
      borderRightColor: color.S_GRAY_2,
      alignSelf: 'center',
    },
    imageStyle: {
      height: moderateScaleVertical(155),
    },
  });
};

export default useStyle;
