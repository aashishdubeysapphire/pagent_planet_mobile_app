import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      margin: moderateScaleVertical(16),
      padding: moderateScaleVertical(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      marginBottom: 0,
    },
    imageSection: {
      marginEnd: moderateScaleVertical(12),
      width: moderateScaleVertical(50),
      height: moderateScaleVertical(50),
    },
    showData: {
      flexDirection: 'row',
    },
    titleView: {
      width: '78%',
      justifyContent: 'center',
      paddingRight: moderateScale(16),
    },
    title: {
      ...CommonStyles.robotoMedium14,
      marginBottom: moderateScaleVertical(4),
      lineHeight: moderateScaleVertical(20),
    },
    infoArea: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoLabel: {
      ...CommonStyles.tpp_s1,
      width: '100%',
    },
    documentsArea: {
      marginTop: moderateScaleVertical(9),
      flexDirection: 'row',
      alignItems: 'center',
    },
    numbersStyle: {
      ...CommonStyles.tpp_s1,
      fontWeight: '500',
      marginLeft: moderateScale(6),
      color: color.P_PINK,
    },
  });
};

export default useStyle;
