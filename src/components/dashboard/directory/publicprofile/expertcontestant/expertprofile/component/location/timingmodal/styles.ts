import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: color.WHITE,
      flex: 1,
      paddingTop: moderateScaleVertical(16),
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    modalContentContainer: {
      padding: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(8),
    },
    crossIcon: {
      marginLeft: 'auto',
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
      paddingEnd: moderateScaleVertical(16),
      paddingStart: moderateScaleVertical(16),
    },

    itemContainer: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(16),
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
    },
    timingText: {
      ...CommonStyles.tpp_p2_large,
      marginStart: moderateScale(16),
      lineHeight: moderateScaleVertical(22),
      color: color.S_GRAY_4,
      marginBottom: moderateScaleVertical(16),
    },
    timingActiveText: {
      ...CommonStyles.tpp_p2_large,
      marginStart: moderateScale(16),
      lineHeight: moderateScaleVertical(22),
      color: color.INPUT_TEXT,
      marginBottom: moderateScaleVertical(16),
    },
    subHeadingLabel: {
      ...CommonStyles.robotoMedium14,
      marginStart: moderateScaleVertical(10),
      lineHeight: moderateScaleVertical(20),
      color: color.INPUT_TEXT,
    },
    icon: {
      alignSelf: 'center',
    },
  });
