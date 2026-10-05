import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  modalHeading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
});
