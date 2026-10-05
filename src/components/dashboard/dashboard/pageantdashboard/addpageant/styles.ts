import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  viewContainer: {
    paddingHorizontal: moderateScaleVertical(16),
  },

  modalHeading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(24),
  },
});
