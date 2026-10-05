import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    modalStyles: {
      flex: 1,
      marginHorizontal: 0,
      marginVertical: 0,
      justifyContent: 'flex-end',
      marginTop: '36%',
    },
    modalContainer: {
      backgroundColor: color.WHITE,
      paddingTop: moderateScaleVertical(16),
      paddingBottom: moderateScaleVertical(16),
      borderRadius: moderateScaleVertical(16),
      marginTop: '36%',
    },
    modalHeading: {
      ...CommonStyles.tpp_h3,
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
    },
    msgLabel: {
      marginTop: moderateScaleVertical(5),
    },
    headingView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(16.5),
      paddingHorizontal: moderateScale(16),
    },
    crossIcon: {
      marginLeft: 'auto',
    },
    bottomContainer: {
      flexDirection: 'row',
      marginVertical: moderateScaleVertical(20),
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(16),
    },

    containerDelete: {
      flex: 0.5,
      borderColor: color.S_GRAY_3,
      borderWidth: 1,
      borderRadius: 30,
      marginRight: moderateScale(16),
    },
    containerConfirm: {
      flex: 0.5,
      borderColor: color.P_PINK,
      borderWidth: 1,
      borderRadius: 30,
    },
    borderButtonText: {
      color: color.P_PINK,
      fontSize: textScale(14),
      fontWeight: 'bold',
      fontFamily: font.LatoBold,
      textTransform: 'uppercase',
      marginVertical: moderateScaleVertical(14),
      textAlign: 'center',
    },
  });
};

export default useStyle;
