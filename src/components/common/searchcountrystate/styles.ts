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
    modalContainer: {
      backgroundColor: color.WHITE,
      flex: 1,
      paddingTop: moderateScaleVertical(16),
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    noRecordContainer: {
      backgroundColor: color.BLACK,
      flex: 1,
      justifyContent: 'center',
      marginTop: moderateScaleVertical(170),
    },
    crossIcon: {
      marginLeft: 'auto',
    },
    selectiontext: {
      ...CommonStyles.tpp_h4,
      marginRight: 'auto',
    },

    textView: {
      flexDirection: 'row',
      paddingEnd: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      paddingStart: moderateScaleVertical(16),
    },

    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      textTransform: 'capitalize',
      marginBottom: 'auto',
      lineHeight: moderateScaleVertical(24),
    },
    headingView: {
      flexDirection: 'row',
      paddingStart: moderateScaleVertical(16),
      paddingEnd: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(5),
    },

    searchBox: {
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: 1,
      borderRadius: moderateScaleVertical(22),
      flexDirection: 'row',
      marginStart: moderateScaleVertical(16),
      marginTop: moderateScaleVertical(10),
      maxHeight: moderateScaleVertical(44),
      marginEnd: moderateScaleVertical(16),
      minHeight: moderateScaleVertical(44),
      marginBottom: moderateScaleVertical(12),
    },
    searchTextinput: {
      flex: 0.9,
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScaleVertical(12),
      ...CommonStyles.tpp_p2,
      color: color.BLACK,
    },
    searchImage: {
      marginTop: 'auto',
      marginLeft: 'auto',
      marginBottom: 'auto',
      marginRight: moderateScale(16),
    },
    allSelected: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(8),
      justifyContent: 'space-between',
      paddingEnd: moderateScaleVertical(16),
      paddingStart: moderateScaleVertical(16),
    },
    selectedText: {
      ...CommonStyles.tpp_s2,
      marginEnd: moderateScaleVertical(16),
      marginLeft: 'auto',
      marginBottom: moderateScaleVertical(12),
    },

    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: color.WHITE,
      padding: moderateScaleVertical(16),
    },

    containerDelete: {
      flex: 0.5,
      borderColor: color.S_GRAY_3,
      borderRadius: 30,
      borderWidth: 1,
      marginRight: moderateScale(16),
    },
    containerConfirm: {
      flex: 0.5,
      borderWidth: 1,
      borderColor: color.P_PINK,
      borderRadius: 30,
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

    selectedAllTitle: {
      ...CommonStyles.latoSemiBold12,
      lineHeight: moderateScaleVertical(16),
    },
  });
};

export default useStyle;
