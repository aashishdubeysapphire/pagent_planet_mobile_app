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

    closeIcon: {
      marginLeft: 'auto',
    },
    selectionVoteText: {
      ...CommonStyles.tpp_h4,
      marginRight: 'auto',
    },

    textView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(16),
      paddingEnd: moderateScaleVertical(16),
      paddingStart: moderateScaleVertical(16),
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
      paddingEnd: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(5),
      paddingStart: moderateScaleVertical(16),
    },

    searchBOx: {
      borderColor: color.S_GRAY_2,
      backgroundColor: color.S_GRAY_1,
      borderWidth: 1,
      borderRadius: moderateScaleVertical(22),
      flexDirection: 'row',
      marginEnd: moderateScaleVertical(16),
      marginTop: moderateScaleVertical(10),
      maxHeight: moderateScaleVertical(44),
      marginStart: moderateScaleVertical(16),
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
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: moderateScale(16),
    },
  });