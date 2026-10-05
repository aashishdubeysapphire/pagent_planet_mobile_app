import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../../../../utils/responsiveSize';
import useDynamicWidth from '../../../../../../../../../../../utils/useDynamicWidth';
CommonStyles;
const useStyle = () => {
  const dW = useDynamicWidth();

  return StyleSheet.create({
    modalContainer: {
      backgroundColor: color.WHITE,
      marginTop: 'auto',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingHorizontal: moderateScale(16),
    },
    error: {
      fontSize: dW(11),
      marginStart: dW(2),
      fontFamily: font.RobotoMedium,
      color: color.RED,
    },
    save: {
      fontFamily: font.LatoBold,
      color: color.P_PINK,
      fontSize: textScale(14),
    },
    crossIcon: {
      marginLeft: 'auto',
    },
    selectiontext: {
      ...CommonStyles.tpp_h4,
      marginRight: 'auto',
      flex: 0.9,
    },

    textView: {
      flexDirection: 'row',
      flex: 1,
      width: '90%',
      justifyContent: 'space-between',
      marginTop: moderateScaleVertical(20),
      marginHorizontal: moderateScaleVertical(16),
    },
    container: {
      flex: 1,
    },
    emptyContainer: {
      paddingTop: moderateScaleVertical(40),
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
      paddingHorizontal: moderateScaleVertical(16),
    },

    searchBOx: {
      height: moderateScaleVertical(44),
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: 1,
      borderRadius: 30,
      flexDirection: 'row',
      marginTop: moderateScaleVertical(20),
      marginBottom: moderateScaleVertical(8),
      marginHorizontal: moderateScaleVertical(16),
    },
    searchTExtinput: {
      flex: 1.2,
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScaleVertical(12),
      ...CommonStyles.tpp_p2,
      color: color.BLACK,
    },
    searchImage: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: moderateScale(18),
    },
    circleImageContainer: {
      marginEnd: moderateScaleVertical(8),
      marginTop: moderateScaleVertical(1),
      marginStart: moderateScaleVertical(-0.8),
    },

    loadMore: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    selectedText: {
      marginLeft: 'auto',
      ...CommonStyles.tpp_s2,
      marginTop: moderateScaleVertical(12),
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: color.WHITE,
      paddingTop: moderateScaleVertical(16),
      paddingBottom: moderateScaleVertical(16),
      marginHorizontal: moderateScaleVertical(16),
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
    containerOptacityConfirm: {
      flex: 0.5,
      borderColor: color.P_PINK,
      borderWidth: 1,
      borderRadius: 30,
      opacity: 0.2,
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
    noRecordContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: -moderateScaleVertical(16),
    },
  });
};

export default useStyle;
