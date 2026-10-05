import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    eventHeadingArea: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: moderateScale(16),
      paddingStart: moderateScaleVertical(16),
      marginTop: moderateScaleVertical(24),
    },
    headingLabel: {
      ...CommonStyles.robotoMedium14,
      width: '90%',
      lineHeight: moderateScale(20),
    },
    flatlistView: {
      marginTop: moderateScaleVertical(16),
      paddingBottom: moderateScaleVertical(50),
    },
    container: {
      height: 'auto',
    },
    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: moderateScaleVertical(20),
      textAlign: 'center',
      marginBottom: 'auto',
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
    },
    showTapButton: {
      marginBottom: moderateScaleVertical(16),
      alignItems: 'center',
      flexDirection: 'row',
      height: moderateScaleVertical(16),
      marginLeft: moderateScale(16),
    },
    tapButton: {
      ...CommonStyles.tpp_p3,
      lineHeight: moderateScaleVertical(18),
      color: color.P_PINK,
    },
  });
};

export default useStyle;
