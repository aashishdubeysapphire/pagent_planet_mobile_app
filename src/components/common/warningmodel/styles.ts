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
      marginTop: 'auto',
      paddingHorizontal: moderateScale(16),
      borderTopRightRadius: moderateScaleVertical(20),
      borderTopLeftRadius: moderateScaleVertical(20),
    },

    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: moderateScaleVertical(20),
      textAlign: 'center',
      marginBottom: 'auto',
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
    },
    modalLabel: {
      fontFamily: font.RobotoMedium,
      fontSize: textScale(14),
      color: color.BLACK,
      marginTop: moderateScaleVertical(20),
      textAlign: 'center',
      marginBottom: 'auto',
    },

    headingView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(10),
    },
    crossIcon: {
      marginLeft: 'auto',
      marginTop: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
    },

    containerCancel: {
      flex: 1,
      height: moderateScaleVertical(65),
      paddingBottom: 0,
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

    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: moderateScaleVertical(32),
    },
    borderButtonText: {
      color: color.P_PINK,
      fontSize: textScale(13),
      fontWeight: 'bold',
      fontFamily: font.LatoBold,
      textTransform: 'uppercase',
      marginVertical: moderateScaleVertical(14),
      textAlign: 'center',
    },
    gap: {
      marginStart: moderateScaleVertical(16),
    },
  });
};

export default useStyle;
