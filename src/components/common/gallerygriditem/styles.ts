import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: moderateScaleVertical(8),
    },
    gridStyle: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
    },
    gridContainer: {
      backgroundColor: color.S_GRAY_1,
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      marginTop: 0.5,
    },

    featuredImageLogo: {
      position: 'absolute',
      marginStart: moderateScaleVertical(12),
      marginTop: moderateScaleVertical(12),
    },

    editLogo: {
      position: 'absolute',
      right: moderateScaleVertical(11),
      top: moderateScaleVertical(11),
    },

    listContainer: {
      flexDirection: 'row',
      width: '100%',
      flex: 1,
      padding: moderateScaleVertical(16),
      marginEnd: moderateScaleVertical(16),
      borderRadius: moderateScale(20),
      borderWidth: 1,
      borderColor: color.S_GRAY_2,
      alignItems: 'center',
      overflow: 'hidden',
    },
    circleContainer: {
      width: moderateScaleVertical(60),
      height: moderateScaleVertical(60),
      borderWidth: 1,
      borderColor: color.S_GRAY_2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScaleVertical(60),
      marginEnd: moderateScaleVertical(12),
    },

    gridTitle: {
      ...CommonStyles.tpp_s2,
      alignSelf: 'stretch',
      lineHeight: moderateScaleVertical(16),
      textAlign: 'center',
      marginTop: moderateScaleVertical(4),
      marginHorizontal: moderateScaleVertical(8),
    },
    editTitle: {
      ...CommonStyles.robotoMedium14,
      lineHeight: moderateScaleVertical(20),
      width: width - moderateScale(170),
    },
    editTitle1: {
      ...CommonStyles.tpp_s1,
      lineHeight: moderateScaleVertical(12),
      color: color.P_PINK,
      marginLeft: moderateScale(4),
    },
    btnText: {
      ...CommonStyles.latoBoldBlack12,
      color: color.P_PINK,
      marginVertical: moderateScaleVertical(8),
      marginHorizontal: moderateScale(16),
      textTransform: 'uppercase',
    },
    btnStyle: {
      borderWidth: 1,
      borderColor: color.P_PINK,
      borderRadius: 20,
      marginLeft: 'auto',
    },
    imageCountStyle: {
      ...CommonStyles.tpp_s1,
      lineHeight: moderateScaleVertical(12),
    },
    listBox: {
      width: width - moderateScale(122),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listBox1: {
      width: width - moderateScale(122),
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScaleVertical(4),
    },
    listCountStyle: {
      ...CommonStyles.tpp_s2,
      lineHeight: moderateScaleVertical(16),
    },
    imageCountLargeStyle: {
      ...CommonStyles.tpp_s2,
      color: color.S_GRAY_4,
      alignSelf: 'center',
      lineHeight: moderateScaleVertical(16),
    },
    countContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginEnd: moderateScaleVertical(10),
    },
    selctableContainer: {
      width: moderateScaleVertical(20),
      height: moderateScaleVertical(20),
      borderRadius: moderateScaleVertical(30),
      borderColor: color.S_GRAY_3,
      borderWidth: moderateScaleVertical(1),
    },
  });
};

export default useStyle;
