import {StyleSheet} from 'react-native';

import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
const useStyle = () => {
  return StyleSheet.create({
    noRecordFound: {
      textAlign: 'center',
      marginTop: moderateScaleVertical(20),
    },
    itemText: {
      ...CommonStyles.tpp_p3,
      color: color.S_GRAY_4,
      fontWeight: '400',
      lineHeight: moderateScaleVertical(16),
    },
  });
};

export default useStyle;
