import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    crossIcon: {
      marginLeft: 'auto',
    },
    selectiontext: {
      ...CommonStyles.tpp_h4,
      marginRight: 'auto',
      width: moderateScale(280),
    },

    textView: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(16),
    },
    bottomContainer2: {
      marginBottom: isIosDevice()
        ? moderateScaleVertical(54)
        : moderateScaleVertical(10),
    },

    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      marginBottom: 'auto',
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
    },
    headingView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(5),
    },

    searchBOx: {
      borderWidth: 1,
      borderRadius: 30,
      flexDirection: 'row',
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      marginTop: moderateScaleVertical(20),
      marginBottom: moderateScaleVertical(8),
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
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginEnd: moderateScale(8),
      marginTop: moderateScaleVertical(8),
    },
    containerConfirm: {
      flex: 0.48,
      height: moderateScaleVertical(46.5),
    },
    containerDelete: {
      flex: 0.48,
      height: moderateScaleVertical(65),
      marginLeft: moderateScale(8),
    },
    borderButtonText: {
      color: color.P_PINK,
      fontSize: textScale(14),
      fontWeight: 'bold',
      fontFamily: font.LatoBold,
      textTransform: 'uppercase',
    },
    bottomHeight: {
      height: moderateScaleVertical(100),
    },
  });
};

export default useStyle;
