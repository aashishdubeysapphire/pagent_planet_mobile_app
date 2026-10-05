import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    mainContiner: {
      flex: 1,
      backgroundColor: color.WHITE,
    },
    demoImage: {
      height: moderateScaleVertical(375),
      marginTop: '30%',
      marginBottom: 'auto',
    },
    modalLabel: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      marginBottom: 'auto',
      textAlign: 'center',
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
    },
    modalText: {
      ...CommonStyles.tpp_p2,
      textAlign: 'center',
      marginVertical: moderateScaleVertical(20),
      color: 'blue',
    },
    modalHeading: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      marginBottom: 'auto',
      textTransform: 'capitalize',
      lineHeight: moderateScaleVertical(24),
    },
    modalNote: {
      ...CommonStyles.tpp_h3,
      marginTop: 'auto',
      fontSize: moderateScaleVertical(13),
      marginBottom: moderateScaleVertical(20),
    },
    modalNoteMsg: {
      ...CommonStyles.tpp_p2,
      color: color.S_GRAY_4,
      marginLeft: 'auto',
      fontSize: moderateScaleVertical(13),
      marginRight: 'auto',
      marginTop: moderateScaleVertical(8),
    },
    headingView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(20),
    },
    crossIcon: {
      marginLeft: 'auto',
    },
    ImagesView: {
      flexDirection: 'row',
      marginBottom: moderateScaleVertical(20),
    },
    underImageText: {
      ...CommonStyles.tpp_p2,
      color: color.BLACK,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: moderateScaleVertical(8),
    },
    circleImage: {
      marginRight: moderateScale(24),
    },
  });
};

export default useStyle;
