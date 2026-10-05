import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
    filterOptionValueTextContainer: {
      ...CommonStyles.tpp_s2,
      fontWeight: '500',
      lineHeight: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
    },
  });
