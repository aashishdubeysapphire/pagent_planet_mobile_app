import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    modalContainer: {
      backgroundColor: color.WHITE,
      flex: 1,
      paddingTop: moderateScaleVertical(16),
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    container: {
      flex: 1,
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      height: moderateScaleVertical(116),
    },
    big_container: {
      flex: 1,
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      height: moderateScaleVertical(110),
      marginTop: moderateScaleVertical(2),
    },
    awardsShow: {
      alignSelf: 'center',
    },
    crossIcon: {
      marginLeft: 'auto',
    },
    headingView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(5),
      paddingHorizontal: moderateScale(16),
    },
    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      marginBottom: 'auto',
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
    },
    imageSection: {
      width: '100%',
      alignItems: 'center',
      borderRadius: moderateScale(24),
    },
    listContainer: {
      width: '100%',
      flex: 1,
      padding: moderateScaleVertical(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
    },
    circleContainer: {
      width: moderateScaleVertical(60),
      height: moderateScaleVertical(60),
      borderRadius: moderateScaleVertical(60),
      marginEnd: moderateScaleVertical(12),
    },
    title: {
      ...CommonStyles.robotoMedium14,
      lineHeight: moderateScaleVertical(20),
    },
    infoLabel: {
      ...CommonStyles.tpp_s1,
      marginLeft: moderateScale(4),
      width: moderateScale(75),
    },
    awardsTitle: {
      ...CommonStyles.tpp_s2,
      color: color.WHITE,
      alignSelf: 'center',
      position: 'absolute',
      marginTop: moderateScaleVertical(5),
    },
    showEventInfo: {
      marginTop: moderateScaleVertical(8),
      marginLeft: moderateScale(70),
      flexDirection: 'row',
    },
    addressLabel: {
      ...CommonStyles.tpp_s1,
      marginLeft: moderateScale(4),
    },
  });
};

export default useStyle;
