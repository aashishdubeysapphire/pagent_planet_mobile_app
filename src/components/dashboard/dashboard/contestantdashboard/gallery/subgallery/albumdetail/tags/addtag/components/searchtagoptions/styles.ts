import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    modalContainer: {
      backgroundColor: color.WHITE,
      flex: 1,
      borderTopRightRadius: moderateScaleVertical(20),
      borderTopLeftRadius: moderateScaleVertical(20),
      paddingTop: moderateScaleVertical(16),
      paddingLeft: moderateScale(16),
    },
    searchBOx: {
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: 1,
      borderRadius: 30,
      flexDirection: 'row',
      marginTop: moderateScaleVertical(20),
      marginBottom: moderateScaleVertical(10),
      height: moderateScaleVertical(44),
      marginRight: moderateScale(16),
    },
    noRecordContainer: {
      marginTop: '30%',
    },
    crossIcon: {
      marginLeft: 'auto',
      paddingRight: moderateScale(16),
    },
    selectiontext: {
      ...CommonStyles.tpp_h4,
      marginRight: 'auto',
    },

    textView: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(20),
      paddingRight: moderateScale(16),
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

    searchTExtinput: {
      flex: 0.9,
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
    imgView: {
      marginRight: moderateScale(12),
      bottom: moderateScaleVertical(5),
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
    containerDelete: {
      flex: 0.5,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: color.S_GRAY_3,
      marginRight: moderateScale(16),
    },
    containerConfirm: {
      flex: 0.5,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: color.P_PINK,
      marginRight: moderateScale(16),
    },
  });
};

export default useStyle;
