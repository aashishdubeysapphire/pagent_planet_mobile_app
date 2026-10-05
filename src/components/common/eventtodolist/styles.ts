import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
    },
    imageSection: {
      marginEnd: moderateScaleVertical(12),
      width: moderateScaleVertical(50),
      height: moderateScaleVertical(50),
    },
    listContainer: {
      width: '100%',
      padding: moderateScale(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      flexDirection: 'row',
    },
    showData: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomView: {
      justifyContent: 'center',
    },
    title: {
      ...CommonStyles.robotoMedium14,
      lineHeight: moderateScaleVertical(20),
    },
    subTitle: {
      ...CommonStyles.tpp_h5,
      color: color.S_GRAY_4,
      lineHeight: moderateScaleVertical(17),
      marginLeft: moderateScale(8),
      width: '92%',
    },
    contestantTitle: {
      ...CommonStyles.tpp_s1,
      color: color.P_PINK,
      lineHeight: moderateScaleVertical(17),
      marginLeft: moderateScale(4.5),
      width: '42%',
    },
  });
};

export default useStyle;
