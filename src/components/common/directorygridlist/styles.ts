import { StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import { isIosDevice } from '../../utils/helperFunction';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      marginLeft: -moderateScale(0.7),
    },
    topContainer: {
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      borderRadius: moderateScale(20),
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      backgroundColor: color.WHITE,
      borderBottomWidth: 1.1,
    },
    middleSection: {
      backgroundColor: color.S_GRAY_1,
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      alignItems: 'center',
      overflow: 'hidden',
      marginLeft: -moderateScale(0.9),
      top: -0.5,
    },
    bottomSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
    },
    imageSection: {
      width: '100%',
      alignItems: 'center',
      borderRadius: moderateScale(20),
      backgroundColor: color.WHITE,
      overflow: 'hidden',
    },
    titleSection: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: moderateScale(8),
    },
    headingArea: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      ...CommonStyles.tpp_s2,
      textAlign: 'center',
      lineHeight: moderateScaleVertical(16.5),
      alignSelf: 'stretch',
    },
    ratingArea: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScaleVertical(6),
    },
    ratingStyle: {
      ...CommonStyles.tpp_s2,
      fontSize: textScale(9),
      alignSelf: 'center',
    },
    subHeadingLabel: {
      ...CommonStyles.tpp_s1,
      textAlign: 'center',
      alignSelf: 'stretch',
      marginLeft: moderateScale(4),
      lineHeight: moderateScaleVertical(12.5),
    },
    messageLabel: {
      fontFamily: font.LatoBold,
      fontSize: isIosDevice() ? textScale(9) : textScale(10),
      color: color.S_GRAY_4,
      marginLeft: moderateScale(4),
      textAlign: 'center',
      alignSelf: 'stretch',
    },
    unlockLabel: {
      ...CommonStyles.tpp_s1,
      color: color.WHITE,
      marginLeft: moderateScale(8),
      textAlign: 'center',
      alignSelf: 'stretch',
    },
    lifeTimeParticipantArea: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScaleVertical(7),
      paddingHorizontal: moderateScale(8),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    secondRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginTop: moderateScaleVertical(1),
    },
    verticalLine: {
      height: moderateScaleVertical(16),
      width: 1,
      backgroundColor: color.S_GRAY_2,
    },
    buttonArea: {
      alignItems: 'center',
      justifyContent: 'center',
      height: moderateScaleVertical(30),
      paddingHorizontal: moderateScale(2),
      bottom: 0,
      flexDirection: 'row',
    },
    showCountLabel: {
      ...CommonStyles.tpp_s1,
      textAlign: 'center',
      lineHeight: moderateScaleVertical(18),
      alignSelf: 'stretch',
      marginStart: moderateScaleVertical(4),
      color: color.INPUT_TEXT,
    },
    showNumbersSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    locationArea: {
      alignSelf: 'flex-start',
      marginTop: moderateScaleVertical(1),
    },
    iconStyles: {
      marginTop: 1,
    },
    entryFeeView: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(4),
      marginBottom: 'auto',
    },
    entryFeeIcon: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginRight: moderateScale(4),
      top: 1,
    },
    entryFee: {
      ...CommonStyles.robotoMedium14,
      fontSize: textScale(10),
      color: color.S_GRAY_4,
    },
  });
};

export default useStyle;
