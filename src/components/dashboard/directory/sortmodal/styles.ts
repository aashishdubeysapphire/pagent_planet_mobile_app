import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
export const styles = StyleSheet.create({
    selected: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(16),
      justifyContent: 'space-between',
    },

    radioButtonImage: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    selectedText: {
      // ...CommonStyles.tpp_h4,
      ...CommonStyles.robotoMedium16,
      // fontWeight: '500',
      color: color.P_PINK,
      lineHeight: moderateScaleVertical(22),
    },
    unselectedText: {
      ...CommonStyles.tpp_h4,
      color: color.INPUT_TEXT,
      // fontWeight: '400',
      lineHeight: moderateScaleVertical(22),
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
      justifyContent: 'space-between',
      marginBottom: moderateScaleVertical(16),
    },
  });
