import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    gridStyle: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
    },
    shadow: {
      position: 'absolute',
      backgroundColor: color.OPACITY1,
      width: '100%',
      height: '100%',
      borderRadius: moderateScaleVertical(10),
    },
    item: {
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      borderRadius: moderateScaleVertical(20),
      overflow: 'hidden',
    },
    titleContainer: {
      position: 'absolute',
      alignSelf: 'center',
      opacity: 1,
      bottom: moderateScaleVertical(6),
      alignItems: 'center',
      justifyContent: 'center',
      height: moderateScaleVertical(34),
    },
    titleLabel: {
      ...CommonStyles.tpp_s1,
      color: color.WHITE,
      paddingHorizontal: moderateScale(16),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    overlayImage: {
      opacity: 1,
      position: 'absolute',
    },
  });
};

export default useStyle;
