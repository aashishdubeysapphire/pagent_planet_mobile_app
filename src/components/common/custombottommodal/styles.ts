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
    crossIcon: {
      marginLeft: 'auto',
      paddingRight: moderateScaleVertical(16),
    },
    selectiontext: {
      ...CommonStyles.tpp_h4,
      marginRight: 'auto',
      width: '90%',
    },
    colorCircle: {
      borderRadius: moderateScaleVertical(24),
      marginEnd: moderateScaleVertical(9),
      width: moderateScaleVertical(24),
      height: moderateScaleVertical(24),

      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 1,
    },

    textView: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(16),
      paddingHorizontal: moderateScaleVertical(16),
    },
    bottomContainer2: {
      flex: 1,
      marginBottom: moderateScaleVertical(25),
    },

    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      marginBottom: 'auto',
      textTransform: 'capitalize',
      paddingHorizontal: moderateScaleVertical(16),
    },
    headingView: {
      flexDirection: 'row',
    },

    searchBOx: {
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: 1,
      borderRadius: 30,
      flexDirection: 'row',
      maxHeight: moderateScaleVertical(44),
      minHeight: moderateScaleVertical(44),
      marginTop: moderateScaleVertical(16),
      marginHorizontal: moderateScaleVertical(16),
    },
    searchTExtinput: {
      flex: 0.9,
      ...CommonStyles.tpp_p2,
      color: color.BLACK,
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScaleVertical(12),
    },
    searchImage: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: moderateScale(18),
    },
    selectedText: {
      marginLeft: 'auto',
      ...CommonStyles.tpp_s2,
      marginTop: moderateScaleVertical(12),
      paddingHorizontal: moderateScaleVertical(16),
    },

    containerDelete: {
      flex: 0.5,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: color.S_GRAY_3,
      marginRight: moderateScale(16),
      marginLeft: moderateScaleVertical(16),
    },
    containerConfirm: {
      flex: 0.5,
      borderWidth: 1,
      borderRadius: 30,
      marginRight: moderateScaleVertical(16),
      borderColor: color.P_PINK,
    },

    bottomContainer: {
      flexDirection: 'row',
      marginVertical: moderateScaleVertical(20),
      justifyContent: 'space-between',
    },
    borderButtonText: {
      color: color.P_PINK,
      fontSize: textScale(14),
      fontFamily: font.LatoBold,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      marginVertical: moderateScaleVertical(14),
      textAlign: 'center',
    },
    heightForSearch: {
      height: '60%',
    },

    touchableText: {
      ...CommonStyles.latoBoldBlack12,
      lineHeight: moderateScaleVertical(16),
      color: color.P_PINK,
    },
    middleView: {
      marginTop: '30%',
      alignItems: 'center',
    },
  });
};

export default useStyle;
