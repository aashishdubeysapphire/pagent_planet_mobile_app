import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import useDynamicWidth from '../../utils/useDynamicWidth';
const useStyle = () => {
  const dW = useDynamicWidth();

  return StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: 30,
      borderColor: color.S_GRAY_2,
      backgroundColor: color.WHITE,
      borderWidth: dW(0.8),
      alignItems: 'flex-end',
      paddingStart: dW(10),
      paddingTop: dW(10),
      minHeight: moderateScaleVertical(120),
      maxHeight: moderateScaleVertical(120),
    },

    titleStyles: {
      ...CommonStyles.tpp_p2,
      left: dW(10),
      color: color.S_GRAY_4,
    },

    titleContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      top: moderateScaleVertical(10),
      left: moderateScaleVertical(10),
    },

    richTextContainer: {
      borderRadius: 30,
      overflow: 'hidden',
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      // height: 180,
      minHeight: 180,
    },
    richTextEditorStyle: {
      paddingHorizontal: 20,
    },
    richTextToolbarStyle: {
      backgroundColor: color.S_GRAY_2,
      borderColor: '#c6c3b3',
      borderWidth: 1,
      paddingLeft: 8,
      zIndex: 5000,
      position: 'absolute',
      bottom: 0,
      width:"100%"
    },
    headingView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: moderateScaleVertical(16),
    },
    modalHeading: {
      ...CommonStyles.tpp_h3,
      textTransform: 'capitalize',
      textAlign: 'center',
      lineHeight: moderateScaleVertical(24),
    },
    crossIcon: {
      marginLeft: 'auto',
    },
  });
};

export default useStyle;
