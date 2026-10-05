import {useTheme} from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import useDynamicWidth from '../../../../../../utils/useDynamicWidth';
import { isIosDevice } from '../../../../../../utils/helperFunction';
CommonStyles;
const useStyle = () => {
  const {colors} = useTheme();
  const dW = useDynamicWidth();

  return StyleSheet.create({
    modalContainer: {
      backgroundColor: color.WHITE,
      marginTop: 'auto',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingHorizontal: moderateScale(16),
    },
    crossIcon: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    error: {
      fontSize: dW(11),
      marginStart: dW(2),
      fontFamily: font.RobotoMedium,
      color: color.RED,
    },
    addTitle: {
      ...CommonStyles.tpp_h5,
      color: color.P_PINK,
      left: moderateScale(8),
      fontSize: textScale(13),
    },
    save: {
      fontFamily: font.LatoBold,
      color: color.P_PINK,
      fontSize: textScale(14),
    },
    closeButtonIcon: {
      marginLeft: 'auto',
      marginRight:moderateScaleVertical(16)
    },
    selectiontext: {
      ...CommonStyles.tpp_h4,
      marginRight: 'auto',
      flex: 0.9,
    },

    textView: {
      flexDirection: 'row',
      flex: 1,
      width: '92%',
      // justifyContent: 'space-between',
      marginTop: moderateScaleVertical(16),
      marginLeft:moderateScale(16)

    },
    bottomContainer2: {
      flex: 1,
    },

    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      marginBottom: 'auto',
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
      paddingHorizontal:moderateScaleVertical(16)
    },
    noPageantFound: {
      ...CommonStyles.tpp_h5,
      fontSize: textScale(13),
    },
    headingView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(5),

    },

    searchBOx: {
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: 1,
      borderRadius: 30,
      flexDirection: 'row',
      marginTop: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      marginHorizontal:moderateScaleVertical(16)

    },
    searchTExtinput: {
      flex: 1.2,
      paddingHorizontal: moderateScale(24),
      paddingVertical:
        isIosDevice()
          ? moderateScaleVertical(12)
          : moderateScaleVertical(8),
      ...CommonStyles.tpp_p2,
      color: color.BLACK,
    },
    searchImage: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: moderateScale(24),
    },
    containerDelete: {
      flex: 0.5,
      borderColor: color.S_GRAY_3,
      borderWidth: 1,
      borderRadius: 30,
      marginRight: moderateScale(16),
    },
    selectedText: {
      marginLeft: 'auto',
      ...CommonStyles.tpp_s2,
      marginTop: moderateScaleVertical(12),
    },
    containerConfirm: {
      flex: 0.5,
      borderColor: color.P_PINK,
      borderWidth: 1,
      borderRadius: 30,
    },

    bottomContainer: {
      flexDirection: 'row',
      marginVertical: moderateScaleVertical(20),
      justifyContent: 'space-between',
      marginHorizontal:moderateScale(16)
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
